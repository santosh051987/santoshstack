'use client';

import { useState, useEffect } from 'react';
import { categoryApi, Category } from '@/lib/api';

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [parentId, setParentId] = useState<string>('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await categoryApi.getAll();
            setCategories(data);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await categoryApi.create({
                name,
                slug,
                parent_id: parentId ? parseInt(parentId) : undefined,
            });
            setName('');
            setSlug('');
            setParentId('');
            fetchCategories();
            alert('Category created!');
        } catch (err) {
            alert('Failed to create category');
        }
    };

    if (loading) return <div>Loading categories...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Categories</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Create Form */}
                <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                    <h2 className="text-xl font-bold mb-6">Add New Category</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Slug</label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Parent Category</label>
                            <select
                                value={parentId}
                                onChange={(e) => setParentId(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2"
                            >
                                <option value="">Root</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-primary-500 py-2 rounded-lg font-bold">
                            Create Category
                        </button>
                    </form>
                </div>

                {/* List */}
                <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                    <h2 className="text-xl font-bold mb-6">Existing Categories</h2>
                    <div className="space-y-2">
                        {categories.map((cat) => (
                            <div key={cat.id} className="p-3 bg-gray-900 rounded-lg border border-gray-700 flex justify-between items-center">
                                <div>
                                    <span className="font-medium">{cat.name}</span>
                                    <span className="text-gray-500 text-sm ml-2">/{cat.slug}</span>
                                </div>
                                {cat.parent_id && (
                                    <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-400">
                                        Child of ID: {cat.parent_id}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
