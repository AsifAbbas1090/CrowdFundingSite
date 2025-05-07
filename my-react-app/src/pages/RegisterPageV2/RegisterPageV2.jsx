import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderV2 from "../../components/Header/HeaderV2";
import FooterV2 from "../../components/FooterV2/FooterV2";
import "./RegisterPageV2.css";

const RegisterPageV2 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    agreementChecked: false,
    disclaimerChecked: false,
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    // Validate checkboxes
    if (!formData.agreementChecked || !formData.disclaimerChecked) {
      setError("Please accept both the Agreement and Disclaimer");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Registration failed!");

      setMessage("Registration successful! Please check your email to verify your account.");
      
      // Reset form
      setFormData({
        full_name: "",
        email: "",
        password: "",
        phone: "",
        agreementChecked: false,
        disclaimerChecked: false,
      });

      // Optionally redirect after delay
      setTimeout(() => navigate("/login"), 3000);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page-v2">
      <HeaderV2 />
      <main className="register-content-v2">
        <div className="register-container-v2">
          <div className="register-card">
            <div className="register-header-v2">
              <h1 className="register-title-v2">Create Account</h1>
              <p className="register-subtitle-v2">
                Join us in making a difference today
              </p>
            </div>

            {message && (
              <div className="success-message-v2">
                {message}
              </div>
            )}

            {error && (
              <div className="error-message-v2">
                {error}
              </div>
            )}

            <form className="register-form-v2" onSubmit={handleSubmit}>
              <div className="form-group-v2">
                <label htmlFor="full_name" className="form-label-v2">
                  Full Name
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    className="form-input-v2"
                    placeholder="Enter your full name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group-v2">
                <label htmlFor="email" className="form-label-v2">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input-v2"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group-v2">
                <label htmlFor="password" className="form-label-v2">
                  Password
                </label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-input-v2"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group-v2">
                <label htmlFor="phone" className="form-label-v2">
                  Phone Number
                </label>
                <div className="input-wrapper">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input-v2"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-checkboxes-v2">
                <label className="checkbox-label-v2">
                  <input
                    type="checkbox"
                    name="agreementChecked"
                    checked={formData.agreementChecked}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="checkbox-input-v2"
                  />
                  <span>I agree to the Terms of Service</span>
                </label>

                <label className="checkbox-label-v2">
                  <input
                    type="checkbox"
                    name="disclaimerChecked"
                    checked={formData.disclaimerChecked}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="checkbox-input-v2"
                  />
                  <span>I accept the Privacy Policy</span>
                </label>
              </div>

              <button 
                type="submit" 
                className="register-button-v2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <div className="divider">
                <span className="divider-line"></span>
                <span className="divider-text">or</span>
                <span className="divider-line"></span>
              </div>

              <button 
                type="button" 
                className="social-sign-in-v2"
                disabled={loading}
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/616595b680dabecf0a9a2105b2afd89c28c69d4e"
                  alt="Google"
                  className="social-icon"
                />
                Continue with Google
              </button>

              {/* Removed the Continue with Facebook button */}
            </form>

            <div className="login-prompt-v2">
              <span>Already have an account?</span>
              <button
                type="button"
                className="login-link-v2"
                onClick={() => navigate("/login")}
                disabled={loading}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </main>
      <FooterV2 />
    </div>
  );
};

export default RegisterPageV2;