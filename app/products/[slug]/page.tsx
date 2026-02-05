'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { productApi, Product } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function ProductDetailPage() {
    const { slug } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        if (slug) {
            productApi.getBySlug(slug as string)
                .then(setProduct)
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
            <div className="w-8 h-8 border-4 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!product) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#fcfcfc]">
            <div className="w-40 h-40 bg-gray-50 rounded-full flex items-center justify-center mb-12 border border-gray-100 shadow-sm">
                <svg className="w-16 h-16 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-6 uppercase tracking-tight">Artifact Absent</h1>
            <p className="text-gray-400 mb-12 text-center max-w-sm font-medium leading-relaxed">
                The requested digital asset could not be located within our secure repositories.
            </p>
            <Link href="/products" className="btn-primary h-16 px-12 flex items-center">Return to Storefront</Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#fcfcfc] py-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Navigation Back */}
                <Link href="/products" className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-all mb-12 group">
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Collection
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Image */}
                    <div className="bg-white border border-gray-100 rounded-[3rem] overflow-hidden aspect-square shadow-sm sticky top-32">
                        {product.images ? (
                            <img src={product.images} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-200 uppercase font-black tracking-tighter text-6xl opacity-20 select-none">Preview</div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col py-8">
                        <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-gray-100 bg-white shadow-sm w-fit">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Specifications</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 uppercase tracking-tight leading-none">
                            {product.name}
                        </h1>

                        <div className="text-4xl font-black text-gray-900 tabular-nums tracking-tighter mb-12">
                            ${(product.price / 100).toFixed(2)}
                        </div>

                        <div className="space-y-8 mb-16">
                            <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] border-b border-gray-100 pb-4">Manifest Description</h3>
                            <p className="text-lg text-gray-500 font-medium leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 mt-auto">
                            <button
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-gray-900 text-white h-20 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-gray-900/10 hover:bg-gray-800 transition-all active:scale-[0.98]"
                            >
                                Secure Asset
                            </button>
                            <div className={`h-20 px-8 flex items-center justify-center rounded-[2rem] border text-[10px] font-black uppercase tracking-[0.2em] ${product.stock > 0 ? 'border-green-100 text-green-500 bg-green-50/30' : 'border-red-100 text-red-500 bg-red-50/30'}`}>
                                {product.stock > 0 ? `Inventory: ${product.stock} Units` : 'Acquisition Blocked'}
                            </div>
                        </div>

                        {/* Additional Aesthetics */}
                        <div className="mt-24 grid grid-cols-2 gap-8 border-t border-gray-100 pt-12">
                            <div>
                                <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] mb-4">Delivery</h4>
                                <p className="text-xs text-gray-400 font-medium font-medium">Instant digital distribution or 48hr physical dispatch.</p>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] mb-4">Support</h4>
                                <p className="text-xs text-gray-400 font-medium">Full integration support and lifetime documentation access.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
