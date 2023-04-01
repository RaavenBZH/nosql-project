import React from "react";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

import Loading from "../Loading";

import { api_host } from "../../config";

import useFlags from "../../hooks/useFlags";

export default class RacesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      _id: "",
    };

    this.deleteEntry = this.deleteEntry.bind(this);
  }
  componentDidMount() {
    fetch(`${api_host}/fetchAll/races`)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "OK") {
          this.setState({ races: res.data, loading: false });
        }
      })
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
  deleteEntry() {
    if (this.state._id === null) return;

    let args = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: this.state._id,
      }),
    };

    fetch(`${api_host}/delete/races`, args)
      .then((response) => response.json())
      .catch((err) => console.error(err));
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <main className="p-3 m-3">
        <Container className="my-3">
          <Table responsive hover>
            <thead>
              <tr>
                <th scope="col">Country</th>
                <th scope="col">City</th>
                <th scope="col">Duration</th>
                <th scope="col">Fastest Driver</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.races.map((res, key) => {
                return (
                  <tr
                    key={key}
                    onMouseEnter={() => this.setState({ _id: res._id })}
                    onMouseLeave={() => this.setState({ _id: null })}
                  >
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
                    <td onClick={this.deleteEntry}>
                      <i className="fa-solid fa-trash-can pe-auto"></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </main>
    );
  }
}
