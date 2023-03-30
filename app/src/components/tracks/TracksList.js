import React from "react";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

import { api_host } from "../../config";

import useFlags from "../../hooks/useFlags";

export default class TracksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      _id: "",
    };

    this.deleteTrack = this.deleteTrack.bind(this);
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
    if (useFlags[country.slice(0, 2).toLowerCase()] != null) {
      return useFlags[country.slice(0, 2).toLowerCase()];
    } else {
      return "n/a";
    }
  }
  deleteTrack() {
    if (this.state._id === null) return;

    let args = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: this.state._id,
      }),
    };

    fetch(`${api_host}/delete/tracks`, args)
      .then((response) => response.json())
      .catch((err) => console.error(err));
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
      <main className="p-3 m-3">
        <Container>
          <Table responsive hover>
            <thead>
              <tr>
                <th scope="col">Country</th>
                <th scope="col">City</th>
                <th scope="col">Length</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tracks.map((res, key) => {
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
                    <td>{res["length"] / 1000}</td>
                    <td onClick={this.deleteTrack}>
                      <i className="fa-solid fa-trash-can"></i>
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
