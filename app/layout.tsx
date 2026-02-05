'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import { CartProvider } from '@/context/CartContext';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <CartProvider>
                    <Navigation />
                    <main className="min-h-screen">
                        {children}
                    </main>
                    <FooterWrapper />
                </CartProvider>
            </body>
        </html>
    );
}

function FooterWrapper() {
    const pathname = usePathname();
    if (pathname.startsWith('/admin')) return null;

    return (
        <footer className="bg-white border-t border-gray-100 py-20 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xl font-black mb-6 text-gray-900 tracking-tight uppercase">
                            MY<span className="text-gray-400 font-medium tracking-normal">PROFILE</span>
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-8">
                            Empowering creators with premium digital tools and minimal design. Building the next generation of digital experiences.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Resources</h4>
                        <ul className="space-y-4 text-sm font-medium text-gray-500">
                            <li><a href="/" className="hover:text-gray-900 transition-colors">Home</a></li>
                            <li><a href="/about" className="hover:text-gray-900 transition-colors">About Us</a></li>
                            <li><a href="/projects" className="hover:text-gray-900 transition-colors">Projects</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Company</h4>
                        <ul className="space-y-4 text-sm font-medium text-gray-500">
                            <li><a href="/contact" className="hover:text-gray-900 transition-colors">Contact</a></li>
                            <li><a href="/admin" className="hover:text-gray-900 transition-colors">Admin Portal</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-50 mt-16 pt-8 text-center">
                    <p className="text-gray-300 text-xs font-bold uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} MYPROFILE. Crafted with Precision.
                    </p>
                </div>
            </div>
        </footer>
    );
}
