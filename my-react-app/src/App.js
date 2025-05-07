import React, { useEffect, lazy, Suspense, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // Only one HashRouter
import { initScrollAnimations } from "./utils/scrollObserver";
import FullLogo from "./img/logo/FullLogo.svg";
import "./App.css";

// Lazy load pages
const LoginPageV2 = lazy(() => import("./pages/LoginPageV2/LoginPageV2"));
const RegisterPageV2 = lazy(() => import("./pages/RegisterPageV2/RegisterPageV2"));
const LandingPageV2 = lazy(() => import("./pages/LandingPageV2/LandingPageV2"));
const AboutPageV2 = lazy(() => import("./pages/AboutPageV2/AboutPageV2"));
const ContactPageV2 = lazy(() => import("./pages/ContactPageV2/ContactPageV2"));
const BankInfoPageV2 = lazy(() => import("./pages/BankInfoPageV2/BankInfoPageV2"));
const AllCampaignsPageV2 = lazy(() => import("./pages/AllCampaignsPageV2/AllCampaignsPageV2"));
const NewCampaignPageV2 = lazy(() => import("./pages/NewCampaignPageV2/NewCampaignPageV2"));
const CampaignPreviewPageV2 = lazy(() => import("./pages/CampaignPreviewPageV2/CampaignPreviewPageV2"));
const DonatePageV2 = lazy(() => import("./pages/DonatePageV2/DonatePageV2"));
const CampaignPageV2 = lazy(() => import("./pages/CampaignPageV2/CampaignPageV2"));


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    initScrollAnimations();
  }, []);

  return (
    <Router basename="/">
      <Suspense fallback={
        <div className="loading-screen">
          <img src={FullLogo} alt="Loading" className="loading-logo" />
        </div>
      }>
        <Routes>
          <Route path="/" element={<LandingPageV2 isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<LoginPageV2 setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<RegisterPageV2 setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/campaign/new" element={<NewCampaignPageV2 />} />
          <Route path="/campaign/preview" element={<CampaignPreviewPageV2 />} />
          <Route path="/bank-info" element={<BankInfoPageV2 />} />
          <Route path="/campaigns" element={<AllCampaignsPageV2 />} />
          <Route path="/about" element={<AboutPageV2 />} />
          <Route path="/contact" element={<ContactPageV2 />} />
          <Route path="/donate" element={<DonatePageV2 isLoggedIn={isLoggedIn} />} />
          <Route path="/donate/:campaignId" element={<DonatePageV2 isLoggedIn={isLoggedIn} />} />
          <Route path="/campaign/:campaignId" element={<CampaignPageV2 />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
