import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

import Loading from "../Loading";

import { api_host } from "../../config";

import useDrivers from "../../hooks/useDrivers";
import useTeams from "../../hooks/useTeams";

export default class Drivers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isHover: null,
      showModal: false,
      driverCard: [],
    };

    this.deleteEntry = this.deleteEntry.bind(this);
  }
  componentDidMount() {
    fetch(`${api_host}/fetchAll/drivers`)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "OK") {
          this.setState({ drivers: res.data, loading: false });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  expandInfo(driver) {
    this.setState({ driverCard: driver, showModal: true });
  }
  getDriver(driver) {
    if (driver !== undefined) {
      if (useDrivers[driver.toLowerCase()] != null) {
        return useDrivers[driver.toLowerCase()];
      } else {
        return "n/a";
      }
    }
  }
  getTeam(team) {
    if (team !== undefined) {
      if (useTeams[team.toLowerCase().replaceAll(" ", "")] != null) {
        return useTeams[team.toLowerCase().replaceAll(" ", "")];
      } else {
        return "n/a";
      }
    }
  }
  deleteEntry() {
    let args = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: this.state.driverCard._id,
      }),
    };

    fetch(`${api_host}/delete/drivers`, args)
      .then((response) => response.json())
      .catch((err) => console.error(err));
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <main className="p-3 m-3">
        <Row sm={4} className="d-flex align-items-center g-3">
          {this.state.drivers.map((res, key) => {
            return (
              <Col key={key}>
                <Card
                  onClick={() => this.expandInfo(res)}
                  onMouseEnter={() => this.setState({ isHover: key })}
                  onMouseLeave={() => this.setState({ isHover: null })}
                >
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src={this.getDriver(res.lastName)}
                      height="125px"
                      alt="driver"
                    ></img>
                    {this.state.isHover === key ? (
                      <Card.Title className="fs-2 text-truncate">
                        {res.lastName}
                      </Card.Title>
                    ) : (
                      <div>
                        <Card.Subtitle className="fs-4 text-truncate">
                          {res.firstName}
                        </Card.Subtitle>
                        <Card.Title className="fs-3 text-truncate">
                          {res.lastName}
                        </Card.Title>
                      </div>
                    )}
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>

        <Modal show={this.state.showModal}>
          <Modal.Header className="d-flex justify-content-start align-items-end">
            <Modal.Title className="modal-subtitle">
              {this.state.driverCard.firstName}
            </Modal.Title>
            <Modal.Title>{this.state.driverCard.lastName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container-fluid">
              <Row>
                <Col>{this.state.driverCard.birthdate}</Col>
                <Col></Col>
              </Row>
              <Row>
                <Col>{this.state.driverCard.team}</Col>
                <Col>
                  <img
                    src={this.getTeam(this.state.driverCard.team)}
                    height="250px"
                    alt="team"
                  ></img>
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.deleteEntry}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-primary"
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
