'use client';

import { useState, useEffect } from 'react';
import { orderApi, Order } from '@/lib/api';

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const data = await orderApi.getAll();
            setOrders(data);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = async (id: number) => {
        try {
            const order = await orderApi.getById(id);
            setSelectedOrder(order);
        } catch (err) {
            alert('Failed to fetch order details');
        }
    };

    const handleStatusChange = async (newStatus: string) => {
        if (!selectedOrder) return;
        setUpdatingStatus(true);
        try {
            await orderApi.updateStatus(selectedOrder.id, newStatus);
            const updatedOrder = await orderApi.getById(selectedOrder.id);
            setSelectedOrder(updatedOrder);
            fetchOrders(); // Refresh list
        } catch (err) {
            alert('Failed to update status');
        } finally {
            setUpdatingStatus(false);
        }
    };

    if (loading && orders.length === 0) return <div>Loading orders...</div>;

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
                                    <button
                                        onClick={() => handleViewDetails(order.id)}
                                        className="text-primary-500 hover:text-primary-400 text-sm font-bold"
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && (
                    <div className="p-12 text-center text-gray-500 italic">No orders found.</div>
                )}
            </div>

            {/* Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-1">Order Details #{selectedOrder.id}</h2>
                                <p className="text-gray-400 text-sm">{new Date(selectedOrder.created_at).toLocaleString()}</p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                                <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Customer Information</h3>
                                <p className="font-bold text-lg">{selectedOrder.customer_name}</p>
                                <p className="text-gray-400">{selectedOrder.customer_email}</p>
                            </div>
                            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                                <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Order Status</h3>
                                <div className="flex items-center gap-4">
                                    <select
                                        value={selectedOrder.status}
                                        onChange={(e) => handleStatusChange(e.target.value)}
                                        disabled={updatingStatus}
                                        className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary-500 disabled:opacity-50"
                                    >
                                        <option value="pending">PENDING</option>
                                        <option value="processing">PROCESSING</option>
                                        <option value="shipped">SHIPPED</option>
                                        <option value="delivered">DELIVERED</option>
                                        <option value="cancelled">CANCELLED</option>
                                    </select>
                                    {updatingStatus && <div className="animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full"></div>}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900/50 rounded-xl border border-gray-700 overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-800">
                                    <tr>
                                        <th className="px-6 py-3 font-bold">Product ID</th>
                                        <th className="px-6 py-3 font-bold text-center">Quantity</th>
                                        <th className="px-6 py-3 font-right text-right">Price</th>
                                        <th className="px-6 py-3 font-right text-right">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {selectedOrder.items.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4">Product #{item.product_id}</td>
                                            <td className="px-6 py-4 text-center">{item.quantity}</td>
                                            <td className="px-6 py-4 text-right">${(item.price / 100).toFixed(2)}</td>
                                            <td className="px-6 py-4 text-right font-bold">${((item.price * item.quantity) / 100).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-gray-800/50">
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4 text-right font-bold uppercase text-gray-400">Total Amount</td>
                                        <td className="px-6 py-4 text-right font-bold text-xl text-primary-400">
                                            ${(selectedOrder.total_amount / 100).toFixed(2)}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
