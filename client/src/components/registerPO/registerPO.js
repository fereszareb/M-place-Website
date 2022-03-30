import { useState } from "react";
import StepOne from "./stepOne.js";
import StepTwo from "./StepTwo.js";
import Final from "./Final";
import StepThree from "./StepThree.js";
import api from "./../../config.service";
function RegisterPO() {
  //state for steps
  const [step, setstep] = useState(1);

  //state for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cin: "",
    cinFile: File,

    nameEntreprise: "",
    logo: File,
    address: "",
    country: "",
    ville: "",
    codePostal: "",
    datofCreation: "",
    identifiantFiscale: "",
    fileidentifiantFiscale: File,
    RNENumber: "",

    password: "",
  });

  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

  const registerChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const registerFileChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.files[0],
    }));
  };

  const submitSignUP = () => {
    api
      .post("/PO/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
      });
  };
  // javascript switch case to show different form in each step
  switch (step) {
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      return (
        <div className="row justify-content-center mb-5 w-100 mx-0">
          <div className="col-12 col-md-10 col-lg-9 col-xl-8 col-xxl-6">
            <StepOne
              nextStep={nextStep}
              registerChangeHandler={registerChangeHandler}
              registerFileChangeHandler={registerFileChangeHandler}
              values={formData}
            />
          </div>
        </div>
      );
    // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 2:
      return (
        <div className="row justify-content-center mb-5 w-100 mx-0">
          <div className="col-12 col-md-10 col-lg-9 col-xl-8 col-xxl-6">
            <StepTwo
              nextStep={nextStep}
              prevStep={prevStep}
              registerChangeHandler={registerChangeHandler}
              registerFileChangeHandler={registerFileChangeHandler}
              values={formData}
            />
          </div>
        </div>
      );
    // Only formData is passed as prop to show the final value at form submit
    case 3:
      return (
        <div className="row justify-content-center mb-5 w-100 mx-0">
          <div className="col-12 col-md-10 col-lg-9 col-xl-8 col-xxl-6">
            <StepThree
              nextStep={nextStep}
              prevStep={prevStep}
              registerChangeHandler={registerChangeHandler}
              submitSignUP={submitSignUP}
              values={formData}
            />
          </div>
        </div>
      );

    case 4:
      return (
        <div className="row justify-content-center mb-5 w-100 mx-0">
          <div className="col-12 col-md-10 col-lg-9 col-xl-8 col-xxl-6">
            <Final values={formData} />
          </div>
        </div>
      );
    // default case to show nothing
    default:
      return <div className="App"></div>;
  }
}

export default RegisterPO;
