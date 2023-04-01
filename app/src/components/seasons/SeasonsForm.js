import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Loading from "../Loading";

import { api_host } from "../../config";

export default class SeasonsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,

      year: "",
      numberOfRaces: "",
      defendingDriverChampion: "",
      defendingTeamChampion: "",

      racePointsSystem: [0],
      sprintPointsSystem: [0],
    };

    this.handleChange = this.handleChange.bind(this);
    this.eventSubmit = this.eventSubmit.bind(this);
  }
  componentDidMount() {
    this.setState({ loading: false });
  }
  eventSubmit(event) {
    event.preventDefault();

    let racePointsSystem = [];
    for (let points of this.state.racePointsSystem) {
      racePointsSystem.push(points);
    }

    let sprintPointsSystem = [];
    for (let points of this.state.sprintPointsSystem) {
      sprintPointsSystem.push(points);
    }

    let args = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        year: this.state.year,
        numberOfRaces: this.state.numberOfRaces,
        defendingDriverChampion: this.state.defendingDriverChampion,
        defendingTeamChampion: this.state.defendingTeamChampion,
        racePointsSystem: racePointsSystem,
        sprintPointsSystem: sprintPointsSystem,
      }),
    };

    fetch(`${api_host}/post/seasons`, args)
      .then((response) => response.json())
      .catch((err) => console.error(err));

    this.setState({
      year: "",
      numberOfRaces: "",
      defendingDriverChampion: "",
      defendingTeamChampion: "",

      racePointsSystem: [0],
      sprintPointsSystem: [0],
    });
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleChangeInput(event, index, field) {
    let values = [...this.state[field]];
    values[index][event.target.name] = event.target.value;
    this.setState({ [field]: values });
  }
  addInput(field) {
    this.setState({
      [field]: [...this.state[field], 0],
    });
  }
  removeInput(index, field) {
    let values = [...this.state[field]];
    values.splice(index, 1);
    this.setState({
      [field]: [...values],
    });
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <main className="p-3 m-3">
        <Container className="my-3">
          <Form onSubmit={this.eventSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                name="year"
                value={this.state.year}
                placeholder="Year"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Defending Driver Champion</Form.Label>
                  <Form.Control
                    type="text"
                    name="defendingDriverChampion"
                    value={this.state.defendingDriverChampion}
                    placeholder="Defending Driver Champion"
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Defending Team Champion</Form.Label>
                  <Form.Control
                    type="text"
                    name="defendingTeamChampion"
                    value={this.state.defendingTeamChampion}
                    placeholder="Defending Team Champion"
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <p>Race Points System</p>
                <button
                  type="button"
                  id="addInput"
                  className="btn btn-dark"
                  onClick={() => this.addInput("racePointsSystem")}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
              {this.state.racePointsSystem.map((input, index) => (
                <InputGroup className="mb-3" key={index}>
                  <InputGroup.Text>#</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="points"
                    placeholder="Points"
                    onChange={(event) =>
                      this.handleChangeInput(event, index, "racePointsSystem")
                    }
                  />
                  <button
                    type="button"
                    className="btn btn-danger"
                    id="deleteInput"
                    onClick={() => this.removeInput(index, "racePointsSystem")}
                    disabled={this.state.racePointsSystem.length === 1}
                  >
                    <i className="fa-solid fa-delete-left"></i>
                  </button>
                </InputGroup>
              ))}
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <p>Sprint Points System</p>
                <button
                  type="button"
                  id="addInput"
                  className="btn btn-dark"
                  onClick={() => this.addInput("sprintPointsSystem")}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
              {this.state.sprintPointsSystem.map((input, index) => (
                <InputGroup className="mb-3" key={index}>
                  <InputGroup.Text>#</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="points"
                    placeholder="Points"
                    onChange={(event) =>
                      this.handleChangeInput(event, index, "sprintPointsSystem")
                    }
                  />
                  <button
                    type="button"
                    className="btn btn-danger"
                    id="deleteInput"
                    onClick={() =>
                      this.removeInput(index, "sprintPointsSystem")
                    }
                    disabled={this.state.sprintPointsSystem.length === 1}
                  >
                    <i className="fa-solid fa-delete-left"></i>
                  </button>
                </InputGroup>
              ))}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </Form>
        </Container>
      </main>
    );
  }
}
