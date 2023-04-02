import React from "react";

import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";

import Loading from "../Loading";

import { api_host } from "../../config";

export default class RacesTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,

      podiums: "",
      leaderboard: [],
    };
  }
  componentDidMount() {
    fetch(`${api_host}/fetch/seasons/getHighestPodiums`)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "OK") {
          this.setState({ podiums: res.data, loading: false });
        }
      })
      .catch((err) => {
        console.error(err);
      });

    fetch(`${api_host}/fetch/seasons/getSecondBest`)
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
        team: data[item],
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
        <Accordion defaultActiveKey="podiums">
          <Accordion.Item eventKey="podiums">
            <Accordion.Header>
              Combien de podiums le champion en titre par équipes a-t-il obtenu
              ?
            </Accordion.Header>
            <Accordion.Body>{this.state.podiums}</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="second">
            <Accordion.Header>
              Si l'équipe Red Bull était déclassée de toutes les sessions, qui
              aurait gagné le championnat par équipe ?
            </Accordion.Header>
            <Accordion.Body>
              {" "}
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
                        <td>{res.team}</td>
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
