import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import { FaShoppingCart, FaHeart, FaStar, FaArrowRight, FaLeaf, FaTruck, FaShieldAlt, FaClock } from 'react-icons/fa';
import HeroSection from '../components/home/HeroSection';
import ProductCard from '../components/products/ProductCard';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import NewsletterSection from '../components/home/NewsletterSection';

const Home = () => {
  const { featuredProducts, fetchFeaturedProducts } = useProducts();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="section-header"
          >
            <motion.h2 variants={itemVariants} className="section-title">
              Featured Products
            </motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle">
              Discover our most popular and delicious orange juice varieties
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="products-grid"
          >
            {featuredProducts.slice(0, 8).map((product, index) => (
              <motion.div
                key={product._id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <Link to="/products" className="btn btn-primary btn-large">
              View All Products
              <FaArrowRight style={{ marginLeft: '0.5rem' }} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="section-header"
          >
            <motion.h2 variants={itemVariants} className="section-title">
              Why Choose Orange Store?
            </motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle">
              We're committed to providing the highest quality orange juices
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="features-grid"
          >
            <motion.div variants={itemVariants} className="feature-card">
              <div className="feature-icon">
                <FaLeaf />
              </div>
              <h3>100% Organic</h3>
              <p>All our oranges are grown organically without harmful pesticides or chemicals.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="feature-card">
              <div className="feature-icon">
                <FaTruck />
              </div>
              <h3>Fast Delivery</h3>
              <p>Fresh juice delivered to your doorstep within 24 hours of ordering.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="feature-card">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>
              <h3>Quality Guarantee</h3>
              <p>100% satisfaction guarantee or your money back. We stand behind our products.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="feature-card">
              <div className="feature-icon">
                <FaClock />
              </div>
              <h3>Always Fresh</h3>
              <p>Pressed daily to ensure maximum freshness and nutritional value.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="cta-content"
          >
            <h2>Ready to Experience Fresh Orange Juice?</h2>
            <p>Join thousands of satisfied customers who trust us for their daily dose of vitamin C.</p>
            <div className="cta-buttons">
              <Link to="/products" className="btn btn-primary btn-large">
                Shop Now
              </Link>
              <Link to="/about" className="btn btn-secondary btn-large">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .home-page {
          padding-top: 70px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: 2.5rem;
          color: var(--text-dark);
          margin-bottom: 1rem;
          font-family: var(--font-display);
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: var(--text-light);
          max-width: 600px;
          margin: 0 auto;
        }

        .featured-products {
          padding: 4rem 0;
          background: var(--bg-white);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .why-choose-us {
          padding: 4rem 0;
          background: var(--bg-light);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          text-align: center;
          padding: 2rem;
          background: var(--bg-white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .feature-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 2rem;
          color: white;
        }

        .feature-card h3 {
          font-size: 1.25rem;
          color: var(--text-dark);
          margin-bottom: 1rem;
        }

        .feature-card p {
          color: var(--text-light);
          line-height: 1.6;
        }

        .cta-section {
          padding: 4rem 0;
          background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
          color: white;
          text-align: center;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: white;
        }

        .cta-content p {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-buttons .btn-secondary {
          background: transparent;
          color: white;
          border-color: white;
        }

        .cta-buttons .btn-secondary:hover {
          background: white;
          color: var(--primary-orange);
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .cta-content h2 {
            font-size: 2rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-buttons .btn {
            width: 100%;
            max-width: 300px;
          }
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 1.75rem;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }

          .feature-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
