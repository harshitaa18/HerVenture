import React, { useState } from "react";
import { useUser } from "../../Context/UserContext"; // Import user context
import "./profile.css";
import { entrepreneurs, landowners, skilledLabor } from "./data"; // Correct import

const Profile = () => {
  const { user } = useUser();
  const [tab, setTab] = useState("hire");

  return (
    <div className="profile-container">
      {user && (
        <div className="profile-card">
           console.log(user);
          <img src={user.photo} alt={user.name} className="profile-image" />
          <h2>{user.name}</h2>
          <p>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
          {user.business && <p><b>Business:</b> {user.business}</p>}
          {user.location && <p><b>Location:</b> {user.location}</p>}
        </div>
      )}

      <div className="tabs">
        <button className={tab === "hire" ? "active" : ""} onClick={() => setTab("hire")}>
          Hire Skilled Labor
        </button>
        <button className={tab === "land" ? "active" : ""} onClick={() => setTab("land")}>
          Buy Land
        </button>
        <button className={tab === "entrepreneurs" ? "active" : ""} onClick={() => setTab("entrepreneurs")}>
          See Entrepreneurs
        </button>
      </div>

      {tab === "hire" && (
        <div className="section">
          <h3>Available Skilled Workers</h3>
          {skilledLabor.map((worker, index) => (
            <div key={worker.id || index} className="card">
              <p>{worker.name} - {worker.skill}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "land" && (
        <div className="section">
          <h3>Available Lands</h3>
          {landowners.map((landowner, index) => (
            <div key={landowner.id || index} className="card">
              <p>{landowner.name} - {landowner.location}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "entrepreneurs" && (
        <div className="section">
          <h3>Entrepreneurs</h3>
          {entrepreneurs.map((entrepreneur, index) => (
            <div key={entrepreneur.id || index} className="card">
              <p>{entrepreneur.name} - {entrepreneur.business}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
