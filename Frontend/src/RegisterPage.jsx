import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import userIcon from './assets/icons/user.svg';
import mailIcon from './assets/icons/mail.svg';
import passwordIcon from './assets/icons/password.svg';
import mataTertutupIcon from './assets/icons/mata-tertutup.svg';
import mataTerbukaIcon from './assets/icons/mata-terbuka.svg';

const url = import.meta.env.VITE_BACKEND_URL;

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const navigate = useNavigate();
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    if (!username || !email || !password) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      const response = await axios.post(`${url}/auth/register`, {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        setRegisterSuccess(true); 
        setTimeout(() => {
          navigate('/login'); 
        }, 2000); 
      }
    } catch (error) {
      console.error('Error during registration:', error);
      if (error.response) {
        const apiMessage = error.response.data?.message || 'An unexpected error occurred.';
        setErrorMessage(apiMessage);
      } else {
        setErrorMessage('No response from server. Please try again later.');
      }
    }
  };

  return (
    <div className="register-page">
      <div className="left-section">
        <p className="welcome-text-register">Welcome to QuakeRangers</p>
        <p className="already-have-account">Already have an account?</p>
        <div className="sign-in-container">
          <Link to="/login">
            <button className="sign-in-register">SIGN IN</button>
          </Link>
        </div>
      </div>

      <div className="right-section">
        <div className="create-account">Create Account</div>

        <div className="form-register">
          <div className="input-group-register">
            <img src={userIcon} alt="Username Icon" className="input-icon" />
            <input
              type="text"
              placeholder="Username"
              className="input-field-register"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group-register">
            <img src={mailIcon} alt="Email Icon" className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              className="input-field-register"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group-register">
            <img src={passwordIcon} alt="Password Icon" className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="input-field-register"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={showPassword ? mataTerbukaIcon : mataTertutupIcon}
              alt={showPassword ? 'Hide Password' : 'Show Password'}
              className="mata-icon"
              onClick={togglePassword}
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button className="sign-up-btn" onClick={handleRegister}>
            SIGN UP
          </button>
        </div>
      </div>
      {registerSuccess && (
        <div className="success-bubble">
          Register Successful!
        </div>
      )}
    </div>
  );
}

export default RegisterPage;
