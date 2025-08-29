import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: any) => {
    setError(null);
    const { error } = await login(data.email, data.password);
    if (error) {
      setError(error.message);
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-beige-100 dark:bg-leather-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-leather-900 rounded-xl shadow-leather p-8 space-y-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-crimson-900 dark:text-white">Welcome Back</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Sign in to continue to Kotobcom</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && <p className="text-red-500 text-sm text-center bg-red-100 dark:bg-red-900/20 p-3 rounded-md">{error}</p>}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"><Mail className="h-5 w-5 text-gray-400" /></span>
              <input {...register('email')} type="email" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-leather-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-crimson-500" placeholder="you@example.com" />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"><Lock className="h-5 w-5 text-gray-400" /></span>
              <input {...register('password')} type="password" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-leather-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-crimson-500" placeholder="••••••••" />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-crimson-600 hover:underline dark:text-gold-500">Forgot password?</Link>
          </div>
          <div>
            <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-crimson-900 hover:bg-crimson-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crimson-500 disabled:opacity-50">
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-crimson-600 hover:text-crimson-500 dark:text-gold-500">Sign up</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
