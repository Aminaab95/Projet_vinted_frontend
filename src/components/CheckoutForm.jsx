import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
        {
          title: "Le Titre de l'annonce",
          amount: 10,
          paymentMethodId: paymentMethod.id,
        }
      );

      if (response.data.success) {
        console.log("Payment successful!");
      } else {
        console.log("Payment failed!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Payer
      </button>
    </form>
  );
}

export default CheckoutForm;
