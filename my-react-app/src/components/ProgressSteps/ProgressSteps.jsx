import React from "react";
import "./ProgressSteps.css";

const ProgressSteps = ({ currentStep }) => {
  return (
    <div className="progress-steps">
      <div className="step-item">
        <div className={`step-number ${currentStep >= 1 ? "active" : ""}`}>
          1
        </div>
        <div className={`step-label ${currentStep >= 1 ? "active" : ""}`}>
          Bank Information
        </div>
      </div>
      <div className="step-line" />
      <div className="step-item">
        <div className={`step-number ${currentStep >= 2 ? "active" : ""}`}>
          2
        </div>
        <div className={`step-label ${currentStep >= 2 ? "active" : ""}`}>
          Campaign Details
        </div>
      </div>
      <div className="step-line" />
      <div className="step-item">
        <div className={`step-number ${currentStep >= 3 ? "active" : ""}`}>
          3
        </div>
        <div className={`step-label ${currentStep >= 3 ? "active" : ""}`}>
          Campaign Preview
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;
