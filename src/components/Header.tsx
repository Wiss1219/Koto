import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, ShoppingCart, User, Menu, X, Globe, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { state } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) => 
    `hover:text-gold-500 transition-colors font-medium relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:bg-gold-500 after:transition-all after:duration-300 ${isActive ? 'text-gold-500 after:w-full' : 'after:w-0'}`;

  return (
    <header className="bg-crimson-900 dark:bg-leather-900 text-white sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-leather-900 p-2 rounded-md shadow-md">
              <span className="font-bold text-2xl text-gold-500 leading-none px-1">K</span>
            </div>
            <div>
              <div className="text-xl font-bold text-white">Kotobcom</div>
              <div className="text-xs text-beige-300 hidden sm:block">Librairie Kotobcom</div>
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <NavLink to="/" className={navLinkClasses} end>{t('nav.home')}</NavLink>
            <NavLink to="/qurans" className={navLinkClasses}>{t('nav.qurans')}</NavLink>
            <NavLink to="/books" className={navLinkClasses}>{t('nav.books')}</NavLink>
            <NavLink to="/contact" className={navLinkClasses}>{t('nav.contact')}</NavLink>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Language & Theme */}
            <div className="flex items-center space-x-1">
              <div className="relative group">
                <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                  <Globe size={20} />
                </button>
                <div className="absolute right-0 top-full mt-2 bg-white dark:bg-leather-800 text-leather-900 dark:text-white rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all w-32">
                  <button onClick={() => handleLanguageChange('en')} className="block px-4 py-2 hover:bg-beige-200 dark:hover:bg-leather-900 w-full text-left">English</button>
                  <button onClick={() => handleLanguageChange('ar')} className="block px-4 py-2 hover:bg-beige-200 dark:hover:bg-leather-900 w-full text-left font-amiri">العربية</button>
                  <button onClick={() => handleLanguageChange('fr')} className="block px-4 py-2 hover:bg-beige-200 dark:hover:bg-leather-900 w-full text-left">Français</button>
                </div>
              </div>

              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
              <ShoppingCart size={22} />
              {state.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-leather-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 rounded-full hover:bg-white/10 transition-colors">
                  <User size={22} />
                </button>
                <div className="absolute right-0 top-full mt-2 bg-white dark:bg-leather-800 text-leather-900 dark:text-white rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all min-w-48">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm">Signed in as</p>
                    <p className="text-sm font-medium truncate">{user?.full_name}</p>
                  </div>
                  <Link to="/account" className="block px-4 py-2 hover:bg-beige-200 dark:hover:bg-leather-900">{t('nav.account')}</Link>
                  {user?.role === 'admin' && <Link to="/admin" className="block px-4 py-2 hover:bg-beige-200 dark:hover:bg-leather-900">{t('nav.admin')}</Link>}
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-beige-200 dark:hover:bg-leather-900">{t('nav.logout')}</button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login" className="hover:text-gold-500 transition-colors">{t('nav.login')}</Link>
              </div>
            )}
            
            <Link to="/contact" className="hidden lg:block">
                <button className="border border-white rounded-full px-5 py-2 text-sm hover:bg-white hover:text-crimson-900 transition-colors">
                    Contact
                </button>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-crimson-800 dark:bg-leather-800 border-t border-crimson-700 dark:border-gray-700"
          >
            <div className="container mx-auto px-4 py-4">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('common.search')}
                    className="w-full px-4 py-3 pl-10 rounded-lg bg-white dark:bg-leather-900 text-leather-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </form>
              <nav className="space-y-2">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-gold-500 transition-colors font-medium">{t('nav.home')}</Link>
                <Link to="/qurans" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-gold-500 transition-colors font-medium">{t('nav.qurans')}</Link>
                <Link to="/books" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-gold-500 transition-colors font-medium">{t('nav.books')}</Link>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-gold-500 transition-colors font-medium">{t('nav.contact')}</Link>
                <div className="border-t border-crimson-700 dark:border-gray-700 my-2" />
                {!isAuthenticated ? (
                  <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-gold-500 transition-colors font-medium">{t('nav.login')}</Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-gold-500 transition-colors font-medium">{t('nav.register')}</Link>
                  </>
                ) : (
                  <>
                    <Link to="/account" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-gold-500 transition-colors font-medium">{t('nav.account')}</Link>
                    {user?.role === 'admin' && <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-gold-500 transition-colors font-medium">{t('nav.admin')}</Link>}
                    <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-gold-500 transition-colors font-medium">{t('nav.logout')}</button>
                  </>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
