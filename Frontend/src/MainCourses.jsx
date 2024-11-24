import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MainCourses.css';
import logo from './assets/images/logo.png';
import menuIcon from './assets/icons/group.svg';
import chapterIcon from './assets/icons/chapter.svg';
import backIcon from './assets/icons/back.svg';

const API_URL = import.meta.env.VITE_BACKEND_URL;

function MainCourses() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chapters, setChapters] = useState([]);
  const { id } = useParams(); // Get the course ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch course details
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${API_URL}/courses/${id}`);
        setChapters(response.data.data.content); // Assuming the content contains the chapters
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourse();
  }, [id]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleBackToCourses = () => {
    navigate('/courses');
  };

  return (
    <div className="chapter-page">
      {/* Header */}
      <header className="header-chapter">
        <div className="logo-container-chapter">
          <img src={logo} alt="Logo" className="logo-chapter" />
          <div className="header-text-chapter">QUAKERANGERS!</div>
        </div>
        <div className="profile-menu-chapter" onClick={toggleMenu}>
          <img src={menuIcon} alt="Menu Icon" />
        </div>
      </header>

      {/* Sidebar */}
      <aside className="sidebar-chapter">
        <h2>Chapters</h2>
        {chapters.map((chapter, index) => (
          <div className="chapter-item" key={index}>
            <img src={chapterIcon} alt="Chapter Icon" />
            <span>{chapter.title}</span>
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="main-content-courses">
        <button className="back-button" onClick={handleBackToCourses}>
          <img src={backIcon} alt="Back Icon" />
        </button>
        {/* Show course details here */}
      </main>
    </div>
  );
}

export default MainCourses;
