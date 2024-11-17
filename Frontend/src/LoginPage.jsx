import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './LoginPage.css';
import userIcon from './assets/icons/user.svg';
import passwordIcon from './assets/icons/password.svg';
import mataIcon from './assets/icons/mata.svg';
const url = import.meta.env.VITE_BACKEND_URL;

function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // Function to toggle password visibility
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!emailOrUsername || !password) {
      setErrorMessage('All fields are required.');
      console.log(errorMessage);
      return; // Stop function jika ada field yang kosong
    }

    try {
      const response = await axios.post(`${url}/auth/login`, {
        emailOrUsername,
        password
      });
      const { token, id } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userID', id);

      setUser(id);

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        navigate('/home');
      } else {
        console.log("Login failed:", response.data);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }
  return (
    <div className="login-page">
      {/* Left Section */}
      <div className="left-section">
        <p className="welcome-text">Welcome Back To QuakeRangers</p>
        <p className="now-here">Now here?</p>
        <div className="sign-up-container">
          <Link to="/signup">
            <button className="sign-up">SIGN UP</button>
          </Link>
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
            <input 
            type="text" 
            placeholder="Username or Email" 
            className="input-field" 
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <img src={passwordIcon} alt="Password Icon" className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}  // Toggle type based on showPassword state
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={mataIcon}
              alt="Show Password"
              className="mata-icon"
              onClick={togglePassword}  // Handle click to toggle password visibility
            />
          </div>
          <button className="sign-in-btn" onClick={handleLogin}>SIGN IN</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
