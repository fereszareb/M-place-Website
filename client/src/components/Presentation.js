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

  const carouselVariable1 = [
    {
      id: "125485",
      picture: [
        "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/61/3514/1.jpg?0007",
      ],
      name: "Balance de cuisine Electronique - 10 kg",
      price: 37,
      reduction: 54,
      SKU: "Infinix",
      stars: 4,
    },
    {
      id: "12525",
      picture: [
        "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/66/8564/1.jpg?6642",
      ],
      name: "XIAOMI Mi Smart Band 5 - Noir - Garantie 1 an",
      price: 139,
      reduction: 0,
      SKU: "Infinixww",
      stars: 5,
    },
    {
      id: "1255",
      picture: [
        "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/91/4353/1.jpg?2967",
      ],
      name: "Samsung Galaxy A30 - 6.4'' - 4 Go - 64 Go - Noir - Garantie 1 an",
      price: 764.15,
      reduction: 10,
      SKU: "samsung-G-a30",
      stars: 4.5,
    },

    {
      id: "125",
      picture: [
        "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/63/4484/1.jpg?7708",
      ],
      name: "Sneakers LC z5 Noir - Design Perforé - Cuir",
      price: 89,
      reduction: 8,
      SKU: "Infinix",
      stars: 5,
    },
    {
      id: "1525",
      picture: [
        "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/09/2624/1.jpg?5488",
      ],
      name: "Rouleau Massage du Visage - Pierre de Jade Vert",
      price: 32,
      reduction: 71,
      SKU: "Infinhhix",
      stars: 4,
    },
    {
      id: "1525",
      picture: [
        "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/73/2583/1.jpg?6242",
      ],
      name: "XIAOMI Mi Band 5 - Noir",
      price: 249,
      reduction: 0,
      SKU: "Infinhhix",
      stars: 4.5,
    },
  ];
  const carouselVariable = [
    {
      id: "125485",
      picture: [
        "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/26/9665/1.jpg?6107",
      ],
      name: "Infinix Smart 6 - 6.6'' - 3Go - 64Go - Quetzal Cyan - Garantie 1 an",
      price: 499,
      reduction: 0,
      SKU: "Infinix",
      stars: 4.5,
    },
    {
      id: "1255",
      picture: [
        "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/91/4353/1.jpg?2967",
      ],
      name: "Samsung Galaxy A30 - 6.4'' - 4 Go - 64 Go - Noir - Garantie 1 an",
      price: 764.15,
      reduction: 10,
      SKU: "samsung-G-a30",
      stars: 4.5,
    },
    {
      id: "12525",
      picture: [
        "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/66/8564/1.jpg?6642",
      ],
      name: "XIAOMI Mi Smart Band 5 - Noir - Garantie 1 an",
      price: 139,
      reduction: 0,
      SKU: "Infinixww",
      stars: 5,
    },
    {
      id: "125",
      picture: [
        "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/22/6305/1.jpg?3269",
      ],
      name: "Infinix HOT11 Play - 6.82'' - 4G_64G - Sunset Gold - Garantie 1 An",
      price: 569,
      reduction: 2,
      SKU: "Infinix",
      stars: 3.5,
    },
    {
      id: "1525",
      picture: [
        "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/73/2583/1.jpg?6242",
      ],
      name: "XIAOMI Mi Band 5 - Noir",
      price: 249,
      reduction: 0,
      SKU: "Infinhhix",
      stars: 4.5,
    },
    {
      id: "1525",
      picture: [
        "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/73/2583/1.jpg?6242",
      ],
      name: "XIAOMI Mi Band 5 - Noir",
      price: 249,
      reduction: 0,
      SKU: "Infinhhix",
      stars: 4.5,
    },
  ];
  const categories = [
    {
      id: "623b55569a51019ee6776705",
      title: "Computer",
      minPrice: 780,
      pictures: [
        "http://res.cloudinary.com/dduhpdqv3/image/upload/v1652050581/E-Market/Images/ja6de5mdxs6uapira6ao.jpg",
        "http://res.cloudinary.com/dduhpdqv3/image/upload/v1652054233/E-Market/Images/yelmedy8gtepn09vvpow.jpg",
        "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/54/4644/1.jpg?1889",
      ],
    },
    {
      id: "622f3c32516e0c3e2a963b68",
      title: "SmartPhone",
      minPrice: 160,
      pictures: [
        "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/22/6305/1.jpg?3269",
        "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/91/4353/1.jpg?2967",
        "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/26/9665/1.jpg?6107",
      ],
    },
    {
      id: "622f3c32516e0c3e2a963b68",
      title: "Clothes",
      minPrice: 25,
      pictures: [
        "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/35/2614/1.jpg?3767",
        "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/45/6141/1.jpg?7497",
        "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/88/6362/1.jpg?4867",
      ],
    },
    {
      id: "622f3c32516e0c3e2a963b68",
      title: "Sport",
      minPrice: 70,
      pictures: [
        "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/77/9334/1.jpg?3704",
        "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/74/0865/1.jpg?2171",
        "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/32/4605/1.jpg?1167",
      ],
    },
  ];
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
          {categories.map((item, key) => {
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
          data={carouselVariable1}
          CalcnumberOfProduct={CalcnumberOfProduct}
          name="Featured"
        />
      </div>
      <div className="container">
        <Responsive
          data={carouselVariable}
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
