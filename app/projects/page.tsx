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
                setProjects([
                    {
                        id: 1,
                        title: 'E-Commerce Ecosystem',
                        description: 'A comprehensive retail solution with real-time inventory tracking and multi-channel synchronization.',
                        technologies: 'Next.js, TypeScript, PostgreSQL',
                        featured: true,
                        project_url: '#',
                    },
                    {
                        id: 2,
                        title: 'SaaS Analytics Tool',
                        description: 'Enterprise-grade data visualization platform processing millions of events per second with sub-second latency.',
                        technologies: 'React, Node.js, ClickHouse',
                        featured: true,
                        project_url: '#',
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
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Selected Works</span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                        <div className="max-w-3xl">
                            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter uppercase leading-[0.9]">
                                Projects
                            </h1>
                            <p className="text-xl text-gray-500 font-medium leading-relaxed">
                                A showcase of digital products engineered for scalability and designed for impact.
                            </p>
                        </div>

                        {/* Filter */}
                        <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === 'all'
                                    ? 'bg-gray-900 text-white shadow-lg'
                                    : 'text-gray-400 hover:text-gray-900'
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter('featured')}
                                className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === 'featured'
                                    ? 'bg-gray-900 text-white shadow-lg'
                                    : 'text-gray-400 hover:text-gray-900'
                                    }`}
                            >
                                Featured
                            </button>
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40 border-2 border-dashed border-gray-100 rounded-[3rem]">
                        <p className="text-gray-300 font-black text-2xl uppercase tracking-tighter">No projects currently displayed</p>
                    </div>
                )}
            </div>
        </div>
    );
}
