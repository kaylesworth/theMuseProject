import React, {Component} from 'react';
import axios from "axios";
import {
  Container,
  Row,
} from "react-bootstrap";

import JobListings from "./JobListings";

class Jobs extends Component {
    constructor(props) {
      super(props);
      this.state = {
        jobList: [],
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
      var job = jobList[Math.floor(Math.random()*jobList.length)];
      console.log(job)
      return (
        <Container>
          <Row>
              <JobListings jobList ={jobList}/>
          </Row>
        </Container>
      );
    }
  }

export default Jobs;