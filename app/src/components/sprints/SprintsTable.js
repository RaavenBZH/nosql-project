import React from "react";

import Accordion from "react-bootstrap/Accordion";

import Loading from "../Loading";

import { api_host } from "../../config";

export default class SprintsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    fetch(`${api_host}/fetch/sprints/getHighestSpeed`)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "OK") {
          this.setState({ highestSpeed: res.data, loading: false });
        }
      })
      .catch((err) => {
        console.error(err);
      });

    fetch(`${api_host}/fetch/sprints/getAvgTrack`)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "OK") {
          this.setState({ avgTrack: res.data, loading: false });
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
        <Accordion defaultActiveKey="highestSpeed">
          <Accordion.Item eventKey="highestSpeed">
            <Accordion.Header>
              Sur quel circuit la vitesse moyenne était-elle la plus élevée en
              course ?
            </Accordion.Header>
            <Accordion.Body>{this.state.highestSpeed}</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="avgTrack">
            <Accordion.Header>
              Quelle est la longueur moyenne d'un circuit en 2022 (en mètres) ?
            </Accordion.Header>
            <Accordion.Body>{this.state.avgTrack}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </main>
    );
  }
}
