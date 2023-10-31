import { useState } from "react";

export function useMultiStepForm(steps) {
  // ********** steps =  array of components *********
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next(i) {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function goTo(index) {
    setCurrentStepIndex(index);
  }
  return {
    currentStepIndex,
    step: steps[currentStepIndex], //this means the component => first-component, second-component etc..
    goTo,
    next,
    back,
    steps,
    isLastStep: currentStepIndex === steps.length - 1,
    isFirstStep: currentStepIndex !== 0,
  };
}
