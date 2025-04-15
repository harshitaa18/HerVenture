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
    if (loading) return <div className="loader"></div>;
    if (error) return <p className="error-message">{error}</p>;
    if (!user || !fullUser) return <p className="no-data-message">No profile data available</p>;
  
    const userDetails = {
      entrepreneur: (
        <div className="profile-details">
          <div className="detail-item">
            <span className="detail-icon">💼</span>
            <div>
              <h4>Business</h4>
              <p>{fullUser.aboutBusiness || "Not specified"}</p>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon">📞</span>
            <div>
              <h4>Contact</h4>
              <p>{fullUser.contact || "Not specified"}</p>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon">📍</span>
            <div>
              <h4>Location</h4>
              <p>{fullUser.location || "Not specified"}</p>
            </div>
          </div>
        </div>
      ),
      landowner: (
        <div className="profile-details">
          <div className="detail-item">
            <span className="detail-icon">📏</span>
            <div>
              <h4>Property Size</h4>
              <p>{fullUser.landSize || "Not specified"}</p>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon">📍</span>
            <div>
              <h4>Location</h4>
              <p>{fullUser.location || "Not specified"}</p>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon">🔄</span>
            <div>
              <h4>Availability</h4>
              <p>{fullUser.rentOrSell || "Not specified"}</p>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon">💰</span>
            <div>
              <h4>Expected Payment</h4>
              <p>{fullUser.expectedPayment || "Not specified"}</p>
            </div>
          </div>
        </div>
      ),
      labor: (
        <div className="profile-details">
          <div className="detail-item">
            <span className="detail-icon">🛠️</span>
            <div>
              <h4>Skillset</h4>
              <p>{fullUser.skillset || "Not specified"}</p>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon">🏆</span>
            <div>
              <h4>Certifications</h4>
              <p>{fullUser.certifications || "Not specified"}</p>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon">⏱️</span>
            <div>
              <h4>Experience</h4>
              <p>{fullUser.experience ? `${fullUser.experience} years` : "Not specified"}</p>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon">💰</span>
            <div>
              <h4>Expected Salary</h4>
              <p>{fullUser.expectedSalary ? `₹${fullUser.expectedSalary}` : "Not specified"}</p>
            </div>
          </div>
        </div>
      ),
      supplier: (
        <div className="profile-details">
          <div className="detail-item">
            <span className="detail-icon">🏭</span>
            <div>
              <h4>Industry</h4>
              <p>{fullUser.industry || "Not specified"}</p>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon">🏢</span>
            <div>
              <h4>Company Name</h4>
              <p>{fullUser.name || "Not specified"}</p>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon">📍</span>
            <div>
              <h4>Location</h4>
              <p>{fullUser.location || "Not specified"}</p>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon">📞</span>
            <div>
              <h4>Contact</h4>
              <p>{fullUser.contact || "Not specified"}</p>
            </div>
          </div>
        </div>
      )
    };
  
    return userDetails[fullUser.role?.toLowerCase()] || <p>Role details not available</p>;
  };
  
  const tabs = [
    { key: "land", label: "Properties", data: landownersData, filterKey: "landSize", icon: "🏠" },
    { key: "entrepreneurs", label: "Entrepreneurs", data: entrepreneurs, filterKey: "aboutBusiness", icon: "💼" },
    { key: "labor", label: "Professionals", data: laborData, filterKey: "skillset", icon: "👨‍💼" },
    { key: "suppliers", label: "Suppliers", data: suppliers, filterKey: "industry", icon: "🏭" },
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
    <div className="profile-page">
      <div className="profile-hero">
        <div className="hero-content">
          <h1>Grow Your Professional Network</h1>
          <p>Connect with entrepreneurs, specialists, and resources to expand your business</p>
        </div>
      </div>

      <div className="profile-content">
        <div className="sidebar">
          {loading ? (
            <div className="loading-container">
              <div className="loader"></div>
              <p>Loading profile...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <div className="error-icon">!</div>
              <p>{error}</p>
              <button className="retry-button" onClick={() => window.location.reload()}>Try Again</button>
            </div>
          ) : user ? (
            <div className="profile-card">
              <div className="profile-info">
                <div className="profile-avatar">
                  <span>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
                </div>
                <h2 className="profile-name">{user.name || "No Name"}</h2>
                <div className="profile-badge">
                  {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "No Role"}
                </div>
                
                {renderUserDetails()}
                
              </div>
            </div>
          ) : (
            <div className="profile-card not-logged">
              <div className="not-logged-message">
                <h3>Account Required</h3>
                <p>Please log in to view your profile</p>
                <button className="login-button" onClick={() => navigate('/login')}>Log In</button>
              </div>
            </div>
          )}
        </div>

        <div className="main-content">
          <div className="network-section">
            <h2>Your Professional Network</h2>
            
            <div className="tabs-container">
              <button 
                className={`tab-button ${tab === "overview" ? "active" : ""}`}
                onClick={() => setTab("overview")}
              >
                <span className="tab-icon">📊</span>
                Overview
              </button>
              
              {tabs.map(({ key, label, icon }) => (
                <button 
                  key={key} 
                  className={`tab-button ${tab === key ? "active" : ""}`}
                  onClick={() => {
                    setTab(key);
                    setSelectedFilter("");
                    setSearchQuery("");
                  }}
                >
                  <span className="tab-icon">{icon}</span>
                  {label}
                </button>
              ))}
            </div>

            {tab !== "overview" && (
              <div className="filter-container">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search by location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <span className="search-icon">🔍</span>
                </div>
                
                <select 
                  className="filter-dropdown"
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
              <div className="overview-grid">
                <div className="overview-message">
                  <h3>Explore Your Network</h3>
                  <p>Select a category below to discover connections</p>
                </div>
                
                <div className="category-cards">
                  {tabs.map(({ key, label, data, icon }) => (
                    <div key={key} className="category-card" onClick={() => setTab(key)}>
                        <div><div className="category-icon">{icon}</div>
                        <h3>{label}</h3>
                      </div>
                      <p><span className="highlight">{data.length}</span> available</p>
                      <button className="view-button">View All</button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              tabs.map(({ key, data, label }) => 
                tab === key && (
                  <div key={key} className="connection-section">
                    <div className="section-header">
                      <h3>{label}</h3>
                      <span className="count-badge">{filterData(data).length} results</span>
                    </div>
                    
                    {loading ? (
                      <div className="loading-container">
                        <div className="loader"></div>
                        <p>Loading data...</p>
                      </div>
                    ) : (
                      <div className="cards-container">
                        {filterData(data).length > 0 ? (
                          filterData(data).map((item, index) => (
                            <div 
                              key={item._id || index} 
                              className="connection-card" 
                              onClick={() => handleClick(key, item._id)}
                            >
                              
                              
                              <div className="connection-details">
                                <h4>{item.name || "No Name"}</h4>
                                
                                <div className="tag-container">
                                  <span className="location-tag">
                                    <span className="tag-icon">📍</span>
                                    {item.location || "Unknown Location"}
                                  </span>
                                  
                                  {key === "entrepreneurs" && (
                                    <span className="business-tag">
                                      <span className="tag-icon">💼</span>
                                      {item.aboutBusiness || "No Business Info"}
                                    </span>
                                  )}
                                  
                                  {key === "land" && (
                                    <span className="property-tag">
                                      <span className="tag-icon">🏠</span>
                                      {item.landSize || "Size N/A"}
                                    </span>
                                  )}
                                  
                                  {key === "labor" && (
                                    <span className="skill-tag">
                                      <span className="tag-icon">🛠️</span>
                                      {item.skillset || "No Skills Listed"}
                                    </span>
                                  )}
                                  
                                  {key === "suppliers" && (
                                    <span className="industry-tag">
                                      <span className="tag-icon">🏭</span>
                                      {item.industry || "No Industry Info"}
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              <button className="connect-button">View Profile</button>
                            </div>
                          ))
                        ) : (
                          <div className="no-results">
                            <div className="no-results-icon">🔍</div>
                            <h3>No Results Found</h3>
                            <p>Try changing your search or filters</p>
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
    </div>
  );
};

export default Profile;