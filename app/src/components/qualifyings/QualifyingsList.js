import React from "react";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

import { api_host } from "../../config";

import useFlags from "../../hooks/useFlags";
import jsonFlags from "../../assets/json/flags.json";

export default class TracksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      showModal: false,
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
    return useFlags[jsonFlags[country]]
  }
  expandInfo(standings) {
    this.setState({ standings: standings, showModal: true });
  }
  render() {
    if (this.state.loading) {
      return (
        <main className="p-3 m-3">
          <Container className="d-flex justify-content-center">
            <div className="spinner-grow text-danger" role="status"></div>
          </Container>
        </main>
      );
    }

    return (
      <main class="p-3 m-3">
        <Container class="my-3">
          <Table responsive hover>
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
                    <td onClick={() => this.expandInfo(res.standings)}>
                      <a href="#" data-bs-toggle="tooltip" title="More">
                        More
                      </a>
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
