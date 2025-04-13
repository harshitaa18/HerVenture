import React from 'react';
import './BusinessSection.css';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkedAlt, FaHandshake, FaUsersCog, FaInfinity } from 'react-icons/fa';

const BusinessSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/all-posts');
  };

  const businessServices = [
    {
      id: 1,
      icon: <FaMapMarkedAlt />,
      title: "Need land?",
      description: "HerVenture equips you with unique tools to uncover the perfect location for your vision.",
    },
    {
      id: 2,
      icon: <FaHandshake />,
      title: "Need suppliers?",
      description: "HerVenture links you with trusted vendors who understand your needs.",
    },
    {
      id: 3,
      icon: <FaUsersCog />,
      title: "Need labour?",
      description: "HerVenture makes it easier to connect with professionals ready to bring your ideas to life.",
    },
    {
      id: 4,
      icon: <FaInfinity />,
      title: "And more!",
      description: "Explore a full suite of features designed to support every step of your creative journey.",
    }
  ];

  return (
    <div className="business-section">
      <div className="business-header">
        <h2>WANT MORE HELP TO GROW YOUR BUSINESS?</h2>
        <p>We’ve got you covered!</p>
      </div>

      <div className="business-cards-container">
        {businessServices.map((service) => (
          <div className="business-card" key={service.id}>
            <div className="card-border"></div>
            <div className="business-card-content">
              <div className="business-card-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              {/* <button className="business-card-button">Learn More</button> */}
            </div>
          </div>
        ))}
      </div>

      <div className="business-cta">
        <h3>Let’s turn your business ideas into reality with the right support.</h3>
        <button className="cta-button" onClick={handleGetStarted}>Get Started</button>
      </div>
    </div>
  );
};

export default BusinessSection;
