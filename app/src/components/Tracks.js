import React from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";

import TracksList from "./tracks/TracksList";
import TracksTable from "./tracks/TracksTable";
import TracksForm from "./tracks/TracksForm";

export default class Tracks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    this.setState({ loading: false });
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
        <Tabs defaultActiveKey="explore" className="mb-3">
          <Tab eventKey="explore" title="Explore">
            <TracksList />
          </Tab>
          <Tab eventKey="more" title="More">
            <TracksTable />
          </Tab>
          <Tab eventKey="add" title="Add">
            <TracksForm />
          </Tab>
        </Tabs>
      </main>
    );
  }
}
