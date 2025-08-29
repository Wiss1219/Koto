import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NotFoundPage from './NotFoundPage';
import { Book } from '../types';
import { Star, ShoppingCart, CheckCircle, Shield, Truck, BookOpen, User, MessageSquare, Loader, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import BookCard from '../components/BookCard';
import { supabase } from '../lib/supabaseClient';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState('details');
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const isWishlisted = book ? wishlistItems.includes(book.id) : false;

  useEffect(() => {
    const fetchBookData = async () => {
      if (!id) return;
      setLoading(true);
      window.scrollTo(0, 0);

      const { data: bookData, error: bookError } = await supabase.from('books').select('*').eq('id', id).single();
      if (bookError || !bookData) {
        console.error('Error fetching book:', bookError);
        setBook(null); setLoading(false); return;
      }
      
      const fetchedBook = bookData as Book;
      setBook(fetchedBook);

      const { data: relatedData, error: relatedError } = await supabase.from('books').select('*').eq('category', fetchedBook.category).neq('id', fetchedBook.id).limit(4);
      if (relatedError) console.error('Error fetching related books:', relatedError);
      else setRelatedBooks(relatedData as Book[]);

      setLoading(false);
    };
    fetchBookData();
  }, [id]);

  const handleWishlistClick = () => {
    if (!book) return;
    if (isWishlisted) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book.id);
    }
  };

  const getLocalized = (book: Book, field: 'title' | 'author' | 'description') => {
    const lang = i18n.language;
    if (lang === 'ar') {
      const key = `${field}_ar` as keyof Book;
      return book[key] || book[field];
    }
    if (lang === 'fr') {
      const key = `${field}_fr` as keyof Book;
      return book[key] || book[field];
    }
    return book[field];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-leather-900">
        <Loader className="animate-spin text-crimson-900 dark:text-gold-500" size={48} />
      </div>
    );
  }

  if (!book) return <NotFoundPage />;

  const isRTL = i18n.language === 'ar';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-leather-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="bg-white dark:bg-leather-800 p-4 rounded-lg shadow-lg sticky top-28">
              <img src={book.image} alt={getLocalized(book, 'title') as string} className="w-full h-auto object-contain rounded-lg aspect-[3/4]" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="flex flex-col h-full">
              <h1 className={`text-3xl lg:text-4xl font-bold text-crimson-900 dark:text-white mb-4 ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                {getLocalized(book, 'title')}
              </h1>
              <p className={`text-lg text-gray-600 dark:text-gray-400 mb-4 ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                {t('common.author')}: <span className="font-medium">{getLocalized(book, 'author')}</span>
              </p>
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} className={i < Math.floor(book.rating) ? 'text-gold-500 fill-current' : 'text-gray-300 dark:text-gray-600'} />)}
                </div>
                <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">({book.rating.toFixed(1)} - {book.reviews?.length || 0} {t('common.reviews')})</span>
              </div>
              <div className="text-4xl font-bold text-crimson-900 dark:text-gold-500 mb-6">${book.price.toFixed(2)}</div>
              <div className="mb-6 flex items-center gap-4">
                <button
                  onClick={() => addItem(book)}
                  disabled={!book.in_stock}
                  className="flex-grow bg-gold-500 text-leather-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gold-400 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={24} />
                  {book.in_stock ? t('common.addToCart') : t('common.outOfStock')}
                </button>
                {isAuthenticated && (
                  <button
                    onClick={handleWishlistClick}
                    className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-crimson-800 dark:text-gold-500 hover:border-crimson-800 dark:hover:border-gold-500 transition-colors"
                    title={isWishlisted ? t('common.removeFromWishlist') : t('common.addToWishlist')}
                  >
                    <Heart size={24} className={isWishlisted ? 'fill-current' : ''} />
                  </button>
                )}
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300"><CheckCircle size={18} className="text-green-500" /><span>{book.in_stock ? t('common.inStock') : t('common.outOfStock')}</span></div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300"><Shield size={18} className="text-blue-500" /><span>Secure transaction</span></div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300"><Truck size={18} className="text-orange-500" /><span>Ships from Kotobcom warehouse</span></div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16">
          <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
            <nav className="flex space-x-8">
              <button onClick={() => setActiveTab('details')} className={`py-4 px-1 text-lg font-medium transition-colors ${activeTab === 'details' ? 'text-crimson-900 dark:text-gold-500 border-b-2 border-crimson-900 dark:border-gold-500' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>{t('common.description')}</button>
              <button onClick={() => setActiveTab('reviews')} className={`py-4 px-1 text-lg font-medium transition-colors ${activeTab === 'reviews' ? 'text-crimson-900 dark:text-gold-500 border-b-2 border-crimson-900 dark:border-gold-500' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>{t('common.reviews')} ({book.reviews?.length || 0})</button>
            </nav>
          </div>
          <div>
            {activeTab === 'details' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>{getLocalized(book, 'description')}</p>
                <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                  <li className="flex items-center gap-3"><BookOpen size={16} className="text-crimson-800 dark:text-gold-500" /> <strong>{t('common.pages')}:</strong> {book.pages}</li>
                  <li className="flex items-center gap-3"><User size={16} className="text-crimson-800 dark:text-gold-500" /> <strong>{t('common.publisher')}:</strong> {book.publisher}</li>
                  <li className="flex items-center gap-3"><MessageSquare size={16} className="text-crimson-800 dark:text-gold-500" /> <strong>{t('common.language')}:</strong> {book.language.toUpperCase()}</li>
                  <li className="flex items-center gap-3"><BookOpen size={16} className="text-crimson-800 dark:text-gold-500" /> <strong>{t('common.isbn')}:</strong> {book.isbn}</li>
                </ul>
              </motion.div>
            )}
            {activeTab === 'reviews' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {book.reviews && book.reviews.length > 0 ? <div className="space-y-6">{/* Render reviews here */}</div> : <p className="text-gray-600 dark:text-gray-400">No reviews yet for this book.</p>}
              </motion.div>
            )}
          </div>
        </div>

        {relatedBooks.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-crimson-900 dark:text-white mb-8 text-center">Related Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedBooks.map(relatedBook => <BookCard key={relatedBook.id} book={relatedBook} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
