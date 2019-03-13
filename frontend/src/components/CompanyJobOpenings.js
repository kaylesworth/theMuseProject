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
  
class CompanyJobOpenings extends Component {
    state ={ jobs: []}
  
    componentWillReceiveProps(newProps){
      this.setState({ jobs: newProps.jobs });
    }
    render() {
      const{
        jobs
      } = this.state;
      return (
        
        <CardGroup>
          {
          jobs.map(item => (
            <Card border="dark" style={{ width: "18rem" }}>
              <Card.Title>
                <a href={"/jobs/" + item.id}>{item.title}</a>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {item.parent_city} | {item.parent_state}
              </Card.Subtitle>
              <Card.Text>Description</Card.Text>
            </Card>
          ))
                }
          </CardGroup>
      );
    }
  }

  export default CompanyJobOpenings;