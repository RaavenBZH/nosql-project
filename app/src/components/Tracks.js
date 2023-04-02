import React from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import TracksList from "./tracks/TracksList";
import TracksTable from "./tracks/TracksTable";
import TracksForm from "./tracks/TracksForm";

import Loading from "./Loading";

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
      return <Loading />;
    }

    return (
      <main className="p-3 m-3">
        <h1>Tracks</h1>
        <h2>Explore, learn more and add tracks.</h2>
        <br />

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
