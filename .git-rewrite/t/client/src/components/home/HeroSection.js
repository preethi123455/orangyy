import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaArrowRight, FaStar } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const HeroSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="hero-section" ref={ref}>
      <div className="hero-background">
        <div className="hero-pattern"></div>
        <div className="floating-oranges">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`floating-orange orange-${i + 1}`}
              variants={floatingVariants}
              animate="animate"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              🍊
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="hero-content"
        >
          <motion.div variants={itemVariants} className="hero-text">
            <motion.span
              variants={itemVariants}
              className="hero-badge"
            >
              <FaStar />
              #1 Orange Juice Store
            </motion.span>
            
            <motion.h1 variants={itemVariants} className="hero-title">
              Fresh Orange Juice
              <span className="highlight"> Delivered Daily</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="hero-description">
              Experience the pure taste of nature with our premium collection of 
              organic orange juices. Pressed fresh daily and delivered straight to your door.
            </motion.p>
            
            <motion.div variants={itemVariants} className="hero-stats">
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Varieties</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Organic</span>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="hero-buttons">
              <Link to="/products" className="btn btn-primary btn-large">
                Shop Now
                <FaArrowRight style={{ marginLeft: '0.5rem' }} />
              </Link>
              {/* <button className="btn btn-secondary btn-large play-btn">
                <FaPlay />
                Watch Video
              </button> */}
            </motion.div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="hero-image">
            <div className="image-container">
              <motion.div
                className="main-juice"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="juice-bottle">
                  <div className="bottle-body"></div>
                  <div className="bottle-cap"></div>
                  <div className="juice-liquid"></div>
                </div>
              </motion.div>
              
              <div className="floating-elements">
                <motion.div
                  className="floating-element vitamin-c"
                  animate={{
                    y: [-20, 20, -20],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span>Vitamin C</span>
                </motion.div>
                
                <motion.div
                  className="floating-element fresh"
                  animate={{
                    y: [20, -20, 20],
                    rotate: [0, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <span>Fresh</span>
                </motion.div>
                
                <motion.div
                  className="floating-element organic"
                  animate={{
                    y: [-15, 15, -15],
                    rotate: [0, 3, 0]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                >
                  <span>Organic</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #fff5f0 0%, #ffe8d6 100%);
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }

        .hero-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 140, 66, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 179, 102, 0.1) 0%, transparent 50%);
        }

        .floating-oranges {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .floating-orange {
          position: absolute;
          font-size: 2rem;
          opacity: 0.3;
          animation: float 6s ease-in-out infinite;
        }

        .orange-1 { top: 10%; left: 10%; animation-delay: 0s; }
        .orange-2 { top: 20%; right: 15%; animation-delay: 1s; }
        .orange-3 { top: 60%; left: 5%; animation-delay: 2s; }
        .orange-4 { top: 70%; right: 10%; animation-delay: 3s; }
        .orange-5 { top: 40%; left: 20%; animation-delay: 4s; }
        .orange-6 { top: 30%; right: 30%; animation-delay: 5s; }

        .container {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          min-height: 80vh;
        }

        .hero-text {
          max-width: 600px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 107, 53, 0.1);
          color: var(--primary-orange);
          padding: 0.5rem 1rem;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          color: var(--text-dark);
          margin-bottom: 1.5rem;
          font-family: var(--font-display);
        }

        .highlight {
          background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.2rem;
          color: var(--text-light);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .hero-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 2.5rem;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary-orange);
          line-height: 1;
        }

        .stat-label {
          font-size: 0.9rem;
          color: var(--text-light);
          font-weight: 500;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .play-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .hero-image {
          position: relative;
          height: 500px;
        }

        .image-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .main-juice {
          position: relative;
          z-index: 2;
        }

        .juice-bottle {
          position: relative;
          width: 200px;
          height: 300px;
        }

        .bottle-body {
          width: 100%;
          height: 80%;
          background: linear-gradient(135deg, #ff6b35, #ff8c42);
          border-radius: 20px 20px 0 0;
          position: relative;
          box-shadow: 0 20px 40px rgba(255, 107, 53, 0.3);
        }

        .bottle-cap {
          width: 60px;
          height: 40px;
          background: #2c3e50;
          border-radius: 10px;
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
        }

        .juice-liquid {
          position: absolute;
          top: 20px;
          left: 10px;
          right: 10px;
          height: 60%;
          background: linear-gradient(135deg, #ff8c42, #ffb366);
          border-radius: 15px 15px 0 0;
          animation: liquid 3s ease-in-out infinite;
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .floating-element {
          position: absolute;
          background: white;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          font-weight: 600;
          color: var(--text-dark);
          font-size: 0.9rem;
        }

        .vitamin-c {
          top: 20%;
          right: 10%;
          background: linear-gradient(135deg, #27ae60, #2ecc71);
          color: white;
        }

        .fresh {
          bottom: 30%;
          left: 5%;
          background: linear-gradient(135deg, #3498db, #5dade2);
          color: white;
        }

        .organic {
          top: 60%;
          right: 5%;
          background: linear-gradient(135deg, #f39c12, #f7dc6f);
          color: white;
        }

        @keyframes liquid {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.05); }
        }

        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-stats {
            justify-content: center;
            gap: 1.5rem;
          }

          .hero-buttons {
            justify-content: center;
          }

          .hero-image {
            height: 300px;
          }

          .juice-bottle {
            width: 150px;
            height: 225px;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-description {
            font-size: 1rem;
          }

          .hero-stats {
            flex-direction: column;
            gap: 1rem;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .hero-buttons .btn {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
