import React from "react";

import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";

import Loading from "../Loading";

import { api_host } from "../../config";

export default class QualifyingsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,

      bestPilot: "",
      leaderboard: [],
    };
  }
  componentDidMount() {
    fetch(`${api_host}/fetch/qualifyings/getBestPilot`)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "OK") {
          this.setState({ bestPilot: res.data, loading: false });
        }
      })
      .catch((err) => {
        console.error(err);
      });

    fetch(`${api_host}/fetch/qualifyings/getLeaderboard`)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "OK") {
          this.setState({
            leaderboard: this.formatLeaderboard(res.data),
            loading: false,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  formatLeaderboard(data) {
    let leaderboard = [];

    for (let item in data) {
      leaderboard.push({
        driver: item,
        points: data[item],
      });
    }

    return leaderboard;
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
              Qui a gagné le plus de postions entre la qualification et la
              course en France ?
            </Accordion.Header>
            <Accordion.Body>{this.state.bestPilot}</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="leaderboard">
            <Accordion.Header>
              Quel est le classement du championnat des pilotes ?
            </Accordion.Header>
            <Accordion.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th scope="col">Driver</th>
                    <th scope="col">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.leaderboard.map((res, key) => {
                    return (
                      <tr key={key}>
                        <td>{res.driver}</td>
                        <td>{res.points}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </main>
    );
  }
}
