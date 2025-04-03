import { useState } from "react";
import "./LandownerSignup.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useUser } from "../../../Context/UserContext";

const LandOwnerSignup = () => {
  const { setUser } = useUser(); // Get function to set user data
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    landSize: "",
    location: "",
    ownerAddress: "",
    rentOrSell: "rent",
    expectedPayment: "",
    landPhotos: null,
    preferredBusiness: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, landPhotos: e.target.files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: formData.name,
      role: "landowner",
      landSize: formData.landSize,
      expectedPayment: formData.expectedPayment,
      location: formData.location,
      rentOrSell: formData.rentOrSell,
    };

    setUser(newUser); // Save user in context

    // Navigate to profile page after signup
    navigate("/profile");
  };

  return (
    <div className="signup-form-container">
      <h2>Land Owner Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="landSize" placeholder="Land Size" onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <input type="text" name="ownerAddress" placeholder="Owner Address" onChange={handleChange} required />
        <select name="rentOrSell" onChange={handleChange}>
          <option value="rent">Rent</option>
          <option value="sell">Sell</option>
        </select>
        <input type="text" name="expectedPayment" placeholder="Expected Payment" onChange={handleChange} required />
        <input type="file" multiple accept="image/*" onChange={handleFileChange} />
        <input type="text" name="preferredBusiness" placeholder="Preferred Business" onChange={handleChange} required />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default LandOwnerSignup;
