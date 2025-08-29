import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Loader, Package, Eye, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import { Order, OrderItem } from '../../types';
import { AnimatePresence } from 'framer-motion';

const OrdersPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data as Order[]);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  const fetchOrderItems = async (orderId: string) => {
    setLoadingItems(true);
    const { data, error } = await supabase
      .from('order_items')
      .select(`
        *,
        books:book_id (
          id,
          title,
          author,
          image
        )
      `)
      .eq('order_id', orderId);

    if (error) {
      console.error('Error fetching order items:', error);
    } else {
      setOrderItems(data as any);
    }
    setLoadingItems(false);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    fetchOrderItems(order.id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'shipped': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center items-center h-64"
      >
        <Loader className="animate-spin text-crimson-900 dark:text-gold-500" size={40} />
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('account.orders')}</h2>
        
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-50 dark:bg-leather-700/30 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Order #{order.id.slice(0, 8)}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Placed on {formatDate(order.created_at)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-crimson-900 dark:text-gold-500">
                      ${order.total.toFixed(2)}
                    </p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Shipping to: {order.shipping_address.city}, {order.shipping_address.country}
                  </p>
                  <button
                    onClick={() => handleViewOrder(order)}
                    className="flex items-center gap-2 text-crimson-600 hover:text-crimson-800 dark:text-gold-500 dark:hover:text-gold-400 font-medium"
                  >
                    <Eye size={16} />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-leather-700/30 rounded-lg">
            <ShoppingBag size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No orders yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">You haven't placed any orders with us yet. Let's change that!</p>
            <Link to="/books">
              <button className="bg-crimson-900 text-white px-6 py-2 rounded-lg hover:bg-crimson-800 transition-colors">
                Start Shopping
              </button>
            </Link>
          </div>
        )}
      </motion.div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-leather-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Order #{selectedOrder.id.slice(0, 8)}
                  </h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Shipping Address</h3>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-leather-700 p-4 rounded-lg">
                    <p className="font-medium">{selectedOrder.shipping_address.fullName}</p>
                    <p>{selectedOrder.shipping_address.address}</p>
                    <p>{selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.zipCode}</p>
                    <p>{selectedOrder.shipping_address.country}</p>
                    <p>Phone: {selectedOrder.shipping_address.phone}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Items</h3>
                  {loadingItems ? (
                    <div className="flex justify-center py-8">
                      <Loader className="animate-spin text-crimson-900 dark:text-gold-500" size={32} />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orderItems.map(item => (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-leather-700 rounded-lg">
                          <img 
                            src={(item as any).books?.image} 
                            alt={(item as any).books?.title} 
                            className="w-16 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {(item as any).books?.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              by {(item as any).books?.author}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Quantity: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900 dark:text-white">
                              ${(item.quantity * item.price).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-crimson-900 dark:text-gold-500">
                        ${selectedOrder.total.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(selectedOrder.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'shipped': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('account.orders')}</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin text-crimson-900 dark:text-gold-500" size={40} />
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-50 dark:bg-leather-700/30 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Order #{order.id.slice(0, 8)}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Placed on {formatDate(order.created_at)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-crimson-900 dark:text-gold-500">
                      ${order.total.toFixed(2)}
                    </p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Shipping to: {order.shipping_address.city}, {order.shipping_address.country}
                  </p>
                  <button
                    onClick={() => handleViewOrder(order)}
                    className="flex items-center gap-2 text-crimson-600 hover:text-crimson-800 dark:text-gold-500 dark:hover:text-gold-400 font-medium"
                  >
                    <Eye size={16} />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-leather-700/30 rounded-lg">
            <ShoppingBag size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No orders yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">You haven't placed any orders with us yet. Let's change that!</p>
            <Link to="/books">
              <button className="bg-crimson-900 text-white px-6 py-2 rounded-lg hover:bg-crimson-800 transition-colors">
                Start Shopping
              </button>
            </Link>
          </div>
        )}
      </motion.div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-leather-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Order #{selectedOrder.id.slice(0, 8)}
                  </h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Shipping Address</h3>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-leather-700 p-4 rounded-lg">
                    <p className="font-medium">{selectedOrder.shipping_address.fullName}</p>
                    <p>{selectedOrder.shipping_address.address}</p>
                    <p>{selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.zipCode}</p>
                    <p>{selectedOrder.shipping_address.country}</p>
                    <p>Phone: {selectedOrder.shipping_address.phone}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Items</h3>
                  {loadingItems ? (
                    <div className="flex justify-center py-8">
                      <Loader className="animate-spin text-crimson-900 dark:text-gold-500" size={32} />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orderItems.map(item => (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-leather-700 rounded-lg">
                          <img 
                            src={(item as any).books?.image} 
                            alt={(item as any).books?.title} 
                            className="w-16 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {(item as any).books?.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              by {(item as any).books?.author}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Quantity: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900 dark:text-white">
                              ${(item.quantity * item.price).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-crimson-900 dark:text-gold-500">
                        ${selectedOrder.total.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(selectedOrder.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OrdersPage;
            <button className="bg-crimson-900 text-white px-6 py-2 rounded-lg hover:bg-crimson-800 transition-colors">
              Start Shopping
            </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default OrdersPage;
