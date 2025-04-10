import React, { useState } from 'react';
import './Faqs.css';

export const Faqs = () => {
  
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('For Entrepreneurs');

  const faqData = {
    'For Entrepreneurs': [
      {
        question: 'How can HerVenture help me start or grow my business?',
        answer: 'HerVenture supports women entrepreneurs by helping them find land, connect with trusted suppliers, and hire skilled labor — all in one place.',
      },
      {
        question: 'Does HerVenture assist in finding affordable land or workspace?',
        answer: 'Yes, the platform connects you with verified landowners and landlords offering commercial spaces suited for small and growing businesses.',
      },
      {
        question: 'Can I find suppliers for raw materials on HerVenture?',
        answer: 'Absolutely. HerVenture helps you connect with reliable suppliers across categories such as packaging, textiles, food supplies, and more.',
      },
      {
        question: 'Is HerVenture useful for home-based businesses?',
        answer: 'Yes! Even if you\'re operating from home, you can use HerVenture to source materials, find labor, and expand your operations when ready.',
      },
      {
        question: 'How do I hire skilled labor through the platform?',
        answer: 'You can explore and connect with local skilled workers listed on HerVenture, including roles like carpenters, cooks, tailors, and more.',
      },
    ],
    'For Suppliers': [
      {
        question: 'How do I register as a supplier on HerVenture?',
        answer: 'You can sign up on the platform and create a profile listing your products, pricing, and delivery capabilities to start connecting with women entrepreneurs.',
      },
      {
        question: 'What types of businesses can I supply to through HerVenture?',
        answer: 'You can connect with businesses ranging from cafés and boutiques to home-based artisans and tech startups looking for raw materials or services.',
      },
      {
        question: 'Is there a verification process for suppliers?',
        answer: 'Yes, all suppliers go through a basic verification to ensure trust and quality within the platform.',
      },
      {
        question: 'Can I receive orders directly through HerVenture?',
        answer: 'Yes, once listed, entrepreneurs can reach out to you directly to discuss orders, pricing, and delivery timelines.',
      },
      {
        question: 'Is there any fee for listing as a supplier?',
        answer: 'Currently, registration and listing are free to support wider access for both new and established suppliers.',
      },
    ],
    'For Landowners & Property Providers': [
      {
        question: 'How do I list my land or property on HerVenture?',
        answer: 'You can register as a landowner and add property details including location, size, purpose, and pricing. Our team verifies listings before they go live.',
      },
      {
        question: 'What type of properties can I list?',
        answer: 'You can list commercial spaces, retail outlets, co-working areas, warehouses, or land suitable for farming or production units.',
      },
      {
        question: 'Is my property visible only to local entrepreneurs?',
        answer: 'No, your listing is visible to all HerVenture users, so entrepreneurs from nearby cities or states can also find and contact you.',
      },
      {
        question: 'Can I offer short-term or lease options?',
        answer: 'Yes, you can specify if the property is available for lease, rent, or sale — along with the terms.',
      },
      {
        question: 'Will HerVenture help manage the rental process?',
        answer: 'While we don’t manage legal agreements directly, we provide tools for communication and connection between you and potential tenants.',
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
