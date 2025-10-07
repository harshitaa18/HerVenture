import React from "react";
import "./PriceComparator.css";
import { Link } from "react-router-dom";
import img2 from "../../Components/Assets/best_deal.webp";

const PriceComparator = () => {
  return (
    <div className="price-container">
      {/* 👉 TEXT FIRST (LEFT SIDE) */}
      <div className="price-right">
        <h2>Price Comparator</h2>
        <p>
          💰Find the best deals across trusted online stores with <b>real-time price insights,
           compare prices, ratings, and discounts confidently</b>, and save both time and money
            as our smart comparator makes shopping faster, easier, and smarter.

        </p>

        <Link to={" "}>
          <button className="price-button">Visit Now</button>
        </Link>
      </div>

      {/* 👉 IMAGE SECOND (RIGHT SIDE) */}
      <div className="price-left">
        <img src={img2} alt="img" className="deal-image" />
      </div>
    </div>
  );
};

export default PriceComparator;
