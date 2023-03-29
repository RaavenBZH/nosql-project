import React from "react";
import { api_host } from "../config";
import { Popover } from "bootstrap";

export default class Seasons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="popover"]'
    );
    const popoverList = [...popoverTriggerList].map(
      (popoverTriggerEl) => new Popover(popoverTriggerEl)
    );
  }
  componentDidMount() {
    fetch(`${api_host}/fetchAll/seasons`)
      .then((response) => response.json())
      .then((res) => this.setState({ seasons: res.data, loading: false }))
      .catch((err) => {
        console.error(err);
      });
  }
  expandInfo(val, field) {
    this.setState({ [field]: val });
  }
  render() {
    if (this.state.loading) {
      return (
        <main class="p-3 m-3">
          <div class="container d-flex justify-content-center">
            <div class="spinner-grow text-danger" role="status"></div>
          </div>
        </main>
      );
    }

    return (
      <main class="p-3 m-3">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/tracks">
              Explore
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/tracks/form">
              Add
            </a>
          </li>
        </ul>

        <div class="container my-3">
          <table class="table table-hover table-responsive">
            <thead>
              <tr>
                <th scope="col">Year</th>
                <th scope="col">Number of Races</th>
                <th scope="col">Defending Driver Champion</th>
                <th scope="col">Defending Team Champion</th>
                <th scope="col">Race Points System</th>
                <th scope="col">Sprint Points System</th>
              </tr>
            </thead>
            <tbody>
              {this.state.seasons.map((res, key) => {
                return (
                  <tr key={key}>
                    <td>{res.year}</td>
                    <td>{res.numberOfRaces}</td>
                    <td>{res.defendingDriverChampion}</td>
                    <td>{res.defendingTeamChampion}</td>
                    <td
                      onClick={() =>
                        this.expandInfo(
                          res.racePointsSystem,
                          "racePointsSystem"
                        )
                      }
                      data-bs-toggle="popover"
                      data-bs-title="Race Points System"
                      data-bs-content={this.state.racePointsSystem}
                      data-bs-placement="right"
                    >
                      <a href="#" title="More">
                        More
                      </a>
                    </td>
                    <td
                      onClick={() =>
                        this.expandInfo(
                          res.sprintPointsSystem,
                          "sprintPointsSystem"
                        )
                      }
                      data-bs-toggle="popover"
                      data-bs-title="Sprint Points System"
                      data-bs-content={this.state.sprintPointsSystem}
                      data-bs-placement="right"
                    >
                      <a href="#" title="More">
                        More
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    );
  }
}
