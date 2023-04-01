import React from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import RacesList from "./races/RacesList";
import RacesTable from "./races/RacesTable";
import RacesForm from "./races/RacesForm";

import Loading from "./Loading";

export default class Races extends React.Component {
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
            <RacesList />
          </Tab>
          <Tab eventKey="more" title="More">
            <RacesTable />
          </Tab>
          <Tab eventKey="add" title="Add">
            <RacesForm />
          </Tab>
        </Tabs>
      </main>
    );
  }
}
