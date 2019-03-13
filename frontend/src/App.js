import React, { Component } from "react";
import axios from "axios";
import {
  Navbar,
  Nav,
  Jumbotron,
  Container,
  Row,
  Col,
  Media,
  Modal,
  Button,
  CardColumns,
  Card,
  CardGroup
} from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header />
            <Route exact path="/" component={Index} />
            <Route exact path="/companies" component={Companies} />
            <Route exact path="/companies/:id" component={CompanyPage} />
            <Route exact path="/jobs/" component={Jobs} />
            <Route exact path="/jobs/:id" component={JobPost}/>
          </div>
        </Router>
      </div>
    );
  }
}
class Index extends Component {
  render() {
    return (
      <div>
        <h1>About Us</h1>
        <p>We are the muses</p>

        <h2>Meet the team</h2>
      </div>
    );
  }
}

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
      .then(console.log("Accessed Company API"))
      .catch(error => console.log(error));
  };
  render() {
    const { companyList } = this.state;
    return (
      <Container>
        <Col md={{ span: 10, offset: 1 }}>
          <CardColumns>
            {companyList.map(item => (
              <NavLink
                activeStyle={{textDecoration: 'none'}}
                to={{
                  pathname: "/companies/" + item.id,
                  state: { company: item }
                }}
              >
                <Card className="text-center">
                  <Card.Img variant="top" src={item.logo} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.city} | {item.state}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </NavLink>
            ))}
          </CardColumns>
        </Col>
      </Container>
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
      .then(res => this.setState({ jobList: res.data }))
      .then(console.log("Accessed Job API"))
      .catch(error => console.log(error));
  };
  render() {
    const { jobList } = this.state;
    return (
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 3 }}>
            <JobListings jobList={jobList} />
          </Col>
        </Row>
      </Container>
    );
  }
}

class JobListings extends Component {
  render() {
    const { jobList } = this.props;
    return (
      <ul className="list-unstyled">
        {jobList.map(item => (
          <Media as="li">
            <img
              width={64}
              className="mr-3"
              src={item.parent_logo}
              alt="Generic placeholder"
            />
            <Media.Body>
            <NavLink
                activeStyle={{textDecoration: 'none'}}
                to={{
                  pathname: "/jobs/" + item.id,
                  state: { job : item }
                }}
              >
              <h4 style={{textDecoration: 'none'}}>{item.title}</h4></NavLink>
              <h6>
                {item.parent_name} | {item.parent_city}, {item.parent_state}
              </h6>
              <p />
            </Media.Body>
          </Media>
        ))}
      </ul>
    );
  }
}

class CompanyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: this.props.location.state.company
    };
  }

  render() {
    const { company } = this.state;
    console.log(company);
    return (
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h2>{company.name}</h2>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h3>Current Job Openings</h3>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <CompanyJobOpenings jobs={company.jobs} />
          </Col>
        </Row>
      </Container>
    );
  }
}
class CompanyJobOpenings extends Component {
  render() {
    const { jobs } = this.props;
    return (
      <CardGroup>
        {jobs.map(item => (
          <Card style={{ width: "18rem" }}>
            <Card.Title>
            <NavLink
                activeStyle={{textDecoration: 'none'}}
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
      </CardGroup>
    );
  }
}

class JobPost extends Component {
  constructor(props){
    super(props);
    this.state = {
      job: this.props.location.state.job
    };
  }
  render() {
    const {
      job
    } = this.state;
    return (
      <Container>
        <Col md={{ span: 6, offset: 3 }}>
          <h2>{job.title}</h2>
          <h4>{job.parent_city} | {job.parent_state}</h4>
          <p>{job.description}</p>
        </Col>
      </Container>
    )
  }
}

export default App;
