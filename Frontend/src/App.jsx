import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
import LandingPage from "./LandingPage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import CoursesPage from "./CoursesPage";
import MainCourses from "./MainCourses";
import QuizPage from "./QuizPage";
import Chapter1 from "./Quiz/chapter1/chapter1";
import Chap1Scene1 from "./Quiz/chapter1/chapter1-scene1";
import Chap1Scene2 from "./Quiz/chapter1/chapter1-scene2";
import Chap1Scene3 from "./Quiz/chapter1/chapter1-scene3";
import Chap1Scene4 from "./Quiz/chapter1/chapter1-scene4";
import ProfilePage from "./UserProfile";
import LeaderboardPage from "./LeaderboardPage";

function App() {
  return (
    <UserProvider>
      <Router>
        <Main />
      </Router>
    </UserProvider>
  );
}

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/course/:id" element={<MainCourses />} /> 
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/quiz/:id" element={<Chapter1 />} />
      <Route path="/quiz/:id/scene1" element={<Chap1Scene1 />} />
      <Route path="/quiz/:id/scene2" element={<Chap1Scene2 />} />
      <Route path="/quiz/:id/scene3" element={<Chap1Scene3 />} />
      <Route path="/quiz/:id/scene4" element={<Chap1Scene4 />} />
      <Route path="/profile/:userID" element={<ProfilePage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
    </Routes>
  );
};

export default App;
