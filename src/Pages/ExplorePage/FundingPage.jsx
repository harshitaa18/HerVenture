import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Funding.css';
import img1 from "../../Components/Assets/img1.jpg"

const investors = [
  { 
    id: 1, 
    name: "John Doe", 
    industry: "Tech Startup", 
    description: "Investor in AI and SaaS startups.", 
    image: img1,
    investmentRange: 500000 
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    industry: "Finance", 
    description: "Focuses on fintech and blockchain innovations.", 
    image: img1,
    investmentRange: 1000000 
  },
  { 
    id: 3, 
    name: "Alice Johnson", 
    industry: "HealthTech", 
    description: "Invests in cutting-edge health technologies.", 
    image: img1,
    investmentRange: 2000000 
  },
  { 
    id: 4, 
    name: "Michael Brown", 
    industry: "E-Commerce", 
    description: "Interested in e-commerce growth and logistics.", 
    image: img1,
    investmentRange: 750000 
  }
];

const FundingPage = () => {
  const [searchIndustry, setSearchIndustry] = useState('');
  const [investmentRange, setInvestmentRange] = useState('');

  // Filter investors based on search criteria
  const filteredInvestors = investors.filter(investor => 
    (searchIndustry === '' || investor.industry.toLowerCase().includes(searchIndustry.toLowerCase())) &&
    (investmentRange === '' || investor.investmentRange <= parseInt(investmentRange))
  );

  return (
    <div className="funding-page-container">
      <h1>Funding Opportunities</h1>
      <p>Explore curated listings of investors who can help your startup grow.</p>

      {/* Search & Filter Section */}
      <div className="filter-section">
        <input 
          type="text" 
          placeholder="Search by Industry..." 
          value={searchIndustry}
          onChange={(e) => setSearchIndustry(e.target.value)}
          className="search-input"
        />

        <select 
          value={investmentRange} 
          onChange={(e) => setInvestmentRange(e.target.value)}
          className="dropdown"
        >
          <option value="">Filter by Investment Range</option>
          <option value="500000">Up to ₹5,00,000</option>
          <option value="1000000">Up to ₹10,00,000</option>
          <option value="2000000">Up to ₹20,00,000</option>
        </select>
      </div>

      {/* Investors List */}
      <div className="investor-list">
        {filteredInvestors.length > 0 ? (
          filteredInvestors.map(investor => (
            <div key={investor.id} className="investor-card">
              <img src={investor.image} alt={investor.name} className="investor-image" />
              <h3>{investor.name}</h3>
              <p><strong>Industry:</strong> {investor.industry}</p>
              <p>{investor.description}</p>
              <p><strong>Investment Range:</strong> ₹{investor.investmentRange.toLocaleString()}</p>
              <Link to={`/investor/${investor.id}`} className="approach-button">Approach</Link>
            </div>
          ))
        ) : (
          <p className="no-results">No investors found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default FundingPage;
