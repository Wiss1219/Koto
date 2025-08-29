import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  highlight?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, highlight = false }) => {
  const { i18n, t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const isRTL = i18n.language === 'ar';
  const isWishlisted = wishlistItems.includes(book.id);

  const getLocalizedTitle = () => {
    switch (i18n.language) {
      case 'ar': return book.title_ar || book.title;
      case 'fr': return book.title_fr || book.title;
      default: return book.title;
    }
  };

  const getLocalizedAuthor = () => {
    switch (i18n.language) {
      case 'ar': return book.author_ar || book.author;
      case 'fr': return book.author_fr || book.author;
      default: return book.author;
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book.id);
    }
  };

  const cardClasses = `bg-white dark:bg-leather-800 rounded-lg shadow-lg group overflow-hidden h-full flex flex-col transition-all duration-300 ${highlight ? 'border-2 border-gold-500' : 'border-2 border-transparent'}`;

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)' }} 
      className="h-full relative"
    >
      {isAuthenticated && (
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 z-10 p-2 bg-white/70 dark:bg-black/50 rounded-full text-crimson-800 dark:text-gold-500 hover:scale-110 transition-transform"
          title={isWishlisted ? t('common.removeFromWishlist') : t('common.addToWishlist')}
        >
          <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
        </button>
      )}
      <Link to={`/product/${book.id}`} className={cardClasses}>
        <div className="relative overflow-hidden bg-beige-100 dark:bg-leather-900 aspect-[3/4]">
          <img 
            src={book.image} 
            alt={getLocalizedTitle()} 
            className="w-full h-full object-cover" 
            loading="lazy" 
          />
        </div>
        <div className="p-5 text-center flex-1 flex flex-col justify-between">
          <div>
            <h3 className={`font-semibold text-gray-900 dark:text-white mb-1 truncate ${isRTL ? 'font-amiri' : 'font-inter'}`}>
              {getLocalizedTitle()}
            </h3>
            <p className={`text-gray-500 dark:text-gray-400 text-sm mb-3 truncate ${isRTL ? 'font-amiri' : 'font-inter'}`}>
              {getLocalizedAuthor()}
            </p>
          </div>
          <div className="text-lg font-bold text-crimson-900 dark:text-gold-500">
            €{book.price.toFixed(2)}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BookCard;
