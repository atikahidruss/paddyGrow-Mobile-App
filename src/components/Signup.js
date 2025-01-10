// components/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Import Firebase Auth
import '../styles/Signup.css';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Create a new user with Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to Login page after successful signup
    } catch (err) {
      setError(err.message);
    }
  };

  const goToLogin = () => {
    navigate("/");
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="app-title">PaddyGrow</h1>
        <h3 className="welcome-text">Create an Account</h3>
        {error && <p className="error-text">{error}</p>} {/* Display errors */}
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="signup-input"
            required
          />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="login-text">
          Already have an account? <button onClick={goToLogin} className="login-link">Login</button>
          </p>
      </div>
    </div>
  );
}

export default Signup;
