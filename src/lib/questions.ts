export const BUSINESS_TYPES = [
  "E-commerce / Retail",
  "Consulting / Professional Services",
  "SaaS / Tech Startup",
  "Healthcare / Wellness",
  "Marketing / Advertising Agency",
  "Finance / Accounting",
  "Education / Training",
  "Manufacturing / Industrial",
  "Other",
];

export const AI_EXPERIENCE = [
  { label: "Yes, I've built some myself", key: "implemented" },
  { label: "Yes, I've hired someone to build them", key: "agency" },
  { label: "I've started but haven't finished", key: "stalled" },
  { label: "No, this would be my first time", key: "new" },
  { label: "Other", key: "other" },
];

export const AI_BRANCH_QUESTIONS: Record<string, string> = {
  implemented:
    "What have you built so far, and what's making you consider working with a team?",
  agency:
    "What was your experience working with them, and what made you want to explore a different approach?",
  stalled: "What have you tried so far, and where did things stall?",
  new: "What got you interested in AI automation for your business?",
  other: "Tell us more about your situation and what you're looking for.",
};

export const TIMELINES = [
  { label: "As soon as possible", key: "asap" },
  { label: "Within the next 2 weeks", key: "2weeks" },
  { label: "Within the next month", key: "month" },
  { label: "Just exploring for now", key: "exploring" },
];

export const TIMELINE_BRANCH_QUESTIONS: Record<string, string> = {
  asap: "What's driving the urgency?",
  exploring: "What would need to happen for you to move forward?",
};

export const COMMITMENT_LEVELS = [
  {
    label: "100% confident. That's why I'm applying.",
    key: "100",
    needsConcerns: false,
  },
  {
    label: "80% confident. I just need to clarify some details.",
    key: "80",
    needsConcerns: false,
  },
  {
    label: "40% confident. I need a conversation first.",
    key: "40",
    needsConcerns: true,
  },
  {
    label: "Not sure yet. I'm still figuring things out.",
    key: "0",
    needsConcerns: true,
  },
];

export const REVENUE_RANGES = [
  "$5k - $10k / month",
  "$10k - $15k / month",
  "$15k - $50k / month",
  "$50k+ / month",
];

export const CONTACT_METHODS = [
  { label: "iMessage", key: "imessage" },
  { label: "WhatsApp", key: "whatsapp" },
];

/** book-a-call only */
export const TEAM_SIZES = [
  { label: "Just me", key: "solo" },
  { label: "2-5 people", key: "small" },
  { label: "6-20 people", key: "medium" },
  { label: "20+ people", key: "large" },
];

export const TEAM_SIZE_BRANCH_QUESTIONS: Record<string, string> = {
  solo: "Are you the one doing the work you want automated?",
  medium:
    "Is there someone on your team who would manage the system day-to-day?",
  large:
    "Who would own this internally? Do you have technical staff on the team?",
};

export const HOURS_WASTED = [
  { label: "Under 5 hours", key: "under5" },
  { label: "5-15 hours", key: "5to15" },
  { label: "15-40 hours", key: "15to40" },
  { label: "40+ hours", key: "40plus" },
];

export const HOURS_WASTED_BRANCH_QUESTIONS: Record<string, string> = {
  "40plus": "How many people are spending their time on this?",
};

export const DECISION_MAKERS = [
  { label: "Yes, I make the final call", key: "sole" },
  { label: "I decide with a partner or co-founder", key: "shared" },
  { label: "Someone else needs to approve", key: "other" },
];

export const DECISION_MAKER_BRANCH_QUESTIONS: Record<string, string> = {
  shared: "Are they aligned on investing in automation?",
  other:
    "Who else is involved in the decision, and what matters most to them?",
};

export const HOW_FOUND = [
  "YouTube",
  "Instagram",
  "LinkedIn",
  "Someone referred me",
  "Google search",
  "Other",
];

export const HOW_FOUND_DETAIL_QUESTIONS: Record<string, string> = {
  YouTube: "Which video or topic brought you here?",
  Instagram: "What content caught your attention?",
  LinkedIn: "What post or profile caught your attention?",
  "Someone referred me": "Who referred you?",
  "Google search": "What were you searching for?",
  Other: "How did you find us?",
};
