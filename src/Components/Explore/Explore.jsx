import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Explore.css';
import img2 from "../../Components/Assets/explore_comp.png";

const Explore = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/explore');
  };

  return (
    <div className="explore-container">
      <div className="explore-left">
        <div className="scrolling-image-container">
          <img
            src={img2} // Replace with your image URL
            alt="Scrolling"
            className="scrolling-image"
          />
        </div>
      </div>
      <div className="explore-right">
        <h2>Explore Opportunities</h2>
        <p>
          <b>Discover</b> mentors, connect with like-minded entrepreneurs,<br />
          and find funding to grow your startup.<br />
          <b>Share</b> your vision, exchange ideas,
          and build a supportive community. <br />
          <b>Access</b> expert advice to navigate challenges,
          and turn your innovative ideas into reality.<br/>
          <b>Collaborate</b>, learn, and scale your business,
          all in one dynamic ecosystem.<br />
          <b>Unleash</b> your potential, ignite your passion,
          and transform your startup journey today.
        </p>
        <button className="explore-button" onClick={handleExploreClick}>
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Explore;
