import React, { useState } from "react";
import "./PostRequirement.css";
import createImage from "../Assets/create-property.png";
import API from "../../utils/api";
import { useNavigate, useLocation  } from "react-router-dom";
// import UserContext  from "../../Context/UserContext";

const PostRequirement = () => {
  // const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || "entrepreneur";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    tags: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/post", {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        role,
      });

      
      navigate("/dashboard"); // Redirect or show success message
    } catch (err) {
      console.error("Post creation failed:", err.response?.data || err.message);
    }
  };
  return (
    <div className="post-container">
      <div className="post-left">
        <h2>Create Your Property Post</h2>
        <p className="highlight">Reach thousands of users with your land or labor requirement</p>
        <ul>
          <li>List available land or business space</li>
          <li>Post skilled labor or raw material needs</li>
          <li>Attract the right matches for your requirement</li>
        </ul>
        <img src={createImage} alt="Create Property" className="property-image" />
      </div>

      <div className="post-form">
        <h3>Post Requirement Form</h3>

        <form onSubmit={handleSubmit}>
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          className="input-box"
          placeholder="Enter title..."
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label className="form-label">Description</label>
        <textarea
          name="description"
          className="input-box"
          rows="5"
          placeholder="Describe your requirement..."
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label className="form-label">Location</label>
        <input
          type="text"
          name="location"
          className="input-box"
          placeholder="Enter location..."
          value={formData.location}
          onChange={handleChange}
          required
        />
        <label className="form-label">Tags</label>
        <input type="text" name="tags" className="input-box" placeholder="Add tags (comma separated)" value={formData.tags} onChange={handleChange} />
        <label className="form-label">Contact</label>
          <input type="number" name="contact" className="input-box" placeholder="Add contact so that others can reach you" value={formData.contact} onChange={handleChange} />
        <button className="submit-button" type="submit">
          Submit Post
        </button>
      </form>
      </div>
    </div>
  );
};

export default PostRequirement;
