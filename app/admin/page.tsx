'use client';

import { useState, useEffect } from 'react';
import { dashboardApi } from '@/lib/api';

export default function DashboardPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dashboardApi.getStats()
            .then(setStats)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading statistics...</div>;

    const cards = [
        { name: 'Total Revenue', value: `$${(stats?.revenue / 100).toFixed(2)}`, color: 'text-green-400' },
        { name: 'Total Orders', value: stats?.orders, color: 'text-blue-400' },
        { name: 'Products', value: stats?.products, color: 'text-purple-400' },
        { name: 'Categories', value: stats?.categories, color: 'text-yellow-400' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => (
                    <div key={card.name} className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                        <p className="text-gray-400 text-sm mb-2">{card.name}</p>
                        <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                    <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                    <p className="text-gray-400 italic">Recent orders and products updates will appear here.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                    <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <a href="/admin/products" className="bg-gray-700 p-4 rounded-xl text-center hover:bg-gray-600 transition-colors">
                            Add Product
                        </a>
                        <a href="/admin/orders" className="bg-gray-700 p-4 rounded-xl text-center hover:bg-gray-600 transition-colors">
                            View Orders
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
