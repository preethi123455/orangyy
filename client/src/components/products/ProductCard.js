import React from "react";
import "./FreshJuice.css";
import ob1 from "./orange-juice-1.jpg";
import ob2 from "./orange-juice-2.jpg";
import ob3 from "./orange-juice-3.jpg";
import ob4 from "./orange-juice-4.jpg";
import ob5 from "./orange-juice-5.jpg";
import ob6 from "./orange-juice-6.jpg";
import ob7 from "./orange-juice-7.jpg";
import ob8 from "./orange-juice-8.jpg";
import ob9 from "./orange-juice-9.jpg";
import ob10 from "./orange-juice-10.jpg";
import ob11 from "./orange-juice-11.jpg";
import ob12 from "./orange-juice-12.jpg";

const products = [
  { name: "Fresh Valencia Orange Juice", price: "₹149", img: ob1 },
  { name: "Blood Orange Delight", price: "₹179", img: ob2 },
  { name: "Tangy Mandarin Mix", price: "₹139", img: ob3 },
  { name: "Navel Orange Classic", price: "₹159", img: ob4 },
  { name: "Orange Carrot Fusion", price: "₹169", img: ob5 },
  { name: "Orange Ginger Boost", price: "₹189", img: ob6 },
  { name: "Pulpy Orange Supreme", price: "₹155", img: ob7 },
  { name: "Orange Pineapple Tropical", price: "₹175", img: ob8 },
  { name: "Orange Turmeric Wellness", price: "₹199", img: ob9 },
  { name: "Sweet Lime Orange Blend", price: "₹145", img: ob10 },
  { name: "Orange Mint Refresher", price: "₹165", img: ob11 },
  { name: "Organic Orange Pure", price: "₹209", img: ob12 },
];

export default function FreshJuice() {

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/cart/add`, {        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert("Error adding to cart");
    }
  };

  return (
    <div className="juice-page">

      {/* Hero Section */}
      <section className="hero">
        <h2>
          Pure Orange <span>Goodness</span>
        </h2>
        <p>100% Fresh, Natural & Healthy Orange Juice Varieties</p>
        <div className="tags">
          <span>No Preservatives</span>•<span>100% Natural</span>•<span>Fresh Daily</span>
        </div>
      </section>

      {/* Product Collection */}
      <section className="collection">
        <h3>Our Fresh Collection</h3>
        <p>Handpicked orange varieties for every taste</p>

        <div className="grid">
          {products.map((p, i) => (
            <div className="card" key={i}>
              <img src={p.img} alt={p.name} />
              <div className="card-info">
                <h4>{p.name}</h4>
                <p>{p.price}</p>
                <button onClick={() => handleAddToCart(p)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer>
        © 2025 FreshJuice. All rights reserved. Made with 🍊 and love.
      </footer>
    </div>
  );
}
