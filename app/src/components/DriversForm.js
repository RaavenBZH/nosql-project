import React from "react";
import { api_host } from "../config";

export default class DriversForm extends React.Component {
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

    let { lastName, firstName, team, dob } = event.target.elements;

    let args = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lastName: lastName.value,
        firstName: firstName.value,
        team: team.value,
        birthdate: dob.value,
      }),
    };

    fetch(`${api_host}/post/drivers`, args)
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
            <a class="nav-link" href="/drivers">
              Explore
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/drivers/form">
              Add
            </a>
          </li>
        </ul>

        <div class="container my-3">
          <form onSubmit={this.eventSubmit}>
            <div class="row mb-3">
              <div class="col">
                <label for="lastName" class="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="lastName"
                  required
                />
              </div>
              <div class="col">
                <label for="firstName" class="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="firstName"
                  required
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="team" class="form-label">
                Team
              </label>
              <input type="text" class="form-control" id="team" required />
            </div>
            <div class="mb-3">
              <label for="dob" class="form-label">
                Birthdate
              </label>
              <input type="text" class="form-control" id="dob" required />
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
