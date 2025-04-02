import React, { useState } from "react";
import { entrepreneurs, landowners, suppliers, skilledLabor } from "../data";
import "./Entrepreneur_profile.css"; // Import CSS for styling

const EntrepreneurProfile = () => {
  const [tab, setTab] = useState("hire");

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
        <button className={tab === "hire" ? "active" : ""} onClick={() => setTab("hire")}>Hire Skilled Labor</button>
        <button className={tab === "land" ? "active" : ""} onClick={() => setTab("land")}>Buy Land</button>
        <button className={tab === "suppliers" ? "active" : ""} onClick={() => setTab("suppliers")}>Find Suppliers</button>
        <button className={tab === "entrepreneurs" ? "active" : ""} onClick={() => setTab("entrepreneurs")}>View Entrepreneurs</button>
      </div>

      {/* Skilled Labor Section */}
      {tab === "hire" && (
        <div className="section">
          <h3>Skilled Labor Available</h3>
          {skilledLabor.map((worker) => (
            <div key={worker.id} className="card">
              <p><strong>{worker.name}</strong> - {worker.skill} ({worker.experience} experience)</p>
              <p>Location: {worker.location}</p>
              <p>Contact: {worker.contact}</p>
              <button className="contact-btn">Contact</button>
            </div>
          ))}
        </div>
      )}

      {/* Entrepreneurs Section */}
      {tab === "entrepreneurs" && (
        <div className="section">
          <h3>Entrepreneurs</h3>
          {entrepreneurs.map((e) => (
            <div key={e.id} className="card">
              <p><strong>{e.name}</strong> - {e.business} ({e.location})</p>
              <p>Contact: {e.email}</p>
            </div>
          ))}
        </div>
      )}

      {/* Land Listings Section */}
      {tab === "land" && (
        <div className="section">
          <h3>Available Lands</h3>
          {landowners.map((land) => (
            <div key={land.id} className="card">
              <p><strong>{land.name}</strong> - {land.size} ({land.location})</p>
              <p>Contact: {land.contact}</p>
            </div>
          ))}
        </div>
      )}

      {/* Suppliers Section */}
      {tab === "suppliers" && (
        <div className="section">
          <h3>Suppliers</h3>
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="card">
              <p><strong>{supplier.name}</strong> - {supplier.industry} ({supplier.location})</p>
              <p>Contact: {supplier.contact}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EntrepreneurProfile;
