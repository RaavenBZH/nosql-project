import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import Loading from "../Loading";

import { api_host } from "../../config";

export default class DriversForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,

      lastName: "",
      firstName: "",
      team: "",
      dob: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.eventSubmit = this.eventSubmit.bind(this);
  }
  componentDidMount() {
    this.setState({ loading: false });
  }
  eventSubmit(event) {
    event.preventDefault();

    let args = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lastName: this.state.lastName,
        firstName: this.state.firstName,
        team: this.state.team,
        birthdate: this.state.dob,
      }),
    };

    fetch(`${api_host}/post/drivers`, args)
      .then((response) => response.json())
      .catch((err) => console.error(err));

    this.setState({ lastName: "", firstName: "", team: "", dob: "" });
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <main className="p-3 m-3">
        <Container>
          <Form onSubmit={this.eventSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={this.state.lastName}
                    placeholder="Last Name"
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={this.state.firstName}
                    placeholder="First Name"
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Team</Form.Label>
              <Form.Control
                type="text"
                name="team"
                value={this.state.team}
                placeholder="Team"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control
                type="text"
                name="dob"
                value={this.state.dob}
                placeholder="Birthday"
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
