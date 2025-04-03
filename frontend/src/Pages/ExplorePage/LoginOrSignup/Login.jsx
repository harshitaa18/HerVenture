import { useState } from "react";
import "./Login.css";

const SignInPage = () => {
  const [role, setRole] = useState("entrepreneur");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const roles = ["entrepreneur", "skilled-labor", "land-owner", "supplier"];

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Signing in as", role, "with email:", email);
  };

  return (
    <div className="signin-container">
      <div className="auth-card">
        <h2>Sign In</h2>

        {/* Role Dropdown */}
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
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
