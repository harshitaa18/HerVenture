import React, { useState, useEffect } from "react";
import "./Testimonials.css";
import pic1 from "../Assets/images.jpg";
import pic2 from "../Assets/pic2.jpeg";
import pic3 from "../Assets/pic3.jpg";
import pic4 from "../Assets/pic4.jpeg";
import pic5 from "../Assets/pic5.jpeg";
// import pic6 from "../Assets/pic6.jpeg";
import pic6 from "../Assets/pic6.jpeg";

const testimonials = [
  {
    name: "Anita Roy",
    position: "Small Business Owner",
    view: "HerVenture provided me with the tools to manage my business finances more effectively. The platform taught me budgeting, accounting, and resource allocation strategies that transformed how I run my business. It's a must-have for any entrepreneur looking to succeed.",
    photo: pic1,
  },
  {
    name: "Meera Sharma",
    position: "Freelance Designer",
    view: "I connected with like-minded women and secured new clients through HerVenture's networking platform. The resources on client engagement and effective marketing techniques allowed me to build a strong and consistent freelance career.",
    photo: pic2,
  },
  {
    name: "Priya Das",
    position: "Café Owner",
    view: "The training modules helped me to expand my café operations and improve customer satisfaction. I also learned innovative ways to promote my café online, resulting in increased foot traffic and glowing customer reviews.",
    photo: pic3,
  },
  {
    name: "Rina Gupta",
    position: "Boutique Owner",
    view: "HerVenture's marketing resources helped me grow my online presence and triple my online sales. I now have a robust digital storefront, and their analytics tips helped me target the right customers.",
    photo: pic4,
  },
  {
    name: "Neha Kapoor",
    position: "Tech Entrepreneur",
    view: "Thanks to HerVenture, I successfully pitched my startup and received funding from investors. The mentorship and resources prepared me with the tools and confidence needed to showcase my ideas effectively.",
    photo: pic5,
  },
  {
    name: "Sonal Verma",
    position: "Artisan",
    view: "The mentorship program provided guidance on scaling my handmade products business globally. I’ve established partnerships with international buyers, and the knowledge shared on the platform was instrumental in this growth.",
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
    <div className="testimonials-wrapper">
      <h1 className="testimonials-title">Testimonial</h1>
      <div className="testimonials-container">
        <div className="testimonial-card">
          <div className="testimonial-left">
            <img
              src={testimonials[currentIndex].photo}
              alt={testimonials[currentIndex].name}
              className="testimonial-photo"
            />
            <h2 className="testimonial-name">{testimonials[currentIndex].name}</h2>
            <h4 className="testimonial-position">{testimonials[currentIndex].position}</h4>
          </div>
          <div className="testimonial-description">
            <p>{testimonials[currentIndex].view}</p>
          </div>
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
    </div>
  );
};

export default Testimonials;
