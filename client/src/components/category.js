import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import "./../css/category.css";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { useState } from "react";
import api from "./../config.service";

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

const Category = () => {
  const { categ, sousCateg, sousSousCateg } = useParams();
  //begin api getAllByCateg
  const [data, setdata] = useState({
    filter: [],
    products: [],
    number_of_products: 0,
  });
  const retrieveUsers = async () => {
    const response = await api.get(
      "/categoriess/" + (sousSousCateg || sousCateg || categ)
    );
    return response.data;
  };
  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveUsers();
      if (allUsers) setdata(allUsers);
    };
    getAllUsers();
  }, []);
  //end api getAllByCateg

  const history = useHistory();
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
      var filter = {};
      api.get("/categoriess/" + (sousSousCateg || sousCateg || categ));
    } else {
      setSearchData((data) => [...newSearch]);
    }
  }
  // pagination active
  const [active, setActive] = useState(parseInt(urlParams.get("page")) || 1);
  let items = [];
  // table of pagination
  for (var i = 0; i < numberItems; i++) {
    items.push({ nbr: i + 1 });
  }
  // useParam

  return (
    <div className="container-lg">
      <div className="navigation">
        {"MarketPlace > "}
        {categ ? categ : ""}
        {sousCateg ? " > " + sousCateg : ""}
        {sousSousCateg ? " > " + sousSousCateg : ""}
      </div>
      <div className="row">
        <div className="d-none d-md-block col-3">
          <div className="Filter  bg-white rounded p-3">
            <div className="titleFilter">Filter by</div>
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
          </div>
        </div>
        <div className="col-12 col-md-9">
          <div className="Products bg-white rounded">
            <div className="titleProducts">
              {categ}
              <div className="trie">
                <select name="trie" id="trie">
                  <option value="0">Trie number one</option>
                  <option value="1">Trie number two</option>
                  <option value="2">Trie number three</option>
                </select>
              </div>
            </div>
            <div className="row">
              {data.products.map((item, key) => {
                return (
                  <div className="col-6 col-sm-4 col-md-4 col-lg-3 mb-3">
                    <Link to={"/Product/" + item.name}>
                      <div className="itemProduct m-1" key={key}>
                        <div className="thumb-wrapper">
                          <div className="position-relative img-box">
                            <div
                              className="position-absolute imgProduct"
                              style={{
                                backgroundImage: "url(" + item.picture + ")",
                              }}
                            ></div>
                          </div>
                          <div className="thumb-content">
                            <h4>{item.name}</h4>
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
                            <Link
                              className="btn btn-orange btn-sm"
                              to={item.link}
                              data-abc="true"
                            >
                              Add to Cart
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
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
        </div>
      </div>
    </div>
  );
};

export default Category;
