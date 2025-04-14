import React, { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import { suppliers } from "./data";
import API from "../../utils/api";

const Profile = () => {
  const { user } = useUser();
  const [tab, setTab] = useState("overview");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [fullUser, setFullUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [landownersData, setLandownersData] = useState([]);
  const [laborData, setLaborData] = useState([]);
  const [loading, setLoading] = useState(true);
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
    if (role) {
      navigate(`/profile/${role}/${id}`);
    }
  };
  
  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const [entrepreneurRes, landRes, laborRes] = await Promise.all([
          API.get("/entrepreneur"),
          API.get("/landowner"),
          API.get("/labor"),
        ]);
  
        setEntrepreneurs(entrepreneurRes.data || []);
        setLandownersData(landRes.data || []);
        setLaborData(laborRes.data || []);
      } catch (err) {
        console.error("Failed to fetch users by role:", err);
        setError("Failed to load network data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const fetchFullProfile = async () => {
      if (!user) return;
      
      setLoading(true);
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
        setLoading(false);
        return;
      }

      try {
        const res = await API.get(`/${endpoint}/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFullUser({ ...user, ...res.data });
      } catch (err) {
        console.error("Error fetching full profile:", err);
        setError("Failed to load your profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFullProfile();
  }, [user]);

  const renderUserDetails = () => {
    if (loading) return <p className="loading-text">Loading profile...</p>;
    if (error) return <p className="error-text">{error}</p>;
    if (!user || !fullUser) return <p className="loading-text">No profile data available</p>;
  
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
            <span className="detail-label">Property Size</span>
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
  
    return userDetails[fullUser.role?.toLowerCase()] || <p>Role details not available</p>;
  };
  
  const tabs = [
    { key: "land", label: "Properties", data: landownersData, filterKey: "landSize" },
    { key: "entrepreneurs", label: "Entrepreneurs", data: entrepreneurs, filterKey: "aboutBusiness" },
    { key: "labor", label: "Professionals", data: laborData, filterKey: "skillset" },
    { key: "suppliers", label: "Suppliers", data: suppliers, filterKey: "industry" },
  ];

  const filterData = (data) => {
    if (!data || !Array.isArray(data)) return [];
    
    return data.filter(item => {
      const matchesFilter = !selectedFilter || 
        (item[tabs.find(t => t.key === tab)?.filterKey] === selectedFilter);
      
      const matchesSearch = !searchQuery || 
        (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesFilter && matchesSearch;
    });
  };

  // Get unique filter values for the current tab
  const getFilterOptions = () => {
    const currentTab = tabs.find(t => t.key === tab);
    if (!currentTab || !currentTab.data || !Array.isArray(currentTab.data)) return [];
    
    const filterKey = currentTab.filterKey;
    const uniqueValues = new Set();
    
    currentTab.data.forEach(item => {
      if (item[filterKey]) {
        uniqueValues.add(item[filterKey]);
      }
    });
    
    return Array.from(uniqueValues);
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <h1>Grow Your Network</h1>
        <p>Connect with fellow entrepreneurs, professionals, and business resources</p>
      </div>

      <div className="profile-container">
        {loading ? (
          <div className="profile-loading">
            <div className="loading-spinner"></div>
            <p>Loading user data...</p>
          </div>
        ) : error ? (
          <div className="profile-error">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        ) : user ? (
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
          <div className="profile-card">
            <p>No user data available. Please log in again.</p>
            <button onClick={() => navigate('/login')}>Go to Login</button>
          </div>
        )}

        <div className="network-section">
          <h2 className="network-title">Your Professional Network</h2>
          
          <div className="tabs">
            <button 
              className={tab === "overview" ? "active" : ""} 
              onClick={() => setTab("overview")}
            >
              Overview
            </button>
            {tabs.map(({ key, label }) => (
              <button 
                key={key} 
                className={tab === key ? "active" : ""} 
                onClick={() => {
                  setTab(key);
                  setSelectedFilter("");
                  setSearchQuery("");
                }}
              >
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <select 
                value={selectedFilter} 
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="">
                  Filter by {tabs.find(t => t.key === tab)?.filterKey || "property"}
                </option>
                {getFilterOptions().map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          )}

          {tab === "overview" ? (
            <div className="overview-section">
              <p>Select a category to explore your professional network</p>
              <div className="stats-cards">
                {tabs.map(tab => (
                  <div key={tab.key} className="stat-card" onClick={() => setTab(tab.key)}>
                    <h3>{tab.label}</h3>
                    <p>{tab.data.length} available</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            tabs.map(({ key, data, label }) => 
              tab === key && (
                <div key={key} className="section">
                  <h3>{label}</h3>
                  {loading ? (
                    <div className="loading-container">
                      <div className="loading-spinner"></div>
                      <p>Loading data...</p>
                    </div>
                  ) : (
                    <div className="cards-grid">
                      {filterData(data).length > 0 ? (
                        filterData(data).map((item, index) => (
                          <div 
                            key={item._id || index} 
                            className="card" 
                            onClick={() => handleClick(key, item._id)}
                          >
                            <div className="card-header">
                              <div className="card-avatar">
                                <span>{item.name ? item.name.charAt(0).toUpperCase() : "U"}</span>
                              </div>
                              <h4>{item.name || "N/A"}</h4>
                            </div>
                            <div className="card-body">
                              <div className="card-detail">
                                <span>{item.location || "N/A"}</span>
                              </div>
                              
                              {key === "entrepreneurs" && (
                                <div className="card-detail">
                                  <span>{item.aboutBusiness || "N/A"}</span>
                                </div>
                              )}
                              
                              {key === "land" && (
                                <div className="card-detail">
                                  <span>{item.landSize || "N/A"}</span>
                                </div>
                              )}
                              
                              {key === "labor" && (
                                <div className="card-detail">
                                  <span>{item.skillset || "N/A"}</span>
                                </div>
                              )}
                              
                              {key === "suppliers" && (
                                <div className="card-detail">
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
                          <p>No results found. Try adjusting your filters.</p>
                        </div>
                      )}
                    </div>
                  )}
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