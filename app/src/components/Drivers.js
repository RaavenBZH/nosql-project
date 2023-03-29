import React from "react";
import { api_host } from "../config";

export default class Drivers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      driverCard: [],
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
  expandInfo(driver) {
    this.setState({ driverCard: driver });
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
        <div class="row row-cols-sm-4 d-flex align-items-center g-3">
          {this.state.drivers.map((res, key) => {
            return (
              <div class="col-sm-3" key={key}>
                <div
                  class="card"
                  onClick={() => this.expandInfo(res)}
                  data-bs-toggle="modal"
                  data-bs-target="#driverCard"
                >
                  <div class="card-body d-flex justify-content-center align-items-center">
                    <h5 class="card-subtitle">{res.firstName}</h5>
                    <h5 class="card-title">{res.lastName}</h5>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div class="modal" id="driverCard" tabindex="-1">
          <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">
                  {this.state.driverCard.firstName}{" "}
                  {this.state.driverCard.lastName}
                </h5>
              </div>
              <div class="modal-body">
                <p>{this.state.driverCard.team}</p>
                <p>{this.state.driverCard.birthdate}</p>
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
