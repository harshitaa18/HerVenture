import React from 'react';
import { useParams } from 'react-router-dom';
import './Investors.css';
import img1 from "../../Components/Assets/img1.jpg"

const investors = [
  { 
    id: 1, 
    name: "John Doe", 
    industry: "Tech Startup", 
    description: "Investor in AI and SaaS startups.", 
    image: img1,
    investmentRange: "$50,000 - $500,000",
    pastInvestments: ["OpenAI", "TechCrunch", "AI Labs"],
    email: "john.doe@example.com"
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    industry: "Finance", 
    description: "Focuses on fintech and blockchain innovations.", 
    image: img1,
    investmentRange: "$100,000 - $1,000,000",
    pastInvestments: ["CoinBase", "Stripe", "FinanceHub"],
    email: "jane.smith@example.com"
  },
  { 
    id: 3, 
    name: "Alice Johnson", 
    industry: "HealthTech", 
    description: "Invests in cutting-edge health technologies.", 
    image: img1,
    investmentRange: "$200,000 - $2,000,000",
    pastInvestments: ["HealthAI", "MediTech", "BioGen"],
    email: "alice.johnson@example.com"
  }
];

const InvestorDetails = () => {
  const { id } = useParams();
  const investor = investors.find((inv) => inv.id === parseInt(id));

  if (!investor) {
    return <h2 className="not-found">Investor Not Found</h2>;
  }

  return (
    <div className="investor-details-container">
      <div className="investor-card">
        <img src={investor.image} alt={investor.name} className="investor-details-image" />
        <h2>{investor.name}</h2>
        <h4>Industry: <span>{investor.industry}</span></h4>
        <p className="description">{investor.description}</p>

        <div className="investment-info">
          <h3>Investment Range</h3>
          <p>{investor.investmentRange}</p>

          <h3>Past Investments</h3>
          <ul>
            {investor.pastInvestments.map((investment, index) => (
              <li key={index}>{investment}</li>
            ))}
          </ul>
        </div>

        <a href={`mailto:${investor.email}`} className="contact-button">
          Contact {investor.name}
        </a>
      </div>
    </div>
  );
};

export default InvestorDetails;
