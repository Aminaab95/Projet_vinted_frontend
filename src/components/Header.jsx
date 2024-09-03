import { Link } from "react-router-dom";
import Vintedlogo from "../assets/Vinted.png";

const Header = ({ token, handleToken, search, setSearch }) => {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img src={Vintedlogo} alt="Vinted" className="vintedlogo" />
        </Link>
      </div>
      <div className="header-center">
        <input
          type="text"
          placeholder="Recherche des articles"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div>
        {token ? (
          <div className="header-right">
            <button
              className="header-button-logout"
              onClick={() => {
                handleToken(null);
              }}
            >
              Se déconnecter
            </button>
            <Link to="/publish" className="button-sell">
              Vends tes articles
            </Link>
          </div>
        ) : (
          <>
            <div className="header-right">
              <Link to="/signup">S'inscrire</Link>
              <Link to="/login">Se connecter</Link>
              <Link to="/publish" className="button-sell">
                Vends tes articles
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
