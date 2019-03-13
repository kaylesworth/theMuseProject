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

import CompanyJobOpenings from "./CompanyJobOpenings";

class CompanyPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        company: []
      };
  
      this.getCompany = this.getCompany.bind(this);
    }
  
    getCompany (){
      let companyId = this.props.match.params.id;
      console.log('Get Company called');
      axios
        .get("http://localhost:8000/api/companies/"+companyId)
        .then(res => this.setState({ company: res.data }))
        .catch(error => console.log(error));
      
    }
  
    componentDidMount(){
      if (typeof(this.props.location.state) == 'undefined'){
        this.getCompany();
      } else {
        this.setState({ company: this.props.location.state.company });
      }
      
    }
  
    render() {
      const { company } = this.state;
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
              <CompanyJobOpenings jobs={company.jobs}/>
            </Col>
          </Row>
        </Container>
      );
    }
  }

  export default CompanyPage;