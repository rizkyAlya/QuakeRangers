import React from 'react';
import './LandingPage.css';
import contactIcon from './assets/icons/contact-multiple.svg';
import mailIcon from './assets/icons/mail-multiple.svg';
import mapIcon from './assets/icons/map.svg';
import logoImage from './assets/images/logo.png';
import heroImage from './assets/images/image.png';

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Header dengan Logo dan Background */}
      <div className="header">
        <img src={logoImage} alt="Logo" className="logo" />
        <div className="header-text">QUAKERANGERS!</div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <div className="text-section">
          <h1 className="welcome-text">Hello, Welcome!</h1>
          <p className="description">
            Quakerangers is an interactive educational platform that teaches kids about earthquake preparedness through quizzes, games, and engaging content.
          </p>
          <p className="call-to-action">
            JOIN US AND BECOME A HERO READY TO FACE ANY DISASTER!
          </p>
          <div className="buttons">
            <button className="register-button">Register</button>
            <button className="login-button">Login</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="ellipse-background">
            <img src={heroImage} alt="Hero" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="contact-section">
          <div className="contact-item">
            <img src={contactIcon} className="icon" alt="Contact Icon" />
            <span>(+62) 85260897437</span>
          </div>
          <div className="contact-item">
            <img src={mailIcon} className="icon" alt="Mail Icon" />
            <span>aliyah.rizky@ui.ac.id</span>
          </div>
          <div className="contact-item">
            <img src={mapIcon} className="icon" alt="Map Icon" />
            <span>University of Indonesia, Depok</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
