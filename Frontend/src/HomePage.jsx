import React, { useState, useContext, useEffect } from 'react'; // Import useState dan useContext
import { Link } from 'react-router-dom'; // Import Link dari React Router
import { UserContext } from './UserContext';
import './HomePage.css';
import grassImage from './assets/images/rumput.png';
import treeImage1 from './assets/images/pohon1.png';
import treeImage2 from './assets/images/pohon2.png';
import boyImage from './assets/images/boy.png';
import girlImage from './assets/images/girl.png';
import homeIcon from './assets/icons/home.svg';
import profileIcon from './assets/icons/profile.svg';

function HomePage() {
  const { user } = useContext(UserContext);
  const [activeButton, setActiveButton] = useState(null); // State untuk mengelola tombol yang aktif

  useEffect(() => {
    if (user && user.id) {
      // Logic untuk user jika diperlukan
    }
  }, [user]);

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
        {/* Tambahkan Link ke Leaderboard */}
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
        <button
          className={`icon-button home-button ${activeButton === 'home' ? 'active' : ''}`}
          onClick={() => setActiveButton('home')}
        >
          <img src={homeIcon} alt="Home" className="icon" />
        </button>
        <Link to={`/profile/${user}`}>
          <button
            className={`icon-button profile-button ${activeButton === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveButton('profile')}
          >
            <img src={profileIcon} alt="Profile" className="icon" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
