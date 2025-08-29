import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CreditCard, Lock } from 'lucide-react';

const shippingSchema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
  zipCode: yup.string().required('ZIP code is required'),
  email: yup.string().email().required('Email is required'),
  phone: yup.string().required('Phone number is required'),
});

const CheckoutPage: React.FC = () => {
  const { state, clearCart } = useCart();
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(shippingSchema)
  });

  const onSubmit = (data: any) => {
    console.log('Order placed:', { shipping: data, items: state.items, total: state.total });
    alert('Order placed successfully! (This is a mock action)');
    clearCart();
    // Redirect to a confirmation page in a real app
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-crimson-900 mb-8 text-center">Checkout</h1>
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Shipping and Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 bg-white rounded-lg shadow-lg p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Shipping Details */}
              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input {...register('fullName')} className={`mt-1 block w-full border rounded-md p-2 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input {...register('address')} className={`mt-1 block w-full border rounded-md p-2 ${errors.address ? 'border-red-500' : 'border-gray-300'}`} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input {...register('city')} className={`mt-1 block w-full border rounded-md p-2 ${errors.city ? 'border-red-500' : 'border-gray-300'}`} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <input {...register('country')} className={`mt-1 block w-full border rounded-md p-2 ${errors.country ? 'border-red-500' : 'border-gray-300'}`} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                    <input {...register('zipCode')} className={`mt-1 block w-full border rounded-md p-2 ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input {...register('phone')} type="tel" className={`mt-1 block w-full border rounded-md p-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} />
                  </div>
                   <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input {...register('email')} type="email" className={`mt-1 block w-full border rounded-md p-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
                  </div>
                </div>
              </section>

              {/* Payment Details (Mock) */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Details</h2>
                <div className="bg-gray-100 p-6 rounded-lg">
                  <p className="text-gray-600 text-center">
                    Stripe integration would be here. For now, click "Place Order" to simulate a successful payment.
                  </p>
                </div>
              </section>

              <div className="mt-10">
                <button type="submit" className="w-full bg-crimson-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-crimson-800 transition-colors shadow-lg flex items-center justify-center gap-2">
                  <Lock size={20} />
                  Place Order
                </button>
              </div>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-28">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {state.items.map(item => (
                  <div key={item.book.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <img src={item.book.image} alt={item.book.title} className="w-16 h-20 object-cover rounded" />
                      <div>
                        <p className="font-medium text-gray-800 line-clamp-1">{item.book.title}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold">${(item.book.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 mt-6 pt-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('cart.subtotal')}</span>
                  <span className="font-medium">${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-crimson-900">
                  <span>{t('cart.total')}</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
