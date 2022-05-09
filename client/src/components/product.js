import { useParams } from "react-router-dom";
import "./../css/product.css";
import Specification from "./productComponents/specification";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { Tab, ListGroup } from "react-bootstrap";
import ImagesProduct from "./productComponents/images";
import Review from "./productComponents/review";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./../config.service";
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

var jsonRating = [
  {
    id: "555",
    client: "first name and last name",
    stars: 3.5,
    date: "2022-12-12",
    pictture: "https://pic",
    comment: "here is comment",
  },
  {
    id: "555",
    client: "first name and last name",
    stars: 3.5,
    date: "2022-12-12",
    pictture: "https://pic",
    comment: "here is comment",
  },
];

const Product = () => {
  const history = useHistory();
  const { product } = useParams();
  const [ratings, setRatings] = useState([]);
  const [data, setData] = useState({
    id: "",
    name: "",
    SKU: "",
    marque: "",
    categoryName: "",
    stars: 0,
    description: "",
    price: 0,
    reduction_percentage: 0,
    product_imgs: [],
    short_description: "",
    variables: [],
    PostedBy: {
      name: "",
      logo: "",
    },
  });
  const retrieveProduct = async () => {
    const response = await api.get("products/SKU/" + product);
    return response.data;
  };
  const retrieveRating = async () => {
    const response = await api.get("/ratings/SKU/" + product);
    return response.data;
  };
  const [IDPublisher, setIDPublisher] = useState("");
  useEffect(() => {
    const getData = async () => {
      const dataOfProduct = await retrieveProduct();
      if (dataOfProduct) {
        setData(dataOfProduct);
        setIDPublisher(dataOfProduct.PostedBy.id);
      }
    };
    const getRating = async () => {
      const dataOfRating = await retrieveRating();
      if (dataOfRating) setRatings(dataOfRating);
    };
    getData();
    getRating();
  }, []);
  //end api getAllByCateg

  const createRoom = () => {
    api.post("/room", { user: IDPublisher }).then((res) => {
      history.push("/chat");
    });
  };
  return (
    <div className="container mt-5 mb-5">
      <div className="cart-product p-0 p-md-5 pt-md-0">
        <div className="text-end pt-2 pb-2">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-primary mt-0">
              Report
            </button>
            <button type="button" class="btn btn-primary mt-0 me-1 mx-1">
              {data.PostedBy.name}
            </button>
            <button
              type="button"
              class="btn btn-primary mt-0 me-1"
              onClick={createRoom}
            >
              Message
            </button>
            <button type="button" class="btn btn-primary mt-0">
              Add to panier
            </button>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-12 col-lg-5 pe-4 px-4 p-sm-0">
            <ImagesProduct listeImage={data.picture} />
          </div>
          <div className="col-12 col-lg-7">
            <div className="container pl-4">
              <div className="title">{data.name}</div>
              <div className="contentProduct">
                <div className="star-rating px-3">
                  <ul className="list-inline">{showStars(data.stars)}</ul>
                </div>
                <div className="description px-3">{data.short_description}</div>
                <div className="statusOfProduct">
                  <div className="row">
                    <div className="col">In Stock</div>
                    <div className="col">Marque : {data.marque}</div>
                    <div className="col">SKU : {data.SKU}</div>
                  </div>
                </div>
                {data.reduction_percentage > 0 ? (
                  <div className="priceProduct">
                    {(data.price * (100 - data.reduction_percentage)) / 100}{" "}
                    <span className="orange">TND</span>
                    <span>
                      {" "}
                      <small className="text-muted mx-2">
                        <strike>{data.price} TND</strike>
                      </small>
                    </span>
                  </div>
                ) : (
                  <div className="priceProduct">
                    {data.price} <span className="orange">TND</span>
                  </div>
                )}

                <div className="selection mt-3">
                  {data.filters
                    ? data.filters.map((variable, key) => {
                        return (
                          <div className="row itemSelection pb-3">
                            <div className="col-4 itemTitle">
                              {variable.name}
                            </div>
                            <div className="col-8 itemChoise">
                              <select name={variable.name} id={variable.name}>
                                {variable.option.map((opt, key) => {
                                  return (
                                    <option value={opt.name}>
                                      {opt.name}{" "}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        );
                      })
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <ListGroup horizontal>
              <ListGroup.Item action href="#link1">
                Description
              </ListGroup.Item>
              <ListGroup.Item action href="#link3">
                Review
              </ListGroup.Item>
            </ListGroup>
            <Tab.Content>
              <Tab.Pane eventKey="#link1">
                <div
                  className="mt-5"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="#link3">
                <Review data={ratings} />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

export default Product;
