import React, { useState, useEffect } from "react";
import "./Testimonials.css";
import pic1 from "../Assets/images.jpg";
import pic2 from "../Assets/pic2.jpeg";
import pic3 from "../Assets/pic3.jpg";
import pic4 from "../Assets/pic4.jpeg";
import pic5 from "../Assets/pic5.jpeg";
//import pic6 from ".././Assets/pic6.jpeg";
import pic6 from "../Assets/pic6.jpeg";

const testimonials = [
  {
    name: "Anita Roy",
    position: "Small Business Owner",
    view: "HerVenture helped me find a supplier and skilled help quickly. It saved me time and made running my business easier.",
    photo: pic1,
  },
  {
    name: "Meera Sharma",
    position: "Freelance Designer",
    view: "Through HerVenture, I found skilled collaborators and suppliers that matched my work style. It helped me grow my freelance career with ease.",
    photo: pic2,
  },
  {
    name: "Priya Das",
    position: "Café Owner",
    view: "HerVenture helped me find the right café space and local suppliers. Their tips boosted my service and brought in more customers.",
    photo: pic3,
  },
  {
    name: "Rina Gupta",
    position: "Boutique Owner",
    view:"HerVenture helped me boost my online presence and find the right suppliers. With their tools, my sales tripled.",
    photo: pic4,
  },
  {
    name: "Neha Kapoor",
    position: "Tech Entrepreneur",
    view: "HerVenture connected me to the right space and resources, helping me confidently pitch my startup and secure funding.",
    photo: pic5,
  },
  {
    name: "Sonal Verma",
    position: "Artisan",
    view: "HerVenture helped me scale my handmade business by connecting me to trusted suppliers and workspace. With their support, I’ve grown globally and built partnerships abroad.",
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
      <h1 className="testimonials-title">Testimonials</h1>
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
