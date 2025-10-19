import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes, FaHeart } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { useCart } from '../../contexts/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const { cartItems, fetchCart, getCartItemsCount } = useCart();

  // Decode token and set user
  const decodeToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Check if token has the correct format (3 parts separated by dots)
        const tokenParts = token.split('.');
        if (tokenParts.length !== 3) {
          throw new Error('Invalid token format');
        }
        
        const decoded = jwtDecode(token);
        setUser({ email: decoded.email, name: decoded.name });
      } catch (err) {
        console.error('Token decode error:', err);
        localStorage.removeItem('token');
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  // Fetch cart only if user is logged in
  useEffect(() => {
    decodeToken();
  }, []);

  useEffect(() => {
    if (user) fetchCart();

    const handleAuthChanged = () => {
      decodeToken();
      if (localStorage.getItem('token')) fetchCart();
    };

    window.addEventListener('authChanged', handleAuthChanged);
    window.addEventListener('storage', handleAuthChanged);

    return () => {
      window.removeEventListener('authChanged', handleAuthChanged);
      window.removeEventListener('storage', handleAuthChanged);
    };
  }, [user, fetchCart]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.dispatchEvent(new Event('authChanged'));
    navigate('/login');
    setIsOpen(false);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="logo-container">
            <span className="logo-icon">🍊</span>
            <span className="logo-text">Orangyy</span>
          </motion.div>
        </Link>
<form onSubmit={handleSearch} className="navbar-search"> <div className="search-input-container"> {/* <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" /> <button type="submit" className="search-button"><FaSearch /></button> */} </div> </form>
        {/* Desktop Links */}
        <div className="navbar-menu">
          {navItems.map((item) => (
            <Link key={item.name} to={item.path} className="navbar-link" onClick={() => setIsOpen(false)}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* User & Cart */}
        <div className="navbar-actions">
          {/* Cart */}
          <Link to="/cart" className="navbar-action-btn">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="cart-icon-container">
              <FaShoppingCart />
              {getCartItemsCount() > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="cart-badge">
                  {getCartItemsCount()}
                </motion.span>
              )}
            </motion.div>
          </Link>

          {/* User */}
          {user ? (
            <div className="user-dropdown">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="user-btn">
                <FaUser /> <span>{user.name || user.email}</span>
              </motion.button>
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item"><FaUser /> Profile</Link>
                <Link to="/orders" className="dropdown-item"><FaHeart /> Orders</Link>
                <button onClick={handleLogout} className="dropdown-item">Logout</button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline btn-small">Login</Link>
              <Link to="/signup" className="btn btn-primary btn-small">Sign Up</Link>
            </div>
          )}

          {/* Mobile toggle */}
          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu"
          >
            <div className="mobile-menu-content">
              <form onSubmit={handleSearch} className="mobile-search">
                <div className="search-input-container">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button type="submit" className="search-button"><FaSearch /></button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 107, 53, 0.1);
          transition: all 0.3s ease;
        }

        .navbar-scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
        }

        .navbar-logo {
          text-decoration: none;
          color: var(--text-dark);
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-icon {
          font-size: 2rem;
          animation: float 3s ease-in-out infinite;
        }

        .logo-text {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-orange);
        }

        .navbar-search {
          flex: 1;
          max-width: 400px;
          margin: 0 2rem;
        }

        .search-input-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 3rem 0.75rem 1rem;
          border: 2px solid #e1e8ed;
          border-radius: 25px;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary-orange);
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
        }

        .search-button {
          position: absolute;
          right: 0.5rem;
          background: var(--primary-orange);
          color: white;
          border: none;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .search-button:hover {
          background: var(--dark-orange);
          transform: scale(1.05);
        }

        .navbar-menu {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .navbar-link {
          text-decoration: none;
          color: var(--text-dark);
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
        }

        .navbar-link:hover {
          color: var(--primary-orange);
        }

        .navbar-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary-orange);
          transition: width 0.3s ease;
        }

        .navbar-link:hover::after {
          width: 100%;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .navbar-action-btn {
          text-decoration: none;
          color: var(--text-dark);
        }

        .cart-icon-container {
          position: relative;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .cart-icon-container:hover {
          background: rgba(255, 107, 53, 0.1);
          color: var(--primary-orange);
        }

        .cart-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: var(--error);
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .user-menu {
          position: relative;
        }

        .user-dropdown {
          position: relative;
        }

        .user-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: var(--text-dark);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .user-btn:hover {
          background: rgba(255, 107, 53, 0.1);
          color: var(--primary-orange);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border-radius: 8px;
          box-shadow: var(--shadow-lg);
          padding: 0.5rem 0;
          min-width: 150px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
        }

        .user-dropdown:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          text-decoration: none;
          color: var(--text-dark);
          transition: all 0.3s ease;
        }

        .dropdown-item:hover {
          background: rgba(255, 107, 53, 0.1);
          color: var(--primary-orange);
        }

        .auth-buttons {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          color: var(--text-dark);
          cursor: pointer;
          padding: 0.5rem;
        }

        .mobile-menu {
          background: white;
          border-top: 1px solid #e1e8ed;
          overflow: hidden;
        }

        .mobile-menu-content {
          padding: 1rem;
        }

        .mobile-search {
          margin-bottom: 1rem;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .mobile-nav-link {
          padding: 0.75rem 0;
          text-decoration: none;
          color: var(--text-dark);
          border-bottom: 1px solid #f0f0f0;
          transition: all 0.3s ease;
        }

        .mobile-nav-link:hover {
          color: var(--primary-orange);
          padding-left: 0.5rem;
        }

        .mobile-user-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mobile-user-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 0;
          text-decoration: none;
          color: var(--text-dark);
          border-bottom: 1px solid #f0f0f0;
          transition: all 0.3s ease;
        }

        .mobile-user-link:hover {
          color: var(--primary-orange);
          padding-left: 0.5rem;
        }

        .logout-btn {
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        @media (max-width: 768px) {
          .navbar-search {
            display: none;
          }

          .navbar-menu {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .auth-buttons {
            display: none;
          }

          .user-dropdown {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .navbar-container {
            padding: 0 0.5rem;
          }

          .logo-text {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
