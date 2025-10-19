import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="not-found-content"
        >
          <div className="error-code">404</div>
          <h1>Page Not Found</h1>
          <p>The page you're looking for doesn't exist.</p>
          <div className="actions">
            <Link to="/" className="btn btn-primary">
              <FaHome />
              Go Home
            </Link>
            <button onClick={() => window.history.back()} className="btn btn-secondary">
              <FaArrowLeft />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .not-found-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .not-found-content {
          text-align: center;
        }

        .error-code {
          font-size: 8rem;
          font-weight: 900;
          color: var(--primary-orange);
          line-height: 1;
          margin-bottom: 1rem;
          font-family: var(--font-display);
        }

        .not-found-content h1 {
          font-size: 2.5rem;
          color: var(--text-dark);
          margin-bottom: 1rem;
        }

        .not-found-content p {
          font-size: 1.2rem;
          color: var(--text-light);
          margin-bottom: 2rem;
        }

        .actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .actions .btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        @media (max-width: 768px) {
          .error-code {
            font-size: 6rem;
          }

          .not-found-content h1 {
            font-size: 2rem;
          }

          .actions {
            flex-direction: column;
            align-items: center;
          }

          .actions .btn {
            width: 100%;
            max-width: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
