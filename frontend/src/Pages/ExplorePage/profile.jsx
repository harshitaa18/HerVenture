import React, { useEffect, useState, useContext } from 'react';
import './profile.css';
import { UserContext } from '../../../context/UserContext';
import axios from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [profileData, setProfileData] = useState(null);
  const [activeTab, setActiveTab] = useState('posts');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role) {
      axios.get(`/profile/${user.role}/${user._id}`)
        .then((res) => setProfileData(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleSearch = (e) => setSearchQuery(e.target.value);

  return (
    <div className="profile-container">
      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="profile-name">{user?.name}</div>
        <div className="profile-email">{user?.email}</div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === 'posts' ? 'active' : ''}
          onClick={() => setActiveTab('posts')}
        >
          My Posts
        </button>
        <button
          className={activeTab === 'profile' ? 'active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          My Profile
        </button>
      </div>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <FiSearch className="search-icon" />
      </div>

      {/* Posts */}
      {activeTab === 'posts' && (
        <div className="cards-grid">
          {profileData?.posts?.filter(post =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((post) => (
            <div className="card" key={post._id}>
              <div className="card-header">
                <div className="card-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
                <div>
                  <div style={{ fontWeight: 'bold' }}>{user?.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#777' }}>{user?.email}</div>
                </div>
              </div>
              <div className="card-body">
                <div className="card-detail"><strong>Title:</strong> {post.title}</div>
                <div className="card-detail"><strong>Type:</strong> {post.type}</div>
                <div className="card-detail"><strong>Description:</strong> {post.description}</div>
              </div>
              <div className="card-footer">
                <button className="view-details-btn" onClick={() => navigate(`/post/${post._id}`)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Profile Info */}
      {activeTab === 'profile' && profileData && (
        <div className="profile-info" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem' }}>My Profile</h2>
          {Object.entries(profileData).map(([key, value]) =>
            key !== 'posts' && (
              <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</p>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
