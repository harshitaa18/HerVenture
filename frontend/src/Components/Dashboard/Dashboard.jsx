import React from "react";
import { useUser } from "../../Context/UserContext";
import "./Dashboard.css";

const UserDashboard = () => {
  const { userData } = useUser();

  return (
    <div className="dashboard-container">
      <h1>Welcome, {userData.fullName || "User"}</h1>

      <div className="profile-section">
        <h2>Basic Profile Information</h2>
        <p><strong>Full Name:</strong> {userData.fullName || "N/A"}</p>
        <p><strong>Email:</strong> {userData.email || "N/A"}</p>
        <p><strong>Phone:</strong> {userData.phone || "N/A"}</p>
        <p><strong>Gender:</strong> {userData.gender || "N/A"}</p>
      </div>

      <div className="startup-section">
        <h2>Startup Details</h2>
        <p><strong>Startup Name:</strong> {userData.startupName || "N/A"}</p>
        <p><strong>Industry:</strong> {userData.typeIndustry || "N/A"}</p>
        <p><strong>Description:</strong> {userData.description || "N/A"}</p>
        <p><strong>Founding Date:</strong> {userData.foundingDate || "N/A"}</p>
        <p><strong>Funding Stage:</strong> {userData.fundingStage || "N/A"}</p>
        <p><strong>Total Investment:</strong> ${userData.totalInvestment || "N/A"}</p>
        <p><strong>Annual Revenue:</strong> ${userData.annualRevenue || "N/A"}</p>
      </div>

      <div className="founder-section">
        <h2>Founder Details</h2>
        {userData.founderDetails && userData.founderDetails.length > 0 ? (
          userData.founderDetails.map((founder, index) => (
            <p key={index}>
              <strong>Name:</strong> {founder.name || "N/A"},
              <strong> Role:</strong> {founder.role || "N/A"},
              <strong> Contact:</strong> {founder.contact || "N/A"}
            </p>
          ))
        ) : (
          <p>No founder details available</p>
        )}
      </div>

      <div className="expectations-section">
        <h2>Expectations from the Platform</h2>
        <p>{userData.platformExpectations.length > 0 ? userData.platformExpectations.join(", ") : "N/A"}</p>
      </div>

      <div className="location-section">
        <h2>Business Location</h2>
        <p><strong>Country:</strong> {userData.country || "N/A"}</p>
        <p><strong>City/State:</strong> {userData.cityState || "N/A"}</p>
        <p><strong>Operation Type:</strong> {userData.operationType || "N/A"}</p>
      </div>

      <div className="social-section">
        <h2>Social Links</h2>
        <p><strong>Website:</strong> <a href={userData.websiteURL} target="_blank" rel="noopener noreferrer">{userData.websiteURL || "N/A"}</a></p>
        <p><strong>LinkedIn:</strong> <a href={userData.linkedIn} target="_blank" rel="noopener noreferrer">{userData.linkedIn || "N/A"}</a></p>
        <p><strong>Instagram:</strong> <a href={userData.instagram} target="_blank" rel="noopener noreferrer">{userData.instagram || "N/A"}</a></p>
        <p><strong>Facebook:</strong> <a href={userData.facebook} target="_blank" rel="noopener noreferrer">{userData.facebook || "N/A"}</a></p>
        <p><strong>Twitter:</strong> <a href={userData.twitter} target="_blank" rel="noopener noreferrer">{userData.twitter || "N/A"}</a></p>
      </div>

      <div className="goal-section">
        <h2>Business Goals</h2>
        <p><strong>Short-term Goals:</strong> {userData.shortTermGoals || "N/A"}</p>
        <p><strong>Long-term Goals:</strong> {userData.longTermGoals || "N/A"}</p>
      </div>

      <div className="team-section">
        <h2>Core Team</h2>
        {userData.coreTeam && userData.coreTeam.length > 0 ? (
          userData.coreTeam.map((member, index) => (
            <p key={index}>
              <strong>Name:</strong> {member.name || "N/A"},
              <strong> Role:</strong> {member.role || "N/A"},
              <strong> Contact:</strong> {member.contact || "N/A"}
            </p>
          ))
        ) : (
          <p>No core team details available</p>
        )}
      </div>

      <div className="hiring-section">
        <h2>Hiring Status</h2>
        <p><strong>Status:</strong> {userData.hiringStatus || "N/A"}</p>
        <p><strong>Open Positions:</strong> {userData.openPositions || "N/A"}</p>
      </div>

      <div className="impact-section">
        <h2>Sustainability & Social Impact</h2>
        <p><strong>Sustainable Practices:</strong> {userData.sustainablePractices || "N/A"}</p>
        <p><strong>Social Impact:</strong> {userData.socialImpact || "N/A"}</p>
      </div>

      <div className="skills-section">
        <h2>Personal Skills & Challenges</h2>
        <p><strong>Skills:</strong> {userData.personalSkills || "N/A"}</p>
        <p><strong>Business Challenges:</strong> {userData.businessChallenges || "N/A"}</p>
      </div>

      <div className="verification-section">
        <h2>Verification Documents</h2>
        {userData.verificationDocs ? (
          <p>Document uploaded</p>
        ) : (
          <p>No verification document uploaded</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
