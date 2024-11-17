import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./LandingPage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import CoursesPage from "./CoursesPage";
import QuizPage from "./QuizPage";
import UserProfile from "./UserProfile";

function App() {
  return (
    <div>
      <UserProfile />
    </div>
  );
}

export default App;

