import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaTruck, FaShieldAlt, FaClock, FaHeart, FaAward } from 'react-icons/fa';

const FeaturesSection = () => {
  const features = [
    {
      icon: FaLeaf,
      title: "100% Organic",
      description: "All our oranges are grown organically without harmful pesticides or chemicals.",
      color: "#27ae60"
    },
    {
      icon: FaTruck,
      title: "Fast Delivery",
      description: "Fresh juice delivered to your doorstep within 24 hours of ordering.",
      color: "#3498db"
    },
    {
      icon: FaShieldAlt,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee or your money back. We stand behind our products.",
      color: "#e74c3c"
    },
    {
      icon: FaClock,
      title: "Always Fresh",
      description: "Pressed daily to ensure maximum freshness and nutritional value.",
      color: "#f39c12"
    },
    {
      icon: FaHeart,
      title: "Health Focused",
      description: "Packed with vitamin C and natural nutrients for your well-being.",
      color: "#e91e63"
    },
    {
      icon: FaAward,
      title: "Award Winning",
      description: "Recognized for excellence in taste and quality by industry experts.",
      color: "#9b59b6"
    }
  ];

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
    hidden: { opacity: 0, y: 30 },
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
    <section className="features-section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="section-header"
        >
          <motion.h2 variants={itemVariants} className="section-title">
            Why Choose Our Orange Juices?
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle">
            We're committed to providing the highest quality orange juices with exceptional benefits
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="features-grid"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="feature-card"
            >
              <motion.div
                className="feature-icon"
                style={{ '--feature-color': feature.color }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <feature.icon />
              </motion.div>
              
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              
              <motion.div
                className="feature-accent"
                style={{ '--feature-color': feature.color }}
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .features-section {
          padding: 4rem 0;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
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

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          background: white;
          padding: 2.5rem 2rem;
          border-radius: 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .feature-card:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .feature-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--feature-color), var(--feature-color));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 2rem;
          color: white;
          position: relative;
          z-index: 2;
        }

        .feature-icon::before {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          background: linear-gradient(135deg, var(--feature-color), var(--feature-color));
          border-radius: 50%;
          opacity: 0.2;
          z-index: -1;
        }

        .feature-title {
          font-size: 1.25rem;
          color: var(--text-dark);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .feature-description {
          color: var(--text-light);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .feature-accent {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--feature-color), var(--feature-color));
          border-radius: 2px;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .feature-card {
            padding: 2rem 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 1.75rem;
          }

          .feature-card {
            padding: 1.5rem;
          }

          .feature-icon {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;
