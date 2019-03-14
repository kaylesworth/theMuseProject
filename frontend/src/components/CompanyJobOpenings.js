import React, { Component } from "react";
import {
    Card,
    CardDeck,
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
        
        <CardDeck>
          {
          jobs.map(item => (
            <Card border="dark" style={{ width: "18rem", padding:'.5em' }} >
              <Card.Title>
                {item.title}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {item.parent_city} | {item.parent_state}
              </Card.Subtitle>
              <Card.Text><a href={"/jobs/" + item.id}>Click to view</a></Card.Text>
            </Card>
          ))
                }
          </CardDeck>
      );
    }
  }

  export default CompanyJobOpenings;