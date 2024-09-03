import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Publish({ token }) {
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("0");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("salut");
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", place);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //   console.log(response.data);

      navigate(`/offers/${response.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return token ? (
    <div className="publish-container">
      <h2>Vends ton article</h2>
      <form onSubmit={handleSubmit} className="publish-form">
        <label className="picture-input" htmlFor="picture-input">
          + Ajoute ta photo
        </label>
        <input
          id="picture-input"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => {
            setPicture(e.target.files[0]);
          }}
        />
        {picture && (
          <img src={URL.createObjectURL(picture)} alt="preview photo" />
        )}
        <div className="form-row">
          <h4>Titre</h4>
          <input
            type="text"
            placeholder="ex: Chemise Sézane verte"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-row">
          <h4>Décris ton article</h4>
          <textarea
            placeholder="ex: porté quelquefois, taille correctement"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-row">
          <h4>Marque</h4>
          <input
            type="text"
            placeholder="ex: Zara"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div className="form-row">
          <h4>Taille</h4>
          <input
            type="text"
            placeholder="ex: L/40/12"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>

        <div className="form-row">
          <h4>Couleur</h4>
          <input
            type="text"
            placeholder="ex: Fushia"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className="form-row">
          <h4>Etat</h4>
          <input
            type="text"
            placeholder="Neuf avec étiquette"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          />
        </div>

        <div className="form-row">
          <h4>Lieu</h4>
          <input
            type="text"
            placeholder="ex: Paris"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </div>

        <div className="form-row">
          <h4>Prix</h4>
          <input
            type="number"
            placeholder="0.00€"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button>Ajouter</button>
        </div>
      </form>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
}
