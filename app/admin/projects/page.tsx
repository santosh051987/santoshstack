'use client';

import { useState, useEffect } from 'react';
import { projectsApi, Project } from '@/lib/api';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const data = await projectsApi.getAll();
            setProjects(data);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProject) return;

        try {
            if (editingProject.id) {
                await projectsApi.update(editingProject.id, editingProject);
            } else {
                await projectsApi.create(editingProject as any);
            }
            setEditingProject(null);
            fetchProjects();
            alert('Project saved!');
        } catch (err) {
            alert('Failed to save project');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;
        try {
            await projectsApi.delete(id);
            fetchProjects();
        } catch (err) {
            alert('Failed to delete');
        }
    };

    if (loading) return <div>Loading projects...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Projects</h1>
                <button
                    onClick={() => setEditingProject({ title: '', description: '', featured: false })}
                    className="bg-primary-500 px-6 py-2 rounded-lg font-bold shadow-lg shadow-primary-500/20"
                >
                    Add New Project
                </button>
            </div>

            {editingProject && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 w-full max-w-2xl">
                        <h2 className="text-xl font-bold mb-6">{editingProject.id ? 'Edit Project' : 'New Project'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                placeholder="Project Title"
                                value={editingProject.title}
                                onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                                className="w-full bg-gray-900 p-3 rounded border border-gray-700"
                                required
                            />
                            <textarea
                                placeholder="Description"
                                value={editingProject.description}
                                onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                                className="w-full bg-gray-900 p-3 rounded border border-gray-700 h-32"
                                required
                            />
                            <input
                                placeholder="Technologies (comma separated)"
                                value={editingProject.technologies || ''}
                                onChange={e => setEditingProject({ ...editingProject, technologies: e.target.value })}
                                className="w-full bg-gray-900 p-3 rounded border border-gray-700"
                            />
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editingProject.featured}
                                        onChange={e => setEditingProject({ ...editingProject, featured: e.target.checked })}
                                    />
                                    <span>Featured</span>
                                </label>
                            </div>
                            <div className="flex justify-end gap-4 mt-8">
                                <button type="button" onClick={() => setEditingProject(null)} className="text-gray-400">Cancel</button>
                                <button type="submit" className="bg-primary-500 px-8 py-2 rounded-lg font-bold">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold">{project.title}</h3>
                            {project.featured && <span className="text-xs bg-primary-500/20 text-primary-400 px-2 py-1 rounded">Featured</span>}
                        </div>
                        <p className="text-gray-400 text-sm flex-1 mb-6">{project.description}</p>
                        <div className="flex gap-4">
                            <button onClick={() => setEditingProject(project)} className="text-blue-400 text-sm font-bold">Edit</button>
                            <button onClick={() => project.id && handleDelete(project.id)} className="text-red-400 text-sm font-bold">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
