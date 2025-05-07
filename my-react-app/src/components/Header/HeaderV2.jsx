import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./HeaderV2.css";
import Logo from '../Logo/Logo';

const HeaderV2 = ({ className, isLoggedIn = false, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // 1. Remove the auth token from storage
    localStorage.removeItem("authToken");
    
    // 2. Close the dropdown menu
    setIsDropdownOpen(false);
    
    // 3. Notify parent component (if callback provided)
    if (onLogout) onLogout();
    
    // 4. Redirect to login page
    navigate("/login");
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/campaigns", label: "Campaigns" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className={`header-v2 ${isScrolled ? "scrolled" : ""} ${className || ""}`}>
      <div className="header-container-v2">
        <Logo />

        <nav className={`nav-v2 ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-list-v2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link-v2 ${
                    location.pathname === link.path ? "active" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="auth-buttons-v2">
            {isLoggedIn ? (
              <>
                <div className="profile-container" ref={dropdownRef}>
                  <button 
                    className="profile-icon"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    aria-label="Profile menu"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#E6BD17"/>
                      <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#E6BD17"/>
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div className="profile-dropdown">
                      <button className="dropdown-item" onClick={() => navigate("/settings")}>
                        Settings
                      </button>
                      <button className="dropdown-item" onClick={() => navigate("/profile")}>
                        My Profile
                      </button>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  className="login-button-v2"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </button>
                <button
                  className="register-button-v2"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </nav>

        <button
          className={`menu-toggle-v2 ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
        </button>
      </div>
    </header>
  );
};

export default HeaderV2;