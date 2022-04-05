import React, { useState } from "react";

// creating functional component ans getting props from app.js and destucturing them
const StepThree = ({
  nextStep,
  prevStep,
  submitSignUP,
  values,
  registerChangeHandler,
  loadingSubmit,
}) => {
  // after form submit validating the form
  const submitFormData = (e) => {
    e.preventDefault();
    if (confirmation) {
      submitSignUP();
    }
  };
  const [confirmation, setConfirmation] = useState(false);
  const confirmationChangeHandler = (e) => {
    if (e.target.value === values.password) {
      setConfirmation(true);
    } else {
      setConfirmation(false);
    }
  };
  return (
    <div>
      <div className="text-center titleCarousel mb-0">
        Account <b>Security</b>
      </div>

      <form onSubmit={submitFormData}>
        <div className="card formulaire p-3 mt-5">
          <div className="mb-3">
            <label for="password" className="form-label">
              Password <small className="text-danger">*</small>
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              required
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,26}$"
              placeholder="Enter your Password"
              onChange={registerChangeHandler}
              defaultValue={values.password}
            />
          </div>
          <div className="mb-3">
            <label for="confirmationPassword" className="form-label">
              Confirmation password <small className="text-danger">*</small>
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmationPassword"
              name="confirmationPassword"
              required
              placeholder="Enter your Company Name"
              onChange={confirmationChangeHandler}
            />
          </div>
          <small>
            The password should have :
            <ul>
              <li>At least one lowercase letter(a - z)</li>
              <li>At least one uppercase letter(A - Z)</li>
              <li>At least one numeric value(0-9)</li>
              <li>At least one special symbol(!@#$%^&*=+-_)</li>
              <li>
                The total length should be greater than or equal to 8 and less
                or equal to 26
              </li>
            </ul>
          </small>
          <div className="row mt-3">
            <div className="col-6">
              <button className="btn btn-orange m-auto" onClick={prevStep}>
                Previous
              </button>
            </div>
            <div className="col-6 text-end">
              <button
                className="btn btn-orange m-auto"
                type="submit"
                disabled={loadingSubmit}
              >
                {loadingSubmit ? (
                  <div
                    class="spinner-border text-secondary spinner-small m-auto"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StepThree;
