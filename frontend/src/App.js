import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "./App.css";
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

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/companies" component={Companies} />
            <Route exact path="/companies/:id" component={CompanyPage} />
            <Route exact path="/jobs/" component={Jobs} />
            <Route exact path="/jobs/:id" component={JobPost} />
          </div>
        </Router>
      </div>
    );
  }
}
class Home extends Component {
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
                    <NavLink
                      to={{
                        pathname: "/companies/" + item.id,
                        state: { company: item }
                      }}
                    >
                      {item.name}
                    </NavLink>
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

class CompanyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: [],
      jobs: []
    };

    this.getCompany = this.getCompany.bind(this);
  }

  getCompany (){
    let companyId = this.props.match.params.id;
    console.log('Get Company called');
    axios
      .get("http://localhost:8000/api/companies/"+companyId)
      .then(res => this.setState({ company: res.data }))
      .catch(error => console.log(error));
    
  }

  componentDidMount(){
    if (typeof(this.props.location.state) == 'undefined'){
      this.getCompany();
    } else {
      this.setState({ company: this.props.location.state.company });
    }
    
  }

  render() {
    console.log('Company props');
    console.log(this.props);
    console.log('Company state');
    console.table(this.state);
    const { company, jobs } = this.state;
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
          </Col>
        </Row>
      </Container>
    );
  }
}

class CompanyJobOpenings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      jobs: this.props.jobs
    }
  }
  render() {
    console.log(this.props);
    const{
      jobs
    } = this.state;
    return (
      <CardGroup>
        {
        jobs.map(item => (
          <Card border="dark" style={{ width: "18rem" }}>
            <Card.Title>
              <NavLink
                to={{
                  pathname: "/jobs/" + item.id,
                  state: { job: item }
                }}
              >
                {item.title}
              </NavLink>
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
          <Col md={{ span: 1 }}>
            <p>Sidebar</p>
          </Col>
          <JobListings jobList={jobList} />
        </Row>
      </Container>
    );
  }
}

class JobListings extends Component {
  render() {
    const { jobList } = this.props;
    return (
      <Col md={{ span: 10, offset: 1 }}>
        {jobList.map(item => (
          <Card bg="light" style={{ margin: "1em" }}>
            <Card.Header>
              <div style={{ overflow: "auto" }}>
                <div style={{ clear: "left" }}>
                  <h4>
                  <NavLink
                      to={{
                        pathname: "/jobs/" + item.id,
                        state: { job: item }
                      }}
                    >
                      {item.title}
                    </NavLink>
                  </h4>
                  <h6 style={{ float: "left" }}>
                    {item.parent_name} | {item.parent_city} |{" "}
                    {item.parent_state}
                  </h6>
                </div>

                <Image
                  style={{ float: "right", width: 64 }}
                  src={item.parent_logo}
                  rounded
                />
              </div>
            </Card.Header>
            <Card.Body>Description</Card.Body>
          </Card>
        ))}
      </Col>
    );
  }
}

class JobPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: []
    }
    this.getJob = this.getJob.bind(this);
  }

  getJob (){
    let jobId = this.props.match.params.id;
    axios
      .get("http://localhost:8000/api/jobs/"+jobId)
      .then(res => this.setState({ job: res.data }))
      .catch(error => console.log(error)); 
  }

  componentDidMount(){
    if (typeof(this.props.location.state) == 'undefined'){
      this.getJob()
    } else {
      this.setState({ job: this.props.location.state.job });
    }
  }
  
  render() {    
    
    const {
      job
    } = this.state;
    return (
      <Container>
        <Row style={{ padding: "2em" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <h2>{job.title}</h2>
            <h4>
              <a href={"/companies/" + job.parent_id}>{job.parent_name} </a>
               | {job.parent_city}, {job.parent_state}
            </h4>
          </Col>
          <Col md={{ span: 1, offset: 11 }}>
            <Button variant="primary" href={job.apply_link}>
              Apply
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <p>{job.description}</p>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default App;
