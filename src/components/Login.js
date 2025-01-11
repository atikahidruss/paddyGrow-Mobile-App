// components/Login.js
import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Import Firebase Auth
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Authenticate user with Firebase
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Redirect to Home upon successful login
    } catch (err) {
      console.error("Login error:", err.message); // Log detailed error message
  
      // Handle specific error codes
      switch (err.code) {
        case "auth/user-not-found":
          setError("No account found with this email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          setError("Invalid email format.");
          break;
        case "auth/too-many-requests":
          setError("Too many login attempts. Please try again later.");
          break;
        default:
          setError(err.message);
      }
    }
  };  

  const goToSignup = () => {
    navigate("/signup");
  };
  
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="app-title">PaddyGrow</h1>
        <h3 className="welcome-text">Welcome Back</h3>
        {error && <p className="error-text">{error}</p>} {/* Display error */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="signup-text">
          Don’t have an account?  <button onClick={goToSignup} className="signup-link">
      Sign Up
    </button>
    </p>
      </div>
    </div>
  );
}

export default Login;
