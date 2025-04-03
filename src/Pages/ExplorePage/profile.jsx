import React, { useState } from "react";
import { useUser } from "../../Context/UserContext";
import "./profile.css";
import { entrepreneurs, landowners, skilledLabor, suppliers } from "./data";

const Profile = () => {
  const { user } = useUser();
  const [tab, setTab] = useState("overview");

  const renderUserDetails = () => {
    if (!user) return <p>No user data available</p>;

    switch (user.role) {
      case "entrepreneur":
        return (
          <>
            <p><b>Business:</b> {user.business}</p>
            <p><b>Contact No.:</b> {user.contact}</p>
            <p><b>Location:</b> {user.location}</p>
          </>
        );
      case "skilled labor":
        return (
          <>
            <p><b>Skill:</b> {user.skill}</p>
            <p><b>Experience:</b> {user.experience} years</p>
            <p><b>Expected Salary:</b> ${user.expectedSalary}</p>
          </>
        );
      case "landowner":
        return (
          <>
            <p><b>Land Size:</b> {user.landSize}</p>
            <p><b>Expected Payment:</b> ${user.expectedPayment}</p>
            <p><b>Location:</b> {user.location}</p>
            <p><b>For:</b> {user.rentOrSell}</p>
          </>
        );
      case "supplier":
        return (
          <>
            <p><b>Products Supplied:</b> {user.products}</p>
            <p><b>Minimum Order Quantity:</b> {user.minOrder}</p>
            <p><b>Delivery Areas:</b> {user.deliveryAreas}</p>
          </>
        );
      default:
        return <p>Role not recognized</p>;
    }
  };

  return (
    <div className="profile-container">
      {user && (
        <div className="profile-card">
          <h2>{user.name}</h2>
          <p>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
          {renderUserDetails()} 
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

      {tab === "suppliers" && (
        <div className="section">
          <h3>Suppliers</h3>
          {suppliers.map((supplier, index) => (
            <div key={supplier.id || index} className="card">
              <p>{supplier.name} - {supplier.products}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
