import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-background to-accent-900/20">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/30 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
                        <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent">
                            Welcome to MyProfile
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        Crafting exceptional digital experiences with cutting-edge technologies
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <Link href="/projects" className="btn-primary">
                            View Projects
                        </Link>
                        <Link href="/contact" className="btn-secondary">
                            Get in Touch
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="section-title text-center mb-12">What We Do</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card text-center group">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Web Development</h3>
                            <p className="text-gray-400">Building responsive and performant web applications with modern frameworks</p>
                        </div>

                        <div className="card text-center group">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">UI/UX Design</h3>
                            <p className="text-gray-400">Creating beautiful and intuitive user interfaces that delight users</p>
                        </div>

                        <div className="card text-center group">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Performance</h3>
                            <p className="text-gray-400">Optimizing applications for speed and efficiency across all devices</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="card">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
                        <p className="text-gray-400 mb-8 text-lg">
                            Let's work together to bring your ideas to life
                        </p>
                        <Link href="/contact" className="btn-primary inline-block">
                            Contact Us Today
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
