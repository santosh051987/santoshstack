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
                // Use default data if API fails
                setAbout({
                    title: 'About Us',
                    description: 'We are a team of passionate developers and designers dedicated to creating exceptional digital experiences.',
                    mission: 'Our mission is to deliver innovative solutions that exceed expectations.',
                    vision: 'To be the leading provider of cutting-edge web solutions.',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchAbout();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 animate-slide-up">
                    <h1 className="section-title mb-6">{about?.title || 'About Us'}</h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        {about?.description}
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="card animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                        <p className="text-gray-400">
                            {about?.mission || 'To deliver innovative solutions that exceed expectations and drive success for our clients.'}
                        </p>
                    </div>

                    <div className="card animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                        <p className="text-gray-400">
                            {about?.vision || 'To be the leading provider of cutting-edge web solutions that transform businesses.'}
                        </p>
                    </div>
                </div>

                {/* Values */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                ),
                                title: 'Quality',
                                description: 'We never compromise on quality and always strive for excellence',
                            },
                            {
                                icon: (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                ),
                                title: 'Collaboration',
                                description: 'Working together to achieve extraordinary results',
                            },
                            {
                                icon: (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                ),
                                title: 'Innovation',
                                description: 'Constantly pushing boundaries and exploring new possibilities',
                            },
                        ].map((value, index) => (
                            <div key={index} className="card text-center group">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {value.icon}
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                <p className="text-gray-400">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <div className="card inline-block">
                        <h2 className="text-2xl font-bold mb-4">Want to Learn More?</h2>
                        <p className="text-gray-400 mb-6">Get in touch with us to discuss your project</p>
                        <a href="/contact" className="btn-primary">
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
