import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        qurans: 'Qurans & Religious',
        books: 'Books',
        newArrivals: 'New Arrivals',
        contact: 'Contact',
        cart: 'Cart',
        login: 'Login',
        register: 'Register',
        account: 'Account',
        admin: 'Admin',
        logout: 'Logout'
      },
      hero: {
        title: 'Your Next Chapter Awaits.',
        description: 'From timeless classics to new adventures, discover a universe of books curated for the passionate reader.',
        shopNow: 'Explore the Collection',
        enhancedTitle: 'Discover Worlds Within Pages.',
        enhancedDescription: 'Your gateway to infinite stories, timeless knowledge, and new adventures. Find your next great read at Kotobcom.'
      },
      home: {
        browseCategories: 'Browse by Category',
        newArrivals: 'New Arrivals',
        newArrivalsDesc: 'Check out the latest additions to our curated collection.',
        viewAll: 'View All',
        whyChooseUs: 'Why Choose Kotobcom?',
        features: {
          curated: {
            title: 'Curated Collections',
            desc: 'Every book is hand-picked by our team of passionate readers and experts.'
          },
          shipping: {
            title: 'Worldwide Shipping',
            desc: 'We deliver your next favorite book right to your doorstep, wherever you are.'
          },
          secure: {
            title: 'Secure Payments',
            desc: 'Shop with confidence using our secure and encrypted payment gateway.'
          }
        },
        newsletter: {
          title: 'Join Our Newsletter',
          desc: 'Subscribe to get the latest on new releases, special offers, and more.',
          placeholder: 'Enter your email address',
          subscribe: 'Subscribe'
        }
      },
      common: {
        search: 'Search books...',
        addToCart: 'Add to Cart',
        viewDetails: 'View Details',
        price: 'Price',
        category: 'Category',
        language: 'Language',
        author: 'Author',
        pages: 'Pages',
        publisher: 'Publisher',
        isbn: 'ISBN',
        inStock: 'In Stock',
        outOfStock: 'Out of Stock',
        reviews: 'Reviews',
        description: 'Description',
        loading: 'Loading...',
        error: 'Error occurred',
        addToWishlist: 'Add to Wishlist',
        removeFromWishlist: 'Remove from Wishlist'
      },
      categories: {
        quran: 'Quran',
        religious: 'Religious Books',
        literature: 'Literature',
        history: 'History',
        science: 'Science',
        children: 'Children Books'
      },
      cart: {
        title: 'Shopping Cart',
        empty: 'Your cart is empty',
        total: 'Total',
        checkout: 'Proceed to Checkout',
        quantity: 'Quantity',
        remove: 'Remove',
        subtotal: 'Subtotal'
      },
      wishlist: {
        title: 'My Wishlist',
        empty: 'Your wishlist is empty.',
        emptyDesc: 'Add books you love to your wishlist by clicking the heart icon.',
        browseBooks: 'Browse Books'
      },
      account: {
        profile: 'Profile',
        orders: 'My Orders',
        wishlist: 'My Wishlist'
      },
      footer: {
        contact: 'Contact Us',
        quickLinks: 'Quick Links',
        followUs: 'Follow Us',
        copyright: '© 2025 Kotobcom. All rights reserved.'
      }
    }
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        qurans: 'القرآن والكتب الدينية',
        books: 'الكتب',
        newArrivals: 'الجديد',
        contact: 'اتصل بنا',
        cart: 'السلة',
        login: 'تسجيل الدخول',
        register: 'إنشاء حساب',
        account: 'حسابي',
        admin: 'الإدارة',
        logout: 'تسجيل الخروج'
      },
      hero: {
        title: 'فصلك القادم في انتظارك.',
        description: 'من الكلاسيكيات الخالدة إلى المغامرات الجديدة، اكتشف عالمًا من الكتب المصممة للقارئ الشغوف.',
        shopNow: 'استكشف المجموعة',
        enhancedTitle: 'اكتشف عوالم بين الصفحات.',
        enhancedDescription: 'بوابتك إلى قصص لا نهائية، معرفة خالدة، ومغامرات جديدة. ابحث عن قراءتك الرائعة التالية في كتوبكوم.'
      },
      home: {
        browseCategories: 'تصفح حسب الفئة',
        newArrivals: 'الكتب الجديدة',
        newArrivalsDesc: 'اطلع على أحدث الإضافات إلى مجموعتنا المختارة بعناية.',
        viewAll: 'عرض الكل',
        whyChooseUs: 'لماذا تختار كتوبكوم؟',
        features: {
          curated: {
            title: 'مجموعات منسقة',
            desc: 'كل كتاب يتم اختياره بعناية من قبل فريقنا من القراء والخبراء الشغوفين.'
          },
          shipping: {
            title: 'شحن عالمي',
            desc: 'نقوم بتوصيل كتابك المفضل التالي إلى عتبة داركم، أينما كنتم.'
          },
          secure: {
            title: 'دفع آمن',
            desc: 'تسوق بثقة باستخدام بوابتنا للدفع الآمن والمشفر.'
          }
        },
        newsletter: {
          title: 'انضم إلى نشرتنا الإخبارية',
          desc: 'اشترك للحصول على آخر المستجدات حول الإصدارات الجديدة والعروض الخاصة والمزيد.',
          placeholder: 'أدخل عنوان بريدك الإلكتروني',
          subscribe: 'اشتراك'
        }
      },
      common: {
        search: 'البحث عن الكتب...',
        addToCart: 'أضف إلى السلة',
        viewDetails: 'عرض التفاصيل',
        price: 'السعر',
        category: 'الفئة',
        language: 'اللغة',
        author: 'المؤلف',
        pages: 'الصفحات',
        publisher: 'الناشر',
        isbn: 'رقم الكتاب',
        inStock: 'متوفر',
        outOfStock: 'غير متوفر',
        reviews: 'المراجعات',
        description: 'الوصف',
        loading: 'جارٍ التحميل...',
        error: 'حدث خطأ',
        addToWishlist: 'أضف إلى المفضلة',
        removeFromWishlist: 'إزالة من المفضلة'
      },
      categories: {
        quran: 'القرآن',
        religious: 'الكتب الدينية',
        literature: 'الأدب',
        history: 'التاريخ',
        science: 'العلوم',
        children: 'كتب الأطفال'
      },
      cart: {
        title: 'سلة التسوق',
        empty: 'سلة التسوق فارغة',
        total: 'المجموع',
        checkout: 'إتمام الشراء',
        quantity: 'الكمية',
        remove: 'إزالة',
        subtotal: 'المجموع الفرعي'
      },
      wishlist: {
        title: 'قائمة مفضلاتي',
        empty: 'قائمة مفضلاتك فارغة.',
        emptyDesc: 'أضف الكتب التي تحبها إلى قائمة مفضلاتك بالضغط على أيقونة القلب.',
        browseBooks: 'تصفح الكتب'
      },
      account: {
        profile: 'الملف الشخصي',
        orders: 'طلباتي',
        wishlist: 'مفضلاتي'
      },
      footer: {
        contact: 'اتصل بنا',
        quickLinks: 'روابط سريعة',
        followUs: 'تابعنا',
        copyright: '© 2025 كتوب كوم. جميع الحقوق محفوظة.'
      }
    }
  },
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        qurans: 'Corans et Religieux',
        books: 'Livres',
        newArrivals: 'Nouveautés',
        contact: 'Contact',
        cart: 'Panier',
        login: 'Connexion',
        register: 'Inscription',
        account: 'Compte',
        admin: 'Admin',
        logout: 'Déconnexion'
      },
      hero: {
        title: 'Votre Prochain Chapitre Vous Attend.',
        description: 'Des classiques intemporels aux nouvelles aventures, découvrez un univers de livres conçu pour le lecteur passionné.',
        shopNow: 'Explorer la Collection',
        enhancedTitle: 'Découvrez des Mondes Entre les Pages.',
        enhancedDescription: 'Votre portail vers des histoires infinies, des connaissances intemporelles et de nouvelles aventures. Trouvez votre prochaine grande lecture sur Kotobcom.'
      },
      home: {
        browseCategories: 'Parcourir par Catégorie',
        newArrivals: 'Nouveautés',
        newArrivalsDesc: 'Découvrez les derniers ajouts à notre collection soigneusement sélectionnée.',
        viewAll: 'Voir Tout',
        whyChooseUs: 'Pourquoi Choisir Kotobcom?',
        features: {
          curated: {
            title: 'Collections Sélectionnées',
            desc: 'Chaque livre est choisi avec soin par notre équipe de lecteurs et d\'experts passionnés.'
          },
          shipping: {
            title: 'Livraison Internationale',
            desc: 'Nous livrons votre prochain livre préféré directement à votre porte, où que vous soyez.'
          },
          secure: {
            title: 'Paiements Sécurisés',
            desc: 'Achetez en toute confiance grâce à notre passerelle de paiement sécurisée et cryptée.'
          }
        },
        newsletter: {
          title: 'Rejoignez notre Newsletter',
          desc: 'Abonnez-vous pour recevoir les dernières informations sur les nouveautés, les offres spéciales et plus encore.',
          placeholder: 'Entrez votre adresse e-mail',
          subscribe: 'S\'abonner'
        }
      },
      common: {
        search: 'Rechercher des livres...',
        addToCart: 'Ajouter au Panier',
        viewDetails: 'Voir Détails',
        price: 'Prix',
        category: 'Catégorie',
        language: 'Langue',
        author: 'Auteur',
        pages: 'Pages',
        publisher: 'Éditeur',
        isbn: 'ISBN',
        inStock: 'En Stock',
        outOfStock: 'Rupture de Stock',
        reviews: 'Avis',
        description: 'Description',
        loading: 'Chargement...',
        error: 'Erreur survenue',
        addToWishlist: 'Ajouter à la liste de souhaits',
        removeFromWishlist: 'Retirer de la liste de souhaits'
      },
      categories: {
        quran: 'Coran',
        religious: 'Livres Religieux',
        literature: 'Littérature',
        history: 'Histoire',
        science: 'Science',
        children: 'Livres pour Enfants'
      },
      cart: {
        title: 'Panier d\'Achat',
        empty: 'Votre panier est vide',
        total: 'Total',
        checkout: 'Passer à la Commande',
        quantity: 'Quantité',
        remove: 'Supprimer',
        subtotal: 'Sous-total'
      },
      wishlist: {
        title: 'Ma Liste de Souhaits',
        empty: 'Votre liste de souhaits est vide.',
        emptyDesc: 'Ajoutez des livres que vous aimez à votre liste de souhaits en cliquant sur l\'icône du cœur.',
        browseBooks: 'Parcourir les livres'
      },
      account: {
        profile: 'Profil',
        orders: 'Mes Commandes',
        wishlist: 'Ma Liste de Souhaits'
      },
      footer: {
        contact: 'Contactez-Nous',
        quickLinks: 'Liens Rapides',
        followUs: 'Suivez-Nous',
        copyright: '© 2025 Kotobcom. Tous droits réservés.'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
