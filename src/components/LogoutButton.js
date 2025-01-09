// components/LogoutButton.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebase"; // Import Firebase Auth
import "../styles/LogoutButton.css"; // Import CSS for styling

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Log out the user
      navigate("/"); // Redirect to the login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="logout-button-container">
      <FontAwesomeIcon
        icon={faSignOutAlt}
        className="logout-icon"
        onClick={handleLogout}
        title="Logout" // Tooltip on hover
      />
    </div>
  );
}

export default LogoutButton;
