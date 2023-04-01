import React from "react";

import Accordion from "react-bootstrap/Accordion";

import Loading from "../Loading";

import { api_host } from "../../config";

export default class DriversTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    fetch(`${api_host}/fetch/drivers/getPilots`)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "OK") {
          this.setState({ pilots: res.data, loading: false });
        }
      })
      .catch((err) => {
        console.error(err);
      });

    fetch(`${api_host}/fetch/drivers/getAvgAge`)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "OK") {
          this.setState({ avgAge: res.data, loading: false });
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
              Combien de pilotes différents ont gagné une course ?
            </Accordion.Header>
            <Accordion.Body>{this.state.pilots}</Accordion.Body>
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
