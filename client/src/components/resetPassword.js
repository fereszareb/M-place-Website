import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./../css/login.css";
import logoDark from "./../logoDark.svg";
import api from "./../config.service";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const history = useHistory();
  if (localStorage.getItem("token") !== null) {
    history.push("/");
  }
  const [data, setResetInfo] = useState({
    password: "",
    confirmPassword: "",
  });
  const [Submited, setSubmited] = useState(false);
  const loginChangeHandler = (e) => {
    setResetInfo({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };
  const [ErreurDisplay, setErreurDisplay] = useState("");
  const login = (e) => {
    e.preventDefault();
    setErreurDisplay("");
    if (!data.password) {
      setErreurDisplay("Enter your New Password!");
    } else if (data.password.length < 8) {
      setErreurDisplay("The password should be more than 8 characters");
    } else if (!data.confirmPassword) {
      setErreurDisplay("Repeat your New Password!");
    } else if (data.confirmPassword !== data.password) {
      setErreurDisplay("Confirmation Password Incorrect");
    } else {
      api
        .post("Client/resetPassword/" + token, data, {
          withCredentials: true,
        })
        .then((res) => {
          setSubmited(true);
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
      {Submited ? (
        <div className="form-container">
          <div className="messageEmailConfiramation">
            <h2>Thanks for resetting password</h2>
            <p className="mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
              inventore aliquam est sunt voluptatem quod
            </p>
            <div className="text-center">
              <Link
                className="btn btn-primary d-block m-auto pe-5 px-5 mt-5 w-200px"
                to="./login"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={login}>
          <h2 className="visually-hidden">Login Form</h2>
          <div className="logo">
            <img src={logoDark} draggable="false" alt="logo" />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={loginChangeHandler}
              placeholder="New Password"
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              name="confirmPassword"
              onChange={loginChangeHandler}
              placeholder="Repeat Password"
            />
          </div>
          <small className="text-danger text-center d-block">
            {ErreurDisplay}
          </small>
          <div className="mb-3">
            <button className="btn btn-primary d-block w-100" type="submit">
              Confirm
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default ResetPassword;
