import React from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import SeasonsList from "./seasons/SeasonsList";
import SeasonsTable from "./seasons/SeasonsTable";
import SeasonsForm from "./seasons/SeasonsForm";

import Loading from "./Loading";

export default class Seasons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      standings: [],
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
        <h1>Seasons</h1>
        <h2>Explore, learn more and add seasons.</h2>
        <br />

        <Tabs defaultActiveKey="explore" className="mb-3">
          <Tab eventKey="explore" title="Explore">
            <SeasonsList />
          </Tab>
          <Tab eventKey="more" title="More">
            <SeasonsTable />
          </Tab>
          <Tab eventKey="add" title="Add">
            <SeasonsForm />
          </Tab>
        </Tabs>
      </main>
    );
  }
}
