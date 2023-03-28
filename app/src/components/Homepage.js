import React from "react";

import drivers from "../assets/drivers.jpg";
import qualifyings from "../assets/qualifyings.jpg";
import races from "../assets/races.jpg";
import seasons from "../assets/seasons.jpg";
import sprints from "../assets/sprints.jpg";
import tracks from "../assets/tracks.jpg";

function Homepage() {
  return (
    <div className="Homepage">
      <main class="py-3 my-3">
        <div class="container text-center">
          <div class="row row-cols-sm-2 d-flex align-items-center g-3">
            <div class="col-sm-6">
              <div class="card">
                <img src={drivers} class="card-img" alt="drivers" />
                <div class="card-img-overlay d-flex justify-content-center align-items-center">
                  <h5 class="card-title text-white">DRIVERS</h5>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card">
                <img src={qualifyings} class="card-img" alt="qualifyings" />
                <div class="card-img-overlay d-flex justify-content-center align-items-center">
                  <h5 class="card-title text-white">QUALIFYINGS</h5>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card">
                <img src={races} class="card-img" alt="races" />
                <div class="card-img-overlay d-flex justify-content-center align-items-center">
                  <h5 class="card-title text-white">RACES</h5>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card">
                <img src={seasons} class="card-img" alt="seasons" />
                <div class="card-img-overlay d-flex justify-content-center align-items-center">
                  <h5 class="card-title text-white">SEASONS</h5>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card">
                <img src={sprints} class="card-img" alt="sprints" />
                <div class="card-img-overlay d-flex justify-content-center align-items-center">
                  <h5 class="card-title text-white">SPRINTS</h5>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card">
                <img src={tracks} class="card-img" alt="tracks" />
                <div class="card-img-overlay d-flex justify-content-center align-items-center">
                  <h5 class="card-title text-white">TRACKS</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Homepage;