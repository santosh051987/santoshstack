'use client';

import { Project } from '@/lib/api';
import Image from 'next/image';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const technologies = project.technologies
        ? project.technologies.split(',').map((t) => t.trim())
        : [];

    return (
        <div className="card group cursor-pointer">
            {/* Project Image */}
            <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-primary-900/20 to-accent-900/20">
                {project.images ? (
                    <Image
                        src={project.images.split(',')[0]}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <svg
                            className="w-16 h-16 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                )}
                {project.featured && (
                    <div className="absolute top-2 right-2 px-3 py-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full text-xs font-semibold">
                        Featured
                    </div>
                )}
            </div>

            {/* Project Info */}
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                {project.title}
            </h3>
            <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>

            {/* Technologies */}
            {technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 text-xs bg-white/5 rounded-full text-gray-300"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            )}

            {/* Links */}
            <div className="flex gap-3">
                {project.project_url && (
                    <a
                        href={project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300 transition-colors"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                        </svg>
                        Live Demo
                    </a>
                )}
                {project.github_url && (
                    <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-300 transition-colors"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                clipRule="evenodd"
                            />
                        </svg>
                        GitHub
                    </a>
                )}
            </div>
        </div>
    );
}
