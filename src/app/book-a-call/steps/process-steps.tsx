"use client";

import { ChoiceButton } from "@/components/form/choice-button";
import { FORM_TEXTAREA_CLASS } from "@/lib/form-styles";
import { HOURS_WASTED, HOURS_WASTED_BRANCH_QUESTIONS } from "@/lib/questions";
import { cn } from "@/lib/utils";

interface WhatToBuildStepProps {
  data: { whatToBuild: string };
  update: (field: "whatToBuild", value: string) => void;
}

export function WhatToBuildStep({ data, update }: WhatToBuildStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        What would you want us to build or automate for you?
      </h2>
      <textarea
        value={data.whatToBuild}
        onChange={(e) => update("whatToBuild", e.target.value)}
        className={FORM_TEXTAREA_CLASS}
        placeholder="Type your answer here..."
        autoFocus
      />
    </div>
  );
}

interface CurrentProcessStepProps {
  data: { currentProcess: string };
  update: (field: "currentProcess", value: string) => void;
}

export function CurrentProcessStep({ data, update }: CurrentProcessStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Walk us through how this is done today, step by step.
      </h2>
      <p className="text-sm text-muted-foreground">
        The more detail you give, the better we can scope what to build.
      </p>
      <textarea
        value={data.currentProcess}
        onChange={(e) => update("currentProcess", e.target.value)}
        className={cn(FORM_TEXTAREA_CLASS, "min-h-[150px]")}
        placeholder="First we... then... after that..."
        autoFocus
      />
    </div>
  );
}

interface HoursWastedStepProps {
  data: { teamSize: string; hoursWasted: string };
  update: (field: "hoursWasted", value: string) => void;
  autoAdvance: () => void;
}

export function HoursWastedStep({
  data,
  update,
  autoAdvance,
}: HoursWastedStepProps) {
  return (
    <div className="space-y-3">
      <h2 className="mb-4 text-xl font-bold">
        {data.teamSize === "solo"
          ? "How many hours per week do you spend on this?"
          : "How many hours per week does your team spend on this?"}
      </h2>
      {HOURS_WASTED.map((option, i) => (
        <ChoiceButton
          key={option.key}
          selected={data.hoursWasted === option.key}
          onClick={() => {
            update("hoursWasted", option.key);
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

interface HoursWastedBranchStepProps {
  data: { hoursWasted: string; hoursWastedBranch: string };
  update: (field: "hoursWastedBranch", value: string) => void;
}

export function HoursWastedBranchStep({
  data,
  update,
}: HoursWastedBranchStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        {HOURS_WASTED_BRANCH_QUESTIONS[data.hoursWasted]}
      </h2>
      <textarea
        value={data.hoursWastedBranch}
        onChange={(e) => update("hoursWastedBranch", e.target.value)}
        className={FORM_TEXTAREA_CLASS}
        placeholder="Type your answer here..."
        autoFocus
      />
    </div>
  );
}

interface SuccessStepProps {
  data: { success: string };
  update: (field: "success", value: string) => void;
}

export function SuccessStep({ data, update }: SuccessStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        If this project goes perfectly, what does that look like for your
        business?
      </h2>
      <textarea
        value={data.success}
        onChange={(e) => update("success", e.target.value)}
        className={FORM_TEXTAREA_CLASS}
        placeholder="Type your answer here..."
        autoFocus
      />
    </div>
  );
}
