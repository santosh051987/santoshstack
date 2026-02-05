import Link from 'next/link';
import HomeSlider from '@/components/HomeSlider';

export default function Home() {
    return (
        <div className="min-h-screen bg-[#fcfcfc]">
            {/* Hero Section with Slider */}
            <HomeSlider />

            {/* Features Section */}
            <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-black text-gray-900 tracking-tight uppercase mb-4">Core Principles</h2>
                            <p className="text-gray-400 font-medium text-lg">Our systematic approach to building modern digital solutions ensuring speed, reliability, and aesthetics.</p>
                        </div>
                        <Link href="/about" className="text-xs font-black text-gray-900 border-b-2 border-gray-900 pb-1 hover:text-gray-500 hover:border-gray-200 transition-all uppercase tracking-widest">
                            Studio Philosophy
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="group">
                            <div className="w-16 h-16 mb-8 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-300">
                                <svg className="w-8 h-8 text-gray-900 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-gray-900">Engineering</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">Robust backend systems paired with pixel-perfect frontend implementations for seamless user experiences.</p>
                        </div>

                        <div className="group">
                            <div className="w-16 h-16 mb-8 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-300">
                                <svg className="w-8 h-8 text-gray-900 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-gray-900">Design</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">Minimalist design systems focused on clarity, accessibility, and high conversion through intentional UX.</p>
                        </div>

                        <div className="group">
                            <div className="w-16 h-16 mb-8 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-300">
                                <svg className="w-8 h-8 text-gray-900 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-gray-900">Velocity</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">Rapid deployment cycles without compromising on quality or security. We build for the long term.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto bg-gray-900 rounded-[3rem] p-12 md:p-24 text-center overflow-hidden relative shadow-2xl shadow-gray-900/20">
                    {/* Aesthetic background image */}
                    <div className="absolute inset-0 z-0 opacity-20">
                        <img
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
                            alt="Abstraction"
                            className="w-full h-full object-cover blur-sm"
                        />
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black mb-8 text-white tracking-tighter uppercase leading-none">
                            Let's build something<br />legacy worthy.
                        </h2>
                        <p className="text-gray-400 mb-12 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                            Currently accepting new project inquiries for Q3 2026. Reach out today for a strategic consultation.
                        </p>
                        <Link href="/contact" className="inline-flex h-16 px-12 bg-white text-gray-900 items-center justify-center rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-100 transition-all shadow-xl shadow-white/5 active:scale-95">
                            Dispatch Inquiry
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
