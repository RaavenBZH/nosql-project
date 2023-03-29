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
      </main>
    );
  }
}
