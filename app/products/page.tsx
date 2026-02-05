'use client';

import { useState, useEffect } from 'react';
import { productApi, categoryApi, Product, Category } from '@/lib/api';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        Promise.all([
            productApi.getAll(),
            categoryApi.getAll()
        ]).then(([productsData, categoriesData]) => {
            setProducts(productsData);
            setCategories(categoriesData);
        }).finally(() => setLoading(false));
    }, []);

    const filteredProducts = selectedCategory
        ? products.filter(p => p.category_id === selectedCategory)
        : products;

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Our Products
            </h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Filters */}
                <div className="w-full md:w-64 space-y-4">
                    <h3 className="text-xl font-bold mb-4">Categories</h3>
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${!selectedCategory ? 'bg-primary-500 text-white' : 'hover:bg-white/5 text-gray-400'}`}
                    >
                        All Products
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedCategory === cat.id ? 'bg-primary-500 text-white' : 'hover:bg-white/5 text-gray-400'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="glass-dark rounded-2xl border border-white/10 overflow-hidden flex flex-col group hover:border-primary-500/50 transition-all duration-300">
                            <div className="aspect-square bg-gray-800 relative overflow-hidden">
                                {product.images ? (
                                    <img src={product.images} alt={product.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
                                )}
                                <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                    ${(product.price / 100).toFixed(2)}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <h2 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors uppercase tracking-tight">{product.name}</h2>
                                <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">{product.description}</p>
                                <div className="flex gap-2">
                                    <Link href={`/products/${product.slug}`} className="flex-1 text-center py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm font-semibold">
                                        View Details
                                    </Link>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredProducts.length === 0 && (
                        <div className="col-span-full py-20 text-center text-gray-500 italic">
                            No products found in this category.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
