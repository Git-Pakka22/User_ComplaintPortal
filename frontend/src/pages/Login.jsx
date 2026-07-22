import { useState } from "react";
import "./../assets/login.css";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // stops the form from reloading the page
    setError("");

    if (!email || !password) {
      setError("Please enter both username and password");
      return;
    }

    setLoading(true);
    try {
      await authService.login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2 className="login-title">
          Pakka Complaint Portal
        </h2>

        {error && (
          <p style={{ color: "red", fontSize: "14px", marginBottom: "8px" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;