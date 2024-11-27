import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LeaderboardPage.css';
import logo from './assets/images/logo.png';
import groupIcon from './assets/icons/group.svg';
import rank1 from './assets/images/rank1.png';
import rank2 from './assets/images/rank2.png';
import rank3 from './assets/images/rank3.png';
import homeIcon from './assets/icons/home2.svg';
import profileIcon from './assets/icons/profile2.svg';
import logoutIcon from './assets/icons/logout.svg';
import { UserContext } from './UserContext';

const url = import.meta.env.VITE_BACKEND_URL;

function LeaderboardPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Toggle dropdown menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle Logout
  const handleLogout = () => {
    setUser(null); // Hapus data user dari context
    navigate('/'); // Redirect ke halaman login
    console.log('User logged out.');
  };

  useEffect(() => {
    // Fetch leaderboard data
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${url}/leaderboard`);
        setLeaderboardData(response.data.data); // Ambil data leaderboard dari backend
      } catch (err) {
        console.error('Error fetching leaderboard data:', err);
        setError('Failed to fetch leaderboard. Please try again.');
      }
    };

    fetchLeaderboard();
  }, []);

  useEffect(() => {
    if (user) {
      console.log('Current user:', user);
    } else {
      console.log('User not found. Please login.');
    }
  }, [user]);

  return (
    <div className="leaderboard-page">
      {/* Header Section */}
      <header className="header-leaderboard">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1>QUAKERANGERS!</h1>
        </div>
        <div className="profile-menu-leaderboard" onClick={toggleMenu}>
          <img src={groupIcon} alt="Menu Icon" />
          {menuOpen && (
            <div className="profile-dropdown-leaderboard">
              {/* Navigasi ke Home */}
              <Link to="/home" className="profile-item">
                <img src={homeIcon} alt="Home Icon" className="dropdown-icon" />
                Home
              </Link>
              {/* Navigasi ke User Profile */}
              {user && (
                <Link to={`/profile/${user}`} className="profile-item">
                  <img src={profileIcon} alt="Profile Icon" className="dropdown-icon" />
                  Profile
                </Link>
              )}
              {/* Logout */}
              <div className="profile-item" onClick={handleLogout}>
                <img src={logoutIcon} alt="Logout Icon" className="dropdown-icon" />
                Logout
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content-leaderboard">
        <h2 className="leaderboard-title">Leaderboard</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="rankings">
          {/* Rank 2 */}
          {leaderboardData[1] && (
            <div className="ranking rank-2">
              <div className="ranking-ellipse">
                <img 
                  src={leaderboardData[1].profile ? `${url}${leaderboardData[1].profile}` : rank2}
                  alt="Rank 2 Profile"
                  className="ranking-profile-image"
                />
              </div>
              <img src={rank2} alt="Rank 2" className="ranking-image" />
              <div className="ranking-name">{leaderboardData[1].username || 'Unknown'}</div>
              <div className="ranking-points">{leaderboardData[1].score}</div>
            </div>
          )}

          {/* Rank 1 */}
          {leaderboardData[0] && (
            <div className="ranking rank-1">
              <div className="ranking-ellipse">
                <img
                  src={`${url}${leaderboardData[0].profile}` || rank1}
                  alt="Rank 1 Profile"
                  className="ranking-profile-image"
                />
              </div>
              <img src={rank1} alt="Rank 1" className="ranking-image" />
              <div className="ranking-name">{leaderboardData[0].username || 'Unknown'}</div>
              <div className="ranking-points">{leaderboardData[0].score}</div>
            </div>
          )}

          {/* Rank 3 */}
          {leaderboardData[2] && (
            <div className="ranking rank-3">
              <div className="ranking-ellipse">
                <img
                  src={leaderboardData[2].profile ? `${url}${leaderboardData[2].profile}` : rank3}
                  alt="Rank 3 Profile"
                  className="ranking-profile-image"
                />
              </div>
              <img src={rank3} alt="Rank 3" className="ranking-image" />
              <div className="ranking-name">{leaderboardData[2].username || 'Unknown'}</div>
              <div className="ranking-points">{leaderboardData[2].score}</div>
            </div>
          )}
        </div>

        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Ranking</th>
              <th>Username</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.slice(3).map((player, index) => (
              <tr key={player._id}>
                <td>{index + 4}</td>
                <td>{player.username || 'Unknown'}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default LeaderboardPage;
