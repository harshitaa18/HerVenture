import { useState } from "react";
import "./EntrepreneurialSignup.css";

const EntrepreneurSignup = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Entrepreneur Signup Data:", formData);
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
