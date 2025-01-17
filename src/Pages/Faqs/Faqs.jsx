import React, { useState } from 'react';
import './Faqs.css';

export const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('For Startups');

  const faqData = {
    'For Startups': [
      {
        question: 'I have an innovative idea that I want to pursue as a Startup. What guidance can Startup India provide me?',
        answer: 'Startup India provides guidance through a wide array of resources such as mentorship, funding support, and recognition under government initiatives.',
      },
      {
        question: 'My entity does not have a PAN. Would I be allowed to register it as a ‘Startup’ on the Startup India portal?',
        answer: 'Yes, you can still register, but it is advisable to obtain a PAN for compliance purposes.',
      },
      {
        question: 'Would a One Person Company (OPC) be eligible to avail benefits under the Startup India initiative?',
        answer: 'Yes, OPCs are eligible to avail benefits under the Startup India initiative.',
      },
      {
        question: 'Can a foreigner enter into partnership under the LLP Act and get that LLP registered with Startup India?',
        answer: 'Yes, foreign nationals can enter into partnerships under the LLP Act and register with Startup India.',
      },
      {
        question: 'Can I provide two mobile numbers in the registration form?',
        answer: 'No, only one mobile number is allowed for registration.',
      },
      
      
    ],
    'For Mentors/Investors': [
      {
        question: 'How do I register as a Mentor/ Investor on the Hub?',
        answer: 'You can register as a Mentor/Investor by signing up on the Hub and completing your profile.',
      },
      {
        question: 'What is my role as a Mentor on the Hub?',
        answer: 'As a mentor, your role is to guide and provide expert advice to startups on various aspects of their business.',
      },
      {
        question: 'How do Startups connect with a mentor/ investor?',
        answer: 'Startups can connect with mentors/investors through the portal’s matchmaking feature.',
      },
      {
        question: 'How do you make sure I don’t get spammed?',
        answer: 'The platform ensures privacy by allowing you to accept or reject connection requests.',
      },
      {
        question: 'Can I get access to additional resources which can further aid my mentorship support to the Startup?',
        answer: 'Yes, the platform provides additional resources like toolkits, case studies, and training programs.',
      },
      
    ],
    'For Facilitators & Others': [
      {
        question: 'What is the procedure to claim reimbursement by patent facilitators for services offered to startups?',
        answer: 'Facilitators need to submit invoices and required documents on the portal for processing reimbursements.',
      },
      {
        question: 'What is the procedure to claim reimbursement by Trademark facilitators for services offered to startups?',
        answer: 'Trademark facilitators must submit proof of services rendered along with relevant invoices.',
      },
      {
        question: 'What factors are considered by investors to invest in startups?',
        answer: 'Investors typically consider the startup’s innovation, scalability, team strength, and market potential.',
      },
      {
        question: 'How do Investors earn returns from investing in Startups?',
        answer: 'Investors earn returns through equity appreciation, dividends, or eventual exits like IPOs or acquisitions.',
      },
      {
        question: 'What is a Term Sheet?',
        answer: 'A Term Sheet is a document outlining the terms and conditions of an investment deal between a startup and an investor.',
      },
    ],
  };

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="Faqs">
      <div className='special'>
        <header>
          <h1 className='Faqs-title'>FAQs</h1>
        </header>
      </div>
      <div className='faqs-total'>
      <div className="faq-sidebar">
        <ul>
          {Object.keys(faqData).map((category) => (
            <li
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className="faq-content">
        {faqData[selectedCategory].map((faq, index) => (
          <div
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            key={index}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {faq.question}
              <span className="faq-toggle">{activeIndex === index ? '-' : '+'}</span>
            </div>
            {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Faqs;
