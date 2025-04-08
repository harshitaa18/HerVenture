import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./profileDetail.css";

const ProfileDetail = () => {
  const { role, id } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`https://your-backend-url.com/api/profile/${role}/${id}`);
        if (!response.ok) throw new Error("Profile not found");
        const data = await response.json();
        setUserDetails(data);
        console.log(userDetails);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, [role, id]);

  if (error) return <p className="error-message">{error}</p>;
  if (!userDetails) return <p>Loading...</p>;

  return (
    <div className="profile-detail-container">
      <div className="profile-card-details">
        {/* Profile Image Section */}
        <div className="profile-image">
          <span>{userDetails.name.charAt(0)}</span>
        </div>

        {/* User Name & Role */}
        <h2>{userDetails.name}</h2>
        <p className="role">{role.toUpperCase()}</p>

        {/* Contact */}
        <div className="contact-section">
          <p><b>Email:</b> {userDetails.email || userDetails.contact}</p>
        </div>

        {/* Dynamic Role Details */}
        <div className="profile-details">
          {role === "entrepreneur" && (
            <>
              <p><b>Business:</b> {userDetails.business}</p>
              <p><b>Location:</b> {userDetails.location}</p>
            </>
          )}
          {role === "labor" && (
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
