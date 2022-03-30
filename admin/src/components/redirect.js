import React from "react";
import { useParams, useHistory } from "react-router-dom";

const Redirect = () => {
  const history = useHistory();
  const { token, refreshToken, username } = useParams();
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("user", username);
  history.push("/");
  return null;
};

export default Redirect;
