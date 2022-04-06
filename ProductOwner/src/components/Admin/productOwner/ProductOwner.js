import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BiXCircle, BiPlayCircle } from "react-icons/bi";
import { BiBlock } from "react-icons/bi";
import { Modal, Button, Spinner } from "react-bootstrap";
import api from "./../../../config.service";
import convertDate from "./../../../function";

const ProductOwner = () => {
  //modal details
  const [showDetails, setDetailsShow] = useState(false);
  const DetailsClose = () => setDetailsShow(false);
  const DetailsShow = () => setDetailsShow(true);

  // modal Delete
  const [showDelete, setDeleteShow] = useState(false);
  const DeleteClose = () => setDeleteShow(false);
  const DeleteShow = () => setDeleteShow(true);

  //Modal Block
  const [showBlock, setBlockShow] = useState(false);
  const BlockClose = () => setBlockShow(false);
  const BlockShow = () => setBlockShow(true);

  //id for the fonctionality of Modal
  const [POToDelete, setPOToDelete] = useState(0);
  const [POToBlock, setPOToBlock] = useState(0);
  const [RDVID, setRDVID] = useState(0);

  //data of modal detils
  const [POConsult, setPOConsult] = useState({});
  // function find PO
  function findPO(id) {
    setPOConsult(POs.find((user) => user._id === id));
    DetailsShow();
  }
  // loading icon activation
  const [loading, setLoading] = useState(false);
  // action (Block or Delete)
  const [Action, setAction] = useState(true);
  //errer validation password
  const [errorValidationPassword, seterrorValidationPassword] = useState("");
  //password input
  const [password, setPassword] = useState("");

  const PasswordValidShow = () => setPasswordValidShow(true);
  const [showPasswordValid, setPasswordValidShow] = useState(false);
  const PasswordValidClose = () => {
    setPasswordValidShow(false);
    setPassword("");
    seterrorValidationPassword("");
  };

  function SendRDV() {
    if (RDVID !== 0) {
      api
        .patch("/sendRDV/" + RDVID)
        .then((response) => {
          PasswordValidClose();
          setRDVID(0);
        })
        .catch((err) => {
          seterrorValidationPassword("Something Wrong!");
        });
    }
  }

  function DeletePO() {
    if (POToDelete !== 0) {
      api
        .patch("/POs/Delete/" + POToDelete)
        .then((response) => {
          PasswordValidClose();
          const newPOList = POs.filter((user) => {
            return user._id !== POToDelete;
          });
          setPOs(newPOList);
          setPOToDelete(0);
          BlockClose();
        })
        .catch((err) => {
          seterrorValidationPassword("Something Wrong!");
        });
    }
  }
  function BlockPO() {
    if (POToBlock !== 0) {
      //api Delete with id of POToDelete

      api
        .patch("/POs/Block/" + POToBlock)
        .then((response) => {
          PasswordValidClose();
          const newPOList = POs.filter((user) => {
            return user._id !== POToBlock;
          });
          setPOs(newPOList);
          setPOToBlock(0);
          BlockClose();
        })
        .catch((err) => {
          console.log(err);
          seterrorValidationPassword("Something Wrong!");
        });

      console.log("Block" + POToBlock);
    }
  }
  function findPack(pack) {
    var classPack = "";
    var NamePack = "";
    switch (pack) {
      case 1:
        classPack = "visibility gold";
        NamePack = "Gold";
        break;
      case 2:
        classPack = "visibility pro";
        NamePack = "Pro";
        break;
      default:
        classPack = "visibility pro";
        NamePack = "Pro";
        break;
    }
    return (
      <td>
        <div className="data">
          <div className={classPack}>{NamePack}</div>
        </div>
      </td>
    );
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
            if (Action) {
              BlockPO();
            } else {
              DeletePO();
            }
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

  //begin api getAll
  const [POs, setPOs] = useState([]);
  const retrievePO = async () => {
    const response = await api.get("/functionalPOs");
    console.log(response.data);
    return response.data;
  };

  useEffect(() => {
    const getAllPO = async () => {
      const allUsers = await retrievePO();
      if (allUsers) setPOs(allUsers);
    };
    getAllPO();
  }, []);
  //end api getAll

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Admin</Link>
          </li>
          <li className="breadcrumb-item">Product Owner</li>
          <li className="breadcrumb-item active" aria-current="page">
            Product Owner Verified
          </li>
        </ol>
      </nav>
      <div className="cardTemplate shadow-sm">
        <div className="title-cardTemplate">
          <h1>List of Product Owner Verified</h1>
        </div>
        <div className="content-cardTemplate">
          <table>
            <thead>
              <tr>
                <th>
                  <div className="data picture">logo</div>
                </th>
                <th>
                  <div className="data">Company Name</div>
                </th>
                <th>
                  <div className="data">Email</div>
                </th>
                <th>
                  <div className="data">Products</div>
                </th>
                <th>
                  <div className="data">Pack</div>
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
              {POs.map((PO) => {
                return (
                  <tr key={PO._id}>
                    <td>
                      <div className="data">
                        <div
                          className="picture"
                          style={{
                            backgroundImage: "url(" + PO.logo_url + ")",
                          }}
                        ></div>
                      </div>
                    </td>
                    <td>
                      <div className="data">{PO.company_name}</div>
                    </td>
                    <td>
                      <div className="data">{PO.company_email}</div>
                    </td>
                    <td>
                      <div className="data">25 / 100</div>
                    </td>
                    {findPack(PO.pack)}
                    <td>
                      <div className="data">{convertDate(PO.createdAt)}</div>
                    </td>
                    <td>
                      <div className="actions">
                        <div
                          className="action p-1"
                          onClick={() => {
                            findPO(PO._id);
                          }}
                        >
                          <BiPlayCircle />
                        </div>
                        <div
                          className="action p-1"
                          onClick={() => {
                            setPOToDelete(PO._id);
                            DeleteShow();
                          }}
                        >
                          <BiXCircle />
                        </div>

                        <div
                          className="action p-1"
                          onClick={() => {
                            setPOToBlock(PO._id);
                            BlockShow();
                          }}
                        >
                          <BiBlock />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {POs.length === 0 ? (
            <div className="empty">
              <p>This table is empty</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <Modal
        show={showDetails}
        onHide={DetailsClose}
        backdrop="static"
        keyboard={false}
        size={"xl"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="w-100 text-center">
                <div
                  className="avatar m-auto"
                  style={{ backgroundImage: "url(" + POConsult.logo_url + ")" }}
                ></div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <h4 className="text-center">ProductOwner details</h4>
              <table className="table mt-3">
                <tbody>
                  <tr>
                    <th>First Name </th>
                    <td>{POConsult.firstName}</td>
                  </tr>
                  <tr>
                    <th>Last Name </th>
                    <td>{POConsult.lastName}</td>
                  </tr>
                  <tr>
                    <th>Email </th>
                    <td>{POConsult.company_email}</td>
                  </tr>
                  <tr>
                    <th>Phone number </th>
                    <td>{POConsult.professional_phone_number}</td>
                  </tr>
                  <tr>
                    <th>CIN </th>
                    <td>{POConsult.owner_ID}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-6">
              <table className="table mt-3">
                <tbody>
                  <tr>
                    <th>Company Name </th>
                    <td>{POConsult.company_name}</td>
                  </tr>
                  <tr>
                    <th>Country </th>
                    <td>{POConsult.country}</td>
                  </tr>
                  <tr>
                    <th>City </th>
                    <td>{POConsult.city}</td>
                  </tr>
                  <tr>
                    <th>State </th>
                    <td>{POConsult.state}</td>
                  </tr>
                  <tr>
                    <th>Zip Code </th>
                    <td>{POConsult.zip_code}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-12 col-lg-6">
              <table className="table mt-3">
                <tbody>
                  <tr>
                    <th>Address </th>
                    <td>{POConsult.address}</td>
                  </tr>
                  <tr>
                    <th>Creation Date </th>
                    <td>{POConsult.creation_date}</td>
                  </tr>
                  <tr>
                    <th>Tax ID number </th>
                    <td>{POConsult.tax_ID_number}</td>
                  </tr>
                  <tr>
                    <th>Phone number </th>
                    <td>{POConsult.professional_phone_number}</td>
                  </tr>
                  <tr>
                    <th>RNE number </th>
                    <td>{POConsult.RNE_number}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="filesDisplay text-center">
            <h2>Files</h2>
            <img className="m-auto" src={POConsult.owner_ID_type} alt="" />
            <img className="m-auto" src={POConsult.tax_ID_card} alt="" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={DetailsClose}>
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
        <Modal.Body>You wanna really Delete this ProductOwner?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={DeleteClose}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setAction(false);
              DeleteClose();
              PasswordValidShow();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showBlock}
        onHide={BlockClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Block</Modal.Title>
        </Modal.Header>
        <Modal.Body>You wanna really block this ProductOwner ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={BlockClose}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setAction(true);
              BlockClose();
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
          <Modal.Title>Confirmation Of password</Modal.Title>
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
          <Button variant="danger w-100px" onClick={verificationPassword}>
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

export default ProductOwner;
