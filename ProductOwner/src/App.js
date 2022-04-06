import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import "./css/templatePanel.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/components.css";
import Template from "./components/template";
import Redirect from "./components/redirect";
export default class Responsive extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/Redirect/:token/:refreshToken">
            <Redirect />
          </Route>
          <Route exact path="/product">
            <Template data="product" />
          </Route>
          <Route exact path="/dashboard">
            <Template data="dashboard" />
          </Route>
          <Route exact path="/messages">
            <Template data="messages" />
          </Route>
          <Route exact path="/reports">
            <Template data="reports" />
          </Route>
          <Route exact path="/events">
            <Template data="events" />
          </Route>
          <Route exact path="/profile">
            <Template data="profile" />
          </Route>
          <Route exact path="/">
            <Template data="dashboard" />
          </Route>
        </Switch>
      </Router>
    );
  }
}
