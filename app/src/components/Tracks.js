import React from "react";
import { api_host } from "../config";
import flag from "../hooks/flag";

export default class Tracks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    fetch(`${api_host}/fetchAll/tracks`)
      .then((response) => response.json())
      .then((res) => this.setState({ tracks: res.data, loading: false }))
      .catch((err) => {
        console.error(err);
      });
  }
  getFlag(country) {
    if (flag[country.slice(0, 2).toLowerCase()] != null) {
      return flag[country.slice(0, 2).toLowerCase()];
    } else {
      return "n/a";
    }
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
                <th scope="col">Country</th>
                <th scope="col">City</th>
                <th scope="col">Length</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tracks.map((res, key) => {
                return (
                  <tr key={key}>
                    <td>
                      <img
                        src={this.getFlag(res.country)}
                        height="30px"
                        alt="flag"
                      ></img>
                    </td>
                    <td>{res.city}</td>
                    <td>{res["length"] / 1000}</td>
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
