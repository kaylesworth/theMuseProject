import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CompanyJobOpenings from "../App";
class CompanyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: this.props.location.state.company
    };
  }

  render() {
    const { company } = this.state;
    console.log(company);
    return (
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h2>{company.name}</h2>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h3>Current Job Openings</h3>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <CompanyJobOpenings jobs={company.jobs} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CompanyPage;
