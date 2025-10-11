import React, { useState, useEffect, useRef } from "react";
import ThankYouPopup from "../components/ThankYouPopup";
import { submitQuote } from "../firebasequote";

const BuyModal = ({ isOpen, onClose, product, profile }) => {
  const [grade, setGrade] = useState("");
  const [packing, setPacking] = useState("");
  const [quantity, setQuantity] = useState("");
  const [port, setPort] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);

  const countryOptions = [
    { value: "+91", flag: "🇮🇳", name: "India", length: 10 },
    { value: "+1", flag: "🇺🇸", name: "USA", length: 10 },
    { value: "+44", flag: "🇬🇧", name: "UK", length: 10 },
    { value: "+971", flag: "🇦🇪", name: "UAE", length: 9 },
    { value: "+61", flag: "🇦🇺", name: "Australia", length: 9 },
    { value: "+98", flag: "🇮🇷", name: "Iran", length: 10 },
  ];

  // All rice varieties and their grades
  const varietyGrades = {
    "1121 Basmati":[
      "1121 Steam A+",
      "1121 Steam A",
      "1121 Golden Sella A",
      "1121 Golden Sella A+",
      "1121 White Sella A+",
      "1121 White Sella A"
    ],
    "1509 Basmati": [
      "1509 Steam A+",
      "1509 Steam A",
      "1509 Golden Sella A+",
      "1509 Golden Sella A",
      "1509 White Sella A+",
      "1509 White Sella A"
    ],
    "1401 Basmati": [
      "1401 Steam A+",
      "1401 Steam A",
      "1401 white Sella A+",
      "1401 white Sella A",
      "1401 Golden Sella A+",
      "1401 Golden Sella A"
    ],
    "Pusa Basmati": [
      "Pusa Golden Sella A",
      "Pusa Golden Sella A+",
      "Pusa White Sella A+",
      "Pusa White Sella A",
      "Pusa Steam A",
      "Pusa Steam A+"
    ],
    "Traditional Basmati": [
      "Traditional Golden Sella A",
      "Traditional Golden Sella A+",
      "Traditional White Sella A+",
      "Traditional White Sella A",
      "Traditional Steam A",
      "Traditional Steam A+"
    ],
    "1885 Basmati": [
      "1885 Golden Sella A",
      "1885 Golden Sella A+",
      "1885 White Sella A+",
      "1885 White Sella A",
      "1885 Steam A",
      "1885 Steam A+"
    ],
    "1718 Basmati": [
      "1718 White Sella A+",
      "1718 White Sella A",
      "1718 Golden Sella A+",
      "1718 Golden Sella A",
      "1718 Steam A+",
      "1718 Steam A"
    ],
    "Sugandha (Non-Basmati)": [
      "Sugandha Creamy Parboiled",
      "Sugandha Golden",
      "Sugandha Steam",
      "Sugandha Sella"
    ],
    "Sharbati (Non-Basmati)": [
      "Sharbati Creamy Parboiled",
      "Sharbati Golden",
      "Sharbati Steam",
      "Sharbati Sella"
    ],
    "PR-11/14 (Non-Basmati)": [
      "PR-11/14 Creamy Parboiled",
      "PR-11/14 Golden",
      "PR-11/14 Steam",
      "PR-11/14 Sella"
    ],
    "PR-06/47 (Non-Basmati)": [
      "PR-06/47 Creamy Parboiled",
      "PR-06/47 Golden",
      "PR-06/47 Steam",
      "PR-06/47 Sella"
    ],
    "RH-10 (Non-Basmati)": [
      "Creamy Parboiled",
      "RH-10 Golden",
      "RH-10 Steam",
      "RH-10 Sella"
    ],
    "Sona Masoori (Non-Basmati)": [
      "Sona Masoori Steam",
      "Sona Masoori Sella",
      "Sona Masoori Creamy Parboiled",
      "Sona Masoori Golden"
    ],
    "Long Grain (Non-Basmati)": [
      "Long Grain Parboiled",
      "Long Grain Creamy Parboiled",
      "Long Grain Sella",
      "Long Grain Golden",
      "Long Grain Steam"
    ],
    "IR-8 (Non-Basmati)": [
      "IR-8 Parboiled",
      "IR-8 Creamy Parboiled",
      "IR-8 Sella",
      "IR-8 Golden",
      "IR-8 Steam"
    ],
    "GR-11 (Non-Basmati)": [
      "GR-11 Creamy Parboiled",
      "GR-11 Parboiled",
      "GR-11 Sella",
      "GR-11 Steam",
      "GR-11 Golden"
    ],
    "Swarna (Non-Basmati)": [
      "Swarna Steam",
      "Swarna sella",
      "Swarna Creamy Parboiled",
      "Swarna Parboiled",
      "Swarna Golden"
    ],
    "Kalizeera (Non-Basmati)": [
      "Kalizeera steam",
      "Kalizeera Golden",
      "Kalizeera Creamy Parboiled",
      "Kalizeera Parboiled",
      "Kalizeera Sella"
    ],
    "Ponni Rice (Non-Basmati)": [
      "Pooni Rice Steam",
      "Ponni Rice Sella",
      "Ponni Rice Golden",
      "Ponni Rice Creamy Parboiled",
      "Ponni Rice Parboiled"
    ]
  };

  // Define available grades for different product types and varieties
  const getAvailableGrades = (productType, productData) => {
    if (productType === 'rice' && productData) {
      const productVariety = productData.variety || '';
      const productName = productData.name || '';
      
      let matchedVariety = null;
      
      if (productVariety && varietyGrades[productVariety]) {
        matchedVariety = productVariety;
      }
      else if (productVariety) {
        for (const varietyKey in varietyGrades) {
          const cleanVariety = productVariety.replace('Rice', '').replace('rice', '').trim();
          const cleanKey = varietyKey.replace('Rice', '').replace('rice', '').trim();
          
          if (cleanVariety.includes(cleanKey) || cleanKey.includes(cleanVariety)) {
            matchedVariety = varietyKey;
            break;
          }
        }
      }
      else if (productName) {
        for (const varietyKey in varietyGrades) {
          const cleanName = productName.replace('Rice', '').replace('rice', '').trim();
          const cleanKey = varietyKey.replace('Rice', '').replace('rice', '').trim();
          
          if (cleanName.includes(cleanKey) || cleanKey.includes(cleanName)) {
            matchedVariety = varietyKey;
            break;
          }
        }
      }

      if (matchedVariety && varietyGrades[matchedVariety]) {
        return varietyGrades[matchedVariety];
      }

      const allRiceGrades = Object.values(varietyGrades).flat();
      return [...new Set(allRiceGrades)];
    }

    const gradeOptions = {
      oil: [
        "Extra Virgin", "Virgin", "Pure", "Refined", "Cold Pressed", "Organic"
      ],
      construction: [
        "Grade A", "Grade B", "Industrial Grade", "Commercial Grade", "Premium Quality", "Standard Quality"
      ],
      fruits: [
        "Grade A", "Grade B", "Export Quality", "Premium", "Standard", "Organic"
      ],
      vegetables: [
        "Grade A", "Grade B", "Fresh", "Organic", "Premium", "Standard"
      ],
      pulses: [
        "Premium Grade",
        "Standard Grade",
        "Export Quality",
        "First Quality",
        "Commercial Grade",
        "FAQ (Fair Average Quality)",
        "Sortex Cleaned",
        "Machine Cleaned",
        "Double Cleaned",
        "Triple Cleaned",
        "Organic Certified",
        "Extra Bold",
        "Bold Size",
        "Medium Size",
        "Small Size",
        "Unpolished",
        "Polished",
        "Raw",
        "Steam Treated",
        "A Grade",
        "B Grade",
        "C Grade",
        "Top Quality",
        "Superior Quality",
        "Regular Quality"
      ],
      spices: [
        "Premium Grade",
        "Standard Grade",
        "Export Quality",
        "First Quality",
        "Commercial Grade",
        "A Grade",
        "B Grade",
        "C Grade",
        "Top Quality",
        "Superior Quality",
        "Regular Quality"
      ],
      default: [
        "Premium Grade", "Standard Grade", "Export Quality", "First Quality", "Commercial Grade"
      ]
    };

    return gradeOptions[productType] || gradeOptions.default;
  };

  // Prefill form fields with profile data when modal opens
  useEffect(() => {
    if (isOpen && profile) {
      const nameValue = profile.fullName || profile.name || "";
      setFullName(nameValue);
      setEmail(profile.email || "");
      if (profile.phone) {
        const cleanedPhone = profile.phone.replace(/\s+/g, "").replace(/[^+\d]/g, "");
        const matchedCountry = countryOptions.find((opt) => cleanedPhone.startsWith(opt.value));
        
        if (matchedCountry) {
          setCountryCode(matchedCountry.value);
          setPhoneNumber(cleanedPhone.replace(matchedCountry.value, ""));
        } else {
          setCountryCode("+91");
          setPhoneNumber(cleanedPhone.replace(/^\+/, ""));
        }
        validatePhoneNumber(phoneNumber, countryCode);
      }
    }
  }, [isOpen, profile]);

  // Reset form when product changes and modal opens
  useEffect(() => {
    if (isOpen && product) {
      setGrade("");
    }
  }, [isOpen, product]);

  const validatePhoneNumber = (number, code) => {
    const selectedCountry = countryOptions.find((opt) => opt.value === code);
    const expectedLength = selectedCountry?.length || 10;
    if (!number) {
      setPhoneError("Phone number is required");
      return false;
    } else if (number.length !== expectedLength) {
      setPhoneError(`Phone number must be ${expectedLength} digits`);
      return false;
    } else if (!/^\d+$/.test(number)) {
      setPhoneError("Phone number must contain only digits");
      return false;
    } else {
      setPhoneError("");
      return true;
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const handleCountryChange = (e) => {
    if (!profile) {
      const newCode = e.target.value;
      setCountryCode(newCode);
      validatePhoneNumber(phoneNumber, newCode);
    }
  };

  const handlePhoneChange = (e) => {
    if (!profile) {
      const value = e.target.value.replace(/\D/g, "");
      setPhoneNumber(value);
      validatePhoneNumber(value, countryCode);
    }
  };

  const handleEmailChange = (e) => {
    if (!profile) {
      const value = e.target.value;
      setEmail(value);
      validateEmail(value);
    }
  };

  const handleFullNameChange = (e) => {
    if (!profile) {
      setFullName(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!quantity || !packing || !port || !grade || !fullName) {
      alert("Please fill all required fields.");
      return;
    }
    
    if (grade === "") {
      alert("Please select a grade.");
      return;
    }
    
    const isPhoneValid = validatePhoneNumber(phoneNumber, countryCode);
    const isEmailValid = validateEmail(email);

    if (!isPhoneValid || !isEmailValid) {
      if (!isPhoneValid) alert("Please enter a valid phone number.");
      if (!isEmailValid) alert("Please enter a valid email address.");
      return;
    }

    const fullPhoneNumber = `${countryCode}${phoneNumber}`;

    const quoteData = {
      name: fullName,
      email,
      phone: fullPhoneNumber,
      product: product?.name || "",
      variety: product?.variety || "",
      brand: product?.brand || "",
      grade,
      packing,
      quantity,
      port,
      additionalInfo: additionalInfo || "",
      timestamp: Date.now(),
      productType: getProductType(),
      status: "new",
      source: "website"
    };

    setIsSubmitting(true);

    try {
      const quoteId = await submitQuote(quoteData);
      console.log('Quote submitted with ID:', quoteId);

      const message = `Hello! I want a quote for:
- Name: ${fullName}
- Email: ${email}
- Phone: ${fullPhoneNumber}
- Product: ${product?.name || ""}
- Variety: ${product?.variety || ""}
- Brand: ${product?.brand || ""}
- Grade: ${grade}
- Packing: ${packing}
- Quantity: ${quantity} MT
- Port: ${port}
${additionalInfo ? `- Additional Info: ${additionalInfo}` : ""}
Thank you!`;

      window.open(
        `https://wa.me/+919703744571?text=${encodeURIComponent(message)}`,
        "_blank"
      );

      // Show thank you popup
      setShowThankYou(true);
      
      // Reset form but don't close modal automatically
      resetForm();

    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong while submitting your quote. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setGrade("");
    setPacking("");
    setQuantity("");
    setPort("");
    setAdditionalInfo("");
    if (!profile) {
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setCountryCode("+91");
    }
    setPhoneError("");
    setEmailError("");
  };

  const handleClose = () => {
    resetForm();
    setShowThankYou(false);
    onClose();
  };

  const getCurrentCountry = () =>
    countryOptions.find((opt) => opt.value === countryCode);

  const getProductType = () => {
    if (!product) return 'default';
    if (product.variety || (product.name && product.name.toLowerCase().includes('rice'))) {
      return 'rice';
    }
    // Check for pulses
    if (product.category === 'pulses' || 
        (product.name && product.name.toLowerCase().match(/(chana|moong|masoor|urad|toor|arhar|dal|lentil|bean|pea|pulse)/))) {
      return 'pulses';
    }
    // Check for spices
    if (product.category === 'spices' || 
        (product.name && product.name.toLowerCase().match(/(turmeric|chilli|pepper|cumin|coriander|cardamom|clove|cinnamon|nutmeg|mace|spice)/))) {
      return 'spices';
    }
    return product.category || 'default';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const availableGrades = getAvailableGrades(getProductType(), product);

  return (
    <>
      <div className="buy-modal-overlay">
        <div className="buy-modal-container" ref={modalRef}>
          <button
            className="buy-modal-close-btn"
            onClick={handleClose}
            aria-label="Close modal"
          >
            &times;
          </button>
          
          <div className="buy-modal-header">
            <h2 className="buy-modal-title">Get Quote</h2>
            <p className="buy-modal-subtitle">Fill out the form below and we'll get back to you shortly</p>
          </div>
          
          <div className="buy-modal-body">
            <form onSubmit={handleSubmit}>
              <section className="form-section">
                <h3 className="section-title">Contact Information</h3>

                <div className="form-group">
                  <label className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={handleFullNameChange}
                    required
                    className="form-input"
                    readOnly={!!profile}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    className="form-input"
                    readOnly={!!profile}
                  />
                  {emailError && <div className="error-message">{emailError}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Phone Number *
                  </label>
                  <div className="phone-input-group">
                    <select
                      value={countryCode}
                      onChange={handleCountryChange}
                      className="country-code-select"
                      disabled={!!profile}
                    >
                      {countryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.flag} {option.value}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      placeholder={`Phone number (${getCurrentCountry()?.length || 10} digits)`}
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      maxLength={getCurrentCountry()?.length || 10}
                      required
                      className="form-input phone-input"
                      readOnly={!!profile}
                    />
                  </div>
                  {phoneError && <div className="error-message">{phoneError}</div>}
                </div>
              </section>

              <section className="form-section">
                <h3 className="section-title">Product Information</h3>

                <div className="form-group">
                  <label className="form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={product?.name || ""}
                    className="form-input"
                    readOnly
                    disabled
                  />
                </div>

                {product?.variety && (
                  <div className="form-group">
                    <label className="form-label">
                      Variety
                    </label>
                    <input
                      type="text"
                      value={product.variety}
                      className="form-input"
                      readOnly
                      disabled
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">
                    Grade *
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    required
                    className="form-select"
                  >
                    <option value="">Select Grade</option>
                    {availableGrades.map((gradeOption, index) => (
                      <option key={index} value={gradeOption}>
                        {gradeOption}
                      </option>
                    ))}
                  </select>
                  <div className="grade-info">
                    <small>Available grades for {product?.variety || product?.name}</small>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Packing *
                  </label>
                  <select
                    value={packing}
                    onChange={(e) => setPacking(e.target.value)}
                    required
                    className="form-select"
                  >
                    <option value="">Select Packing</option>
                    <option value="10 Kg Bag">5 Kg Bag</option>
                    <option value="10 Kg Bag">10 Kg Bag</option>
                    <option value="10 Kg Bag">15 Kg Bag</option>
                    <option value="25 Kg Bag">25 Kg Bag</option>
                    <option value="50 Kg Bag">50 Kg Bag</option>
                    <option value="10 Kg Bag">75 Kg Bag</option>
                    <option value="100 Kg Bag">100 Kg Bag</option>
                    <option value="Jute Bags">Jute Bags</option>
                    <option value="PP Bags">PP Bags</option>
                    <option value="Bulk">Bulk</option>
                    <option value="Custom Packing">Custom Packing</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Quantity (MT) *
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 100"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    min="1"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Port *
                  </label>
                  <select
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    required
                    className="form-select"
                  >
                    <option value="">Select Port</option>
                    <option value="Mundra">Mundra</option>
                    <option value="Kandla">Kandla</option>
                    <option value="Nhava Sheva">Nhava Sheva</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Vizag">Vizag</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Cochin">Cochin</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Additional Information
                  </label>
                  <textarea
                    placeholder="Any additional requirements or information..."
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    className="form-textarea"
                    rows="4"
                  />
                </div>
              </section>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="btn-loading">
                      <span className="btn-spinner"></span>
                      Submitting...
                    </span>
                  ) : (
                    "Get Quote"
                  )}
                </button>
                <button type="button" onClick={handleClose} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ThankYouPopup
        isOpen={showThankYou}
        onClose={() => setShowThankYou(false)}
      />

      <style jsx>{`
        .buy-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
          backdrop-filter: blur(10px);
        }

        .buy-modal-container {
          background: linear-gradient(135deg, #1a1f35, #2d3748);
          border: 1px solid rgba(74, 85, 104, 0.5);
          border-radius: 16px;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          animation: modalSlideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .buy-modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: all 0.3s ease;
          color: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
        }

        .buy-modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          transform: rotate(90deg) scale(1.1);
        }

        .buy-modal-header {
          padding: 30px 30px 20px;
          border-bottom: 1px solid rgba(74, 85, 104, 0.3);
          background: rgba(26, 32, 44, 0.8);
          position: relative;
          overflow: hidden;
        }

        .buy-modal-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #4299e1, #3182ce, #4299e1);
        }

        .buy-modal-title {
          margin: 0;
          font-size: 1.8rem;
          font-weight: 700;
          background: linear-gradient(135deg, #4299e1, #63b3ed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 2px 10px rgba(66, 153, 225, 0.3);
        }

        .buy-modal-subtitle {
          margin: 8px 0 0;
          opacity: 0.8;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .buy-modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 0;
        }

        .form-section {
          padding: 25px 30px;
          border-bottom: 1px solid rgba(74, 85, 104, 0.2);
        }

        .form-section:last-of-type {
          border-bottom: none;
        }

        .section-title {
          margin: 0 0 25px 0;
          font-size: 1.2rem;
          font-weight: 600;
          color: #63b3ed;
          display: flex;
          align-items: center;
          position: relative;
        }

        .section-title::before {
          content: "";
          width: 4px;
          height: 20px;
          background: linear-gradient(135deg, #4299e1, #3182ce);
          margin-right: 12px;
          border-radius: 2px;
        }

        .form-group {
          margin-bottom: 25px;
          position: relative;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #e2e8f0;
          font-size: 0.95rem;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 14px 16px;
          background: rgba(45, 55, 72, 0.8);
          border: 1px solid rgba(74, 85, 104, 0.5);
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
          color: white;
          backdrop-filter: blur(10px);
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #4299e1;
          background: rgba(45, 55, 72, 1);
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
          transform: translateY(-1px);
        }

        .form-input:read-only,
        .form-input:disabled {
          background-color: rgba(74, 85, 104, 0.3);
          color: rgba(255, 255, 255, 0.6);
          cursor: not-allowed;
          border-color: rgba(74, 85, 104, 0.5);
        }

        /* Custom Dropdown Styling - Fixed for visibility */
        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2363b3ed' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          background-size: 16px;
          padding-right: 45px;
          cursor: pointer;
        }

        /* Style for dropdown options */
        .form-select option {
          background: #2d3748;
          color: white;
          padding: 12px 16px;
          border: none;
          font-size: 1rem;
        }

        .form-select option:hover {
          background: #4299e1;
        }

        .form-select option:checked {
          background: #3182ce;
          color: white;
        }

        .form-select option:focus {
          background: #4299e1;
        }

        /* Country Code Select Specific Styling */
        .country-code-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2363b3ed' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          background-size: 16px;
          padding-right: 45px;
          cursor: pointer;
          background: rgba(45, 55, 72, 0.8);
          border: 1px solid rgba(74, 85, 104, 0.5);
          border-radius: 10px;
          color: white;
        }

        .country-code-select option {
          background: #2d3748;
          color: white;
          padding: 12px 16px;
          border: none;
          font-size: 1rem;
        }

        .country-code-select option:hover {
          background: #4299e1;
        }

        .country-code-select option:checked {
          background: #3182ce;
          color: white;
        }

        /* For Webkit browsers (Chrome, Safari) */
        .form-select::-webkit-scrollbar,
        .country-code-select::-webkit-scrollbar {
          width: 8px;
        }

        .form-select::-webkit-scrollbar-track,
        .country-code-select::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }

        .form-select::-webkit-scrollbar-thumb,
        .country-code-select::-webkit-scrollbar-thumb {
          background: rgba(66, 153, 225, 0.5);
          border-radius: 4px;
        }

        .form-select::-webkit-scrollbar-thumb:hover,
        .country-code-select::-webkit-scrollbar-thumb:hover {
          background: rgba(66, 153, 225, 0.7);
        }

        .phone-input-group {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .country-code-select {
          flex: 0 0 auto;
          width: 130px;
          padding: 14px;
          transition: all 0.3s ease;
        }

        .country-code-select:focus {
          border-color: #4299e1;
          box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
        }

        .phone-input {
          flex: 1;
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
          font-family: inherit;
          line-height: 1.5;
        }

        .error-message {
          color: #fc8181;
          font-size: 0.85rem;
          margin-top: 6px;
          display: flex;
          align-items: center;
          font-weight: 500;
        }

        .error-message::before {
          content: "⚠️";
          margin-right: 6px;
          font-size: 0.8rem;
        }

        .grade-info {
          margin-top: 6px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.85rem;
          font-style: italic;
        }

        .form-actions {
          padding: 25px 30px;
          background: rgba(26, 32, 44, 0.8);
          border-top: 1px solid rgba(74, 85, 104, 0.3);
          display: flex;
          gap: 15px;
          justify-content: flex-end;
          align-items: center;
        }

        .submit-btn {
          background: linear-gradient(135deg, #4299e1, #3182ce);
          color: white;
          border: none;
          padding: 14px 35px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(66, 153, 225, 0.3);
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(66, 153, 225, 0.4);
          background: linear-gradient(135deg, #3182ce, #2c5aa0);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .btn-loading {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .cancel-btn {
          background: rgba(74, 85, 104, 0.3);
          color: #e2e8f0;
          border: 1px solid rgba(74, 85, 104, 0.5);
          padding: 14px 25px;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          backdrop-filter: blur(10px);
        }

        .cancel-btn:hover {
          background: rgba(74, 85, 104, 0.5);
          border-color: rgba(74, 85, 104, 0.7);
          transform: translateY(-1px);
        }

        /* Scrollbar Styling */
        .buy-modal-body::-webkit-scrollbar {
          width: 8px;
        }

        .buy-modal-body::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }

        .buy-modal-body::-webkit-scrollbar-thumb {
          background: rgba(66, 153, 225, 0.5);
          border-radius: 4px;
        }

        .buy-modal-body::-webkit-scrollbar-thumb:hover {
          background: rgba(66, 153, 225, 0.7);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .buy-modal-overlay {
            padding: 15px;
          }

          .buy-modal-container {
            max-height: 95vh;
            border-radius: 12px;
          }

          .form-section {
            padding: 20px;
          }

          .form-actions {
            padding: 20px;
            flex-direction: column-reverse;
            gap: 12px;
          }

          .submit-btn,
          .cancel-btn {
            width: 100%;
            text-align: center;
          }

          .phone-input-group {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }

          .country-code-select {
            width: 100%;
          }

          .buy-modal-header {
            padding: 25px 25px 15px;
          }

          .buy-modal-title {
            font-size: 1.6rem;
          }
        }

        @media (max-width: 480px) {
          .buy-modal-header {
            padding: 20px 20px 12px;
          }

          .buy-modal-title {
            font-size: 1.4rem;
          }

          .form-input,
          .form-select,
          .form-textarea {
            padding: 12px 14px;
          }

          .section-title {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </>
  );
};

export default BuyModal;