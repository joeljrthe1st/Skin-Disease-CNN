
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUserInjured,
  FaHistory,
  FaUserCircle,
  FaUser,
  FaInfo,
} from "react-icons/fa";
import "./Header.css";
import { useAuth } from "../contexts/authContext";

function Header() {
  const { userLoggedIn, currentUser } = useAuth();

  const displayName =
    currentUser?.displayName ||
    currentUser?.email?.split("@")[0] ||
    "User";

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="app-title">🧬 Skin Disease Detector</h1>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              className="nav-link"
              activeclassname="active-link"
              end
            >
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/patient-details"
              className="nav-link"
              activeclassname="active-link"
            >
              <FaUserInjured /> Patient Details
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className="nav-link"
              activeclassname="active-link"
            >
              <FaHistory /> History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="nav-link"
              activeclassname="active-link"
            >
              <FaInfo /> About
            </NavLink>
          </li>
        </ul>

        <div className="auth-link">
          {userLoggedIn ? (
            <NavLink
              to="/account"
              className="nav-link"
              activeclassname="active-link"
            >
              <div className="navbar-right">
  {userLoggedIn && currentUser?.photoURL ? (
    <div className="navbar-user-info">
      <img
        src={currentUser.photoURL}
        alt="Profile"
        className="navbar-profile-pic"
      />
      <span className="navbar-display-name">
        {displayName}
      </span>
    </div>
  ) : (
    <FaUserCircle className="account-icon" />
  )}
</div>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="nav-link"
              activeclassname="active-link"
            >
              <FaUser /> Login
            </NavLink>
          )}
        </div>
      </div>

     

    </nav>
  );
}

export default Header;
