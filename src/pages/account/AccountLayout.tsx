import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, Heart, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AccountLayout: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
      isActive
        ? 'bg-crimson-100 dark:bg-gold-500/10 text-crimson-900 dark:text-gold-500 font-semibold'
        : 'hover:bg-gray-100 dark:hover:bg-leather-700 text-gray-600 dark:text-gray-300'
    }`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-leather-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Account</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.full_name}!</p>
        </div>
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-white dark:bg-leather-800 rounded-lg shadow-md p-4">
              <nav className="flex flex-col space-y-2">
                <NavLink to="/account/profile" className={navLinkClass}>
                  <User size={20} />
                  <span>{t('account.profile')}</span>
                </NavLink>
                <NavLink to="/account/orders" className={navLinkClass}>
                  <ShoppingBag size={20} />
                  <span>{t('account.orders')}</span>
                </NavLink>
                <NavLink to="/account/wishlist" className={navLinkClass}>
                  <Heart size={20} />
                  <span>{t('account.wishlist')}</span>
                </NavLink>
              </nav>
            </div>
          </aside>
          <main className="lg:col-span-3">
            <div className="bg-white dark:bg-leather-800 rounded-lg shadow-md p-8 min-h-[400px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
