import React from 'react';
import './Explore.css';
import img2 from "../../Components/Assets/explore_comp.png";
import { Link } from 'react-router-dom';
import { useUser } from '../../Context/UserContext'; // ✅ import your context

const Explore = () => {
  const { user } = useUser(); // ✅ access current user

  return (
    <div className="explore-container">
      <div className="explore-left">
        <div className="scrolling-image-container">
          <img
            src={img2}
            alt="Scrolling"
            className="scrolling-image"
          />
        </div>
      </div>
      <div className="explore-right">
        <h2>Explore Opportunities</h2>
        <p>
        💡 <b>Learn, lead, and scale</b> — all within one empowering ecosystem.<br/>
          🏢 Find available <b>business spaces</b> listed by supportive landowners.<br />
          🤝 <b>Connect</b> with inspiring women entrepreneurs across and regions.<br/>
          👩‍💼 <b>Hire skilled women</b> professionals to help bring your business vision to life
          and <b>Grow</b> your network and unlock collaboration opportunities with like-minded individuals.<br/>
        </p>

        {/* ✅ Conditionally navigate to /profile or /signup */}
        <Link to={'/all-posts'}>
          <button className="explore-button">
            Explore Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Explore;
