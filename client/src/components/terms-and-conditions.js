import { React, useEffect, useState } from "react";
import api from "../config.service";
const TermsAndConditions = () => {
  //begin api getAll
  const [data, setData] = useState("");
  const retrieveTermeAndCondition = async () => {
    const response = await api.get("/termsandconditions");
    return response.data;
  };
  useEffect(() => {
    const getTermeAndCondition = async () => {
      const TermeAndCondition = await retrieveTermeAndCondition();
      if (TermeAndCondition) setData(TermeAndCondition);
      console.log(TermeAndCondition);
    };
    getTermeAndCondition();
  }, []);
  //end api getAll
  return (
    <div className="row justify-content-center mb-5 w-100 mx-0">
      <div className="col-12 col-md-10 col-lg-9 col-xl-8 ">
        <div className="text-center titleCarousel">
          Terms and <b>Conditions</b>
        </div>
        <div
          className="card p-3 mt-5"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>
    </div>
  );
};

export default TermsAndConditions;
