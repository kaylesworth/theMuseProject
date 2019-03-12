import React, { Component } from 'react';
import axios from 'axios';
import {Navbar, Nav, Card, Jumbotron} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          
          <div>
          <Header />
            <Route exact path="/" component={Index}/>
            <Route path="/companies/" component={Companies}/>
            <Route path="/jobs/" component={Jobs}/>
          </div>
        </Router>
        
      </div>
    );
  }
}

class Jobs extends Component {
  render() {
    return (
      <div>
        <h3>Jobs</h3>
      </div>
    )
  }
}

class CompanyPage extends Component{
  render() {
    return (
      <div>
        <h2>Company Name</h2>
      </div>
    )
  }
}

class Index extends Component {
  render(){
    return(
      <div>
        <h1>
          Home
        </h1>
      </div>
    )
  }
}
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
      .then(res => this.setState({ companyList : res.data}))
      .catch(error => console.log(error));
  }; 
  render(){
    const {
      companyList
    } = this.state;
    return (
      companyList.map(item=> (
        <Jumbotron fluid>
          <h1>{item.name}</h1>
          <p>{item.city}, {item.state}</p>
        </Jumbotron>
      ))
    )
  }
}

class Header extends Component {

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand href="#home">The Muses</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/jobs">Jobs</Nav.Link>
              <Nav.Link href="/companies/">Companies</Nav.Link>
              {/*
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            
              */}
            
          </Nav>
          {/*
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
          */}
          
        </Navbar.Collapse>
      </Navbar>

      
    );
  }
}

class Content extends Component {

  render() {
    return (
      <div>
        <p>Content</p>
      </div>
    );
  }
}

class Sidebar extends Component {
  render() {
    return (
      <div>
        <h2>Sidebar</h2>
      </div>
    )
  }
}

export default App;
