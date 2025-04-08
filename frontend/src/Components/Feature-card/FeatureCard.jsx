import React from 'react';
import './FeatureCard.css';

const featureData = [
  {
    title: 'Landspace',
    description: 'Find your desirable landspace!',
    stat: '50+ landowners',
    link: '/feature-one'
  },
  {
    title: 'Supplier',
    description: 'connect with reliable suplliers',
    stat: '60+ suppliers listed',
    link: '/feature-two'
  },
  {
    title: 'Entrepreneur',
    description: 'Grow your business with us',
    stat: '95+ entrepreneurs connected',
    link: '/feature-three'
  }
];

const FeatureCards = () => {
  return (
    <div className="feature-container">
      {featureData.map((feature, index) => (
        <div key={index} className="feature-card">
          <div className="feature-image" />
          <div className="feature-content">
            <h2>{feature.title}</h2>
            <div className="card-stat">{feature.stat}</div>
            <p>{feature.description}</p>
            <a className="cta" href={feature.link}>Learn More</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;