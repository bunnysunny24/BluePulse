import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Gardewpage from "./components/GardewApp";
import AboutPage from "./components/AboutPage";
import ReviewPage from "./components/ReviewPage";
import SolutionPage from "./components/SolutionPage";
import DailyTrackPage from "./components/DailyTrackPage";
import SupportPage from "./components/SupportPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gardewpage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/solution" element={<SolutionPage />} />
        <Route path="/dailytrack" element={<DailyTrackPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Routes>
    </div>
  );
}

export default App;
