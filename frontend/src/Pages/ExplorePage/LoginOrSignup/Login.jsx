import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import { useUser } from "../../../Context/UserContext";

const SignInPage = () => {
  const [role, setRole] = useState("entrepreneur");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const roles = ["entrepreneur", "labor", "landowner", "supplier"];

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });

      const { token, user } = res.data;

      if (user.role !== role) {
        return alert("Selected role does not match with user role!");
      }

      localStorage.setItem("token", token);
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
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
