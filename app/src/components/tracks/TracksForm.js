import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import Loading from "../Loading";

import { api_host } from "../../config";

export default class TracksForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,

      country: "",
      city: "",
      length: "",
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
        country: this.state.country,
        city: this.state.city,
        length: Number(this.state["length"]),
      }),
    };

    fetch(`${api_host}/post/tracks`, args)
      .then((response) => response.json())
      .catch((err) => console.error(err));

    this.setState({ country: "", city: "", length: "" });
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
            <Form.Group className="mb-3">
              <Form.Label>Length</Form.Label>
              <Form.Control
                type="text"
                name="length"
                value={this.state["length"]}
                placeholder="Length"
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
