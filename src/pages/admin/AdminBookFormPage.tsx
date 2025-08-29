import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import toast from 'react-hot-toast';
import { Book } from '../../types';

const schema = yup.object().shape({
  title: yup.string().required(),
  author: yup.string().required(),
  price: yup.number().positive().required(),
  image: yup.string().url().required(),
  category: yup.string().required(),
  language: yup.string().required(),
  description: yup.string().required(),
  isbn: yup.string().required(),
  pages: yup.number().integer().positive().required(),
  publisher: yup.string().required(),
  publish_year: yup.number().integer().positive().required(),
  in_stock: yup.boolean().required(),
  title_ar: yup.string().optional().nullable(),
  title_fr: yup.string().optional().nullable(),
  author_ar: yup.string().optional().nullable(),
  author_fr: yup.string().optional().nullable(),
  description_ar: yup.string().optional().nullable(),
  description_fr: yup.string().optional().nullable(),
});

const AdminBookFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      in_stock: true,
    }
  });

  useEffect(() => {
    if (isEditing) {
      const fetchBook = async () => {
        const { data, error } = await supabase.from('books').select('*').eq('id', id).single();
        if (error) {
          toast.error('Failed to fetch book details.');
          navigate('/admin/books');
        } else {
          reset(data);
        }
      };
      fetchBook();
    }
  }, [id, isEditing, reset, navigate]);

  const onSubmit = async (data: Partial<Book>) => {
    const toastId = toast.loading(isEditing ? 'Updating book...' : 'Creating book...');
    
    // Ensure optional fields that are empty strings are sent as null
    const dataToSubmit = { ...data };
    (Object.keys(dataToSubmit) as Array<keyof typeof dataToSubmit>).forEach(key => {
        if (dataToSubmit[key] === '') {
            (dataToSubmit as any)[key] = null;
        }
    });

    let response;
    if (isEditing) {
      response = await supabase.from('books').update(dataToSubmit).eq('id', id);
    } else {
      // Remove id for insertion
      const { id: bookId, ...insertData } = dataToSubmit;
      response = await supabase.from('books').insert([insertData]);
    }

    if (response.error) {
      toast.error(response.error.message, { id: toastId });
    } else {
      toast.success(`Book ${isEditing ? 'updated' : 'created'} successfully.`, { id: toastId });
      navigate('/admin/books');
    }
  };

  const InputField = ({ name, label, type = 'text', ...props }: any) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <input type={type} {...register(name)} className={`mt-1 block w-full border rounded-md p-2 bg-white dark:bg-leather-700 dark:border-gray-600 ${errors[name] ? 'border-red-500' : 'border-gray-300'}`} {...props} />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message as string}</p>}
    </div>
  );

  const TextAreaField = ({ name, label }: any) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <textarea {...register(name)} rows={4} className={`mt-1 block w-full border rounded-md p-2 bg-white dark:bg-leather-700 dark:border-gray-600 ${errors[name] ? 'border-red-500' : 'border-gray-300'}`} />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message as string}</p>}
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{isEditing ? 'Edit Book' : 'Add New Book'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-leather-800 p-8 rounded-lg shadow-md space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField name="title" label="Title (English)" />
          <InputField name="author" label="Author (English)" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField name="title_ar" label="Title (Arabic)" />
          <InputField name="author_ar" label="Author (Arabic)" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField name="title_fr" label="Title (French)" />
          <InputField name="author_fr" label="Author (French)" />
        </div>
        <hr className="dark:border-gray-600"/>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputField name="price" label="Price" type="number" step="0.01" />
          <InputField name="isbn" label="ISBN" />
          <InputField name="pages" label="Pages" type="number" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField name="publisher" label="Publisher" />
          <InputField name="publish_year" label="Publish Year" type="number" />
        </div>
        <InputField name="image" label="Image URL" />
        <hr className="dark:border-gray-600"/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            <select {...register('category')} className={`mt-1 block w-full border rounded-md p-2 bg-white dark:bg-leather-700 dark:border-gray-600 ${errors.category ? 'border-red-500' : 'border-gray-300'}`}>
              <option value="literature">Literature</option>
              <option value="history">History</option>
              <option value="science">Science</option>
              <option value="children">Children</option>
              <option value="quran">Quran</option>
              <option value="religious">Religious</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Language</label>
            <select {...register('language')} className={`mt-1 block w-full border rounded-md p-2 bg-white dark:bg-leather-700 dark:border-gray-600 ${errors.language ? 'border-red-500' : 'border-gray-300'}`}>
              <option value="en">English</option>
              <option value="ar">Arabic</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>
        <hr className="dark:border-gray-600"/>
        <TextAreaField name="description" label="Description (English)" />
        <TextAreaField name="description_ar" label="Description (Arabic)" />
        <TextAreaField name="description_fr" label="Description (French)" />
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <input type="checkbox" {...register('in_stock')} className="rounded" />
            In Stock
          </label>
        </div>
        <div className="flex justify-end gap-4">
          <button type="button" onClick={() => navigate('/admin/books')} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="bg-crimson-900 text-white px-6 py-2 rounded-lg hover:bg-crimson-800 disabled:opacity-50">
            {isSubmitting ? 'Saving...' : 'Save Book'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminBookFormPage;
