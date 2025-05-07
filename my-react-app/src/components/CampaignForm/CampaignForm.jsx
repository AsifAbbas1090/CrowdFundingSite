import React, { useState } from "react";
import ProgressSteps from "../ProgressSteps/ProgressSteps";
import "./CampaignForm.css";

const CampaignForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [goalAmount, setGoalAmount] = useState(initialData.goalAmount || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [headerImage, setHeaderImage] = useState(initialData.headerImage || null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!goalAmount || isNaN(goalAmount) || Number(goalAmount) <= 0) newErrors.goalAmount = "Valid goal amount is required";
    if (!description) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ title, goalAmount, description, headerImage });
  };

  return (
    <div className="campaign-form-container">
      <div className="campaign-form-wrapper">
        <ProgressSteps currentStep={2} />
        <div className="campaign-form-content">
          <h2 className="form-title">Create Your Campaign</h2>
          <form className="campaign-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Campaign Title</label>
              <input
                type="text"
                placeholder="Enter campaign title here"
                className={`form-input ${errors.title ? "error" : ""}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <div className="error-text">{errors.title}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Goal Amount (USD)</label>
              <input
                type="number"
                placeholder="Enter amount in USD $"
                className={`form-input ${errors.goalAmount ? "error" : ""}`}
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
              />
              {errors.goalAmount && <div className="error-text">{errors.goalAmount}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                placeholder="Enter campaign description here max (200 words)"
                className={`form-textarea ${errors.description ? "error" : ""}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && <div className="error-text">{errors.description}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Header picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setHeaderImage(e.target.files[0])}
              />
              {headerImage && <div>Selected file: {headerImage.name}</div>}
            </div>

            <div className="form-actions">
              <button type="submit" className="next-button">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;
