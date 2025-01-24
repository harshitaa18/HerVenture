import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ExplorePage.css';

const ExplorePage = () => {
  const navigate = useNavigate();

  return (
    <div className="explore-page-container">
      <h1>Explore Opportunities</h1>
      <p>Discover resources to help you grow and succeed in your entrepreneurial journey.</p>

      <section className="explore-section">
        <h2>Mentors</h2>
        <p>Browse our directory of experienced mentors by industry, expertise, or location.</p>
        <button className="explore-button">Find Mentors</button>
      </section>

      <section className="explore-section">
        <h2>Networking Opportunities</h2>
        <p>Connect with entrepreneurs who share your goals or are in complementary industries.</p>
        <button className="explore-button">Start Networking</button>
      </section>

      <section className="explore-section">
        <h2>Funding Opportunities</h2>
        <p>Explore curated listings of investors, grants, and accelerator programs based on your startup type.</p>
        <button className="explore-button" onClick={() => navigate('/funding')}>Discover Funding</button>
      </section>
    </div>
  );
};

export default ExplorePage;
