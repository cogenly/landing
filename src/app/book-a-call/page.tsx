"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  MessageCircle,
  ArrowUpLeft,
} from "lucide-react";
import { Logo } from "../components/logo";
import Link from "next/link";

type Step =
  | "intro"
  | "contact"
  | "how-found"
  | "how-found-detail"
  | "why-work"
  | "business"
  | "business-type"
  | "business-type-other"
  | "team-size"
  | "team-size-branch"
  | "ai-experience"
  | "ai-branch"
  | "what-to-build"
  | "current-process"
  | "hours-wasted"
  | "hours-wasted-branch"
  | "success"
  | "decision-maker"
  | "decision-maker-branch"
  | "timeline"
  | "timeline-branch"
  | "commitment"
  | "concerns"
  | "revenue"
  | "availability"
  | "anything-else"
  | "done";

const BUSINESS_TYPES = [
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

const TEAM_SIZES = [
  { label: "Just me", key: "solo" },
  { label: "2-5 people", key: "small" },
  { label: "6-20 people", key: "medium" },
  { label: "20+ people", key: "large" },
];

const TEAM_SIZE_BRANCH_QUESTIONS: Record<string, string> = {
  solo: "Are you the one doing the work you want automated?",
  medium:
    "Is there someone on your team who would manage the system day-to-day?",
  large:
    "Who would own this internally? Do you have technical staff on the team?",
};

const AI_EXPERIENCE = [
  { label: "Yes, I've implemented them myself", key: "implemented" },
  { label: "Yes, I've hired an agency", key: "agency" },
  { label: "Not fully implemented yet", key: "stalled" },
  { label: "No, I need help setting them up", key: "new" },
  { label: "Other", key: "other" },
];

const AI_BRANCH_QUESTIONS: Record<string, string> = {
  implemented:
    "What have you built so far, and what's making you consider working with a team?",
  agency:
    "What was your experience working with them, and what made you want to explore a different approach?",
  stalled: "What have you tried so far, and where did things stall?",
  new: "What got you interested in AI automation for your business?",
  other: "Tell us more about your situation and what you're looking for.",
};

const HOURS_WASTED = [
  { label: "Under 5 hours", key: "under5" },
  { label: "5-15 hours", key: "5to15" },
  { label: "15-40 hours", key: "15to40" },
  { label: "40+ hours", key: "40plus" },
];

const HOURS_WASTED_BRANCH_QUESTIONS: Record<string, string> = {
  "40plus": "How many people are spending their time on this?",
};

const DECISION_MAKERS = [
  { label: "Yes, I make the final call", key: "sole" },
  { label: "I decide with a partner or co-founder", key: "shared" },
  { label: "Someone else needs to approve", key: "other" },
];

const DECISION_MAKER_BRANCH_QUESTIONS: Record<string, string> = {
  shared: "Are they aligned on investing in automation?",
  other:
    "Who else is involved in the decision, and what matters most to them?",
};

const TIMELINES = [
  { label: "As soon as possible", key: "asap" },
  { label: "Within the next 2 weeks", key: "2weeks" },
  { label: "Within the next month", key: "month" },
  { label: "Just exploring for now", key: "exploring" },
];

const TIMELINE_BRANCH_QUESTIONS: Record<string, string> = {
  asap: "What's driving the urgency?",
  exploring: "What would need to happen for you to move forward?",
};

const COMMITMENT_LEVELS = [
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

const REVENUE_RANGES = [
  "$5k - $10k / month",
  "$10k - $15k / month",
  "$15k - $50k / month",
  "$50k+ / month",
];

const HOW_FOUND = [
  "YouTube",
  "Instagram",
  "Someone referred me",
  "Google search",
  "Other",
];

const HOW_FOUND_DETAIL_QUESTIONS: Record<string, string> = {
  YouTube: "Which video or topic brought you here?",
  Instagram: "What content caught your attention?",
  "Someone referred me": "Who referred you?",
  "Google search": "What were you searching for?",
  Other: "How did you find us?",
};

const CONTACT_METHODS = [
  { label: "iMessage", key: "imessage" },
  { label: "WhatsApp", key: "whatsapp" },
];

const FLOW: Step[] = [
  "intro",
  "contact",
  "how-found",
  "how-found-detail",
  "why-work",
  "business",
  "business-type",
  "business-type-other",
  "team-size",
  "team-size-branch",
  "ai-experience",
  "ai-branch",
  "what-to-build",
  "current-process",
  "hours-wasted",
  "hours-wasted-branch",
  "success",
  "decision-maker",
  "decision-maker-branch",
  "timeline",
  "timeline-branch",
  "commitment",
  "concerns",
  "revenue",
  "availability",
  "anything-else",
  "done",
];

interface FormData {
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
  availability: string;
  anythingElse: string;
}

function shouldSkip(step: Step, data: FormData): boolean {
  if (step === "intro") return false;
  if (step === "how-found-detail") return !data.howFound;
  if (step === "business-type-other") return data.businessType !== "Other";
  if (step === "team-size-branch")
    return !TEAM_SIZE_BRANCH_QUESTIONS[data.teamSize];
  if (step === "ai-branch") return !AI_BRANCH_QUESTIONS[data.aiExperience];
  if (step === "hours-wasted-branch")
    return !HOURS_WASTED_BRANCH_QUESTIONS[data.hoursWasted];
  if (step === "decision-maker-branch")
    return !DECISION_MAKER_BRANCH_QUESTIONS[data.decisionMaker];
  if (step === "timeline-branch")
    return !TIMELINE_BRANCH_QUESTIONS[data.timeline];
  if (step === "concerns") {
    const level = COMMITMENT_LEVELS.find((c) => c.key === data.commitment);
    if (!level?.needsConcerns) return true;
  }
  return false;
}

function getNextStep(current: Step, data: FormData): Step {
  const idx = FLOW.indexOf(current);
  for (let i = idx + 1; i < FLOW.length; i++) {
    if (!shouldSkip(FLOW[i], data)) return FLOW[i];
  }
  return "done";
}

function getPrevStep(current: Step, data: FormData): Step | null {
  const idx = FLOW.indexOf(current);
  for (let i = idx - 1; i >= 0; i--) {
    if (!shouldSkip(FLOW[i], data)) return FLOW[i];
  }
  return null;
}

function ChoiceButton({
  selected,
  onClick,
  children,
  shortcut,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  shortcut?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg border px-5 py-3.5 text-left text-sm transition-all",
        selected
          ? "border-primary bg-primary/5 text-foreground"
          : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-muted/50"
      )}
    >
      {shortcut && (
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded border text-xs font-medium",
            selected
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border"
          )}
        >
          {shortcut}
        </span>
      )}
      <span className="flex-1">{children}</span>
      {selected && <Check className="h-4 w-4 shrink-0 text-primary" />}
    </button>
  );
}

function StepProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full bg-primary transition-all duration-500"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  );
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7;
}

export default function BookACallPage() {
  const [step, setStep] = useState<Step>("intro");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [contentHeight, setContentHeight] = useState<number | "auto">("auto");
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!innerRef.current) return;
    const ro = new ResizeObserver(() => {
      if (innerRef.current) {
        setContentHeight(innerRef.current.scrollHeight);
      }
    });
    ro.observe(innerRef.current);
    // set initial height
    setContentHeight(innerRef.current.scrollHeight);
    return () => ro.disconnect();
  }, [step]);
  const [data, setData] = useState<FormData>({
    firstName: "",
    email: "",
    phone: "",
    contactMethod: "",
    howFound: "",
    howFoundDetail: "",
    whyWork: "",
    bizName: "",
    bizWebsite: "",
    businessType: "",
    businessTypeOther: "",
    teamSize: "",
    teamSizeBranch: "",
    aiExperience: "",
    aiBranch: "",
    whatToBuild: "",
    currentProcess: "",
    hoursWasted: "",
    hoursWastedBranch: "",
    success: "",
    decisionMaker: "",
    decisionMakerBranch: "",
    timeline: "",
    timelineBranch: "",
    commitment: "",
    concerns: "",
    revenue: "",
    availability: "",
    anythingElse: "",
  });

  const update = (field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    if (step === "contact") {
      const newErrors: Partial<Record<keyof FormData, string>> = {};
      if (!data.firstName.trim()) newErrors.firstName = "Required";
      if (!data.email.trim()) newErrors.email = "Required";
      else if (!isValidEmail(data.email)) newErrors.email = "Enter a valid email";
      if (!data.phone.trim()) newErrors.phone = "Required";
      else if (!isValidPhone(data.phone)) newErrors.phone = "Enter a valid phone number";
      if (!data.contactMethod) newErrors.contactMethod = "Pick one";
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return false;
      }
    }
    setErrors({});
    return true;
  };

  const next = () => {
    if (!validate()) return;
    setStep(getNextStep(step, data));
  };
  const prev = () => {
    const p = getPrevStep(step, data);
    if (p) setStep(p);
  };

  const visibleSteps = FLOW.filter((s) => !shouldSkip(s, data));
  const currentStepIndex = visibleSteps.indexOf(step);
  const totalSteps = visibleSteps.length - 1; // exclude "done"

  const canGoNext = (): boolean => {
    switch (step) {
      case "intro":
        return true;
      case "contact":
        return !!(
          data.firstName.trim() &&
          isValidEmail(data.email) &&
          isValidPhone(data.phone) &&
          data.contactMethod
        );
      case "how-found":
        return !!data.howFound;
      case "how-found-detail":
        return !!data.howFoundDetail.trim();
      case "why-work":
        return !!data.whyWork.trim();
      case "business":
        return !!data.bizName;
      case "business-type":
        return !!data.businessType;
      case "business-type-other":
        return !!data.businessTypeOther.trim();
      case "team-size":
        return !!data.teamSize;
      case "team-size-branch":
        return !!data.teamSizeBranch.trim();
      case "ai-experience":
        return !!data.aiExperience;
      case "ai-branch":
        return !!data.aiBranch.trim();
      case "what-to-build":
        return !!data.whatToBuild.trim();
      case "current-process":
        return !!data.currentProcess.trim();
      case "hours-wasted":
        return !!data.hoursWasted;
      case "hours-wasted-branch":
        return !!data.hoursWastedBranch.trim();
      case "success":
        return !!data.success.trim();
      case "decision-maker":
        return !!data.decisionMaker;
      case "decision-maker-branch":
        return !!data.decisionMakerBranch.trim();
      case "timeline":
        return !!data.timeline;
      case "timeline-branch":
        return !!data.timelineBranch.trim();
      case "commitment":
        return !!data.commitment;
      case "concerns":
        return !!data.concerns.trim();
      case "revenue":
        return !!data.revenue;
      case "availability":
        return !!data.availability.trim();
      case "anything-else":
        return true; // optional
      default:
        return false;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center gap-4 px-6 py-5">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>
        <div className="flex-1" />
        {step !== "intro" && step !== "done" && (
          <div className="w-48 sm:w-72 md:w-96">
            <StepProgress current={currentStepIndex} total={totalSteps} />
          </div>
        )}
        <div className="flex-1" />
        <Link
          href="/"
          className="group/link flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowUpLeft className="h-4 w-4 transition-transform group-hover/link:-translate-x-0.5 group-hover/link:-translate-y-0.5" />
          Back to site
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 pb-16">
        <div className="w-full max-w-lg">
          {step === "done" ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Application received.</h2>
              <p className="mt-3 text-muted-foreground">
                Our team will review this and reach out via{" "}
                {data.contactMethod === "whatsapp"
                  ? "WhatsApp"
                  : "text"}{" "}
                to discuss next steps. Talk soon.
              </p>
              <Link href="/">
                <Button className="mt-8" variant="outline">
                  Back to Home
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div
                ref={contentRef}
                className="transition-[height] duration-300 ease-in-out"
                style={{ height: contentHeight, overflow: "hidden" }}
              >
              <div ref={innerRef}>
              <div key={step}>
                {step === "intro" && (
                  <div className="space-y-6 text-center">
                    <div className="space-y-4">
                      <div className="inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 shadow-sm">
                        <span className="text-sm font-medium text-muted-foreground">
                          Limited availability
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Apply to Work With Us
                      </h2>
                    </div>
                    <p className="mx-auto max-w-md text-[15px] leading-relaxed text-muted-foreground">
                      We take on a limited number of clients so every project
                      gets the attention it deserves. This application helps us
                      understand your business and whether we're the right fit.
                    </p>
                    <div className="mx-auto max-w-sm rounded-lg bg-muted/60 px-5 py-3.5 text-sm text-muted-foreground">
                      Takes about 5-10 minutes. We read every one.
                    </div>
                  </div>
                )}

                {step === "contact" && (
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-bold">
                        Let's start with the basics.
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        We'll use this to reach out if we're a good fit.
                      </p>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        First name
                      </label>
                      <input
                        type="text"
                        value={data.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        className={cn(
                          "w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary",
                          errors.firstName ? "border-red-400" : "border-border"
                        )}
                        placeholder="Alex"
                        autoFocus
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        Email address
                      </label>
                      <input
                        type="email"
                        value={data.email}
                        onChange={(e) => update("email", e.target.value)}
                        className={cn(
                          "w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary",
                          errors.email ? "border-red-400" : "border-border"
                        )}
                        placeholder="alex@company.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        value={data.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        className={cn(
                          "w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary",
                          errors.phone ? "border-red-400" : "border-border"
                        )}
                        placeholder="+1 (555) 000-0000"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        How should we reach you?
                      </label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => update("contactMethod", "imessage")}
                          className={cn(
                            "flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all",
                            data.contactMethod === "imessage"
                              ? "border-primary bg-primary/5 text-foreground"
                              : "border-border text-muted-foreground hover:border-primary/50"
                          )}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/0e/08/07/0e080793-1b66-d9b3-0bbe-8222669abf79/messages-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/512x512bb.png"
                            alt="iMessage"
                            width={24}
                            height={24}
                            className="rounded-md"
                          />
                          iMessage
                        </button>
                        <button
                          type="button"
                          onClick={() => update("contactMethod", "whatsapp")}
                          className={cn(
                            "flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all",
                            data.contactMethod === "whatsapp"
                              ? "border-primary bg-primary/5 text-foreground"
                              : "border-border text-muted-foreground hover:border-primary/50"
                          )}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/c0/94/ab/c094ab41-a44a-4da8-737f-7aad8d97b8b6/AppIcon-0-0-1x_U007epad-0-0-0-1-0-0-sRGB-0-85-220.png/512x512bb.png"
                            alt="WhatsApp"
                            width={24}
                            height={24}
                            className="rounded-md"
                          />
                          WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {step === "how-found" && (
                  <div className="space-y-2.5">
                    <h2 className="mb-3 text-xl font-bold">
                      How did you hear about us?
                    </h2>
                    {HOW_FOUND.map((option, i) => (
                      <ChoiceButton
                        key={option}
                        selected={data.howFound === option}
                        onClick={() => update("howFound", option)}
                        shortcut={String.fromCharCode(65 + i)}
                      >
                        {option}
                      </ChoiceButton>
                    ))}
                  </div>
                )}

                {step === "how-found-detail" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">
                      {HOW_FOUND_DETAIL_QUESTIONS[data.howFound]}
                    </h2>
                    <input
                      type="text"
                      value={data.howFoundDetail}
                      onChange={(e) =>
                        update("howFoundDetail", e.target.value)
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      placeholder="Type your answer here..."
                      autoFocus
                    />
                  </div>
                )}

                {step === "why-work" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">
                      What made you want to work with us?
                    </h2>
                    <textarea
                      value={data.whyWork}
                      onChange={(e) => update("whyWork", e.target.value)}
                      className="min-h-[120px] w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      placeholder="Type your answer here..."
                      autoFocus
                    />
                  </div>
                )}

                {step === "business" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">
                      Tell us about your business.
                    </h2>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        Business name
                      </label>
                      <input
                        type="text"
                        value={data.bizName}
                        onChange={(e) => update("bizName", e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        Website URL (optional)
                      </label>
                      <input
                        type="url"
                        value={data.bizWebsite}
                        onChange={(e) => update("bizWebsite", e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                        placeholder="https://"
                      />
                    </div>
                  </div>
                )}

                {step === "business-type" && (
                  <div className="space-y-3">
                    <h2 className="mb-4 text-xl font-bold">
                      Which best describes your business?
                    </h2>
                    {BUSINESS_TYPES.map((type, i) => (
                      <ChoiceButton
                        key={type}
                        selected={data.businessType === type}
                        onClick={() => update("businessType", type)}
                        shortcut={String.fromCharCode(65 + i)}
                      >
                        {type}
                      </ChoiceButton>
                    ))}
                  </div>
                )}

                {step === "business-type-other" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">
                      Tell us what your business does.
                    </h2>
                    <textarea
                      value={data.businessTypeOther}
                      onChange={(e) =>
                        update("businessTypeOther", e.target.value)
                      }
                      className="min-h-[120px] w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      placeholder="What industry are you in, and what does your business do?"
                      autoFocus
                    />
                  </div>
                )}

                {step === "team-size" && (
                  <div className="space-y-3">
                    <h2 className="mb-4 text-xl font-bold">
                      How big is your team?
                    </h2>
                    {TEAM_SIZES.map((option, i) => (
                      <ChoiceButton
                        key={option.key}
                        selected={data.teamSize === option.key}
                        onClick={() => update("teamSize", option.key)}
                        shortcut={String.fromCharCode(65 + i)}
                      >
                        {option.label}
                      </ChoiceButton>
                    ))}
                  </div>
                )}

                {step === "team-size-branch" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">
                      {TEAM_SIZE_BRANCH_QUESTIONS[data.teamSize]}
                    </h2>
                    <textarea
                      value={data.teamSizeBranch}
                      onChange={(e) =>
                        update("teamSizeBranch", e.target.value)
                      }
                      className="min-h-[120px] w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      placeholder="Type your answer here..."
                      autoFocus
                    />
                  </div>
                )}

                {step === "ai-experience" && (
                  <div className="space-y-3">
                    <h2 className="mb-4 text-xl font-bold">
                      What best describes your current use of AI / automation?
                    </h2>
                    {AI_EXPERIENCE.map((option, i) => (
                      <ChoiceButton
                        key={option.key}
                        selected={data.aiExperience === option.key}
                        onClick={() => update("aiExperience", option.key)}
                        shortcut={String.fromCharCode(65 + i)}
                      >
                        {option.label}
                      </ChoiceButton>
                    ))}
                  </div>
                )}

                {step === "ai-branch" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">
                      {AI_BRANCH_QUESTIONS[data.aiExperience]}
                    </h2>
                    <textarea
                      value={data.aiBranch}
                      onChange={(e) => update("aiBranch", e.target.value)}
                      className="min-h-[120px] w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      placeholder="Type your answer here..."
                      autoFocus
                    />
                  </div>
                )}

                {step === "what-to-build" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">
                      What would you want us to build or automate for you?
                    </h2>
                    <textarea
                      value={data.whatToBuild}
                      onChange={(e) => update("whatToBuild", e.target.value)}
                      className="min-h-[120px] w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      placeholder="Type your answer here..."
                      autoFocus
                    />
                  </div>
                )}

                {step === "current-process" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">
                      Walk us through how this is done today, step by step.
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      The more detail you give, the better we can scope what to
                      build.
                    </p>
                    <textarea
                      value={data.currentProcess}
                      onChange={(e) =>
                        update("currentProcess", e.target.value)
                      }
                      className="min-h-[150px] w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      placeholder="First we... then... after that..."
                      autoFocus
                    />
                  </div>
                )}

                {step === "hours-wasted" && (
                  <div className="space-y-3">
                    <h2 className="mb-4 text-xl font-bold">
                      How many hours per week does your team spend on this?
                    </h2>
                    {HOURS_WASTED.map((option, i) => (
                      <ChoiceButton
                        key={option.key}
                        selected={data.hoursWasted === option.key}
                        onClick={() => update("hoursWasted", option.key)}
                        shortcut={String.fromCharCode(65 + i)}
                      >
                        {option.label}
                      </ChoiceButton>
                    ))}
                  </div>
                )}

                {step === "hours-wasted-branch" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">
                      {HOURS_WASTED_BRANCH_QUESTIONS[data.hoursWasted]}
                    </h2>
                    <textarea
                      value={data.hoursWastedBranch}
                      onChange={(e) =>
                        update("hoursWastedBranch", e.target.value)
                      }
                      className="min-h-[120px] w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      placeholder="Type your answer here..."
                      autoFocus
                    />
                  </div>
                )}

                {step === "success" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">
                      If this project goes perfectly, what does that look like
                      for your business?
                    </h2>
                    <textarea
                      value={data.success}
                      onChange={(e) => update("success", e.target.value)}
                      className="min-h-[120px] w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      placeholder="Type your answer here..."
                      autoFocus
                    />
                  </div>
                )}

                {step === "decision-maker" && (
                  <div className="space-y-3">
                    <h2 className="mb-4 text-xl font-bold">
                      Are you the decision maker for this project?
                    </h2>
                    {DECISION_MAKERS.map((option, i) => (
                      <ChoiceButton
                        key={option.key}
                        selected={data.decisionMaker === option.key}
                        onClick={() => update("decisionMaker", option.key)}
                        shortcut={String.fromCharCode(65 + i)}
                      >
                        {option.label}
                      </ChoiceButton>
                    ))}
                  </div>
                )}

                {step === "decision-maker-branch" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">
                      {DECISION_MAKER_BRANCH_QUESTIONS[data.decisionMaker]}
                    </h2>
                    <textarea
                      value={data.decisionMakerBranch}
                      onChange={(e) =>
                        update("decisionMakerBranch", e.target.value)
                      }
                      className="min-h-[120px] w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      placeholder="Type your answer here..."
                      autoFocus
                    />
                  </div>
                )}

                {step === "timeline" && (
                  <div className="space-y-3">
                    <h2 className="mb-4 text-xl font-bold">
                      How soon are you looking to get started?
                    </h2>
                    {TIMELINES.map((option, i) => (
                      <ChoiceButton
                        key={option.key}
                        selected={data.timeline === option.key}
                        onClick={() => update("timeline", option.key)}
                        shortcut={String.fromCharCode(65 + i)}
                      >
                        {option.label}
                      </ChoiceButton>
                    ))}
                  </div>
                )}

                {step === "timeline-branch" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">
                      {TIMELINE_BRANCH_QUESTIONS[data.timeline]}
                    </h2>
                    <textarea
                      value={data.timelineBranch}
                      onChange={(e) =>
                        update("timelineBranch", e.target.value)
                      }
                      className="min-h-[120px] w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      placeholder="Type your answer here..."
                      autoFocus
                    />
                  </div>
                )}

                {step === "commitment" && (
                  <div className="space-y-3">
                    <h2 className="mb-4 text-xl font-bold">
                      How committed are you to partnering with our team?
                    </h2>
                    {COMMITMENT_LEVELS.map((option, i) => (
                      <ChoiceButton
                        key={option.key}
                        selected={data.commitment === option.key}
                        onClick={() => update("commitment", option.key)}
                        shortcut={String.fromCharCode(65 + i)}
                      >
                        {option.label}
                      </ChoiceButton>
                    ))}
                  </div>
                )}

                {step === "concerns" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">
                      What questions or concerns do you have?
                    </h2>
                    <textarea
                      value={data.concerns}
                      onChange={(e) => update("concerns", e.target.value)}
                      className="min-h-[120px] w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      placeholder="Type your answer here..."
                      autoFocus
                    />
                  </div>
                )}

                {step === "revenue" && (
                  <div className="space-y-3">
                    <h2 className="mb-4 text-xl font-bold">
                      What's your current monthly revenue?
                    </h2>
                    {REVENUE_RANGES.map((range, i) => (
                      <ChoiceButton
                        key={range}
                        selected={data.revenue === range}
                        onClick={() => update("revenue", range)}
                        shortcut={String.fromCharCode(65 + i)}
                      >
                        {range}
                      </ChoiceButton>
                    ))}
                  </div>
                )}

                {step === "availability" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">
                      When are you available for a 30-minute discovery call?
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Give us a few days and times that work for you. We'll
                      confirm one.
                    </p>
                    <textarea
                      value={data.availability}
                      onChange={(e) =>
                        update("availability", e.target.value)
                      }
                      className="min-h-[100px] w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      placeholder="e.g. Tuesday or Thursday afternoon, anytime after 2pm EST"
                      autoFocus
                    />
                  </div>
                )}

                {step === "anything-else" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">
                      Anything else we should know?
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Optional. If there's context that didn't fit anywhere
                      else, drop it here.
                    </p>
                    <textarea
                      value={data.anythingElse}
                      onChange={(e) =>
                        update("anythingElse", e.target.value)
                      }
                      className="min-h-[100px] w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      placeholder="Type your answer here..."
                      autoFocus
                    />
                  </div>
                )}
              </div>
              </div>
              </div>

              <div className="flex items-center justify-between">
                {step === "intro" ? (
                  <div />
                ) : (
                  <Button
                    variant="ghost"
                    onClick={prev}
                    disabled={false}
                    className="gap-1.5 px-5 py-2.5 text-sm"
                  >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover/button:-translate-x-0.5" />
                    Back
                  </Button>
                )}

                <Button
                  onClick={next}
                  disabled={!canGoNext()}
                  className="gap-1.5 px-6 py-2.5 text-sm"
                >
                  {step === "intro"
                    ? "Start Application"
                    : step === "anything-else"
                      ? "Submit"
                      : "Next"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-0.5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
