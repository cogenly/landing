"use server";

import { createClient } from "@supabase/supabase-js";

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

function calculateLeadScore(data: IntakeFormData): number {
  let score = 0;

  // Revenue (0-30)
  const revenueScores: Record<string, number> = {
    "$5k - $10k / month": 10,
    "$10k - $15k / month": 15,
    "$15k - $50k / month": 25,
    "$50k+ / month": 30,
  };
  score += revenueScores[data.revenue] ?? 0;

  // Commitment (0-25)
  const commitmentScores: Record<string, number> = {
    "100": 25,
    "80": 18,
    "40": 8,
    "0": 2,
  };
  score += commitmentScores[data.commitment] ?? 0;

  // Timeline (0-20)
  const timelineScores: Record<string, number> = {
    asap: 20,
    "2weeks": 15,
    month: 10,
    exploring: 3,
  };
  score += timelineScores[data.timeline] ?? 0;

  // Decision maker (0-10)
  const decisionScores: Record<string, number> = {
    sole: 10,
    shared: 6,
    other: 3,
  };
  score += decisionScores[data.decisionMaker] ?? 0;

  // Hours wasted / pain level (0-10)
  const hoursScores: Record<string, number> = {
    under5: 3,
    "5to15": 5,
    "15to40": 8,
    "40plus": 10,
  };
  score += hoursScores[data.hoursWasted] ?? 0;

  // Team size (0-5) — larger teams = bigger contracts
  const teamScores: Record<string, number> = {
    solo: 2,
    small: 3,
    medium: 4,
    large: 5,
  };
  score += teamScores[data.teamSize] ?? 0;

  return score; // max 100
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

  const leadScore = calculateLeadScore(formData);

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
