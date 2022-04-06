import { Link } from "react-router-dom";
import pic from "./../../meeting.jpg";
import ReactEditor from "./../reactEditor";
import { useState, useEffect } from "react";
import { BiTrashAlt, BiPlayCircle, BiEdit } from "react-icons/bi";
import { AiFillCloseCircle, AiFillFileAdd } from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";
import api from "./../../config.service";
const Products = () => {
  // add var
  const [Addshow, setAddShow] = useState(false);
  const AddClose = () => setAddShow(false);
  const AddShow = () => setAddShow(true);

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
    return response.data;
  };
  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await retrieveproducts();
      if (allProducts) setproducts(allProducts);
      console.log(allProducts);
    };
    getAllProducts();
  }, []);
  //end api getAllMyproduct

  //state for form data
  const [newProduct, setNewProduct] = useState({
    name: "",
    SKU: "",
    marque: "",
    description: "",
    shortDescripton: "",
    category: "",
    filters: [],
    product_imgs: [],
    reduction_percentage: 0,
    visibility: false,
    price: 0,
  });

  const AddChangeHandler = (e) => {
    setNewProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [loadingpicture, setLoadingpicture] = useState(false);
  const registerFileChangeHandler = (e) => {
    setLoadingpicture(true);
    var bodyFormData = new FormData();
    bodyFormData.append("", e.target.files[0]);
    api
      .post("/img/upload", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setNewProduct((prevState) => ({
          ...prevState,
          [e.target.name]: res.data.data.imageUrl,
        }));
        setLoadingpicture(false);
      });
  };

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const submitAdd = () => {
    setLoadingSubmit(true);
    api
      .post("/addProduct", newProduct)
      .then((res) => {
        setLoadingSubmit(false);
      })
      .catch((err) => {
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
            newListeImages.push(res.data.data.imageUrl);
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
              <tr>
                <td>
                  <div className="data picture">
                    <img src={pic} alt="" />
                  </div>
                </td>
                <td className="name">
                  <div className="data">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Nulla iure explicabo inventore consequatur, sint ex pariatur
                    a, reiciendis laboriosam ab neque molestiae sequi magnam
                    nostrum. Architecto exercitationem sunt ut consequatur?
                  </div>
                </td>
                <td>
                  <div className="data">10020.00 TND</div>
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
                      <BiPlayCircle />
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
              <tr>
                <td>
                  <div className="data picture">
                    <img src={pic} alt="" />
                  </div>
                </td>
                <td className="name">
                  <div className="data">Lorem ipsum dolor sit</div>
                </td>
                <td>
                  <div className="data">120.00 TND</div>
                </td>
                <td>
                  <div className="data">99999</div>
                </td>
                <td>
                  <div className="data">
                    <div className="visibility hidden">Hidden</div>
                  </div>
                </td>
                <td>
                  <div className="data">12-05-2021 17:33:15</div>
                </td>
                <td>
                  <div className="actions">
                    <div className="action">
                      <BiPlayCircle />
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
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Visible
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      checked
                    />
                    <label class="form-check-label" for="flexRadioDefault2">
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
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Default radio
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      checked
                    />
                    <label class="form-check-label" for="flexRadioDefault2">
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
                    name="shortDescripton"
                    onChange={AddChangeHandler}
                    defaultValue={newProduct.shortDescripton}
                  />
                  <ReactEditor />
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
                            class="spinner-border text-secondary loadingUploadPicture"
                            role="status"
                          >
                            <span class="visually-hidden">Loading...</span>
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
                <div className="content-cardTemplate"></div>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="cardTemplate shadow-sm">
                <div className="title-cardTemplate">
                  <h1>Visibility</h1>
                </div>
                <div className="content-cardTemplate">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Visible
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      checked
                    />
                    <label class="form-check-label" for="flexRadioDefault2">
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
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Default radio
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      checked
                    />
                    <label class="form-check-label" for="flexRadioDefault2">
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
    </div>
  );
};

export default Products;
