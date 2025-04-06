import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("entrepreneur");
  const roles = {
    entrepreneur: "/signup/entrepreneur",
    "skilled-labor": "/signup/skilled-labor",
    "land-owner": "/signup/landowner",
    supplier: "/signup/supplier",
  };

  const handleProceed = () => {
    navigate(roles[role]); // Navigate to the respective signup page
  };

  return (
    <div className="signup-container">
      <div className="auth-card">
        <h2>Sign Up</h2>

        {/* Role Dropdown */}
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
    </div>
  );
};

export default SignupPage;
