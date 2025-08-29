import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Book } from '../types';

const CartPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { state, updateQuantity, removeItem } = useCart();
  const isRTL = i18n.language === 'ar';

  const getLocalizedTitle = (book: Book) => {
    switch (i18n.language) {
      case 'ar': return book.titleAr || book.title;
      case 'fr': return book.titleFr || book.title;
      default: return book.title;
    }
  };

  const getLocalizedAuthor = (book: Book) => {
    switch (i18n.language) {
      case 'ar': return book.authorAr || book.author;
      case 'fr': return book.authorFr || book.author;
      default: return book.author;
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-leather-900 flex items-center justify-center py-12 px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center bg-white dark:bg-leather-800 p-12 rounded-lg shadow-lg"
        >
          <ShoppingBag size={80} className="mx-auto text-crimson-300 dark:text-gold-500/50 mb-6" />
          <h1 className="text-3xl font-bold text-crimson-900 dark:text-white mb-4">{t('cart.empty')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Explore our collection and find your next great read!</p>
          <Link to="/books">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-crimson-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-crimson-800 transition-colors">Continue Shopping</motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-leather-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-crimson-900 dark:text-white mb-8 text-center">{t('cart.title')}</h1>
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {state.items.map((item) => (
              <motion.div
                key={item.book.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white dark:bg-leather-800 rounded-lg shadow-md p-6"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-24 h-32 flex-shrink-0 mx-auto sm:mx-0">
                    <img src={item.book.image} alt={getLocalizedTitle(item.book)} className="w-full h-full object-cover rounded-lg shadow-sm" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Link to={`/product/${item.book.id}`}>
                          <h3 className={`font-semibold text-gray-900 dark:text-white hover:text-crimson-700 dark:hover:text-gold-500 mb-1 ${isRTL && item.book.language === 'ar' ? 'font-amiri text-right' : 'font-inter'}`}>{getLocalizedTitle(item.book)}</h3>
                        </Link>
                        <p className={`text-gray-600 dark:text-gray-400 text-sm ${isRTL && item.book.language === 'ar' ? 'font-amiri text-right' : 'font-inter'}`}>{t('common.author')}: {getLocalizedAuthor(item.book)}</p>
                      </div>
                      <button onClick={() => removeItem(item.book.id)} className="text-gray-400 hover:text-red-500 transition-colors" title={t('cart.remove')}><Trash2 size={20} /></button>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(item.book.id, item.quantity - 1)} disabled={item.quantity <= 1} className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-leather-700 disabled:opacity-50 disabled:cursor-not-allowed"><Minus size={16} /></button>
                        <span className="font-medium text-lg min-w-8 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.book.id, item.quantity + 1)} className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-leather-700"><Plus size={16} /></button>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-crimson-900 dark:text-gold-500">${(item.book.price * item.quantity).toFixed(2)}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">${item.book.price.toFixed(2)} each</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-leather-800 rounded-lg shadow-lg p-8 sticky top-28">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-300"><span>{t('cart.subtotal')}</span><span className="font-medium">${state.total.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300"><span>Shipping</span><span className="font-medium">Free</span></div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex justify-between text-xl font-bold text-crimson-900 dark:text-white"><span>{t('cart.total')}</span><span>${state.total.toFixed(2)}</span></div>
              </div>
              <Link to="/checkout">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full mt-8 bg-crimson-900 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-crimson-800 transition-colors shadow-lg">{t('cart.checkout')}</motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
