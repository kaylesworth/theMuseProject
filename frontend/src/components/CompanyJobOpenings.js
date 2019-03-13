import React, { Component } from "react";
import {
  Card,
  CardDeck
} from "react-bootstrap";
import { BrowserRouter as NavLink } from "react-router-dom";

class CompanyJobOpenings extends Component {
    render() {
      const { jobs } = this.props;
      return (
        <CardDeck>
          {jobs.map(item => (
            <Card border="dark" style={{ width: "18rem" }}>
              <Card.Title>
              <NavLink
                  to={{
                    pathname: "/jobs/" + item.id,
                    state: { job : item }
                  }}
                >{item.title}</NavLink>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {item.parent_city} | {item.parent_state}
              </Card.Subtitle>
              <Card.Text>Description</Card.Text>
            </Card>
          ))}
        </CardDeck>
      );
    }
  }

  export default CompanyJobOpenings;