import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import EntrepreneurSignup from "../Entrepreneur/EntrepreneurialSignup";
import SkilledLaborSignup from "../Skilledlabour/SkilledSignup";
import LandOwnerSignup from "../Landowner/LandownerSignup";
import SupplierSignup from "../Supplier/SupplierSignup";
import "./Signup.css";

const SignupPage = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate(); // Initialize navigation
  const roles = ["entrepreneur", "skilled-labor", "land-owner", "supplier"];

  const handleToggleAuth = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="signup-container">
      <div className="auth-card">
        {!role ? (
          <div className="role-selection">
            <h2>Select Your Role</h2>
            {roles.map((r) => (
              <button key={r} className="role-button" onClick={() => setRole(r)}>
                {r.charAt(0).toUpperCase() + r.slice(1).replace("-", " ")}
              </button>
            ))}
          </div>
        ) : (
          <div className="signup-form">
            {role === "entrepreneur" && <EntrepreneurSignup />}
            {role === "skilled-labor" && <SkilledLaborSignup />}
            {role === "land-owner" && <LandOwnerSignup />}
            {role === "supplier" && <SupplierSignup />}
            <button className="change-role-button" onClick={() => setRole(null)}>
              Change Role
            </button>
          </div>
        )}
        <button className="toggle-auth-button" onClick={handleToggleAuth}>
          Switch to Sign In
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
