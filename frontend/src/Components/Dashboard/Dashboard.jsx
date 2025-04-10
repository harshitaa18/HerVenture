import React, { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import axios from "axios";
import './Dashboard.css';

const UserDashboard = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchFullProfile = async () => {
      if (!user) return;
      const token = localStorage.getItem("token");

      const validRoles = {
        entrepreneur: "entrepreneur",
        landowner: "landowner",
        labor: "labor",
        supplier: "supplier",
      };

      const endpoint = validRoles[user.role?.toLowerCase()];
      if (!endpoint) {
        console.error("Invalid or unsupported role:", user.role);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/${endpoint}/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData({ ...user, ...res.data });

      } catch (err) {
        console.error("Error fetching full profile:", err);
      }
    };

    fetchFullProfile();
  }, [ user]);

  if (!userData) return <p>No user data found.</p>;

  return (
    <div className="dashboard-container" style={{ padding: "2rem" }}>
      <h1>Welcome, {userData.name || "User"}</h1>
      <h2>Role: {userData.role}</h2>

      {/* Common User Info */}
      <div className="common-info" style={{ marginTop: "1rem" }}>
        <p><strong>Email:</strong> {userData.email || "N/A"}</p>
        <p><strong>Contact:</strong> {userData.contact || "N/A"}</p>
        <p><strong>Location:</strong> {userData.location || "N/A"}</p>
      </div>

      {/* Entrepreneur Details */}
      {userData.role === "entrepreneur" && (
        <div className="entrepreneur-section" style={{ marginTop: "2rem" }}>
          <p><strong>Business:</strong> {userData.business || "N/A"}</p>
          <p><strong>Business License:</strong> {userData.businessLicense || "N/A"}</p>
          <p><strong>About Business:</strong> {userData.aboutBusiness || "N/A"}</p>
        </div>
      )}

      {/* Skilled Labor Details */}
      {userData.role === "labor" && (
        <div className="skilled-labor-section" style={{ marginTop: "2rem" }}>
          <p><strong>Skillset:</strong> {userData.skillset || "N/A"}</p>
          <p><strong>Experience:</strong> {userData.experience || "N/A"} years</p>
          <p><strong>Certifications:</strong> {userData.certifications || "N/A"}</p>
          <p><strong>Expected Salary:</strong> ₹{userData.expectedSalary || "N/A"}</p>
        </div>
      )}

      {/* Landowner Details */}
      {userData.role === "landowner" && (
        <div className="landowner-section" style={{ marginTop: "2rem" }}>
          <p><strong>Land Size:</strong> {userData.landSize || "N/A"}</p>
          <p><strong>Expected Payment:</strong> ₹{userData.expectedPayment || "N/A"}</p>
          <p><strong>Rent or Sell:</strong> {userData.rentOrSell || "N/A"}</p>
          <p><strong>Preferred Business:</strong> {userData.preferredBusiness || "N/A"}</p>
          <p><strong>Owner Address:</strong> {userData.ownerAddress || "N/A"}</p>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
