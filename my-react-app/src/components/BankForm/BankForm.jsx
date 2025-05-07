import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BankForm.css";

const BankForm = () => {
  const navigate = useNavigate();
  const [bankDetails, setBankDetails] = useState({
    country: "",
    bankName: "",
    accountNumber: "",
    routingNumber: "",
  });

  const [errors, setErrors] = useState({
    bankName: "",
    accountNumber: "",
    routingNumber: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      bankName: "",
      accountNumber: "",
      routingNumber: "",
    };

    if (!bankDetails.bankName) {
      newErrors.bankName = "Bank name is required";
      isValid = false;
    }

    if (!bankDetails.accountNumber) {
      newErrors.accountNumber = "Account number is required";
      isValid = false;
    } else if (!/^\d{16}$/.test(bankDetails.accountNumber)) {
      newErrors.accountNumber = "Account number must be 16 digits";
      isValid = false;
    }

    if (!bankDetails.routingNumber) {
      newErrors.routingNumber = "Routing number is required";
      isValid = false;
    } else if (!/^\d{9}$/.test(bankDetails.routingNumber)) {
      newErrors.routingNumber = "Routing number must be 9 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://127.0.0.1:8000/api/bankinfo/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(bankDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit bank info");
      }

      // On success, navigate to next page or show success message
      navigate("/campaign/new");
    } catch (error) {
      console.error("Error submitting bank info:", error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setBankDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bank-form-container">
      <div className="bank-form-content">
        <div className="country-select-wrapper">
          <select
            aria-label="Select country"
            value={bankDetails.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
            className="country-select"
          >
            <option value="">Choose a country</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
          </select>
        </div>

        <div className="form-fields">
          <div className="form-group">
            <div className="field-label">Bank Name</div>
            <input
              type="text"
              placeholder="Enter bank name"
              aria-label="Bank name"
              value={bankDetails.bankName}
              aria-invalid={!!errors.bankName}
              onChange={(e) => handleInputChange("bankName", e.target.value)}
              className={`form-input ${errors.bankName ? "error" : ""}`}
            />
            {errors.bankName && (
              <div className="error-message">{errors.bankName}</div>
            )}
          </div>

          <div className="form-group">
            <div className="field-label">Account Number</div>
            <input
              type="text"
              placeholder="Enter account number"
              aria-label="Account number"
              value={bankDetails.accountNumber}
              maxLength={16}
              aria-invalid={!!errors.accountNumber}
              onChange={(e) =>
                handleInputChange(
                  "accountNumber",
                  e.target.value.replace(/\D/g, "")
                )
              }
              className={`form-input ${errors.accountNumber ? "error" : ""}`}
            />
            {errors.accountNumber && (
              <div className="error-message">{errors.accountNumber}</div>
            )}
            <div className="field-hint">
              Account number is typically a 16-digit number
            </div>
          </div>

          <div className="form-group">
            <div className="field-label">Routing Number (if applicable)</div>
            <input
              type="text"
              placeholder="Enter routing number"
              aria-label="Routing number"
              value={bankDetails.routingNumber}
              maxLength={9}
              aria-invalid={!!errors.routingNumber}
              onChange={(e) =>
                handleInputChange(
                  "routingNumber",
                  e.target.value.replace(/\D/g, "")
                )
              }
              className={`form-input ${errors.routingNumber ? "error" : ""}`}
            />
            {errors.routingNumber && (
              <div className="error-message">{errors.routingNumber}</div>
            )}
          </div>

          <label className="remember-me-label">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="remember-me-checkbox"
            />
            <span>Remember me</span>
          </label>
        </div>

        <div className="form-actions">
          <button className="cancel-button" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button
            className="submit-button"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Processing..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankForm;
