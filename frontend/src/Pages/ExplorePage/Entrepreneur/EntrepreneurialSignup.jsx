import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useUser } from "../../../Context/UserContext"; // Import User Context
import "./EntrepreneurialSignup.css";
import api from "../../../utils/api";

const EntrepreneurSignup = () => {
  const { setUser } = useUser(); // Get function to set user data
  const navigate = useNavigate(); // Initialize navigation

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    businessLicense: "",
    aboutBusiness: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newUser = {
      name: formData.name,
      contact: formData.contact,
      email: formData.email,
      businessLicense: formData.businessLicense,
      aboutBusiness: formData.aboutBusiness,
      location: formData.location,
    };
  
    try {
      const res = await api.post("/entrepreneurs", newUser);
      setUser(res.data); // save response
      navigate("/profile");
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="signup-form-container">
      <h2>Entrepreneur Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="businessLicense" placeholder="Business License (Optional)" value={formData.businessLicense} onChange={handleChange} />
        <textarea name="aboutBusiness" placeholder="About Your Business (100-150 words)" value={formData.aboutBusiness} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location/Address" value={formData.location} onChange={handleChange} required />

        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default EntrepreneurSignup;
