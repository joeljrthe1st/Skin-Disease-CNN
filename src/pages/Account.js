// src/components/Account.js
import React from "react";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import './Account.css';

const Account = () => {
  const { currentUser, isEmailUser, isGoogleUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await doSignOut();
    navigate("/login");
  };

  return (
    <div className="account-container">
      <div className="account-card">
      

        {currentUser?.photoURL && (
          <div className="account-avatar">
            <img
              src={currentUser.photoURL}
              alt="Profile"
              className="account-profile-pic"
            />
          </div>
        )}

        <div className="account-info">
          <p>{currentUser?.email}</p>
          {currentUser?.displayName && (
            <p>{currentUser.displayName}</p>
          )}
          <p>
            <strong>Logged in via:</strong>{" "}
            {isGoogleUser ? "Google" : isEmailUser ? "Email/Password" : "Unknown"}
          </p>
        </div>

        <button
          className="account-signout-button"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Account;
