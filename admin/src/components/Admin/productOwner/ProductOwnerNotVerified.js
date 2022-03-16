import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BiXCircle, BiPlayCircle, BiCheckCircle } from "react-icons/bi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Modal, Button, Spinner } from "react-bootstrap";
import api from "./../../../config.service";
import convertDate from "./../../../function";

const ProductOwnerNotVerified = () => {
  //modal details
  const [showDetails, setDetailsShow] = useState(false);
  const DetailsClose = () => setDetailsShow(false);
  const DetailsShow = () => setDetailsShow(true);

  // modal Refuse
  const [showRefuse, setRefuseShow] = useState(false);
  const RefuseClose = () => setRefuseShow(false);
  const RefuseShow = () => setRefuseShow(true);

  //Modal Accept
  const [showAccept, setAcceptShow] = useState(false);
  const AcceptClose = () => setAcceptShow(false);
  const AcceptShow = () => setAcceptShow(true);

  //Modal RDV
  const [showRDV, setRDVShow] = useState(false);
  const RDVClose = () => setRDVShow(false);
  const RDVShow = () => setRDVShow(true);

  //id for the fonctionality of Modal
  const [POToRefuse, setPOToRefuse] = useState(0);
  const [POToAccept, setPOToAccept] = useState(0);
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
  // action (accept or refuse)
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

  function RefusePO() {
    if (POToRefuse !== 0) {
      api
        .patch("/POs/Delete/" + POToRefuse)
        .then((response) => {
          PasswordValidClose();
          const newPOList = POs.filter((user) => {
            return user._id !== POToRefuse;
          });
          setPOs(newPOList);
          setPOToRefuse(0);
          AcceptClose();
        })
        .catch((err) => {
          seterrorValidationPassword("Something Wrong!");
        });
    }
  }
  function AcceptPO() {
    if (POToAccept !== 0) {
      //api refuse with id of POToRefuse

      api
        .patch("/POs/approve/" + POToAccept)
        .then((response) => {
          PasswordValidClose();
          const newPOList = POs.filter((user) => {
            return user._id !== POToAccept;
          });
          setPOs(newPOList);
          setPOToAccept(0);
          AcceptClose();
        })
        .catch((err) => {
          console.log(err);
          seterrorValidationPassword("Something Wrong!");
        });

      console.log("Accept" + POToAccept);
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
              AcceptPO();
            } else {
              RefusePO();
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
    const response = await api.get("/getNotVerifiedPOs");
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
            Product Owner Not Verified
          </li>
        </ol>
      </nav>
      <div className="cardTemplate shadow-sm">
        <div className="title-cardTemplate">
          <h1>List of Product Owner Not Verified</h1>
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
                            setRDVID(PO._id);
                            RDVShow();
                          }}
                        >
                          <AiOutlineClockCircle />
                        </div>
                        <div
                          className="action p-1"
                          onClick={() => {
                            setPOToRefuse(PO._id);
                            RefuseShow();
                          }}
                        >
                          <BiXCircle />
                        </div>

                        <div
                          className="action p-1"
                          onClick={() => {
                            setPOToAccept(PO._id);
                            AcceptShow();
                          }}
                        >
                          <BiCheckCircle />
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
        show={showDetails}
        onHide={DetailsClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="w-100 text-center">
            <div
              className="avatar m-auto"
              style={{ backgroundImage: "url(" + POConsult.logo_url + ")" }}
            ></div>
          </div>
          <div className="tableOfData mt-3">
            <table className="table mt-3">
              <tbody>
                <tr>
                  <th>Company Name :</th>
                  <td>{POConsult.company_name}</td>
                </tr>
                <tr>
                  <th>Company Email :</th>
                  <td>{POConsult.company_email}</td>
                </tr>
                <tr>
                  <th>Country :</th>
                  <td>{POConsult.country}</td>
                </tr>
                <tr>
                  <th>City :</th>
                  <td>{POConsult.city}</td>
                </tr>
                <tr>
                  <th>State :</th>
                  <td>{POConsult.state}</td>
                </tr>

                <tr>
                  <th>Zip Code :</th>
                  <td>{POConsult.zip_code}</td>
                </tr>
                <tr>
                  <th>Address :</th>
                  <td>{POConsult.address}</td>
                </tr>
                <tr>
                  <th>Professional Phone Number :</th>
                  <td>{POConsult.professional_phone_number}</td>
                </tr>
                <tr>
                  <th>Creation Date :</th>
                  <td>{POConsult.creation_date}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={DetailsClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showRefuse}
        onHide={RefuseClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Refuse</Modal.Title>
        </Modal.Header>
        <Modal.Body>You wanna really refuse ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={RefuseClose}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setAction(false);
              RefuseClose();
              PasswordValidShow();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showRDV}
        onHide={RDVClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Send appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>You wanna really send appointment ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={RDVClose}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              SendRDV();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showAccept}
        onHide={AcceptClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Accept</Modal.Title>
        </Modal.Header>
        <Modal.Body>You wanna really accpet ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={AcceptClose}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setAction(true);
              AcceptClose();
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

export default ProductOwnerNotVerified;
