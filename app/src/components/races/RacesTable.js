import React from "react";

import Accordion from "react-bootstrap/Accordion";

import Loading from "../Loading";

import { api_host } from "../../config";

export default class RacesTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    fetch(`${api_host}/fetch/races/getBestPilot`)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "OK") {
          this.setState({ bestPilot: res.data, loading: false });
        }
      })
      .catch((err) => {
        console.error(err);
      });

    fetch(`${api_host}/fetch/races/getPodiumsFerrari`)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "OK") {
          this.setState({
            podiums: res.data,
            loading: false,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
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
          <Accordion.Item eventKey="podiums">
            <Accordion.Header>
              Quel est le classement du championnat des pilotes ?
            </Accordion.Header>
            <Accordion.Body>{this.state.podiums}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </main>
    );
  }
}
