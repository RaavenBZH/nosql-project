import React from "react";
import { api_host } from "../config";

export default class QualifyingsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      index: 1,
      standings: [
        {
          rank: 1,
          driver: "",
          team: "",
        },
      ],
    };
  }
  componentDidMount() {
    this.setState({ loading: false });
  }
  eventSubmit(event) {
    event.preventDefault();

    let { year, country, city, poleLap } = event.target.elements;
    let standings = [];

    for (let i = 0; i < this.state.standings.length; i++) {
      standings.push({
        driver: this.state.standings[i].driver,
        team: this.state.standings[i].team,
      });
    }

    let args = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        year: year.value,
        country: country.value,
        city: city.value,
        standings: standings,
        poleLap: poleLap.value,
      }),
    };

    fetch(`${api_host}/post/qualifyings`, args)
      .then((response) => response.json())
      .catch((err) => console.error(err));
  }
  handleChangeInput(event, index) {
    let values = [...this.state.standings];
    values[index][event.target.name] = event.target.value;
    this.setState({ standings: values });
  }
  addDriverInput() {
    this.setState({
      standings: [
        ...this.state.standings,
        { rank: this.state.index + 1, driver: "", team: "" },
      ],
    });
    this.setState({
      index: this.state.index + 1,
    });
  }
  removeDriverInput(index) {
    let values = [...this.state.standings];
    values.splice(index, 1);
    this.setState({
      index: this.state.index - 1,
      standings: [...values],
    });
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
            <a class="nav-link" href="/qualifyings">
              Explore
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link active"
              aria-current="page"
              href="/qualifyings/form"
            >
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
                <label for="country" class="form-label">
                  Country
                </label>
                <input type="text" class="form-control" id="country" required />
              </div>
              <div class="col">
                <label for="city" class="form-label">
                  City
                </label>
                <input type="text" class="form-control" id="city" required />
              </div>
            </div>
            <div class="mb-3">
              <div class="d-flex justify-content-between">
                <p>Standings</p>
                <button
                  type="button"
                  id="addDriverInput"
                  class="btn btn-dark"
                  onClick={() => this.addDriverInput()}
                >
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
              {this.state.standings.map((input, index) => (
                <div class="input-group mb-3" key={input.rank}>
                  <span class="input-group-text">#{input.rank}</span>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Driver"
                    name="driver"
                    value={input.driver}
                    onChange={(event) => this.handleChangeInput(event, index)}
                  />
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Team"
                    name="team"
                    value={input.team}
                    onChange={(event) => this.handleChangeInput(event, index)}
                  />
                  <button
                    type="button"
                    class="btn btn-danger"
                    id="deleteDriverInput"
                    onClick={() => this.removeDriverInput(index)}
                    disabled={this.state.index === 1}
                  >
                    <i class="fa-solid fa-delete-left"></i>
                  </button>
                </div>
              ))}
            </div>
            <div class="mb-3">
              <label for="poleLap" class="form-label">
                Pole Lap
              </label>
              <input type="text" class="form-control" id="poleLap" required />
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
