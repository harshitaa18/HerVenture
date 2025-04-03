import { useState } from "react";
import "./SkilledSignup.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useUser } from "../../../Context/UserContext"; 

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: formData.name,
      role: "skilled labor",
      skill: formData.skillset,
      experience: formData.experience,
      expectedSalary: formData.expectedSalary,
    };

    setUser(newUser); // Save user in context

    // Navigate to profile page after signup
    navigate("/profile");
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