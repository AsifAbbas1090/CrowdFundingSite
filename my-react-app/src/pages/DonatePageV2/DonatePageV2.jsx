import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Added useParams
import HeaderV2 from "../../components/Header/HeaderV2";
import FooterV2 from "../../components/FooterV2/FooterV2";
import "./DonatePageV2.css";

const DonatePageV2Updated = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const { campaignId } = useParams(); // Get campaignId from URL
  const [donationAmount, setDonationAmount] = useState(""); // Updated state variable
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create donation instance
      const donationResponse = await fetch("http://localhost:8000/api/create-donation/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: donationAmount,
          donor_name: isAnonymous ? "Anonymous" : donorName,
          email,
          is_anonymous: isAnonymous,
          campaign_id: campaignId
        }),
      });

      if (!donationResponse.ok) {
        throw new Error("Failed to create donation");
      }

      // Step 2: Redirect to Stripe Checkout
      const stripeResponse = await fetch("http://localhost:8000/api/stripe-checkout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          amount: donationAmount, 
          campaign_id: campaignId 
        }),
      });

      const stripeData = await stripeResponse.json();
      if (!stripeResponse.ok || !stripeData.url) {
        throw new Error("Payment processing failed");
      }

      window.location.href = stripeData.url;
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="donate-page-v2">
      <HeaderV2 isLoggedIn={isLoggedIn} />
      <main className="donate-main-v2">
        <section className="donate-form-section-v2">
          <h1 className="donate-title-v2">Make a Donation</h1>
          <form onSubmit={handleSubmit} className="donate-form-v2">
            {/* Donor Name */}
            <div className="form-group-v2">
              <label>Your Name</label>
<input
  type="text"
  placeholder="Enter your name"
  value={donorName}
  onChange={(e) => setDonorName(e.target.value)}
  disabled={isAnonymous}
  required={!isAnonymous}
  className="custom-amount-v2"
/>
            </div>

            {/* Email */}
            <div className="form-group-v2">
              <label>Email Address</label>
<input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  className="custom-amount-v2"
/>
            </div>

            {/* Donation Amount */}
            <div className="form-group-v2">
              <label>Donation Amount ($)</label>
              <div className="amount-options-v2">
                {[10, 25, 50, 100].map((amount) => (
                  <button
                    type="button"
                    key={amount}
                    className={`amount-option-v2 ${donationAmount === amount ? "selected" : ""}`}
                    onClick={() => setDonationAmount(amount)}
                  >
                    ${amount}
                  </button>
                ))}
                <input
                  type="number"
                  min="1"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(Number(e.target.value))}
                  className="custom-amount-v2"
                  placeholder="Other amount"
                />
              </div>
            </div>

            {/* Anonymous Donation */}
            <div className="form-group-v2">
              <label className="anonymous-checkbox-v2">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                Make this donation anonymously
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="submit-donation-v2"
              disabled={loading}
            >
              {loading ? "Processing..." : "Donate Now"}
            </button>
          </form>
        </section>
      </main>
      <FooterV2 />
    </div>
  );
};

export default DonatePageV2Updated;
