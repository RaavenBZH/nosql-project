import React from "react";
import { api_host } from "../config";

export default class SeasonsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    this.setState({ loading: false });
  }
  eventSubmit(event) {
    event.preventDefault();

    let {
      year,
      numberOfRaces,
      defendingDriverChampion,
      defendingTeamChampion,
    } = event.target.elements;

    let args = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        year: year.value,
        numberOfRaces: numberOfRaces.value,
        defendingDriverChampion: defendingDriverChampion.value,
        defendingTeamChampion: defendingTeamChampion.value,
      }),
    };

    fetch(`${api_host}/post/seasons`, args)
      .then((response) => response.json())
      .catch((err) => console.error(err));
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
            <a class="nav-link" href="/seasons">
              Explore
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/seasons/form">
              Add
            </a>
          </li>
        </ul>

        <div class="container my-3">
          <form onSubmit={this.eventSubmit}>
            <div class="mb-3">
              <label for="year" class="form-label">
                Year
              </label>
              <input type="text" class="form-control" id="year" required />
            </div>
            <div class="row mb-3">
              <div class="col">
                <label for="driverChampion" class="form-label">
                  Defending Driver Champion
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="driverChampion"
                  required
                />
              </div>
              <div class="col">
                <label for="teamChampion" class="form-label">
                  Team Champion
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="teamChampion"
                  required
                />
              </div>
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </main>
    );
  }
}
