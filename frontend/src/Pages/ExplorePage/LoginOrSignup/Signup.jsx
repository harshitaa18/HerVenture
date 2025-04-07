import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import poster2 from "../../../Components/Assets/poster2.jpg";
import poster1 from "../../../Components/Assets/poster1.avif";

const slides = [
  { type: "quote", content: "Where ambition meets opportunity — a platform built by and for visionary women 🌱" },
  { type: "stat", content: "Together, we’re not just building businesses — we’re building a future that reflects us" },
  { type: "image", content: poster1 },
  { type: "quote", content: "HerVenture: Where skilled minds, bold hearts, and big dreams come together to build legacies." },
  { type: "image", content: poster2 },
];

const SignupPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("entrepreneur");
  const [currentSlide, setCurrentSlide] = useState(0);

  const roles = {
    entrepreneur: "/signup/entrepreneur",
    labor: "/signup/skilled-labor",
    landowner: "/signup/landowner",
    supplier: "/signup/supplier",
  };

  const handleProceed = () => {
    navigate(roles[role]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="signup-main-container">
      <div className="signup-elevated-box">
        {/* Left Half */}
        <div className="signup-left">
          <h2>Sign Up</h2>
          <select
            className="role-dropdown"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {Object.keys(roles).map((r) => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1).replace("-", " ")}
              </option>
            ))}
          </select>
          <button className="proceed-button" onClick={handleProceed}>
            Proceed to Sign Up
          </button>
          <button className="toggle-auth-button" onClick={() => navigate("/login")}>
            Switch to Sign In
          </button>
        </div>

        {/* Right Half */}
        <div className="signup-right">
          <div className="slide-content">
            {slides[currentSlide].type === "image" ? (
              <img src={slides[currentSlide].content} alt="slide" className="slide-image" />
            ) : (
              <p className="slide-text">{slides[currentSlide].content}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
