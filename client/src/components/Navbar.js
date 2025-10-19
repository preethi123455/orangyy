import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav>
      <div className="navbar">
        <div className="brand">
          <button onClick={() => navigate("/home")}>Back</button>
          Grocerly
        </div>
        <div className="nav-links">
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
          <Link to="/cart" className="nav-link">
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
