import React from "react";

import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";

import { api_host } from "../../config";

export default class DriversTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,

      bestPilot: "",
      avgAge: "",
    };
  }
  componentDidMount() {
    fetch(`${api_host}/fetch/drivers/getBestPilot`)
      .then((response) => response.json())
      .then((res) => this.setState({ bestPilot: res.data }))
      .catch((err) => {
        console.error(err);
      });

    fetch(`${api_host}/fetch/drivers/getAvgAge`)
      .then((response) => response.json())
      .then((res) => this.setState({ avgAge: res.data }))
      .catch((err) => {
        console.error(err);
      });

    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return (
        <main className="p-3 m-3">
          <Container className="container d-flex justify-content-center">
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
              Quel pilote a obtenu le plus de pôles positions (1er en
              qualifications) ?
            </Accordion.Header>
            <Accordion.Body>{this.state.bestPilot}</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="avgAge">
            <Accordion.Header>
              Quel est l'âge moyen des pilotes ?
            </Accordion.Header>
            <Accordion.Body>{this.state.avgAge}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </main>
    );
  }
}
