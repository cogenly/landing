import { NextResponse } from "next/server";
import { NOTION_CLIENTS_DB, NOTION_APPLICATIONS_DB } from "@/lib/notion";
import { calculateLeadScore, type IntakeFormData } from "@/lib/scoring";

const NOTION_API = "https://api.notion.com/v1";

function headers() {
  return {
    Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
  };
}

const SOURCE_MAP: Record<string, string> = {
  "Someone referred me": "Referral",
  "Google search": "Google",
};

const REVENUE_MAP: Record<string, string> = {
  "$5k - $10k / month": "$5k-$10k/mo",
  "$10k - $15k / month": "$10k-$15k/mo",
  "$15k - $50k / month": "$15k-$50k/mo",
  "$50k+ / month": "$50k+/mo",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type } = body;

    if (type === "createPartial") {
      return handleCreatePartial(body);
    }
    if (type === "submitIntake") {
      return handleSubmitIntake(body);
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function handleCreatePartial(body: {
  firstName: string;
  email: string;
  phone: string;
  contactMethod: string;
}) {
  // Dedup: check for existing partial with same email
  const queryRes = await fetch(`${NOTION_API}/databases/${NOTION_CLIENTS_DB}/query`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      filter: {
        and: [
          { property: "Email", email: { equals: body.email } },
          { property: "Status", select: { equals: "partial" } },
        ],
      },
    }),
  });
  const queryData = await queryRes.json();

  if (queryData.results?.length > 0) {
    return NextResponse.json({ clientId: queryData.results[0].id });
  }

  // Create lean client record
  const createRes = await fetch(`${NOTION_API}/pages`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      parent: { database_id: NOTION_CLIENTS_DB },
      properties: {
        Name: { title: [{ text: { content: body.firstName } }] },
        Email: { email: body.email },
        Phone: { phone_number: body.phone },
        "Preferred Contact": { select: { name: body.contactMethod } },
        Status: { select: { name: "partial" } },
      },
    }),
  });
  const page = await createRes.json();

  return NextResponse.json({ clientId: page.id });
}

async function handleSubmitIntake(body: {
  formData: IntakeFormData;
  metadata?: Record<string, unknown>;
  clientId?: string;
}) {
  const { formData, metadata, clientId } = body;
  const { total: leadScore, factors: scoreBreakdown } = calculateLeadScore(formData);

  // 1. Update or create Client (lean: just core info)
  const clientProps: Record<string, unknown> = {
    Name: { title: [{ text: { content: formData.firstName } }] },
    Email: { email: formData.email },
    Phone: { phone_number: formData.phone },
    "Preferred Contact": { select: { name: formData.contactMethod } },
    Status: { select: { name: "lead" } },
  };
  if (formData.bizName) {
    clientProps.Company = { rich_text: [{ text: { content: formData.bizName } }] };
  }
  if (formData.bizWebsite) {
    clientProps.Website = { url: formData.bizWebsite };
  }
  const industry = formData.businessType === "Other" ? formData.businessTypeOther : formData.businessType;
  if (industry) {
    clientProps.Industry = { rich_text: [{ text: { content: industry } }] };
  }

  let finalClientId = clientId;

  if (clientId) {
    await fetch(`${NOTION_API}/pages/${clientId}`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify({ properties: clientProps }),
    });
  } else {
    const res = await fetch(`${NOTION_API}/pages`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        parent: { database_id: NOTION_CLIENTS_DB },
        properties: clientProps,
      }),
    });
    const page = await res.json();
    finalClientId = page.id;
  }

  // 2. Create Application (all form data, scoring, linked to client)
  const appProps: Record<string, unknown> = {
    Name: { title: [{ text: { content: `${formData.firstName} - Application` } }] },
    Client: { relation: [{ id: finalClientId }] },
    "Lead Score": { number: leadScore },
    Source: { select: { name: SOURCE_MAP[formData.howFound] ?? formData.howFound } },
    "Score Breakdown": { rich_text: [{ text: { content: JSON.stringify(scoreBreakdown).slice(0, 2000) } }] },
  };

  if (formData.revenue) {
    appProps.Revenue = { select: { name: REVENUE_MAP[formData.revenue] ?? formData.revenue } };
  }
  if (formData.teamSize) {
    appProps["Team Size"] = { select: { name: formData.teamSize } };
  }
  if (formData.timeline) {
    appProps.Timeline = { select: { name: formData.timeline } };
  }
  if (formData.commitment) {
    appProps.Commitment = { number: parseInt(formData.commitment) / 100 };
  }
  if (formData.decisionMaker) {
    appProps["Decision Maker"] = { select: { name: formData.decisionMaker } };
  }
  if (formData.hoursWasted) {
    appProps["Hours Wasted"] = { select: { name: formData.hoursWasted } };
  }
  if (formData.whatToBuild) {
    appProps["What to Build"] = { rich_text: [{ text: { content: formData.whatToBuild } }] };
  }
  if (formData.currentProcess) {
    appProps["Current Process"] = { rich_text: [{ text: { content: formData.currentProcess } }] };
  }
  if (formData.whyWork) {
    appProps["Why Work With Us"] = { rich_text: [{ text: { content: formData.whyWork } }] };
  }
  if (formData.success) {
    appProps["Success Criteria"] = { rich_text: [{ text: { content: formData.success } }] };
  }
  if (formData.concerns) {
    appProps.Concerns = { rich_text: [{ text: { content: formData.concerns } }] };
  }
  if (formData.anythingElse) {
    appProps["Anything Else"] = { rich_text: [{ text: { content: formData.anythingElse } }] };
  }
  if (formData.howFoundDetail) {
    appProps["Source Detail"] = { rich_text: [{ text: { content: formData.howFoundDetail } }] };
  }
  if (formData.aiExperience) {
    appProps["AI Experience"] = { rich_text: [{ text: { content: formData.aiExperience } }] };
  }
  if (formData.aiBranch) {
    appProps["AI Detail"] = { rich_text: [{ text: { content: formData.aiBranch } }] };
  }
  if (formData.teamSizeBranch) {
    appProps["Team Size Detail"] = { rich_text: [{ text: { content: formData.teamSizeBranch } }] };
  }
  if (formData.hoursWastedBranch) {
    appProps["Hours Wasted Detail"] = { rich_text: [{ text: { content: formData.hoursWastedBranch } }] };
  }
  if (formData.decisionMakerBranch) {
    appProps["Decision Maker Detail"] = { rich_text: [{ text: { content: formData.decisionMakerBranch } }] };
  }
  if (formData.timelineBranch) {
    appProps["Timeline Detail"] = { rich_text: [{ text: { content: formData.timelineBranch } }] };
  }
  if (metadata) {
    appProps.Metadata = { rich_text: [{ text: { content: JSON.stringify(metadata).slice(0, 2000) } }] };
  }

  await fetch(`${NOTION_API}/pages`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      parent: { database_id: NOTION_APPLICATIONS_DB },
      properties: appProps,
    }),
  });

  return NextResponse.json({ success: true, clientId: finalClientId });
}
