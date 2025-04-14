import React, { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import { suppliers } from "./data";

const Profile = () => {
  const { user } = useUser();
  const [tab, setTab] = useState("overview");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [fullUser, setFullUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [landownersData, setLandownersData] = useState([]);
  const [laborData, setLaborData] = useState([]);

  const navigate = useNavigate();

  const roleMap = {
    land: "landowner",
    entrepreneurs: "entrepreneur",
    labor: "labor",
    suppliers: "supplier",
  };

  const handleClick = (Key, id) => {
    const role = roleMap[Key];
    if (role) navigate(`/profile/${role}/${id}`);
  };
  
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const [entrepreneurRes, landRes, laborRes] = await Promise.all([
          axios.get("http://localhost:5000/api/entrepreneur"),
          axios.get("http://localhost:5000/api/landowner"),
          axios.get("http://localhost:5000/api/labor"),
        ]);
  
        setEntrepreneurs(entrepreneurRes.data);
        setLandownersData(landRes.data);
        setLaborData(laborRes.data);
      } catch (err) {
        console.error("Failed to fetch users by role:", err);
      }
    };
  
    fetchAllUsers();
  }, []);

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
        console.log("endpoint ", endpoint, "ID ", user._id, "token ", token)
        const res = await axios.get(`http://localhost:5000/api/${endpoint}/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFullUser({ ...user, ...res.data });

      } catch (err) {
        console.error("Error fetching full profile:", err);
      }
    };

    fetchFullProfile();
  }, [user]);

  const renderUserDetails = () => {
    if (!user || !fullUser) return <p className="loading-text">Loading profile...</p>;
  
    const userDetails = {
      entrepreneur: (
        <div className="user-details-grid">
          <div className="detail-item">
            <span className="detail-label">Business</span>
            <span className="detail-value">{fullUser.aboutBusiness || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Contact No.</span>
            <span className="detail-value">{fullUser.contact || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Location</span>
            <span className="detail-value">{fullUser.location || "N/A"}</span>
          </div>
        </div>
      ),
      landowner: (
        <div className="user-details-grid">
          <div className="detail-item">
            <span className="detail-label">Land Size</span>
            <span className="detail-value">{fullUser.landSize || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Location</span>
            <span className="detail-value">{fullUser.location || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">For</span>
            <span className="detail-value">{fullUser.rentOrSell || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Expected Payment</span>
            <span className="detail-value">{fullUser.expectedPayment || "N/A"}</span>
          </div>
        </div>
      ),
      labor: (
        <div className="user-details-grid">
          <div className="detail-item">
            <span className="detail-label">Skillset</span>
            <span className="detail-value">{fullUser.skillset || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Certifications</span>
            <span className="detail-value">{fullUser.certifications || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Experience</span>
            <span className="detail-value">{fullUser.experience || "N/A"} years</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Expected Salary</span>
            <span className="detail-value">₹{fullUser.expectedSalary || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Location</span>
            <span className="detail-value">{fullUser.location || "N/A"}</span>
          </div>
        </div>
      ),
      supplier: (
        <div className="user-details-grid">
          <div className="detail-item">
            <span className="detail-label">Industry</span>
            <span className="detail-value">{fullUser.industry || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Company Name</span>
            <span className="detail-value">{fullUser.name || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Location</span>
            <span className="detail-value">{fullUser.location || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Contact</span>
            <span className="detail-value">{fullUser.contact || "N/A"}</span>
          </div>
        </div>
      )
    };
  
    return userDetails[fullUser.role?.toLowerCase()] || <p>Role not recognized</p>;
  };
  
  const tabs = [
    { key: "land", label: "Buy Land", data: landownersData, filterKey: "landSize" },
    { key: "entrepreneurs", label: "See Entrepreneurs", data: entrepreneurs, filterKey: "aboutBusiness" },
    { key: "labor", label: "Find Skilled Labor", data: laborData, filterKey: "skillset" },
    { key: "suppliers", label: "Find Suppliers", data: suppliers, filterKey: "industry" },
  ];

  const filterData = (data) =>
    data.filter(item =>
      (!selectedFilter || Object.values(item).includes(selectedFilter)) &&
      item.location.toLowerCase().includes(searchQuery)
    );

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <h1>Your AgriNetwork</h1>
        <p>Connect with farmers, entrepreneurs, laborers and suppliers</p>
      </div>

      <div className="profile-container">
        {user ? (
          <div className="profile-card">
            <div className="profile-avatar">
              <span>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
            </div>
            <h2>{user.name || "No Name"}</h2>
            <div className="profile-role">
              {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "No Role"}
            </div>
            {renderUserDetails()}
          </div>
        ) : (
          <div className="profile-loading">
            <div className="loading-spinner"></div>
            <p>Loading user data...</p>
          </div>
        )}

        <div className="network-section">
          <h2 className="network-title">Your Agricultural Network</h2>
          
          <div className="tabs">
            {tabs.map(({ key, label }) => (
              <button key={key} className={tab === key ? "active" : ""} onClick={() => setTab(key)}>
                {label}
              </button>
            ))}
          </div>

          {tab !== "overview" && (
            <div className="filters">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search by Location..."
                  onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                />
                <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              
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

          {tabs.map(({ key, data, label }) => 
            tab === key && (
              <div key={key} className="section">
                <h3>{label}</h3>
                <div className="cards-grid">
                  {filterData(data).length > 0 ? (
                    filterData(data).map((item, index) => (
                      <div key={item._id || index} className="card" onClick={() => handleClick(key, item._id)}>
                        <div className="card-header">
                          <div className="card-avatar">
                            <span>{item.name ? item.name.charAt(0).toUpperCase() : "U"}</span>
                          </div>
                          <h4>{item.name || "N/A"}</h4>
                        </div>
                        <div className="card-body">
                          <div className="card-detail">
                            <span className="detail-icon">📍</span>
                            <span>{item.location || "N/A"}</span>
                          </div>
                          
                          {key === "entrepreneurs" && (
                            <div className="card-detail">
                              <span className="detail-icon">💼</span>
                              <span>{item.aboutBusiness || "N/A"}</span>
                            </div>
                          )}
                          
                          {key === "land" && (
                            <div className="card-detail">
                              <span className="detail-icon">🌱</span>
                              <span>{item.landSize || "N/A"}</span>
                            </div>
                          )}
                          
                          {key === "labor" && (
                            <div className="card-detail">
                              <span className="detail-icon">🛠️</span>
                              <span>{item.skillset || "N/A"}</span>
                            </div>
                          )}
                          
                          {key === "suppliers" && (
                            <div className="card-detail">
                              <span className="detail-icon">🏭</span>
                              <span>{item.industry || "N/A"}</span>
                            </div>
                          )}
                        </div>
                        <div className="card-footer">
                          <button className="view-details-btn">View Details</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-results">
                      <p>No results found</p>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;