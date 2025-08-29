import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock } from 'lucide-react';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
});

const RegisterPage: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: any) => {
    setAuthError(null);
    setAuthSuccess(null);
    const { error } = await registerUser(data.name, data.email, data.password);
    if (error) {
      setAuthError(error.message);
    } else {
      setAuthSuccess("Registration successful! Please check your email to verify your account.");
      // In a real app, you might not navigate immediately, but wait for verification.
      // For now, we'll clear the form and show the message.
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
          <h2 className="text-3xl font-bold text-crimson-900 dark:text-white">Create an Account</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Join Kotobcom to start your literary journey.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {authError && <p className="text-red-500 text-sm text-center bg-red-100 dark:bg-red-900/20 p-3 rounded-md">{authError}</p>}
          {authSuccess && <p className="text-green-600 text-sm text-center bg-green-100 dark:bg-green-900/20 p-3 rounded-md">{authSuccess}</p>}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <div className="mt-1 relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input {...register('name')} type="text" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-leather-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-crimson-500" placeholder="John Doe" /></div>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            <div className="mt-1 relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input {...register('email')} type="email" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-leather-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-crimson-500" placeholder="you@example.com" /></div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <div className="mt-1 relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input {...register('password')} type="password" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-leather-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-crimson-500" placeholder="••••••••" /></div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
            <div className="mt-1 relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input {...register('confirmPassword')} type="password" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-leather-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-crimson-500" placeholder="••••••••" /></div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>
          <div>
            <button type="submit" disabled={isSubmitting || !!authSuccess} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-crimson-900 hover:bg-crimson-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crimson-500 disabled:opacity-50">
              {isSubmitting ? 'Creating account...' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-crimson-600 hover:text-crimson-500 dark:text-gold-500">Sign in</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
