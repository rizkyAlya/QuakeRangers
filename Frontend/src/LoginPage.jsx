import React, { useState } from 'react';
import './LoginPage.css';
import registerCharacter from './assets/images/registercharacter.png';
import userIcon from './assets/icons/user.svg';
import passwordIcon from './assets/icons/password.svg';
import mataIcon from './assets/icons/mata.svg';

function LoginPage() {
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      {/* Left Section */}
      <div className="left-section">
        <p className="welcome-text">Welcome Back To QuakeRangers</p>
        <p className="now-here">Now here?</p>
        <div className="sign-up-container">
          <button className="sign-up">SIGN UP</button>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="sign-in">
          Sign in
        </div>

        <div className="form">
          <div className="input-group">
            <img src={userIcon} alt="Username or Email Icon" className="input-icon" />
            <input type="text" placeholder="Username or Email" className="input-field" />
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
          <button className="sign-in-btn">SIGN IN</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
