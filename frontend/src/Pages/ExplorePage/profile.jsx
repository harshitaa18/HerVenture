import React, { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import { entrepreneurs, landowners } from "./data";

const Profile = () => {
  const { user } = useUser();
  const [tab, setTab] = useState("overview");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [fullUser, setFullUser] = useState(null);
  const navigate = useNavigate();

  const roleMap = {
    land: "landowner",
    entrepreneurs: "entrepreneur",
  };

  const handleClick = (tabKey, id) => {
    const role = roleMap[tabKey];
    if (role) navigate(`/profile/${role}/${id}`);
  };

  useEffect(() => {
    const fetchFullProfile = async () => {
      if (!user) return;
      const token = localStorage.getItem("token");

      // Ensure correct API path for only landowner and entrepreneur
      const validRoles = {
        entrepreneur: "entrepreneur",
        landowner: "landowner",
      };

      const endpoint = validRoles[user.role?.toLowerCase()];
      if (!endpoint) {
        console.error("Invalid or unsupported role:", user.role);
        return;
      }
      console.log("User object:", user);
      console.log("Role:", user?.role, "ID:", user?._id);
      console.log("token: ", token)

      try {
        console.log(endpoint, user._id);
        const res = await axios.get(`http://localhost:5000/api/${endpoint}/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFullUser({ ...user, ...res.data });
        console.log("Fetched profile:", res.data);
      } catch (err) {
        console.error("Error fetching full profile:", err);
      }
    };

    fetchFullProfile();
  }, [user]);

  const renderUserDetails = () => {
    if (!fullUser) return <p>Loading profile...</p>;

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
    };

    return userDetails[fullUser.role?.toLowerCase()] || <p>Role not recognized</p>;
  };

  const tabs = [
    { key: "land", label: "Buy Land", data: landowners, filterKey: "size" },
    { key: "entrepreneurs", label: "See Entrepreneurs", data: entrepreneurs, filterKey: "business" },
  ];

  const filterData = (data) =>
    data.filter(item =>
      (!selectedFilter || Object.values(item).includes(selectedFilter)) &&
      item.location.toLowerCase().includes(searchQuery)
    );

  return (
    <div className="profile-container">
      {fullUser ? (
        <div className="profile-card">
          <h2>{fullUser.name || "No Name"}</h2>
          <p>{fullUser.role ? fullUser.role.charAt(0).toUpperCase() + fullUser.role.slice(1) : "No Role"}</p>
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
