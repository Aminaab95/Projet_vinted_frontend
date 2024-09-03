import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm"; // Assurez-vous que ce composant est correctement défini

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

function Payment({ token }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, price } = location.state || {};

  // Si l'utilisateur n'est pas connecté, redirigez vers la page de connexion
  if (!token) {
    navigate("/login");
  }

  // Configuration des options Stripe
  const options = {
    mode: "payment",
    amount: Number((price * 100).toFixed(0)), // Le prix en centimes
    currency: "eur",
  };

  return (
    <div>
      <h1>Payment</h1>
      <h2>{title}</h2>
      <h3>{price} €</h3>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default Payment;
