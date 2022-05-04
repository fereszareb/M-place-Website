import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../css/presentation.css";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import Responsive from "./carousel.js";

import "react-toastify/dist/ReactToastify.css";
var presentationData = {
  carousel: [
    { link: "https://picsum.photos/id/222/2000/500" },
    { link: "https://picsum.photos/id/232/2000/500" },
    { link: "https://picsum.photos/id/228/2000/500" },
  ],
  categories: [
    {
      id: 1,
      title: "Categ 1",
      minPrice: 120,
      pictures: [
        "https://picsum.photos/id/249/500/500",
        "https://picsum.photos/id/299/500/500",
        "https://picsum.photos/id/322/500/500",
      ],
    },
    {
      id: 2,
      title: "Categ 2",
      minPrice: 120,
      pictures: [
        "https://picsum.photos/id/252/500/500",
        "https://picsum.photos/id/382/500/500",
        "https://picsum.photos/id/256/500/500",
      ],
    },
    {
      id: 3,
      title: "Categ 3",
      minPrice: 1000,
      pictures: [
        "https://picsum.photos/id/282/500/500",
        "https://picsum.photos/id/218/500/500",
        "https://picsum.photos/id/221/500/500",
      ],
    },
    {
      id: 4,
      title: "Categ 4",
      minPrice: 80,
      pictures: [
        "https://picsum.photos/id/272/500/500",
        "https://picsum.photos/id/252/500/500",
        "https://picsum.photos/id/292/500/500",
      ],
    },
  ],
  featuredProduct: [
    {
      id: "95",
      name: "Iphone 13",
      stars: 3.5,
      price: "1265",
      reduction: "10",
      picture: "https://picsum.photos/id/365/500/500",
      SKU: "sam-04AB",
    },
    {
      id: "5556",
      name: "Iphone 13",
      stars: 4,
      price: "1265",
      reduction: "10",
      picture: "https://picsum.photos/id/365/500/500",
      SKU: "sam-04AB",
    },
    {
      id: "8278",
      name: "Iphone 13",
      stars: 5,
      price: "1265",
      reduction: "10",
      picture: "https://picsum.photos/id/365/500/500",
      SKU: "sam-04AB",
    },
    {
      id: "2548458",
      name: "Iphone 13",
      stars: 2.5,
      price: "1265",
      reduction: "10",
      picture: "https://picsum.photos/id/365/500/500",
      SKU: "sam-04AB",
    },
    {
      id: "2595",
      name: "Iphone 13",
      stars: 3,
      price: "1265",
      reduction: "10",
      picture: "https://picsum.photos/id/365/500/500",
      SKU: "sam-04AB",
    },
    {
      id: "89966",
      name: "Iphone 13",
      stars: 3,
      price: "1265",
      reduction: "10",
      picture: "https://picsum.photos/id/365/500/500",
      SKU: "sam-04AB",
    },
    {
      id: "2448",
      name: "Iphone 13",
      stars: 3,
      price: "1265",
      reduction: "10",
      picture: "https://picsum.photos/id/365/500/500",
      SKU: "sam-04AB",
    },
    {
      id: "94598",
      name: "Iphone 13",
      stars: 3,
      price: "1265",
      reduction: "10",
      picture: "https://picsum.photos/id/365/500/500",
      SKU: "sam-04AB",
    },
  ],
  recommendedProduct: [
    {
      id: "1259",
      name: "Iphone 13",
      stars: 3.5,
      price: "1265",
      reduction: "0",
      picture: "https://picsum.photos/id/365/500/500",
      SKU: "sam-04AB",
    },
    {
      id: "12554",
      name: "Iphone 13",
      stars: 4,
      price: "1265",
      reduction: "0",
      picture: "https://picsum.photos/id/365/500/500",
      SKU: "sam-04AB",
    },
    {
      id: "1565",
      name: "Iphone 13",
      stars: 5,
      price: "1265",
      reduction: "10",
      picture: "https://picsum.photos/id/365/500/500",
      SKU: "sam-04AB",
    },
    {
      id: "248",
      name: "Iphone 13",
      stars: 2.5,
      price: "1265",
      reduction: "10",
      picture: "https://picsum.photos/id/365/500/500",
      SKU: "sam-04AB",
    },
    {
      id: "24865",
      name: "Iphone 13",
      stars: 3,
      price: "1265",
      reduction: "10",
      picture: "https://picsum.photos/id/365/500/500",
      SKU: "sam-04AB",
    },
    {
      id: "335935",
      name: "Iphone 13",
      stars: 3,
      price: "1265",
      reduction: "10",
      picture: "https://picsum.photos/id/365/500/500",
      SKU: "sam-04AB",
    },
    {
      id: "9539",
      name: "Iphone 13",
      stars: 3,
      price: "1265",
      reduction: "10",
      picture: "https://picsum.photos/id/365/500/500",
      SKU: "sam-04AB",
    },
    {
      id: "295",
      name: "Iphone 13",
      stars: 3,
      price: "1265",
      reduction: "10",
      picture: "https://picsum.photos/id/365/500/500",
      SKU: "sam-04AB",
    },
  ],
  partner: [
    { img: "//logo.clearbit.com/google.com?greyscale=true", name: "Google" },
    { img: "//logo.clearbit.com/shopify.com?greyscale=true", name: "Shopify" },
    {
      img: "//logo.clearbit.com/ethereum.org?greyscale=true",
      name: "Ethereum",
    },
    {
      img: "//logo.clearbit.com/tunisair.com?greyscale=true",
      name: "Tunisair",
    },
    { img: "//logo.clearbit.com/topnet.tn?greyscale=true", name: "Topnet" },
  ],
};
const Presentation = () => {
  return (
    <div className="container-fluid presentation">
      <Carousel fade={true} controls={false} indicators={false}>
        {presentationData.carousel.map((item, key) => {
          return (
            <Carousel.Item key={key}>
              <div
                className="d-block carouselItems"
                style={{
                  backgroundImage: "url(" + item.link + ")",
                }}
                alt="First slide"
              />
            </Carousel.Item>
          );
        })}
      </Carousel>

      <div className="container mt-50">
        <div className="row">
          {presentationData.categories.map((item, key) => {
            return (
              <div className="col-md-3 col-sm-6" key={key}>
                <div className="card mb-30">
                  <Link
                    className="card-img-tiles"
                    to={"/" + item.title.replaceAll(" ", "_")}
                    data-abc="true"
                  >
                    <div className="inner">
                      <div className="main-img">
                        <img src={item.pictures[0]} alt="Category" />
                      </div>
                      <div className="thumblist">
                        <img src={item.pictures[1]} alt="Category" />
                        <img src={item.pictures[2]} alt="Category" />
                      </div>
                    </div>
                  </Link>
                  <div className="card-body text-center">
                    <h4 className="card-title">{item.title}</h4>
                    <p className="text-muted">
                      Starting from {item.minPrice} TND
                    </p>
                    <Link
                      className="btn btn-orange btn-sm"
                      to={"/" + item.title.replaceAll(" ", "_")}
                      data-abc="true"
                    >
                      View Products
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container">
        <Responsive data={presentationData.featuredProduct} name="Featured" />
      </div>
      <div className="container">
        <Responsive
          data={presentationData.recommendedProduct}
          name="Recommended"
        />
      </div>
      <div className="brands">
        <a href="/">
          {presentationData.partner.map((item, key) => {
            return <img key={key} alt={item.name} src={item.img} />;
          })}
        </a>
      </div>
    </div>
  );
};

export default Presentation;
