import { Link } from "react-router-dom";
//import ReactEditor from "./../reactEditor.js";
import React, { useState, useEffect } from "react";
import { BiTrashAlt, BiPlayCircle, BiRefresh } from "react-icons/bi";
import { Modal, Button } from "react-bootstrap";
import api from "./../../config.service";

const Users = () => {
  //errer validation password
  const [errorValidationPassword, seterrorValidationPassword] = useState("");
  //password input
  const [password, setPassword] = useState("");
  //begin api getAll
  const [users, setUsers] = useState([]);
  const [userConsult, setUserConsult] = useState({});
  const retrieveUsers = async () => {
    const response = await api.get("/Client/Verified");
    console.log(response.data);
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
  //Convert isoDate to normal date
  function convertDate(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var secandes = date.getSeconds();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;
    if (secandes < 10) secandes = "0" + secandes;
    return (
      day +
      "-" +
      month +
      "-" +
      year +
      " " +
      hour +
      ":" +
      minute +
      ":" +
      secandes
    );
  }

  //function verification password
  const verificationPassword = async () => {
    if (password.length === 0) {
      seterrorValidationPassword("Enter your Password");
      console.log(password);
    } else if (password.length < 8) {
      seterrorValidationPassword("Password should be at list 8 caractere");
      console.log(password);
    } else {
      await api
        .get("/verififcationPassword", { password: password })
        .then((response) => {
          api
            .post("/deleteUser/" + idDelete)
            .then((response) => {
              PasswordValidClose();
              const newusersList = users.filter((user) => {
                return user.id !== idDelete;
              });

              setUsers(newusersList);
            })
            .catch((err) => {
              seterrorValidationPassword("Incorrect Password");
              console.log(err);
            });
        })
        .catch((err) => {
          seterrorValidationPassword("erreru");
          // console.log(password);
          // console.log(err);
          const newusersList = users.filter((user) => {
            return user.id !== idDelete;
          });
          setUsers(newusersList);
          PasswordValidClose();
        });
    }
  };
  //function to get Password
  function getPassword(val) {
    seterrorValidationPassword("");
    setPassword(val.target.value);
  }
  //function to refresh the componenet
  function refreshPage() {
    window.location.reload(false);
  }
  const [show, setModifyShow] = useState(false);
  const ConsultClose = () => setModifyShow(false);
  const ConsultShow = () => setModifyShow(true);

  const [showPasswordValid, setPasswordValidShow] = useState(false);
  const PasswordValidClose = () => {
    setPasswordValidShow(false);
    setPassword("");
    seterrorValidationPassword("");
  };
  const PasswordValidShow = () => setPasswordValidShow(true);

  const [showDelete, setDeleteShow] = useState(false);
  const DeleteClose = () => setDeleteShow(false);
  const [idDelete, setIdDelete] = useState(0);
  const DeleteShow = (id) => {
    setDeleteShow(true);
    setIdDelete(id);
  };
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Admin</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Users
          </li>
        </ol>
      </nav>

      <div className="cardTemplate shadow-sm">
        <div className="title-cardTemplate">
          <h1>List of users</h1>
          <button className="btn" onClick={refreshPage}>
            <BiRefresh />
          </button>
        </div>
        <div className="content-cardTemplate">
          <table>
            <thead>
              <th>
                <div className="data"></div>
              </th>
              <th>
                <div className="data">Full name</div>
              </th>
              <th>
                <div className="data">Phone</div>
              </th>
              <th>
                <div className="data">Creation date</div>
              </th>
              <th>
                <div className="data">Actions</div>
              </th>
            </thead>
            <tbody>
              {users.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>
                      <div className="data">
                        <div
                          className="picture"
                          style={{
                            backgroundImage: "url(" + item.profile_img + ")",
                          }}
                        ></div>
                      </div>
                    </td>
                    <td>
                      <div className="data">
                        {item.name} {item.lastName}
                      </div>
                    </td>
                    <td>
                      <div className="data">{item.numTel}</div>
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
                        <div
                          className="action"
                          onClick={() => {
                            DeleteShow(item._id);
                          }}
                        >
                          <BiTrashAlt />
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
          <Modal.Title>Consult user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="w-100 text-center">
            <div
              className="avatar m-auto"
              /* style={{ backgroundImage: "url(" + userConsult.avatar + ")" }}*/
            ></div>
          </div>
          <div className="tableOfData mt-3">
            <table className="w-100">
              <tr>
                <th>First Name :</th>
                <td>{userConsult.name}</td>
              </tr>
              <tr>
                <th>Last Name :</th>
                <td>{userConsult.lastName}</td>
              </tr>
              <tr>
                <th>Email :</th>
                <td>{userConsult.email}</td>
              </tr>
              <tr>
                <th>Phone Number :</th>
                <td>{userConsult.numTel}</td>
              </tr>
              <tr>
                <th>Adress :</th>
                <td>{userConsult.location}</td>
              </tr>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ConsultClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showDelete}
        onHide={DeleteClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>You wanna really delete ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={DeleteClose}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              DeleteClose();
              PasswordValidShow();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showPasswordValid}
        onHide={PasswordValidClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confiramation Of password</Modal.Title>
        </Modal.Header>
        <Modal.Body className="validationPassword">
          <input
            type="password"
            placeholder="Enter Your Password"
            onChange={getPassword}
          />
          <p className="messageError">{errorValidationPassword}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={PasswordValidClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={verificationPassword}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
