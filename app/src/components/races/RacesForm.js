import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Loading from "../Loading";

import { api_host } from "../../config";

export default class RacesForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,

      year: "",
      country: "",
      city: "",
      duration: "",
      lapsCompleted: "",
      fastestDriver: "",

      index: 1,
      standings: [
        {
          rank: 1,
          driver: "",
          team: "",
        },
      ],
    };

    this.handleChange = this.handleChange.bind(this);
    this.eventSubmit = this.eventSubmit.bind(this);
  }
  componentDidMount() {
    this.setState({ loading: false });
  }
  eventSubmit(event) {
    event.preventDefault();

    let standings = [];

    for (let pilot of this.state.standings) {
      standings.push({
        driver: pilot.driver,
        team: pilot.team,
      });
    }

    let args = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        year: Number(this.state.year),
        country: this.state.country,
        city: this.state.city,
        standings: standings,
        duration: Number(this.state.duration),
        lapsCompleted: Number(this.state.lapsCompleted),
        fastestDriver: this.state.fastestDriver,
      }),
    };

    fetch(`${api_host}/post/races`, args)
      .then((response) => response.json())
      .catch((err) => console.error(err));

    this.setState({
      year: "",
      country: "",
      city: "",
      duration: "",
      lapsCompleted: "",
      fastestDriver: "",

      index: 1,
      standings: [
        {
          rank: 1,
          driver: "",
          team: "",
        },
      ],
    });
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleChangeInput(event, index) {
    let values = [...this.state.standings];
    values[index][event.target.name] = event.target.value;
    this.setState({ standings: values });
  }
  addInput() {
    this.setState({
      standings: [
        ...this.state.standings,
        { rank: this.state.index + 1, driver: "", team: "" },
      ],
    });
    this.setState({
      index: this.state.index + 1,
    });
  }
  removeInput(index) {
    let values = [...this.state.standings];
    values.splice(index, 1);

    for (let i = index; i < values.length; i++) {
      values[i].rank -= 1;
    }

    this.setState({
      index: this.state.index - 1,
      standings: [...values],
    });
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <main className="p-3 m-3">
        <Container>
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
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={this.state.country}
                    placeholder="Country"
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={this.state.city}
                    placeholder="City"
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <p>Standings</p>
                <button
                  type="button"
                  id="addInput"
                  className="btn btn-dark"
                  onClick={() => this.addInput()}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
              {this.state.standings.map((input, index) => (
                <InputGroup className="mb-3" key={input.rank}>
                  <InputGroup.Text>#{input.rank}</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="driver"
                    placeholder="Driver"
                    onChange={(event) => this.handleChangeInput(event, index)}
                  />
                  <Form.Control
                    type="text"
                    name="team"
                    placeholder="Team"
                    onChange={(event) => this.handleChangeInput(event, index)}
                  />
                  <button
                    type="button"
                    className="btn btn-danger"
                    id="deleteInput"
                    onClick={() => this.removeInput(index)}
                    disabled={this.state.index === 1}
                  >
                    <i className="fa-solid fa-delete-left"></i>
                  </button>
                </InputGroup>
              ))}
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                name="duration"
                value={this.state.duration}
                placeholder="Duration"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Laps Completed</Form.Label>
              <Form.Control
                type="text"
                name="lapsCompleted"
                value={this.state.lapsCompleted}
                placeholder="Laps Completed"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fastest Driver</Form.Label>
              <Form.Control
                type="text"
                name="fastestDriver"
                value={this.state.fastestDriver}
                placeholder="Fastest Driver"
                onChange={this.handleChange}
              />
            </Form.Group>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </Form>
        </Container>
      </main>
    );
  }
}
