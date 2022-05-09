import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import "./../css/category.css";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { useState } from "react";
import api from "./../config.service";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const notify = () => toast.success("Product added");
// function return the stars of every product
function showStars(stars) {
  const nbr = Math.trunc(stars);
  var rows = [];
  for (var i = 0; i < nbr; i++) {
    rows.push(
      <li className="list-inline-item">
        <BsStarFill />
      </li>
    );
  }
  if (stars !== nbr) {
    rows.push(
      <li className="list-inline-item">
        <BsStarHalf />
      </li>
    );
    for (i = 0; i < 4 - nbr; i++) {
      rows.push(
        <li className="list-inline-item">
          <BsStar />
        </li>
      );
    }
  } else {
    for (i = 0; i < 5 - nbr; i++) {
      rows.push(
        <li className="list-inline-item">
          <BsStar />
        </li>
      );
    }
  }
  return rows;
}
//data of this page ( its just a test)

// urlParams return the searchParams from the URL
const urlParams = new URLSearchParams(window.location.search);
const Category = ({ CalcnumberOfProduct }) => {
  const history = useHistory();
  const { categorie } = useParams();
  //begin api getAllByCateg
  const [data, setdata] = useState({
    filter: [],
    products: [],
    number_of_products: 0,
  });
  const retrieveUsers = async () => {
    const response = await api.post(
      "/categoryProducts/" + categorie.replaceAll("_", " ")
    );
    return response.data;
  };
  const [idCategorie, setIdCategorie] = useState("");
  useEffect(() => {
    api.get("/categoryId/" + categorie).then((res) => {
      if (res.data) {
        setIdCategorie(res.data.id);
        //add here getAllUsers();
      } else {
        history.push("/404");
      }
    });
    const getAllUsers = async () => {
      const allUsers = await retrieveUsers();
      if (allUsers) setdata(allUsers);
    };
    getAllUsers();
  }, []);
  //end api getAllByCateg
  //nombre of pagination
  let numberItems = parseInt(data.nbrOfProduct / 48);
  if (data.nbrOfProduct > numberItems) {
    numberItems++;
  }
  //function new pagination
  function changepagination(e) {
    history.push(
      window.location.pathname + "?page=" + e.target.getAttribute("page")
    );
    setActive(parseInt(e.target.getAttribute("page")));
  }
  //add product to card
  function addToLocalStorage(item) {
    console.log(item);
    let listProduct = JSON.parse(localStorage.getItem("products")) || [];
    const indexProduct = listProduct.findIndex(
      (product) => product.id === item.id
    );
    if (indexProduct === -1) {
      let newProduct = {
        id: item.id,
        img: item.picture,
        name: item.name,
        nbrProduct: 1,
        price: item.price,
        reduction: item.reduction_percentage.toString(),
        sku: item.SKU,
      };
      listProduct.push(newProduct);
      localStorage.setItem("products", JSON.stringify(listProduct));
      notify();
    } else {
      listProduct[indexProduct].nbrProduct += 1;
      localStorage.setItem("products", JSON.stringify(listProduct));
      notify();
    }
    CalcnumberOfProduct();
  }
  // change filter of search
  const [SearchData, setSearchData] = useState([]);
  function FilterChange(e) {
    const newSearch = SearchData.filter((variable) => {
      return (
        variable.variable !== e.target.getAttribute("variable") ||
        variable.value !== e.target.getAttribute("name")
      );
    });
    if (newSearch.length === SearchData.length) {
      setSearchData((data) => [
        ...data,
        ...[
          {
            variable: e.target.getAttribute("variable"),
            value: e.target.getAttribute("name"),
          },
        ],
      ]);
    } else {
      setSearchData((data) => [...newSearch]);
    }
  }
  const [trie, setTrie] = useState("");
  function trieChange(e) {
    setTrie(e.target.value);
  }
  useEffect(() => {
    var filter = {
      filters: SearchData,
      filterBy: trie,
      page: active,
    };
    api
      .post("/categoryProducts/" + categorie.replaceAll("_", " "), filter)
      .then((res) => {
        setdata(res.data);
      });
  }, [SearchData, trie]);

  const checkValidation = (value, variable) => {
    const indexSearchData = SearchData.findIndex(
      (product) => product.value === value && product.variable === variable
    );
    if (indexSearchData === -1) {
      return false;
    } else {
      return true;
    }
  };
  // pagination active
  const [active, setActive] = useState(parseInt(urlParams.get("page")) || 1);
  let items = [];
  // table of pagination
  for (var i = 0; i < numberItems; i++) {
    items.push({ nbr: i + 1 });
  }
  // useParam

  return (
    <div className="container-lg mb-5">
      <div className="navigation">
        {"MarketPlace > "}
        {categorie ? categorie : ""}
      </div>
      <div className="row">
        <div className="d-none d-md-block col-3">
          <div className="Filter  bg-white rounded p-3">
            <div className="titleFilter">Filter by</div>
            {data.products.length === 0 ? (
              <div className="Empty"></div>
            ) : (
              <>
                {data.filter.map((variable, key) => {
                  return (
                    <>
                      <div className="titleVariable">{variable.name}</div>
                      <div className="p-3">
                        {variable.option.map((opt) => {
                          return (
                            <div>
                              <input
                                type="checkbox"
                                id={opt.name}
                                name={opt.name}
                                variable={variable.name}
                                onChange={FilterChange}
                                checked={checkValidation(
                                  opt.name,
                                  variable.name
                                )}
                              />
                              <label for={opt.name}>
                                {opt.name}
                                <span class="badge rounded-pill">
                                  {opt.nombreProduct}
                                </span>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  );
                })}
              </>
            )}
          </div>
        </div>
        <div className="col-12 col-md-9">
          <div className="Products bg-white rounded">
            <div className="titleProducts">
              {categorie}{" "}
              {data.number_of_products
                ? " ( " + data.number_of_products + " )"
                : ""}
              <div className="trie">
                <select name="trie" id="trie" onChange={trieChange}>
                  <option value="">Date</option>
                  <option value="pc">Ascending price</option>
                  <option value="pd">Decreasing price</option>
                  <option value="r">Rating</option>
                </select>
              </div>
            </div>
            {data.products.length === 0 ? (
              <div className="Empty mb-3">This category is empty</div>
            ) : (
              <div className="row pe-3 px-3">
                {data.products.map((item, key) => {
                  return (
                    <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2 mb-3 p-0">
                      <div className="itemProduct m-1" key={key}>
                        <div className="thumb-wrapper">
                          <div className="position-relative img-box">
                            <Link to={"/Product/" + item.SKU}>
                              <div
                                className="position-absolute imgProduct"
                                style={{
                                  backgroundImage:
                                    "url(" + item.picture[0] + ")",
                                }}
                              ></div>
                            </Link>
                          </div>
                          <div className="thumb-content">
                            <Link to={"/Product/" + item.SKU}>
                              <p className="text-dark">{item.name}</p>
                            </Link>
                            <p className="item-price">
                              {item.reduction_percentage === 0 ? (
                                <b>{item.price} TND</b>
                              ) : (
                                <>
                                  <strike className="me-2">
                                    {item.price} TND
                                  </strike>
                                  <b>
                                    {(item.price *
                                      (100 - item.reduction_percentage)) /
                                      100}
                                    TND
                                  </b>
                                </>
                              )}
                            </p>
                            <div className="star-rating">
                              <ul className="list-inline">
                                {showStars(item.stars)}
                              </ul>
                            </div>
                            <button
                              className="btn btn-orange btn-sm"
                              onClick={() => {
                                addToLocalStorage(item);
                              }}
                              data-abc="true"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <Pagination>
            {items.map((item, key) => {
              return (
                <Pagination.Item
                  key={key}
                  active={item.nbr === active}
                  onClick={changepagination}
                  page={item.nbr}
                >
                  {item.nbr}
                </Pagination.Item>
              );
            })}
          </Pagination>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
