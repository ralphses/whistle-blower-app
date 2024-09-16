import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AgencyForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Add navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { name, email, password };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/agency/register",
        formData
      );
      if (response.status === 201) {
        setSuccessMessage("Agency registered successfully!");
        setErrorMessage(""); // Clear error message

        // Redirect to agency dashboard after successful registration
        navigate("/agencyDashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(
          "Agency name or email already exists. Please log in instead."
        );
      } else {
        setErrorMessage("Error registering agency. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Agency Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Agency Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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

        <button type="submit">Register</button>
      </form>

      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}
