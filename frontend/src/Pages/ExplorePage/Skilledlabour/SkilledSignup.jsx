import { useState } from "react";
import "./SkilledSignup.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../Context/UserContext"; 
import api from "../../../utils/api";

const SkilledLaborSignup = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    expectedSalary: "",
    password: "",
    skillset: "",
    certifications: "",
    location: "",
    experience: "",
    workSamples: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, workSamples: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^\d{10}$/;

    if (!nameRegex.test(formData.name)) {
      return alert("Name should contain only letters and spaces.");
    }
    if (!emailRegex.test(formData.email)) {
      return alert("Enter a valid email.");
    }
    if (!contactRegex.test(formData.contact)) {
      return alert("Contact number must be 10 digits.");
    }
    if (parseFloat(formData.expectedSalary) <= 0) {
      return alert("Expected salary must be a positive number.");
    }
    if (parseFloat(formData.experience) < 0) {
      return alert("Experience cannot be negative.");
    }

    try {
      // Step 1: Register user
      const signupRes = await api.post("/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        contact: formData.contact,
        role: "labor",
      });

      const { token, user } = signupRes.data;
      localStorage.setItem("token", token);

      // Step 2: Submit labor profile
      const profileRes = await api.post(
        "/labor",
        {
          contact: formData.contact,
          expectedSalary: formData.expectedSalary,
          location: formData.location,
          email: formData.email,
          skillset: formData.skillset,
          certifications: formData.certifications,
          experience: formData.experience,
          workSamples: formData.workSamples,
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
      <h2>Skilled Labor Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

        <input type="number" name="expectedSalary" placeholder="Expected Salary" onChange={handleChange} required />
        <input type="text" name="skillset" placeholder="Skillset" onChange={handleChange} required />
        <input type="number" name="experience" placeholder="Experience (in years)" onChange={handleChange} required />
        <input type="text" name="certifications" placeholder="Certifications (if any)" onChange={handleChange} />
        <input type="text" name="location" placeholder="Location/Address" onChange={handleChange} required />
        <input type="file" multiple accept="image/*" onChange={handleFileChange} />
        
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SkilledLaborSignup;
