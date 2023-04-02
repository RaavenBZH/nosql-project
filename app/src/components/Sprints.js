import React from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import SprintsList from "./sprints/SprintsList";
import SprintsTable from "./sprints/SprintsTable";
import SprintsForm from "./sprints/SprintsForm";

import Loading from "./Loading";

export default class Sprints extends React.Component {
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
        <h1>Sprints</h1>
        <h2>Explore, learn more and add sprints.</h2>
        <br />

        <Tabs defaultActiveKey="explore" className="mb-3">
          <Tab eventKey="explore" title="Explore">
            <SprintsList />
          </Tab>
          <Tab eventKey="more" title="More">
            <SprintsTable />
          </Tab>
          <Tab eventKey="add" title="Add">
            <SprintsForm />
          </Tab>
        </Tabs>
      </main>
    );
  }
}
