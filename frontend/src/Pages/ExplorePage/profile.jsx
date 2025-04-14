import React, { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import { suppliers } from "./data";
import { FiSearch, FiFilter } from "react-icons/fi";

const Profile = () => {
  const { user } = useUser();
  const [tab, setTab] = useState("overview");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [fullUser, setFullUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [landownersData, setLandownersData] = useState([]);
  const [laborData, setLaborData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const roleMap = {
    land: "landowner",
    entrepreneurs: "entrepreneur",
    labor: "labor",
    suppliers: "supplier",
  };

  const handleClick = (key, id) => {
    const role = roleMap[key];
    if (role) navigate(`/profile/${role}/${id}`);
  };
  
  useEffect(() => {
    const fetchAllUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [entrepreneurRes, landRes, laborRes] = await Promise.all([
          axios.get("https://herventure.onrender.com/api/entrepreneur"),
          axios.get("https://herventure.onrender.com/api/landowner"),
          axios.get("https://herventure.onrender.com/api/labor"),
        ]);
  
        setEntrepreneurs(entrepreneurRes.data);
        setLandownersData(landRes.data);
        setLaborData(laborRes.data);
      } catch (err) {
        setError("Failed to fetch user data. Please try again later.");
        console.error("Failed to fetch users by role:", err);
      } finally {
        setIsLoading(false);
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
        const res = await axios.get(`https://herventure.onrender.com/api/${endpoint}/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFullUser({ ...user, ...res.data });

      } catch (err) {
        setError("Failed to fetch profile details. Please try again later.");
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
    { key: "land", label: "Buy Land", data: landownersData, filterKey: "landSize", icon: "terrain" },
    { key: "entrepreneurs", label: "See Entrepreneurs", data: entrepreneurs, filterKey: "aboutBusiness", icon: "business" },
    { key: "labor", label: "Find Skilled Labor", data: laborData, filterKey: "skillset", icon: "handyman" },
    { key: "suppliers", label: "Find Suppliers", data: suppliers, filterKey: "industry", icon: "inventory" },
  ];

  const filterData = (data) =>
    data.filter(item =>
      (!selectedFilter || Object.values(item).includes(selectedFilter)) &&
      (item.location?.toLowerCase().includes(searchQuery.toLowerCase()) || !searchQuery)
    );

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="back-button" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

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
          <h2 className="network-title">Her Allies</h2>
          
          <div className="tabs">
            {tabs.map(({ key, label }) => (
              <button 
                key={key} 
                className={`tab-button ${tab === key ? "active" : ""}`} 
                onClick={() => setTab(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {tab !== "overview" && (
            <div className="filters">
              <div className="search-box">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by Location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {tabs.find(t => t.key === tab) && (
                <div className="filter-select-wrapper">
                  <FiFilter className="filter-icon" />
                  <select 
                    className="filter-select"
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    value={selectedFilter}
                  >
                    <option value="">Filter by {tabs.find(t => t.key === tab).filterKey}</option>
                    {Array.from(new Set(tabs.find(t => t.key === tab).data
                      .filter(item => item[tabs.find(t => t.key === tab).filterKey])
                      .map(item => item[tabs.find(t => t.key === tab).filterKey])))
                      .map((value, index) => (
                        <option key={index} value={value}>{value}</option>
                      ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading data...</p>
            </div>
          ) : (
            tabs.map(({ key, data, label }) => 
              tab === key && (
                <div key={key} className="section">
                  <h3>{label}</h3>
                  <div className="cards-grid">
                    {filterData(data).length > 0 ? (
                      filterData(data).map((item, index) => (
                        <div key={item._id || index} className="card">
                          <div className="card-header">
                            <div className="card-avatar">
                              <span>{item.name ? item.name.charAt(0).toUpperCase() : "U"}</span>
                            </div>
                            <h4>{item.name || "N/A"}</h4>
                          </div>
                          <div className="card-body">
                            <div className="card-detail">
                              <span className="detail-icon location-icon"></span>
                              <span>{item.location || "N/A"}</span>
                            </div>
                            
                            {key === "entrepreneurs" && (
                              <div className="card-detail">
                                <span className="detail-icon business-icon"></span>
                                <span>{item.aboutBusiness || "N/A"}</span>
                              </div>
                            )}
                            
                            {key === "land" && (
                              <div className="card-detail">
                                <span className="detail-icon land-icon"></span>
                                <span>{item.landSize || "N/A"}</span>
                              </div>
                            )}
                            
                            {key === "labor" && (
                              <div className="card-detail">
                                <span className="detail-icon skill-icon"></span>
                                <span>{item.skillset || "N/A"}</span>
                              </div>
                            )}
                            
                            {key === "suppliers" && (
                              <div className="card-detail">
                                <span className="detail-icon industry-icon"></span>
                                <span>{item.industry || "N/A"}</span>
                              </div>
                            )}
                          </div>
                          <div className="card-footer">
                            <button 
                              className="view-details-btn"
                              onClick={() => handleClick(key, item._id)}
                            >
                              View Details
                            </button>
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
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;