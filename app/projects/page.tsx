'use client';

import { useEffect, useState } from 'react';
import { projectsApi, Project } from '@/lib/api';
import ProjectCard from '@/components/ProjectCard';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'featured'>('all');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await projectsApi.getAll();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
                // Use sample data if API fails
                setProjects([
                    {
                        id: 1,
                        title: 'E-Commerce Platform',
                        description: 'A full-featured e-commerce platform with payment integration, inventory management, and analytics dashboard.',
                        technologies: 'Next.js, TypeScript, Stripe, PostgreSQL',
                        featured: true,
                        project_url: '#',
                        github_url: '#',
                    },
                    {
                        id: 2,
                        title: 'Task Management App',
                        description: 'Collaborative task management application with real-time updates and team collaboration features.',
                        technologies: 'React, Node.js, Socket.io, MongoDB',
                        featured: true,
                        project_url: '#',
                    },
                    {
                        id: 3,
                        title: 'Portfolio Website',
                        description: 'Modern portfolio website with blog, project showcase, and contact form.',
                        technologies: 'Next.js, Tailwind CSS, MDX',
                        featured: false,
                        github_url: '#',
                    },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.featured);

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
                <div className="text-center mb-12 animate-slide-up">
                    <h1 className="section-title mb-6">Our Projects</h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Explore our portfolio of successful projects and see what we can build for you
                    </p>
                </div>

                {/* Filter */}
                <div className="flex justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${filter === 'all'
                                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                                : 'glass hover:bg-white/10'
                            }`}
                    >
                        All Projects
                    </button>
                    <button
                        onClick={() => setFilter('featured')}
                        className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${filter === 'featured'
                                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                                : 'glass hover:bg-white/10'
                            }`}
                    >
                        Featured
                    </button>
                </div>

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className="animate-slide-up"
                                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                            >
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <svg
                            className="w-24 h-24 mx-auto mb-4 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                            />
                        </svg>
                        <p className="text-gray-400 text-lg">No projects found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
