import React, { useState, useContext, useEffect } from 'react'; // Tambahkan useContext dan useEffect
import { Link, useNavigate } from 'react-router-dom'; // Tambahkan useNavigate
import axios from 'axios';
import './QuizPage.css';
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
import { UserContext } from './UserContext'; // Import UserContext untuk mendapatkan user
const url = import.meta.env.VITE_BACKEND_URL;

function QuizPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser } = useContext(UserContext); // Gunakan UserContext untuk mendapatkan user dan setUser
  const navigate = useNavigate(); // Gunakan untuk navigasi setelah logout
  const [quiz, setQuiz] = useState([]);

  // Mendapatkan semua course di database
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
    navigate(`/quiz/${id}`); // Beralih ke course tertentu
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Fungsi untuk Logout
  const handleLogout = () => {
    setUser(null); // Hapus data user dari UserContext
    navigate('/'); // Arahkan ke halaman login setelah logout
    console.log('User logged out.');
  };

  return (
    <div className="quiz-page">
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

      {/* Sidebar Section */}
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
          {/* Tambahkan Link ke Leaderboard */}
          <Link to="/leaderboard">
            <div className="menu-item">
              <img src={leaderboardIcon} alt="Leaderboard" />
              <span>Leaderboard</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="my-quiz-container">
        <h2>Quiz</h2>
        <div className="quiz-grid">
          {quiz.map((chapter) => (
            <div 
              key={chapter._id} 
              className="quiz-card"
              onClick={() => handleQuizClick(chapter._id)} // Event klik untuk navigasi
              style={{ cursor: "pointer" }} // Tambahkan cursor pointer untuk indikasi klik
            >
              <h3>{chapter.title}</h3> {/* Judul dipindahkan ke atas gambar */}
              <img
                src={schoolImage}
                alt={chapter.title}
                className="quiz-image"
              />
              <p>Poin: {chapter.point}</p> {/* Menambahkan keterangan 'Poin: ' */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
