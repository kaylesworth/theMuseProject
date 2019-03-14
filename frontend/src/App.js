import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./resources/css/bootstrap/bootstrap.css";
import "./App.css";

import Home from './components/Home';
import Jobs from "./components/Jobs";
import CompanyPage from "./components/CompanyPage";
import Header from "./components/Header";
import Companies from "./components/Companies";
import JobPost from "./components/JobPost";

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

export default App;
