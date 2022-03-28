import { useState, useEffect } from "react";
import api from "./../../config.service";

const Myaccount = () => {
  const [erreur, setErreur] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    newPassword: "",
    birthday: "",
    address: "",
    codePostal: "",
    ville: "",
    country: "",
    phone: "",
  });
  const [UpdateInfo, setUpdateInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    newPassword: "",
    birthday: "",
    address: "",
    codePostal: "",
    ville: "",
    country: "",
    phone: "",
  });
  const myaccountChangeHandler = (e) => {
    setUpdateInfo({
      ...UpdateInfo,
      [e.target.name]: e.target.value,
    });
    console.log(UpdateInfo);
  };

  //begin api getMyData
  const retrieveMyData = async () => {
    const response = await api.get("/Client/MyData");
    return response.data;
  };
  useEffect(() => {
    const getMyData = async () => {
      const myData = await retrieveMyData();
      if (myData)
        setUpdateInfo({
          firstname: myData.firstname,
          lastname: myData.lastname,
          email: myData.email,
          password: "",
          newPassword: "",
          birthday: myData.birthday,
          address: myData.address,
          codePostal: myData.codePostal,
          ville: myData.ville,
          country: myData.country,
          phone: myData.phone,
        });
    };
    getMyData();
  }, []);
  //end api getMyData

  return (
    <div className="row justify-content-center mb-5 w-100 mx-0">
      <div className="col-12 col-md-10 col-lg-9 col-xl-8 col-xxl-6">
        <div className="text-center titleCarousel">
          My <b>account</b>
        </div>
        <div className="card formulaire p-3 mt-5">
          <div className="mb-3">
            <label className="form-label">Full name</label>
            <div className="row g-3 align-items-center">
              <div className="col-12 col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="firstname"
                  placeholder="First name"
                  onChange={myaccountChangeHandler}
                  value={UpdateInfo.firstname}
                />
              </div>
              <div className="col-12 col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  placeholder="Last name"
                  onChange={myaccountChangeHandler}
                  value={UpdateInfo.lastname}
                />
              </div>
            </div>
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your Email"
              onChange={myaccountChangeHandler}
              value={UpdateInfo.email}
            />
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="birthday" className="form-label">
              Date Of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="birthday"
              name="birthday"
              onChange={myaccountChangeHandler}
              value={UpdateInfo.birthday}
            />
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              placeholder="Enter your adress"
              onChange={myaccountChangeHandler}
              value={UpdateInfo.address}
            />
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <div className="row g-3 align-items-center">
              <div className="col-12 col-md-4">
                <input
                  type="text"
                  className="form-control"
                  name="country"
                  placeholder="country"
                  onChange={myaccountChangeHandler}
                  value={UpdateInfo.country}
                />
              </div>
              <div className="col-12 col-md-4">
                <input
                  type="text"
                  className="form-control"
                  name="ville"
                  placeholder="Town"
                  onChange={myaccountChangeHandler}
                  value={UpdateInfo.ville}
                />
              </div>
              <div className="col-12 col-md-4">
                <input
                  type="text"
                  className="form-control"
                  name="codePostal"
                  placeholder="Postal code"
                  onChange={myaccountChangeHandler}
                  value={UpdateInfo.codePostal}
                />
              </div>
            </div>
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="phone" className="form-label">
              Phone number
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Enter your Phone number"
              onChange={myaccountChangeHandler}
              value={UpdateInfo.phone}
            />
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your Password"
              onChange={myaccountChangeHandler}
            />
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="newPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              name="newPassword"
              placeholder="Enter your New Password"
              onChange={myaccountChangeHandler}
            />
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="text-end">
            <button className="btn btn-orange m-auto">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myaccount;
