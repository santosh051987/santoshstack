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
            router.push('/');
        } catch (err) {
            console.error(err);
            alert('Mission critical failure: Could not finalize transaction.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fcfcfc] py-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-24">
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-gray-100 bg-white shadow-sm">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Transaction Suite</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter uppercase leading-[0.9]">
                        Finalize<br />Inquisition
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Customer Info */}
                    <div className="bg-white p-12 md:p-16 rounded-[3rem] border border-gray-100 shadow-sm space-y-12">
                        <section>
                            <h2 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] mb-12">Client Identity</h2>
                            <div className="space-y-8">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Legal Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-gray-900 transition-all placeholder:text-gray-200"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Correspondence Channel</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-gray-900 transition-all placeholder:text-gray-200"
                                        placeholder="email@example.com"
                                    />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Order Summary */}
                    <div className="flex flex-col justify-between">
                        <div className="bg-gray-900 p-12 rounded-[3rem] text-white shadow-2xl shadow-gray-900/20">
                            <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-12">Manifest Summary</h2>
                            <div className="space-y-6 mb-12 max-h-60 overflow-y-auto pr-4 custom-scrollbar">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between items-baseline py-4 border-b border-white/5 last:border-0">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold uppercase tracking-tight">{item.name}</span>
                                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">QTY: {item.quantity}</span>
                                        </div>
                                        <span className="font-black tabular-nums tracking-tighter">${((item.price * item.quantity) / 100).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-white/10 flex justify-between items-baseline mb-12">
                                <span className="text-xs font-black uppercase tracking-[0.2em]">Collective Total</span>
                                <span className="text-5xl font-black tabular-nums tracking-tighter">${(cartTotal / 100).toFixed(2)}</span>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-white text-gray-900 h-20 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-white/5 hover:bg-gray-100 transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                {loading ? 'Orchestrating...' : 'Authorize Transaction'}
                            </button>
                        </div>

                        <div className="mt-12 text-center">
                            <button
                                onClick={() => router.back()}
                                className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                Return to Selection
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
