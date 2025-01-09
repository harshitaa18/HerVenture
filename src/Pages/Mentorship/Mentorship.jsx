import React from "react";
import "./Mentorship.css";
import img1 from "../../Components/Assets/img1.jpg";
import img2 from "../../Components/Assets/img2.jpg";

const Mentorship = () => {
  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <h1>Mentorship for Women Entrepreneurs</h1>
        <p>
          We empower budding women entrepreneurs by providing tailored
          investment opportunities, marketing strategies, and training
          solutions.
        </p>
      </div>

      {/* Services Section */}
      <div className="boxes">
        <div className="box">
          <h3>Investment Guidance 💼</h3>
          <p>
            Secure funding through expert-led financial strategies customized
            for startups.
          </p>
        </div>
        <div className="box">
          <h3>Marketing Solutions 📈</h3>
          <p>
            Grow your brand with our tailored marketing campaigns and industry
            insights.
          </p>
        </div>
        <div className="box">
          <h3>Skill-Based Training 🎓</h3>
          <p>
            Learn essential skills needed to manage and grow your business
            effectively.
          </p>
        </div>
      </div>

      {/* Mentor Cards Section */}
      <div className="mentors">
        <h2>Our Mentors</h2>
        <div className="mentor-cards">
          <div className="card">
            <img src={img1} alt="Jane Smith" />
            <h4>Jane Smith</h4>
            <p>Marketing Expert</p>
          </div>
          <div className="card">
            <img src={img2} alt="Emily Johnson" />
            <h4>Emily Johnson</h4>
            <p>Investment Strategist</p>
          </div>
          <div className="card">
            <img src={img1} alt="Anna Brown" />
            <h4>Anna Brown</h4>
            <p>Startup Coach</p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta">
        <a href="#join">Join Now</a>
      </div>
    </div>
  );
};

export default Mentorship;
