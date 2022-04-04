import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./../css/login.css";
import logoDark from "./../logoDark.svg";
import api from "./../config.service";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const history = useHistory();
  if (localStorage.getItem("token") !== null) {
    history.push("/");
  }
  const [email, setemail] = useState("");
  const [Submited, setSubmited] = useState(false);
  const loginChangeHandler = (e) => {
    setemail(e.target.value);
  };
  const [ErreurDisplay, setErreurDisplay] = useState("");
  const login = (e) => {
    e.preventDefault();
    setErreurDisplay("");
    if (!email) {
      setErreurDisplay("Enter your Email!");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setErreurDisplay("You have entered an invalid email address!");
    } else {
      api
        .post(
          "api/v1/auth/Client/forgetPassword",
          { email: email },
          {
            withCredentials: true,
          }
        )
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
        <div className="submitted">
          We've emailed you a ForgetPassword link.
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
              type="email"
              name="email"
              onChange={loginChangeHandler}
              placeholder="Email"
            />
          </div>
          <small className="text-danger text-center d-block">
            {ErreurDisplay}
          </small>
          <div className="mb-3">
            <button className="btn btn-primary d-block w-100" type="submit">
              Send email
            </button>
          </div>
          <Link className="forgot" to="/login">
            I remember my password
          </Link>
        </form>
      )}
    </section>
  );
};

export default ForgetPassword;
