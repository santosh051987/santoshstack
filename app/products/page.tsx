'use client';

import { useState, useEffect } from 'react';
import { productApi, categoryApi, Product, Category } from '@/lib/api';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const fallbackProductImages = [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop'
];

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
        <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
            <div className="w-8 h-8 border-4 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#fcfcfc] py-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-24">
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-gray-100 bg-white shadow-sm">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Digital Artifacts</span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                        <div className="max-w-3xl">
                            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter uppercase leading-[0.9]">
                                Premium<br />Solutions
                            </h1>
                            <p className="text-xl text-gray-500 font-medium leading-relaxed">
                                Explore our curated collection of digital assets engineered for the next generation of web performance.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Filters Sidebar */}
                    <aside className="w-full lg:w-72">
                        <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-8">Classification</h3>
                        <div className="space-y-3">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`block w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${!selectedCategory ? 'bg-gray-900 text-white shadow-xl' : 'text-gray-400 hover:text-gray-900 hover:bg-white border border-transparent hover:border-gray-100'}`}
                            >
                                All Collections
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`block w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat.id ? 'bg-gray-900 text-white shadow-xl' : 'text-gray-400 hover:text-gray-900 hover:bg-white border border-transparent hover:border-gray-100'}`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-12">
                        {filteredProducts.map((product, idx) => (
                            <div key={product.id} className="bg-white border border-gray-100 rounded-[3rem] overflow-hidden group hover:shadow-3xl hover:shadow-gray-900/10 transition-all duration-700 h-fit">
                                <div className="aspect-[4/5] bg-gray-50 relative overflow-hidden">
                                    <img
                                        src={product.images || fallbackProductImages[idx % fallbackProductImages.length]}
                                        alt={product.name}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <div className="absolute top-8 right-8 bg-white border border-gray-100 text-gray-900 px-6 py-2 rounded-2xl text-xs font-black shadow-2xl tracking-widest">
                                        ${(product.price / 100).toFixed(2)}
                                    </div>
                                </div>
                                <div className="p-10 flex flex-col items-center text-center">
                                    <h2 className="text-3xl font-black mb-4 group-hover:text-gray-500 transition-colors duration-500 uppercase tracking-tight">{product.name}</h2>
                                    <p className="text-gray-400 font-medium text-sm line-clamp-2 mb-10 leading-relaxed">{product.description}</p>
                                    <div className="flex w-full gap-4 pt-6 border-t border-gray-50">
                                        <Link href={`/products/${product.slug}`} className="flex-1 py-5 rounded-[1.5rem] border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-900 hover:bg-gray-50 transition-all active:scale-95">
                                            Artifact Specs
                                        </Link>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="px-8 py-5 rounded-[1.5rem] bg-gray-900 text-white hover:bg-gray-800 transition-all active:scale-95 shadow-2xl shadow-gray-900/20"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {filteredProducts.length === 0 && (
                    <div className="py-40 text-center border-2 border-dashed border-gray-100 rounded-[4rem]">
                        <p className="text-gray-300 font-black text-2xl uppercase tracking-tighter italic">Selection currently unavailable</p>
                    </div>
                )}
            </div>
        </div>
    );
}
