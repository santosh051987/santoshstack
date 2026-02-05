'use client';

import { useState, useEffect } from 'react';
import { orderApi, Order } from '@/lib/api';

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        orderApi.getAll()
            .then(setOrders)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading orders...</div>;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'text-yellow-400';
            case 'processing': return 'text-blue-400';
            case 'delivered': return 'text-green-400';
            case 'cancelled': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Order Management</h1>

            <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-700/50">
                        <tr>
                            <th className="px-6 py-4 font-bold">Order ID</th>
                            <th className="px-6 py-4 font-bold">Customer</th>
                            <th className="px-6 py-4 font-bold">Date</th>
                            <th className="px-6 py-4 font-bold">Total</th>
                            <th className="px-6 py-4 font-bold">Status</th>
                            <th className="px-6 py-4 font-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-700/30 transition-colors">
                                <td className="px-6 py-4">#{order.id}</td>
                                <td className="px-6 py-4">
                                    <div className="font-medium">{order.customer_name}</div>
                                    <div className="text-xs text-gray-500">{order.customer_email}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-400">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 font-bold text-primary-400">
                                    ${(order.total_amount / 100).toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold bg-gray-900 border border-current ${getStatusColor(order.status)}`}>
                                        {order.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-primary-500 hover:text-primary-400 text-sm">View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && (
                    <div className="p-12 text-center text-gray-500 italic">No orders found.</div>
                )}
            </div>
        </div>
    );
}
