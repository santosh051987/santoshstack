'use client';

import { useState, useEffect } from 'react';
import { productApi, categoryApi, Category, Product } from '@/lib/api';

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState<Partial<Product>>({
        name: '', slug: '', description: '', price: 0, stock: 0, category_id: 0, is_active: true
    });

    useEffect(() => {
        Promise.all([productApi.getAll(), categoryApi.getAll()])
            .then(([p, c]) => {
                setProducts(p);
                setCategories(c);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await productApi.create(form);
            setForm({ name: '', slug: '', description: '', price: 0, stock: 0, category_id: 0, is_active: true });
            productApi.getAll().then(setProducts);
            alert('Product created!');
        } catch (err) {
            alert('Failed to create product');
        }
    };

    if (loading) return <div>Loading products...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Products</h1>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Form */}
                <div className="xl:col-span-1 bg-gray-800 p-6 rounded-2xl border border-gray-700 h-fit">
                    <h2 className="text-xl font-bold mb-6">Add Product</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            placeholder="Name"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            className="w-full bg-gray-900 p-2 rounded border border-gray-700"
                            required
                        />
                        <input
                            placeholder="Slug"
                            value={form.slug}
                            onChange={e => setForm({ ...form, slug: e.target.value })}
                            className="w-full bg-gray-900 p-2 rounded border border-gray-700"
                            required
                        />
                        <textarea
                            placeholder="Description"
                            value={form.description}
                            onChange={e => setForm({ ...form, description: e.target.value })}
                            className="w-full bg-gray-900 p-2 rounded border border-gray-700"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="number"
                                placeholder="Price (cents)"
                                value={form.price}
                                onChange={e => setForm({ ...form, price: parseInt(e.target.value) })}
                                className="w-full bg-gray-900 p-2 rounded border border-gray-700"
                            />
                            <input
                                type="number"
                                placeholder="Stock"
                                value={form.stock}
                                onChange={e => setForm({ ...form, stock: parseInt(e.target.value) })}
                                className="w-full bg-gray-900 p-2 rounded border border-gray-700"
                            />
                        </div>
                        <select
                            value={form.category_id}
                            onChange={e => setForm({ ...form, category_id: parseInt(e.target.value) })}
                            className="w-full bg-gray-900 p-2 rounded border border-gray-700"
                        >
                            <option value="0">Select Category</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        <button type="submit" className="w-full bg-primary-500 py-2 rounded-lg font-bold">
                            Create Product
                        </button>
                    </form>
                </div>

                {/* List */}
                <div className="xl:col-span-2 bg-gray-800 p-6 rounded-2xl border border-gray-700">
                    <h2 className="text-xl font-bold mb-6">Product Inventory</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="py-2">Name</th>
                                    <th className="py-2">Price</th>
                                    <th className="py-2">Stock</th>
                                    <th className="py-2">Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p.id} className="border-b border-gray-700/50">
                                        <td className="py-2">{p.name}</td>
                                        <td className="py-2">${(p.price / 100).toFixed(2)}</td>
                                        <td className="py-2">{p.stock}</td>
                                        <td className="py-2 text-gray-500">ID: {p.category_id}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
