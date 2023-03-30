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
    if (useFlags[country.slice(0, 2).toLowerCase()] != null) {
      return useFlags[country.slice(0, 2).toLowerCase()];
    } else {
      return "n/a";
    }
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
          <Table hover>
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
          </Table>
        </Container>
      </main>
    );
  }
}
