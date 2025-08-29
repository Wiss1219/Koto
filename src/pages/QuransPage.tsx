import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Filter, Search, X, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BookCard from '../components/BookCard';
import { supabase } from '../lib/supabaseClient';
import { Book } from '../types';

const QuransPage: React.FC = () => {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({ language: '', priceMin: '', priceMax: '', search: '' });

  const languages = [
    { value: '', label: 'All Languages' },
    { value: 'ar', label: 'العربية' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' }
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      let query = supabase.from('books').select('*').in('category', ['quran', 'religious']);

      if (filters.search) query = query.or(`title.ilike.%${filters.search}%,titleAr.ilike.%${filters.search}%,titleFr.ilike.%${filters.search}%`);
      if (filters.language) query = query.eq('language', filters.language);
      if (filters.priceMin) query = query.gte('price', parseFloat(filters.priceMin));
      if (filters.priceMax) query = query.lte('price', parseFloat(filters.priceMax));

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching religious books:', error);
        setBooks([]);
      } else {
        setBooks(data as Book[]);
      }
      setLoading(false);
    };

    fetchBooks();
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ language: '', priceMin: '', priceMax: '', search: '' });
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
        <button onClick={clearFilters} className="text-sm text-crimson-600 hover:text-crimson-700 dark:text-gold-500 dark:hover:text-gold-400">Clear All</button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('common.language')}</label>
        <select value={filters.language} onChange={(e) => handleFilterChange('language', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white dark:bg-leather-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-crimson-500">
          {languages.map(lang => <option key={lang.value} value={lang.value}>{lang.label}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price Range</label>
        <div className="flex gap-2">
          <input type="number" value={filters.priceMin} onChange={(e) => handleFilterChange('priceMin', e.target.value)} placeholder="Min" className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white dark:bg-leather-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-crimson-500" />
          <input type="number" value={filters.priceMax} onChange={(e) => handleFilterChange('priceMax', e.target.value)} placeholder="Max" className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white dark:bg-leather-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-crimson-500" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-leather-900">
      <div className="bg-white dark:bg-leather-800 shadow-sm border-b dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-crimson-900 dark:text-white mb-4">{t('nav.qurans')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-3xl">Explore our collection of Qurans and religious literature.</p>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-0 sm:min-w-64">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" value={filters.search} onChange={(e) => handleFilterChange('search', e.target.value)} placeholder={t('common.search')} className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-leather-900 focus:outline-none focus:ring-2 focus:ring-crimson-500" />
                {filters.search && <button onClick={() => handleFilterChange('search', '')} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"><X size={16} /></button>}
              </div>
            </div>
            <button onClick={() => setIsFilterOpen(true)} className="lg:hidden flex items-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-leather-700 transition-colors">
              <Filter size={16} /> Filters
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <aside className="w-64 hidden lg:block">
            <div className="bg-white dark:bg-leather-800 rounded-lg shadow-sm p-6 sticky top-28">
              <FilterPanel />
            </div>
          </aside>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setIsFilterOpen(false)}>
                <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-leather-800 shadow-lg p-6" onClick={(e) => e.stopPropagation()}>
                  <FilterPanel />
                  <button onClick={() => setIsFilterOpen(false)} className="mt-6 w-full bg-crimson-900 text-white py-2 rounded-lg">Apply</button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600 dark:text-gray-400">{loading ? 'Loading...' : `${books.length} book${books.length !== 1 ? 's' : ''} found`}</p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-96"><Loader className="animate-spin text-crimson-900 dark:text-gold-500" size={48} /></div>
            ) : books.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book, index) => (
                  <motion.div key={book.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }}>
                    <BookCard book={book} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-leather-800 rounded-lg">
                <div className="text-gray-400 mb-4"><Search size={48} className="mx-auto" /></div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No books found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search criteria</p>
                <button onClick={clearFilters} className="bg-crimson-900 text-white px-6 py-2 rounded-lg hover:bg-crimson-800 transition-colors">Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuransPage;
