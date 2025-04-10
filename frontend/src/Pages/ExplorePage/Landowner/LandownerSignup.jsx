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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Name: at least two words
    if (!form.name.trim().match(/^\w+\s+\w+/)) {
      newErrors.name = "Please enter your full name.";
    }

    // Email
    if (
      !form.email.match(
        /^[\w-.]+@([\w-]+\.)+(com|co\.in)$/
      )
    ) {
      newErrors.email = "Enter a valid email with @ and .com or .co.in.";
    }

    // Contact number: 10 digits
    if (!form.contact.match(/^\d{10}$/)) {
      newErrors.contact = "Contact number must be exactly 10 digits.";
    }

    // Land size must have unit (e.g., "100 sq.ft", "2 acres")
    if (!form.landSize.trim().match(/^\d+\s*(sq\.?\s*ft|acres?|hectares?)$/i)) {
      newErrors.landSize = "Land size must include a unit (e.g., '100 sq.ft', '2 acres').";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const signupRes = await api.post("/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
        contact: form.contact,
        role: "landowner",
      });

      const { token, user } = signupRes.data;
      localStorage.setItem("token", token);

      const profileRes = await api.post(
        "/landowner",
        {
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

      setUser({ ...user, ...profileRes.data });
      navigate("/login");
    } catch (err) {
      console.error("Signup error: ", err.response?.data || err.message);
      alert(err.response?.data?.details || "Signup failed.");
    }
  };

  return (
    <div className="signup-form-container">
      <h2 className="form-title">Landowner Signup</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
        {errors.name && <span className="error">{errors.name}</span>}

        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}

        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />

        <input type="text" name="contact" placeholder="Contact Number" value={form.contact} onChange={handleChange} />
        {errors.contact && <span className="error">{errors.contact}</span>}

        <input type="text" name="landSize" placeholder="Land Size (e.g., 100 sq.ft)" value={form.landSize} onChange={handleChange} />
        {errors.landSize && <span className="error">{errors.landSize}</span>}

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
