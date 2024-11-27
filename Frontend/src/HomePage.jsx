import React, { useState, useContext, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { UserContext } from './UserContext'; 
import './HomePage.css'; 
import grassImage from './assets/images/rumput.png'; 
import treeImage1 from './assets/images/pohon1.png'; 
import treeImage2 from './assets/images/pohon2.png'; 
import boyImage from './assets/images/boy.png'; 
import girlImage from './assets/images/girl.png'; 
import profileIcon from './assets/icons/profile.svg'; 
import logoutIcon from './assets/icons/logout.svg';

function HomePage() {
  const { user, setUser } = useContext(UserContext); 
  const [activeButton, setActiveButton] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (user && user.id) {
      // Logic untuk user jika diperlukan
    }
  }, [user]);

  // Fungsi untuk logout
  const handleLogout = () => {
    setUser(null); // Hapus data user dari UserContext
    navigate('/'); // Arahkan ke halaman login setelah logout
    console.log('User logged out.');
  };

  return (
    <div className="home-page">
      <img src={grassImage} alt="Grass" className="grass" />
      <img src={treeImage1} alt="Tree" className="tree tree1" />
      <img src={treeImage2} alt="Tree" className="tree tree2" />
      <h1 className="title">QUAKERANGERS!</h1>
      <div className="character">
        <img src={girlImage} alt="Girl" className="girl" />
        <img src={boyImage} alt="Boy" className="boy" />
      </div>
      <div className="buttons">
        <Link to="/courses" className="btn-link">
          <button
            className={`btn ${activeButton === 'learn' ? 'active' : ''}`}
            onClick={() => setActiveButton('learn')}
          >
            Learn
          </button>
        </Link>
        <Link to="/quiz" className="btn-link">
          <button
            className={`btn ${activeButton === 'quiz' ? 'active' : ''}`}
            onClick={() => setActiveButton('quiz')}
          >
            Quiz
          </button>
        </Link>
        <Link to="/leaderboard" className="btn-link">
          <button
            className={`btn ${activeButton === 'leaderboard' ? 'active' : ''}`}
            onClick={() => setActiveButton('leaderboard')}
          >
            Leaderboard
          </button>
        </Link>
      </div>
      <p className="play-text">LET'S PLAY!</p>
      <div className="icons">
        {/* Profile Icon */}
        <Link to={`/profile/${user}`}>
          <button
            className={`icon-button profile-button ${activeButton === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveButton('profile')}
          >
            <img src={profileIcon} alt="Profile" className="icon" />
          </button>
        </Link>

        {/* Logout Icon */}
        <button
          className={`icon-button logout-button ${activeButton === 'logout' ? 'active' : ''}`}
          onClick={handleLogout} 
        >
          <img src={logoutIcon} alt="Logout" className="icon" />
        </button>
      </div>
    </div>
  );
}

export default HomePage;
