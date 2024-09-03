import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// Je récupère la fonction handleToken en props
const Signup = ({ handleToken }) => {
  // States qui gèrent mes inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  //   State qui gère le message d'erreur
  const [errorMessage, setErrorMessage] = useState("");

  //   Permet de naviguer au click après avoir exécuté du code
  const navigate = useNavigate();

  // Fonction qui sera appelée lors de la validation du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    //   Je fais disparaitre un éventuel message d'erreur
    setErrorMessage("");
    try {
      //   Requête axios :
      // - Premier argument : l'url que j'interroge
      // - deuxième : le body que j'envoi
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        // {
        //   email,
        //   username,
        //   password,
        //   newsletter,
        // }
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );
      console.log(response.data);
      // Cookies.set("vinted-token", response.data.token, { expires: 15 });
      // setToken(response.data.token);
      // J'enregistre le token dans mon state et mes cookies
      handleToken(response.data.token);
      // Rediriger l'utilisateur vers la page /
      navigate("/");
    } catch (error) {
      console.log("error ==> ", error);
      // Si je reçois le status 409
      if (error.response.status === 409) {
        // je fais appraître un message d'erreur
        setErrorMessage("Cet email est déjà utilsé");
      } else if (error.response.data.message === "Missing parameters") {
        // Si je reçois le message Missing parameters idem

        setErrorMessage("Veuillez remplir tous les champs");
      } else {
        // Si je tombe dans le catch pour une raison inconnue
        setErrorMessage("Une erreur est survenue, veuillez réessayer");
      }
    }
  };

  return (
    <main className="signup-container">
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
            // console.log(event);
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="checkbox-container">
          <div>
            <input
              type="checkbox"
              checked={newsletter}
              onChange={() => {
                setNewsletter(!newsletter);
              }}
            />
            <span>S'inscrire à notre newsletter</span>
          </div>

          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>

        <button type="submit">S'inscrire</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
    </main>
  );
};

export default Signup;
