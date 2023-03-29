import React from "react";
import { api_host } from "../config";

export default class TracksForm extends React.Component {
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

    let { country, city, length } = event.target.elements;

    let args = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lastName: country.value,
        firstName: city.value,
        team: length.value,
      }),
    };

    fetch(`${api_host}/post/tracks`, args)
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
            <a class="nav-link" href="/tracks">
              Explore
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/tracks/form">
              Add
            </a>
          </li>
        </ul>

        <div class="container my-3">
          <form onSubmit={this.eventSubmit}>
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
              <label for="length" class="form-label">
                Length
              </label>
              <input type="text" class="form-control" id="length" required />
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
