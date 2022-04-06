import { Link } from "react-router-dom";
//import ReactEditor from "./../reactEditor.js";
import React, { useState, useEffect } from "react";
import { BiTrashAlt, BiPlayCircle, BiRefresh } from "react-icons/bi";
import { Modal, Button, Spinner } from "react-bootstrap";
import api from "./../../config.service";
import convertDate from "./../../function";
const Users = () => {
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
    const response = await api.get("/Clients");
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

  //function verification password
  const verificationPassword = async () => {
    setLoading(true);
    if (password.length === 0) {
      seterrorValidationPassword("Enter your Password");
    } else if (password.length < 8) {
      seterrorValidationPassword("Password should be at list 8 caractere");
    } else {
      await api
        .post("/api/v1/auth/Admin/verifyPassword", { password: password })
        .then((response) => {
          if (response.data.message) {
            api
              .delete("/Client/" + idDelete)
              .then((response) => {
                PasswordValidClose();
                const newusersList = users.filter((user) => {
                  return user._id !== idDelete;
                });
                setUsers(newusersList);
              })
              .catch((err) => {
                seterrorValidationPassword("Incorrect Password");
              });
          } else {
            seterrorValidationPassword("Password incorrect!");
          }
        })
        .catch((err) => {
          seterrorValidationPassword("Something Wrong!");
        });
    }
    setLoading(false);
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
  //varaiable de modal
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
              <tr>
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
              </tr>
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
                        {item.firstname} {item.lastname}
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
              style={{
                backgroundImage: "url(" + userConsult.profile_img + ")",
              }}
            ></div>
          </div>

          <table className="table mt-3">
            <tbody>
              <tr>
                <td>First Name </td>
                <td>{userConsult.firstname}</td>
              </tr>
              <tr>
                <td>Last Name </td>
                <td>{userConsult.lastname}</td>
              </tr>
              <tr>
                <td>Email </td>
                <td>{userConsult.email}</td>
              </tr>
              <tr>
                <td>Phone Number </td>
                <td>{userConsult.numTel}</td>
              </tr>
              <tr>
                <td>Address </td>
                <td>{userConsult.address}</td>
              </tr>
              <tr>
                <td>Created At </td>
                <td>{convertDate(userConsult.createdAt)}</td>
              </tr>
              <tr>
                <td>Last Update </td>
                <td>{convertDate(userConsult.updatedAt)}</td>
              </tr>
              <tr>
                <td>verified </td>
                <td>{userConsult.verified ? "true" : "false"}</td>
              </tr>
            </tbody>
          </table>
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
          <Button
            variant="danger w-100px"
            disabled={loading}
            onClick={verificationPassword}
          >
            {loading ? (
              <Spinner animation="border" className="loadingIcon" />
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
