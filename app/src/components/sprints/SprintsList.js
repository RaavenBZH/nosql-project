import React from "react";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

import Loading from "../Loading";

import { api_host } from "../../config";

import useFlags from "../../hooks/useFlags";
import jsonFlags from "../../assets/json/flags.json";

export default class SprintsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      showModal: false,
      _id: "",
      standings: [],
    };

    this.deleteEntry = this.deleteEntry.bind(this);
  }
  componentDidMount() {
    fetch(`${api_host}/fetchAll/sprints`)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "OK") {
          this.setState({ qualifyings: res.data, loading: false });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  getFlag(country) {
    return useFlags[jsonFlags[country]];
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
  expandInfo(standings) {
    this.setState({ standings: standings, showModal: true });
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

    fetch(`${api_host}/delete/sprints`, args)
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
                <th scope="col">Year</th>
                <th scope="col">Country</th>
                <th scope="col">City</th>
                <th scope="col">Duration</th>
                <th scope="col">Standings</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.qualifyings.map((res, key) => {
                return (
                  <tr
                    key={key}
                    onMouseEnter={() => this.setState({ _id: res._id })}
                    onMouseLeave={() => this.setState({ _id: null })}
                  >
                    <td>{res.year}</td>
                    <td>
                      <img
                        src={this.getFlag(res.country)}
                        height="30px"
                        alt="flag"
                      ></img>
                    </td>
                    <td>{res.city}</td>
                    <td>{this.msToTime(res.duration)}</td>
                    <td onClick={() => this.expandInfo(res.standings)}>
                      <a href="#" data-bs-toggle="tooltip" title="More">
                        More
                      </a>
                    </td>
                    <td onClick={this.deleteEntry}>
                      <i className="fa-solid fa-trash-can pe-auto"></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>

        <Modal show={this.state.showModal}>
          <Modal.Header>
            <Modal.Title>Standings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table hover>
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
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => this.setState({ showModal: false })}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </main>
    );
  }
}
