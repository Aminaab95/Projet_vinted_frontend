import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";
import "../App.css";

const Home = ({ search }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers?title=${search}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <main className="home-container">
      <section className="home-hero-bg-img">
        <img src={hero} alt="hero" className="hero" />
        <div className="home-hero">
          <p>Prêts à faire du tri dans vos placards ?</p>
          <button>Commencer à vendre</button>
        </div>
      </section>

      <section className="home-offers">
        {data.offers.map((offer) => (
          <Link to={`/offers/${offer._id}`} key={offer._id}>
            <article className="offer-card">
              <div className="offer-owner">
                {offer.owner.account.avatar && (
                  <img
                    className="offer-avatar"
                    src={offer.owner.account.avatar?.secure_url}
                    alt={offer.owner.account.username}
                  />
                )}
                <span>{offer.owner.account.username}</span>
              </div>
              <div className="offer-image">
                <img
                  src={offer.product_image.secure_url}
                  alt={offer.product_name}
                />
              </div>
              <div className="offer-details">
                <p>{offer.product_price} €</p>
                <p>{offer.product_details[1]?.TAILLE}</p>
                <p>{offer.product_details[0]?.MARQUE}</p>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </main>
  );
};

export default Home;
