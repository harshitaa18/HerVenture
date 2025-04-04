import { useState } from "react";
import "./SkilledSignup.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useUser } from "../../../Context/UserContext"; 
import api from "../../../utils/api";

const SkilledLaborSignup = () => {
  const { setUser } = useUser(); // Get function to set user data
  const navigate = useNavigate(); // Initialize navigation

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    expectedSalary: "",
    skillset: "",
    certifications: "",
    location: "",
    experience: "",
    workSamples: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, workSamples: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    for (const key in formData) {
      if (key === "workSamples") {
        for (let i = 0; i < formData.workSamples.length; i++) {
          data.append("workSamples", formData.workSamples[i]);
        }
      } else {
        data.append(key, formData[key]);
      }
    }
  
    try {
      const res = await api.post("/labor", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(res.data);
      navigate("/profile");
    } catch (err) {
      console.error("Signup error:", err);
    }
  };
  

  return (
    <div className="signup-form-container">
      <h2>Skilled Labor Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="expectedSalary" placeholder="Expected Salary" onChange={handleChange} required />
        <input type="text" name="skillset" placeholder="Skillset" onChange={handleChange} required />
        <input type="text" name="experience" placeholder="Experience" onChange={handleChange} required />
        <input type="text" name="certifications" placeholder="Certifications (if any)" onChange={handleChange} />
        <input type="text" name="location" placeholder="Location/Address" onChange={handleChange} required />
        <input type="file" multiple accept="image/*" onChange={handleFileChange} />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SkilledLaborSignup;