import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from "./UserContext";
import LandingPage from "./LandingPage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import CoursesPage from "./CoursesPage";
import QuizPage from "./QuizPage";
import ProfilePage from "./UserProfile";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Main />
      </Router>
    </UserProvider>  
  );
};

const Main = () => {
  return(
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="/profile/:userID" element={<ProfilePage />} />
    </Routes>
  );
};

export default App;
