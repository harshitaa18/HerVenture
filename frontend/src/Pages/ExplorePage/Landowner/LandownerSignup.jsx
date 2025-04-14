import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../Context/UserContext";
import { motion } from "framer-motion";
import "./LandownerSignup.css";
import api from "../../../utils/api";

const LandownerSignup = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
    landSize: "",
    location: "",
    ownerAddress: "",
    rentOrSell: "",
    expectedPayment: "",
    preferredBusiness: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      // Validate personal info
      if (formData.name.trim().split(" ").length < 2) {
        newErrors.name = "Please enter your full name";
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      
      if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long";
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      
      const contactRegex = /^\d{10}$/;
      if (!contactRegex.test(formData.contact)) {
        newErrors.contact = "Contact number must be exactly 10 digits";
      }
    } else if (step === 2) {
      // Validate land info
      if (!formData.landSize.trim().match(/^\d+\s*(sq\.?\s*ft|acres?|hectares?)$/i)) {
        newErrors.landSize = "Land size must include a unit (e.g., '100 sq.ft', '2 acres')";
      }
      
      if (!formData.location.trim()) {
        newErrors.location = "Land location is required";
      }
      
      if (!formData.ownerAddress.trim()) {
        newErrors.ownerAddress = "Owner address is required";
      }
      
      if (!formData.rentOrSell) {
        newErrors.rentOrSell = "Please select rent or sell option";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(currentStep)) return;
    
    setIsLoading(true);

    try {
      const signupRes = await api.post("/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        contact: formData.contact,
        role: "landowner",
      });

      const { token, user } = signupRes.data;
      localStorage.setItem("token", token);

      const profileRes = await api.post("/landowner",
        {
          userId: user._id,
          contact: formData.contact,
          landSize: formData.landSize,
          location: formData.location,
          email: formData.email,
          rentOrSell: formData.rentOrSell,
          expectedPayment: formData.expectedPayment,
          preferredBusiness: formData.preferredBusiness,
          ownerAddress: formData.ownerAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser({ ...user, ...profileRes.data });
      
      // Show success animation before redirecting
      setCurrentStep(3); // Success step
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (err) {
      console.error("Signup error: ", err.response?.data || err.message);
      const errorMsg = err.response?.data?.details || "Signup failed. Please try again.";
      setErrors({ submit: errorMsg });
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  // Form content based on current step
  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key="step1"
            className="form-step"
          >
            <h3 className="step-title">Personal Information</h3>
            
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name"
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className={errors.name ? "error" : ""}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </motion.div>
            
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email"
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </motion.div>
            
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="contact">Contact Number</label>
              <input 
                type="text" 
                id="contact"
                name="contact" 
                value={formData.contact} 
                onChange={handleChange}
                className={errors.contact ? "error" : ""}
              />
              {errors.contact && <p className="error-text">{errors.contact}</p>}
            </motion.div>
            
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password"
                name="password" 
                value={formData.password} 
                onChange={handleChange}
                className={errors.password ? "error" : ""}
              />
              {errors.password && <p className="error-text">{errors.password}</p>}
            </motion.div>
            
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword"
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange}
                className={errors.confirmPassword ? "error" : ""}
              />
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
            </motion.div>
            
            <motion.div variants={itemVariants} className="button-container">
              <button type="button" className="next-btn" onClick={nextStep}>
                Next Step
              </button>
            </motion.div>
          </motion.div>
        );
        
      case 2:
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key="step2"
            className="form-step"
          >
            <h3 className="step-title">Land Information</h3>
            
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="landSize">Land Size</label>
              <input 
                type="text" 
                id="landSize"
                name="landSize" 
                placeholder="e.g., 100 sq.ft, 2 acres"
                value={formData.landSize} 
                onChange={handleChange}
                className={errors.landSize ? "error" : ""}
              />
              {errors.landSize && <p className="error-text">{errors.landSize}</p>}
            </motion.div>
            
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="location">Land Location</label>
              <input 
                type="text" 
                id="location"
                name="location" 
                value={formData.location} 
                onChange={handleChange}
                className={errors.location ? "error" : ""}
              />
              {errors.location && <p className="error-text">{errors.location}</p>}
            </motion.div>
            
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="ownerAddress">Owner Address</label>
              <input 
                type="text" 
                id="ownerAddress"
                name="ownerAddress" 
                value={formData.ownerAddress} 
                onChange={handleChange}
                className={errors.ownerAddress ? "error" : ""}
              />
              {errors.ownerAddress && <p className="error-text">{errors.ownerAddress}</p>}
            </motion.div>
            
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="rentOrSell">Rent or Sell</label>
              <select 
                id="rentOrSell"
                name="rentOrSell" 
                value={formData.rentOrSell} 
                onChange={handleChange}
                className={errors.rentOrSell ? "error" : ""}
              >
                <option value="">Select an option</option>
                <option value="rent">Rent</option>
                <option value="sell">Sell</option>
              </select>
              {errors.rentOrSell && <p className="error-text">{errors.rentOrSell}</p>}
            </motion.div>
            
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="expectedPayment">Expected Payment</label>
              <input 
                type="text" 
                id="expectedPayment"
                name="expectedPayment" 
                placeholder="e.g., ₹10,000/month or ₹50,00,000"
                value={formData.expectedPayment} 
                onChange={handleChange}
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="preferredBusiness">Preferred Business Type</label>
              <input 
                type="text" 
                id="preferredBusiness"
                name="preferredBusiness" 
                placeholder="e.g., Agriculture, Retail, Manufacturing"
                value={formData.preferredBusiness} 
                onChange={handleChange}
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="button-container dual-buttons">
              <button type="button" className="back-btn" onClick={prevStep}>
                Back
              </button>
              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </motion.div>
            
            {errors.submit && <p className="error-text submit-error">{errors.submit}</p>}
          </motion.div>
        );
        
      case 3:
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key="success"
            className="success-step"
          >
            <motion.div 
              className="success-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#8e44ad" />
                <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="success-title"
            >
              Account Created Successfully!
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="success-message"
            >
              Redirecting you to login...
            </motion.p>
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="signup-page">
      <div className="purple-blob blob-top-left"></div>
      <div className="purple-blob blob-bottom-right"></div>
      <div className="pink-blob blob-middle-right"></div>
      
      <motion.div 
        className="signup-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-filled" 
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
          <div className="step-indicators">
            <div className={`step-indicator ${currentStep >= 1 ? "active" : ""}`}>1</div>
            <div className={`step-indicator ${currentStep >= 2 ? "active" : ""}`}>2</div>
            <div className={`step-indicator ${currentStep >= 3 ? "active" : ""}`}>3</div>
          </div>
        </div>
        
        <h2 className="form-title">
          {currentStep === 3 ? "Success!" : "Landowner Sign Up"}
        </h2>
        
        <form className="signup-form" onSubmit={handleSubmit}>
          {renderFormStep()}
        </form>
        
        {currentStep < 3 && (
          <p className="login-link">
            Already have an account? <a href="/login">Log in</a>
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default LandownerSignup;