import React, { useState } from "react";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import { entrepreneurs, landowners, skilledLabor, suppliers } from "./data";

const Profile = () => {
  const { user } = useUser();
  const [tab, setTab] = useState("overview");
  const navigate = useNavigate();

  const handleClick = (role, id) => {
    navigate(`/profile/${role}/${id}`);
  };

  return (
    <div className="profile-container">
      {user && (
        <div className="profile-card">
          <h2>{user.name}</h2>
          <p>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
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
        <button className={tab === "suppliers" ? "active" : ""} onClick={() => setTab("suppliers")}>
          Find Suppliers
        </button>
      </div>

      {tab === "hire" && (
        <div className="section">
          <h3>Available Skilled Workers</h3>
          {skilledLabor.map((worker) => (
            <div key={worker.id} className="card" onClick={() => handleClick("skilled-labor", worker.id)}>
              <p>{worker.name} - {worker.skill}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "land" && (
        <div className="section">
          <h3>Available Lands</h3>
          {landowners.map((landowner) => (
            <div key={landowner.id} className="card" onClick={() => handleClick("landowner", landowner.id)}>
              <p>{landowner.name} - {landowner.location}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "entrepreneurs" && (
        <div className="section">
          <h3>Entrepreneurs</h3>
          {entrepreneurs.map((entrepreneur) => (
            <div key={entrepreneur.id} className="card" onClick={() => handleClick("entrepreneur", entrepreneur.id)}>
              <p>{entrepreneur.name} - {entrepreneur.business}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "suppliers" && (
        <div className="section">
          <h3>Suppliers</h3>
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="card" onClick={() => handleClick("supplier", supplier.id)}>
              <p>{supplier.name} - {supplier.products}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
