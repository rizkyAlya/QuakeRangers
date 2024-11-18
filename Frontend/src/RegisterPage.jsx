import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import userIcon from './assets/icons/user.svg';
import mailIcon from './assets/icons/mail.svg';
import passwordIcon from './assets/icons/password.svg';
import mataIcon from './assets/icons/mata.svg';
const url = import.meta.env.VITE_BACKEND_URL;

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Fungsi untuk toggle visibility password
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    if (!username || !email || !password) {
      setErrorMessage('All fields are required.');
      console.log(errorMessage);
      return; // Stop function jika ada field yang kosong
    }
    
    try {
      const response = await axios.post(`${url}/auth/register`, {
        username,
        email,
        password
      });
      
      if (response.status === 201) {
        console.log("Registration successful:", response.data);
        localStorage.setItem('token', response.data.token);
        navigate('/login'); // Navigasi ke halaman home setelah berhasil
      } else {
        console.error("Registration failed:", response.data);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
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
            <input 
              type="text" 
              placeholder="Username" 
              className="input-field" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <img src={mailIcon} alt="Email Icon" className="input-icon" />
            <input 
              type="email" 
              placeholder="Email" 
              className="input-field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <img src={passwordIcon} alt="Password Icon" className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={mataIcon}
              alt="Show Password"
              className="mata-icon"
              onClick={togglePassword}
            />
          </div>
          <button className="sign-up-btn" onClick={handleRegister}>SIGN UP</button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
