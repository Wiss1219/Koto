import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, User, MessageSquare } from 'lucide-react';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  message: yup.string().required('Message is required'),
});

const ContactPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-beige-100 dark:bg-leather-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-crimson-900 dark:text-white mb-4">Contact Us</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">We'd love to hear from you. Our team is ready to answer all your questions.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-leather-800 p-8 rounded-lg shadow-leather">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
                <div className="mt-1 relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input {...register('name')} className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-leather-900 focus:outline-none focus:ring-2 focus:ring-crimson-500" /></div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
                <div className="mt-1 relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input {...register('email')} type="email" className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-leather-900 focus:outline-none focus:ring-2 focus:ring-crimson-500" /></div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <div className="mt-1 relative"><MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} /><textarea {...register('message')} rows={5} className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-leather-900 focus:outline-none focus:ring-2 focus:ring-crimson-500"></textarea></div>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>
              <button type="submit" className="w-full bg-crimson-900 text-white py-3 rounded-md font-semibold hover:bg-crimson-800 transition-colors">Send Message</button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="bg-white dark:bg-leather-800 p-8 rounded-lg shadow-leather">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-crimson-100 dark:bg-gold-500/10 p-3 rounded-full"><MapPin className="text-crimson-900 dark:text-gold-500" size={20} /></div>
                  <div><h3 className="font-semibold text-gray-800 dark:text-white">Our Address</h3><p className="text-gray-600 dark:text-gray-400">123 Library Street, Book City, BC 12345</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-crimson-100 dark:bg-gold-500/10 p-3 rounded-full"><Mail className="text-crimson-900 dark:text-gold-500" size={20} /></div>
                  <div><h3 className="font-semibold text-gray-800 dark:text-white">Email Us</h3><p className="text-gray-600 dark:text-gray-400">info@kotobcom.com</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-crimson-100 dark:bg-gold-500/10 p-3 rounded-full"><Phone className="text-crimson-900 dark:text-gold-500" size={20} /></div>
                  <div><h3 className="font-semibold text-gray-800 dark:text-white">Call Us</h3><p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
