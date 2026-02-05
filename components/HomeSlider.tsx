'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
    {
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
        title: 'Design. Develop.',
        subtitle: 'Deliver with precision.',
        description: 'We build high-performance digital products that combine minimal aesthetics with robust engineering.',
    },
    {
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
        title: 'Secure. Scalable.',
        subtitle: 'Engineered for growth.',
        description: 'Our systematic approach ensures your digital infrastructure is ready for the future.',
    },
    {
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop',
        title: 'Minimal. Impactful.',
        subtitle: 'Aesthetic excellence.',
        description: 'Zero fluff, maximum impact. We focus on what truly matters for your user experience.',
    }
];

export default function HomeSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-[90vh] w-full overflow-hidden bg-gray-900">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover opacity-60 scale-105"
                            priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#fcfcfc] via-transparent to-transparent z-10"></div>
                        <div className="absolute inset-0 bg-black/20 z-0"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center text-center">
                        <div className={`transition-all duration-1000 delay-300 transform ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}>
                            <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-sm">
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Studio Collection 2026</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">
                                {slide.title}<br />
                                <span className="text-white/40">{slide.subtitle}</span>
                            </h1>
                            <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                                {slide.description}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                <Link href="/projects" className="h-16 px-12 bg-white text-gray-900 flex items-center justify-center rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-white/10 hover:bg-gray-100 transition-all active:scale-95">
                                    Full Portfolio
                                </Link>
                                <Link href="/contact" className="h-16 px-12 border border-white/30 text-white flex items-center justify-center rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all active:scale-95">
                                    Initiate Project
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Dots */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-4">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`group relative h-1 transition-all duration-500 rounded-full ${index === current ? 'w-12 bg-white' : 'w-6 bg-white/20 hover:bg-white/40'
                            }`}
                    >
                        <span className="sr-only">Slide {index + 1}</span>
                    </button>
                ))}
            </div>
        </section>
    );
}
