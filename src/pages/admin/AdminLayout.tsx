import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Book, Users, ShoppingCart, Settings } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive
        ? 'bg-crimson-900 text-white shadow-md'
        : 'hover:bg-gray-200 dark:hover:bg-leather-700 text-gray-700 dark:text-gray-300'
    }`;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-leather-900 flex">
      <aside className="w-64 bg-white dark:bg-leather-800 shadow-lg p-4 flex-col hidden lg:flex">
        <div className="text-2xl font-bold text-crimson-900 dark:text-gold-500 mb-8 p-4">Admin Panel</div>
        <nav className="flex flex-col space-y-2">
          <NavLink to="/admin/dashboard" className={navLinkClass}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/books" className={navLinkClass}>
            <Book size={20} />
            <span>Manage Books</span>
          </NavLink>
          <NavLink to="/admin/users" className={navLinkClass}>
            <Users size={20} />
            <span>Manage Users</span>
          </NavLink>
          <NavLink to="/admin/orders" className={navLinkClass}>
            <ShoppingCart size={20} />
            <span>Orders</span>
          </NavLink>
          <div className="flex-grow" />
          <NavLink to="/admin/settings" className={`${navLinkClass} mt-auto`}>
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-6 lg:p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
