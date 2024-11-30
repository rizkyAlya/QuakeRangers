import React, { useState, useContext, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './QuizPage.css';
import logo from './assets/images/logo.png';
import groupIcon from './assets/icons/group.svg';
import homeIcon from './assets/icons/home2.svg';
import coursesIcon from './assets/icons/courses.svg';
import quizIcon from './assets/icons/quiz.svg';
import leaderboardIcon from './assets/icons/leaderboard2.svg';
import schoolImage from './assets/images/school.png';
import profileIcon from './assets/icons/profile2.svg';
import logoutIcon from './assets/icons/logout.svg';
import { UserContext } from './UserContext'; 
const url = import.meta.env.VITE_BACKEND_URL;

function QuizPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate(); 
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    const fetchAllQuiz = async () => {
      try {
        const response = await axios.get(`${url}/quiz/`);
        setQuiz(response.data.data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchAllQuiz();
  }, []);

  const handleQuizClick = (id) => {
    navigate(`/quiz/${id}/${id}`); 
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
    <div className="quiz-page">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1>QUAKERANGERS!</h1>
        </div>
        <div className="profile-menu" onClick={toggleMenu}>
          <img src={groupIcon} alt="Group" />
          {menuOpen && (
            <div className="profile-dropdown">
              <Link to={`/profile/${user}`} className="profile-item">
                <img src={profileIcon} alt="Profile" />
                <span>Profile</span>
              </Link>
              <div className="profile-item" onClick={handleLogout}>
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

      <div className="my-quiz-container">
        <h2>Quiz</h2>
        <div className="quiz-grid">
          {quiz.map((chapter) => (
            <div 
              key={chapter._id} 
              className="quiz-card"
              onClick={() => handleQuizClick(chapter._id)} 
              style={{ cursor: "pointer" }} 
            >
              <h3>{chapter.title}</h3> 
              <img
                src={schoolImage}
                alt={chapter.title}
                className="quiz-image"
              />
              <p>Poin: {chapter.point}</p> 
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
