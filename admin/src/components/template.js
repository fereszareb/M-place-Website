import logo from "./../logo.svg";
import React, { Component } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { Link } from "react-router-dom";
import Users from "./Admin/users";
import Products from "./Admin/product";
import DashboardAdmin from "./Admin/dashboard";
import ProductOwnerNotVerified from "./Admin/productOwner/ProductOwnerNotVerified";
import ProductOwnerBlocked from "./Admin/productOwner/ProductOwnerBlocked";
import ProductOwnerDeleted from "./Admin/productOwner/ProductOwnerDeleted";
import Messages from "./Admin/message";
import Order from "./Admin/order";
import Category from "./Admin/category";
import ProductOwner from "./Admin/productOwner/ProductOwner";
import { BiSubdirectoryRight } from "react-icons/bi";
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
        case "users":
          return <Users />;
        case "category":
          return <Category />;
        case "productOwner":
          return <ProductOwner />;
        case "productOwnerNotVerified":
          return <ProductOwnerNotVerified />;
        case "productOwnerBlocked":
          return <ProductOwnerBlocked />;
        case "productOwnerDeleted":
          return <ProductOwnerDeleted />;
        case "messages":
          return <Messages />;
        case "order":
          return <Order />;

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
                  <p>Product</p>
                </Link>
              </li>

              <li
                className={
                  window.location.pathname.split("/")[1] === "users"
                    ? "item active"
                    : "item"
                }
              >
                <Link to="/users">
                  <p>Users</p>
                </Link>
              </li>

              <li
                className={
                  window.location.pathname.split("/")[1] === "category"
                    ? "item active"
                    : "item"
                }
              >
                <Link to="/category">
                  <p>Category</p>
                </Link>
              </li>

              <li
                className={
                  [
                    "productOwner",
                    "productOwnerNotVerified",
                    "productOwnerBlocked",
                  ].includes(window.location.pathname.split("/")[1])
                    ? "item active"
                    : "item"
                }
              >
                <p data-bs-toggle="collapse" data-bs-target="#productOwner">
                  Product Owner
                </p>
                <div className="collapse" id="productOwner">
                  <ul>
                    <li>
                      <Link to="/productOwner">
                        <p>
                          <BiSubdirectoryRight /> All Product Owner
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/productOwnerNotVerified">
                        <p>
                          <BiSubdirectoryRight /> PO not verified
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/productOwnerBlocked">
                        <p>
                          <BiSubdirectoryRight /> PO blocked
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/productOwnerDeleted">
                        <p>
                          <BiSubdirectoryRight /> PO Deleted
                        </p>
                      </Link>
                    </li>
                  </ul>
                </div>
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
                  window.location.pathname.split("/")[1] === "order"
                    ? "item active"
                    : "item"
                }
              >
                <Link to="/order">
                  <p>Orders</p>
                </Link>
              </li>
              <li
                className={
                  window.location.pathname.split("/")[1] === "settings"
                    ? "item active"
                    : "item"
                }
              >
                <Link to="/settings">
                  <p>Settings</p>
                </Link>
              </li>
              <li>
                <Link>
                  <p>Logout</p>
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
