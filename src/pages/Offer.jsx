import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [id]);

  const handleBuyNow = () => {
    navigate("/payment", {
      state: {
        title: data.product_name,
        price: data.product_price,
      },
    });
  };

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <main className="offer-container">
      <section className="offer-image">
        <img src={data.product_image.secure_url} alt={data.product_name} />
      </section>
      <section className="offer-details">
        <p className="offer-price">{data.product_price} €</p>
        {data.product_details.map((detail, index) => {
          const key = Object.keys(detail)[0];
          return (
            <div key={index} className="offer-detail-item">
              <strong>{key}:</strong> {detail[key]}
            </div>
          );
        })}
        <button className="buy-button" onClick={handleBuyNow}>
          Acheter
        </button>
      </section>
    </main>
  );
};

export default Offer;
