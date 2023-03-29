import React from "react";
import { api_host } from "../config";
import useDrivers from "../hooks/useDrivers";
import useTeams from "../hooks/useTeams";

export default class Drivers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      driverCard: [],
    };
  }
  componentDidMount() {
    fetch(`${api_host}/fetchAll/drivers`)
      .then((response) => response.json())
      .then((res) => this.setState({ drivers: res.data, loading: false }))
      .catch((err) => {
        console.error(err);
      });
  }
  expandInfo(driver) {
    this.setState({ driverCard: driver });
  }
  getDriver(driver) {
    if (driver !== undefined) {
      if (useDrivers[driver.toLowerCase()] != null) {
        return useDrivers[driver.toLowerCase()];
      } else {
        return "n/a";
      }
    }
  }
  getTeam(team) {
    if (team !== undefined) {
      if (useTeams[team.toLowerCase().replaceAll(" ", "")] != null) {
        return useTeams[team.toLowerCase().replaceAll(" ", "")];
      } else {
        return "n/a";
      }
    }
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
            <a class="nav-link active" aria-current="page" href="/drivers">
              Explore
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/drivers/form">
              Add
            </a>
          </li>
        </ul>

        <div class="row row-cols-sm-4 d-flex align-items-center g-3 my-3">
          {this.state.drivers.map((res, key) => {
            return (
              <div class="col-sm-3" key={key}>
                <div
                  class="card"
                  onClick={() => this.expandInfo(res)}
                  data-bs-toggle="modal"
                  data-bs-target="#driverCard"
                >
                  <div class="card-body d-flex justify-content-center align-items-center">
                    <h5 class="card-subtitle">{res.firstName}</h5>
                    <h5 class="card-title">{res.lastName}</h5>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div class="modal" id="driverCard" tabindex="-1">
          <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-subtitle">
                  {this.state.driverCard.firstName}
                </h5>
                <h5 class="modal-title">{this.state.driverCard.lastName}</h5>
                <img
                  src={this.getDriver(this.state.driverCard.lastName)}
                  height="250px"
                  alt="driver"
                ></img>
              </div>
              <div class="modal-body">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-8 col-sm-6">
                      {this.state.driverCard.birthdate}
                    </div>
                    <div class="col-4 col-sm-6"></div>
                  </div>
                  <div class="row">
                    <div class="col-8 col-sm-6">
                      {this.state.driverCard.team}
                    </div>
                    <div class="col-4 col-sm-6">
                      <img
                        src={this.getTeam(this.state.driverCard.team)}
                        height="250px"
                        alt="team"
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
