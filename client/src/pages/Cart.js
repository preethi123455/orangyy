import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false); // control order visibility
  const { fetchCartCount } = useContext(CartContext);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first!");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCartItems(data);
    } catch {
      alert("Error loading cart");
    }
  };

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/orders/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(data);
    } catch {
      console.error("Error fetching orders");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addQuantity = async (name) => {
    const token = localStorage.getItem("token");
    const item = cartItems.find(i => i.name === name);
    if (!item) return;

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: item.name, price: item.price, img: item.img }),
      });
      fetchCart();
      fetchCartCount();
    } catch {
      alert("Error adding item");
    }
  };

  const removeQuantity = async (name) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/cart/${name}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      alert(data.message);
      fetchCart();
      fetchCartCount();
    } catch {
      alert("Error removing item");
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const numericPrice = parseInt(item.price.replace(/[^\d]/g, ""));
      return total + numericPrice * item.quantity;
    }, 0);
  };

  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first!");

    const name = prompt("Enter your name:");
    const phone = prompt("Enter your phone number:");
    const address = prompt("Enter your address:");
    const paymentMode = "Cash on Delivery";

    if (!name || !phone || !address) return alert("All fields are required!");

    const orderData = {
      email: JSON.parse(atob(token.split('.')[1])).email,
      name,
      phone,
      address,
      paymentMode,
      products: cartItems,
      totalCost: getTotalPrice(),
      createdAt: new Date(),
    };

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(orderData),
      });
      alert("Order placed successfully!");
      fetchCart();       // Clear cart after order
      fetchOrders();     // Refresh orders
      fetchCartCount();
    } catch {
      alert("Error placing order");
    }
  };

  return (
    <div className="cart-page" style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-list" style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            {cartItems.map(item => (
              <div key={item._id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", width: "220px", textAlign: "center" }}>
                <img src={item.img} alt={item.name} style={{ width: "100%", borderRadius: "8px" }} />
                <h4>{item.name}</h4>
                <p>{item.price}</p>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                  <button onClick={() => removeQuantity(item.name)} style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "5px" }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addQuantity(item.name)} style={{ background: "green", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "5px" }}>+</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button onClick={handleBuyNow} style={{ background: "orange", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>
              Buy Now
            </button>

            <button 
              onClick={async () => {
                await fetchOrders(); // fetch only on click
                setShowOrders(!showOrders);
              }}
              style={{ background: "blue", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}
            >
              My Orders
            </button>
          </div>

          <div className="total-section" style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold" }}>
            Total Price: ₹{getTotalPrice()}
          </div>
        </>
      )}

      {showOrders && (
        <div className="orders-list" style={{ marginTop: "40px" }}>
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            orders.map(order => (
              <div key={order._id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "15px", marginBottom: "20px", background: "#f9f9f9" }}>
                <p><strong>Order Time:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                <p><strong>Name:</strong> {order.name}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Total Cost:</strong> ₹{order.totalCost}</p>

                <div style={{ overflowX: "auto", display: "flex", gap: "15px", paddingTop: "10px" }}>
                  {order.products.map((item, idx) => (
                    <div key={idx} style={{ minWidth: "150px", border: "1px solid #ccc", borderRadius: "8px", padding: "10px", textAlign: "center", background: "#fff" }}>
                      <img src={item.img} alt={item.name} style={{ width: "100%", borderRadius: "5px", height: "100px", objectFit: "cover" }} />
                      <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>{item.name}</p>
                      <p style={{ margin: "2px 0" }}>Qty: {item.quantity}</p>
                      <p style={{ margin: "2px 0" }}>{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
