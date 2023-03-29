import React from "react";
import { api_host } from "../config";
import useFlags from "../hooks/useFlags";

export default class Tracks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      standings: [],
    };
  }
  componentDidMount() {
    fetch(`${api_host}/fetchAll/qualifyings`)
      .then((response) => response.json())
      .then((res) => this.setState({ qualifyings: res.data, loading: false }))
      .catch((err) => {
        console.error(err);
      });
  }
  getFlag(country) {
    if (useFlags[country.slice(0, 2).toLowerCase()] != null) {
      return useFlags[country.slice(0, 2).toLowerCase()];
    } else {
      return "n/a";
    }
  }
  expandInfo(qualifying) {
    this.setState({ standings: qualifying });
  }
  render() {
    if (this.state.loading) {
      return (
        <main class="py-3 my-3">
          <div class="container d-flex justify-content-center">
            <div class="spinner-grow text-danger" role="status"></div>
          </div>
        </main>
      );
    }

    return (
      <main class="py-3 my-3">
        <div class="container">
          <table class="table table-hover table-responsive">
            <thead>
              <tr>
                <th scope="col">Year</th>
                <th scope="col">Country</th>
                <th scope="col">City</th>
                <th scope="col">Standings</th>
              </tr>
            </thead>
            <tbody>
              {this.state.qualifyings.map((res, key) => {
                return (
                  <tr key={key}>
                    <td>{res.year}</td>
                    <td>
                      <img
                        src={this.getFlag(res.country)}
                        height="30px"
                        alt="flag"
                      ></img>
                    </td>
                    <td>{res.city}</td>
                    <td
                      onClick={() => this.expandInfo(res.standings)}
                      data-bs-toggle="modal"
                      data-bs-target="#standings"
                    >
                      <a href="#" data-bs-toggle="tooltip" title="More">
                        More
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div class="modal" id="standings" tabindex="-1">
          <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Standings</h5>
              </div>
              <div class="modal-body">
                <table class="table table-hover table-responsive">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Driver</th>
                      <th scope="col">Team</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.standings.map((res, key) => {
                      return (
                        <tr key={key}>
                          <th scope="row">{key + 1}</th>
                          <td>{res.driver}</td>
                          <td>{res.team}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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
