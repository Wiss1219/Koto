import React, { useState, useEffect } from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { supabase } from '../../lib/supabaseClient';
import { Book } from '../../types';
import BookCard from '../../components/BookCard';
import { Loader, Heart, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const WishlistPage: React.FC = () => {
  const { t } = useTranslation();
  const { wishlistItems, loading: wishlistLoading } = useWishlist();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      if (wishlistLoading) return;
      if (wishlistItems.length === 0) {
        setBooks([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .in('id', wishlistItems);

      if (error) {
        console.error('Error fetching wishlist books:', error);
      } else {
        setBooks(data as Book[]);
      }
      setLoading(false);
    };

    fetchBooks();
  }, [wishlistItems, wishlistLoading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('wishlist.title')}</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin text-crimson-900 dark:text-gold-500" size={40} />
        </div>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book, index) => (
            <motion.div 
              key={book.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <BookCard book={book} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('wishlist.empty')}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{t('wishlist.emptyDesc')}</p>
          <Link to="/books">
            <button className="bg-crimson-900 text-white px-6 py-2 rounded-lg hover:bg-crimson-800 transition-colors">
              {t('wishlist.browseBooks')}
            </button>
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default WishlistPage;
