import React, { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import {suppliers} from "./data";

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
  }, [ user]);

  const renderUserDetails = () => {
    if (!user || !fullUser) return <p>Loading profile...</p>;
  
    const userDetails = {
      entrepreneur: (
        <>
          <p><b>Business:</b> {fullUser.aboutBusiness || "N/A"}</p>
          <p><b>Contact No.:</b> {fullUser.contact || "N/A"}</p>
          <p><b>Location:</b> {fullUser.location || "N/A"}</p>
        </>
      ),
      landowner: (
        <>
          <p><b>Land Size:</b> {fullUser.landSize || "N/A"}</p>
          <p><b>Location:</b> {fullUser.location || "N/A"}</p>
          <p><b>For:</b> {fullUser.rentOrSell || "N/A"}</p>
          <p><b>Expected Payment:</b> {fullUser.expectedPayment || "N/A"}</p>
        </>
      ),
      labor: (
        <>
          <p><b>Skillset:</b> {fullUser.skillset || "N/A"}</p>
          <p><b>Certifications:</b> {fullUser.certifications || "N/A"}</p>
          <p><b>Experience:</b> {fullUser.experience || "N/A"} years</p>
          <p><b>Expected Salary:</b> ₹{fullUser.expectedSalary || "N/A"}</p>
          <p><b>Location:</b> {fullUser.location || "N/A"}</p>
        </>
      ),
      supplier: (
        <>
          <p><b>Industry:</b> {fullUser.industry || "N/A"}</p>
          <p><b>Company Name:</b> {fullUser.name || "N/A"}</p>
          <p><b>Location:</b> {fullUser.location || "N/A"}</p>
          <p><b>Contact:</b> {fullUser.contact || "N/A"}</p>
        </>
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
    
    <div className="profilee-container">
      {user ? (
        <div className="profilee-card">
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
          <input
            type="text"
            placeholder="Search by Location..."
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
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
              {filterData(data).map((item, index) => {
                return (
                  <div key={item._id || index} className="car" onClick={() => handleClick(key, item._id)}>
                      <p><b>Name:</b> {item.name || "N/A"}</p>
                      <p><b>Location:</b> {item.location || "N/A"}</p>
                      {key === "entrepreneurs" && <p><b>Business:</b> {item.aboutBusiness || "N/A"}</p>}
                      {key === "land" && <p><b>Land Size:</b> {item.landSize || "N/A"}</p>}
                      {key === "labor" && <p><b>Skillset:</b> {item.skillset || "N/A"}</p>}
                  </div>
                );
              })}
            </div>
          )
        )}
    </div>
  );
};

export default Profile;
