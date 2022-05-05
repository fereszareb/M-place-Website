import { CardElement, PaymentElement } from "@stripe/react-stripe-js";
const CheckoutForm = () => {
  const iframeStyles = {
    base: {
      color: "#fff",
      fontSize: "16px",
      iconColor: "#fff",
      "::placeholder": {
        color: "#87bbfd",
      },
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE",
    },
    complete: {
      iconColor: "#cbf4c9",
    },
  };
  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true,
  };
  return (
    <form>
      <CardElement options={cardElementOpts} />
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
};

export default CheckoutForm;
