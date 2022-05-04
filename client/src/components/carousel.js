import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./../css/carousel.css";
import { Link } from "react-router-dom";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const notify = () => toast.success("Product added");
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
function addToLocalStorage(item) {
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
      reduction: item.reduction,
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
}
export default class Responsive extends Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };
    return (
      <div>
        <h2 className="titleCarousel">
          {this.props.name} <b>Products</b>
        </h2>
        <Slider {...settings}>
          {this.props.data.map((item, key) => {
            return (
              <div className="itemCarousel" key={key}>
                <div className="thumb-wrapper">
                  <div className="img-box">
                    <Link to={"Product/" + item.SKU}>
                      <img
                        src={item.picture}
                        className="img-fluid"
                        alt="Play Station"
                        draggable="false"
                      />
                    </Link>
                  </div>
                  <div className="thumb-content">
                    <Link className="item-name" to={"Product/" + item.SKU}>
                      <p className="text-dark">{item.name}</p>
                    </Link>
                    <p className="item-price">
                      {item.reduction == 0 ? (
                        <b>{item.price} TND</b>
                      ) : (
                        <>
                          <strike>{item.price} TND</strike>
                          <b>
                            {(item.price * (100 - item.reduction)) / 100} TND
                          </b>
                        </>
                      )}
                    </p>
                    <div className="star-rating">
                      <ul className="list-inline">{showStars(item.stars)}</ul>
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
            );
          })}
        </Slider>
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
    );
  }
}
