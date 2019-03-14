import React, { Component } from "react";
import { Jumbotron, Container, Col, CardDeck, Card, Button } from "react-bootstrap";

class Home extends Component {
  render() {
    return (
    <div class="grid-container">
      <div class="bottomBanner">
        
        <CardDeck>
          <a href="/jobs/" style={{ textDecoration: "none"}}>
          <Card border="light" style={{ width: '18rem', height: '10rem', top: '75px' }}>
          Jobs
        </Card></a>
        
        <a href="/companies/" style={{ textDecoration: "none"}}>
          <Card border="light" style={{ width: '18rem', height: '10rem', top: '75px'}}>
          Companies
        </Card></a>
        </CardDeck>
      </div>
      <div class="mainBanner">
      <h2>The Muse</h2>
      <h4>Find your dream job with us</h4></div>
    </div>
    )
  }
}

export default Home;
