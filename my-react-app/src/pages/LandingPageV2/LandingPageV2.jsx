import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeaderV2 from "../../components/Header/HeaderV2";
import FooterV2 from "../../components/FooterV2/FooterV2";
import "./LandingPageV2.css";

// Import videos
import video1 from "../../videos/video1.mp4";
import video2 from "../../videos/video2.mp4";
import video3 from "../../videos/video3.mp4";
import video4 from "../../videos/video4.mp4";

const LandingPageV2 = () => {
  const navigate = useNavigate();
  const [currentVideo, setCurrentVideo] = useState(video1);
  const [videoIndex, setVideoIndex] = useState(0);
  const videos = [video1, video2, video3, video4];
  const videoRef = useRef(null);

  // Authentication state
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setUser(null);
        setUserLoading(false);
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/user/", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user: ${response.status}`);
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error("User fetch error:", err.message);
        setUser(null);
        localStorage.removeItem("authToken");
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Fetch campaigns
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/campaigns/");
        if (!response.ok) throw new Error("Failed to fetch campaigns");
        const data = await response.json();
        setCampaigns(data);
      } catch (err) {
        setError("Could not load campaigns. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  // Video rotation logic
  useEffect(() => {
    const handleVideoEnd = () => {
      const nextIndex = (videoIndex + 1) % videos.length;
      setVideoIndex(nextIndex);
      setCurrentVideo(videos[nextIndex]);
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('ended', handleVideoEnd);
      videoRef.current.play().catch(e => console.error('Video play error:', e));
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, [videoIndex, videos]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.error('Video play error:', e));
    }
  }, [currentVideo]);

  const handleCreateCampaign = () => {
    if (userLoading) return;
    if (!user) {
      navigate("/login");
    } else if (!user.is_verified) {
      alert("Please verify your email to create a campaign");
    } else {
      navigate("/campaign/new");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/");
  };

  const handleCampaignClick = (campaignId) => {
    navigate(`/campaign/${campaignId}`);
  };

  const handleDonateClick = (e, campaignId) => {
    e.stopPropagation();
    if (userLoading) return;
    if (!user) {
      navigate("/login", { state: { from: `/donate/${campaignId}` } });
    } else {
      navigate(`/donate/${campaignId}`);
    }
  };

  return (
    <div className="landing-page-v2">
      <HeaderV2 
        className="transparent" 
        isLandingPage={true} 
        isLoggedIn={!!user}
        onLogout={handleLogout}
      />
      
      <main className="landing-main-v2">
        <section className="landing-hero-section-v2">
          <video
            ref={videoRef}
            className="landing-hero-video-v2"
            autoPlay
            muted
            playsInline
            onError={(e) => console.error('Video error:', e.target.error)}
            key={currentVideo}
          >
            <source src={currentVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <div className="landing-hero-content-v2">
            <h1 className="landing-hero-title-v2">
              Make a Difference <br />
              <span className="highlight">One Donation</span> at a Time
            </h1>
            <p className="landing-hero-subtitle-v2">
              Join thousands of people making positive change through our
              trusted fundraising platform
            </p>
            <div className="landing-hero-cta-v2">
              <button
                className="primary-button-v2"
                onClick={handleCreateCampaign}
              >
                {userLoading ? "Loading..." : user ? "Start Fundraising" : "Get Started"}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                className="secondary-button-v2"
                onClick={() => navigate("/campaigns")}
              >
                Explore Campaigns
              </button>
            </div>
          </div>
        </section>

        <section className="featured-section-v2">
          <div className="section-header-v2">
            <h2 className="section-title-v2">Featured Campaigns</h2>
            <p className="section-subtitle-v2">Support causes that matter</p>
          </div>

          <div className="campaign-grid-v2">
            {loading ? (
              <p>Loading campaigns...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : campaigns.length === 0 ? (
              <p>No campaigns available</p>
            ) : (
              campaigns.slice(0, 3).map((campaign) => (
                <div 
                  key={campaign.id} 
                  className="campaign-card-v2"
                  onClick={() => handleCampaignClick(campaign.id)}
                >
                  <div className="campaign-image-wrapper">
                    <img
                      src={campaign.image || "https://cdn.builder.io/api/v1/image/assets/TEMP/c5a6527053345187cfce0160e42b184731ea1b5e"}
                      alt={campaign.title}
                      className="campaign-image-v2"
                    />
                    <div className="campaign-category">{campaign.category || "General"}</div>
                  </div>
                  <div className="campaign-content-v2">
                    <h3 className="campaign-title-v2">{campaign.title}</h3>
                    <p className="campaign-description-v2">
                      {campaign.description.length > 100 
                        ? `${campaign.description.substring(0, 100)}...` 
                        : campaign.description}
                    </p>
                    <div className="campaign-progress-v2">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${(campaign.current_amount / campaign.goal_amount) * 100}%` }}
                        ></div>
                      </div>
                      <div className="progress-stats">
                        <span>${campaign.current_amount} raised</span>
                        <span>{Math.round((campaign.current_amount / campaign.goal_amount) * 100)}%</span>
                      </div>
                    </div>
                    <button 
                      className="donate-button-v2"
                      onClick={(e) => handleDonateClick(e, campaign.id)}
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            className="view-all-button-v2"
            onClick={() => navigate("/campaigns")}
          >
            View All Campaigns
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </section>

        <section className="impact-section-v2">
          <div className="impact-content-v2">
            <h2 className="impact-title-v2">Our Global Impact</h2>
            <p className="impact-description-v2">
              Together we've helped thousands of causes reach their goals
            </p>
            <div className="impact-grid-v2">
              <div className="impact-card-v2">
                <span className="impact-number-v2">150+</span>
                <span className="impact-label-v2">Countries Reached</span>
              </div>
              <div className="impact-card-v2">
                <span className="impact-number-v2">$5M+</span>
                <span className="impact-label-v2">Total Donations</span>
              </div>
              <div className="impact-card-v2">
                <span className="impact-number-v2">20K+</span>
                <span className="impact-label-v2">Active Campaigns</span>
              </div>
              <div className="impact-card-v2">
                <span className="impact-number-v2">100K+</span>
                <span className="impact-label-v2">Lives Impacted</span>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section-v2">
          <div className="cta-content-v2">
            <h2 className="cta-title-v2">Ready to Make a Difference?</h2>
            <p className="cta-description-v2">
              Start your fundraising journey today and create lasting change
            </p>
            <div className="cta-buttons-v2">
              <button
                className="primary-button-v2"
                onClick={() => navigate("/register")}
              >
                Start Fundraising
              </button>
              <button
                className="secondary-button-v2"
                onClick={() => navigate("/about")}
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        <section className="partners-section-v2">
          <h3 className="partners-title-v2">
            Trusted by World-Class Organizations
          </h3>
          <div className="partners-grid-v2">
            <img
              src={require("../../img/logo/stripe-logo.png").default}
              alt="Stripe logo"
              className="partner-logo-v2"
            />
            <img
              src={require("../../img/logo/google-logo.png").default}
              alt="Google logo"
              className="partner-logo-v2"
            />
          </div>
        </section>
      </main>
      <FooterV2 />
    </div>
  );
};

export default LandingPageV2;
