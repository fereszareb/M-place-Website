import React, { Component } from "react";
import Slider from "react-slick";
import "./../../css/product.css";

const ImagesProduct = ({ listeImage }) => {
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      {listeImage ? (
        <Slider {...settings}>
          {listeImage.map((image, key) => {
            return (
              <div key={key}>
                <img className="w-100" alt="" src={image} />
              </div>
            );
          })}
        </Slider>
      ) : (
        ""
      )}
    </div>
  );
};

export default ImagesProduct;
