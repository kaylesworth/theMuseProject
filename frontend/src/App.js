import React, { Component } from 'react';
import axios from 'axios';
import {Navbar, Nav, Jumbotron, Container, Row, Col, Media} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          
          <div>
          <Header />
            <Route exact path="/" component={Index}/>
            <Route exact path="/companies" component={Companies}/>
            <Route exact path="/companies/:id" component={CompanyPage}/>
            <Route path="/jobs/" component={Jobs}/>
            
          </div>
        </Router>
        
      </div>
    );
  }
}


class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobList: []
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/jobs/")
      .then(res => this.setState({ jobList : res.data}))
      .then(console.log('Accessed Job API'))
      .catch(error => console.log(error));
  }; 
  render() {
    const {
      jobList
    } = this.state;
    return (
      <Container>
        <Row>
        <Col>
          <Sidebar jobList={jobList}/>
        </Col>
        <Col xs={10}>
          <JobListings jobList={jobList}/>
        </Col>
        </Row>
        
      </Container>
    )
  }
}

class JobListings extends Component{
  render(){
    const {
      jobList
    } = this.props;
    return (
      <ul className="list-unstyled">
        {jobList.map(item =>
          <Media as="li">
            <img width={64}
                 className="mr-3"
                 src={item.parent_logo}
                 alt="Generic placeholder"/>
            <Media.Body>
              <h4>{item.title}</h4>
              <h6>{item.parent_name} | {item.parent_city}, {item.parent_state}</h6>
              <p></p>
            </Media.Body>
          </Media>  
        )}
      </ul>
    );
  }
}


class Index extends Component {
  render(){
    return(
      <div>
        <h1>
          About Us
        </h1>
        <p>We are the muses</p>

        <h2>Meet the team</h2>

      </div>
    )
  }
}
class Companies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      companyList: [],
      match: this.props.match.params
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/companies/")
      .then(res => this.setState({ companyList : res.data}))
      .then(console.log('Accessed Company API'))
      .catch(error => console.log(error));
  }; 
  render(){
    const {
      companyList,
      match
    } = this.state;
    return (
        companyList.map(item => (
        <Jumbotron fluid>
          <Link to={{pathname:'/companies/'+item.id,
                     state: { company: item}
                    }}>{item.name}</Link>
                    
          <p>{item.city}, {item.state}</p>
          
        </Jumbotron>
      ))
      
    )
  }
}

class Topic extends Component {

}

class CompanyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: this.props.location.state.company
    }
  }

  render(){
    const {
      company
    } = this.state
    console.log(company);
    return (
      <div>
        <h2>{company.name}</h2>
      </div>
    );
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


class Sidebar extends Component {
  render() {
    const {
      jobList
    } = this.props;
    return (
      <div>
        <h2>Sidebar</h2>
      </div>
    )
  }
}

export default App;
