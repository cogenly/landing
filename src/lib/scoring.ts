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
