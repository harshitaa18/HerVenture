import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import { useUser } from "../../../Context/UserContext";
import "./LandownerSignup.css";

const LandownerSignup = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    landSize: "",
    location: "",
    ownerAddress: "",
    rentOrSell: "",
    expectedPayment: "",
    preferredBusiness: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Register user
      const signupRes = await api.post("/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
        contact: form.contact,
        role: "landowner",
      });
      const { token, user } = signupRes.data;
      localStorage.setItem("token", token);
      const profileRes = await api.post("/landowner",{
        contact: form.contact,
        landSize: form.landSize,
        location: form.location,
        email: form.email,
        rentOrSell: form.rentOrSell,
        expectedPayment: form.expectedPayment,
        preferredBusiness: form.preferredBusiness,
        ownerAddress: form.ownerAddress,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Flatten user + profile data into one object
    setUser({ ...user, ...profileRes.data });
    navigate("/profile");
  } catch (err) {
    console.error("Signup error: ", err.response?.data || err.message);
    alert(err.response?.data?.details || "Signup failed.");
  }
  };

  return (
    <div className="signup-form-container">
      <h2 className="form-title">Landowner Signup</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="name" placeholder="Name" required value={form.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required value={form.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
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
