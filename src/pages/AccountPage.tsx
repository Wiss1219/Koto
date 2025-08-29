import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, ShoppingBag, Heart, LogOut } from 'lucide-react';

const AccountPage: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-crimson-800 to-crimson-900 p-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                  <p className="text-crimson-200">{user.email}</p>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Account</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg flex items-center gap-4 hover:shadow-md transition-shadow">
                  <User className="text-crimson-700" size={24} />
                  <div>
                    <h3 className="font-semibold">Profile Details</h3>
                    <p className="text-sm text-gray-600">Edit your personal information</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg flex items-center gap-4 hover:shadow-md transition-shadow">
                  <ShoppingBag className="text-crimson-700" size={24} />
                  <div>
                    <h3 className="font-semibold">Order History</h3>
                    <p className="text-sm text-gray-600">View your past purchases</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg flex items-center gap-4 hover:shadow-md transition-shadow">
                  <Heart className="text-crimson-700" size={24} />
                  <div>
                    <h3 className="font-semibold">Wishlist</h3>
                    <p className="text-sm text-gray-600">Manage your saved items</p>
                  </div>
                </div>
                <button 
                  onClick={logout}
                  className="bg-gray-50 p-6 rounded-lg flex items-center gap-4 hover:shadow-md transition-shadow w-full text-left"
                >
                  <LogOut className="text-crimson-700" size={24} />
                  <div>
                    <h3 className="font-semibold">Logout</h3>
                    <p className="text-sm text-gray-600">Sign out of your account</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AccountPage;
