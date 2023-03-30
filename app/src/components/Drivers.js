import React from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";

import DriversMosaic from "./drivers/DriversMosaic";
import DriversTable from "./drivers/DriversTable";
import DriversForm from "./drivers/DriversForm";

export default class Drivers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isHover: null,
      showModal: false,
      driverCard: [],
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
