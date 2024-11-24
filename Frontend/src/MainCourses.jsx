import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MainCourses.css';
import logo from './assets/images/logo.png';
import menuIcon from './assets/icons/group.svg';
import chapterIcon from './assets/icons/chapter.svg';
import backIcon from './assets/icons/back.svg';
const url = import.meta.env.VITE_BACKEND_URL;

function MainCourses() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chapters, setChapters] = useState([]);
  const { id } = useParams(); // Get the course ID from the URL
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // Untuk ambil detail dari salah satu course
  useEffect(() => {
    // Fetch course details
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${url}/course/${id}`);
        setChapters(response.data.data); // Assuming the content contains the chapters
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourse();
  }, [id]);

  // Untuk ambil semua course dan ditampilkan di sidebar
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
    navigate(`/course/${id}`); // Beralih ke course lain
  };

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
        {courses.map((course) => (
          <div className="chapter-item" key={course._id} onClick={() => handleCourseClick(course._id)}>
            <img src={chapterIcon} alt="Chapter Icon" />
            <span>{course.title}</span>
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="main-content-courses">
        <button className="back-button" onClick={handleBackToCourses}>
          <img src={backIcon} alt="Back Icon" />
        </button>
        {/* Tolong dikasih style */}
        <h3>{chapters.title}</h3>
        <p>{chapters.content}</p>
      </main>
    </div>
  );
}

export default MainCourses;
