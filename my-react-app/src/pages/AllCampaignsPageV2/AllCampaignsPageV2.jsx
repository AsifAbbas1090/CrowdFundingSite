import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderV2 from "../../components/Header/HeaderV2";
import FooterV2 from "../../components/FooterV2/FooterV2";
import "./AllCampaignsPageV2.css";

// Local fallback image as data URI (no external dependency)
const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f0f0f0'/%3E%3Ctext x='150' y='100' font-family='Arial' font-size='16' text-anchor='middle' fill='%23666'%3ECampaign Image%3C/text%3E%3C/svg%3E";

const AllCampaignsPageV2 = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 6;

  // API endpoints configuration
  const apiConfig = {
    baseUrl: "http://127.0.0.1:8000",
    mediaUrl: "http://127.0.0.1:8000/media/campaign_headers/",
    userEndpoint: "/api/user/",
    campaignsEndpoint: "/api/campaigns/"
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setUser(null);
        setUserLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiConfig.baseUrl}${apiConfig.userEndpoint}`, {
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

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(`${apiConfig.baseUrl}${apiConfig.campaignsEndpoint}`);
        if (!response.ok) throw new Error("Failed to fetch campaigns");
        const data = await response.json();
        setCampaigns(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleCreateCampaign = () => {
    if (!user) {
      navigate("/login", { state: { from: "/campaign/new" } });
    } else if (!user.is_verified) {
      alert("Please verify your email to create a campaign");
    } else {
      navigate("/campaign/new");
    }
  };

  const handleCampaignClick = (campaignId) => {
    const campaignExists = campaigns.some(campaign => campaign.id === campaignId);
    if (campaignExists) {
      navigate(`/campaign/${campaignId}`);
    } else {
      setError("Campaign not found");
    }
  };

  const handleDonateClick = (e, campaignId) => {
    e.stopPropagation();
    navigate(`/donate/${campaignId}`);
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || campaign.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = filteredCampaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);
  const totalPages = Math.ceil(filteredCampaigns.length / campaignsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const categories = ["All", ...new Set(campaigns.map(campaign => campaign.category))];

  // Helper function to get campaign image URL
  const getCampaignImage = (imagePath) => {
    if (!imagePath) return fallbackImage;
    return `${apiConfig.mediaUrl}${imagePath}`;
  };

  return (
    <div className="campaigns-page-v2">
      <HeaderV2 isLoggedIn={!!user} />
      <main className="campaigns-content-v2">
        <div className="campaigns-header-v2">
          <div className="campaigns-header-content">
            <h1 className="campaigns-title-v2">Active Campaigns</h1>
            <p className="campaigns-subtitle-v2">
              Browse and support meaningful causes
            </p>
          </div>
          <button
            className="create-campaign-button-v2"
            onClick={handleCreateCampaign}
            disabled={userLoading}
          >
            {userLoading ? "Loading..." : "Create Campaign"}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="campaigns-filters-v2">
          <div className="search-bar-v2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search campaigns..."
              className="search-input-v2"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="filter-buttons-v2">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-button-v2 ${category === categoryFilter ? 'active' : ''}`}
                onClick={() => {
                  setCategoryFilter(category);
                  setCurrentPage(1);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="loading-message">Loading campaigns...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : currentCampaigns.length === 0 ? (
          <div className="no-results-message">
            {searchTerm || categoryFilter !== "All" 
              ? "No campaigns match your search criteria" 
              : "No campaigns available"}
          </div>
        ) : (
          <>
            <div className="campaigns-grid-v2">
              {currentCampaigns.map((campaign) => (
                <div 
                  key={campaign.id} 
                  className="campaign-card-v2"
                  onClick={() => handleCampaignClick(campaign.id)}
                >
                  <div className="campaign-image-wrapper">
                    <img
                      src={getCampaignImage(campaign.header_image)}
                      alt={campaign.title}
                      className="campaign-image-v2"
                      onError={(e) => {
                        e.target.src = fallbackImage;
                        console.error("Failed to load campaign image:", campaign.header_image);
                      }}
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
                          style={{ 
                            width: `${Math.min((campaign.current_amount / campaign.goal_amount) * 100, 100)}%` 
                          }}
                        ></div>
                      </div>
                      <div className="progress-stats">
                        <span>${campaign.current_amount.toLocaleString()} raised</span>
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
              ))}
            </div>

            {totalPages > 1 && (
              <div className="campaigns-pagination-v2">
                <button 
                  className="pagination-button-v2"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className="pagination-numbers">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        className={`page-number ${pageNum === currentPage ? 'active' : ''}`}
                        onClick={() => paginate(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span>...</span>
                      <button
                        className={`page-number ${totalPages === currentPage ? 'active' : ''}`}
                        onClick={() => paginate(totalPages)}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>
                <button 
                  className="pagination-button-v2"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 6L15 12L9 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <FooterV2 />
    </div>
  );
};

export default AllCampaignsPageV2;