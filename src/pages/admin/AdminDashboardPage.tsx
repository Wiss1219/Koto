import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Users, DollarSign, Loader, Package } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

const StatCard = ({ icon, title, value, color, loading }: { icon: React.ReactNode, title: string, value: string | number, color: string, loading: boolean }) => (
  <div className="bg-white dark:bg-leather-800 p-6 rounded-lg shadow-md flex items-center gap-6">
    <div className={`p-4 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
      {loading ? <Loader className="animate-spin" size={24} /> : <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>}
    </div>
  </div>
);

const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState({ books: 0, users: 0, orders: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const { count: bookCount } = await supabase.from('books').select('*', { count: 'exact', head: true });
      const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      const { count: orderCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });
      
      // Calculate total revenue
      const { data: revenueData } = await supabase
        .from('orders')
        .select('total')
        .eq('status', 'delivered');
      
      const totalRevenue = revenueData?.reduce((sum, order) => sum + parseFloat(order.total), 0) || 0;
      
      setStats({ 
        books: bookCount || 0, 
        users: userCount || 0, 
        orders: orderCount || 0,
        revenue: totalRevenue
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Book size={24} className="text-white" />} 
          title="Total Books" 
          value={stats.books} 
          color="bg-blue-500"
          loading={loading}
        />
        <StatCard 
          icon={<Users size={24} className="text-white" />} 
          title="Total Users" 
          value={stats.users} 
          color="bg-green-500"
          loading={loading}
        />
        <StatCard 
          icon={<Package size={24} className="text-white" />} 
          title="Total Orders" 
          value={stats.orders} 
          color="bg-purple-500"
          loading={loading}
        />
        <StatCard 
          icon={<DollarSign size={24} className="text-white" />} 
          title="Total Revenue" 
          value={`$${stats.revenue.toFixed(2)}`} 
          color="bg-yellow-500"
          loading={loading}
        />
      </div>
      <div className="mt-10 bg-white dark:bg-leather-800 p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Welcome to the Admin Panel</h2>
        <p className="text-gray-600 dark:text-gray-400">
          This is your control center for Kotobcom. You can manage books, view users, and check site statistics. More features for managing orders and site settings will be available soon.
        </p>
      </div>
    </motion.div>
  );
};

export default AdminDashboardPage;
