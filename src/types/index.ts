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
  full_name: string;
  email: string;
  role: 'user' | 'admin';
  created_at?: string;
}

export interface Order {
  id: string;
  user_id: string;
  user?: User;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  created_at: string;
  updated_at: string;
  shipping_address: Address;
}

export interface OrderItem {
  id: string;
  order_id: string;
  book_id: string;
  book?: Book;
  quantity: number;
  price: number;
  created_at: string;
}

export interface Address {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  email: string;
  phone: string;
}

export type Language = 'en' | 'ar' | 'fr';
