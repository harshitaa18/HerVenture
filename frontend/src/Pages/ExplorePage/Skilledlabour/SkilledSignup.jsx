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

      // Step 2: Submit entrepreneur profile
      const profileRes = await api.post("/labor",{
          contact: formData.contact,
          expectedSalary: formData.expectedSalary,
          location: formData.location,
          email: formData.email,
          skillset: formData.skillset,
          certifications: formData.certifications,
          experience: formData.experience,
          workSamples: formData.workSamples
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
      <h2>Skilled Labor Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required/>

        <input type="number" name="expectedSalary" placeholder="Expected Salary" onChange={handleChange} required />
        <input type="text" name="skillset" placeholder="Skillset" onChange={handleChange} required />
        <input type="number" name="experience" placeholder="Experience" onChange={handleChange} required />
        <input type="text" name="certifications" placeholder="Certifications (if any)" onChange={handleChange} />
        <input type="text" name="location" placeholder="Location/Address" onChange={handleChange} required />
        <input type="file" multiple accept="image/*" onChange={handleFileChange} />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SkilledLaborSignup;