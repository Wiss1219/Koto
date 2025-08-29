import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Book as BookType } from '../../types';
import { Plus, Edit, Trash2, Loader, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminBooksPage: React.FC = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchBooks = async () => {
    setLoading(true);
    let query = supabase.from('books').select('*');
    if (searchTerm) {
      query = query.ilike('title', `%${searchTerm}%`);
    }
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch books.');
      console.error(error);
    } else {
      setBooks(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBooks();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      const { error } = await supabase.from('books').delete().eq('id', id);
      if (error) {
        toast.error('Failed to delete book.');
      } else {
        toast.success('Book deleted successfully.');
        fetchBooks();
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Books</h1>
        <Link to="/admin/books/new">
          <button className="bg-crimson-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-crimson-800">
            <Plus size={20} />
            Add New Book
          </button>
        </Link>
      </div>

      <div className="relative mb-6">
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-leather-800 focus:outline-none focus:ring-2 focus:ring-crimson-500"
        />
      </div>

      <div className="bg-white dark:bg-leather-800 rounded-lg shadow-md overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64"><Loader className="animate-spin text-crimson-900" size={40} /></div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-leather-700 dark:text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3">Image</th>
                <th scope="col" className="px-6 py-3">Title</th>
                <th scope="col" className="px-6 py-3">Author</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Stock</th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id} className="bg-white dark:bg-leather-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-leather-700">
                  <td className="px-6 py-4"><img src={book.image} alt={book.title} className="w-12 h-16 object-cover rounded" /></td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{book.title}</td>
                  <td className="px-6 py-4">{book.author}</td>
                  <td className="px-6 py-4">${book.price.toFixed(2)}</td>
                  <td className="px-6 py-4">{book.inStock ? 'In Stock' : 'Out of Stock'}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-4">
                      <Link to={`/admin/books/edit/${book.id}`} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></Link>
                      <button onClick={() => handleDelete(book.id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminBooksPage;
