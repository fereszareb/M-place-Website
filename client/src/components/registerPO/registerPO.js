import { useState } from "react";
import StepOne from "./stepOne.js";
import StepTwo from "./StepTwo.js";
import Final from "./Final";
import StepThree from "./StepThree.js";
import api from "./../../config.service";
function RegisterPO() {
  const [loadingCin, setLoadingCin] = useState(false);
  const [loadinglogo, setLoadinglogo] = useState(false);
  const [loadingfileidentifiantFiscale, setLoadingfileidentifiantFiscale] =
    useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  //state for steps
  const [step, setstep] = useState(1);

  //state for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cin: "",
    cinFile: "",

    nameEntreprise: "",
    logo: "",
    address: "",
    country: "",
    ville: "",
    codePostal: "",
    datofCreation: "",
    identifiantFiscale: "",
    fileidentifiantFiscale: "",
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

  function displayLoading(variable, ok) {
    switch (variable) {
      case "cinFile":
        setLoadingCin(ok);
        break;
      case "logo":
        setLoadinglogo(ok);
        break;
      case "fileidentifiantFiscale":
        setLoadingfileidentifiantFiscale(ok);
        break;
      default:
    }
  }

  const registerFileChangeHandler = (e) => {
    displayLoading(e.target.name, true);
    var bodyFormData = new FormData();
    bodyFormData.append("", e.target.files[0]);
    api
      .post("/img/upload", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: res.data.data.imageUrl,
        }));
        displayLoading(e.target.name, false);
      });
  };

  const submitSignUP = () => {
    setLoadingSubmit(true);
    const dataSend = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      company_name: formData.nameEntreprise,
      company_email: formData.email,
      password: formData.password,
      logo_url: formData.logo,
      country: formData.country,
      city: formData.ville,
      state: "Tunis",
      zip_code: formData.codePostal,
      address: formData.address,
      professional_phone_number: formData.phone,
      verification: 0,
      creation_date: formData.datofCreation,
      tax_ID_number: formData.identifiantFiscale,
      tax_ID_card: formData.fileidentifiantFiscale,
      owner_ID_type: formData.cinFile,
      owner_ID: formData.cin,
      RNE_number: formData.RNENumber,
    };

    api
      .post("/api/v1/auth/PO/register", dataSend)
      .then((res) => {
        setLoadingSubmit(false);
        nextStep();
      })
      .catch((err) => {
        alert("Erreur");
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
              loadingCin={loadingCin}
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
              loadingfileidentifiantFiscale={loadingfileidentifiantFiscale}
              loadinglogo={loadinglogo}
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
              loadingSubmit={loadingSubmit}
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
