import React from "react";

import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";

import { api_host } from "../../config";

export default class TracksTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    fetch(`${api_host}/fetch/tracks/getHighestSpeed`)
      .then((response) => response.json())
      .then((res) => this.setState({ highestSpeed: res.data, loading: false }))
      .catch((err) => {
        console.error(err);
      });

    fetch(`${api_host}/fetch/tracks/getAvgTrack`)
      .then((response) => response.json())
      .then((res) => this.setState({ avgTrack: res.data, loading: false }))
      .catch((err) => {
        console.error(err);
      });
  }
  render() {
    if (this.state.loading) {
      return (
        <main className="p-3 m-3">
          <Container className="d-flex justify-content-center">
            <div className="spinner-grow text-danger" role="status"></div>
          </Container>
        </main>
      );
    }

    return (
      <main className="p-3 m-3">
        <Accordion defaultActiveKey="bestPilot">
          <Accordion.Item eventKey="bestPilot">
            <Accordion.Header>
              Quelle est la longueur moyenne d'un circuit en 2022 (en mètres) ?
            </Accordion.Header>
            <Accordion.Body>{this.state.highestSpeed}</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="avgAge">
            <Accordion.Header>
              Sur quel circuit la vitesse moyenne était-elle la plus élevée en
              course ?
            </Accordion.Header>
            <Accordion.Body>{this.state.avgTrack}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </main>
    );
  }
}
