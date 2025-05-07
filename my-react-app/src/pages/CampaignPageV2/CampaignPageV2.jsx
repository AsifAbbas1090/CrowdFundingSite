import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderV2 from '../../components/Header/HeaderV2';
import FooterV2 from '../../components/FooterV2/FooterV2';
import './CampaignPageV2.css';

const CampaignPageV2 = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/campaigns/${campaignId}/`);
        if (!response.ok) {
          throw new Error('Campaign not found');
        }
        const data = await response.json();
        setCampaign(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [campaignId]);

  const handleDonateClick = () => {
    navigate(`/donate/${campaignId}`);
  };

  if (loading) {
    return <div className="loading-message">Loading campaign...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!campaign) {
    return <div className="error-message">Campaign not found</div>;
  }

  // Safely access creator information
  const creatorName = campaign.creator?.username || 'Unknown Creator';
  const category = campaign.category || 'General';
  const currentAmount = campaign.current_amount || 0;
  const goalAmount = campaign.goal_amount || 1; // Avoid division by zero
  const progressPercentage = Math.min(Math.round((currentAmount / goalAmount) * 100), 100);

  return (
    <div className="campaign-page-v2">
      <HeaderV2 />
      <main className="campaign-content-v2">
        <div className="campaign-header-v2">
          <div className="campaign-image-container">
            <img 
              src={campaign.header_image || 'https://via.placeholder.com/1200x400?text=Campaign'} 
              alt={campaign.title}
              className="campaign-header-image"
            />
          </div>
          <div className="campaign-header-content">
            <h1 className="campaign-title">{campaign.title}</h1>
            <div className="campaign-meta">
              <span className="campaign-category">{category}</span>
              <span className="campaign-creator">By {creatorName}</span>
            </div>
          </div>
        </div>

        <div className="campaign-body-v2">
          <div className="campaign-main-content">
            <div className="campaign-description">
              <h2>About this campaign</h2>
              <p>{campaign.description}</p>
            </div>

            <div className="campaign-updates">
              <h2>Updates</h2>
              {campaign.updates?.length > 0 ? (
                campaign.updates.map(update => (
                  <div key={update.id} className="update-card">
                    <h3>{update.title}</h3>
                    <p>{update.content}</p>
                    <span className="update-date">
                      {new Date(update.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p>No updates yet</p>
              )}
            </div>
          </div>

          <div className="campaign-sidebar">
            <div className="donation-card">
              <div className="progress-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="progress-stats">
                  <span>${currentAmount.toLocaleString()} raised</span>
                  <span>{progressPercentage}%</span>
                </div>
                <div className="goal-amount">
                  <span>Goal: ${goalAmount.toLocaleString()}</span>
                </div>
              </div>
              <button 
                className="donate-button"
                onClick={handleDonateClick}
              >
                Donate Now
              </button>
            </div>

            <div className="campaign-stats">
              <div className="stat-item">
                <span className="stat-value">{campaign.donations_count || 0}</span>
                <span className="stat-label">Donations</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{campaign.days_remaining || 0}</span>
                <span className="stat-label">Days Left</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterV2 />
    </div>
  );
};

export default CampaignPageV2;