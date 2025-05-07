import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderV2 from "../../components/Header/HeaderV2";
import FooterV2 from "../../components/FooterV2/FooterV2";
import ProgressSteps from "../../components/ProgressSteps/ProgressSteps";
import "./CampaignPreviewPageV2.css";

const CampaignPreviewPageV2 = ({ 
  campaignData, 
  onEdit, 
  onSubmit, 
  loading 
}) => {
  const navigate = useNavigate();

  return (
    <div className="preview-page-v2">
      <HeaderV2 />
      <main className="preview-content-v2">
        <div className="preview-container-v2">
          <ProgressSteps currentStep={3} />

          <div className="preview-header-v2">
            <h1 className="preview-title-v2">Campaign Preview</h1>
            <p className="preview-subtitle-v2">
              Review your campaign before publishing
            </p>
          </div>

          <div className="preview-card">
            <div className="preview-image-container">
              <img
                src={campaignData.headerImage || "https://via.placeholder.com/800x400?text=Campaign+Image"}
                alt={campaignData.title}
                className="preview-image-v2"
              />
              <div className="preview-category-badge">
                {campaignData.category || "General"}
              </div>
            </div>

            <div className="preview-details-v2">
              <h2 className="campaign-title-v2">{campaignData.title}</h2>

              <div className="campaign-stats-v2">
                <div className="stat-item">
                  <span className="stat-label">Goal</span>
                  <span className="stat-value">
                    ${campaignData.goal.toLocaleString()}
                  </span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-label">Status</span>
                  <span className="stat-value">
                    {campaignData.isPublished ? "Published" : "Not Published"}
                  </span>
                </div>
              </div>

              <div className="campaign-description-v2">
                <h3 className="section-title-v2">Campaign Description</h3>
                <p className="description-text">{campaignData.description}</p>
              </div>

              <div className="preview-actions-v2">
                <button
                  className="secondary-button-v2"
                  onClick={onEdit}
                >
                  Edit Campaign
                </button>
                <button
                  className="primary-button-v2"
                  onClick={onSubmit}
                  disabled={loading}
                >
                  {loading ? "Publishing..." : "Publish Campaign"}
                  {!loading && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterV2 />
    </div>
  );
};

export default CampaignPreviewPageV2;