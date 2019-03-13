import React, { Component } from "react";
import axios from "axios";
import { Container, Col, CardColumns } from "react-bootstrap";
import CompanyCard from "./CompanyCard";

class CompanyListings extends Component{

    render(){
        const {
            companyList
        } = this.props;
        return (
                <CardColumns style={{ padding: "2em" }}>
                    {companyList.map(item => (
                    <CompanyCard company={item}/>
                    ))}
                </CardColumns>
            
        );
    }
}

export default CompanyListings;