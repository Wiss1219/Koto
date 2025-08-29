import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Shield, LogOut } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Details</h2>
      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-leather-700/50 rounded-lg">
          <User className="text-crimson-800 dark:text-gold-500" size={24} />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
            <p className="font-semibold text-gray-800 dark:text-gray-200">{user.full_name}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-leather-700/50 rounded-lg">
          <Mail className="text-crimson-800 dark:text-gold-500" size={24} />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
            <p className="font-semibold text-gray-800 dark:text-gray-200">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-leather-700/50 rounded-lg">
          <Shield className="text-crimson-800 dark:text-gold-500" size={24} />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
            <p className="font-semibold text-gray-800 dark:text-gray-200 capitalize">{user.role}</p>
          </div>
        </div>
        <div className="pt-4">
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 font-semibold"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
