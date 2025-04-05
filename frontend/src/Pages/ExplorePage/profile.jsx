import React, { useState } from "react";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import { entrepreneurs, landowners, skilledLabor, suppliers } from "./data";

const Profile = () => {
  const { user } = useUser();
  const [tab, setTab] = useState("overview");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const roleMap = {
    hire: "skilled-labor",
    land: "landowner",
    entrepreneurs: "entrepreneur",
    suppliers: "supplier",
  };

  const handleClick = (tabKey, id) => {
    const role = roleMap[tabKey];
    if (role) navigate(`/profile/${role}/${id}`);
  };

  const renderUserDetails = () => {
    if (!user) return <p>No user data available</p>;
    if (!user.role) return <p>Role not assigned</p>;

    const userDetails = {
      entrepreneur: (
        <>
          <p><b>Business:</b> {user.aboutBusiness || "N/A"}</p>
          <p><b>Contact No.:</b> {user.contact || "N/A"}</p>
          <p><b>Location:</b> {user.location || "N/A"}</p>
        </>
      ),
      "skilled labor": (
        <>
          <p><b>Skill:</b> {user.skillset || "N/A"}</p>
          <p><b>Experience:</b> {user.experience != null ? `${user.experience} years` : "N/A"}</p>
          <p><b>Expected Salary:</b> {user.expectedSalary ? `$${user.expectedSalary}` : "N/A"}</p>
        </>
      ),
      landowner: (
        <>
          <p><b>Land Size:</b> {user.landSize || "N/A"}</p>
          <p><b>Location:</b> {user.location || "N/A"}</p>
          <p><b>For:</b> {user.rentOrSell || "N/A"}</p>
        </>
      ),
      supplier: (
        <>
          <p><b>Products Supplied:</b> {user.products || "N/A"}</p>
          <p><b>Minimum Order Quantity:</b> {user.minOrder || "N/A"}</p>
          <p><b>Delivery Areas:</b> {user.deliveryAreas || "N/A"}</p>
        </>
      ),
    };
    return userDetails[user.role] || <p>Role not recognized</p>;
  };

  const tabs = [
    { key: "hire", label: "Hire Skilled Labor", data: skilledLabor, filterKey: "skill" },
    { key: "land", label: "Buy Land", data: landowners, filterKey: "size" },
    { key: "entrepreneurs", label: "See Entrepreneurs", data: entrepreneurs, filterKey: "business" },
    { key: "suppliers", label: "Find Suppliers", data: suppliers, filterKey: "products" },
  ];

  const filterData = (data) =>
    data.filter(item =>
      (!selectedFilter || Object.values(item).includes(selectedFilter)) &&
      item.location.toLowerCase().includes(searchQuery)
    );

  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-card">
          <h2>{user.name || "No Name"}</h2>
          <p>{user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "No Role"}</p>
          {renderUserDetails()}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <div className="tabs">
        {tabs.map(({ key, label }) => (
          <button key={key} className={tab === key ? "active" : ""} onClick={() => setTab(key)}>
            {label}
          </button>
        ))}
      </div>

      {tab !== "overview" && (
        <div className="filters">
          <input type="text" placeholder="Search by Location..." onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} />
          {tabs.find(t => t.key === tab) && (
            <select onChange={(e) => setSelectedFilter(e.target.value)}>
              <option value="">Filter by {tabs.find(t => t.key === tab).filterKey}</option>
              {Array.from(new Set(tabs.find(t => t.key === tab).data.map(item => item[tabs.find(t => t.key === tab).filterKey]))).map((value, index) => (
                <option key={index} value={value}>{value}</option>
              ))}
            </select>
          )}
        </div>
      )}

      {tabs.map(({ key, data }) =>
        tab === key && (
          <div key={key} className="section">
            <h3>{tabs.find(t => t.key === key).label}</h3>
            {filterData(data).map((item, index) => (
              <div key={item.id || index} className="card" onClick={() => handleClick(key, item.id)}>
                <p>{item.name} - {item[tabs.find(t => t.key === key).filterKey]}</p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Profile;