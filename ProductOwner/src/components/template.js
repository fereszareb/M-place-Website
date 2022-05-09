import logo from "./../logo.svg";
import React, { Component } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { Link } from "react-router-dom";
import Products from "./Admin/product";
import Events from "./Admin/events";
import DashboardAdmin from "./Admin/dashboard";
import Messages from "./Admin/message";
import Reports from "./Admin/report";
import Profile from "./Admin/profile.js";
import "bootstrap/dist/js/bootstrap.js";
function menuClick() {
  const elementContent = document.querySelector(".content");
  const element = document.querySelector(".sidebar");
  if (element.classList.contains("activeSideBar")) {
    element.classList.remove("activeSideBar");
    elementContent.classList.remove("contentFull");
  } else {
    element.classList.add("activeSideBar");
    elementContent.classList.add("contentFull");
  }
}
export default class Template extends Component {
  render() {
    const content = () => {
      switch (this.props.data) {
        case "product":
          return <Products />;
        case "dashboard":
          return <DashboardAdmin />;
        case "messages":
          return <Messages />;
        case "reports":
          return <Reports />;
        case "events":
          return <Events />;
        case "profile":
          return <Profile />;

        default:
          return <h1>No project match</h1>;
      }
    };
    return (
      <div className="template">
        <div className="sidebar">
          <div className="logoTemplate">
            <img src={logo} alt="" />
          </div>
          <div className="items">
            <ul>
              <li
                className={
                  window.location.pathname.split("/")[1] === "dashboard" ||
                  window.location.pathname.split("/")[1] === ""
                    ? "item active"
                    : "item"
                }
              >
                <Link to="/dashboard">
                  <p>Dashboard</p>
                </Link>
              </li>
              <li
                className={
                  window.location.pathname.split("/")[1] === "product"
                    ? "item active"
                    : "item"
                }
              >
                <Link to="/product">
                  <p>Products</p>
                </Link>
              </li>

              <li
                className={
                  window.location.pathname.split("/")[1] === "messages"
                    ? "item active"
                    : "item"
                }
              >
                <Link to="/messages">
                  <p>Messages</p>
                </Link>
              </li>

              <li
                className={
                  window.location.pathname.split("/")[1] === "reports"
                    ? "item active"
                    : "item"
                }
              >
                <Link to="/reports">
                  <p>Reports</p>
                </Link>
              </li>

              <li
                className={
                  window.location.pathname.split("/")[1] === "orders"
                    ? "item active"
                    : "item"
                }
              >
                <Link to="/orders">
                  <p>Orders</p>
                </Link>
              </li>

              <li
                className={
                  window.location.pathname.split("/")[1] === "profile"
                    ? "item active"
                    : "item"
                }
              >
                <Link to="/profile">
                  <p>Profile</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="content">
          <div className="navbarTemplate">
            <div className="iconMenu" onClick={menuClick}>
              <AiOutlineMenuUnfold />
            </div>
          </div>
          <div className="ContentTemplate">{content()}</div>
        </div>
      </div>
    );
  }
}
