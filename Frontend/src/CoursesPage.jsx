import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CoursesPage.css';
import logo from './assets/images/logo.png';
import groupIcon from './assets/icons/group.svg';
import homeIcon from './assets/icons/home2.svg';
import coursesIcon from './assets/icons/courses.svg';
import quizIcon from './assets/icons/quiz.svg';
import leaderboardIcon from './assets/icons/leaderboard2.svg';
import schoolImage from './assets/images/school.png';
import homeImage from './assets/images/home.png';
import forestImage from './assets/images/forest.png';
import profileIcon from './assets/icons/profile2.svg';
import logoutIcon from './assets/icons/logout.svg';

function CoursesPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="courses-page">
      {/* Header Section */}
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1>QUAKERANGERS!</h1>
        </div>
        {/* Profile Menu */}
        <div className="profile-menu" onClick={toggleMenu}>
          <img src={groupIcon} alt="Group" />
          {menuOpen && (
            <div className="profile-dropdown">
              <div className="profile-item">
                <img src={profileIcon} alt="Profile" />
                <span>Profile</span>
              <Link to="/userprofile" className="profile-item">
                <img src={profileIcon} alt="Profile" />
                <span>Profile</span>
                </Link>
              </div>
              <div className="profile-item">
                <img src={logoutIcon} alt="Logout" />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Sidebar Section */}
      <div className="sidebar">
        <div className="menu">
          <div className="menu-item">
            <img src={homeIcon} alt="Home" />
            <span>Home</span>
          </div>
          <div className="menu-item active">
            <img src={coursesIcon} alt="Courses" />
            <span>Courses</span>
          </div>
          <div className="menu-item">
            <img src={quizIcon} alt="Quiz" />
            <span>Quiz</span>
          </div>
          <div className="menu-item">
            <img src={leaderboardIcon} alt="Leaderboard" />
            <span>Leaderboard</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="my-courses-container">
        <h2>My Courses</h2>
        <div className="courses-grid">
          <div className="course-card">
            <img src={schoolImage} alt="At School" className="course-image" />
            <h3>AT SCHOOL</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.</p>
          </div>
          <div className="course-card">
            <img src={homeImage} alt="At Home" className="course-image" />
            <h3>AT HOME</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.</p>
          </div>
          <div className="course-card">
            <img src={forestImage} alt="At Forest" className="course-image" />
            <h3>AT FOREST</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesPage;
