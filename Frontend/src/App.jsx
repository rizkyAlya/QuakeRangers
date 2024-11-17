import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from "./UserContext";
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
    <UserProvider>
      <Router>
        <Main />
      </Router>
    </UserProvider>  
>>>>>>> 6b1a3f7d420b49df360df3a7
  );
}

export default App;

