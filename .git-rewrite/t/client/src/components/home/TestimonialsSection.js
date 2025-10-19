import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Health Enthusiast",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The best orange juice I've ever tasted! Fresh, pure, and absolutely delicious. I've been ordering weekly for months now."
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Fitness Trainer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "As a fitness trainer, I recommend this orange juice to all my clients. It's packed with natural vitamin C and tastes amazing!"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Mother of Three",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "My kids absolutely love this orange juice! It's the only way I can get them to drink something healthy. Thank you!"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Chef",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "I use this orange juice in my restaurant. The quality is exceptional and my customers always ask where I get it from."
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Nutritionist",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "From a nutritional standpoint, this is the purest orange juice available. No additives, just pure goodness."
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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

  const testimonialVariants = {
    enter: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="section-header"
        >
          <motion.h2 variants={itemVariants} className="section-title">
            What Our Customers Say
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle">
            Don't just take our word for it - hear from our satisfied customers
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="testimonials-container"
        >
          <div className="testimonials-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={testimonialVariants}
                initial="enter"
                animate="enter"
                exit="exit"
                className="testimonial-card"
              >
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <FaQuoteLeft />
                  </div>
                  
                  <p className="testimonial-text">
                    "{testimonials[currentIndex].text}"
                  </p>
                  
                  <div className="testimonial-rating">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <FaStar key={i} className="star" />
                    ))}
                  </div>
                  
                  <div className="testimonial-author">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="author-image"
                    />
                    <div className="author-info">
                      <h4 className="author-name">{testimonials[currentIndex].name}</h4>
                      <p className="author-role">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="testimonial-controls">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="control-btn prev-btn"
            >
              <FaChevronLeft />
            </motion.button>
            
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="control-btn next-btn"
            >
              <FaChevronRight />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .testimonials-section {
          padding: 4rem 0;
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          color: white;
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
          color: white;
          margin-bottom: 1rem;
          font-family: var(--font-display);
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: #bdc3c7;
          max-width: 600px;
          margin: 0 auto;
        }

        .testimonials-container {
          position: relative;
        }

        .testimonials-wrapper {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          min-height: 300px;
        }

        .testimonial-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 3rem;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .quote-icon {
          font-size: 3rem;
          color: var(--primary-orange);
          margin-bottom: 1.5rem;
        }

        .testimonial-text {
          font-size: 1.2rem;
          line-height: 1.6;
          color: white;
          margin-bottom: 2rem;
          font-style: italic;
        }

        .testimonial-rating {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .star {
          color: #f39c12;
          font-size: 1.2rem;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .author-image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--primary-orange);
        }

        .author-info {
          text-align: left;
        }

        .author-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          margin: 0 0 0.25rem 0;
        }

        .author-role {
          color: #bdc3c7;
          margin: 0;
          font-size: 0.9rem;
        }

        .testimonial-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          margin-top: 2rem;
        }

        .control-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .control-btn:hover {
          background: var(--primary-orange);
          border-color: var(--primary-orange);
        }

        .testimonial-dots {
          display: flex;
          gap: 0.5rem;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: var(--primary-orange);
          transform: scale(1.2);
        }

        .dot:hover {
          background: rgba(255, 255, 255, 0.6);
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }

          .testimonial-card {
            padding: 2rem;
          }

          .testimonial-text {
            font-size: 1.1rem;
          }

          .testimonial-author {
            flex-direction: column;
            text-align: center;
          }

          .author-info {
            text-align: center;
          }

          .testimonial-controls {
            gap: 1rem;
          }

          .control-btn {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .testimonial-card {
            padding: 1.5rem;
          }

          .quote-icon {
            font-size: 2rem;
          }

          .testimonial-text {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
