import React, { Component } from "react";
import axios from "axios";
import { Container, Col, CardColumns, Row, Card } from "react-bootstrap";
import { BrowserRouter as NavLink } from "react-router-dom";
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
