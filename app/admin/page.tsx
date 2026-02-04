'use client';

import { useState, useEffect } from 'react';
import { aboutApi, projectsApi, contactApi, AboutUs, Project, ContactSubmission } from '@/lib/api';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<'about' | 'projects' | 'contacts'>('about');
    const [about, setAbout] = useState<AboutUs>({
        title: '',
        description: '',
        mission: '',
        vision: '',
    });
    const [projects, setProjects] = useState<Project[]>([]);
    const [contacts, setContacts] = useState<ContactSubmission[]>([]);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [showProjectForm, setShowProjectForm] = useState(false);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        try {
            if (activeTab === 'about') {
                const data = await aboutApi.get();
                setAbout(data);
            } else if (activeTab === 'projects') {
                const data = await projectsApi.getAll();
                setProjects(data);
            } else if (activeTab === 'contacts') {
                const data = await contactApi.getAll();
                setContacts(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAboutSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await aboutApi.update(about);
            alert('About section updated successfully!');
        } catch (error) {
            alert('Failed to update about section');
        }
    };

    const handleProjectSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingProject?.id) {
                await projectsApi.update(editingProject.id, editingProject);
            } else if (editingProject) {
                await projectsApi.create(editingProject);
            }
            setShowProjectForm(false);
            setEditingProject(null);
            fetchData();
            alert('Project saved successfully!');
        } catch (error) {
            alert('Failed to save project');
        }
    };

    const handleDeleteProject = async (id: number) => {
        if (confirm('Are you sure you want to delete this project?')) {
            try {
                await projectsApi.delete(id);
                fetchData();
                alert('Project deleted successfully!');
            } catch (error) {
                alert('Failed to delete project');
            }
        }
    };

    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="section-title mb-8">Admin Dashboard</h1>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('about')}
                        className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${activeTab === 'about'
                                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                                : 'glass hover:bg-white/10'
                            }`}
                    >
                        About Us
                    </button>
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${activeTab === 'projects'
                                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                                : 'glass hover:bg-white/10'
                            }`}
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => setActiveTab('contacts')}
                        className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${activeTab === 'contacts'
                                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                                : 'glass hover:bg-white/10'
                            }`}
                    >
                        Contact Submissions
                    </button>
                </div>

                {/* About Tab */}
                {activeTab === 'about' && (
                    <div className="card">
                        <h2 className="text-2xl font-bold mb-6">Edit About Us</h2>
                        <form onSubmit={handleAboutSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Title</label>
                                <input
                                    type="text"
                                    value={about.title}
                                    onChange={(e) => setAbout({ ...about, title: e.target.value })}
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    value={about.description}
                                    onChange={(e) => setAbout({ ...about, description: e.target.value })}
                                    className="input-field resize-none"
                                    rows={4}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Mission</label>
                                <textarea
                                    value={about.mission || ''}
                                    onChange={(e) => setAbout({ ...about, mission: e.target.value })}
                                    className="input-field resize-none"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Vision</label>
                                <textarea
                                    value={about.vision || ''}
                                    onChange={(e) => setAbout({ ...about, vision: e.target.value })}
                                    className="input-field resize-none"
                                    rows={3}
                                />
                            </div>
                            <button type="submit" className="btn-primary">
                                Save Changes
                            </button>
                        </form>
                    </div>
                )}

                {/* Projects Tab */}
                {activeTab === 'projects' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Manage Projects</h2>
                            <button
                                onClick={() => {
                                    setEditingProject({
                                        title: '',
                                        description: '',
                                        technologies: '',
                                        featured: false,
                                    });
                                    setShowProjectForm(true);
                                }}
                                className="btn-primary"
                            >
                                Add New Project
                            </button>
                        </div>

                        {showProjectForm && editingProject && (
                            <div className="card mb-6">
                                <h3 className="text-xl font-bold mb-4">
                                    {editingProject.id ? 'Edit Project' : 'New Project'}
                                </h3>
                                <form onSubmit={handleProjectSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={editingProject.title}
                                            onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                                            className="input-field"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Description</label>
                                        <textarea
                                            value={editingProject.description}
                                            onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                                            className="input-field resize-none"
                                            rows={4}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
                                        <input
                                            type="text"
                                            value={editingProject.technologies || ''}
                                            onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value })}
                                            className="input-field"
                                            placeholder="React, Node.js, MongoDB"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Project URL</label>
                                            <input
                                                type="url"
                                                value={editingProject.project_url || ''}
                                                onChange={(e) => setEditingProject({ ...editingProject, project_url: e.target.value })}
                                                className="input-field"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">GitHub URL</label>
                                            <input
                                                type="url"
                                                value={editingProject.github_url || ''}
                                                onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                                                className="input-field"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="featured"
                                            checked={editingProject.featured}
                                            onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                                            className="w-4 h-4"
                                        />
                                        <label htmlFor="featured" className="text-sm font-medium">Featured Project</label>
                                    </div>
                                    <div className="flex gap-4">
                                        <button type="submit" className="btn-primary">
                                            Save Project
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowProjectForm(false);
                                                setEditingProject(null);
                                            }}
                                            className="btn-secondary"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {projects.map((project) => (
                                <div key={project.id} className="card">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold">{project.title}</h3>
                                        {project.featured && (
                                            <span className="px-2 py-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded text-xs">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-400 mb-4">{project.description}</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingProject(project);
                                                setShowProjectForm(true);
                                            }}
                                            className="px-4 py-2 bg-primary-500/20 text-primary-400 rounded hover:bg-primary-500/30 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => project.id && handleDeleteProject(project.id)}
                                            className="px-4 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Contacts Tab */}
                {activeTab === 'contacts' && (
                    <div className="card">
                        <h2 className="text-2xl font-bold mb-6">Contact Submissions</h2>
                        <div className="space-y-4">
                            {contacts.length > 0 ? (
                                contacts.map((contact) => (
                                    <div key={contact.id} className="p-4 glass rounded-lg">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold">{contact.name}</h3>
                                                <p className="text-sm text-gray-400">{contact.email}</p>
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                {contact.created_at ? new Date(contact.created_at).toLocaleDateString() : ''}
                                            </span>
                                        </div>
                                        <p className="text-gray-300">{contact.message}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-center py-8">No contact submissions yet</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
