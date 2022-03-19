import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Modal, Button, Spinner } from "react-bootstrap";
import api from "./../../config.service";
const Category = () => {
  //begin api getAll
  const [data, setData] = useState([]);
  const retrieveCategories = async () => {
    const response = await api.get("/categories");
    return response.data;
  };
  useEffect(() => {
    const getAllCategories = async () => {
      const allCategories = await retrieveCategories();
      if (allCategories) setData(allCategories);
      console.log(allCategories);
    };
    getAllCategories();
  }, []);
  //end api getAll

  // loading icon activation
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const [postion, setPosition] = useState([null, null]);
  const [DataToAdd, setDataToAdd] = useState({
    id: 0,
    category: "",
    child: [],
    new: true,
  });
  const [showCategToAdd, setCategToAddShow] = useState(false);
  const categToAddClose = () => setCategToAddShow(false);
  const showcategToAdd = () => setCategToAddShow(true);
  function deleteCategory(idCategory, idSousCategory, idSousSousCategory) {
    var newdata = data;
    setData([]);
    if (idCategory !== null) {
      const posCateg = newdata.findIndex((categ) => categ.id === idCategory);
      if (idSousCategory !== null) {
        const posSousCateg = newdata[posCateg].child.findIndex(
          (categ) => categ.id === idSousCategory
        );
        if (idSousSousCategory !== null) {
          const newCategory = newdata[posCateg].child[
            posSousCateg
          ].child.filter((child) => {
            return child.id !== idSousSousCategory;
          });
          newdata[posCateg].child[posSousCateg].child = newCategory;
        } else {
          const newCategory = newdata[posCateg].child.filter((child) => {
            return child.id !== idSousCategory;
          });
          newdata[posCateg].child = newCategory;
        }
      } else {
        newdata = newdata.filter((child) => {
          return child.id !== idCategory;
        });
      }
    }
    setData((data) => [...newdata]);
  }
  function editCategory(idCategory, idSousCategory, idSousSousCategory) {
    var idToDelete;
    if (idCategory !== null) {
      const category = data.find((categ) => categ.id === idCategory);
      idToDelete = category.id;
      if (idSousCategory !== null) {
        const sousCategory = category.child.find(
          (categ) => categ.id === idSousCategory
        );
        idToDelete = sousCategory.id;
        if (idSousSousCategory !== null) {
          const sousSousCategory = sousCategory.child.find(
            (categ) => categ.id === idSousSousCategory
          );
          idToDelete = sousSousCategory.id;
        }
      }
    }
  }
  function onchangeCtegoryName(e) {
    var newObject = DataToAdd;
    newObject.category = e.target.value;
    setDataToAdd(newObject);
  }
  function RandomID() {
    var newObject = DataToAdd;
    console.log("data", data);
    newObject.id = Math.floor(Math.random() * 1000);
    setDataToAdd(newObject);
    console.log("data2", data);
  }
  function addCategory() {
    let newCateg = data;
    RandomID();
    if (!postion[0]) {
      newCateg.push(DataToAdd);
      setData((data) => [...newCateg]);
    } else if (!postion[1]) {
      const posCateg = data.findIndex((categ) => categ.id === postion[0]);
      newCateg[posCateg].child.push(DataToAdd);
      setData((data) => [...newCateg]);
    } else {
      const posCateg = data.findIndex((categ) => categ.id === postion[0]);
      const posSousCateg = data[posCateg].child.findIndex(
        (categ) => categ.id === postion[1]
      );
      newCateg[posCateg].child[posSousCateg].child.push(DataToAdd);
      setData((data) => [...newCateg]);
    }
  }

  function SaveUpdate() {
    setLoading(true);
    console.log(data);
    const dataToSend = { categories: data };
    console.log(dataToSend);
    api
      .post("/categories/updateAll", dataToSend)
      .then((response) => {
        alert("Category added successfully!");
      })
      .catch((err) => {
        alert("Sowmething Wrong!");
      });

    setLoading(false);
  }
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Admin</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Category
          </li>
        </ol>
      </nav>
      <div className="cardTemplate shadow-sm">
        <div className="title-cardTemplate">
          <h1>Category</h1>
          <button
            className="btnNextTitle btn-add blue"
            disabled={loading}
            onClick={SaveUpdate}
          >
            {loading ? (
              <Spinner animation="border" className="loadingIcon" />
            ) : (
              "Save"
            )}
          </button>
        </div>
        <div className="content-cardTemplate">
          <div className="w-category m-auto">
            {data.map((item, key) => {
              return (
                <div className="shadow rounded mb-3" key={key}>
                  <div className="item-Category blue">
                    <p
                      className={
                        item.child.length === 0
                          ? "titleCtagory d-inline-block"
                          : "titleCtagory d-inline-block item-CategoryPLus collapsed"
                      }
                      data-bs-toggle="collapse"
                      data-bs-target={"#target" + item.id}
                    >
                      {item.category}
                    </p>
                    <div className="icons d-inline">
                      <FaTrash
                        className="icon iconTrash"
                        onClick={() => {
                          deleteCategory(item.id, null, null);
                        }}
                      />
                      <FaEdit
                        className="icon iconEdit"
                        onClick={() => {
                          editCategory(item.id, null, null);
                        }}
                      />
                    </div>
                  </div>
                  <div className="collapse" id={"target" + item.id}>
                    <div className="p-3">
                      {item.child.map((sousitem, key) => {
                        return (
                          <div className="shadow rounded mb-3" key={key}>
                            <div className="item-Category orange">
                              <p
                                className={
                                  sousitem.child.length === 0
                                    ? "titleCtagory d-inline-block"
                                    : "titleCtagory d-inline-block item-CategoryPLus collapsed"
                                }
                                data-bs-toggle="collapse"
                                data-bs-target={"#target" + sousitem.id}
                              >
                                {sousitem.category}
                              </p>
                              <div className="icons d-inline">
                                <FaTrash
                                  className="icon iconTrash"
                                  onClick={() => {
                                    deleteCategory(item.id, sousitem.id, null);
                                  }}
                                />
                                <FaEdit
                                  className="icon iconEdit"
                                  onClick={() => {
                                    editCategory(item.id, sousitem.id, null);
                                  }}
                                />
                              </div>
                            </div>
                            <div
                              className="collapse"
                              id={"target" + sousitem.id}
                            >
                              <div className="p-3">
                                {sousitem.child.map((sousitem2, key) => {
                                  return (
                                    <div
                                      className="shadow rounded mb-3"
                                      key={key}
                                    >
                                      <div className="item-Category collapsed">
                                        <p className="titleCtagory d-inline-block">
                                          {sousitem2.category}
                                        </p>
                                        <div className="icons d-inline">
                                          <FaTrash
                                            className="icon iconTrash"
                                            onClick={() => {
                                              deleteCategory(
                                                item.id,
                                                sousitem.id,
                                                sousitem2.id
                                              );
                                            }}
                                          />
                                          <FaEdit
                                            className="icon iconEdit"
                                            onClick={() => {
                                              editCategory(
                                                item.id,
                                                sousitem.id,
                                                sousitem2.id
                                              );
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                                <div className="text-end">
                                  <button
                                    className="btn-add blue shadow"
                                    onClick={() => {
                                      showcategToAdd();
                                      setPosition([item.id, sousitem.id]);
                                      //btnAddCateg();
                                    }}
                                  >
                                    Add
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className="text-end">
                        <button
                          className="btn-add blue shadow"
                          onClick={() => {
                            setPosition([item.id, null]);
                            showcategToAdd();
                            //btnAddCateg();
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="text-end">
              <button
                className="btn-add blue shadow"
                onClick={() => {
                  setPosition([null, null]);
                  showcategToAdd();
                  //btnAddCateg();
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showCategToAdd}
        onHide={categToAddClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a Category</Modal.Title>
        </Modal.Header>
        <Modal.Body className="DataCategory">
          <input
            type="text"
            placeholder="Enter the name of category"
            onChange={onchangeCtegoryName}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={categToAddClose}>
            Cancel
          </Button>
          <Button variant="danger w-100px" onClick={addCategory}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Category;
