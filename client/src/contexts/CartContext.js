import React, { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from backend
  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCartItems([]); // clear cart if no token
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/cart`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to fetch cart');

      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      console.error('Cart fetch error:', err);
      setCartItems([]); // prevent undefined errors
    }
  };

  // Returns total quantity in cart
  const getCartItemsCount = () => {
    return cartItems?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, fetchCart, getCartItemsCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use context
export const useCart = () => useContext(CartContext);
