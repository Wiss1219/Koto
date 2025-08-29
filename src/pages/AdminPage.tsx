import React from 'react';
import { motion } from 'framer-motion';
import { Book, Users, BarChart2 } from 'lucide-react';

const AdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-crimson-900 mb-8">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <Book className="text-crimson-700" size={32} />
                <h2 className="text-2xl font-semibold">Manage Books</h2>
              </div>
              <p className="text-gray-600">Add, edit, or remove books from the store catalog.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <Users className="text-crimson-700" size={32} />
                <h2 className="text-2xl font-semibold">Manage Users</h2>
              </div>
              <p className="text-gray-600">View and manage customer accounts and roles.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <BarChart2 className="text-crimson-700" size={32} />
                <h2 className="text-2xl font-semibold">View Analytics</h2>
              </div>
              <p className="text-gray-600">Check sales data, popular products, and site traffic.</p>
            </div>
          </div>

          <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Admin Panel Under Construction</h2>
            <p className="text-gray-600">
              This area is a placeholder for the full admin functionality. In a complete application, this would be a comprehensive interface for managing the entire e-commerce platform, connected to a secure backend API.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;
