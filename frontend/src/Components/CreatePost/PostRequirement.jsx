import React from "react";
import "./PostRequirement.css";
import createImage from "../Assets/create-property.png";

const PostRequirement = () => {
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

        <label className="form-label">Title</label>
        <input type="text" className="input-box" placeholder="Enter title..." />

        <label className="form-label">Description</label>
        <textarea className="input-box" rows="5" placeholder="Describe your requirement..."></textarea>

        <label className="form-label">Location</label>
        <input type="text" className="input-box" placeholder="Enter location..." />

        <button className="submit-button">Submit Post</button>
      </div>
    </div>
  );
};

export default PostRequirement;
