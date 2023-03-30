import React from "react";

import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";

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
      .then((res) => this.setState({ bestPilot: res.data, loading: false }))
      .catch((err) => {
        console.error(err);
      });

    fetch(`${api_host}/fetch/qualifyings/getLeaderboard`)
      .then((response) => response.json())
      .then((res) =>
        this.setState({
          leaderboard: JSON.parse(res.data),
          loading: false,
        })
      )
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
              Qui a gagné le plus de postions entre la qualification et la
              course en France ?
            </Accordion.Header>
            <Accordion.Body>{this.state.bestPilot}</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="avgAge">
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
                    console.log(this.state.leaderboard);

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
