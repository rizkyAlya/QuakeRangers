import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './CoursesPage.css';
import logo from './assets/images/logo.png';
import groupIcon from './assets/icons/group.svg';
import homeIcon from './assets/icons/home2.svg';
import coursesIcon from './assets/icons/courses.svg';
import quizIcon from './assets/icons/quiz.svg';
import leaderboardIcon from './assets/icons/leaderboard2.svg';
import profileIcon from './assets/icons/profile2.svg';
import logoutIcon from './assets/icons/logout.svg';
import { UserContext } from './UserContext';
const url = import.meta.env.VITE_BACKEND_URL;

function CoursesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser } = useContext(UserContext); 
  const navigate = useNavigate(); 
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const response = await axios.get(`${url}/course/`);

        setCourses(response.data.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchAllCourses();
  }, []);
  
  const handleCourseClick = (id) => {
    navigate(`/course/${id}`); 
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    setUser(null); 
    navigate('/'); 
    console.log('User logged out.');
  };

  return (
    <div className="courses-page">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1>QUAKERANGERS!</h1>
        </div>
        <div className="profile-menu-courses" onClick={toggleMenu}>
          <img src={groupIcon} alt="Group" />
          {menuOpen && (
            <div className="profile-dropdown-courses">
              <Link to={`/profile/${user}`} className="profile-item-courses">
                <img src={profileIcon} alt="Profile" />
                <span>Profile</span>
              </Link>
              <div className="profile-item-courses" onClick={handleLogout}>
                <img src={logoutIcon} alt="Logout" />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="sidebar">
        <div className="menu">
          <Link to="/home">
            <div className="menu-item">
              <img src={homeIcon} alt="Home" />
              <span>Home</span>
            </div>
          </Link>
          <Link to="/courses">
            <div className="menu-item">
              <img src={coursesIcon} alt="Courses" />
              <span>Courses</span>
            </div>
          </Link>
          <Link to="/quiz">
            <div className="menu-item">
              <img src={quizIcon} alt="Quiz" />
              <span>Quiz</span>
            </div>
          </Link>
          <Link to="/leaderboard">
            <div className="menu-item">
              <img src={leaderboardIcon} alt="Leaderboard" />
              <span>Leaderboard</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="my-courses-container">
        <h2>My Courses</h2>
        <div className="courses-grid">
          {courses.map((course) => (
            <div 
              key={course._id} 
              className="course-card"
              onClick={() => handleCourseClick(course._id)} 
              style={{ cursor: "pointer" }} 
            >
              <h3>{course.title}</h3>  
              <img
                src={`${url}${course.image}`}
                alt={course.title}
                className="course-image"
              />
              <p>{course.description}</p> 
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoursesPage;
