import React from "react";
import { useNavigate } from "react-router-dom";

import drivers from "../assets/img/drivers.jpg";
import qualifyings from "../assets/img/qualifyings.jpg";
import races from "../assets/img/races.jpg";
import seasons from "../assets/img/seasons.jpg";
import sprints from "../assets/img/sprints.jpg";
import tracks from "../assets/img/tracks.jpg";

export default function Homepage() {
  const navigate = useNavigate();
  const goTo = (page) => navigate("/" + page);

  return (
    <main class="py-3 my-3">
      <div class="container text-center">
        <div class="row row-cols-sm-2 d-flex align-items-center g-3">
          <div class="col-sm-6">
            <div class="card" onClick={() => goTo("drivers")}>
              <img src={drivers} class="card-img" alt="drivers" />
              <div class="card-img-overlay d-flex justify-content-center align-items-center">
                <h5 class="card-title text-white">DRIVERS</h5>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card" onClick={() => goTo("qualifyings")}>
              <img src={qualifyings} class="card-img" alt="qualifyings" />
              <div class="card-img-overlay d-flex justify-content-center align-items-center">
                <h5 class="card-title text-white">QUALIFYINGS</h5>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card" onClick={() => goTo("races")}>
              <img src={races} class="card-img" alt="races" />
              <div class="card-img-overlay d-flex justify-content-center align-items-center">
                <h5 class="card-title text-white">RACES</h5>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card" onClick={() => goTo("seasons")}>
              <img src={seasons} class="card-img" alt="seasons" />
              <div class="card-img-overlay d-flex justify-content-center align-items-center">
                <h5 class="card-title text-white">SEASONS</h5>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card" onClick={() => goTo("sprints")}>
              <img src={sprints} class="card-img" alt="sprints" />
              <div class="card-img-overlay d-flex justify-content-center align-items-center">
                <h5 class="card-title text-white">SPRINTS</h5>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card" onClick={() => goTo("tracks")}>
              <img src={tracks} class="card-img" alt="tracks" />
              <div class="card-img-overlay d-flex justify-content-center align-items-center">
                <h5 class="card-title text-white">TRACKS</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
