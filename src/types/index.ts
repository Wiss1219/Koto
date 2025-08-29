export interface Book {
  id: string;
  created_at: string;
  title: string;
  title_ar?: string;
  title_fr?: string;
  author: string;
  author_ar?: string;
  author_fr?: string;
  price: number;
  image: string;
  category: 'quran' | 'religious' | 'literature' | 'history' | 'science' | 'children';
  language: 'ar' | 'en' | 'fr';
  description: string;
  description_ar?: string;
  description_fr?: string;
  isbn: string;
  pages: number;
  publisher: string;
  publish_year: number;
  rating: number;
  reviews: Review[];
  in_stock: boolean;
  quantity: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  orders: Order[];
  wishlist: string[];
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  shippingAddress: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type Language = 'en' | 'ar' | 'fr';
