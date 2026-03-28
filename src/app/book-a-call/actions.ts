"use server";

import { createClient } from "@/lib/supabase/server";

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

export async function submitIntake(formData: IntakeFormData) {
  const supabase = await createClient();

  const { data: client, error } = await supabase
    .from("clients")
    .insert({
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
    })
    .select("id")
    .single();

  if (error) {
    return { error: error.message };
  }

  return { success: true, clientId: client.id };
}
