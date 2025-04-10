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

        {/* ✅ Conditionally navigate to /profile or /signup */}
        <Link to={user ? "/profile" : "/signup"}>
          <button className="explore-button">
            Explore Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Explore;
