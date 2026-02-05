'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { authApi } from '@/lib/api';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === '/admin/login') {
            setLoading(false);
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/admin/login');
            return;
        }

        authApi.me()
            .then(setUser)
            .catch(() => {
                localStorage.removeItem('token');
                router.push('/admin/login');
            })
            .finally(() => setLoading(false));
    }, [pathname]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    if (pathname === '/admin/login') return children;

    const navItems = [
        { name: 'Dashboard', href: '/admin' },
        { name: 'Categories', href: '/admin/categories' },
        { name: 'Products', href: '/admin/products' },
        { name: 'Orders', href: '/admin/orders' },
        { name: 'Pages', href: '/admin/pages' },
        { name: 'Projects', href: '/admin/projects' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/admin/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 p-6 flex flex-col">
                <h1 className="text-2xl font-bold mb-8 bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                    Admin Panel
                </h1>
                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block px-4 py-2 rounded-lg transition-all ${pathname === item.href
                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                                    : 'hover:bg-gray-700 text-gray-400'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
                <div className="mt-auto pt-6 border-t border-gray-700">
                    <div className="text-sm text-gray-400 mb-4 px-4">
                        Logged in as: <br />
                        <span className="text-white font-medium">{user?.email}</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
