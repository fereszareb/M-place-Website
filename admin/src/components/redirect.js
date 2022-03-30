import React from "react";
import { useParams, useHistory } from "react-router-dom";

const Redirect = () => {
  const history = useHistory();
  const { token, refreshToken } = useParams();
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
  history.push("/");
  return null;
};

export default Redirect;
