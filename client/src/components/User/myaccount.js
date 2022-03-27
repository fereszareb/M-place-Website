import { useState } from "react";

const Myaccount = () => {
  const [erreur, setErreur] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    newPassword: "",
    birthday: "",
    adress: "",
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
    adress: "",
    codePostal: "",
    ville: "",
    country: "",
    phone: "",
  });
  return (
    <div className="row justify-content-center">
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
                />
              </div>
              <div class="col-12 col-md-6">
                <input
                  type="text"
                  class="form-control"
                  name="lastname"
                  placeholder="Last name"
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
                />
              </div>
              <div class="col-12 col-md-4">
                <input
                  type="text"
                  class="form-control"
                  name="ville"
                  placeholder="Town"
                />
              </div>
              <div class="col-12 col-md-4">
                <input
                  type="text"
                  class="form-control"
                  name="codePostal"
                  placeholder="Postal code"
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
              placeholder="Enter your New Paswword"
            />
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myaccount;
