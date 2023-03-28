import React from "react";
import { api_host } from "../config";

export default class Drivers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    fetch(`${api_host}/fetchAll/drivers`)
      .then((response) => response.json())
      .then((res) => this.setState({ drivers: res.data, loading: false }))
      .catch((err) => {
        console.error(err);
      });
  }
  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <main class="py-3 my-3">
        <div class="container">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Team</th>
              </tr>
            </thead>
            <tbody>
              {this.state.drivers.map((res, key) => {
                return (
                  <tr key={key}>
                    <th scope="row">{key + 1}</th>
                    <td>{res.firstName}</td>
                    <td>{res.lastName}</td>
                    <td>{res.team}</td>
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
