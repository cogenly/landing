/**
 * Creates flow navigation helpers (getNextStep, getPrevStep) for a multi-step
 * form given an ordered list of steps and a skip predicate.
 */
export function createFlowNavigation<T extends string>(
  steps: T[],
  shouldSkip: (step: T) => boolean
) {
  return {
    getNextStep(current: T): T {
      const idx = steps.indexOf(current);
      for (let i = idx + 1; i < steps.length; i++) {
        if (!shouldSkip(steps[i])) return steps[i];
      }
      return steps[steps.length - 1];
    },

    getPrevStep(current: T): T | null {
      const idx = steps.indexOf(current);
      for (let i = idx - 1; i >= 0; i--) {
        if (!shouldSkip(steps[i])) return steps[i];
      }
      return null;
    },
  };
}
