'use client';

import { useEffect, useState } from 'react';
import { aboutUsApi, AboutUs } from '@/lib/api';

export default function AboutPage() {
    const [about, setAbout] = useState<AboutUs | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const data = await aboutUsApi.get();
                setAbout(data);
            } catch (error) {
                console.error('Error fetching about data:', error);
                setAbout({
                    title: 'Strategic Digital Studio',
                    description: 'We are a collective of designers and engineers driven by the pursuit of digital excellence. Since 2020, we have been crafting products that redefine industry standards.',
                    mission: 'To engineer the future of digital interaction through minimal design and maximum performance.',
                    vision: 'To become the global benchmark for professional digital craftsmanship.',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchAbout();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
                <div className="w-8 h-8 border-4 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfcfc] py-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-24">
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-gray-100 bg-white shadow-sm">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Our Story</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter uppercase leading-[0.9]">
                        {about?.title || 'About Us'}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-500 max-w-4xl font-medium leading-relaxed">
                        {about?.description}
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
                    <div className="bg-white p-12 rounded-[2rem] border border-gray-100 shadow-sm">
                        <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Our Mission</h2>
                        <p className="text-2xl font-bold text-gray-900 leading-tight">
                            {about?.mission}
                        </p>
                    </div>

                    <div className="bg-gray-900 p-12 rounded-[2rem] text-white">
                        <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Our Vision</h2>
                        <p className="text-2xl font-bold leading-tight">
                            {about?.vision}
                        </p>
                    </div>
                </div>

                {/* Values */}
                <div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight uppercase mb-16">Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Precision',
                                description: 'Every pixel and line of code is intentional. We don\'t settle for "good enough".',
                            },
                            {
                                title: 'Integrity',
                                description: 'Transparent communication and honest delivery are the foundation of our studio.',
                            },
                            {
                                title: 'Innovation',
                                description: 'Constantly pushing the boundaries of what\'s possible with modern technology.',
                            },
                        ].map((value, idx) => (
                            <div key={idx} className="border-t border-gray-100 pt-8">
                                <span className="text-xs font-black text-gray-300 mb-4 block uppercase tracking-widest">0{idx + 1}</span>
                                <h3 className="text-xl font-black text-gray-900 mb-4 uppercase">{value.title}</h3>
                                <p className="text-gray-500 font-medium leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
