import { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import { useUser } from "../../../Context/UserContext";
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

const SignInPage = () => {
  const [role, setRole] = useState("entrepreneur");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const roles = ["entrepreneur", "labor", "landowner", "supplier"];

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
  
      const { token, user } = res.data;
  
      if (user.role !== role) {
        return alert("Selected role does not match with user role!");
      }
  
      // ✅ Save token and user to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
  
      // ✅ Set user in context
      setUser(user);
  
      navigate("/profile");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Login failed.");
    }
  };
  

  return (
    <div className="signin-container">
      <div className="auth-card">
        {/* Left Section */}
        <div className="auth-left">
          <h2>Sign In</h2>

          <select
            className="role-dropdown"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1).replace("-", " ")}
              </option>
            ))}
          </select>

          <form onSubmit={handleSignIn}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="proceed-button">
              Sign In
            </button>
            <button type="button" className="toggle-auth-button" onClick={() => navigate("/signup")}>
              Switch to Signup
            </button>
          </form>
        </div>

        {/* Right Section with Slideshow */}
        <div className="auth-right">
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

export default SignInPage;
