import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import poster1 from "../../../Components/Assets/poster1.avif";
import poster2 from "../../../Components/Assets/poster2.jpg";
import poster5 from "../../../Components/Assets/poster5.jpg";
import poster4 from "../../../Components/Assets/poster4.jpg";

const slides = [
  { type: "image", content: poster1 },
  { type: "image", content: poster5 },
  { type: "image", content: poster2 },
  {type: "image", content: poster4 },
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
