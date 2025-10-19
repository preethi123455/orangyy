import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPaperPlane, FaCheck } from 'react-icons/fa';
import toast from 'react-hot-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
      toast.success('Successfully subscribed to our newsletter!');
    }, 1000);
  };

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
    <section className="newsletter-section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="newsletter-content"
        >
          <motion.div variants={itemVariants} className="newsletter-icon">
            <FaEnvelope />
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="newsletter-title">
            Stay Fresh with Our Newsletter
          </motion.h2>
          
          <motion.p variants={itemVariants} className="newsletter-description">
            Get the latest updates on new products, special offers, healthy living tips, 
            and exclusive discounts delivered straight to your inbox.
          </motion.p>
          
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="newsletter-form"
          >
            {/* <div className="form-group">
              <div className="input-container">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="newsletter-input"
                  disabled={isSubscribed}
                />
                <motion.button
                  type="submit"
                  disabled={isLoading || isSubscribed}
                  className="newsletter-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="loading-spinner"
                    />
                  ) : isSubscribed ? (
                    <FaCheck />
                  ) : (
                    <FaPaperPlane />
                  )}
                </motion.button>
              </div>
            </div> */}
            
            {isSubscribed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="success-message"
              >
                <FaCheck />
                <span>Thank you for subscribing!</span>
              </motion.div>
            )}
          </motion.form>
          
          <motion.div variants={itemVariants} className="newsletter-benefits">
            <div className="benefit">
              <span className="benefit-icon">🎁</span>
              <span>Exclusive discounts</span>
            </div>
            <div className="benefit">
              <span className="benefit-icon">📧</span>
              <span>Weekly updates</span>
            </div>
            <div className="benefit">
              <span className="benefit-icon">💡</span>
              <span>Health tips</span>
            </div>
            <div className="benefit">
              <span className="benefit-icon">🆕</span>
              <span>New products</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .newsletter-section {
          padding: 4rem 0;
          background: linear-gradient(135deg, var(--primary-orange) 0%, var(--secondary-orange) 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }

        .newsletter-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.3;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1rem;
          position: relative;
          z-index: 2;
        }

        .newsletter-content {
          text-align: center;
        }

        .newsletter-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }

        .newsletter-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          font-family: var(--font-display);
          font-weight: 700;
        }

        .newsletter-description {
          font-size: 1.2rem;
          margin-bottom: 2.5rem;
          opacity: 0.9;
          line-height: 1.6;
        }

        .newsletter-form {
          max-width: 500px;
          margin: 0 auto 2rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .input-container {
          position: relative;
          display: flex;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          padding: 0.5rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .newsletter-input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 1rem 1.5rem;
          color: white;
          font-size: 1rem;
          outline: none;
        }

        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .newsletter-button {
          background: white;
          color: var(--primary-orange);
          border: none;
          border-radius: 50px;
          padding: 1rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 60px;
        }

        .newsletter-button:hover:not(:disabled) {
          background: #f8f9fa;
          transform: translateY(-2px);
        }

        .newsletter-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top: 2px solid var(--primary-orange);
          border-radius: 50%;
        }

        .success-message {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #27ae60;
          font-weight: 600;
          margin-top: 1rem;
        }

        .newsletter-benefits {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .benefit {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .benefit-icon {
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .newsletter-title {
            font-size: 2rem;
          }

          .newsletter-description {
            font-size: 1.1rem;
          }

          .newsletter-benefits {
            gap: 1rem;
          }

          .benefit {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .newsletter-section {
            padding: 3rem 0;
          }

          .newsletter-title {
            font-size: 1.75rem;
          }

          .newsletter-description {
            font-size: 1rem;
          }

          .input-container {
            flex-direction: column;
            gap: 0.5rem;
          }

          .newsletter-button {
            width: 100%;
          }

          .newsletter-benefits {
            flex-direction: column;
            gap: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
};

export default NewsletterSection;
