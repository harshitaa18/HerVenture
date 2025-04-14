import React, { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import API from "../../utils/api";
import './Dashboard.css';
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";


const UserDashboard = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get(`/post/user/${user._id}`);
        setUserPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err.response?.data || err.message);
      }
    };

    if (user?._id) {
      fetchPosts();
    }
  }, [user]);

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
        const res = await API.get(`/${endpoint}/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData({ ...user, ...res.data });

      } catch (err) {
        console.error("Error fetching full profile:", err);
      }
    };

    fetchFullProfile();
  }, [ user]);

  const handleCreatePost = () => {
    navigate("/post", { state: { role: user.role }}); // Replace with your actual route
  };

  const handleDelete = async (postId) => {
    try {
      await API.delete(`/post/${postId}`);
      setUserPosts((prev) => prev.filter((post) => post._id !== postId)); // Update UI
    } catch (err) {
      console.error("Error deleting post:", err.response?.data || err.message);
    }
  };

  if (!userData) return <p>No user data found.</p>;

  return (
    <div className="dashboard-container" style={{ padding: "2rem" }}>
      <h1>Welcome, {userData.name || "User"}</h1>
      <h2>Role: {userData.role}</h2>

      {/* Common User Info */}
      <div className="common-info" style={{ marginTop: "1rem" }}>
        <p><strong>Email:</strong> {userData.email || "N/A"}</p>
        <p><strong>Contact:</strong> {userData.contact || "N/A"}</p>
        <p><strong>Location:</strong> {userData.location || "N/A"}</p>
      </div>

      {/* Entrepreneur Details */}
      {userData.role === "entrepreneur" && (
        <div className="entrepreneur-section" style={{ marginTop: "2rem" }}>
          <p><strong>Business:</strong> {userData.business || "N/A"}</p>
          <p><strong>Business License:</strong> {userData.businessLicense || "N/A"}</p>
          <p><strong>About Business:</strong> {userData.aboutBusiness || "N/A"}</p>
        </div>
      )}

      {/* Skilled Labor Details */}
      {userData.role === "labor" && (
        <div className="skilled-labor-section" style={{ marginTop: "2rem" }}>
          <p><strong>Skillset:</strong> {userData.skillset || "N/A"}</p>
          <p><strong>Experience:</strong> {userData.experience || "N/A"} years</p>
          <p><strong>Certifications:</strong> {userData.certifications || "N/A"}</p>
          <p><strong>Expected Salary:</strong> ₹{userData.expectedSalary || "N/A"}</p>
        </div>
      )}

      {/* Landowner Details */}
      {userData.role === "landowner" && (
        <div className="landowner-section" style={{ marginTop: "2rem" }}>
          <p><strong>Land Size:</strong> {userData.landSize || "N/A"}</p>
          <p><strong>Expected Payment:</strong> ₹{userData.expectedPayment || "N/A"}</p>
          <p><strong>Rent or Sell:</strong> {userData.rentOrSell || "N/A"}</p>
          <p><strong>Preferred Business:</strong> {userData.preferredBusiness || "N/A"}</p>
          <p><strong>Owner Address:</strong> {userData.ownerAddress || "N/A"}</p>
        </div>
      )}
      <div className="post-section">
  <p className="post-prompt">Want to post your requirement?</p>
  <button  onClick={handleCreatePost} className="create-post-btn">Create New Post</button>
</div>
<div className="dashboard">
      <h2>My Posts</h2>
      {userPosts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        userPosts.map((post) => (
          <div key={post._id} className="post-card1">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <small>{post.tags?.join(", ")}</small>
            <p>{post.contact}</p>
            <button className="delete-btn" onClick={() => handleDelete(post._id)}>
              <FiTrash2 className="delete-icon" />
            </button>

          </div>
        ))
      )}
    </div>
    </div>
  );
};

export default UserDashboard;
