import React from "react";

// creating functional component ans getting props from app.js and destucturing them
const StepTwo = ({
  nextStep,
  prevStep,
  registerFileChangeHandler,
  values,
  registerChangeHandler,
  loadingfileidentifiantFiscale,
  loadinglogo,
}) => {
  // after form submit validating the form
  const submitFormData = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div>
      <div className="text-center titleCarousel mb-0">
        Company <b>information</b>
      </div>

      <form onSubmit={submitFormData}>
        <div className="card formulaire p-3 mt-5">
          <div className="mb-3">
            <label for="nameEntreprise" className="form-label">
              Company Name <small className="text-danger">*</small>
            </label>
            <input
              type="text"
              className="form-control"
              id="nameEntreprise"
              name="nameEntreprise"
              required
              placeholder="Enter your Company Name"
              onChange={registerChangeHandler}
              defaultValue={values.nameEntreprise}
            />
          </div>
          <div className="mb-3">
            <label for="logo" className="form-label">
              Logo of Company <small className="text-danger">*</small>
            </label>
            <input
              type="file"
              className="form-control"
              id="logo"
              name="logo"
              required
              disabled={loadinglogo}
              onChange={registerFileChangeHandler}
            />
            {loadinglogo ? (
              <small>
                <div
                  class="spinner-border text-secondary spinner-small"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                Loading ...
              </small>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <label for="address" className="form-label">
              Address<small className="text-danger">*</small>
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              required
              placeholder="Enter your adress"
              onChange={registerChangeHandler}
              defaultValue={values.address}
            />
          </div>
          <div className="mb-3">
            <div className="row g-3 align-items-center">
              <div className="col-12 col-md-4">
                <input
                  type="text"
                  className="form-control"
                  name="country"
                  placeholder="country"
                  required
                  onChange={registerChangeHandler}
                  defaultValue={values.country}
                />
              </div>
              <div className="col-12 col-md-4">
                <input
                  type="text"
                  className="form-control"
                  name="ville"
                  placeholder="Town"
                  required
                  onChange={registerChangeHandler}
                  defaultValue={values.ville}
                />
              </div>
              <div className="col-12 col-md-4">
                <input
                  type="text"
                  className="form-control"
                  name="codePostal"
                  placeholder="Postal code"
                  required
                  onChange={registerChangeHandler}
                  defaultValue={values.codePostale}
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label for="datofCreation" className="form-label">
              Creation date<small className="text-danger">*</small>
            </label>
            <input
              type="date"
              className="form-control"
              id="datofCreation"
              name="datofCreation"
              required
              onChange={registerChangeHandler}
              defaultValue={values.datofCreation}
            />
          </div>
          <div className="mb-3">
            <label for="identifiantFiscale" className="form-label">
              TAX ID <small className="text-danger">*</small>
            </label>
            <input
              type="text"
              className="form-control"
              id="identifiantFiscale"
              required
              pattern="[0-9]+"
              name="identifiantFiscale"
              placeholder="Enter your TAX ID"
              onChange={registerChangeHandler}
              defaultValue={values.identifiantFiscale}
            />
          </div>
          <div className="mb-3">
            <label for="fileidentifiantFiscale" className="form-label">
              Picture of TAX ID <small className="text-danger">*</small>
            </label>
            <input
              type="file"
              className="form-control"
              id="fileidentifiantFiscale"
              name="fileidentifiantFiscale"
              required
              disabled={loadingfileidentifiantFiscale}
              onChange={registerFileChangeHandler}
            />
            {loadingfileidentifiantFiscale ? (
              <small>
                <div
                  class="spinner-border text-secondary spinner-small"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                Loading ...
              </small>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <label for="RNENumber" className="form-label">
              RNE Number <small className="text-danger">*</small>
            </label>
            <input
              type="text"
              className="form-control"
              id="RNENumber"
              required
              pattern="[0-9]+"
              name="RNENumber"
              placeholder="Enter your RNE Number"
              onChange={registerChangeHandler}
              defaultValue={values.RNENumber}
            />
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <button className="btn btn-orange m-auto" onClick={prevStep}>
                Previous
              </button>
            </div>
            <div className="col-6 text-end">
              <button className="btn btn-orange m-auto" type="submit">
                Continue
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StepTwo;
