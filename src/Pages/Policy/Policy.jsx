import React, { useState } from 'react';
import './Policy.css'; // Importing the CSS file
import w1 from "../../Components/Assets/w1.png";
import w2 from "../../Components/Assets/w2.png";
import w3 from "../../Components/Assets/w3.jpeg";
import w4 from "../../Components/Assets/w4.jpeg";
import w5 from "../../Components/Assets/w5.jpeg";
import w6 from "../../Components/Assets/w6.webp";

const GovernmentPolicies = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const policies = [
    {
      id: 1,
      name: 'Mahila Udyam Nidhi Scheme',
      description:
        'Provides financial assistance up to ₹10 lakh to women entrepreneurs to set up new projects in small-scale industries.',
      eligibility: 'Women entrepreneurs planning to start small-scale industries.',
      benefits: [
        'Financial assistance up to ₹10 lakh',
        'Encouragement for small-scale industries',
        'Low-interest loans',
      ],
      link: 'https://msme.gov.in/entrepreneurship-and-skill-development-programs',
    },
    {
      id: 2,
      name: 'Mudra Yojana for Women',
      description:
        'Offers loans to women entrepreneurs to start small businesses with loans ranging from ₹50,000 to ₹10 lakh under three schemes: Shishu, Kishor, and Tarun.',
      eligibility: 'Women entrepreneurs in small business sectors.',
      benefits: [
        'Loans for small businesses',
        'Low-interest rates',
        'Support for women-led enterprises',
      ],
      link: 'https://msme.gov.in/entrepreneurship-and-skill-development-programs',
    },
    {
      id: 3,
      name: 'Annapurna Scheme',
      description:
        'Supports women entrepreneurs in setting up food catering businesses by providing loans of up to ₹50,000 for purchasing kitchen equipment.',
      eligibility: 'Women entrepreneurs in the food catering business.',
      benefits: [
        'Loan of up to ₹50,000',
        'Support for purchasing kitchen equipment',
        'Encourages food-related entrepreneurship',
      ],
      link: 'https://msme.gov.in/entrepreneurship-and-skill-development-programs',
    },
    {
      id: 4,
      name: 'Stand-Up India Scheme',
      description:
        'Offers bank loans between ₹10 lakh and ₹1 crore to women entrepreneurs for setting up greenfield enterprises in manufacturing, services, or trading.',
      eligibility: 'Women entrepreneurs in manufacturing, services, or trading.',
      benefits: [
        'Loans between ₹10 lakh and ₹1 crore',
        'Focus on greenfield enterprises',
        'Support for innovation and job creation',
      ],
      link: 'https://msme.gov.in/entrepreneurship-and-skill-development-programs',
    },
    {
      id: 5,
      name: 'Bharatiya Mahila Bank Business Loan',
      description:
        'Provides loans up to ₹20 crore to women entrepreneurs for starting businesses in various sectors with lower interest rates.',
      eligibility: 'Women entrepreneurs in diverse business sectors.',
      benefits: [
        'Loans up to ₹20 crore',
        'Lower interest rates',
        'Support for large-scale businesses',
      ],
      link: 'https://msme.gov.in/entrepreneurship-and-skill-development-programs',
    },
    {
      id: 6,
      name: 'Stree Shakti Package for Women Entrepreneurs',
      description:
        'Encourages women to start businesses by offering concessions on interest rates and loans up to ₹50 lakh.',
      eligibility: 'Women entrepreneurs with 50% ownership in a business.',
      benefits: [
        'Interest rate concessions',
        'Loans up to ₹50 lakh',
        'Empowers women in business ownership',
      ],
      link: 'https://msme.gov.in/entrepreneurship-and-skill-development-programs',
    },
    {
      id: 7,
      name: 'TREAD (Trade Related Entrepreneurship Assistance and Development) Scheme for Women',
      description:
        'Provides grants up to 30% of the project cost to women entrepreneurs for training, counseling, and marketing support.',
      eligibility: 'Women entrepreneurs in need of training and marketing support.',
      benefits: [
        'Grants up to 30% of project cost',
        'Access to training and counseling',
        'Marketing support for businesses',
      ],
      link: 'https://msme.gov.in/entrepreneurship-and-skill-development-programs',
    },
    {
      id: 8,
      name: 'Pradhan Mantri Rozgar Yojana (PMRY)',
      description:
        'Encourages self-employment by offering subsidized loans to educated unemployed individuals, with women being a key focus group.',
      eligibility: 'Educated unemployed women entrepreneurs.',
      benefits: [
        'Subsidized loans',
        'Support for self-employment',
        'Encourages entrepreneurship',
      ],
      link: 'https://msme.gov.in/entrepreneurship-and-skill-development-programs',
    },
    {
      id: 9,
      name: 'Dena Shakti Scheme',
      description:
        'Supports women entrepreneurs by providing loans in the fields of agriculture, manufacturing, microcredit, retail stores, and small enterprises.',
      eligibility: 'Women entrepreneurs in diverse fields like agriculture and retail.',
      benefits: [
        'Loans for various business sectors',
        'Encourages small enterprises',
        'Low-interest loans',
      ],
      link: 'https://msme.gov.in/entrepreneurship-and-skill-development-programs',
    },
    {
      id: 10,
      name: 'Udyogini Scheme',
      description:
        'Aimed at empowering rural women, this scheme offers loans up to ₹1 lakh for starting small businesses, especially in the agriculture sector.',
      eligibility: 'Rural women entrepreneurs.',
      benefits: [
        'Loans up to ₹1 lakh',
        'Support for small businesses',
        'Focus on agriculture-related businesses',
      ],
      link: 'https://msme.gov.in/entrepreneurship-and-skill-development-programs',
    },
    {
      id: 11,
      name: 'National Policy for Skill Development and Entrepreneurship',
      description:
        'Provides training programs, mentorship, and skill development initiatives to help women entrepreneurs start and scale their businesses.',
      eligibility: 'Women entrepreneurs seeking skill development.',
      benefits: [
        'Training programs',
        'Mentorship opportunities',
        'Skill development support',
      ],
      link: 'https://msme.gov.in/entrepreneurship-and-skill-development-programs',
    },
    {
      id: 12,
      name: 'Mahila Coir Yojana',
      description:
        'A scheme by the Coir Board of India providing training and financial assistance to rural women to set up coir-related production units.',
      eligibility: 'Rural women interested in coir production.',
      benefits: [
        'Training and financial assistance',
        'Encourages coir production units',
        'Empowers rural women entrepreneurs',
      ],
      link: 'https://msme.gov.in/entrepreneurship-and-skill-development-programs',
    },
    {
      id: 13,
      name: 'Support to Training and Employment Program for Women (STEP)',
      description:
        'Enhances the skills of women by providing training in traditional sectors such as agriculture, handicrafts, and fisheries to help them achieve economic independence.',
      eligibility: 'Women in traditional sectors seeking training.',
      benefits: [
        'Skill enhancement',
        'Training in agriculture and handicrafts',
        'Promotes economic independence',
      ],
      link: 'https://msme.gov.in/entrepreneurship-and-skill-development-programs',
    },
    {
      id: 14,
      name: 'Digital India Initiative for Women Entrepreneurs',
      description:
        'Provides resources and training to women to encourage the use of digital technology for business growth.',
      eligibility: 'Women entrepreneurs interested in digital technology.',
      benefits: [
        'Resources for digital technology',
        'Training programs',
        'Support for business growth',
      ],
      link: 'https://msme.gov.in/entrepreneurship-and-skill-development-programs',
    },
    {
      id: 15,
      name: 'Entrepreneurship Development Programme (EDP) by MSME',
      description:
        'Offers training to women to develop their entrepreneurial skills, focusing on manufacturing and service industries.',
      eligibility: 'Women entrepreneurs in manufacturing or services.',
      benefits: [
        'Entrepreneurial skill training',
        'Support for manufacturing industries',
        'Encourages service-oriented businesses',
      ],
      link: 'https://msme.gov.in/entrepreneurship-and-skill-development-programs',
    },
  ];
  

  const filteredPolicies = policies.filter((policy) =>
    policy.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="fixed-images left-side">
        <img src={w1} alt="Policy" />
        <img src={w2} alt="Policy" />
        <img src={w6} alt="Policy" />
      </div>

      <div className="policies-container">
        <h1>Government Policies for Women Entrepreneurs</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search policies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="policies-list">
          {filteredPolicies.length > 0 ? (
            filteredPolicies.map((policy) => (
              <a key={policy.id} href={policy.link} target="_blank" rel="noopener noreferrer" className="policy-card">
                <h2 className="policy-name">{policy.name}</h2>
                <p className="policy-description">{policy.description}</p>
                <hr />
                <p><strong>Eligibility:</strong> {policy.eligibility}</p>
                <hr />
                <p><strong>Benefits:</strong></p>
                <ul className="policy-benefits">
                  {policy.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </a>
            ))
          ) : (
            <p className="no-policies">No policies found matching your search.</p>
          )}
        </div>
      </div>

      <div className="fixed-images right-side">
        <img src={w5} alt="Policy" />
        <img src={w4} alt="Policy" />
        <img src={w3} alt="Policy" />
      </div>
    </div>
  );
};

export default GovernmentPolicies;