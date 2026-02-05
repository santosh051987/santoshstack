'use client';

import { useState } from 'react';
import { contactApi } from '@/lib/api';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            await contactApi.submit(formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            setStatus('error');
            setErrorMessage('Failed to send message. Please try again.');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-[#fcfcfc] py-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-24">
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-gray-100 bg-white shadow-sm">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Inquiries</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter uppercase leading-[0.9]">
                        Start a<br />Conversation
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl font-medium leading-relaxed">
                        Whether you have a specific project in mind or just want to explore possibilities, we are ready to listen.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Contact Form */}
                    <div className="bg-white p-12 md:p-16 rounded-[3rem] border border-gray-100 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label htmlFor="name" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
                                        Your Identity
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-gray-900 transition-all placeholder:text-gray-300"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-gray-900 transition-all placeholder:text-gray-300"
                                        placeholder="email@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
                                    Project Details
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={8}
                                    className="w-full bg-gray-50 border-none rounded-3xl px-6 py-6 text-gray-900 font-medium focus:ring-2 focus:ring-gray-900 transition-all placeholder:text-gray-300 resize-none"
                                    placeholder="Briefly describe your objectives..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-6 rounded-2xl bg-gray-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-gray-800 transition-all shadow-2xl shadow-gray-900/10 active:scale-[0.98] disabled:opacity-50"
                            >
                                {status === 'loading' ? 'Transmitting...' : 'Dispatch Inquiry'}
                            </button>

                            {status === 'success' && (
                                <div className="p-6 bg-gray-900 rounded-2xl text-white text-center font-bold uppercase tracking-widest text-[10px] animate-fade-in shadow-xl">
                                    Inquiry received. We will respond within 24 hours.
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="p-6 bg-red-50 text-red-500 rounded-2xl text-center font-bold uppercase tracking-widest text-[10px] animate-fade-in border border-red-100">
                                    {errorMessage}
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Contact Info & Aesthetics */}
                    <div className="flex flex-col justify-between py-8">
                        <div className="space-y-16">
                            <div>
                                <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] mb-6">Direct Channels</h3>
                                <div className="space-y-4">
                                    <p className="text-2xl font-bold text-gray-400 hover:text-gray-900 transition-colors cursor-pointer">hello@myprofile.studio</p>
                                    <p className="text-2xl font-bold text-gray-400 hover:text-gray-900 transition-colors cursor-pointer">+1 415 555 0192</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] mb-6">Physical Studio</h3>
                                <p className="text-xl font-medium text-gray-500 leading-relaxed">
                                    192 Industrial Plaza, Suite 400<br />
                                    Creative District, CA 94103
                                </p>
                            </div>
                        </div>

                        <div className="pt-16 border-t border-gray-100">
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] mb-6">Connect</h3>
                            <div className="flex gap-8">
                                {['LinkedIn', 'Twitter', 'GitHub', 'Behance'].map((platform) => (
                                    <a key={platform} href="#" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all border-b-2 border-transparent hover:border-gray-900 pb-1">
                                        {platform}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
