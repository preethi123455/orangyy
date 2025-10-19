import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Story', path: '/about#story' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' }
    ],
    products: [
      { name: 'Fresh Orange Juice', path: '/products?category=fresh' },
      { name: 'Organic Juices', path: '/products?category=organic' },
      { name: 'Premium Collection', path: '/products?category=premium' },
      { name: 'Seasonal Specials', path: '/products?category=seasonal' }
    ],
    support: [
      { name: 'Contact Us', path: '/contact' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Shipping Info', path: '/shipping' },
      { name: 'Returns', path: '/returns' }
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Refund Policy', path: '/refunds' }
    ]
  };

  const socialLinks = [
    { icon: FaFacebook, url: 'https://facebook.com', label: 'Facebook' },
    { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: FaInstagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: FaLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="footer-section"
          >
            <div className="footer-logo">
              <span className="logo-icon">🍊</span>
              <h3>Orange Store</h3>
            </div>
            <p className="footer-description">
              Fresh, organic, and delicious orange juices delivered straight to your door. 
              Experience the taste of nature's finest oranges.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <FaPhone />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <FaEnvelope />
                <span>hello@orangestore.com</span>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt />
                <span>123 Orange Street, Citrus City, CA 90210</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="footer-section"
          >
            <h4>Company</h4>
            <ul className="footer-links">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="footer-section"
          >
            <h4>Products</h4>
            <ul className="footer-links">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="footer-section"
          >
            <h4>Support</h4>
            <ul className="footer-links">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="footer-section"
          >
            <h4>Legal</h4>
            <ul className="footer-links">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="newsletter-section"
        >
          <div className="newsletter-content">
            <h4>Stay Fresh with Our Newsletter</h4>
            <p>Get the latest updates on new products, special offers, and healthy living tips.</p>
          </div>
        </motion.div>

        {/* Social Media & Bottom Bar */}
        <div className="footer-bottom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="social-links"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="footer-copyright"
          >
            <p>&copy; {currentYear} Orange Store. All rights reserved.</p>
            <p>Made with ❤️ for orange juice lovers everywhere</p>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          color: white;
          margin-top: auto;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 1rem 1rem;
        }

        .footer-main {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .footer-section h3,
        .footer-section h4 {
          color: var(--primary-orange);
          margin-bottom: 1rem;
          font-family: var(--font-display);
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .footer-logo .logo-icon {
          font-size: 2rem;
          animation: float 3s ease-in-out infinite;
        }

        .footer-logo h3 {
          font-size: 1.5rem;
          margin: 0;
        }

        .footer-description {
          color: #bdc3c7;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #bdc3c7;
        }

        .contact-item svg {
          color: var(--primary-orange);
          width: 16px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 0.5rem;
        }

        .footer-link {
          color: #bdc3c7;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
        }

        .footer-link:hover {
          color: var(--primary-orange);
          padding-left: 0.5rem;
        }

        .newsletter-section {
          background: rgba(255, 107, 53, 0.1);
          border-radius: 15px;
          padding: 2rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        .newsletter-content h4 {
          color: var(--primary-orange);
          margin-bottom: 0.5rem;
          font-size: 1.5rem;
        }

        .newsletter-content p {
          color: #bdc3c7;
          margin-bottom: 1.5rem;
        }

        .newsletter-form {
          max-width: 400px;
          margin: 0 auto;
        }

        .newsletter-input-group {
          display: flex;
          gap: 0.5rem;
        }

        .newsletter-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 2px solid transparent;
          border-radius: 25px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .newsletter-input::placeholder {
          color: #bdc3c7;
        }

        .newsletter-input:focus {
          outline: none;
          border-color: var(--primary-orange);
          background: rgba(255, 255, 255, 0.2);
        }

        .newsletter-button {
          padding: 0.75rem 1.5rem;
          background: var(--primary-orange);
          color: white;
          border: none;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .newsletter-button:hover {
          background: var(--dark-orange);
          transform: translateY(-2px);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          color: #bdc3c7;
          border-radius: 50%;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: var(--primary-orange);
          color: white;
        }

        .footer-copyright {
          text-align: right;
          color: #bdc3c7;
        }

        .footer-copyright p {
          margin: 0.25rem 0;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .footer-main {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .newsletter-input-group {
            flex-direction: column;
          }

          .newsletter-button {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .footer-container {
            padding: 2rem 0.5rem 1rem;
          }

          .newsletter-section {
            padding: 1.5rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
