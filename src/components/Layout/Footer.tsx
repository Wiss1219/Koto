import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <footer className="bg-leather-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              <span className={`${isRTL ? 'font-amiri' : 'font-inter'} text-gold-500`}>
                {isRTL ? 'كتوب كوم' : 'Kotobcom'}
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-300 hover:text-gold-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-gold-500 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-gold-500 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gold-500 border-b-2 border-gold-500/50 pb-2 mb-4">{t('footer.quickLinks')}</h3>
            <nav className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-gold-500 transition-colors">{t('nav.home')}</Link>
              <Link to="/qurans" className="block text-gray-300 hover:text-gold-500 transition-colors">{t('nav.qurans')}</Link>
              <Link to="/books" className="block text-gray-300 hover:text-gold-500 transition-colors">{t('nav.books')}</Link>
              <Link to="/contact" className="block text-gray-300 hover:text-gold-500 transition-colors">{t('nav.contact')}</Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gold-500 border-b-2 border-gold-500/50 pb-2 mb-4">{t('common.category')}</h3>
            <nav className="space-y-2">
              <Link to="/qurans" className="block text-gray-300 hover:text-gold-500 transition-colors">{t('categories.quran')}</Link>
              <Link to="/books?category=religious" className="block text-gray-300 hover:text-gold-500 transition-colors">{t('categories.religious')}</Link>
              <Link to="/books?category=literature" className="block text-gray-300 hover:text-gold-500 transition-colors">{t('categories.literature')}</Link>
              <Link to="/books?category=history" className="block text-gray-300 hover:text-gold-500 transition-colors">{t('categories.history')}</Link>
              <Link to="/books?category=science" className="block text-gray-300 hover:text-gold-500 transition-colors">{t('categories.science')}</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gold-500 border-b-2 border-gold-500/50 pb-2 mb-4">{t('footer.contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin size={16} className="text-gold-500 flex-shrink-0" />
                <span className="text-sm">123 Library Street, Book City, BC 12345</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone size={16} className="text-gold-500 flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail size={16} className="text-gold-500 flex-shrink-0" />
                <span className="text-sm">info@kotobcom.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">{t('footer.copyright')}</p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-gold-500 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-gold-500 transition-colors">Terms of Service</Link>
              <Link to="/support" className="text-gray-400 hover:text-gold-500 transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
