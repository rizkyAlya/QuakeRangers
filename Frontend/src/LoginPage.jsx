import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './LoginPage.css';
import userIcon from './assets/icons/user.svg';
import passwordIcon from './assets/icons/password.svg';
import mataTertutupIcon from './assets/icons/mata-tertutup.svg';
import mataTerbukaIcon from './assets/icons/mata-terbuka.svg';

const url = import.meta.env.VITE_BACKEND_URL;

function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false); // State untuk bubble sukses
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // Function to toggle password visibility
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!emailOrUsername || !password) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      const response = await axios.post(`${url}/auth/login`, {
        emailOrUsername,
        password,
      });

      // Simpan token dan ID pengguna
      const { token, id } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userID', id);
      setUser(id);

      if (response.status === 200) {
        setLoginSuccess(true); // Tampilkan bubble sukses
        setTimeout(() => {
          navigate('/home'); // Navigasi setelah beberapa detik
        }, 2000); // Navigasi setelah bubble tampil
      }
    } catch (error) {
      if (error.response) {
        // Tangani error spesifik berdasarkan status kode
        if (error.response.status === 401) {
          setErrorMessage('Incorrect password. Please try again.');
        } else if (error.response.status === 404) {
          setErrorMessage('Account not found. Please sign up.');
        } else if (error.response.status >= 500) {
          setErrorMessage('Server error. Please try again later.');
        } else {
          setErrorMessage('An unexpected error occurred. Please try again later.');
        }
      } else {
        setErrorMessage('No response from server. Please try again later.');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <p className="welcome-text">Welcome Back To QuakeRangers</p>
        <p className="now-here">Now here?</p>
        <div className="sign-up-container">
          <Link to="/signup">
            <button className="sign-up">SIGN UP</button>
          </Link>
        </div>
      </div>

      <div className="right-section">
        <div className="sign-in">Sign in</div>

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
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={showPassword ? mataTerbukaIcon : mataTertutupIcon}
              alt={showPassword ? "Hide Password" : "Show Password"}
              className="mata-icon"
              onClick={togglePassword}
            />
          </div>

          {/* Tampilkan pesan error di sini */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button className="sign-in-btn" onClick={handleLogin}>
            SIGN IN
          </button>
        </div>

        {/* Bubble untuk login berhasil */}
        {loginSuccess && (
          <div className="success-bubble">
            Login Successful!
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
