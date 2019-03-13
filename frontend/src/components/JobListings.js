import React, { Component } from "react";
import {
    Col,
    Card,
    Image
  } from "react-bootstrap";

class JobListings extends Component {
    render() {
      const { jobList } = this.props;
      return (
          <Col md={{ span: 10, offset: 1}} >
          {jobList.map(item => (
                <Card bg="light" style={{ margin: '1em' }}>
                  <Card.Header>
                    <div style={{overflow: 'auto' }}>
                      <div style={{ clear: 'left' }}>
                      <h4 >
                        {item.title}
                      </h4>
                      <h6 style={{ float: 'left' }}>{item.parent_name} | {item.parent_city} | {item.parent_state}</h6>
                      </div>
                    
                    <Image style={{ float: 'right', width: 64}} src={item.parent_logo} rounded/>
                    </div>
                  
                  </Card.Header>
                  <Card.Body>
                    Description
                  </Card.Body>
                </Card>
          ))}
          </Col>
          
          
          
      );
    }
  }

export default JobListings;