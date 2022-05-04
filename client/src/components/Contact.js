import { React, useState } from "react";
import api from "./../config.service";
import "./../css/contact.css";
const Contact = () => {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
    messages: "",
  });
  const ContactChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const [success, setSuccess] = useState(false);
  const [rrreurDisplay, setErreurDisplay] = useState(false);
  const send = (e) => {
    e.preventDefault();
    api
      .post("contact/send", data, {
        withCredentials: true,
      })
      .then((res) => {
        setSuccess(true);
      })
      .catch(function (error) {
        if (error.response) {
          setErreurDisplay(error.response.data.msg);
        }
      });
  };
  return (
    <div className="container info-container">
      <div className="row">
        <div className="col-md-12">
          <div className="text-center titleCarousel">
            Contact <b>Us</b>
          </div>
        </div>
        <div className="col-12 col-md-6 contact-box">
          <p className="contact-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel nam
            magnam natus tempora cumque, aliquam deleniti voluptatibus voluptas.
            Repellat vel, et itaque commodi iste ab, laudantium voluptas
            deserunt nobis.
          </p>
          <div className="info-box">
            <span className="text-uppercase text-orange">Address: </span>
            <span>Technopole Ghazela, Ariana, Tunisie</span>
          </div>
          <div className="info-box">
            <span className="text-uppercase text-orange">Email: </span>
            <span>contact@m-carketplace.tn </span>
          </div>
          <div className="info-box">
            <span className="text-uppercase text-orange">Phone: </span>
            <span>+216 20 202 020 </span>
          </div>
        </div>
        <div className="col-12 col-md-6 site-form">
          {success ? (
            <div className="bg-white text-center pt-5 pb-5 rounded">
              <h2>Message sended</h2>
              <p>
                Thank you for sending us thsis message, we will answer you as
                soon as possible.
              </p>
            </div>
          ) : (
            <form className="my-form" onSubmit={send}>
              <div className="form-group mb-3">
                <label className="form-label visually-hidden" for="firstname">
                  First Name
                </label>
                <input
                  id="firstname"
                  className="form-control"
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  required
                  autofocus
                  onChange={ContactChangeHandler}
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label visually-hidden" for="lastname">
                  Last Name
                </label>
                <input
                  id="lastname"
                  className="form-control"
                  type="text"
                  name="lastname"
                  required
                  placeholder="Last Name"
                  onChange={ContactChangeHandler}
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label visually-hidden" for="phonenumber">
                  Phone Number
                </label>
                <input
                  id="phonenumber"
                  className="form-control"
                  type="tel"
                  name="phonenumber"
                  required
                  placeholder="Phone"
                  onChange={ContactChangeHandler}
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label visually-hidden" for="email">
                  Email Address
                </label>
                <input
                  id="email"
                  className="form-control"
                  type="text"
                  name="email"
                  required
                  placeholder="Email"
                  onChange={ContactChangeHandler}
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label visually-hidden" for="messages">
                  Last Name
                </label>
                <textarea
                  className="form-control"
                  name="messages"
                  required
                  placeholder="Message"
                  rows="8"
                  onChange={ContactChangeHandler}
                ></textarea>
              </div>
              <div className="text-center">
                <small className="text-danger">{rrreurDisplay} </small>
              </div>
              <button className="btn btn-primary" type="submit">
                SEND
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
