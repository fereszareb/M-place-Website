import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BiTrashAlt, BiPlayCircle, BiRefresh } from "react-icons/bi";
import { Modal, Button, Spinner } from "react-bootstrap";
import api from "./../../config.service";
import convertDate from "./../../function";
const Order = () => {
  // loading icon activation
  const [loading, setLoading] = useState(false);
  //errer validation password
  const [errorValidationPassword, seterrorValidationPassword] = useState("");
  //password input
  const [password, setPassword] = useState("");
  //begin api getAll
  const [users, setUsers] = useState([]);
  const [userConsult, setUserConsult] = useState({});
  const retrieveUsers = async () => {
    const response = await api.get("/Orders");
    return response.data;
  };
  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveUsers();
      if (allUsers) setUsers(allUsers);
    };
    getAllUsers();
  }, []);
  //end api getAll

  // function find user
  function findUser(id) {
    setUserConsult(users.find((user) => user._id === id));
    ConsultShow();
  }

  //function to refresh the componenet
  function refreshPage() {
    window.location.reload(false);
  }
  //varaiable de modal
  const [show, setModifyShow] = useState(false);
  const ConsultClose = () => setModifyShow(false);
  const ConsultShow = () => setModifyShow(true);
  const getProducts = () => {
    let listProduct = [];
    const newJSON = JSON.parse(userConsult.products);
    for (var i = 0; i < newJSON.length - 1; i++) {
      let data = {
        name: newJSON[i].price_data.product_data.name,
        quantity: newJSON[i].quantity,
        price: newJSON[i].price_data.unit_amount,
      };
      listProduct.push(data);
    }
    return listProduct;
  };
  const getTotalPrise = () => {
    const newJSON = JSON.parse(userConsult.products);
    console.log(newJSON[newJSON.length - 1].amount_total);
    return newJSON[newJSON.length - 1].amount_total;
  };
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Admin</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Orders
          </li>
        </ol>
      </nav>

      <div className="cardTemplate shadow-sm">
        <div className="title-cardTemplate">
          <h1>List of Orders</h1>
          <button className="btn" onClick={refreshPage}>
            <BiRefresh />
          </button>
        </div>
        <div className="content-cardTemplate">
          <table>
            <thead>
              <tr>
                <th>
                  <div className="data">Order ID</div>
                </th>
                <th>
                  <div className="data">Client</div>
                </th>
                <th>
                  <div className="data">price</div>
                </th>
                <th>
                  <div className="data">Date</div>
                </th>
                <th>
                  <div className="data">Actions</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>
                      <div className="data">{item._id}</div>
                    </td>
                    <td>
                      <div className="data">{item.clientId}</div>
                    </td>
                    <td>
                      <div className="data">
                        {JSON.parse(item.products[0])[2].amount_total} TND
                      </div>
                    </td>
                    <td>
                      <div className="data">{convertDate(item.createdAt)}</div>
                    </td>
                    <td>
                      <div className="actions">
                        <div
                          className="action"
                          onClick={() => {
                            findUser(item._id);
                          }}
                        >
                          <BiPlayCircle />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        show={show}
        onHide={ConsultClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Name product</th>
                <th>price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {userConsult.products ? (
                <>
                  {getProducts().map((item, key) => {
                    return (
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <th></th>
                    <th>Total</th>
                    <th>{getTotalPrise()} TND</th>
                  </tr>
                </>
              ) : (
                ""
              )}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ConsultClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Order;
