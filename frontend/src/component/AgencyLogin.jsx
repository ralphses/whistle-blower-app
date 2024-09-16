import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AgencyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = { email, password };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/agency/login",
        formData
      );
      if (response.status === 200) {
        // Redirect to agency dashboard on successful login
        navigate("/agencyDashboard");
      }
    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again.");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Agency Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>

      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}
