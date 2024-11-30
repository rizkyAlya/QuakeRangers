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
import Chap1Ending from "./Quiz/chapter1/chapter1-ending";
import Chapter2 from "./Quiz/chapter2/chapter2";
import Chap2Scene1 from "./Quiz/chapter2/chapter2-scene1";
import Chap2Scene2 from "./Quiz/chapter2/chapter2-scene2";
import Chap2Scene3 from "./Quiz/chapter2/chapter2-scene3";
import Chap2Ending from "./Quiz/chapter2/chapter2-ending";
import Chapter3 from "./Quiz/chapter3/chapter3";
import Chap3Success from "./Quiz/chapter3/chapter3-ending-success";
import Chap3Fail from "./Quiz/chapter3/chapter3-ending-fail";
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
      <Route path="/quiz/67474e68f8b29b91943e9105/:id" element={<Chapter1 />} />
      <Route path="/quiz/67474e68f8b29b91943e9105/:id/scene1" element={<Chap1Scene1 />} />
      <Route path="/quiz/67474e68f8b29b91943e9105/:id/scene2" element={<Chap1Scene2 />} />
      <Route path="/quiz/67474e68f8b29b91943e9105/:id/scene3" element={<Chap1Scene3 />} />
      <Route path="/quiz/67474e68f8b29b91943e9105/:id/scene4" element={<Chap1Scene4 />} />
      <Route path="/quiz/67474e68f8b29b91943e9105/:id/ending" element={<Chap1Ending />} />
      <Route path="/quiz/67474e8cf8b29b91943e9107/:id" element={<Chapter2 />} />
      <Route path="/quiz/67474e8cf8b29b91943e9107/:id/scene1" element={<Chap2Scene1 />} />
      <Route path="/quiz/67474e8cf8b29b91943e9107/:id/scene2" element={<Chap2Scene2 />} />
      <Route path="/quiz/67474e8cf8b29b91943e9107/:id/scene3" element={<Chap2Scene3 />} />
      <Route path="/quiz/67474e8cf8b29b91943e9107/:id/ending" element={<Chap2Ending />} />
      <Route path="/quiz/674abb8d3771c421e3a88b3d/:id" element={<Chapter3 />} />
      <Route path="/quiz/674abb8d3771c421e3a88b3d/:id/success" element={<Chap3Success />} />
      <Route path="/quiz/674abb8d3771c421e3a88b3d/:id/fail" element={<Chap3Fail />} />
      <Route path="/profile/:userID" element={<ProfilePage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
    </Routes>
  );
};

export default App;
