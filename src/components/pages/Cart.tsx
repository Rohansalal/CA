import React from 'react';
import { useCart, CartItem } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Cart() {
    const { cart, removeFromCart, cartTotal } = useCart();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleCheckout = (item: CartItem) => {
        navigate(isAuthenticated ? '/dashboard' : '/login', {
            state: {
                returnTo: '/dashboard',
                selectedServiceSlug: item.serviceSlug,
                selectedPlan: {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    serviceSlug: item.serviceSlug,
                    serviceId: item.serviceId
                }
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold font-display text-gray-900 mb-8 flex items-center gap-3">
                    <ShoppingCart className="w-8 h-8 text-primary" />
                    Your Cart
                </h1>

                {cart.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingCart className="w-10 h-10 text-primary opacity-50" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added any services yet. Explore our professional services to get started.</p>
                        <button
                            onClick={() => navigate('/services')}
                            className="px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                        >
                            Explore Services <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="divide-y divide-gray-100">
                            {cart.map((item, index) => (
                                <div key={index} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">
                                                {item.serviceSlug.replace(/-/g, ' ')}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                                    </div>
                                    <div className="flex items-center justify-between w-full sm:w-auto gap-6 mt-4 sm:mt-0">
                                        <div className="text-right">
                                            <span className="block text-sm text-gray-500 mb-0.5">Price</span>
                                            <span className="text-2xl font-bold text-primary">₹{item.price.toLocaleString()}</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => handleCheckout(item)}
                                                className="px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors text-sm w-full sm:w-auto text-center"
                                            >
                                                Proceed
                                            </button>
                                            <button
                                                onClick={() => removeFromCart(index)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-1 text-sm w-full sm:w-auto"
                                            >
                                                <Trash2 className="w-4 h-4" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gray-50 p-6 sm:p-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div>
                                <p className="text-gray-500 mb-1 font-medium">Cart Total</p>
                                <p className="text-3xl font-bold text-primary">₹{cartTotal.toLocaleString()}</p>
                                <p className="text-xs text-gray-400 mt-1">Inclusive of all taxes</p>
                            </div>
                            <button
                                className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-lg shadow-lg shadow-primary/20"
                                onClick={() => {
                                    if (cart.length > 0) handleCheckout(cart[0]);
                                }}
                            >
                                Checkout First Item <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
