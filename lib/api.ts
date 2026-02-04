// API Types
export interface AboutUs {
    id?: number;
    title: string;
    description: string;
    mission?: string;
    vision?: string;
    team_members?: string;
    images?: string;
}

export interface Project {
    id?: number;
    title: string;
    description: string;
    technologies?: string;
    images?: string;
    project_url?: string;
    github_url?: string;
    featured: boolean;
    created_at?: string;
}

export interface ContactSubmission {
    id?: number;
    name: string;
    email: string;
    message: string;
    created_at?: string;
}

// API Base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Helper function for API calls
async function apiCall<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
}

// About Us API
export const aboutApi = {
    get: () => apiCall<AboutUs>('/api/about'),
    update: (data: Partial<AboutUs>) =>
        apiCall<AboutUs>('/api/about', {
            method: 'PUT',
            body: JSON.stringify(data),
        }),
};

// Projects API
export const projectsApi = {
    getAll: () => apiCall<Project[]>('/api/projects'),
    getById: (id: number) => apiCall<Project>(`/api/projects/${id}`),
    create: (data: Omit<Project, 'id' | 'created_at'>) =>
        apiCall<Project>('/api/projects', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
    update: (id: number, data: Partial<Project>) =>
        apiCall<Project>(`/api/projects/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),
    delete: (id: number) =>
        apiCall<void>(`/api/projects/${id}`, {
            method: 'DELETE',
        }),
};

// Contact API
export const contactApi = {
    submit: (data: Omit<ContactSubmission, 'id' | 'created_at'>) =>
        apiCall<ContactSubmission>('/api/contact', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
    getAll: () => apiCall<ContactSubmission[]>('/api/contact'),
};
