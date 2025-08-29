import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface WishlistContextType {
  wishlistItems: string[];
  addToWishlist: (bookId: string) => Promise<void>;
  removeFromWishlist: (bookId: string) => Promise<void>;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = useCallback(async () => {
    if (!user) {
      setWishlistItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('wishlists')
      .select('book_id')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching wishlist:', error);
    } else {
      setWishlistItems(data.map(item => item.book_id));
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addToWishlist = async (bookId: string) => {
    if (!user) {
      toast.error('You must be logged in to add to wishlist.');
      return;
    }
    if (wishlistItems.includes(bookId)) return;

    const { error } = await supabase
      .from('wishlists')
      .insert([{ user_id: user.id, book_id: bookId }]);

    if (error) {
      toast.error('Failed to add to wishlist.');
      console.error(error);
    } else {
      setWishlistItems(prev => [...prev, bookId]);
      toast.success('Added to wishlist!');
    }
  };

  const removeFromWishlist = async (bookId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('wishlists')
      .delete()
      .match({ user_id: user.id, book_id: bookId });

    if (error) {
      toast.error('Failed to remove from wishlist.');
      console.error(error);
    } else {
      setWishlistItems(prev => prev.filter(id => id !== bookId));
      toast.success('Removed from wishlist.');
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
