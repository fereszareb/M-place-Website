import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./../css/registration.css";
import { Link } from "react-router-dom";
import api from "./../config.service";
const Register = () => {
  const history = useHistory();
  if (localStorage.getItem("token") !== null) {
    history.push("/");
  }
  const [Submited, setSubmited] = useState(false);
  const [MssageErreur, setMessageErreur] = useState("");
  const [registerInfo, setRegisterInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    numTel: 0,
    password_repeat: "",
    licence: false,
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    numTel: false,
    password_repeat: false,
    licence: false,
  });

  const regChangeHandler = (e) => {
    setRegisterInfo({
      ...registerInfo,
      [e.target.name]: e.target.value,
    });
    if (Submited) {
      validateData();
    }
  };

  const regChangecheckBox = (e) => {
    setRegisterInfo({
      ...registerInfo,
      [e.target.name]: e.target.checked,
    });
    if (Submited) {
      validateData();
    }
  };

  function validateData() {
    !registerInfo.firstName
      ? (errors.firstName = true)
      : (errors.firstName = false);
    !registerInfo.lastName
      ? (errors.lastName = true)
      : (errors.lastName = false);
    !registerInfo.numTel || registerInfo.numTel.length !== 8
      ? (errors.numTel = true)
      : (errors.numTel = false);
    registerInfo.password_repeat !== registerInfo.password ||
    !registerInfo.password_repeat
      ? (errors.password_repeat = true)
      : (errors.password_repeat = false);
    !registerInfo.email ? (errors.email = true) : (errors.email = false);
    !registerInfo.password || registerInfo.password.length < 8
      ? (errors.password = true)
      : (errors.password = false);
    registerInfo.licence ? (errors.licence = true) : (errors.licence = false);
    setErrors(errors);
  }

  const [Success, setSuccess] = useState(false);
  const register = (e) => {
    e.preventDefault();
    setSubmited(true);
    validateData();
    if (
      errors.email === true ||
      errors.firstName === true ||
      errors.lastName === true ||
      errors.numTel === true ||
      errors.password === true ||
      errors.password_repeat === true /*||
      errors.licence === true*/
    ) {
      setMessageErreur("All data is required!");
    } else if (registerInfo.password_repeat !== registerInfo.password) {
      setMessageErreur("Those passwords didn’t match. Try again.");
      /*  } else if (!registerInfo.licence) {
      setMessageErreur("Check the licence");*/
    } else {
      api
        .post("api/v1/auth/Client/register", registerInfo, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("response from registering", res.status);
          console.log(res.data);
          if (res.data.errors) {
            setMessageErreur(res.data.msg);
          } else {
            console.log("success!");
            setSuccess(true);
          }
        })
        .catch((err) => setMessageErreur("Client already exists"));
    }
  };

  return (
    <section className="register">
      {Success === false ? (
        <div className="form-container">
          <div className="image-holder"></div>
          <form onSubmit={register}>
            <h2 className="text-center">
              <strong>Create</strong> an account.
            </h2>
            <div className="mb-3">
              <input
                className={"form-control " + (errors.firstName ? "erreur" : "")}
                type="text"
                name="firstName"
                onChange={regChangeHandler}
                placeholder="First name"
              />
            </div>
            <div className="mb-3">
              <input
                className={"form-control " + (errors.lastName ? "erreur" : "")}
                type="text"
                name="lastname"
                onChange={regChangeHandler}
                placeholder="Last name"
              />
            </div>
            <div className="mb-3">
              <input
                className={"form-control " + (errors.email ? "erreur" : "")}
                type="email"
                name="email"
                onChange={regChangeHandler}
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
              <input
                className={"form-control " + (errors.password ? "erreur" : "")}
                type="password"
                name="password"
                onChange={regChangeHandler}
                placeholder="Password"
              />
            </div>
            <div className="mb-3">
              <input
                className={
                  "form-control " + (errors.password_repeat ? "erreur" : "")
                }
                type="password"
                name="password_repeat"
                onChange={regChangeHandler}
                placeholder="Password (repeat)"
              />
            </div>
            <div className="mb-3">
              <input
                className={"form-control " + (errors.numTel ? "erreur" : "")}
                type="text"
                name="numTel"
                onChange={regChangeHandler}
                placeholder="Phone"
              />
            </div>
            <div className="mb-3">
              <div className="form-check">
                <label
                  className={
                    "form-check-label " +
                    (errors.licence ? "erreurLicence" : "")
                  }
                >
                  <input
                    className={
                      "form-check-input " +
                      (errors.licence ? "erreurLicence" : "")
                    }
                    onChange={regChangecheckBox}
                    type="checkbox"
                    name="licence"
                  />
                  I agree to the license terms.
                </label>
              </div>
            </div>
            <p className="text-danger text-center">{MssageErreur}</p>
            <div className="mb-3">
              <button className="btn btn-primary d-block w-100" type="submit">
                Sign Up
              </button>
            </div>
            <Link className="already" to="./login">
              You already have an account? Login here.
            </Link>
          </form>
        </div>
      ) : (
        <div className="form-container">
          <div className="messageEmailConfiramation">
            <h2>Thanks for signing up, please confirm your email.</h2>
            <p className="mt-2">
              We've emailed you a confirmation link. Once you confirm your email
              you can continue setting up your profile
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
      )}
    </section>
  );
};

export default Register;
