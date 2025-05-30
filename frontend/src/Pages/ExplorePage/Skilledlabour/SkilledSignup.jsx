import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../Context/UserContext";
import { motion } from "framer-motion";
import "./SkilledSignup.css";
import api from "../../../utils/api";

const SkilledLaborSignup = () => {
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
    expectedSalary: "",
    skillset: "",
    certifications: "",
    location: "",
    experience: "",
    workSamples: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, workSamples: e.target.files }));
    
    if (errors.workSamples) {
      setErrors((prev) => ({ ...prev, workSamples: null }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      // Validate personal info
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(formData.name)) {
        newErrors.name = "Name should contain only letters and spaces";
      }
      
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
      // Validate professional info
      if (!formData.skillset.trim()) {
        newErrors.skillset = "Skillset is required";
      }
      
      if (!formData.location.trim()) {
        newErrors.location = "Location is required";
      }
      
      if (!formData.expectedSalary.trim()) {
        newErrors.expectedSalary = "Expected salary is required";
      } else if (parseFloat(formData.expectedSalary) <= 0) {
        newErrors.expectedSalary = "Expected salary must be a positive number";
      }
      
      if (!formData.experience.trim()) {
        newErrors.experience = "Experience is required";
      } else if (parseFloat(formData.experience) < 0) {
        newErrors.experience = "Experience cannot be negative";
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
        role: "labor",
      });

      const { token, user } = signupRes.data;
      localStorage.setItem("token", token);

      const profileRes = await api.post("/labor",
        {
          userId: user._id,
          contact: formData.contact,
          expectedSalary: formData.expectedSalary,
          location: formData.location,
          email: formData.email,
          skillset: formData.skillset,
          certifications: formData.certifications,
          experience: formData.experience,
          workSamples: formData.workSamples,
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
            <h3 className="step-title">Professional Information</h3>
            
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="skillset">Skills & Expertise</label>
              <input 
                type="text" 
                id="skillset"
                name="skillset" 
                placeholder="e.g., Carpentry, Plumbing, Electrical work"
                value={formData.skillset} 
                onChange={handleChange}
                className={errors.skillset ? "error" : ""}
              />
              {errors.skillset && <p className="error-text">{errors.skillset}</p>}
            </motion.div>
            
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="experience">Years of Experience</label>
              <input 
                type="number" 
                id="experience"
                name="experience" 
                value={formData.experience} 
                onChange={handleChange}
                className={errors.experience ? "error" : ""}
              />
              {errors.experience && <p className="error-text">{errors.experience}</p>}
            </motion.div>
            
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="expectedSalary">Expected Salary</label>
              <input 
                type="number" 
                id="expectedSalary"
                name="expectedSalary" 
                value={formData.expectedSalary} 
                onChange={handleChange}
                className={errors.expectedSalary ? "error" : ""}
              />
              {errors.expectedSalary && <p className="error-text">{errors.expectedSalary}</p>}
            </motion.div>
            
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="certifications">Certifications (if any)</label>
              <input 
                type="text" 
                id="certifications"
                name="certifications" 
                placeholder="e.g., AWS Certified Welder, Licensed Electrician"
                value={formData.certifications} 
                onChange={handleChange}
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="location">Current Location</label>
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
              <label htmlFor="workSamples">Work Samples (Optional)</label>
              <input 
                type="file" 
                id="workSamples"
                name="workSamples" 
                multiple 
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
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
          {currentStep === 3 ? "Success!" : "Skilled Labor Sign Up"}
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

export default SkilledLaborSignup;