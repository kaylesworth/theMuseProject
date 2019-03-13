import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";

class JobPost extends Component {
    constructor(props){
      super(props);
      this.state = {
        job: this.props.location.state.job
      };
    }
    render() {
      const {
        job
      } = this.state;
      return (
        <Container>
          <Row style={{ padding: '2em'}}>
          <Col md={{ span: 6, offset: 3 }}>
            <h2>{job.title}</h2>
            <h4>{job.parent_city} | {job.parent_state}</h4>
          </Col>
          <Col md={{ span:1, offset: 11}} >
            <Button variant="primary" href={job.apply_link}>Apply</Button>
          </Col>
          </Row>
          <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <p>{job.description}</p>
          </Col>
          </Row>
          
        </Container>
      )
    }
  }

  export default JobPost;