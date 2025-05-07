import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderV2 from "../../components/Header/HeaderV2";
import FooterV2 from "../../components/FooterV2/FooterV2";
import "./LoginPageV2.css";

const LoginPageV2 = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token and user data
      if (rememberMe) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user));
      } 
      else 
      {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user));
      }

      setIsLoggedIn(true);
      navigate("/");

    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-v2">
      <HeaderV2 />
      <main className="login-content-v2">
        <div className="login-container-v2">
          <div className="login-card">
            <div className="login-header-v2">
              <h1 className="login-title-v2">Welcome Back</h1>
              <p className="login-subtitle-v2">
                Sign in to continue your journey of giving
              </p>
            </div>

            <form className="login-form-v2" onSubmit={handleSubmit}>
              {error && <div className="error-message-v2">{error}</div>}

              <div className="form-group-v2">
                <label htmlFor="email" className="form-label-v2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input-v2"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group-v2">
                <label htmlFor="password" className="form-label-v2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-input-v2"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-options-v2">
                <label className="remember-me-v2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <button 
                  type="button" 
                  className="forgot-password-v2"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </button>
              </div>

              <button 
                type="submit" 
                className="sign-in-button-v2"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <div className="divider">
                <span className="divider-line"></span>
                <span className="divider-text">or</span>
                <span className="divider-line"></span>
              </div>

              <button type="button" className="social-sign-in-v2">
                <img
                  src="/google-icon.png"
                  alt="Google"
                  className="social-icon"
                />
                Continue with Google
              </button>
            </form>

            <div className="signup-prompt-v2">
              <span>Don't have an account?</span>
              <button
                type="button"
                className="signup-link-v2"
                onClick={() => navigate("/register")}
              >
                Sign up now
              </button>
            </div>
          </div>
        </div>
      </main>
      <FooterV2 />
    </div>
  );
};

export default LoginPageV2;