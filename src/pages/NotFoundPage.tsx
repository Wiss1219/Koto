import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Frown } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Frown className="mx-auto text-crimson-300 mb-8" size={96} />
        <h1 className="text-6xl font-bold text-crimson-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-crimson-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-crimson-800 transition-colors shadow-lg"
          >
            Go to Homepage
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
