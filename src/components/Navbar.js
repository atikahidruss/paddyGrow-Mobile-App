import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBell, FaSeedling, FaThLarge } from 'react-icons/fa'; // Import icons
import '../styles/Navbar.css'; // Create a separate CSS file for styling

function Navbar() {
  return (
    <nav className="app-navbar">
      <ul className="nav-list">
        <li>
          <Link to="/" className="nav-link">
            <FaHome className="nav-icon" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/1" className="nav-link"> {/* Example with a dashboard link */}
            <FaThLarge className="nav-icon" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/plants" className="nav-link">
            <FaSeedling className="nav-icon" />
            <span>Plants</span>
          </Link>
        </li>
        <li>
          <Link to="/notifications" className="nav-link">
            <FaBell className="nav-icon" />
            <span>Notifications</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
