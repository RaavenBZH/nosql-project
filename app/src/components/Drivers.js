import React from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import DriversMosaic from "./drivers/DriversMosaic";
import DriversTable from "./drivers/DriversTable";
import DriversForm from "./drivers/DriversForm";

import Loading from "./Loading";

export default class Drivers extends React.Component {
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
        <h1>Drivers</h1>
        <h2>Explore, learn more and add drivers.</h2>
        <br />

        <Tabs defaultActiveKey="explore" className="mb-3">
          <Tab eventKey="explore" title="Explore">
            <DriversMosaic />
          </Tab>
          <Tab eventKey="more" title="More">
            <DriversTable />
          </Tab>
          <Tab eventKey="add" title="Add">
            <DriversForm />
          </Tab>
        </Tabs>
      </main>
    );
  }
}
