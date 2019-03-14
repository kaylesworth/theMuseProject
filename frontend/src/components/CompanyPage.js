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
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import LinkedIn from "../resources/img/linkedin-logo.png";
import Facebook from "../resources/img/facebook-logo.png";
import Twitter from "../resources/img/twitter-logo.png";

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
        <Container style={{background: '#fff', borderRadius: '0 0 25px 25px'}}>
          <Row>
            <Col md={{ span: 1}}>
              <Image src={company.logo} height={50}/>
            </Col>
            <Col md={{ span: 6, offset: 2 }}>
              <h2 style={{textAlign: "center"}}>{company.name}</h2>
            </Col>
            
          </Row>
          <Row style={{textAlign: "center"}}>
            <Col md={{ span: 6, offset: 3}}>
            <a href={company.linkedin}><img src={LinkedIn} alt="LinkedIn Logo" height={30}/></a>
            <a href={company.facebook}><img src={Facebook} alt="Facebook Logo" height={30}/></a>
            <a href={company.twitter}><img src={Twitter} alt="Twitter Logo" height={30}/></a>
            </Col>
          </Row>
          <Row style={{padding: ".5em"}}>
            <Col md={{ span: 6, offset: 3 }}>
              <h3>Current Job Openings:</h3>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 6, offset: 3 }} >
              <CompanyJobOpenings jobs={company.jobs}/>
            </Col>
          </Row>
        </Container>
      );
    }
  }

  export default CompanyPage;