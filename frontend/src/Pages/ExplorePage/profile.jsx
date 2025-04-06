import React, { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import { entrepreneurs, landowners, skilledLabor, suppliers } from "./data";

const Profile = () => {
  const { user } = useUser();
  const [tab, setTab] = useState("overview");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [fullUser, setFullUser] = useState(null);
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

  useEffect(() => {
    const fetchFullProfile = async () => {
      if (!user) return;
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/${user.role}/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFullUser({ ...user, ...res.data });
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
      "skilled labor": (
        <>
          <p><b>Skill:</b> {fullUser.skillset || "N/A"}</p>
          <p><b>Experience:</b> {fullUser.experience != null ? `${fullUser.experience} years` : "N/A"}</p>
          <p><b>Expected Salary:</b> {fullUser.expectedSalary ? `$${fullUser.expectedSalary}` : "N/A"}</p>
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
      supplier: (
        <>
          <p><b>Products Supplied:</b> {fullUser.products || "N/A"}</p>
          <p><b>Minimum Order Quantity:</b> {fullUser.minOrder || "N/A"}</p>
          <p><b>Delivery Areas:</b> {fullUser.deliveryAreas || "N/A"}</p>
        </>
      ),
    };

    return userDetails[fullUser.role] || <p>Role not recognized</p>;
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
