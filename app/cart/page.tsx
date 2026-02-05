'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>
                <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-400 mb-8 text-center max-w-md">Looks like you haven't added anything to your cart yet. Head over to our products page to find something awesome!</p>
                <Link href="/products" className="btn-primary px-8 h-12 flex items-center">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h1 className="text-4xl font-bold mb-12 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    {cart.map(item => (
                        <div key={item.id} className="glass-dark p-6 rounded-2xl border border-white/10 flex gap-6">
                            <div className="w-24 h-24 bg-gray-800 rounded-xl overflow-hidden shrink-0">
                                {item.images ? (
                                    <img src={item.images} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-700">No Image</div>
                                )}
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold mb-1 uppercase tracking-tight">{item.name}</h3>
                                        <p className="text-sm text-gray-500">Unit Price: ${(item.price / 100).toFixed(2)}</p>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-400 transition-colors">
                                        Remove
                                    </button>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center gap-4 bg-gray-900 px-4 py-2 rounded-xl border border-white/5">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-400 hover:text-white">-</button>
                                        <span className="font-bold w-4 text-center">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-400 hover:text-white">+</button>
                                    </div>
                                    <div className="text-xl font-bold text-primary-400">
                                        ${((item.price * item.quantity) / 100).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="glass-dark p-8 rounded-3xl border border-white/10 sticky top-24">
                        <h2 className="text-2xl font-bold mb-8">Order Summary</h2>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span>${(cartTotal / 100).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Shipping</span>
                                <span className="text-green-400">FREE</span>
                            </div>
                            <div className="border-t border-white/10 pt-4 flex justify-between text-2xl font-bold text-white">
                                <span>Total</span>
                                <span className="text-primary-400">${(cartTotal / 100).toFixed(2)}</span>
                            </div>
                        </div>
                        <Link href="/checkout" className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white h-14 rounded-2xl font-bold flex items-center justify-center shadow-xl shadow-primary-500/20 hover:opacity-90 transition-opacity">
                            Proceed to Checkout
                        </Link>
                        <Link href="/products" className="block text-center mt-6 text-gray-500 hover:text-gray-400 text-sm">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
