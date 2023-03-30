import React from "react";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";

import { MDBIcon, MDBTypography } from "mdb-react-ui-kit";
import ReactPlayer from "react-player";

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
            height="100%"
            alt="Slide 1"
          />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src={slide2}
            height="100%"
            alt="Slide 2"
          />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src={slide3}
            height="100%"
            alt="Slide 3"
          />
        </Carousel.Item>
      </Carousel>

      <Container className="py-5 h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col sm={12}>
            <figure
              className="bg-light p-4"
              style={{
                borderLeft: ".35rem solid #ce2e1e",
                borderTop: "1px solid #eee",
                borderRight: "1px solid #eee",
                borderBottom: "1px solid #eee",
              }}
            >
              <MDBIcon
                fas
                icon="quote-left mb-4"
                size="2x"
                style={{ color: "#ce2e1e" }}
              />
              <MDBTypography blockquote>
                <p className="pb-2">
                  You never stop learning in F1. It's the typical thing that all
                  drivers say, but it's absolutely true. But also, apart from
                  driving, you learn a bit about the political side of F1.
                  People don't realise how much there is outside the car.
                </p>
              </MDBTypography>
              <figcaption className="blockquote-footer mb-0">
                Carlos Sainz Jr.
              </figcaption>
            </figure>
          </Col>
        </Row>
      </Container>

      <Container className="text-center">
        <Row xs={1} md={2} className="align-items-center g-3">
          <Col>
            <Card onClick={() => goTo("drivers")}>
              <Card.Img src={drivers} alt="drivers" />
              <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
                <Card.Title className="text-white fs-1">Drivers</Card.Title>
              </Card.ImgOverlay>
            </Card>
          </Col>
          <Col>
            <Card onClick={() => goTo("qualifyings")}>
              <Card.Img src={qualifyings} alt="qualifyings" />
              <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
                <Card.Title className="text-white fs-1">Qualifyings</Card.Title>
              </Card.ImgOverlay>
            </Card>
          </Col>
          <Col>
            <Card onClick={() => goTo("races")}>
              <Card.Img src={races} alt="races" />
              <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
                <Card.Title className="text-white fs-1">Races</Card.Title>
              </Card.ImgOverlay>
            </Card>
          </Col>
          <Col>
            <Card onClick={() => goTo("seasons")}>
              <Card.Img src={seasons} alt="seasons" />
              <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
                <Card.Title className="text-white fs-1">Seasons</Card.Title>
              </Card.ImgOverlay>
            </Card>
          </Col>
          <Col sm={6}>
            <Card onClick={() => goTo("sprints")}>
              <Card.Img src={sprints} alt="sprints" />
              <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
                <Card.Title className="text-white fs-1">Sprints</Card.Title>
              </Card.ImgOverlay>
            </Card>
          </Col>
          <Col>
            <Card onClick={() => goTo("tracks")}>
              <Card.Img src={tracks} alt="tracks" />
              <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
                <Card.Title className="text-white fs-1">Tracks</Card.Title>
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>
      </Container>

      <section className="w-100 p-5 mt-5 bg-dark">
        <h1 className="card-title pb-5 fs-1 text-center text-white">
          Instant Replays
        </h1>
        <div className=" d-flex justify-content-around align-items-center">
          <ReactPlayer url="https://www.youtube.com/watch?v=7YMjw2sjXqU" />
          <ReactPlayer url="https://www.youtube.com/watch?v=7YMjw2sjXqU" />
        </div>
      </section>
    </main>
  );
}
