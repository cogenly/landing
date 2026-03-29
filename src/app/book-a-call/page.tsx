"use client";

import { useState, useRef, useEffect } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { StepProgress } from "@/components/form/step-progress";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpLeft,
  Loader2,
} from "lucide-react";
import { Logo } from "../components/logo";
import Link from "next/link";
import { submitIntake, createPartialClient } from "./actions";
import {
  TEAM_SIZE_BRANCH_QUESTIONS,
  AI_BRANCH_QUESTIONS,
  HOURS_WASTED_BRANCH_QUESTIONS,
  DECISION_MAKER_BRANCH_QUESTIONS,
  TIMELINE_BRANCH_QUESTIONS,
  COMMITMENT_LEVELS,
} from "@/lib/questions";
import { createFlowNavigation } from "@/lib/form-navigation";
import { IntroStep } from "./steps/intro-step";
import { ContactStep } from "./steps/contact-step";
import {
  HowFoundStep,
  HowFoundDetailStep,
  WhyWorkStep,
} from "./steps/discovery-steps";
import {
  BusinessStep,
  BusinessTypeStep,
  BusinessTypeOtherStep,
  TeamSizeStep,
  TeamSizeBranchStep,
  AiExperienceStep,
  AiBranchStep,
} from "./steps/business-steps";
import {
  WhatToBuildStep,
  CurrentProcessStep,
  HoursWastedStep,
  HoursWastedBranchStep,
  SuccessStep,
} from "./steps/process-steps";
import {
  DecisionMakerStep,
  DecisionMakerBranchStep,
  TimelineStep,
  TimelineBranchStep,
  CommitmentStep,
  ConcernsStep,
  RevenueStep,
  AnythingElseStep,
} from "./steps/qualification-steps";

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
  | "anything-else"
  | "done";

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

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7;
}

export default function BookACallPage() {
  const [step, setStep] = useState<Step>("intro");
  const [clientId, setClientId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [pendingAdvance, setPendingAdvance] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | "auto">("auto");
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const formStartTime = useRef<number>(Date.now());

  useEffect(() => {
    if (!innerRef.current) return;
    const ro = new ResizeObserver(() => {
      if (innerRef.current) {
        setContentHeight(innerRef.current.scrollHeight);
      }
    });
    ro.observe(innerRef.current);
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
    anythingElse: "",
  });

  const update = (field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const nav = createFlowNavigation(FLOW, (s) => shouldSkip(s, data));

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

  const next = async () => {
    if (!validate()) return;
    const nextStep = nav.getNextStep(step);
    if (step === "contact") {
      createPartialClient({
        firstName: data.firstName,
        email: data.email,
        phone: data.phone,
        contactMethod: data.contactMethod,
      }).then((result) => {
        if ("clientId" in result && result.clientId) setClientId(result.clientId);
      });
    }
    if (nextStep === "done") {
      setSubmitting(true);
      setSubmitError(null);
      const metadata = {
        durationSeconds: Math.round((Date.now() - formStartTime.current) / 1000),
        referrer: document.referrer || null,
        userAgent: navigator.userAgent,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        url: window.location.href,
      };
      const result = await submitIntake(data, metadata, clientId ?? undefined);
      setSubmitting(false);
      if (result.error) {
        setSubmitError(result.error);
        return;
      }
    }
    setStep(nextStep);
  };

  const prev = () => {
    const p = nav.getPrevStep(step);
    if (p) setStep(p);
  };

  useEffect(() => {
    if (!pendingAdvance) return;
    setPendingAdvance(false);
    const timeout = setTimeout(() => next(), 300);
    return () => clearTimeout(timeout);
  }, [pendingAdvance]); // eslint-disable-line react-hooks/exhaustive-deps

  const autoAdvance = () => setPendingAdvance(true);

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
          <div className="hidden sm:block sm:w-72 md:w-96">
            <StepProgress current={currentStepIndex} total={totalSteps} className="animate-in fade-in duration-500" />
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
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
                All done
              </p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Application received.
              </h2>
              <p className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
                Our team will review this and reach out via{" "}
                {data.contactMethod === "whatsapp" ? "WhatsApp" : "text"} to
                discuss next steps. Talk soon.
              </p>
              <Link href="/">
                <Button className="mt-8" variant="outline">
                  Back to Home
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {step !== "intro" && (
                <div className="sm:hidden">
                  <StepProgress current={currentStepIndex} total={totalSteps} />
                </div>
              )}
              <div
                ref={contentRef}
                className="transition-[height] duration-300 ease-in-out"
                style={{ height: contentHeight, overflow: "hidden" }}
              >
                <div ref={innerRef}>
                  <BlurFade key={step} delay={0.05}>
                    {step === "intro" && <IntroStep />}
                    {step === "contact" && (
                      <ContactStep
                        data={data}
                        update={update}
                        errors={errors}
                      />
                    )}
                    {step === "how-found" && (
                      <HowFoundStep
                        data={data}
                        update={update}
                        autoAdvance={autoAdvance}
                      />
                    )}
                    {step === "how-found-detail" && (
                      <HowFoundDetailStep data={data} update={update} />
                    )}
                    {step === "why-work" && (
                      <WhyWorkStep data={data} update={update} />
                    )}
                    {step === "business" && (
                      <BusinessStep data={data} update={update} />
                    )}
                    {step === "business-type" && (
                      <BusinessTypeStep
                        data={data}
                        update={update}
                        autoAdvance={autoAdvance}
                      />
                    )}
                    {step === "business-type-other" && (
                      <BusinessTypeOtherStep data={data} update={update} />
                    )}
                    {step === "team-size" && (
                      <TeamSizeStep
                        data={data}
                        update={update}
                        autoAdvance={autoAdvance}
                      />
                    )}
                    {step === "team-size-branch" && (
                      <TeamSizeBranchStep data={data} update={update} />
                    )}
                    {step === "ai-experience" && (
                      <AiExperienceStep
                        data={data}
                        update={update}
                        autoAdvance={autoAdvance}
                      />
                    )}
                    {step === "ai-branch" && (
                      <AiBranchStep data={data} update={update} />
                    )}
                    {step === "what-to-build" && (
                      <WhatToBuildStep data={data} update={update} />
                    )}
                    {step === "current-process" && (
                      <CurrentProcessStep data={data} update={update} />
                    )}
                    {step === "hours-wasted" && (
                      <HoursWastedStep
                        data={data}
                        update={update}
                        autoAdvance={autoAdvance}
                      />
                    )}
                    {step === "hours-wasted-branch" && (
                      <HoursWastedBranchStep data={data} update={update} />
                    )}
                    {step === "success" && (
                      <SuccessStep data={data} update={update} />
                    )}
                    {step === "decision-maker" && (
                      <DecisionMakerStep
                        data={data}
                        update={update}
                        autoAdvance={autoAdvance}
                      />
                    )}
                    {step === "decision-maker-branch" && (
                      <DecisionMakerBranchStep data={data} update={update} />
                    )}
                    {step === "timeline" && (
                      <TimelineStep
                        data={data}
                        update={update}
                        autoAdvance={autoAdvance}
                      />
                    )}
                    {step === "timeline-branch" && (
                      <TimelineBranchStep data={data} update={update} />
                    )}
                    {step === "commitment" && (
                      <CommitmentStep
                        data={data}
                        update={update}
                        autoAdvance={autoAdvance}
                      />
                    )}
                    {step === "concerns" && (
                      <ConcernsStep data={data} update={update} />
                    )}
                    {step === "revenue" && (
                      <RevenueStep
                        data={data}
                        update={update}
                        autoAdvance={autoAdvance}
                      />
                    )}
                    {step === "anything-else" && (
                      <AnythingElseStep data={data} update={update} />
                    )}
                  </BlurFade>
                </div>
              </div>

              {submitError && (
                <p className="mb-2 text-sm text-red-500">
                  Something went wrong. Please try again.
                </p>
              )}

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
                  disabled={!canGoNext() || submitting}
                  className="gap-1.5 px-6 py-2.5 text-sm"
                >
                  {submitting ? (
                    <>
                      Submitting
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      {step === "intro"
                        ? "Start Application"
                        : step === "anything-else"
                          ? "Submit"
                          : "Next"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-0.5" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
