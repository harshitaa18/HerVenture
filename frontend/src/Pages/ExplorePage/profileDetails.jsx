import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./profileDetail.css";
import { MdEmail } from "react-icons/md";

const ProfileDetail = () => {
  const { role, id } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/profile/${role}/${id}`);
        setUserDetails(response.data);
        console.log()
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      }
    };
    fetchProfile();
  }, [role, id]);

  if (error) return <p className="error-message">{error}</p>;
  if (!userDetails) return <p>Loading...</p>;

  return (
    <div className="profile-detail-container">
      <div className="leaf-shape top-right"></div>
      <div className="leaf-shape bottom-left"></div>

      <div className="profile-card">
        <div className="profile-left">
          <div className="image-circle">
            {userDetails.name?.charAt(0)}
          </div>
          <h2>{userDetails.name}</h2>
          <p className="role">{role.toUpperCase()}</p>
        </div>

        <div className="profile-right">
          <h3>Profile Details</h3>
          <p>
            <strong>Email:</strong>{" "}
            {userDetails.email}
            <a
              href={`mailto:${userDetails.email}`}
              className="email-link"
              style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", color: "purple", fontSize: "20px", paddingLeft:"130px"}}
            >
              <MdEmail style={{ marginRight: "5px" }} />
              
            </a>
          </p>
          <p><strong>Phone No.:</strong> {userDetails.contact}</p>            
          <p><strong>Location:</strong> {userDetails.location}</p>

          {role === "entrepreneur" && (
            <>
              <p><strong>Business:</strong> {userDetails.business}</p>
            </>
          )}
          {role === "labor" && (
            <>
              <p><strong>Skill:</strong> {userDetails.skillset}</p>
              <p><strong>Experience:</strong> {userDetails.experience} years</p>
            </>
          )}
          {role === "landowner" && (
            <>
              <p><strong>Land Size:</strong> {userDetails.landSize}</p>
            </>
          )}
          {role === "supplier" && (
            <>
              <p><strong>Industry:</strong> {userDetails.industry}</p>
            </>
          )}

          <button className="back-button" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
