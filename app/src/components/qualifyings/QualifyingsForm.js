import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { api_host } from "../../config";

export default class QualifyingsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,

      year: "",
      country: "",
      city: "",
      poleLap: "",

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

    for (let i = 0; i < this.state.standings.length; i++) {
      standings.push({
        driver: this.state.standings[i].driver,
        team: this.state.standings[i].team,
      });
    }

    let args = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        year: this.state.year,
        country: this.state.country,
        city: this.state.city,
        standings: standings,
        poleLap: this.state.poleLap,
      }),
    };

    fetch(`${api_host}/post/qualifyings`, args)
      .then((response) => response.json())
      .catch((err) => console.error(err));

    this.setState({
      year: "",
      country: "",
      city: "",
      poleLap: "",
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
  addDriverInput() {
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
  removeDriverInput(index) {
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
          <Form onSubmit={this.eventSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                name="year"
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
                  id="addDriverInput"
                  className="btn btn-dark"
                  onClick={() => this.addDriverInput()}
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
                    id="deleteDriverInput"
                    onClick={() => this.removeDriverInput(index)}
                    disabled={this.state.index === 1}
                  >
                    <i className="fa-solid fa-delete-left"></i>
                  </button>
                </InputGroup>
              ))}
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Pole Lap</Form.Label>
              <Form.Control
                type="text"
                name="poleLap"
                placeholder="Pole Lap"
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
