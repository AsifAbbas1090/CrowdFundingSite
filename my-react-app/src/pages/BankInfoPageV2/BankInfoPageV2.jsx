import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderV2 from "../../components/Header/HeaderV2";
import FooterV2 from "../../components/FooterV2/FooterV2";
import ProgressSteps from "../../components/ProgressSteps/ProgressSteps";
import BankForm from "../../components/BankForm/BankForm";
import "./BankInfoPageV2.css";

const BankInfoPageV2 = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    // After successful submission, navigate to new campaign page
    navigate("/campaign/new");
  };

  return (
    <div className="bank-info-page-v2">
      <HeaderV2 />
      <main className="bank-info-content-v2">
        <div className="bank-info-container-v2">
          <ProgressSteps currentStep={1} />

          <div className="bank-info-card">
            <div className="bank-info-header-v2">
              <h1 className="bank-info-title-v2">Bank Information</h1>
              <p className="bank-info-subtitle-v2">
                Please provide your bank details for receiving donations
              </p>
            </div>

            <BankForm onSubmit={handleSubmit} />

          </div>
        </div>
      </main>
      <FooterV2 />
    </div>
  );
};

export default BankInfoPageV2;
