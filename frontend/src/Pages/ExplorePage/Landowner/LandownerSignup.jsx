import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import "./LandownerSignup.css";

const LandownerSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    landSize: "",
    location: "",
    ownerAddress: "",
    rentOrSell: "",
    expectedPayment: "",
    preferredBusiness: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const res = await api.post("/landowner", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        alert("Landowner profile created successfully!");
        navigate("/profile");
      }
    } catch (err) {
      console.error("Error creating landowner profile:", err.response?.data || err.message);
      alert("Failed to create landowner profile.");
    }
  };

  return (
    <div className="signup-form-container">
      <h2 className="form-title">Landowner Signup</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="name" placeholder="Name" required value={form.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required value={form.email} onChange={handleChange} />
        <input type="text" name="contact" placeholder="Contact" required value={form.contact} onChange={handleChange} />
        <input type="text" name="landSize" placeholder="Land Size" value={form.landSize} onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <input type="text" name="ownerAddress" placeholder="Address" value={form.ownerAddress} onChange={handleChange} />
        <select name="rentOrSell" value={form.rentOrSell} onChange={handleChange} required>
          <option value="">Rent or Sell</option>
          <option value="rent">Rent</option>
          <option value="sell">Sell</option>
        </select>
        <input type="text" name="expectedPayment" placeholder="Expected Payment" value={form.expectedPayment} onChange={handleChange} />
        <input type="text" name="preferredBusiness" placeholder="Preferred Business Type" value={form.preferredBusiness} onChange={handleChange} />
        <button type="submit" className="signup-button">Create Profile</button>
      </form>
    </div>
  );
};

export default LandownerSignup;
