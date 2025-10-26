import React, { useState, useEffect, useRef } from "react";
import ThankYouPopup from "../components/ThankYouPopup";
import { submitQuote } from "../firebasequote";

const BuyModal = ({ isOpen, onClose, product, profile }) => {
  // State declarations
  const [grade, setGrade] = useState("");
  const [packing, setPacking] = useState("");
  const [quantity, setQuantity] = useState("");
  const [port, setPort] = useState("");
  const [cifRequired, setCifRequired] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gradePrice, setGradePrice] = useState("0.00");
  const [packingPrice, setPackingPrice] = useState("0.00");
  const [quantityPrice, setQuantityPrice] = useState("0.00");
  const [totalPrice, setTotalPrice] = useState("0.00");
  const [currency, setCurrency] = useState("INR");
  const [customLogoRequired, setCustomLogoRequired] = useState("");
  const [customLogoFile, setCustomLogoFile] = useState(null);
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoPrice, setLogoPrice] = useState("0.00");
  const [finalTotalPrice, setFinalTotalPrice] = useState("0.00");
  const [shippingCost, setShippingCost] = useState("0.00");
  const [insuranceCost, setInsuranceCost] = useState("0.00");
  const [taxes, setTaxes] = useState("0.00");
  const [portCost, setPortCost] = useState("0.00");
  const [exchangeRates, setExchangeRates] = useState({});
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [baseProductPrice, setBaseProductPrice] = useState("0.00");
  
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);
  const formContainerRef = useRef(null);
  const estimateContainerRef = useRef(null);

  // Constants
  const countryOptions = [
    { value: "+91", flag: "🇮🇳", name: "India", length: 10, currency: "INR" },
    { value: "+1", flag: "🇺🇸", name: "USA", length: 10, currency: "USD" },
    { value: "+44", flag: "🇬🇧", name: "UK", length: 10, currency: "GBP" },
    { value: "+971", flag: "🇦🇪", name: "UAE", length: 9, currency: "AED" },
    { value: "+61", flag: "🇦🇺", name: "Australia", length: 9, currency: "AUD" },
    { value: "+98", flag: "🇮🇷", name: "Iran", length: 10, currency: "IRR" },
  ];

  const currencyOptions = [
    { value: "INR", symbol: "₹", name: "Indian Rupee" },
    { value: "USD", symbol: "$", name: "US Dollar" },
    { value: "EUR", symbol: "€", name: "Euro" },
    { value: "GBP", symbol: "£", name: "British Pound" },
    { value: "AED", symbol: "د.إ", name: "UAE Dirham" },
    { value: "SAR", symbol: "﷼", name: "Saudi Riyal" },
    { value: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { value: "AUD", symbol: "A$", name: "Australian Dollar" },
    { value: "JPY", symbol: "¥", name: "Japanese Yen" },
    { value: "CNY", symbol: "¥", name: "Chinese Yuan" }
  ];

  // Port costs data (in INR) - More realistic pricing
  const portCosts = {
    "Mundra": { baseCost: 2500, perKg: 1.2, perLiter: 0.8, perUnit: 8 },
    "Kandla": { baseCost: 2300, perKg: 1.1, perLiter: 0.7, perUnit: 7 },
    "Nhava Sheva": { baseCost: 2800, perKg: 1.4, perLiter: 0.9, perUnit: 9 },
    "Chennai": { baseCost: 2200, perKg: 1.0, perLiter: 0.6, perUnit: 6 },
    "Vizag": { baseCost: 2100, perKg: 0.9, perLiter: 0.5, perUnit: 5 },
    "Kolkata": { baseCost: 2400, perKg: 1.1, perLiter: 0.7, perUnit: 7 },
    "Mumbai": { baseCost: 2700, perKg: 1.3, perLiter: 0.8, perUnit: 8 },
    "Cochin": { baseCost: 2150, perKg: 1.0, perLiter: 0.6, perUnit: 6 }
  };

  // Extract base price from product price string and convert to number
  const extractBasePrice = (priceString) => {
    if (!priceString) return 0;
    
    try {
      // Handle different price formats like "₹120-140 per liter", "₹7,250-8,650 per quintal"
      const priceMatch = priceString.match(/(\d+(?:,\d+)*(?:\.\d+)?)/);
      if (priceMatch) {
        // Take the first price (lower range) and convert to number
        const priceValue = parseFloat(priceMatch[1].replace(/,/g, ''));
        return priceValue;
      }
      
      return 0;
    } catch (error) {
      console.error('Error extracting price:', error);
      return 0;
    }
  };

  // Get quantity options based on product type
  const getQuantityOptions = () => {
    const productType = getProductType();
    
    const quantityOptionsByType = {
      oil: [
        { value: "5", label: "5 Liters", multiplier: 5 },
        { value: "10", label: "10 Liters", multiplier: 10 },
        { value: "25", label: "25 Liters", multiplier: 25 },
        { value: "50", label: "50 Liters", multiplier: 50 },
        { value: "100", label: "100 Liters", multiplier: 100 },
        { value: "500", label: "500 Liters", multiplier: 500 },
        { value: "1000", label: "1,000 Liters", multiplier: 1000 },
        { value: "5000", label: "5,000 Liters", multiplier: 5000 },
        { value: "10000", label: "10,000 Liters", multiplier: 10000 },
        { value: "25000", label: "25,000 Liters", multiplier: 25000 },
        { value: "50000", label: "50,000 Liters", multiplier: 50000 },
        { value: "100000", label: "100,000 Liters", multiplier: 100000 },
        { value: "custom", label: "Custom Quantity", multiplier: 1 }
      ],
      
      rice: [
        { value: "5", label: "5 Kg", multiplier: 5 },
        { value: "10", label: "10 Kg", multiplier: 10 },
        { value: "25", label: "25 Kg", multiplier: 25 },
        { value: "50", label: "50 Kg", multiplier: 50 },
        { value: "100", label: "100 Kg", multiplier: 100 },
        { value: "500", label: "500 Kg", multiplier: 500 },
        { value: "1000", label: "1 Ton", multiplier: 1000 },
        { value: "5000", label: "5 Tons", multiplier: 5000 },
        { value: "10000", label: "10 Tons", multiplier: 10000 },
        { value: "25000", label: "25 Tons", multiplier: 25000 },
        { value: "50000", label: "50 Tons", multiplier: 50000 },
        { value: "100000", label: "100 Tons", multiplier: 100000 },
        { value: "custom", label: "Custom Quantity", multiplier: 1 }
      ],
      
      pulses: [
        { value: "5", label: "5 Kg", multiplier: 5 },
        { value: "10", label: "10 Kg", multiplier: 10 },
        { value: "25", label: "25 Kg", multiplier: 25 },
        { value: "50", label: "50 Kg", multiplier: 50 },
        { value: "100", label: "100 Kg", multiplier: 100 },
        { value: "500", label: "500 Kg", multiplier: 500 },
        { value: "1000", label: "1 Ton", multiplier: 1000 },
        { value: "5000", label: "5 Tons", multiplier: 5000 },
        { value: "10000", label: "10 Tons", multiplier: 10000 },
        { value: "custom", label: "Custom Quantity", multiplier: 1 }
      ],
      
      spices: [
        { value: "1", label: "1 Kg", multiplier: 1 },
        { value: "5", label: "5 Kg", multiplier: 5 },
        { value: "10", label: "10 Kg", multiplier: 10 },
        { value: "25", label: "25 Kg", multiplier: 25 },
        { value: "50", label: "50 Kg", multiplier: 50 },
        { value: "100", label: "100 Kg", multiplier: 100 },
        { value: "500", label: "500 Kg", multiplier: 500 },
        { value: "1000", label: "1 Ton", multiplier: 1000 },
        { value: "custom", label: "Custom Quantity", multiplier: 1 }
      ],
      
      dryfruits: [
        { value: "1", label: "1 Kg", multiplier: 1 },
        { value: "5", label: "5 Kg", multiplier: 5 },
        { value: "10", label: "10 Kg", multiplier: 10 },
        { value: "25", label: "25 Kg", multiplier: 25 },
        { value: "50", label: "50 Kg", multiplier: 50 },
        { value: "100", label: "100 Kg", multiplier: 100 },
        { value: "custom", label: "Custom Quantity", multiplier: 1 }
      ],
      
      tea: [
        { value: "1", label: "1 Kg", multiplier: 1 },
        { value: "5", label: "5 Kg", multiplier: 5 },
        { value: "10", label: "10 Kg", multiplier: 10 },
        { value: "25", label: "25 Kg", multiplier: 25 },
        { value: "50", label: "50 Kg", multiplier: 50 },
        { value: "100", label: "100 Kg", multiplier: 100 },
        { value: "custom", label: "Custom Quantity", multiplier: 1 }
      ],
      
      construction: [
        { value: "100", label: "100 Kg", multiplier: 100 },
        { value: "500", label: "500 Kg", multiplier: 500 },
        { value: "1000", label: "1 Ton", multiplier: 1000 },
        { value: "5000", label: "5 Tons", multiplier: 5000 },
        { value: "10000", label: "10 Tons", multiplier: 10000 },
        { value: "50", label: "50 Bags", multiplier: 50 },
        { value: "100", label: "100 Bags", multiplier: 100 },
        { value: "500", label: "500 Bags", multiplier: 500 },
        { value: "1000", label: "1,000 Bags", multiplier: 1000 },
        { value: "100", label: "100 Pieces", multiplier: 100 },
        { value: "500", label: "500 Pieces", multiplier: 500 },
        { value: "1000", label: "1,000 Pieces", multiplier: 1000 },
        { value: "5000", label: "5,000 Pieces", multiplier: 5000 },
        { value: "custom", label: "Custom Quantity", multiplier: 1 }
      ],
      
      fruits: [
        { value: "5", label: "5 Kg", multiplier: 5 },
        { value: "10", label: "10 Kg", multiplier: 10 },
        { value: "25", label: "25 Kg", multiplier: 25 },
        { value: "50", label: "50 Kg", multiplier: 50 },
        { value: "100", label: "100 Kg", multiplier: 100 },
        { value: "1", label: "1 Box", multiplier: 1 },
        { value: "5", label: "5 Boxes", multiplier: 5 },
        { value: "10", label: "10 Boxes", multiplier: 10 },
        { value: "25", label: "25 Boxes", multiplier: 25 },
        { value: "custom", label: "Custom Quantity", multiplier: 1 }
      ],
      
      vegetables: [
        { value: "5", label: "5 Kg", multiplier: 5 },
        { value: "10", label: "10 Kg", multiplier: 10 },
        { value: "25", label: "25 Kg", multiplier: 25 },
        { value: "50", label: "50 Kg", multiplier: 50 },
        { value: "100", label: "100 Kg", multiplier: 100 },
        { value: "1", label: "1 Crate", multiplier: 1 },
        { value: "5", label: "5 Crates", multiplier: 5 },
        { value: "10", label: "10 Crates", multiplier: 10 },
        { value: "25", label: "25 Crates", multiplier: 25 },
        { value: "custom", label: "Custom Quantity", multiplier: 1 }
      ],
      
      beverages: [
        { value: "12", label: "12 Bottles", multiplier: 12 },
        { value: "24", label: "24 Bottles", multiplier: 24 },
        { value: "50", label: "50 Bottles", multiplier: 50 },
        { value: "100", label: "100 Bottles", multiplier: 100 },
        { value: "500", label: "500 Bottles", multiplier: 500 },
        { value: "10", label: "10 Liters", multiplier: 10 },
        { value: "25", label: "25 Liters", multiplier: 25 },
        { value: "50", label: "50 Liters", multiplier: 50 },
        { value: "100", label: "100 Liters", multiplier: 100 },
        { value: "500", label: "500 Liters", multiplier: 500 },
        { value: "custom", label: "Custom Quantity", multiplier: 1 }
      ],
      
      gadgets: [
        { value: "1", label: "1 Piece", multiplier: 1 },
        { value: "5", label: "5 Pieces", multiplier: 5 },
        { value: "10", label: "10 Pieces", multiplier: 10 },
        { value: "25", label: "25 Pieces", multiplier: 25 },
        { value: "50", label: "50 Pieces", multiplier: 50 },
        { value: "100", label: "100 Pieces", multiplier: 100 },
        { value: "custom", label: "Custom Quantity", multiplier: 1 }
      ],
      
      clothing: [
        { value: "1", label: "1 Piece", multiplier: 1 },
        { value: "5", label: "5 Pieces", multiplier: 5 },
        { value: "10", label: "10 Pieces", multiplier: 10 },
        { value: "25", label: "25 Pieces", multiplier: 25 },
        { value: "50", label: "50 Pieces", multiplier: 50 },
        { value: "100", label: "100 Pieces", multiplier: 100 },
        { value: "custom", label: "Custom Quantity", multiplier: 1 }
      ],
      
      chocolate: [
        { value: "1", label: "1 Kg", multiplier: 1 },
        { value: "5", label: "5 Kg", multiplier: 5 },
        { value: "10", label: "10 Kg", multiplier: 10 },
        { value: "25", label: "25 Kg", multiplier: 25 },
        { value: "50", label: "50 Kg", multiplier: 50 },
        { value: "100", label: "100 Pieces", multiplier: 100 },
        { value: "500", label: "500 Pieces", multiplier: 500 },
        { value: "1000", label: "1,000 Pieces", multiplier: 1000 },
        { value: "custom", label: "Custom Quantity", multiplier: 1 }
      ],
      
      perfume: [
        { value: "1", label: "1 Bottle", multiplier: 1 },
        { value: "5", label: "5 Bottles", multiplier: 5 },
        { value: "10", label: "10 Bottles", multiplier: 10 },
        { value: "25", label: "25 Bottles", multiplier: 25 },
        { value: "50", label: "50 Bottles", multiplier: 50 },
        { value: "100", label: "100 Bottles", multiplier: 100 },
        { value: "custom", label: "Custom Quantity", multiplier: 1 }
      ],
      
      flowers: [
        { value: "12", label: "12 Stems", multiplier: 12 },
        { value: "24", label: "24 Stems", multiplier: 24 },
        { value: "50", label: "50 Stems", multiplier: 50 },
        { value: "100", label: "100 Stems", multiplier: 100 },
        { value: "500", label: "500 Stems", multiplier: 500 },
        { value: "1", label: "1 Bouquet", multiplier: 1 },
        { value: "5", label: "5 Bouquets", multiplier: 5 },
        { value: "10", label: "10 Bouquets", multiplier: 10 },
        { value: "25", label: "25 Bouquets", multiplier: 25 },
        { value: "custom", label: "Custom Quantity", multiplier: 1 }
      ],
      
      default: [
        { value: "1", label: "1 Unit", multiplier: 1 },
        { value: "5", label: "5 Units", multiplier: 5 },
        { value: "10", label: "10 Units", multiplier: 10 },
        { value: "25", label: "25 Units", multiplier: 25 },
        { value: "50", label: "50 Units", multiplier: 50 },
        { value: "100", label: "100 Units", multiplier: 100 },
        { value: "custom", label: "Custom Quantity", multiplier: 1 }
      ]
    };
    
    return quantityOptionsByType[productType] || quantityOptionsByType.default;
  };

  const packingOptions = [
    { value: "PP Bags", price: "10" },
    { value: "Non-Woven Bags", price: "15" },
    { value: "Jute Bags", price: "20" },
    { value: "BOPP Bags", price: "16" },
    { value: "LDPE Bags", price: "12" },
    { value: "HDPE Bags", price: "11" },
    { value: "Paper Bags", price: "9" },
    { value: "Vacuum Packed", price: "24" },
    { value: "Bulk Packaging", price: "6" },
    { value: "Custom Packaging", price: "30" }
  ];

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

  const gradePrices = {
    "1121 Steam A+": "1.10", "1121 Steam A": "1.00", "1121 Golden Sella A": "1.05",
    "1121 Golden Sella A+": "1.15", "1121 White Sella A+": "1.08", "1121 White Sella A": "0.98",
    "1509 Steam A+": "0.95", "1509 Steam A": "0.85", "1509 Golden Sella A+": "1.00",
    "1509 Golden Sella A": "0.90", "1509 White Sella A+": "0.92", "1509 White Sella A": "0.82",
    "1401 Steam A+": "0.85", "1401 Steam A": "0.75", "1401 white Sella A+": "0.82",
    "1401 white Sella A": "0.72", "1401 Golden Sella A+": "0.84", "1401 Golden Sella A": "0.74",
    "Pusa Golden Sella A": "0.82", "Pusa Golden Sella A+": "0.92", "Pusa White Sella A+": "0.88",
    "Pusa White Sella A": "0.78", "Pusa Steam A": "0.80", "Pusa Steam A+": "0.90",
    "Traditional Golden Sella A": "0.78", "Traditional Golden Sella A+": "0.88",
    "Traditional White Sella A+": "0.84", "Traditional White Sella A": "0.74",
    "Traditional Steam A": "0.76", "Traditional Steam A+": "0.86",
    "1885 Golden Sella A": "0.80", "1885 Golden Sella A+": "0.90", "1885 White Sella A+": "0.86",
    "1885 White Sella A": "0.76", "1885 Steam A": "0.78", "1885 Steam A+": "0.88",
    "1718 White Sella A+": "0.86", "1718 White Sella A": "0.76", "1718 Golden Sella A+": "0.88",
    "1718 Golden Sella A": "0.78", "1718 Steam A+": "0.84", "1718 Steam A": "0.74",
    
    "Sugandha Creamy Parboiled": "0.55", "Sugandha Golden": "0.50", "Sugandha Steam": "0.52", "Sugandha Sella": "0.50",
    "Sharbati Creamy Parboiled": "0.52", "Sharbati Golden": "0.48", "Sharbati Steam": "0.50", "Sharbati Sella": "0.48",
    "PR-11/14 Creamy Parboiled": "0.50", "PR-11/14 Golden": "0.45", "PR-11/14 Steam": "0.48", "PR-11/14 Sella": "0.45",
    "PR-06/47 Creamy Parboiled": "0.48", "PR-06/47 Golden": "0.43", "PR-06/47 Steam": "0.46", "PR-06/47 Sella": "0.43",
    "Creamy Parboiled": "0.46", "RH-10 Golden": "0.41", "RH-10 Steam": "0.44", "RH-10 Sella": "0.41",
    "Sona Masoori Steam": "0.58", "Sona Masoori Sella": "0.55", "Sona Masoori Creamy Parboiled": "0.60", "Sona Masoori Golden": "0.52",
    "Long Grain Parboiled": "0.44", "Long Grain Creamy Parboiled": "0.48", "Long Grain Sella": "0.42",
    "Long Grain Golden": "0.40", "Long Grain Steam": "0.46",
    "IR-8 Parboiled": "0.38", "IR-8 Creamy Parboiled": "0.42", "IR-8 Sella": "0.36",
    "IR-8 Golden": "0.34", "IR-8 Steam": "0.40",
    "GR-11 Creamy Parboiled": "0.43", "GR-11 Parboiled": "0.38", "GR-11 Sella": "0.36",
    "GR-11 Steam": "0.41", "GR-11 Golden": "0.34",
    "Swarna Steam": "0.42", "Swarna sella": "0.40", "Swarna Creamy Parboiled": "0.46",
    "Swarna Parboiled": "0.38", "Swarna Golden": "0.36",
    "Kalizeera steam": "0.48", "Kalizeera Golden": "0.44", "Kalizeera Creamy Parboiled": "0.52",
    "Kalizeera Parboiled": "0.44", "Kalizeera Sella": "0.42",
    "Pooni Rice Steam": "0.50", "Ponni Rice Sella": "0.48", "Ponni Rice Golden": "0.46",
    "Ponni Rice Creamy Parboiled": "0.54", "Ponni Rice Parboiled": "0.46"
  };

  // Helper functions
  const getCurrencySymbol = () => {
    const selectedCurrency = currencyOptions.find(curr => curr.value === currency);
    return selectedCurrency ? selectedCurrency.symbol : "₹";
  };

  const getCurrentCountry = () => countryOptions.find((opt) => opt.value === countryCode);

  const getProductType = () => {
    if (!product) return 'default';
    if (product.variety || (product.name && product.name.toLowerCase().includes('rice'))) {
      return 'rice';
    }
    if (product.category === 'pulses' || 
        (product.name && product.name.toLowerCase().match(/(chana|moong|masoor|urad|toor|arhar|dal|lentil|bean|pea|pulse)/))) {
      return 'pulses';
    }
    if (product.category === 'spices' || 
        (product.name && product.name.toLowerCase().match(/(turmeric|chilli|pepper|cumin|coriander|cardamom|clove|cinnamon|nutmeg|mace|spice)/))) {
      return 'spices';
    }
    if (product.category === 'tea' || 
        (product.name && product.name.toLowerCase().match(/(tea|green tea|black tea|oolong|herbal tea|chai)/))) {
      return 'tea';
    }
    if (product.category === 'clothing' || 
        (product.name && product.name.toLowerCase().match(/(shirt|dress|pants|jeans|jacket|sweater|clothing|apparel|garment)/))) {
      return 'clothing';
    }
    if (product.category === 'chocolate' || 
        (product.name && product.name.toLowerCase().match(/(chocolate|cocoa|dark chocolate|milk chocolate|white chocolate)/))) {
      return 'chocolate';
    }
    if (product.category === 'beverages' || 
        (product.name && product.name.toLowerCase().match(/(juice|soda|drink|beverage|soft drink|energy drink)/))) {
      return 'beverages';
    }
    if (product.category === 'perfume' || 
        (product.name && product.name.toLowerCase().match(/(perfume|fragrance|cologne|scent|eau de toilette|parfum)/))) {
      return 'perfume';
    }
    if (product.category === 'flowers' || 
        (product.name && product.name.toLowerCase().match(/(rose|tulip|lily|orchid|flower|bouquet|floral)/))) {
      return 'flowers';
    }
    if (product.category === 'dryfruits' || 
        (product.name && product.name.toLowerCase().match(/(almond|cashew|walnut|pistachio|raisin|dry fruit|nuts|apricot|date|fig)/))) {
      return 'dryfruits';
    }
    if (product.category === 'oil' || 
        (product.name && product.name.toLowerCase().match(/(oil|olive|sunflower|coconut|mustard|groundnut)/))) {
      return 'oil';
    }
    if (product.category === 'construction' || 
        (product.name && product.name.toLowerCase().match(/(cement|steel|brick|sand|wood|construction|building)/))) {
      return 'construction';
    }
    if (product.category === 'fruits' || 
        (product.name && product.name.toLowerCase().match(/(apple|banana|orange|mango|fruit)/))) {
      return 'fruits';
    }
    if (product.category === 'vegetables' || 
        (product.name && product.name.toLowerCase().match(/(potato|tomato|onion|vegetable|carrot|spinach)/))) {
      return 'vegetables';
    }
    if (product.category === 'gadgets' || 
        (product.name && product.name.toLowerCase().match(/(phone|laptop|tablet|watch|gadget|electronic)/))) {
      return 'gadgets';
    }
    return product.category || 'default';
  };

  const getAvailableGrades = (productType, productData) => {
    if (productType === 'rice' && productData) {
      const productVariety = productData.variety || '';
      const productName = productData.name || '';
      
      let matchedVariety = null;
      
      if (productVariety && varietyGrades[productVariety]) {
        matchedVariety = productVariety;
      } else if (productVariety) {
        for (const varietyKey in varietyGrades) {
          const cleanVariety = productVariety.replace('Rice', '').replace('rice', '').trim();
          const cleanKey = varietyKey.replace('Rice', '').replace('rice', '').trim();
          if (cleanVariety.includes(cleanKey) || cleanKey.includes(cleanVariety)) {
            matchedVariety = varietyKey;
            break;
          }
        }
      } else if (productName) {
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
        return varietyGrades[matchedVariety].map(grade => ({
          value: grade,
          price: gradePrices[grade] || "1.00"
        }));
      }

      const allRiceGrades = Object.values(varietyGrades).flat();
      const uniqueGrades = [...new Set(allRiceGrades)];
      return uniqueGrades.map(grade => ({
        value: grade,
        price: gradePrices[grade] || "1.00"
      }));
    }

    const gradeOptions = {
      oil: [
        { value: "Extra Virgin", price: "1.20" }, { value: "Virgin", price: "1.10" },
        { value: "Pure", price: "1.00" }, { value: "Refined", price: "0.95" },
        { value: "Cold Pressed", price: "1.25" }, { value: "Organic", price: "1.30" }
      ],
      construction: [
        { value: "Grade A", price: "1.15" }, { value: "Grade B", price: "1.00" },
        { value: "Industrial Grade", price: "0.90" }, { value: "Commercial Grade", price: "1.05" },
        { value: "Premium Quality", price: "1.25" }, { value: "Standard Quality", price: "0.95" }
      ],
      fruits: [
        { value: "Grade A", price: "1.10" }, { value: "Grade B", price: "0.95" },
        { value: "Export Quality", price: "1.20" }, { value: "Premium", price: "1.15" },
        { value: "Standard", price: "0.85" }, { value: "Organic", price: "1.25" }
      ],
      vegetables: [
        { value: "Grade A", price: "1.05" }, { value: "Grade B", price: "0.90" },
        { value: "Fresh", price: "1.10" }, { value: "Organic", price: "1.15" },
        { value: "Premium", price: "1.08" }, { value: "Standard", price: "0.85" }
      ],
      pulses: [
        { value: "Premium Grade", price: "1.10" }, { value: "Standard Grade", price: "1.00" },
        { value: "Export Quality", price: "1.15" }, { value: "First Quality", price: "1.05" },
        { value: "Commercial Grade", price: "0.95" }, { value: "Top Quality", price: "1.12" },
        { value: "Superior Quality", price: "1.08" }, { value: "Regular Quality", price: "0.90" }
      ],
      spices: [
        { value: "Premium Grade", price: "1.20" }, { value: "Standard Grade", price: "1.05" },
        { value: "Export Quality", price: "1.25" }, { value: "First Quality", price: "1.15" },
        { value: "Commercial Grade", price: "1.00" }, { value: "A Grade", price: "1.18" },
        { value: "B Grade", price: "1.08" }, { value: "C Grade", price: "0.95" },
        { value: "Top Quality", price: "1.22" }, { value: "Superior Quality", price: "1.12" },
        { value: "Regular Quality", price: "0.98" }
      ],
      tea: [
        { value: "Premium Grade", price: "1.25" }, { value: "First Flush", price: "1.35" },
        { value: "Second Flush", price: "1.30" }, { value: "Orthodox", price: "1.40" },
        { value: "CTC", price: "1.15" }, { value: "Green Tea", price: "1.28" },
        { value: "White Tea", price: "1.45" }, { value: "Oolong Tea", price: "1.32" },
        { value: "Darjeeling Tea", price: "1.50" }, { value: "Assam Tea", price: "1.20" },
        { value: "Organic Tea", price: "1.30" }, { value: "Commercial Grade", price: "1.10" }
      ],
      clothing: [
        { value: "Premium Quality", price: "1.30" }, { value: "Export Quality", price: "1.25" },
        { value: "First Quality", price: "1.20" }, { value: "Commercial Grade", price: "1.10" },
        { value: "Standard Quality", price: "1.15" }, { value: "Luxury Grade", price: "1.40" },
        { value: "Boutique Quality", price: "1.35" }, { value: "Mass Market", price: "1.05" },
        { value: "Designer Grade", price: "1.45" }, { value: "Economy Grade", price: "1.00" }
      ],
      chocolate: [
        { value: "Premium Grade", price: "1.25" }, { value: "Belgian Chocolate", price: "1.35" },
        { value: "Swiss Chocolate", price: "1.32" }, { value: "Dark Chocolate", price: "1.20" },
        { value: "Milk Chocolate", price: "1.15" }, { value: "White Chocolate", price: "1.18" },
        { value: "Organic Chocolate", price: "1.28" }, { value: "Sugar-Free", price: "1.22" },
        { value: "Commercial Grade", price: "1.10" }, { value: "Artisanal", price: "1.40" },
        { value: "Couverture", price: "1.38" }, { value: "Compound", price: "1.08" }
      ],
      beverages: [
        { value: "Premium Grade", price: "1.15" }, { value: "Natural", price: "1.18" },
        { value: "Organic", price: "1.22" }, { value: "Sugar-Free", price: "1.20" },
        { value: "Concentrate", price: "1.10" }, { value: "Ready-to-Drink", price: "1.25" },
        { value: "Commercial Grade", price: "1.05" }, { value: "Export Quality", price: "1.23" },
        { value: "First Quality", price: "1.12" }, { value: "Standard Quality", price: "1.08" }
      ],
      perfume: [
        { value: "Premium Grade", price: "1.35" }, { value: "Luxury", price: "1.45" },
        { value: "Designer", price: "1.40" }, { value: "Niche", price: "1.50" },
        { value: "Export Quality", price: "1.32" }, { value: "Commercial Grade", price: "1.20" },
        { value: "First Quality", price: "1.28" }, { value: "Standard Quality", price: "1.25" },
        { value: "Organic", price: "1.38" }, { value: "Natural", price: "1.42" }
      ],
      flowers: [
        { value: "Premium Grade", price: "1.10" }, { value: "Export Quality", price: "1.15" },
        { value: "First Quality", price: "1.08" }, { value: "Commercial Grade", price: "1.00" },
        { value: "Standard Quality", price: "1.05" }, { value: "Luxury Grade", price: "1.20" },
        { value: "Organic", price: "1.12" }, { value: "Fresh Cut", price: "1.06" },
        { value: "Bouquet Quality", price: "1.18" }, { value: "Event Grade", price: "0.95" }
      ],
      dryfruits: [
        { value: "Premium Grade", price: "1.25" }, { value: "Export Quality", price: "1.30" },
        { value: "First Quality", price: "1.22" }, { value: "Commercial Grade", price: "1.10" },
        { value: "Standard Quality", price: "1.15" }, { value: "Organic", price: "1.35" },
        { value: "Natural", price: "1.28" }, { value: "Roasted", price: "1.20" },
        { value: "Raw", price: "1.18" }, { value: "Salted", price: "1.23" },
        { value: "Unsalted", price: "1.22" }, { value: "Blanched", price: "1.26" }
      ],
      gadgets: [
        { value: "Premium Grade", price: "1.30" }, { value: "Brand New", price: "1.35" },
        { value: "Refurbished", price: "1.20" }, { value: "Original", price: "1.32" },
        { value: "Standard Quality", price: "1.25" }
      ],
      default: [
        { value: "Premium Grade", price: "1.10" }, { value: "Standard Grade", price: "1.00" },
        { value: "Export Quality", price: "1.15" }, { value: "First Quality", price: "1.05" },
        { value: "Commercial Grade", price: "0.95" }
      ]
    };

    return gradeOptions[productType] || gradeOptions.default;
  };

  // Calculate port cost based on selected port and quantity
  const calculatePortCost = (portValue, quantityValue, productType) => {
    if (!portValue || !quantityValue || quantityValue === "custom") return 0;
    
    const portData = portCosts[portValue];
    if (!portData) return 0;
    
    const quantityOptionsList = getQuantityOptions();
    const selectedQuantity = quantityOptionsList.find(q => q.value === quantityValue);
    if (!selectedQuantity) return 0;
    
    const qty = selectedQuantity.multiplier;
    let portCostValue = portData.baseCost;
    
    // Add cost based on product type and quantity
    if (productType === 'oil') {
      portCostValue += qty * portData.perLiter;
    } else if (['rice', 'pulses', 'spices', 'dryfruits', 'tea', 'fruits', 'vegetables', 'chocolate'].includes(productType)) {
      portCostValue += qty * portData.perKg;
    } else {
      portCostValue += qty * portData.perUnit;
    }
    
    return portCostValue;
  };

  // Calculate shipping cost based on quantity and product type - Reduced rates
  const calculateShippingCost = (quantityValue, productType, productValue) => {
    if (!quantityValue || quantityValue === "custom") return 0;
    
    const qty = parseFloat(quantityValue);
    let baseRate = 0;
    
    // Reduced shipping rates
    const shippingRates = {
      oil: 1.5,           // Reduced from 3
      rice: 2.5,          // Reduced from 5
      pulses: 2,          // Reduced from 4
      spices: 3,          // Reduced from 6
      dryfruits: 3.5,     // Reduced from 7
      tea: 4,             // Reduced from 8
      construction: 1,    // Reduced from 2
      fruits: 5,          // Reduced from 10
      vegetables: 4.5,    // Reduced from 9
      beverages: 0.8,     // Reduced from 1.6
      gadgets: 50,        // Reduced from 100
      clothing: 20,       // Reduced from 40
      chocolate: 2.5,     // Reduced from 5
      perfume: 30,        // Reduced from 60
      flowers: 1,         // Reduced from 2
      default: 2          // Reduced from 4
    };
    
    baseRate = shippingRates[productType] || shippingRates.default;
    return Math.max(qty * baseRate, productValue * 0.02); // Reduced minimum from 5% to 2%
  };

  // Calculate insurance cost (0.5% of product value) - Reduced
  const calculateInsuranceCost = (productValue) => {
    return productValue * 0.005; // Reduced from 1% to 0.5%
  };

  // Calculate taxes and duties (3% of total) - Reduced
  const calculateTaxes = (subtotal) => {
    return subtotal * 0.03; // Reduced from 5% to 3%
  };

  // Format number with commas
  const formatNumber = (num) => {
    return parseFloat(num).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Convert INR to selected currency
  const convertToCurrency = (inrAmount) => {
    if (currency === 'INR') return parseFloat(inrAmount);
    
    const exchangeRates = {
      USD: 0.012,    // 1 INR = 0.012 USD
      EUR: 0.011,    // 1 INR = 0.011 EUR
      GBP: 0.0095,   // 1 INR = 0.0095 GBP
      AED: 0.044,    // 1 INR = 0.044 AED
      SAR: 0.045,    // 1 INR = 0.045 SAR
      CAD: 0.016,    // 1 INR = 0.016 CAD
      AUD: 0.018,    // 1 INR = 0.018 AUD
      JPY: 1.8,      // 1 INR = 1.8 JPY
      CNY: 0.087,    // 1 INR = 0.087 CNY
      IRR: 504.5     // 1 INR = 504.5 IRR
    };
    
    const rate = exchangeRates[currency] || 1;
    return parseFloat(inrAmount) * rate;
  };

  // Price calculation
  const calculatePrices = () => {
    let gradePriceValue = 0;
    let packingPriceValue = 0;
    let quantityPriceValue = 0;
    let logoPriceValue = 0;
    let shippingCostValue = 0;
    let insuranceCostValue = 0;
    let taxesValue = 0;
    let portCostValue = 0;

    // Use base product price as starting point (in INR)
    let basePrice = parseFloat(baseProductPrice);

    if (grade) {
      const availableGrades = getAvailableGrades(getProductType(), product);
      const selectedGrade = availableGrades.find(g => g.value === grade);
      if (selectedGrade) {
        // Apply grade multiplier to base price
        const gradeMultiplier = parseFloat(selectedGrade.price);
        gradePriceValue = basePrice * gradeMultiplier;
      } else {
        gradePriceValue = basePrice;
      }
    } else {
      gradePriceValue = basePrice;
    }

    if (packing) {
      const selectedPacking = packingOptions.find(p => p.value === packing);
      if (selectedPacking) {
        packingPriceValue = parseFloat(selectedPacking.price);
      }
    }

    if (quantity && quantity !== "custom") {
      const quantityOptionsList = getQuantityOptions();
      const selectedQuantity = quantityOptionsList.find(q => q.value === quantity);
      if (selectedQuantity) {
        const qty = selectedQuantity.multiplier;
        quantityPriceValue = qty * gradePriceValue;
      }
    } else if (quantity === "custom") {
      // Handle custom quantity - will be calculated when user inputs value
      quantityPriceValue = 0;
    }

    if (customLogoRequired === "Yes") {
      logoPriceValue = 500; // 500 INR for custom logo
    }

    // Calculate port cost if port is selected
    if (port) {
      const productType = getProductType();
      portCostValue = calculatePortCost(port, quantity, productType);
    }

    // Calculate CIF costs only if CIF is required
    if (cifRequired === "Yes") {
      const productType = getProductType();
      shippingCostValue = calculateShippingCost(quantity, productType, quantityPriceValue);
      insuranceCostValue = calculateInsuranceCost(quantityPriceValue);
      taxesValue = calculateTaxes(quantityPriceValue + packingPriceValue + logoPriceValue + portCostValue);
    }

    const subtotal = quantityPriceValue + packingPriceValue + logoPriceValue + portCostValue;
    const cifTotal = shippingCostValue + insuranceCostValue + taxesValue;
    const finalTotal = cifRequired === "Yes" ? subtotal + cifTotal : subtotal;

    // Convert all prices to selected currency
    setGradePrice(convertToCurrency(gradePriceValue).toFixed(2));
    setPackingPrice(convertToCurrency(packingPriceValue).toFixed(2));
    setQuantityPrice(convertToCurrency(quantityPriceValue).toFixed(2));
    setLogoPrice(convertToCurrency(logoPriceValue).toFixed(2));
    setPortCost(convertToCurrency(portCostValue).toFixed(2));
    setShippingCost(convertToCurrency(shippingCostValue).toFixed(2));
    setInsuranceCost(convertToCurrency(insuranceCostValue).toFixed(2));
    setTaxes(convertToCurrency(taxesValue).toFixed(2));
    setTotalPrice(convertToCurrency(subtotal).toFixed(2));
    setFinalTotalPrice(convertToCurrency(finalTotal).toFixed(2));
  };

  // Get prices for display (with currency conversion)
  const getDisplayPrices = () => {
    return {
      gradePrice: gradePrice,
      packingPrice: packingPrice,
      quantityPrice: quantityPrice,
      logoPrice: logoPrice,
      portCost: portCost,
      shippingCost: shippingCost,
      insuranceCost: insuranceCost,
      taxes: taxes,
      totalPrice: totalPrice,
      finalTotalPrice: finalTotalPrice,
      baseProductPrice: convertToCurrency(baseProductPrice).toFixed(2)
    };
  };

  // Get exchange rate info for display
  const getExchangeRateInfo = () => {
    if (currency === 'INR') return null;
    
    const exchangeRates = {
      USD: { rate: "0.012", example: "₹100 = $1.20" },
      EUR: { rate: "0.011", example: "₹100 = €1.10" },
      GBP: { rate: "0.0095", example: "₹100 = £0.95" },
      AED: { rate: "0.044", example: "₹100 = د.إ4.40" },
      SAR: { rate: "0.045", example: "₹100 = ﷼4.50" },
      CAD: { rate: "0.016", example: "₹100 = C$1.60" },
      AUD: { rate: "0.018", example: "₹100 = A$1.80" },
      JPY: { rate: "1.8", example: "₹100 = ¥180" },
      CNY: { rate: "0.087", example: "₹100 = ¥8.70" },
      IRR: { rate: "504.5", example: "₹100 = ﷼50,450" }
    };
    
    return exchangeRates[currency] || null;
  };

  // Validation functions
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

  // Event handlers
  const handleCountryChange = (e) => {
    if (!profile) {
      const newCode = e.target.value;
      setCountryCode(newCode);
      validatePhoneNumber(phoneNumber, newCode);
      
      const selectedCountry = countryOptions.find(opt => opt.value === newCode);
      if (selectedCountry && selectedCountry.currency) {
        setCurrency(selectedCountry.currency);
      }
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

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
  };

  const handleCustomQuantityChange = (e) => {
    const value = e.target.value;
    if (value && !isNaN(value)) {
      const basePrice = parseFloat(baseProductPrice);
      const gradeMultiplier = grade ? parseFloat(getAvailableGrades(getProductType(), product).find(g => g.value === grade)?.price || 1) : 1;
      const calculatedPrice = basePrice * gradeMultiplier * parseFloat(value);
      setQuantityPrice(convertToCurrency(calculatedPrice).toFixed(2));
    } else {
      setQuantityPrice("0.00");
    }
  };

  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };

  const handlePackingChange = (e) => {
    setPacking(e.target.value);
  };

  const handlePortChange = (e) => {
    setPort(e.target.value);
  };

  const handleCifChange = (e) => {
    setCifRequired(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleCustomLogoChange = (e) => {
    const value = e.target.value;
    setCustomLogoRequired(value);
    if (value !== "Yes") {
      setCustomLogoFile(null);
      setLogoPrice("0.00");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 10 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid file type (JPG, PNG, JPEG, PDF, DOC)');
        return;
      }

      if (file.size > maxSize) {
        alert('File size should be less than 10MB');
        return;
      }

      setLogoUploading(true);
      setTimeout(() => {
        setCustomLogoFile(file);
        setLogoUploading(false);
      }, 1500);
    }
  };

  const handleRemoveFile = () => {
    setCustomLogoFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Helper function to get quantity unit for custom input placeholder
  const getQuantityUnit = () => {
    const productType = getProductType();
    const unitMap = {
      oil: "Liters",
      rice: "Kg",
      pulses: "Kg",
      spices: "Kg",
      dryfruits: "Kg",
      tea: "Kg",
      fruits: "Kg",
      vegetables: "Kg",
      chocolate: "Kg",
      construction: "Units",
      beverages: "Bottles",
      gadgets: "Pieces",
      clothing: "Pieces",
      perfume: "Bottles",
      flowers: "Stems",
      default: "Units"
    };
    return unitMap[productType] || "Units";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!quantity || !packing || !port || !grade || !fullName || !cifRequired || !customLogoRequired) {
      alert("Please fill all required fields.");
      return;
    }
    
    if (grade === "") {
      alert("Please select a grade.");
      return;
    }

    if (cifRequired === "") {
      alert("Please select if CIF is required.");
      return;
    }

    if (customLogoRequired === "") {
      alert("Please select if custom logo is required.");
      return;
    }

    if (customLogoRequired === "Yes" && !customLogoFile) {
      alert("Please upload your custom logo file.");
      return;
    }

    if (!currency) {
      alert("Please select a currency.");
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
    const quantityOptions = getQuantityOptions();
    const selectedQuantityOption = quantityOptions.find(opt => opt.value === quantity);
    const quantityDisplay = selectedQuantityOption ? selectedQuantityOption.label : `${quantity} ${getQuantityUnit()}`;

    const displayPrices = getDisplayPrices();
    const currencySymbol = getCurrencySymbol();
    const exchangeInfo = getExchangeRateInfo();

    const quoteData = {
      name: fullName,
      email,
      phone: fullPhoneNumber,
      product: product?.name || "",
      variety: product?.variety || "",
      brand: product?.brand || "",
      grade,
      packing,
      quantity: quantityDisplay,
      port,
      cifRequired,
      customLogoRequired,
      customLogoFile: customLogoRequired === "Yes" ? {
        name: customLogoFile.name,
        type: customLogoFile.type,
        size: customLogoFile.size
      } : null,
      currency: currency,
      priceBreakdown: {
        baseProductPrice: `${currencySymbol}${formatNumber(displayPrices.baseProductPrice)}/unit`,
        gradePrice: `${currencySymbol}${formatNumber(displayPrices.gradePrice)}/unit`,
        packingPrice: `${currencySymbol}${formatNumber(displayPrices.packingPrice)}/bag`,
        quantityPrice: `${currencySymbol}${formatNumber(displayPrices.quantityPrice)}`,
        portCost: `${currencySymbol}${formatNumber(displayPrices.portCost)}`,
        customLogoPrice: customLogoRequired === "Yes" ? `${currencySymbol}${formatNumber(displayPrices.logoPrice)}` : "N/A",
        shippingCost: cifRequired === "Yes" ? `${currencySymbol}${formatNumber(displayPrices.shippingCost)}` : "N/A",
        insuranceCost: cifRequired === "Yes" ? `${currencySymbol}${formatNumber(displayPrices.insuranceCost)}` : "N/A",
        taxes: cifRequired === "Yes" ? `${currencySymbol}${formatNumber(displayPrices.taxes)}` : "N/A",
        subtotal: `${currencySymbol}${formatNumber(displayPrices.totalPrice)}`,
        finalTotal: `${currencySymbol}${formatNumber(displayPrices.finalTotalPrice)}`
      },
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
- Quantity: ${quantityDisplay}
- Port: ${port}
- CIF Required: ${cifRequired}
- Custom Logo Required: ${customLogoRequired}
${customLogoRequired === "Yes" ? `- Logo File: ${customLogoFile.name}` : ""}
- Currency: ${currency}
${exchangeInfo ? `- Exchange Rate: ${exchangeInfo.example}` : ""}
- Estimated Bill Breakdown:
  • Base Product Price: ${currencySymbol}${formatNumber(displayPrices.baseProductPrice)}/unit
  • Grade Price: ${currencySymbol}${formatNumber(displayPrices.gradePrice)}/unit
  • Packing Price: ${currencySymbol}${formatNumber(displayPrices.packingPrice)}/bag
  • Quantity Price: ${currencySymbol}${formatNumber(displayPrices.quantityPrice)}
  • Port Charges: ${currencySymbol}${formatNumber(displayPrices.portCost)}
  ${customLogoRequired === "Yes" ? `• Custom Logo: ${currencySymbol}${formatNumber(displayPrices.logoPrice)}` : ""}
  ${cifRequired === "Yes" ? `
  • Shipping Cost: ${currencySymbol}${formatNumber(displayPrices.shippingCost)}
  • Insurance Cost: ${currencySymbol}${formatNumber(displayPrices.insuranceCost)}
  • Taxes & Duties: ${currencySymbol}${formatNumber(displayPrices.taxes)}` : ""}
  • Subtotal: ${currencySymbol}${formatNumber(displayPrices.totalPrice)}
  • Final Total${cifRequired === "Yes" ? " (CIF)" : ""}: ${currencySymbol}${formatNumber(displayPrices.finalTotalPrice)}
${additionalInfo ? `- Additional Info: ${additionalInfo}` : ""}
Thank you!`;

      window.open(
        `https://wa.me/+919703744571?text=${encodeURIComponent(message)}`,
        "_blank"
      );

      setShowThankYou(true);
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
    setCifRequired("");
    setCurrency("INR");
    setCustomLogoRequired("");
    setCustomLogoFile(null);
    setAdditionalInfo("");
    setGradePrice("0.00");
    setPackingPrice("0.00");
    setQuantityPrice("0.00");
    setLogoPrice("0.00");
    setPortCost("0.00");
    setShippingCost("0.00");
    setInsuranceCost("0.00");
    setTaxes("0.00");
    setTotalPrice("0.00");
    setFinalTotalPrice("0.00");
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

  // Effects
  useEffect(() => {
    calculatePrices();
  }, [grade, packing, quantity, port, cifRequired, customLogoRequired, currency, baseProductPrice]);

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
          if (matchedCountry.currency) {
            setCurrency(matchedCountry.currency);
          }
        } else {
          setCountryCode("+91");
          setPhoneNumber(cleanedPhone.replace(/^\+/, ""));
        }
        validatePhoneNumber(phoneNumber, countryCode);
      }
    }
  }, [isOpen, profile]);

  useEffect(() => {
    if (isOpen && product) {
      setGrade("");
      setCifRequired("");
      setCurrency("INR");
      setCustomLogoRequired("");
      setCustomLogoFile(null);
      setGradePrice("0.00");
      setPackingPrice("0.00");
      setQuantityPrice("0.00");
      setLogoPrice("0.00");
      setPortCost("0.00");
      setShippingCost("0.00");
      setInsuranceCost("0.00");
      setTaxes("0.00");
      setTotalPrice("0.00");
      setFinalTotalPrice("0.00");
      
      // Extract base price from product (this will be in INR)
      const basePrice = extractBasePrice(product.price);
      setBaseProductPrice(basePrice.toFixed(2));
    }
  }, [isOpen, product]);

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
  const currencySymbol = getCurrencySymbol();
  const quantityOptions = getQuantityOptions();
  const displayPrices = getDisplayPrices();
  const exchangeInfo = getExchangeRateInfo();

  return (
    <>
      <div className="buy-modal-overlay">
        <div className="buy-modal-container" ref={modalRef}>
          <button className="buy-modal-close-btn" onClick={handleClose} aria-label="Close modal">
            &times;
          </button>
          
          <div className="buy-modal-header">
            <h2 className="buy-modal-title">Get Quote</h2>
            <p className="buy-modal-subtitle">Fill out the form below and we'll get back to you shortly</p>
            {product && (
              <div className="product-price-info">
                <small>Base Price: {product.price} (INR)</small>
                {port && (
                  <div className="port-selection-info">
                    <small>Selected Port: {port} - Charges: {currencySymbol}{formatNumber(displayPrices.portCost)}</small>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="buy-modal-body">
            <div className="modal-layout">
              {/* Left Side - Form (Scrollable) */}
              <div className="form-section-container" ref={formContainerRef}>
                <form onSubmit={handleSubmit}>
                  <section className="form-section">
                    <h3 className="section-title">Contact Information</h3>

                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
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
                      <label className="form-label">Email Address *</label>
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
                      <label className="form-label">Phone Number *</label>
                      <div className="phone-input-group">
                        <select
                          value={countryCode}
                          onChange={handleCountryChange}
                          className="country-code-select"
                          disabled={!!profile}
                        >
                          {countryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.flag} {option.value} ({option.name})
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
                      <label className="form-label">Product Name</label>
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
                        <label className="form-label">Variety</label>
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
                      <label className="form-label">Original Price (INR)</label>
                      <input
                        type="text"
                        value={product?.price || ""}
                        className="form-input"
                        readOnly
                        disabled
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Grade *</label>
                      <select value={grade} onChange={handleGradeChange} required className="form-select">
                        <option value="">Select Grade</option>
                        {availableGrades.map((gradeOption, index) => (
                          <option key={index} value={gradeOption.value}>{gradeOption.value}</option>
                        ))}
                      </select>
                      <div className="grade-info">
                        <small>Available grades for {product?.variety || product?.name}</small>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Packing *</label>
                      <select value={packing} onChange={handlePackingChange} required className="form-select">
                        <option value="">Select Packing</option>
                        {packingOptions.map((packingOption, index) => (
                          <option key={index} value={packingOption.value}>{packingOption.value}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Quantity *</label>
                      <select value={quantity} onChange={handleQuantityChange} required className="form-select">
                        <option value="">Select Quantity</option>
                        {quantityOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                      {quantity === "custom" && (
                        <input
                          type="number"
                          placeholder={`Enter custom quantity in ${getQuantityUnit()}`}
                          onChange={handleCustomQuantityChange}
                          className="form-input"
                          style={{ marginTop: '10px' }}
                          min="1"
                          step="1"
                        />
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Port *</label>
                      <select value={port} onChange={handlePortChange} required className="form-select">
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
                      <div className="port-info">
                        <small>Port charges include handling, documentation, and loading fees</small>
                        {port && (
                          <div className="port-cost-preview">
                            <small>Estimated port charges: {currencySymbol}{formatNumber(displayPrices.portCost)}</small>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">CIF Required? *</label>
                      <select value={cifRequired} onChange={handleCifChange} required className="form-select">
                        <option value="">Select Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      <div className="cif-info">
                        <small>CIF (Cost, Insurance, and Freight) includes shipping and insurance costs to your destination port</small>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Custom Logo Required? *</label>
                      <select value={customLogoRequired} onChange={handleCustomLogoChange} required className="form-select">
                        <option value="">Select Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      <div className="logo-info">
                        <small>Add your custom logo to the packaging (Additional charge: {currencySymbol}{convertToCurrency(500).toFixed(2)})</small>
                      </div>
                    </div>

                    {customLogoRequired === "Yes" && (
                      <div className="form-group">
                        <label className="form-label">Upload Logo File *</label>
                        <div className="file-upload-section">
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                            className="file-input"
                            required
                          />
                          <div className="file-upload-info">
                            <small>Supported formats: JPG, PNG, JPEG, PDF, DOC (Max: 10MB)</small>
                          </div>
                          
                          {logoUploading && (
                            <div className="upload-progress">
                              <div className="upload-spinner"></div>
                              <span>Uploading file...</span>
                            </div>
                          )}
                          
                          {customLogoFile && (
                            <div className="uploaded-file">
                              <div className="file-info">
                                <span className="file-name">{customLogoFile.name}</span>
                                <span className="file-size">({(customLogoFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                              </div>
                              <button type="button" onClick={handleRemoveFile} className="remove-file-btn">
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="form-group">
                      <label className="form-label">Currency *</label>
                      <select value={currency} onChange={handleCurrencyChange} required className="form-select">
                        <option value="">Select Currency</option>
                        {currencyOptions.map((curr, i) => (
                          <option key={i} value={curr.value}>
                            {curr.value} ({curr.symbol}) - {curr.name}
                          </option>
                        ))}
                      </select>
                      {exchangeInfo && (
                        <div className="currency-info">
                          <small>Exchange Rate: {exchangeInfo.example}</small>
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Additional Information</label>
                      <textarea
                        placeholder="Enter any additional information here"
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        className="form-textarea"
                        rows="4"
                      />
                    </div>
                  </section>

                  <div className="form-actions">
                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
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

              {/* Right Side - Estimated Bill (Also Scrollable) */}
              <div className="estimate-section-container" ref={estimateContainerRef}>
                <div className="price-breakdown-section">
                  <h4 className="price-breakdown-title">
                    {cifRequired === "Yes" ? "Estimated Bill Breakdown (CIF)" : "Estimated Bill Breakdown"}
                  </h4>
                  <div className="estimate-note">
                    <small>This is an estimated bill. Final pricing may vary based on actual costs and market conditions.</small>
                    {exchangeInfo && (
                      <div className="currency-conversion-note">
                        <small>Prices converted from INR to {currency}. {exchangeInfo.example}</small>
                      </div>
                    )}
                  </div>
                  <div className="price-breakdown-grid">
                    <div className="price-item">
                      <span className="price-label">Base Product Price:</span>
                      <span className="price-value">{currencySymbol}{formatNumber(displayPrices.baseProductPrice)}/unit</span>
                    </div>
                    <div className="price-item">
                      <span className="price-label">Grade Price:</span>
                      <span className="price-value">{currencySymbol}{formatNumber(displayPrices.gradePrice)}/unit</span>
                    </div>
                    <div className="price-item">
                      <span className="price-label">Packing Price:</span>
                      <span className="price-value">{currencySymbol}{formatNumber(displayPrices.packingPrice)}/bag</span>
                    </div>
                    <div className="price-item">
                      <span className="price-label">Quantity Price:</span>
                      <span className="price-value">{currencySymbol}{formatNumber(displayPrices.quantityPrice)}</span>
                    </div>
                    
                    {/* Port Charges - Always shown when port is selected */}
                    {port && (
                      <div className="price-item port-costs">
                        <span className="price-label">Port Charges ({port}):</span>
                        <span className="price-value">{currencySymbol}{formatNumber(displayPrices.portCost)}</span>
                      </div>
                    )}
                    
                    {customLogoRequired === "Yes" && (
                      <div className="price-item">
                        <span className="price-label">Custom Logo:</span>
                        <span className="price-value">{currencySymbol}{formatNumber(displayPrices.logoPrice)}</span>
                      </div>
                    )}
                    <div className="price-item subtotal">
                      <span className="price-label">Product Subtotal:</span>
                      <span className="price-value">{currencySymbol}{formatNumber(displayPrices.totalPrice)}</span>
                    </div>
                    
                    {/* CIF Costs - Only show when CIF is Yes */}
                    {cifRequired === "Yes" && (
                      <>
                        <div className="price-item cif-costs">
                          <span className="price-label">Shipping Cost:</span>
                          <span className="price-value">{currencySymbol}{formatNumber(displayPrices.shippingCost)}</span>
                        </div>
                        <div className="price-item cif-costs">
                          <span className="price-label">Insurance Cost:</span>
                          <span className="price-value">{currencySymbol}{formatNumber(displayPrices.insuranceCost)}</span>
                        </div>
                        <div className="price-item cif-costs">
                          <span className="price-label">Taxes & Duties:</span>
                          <span className="price-value">{currencySymbol}{formatNumber(displayPrices.taxes)}</span>
                        </div>
                      </>
                    )}
                    
                    <div className="price-item final-total">
                      <span className="price-label">
                        Final Total{cifRequired === "Yes" ? " (CIF)" : ""}:
                      </span>
                      <span className="price-value">{currencySymbol}{formatNumber(displayPrices.finalTotalPrice)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ThankYouPopup isOpen={showThankYou} onClose={() => setShowThankYou(false)} />

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
          padding: 10px;
          backdrop-filter: blur(10px);
        }

        .buy-modal-container {
          background: linear-gradient(135deg, #1a1f35, #2d3748);
          border: 1px solid rgba(74, 85, 104, 0.5);
          border-radius: 16px;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
          width: 100%;
          max-width: 1200px;
          max-height: 95vh;
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
          top: 15px;
          right: 15px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 35px;
          height: 35px;
          font-size: 18px;
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
          padding: 25px 25px 15px;
          border-bottom: 1px solid rgba(74, 85, 104, 0.3);
          background: rgba(26, 32, 44, 0.8);
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
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
          font-size: 1.5rem;
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
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.4;
        }

        .product-price-info {
          margin-top: 8px;
          padding: 6px 10px;
          background: rgba(66, 153, 225, 0.1);
          border-radius: 6px;
          border-left: 3px solid #4299e1;
        }

        .product-price-info small {
          color: #90cdf4;
          font-size: 0.8rem;
          line-height: 1.3;
        }

        .port-selection-info {
          margin-top: 5px;
          padding: 4px 8px;
          background: rgba(101, 163, 13, 0.1);
          border-radius: 4px;
          border-left: 2px solid #65a30d;
        }

        .port-selection-info small {
          color: #84cc16;
          font-size: 0.75rem;
        }

        .buy-modal-body {
          flex: 1;
          overflow: hidden;
          padding: 0;
          display: flex;
          flex-direction: column;
        }

        .modal-layout {
          display: flex;
          flex: 1;
          min-height: 0;
          overflow: hidden;
          flex-direction: row;
        }

        .form-section-container {
          flex: 1;
          min-width: 0;
          overflow-y: auto;
          border-right: 1px solid rgba(74, 85, 104, 0.2);
          display: flex;
          flex-direction: column;
        }

        .estimate-section-container {
          flex: 0 0 350px;
          background: rgba(26, 32, 44, 0.6);
          border-left: 1px solid rgba(74, 85, 104, 0.2);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .form-section {
          padding: 20px 25px;
          border-bottom: 1px solid rgba(74, 85, 104, 0.2);
          flex-shrink: 0;
        }

        .form-section:last-of-type {
          border-bottom: none;
        }

        .section-title {
          margin: 0 0 20px 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #63b3ed;
          display: flex;
          align-items: center;
          position: relative;
        }

        .section-title::before {
          content: "";
          width: 4px;
          height: 18px;
          background: linear-gradient(135deg, #4299e1, #3182ce);
          margin-right: 10px;
          border-radius: 2px;
        }

        .form-group {
          margin-bottom: 20px;
          position: relative;
        }

        .form-label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
          color: #e2e8f0;
          font-size: 0.9rem;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 12px 14px;
          background: rgba(45, 55, 72, 0.8);
          border: 1px solid rgba(74, 85, 104, 0.5);
          border-radius: 8px;
          font-size: 0.95rem;
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

        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2363b3ed' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          background-size: 14px;
          padding-right: 40px;
          cursor: pointer;
        }

        .form-select option {
          background: #2d3748;
          color: white;
          padding: 10px 14px;
          border: none;
          font-size: 0.95rem;
        }

        .country-code-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2363b3ed' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          background-size: 14px;
          padding-right: 40px;
          cursor: pointer;
          background: rgba(45, 55, 72, 0.8);
          border: 1px solid rgba(74, 85, 104, 0.5);
          border-radius: 8px;
          color: white;
          font-size: 0.9rem;
        }

        .phone-input-group {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .country-code-select {
          flex: 0 0 auto;
          width: 120px;
          padding: 12px;
        }

        .phone-input {
          flex: 1;
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
          font-family: inherit;
          line-height: 1.5;
        }

        .error-message {
          color: #fc8181;
          font-size: 0.8rem;
          margin-top: 5px;
        }

        .grade-info,
        .cif-info,
        .logo-info,
        .currency-info,
        .port-info {
          margin-top: 5px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.8rem;
          line-height: 1.3;
        }

        .port-cost-preview {
          margin-top: 5px;
          padding: 4px 8px;
          background: rgba(101, 163, 13, 0.1);
          border-radius: 4px;
          border-left: 2px solid #65a30d;
        }

        .port-cost-preview small {
          color: #84cc16;
          font-size: 0.75rem;
        }

        .file-upload-section {
          margin-top: 8px;
        }

        .file-input {
          width: 100%;
          padding: 10px;
          background: rgba(45, 55, 72, 0.8);
          border: 2px dashed rgba(74, 85, 104, 0.5);
          border-radius: 6px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .file-input:hover {
          border-color: #4299e1;
          background: rgba(45, 55, 72, 1);
        }

        .file-upload-info {
          margin-top: 6px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.8rem;
        }

        .upload-progress {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
          padding: 8px;
          background: rgba(45, 55, 72, 0.6);
          border-radius: 6px;
          color: #63b3ed;
          font-size: 0.9rem;
        }

        .upload-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid transparent;
          border-top: 2px solid #63b3ed;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .uploaded-file {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
          padding: 10px;
          background: rgba(45, 55, 72, 0.6);
          border: 1px solid rgba(74, 85, 104, 0.3);
          border-radius: 6px;
          flex-wrap: wrap;
          gap: 8px;
        }

        .file-info {
          display: flex;
          flex-direction: column;
          gap: 3px;
          flex: 1;
          min-width: 0;
        }

        .file-name {
          color: #e2e8f0;
          font-weight: 500;
          font-size: 0.9rem;
          word-break: break-word;
        }

        .file-size {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.8rem;
        }

        .remove-file-btn {
          background: #fc8181;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .remove-file-btn:hover {
          background: #f56565;
        }

        .price-breakdown-section {
          padding: 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        .price-breakdown-title {
          margin: 0 0 12px 0;
          font-size: 1.2rem;
          font-weight: 700;
          color: #63b3ed;
          text-align: center;
          background: linear-gradient(135deg, #4299e1, #63b3ed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.3;
        }

        .estimate-note {
          text-align: center;
          margin-bottom: 15px;
          padding: 10px;
          background: rgba(66, 153, 225, 0.1);
          border-radius: 6px;
          border-left: 3px solid #4299e1;
        }

        .estimate-note small {
          color: #90cdf4;
          font-size: 0.8rem;
          line-height: 1.3;
        }

        .currency-conversion-note {
          margin-top: 8px;
          padding: 8px;
          background: rgba(101, 163, 13, 0.1);
          border-radius: 5px;
          border-left: 3px solid #65a30d;
        }

        .currency-conversion-note small {
          color: #84cc16;
          font-size: 0.75rem;
          line-height: 1.3;
        }

        .price-breakdown-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
          min-height: 0;
        }

        .price-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(74, 85, 104, 0.2);
          flex-shrink: 0;
        }

        .price-item:last-child {
          border-bottom: none;
        }

        .price-item.subtotal {
          border-top: 2px solid #4299e1;
          border-bottom: none;
          padding-top: 12px;
          margin-top: 5px;
          font-weight: 600;
        }

        .price-item.port-costs {
          color: #90cdf4;
          border-left: 3px solid #4299e1;
          padding-left: 8px;
          background: rgba(66, 153, 225, 0.05);
          margin: 3px -8px;
          padding: 8px;
        }

        .price-item.cif-costs {
          color: #90cdf4;
          border-left: 3px solid #4299e1;
          padding-left: 8px;
          background: rgba(66, 153, 225, 0.05);
          margin: 3px -8px;
          padding: 8px;
        }

        .price-item.final-total {
          border-top: 2px solid #4299e1;
          border-bottom: none;
          padding-top: 12px;
          margin-top: 8px;
          font-weight: 700;
          background: rgba(66, 153, 225, 0.1);
          margin: 12px -8px -8px -8px;
          padding: 12px 8px;
          border-radius: 6px;
        }

        .price-label {
          color: #e2e8f0;
          font-size: 0.9rem;
          flex: 1;
          padding-right: 10px;
        }

        .price-value {
          color: #68d391;
          font-weight: 600;
          font-size: 0.9rem;
          text-align: right;
          white-space: nowrap;
        }

        .price-item.subtotal .price-value {
          color: #63b3ed;
        }

        .price-item.port-costs .price-value,
        .price-item.cif-costs .price-value {
          color: #90cdf4;
        }

        .price-item.final-total .price-value {
          color: #4299e1;
          font-size: 1.1rem;
        }

        .form-actions {
          padding: 20px 25px;
          background: rgba(26, 32, 44, 0.8);
          border-top: 1px solid rgba(74, 85, 104, 0.3);
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          align-items: center;
          flex-shrink: 0;
        }

        .submit-btn {
          background: linear-gradient(135deg, #4299e1, #3182ce);
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(66, 153, 225, 0.3);
          flex: 1;
          max-width: 120px;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(66, 153, 225, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-loading {
          display: flex;
          align-items: center;
          gap: 6px;
          justify-content: center;
        }

        .btn-spinner {
          width: 14px;
          height: 14px;
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
          padding: 12px 25px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          flex: 1;
          max-width: 120px;
        }

        .cancel-btn:hover {
          background: rgba(74, 85, 104, 0.5);
        }

        /* Scrollbar styling for both containers */
        .form-section-container::-webkit-scrollbar,
        .estimate-section-container::-webkit-scrollbar {
          width: 5px;
        }

        .form-section-container::-webkit-scrollbar-track,
        .estimate-section-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        .form-section-container::-webkit-scrollbar-thumb,
        .estimate-section-container::-webkit-scrollbar-thumb {
          background: rgba(66, 153, 225, 0.5);
          border-radius: 3px;
        }

        .form-section-container::-webkit-scrollbar-thumb:hover,
        .estimate-section-container::-webkit-scrollbar-thumb:hover {
          background: rgba(66, 153, 225, 0.7);
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .buy-modal-overlay {
            padding: 5px;
          }

          .buy-modal-container {
            max-height: 98vh;
            max-width: 100vw;
            border-radius: 12px;
          }

          .modal-layout {
            flex-direction: column;
          }

          .form-section-container {
            border-right: none;
            border-bottom: 1px solid rgba(74, 85, 104, 0.2);
            flex: 1;
            min-height: 0;
            max-height: 60vh;
          }

          .estimate-section-container {
            flex: 0 0 auto;
            border-left: none;
            border-top: 1px solid rgba(74, 85, 104, 0.2);
            max-height: 35vh;
            min-height: 250px;
          }

          .form-section {
            padding: 15px 20px;
          }

          .form-actions {
            padding: 15px 20px;
            flex-direction: column;
            gap: 10px;
          }

          .submit-btn,
          .cancel-btn {
            width: 100%;
            max-width: none;
          }

          .phone-input-group {
            flex-direction: column;
            gap: 8px;
          }

          .country-code-select {
            width: 100%;
          }

          .uploaded-file {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .remove-file-btn {
            align-self: stretch;
            text-align: center;
          }

          .price-breakdown-section {
            padding: 15px;
          }

          .price-breakdown-title {
            font-size: 1.1rem;
          }

          .price-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }

          .price-value {
            align-self: flex-end;
          }
        }

        @media (max-width: 480px) {
          .buy-modal-header {
            padding: 20px 20px 12px;
          }

          .buy-modal-title {
            font-size: 1.3rem;
          }

          .buy-modal-subtitle {
            font-size: 0.85rem;
          }

          .form-section {
            padding: 12px 15px;
          }

          .section-title {
            font-size: 1rem;
            margin-bottom: 15px;
          }

          .form-group {
            margin-bottom: 15px;
          }

          .form-input,
          .form-select,
          .form-textarea {
            padding: 10px 12px;
            font-size: 0.9rem;
          }

          .price-breakdown-section {
            padding: 12px;
          }

          .form-actions {
            padding: 12px 15px;
          }

          .submit-btn,
          .cancel-btn {
            padding: 10px 15px;
            font-size: 0.9rem;
          }
        }

        /* Extra small devices */
        @media (max-width: 360px) {
          .buy-modal-header {
            padding: 15px 15px 10px;
          }

          .form-section {
            padding: 10px 12px;
          }

          .price-breakdown-section {
            padding: 10px;
          }

          .price-item {
            padding: 8px 0;
          }

          .price-label,
          .price-value {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </>
  );
};

export default BuyModal;