import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import VoiceControl from "./components/common/VoiceControl";
import ProductCard from "./components/products/ProductCard";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Signup from "./pages/Register";
import Login from "./pages/Login";
import Fruits from "./components/Fruits";
// import About from './components/About';
// import Contact from './components/Contact';
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Protected Route Component
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductCard />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Home />} /> {/* Default route */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/fruits" element={<Fruits />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {/* Voice Control */}
      <VoiceControl />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
            borderRadius: "10px",
            padding: "16px",
            fontSize: "14px",
            fontWeight: "500",
          },
          success: {
            iconTheme: {
              primary: "#27ae60",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#e74c3c",
              secondary: "#fff",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
