import React from "react";
import { useParams, useHistory } from "react-router-dom";

const Redirect = () => {
  const history = useHistory();
  const { token, refreshToken } = useParams();
  localStorage.setItem("access_token", token);
  localStorage.setItem("refresh_token", refreshToken);
  history.push("/");
  return null;
};

export default Redirect;
