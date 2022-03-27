import { useState } from "react";

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
  return (
    <div className="row justify-content-center mb-5 w-100 mx-0">
      <div className="col-12 col-md-10 col-lg-9 col-xl-8 col-xxl-6">
        <div className="text-center titleCarousel">
          My <b>account</b>
        </div>
        <div className="card formulaire p-3 mt-5">
          <div className="mb-3">
            <label className="form-label">Full name</label>
            <div class="row g-3 align-items-center">
              <div class="col-12 col-md-6">
                <input
                  type="text"
                  class="form-control"
                  name="firstname"
                  placeholder="First name"
                  onChange={myaccountChangeHandler}
                />
              </div>
              <div class="col-12 col-md-6">
                <input
                  type="text"
                  class="form-control"
                  name="lastname"
                  placeholder="Last name"
                  onChange={myaccountChangeHandler}
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
            />
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <div class="row g-3 align-items-center">
              <div class="col-12 col-md-4">
                <input
                  type="text"
                  class="form-control"
                  name="country"
                  placeholder="country"
                  onChange={myaccountChangeHandler}
                />
              </div>
              <div class="col-12 col-md-4">
                <input
                  type="text"
                  class="form-control"
                  name="ville"
                  placeholder="Town"
                  onChange={myaccountChangeHandler}
                />
              </div>
              <div class="col-12 col-md-4">
                <input
                  type="text"
                  class="form-control"
                  name="codePostal"
                  placeholder="Postal code"
                  onChange={myaccountChangeHandler}
                />
              </div>
            </div>
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
            />
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="newPassword" className="form-label">
              Password
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
            <button class="btn btn-orange m-auto">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myaccount;
