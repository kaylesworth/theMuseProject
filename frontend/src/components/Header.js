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
  
class Header extends Component {
    render() {
      return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
          <Navbar.Brand href="/">The Muses</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/jobs">Jobs</Nav.Link>
              <Nav.Link href="/companies/">Companies</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
  }

  export default Header;