import React from "react";
import { api_host } from "../config";
import flag from "../hooks/flag";

export default class Races extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    fetch(`${api_host}/fetchAll/races`)
      .then((response) => response.json())
      .then((res) => this.setState({ races: res.data, loading: false }))
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
  msToTime(duration) {
    let milliseconds = parseInt(duration % 1000),
      seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
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
                <th scope="col">Duration</th>
                <th scope="col">Fastest Driver</th>
              </tr>
            </thead>
            <tbody>
              {this.state.races.map((res, key) => {
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
                    <td>{this.msToTime(res.duration)}</td>
                    <td>{res.fastestDriver}</td>
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
