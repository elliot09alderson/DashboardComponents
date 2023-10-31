import React from "react";
import { useMultiStepForm } from "./Hook/useMultiStepForm";
import PersonalDetails from "../FormComponents/PersonalDetails";
import CompanyInfo from "../FormComponents/CompanyInfo";
import BusinessInfo from "../FormComponents/BusinessInfo";

// ********** <This is Main Form Element/>  Read the Hook Page for more info******************

const MultiStepForm = () => {
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    // **************** Import form pages here inside the array ... *************
    useMultiStepForm([<PersonalDetails />, <CompanyInfo />, <BusinessInfo />]);
  return (
    <div className="relative bg-white border border-black p-8 rounded-lg  m-4">
      {/* On submit of form it will check for validations then  saves the state then increment the page */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
      >
        <div className="absolute top-2 right-2">
          {currentStepIndex + 1}/{steps.length}
        </div>
        {step}
        <div className="mt-10 flex justify-end ">
          {/* On Click of form it will move back  decrement increment the page */}
          {isFirstStep && (
            <button type="submit" onClick={back}>
              Back
            </button>
          )}
          <button type="sumbit">{isLastStep ? "Finsh" : "Next"}</button>
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
