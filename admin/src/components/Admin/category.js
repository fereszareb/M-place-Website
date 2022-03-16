import { Link } from "react-router-dom";
import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Offcanvas } from "react-bootstrap";

const Category = () => {
  const [dataToAdd, setDataToAdd] = useState({});
  const [show, setShow] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      Category: "Clothes",
      child: [
        {
          id: 18,
          Category: "Man Clothes",
          child: [],
          new: false,
        },
        {
          id: 19,
          Category: "Women Clothes",
          child: [
            {
              id: 52,
              Category: "Tshirt",
              child: [],
              new: false,
            },
            {
              id: 53,
              Category: "pants",
              child: [],
              new: false,
            },
            {
              id: 54,
              Category: "shoes",
              child: [],
              new: false,
            },
          ],
          new: false,
        },
        {
          id: 20,
          Category: "Kids Clothes",
          child: [],
          new: false,
        },
      ],
      new: false,
    },
    {
      id: 2,
      Category: "Technology",
      child: [],
      new: false,
    },
    {
      id: 3,
      Category: "Dogs & Cats",
      child: [],
      new: false,
    },
    {
      id: 4,
      Category: "House & Garden",
      child: [],
      new: false,
    },
    {
      id: 5,
      Category: "Event",
      child: [],
      new: false,
    },
  ]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
          console.log(newdata);
        } else {
          const newCategory = newdata[posCateg].child.filter((child) => {
            return child.id !== idSousCategory;
          });
          newdata[posCateg].child = newCategory;
          console.log(newdata);
        }
      } else {
        newdata = newdata.filter((child) => {
          return child.id !== idCategory;
        });
        console.log(newdata);
      }
    }

    setData(newdata);
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
    console.log(idToDelete);
  }
  function addCategory() {}
  function btnAddCateg(id) {
    setDataToAdd({ id: id });
    handleShow();
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
      <button className="btn btn-primary" onClick={handleShow}>
        Launch
      </button>
      <div className="cardTemplate shadow-sm">
        <div className="title-cardTemplate">
          <h1>Category</h1>
          <button className="btn">refresh</button>
        </div>
        <div className="content-cardTemplate">
          <div className="w-category m-auto">
            {data.map((item, key) => {
              return (
                <div className="shadow rounded mb-3" key={key}>
                  <div
                    className={
                      item.child.length === 0
                        ? "item-Category blue"
                        : "item-Category blue item-CategoryPLus collapsed"
                    }
                    data-bs-toggle="collapse"
                    data-bs-target={"#target" + item.id}
                  >
                    <p className="titleCtagory d-inline-block">
                      {item.Category}
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
                            <div
                              className={
                                sousitem.child.length === 0
                                  ? "item-Category orange"
                                  : "item-Category orange item-CategoryPLus collapsed"
                              }
                              data-bs-toggle="collapse"
                              data-bs-target={"#target" + sousitem.id}
                            >
                              <p className="titleCtagory d-inline-block">
                                {sousitem.Category}
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
                                          {sousitem2.Category}
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
                                <div class="text-end">
                                  <button className="btn-add blue shadow">
                                    Add
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div class="text-end">
                        <button
                          className="btn-add blue shadow"
                          onClick={() => {
                            btnAddCateg(item.id);
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
            <div class="text-end">
              <button className="btn-add blue shadow">Add</button>
            </div>
          </div>
        </div>
      </div>
      <Offcanvas show={show} onHide={handleClose} placement={"end"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add a Category</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form onSubmit={addCategory}>
            <input type="text" name="name" placeholder="Name of category" />
            id of parent : {dataToAdd.id}
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Category;
