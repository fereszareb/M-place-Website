import { React, useEffect, useState } from "react";
import api from "./../config.service";
const PrivacyPolicy = () => {
  //begin api getAll
  const [data, setData] = useState("");
  const retrievePrivacyPolicy = async () => {
    const response = await api.get("/abousUs");
    return response.data;
  };
  useEffect(() => {
    const getPrivacyPolicy = async () => {
      const PrivacyPolicy = await retrievePrivacyPolicy();
      if (PrivacyPolicy) setData(PrivacyPolicy);
      console.log(PrivacyPolicy);
    };
    getPrivacyPolicy();
  }, []);
  //end api getAll
  return (
    <div className="row justify-content-center mb-5 w-100 mx-0">
      <div className="col-12 col-md-10 col-lg-9 col-xl-8 ">
        <div className="text-center titleCarousel">
          Privacy <b>Policy</b>
        </div>
        <div
          className="card p-3 mt-5"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
