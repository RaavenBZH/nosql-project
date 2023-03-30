import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import "./assets/fonts/Formula1-Regular.ttf";
import "./assets/fonts/Formula1-Black.ttf";
import "./assets/fonts/Formula1-Bold.ttf";
import "./assets/fonts/Formula1-Wide.ttf";

import "./css/fonts.css";
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Homepage from "./components/Homepage";

import Drivers from "./components/Drivers";
import Qualifyings from "./components/Qualifyings";
import Races from "./components/Races";
import Seasons from "./components/Seasons";
import Sprints from "./components/Sprints";
import Tracks from "./components/Tracks";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/qualifyings" element={<Qualifyings />} />
        <Route path="/races" element={<Races />} />
        <Route path="/seasons" element={<Seasons />} />
        <Route path="/sprints" element={<Sprints />} />
        <Route path="/tracks" element={<Tracks />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
