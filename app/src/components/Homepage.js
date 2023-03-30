import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

import drivers from "../assets/img/drivers.jpg";
import qualifyings from "../assets/img/qualifyings.jpg";
import races from "../assets/img/races.jpg";
import seasons from "../assets/img/seasons.jpg";
import sprints from "../assets/img/sprints.jpg";
import tracks from "../assets/img/tracks.jpg";

import slide1 from "../assets/img/slide1.jpg";
import slide2 from "../assets/img/slide2.jpg";
import slide3 from "../assets/img/slide3.jpg";

export default function Homepage() {
  const navigate = useNavigate();
  const goTo = (page) => navigate("/" + page);

  return (
    <main>
      <Carousel fade>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src={slide1}
            height="800px"
            alt="Slide 1"
          />
          <Carousel.Caption>
            <h3>Slide 1</h3>
            <p>Some text</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src={slide2}
            height="800px"
            alt="Slide 2"
          />
          <Carousel.Caption>
            <h3>Slide 2</h3>
            <p>Some text</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src={slide3}
            height="800px"
            alt="Slide 3"
          />
          <Carousel.Caption>
            <h3>Slide 3</h3>
            <p>Some text</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div class="p-3 m-3">
        <div class="container text-center">
          <div class="row row-cols-sm-2 d-flex align-items-center g-3">
            <div class="col-sm-6">
              <div class="card" onClick={() => goTo("drivers")}>
                <img src={drivers} class="card-img" alt="drivers" />
                <div class="card-img-overlay d-flex justify-content-center align-items-center">
                  <h5 class="card-title text-white">Drivers</h5>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card" onClick={() => goTo("qualifyings")}>
                <img src={qualifyings} class="card-img" alt="qualifyings" />
                <div class="card-img-overlay d-flex justify-content-center align-items-center">
                  <h5 class="card-title text-white">Qualifyings</h5>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card" onClick={() => goTo("races")}>
                <img src={races} class="card-img" alt="races" />
                <div class="card-img-overlay d-flex justify-content-center align-items-center">
                  <h5 class="card-title text-white">Races</h5>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card" onClick={() => goTo("seasons")}>
                <img src={seasons} class="card-img" alt="seasons" />
                <div class="card-img-overlay d-flex justify-content-center align-items-center">
                  <h5 class="card-title text-white">Seasons</h5>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card" onClick={() => goTo("sprints")}>
                <img src={sprints} class="card-img" alt="sprints" />
                <div class="card-img-overlay d-flex justify-content-center align-items-center">
                  <h5 class="card-title text-white">Sprints</h5>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card" onClick={() => goTo("tracks")}>
                <img src={tracks} class="card-img" alt="tracks" />
                <div class="card-img-overlay d-flex justify-content-center align-items-center">
                  <h5 class="card-title text-white">Tracks</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
