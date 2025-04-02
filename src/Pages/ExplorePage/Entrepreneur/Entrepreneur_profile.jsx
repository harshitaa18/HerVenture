import React, { useState, useEffect } from "react";
//import axios from "axios";
import "./Entrepreneur_profile.css"; // Import CSS for styling

const EntrepreneurProfile = () => {
  const [tab, setTab] = useState("hire");
  const [workers, setWorkers] = useState([]);
  const [lands, setLands] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/workers").then((res) => setWorkers(res.data));
//     axios.get("http://localhost:5000/api/lands").then((res) => setLands(res.data));
//   }, []);

  return (
    <div className="profile-container">
      {/* Profile Section */}
      <div className="profile-card">
        <img src="/profile.jpg" alt="Entrepreneur" className="profile-image" />
        <h2>Jane Doe</h2>
        <p>Entrepreneur | Business Owner</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={tab === "hire" ? "active" : ""} onClick={() => setTab("hire")}>
          Hire Skilled Labor
        </button>
        <button className={tab === "land" ? "active" : ""} onClick={() => setTab("land")}>
          Buy Land
        </button>
      </div>

      {/* Skilled Workers Section */}
      {tab === "hire" && (
        <div className="section">
          <h3>Available Skilled Workers</h3>
          {workers.map((worker) => (
            <div key={worker.id} className="card">
              <p>{worker.name} - {worker.skill}</p>
              <button className="contact-btn">Contact</button>
            </div>
          ))}
        </div>
      )}

      {/* Land Listings Section */}
      {tab === "land" && (
        <div className="section">
          <h3>Available Lands</h3>
          {lands.map((land) => (
            <div key={land.id} className="card">
              <p>{land.location} - {land.size} acres</p>
              <button className="inquire-btn">Inquire</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EntrepreneurProfile;
