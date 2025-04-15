import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../utils/api";
import { useUser } from "../../../Context/UserContext";
import "./AllPostsPage.css";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [dateOrder, setDateOrder] = useState("latest");
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/post");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    if (!user) return navigate("/login");
    try {
      const res = await API.post(`/post/${postId}/like`, { userId: user._id });
      setPosts(posts.map(p => p._id === postId ? res.data : p));
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const filteredPosts = posts
    .filter(post =>
      (roleFilter ? post.role === roleFilter : true) &&
      (tagFilter ? post.tags.includes(tagFilter) : true) &&
      (priceFilter ? post.price <= parseInt(priceFilter) : true)
    )
    .sort((a, b) =>
      dateOrder === "latest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  const uniqueRoles = [...new Set(posts.map(post => post.role))];
  const uniqueTags = [...new Set(posts.flatMap(post => post.tags))];

  return (
    <div className="all-posts-container">
      <div className="filter-sidebar">
        <h3>Filter by Role</h3>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="">All Roles</option>
          {uniqueRoles.map((role, i) => (
            <option key={i} value={role}>{role}</option>
          ))}
        </select>

        <h3>Filter by Tag</h3>
        <select value={tagFilter} onChange={(e) => setTagFilter(e.target.value)}>
          <option value="">All Tags</option>
          {uniqueTags.map((tag, i) => (
            <option key={i} value={tag}>{tag}</option>
          ))}
        </select>

        <h3>Max Price</h3>
        <input
          type="number"
          placeholder="Enter max price"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        />

        <h3>Sort by Date</h3>
        <select value={dateOrder} onChange={(e) => setDateOrder(e.target.value)}>
          <option value="latest">Latest First</option>
          <option value="earliest">Earliest First</option>
        </select>
      </div>

      <div className="post-list">
        <div className="btn-row">
        <button className="create-post-btn2" onClick={() => user ? navigate("/profile") : navigate("/login")}>Go to Network</button>
        <button className="create-post-btn1" onClick={() => user ? navigate("/post") : navigate("/login")}>
          + Create Post
        </button>
        </div>

        {filteredPosts.map((post) => (
          <div className="post-card" key={post._id}>
            <div className="post-card-content">
              <div className="post-card-header">
                <h2>{post.title}</h2>
                <span className="post-price">₹{post.price}</span>
              </div>

              <span className="post-role">{post.role}</span>

              <p>{post.description?.slice(0, 100)}...</p>

              <div className="tags">
                {post.tags?.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>

              <div className="post-meta">
                <p>By: {post.userId?.name}</p>
              </div>

              {post.comments?.length > 0 && (
                <div className="highlighted-comment">
                  💬 {post.comments[post.comments.length - 1].text}
                </div>
              )}

              <div className="post-actions">
                <button onClick={() => handleLike(post._id)}>
                  👍 {post.likes?.length || 0}
                </button>
                <Link to={`/post/${post._id}`} className="view-btn">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
