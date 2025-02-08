import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Gardewpage from "./components/GardewApp";
import AboutPage from "./components/AboutPage";
import ReviewPage from "./components/ReviewPage";
import SolutionPage from "./components/SolutionPage";
import DailyTrackPage from "./components/DailyTrackPage";
import SupportPage from "./components/SupportPage";
import Pipeline1 from "./components/pipelines/pipeline-1";
import Pipeline2 from "./components/pipelines/pipeline-2";
import Pipeline3 from "./components/pipelines/pipeline-3";
import Pipeline4 from "./components/pipelines/pipeline-4";
import Pipeline5 from "./components/pipelines/pipeline-5";
import Pipeline6 from "./components/pipelines/pipeline-6";
import Pipeline7 from "./components/pipelines/pipeline-7";
import Pipeline8 from "./components/pipelines/pipeline-8";
import Pipeline9 from "./components/pipelines/pipeline-9";
import Pipeline10 from "./components/pipelines/pipeline-10";
import Pipeline11 from "./components/pipelines/pipeline-11";
import Pipeline12 from "./components/pipelines/pipeline-12";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gardewpage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/solution" element={<SolutionPage />} />
        <Route path="/dailytrack" element={<DailyTrackPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/pipeline/1" element={<Pipeline1 />} />
        <Route path="/pipeline/2" element={<Pipeline2 />} />
        <Route path="/pipeline/3" element={<Pipeline3 />} />
        <Route path="/pipeline/4" element={<Pipeline4 />} />
        <Route path="/pipeline/5" element={<Pipeline5 />} />
        <Route path="/pipeline/6" element={<Pipeline6 />} />
        <Route path="/pipeline/7" element={<Pipeline7 />} />
        <Route path="/pipeline/8" element={<Pipeline8 />} />
        <Route path="/pipeline/9" element={<Pipeline9 />} />
        <Route path="/pipeline/10" element={<Pipeline10 />} />
        <Route path="/pipeline/11" element={<Pipeline11 />} />
        <Route path="/pipeline/12" element={<Pipeline12 />} />
      </Routes>
    </div>
  );
}

export default App;