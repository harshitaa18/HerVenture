import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../Context/UserContext";
import "./EntrepreneurialSignup.css";
import api from "../../../utils/api";

const EntrepreneurSignup = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessLicense: "",
    aboutBusiness: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword, contact } = formData;

    // Check full name
    if (name.trim().split(" ").length < 2) {
      alert("Please enter your full name.");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|co\.in)$/i;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address (must include @ and end with .com or .co.in).");
      return false;
    }

    // Contact number validation
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contact)) {
      alert("Contact number must be exactly 10 digits.");
      return false;
    }

    // Password confirmation
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const signupRes = await api.post("/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        contact: formData.contact,
        role: "entrepreneur",
      });

      const { token, user } = signupRes.data;
      localStorage.setItem("token", token);

      const profileRes = await api.post("/entrepreneur",
        {
          userId: user._id,
          contact: formData.contact,
          business: formData.businessLicense,
          location: formData.location,
          email: formData.email,
          aboutBusiness: formData.aboutBusiness,
          businessLicense: formData.businessLicense,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser({ ...user, ...profileRes.data });
      navigate("/login");
    } catch (err) {
      console.error("Signup error: ", err.response?.data || err.message);
      alert(err.response?.data?.details || "Signup failed.");
    }
  };

  return (
    <div className="signup-page">
      <div className="purple-blob blob-top-left"></div>
      <div className="purple-blob blob-bottom-right"></div>
      <div className="signup-container">
        <h2 className="form-title">Get Started</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />
          <input type="text" name="businessLicense" placeholder="Business License" value={formData.businessLicense} onChange={handleChange} required />
          <textarea name="aboutBusiness" placeholder="About Your Business" value={formData.aboutBusiness} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Business Location" value={formData.location} onChange={handleChange} required />
          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default EntrepreneurSignup;
