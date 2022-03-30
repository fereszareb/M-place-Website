import React from "react";

// creating functional component ans getting props from app.js and destucturing them
const StepOne = ({
  nextStep,
  registerFileChangeHandler,
  values,
  registerChangeHandler,
}) => {
  // after form submit validating the form
  const submitFormData = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div>
      <div className="text-center titleCarousel mb-0">
        personal <b>information</b>
      </div>

      <form onSubmit={submitFormData}>
        <div className="card formulaire p-3 mt-5">
          <div className="mb-3">
            <label className="form-label">
              Full name <small className="text-danger">*</small>
            </label>
            <div className="row g-3 align-items-center">
              <div className="col-12 col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  required
                  placeholder="First name"
                  onChange={registerChangeHandler}
                  defaultValue={values.firstName}
                />
              </div>
              <div className="col-12 col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  required
                  placeholder="Last name"
                  onChange={registerChangeHandler}
                  defaultValue={values.lastName}
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label for="email" className="form-label">
              Email address <small className="text-danger">*</small>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              required
              placeholder="Enter your Email"
              onChange={registerChangeHandler}
              defaultValue={values.email}
            />
          </div>
          <div className="mb-3">
            <label for="phone" className="form-label">
              Phone <small className="text-danger">*</small>
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              required
              pattern="[0-9]{8}"
              name="phone"
              placeholder="Enter your Phone number"
              onChange={registerChangeHandler}
              defaultValue={values.phone}
            />
          </div>
          <div className="mb-3">
            <label for="cin" className="form-label">
              CIN <small className="text-danger">*</small>
            </label>
            <input
              type="text"
              className="form-control"
              id="cin"
              name="cin"
              pattern="[0-9]{8}"
              required
              placeholder="Enter your CIN number"
              onChange={registerChangeHandler}
              defaultValue={values.cin}
            />
          </div>
          <div className="mb-3">
            <label for="cinfile" className="form-label">
              CIN Picture <small className="text-danger">*</small>
            </label>
            <input
              type="file"
              className="form-control"
              id="cinfile"
              name="cinFile"
              required
              onChange={registerFileChangeHandler}
            />
          </div>
          <div className="text-end">
            <button className="btn btn-orange m-auto" type="submit">
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
