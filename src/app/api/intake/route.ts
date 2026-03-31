import { NextResponse } from "next/server";
import { NOTION_APPLICATIONS_DB } from "@/lib/notion";
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

function richText(content: string) {
  return { rich_text: [{ text: { content: content.slice(0, 2000) } }] };
}

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
  const queryRes = await fetch(`${NOTION_API}/databases/${NOTION_APPLICATIONS_DB}/query`, {
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
    return NextResponse.json({ applicationId: queryData.results[0].id });
  }

  const res = await fetch(`${NOTION_API}/pages`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      parent: { database_id: NOTION_APPLICATIONS_DB },
      properties: {
        Name: { title: [{ text: { content: body.firstName } }] },
        Email: { email: body.email },
        Phone: { phone_number: body.phone },
        "Preferred Contact": { select: { name: body.contactMethod } },
        Status: { select: { name: "partial" } },
      },
    }),
  });
  const page = await res.json();

  return NextResponse.json({ applicationId: page.id });
}

async function handleSubmitIntake(body: {
  formData: IntakeFormData;
  metadata?: Record<string, unknown>;
  applicationId?: string;
}) {
  const { formData, metadata, applicationId } = body;
  const { total: leadScore, factors: scoreBreakdown } = calculateLeadScore(formData);

  const props: Record<string, unknown> = {
    Name: { title: [{ text: { content: formData.firstName } }] },
    Email: { email: formData.email },
    Phone: { phone_number: formData.phone },
    "Preferred Contact": { select: { name: formData.contactMethod } },
    "Lead Score": { number: leadScore },
    Source: { select: { name: SOURCE_MAP[formData.howFound] ?? formData.howFound } },
    Status: { select: { name: "submitted" } },
    "Score Breakdown": richText(JSON.stringify(scoreBreakdown)),
  };

  if (formData.bizName) props.Company = richText(formData.bizName);
  if (formData.bizWebsite) props.Website = { url: formData.bizWebsite };
  const industry = formData.businessType === "Other" ? formData.businessTypeOther : formData.businessType;
  if (industry) props.Industry = richText(industry);
  if (formData.revenue) props.Revenue = { select: { name: REVENUE_MAP[formData.revenue] ?? formData.revenue } };
  if (formData.teamSize) props["Team Size"] = { select: { name: formData.teamSize } };
  if (formData.timeline) props.Timeline = { select: { name: formData.timeline } };
  if (formData.commitment) props.Commitment = { number: parseInt(formData.commitment) / 100 };
  if (formData.decisionMaker) props["Decision Maker"] = { select: { name: formData.decisionMaker } };
  if (formData.hoursWasted) props["Hours Wasted"] = { select: { name: formData.hoursWasted } };
  if (formData.whatToBuild) props["What to Build"] = richText(formData.whatToBuild);
  if (formData.currentProcess) props["Current Process"] = richText(formData.currentProcess);
  if (formData.whyWork) props["Why Work With Us"] = richText(formData.whyWork);
  if (formData.success) props["Success Criteria"] = richText(formData.success);
  if (formData.concerns) props.Concerns = richText(formData.concerns);
  if (formData.anythingElse) props["Anything Else"] = richText(formData.anythingElse);
  if (formData.howFoundDetail) props["Source Detail"] = richText(formData.howFoundDetail);
  if (formData.aiExperience) props["AI Experience"] = richText(formData.aiExperience);
  if (formData.aiBranch) props["AI Detail"] = richText(formData.aiBranch);
  if (formData.teamSizeBranch) props["Team Size Detail"] = richText(formData.teamSizeBranch);
  if (formData.hoursWastedBranch) props["Hours Wasted Detail"] = richText(formData.hoursWastedBranch);
  if (formData.decisionMakerBranch) props["Decision Maker Detail"] = richText(formData.decisionMakerBranch);
  if (formData.timelineBranch) props["Timeline Detail"] = richText(formData.timelineBranch);
  if (metadata) props.Metadata = richText(JSON.stringify(metadata));

  if (applicationId) {
    // Update existing partial application to submitted
    await fetch(`${NOTION_API}/pages/${applicationId}`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify({ properties: props }),
    });
    return NextResponse.json({ success: true, applicationId });
  }

  const res = await fetch(`${NOTION_API}/pages`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      parent: { database_id: NOTION_APPLICATIONS_DB },
      properties: props,
    }),
  });
  const page = await res.json();

  return NextResponse.json({ success: true, applicationId: page.id });
}
