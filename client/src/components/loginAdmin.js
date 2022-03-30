import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./../css/login.css";
import logoDark from "./../logoDark.svg";
import api from "./../config.service";
import { Link } from "react-router-dom";

const LoginAdmin = () => {
  const history = useHistory();
  if (localStorage.getItem("token") !== null) {
    history.push("/");
  }
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const loginChangeHandler = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };
  const [ErreurDisplay, setErreurDisplay] = useState("");
  const login = (e) => {
    e.preventDefault();
    setErreurDisplay("");
    if (!loginInfo.email || !loginInfo.password) {
      setErreurDisplay("All data required !");
    } else if (
      // eslint-disable-next-line no-useless-escape
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginInfo.email)
    ) {
      setErreurDisplay("You have entered an invalid email address!");
    } else if (loginInfo.password.length < 8) {
      setErreurDisplay("The password should be more than 8 characters");
    } else {
      api
        .post("api/v1/auth/Admin/login", loginInfo, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          window.location.href =
            "http://localhost:3001/Redirect/" +
            res.data.access_token +
            "/" +
            res.data.refresh_token;
        })
        .catch(function (error) {
          if (error.response) {
            setErreurDisplay(error.response.data.msg);
          }
        });
    }
  };

  return (
    <section className="login">
      <form onSubmit={login}>
        <h2 className="visually-hidden">Login Form</h2>
        <div className="logo">
          <img src={logoDark} draggable="false" alt="logo" />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="email"
            name="email"
            onChange={loginChangeHandler}
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="password"
            name="password"
            onChange={loginChangeHandler}
            placeholder="Password"
          />
        </div>
        <small className="text-danger text-center d-block">
          {ErreurDisplay}
        </small>
        <div className="mb-3">
          <button className="btn btn-primary d-block w-100" type="submit">
            Log In
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginAdmin;
