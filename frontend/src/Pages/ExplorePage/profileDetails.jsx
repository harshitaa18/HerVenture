import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./profileDetail.css";
import { MdEmail, MdPhone, MdLocationOn, MdBusiness, MdWork, MdLandscape, MdInventory } from "react-icons/md";
import ChatPop from "../../Components/ChatPop/ChatPop";
import { useUser } from "../../Context/UserContext";
import API from "../../utils/api";

const ProfileDetail = () => {
  const { user } = useUser();
  const { role, id } = useParams();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await API.get(`/${role}/${id}`);
        setUserDetails(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch profile details");
        console.error("Error fetching profile:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [role, id]);

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="back-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="error-container">
        <p className="error-message">Profile not found</p>
        <button className="back-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  const renderRoleSpecificDetails = () => {
    switch (role) {
      case "entrepreneur":
        return (
          <>
            <div className="detail-item">
              <MdBusiness className="detail-icon" />
              <div>
                <strong>Business</strong>
                <p>{userDetails.aboutBusiness || "N/A"}</p>
              </div>
            </div>
            <div className="detail-item">
              <MdWork className="detail-icon" />
              <div>
                <strong>Business License</strong>
                <p>{userDetails.businessLicense || "N/A"}</p>
              </div>
            </div>
          </>
        );
      case "labor":
        return (
          <>
            <div className="detail-item">
              <MdWork className="detail-icon" />
              <div>
                <strong>Skillset</strong>
                <p>{userDetails.skillset || "N/A"}</p>
              </div>
            </div>
            <div className="detail-item">
              <MdWork className="detail-icon" />
              <div>
                <strong>Experience</strong>
                <p>{userDetails.experience || "N/A"} years</p>
              </div>
            </div>
            <div className="detail-item">
              <MdWork className="detail-icon" />
              <div>
                <strong>Expected Salary</strong>
                <p>₹{userDetails.expectedSalary || "N/A"}</p>
              </div>
            </div>
          </>
        );
      case "landowner":
        return (
          <>
            <div className="detail-item">
              <MdLandscape className="detail-icon" />
              <div>
                <strong>Land Size</strong>
                <p>{userDetails.landSize || "N/A"}</p>
              </div>
            </div>
            <div className="detail-item">
              <MdWork className="detail-icon" />
              <div>
                <strong>Expected Payment</strong>
                <p>₹{userDetails.expectedPayment || "N/A"}</p>
              </div>
            </div>
            <div className="detail-item">
              <MdWork className="detail-icon" />
              <div>
                <strong>For</strong>
                <p>{userDetails.rentOrSell || "N/A"}</p>
              </div>
            </div>
          </>
        );
      case "supplier":
        return (
          <>
            <div className="detail-item">
              <MdInventory className="detail-icon" />
              <div>
                <strong>Industry</strong>
                <p>{userDetails.industry || "N/A"}</p>
              </div>
            </div>
            <div className="detail-item">
              <MdBusiness className="detail-icon" />
              <div>
                <strong>Company Name</strong>
                <p>{userDetails.name || "N/A"}</p>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-detail-container">
      <div className="leaf-shape top-right"></div>
      <div className="leaf-shape bottom-left"></div>

      <div className="profile-card">
        <div className="profile-left">
          <div className="image-circle">
            {userDetails.name?.charAt(0).toUpperCase()}
          </div>
          <h2>{userDetails.name}</h2>
          <p className="role">{role.toUpperCase()}</p>

          {user && user._id !== userDetails._id && (
            <button onClick={handleOpenChat} className="chat-button">
              Message
            </button>
          )}

           {isChatOpen && (
            <ChatPop recipient={userDetails} onClose={handleCloseChat} />
          )}
        </div>

        <div className="profile-right">
          <h3>Profile Details</h3>

          <div className="detail-item">
            <MdEmail className="detail-icon" />
            <div>
              <strong>Email</strong>
              <p>
                {userDetails.email}
                <a
                  href={`mailto:${userDetails.email}`}
                  className="email-link"
                >
                  <MdEmail />
                </a>
              </p>
            </div>
          </div>

          <div className="detail-item">
            <MdPhone className="detail-icon" />
            <div>
              <strong>Contact</strong>
              <p>{userDetails.contact || "N/A"}</p>
            </div>
          </div>

          <div className="detail-item">
            <MdLocationOn className="detail-icon" />
            <div>
              <strong>Location</strong>
              <p>{userDetails.location || "N/A"}</p>
            </div>
          </div>

          {renderRoleSpecificDetails()}

          <button className="back-button" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
