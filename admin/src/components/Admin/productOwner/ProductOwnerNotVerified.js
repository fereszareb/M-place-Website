import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BiXCircle, BiPlayCircle, BiCheckCircle } from "react-icons/bi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";
import api from "./../../../config.service";
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
    setPOConsult(POs.find((user) => user.id === id));
    DetailsShow();
  }
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
      //api refuse with id of POToRefuse
      console.log(RDVID);
      //this next 2 line inside the fetch 'its the success of function '
      setRDVID(0);
      RefuseClose();
    }
  }

  function RefusePO() {
    if (POToRefuse !== 0) {
      //api refuse with id of POToRefuse
      console.log(POToRefuse);
      //this next 2 line inside the fetch 'its the success of function '
      setPOToRefuse(0);
      RefuseClose();
    }
  }
  function AcceptPO() {
    if (POToAccept !== 0) {
      //api refuse with id of POToRefuse
      console.log(POToAccept);
      //this next 2 line inside the fetch 'its the success of function '
      setPOToAccept(0);
      AcceptClose();
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
          if (Action) {
            AcceptPO();
          } else {
            RefusePO();
          }
        })
        .catch((err) => {
          seterrorValidationPassword("erreru");
        });
    }
  };
  //function to get Password
  function getPassword(val) {
    seterrorValidationPassword("");
    setPassword(val.target.value);
  }

  //begin api getAll
  const [POs, setPOs] = useState([]);
  const retrievePO = async () => {
    const response = await api.get("/POs");
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
                  <div className="data">Name</div>
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
                  <tr key={PO.id}>
                    <td>
                      <div className="data picture">
                        <img
                          src={PO.avatar}
                          alt={PO.first_name}
                          draggable="false"
                        />
                      </div>
                    </td>
                    <td>
                      <div className="data">
                        {PO.first_name} {PO.last_name}
                      </div>
                    </td>
                    <td>
                      <div className="data">{PO.email}</div>
                    </td>
                    {findPack(PO.pack)}
                    <td>
                      <div className="data">{PO.date}</div>
                    </td>
                    <td>
                      <div className="actions">
                        <div
                          className="action"
                          onClick={() => {
                            findPO(PO.id);
                          }}
                        >
                          <BiPlayCircle />
                        </div>
                        <div
                          className="action"
                          onClick={() => {
                            setRDVID(PO.id);
                            RDVShow();
                          }}
                        >
                          <AiOutlineClockCircle />
                        </div>
                        <div
                          className="action"
                          onClick={() => {
                            setPOToRefuse(PO.id);
                            RefuseShow();
                          }}
                        >
                          <BiXCircle />
                        </div>

                        <div
                          className="action"
                          onClick={() => {
                            setPOToAccept(PO.id);
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
              style={{ backgroundImage: "url(" + POConsult.avatar + ")" }}
            ></div>
          </div>
          <div className="tableOfData mt-3">
            <table className="w-100">
              <tr>
                <th>First Name :</th>
                <td>{POConsult.first_name}</td>
              </tr>
              <tr>
                <th>Last Name :</th>
                <td>{POConsult.last_name}</td>
              </tr>
              <tr>
                <th>Email :</th>
                <td>{POConsult.email}</td>
              </tr>
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

export default ProductOwnerNotVerified;
