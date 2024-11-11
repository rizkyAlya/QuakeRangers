import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.css';
import registerCharacter from './assets/images/registercharacter.png';
import userIcon from './assets/icons/user.svg';
import mailIcon from './assets/icons/mail.svg';
import passwordIcon from './assets/icons/password.svg';
import calendarIcon from './assets/icons/calendar.svg';
import mataIcon from './assets/icons/mata.svg';

function RegisterPage() {
  // State untuk toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Fungsi untuk toggle visibility password
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-page">
      {/* Left Section */}
      <div className="left-section">
        <p className="welcome-text">Welcome to QuakeRangers</p>
        <p className="already-have-account">Already have an account?</p>
        <div className="sign-in-container">
        <Link to="/login">
            <button className="sign-in">SIGN IN</button>
        </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="create-account">
          Create Account
        </div>

        <div className="form">
          <div className="input-group">
            <img src={userIcon} alt="Username Icon" className="input-icon" />
            <input type="text" placeholder="Username" className="input-field" />
          </div>
          <div className="input-group">
            <img src={mailIcon} alt="Email Icon" className="input-icon" />
            <input type="email" placeholder="Email" className="input-field" />
          </div>
          <div className="input-group">
            <img src={passwordIcon} alt="Password Icon" className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}  // Toggle type based on showPassword state
              placeholder="Password"
              className="input-field"
            />
            <img
              src={mataIcon}
              alt="Show Password"
              className="mata-icon"
              onClick={togglePassword}  // Handle click to toggle password visibility
            />
          </div>
          <div className="input-group">
            <img src={calendarIcon} alt="Birthday Icon" className="input-icon" />
            <input
              type="text"
              placeholder="Birthday"
              className="input-field"
              onFocus={(e) => e.target.type = 'date'} // Change to date type when clicked
              onBlur={(e) => e.target.type = 'text'} // Change back to text when focus is lost
            />
          </div>
          <Link to="/home">
          <button className="sign-up-btn">SIGN UP</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
