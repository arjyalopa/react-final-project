import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

/* ---------------- Navbar Component ---------------- */
function Navbar({ cartCount }) {
  return (
    <nav style={{ display: "flex", gap: "20px", padding: "10px" }}>
      <a href="#">Home</a>
      <a href="#">Plants</a>
      <a href="#">Cart 🛒 ({cartCount})</a>
    </nav>
  );
}

/* ---------------- Product Data ---------------- */
const plantCategories = {
  Indoor: [
    { id: 1, name: "Snake Plant", price: 10, img: "🌱" },
    { id: 2, name: "Peace Lily", price: 12, img: "🌿" },
    { id: 3, name: "Aloe Vera", price: 8, img: "🌵" },
    { id: 4, name: "Spider Plant", price: 9, img: "🪴" },
    { id: 5, name: "Rubber Plant", price: 15, img: "🌳" },
    { id: 6, name: "ZZ Plant", price: 11, img: "🌱" }
  ],
  Outdoor: [
    { id: 7, name: "Rose", price: 14, img: "🌹" },
    { id: 8, name: "Hibiscus", price: 13, img: "🌺" },
    { id: 9, name: "Jasmine", price: 10, img: "🌼" },
    { id: 10, name: "Tulip", price: 16, img: "🌷" },
    { id: 11, name: "Sunflower", price: 12, img: "🌻" },
    { id: 12, name: "Lavender", price: 18, img: "💐" }
  ],
  Succulents: [
    { id: 13, name: "Echeveria", price: 7, img: "🌵" },
    { id: 14, name: "Haworthia", price: 6, img: "🌵" },
    { id: 15, name: "Jade Plant", price: 9, img: "🌿" },
    { id: 16, name: "Sedum", price: 5, img: "🌵" },
    { id: 17, name: "Kalanchoe", price: 8, img: "🌱" },
    { id: 18, name: "Crassula", price: 7, img: "🌵" }
  ]
};

/* ---------------- Product List Component ---------------- */
function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (plant) => {
    dispatch(addItem({ ...plant, quantity: 1 }));
    setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div>
      <Navbar cartCount={cartItems.length} />

      {Object.keys(plantCategories).map(category => (
        <div key={category}>
          <h2>{category} Plants</h2>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {plantCategories[category].map(plant => (
              <div
                key={plant.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  width: "150px",
                  textAlign: "center"
                }}
              >
                <div style={{ fontSize: "30px" }}>{plant.img}</div>
                <h4>{plant.name}</h4>
                <p>₹{plant.price}</p>

                <button
                  onClick={() => handleAddToCart(plant)}
                  disabled={addedToCart[plant.name]}
                >
                  {addedToCart[plant.name] ? "Added" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
