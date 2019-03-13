import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { BrowserRouter as NavLink } from "react-router-dom";

class CompanyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          company: this.props.company
        };
      }
    render(){
        const {
            company
        } = this.state
        return (
            <Card className="text-center">
                <Card.Img
                  variant="top"
                  src={company.logo}
                  class="img-raised rounded img-fluid"
                />
                <Card.Body>
                  <Card.Title>
                    <NavLink
                      activeStyle={{ textDecoration: "none" }}
                      to={{
                        pathname: "/companies/" + company.id,
                        state: { company: company }
                      }}
                    >
                      {company.name}
                    </NavLink>
                  </Card.Title>
                  <Card.Text>
                    {company.city} | {company.state}
                  </Card.Text>
                </Card.Body>
              </Card>
        )
    }

}

export default CompanyCard;