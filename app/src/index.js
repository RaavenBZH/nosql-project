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

import Homepage from "./components/Homepage";

import Drivers from "./components/Drivers";
import DriversForm from "./components/DriversForm";

import Qualifyings from "./components/Qualifyings";
import QualifyingsForm from "./components/QualifyingsForm";

import Races from "./components/Races";
import RacesForm from "./components/RacesForm";

import Seasons from "./components/Seasons";
import SeasonsForm from "./components/SeasonsForm";

import Sprints from "./components/Sprints";
import SprintsForm from "./components/SprintsForm";

import Tracks from "./components/Tracks";
import TracksForm from "./components/TracksForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/drivers" element={<Drivers />} />
        <Route path="/drivers/form" element={<DriversForm />} />

        <Route path="/qualifyings" element={<Qualifyings />} />
        <Route path="/qualifyings/form" element={<QualifyingsForm />} />

        <Route path="/races" element={<Races />} />
        <Route path="/races/form" element={<RacesForm />} />

        <Route path="/seasons" element={<Seasons />} />
        <Route path="/seasons/form" element={<SeasonsForm />} />

        <Route path="/sprint" element={<Sprints />} />
        <Route path="/sprint/form" element={<SprintsForm />} />

        <Route path="/tracks" element={<Tracks />} />
        <Route path="/tracks/form" element={<TracksForm />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
