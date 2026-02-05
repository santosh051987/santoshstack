'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { orderApi } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    if (cart.length === 0) {
        if (typeof window !== 'undefined') router.push('/products');
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                customer_name: formData.name,
                customer_email: formData.email,
                total_amount: cartTotal,
                status: 'pending',
                items: cart.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    price: item.price
                }))
            };

            await orderApi.create(orderData);
            clearCart();
            alert('Order placed successfully! Thank you for your purchase.');
            router.push('/');
        } catch (err) {
            console.error(err);
            alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h1 className="text-4xl font-bold mb-12 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent text-center">Checkout</h1>

            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Customer Info */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6">Your Information</h2>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="glass-dark p-8 rounded-3xl border border-white/10 flex flex-col">
                        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                        <div className="flex-1 space-y-4 mb-8 overflow-y-auto max-h-60 pr-2">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-gray-400">{item.name} x {item.quantity}</span>
                                    <span className="font-medium font-mono">${((item.price * item.quantity) / 100).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-white/10 pt-4 flex justify-between text-2xl font-bold text-white mb-8">
                            <span>Total</span>
                            <span className="text-primary-400">${(cartTotal / 100).toFixed(2)}</span>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary-500/20 hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Place Order'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
