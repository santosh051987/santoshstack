'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center justify-center p-8">
                <div className="w-40 h-40 bg-gray-50 rounded-full flex items-center justify-center mb-12 border border-gray-100 shadow-sm">
                    <svg className="w-16 h-16 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>
                <h1 className="text-4xl font-black text-gray-900 mb-6 uppercase tracking-tight">Basket Vacant</h1>
                <p className="text-gray-400 mb-12 text-center max-w-sm font-medium leading-relaxed">
                    You haven't initiated any collections yet. Begin your journey through our curated selections.
                </p>
                <Link href="/products" className="btn-primary h-16 px-12 flex items-center">
                    Review Collections
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfcfc] py-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-24">
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-gray-100 bg-white shadow-sm">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Inventory Management</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter uppercase leading-[0.9]">
                        Shopping<br />Basket
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 space-y-8">
                        {cart.map(item => (
                            <div key={item.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 flex flex-col md:flex-row gap-8 hover:shadow-2xl hover:shadow-gray-900/5 transition-all duration-500">
                                <div className="w-full md:w-40 h-40 bg-gray-50 rounded-3xl overflow-hidden shrink-0">
                                    {item.images ? (
                                        <img src={item.images} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-200 uppercase font-black tracking-tighter text-xl opacity-20">Item</div>
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight leading-none">{item.name}</h3>
                                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Unit: ${(item.price / 100).toFixed(2)}</p>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="text-[10px] font-black uppercase tracking-widest text-red-300 hover:text-red-500 transition-colors border-b border-transparent hover:border-red-500 pb-0.5">
                                            Purge
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-50">
                                        <div className="flex items-center gap-6 bg-gray-50 px-6 py-3 rounded-2xl">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-300 hover:text-gray-900 font-bold transition-colors">—</button>
                                            <span className="font-black text-gray-900 text-sm">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-300 hover:text-gray-900 font-bold transition-colors">+</button>
                                        </div>
                                        <div className="text-2xl font-black text-gray-900 tabular-nums tracking-tighter">
                                            ${((item.price * item.quantity) / 100).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-gray-900 p-12 rounded-[3rem] text-white sticky top-32 shadow-2xl shadow-gray-900/20">
                            <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-12">Total Appraisal</h2>
                            <div className="space-y-6 mb-12">
                                <div className="flex justify-between text-gray-400 font-medium">
                                    <span className="text-xs uppercase tracking-widest">Subtotal</span>
                                    <span className="tabular-nums">${(cartTotal / 100).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 font-medium">
                                    <span className="text-xs uppercase tracking-widest">Logistics</span>
                                    <span className="text-white text-[10px] font-black tracking-widest bg-white/10 px-3 py-1 rounded-full">INCLUDED</span>
                                </div>
                                <div className="pt-8 border-t border-white/10 flex justify-between items-baseline">
                                    <span className="text-xs font-black uppercase tracking-[0.2em]">Grand Total</span>
                                    <span className="text-4xl font-black tabular-nums tracking-tighter">${(cartTotal / 100).toFixed(2)}</span>
                                </div>
                            </div>
                            <Link href="/checkout" className="w-full bg-white text-gray-900 h-16 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center hover:bg-gray-100 transition-all active:scale-95 shadow-xl shadow-white/5">
                                Finalize Order
                            </Link>
                            <Link href="/products" className="block text-center mt-8 text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
                                Expand Selection
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
