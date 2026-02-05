'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const { itemCount } = useCart();
    const pathname = usePathname();

    // Hide navigation if on admin pages
    if (pathname.startsWith('/admin')) return null;

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Us' },
        { href: '/products', label: 'Products' },
        { href: '/projects', label: 'Projects' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xl uppercase tracking-tighter">M</span>
                        </div>
                        <span className="text-xl font-black text-gray-900 tracking-tight">
                            MY<span className="text-gray-400 font-medium tracking-normal">PROFILE</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-xs font-bold tracking-widest transition-all duration-200 uppercase ${pathname === link.href ? 'text-gray-900 border-b-2 border-gray-900 pb-1' : 'text-gray-400 hover:text-gray-900'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div className="h-4 w-px bg-gray-200"></div>

                        {/* Cart Icon */}
                        <Link href="/cart" className="relative p-2 text-gray-400 hover:text-gray-900 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {itemCount > 0 && (
                                <span className="absolute top-0 right-0 bg-gray-900 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                    {itemCount}
                                </span>
                            )}
                        </Link>

                        <Link href="/admin" className="text-xs font-bold px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/10">
                            Dashboard
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <Link href="/cart" className="relative p-2 text-gray-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {itemCount > 0 && (
                                <span className="absolute top-0 right-0 bg-gray-900 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-gray-400 hover:text-gray-900"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 shadow-2xl animate-fade-in">
                    <div className="px-4 py-8 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block px-6 py-4 rounded-xl text-xl font-black text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all uppercase tracking-tighter"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-6 px-4">
                            <Link
                                href="/admin"
                                className="block w-full py-5 bg-gray-900 text-white text-center font-bold rounded-2xl uppercase tracking-widest text-sm shadow-xl shadow-gray-900/20"
                                onClick={() => setIsOpen(false)}
                            >
                                Admin Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
