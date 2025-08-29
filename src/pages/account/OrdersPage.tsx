import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const OrdersPage: React.FC = () => {
    const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Orders</h2>
      <div className="text-center py-12 bg-gray-50 dark:bg-leather-700/30 rounded-lg">
        <ShoppingBag size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No orders yet</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">You haven't placed any orders with us yet. Let's change that!</p>
        <Link to="/books">
            <button className="bg-crimson-900 text-white px-6 py-2 rounded-lg hover:bg-crimson-800 transition-colors">
              Start Shopping
            </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default OrdersPage;
