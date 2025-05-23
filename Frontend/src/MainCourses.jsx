import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './MainCourses.css';
import logo from './assets/images/logo.png';
import groupIcon from './assets/icons/group.svg';
import chapterIcon from './assets/icons/chapter.svg';
import backIcon from './assets/icons/back.svg';
import homeIcon from './assets/icons/home2.svg';
import profileIcon from './assets/icons/profile2.svg';
import logoutIcon from './assets/icons/logout.svg';
import { UserContext } from './UserContext';

const url = import.meta.env.VITE_BACKEND_URL;

function MainCourses() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [course, setCourse] = useState({});
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [videoUrl, setVideoUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${url}/course/${id}`);
        const courseData = response.data.data;
        console.log('Fetched Course Data:', courseData); // Debugging log
        setCourse(courseData);

        // Gunakan langsung video URL dari backend tanpa parsing tambahan
        if (courseData.video) {
          setVideoUrl(courseData.video);
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
    fetchCourse();
  }, [id]);

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
    console.log('User logged out.');
  };

  return (
    <div className="chapter-page">
      <header className="header-chapter">
        <div className="logo-container-chapter">
          <img src={logo} alt="Logo" className="logo-chapter" />
          <div className="header-text-chapter">QUAKERANGERS!</div>
        </div>
        <div className="profile-menu-chapter">
          <img
            src={groupIcon}
            alt="Group Icon"
            className="menu-icon"
            onClick={toggleMenu}
          />
        </div>
      </header>

      {menuOpen && (
        <div className="profile-dropdown-chapter">
          <Link to="/home" className="profile-item">
            <img src={homeIcon} alt="Home Icon" className="dropdown-icon" />
            Home
          </Link>
          {user && (
            <Link to={`/profile/${user}`} className="profile-item">
              <img src={profileIcon} alt="Profile Icon" className="dropdown-icon" />
              Profile
            </Link>
          )}
          <div className="profile-item" onClick={handleLogout}>
            <img src={logoutIcon} alt="Logout Icon" className="dropdown-icon" />
            Logout
          </div>
        </div>
      )}

      <aside className="sidebar-chapter">
        <h2>Chapters</h2>
        {courses.map((course) => (
          <div
            className="chapter-item"
            key={course._id}
            onClick={() => navigate(`/course/${course._id}`)}
          >
            <img src={chapterIcon} alt="Chapter Icon" />
            <span>{course.title}</span>
          </div>
        ))}
      </aside>

      <main className="main-content-courses">
        <button className="back-button" onClick={() => navigate('/courses')}>
          <img src={backIcon} alt="Back Icon" />
        </button>
        <div className="video-reference-text">Video Reference:</div>
        {videoUrl ? (
          <div className="video-container">
            <iframe
              width="100%"
              height="400"
              src={videoUrl} // Gunakan embed URL langsung
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Course Video"
            />
          </div>
        ) : (
          <div className="no-video-message">No video available for this course.</div>
        )}
        <ReactMarkdown>{course.content || 'No Content Available'}</ReactMarkdown>
      </main>
    </div>
  );
}

export default MainCourses;
