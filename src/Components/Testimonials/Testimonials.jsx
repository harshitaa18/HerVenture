import React, { useState, useEffect } from "react";
import "./Testimonials.css"; // Add styles as needed
import pic1 from '../Assets/pic1.jpeg';
import pic2 from '../Assets/pic2.jpeg';
import pic3 from '../Assets/pic3.jpeg';
import pic4 from '../Assets/pic4.jpeg';
import pic5 from '../Assets/pic5.jpeg';
import pic6 from '../Assets/pic6.jpeg';

const testimonials = [
  {
    name: "Anita Roy",
    position: "Small Business Owner",
    view: "HerVenture provided me with the tools to manage my business finances more effectively.",
    photo: pic1, // Replace with actual paths to your images
  },
  {
    name: "Meera Sharma",
    position: "Freelance Designer",
    view: "I connected with like-minded women and secured new clients through HerVenture's networking platform.",
    photo: pic2,
  },
  {
    name: "Priya Das",
    position: "Café Owner",
    view: "The training modules helped me to expand my café operations and improve customer satisfaction.",
    photo: pic3,
  },
  {
    name: "Rina Gupta",
    position: "Boutique Owner",
    view: "HerVenture's marketing resources helped me grow my online presence and triple my online sales.",
    photo: pic4,
  },
  {
    name: "Neha Kapoor",
    position: "Tech Entrepreneur",
    view: "Thanks to HerVenture, I successfully pitched my startup and received funding from investors.",
    photo: pic5,
  },
  {
    name: "Sonal Verma",
    position: "Artisan",
    view: "The mentorship program provided guidance on scaling my handmade products business globally.",
    photo: pic6,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="testimonials-container">
      <div className="testimonial-card">
        <img
          src={testimonials[currentIndex].photo}
          alt={testimonials[currentIndex].name}
          className="testimonial-photo"
        />
        <h2>{testimonials[currentIndex].name}</h2>
        <h4>{testimonials[currentIndex].position}</h4>
        <p>{testimonials[currentIndex].view}</p>
      </div>
      <div className="testimonial-buttons">
        <button onClick={prevTestimonial} className="arrow-button">
          &#8592; {/* Left Arrow */}
        </button>
        <button onClick={nextTestimonial} className="arrow-button">
          &#8594; {/* Right Arrow */}
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
