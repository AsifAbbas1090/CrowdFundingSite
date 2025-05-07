import React from "react";
import "./Logo.css";
import symbolLogo from "../../img/logo/SymbolLogo.svg";

const Logo = React.memo(({ className = "" }) => {
  return (
    <div className={`logo-container ${className}`}>
      <img src={symbolLogo} alt="Symbol" className="logo-symbol" />
      <div className="logo-text-container">
        <span className="logo-text">ALTRUISTIC</span>
        <span className="logo-text">FUNDRAISER</span>
      </div>
    </div>
  );
});

export default Logo;
