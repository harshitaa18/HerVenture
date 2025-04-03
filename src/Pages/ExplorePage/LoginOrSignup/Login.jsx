import { useState } from "react";
import "./Login.css";

const SignInPage = () => {
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const roles = ["landowner", "skilled-labour", "entrepreneur", "supplier"];

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Signing in as", role, "with email:", email);
  };

  return (
    <div className="signin-container">
        {!role ? (
          <div className="role-selection">
            <h2>Select Your Role</h2>
            {roles.map((r) => (
              <button key={r} className="role-button" onClick={() => setRole(r)}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        ) : (
          <div className="signin-form">
            <h2>Sign In as {role}</h2>
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
              <button type="submit" className="signin-button">Sign In</button>
            </form>
            <button className="change-role-button" onClick={() => setRole(null)}>
              Change Role
            </button>
          </div>
        )}
    </div>
  );
};

export default SignInPage;
