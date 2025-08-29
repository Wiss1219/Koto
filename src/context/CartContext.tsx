import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Book } from '../types';

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: Book }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.book.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.book.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.book.price * item.quantity), 0)
        };
      }
      
      const newItems = [...state.items, { book: action.payload, quantity: 1 }];
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.book.price * item.quantity), 0)
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.book.id !== action.payload);
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.book.price * item.quantity), 0)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.book.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
      
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.book.price * item.quantity), 0)
      };
    }
    
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    
    case 'LOAD_CART': {
      return {
        items: action.payload,
        total: action.payload.reduce((sum, item) => sum + (item.book.price * item.quantity), 0)
      };
    }
    
    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (book: Book) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  useEffect(() => {
    const savedCart = localStorage.getItem('kotobcom-cart');
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kotobcom-cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (book: Book) => {
    dispatch({ type: 'ADD_ITEM', payload: book });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
