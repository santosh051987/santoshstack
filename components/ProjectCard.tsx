'use client';

import { Project } from '@/lib/api';
import Image from 'next/image';

interface ProjectCardProps {
    project: Project;
}

const fallbackImages = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop'
];

export default function ProjectCard({ project }: ProjectCardProps) {
    const technologies = project.technologies
        ? project.technologies.split(',').map((t) => t.trim())
        : [];

    const projectImage = project.images
        ? project.images.split(',')[0]
        : fallbackImages[(project.id || 0) % fallbackImages.length];

    return (
        <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-gray-900/5 transition-all duration-500 group">
            {/* Project Image */}
            <div className="relative h-72 overflow-hidden bg-gray-50">
                <Image
                    src={projectImage}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {project.featured && (
                    <div className="absolute top-6 left-6 px-4 py-1.5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-2xl z-10">
                        Featured
                    </div>
                )}
            </div>

            {/* Project Info */}
            <div className="p-10">
                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight group-hover:text-gray-500 transition-colors duration-300">
                    {project.title}
                </h3>
                <p className="text-gray-500 font-medium mb-8 line-clamp-2 leading-relaxed text-sm">
                    {project.description}
                </p>

                {/* Technologies */}
                {technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {technologies.map((tech, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 text-[10px] font-bold bg-gray-50 text-gray-400 uppercase tracking-widest rounded-md border border-gray-100"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                {/* Links */}
                <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                    {project.project_url && (
                        <a
                            href={project.project_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-black uppercase tracking-widest text-gray-900 hover:text-gray-400 transition-all flex items-center gap-3 group/link"
                        >
                            Examine Project
                            <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    )}
                    {project.github_url && (
                        <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-gray-900 transition-colors"
                        >
                            Repository
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
