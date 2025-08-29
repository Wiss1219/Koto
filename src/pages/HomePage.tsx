import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Loader, BookMarked, ArrowRight, BookOpen, Globe as GlobeIcon, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { Book } from '../types';
import { supabase } from '../lib/supabaseClient';

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <section className="relative bg-crimson-900 text-white pt-20 pb-32 md:pb-40 lg:pb-56 overflow-hidden">
      <div 
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5"
        style={{ backgroundSize: 'auto' }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {t('hero.enhancedTitle')}
          </h1>
          <p className="text-lg md:text-xl text-beige-300 mt-6 max-w-xl mx-auto lg:mx-0">
            {t('hero.enhancedDescription')}
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10"
          >
            <Link to="/books" className="inline-block bg-gold-500 text-leather-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gold-400 transition-colors shadow-lg">
              {t('hero.shopNow')}
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="hidden lg:block relative h-96"
        >
          <motion.img 
            src="https://m.media-amazon.com/images/I/71yUDsCWKEL._UF1000,1000_QL80_.jpg" 
            alt="Book 2" 
            className="absolute top-20 right-0 w-72 rounded-lg shadow-2xl z-10"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.img 
            src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1543897827i/43097201.jpg"
            alt="Book 3" 
            className="absolute bottom-0 left-0 w-56 rounded-lg shadow-2xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

const CurvedDivider = () => (
  <div className="relative">
    <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32" style={{ transform: 'translateY(1px)' }}>
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-full fill-current text-beige-100 dark:text-leather-900 transition-colors duration-300">
        <path d="M1440 0C960 100 480 100 0 0V100H1440V0Z" />
      </svg>
    </div>
  </div>
);

const CategoriesSection = () => {
  const { t } = useTranslation();
  const categories = [
    { name: t('categories.quran'), link: '/qurans', icon: <BookMarked /> },
    { name: t('categories.literature'), link: '/books?category=literature', icon: <BookOpen /> },
    { name: t('categories.history'), link: '/books?category=history', icon: <GlobeIcon /> },
    { name: t('categories.science'), link: '/books?category=science', icon: <ShieldCheck /> },
  ];
  return (
    <section className="py-20 bg-beige-100 dark:bg-leather-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-crimson-900 dark:text-white mb-4">{t('home.browseCategories')}</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={cat.link} className="block bg-white dark:bg-leather-800 p-6 rounded-lg text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="text-crimson-800 dark:text-gold-500 mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-beige-200 dark:bg-leather-900 rounded-full">
                  {React.cloneElement(cat.icon, { size: 32, strokeWidth: 1.5 })}
                </div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{cat.name}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NewArrivalsSection = ({ books, loading }: { books: Book[], loading: boolean }) => {
  const { t } = useTranslation();
  return (
    <section className="py-20 bg-white dark:bg-leather-800 transition-colors duration-300">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 px-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-crimson-900 dark:text-white mb-4">{t('home.newArrivals')}</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">{t('home.newArrivalsDesc')}</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64"><Loader className="animate-spin text-crimson-900 dark:text-gold-500" size={48} /></div>
        ) : (
          <div className="relative">
            <div className="flex space-x-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-crimson-700 dark:scrollbar-thumb-gold-500 scrollbar-track-transparent">
              <div className="flex-shrink-0 w-6"></div> {/* Spacer */}
              {books.map((book) => (
                <div key={book.id} className="snap-center w-64 flex-shrink-0">
                  <BookCard book={book} />
                </div>
              ))}
              <div className="snap-center flex-shrink-0 w-64 flex items-center justify-center">
                <Link to="/books" className="group flex flex-col items-center justify-center h-full w-full bg-gray-50 dark:bg-leather-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-crimson-800 dark:hover:border-gold-500 transition-all">
                  <ArrowRight className="text-gray-400 group-hover:text-crimson-800 dark:group-hover:text-gold-500 transition-transform group-hover:scale-110" size={40}/>
                  <span className="mt-4 font-semibold text-gray-700 dark:text-gray-300">{t('home.viewAll')}</span>
                </Link>
              </div>
              <div className="flex-shrink-0 w-6"></div> {/* Spacer */}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const WhyChooseUsSection = () => {
    const { t } = useTranslation();
    const features = [
      {
        icon: <BookMarked size={28} />,
        title: t('home.features.curated.title'),
        description: t('home.features.curated.desc'),
      },
      {
        icon: <GlobeIcon size={28} />,
        title: t('home.features.shipping.title'),
        description: t('home.features.shipping.desc'),
      },
      {
        icon: <ShieldCheck size={28} />,
        title: t('home.features.secure.title'),
        description: t('home.features.secure.desc'),
      },
    ];
  
    return (
      <section className="py-20 bg-beige-100 dark:bg-leather-900 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-crimson-900 dark:text-white mb-4">{t('home.whyChooseUs')}</h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-white dark:bg-leather-800 rounded-lg shadow-md"
              >
                <div className="inline-block p-4 bg-crimson-100 dark:bg-gold-500/10 text-crimson-900 dark:text-gold-500 rounded-full mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
};

const NewsletterSection = () => {
    const { t } = useTranslation();
    return (
      <section className="bg-crimson-900 dark:bg-leather-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">{t('home.newsletter.title')}</h2>
          <p className="text-beige-300 max-w-2xl mx-auto mb-8">{t('home.newsletter.desc')}</p>
          <form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder={t('home.newsletter.placeholder')}
              className="flex-grow px-5 py-3 rounded-md text-leather-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
            <button type="submit" className="bg-gold-500 text-leather-900 px-8 py-3 rounded-md font-semibold hover:bg-gold-400 transition-colors">
              {t('home.newsletter.subscribe')}
            </button>
          </form>
        </div>
      </section>
    );
};

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('books').select('*').order('created_at', { ascending: false }).limit(10);
      if (error) {
        console.error('Error fetching books:', error);
      } else {
        setBooks(data as Book[]);
      }
      setLoading(false);
    };
    fetchBooks();
  }, []);

  return (
    <div className="bg-white dark:bg-leather-900">
      <HeroSection />
      <CurvedDivider />
      <CategoriesSection />
      <NewArrivalsSection books={books} loading={loading} />
      <WhyChooseUsSection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
