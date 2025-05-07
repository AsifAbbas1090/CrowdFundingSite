import React from "react";
import HeaderV2 from "../../components/Header/HeaderV2";
import FooterV2 from "../../components/FooterV2/FooterV2";
import "./AboutPageV2.css";

const AboutPageV2 = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/founder.jpg",
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/operations.jpg",
    },
    {
      name: "Emily Rodriguez",
      role: "Community Manager",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/community.jpg",
    },
  ];

  return (
    <div className="about-page-v2">
      <HeaderV2 />
      <main className="about-content-v2">
        <section className="about-us-section-v2">
          <div className="section-header-v2">
            <h2 className="section-title-v2">About Our Organization</h2>
            <p className="section-subtitle-v2">
              Connecting compassion with causes that matter
            </p>
          </div>

          <div className="about-us-content-v2">
            <p className="about-us-text-v2">
              Founded in 2015, we are a passionate team dedicated to creating a platform where generosity meets impact. Our journey began with a simple idea: to make charitable giving more accessible, transparent, and effective for everyone.
            </p>
            
            <div className="about-us-highlights-v2">
              <div className="highlight-card-v2">
                <div className="highlight-icon-v2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Our Purpose</h3>
                <p>To bridge the gap between donors and causes, ensuring every contribution creates meaningful change.</p>
              </div>

              <div className="highlight-card-v2">
                <div className="highlight-icon-v2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Our Approach</h3>
                <p>We combine technology with human insight to identify and support the most effective initiatives.</p>
              </div>
            </div>

            <p className="about-us-text-v2">
              Over the years, we've built a trusted community of over 10,000 donors supporting 500+ campaigns across various causes. Our platform has facilitated more than $2 million in donations, directly impacting communities worldwide.
            </p>
          </div>
        </section>

        <section className="mission-section-v2">
          <div className="section-header-v2">
            <h2 className="section-title-v2">Our Mission</h2>
            <p className="section-subtitle-v2">
              Building bridges between generosity and impact
            </p>
          </div>

          <div className="mission-grid-v2">
            <div className="mission-card-v2">
              <div className="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 16V12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8H12.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="card-title-v2">Transparency</h3>
              <p className="card-text-v2">
                We believe in complete transparency in all our operations and
                fund management, ensuring every donation is tracked and
                accounted for.
              </p>
            </div>

            <div className="mission-card-v2">
              <div className="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="card-title-v2">Impact</h3>
              <p className="card-text-v2">
                We measure and report the real-world impact of every campaign,
                showing donors exactly how their contributions make a
                difference.
              </p>
            </div>

            <div className="mission-card-v2">
              <div className="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="card-title-v2">Community</h3>
              <p className="card-text-v2">
                We foster a vibrant community of donors and campaigners, united
                by the shared goal of creating positive change in the world.
              </p>
            </div>
          </div>
        </section>

        <section className="team-section-v2">
          <div className="section-header-v2">
            <h2 className="section-title-v2">Meet Our Team</h2>
            <p className="section-subtitle-v2">
              The passionate people behind our mission
            </p>
          </div>

          <div className="team-grid-v2">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card-v2">
                <div className="member-image-wrapper">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="member-image"
                  />
                </div>
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section-v2">
          <div className="cta-content-v2">
            <h2 className="cta-title-v2">Ready to Make a Difference?</h2>
            <p className="cta-description-v2">
              Join our community of changemakers and start your giving journey
              today.
            </p>
            <div className="cta-buttons-v2">
              <button className="primary-button-v2">Start Fundraising</button>
              <button className="secondary-button-v2">Explore Campaigns</button>
            </div>
          </div>
        </section>
      </main>
      <FooterV2 />
    </div>
  );
};

export default AboutPageV2;
