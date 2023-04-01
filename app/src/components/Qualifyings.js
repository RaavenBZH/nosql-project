import React from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import QualifyingsList from "./qualifyings/QualifyingsList";
import QualifyingsTable from "./qualifyings/QualifyingsTable";
import QualifyingsForm from "./qualifyings/QualifyingsForm";

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
        <Tabs defaultActiveKey="explore" className="mb-3">
          <Tab eventKey="explore" title="Explore">
            <QualifyingsList />
          </Tab>
          <Tab eventKey="more" title="More">
            <QualifyingsTable />
          </Tab>
          <Tab eventKey="add" title="Add">
            <QualifyingsForm />
          </Tab>
        </Tabs>
      </main>
    );
  }
}
