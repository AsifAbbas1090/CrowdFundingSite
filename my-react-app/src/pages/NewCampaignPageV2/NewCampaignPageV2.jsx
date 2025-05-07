import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderV2 from "../../components/Header/HeaderV2";
import FooterV2 from "../../components/FooterV2/FooterV2";
import ProgressSteps from "../../components/ProgressSteps/ProgressSteps";
import CampaignPreviewPageV2 from "../CampaignPreviewPageV2/CampaignPreviewPageV2";
import CampaignForm from "../../components/CampaignForm/CampaignForm";
import "./NewCampaignPageV2.css";

const NewCampaignPageV2 = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [reviewMode, setReviewMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [campaignData, setCampaignData] = useState({
    title: "",
    description: "",
    goalAmount: 500,
    headerImage: null,
    isPublished: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://127.0.0.1:8000/api/user/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unauthorized");
        return response.json();
      })
      .then((data) => setUser(data))
      .catch(() => navigate("/login"));
  }, [navigate]);

  const handleReview = (data) => {
    // Basic validation
    if (!data.title || !data.description || data.goalAmount < 50) {
      setError("Please fill all required fields (minimum goal amount is $50)");
      return;
    }
    setCampaignData(data);
    setReviewMode(true);
    setError(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("authToken");
    const formData = new FormData();
    formData.append("title", campaignData.title);
    formData.append("description", campaignData.description);
    formData.append("goal_amount", campaignData.goalAmount);
    formData.append("is_published", campaignData.isPublished);
    if (campaignData.headerImage) formData.append("header_image", campaignData.headerImage);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/api/campaigns/create/", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create campaign");
      }

      alert("Campaign created successfully!");
      navigate("/campaigns");
    } catch (err) {
      console.error("Error creating campaign:", err);
      setError(err.message || "An error occurred while creating your campaign");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="new-campaign-page-v2">
        <HeaderV2 />
        <main className="new-campaign-content-v2">
          <p>Loading...</p>
        </main>
        <FooterV2 />
      </div>
    );
  }

  if (reviewMode) {
    return (
      <CampaignPreviewPageV2
        campaignData={{
          title: campaignData.title,
          description: campaignData.description,
          goal: campaignData.goalAmount,
          headerImage: campaignData.headerImage ? URL.createObjectURL(campaignData.headerImage) : null,
          isPublished: campaignData.isPublished,
        }}
        onEdit={() => setReviewMode(false)}
        onSubmit={handleSubmit}
        loading={loading}
      />
    );
  }

  return (
    <div className="new-campaign-page-v2">
      <HeaderV2 />
      <main className="new-campaign-content-v2">
        <div className="new-campaign-container-v2">
          <ProgressSteps currentStep={1} steps={["Details", "Preview"]} />

          <div className="new-campaign-card">
            {!user.is_verified ? (
              <div className="alert alert-warning">
                You must verify your email before creating a campaign.
              </div>
            ) : (
              <>
                <div className="new-campaign-header-v2">
                  <h1 className="new-campaign-title-v2">Create Campaign</h1>
                  <p className="new-campaign-subtitle-v2">
                    Tell us about your fundraising campaign
                  </p>
                </div>

                <CampaignForm onSubmit={handleReview} initialData={campaignData} />

              </>
            )}
          </div>
        </div>
      </main>
      <FooterV2 />
    </div>
  );
};

export default NewCampaignPageV2;
