
import React from "react";
import "./FooterV2.css";
import Logo from "../Logo/Logo";

const FooterV2 = () => {
  return (
    <footer className="footerv2">
      <div className="footerv2__content">
        <div className="footerv2__main">
          <div className="footerv2__info">
            <div className="footerv2__branding">
              <Logo />  {/* Adding the Logo component */}
              <div className="footerv2__gradient-bar"></div>
              <p className="footerv2__motto">
                Empowering change through collective action
              </p>
            </div>

            <div className="footerv2__stats">
              <div className="footerv2__stat">
                <span className="footerv2__stat-number">50K+</span>
                <span className="footerv2__stat-label">Donors</span>
              </div>
              <div className="footerv2__stat">
                <span className="footerv2__stat-number">$2M+</span>
                <span className="footerv2__stat-label">Raised</span>
              </div>
              <div className="footerv2__stat">
                <span className="footerv2__stat-number">100+</span>
                <span className="footerv2__stat-label">Causes</span>
              </div>
            </div>
          </div>

          <div className="footerv2__quick-links">
            <div className="footerv2__links-group">
              <h3>Platform</h3>
              <a href="/how-it-works">How It Works</a>
              <a href="/browse-campaigns">Browse Campaigns</a>
              <a href="/success-stories">Success Stories</a>
              <a href="/start-campaign">Start a Campaign</a>
            </div>

            <div className="footerv2__links-group">
              <h3>Company</h3>
              <a href="/about">About Us</a>
              <a href="/impact">Our Impact</a>
              <a href="/team">Team</a>
              <a href="/careers">Careers</a>
            </div>

            <div className="footerv2__links-group">
              <h3>Support</h3>
              <a href="/help">Help Center</a>
              <a href="/contact">Contact Us</a>
              <a href="/trust">Trust & Safety</a>
              <a href="/faq">FAQs</a>
            </div>
          </div>

          <div className="footerv2__connect">
            <div className="footerv2__newsletter">
              <h3>Stay Connected</h3>
              <p>Join our community and make a difference</p>
              <div className="footerv2__input-group">
                <input type="email" placeholder="Your email address" />
                <button className="footerv2__submit">Join</button>
              </div>
            </div>

            <div className="footerv2__social">
              <a
                href="#"
                className="footerv2__social-btn footerv2__social-btn--twitter"
              >
                Twitter
              </a>
              <a
                href="#"
                className="footerv2__social-btn footerv2__social-btn--instagram"
              >
                Instagram
              </a>
              <a
                href="#"
                className="footerv2__social-btn footerv2__social-btn--linkedin"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="footerv2__bottom">
          <div className="footerv2__legal">
            <span>
              © {new Date().getFullYear()} Altruistic. All rights reserved.
            </span>
            <div className="footerv2__legal-links">
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
              <a href="/accessibility">Accessibility</a>
            </div>
          </div>
          <div className="footerv2__certifications">
            <span className="footerv2__cert-badge">SSL Secure</span>
            <span className="footerv2__cert-badge">PCI Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterV2;
