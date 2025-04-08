import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../Context/UserContext";
import "./EntrepreneurialSignup.css";
import api from "../../../utils/api";

const EntrepreneurSignup = () => {
  const {setUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    businessLicense: "",
    aboutBusiness: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Register user
      const signupRes = await api.post("/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        contact: formData.contact,
        role: "entrepreneur",
      });
      
      const { token, user } = signupRes.data;
     
      localStorage.setItem("token", token);

      // Step 2: Submit entrepreneur profile
      const profileRes = await api.post("/entrepreneur",{
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
      <h2>Entrepreneur Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="text" name="businessLicense" placeholder="Business License (Optional)" value={formData.businessLicense} onChange={handleChange} />
        <textarea name="aboutBusiness" placeholder="About Your Business (100-150 words)" value={formData.aboutBusiness} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location/Address" value={formData.location} onChange={handleChange} required />

        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default EntrepreneurSignup;