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
          <Route exact path="/users">
            <Template data="users" />
          </Route>
          <Route exact path="/category">
            <Template data="category" />
          </Route>
          <Route exact path="/productOwner">
            <Template data="productOwner" />
          </Route>
          <Route exact path="/productOwnerNotVerified">
            <Template data="productOwnerNotVerified" />
          </Route>
          <Route exact path="/productOwnerBlocked">
            <Template data="productOwnerBlocked" />
          </Route>
          <Route exact path="/productOwnerDeleted">
            <Template data="productOwnerDeleted" />
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
          <Route exact path="/blogs">
            <Template data="blogs" />
          </Route>
          <Route exact path="/">
            <Template data="dashboard" />
          </Route>
        </Switch>
      </Router>
    );
  }
}
