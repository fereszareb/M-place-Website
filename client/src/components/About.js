import { React, useEffect, useState } from "react";
import api from "./../config.service";
const About = () => {
  //begin api getAll
  const [data, setData] = useState("");
  const retrieveAboutUs = async () => {
    const response = await api.get("/Settings");
    return response.data.AboutUs;
  };
  useEffect(() => {
    const getAboutUs = async () => {
      const aboutUs = await retrieveAboutUs();
      if (aboutUs) setData(aboutUs);
    };
    getAboutUs();
  }, []);
  //end api getAll
  return (
    <div className="row justify-content-center mb-5 w-100 mx-0">
      <div className="col-12 col-md-10 col-lg-9 col-xl-8 ">
        <div className="text-center titleCarousel">
          About <b>Us</b>
        </div>
        <div
          className="card p-3 mt-5"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>
    </div>
  );
};

export default About;
