import { useState } from "react";
import "./SupplierSignup.css";

const SupplierSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    companyName: "",
    productType: "",
    certifications: "",
    location: "",
    productSamples: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, productSamples: e.target.files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Supplier Signup Data:", formData);
  };

  return (
    <div className="signup-form-container">
      <h2>Supplier Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="companyName" placeholder="Company Name" onChange={handleChange} required />
        <input type="text" name="productType" placeholder="Type of Products Supplied" onChange={handleChange} required />
        <input type="text" name="certifications" placeholder="Certifications (if any)" onChange={handleChange} />
        <input type="text" name="location" placeholder="Location/Address" onChange={handleChange} required />
        <input type="file" multiple accept="image/*" onChange={handleFileChange} />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SupplierSignup;
