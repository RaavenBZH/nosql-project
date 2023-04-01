import React from "react";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

import Loading from "../Loading";

import { api_host } from "../../config";

export default class SeasonsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      _id: "",
      racePointsSystem: [],
      sprintPointsSystem: [],
    };
  }
  componentDidMount() {
    fetch(`${api_host}/fetchAll/seasons`)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "OK") {
          this.setState({ seasons: res.data, loading: false });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  expandInfo(val, field) {
    let values = (
      <Popover>
        <Popover.Body>
          {val.map((res, key) => {
            return <p key={key}>- {res}</p>;
          })}
        </Popover.Body>
      </Popover>
    );
    this.setState({ [field]: values });
  }
  deleteEntry() {
    if (this.state._id === null) return;

    let args = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: this.state._id,
      }),
    };

    fetch(`${api_host}/delete/sprints`, args)
      .then((response) => response.json())
      .catch((err) => console.error(err));
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <main className="p-3 m-3">
        <Container className="my-3">
          <Table responsive hover>
            <thead>
              <tr>
                <th scope="col">Year</th>
                <th scope="col">Number of Races</th>
                <th scope="col">Defending Driver Champion</th>
                <th scope="col">Defending Team Champion</th>
                <th scope="col">Race Points System</th>
                <th scope="col">Sprint Points System</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.seasons.map((res, key) => {
                return (
                  <tr
                    key={key}
                    onMouseEnter={() => this.setState({ _id: res._id })}
                    onMouseLeave={() => this.setState({ _id: null })}
                  >
                    <td>{res.year}</td>
                    <td>{res.numberOfRaces}</td>
                    <td>{res.defendingDriverChampion}</td>
                    <td>{res.defendingTeamChampion}</td>
                    <td>
                      <OverlayTrigger
                        trigger="click"
                        placement="right"
                        overlay={this.state.racePointsSystem}
                      >
                        <a
                          href="#"
                          onClick={() =>
                            this.expandInfo(
                              res.racePointsSystem,
                              "racePointsSystem"
                            )
                          }
                        >
                          More
                        </a>
                      </OverlayTrigger>
                    </td>
                    <td>
                      <OverlayTrigger
                        trigger="click"
                        placement="right"
                        overlay={this.state.sprintPointsSystem}
                      >
                        <a
                          href="#"
                          onClick={() =>
                            this.expandInfo(
                              res.sprintPointsSystem,
                              "sprintPointsSystem"
                            )
                          }
                        >
                          More
                        </a>
                      </OverlayTrigger>
                    </td>
                    <td onClick={this.deleteEntry}>
                      <i className="fa-solid fa-trash-can pe-auto"></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </main>
    );
  }
}
