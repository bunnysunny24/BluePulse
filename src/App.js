import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Gardewpage from "./components/GardewApp";
import AboutPage from "./components/AboutPage";
import SolutionPage from "./components/SolutionPage";
import DailyTrackPage from "./components/DailyTrackPage";
import SupportPage from "./components/SupportPage";
import Pipeline from "./components/pipelines/pipeline-1";
import Example from "./components/ReviewPage";
import SignInPage from "./components/login"; // Import SignInPage

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gardewpage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/Example" element={<Example />} />
        <Route path="/solution" element={<SolutionPage />} />
        <Route path="/dailytrack" element={<DailyTrackPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/pipeline/:id" element={<Pipeline />} />
        <Route path="/signin" element={<SignInPage />} /> 
      </Routes>
    </div>
  );
}

export default App;
