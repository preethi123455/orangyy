import React from 'react';
import { motion } from 'framer-motion';

const Profile = () => {
  return (
    <div className="profile-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header"
        >
          <h1>Profile</h1>
          <p>Manage your account settings</p>
        </motion.div>
      </div>

      <style jsx>{`
        .profile-page {
          padding: 2rem 0;
          min-height: 100vh;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .page-header h1 {
          font-size: 2.5rem;
          color: var(--text-dark);
          margin-bottom: 1rem;
        }

        .page-header p {
          font-size: 1.1rem;
          color: var(--text-light);
        }
      `}</style>
    </div>
  );
};

export default Profile;
