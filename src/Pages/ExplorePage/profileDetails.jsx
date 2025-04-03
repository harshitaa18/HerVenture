import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { entrepreneurs, landowners, skilledLabor, suppliers } from "./data";
import "./profileDetail.css";

const ProfileDetail = () => {
  const { role, id } = useParams();
  const navigate = useNavigate();

  const dataMap = {
    "skilled-labor": skilledLabor,
    entrepreneur: entrepreneurs,
    landowner: landowners,
    supplier: suppliers,
  };

  const formattedRole = role.replace("-", " "); // Convert hyphenated roles to normal ones
  const userDetails = dataMap[role]?.find((user) => user.id.toString() === id);

  if (!userDetails) return <p className="error-message">Profile not found.</p>;

  return (
    <div className="profile-detail-container">
      <div className="profile-card-details">
        {/* Profile Image Section */}
        <div className="profile-image">
          <span>{userDetails.name.charAt(0)}</span> {/* Placeholder Initial */}
        </div>

        {/* User Name & Role */}
        <h2>{userDetails.name}</h2>
        <p className="role">{formattedRole.toUpperCase()}</p>

        {/* Contact Section */}
        <div className="contact-section">
          <p><b>Email:</b> {userDetails.email || userDetails.contact}</p>
        </div>

        {/* Dynamic Details Based on Role */}
        <div className="profile-details">
          {role === "entrepreneur" && (
            <>
              <p><b>Business:</b> {userDetails.business}</p>
              <p><b>Location:</b> {userDetails.location}</p>
            </>
          )}
          {role === "skilled-labor" && (
            <>
              <p><b>Skill:</b> {userDetails.skill}</p>
              <p><b>Experience:</b> {userDetails.experience} years</p>
            </>
          )}
          {role === "landowner" && (
            <>
              <p><b>Land Size:</b> {userDetails.size}</p>
              <p><b>Location:</b> {userDetails.location}</p>
            </>
          )}
          {role === "supplier" && (
            <>
              <p><b>Industry:</b> {userDetails.industry}</p>
              <p><b>Location:</b> {userDetails.location}</p>
            </>
          )}
        </div>

        {/* Back Button */}
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default ProfileDetail;
