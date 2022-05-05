import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../css/presentation.css";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import Responsive from "./carousel.js";
import api from "./../config.service";
import "react-toastify/dist/ReactToastify.css";

const Presentation = ({ CalcnumberOfProduct }) => {
  const [presentationData, setpresentationData] = useState({
    carousel: [],
    categories: [],
    featuredProduct: [],
    recommendedProduct: [],
    partner: [],
  });

  const retrieveData = async () => {
    const response = await api.get("/Settings");
    return response.data;
  };
  useEffect(() => {
    const getData = async () => {
      const dataOfPresentation = await retrieveData();
      if (dataOfPresentation) setpresentationData(dataOfPresentation);
      console.log(dataOfPresentation);
    };
    getData();
  }, []);
  //end api getAll
  return (
    <div className="container-fluid presentation">
      <Carousel fade={true} controls={false} indicators={false}>
        {presentationData.carousel.map((item, key) => {
          return (
            <Carousel.Item key={key}>
              <div
                className="d-block carouselItems"
                style={{
                  backgroundImage: "url(" + item + ")",
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
              <div className="col-lg-3 col-sm-6" key={key}>
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
                    <h5 className="card-title">{item.title}</h5>
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
        <Responsive
          data={presentationData.featuredProduct}
          CalcnumberOfProduct={CalcnumberOfProduct}
          name="Featured"
        />
      </div>
      <div className="container">
        <Responsive
          data={presentationData.recommendedProduct}
          CalcnumberOfProduct={CalcnumberOfProduct}
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
