'use client';

import { useState, useEffect } from 'react';
import { pageApi, Page } from '@/lib/api';

export default function PagesManagement() {
    const [pages, setPages] = useState<Page[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingPage, setEditingPage] = useState<Page | null>(null);

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            const data = await pageApi.getAll();
            setPages(data);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingPage) return;

        try {
            await pageApi.update(editingPage.id, editingPage);
            setEditingPage(null);
            fetchPages();
            alert('Page updated successfully!');
        } catch (err) {
            alert('Failed to update page');
        }
    };

    if (loading) return <div>Loading pages...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Static Pages</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* List */}
                <div className="lg:col-span-1 space-y-4">
                    {pages.map((p) => (
                        <div
                            key={p.id}
                            onClick={() => setEditingPage(p)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${editingPage?.id === p.id
                                    ? 'bg-primary-500/10 border-primary-500 shadow-lg shadow-primary-500/20'
                                    : 'bg-gray-800 border-gray-700 hover:border-gray-500'
                                }`}
                        >
                            <h3 className="font-bold">{p.title}</h3>
                            <p className="text-xs text-gray-500">/{p.slug}</p>
                        </div>
                    ))}
                </div>

                {/* Editor */}
                <div className="lg:col-span-2">
                    {editingPage ? (
                        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
                            <h2 className="text-xl font-bold mb-6">Edit: {editingPage.title}</h2>
                            <form onSubmit={handleUpdate} className="space-y-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Page Title</label>
                                    <input
                                        type="text"
                                        value={editingPage.title}
                                        onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Content (Markdown/HTML supported)</label>
                                    <textarea
                                        value={editingPage.content}
                                        onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                                        rows={15}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 font-mono text-sm"
                                    />
                                </div>
                                <div className="flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setEditingPage(null)}
                                        className="px-6 py-2 text-gray-400 hover:text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-primary-500 px-8 py-2 rounded-lg font-bold shadow-lg shadow-primary-500/30"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center bg-gray-800/50 rounded-2xl border border-dashed border-gray-700 text-gray-500 italic">
                            Select a page from the left to edit.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
