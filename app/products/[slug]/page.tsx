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
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
    );

    if (!product) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
            <Link href="/products" className="text-primary-500 hover:underline">Return to Store</Link>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image */}
                <div className="glass-dark rounded-3xl border border-white/10 overflow-hidden aspect-square">
                    {product.images ? (
                        <img src={product.images} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600 bg-gray-800">No Image</div>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-col">
                    <Link href="/products" className="text-primary-500 mb-6 flex items-center gap-2 group">
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Products
                    </Link>

                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent uppercase tracking-tight">
                        {product.name}
                    </h1>

                    <div className="text-3xl font-bold text-white mb-8">
                        ${(product.price / 100).toFixed(2)}
                    </div>

                    <div className="prose prose-invert max-w-none mb-12">
                        <p className="text-gray-400 text-lg leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => addToCart(product)}
                            className="flex-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white h-14 rounded-2xl font-bold text-xl shadow-xl shadow-primary-500/20 hover:opacity-90 transition-opacity"
                        >
                            Add to Cart
                        </button>
                        <div className={`h-14 px-6 flex items-center justify-center rounded-2xl border ${product.stock > 0 ? 'border-green-500/30 text-green-400 bg-green-500/5' : 'border-red-500/30 text-red-400 bg-red-500/5'}`}>
                            {product.stock > 0 ? `${product.stock} in Stock` : 'Out of Stock'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
