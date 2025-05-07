import React from "react";
import HeaderV2 from "../../components/Header/HeaderV2";
import FooterV2 from "../../components/FooterV2/FooterV2";
import "./ContactPageV2.css";

const ContactPageV2 = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <div className="contact-page-v2">
      <HeaderV2 />
      <main className="contact-content-v2">
        <section className="contact-section-v2">
          <div className="section-header-v2">
            <h2 className="section-title-v2">Let's Start a Conversation</h2>
            <p className="section-subtitle-v2">
              We're here to help and answer any questions you might have
            </p>
          </div>
          <div className="contact-container-v2">
            <div className="contact-grid-v2">
              <div className="contact-info-card">
                <h2 className="card-title-v2">Contact Information</h2>
                <p className="card-subtitle-v2">
                  Choose the most convenient way to reach us
                </p>

                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <div className="info-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M22 12C22 17.5228 17.5228 22 12 22M22 12C22 6.47715 17.5228 2 12 2M22 12H18M12 22C6.47715 22 2 17.5228 2 12M12 22V18M2 12C2 6.47715 6.47715 2 12 2M2 12H6M12 2V6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div className="info-content">
                      <h3>Our Location</h3>
                      <p>123 Charity Street, New York, NY 10001</p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="info-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="info-content">
                      <h3>Email Us</h3>
                      <p>support@altruistic.com</p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="info-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="info-content">
                      <h3>Call Us</h3>
                      <p>+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="social-links">
                    <a href="#" className="social-link">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                    <a href="#" className="social-link">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.957 14.8821 3.28426C14.0247 3.61151 13.2884 4.1942 12.773 4.95352C12.2575 5.71283 11.9877 6.61214 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.3927 23 3Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                    <a href="#" className="social-link">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 2H8C4.68629 2 2 4.68629 2 8V16C2 19.3137 4.68629 22 8 22H16C19.3137 22 22 19.3137 22 16V8C22 4.68629 19.3137 2 16 2Z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-form-card">
                <form className="contact-form-v2" onSubmit={handleSubmit}>
                  <div className="form-row-v2">
                    <div className="form-group-v2">
                      <label htmlFor="firstName" className="form-label-v2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="form-input-v2"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>

                    <div className="form-group-v2">
                      <label htmlFor="lastName" className="form-label-v2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="form-input-v2"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group-v2">
                    <label htmlFor="email" className="form-label-v2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-input-v2"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="form-group-v2">
                    <label htmlFor="subject" className="form-label-v2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="form-input-v2"
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>

                  <div className="form-group-v2">
                    <label htmlFor="message" className="form-label-v2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="form-textarea-v2"
                      placeholder="Write your message here"
                      rows="6"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="submit-button-v2">
                    Send Message
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterV2 />
    </div>
  );
};

export default ContactPageV2;
