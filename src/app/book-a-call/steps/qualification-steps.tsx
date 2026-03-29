"use client";

import { ChoiceButton } from "@/components/form/choice-button";
import { FORM_TEXTAREA_CLASS } from "@/lib/form-styles";
import {
  DECISION_MAKERS,
  DECISION_MAKER_BRANCH_QUESTIONS,
  TIMELINES,
  TIMELINE_BRANCH_QUESTIONS,
  COMMITMENT_LEVELS,
  REVENUE_RANGES,
} from "@/lib/questions";
import { cn } from "@/lib/utils";

interface DecisionMakerStepProps {
  data: { decisionMaker: string };
  update: (field: "decisionMaker", value: string) => void;
  autoAdvance: () => void;
}

export function DecisionMakerStep({
  data,
  update,
  autoAdvance,
}: DecisionMakerStepProps) {
  return (
    <div className="space-y-3">
      <h2 className="mb-4 text-xl font-bold">
        Are you the decision maker for this project?
      </h2>
      {DECISION_MAKERS.map((option, i) => (
        <ChoiceButton
          key={option.key}
          selected={data.decisionMaker === option.key}
          onClick={() => {
            update("decisionMaker", option.key);
            autoAdvance();
          }}
          shortcut={String.fromCharCode(65 + i)}
        >
          {option.label}
        </ChoiceButton>
      ))}
    </div>
  );
}

interface DecisionMakerBranchStepProps {
  data: { decisionMaker: string; decisionMakerBranch: string };
  update: (field: "decisionMakerBranch", value: string) => void;
}

export function DecisionMakerBranchStep({
  data,
  update,
}: DecisionMakerBranchStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        {DECISION_MAKER_BRANCH_QUESTIONS[data.decisionMaker]}
      </h2>
      <textarea
        value={data.decisionMakerBranch}
        onChange={(e) => update("decisionMakerBranch", e.target.value)}
        className={FORM_TEXTAREA_CLASS}
        placeholder="Type your answer here..."
        autoFocus
      />
    </div>
  );
}

interface TimelineStepProps {
  data: { timeline: string };
  update: (field: "timeline", value: string) => void;
  autoAdvance: () => void;
}

export function TimelineStep({ data, update, autoAdvance }: TimelineStepProps) {
  return (
    <div className="space-y-3">
      <h2 className="mb-4 text-xl font-bold">
        How soon are you looking to get started?
      </h2>
      {TIMELINES.map((option, i) => (
        <ChoiceButton
          key={option.key}
          selected={data.timeline === option.key}
          onClick={() => {
            update("timeline", option.key);
            autoAdvance();
          }}
          shortcut={String.fromCharCode(65 + i)}
        >
          {option.label}
        </ChoiceButton>
      ))}
    </div>
  );
}

interface TimelineBranchStepProps {
  data: { timeline: string; timelineBranch: string };
  update: (field: "timelineBranch", value: string) => void;
}

export function TimelineBranchStep({ data, update }: TimelineBranchStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        {TIMELINE_BRANCH_QUESTIONS[data.timeline]}
      </h2>
      <textarea
        value={data.timelineBranch}
        onChange={(e) => update("timelineBranch", e.target.value)}
        className={FORM_TEXTAREA_CLASS}
        placeholder="Type your answer here..."
        autoFocus
      />
    </div>
  );
}

interface CommitmentStepProps {
  data: { commitment: string };
  update: (field: "commitment", value: string) => void;
  autoAdvance: () => void;
}

export function CommitmentStep({
  data,
  update,
  autoAdvance,
}: CommitmentStepProps) {
  return (
    <div className="space-y-3">
      <h2 className="mb-4 text-xl font-bold">
        How committed are you to partnering with our team?
      </h2>
      {COMMITMENT_LEVELS.map((option, i) => (
        <ChoiceButton
          key={option.key}
          selected={data.commitment === option.key}
          onClick={() => {
            update("commitment", option.key);
            autoAdvance();
          }}
          shortcut={String.fromCharCode(65 + i)}
        >
          {option.label}
        </ChoiceButton>
      ))}
    </div>
  );
}

interface ConcernsStepProps {
  data: { concerns: string };
  update: (field: "concerns", value: string) => void;
}

export function ConcernsStep({ data, update }: ConcernsStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        What questions or concerns do you have?
      </h2>
      <textarea
        value={data.concerns}
        onChange={(e) => update("concerns", e.target.value)}
        className={FORM_TEXTAREA_CLASS}
        placeholder="Type your answer here..."
        autoFocus
      />
    </div>
  );
}

interface RevenueStepProps {
  data: { revenue: string };
  update: (field: "revenue", value: string) => void;
  autoAdvance: () => void;
}

export function RevenueStep({ data, update, autoAdvance }: RevenueStepProps) {
  return (
    <div className="space-y-3">
      <h2 className="mb-4 text-xl font-bold">
        What's your current monthly revenue?
      </h2>
      {REVENUE_RANGES.map((range, i) => (
        <ChoiceButton
          key={range}
          selected={data.revenue === range}
          onClick={() => {
            update("revenue", range);
            autoAdvance();
          }}
          shortcut={String.fromCharCode(65 + i)}
        >
          {range}
        </ChoiceButton>
      ))}
    </div>
  );
}

interface AnythingElseStepProps {
  data: { anythingElse: string };
  update: (field: "anythingElse", value: string) => void;
}

export function AnythingElseStep({ data, update }: AnythingElseStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Anything else we should know?</h2>
      <p className="text-sm text-muted-foreground">
        Optional. If there's context that didn't fit anywhere else, drop it
        here.
      </p>
      <textarea
        value={data.anythingElse}
        onChange={(e) => update("anythingElse", e.target.value)}
        className={cn(FORM_TEXTAREA_CLASS, "min-h-[100px]")}
        placeholder="Type your answer here..."
        autoFocus
      />
    </div>
  );
}
