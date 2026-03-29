"use server";

import { createClient } from "@supabase/supabase-js";
import { SCORE_TABLES, type ScoreFactor, type ScoreBreakdown } from "@/lib/scoring";

function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

interface IntakeFormData {
  firstName: string;
  email: string;
  phone: string;
  contactMethod: string;
  howFound: string;
  howFoundDetail: string;
  whyWork: string;
  bizName: string;
  bizWebsite: string;
  businessType: string;
  businessTypeOther: string;
  teamSize: string;
  teamSizeBranch: string;
  aiExperience: string;
  aiBranch: string;
  whatToBuild: string;
  currentProcess: string;
  hoursWasted: string;
  hoursWastedBranch: string;
  success: string;
  decisionMaker: string;
  decisionMakerBranch: string;
  timeline: string;
  timelineBranch: string;
  commitment: string;
  concerns: string;
  revenue: string;
  anythingElse: string;
}

function calculateLeadScore(data: IntakeFormData): ScoreBreakdown {
  const factors: ScoreFactor[] = [
    {
      name: "Revenue",
      score: SCORE_TABLES.revenue.scores[data.revenue] ?? 0,
      max: SCORE_TABLES.revenue.max,
      reason: data.revenue || "Not provided",
    },
    {
      name: "Commitment",
      score: SCORE_TABLES.commitment.scores[data.commitment] ?? 0,
      max: SCORE_TABLES.commitment.max,
      reason: data.commitment ? `${data.commitment}% confident` : "Not provided",
    },
    {
      name: "Timeline",
      score: SCORE_TABLES.timeline.scores[data.timeline] ?? 0,
      max: SCORE_TABLES.timeline.max,
      reason: data.timeline || "Not provided",
    },
    {
      name: "Decision maker",
      score: SCORE_TABLES.decisionMaker.scores[data.decisionMaker] ?? 0,
      max: SCORE_TABLES.decisionMaker.max,
      reason: data.decisionMaker || "Not provided",
    },
    {
      name: "Pain level",
      score: SCORE_TABLES.hoursWasted.scores[data.hoursWasted] ?? 0,
      max: SCORE_TABLES.hoursWasted.max,
      reason: data.hoursWasted || "Not provided",
    },
    {
      name: "Team size",
      score: SCORE_TABLES.teamSize.scores[data.teamSize] ?? 0,
      max: SCORE_TABLES.teamSize.max,
      reason: data.teamSize || "Not provided",
    },
  ];

  return {
    total: factors.reduce((sum, f) => sum + f.score, 0),
    factors,
  };
}

interface PartialClientData {
  firstName: string;
  email: string;
  phone: string;
  contactMethod: string;
}

export async function createPartialClient(data: PartialClientData) {
  const supabase = createAdminClient();

  // Dedup: check for existing partial record with same email
  const { data: existing } = await supabase
    .from("clients")
    .select("id")
    .eq("email", data.email)
    .eq("status", "partial")
    .maybeSingle();

  if (existing) {
    return { clientId: existing.id };
  }

  const { data: client, error } = await supabase
    .from("clients")
    .insert({
      name: data.firstName,
      email: data.email,
      phone: data.phone,
      preferred_contact: data.contactMethod,
      status: "partial",
      metadata: {
        last_step: "contact",
        startedAt: new Date().toISOString(),
      },
    })
    .select("id")
    .single();

  if (error) {
    return { error: error.message };
  }

  return { clientId: client.id };
}

export async function submitIntake(formData: IntakeFormData, metadata?: Record<string, unknown>, clientId?: string) {
  const supabase = createAdminClient();

  const { total: leadScore, factors: scoreBreakdown } = calculateLeadScore(formData);

  const intakeData = {
    whyWork: formData.whyWork,
    aiExperience: formData.aiExperience,
    aiBranch: formData.aiBranch,
    whatToBuild: formData.whatToBuild,
    currentProcess: formData.currentProcess,
    hoursWasted: formData.hoursWasted,
    hoursWastedBranch: formData.hoursWastedBranch,
    success: formData.success,
    decisionMaker: formData.decisionMaker,
    decisionMakerBranch: formData.decisionMakerBranch,
    timeline: formData.timeline,
    timelineBranch: formData.timelineBranch,
    commitment: formData.commitment,
    concerns: formData.concerns,
    anythingElse: formData.anythingElse,
    howFoundDetail: formData.howFoundDetail,
    teamSizeBranch: formData.teamSizeBranch,
    scoreBreakdown,
    ...metadata,
  };

  const payload = {
    name: formData.firstName,
    email: formData.email,
    phone: formData.phone,
    company: formData.bizName,
    website: formData.bizWebsite || null,
    industry:
      formData.businessType === "Other"
        ? formData.businessTypeOther
        : formData.businessType,
    team_size: formData.teamSize,
    revenue: formData.revenue,
    status: "lead",
    source: formData.howFound,
    preferred_contact: formData.contactMethod,
    lead_score: leadScore,
    metadata: intakeData,
  };

  if (clientId) {
    const { error } = await supabase
      .from("clients")
      .update(payload)
      .eq("id", clientId);

    if (error) {
      return { error: error.message };
    }

    return { success: true, clientId };
  }

  const { data: client, error } = await supabase
    .from("clients")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    return { error: error.message };
  }

  return { success: true, clientId: client.id };
}
