import { useState } from "react";
import SignInPage from "./Login";
import EntrepreneurSignup from "../Entrepreneur/EntrepreneurialSignup";
import SkilledLaborSignup from "../Skilledlabour/SkilledSignup";
import LandOwnerSignup from "../Landowner/LandownerSignup";
import SupplierSignup from "../Supplier/SupplierSignup";
import "./Signup.css";

const SignupPage = () => {
  const [role, setRole] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const roles = ["entrepreneur", "skilled-labor", "land-owner", "supplier"];

  return (
    <div className="signup-container">
      <div className="auth-card">
        {!isSignUp ? (
          <SignInPage />
        ) : !role ? (
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
        <button className="toggle-auth-button" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
