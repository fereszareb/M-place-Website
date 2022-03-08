import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BiXCircle, BiPlayCircle, BiCheckCircle } from "react-icons/bi";
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

  //id for the fonctionality of Modal
  const [POToRefuse, setPOToRefuse] = useState(0);
  const [POToAccept, setPOToAccept] = useState(0);
  const [POToDetails, setPOToDetails] = useState(0);

  //data of modal detils
  const [POConsult, setPOConsult] = useState({
    id: 2121212,
    name: "lenovo",
    logo: "https://logo.clearbit.com/lenovo.com",
    pack: 2,
    date: "12-05-2021 17:33:15",
    email: "contact@lenovo.com",
  });
  // function find user
  function findUPO(id) {
    setPOConsult(POs.find((user) => user.id === id));
    DetailsShow();
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

  //begin api getAll
  const [POs, setPOs] = useState([]);
  const retrievePO = async () => {
    const response = await api.get("/random_user?size=20");
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
                            findUPO(PO.id);
                          }}
                        >
                          <BiPlayCircle />
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
          <table className="w-100">
            <tr>
              <td>ID</td>
              <td>{POConsult.id}</td>
            </tr>
            <tr>
              <td>Logo</td>
              <td>
                <img
                  src={POConsult.logo}
                  alt={POConsult.name}
                  draggable="false"
                />
              </td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{POConsult.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{POConsult.email}</td>
            </tr>
          </table>
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
          <Button variant="danger" onClick={RefusePO}>
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
          <Button variant="danger" onClick={AcceptPO}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductOwnerNotVerified;
