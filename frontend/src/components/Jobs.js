import React, { Component } from "react";
import axios from "axios";
import {
    Container,
    Row,
    Col,
  } from "react-bootstrap";
import JobListings from "./JobListings";

class Jobs extends Component {
    constructor(props) {
      super(props);
      this.state = {
        jobList: []
      };
    }
  
    componentDidMount() {
      this.refreshList();
    }
  
    refreshList = () => {
      axios
        .get("http://localhost:8000/api/jobs/")
        .then(res => this.setState({ jobList: res.data }))
        .then(console.log("Accessed Job API"))
        .catch(error => console.log(error));
    };
    render() {
      const { jobList } = this.state;
      return (
        <Container>
          <Row>
          <Col md={{ span: 1}} >
            <p>Sidebar</p>
          </Col>
            <JobListings jobList={jobList} />
          </Row>
              
        </Container>
      );
    }
  }

  export default Jobs;