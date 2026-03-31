export type ScoreFactor = {
  name: string;
  score: number;
  max: number;
  reason: string;
};

export type ScoreBreakdown = {
  total: number;
  factors: ScoreFactor[];
};

export interface IntakeFormData {
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

export const SCORE_TABLES = {
  revenue: {
    max: 30,
    scores: {
      "$5k - $10k / month": 10,
      "$10k - $15k / month": 15,
      "$15k - $50k / month": 25,
      "$50k+ / month": 30,
    } as Record<string, number>,
  },
  commitment: {
    max: 25,
    scores: { "100": 25, "80": 18, "40": 8, "0": 2 } as Record<string, number>,
  },
  timeline: {
    max: 20,
    scores: { asap: 20, "2weeks": 15, month: 10, exploring: 3 } as Record<string, number>,
  },
  decisionMaker: {
    max: 10,
    scores: { sole: 10, shared: 6, other: 3 } as Record<string, number>,
  },
  hoursWasted: {
    max: 10,
    scores: { under5: 3, "5to15": 5, "15to40": 8, "40plus": 10 } as Record<string, number>,
  },
  teamSize: {
    max: 5,
    scores: { solo: 2, small: 3, medium: 4, large: 5 } as Record<string, number>,
  },
};

export function calculateLeadScore(data: IntakeFormData): ScoreBreakdown {
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
