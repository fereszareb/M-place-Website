import { Link } from "react-router-dom";
import pic from "./../../meeting.jpg";
import ReactEditor from "./../reactEditor";
import { useState, useEffect } from "react";
import { BiTrashAlt, BiPlayCircle, BiEdit } from "react-icons/bi";
import { AiFillCloseCircle, AiFillFileAdd } from "react-icons/ai";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";
import api from "./../../config.service";
const Products = () => {
  // add var
  const [Addshow, setAddShow] = useState(false);
  const AddClose = () => setAddShow(false);
  const AddShow = () => setAddShow(true);

  //addvariable var
  // add var
  const [AddVarShow, setAddVariableShow] = useState(false);
  const AddVariableClose = () => setAddVariableShow(false);
  const AddVariableShow = () => setAddVariableShow(true);

  const [show, setModifyShow] = useState(false);
  const [showDelete, setDeleteShow] = useState(false);
  const ModifyClose = () => setModifyShow(false);
  const ModifyShow = () => setModifyShow(true);

  const DeleteClose = () => setDeleteShow(false);
  const DeleteShow = () => setDeleteShow(true);

  //begin api getAllCategories
  const [categories, setcategories] = useState([]);
  const retrieveCategories = async () => {
    const response = await api.get("/categories");
    return response.data;
  };
  useEffect(() => {
    const getAllCategories = async () => {
      const allCategories = await retrieveCategories();
      if (allCategories) setcategories(allCategories);
      console.log(allCategories);
    };
    getAllCategories();
  }, []);
  //end api getAllCategories

  //begin api getAllMyproduct
  const [products, setproducts] = useState([]);
  const retrieveproducts = async () => {
    const response = await api.get("/myProducts");
    console.log(response.data);
    return response.data;
  };
  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await retrieveproducts();
      if (allProducts) setproducts(allProducts);
      console.log("here");
      console.log(allProducts);
    };
    console.log("start");
    getAllProducts();
  }, []);
  //end api getAllMyproduct

  //state for form data
  const [newProduct, setNewProduct] = useState({
    name: "",
    SKU: "",
    marque: "",
    description: "",
    short_description: "",
    category: "",
    filters: [],
    product_imgs: [],
    reduction_percentage: 0,
    visibility: "",
  });

  const AddChangeHandler = (e) => {
    setNewProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const submitAdd = () => {
    setLoadingSubmit(true);
    api
      .post("/addCustomProduct", {
        data: {
          name: newProduct.name,
          SKU: newProduct.SKU,
          marque: newProduct.marque,
          description: newProduct.description,
          short_description: newProduct.short_description,
          category: newProduct.category,
          filters: newProduct.filters,
          product_imgs: newProduct.product_imgs,
          reduction_percentage: parseInt(newProduct.reduction_percentage),
          visibility: newProduct.visibility === "Visible",
        },
      })
      .then((res) => {
        setLoadingSubmit(false);
        setNewProduct({
          name: "",
          SKU: "",
          marque: "",
          description: "",
          short_description: "",
          category: "",
          filters: [],
          product_imgs: [],
          reduction_percentage: 0,
          visibility: "",
        });
        AddClose();
      })
      .catch((err) => {
        console.log({
          data: {
            name: newProduct.name,
            SKU: newProduct.SKU,
            marque: newProduct.marque,
            description: newProduct.description,
            short_description: newProduct.short_description,
            category: newProduct.category,
            filters: newProduct.filters,
            product_imgs: newProduct.product_imgs,
            reduction_percentage: parseInt(newProduct.reduction_percentage),
            visibility: newProduct.visibility === "Visible",
          },
        });
        alert("Erreur");
      });
  };

  const deletePicture = (position) => {
    let newListeImages = [];
    for (var i = 0; i < newProduct.product_imgs.length; i++) {
      if (position !== i) {
        newListeImages.push(newProduct.product_imgs[i]);
      }
    }
    setNewProduct((prevState) => ({
      ...prevState,
      product_imgs: newListeImages,
    }));
  };

  const [loadingpicture, setLoadingpicture] = useState(false);

  const uploadImage = () => {
    if (!loadingpicture) {
      let input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.multiple = false;
      input.onchange = (_) => {
        setLoadingpicture(true);
        var bodyFormData = new FormData();
        bodyFormData.append("", input.files[0]);
        api
          .post("/img/upload", bodyFormData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            let newListeImages = newProduct.product_imgs;
            newListeImages.push(res.data.Url);
            setNewProduct((prevState) => ({
              ...prevState,
              product_imgs: newListeImages,
            }));
            setLoadingpicture(false);
          })
          .catch(() => {
            setLoadingpicture(false);
          });
      };
      input.click();
    }
  };

  const [variableList, setVariableList] = useState([]);
  const addVariable = () => {
    let newListeVariable = variableList;
    const listofOption = inputVariable.options.split(",").map((element) => {
      return element.trim();
    });
    newListeVariable.push({
      name: inputVariable.variable,
      option: listofOption,
    });
    setVariableList([...newListeVariable]);
    setinputVariable({
      variable: "",
      options: "",
    });
    let varData = [];
    for (var i = 0; i < variableList.length; i++) {
      varData.push(variableList[i].option);
    }
    setTableFiltre(cartesianProduct(varData));
  };

  const deleteVariable = (position) => {
    let newListeVariables = [];
    for (var i = 0; i < variableList.length; i++) {
      if (position !== i) {
        newListeVariables.push(variableList[i]);
      }
    }
    setVariableList([...newListeVariables]);
  };

  const [tableFiltre, setTableFiltre] = useState([]);
  function cartesianProduct(arr) {
    return arr.reduce(
      function (a, b) {
        return a
          .map(function (x) {
            return b.map(function (y) {
              return x.concat([y]);
            });
          })
          .reduce(function (a, b) {
            return a.concat(b);
          }, []);
      },
      [[]]
    );
  }

  const compareObject = (arr1, arr2) => {
    const res1 = arr2.filter(
      (page1) =>
        !arr1.find(
          (page2) => page1.name === page2.name && page1.option === page2.option
        )
    );
    if (res1.length === 0) {
      return true;
    } else {
      return false;
    }
  };
  const [filters, setFilters] = useState([]);
  const testInput = (e) => {
    var newFilters = newProduct.filters;
    var varr = e.target.getAttribute("data");
    varr = varr.split(",");
    var newjson = [];
    for (var i = 0; i < varr.length; i++) {
      newjson.push({ name: variableList[i].name, option: varr[i] });
    }

    const posCateg = newFilters.findIndex((filter) =>
      compareObject(filter.Variable_list, newjson)
    );

    if (posCateg === -1) {
      let newFilter;
      if (e.target.name === "price") {
        newFilter = {
          name: "XYZ",
          quantity: "",
          price: e.target.value,
          Variable_list: newjson,
        };
      } else {
        newFilter = {
          name: "XYZ",
          quantity: e.target.value,
          price: "",
          Variable_list: newjson,
        };
      }
      newFilters.push(newFilter);
    } else {
      if (e.target.name === "price") {
        newFilters[posCateg].price = e.target.value;
      } else {
        newFilters[posCateg].quantity = e.target.value;
      }
    }
    setNewProduct((prevState) => ({
      ...prevState,
      filters: newFilters,
    }));
  };

  const [inputVariable, setinputVariable] = useState({
    variable: "",
    options: "",
  });
  const InputVariableHundle = (e) => {
    setinputVariable({
      ...inputVariable,
      [e.target.name]: e.target.value,
    });
  };

  const openProduct = (sku) => {
    //ouvrir la page de produit en fonction de sku
  };
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Admin</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Producs
          </li>
        </ol>
      </nav>
      <div className="cardTemplate shadow-sm">
        <div className="title-cardTemplate">
          <h1>List of products</h1>
          <button className="btn btn-blue" onClick={AddShow}>
            Add product
          </button>
        </div>
        <div className="content-cardTemplate">
          <table>
            <thead>
              <tr>
                <th>
                  <div className="data picture"></div>
                </th>
                <th>
                  <div className="data">Name</div>
                </th>
                <th>
                  <div className="data">Price</div>
                </th>
                <th>
                  <div className="data">Orders</div>
                </th>
                <th>
                  <div className="data">Visibility</div>
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
              {products.length > 0
                ? products.map((product, key) => {
                    return (
                      <tr>
                        <td>
                          <div className="data">
                            <div
                              className="picture rounded"
                              style={{
                                backgroundImage:
                                  "url(" + product.picture[0] + ")",
                              }}
                            ></div>
                          </div>
                        </td>
                        <td className="name">
                          <div className="data">{product.name}</div>
                        </td>
                        <td>
                          <div className="data">{product.price} TND</div>
                        </td>
                        <td>
                          <div className="data">25</div>
                        </td>
                        <td>
                          <div className="data">
                            <div className="visibility visible">Visible</div>
                          </div>
                        </td>
                        <td>
                          <div className="data">12-05-2021 17:33:15</div>
                        </td>
                        <td>
                          <div className="actions">
                            <div className="action">
                              <BiPlayCircle
                                onClick={() => {
                                  openProduct(product);
                                }}
                              />
                            </div>
                            <div className="action" onClick={DeleteShow}>
                              <BiTrashAlt />
                            </div>
                            <div className="action" onClick={ModifyShow}>
                              <BiEdit />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        show={show}
        onHide={ModifyClose}
        backdrop="static"
        keyboard={false}
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12 col-sm-8">
              <div className="cardTemplate shadow-sm">
                <div className="title-cardTemplate">
                  <h1>Product</h1>
                </div>
                <div className="content-cardTemplate">
                  <input
                    className="itemInput"
                    placeholder="Name ( Ex: blue summer shirt.. )"
                    type="text"
                  />
                  <ReactEditor />
                </div>
              </div>
              <div className="cardTemplate shadow-sm">
                <div className="title-cardTemplate">
                  <h1>Images</h1>
                </div>
                <div className="content-cardTemplate"></div>
              </div>
              <div className="cardTemplate shadow-sm">
                <div className="title-cardTemplate">
                  <h1>Variants</h1>
                </div>
                <div className="content-cardTemplate"></div>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="cardTemplate shadow-sm">
                <div className="title-cardTemplate">
                  <h1>Visibility</h1>
                </div>
                <div className="content-cardTemplate">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Visible
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      checked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault2"
                    >
                      Hidden
                    </label>
                  </div>
                </div>
              </div>
              <div className="cardTemplate shadow-sm">
                <div className="title-cardTemplate">
                  <h1>Storage details</h1>
                </div>
                <div className="content-cardTemplate">
                  <input className="itemInput" placeholder="SKU" type="text" />
                </div>
              </div>
              <div className="cardTemplate shadow-sm">
                <div className="title-cardTemplate">
                  <h1>Category</h1>
                </div>
                <div className="content-cardTemplate">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Default radio
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      checked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault2"
                    >
                      Default checked radio
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ModifyClose}>
            Close
          </Button>
          <Button variant="primary">Save</Button>
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
          <Button variant="danger">Yes</Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={Addshow}
        onHide={AddClose}
        backdrop="static"
        keyboard={false}
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12 col-sm-8">
              <div className="cardTemplate shadow-sm">
                <div className="title-cardTemplate">
                  <h1>Product</h1>
                </div>
                <div className="content-cardTemplate">
                  <input
                    className="itemInput"
                    placeholder="Name ( Ex: blue summer shirt.. )"
                    type="text"
                    name="name"
                    onChange={AddChangeHandler}
                    defaultValue={newProduct.name}
                  />
                  <textarea
                    className="itemInput"
                    placeholder="Add a short description for your product ..."
                    name="short_description"
                    onChange={AddChangeHandler}
                    defaultValue={newProduct.short_description}
                  />
                  <ReactEditor setNewProduct={setNewProduct} />
                </div>
              </div>
              <div className="cardTemplate shadow-sm">
                <div className="title-cardTemplate">
                  <h1>Images</h1>
                </div>
                <div className="content-cardTemplate">
                  <div className="d-flex">
                    {newProduct.product_imgs.map((pic, key) => {
                      return (
                        <div
                          key={key}
                          className="imageUploadDisplay"
                          style={{
                            backgroundImage: "url(" + pic + ")",
                          }}
                        >
                          <AiFillCloseCircle
                            className="deleteImage"
                            onClick={() => {
                              deletePicture(key);
                            }}
                          />
                        </div>
                      );
                    })}
                    {newProduct.product_imgs.length < 5 ? (
                      <div
                        className="imageUploadDisplay DivAddPicture"
                        onClick={uploadImage}
                      >
                        {loadingpicture ? (
                          <div
                            className="spinner-border text-secondary loadingUploadPicture"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          <AiFillFileAdd />
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="cardTemplate shadow-sm">
                <div className="title-cardTemplate">
                  <h1>Variants</h1>
                </div>
                <div className="content-cardTemplate">
                  <div className="webkitBox">
                    {variableList.map((variab, key) => {
                      return (
                        <div key={key} className="variableDisplay">
                          {variab.name + " ["}

                          {variab.option.map((option) => {
                            return <>{" " + option + " "}</>;
                          })}
                          {" ]"}
                          <AiFillCloseCircle
                            className="deleteVariable"
                            onClick={() => {
                              deleteVariable(key);
                            }}
                          />
                        </div>
                      );
                    })}
                    {variableList.length < 5 ? (
                      <div
                        className="variableDisplay DivAddVariable"
                        onClick={AddVariableShow}
                      >
                        Add new Variable
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="cardTemplate shadow-sm">
                <div className="title-cardTemplate">
                  <h1>Filters</h1>
                </div>
                <div className="content-cardTemplate text-center">
                  {variableList.length !== 0 ? (
                    <table>
                      <thead>
                        <tr>
                          {variableList.map((variable, key) => {
                            return (
                              <th key={key}>
                                <div className="data">{variable.name}</div>
                              </th>
                            );
                          })}
                          <th>
                            <div className="data">Stock</div>
                          </th>
                          <th>
                            <div className="data">Price</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableFiltre.map((filter, key) => {
                          return (
                            <tr key={key}>
                              {filter.map((optionFilter, key) => {
                                return (
                                  <td key={key}>
                                    <div className="data">{optionFilter}</div>
                                  </td>
                                );
                              })}
                              <td>
                                <div className="data">
                                  <input
                                    className="InputFilterMax"
                                    type="number"
                                    min="0"
                                    name="quantity"
                                    data={filter}
                                    onChange={testInput}
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="data">
                                  <input
                                    className="InputFilterMax"
                                    type="text"
                                    pattern="\d+(\.\d{2})?"
                                    data={filter}
                                    name="price"
                                    onChange={testInput}
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="cardTemplate shadow-sm">
                <div className="title-cardTemplate">
                  <h1>Visibility</h1>
                </div>
                <div className="content-cardTemplate">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="visibility"
                      id="visibility1"
                      value="Visible"
                      onChange={AddChangeHandler}
                    />
                    <label className="form-check-label" htmlFor="visibility1">
                      Visible
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="visibility"
                      id="visibility2"
                      value="Hidden"
                      onChange={AddChangeHandler}
                    />
                    <label className="form-check-label" htmlFor="visibility2">
                      Hidden
                    </label>
                  </div>
                </div>
              </div>
              <div className="cardTemplate shadow-sm">
                <div className="title-cardTemplate">
                  <h1>Storage details</h1>
                </div>
                <div className="content-cardTemplate">
                  <input
                    className="itemInput"
                    placeholder="SKU"
                    type="text"
                    name="SKU"
                    pattern="[0-9a-zA-Z]+"
                    onChange={AddChangeHandler}
                    defaultValue={newProduct.SKU}
                  />
                </div>
              </div>
              <div className="cardTemplate shadow-sm">
                <div className="title-cardTemplate">
                  <h1>Marque</h1>
                </div>
                <div className="content-cardTemplate">
                  <input
                    className="itemInput"
                    placeholder="Marque"
                    type="text"
                    name="marque"
                    pattern="[0-9a-zA-Z]+"
                    onChange={AddChangeHandler}
                    defaultValue={newProduct.marque}
                  />
                </div>
              </div>
              <div className="cardTemplate shadow-sm">
                <div className="title-cardTemplate">
                  <h1>Reduction percentage</h1>
                </div>
                <div className="content-cardTemplate">
                  <input
                    className="itemInput"
                    placeholder="Reduction percentage"
                    type="number"
                    name="reduction_percentage"
                    max="100"
                    min="0"
                    onChange={AddChangeHandler}
                    defaultValue={newProduct.reduction_percentage}
                  />
                </div>
              </div>
              <div className="cardTemplate shadow-sm">
                <div className="title-cardTemplate">
                  <h1>Category</h1>
                </div>
                <div className="content-cardTemplate">
                  {categories.map((categ, key) => {
                    return (
                      <div className="form-check" key={key}>
                        <label className="form-check-label">
                          {categ.category}
                        </label>
                        {categ.child.map((sousCateg, key) => {
                          return (
                            <div className="form-check px-3" key={key}>
                              <label className="form-check-label">
                                <MdSubdirectoryArrowRight />
                                {sousCateg.category}
                              </label>
                              {sousCateg.child.map((soussousCateg, key) => {
                                return (
                                  <div className="form-check px-5" key={key}>
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="category"
                                      id={"product" + key}
                                      value={soussousCateg.id}
                                      onChange={AddChangeHandler}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={"product" + key}
                                    >
                                      {soussousCateg.category}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={AddClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={submitAdd}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={AddVarShow}
        onHide={AddVariableClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="variable"
              onChange={InputVariableHundle}
              placeholder="options"
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="options"
              onChange={InputVariableHundle}
              placeholder="options"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={AddVariableClose}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              AddVariableClose();
              addVariable();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;
