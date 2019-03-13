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

class Companies extends Component {
    constructor(props) {
      super(props);
      this.state = {
        companyList: []
      };
    }
  
    componentDidMount() {
      this.refreshList();
    }
  
    refreshList = () => {
      axios
        .get("http://localhost:8000/api/companies/")
        .then(res => this.setState({ companyList: res.data }))
        .catch(error => console.log(error));
    };
    render() {
      const { companyList } = this.state;
      return (
        <Container>
          <Col md={{ span: 9, offset: 1 }}>
            <CardColumns style={{ padding: "2em" }}>
              {companyList.map(item => (
                <Card className="text-center">
                  <Card.Img
                    variant="top"
                    src={item.logo}
                    class="img-raised rounded img-fluid"
                  />
                  <Card.Body>
                    <Card.Title>
                      <a href={"/companies/" + item.id}>{item.name}</a>
                    </Card.Title>
                    <Card.Text>
                      {item.city} | {item.state}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </CardColumns>
          </Col>
        </Container>
      );
    }
  }

  export default Companies;