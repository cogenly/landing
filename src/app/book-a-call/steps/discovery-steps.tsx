"use client";

import { ChoiceButton } from "@/components/form/choice-button";
import { FORM_INPUT_CLASS, FORM_TEXTAREA_CLASS } from "@/lib/form-styles";
import { HOW_FOUND, HOW_FOUND_DETAIL_QUESTIONS } from "@/lib/questions";

interface HowFoundStepProps {
  data: { howFound: string };
  update: (field: "howFound", value: string) => void;
  autoAdvance: () => void;
}

export function HowFoundStep({ data, update, autoAdvance }: HowFoundStepProps) {
  return (
    <div className="space-y-2.5">
      <h2 className="mb-3 text-xl font-bold">How did you hear about us?</h2>
      {HOW_FOUND.map((option, i) => (
        <ChoiceButton
          key={option}
          selected={data.howFound === option}
          onClick={() => {
            update("howFound", option);
            autoAdvance();
          }}
          shortcut={String.fromCharCode(65 + i)}
        >
          {option}
        </ChoiceButton>
      ))}
    </div>
  );
}

interface HowFoundDetailStepProps {
  data: { howFound: string; howFoundDetail: string };
  update: (field: "howFoundDetail", value: string) => void;
}

export function HowFoundDetailStep({ data, update }: HowFoundDetailStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        {HOW_FOUND_DETAIL_QUESTIONS[data.howFound]}
      </h2>
      <input
        type="text"
        value={data.howFoundDetail}
        onChange={(e) => update("howFoundDetail", e.target.value)}
        className={FORM_INPUT_CLASS}
        placeholder="Type your answer here..."
        autoFocus
      />
    </div>
  );
}

interface WhyWorkStepProps {
  data: { whyWork: string };
  update: (field: "whyWork", value: string) => void;
}

export function WhyWorkStep({ data, update }: WhyWorkStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        What made you want to work with us?
      </h2>
      <textarea
        value={data.whyWork}
        onChange={(e) => update("whyWork", e.target.value)}
        className={FORM_TEXTAREA_CLASS}
        placeholder="Type your answer here..."
        autoFocus
      />
    </div>
  );
}
