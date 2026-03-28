"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowLeft, Check, MessageCircle } from "lucide-react";

type Step =
  | "contact"
  | "how-found"
  | "why-work"
  | "business"
  | "business-type"
  | "ai-experience"
  | "ai-branch"
  | "what-to-build"
  | "success"
  | "timeline"
  | "timeline-branch"
  | "commitment"
  | "concerns"
  | "revenue"
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

const AI_EXPERIENCE = [
  { label: "Yes, I've implemented them myself", key: "implemented" },
  { label: "Yes, I've hired an agency", key: "agency" },
  { label: "Not fully implemented yet", key: "stalled" },
  { label: "No, I need help setting them up", key: "new" },
  { label: "Other", key: "other" },
];

const AI_BRANCH_QUESTIONS: Record<string, string> = {
  implemented:
    "What have you built so far, and what's making you consider done-for-you help?",
  agency:
    "What's your experience been working with them, and what made you want to explore a different approach?",
  stalled: "What have you tried so far, and where did things stall?",
  new: "What got you interested in AI automation for your business?",
  other: "Tell us more about your situation and what you're looking for.",
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
    label: "40% confident. I need a chat and more time.",
    key: "40",
    needsConcerns: true,
  },
  {
    label: "0% confident. I have no knowledge. I am not ready.",
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

const CONTACT_METHODS = [
  { label: "iMessage", key: "imessage" },
  { label: "WhatsApp", key: "whatsapp" },
];

const FLOW: Step[] = [
  "contact",
  "how-found",
  "why-work",
  "business",
  "business-type",
  "ai-experience",
  "ai-branch",
  "what-to-build",
  "success",
  "timeline",
  "timeline-branch",
  "commitment",
  "concerns",
  "revenue",
  "done",
];

interface FormData {
  firstName: string;
  email: string;
  phone: string;
  contactMethod: string;
  howFound: string;
  howFoundOther: string;
  referredBy: string;
  whyWork: string;
  bizName: string;
  bizWebsite: string;
  businessType: string;
  aiExperience: string;
  aiBranch: string;
  whatToBuild: string;
  success: string;
  timeline: string;
  timelineBranch: string;
  commitment: string;
  concerns: string;
  revenue: string;
}

function shouldSkip(step: Step, data: FormData): boolean {
  if (step === "ai-branch" && !AI_BRANCH_QUESTIONS[data.aiExperience])
    return true;
  if (
    step === "timeline-branch" &&
    !TIMELINE_BRANCH_QUESTIONS[data.timeline]
  )
    return true;
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
    <div className="mb-0 h-1 w-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full bg-primary transition-all duration-500"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  );
}

export function IntakeForm({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("contact");
  const [data, setData] = useState<FormData>({
    firstName: "",
    email: "",
    phone: "",
    contactMethod: "",
    howFound: "",
    howFoundOther: "",
    referredBy: "",
    whyWork: "",
    bizName: "",
    bizWebsite: "",
    businessType: "",
    aiExperience: "",
    aiBranch: "",
    whatToBuild: "",
    success: "",
    timeline: "",
    timelineBranch: "",
    commitment: "",
    concerns: "",
    revenue: "",
  });

  const update = (field: keyof FormData, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const next = () => setStep(getNextStep(step, data));
  const prev = () => {
    const p = getPrevStep(step, data);
    if (p) setStep(p);
  };

  const currentStepIndex = FLOW.filter((s) => !shouldSkip(s, data)).indexOf(step);
  const totalSteps = FLOW.filter((s) => !shouldSkip(s, data)).length - 1; // exclude "done"

  const canGoNext = (): boolean => {
    switch (step) {
      case "contact":
        return !!(data.firstName && data.email && data.phone && data.contactMethod);
      case "how-found":
        if (!data.howFound) return false;
        if (data.howFound === "Other" && !data.howFoundOther.trim()) return false;
        if (data.howFound === "Someone referred me" && !data.referredBy.trim()) return false;
        return true;
      case "why-work":
        return !!data.whyWork.trim();
      case "business":
        return !!data.bizName;
      case "business-type":
        return !!data.businessType;
      case "ai-experience":
        return !!data.aiExperience;
      case "ai-branch":
        return !!data.aiBranch.trim();
      case "what-to-build":
        return !!data.whatToBuild.trim();
      case "success":
        return !!data.success.trim();
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
      default:
        return false;
    }
  };

  const handleKeyDown = (_e: React.KeyboardEvent) => {};

  const reset = () => {
    setStep("contact");
    setData({
      firstName: "",
      email: "",
      phone: "",
      contactMethod: "",
      howFound: "",
      howFoundOther: "",
      referredBy: "",
      whyWork: "",
      bizName: "",
      bizWebsite: "",
      businessType: "",
      aiExperience: "",
      aiBranch: "",
      whatToBuild: "",
      success: "",
      timeline: "",
      timelineBranch: "",
      commitment: "",
      concerns: "",
      revenue: "",
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger render={children as React.ReactElement}></DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg" onKeyDown={handleKeyDown} showCloseButton={false}>
        <DialogTitle className="sr-only">Project Application</DialogTitle>
        {step === "done" ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Application received.</h2>
            <p className="mt-3 text-muted-foreground">
              I'll personally review this and shoot you a{" "}
              {data.contactMethod === "whatsapp" ? "WhatsApp message" : "text"}{" "}
              to discuss next steps. Talk soon.
            </p>
            <Button
              className="mt-8"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <StepProgress current={currentStepIndex} total={totalSteps} />

            <div>
              {step === "contact" && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold">Work With Me</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      I personally review every application. If we're a good
                      fit, I'll reach out directly.
                    </p>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      First name *
                    </label>
                    <input
                      type="text"
                      value={data.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      placeholder="Alex"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Email address *
                    </label>
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      placeholder="alex@company.com"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Phone number *
                    </label>
                    <input
                      type="tel"
                      value={data.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      How should we reach you? *
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
                        <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/0e/08/07/0e080793-1b66-d9b3-0bbe-8222669abf79/messages-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/512x512bb.png" alt="iMessage" width={24} height={24} className="rounded-md" />
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
                        <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/c0/94/ab/c094ab41-a44a-4da8-737f-7aad8d97b8b6/AppIcon-0-0-1x_U007epad-0-0-0-1-0-0-sRGB-0-85-220.png/512x512bb.png" alt="WhatsApp" width={24} height={24} className="rounded-md" />
                        WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {step === "how-found" && (
                <div className="space-y-2.5">
                  <h2 className="mb-3 text-xl font-bold">
                    How did you hear about me?
                  </h2>
                  {HOW_FOUND.map((option, i) => (
                    <div key={option}>
                      <ChoiceButton
                        selected={data.howFound === option}
                        onClick={() => update("howFound", option)}
                        shortcut={String.fromCharCode(65 + i)}
                      >
                        {option}
                      </ChoiceButton>
                      {option === "Other" && data.howFound === "Other" && (
                        <input
                          type="text"
                          value={data.howFoundOther}
                          onChange={(e) => update("howFoundOther", e.target.value)}
                          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                          placeholder="How did you find us?"
                          autoFocus
                        />
                      )}
                      {option === "Someone referred me" && data.howFound === "Someone referred me" && (
                        <input
                          type="text"
                          value={data.referredBy}
                          onChange={(e) => update("referredBy", e.target.value)}
                          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                          placeholder="Who referred you?"
                          autoFocus
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {step === "why-work" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">
                    What made you want to work with me?
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
                    Tell me about your business.
                  </h2>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Business name *
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
                    Which option best describes your business?
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

              {step === "success" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">
                    If this project goes perfectly, what does that look like for
                    your business?
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
                    onChange={(e) => update("timelineBranch", e.target.value)}
                    className="min-h-[120px] w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                    placeholder="Type your answer here..."
                    autoFocus
                  />
                </div>
              )}

              {step === "commitment" && (
                <div className="space-y-3">
                  <h2 className="mb-4 text-xl font-bold">
                    Finally, how committed are you to partnering with me?
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
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={prev}
                disabled={step === "contact"}
                className="gap-1.5 px-5 py-2.5 text-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              <Button
                onClick={next}
                disabled={!canGoNext()}
                className="gap-1.5 px-6 py-2.5 text-sm"
              >
                {step === "revenue" ? "Submit" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
