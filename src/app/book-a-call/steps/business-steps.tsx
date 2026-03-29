"use client";

import { ChoiceButton } from "@/components/form/choice-button";
import {
  FORM_INPUT_CLASS,
  FORM_TEXTAREA_CLASS,
  FORM_LABEL_CLASS,
} from "@/lib/form-styles";
import {
  BUSINESS_TYPES,
  TEAM_SIZES,
  TEAM_SIZE_BRANCH_QUESTIONS,
  AI_EXPERIENCE,
  AI_BRANCH_QUESTIONS,
} from "@/lib/questions";

interface BusinessStepProps {
  data: { bizName: string; bizWebsite: string };
  update: (field: "bizName" | "bizWebsite", value: string) => void;
}

export function BusinessStep({ data, update }: BusinessStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Tell us about your business.</h2>
      <div>
        <label className={FORM_LABEL_CLASS}>Business name</label>
        <input
          type="text"
          value={data.bizName}
          onChange={(e) => update("bizName", e.target.value)}
          className={FORM_INPUT_CLASS}
          autoFocus
        />
      </div>
      <div>
        <label className={FORM_LABEL_CLASS}>Website URL (optional)</label>
        <input
          type="url"
          value={data.bizWebsite}
          onChange={(e) => update("bizWebsite", e.target.value)}
          className={FORM_INPUT_CLASS}
          placeholder="https://"
        />
      </div>
    </div>
  );
}

interface BusinessTypeStepProps {
  data: { businessType: string };
  update: (field: "businessType", value: string) => void;
  autoAdvance: () => void;
}

export function BusinessTypeStep({
  data,
  update,
  autoAdvance,
}: BusinessTypeStepProps) {
  return (
    <div className="space-y-3">
      <h2 className="mb-4 text-xl font-bold">
        Which best describes your business?
      </h2>
      {BUSINESS_TYPES.map((type, i) => (
        <ChoiceButton
          key={type}
          selected={data.businessType === type}
          onClick={() => {
            update("businessType", type);
            autoAdvance();
          }}
          shortcut={String.fromCharCode(65 + i)}
        >
          {type}
        </ChoiceButton>
      ))}
    </div>
  );
}

interface BusinessTypeOtherStepProps {
  data: { businessTypeOther: string };
  update: (field: "businessTypeOther", value: string) => void;
}

export function BusinessTypeOtherStep({
  data,
  update,
}: BusinessTypeOtherStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Tell us what your business does.</h2>
      <textarea
        value={data.businessTypeOther}
        onChange={(e) => update("businessTypeOther", e.target.value)}
        className={FORM_TEXTAREA_CLASS}
        placeholder="What industry are you in, and what does your business do?"
        autoFocus
      />
    </div>
  );
}

interface TeamSizeStepProps {
  data: { teamSize: string };
  update: (field: "teamSize", value: string) => void;
  autoAdvance: () => void;
}

export function TeamSizeStep({ data, update, autoAdvance }: TeamSizeStepProps) {
  return (
    <div className="space-y-3">
      <h2 className="mb-4 text-xl font-bold">How big is your team?</h2>
      {TEAM_SIZES.map((option, i) => (
        <ChoiceButton
          key={option.key}
          selected={data.teamSize === option.key}
          onClick={() => {
            update("teamSize", option.key);
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

interface TeamSizeBranchStepProps {
  data: { teamSize: string; teamSizeBranch: string };
  update: (field: "teamSizeBranch", value: string) => void;
}

export function TeamSizeBranchStep({
  data,
  update,
}: TeamSizeBranchStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        {TEAM_SIZE_BRANCH_QUESTIONS[data.teamSize]}
      </h2>
      <textarea
        value={data.teamSizeBranch}
        onChange={(e) => update("teamSizeBranch", e.target.value)}
        className={FORM_TEXTAREA_CLASS}
        placeholder="Type your answer here..."
        autoFocus
      />
    </div>
  );
}

interface AiExperienceStepProps {
  data: { aiExperience: string };
  update: (field: "aiExperience", value: string) => void;
  autoAdvance: () => void;
}

export function AiExperienceStep({
  data,
  update,
  autoAdvance,
}: AiExperienceStepProps) {
  return (
    <div className="space-y-3">
      <h2 className="mb-4 text-xl font-bold">
        Have you used AI or automation in your business before?
      </h2>
      {AI_EXPERIENCE.map((option, i) => (
        <ChoiceButton
          key={option.key}
          selected={data.aiExperience === option.key}
          onClick={() => {
            update("aiExperience", option.key);
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

interface AiBranchStepProps {
  data: { aiExperience: string; aiBranch: string };
  update: (field: "aiBranch", value: string) => void;
}

export function AiBranchStep({ data, update }: AiBranchStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        {AI_BRANCH_QUESTIONS[data.aiExperience]}
      </h2>
      <textarea
        value={data.aiBranch}
        onChange={(e) => update("aiBranch", e.target.value)}
        className={FORM_TEXTAREA_CLASS}
        placeholder="Type your answer here..."
        autoFocus
      />
    </div>
  );
}
