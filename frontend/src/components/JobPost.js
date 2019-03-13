import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import axios from "axios";
import {
    Container,
    Col,
    CardColumns,
    Card,
    CardDeck,
    Navbar,
    Nav,
    Row,
    Image,
    Button,
    CardGroup
  } from "react-bootstrap";
  
class JobPost extends Component {
    constructor(props) {
      super(props);
      this.state = {
        job: []
      }
      this.getJob = this.getJob.bind(this);
    }
  
    getJob (){
      let jobId = this.props.match.params.id;
      axios
        .get("http://localhost:8000/api/jobs/"+jobId)
        .then(res => this.setState({ job: res.data }))
        .catch(error => console.log(error)); 
    }
  
    componentDidMount(){
      if (typeof(this.props.location.state) == 'undefined'){
        this.getJob()
      } else {
        this.setState({ job: this.props.location.state.job });
      }
    }
    
    render() {    
      
      const {
        job
      } = this.state;
      return (
        <Container>
          <Row style={{ padding: "2em" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <h2>{job.title}</h2>
              <h4>
                <a href={"/companies/" + job.parent_id}>{job.parent_name} </a>
                 | {job.parent_city}, {job.parent_state}
              </h4>
            </Col>
            <Col md={{ span: 1, offset: 11 }}>
              <Button variant="primary" href={job.apply_link}>
                Apply
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <p>{job.description}</p>
            </Col>
          </Row>
        </Container>
      );
    }
  }

  export default JobPost;