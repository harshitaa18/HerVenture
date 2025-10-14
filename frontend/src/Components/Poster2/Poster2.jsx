import React from 'react';
import './Poster2.css';
import hai from "../../Components/Assets/hai.jpg";
import { Link } from 'react-router-dom';

const Poster2 = () => {
  return (
    <div className="price-poster-container">
      <div className="price-poster-text-section">
        <h2 className="price-poster-heading">Compare Prices Smartly</h2>
        <p className="price-poster-description">
          🔍 Discover the <b>best deals</b> effortlessly with our <b>Price Comparator</b>.<br />
          🛒 Simply search for a product and instantly see prices across multiple platforms.<br />
          💰 <b>Save time and money</b> while making informed purchase decisions.<br />
          ⚡ Stay updated with the latest discounts and trending products in real time.<br />
        </p>

        <Link to="/compare">
          <button className="price-poster-button">
            Try Price Comparator
          </button>
        </Link>
      </div>

      <div className="price-poster-image-section">
        <div className="price-poster-image-wrapper">
          <img
            src={hai}
            alt="Price Comparison Illustration"
            className="price-poster-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Poster2;
