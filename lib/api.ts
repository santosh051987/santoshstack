// API Types
export interface User {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    parent_id?: number;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    category_id: number;
    images?: string;
    is_active: boolean;
    created_at: string;
}

export interface OrderItem {
    id: number;
    product_id: number;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    customer_name: string;
    customer_email: string;
    total_amount: number;
    status: string;
    created_at: string;
    items: OrderItem[];
}

export interface Page {
    id: number;
    title: string;
    slug: string;
    content: string;
    is_active: boolean;
    updated_at?: string;
}

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
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...options?.headers,
        },
        ...options,
    });

    if (!response.ok) {
        if (response.status === 401 && typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/admin/login';
        }
        throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
}

// Auth API
export const authApi = {
    login: (formData: FormData) => {
        return fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            body: formData,
        }).then(res => {
            if (!res.ok) throw new Error('Login failed');
            return res.json();
        });
    },
    me: () => apiCall<User>('/api/auth/me'),
};

// Category API
export const categoryApi = {
    getAll: () => apiCall<Category[]>('/api/categories'),
    create: (data: Partial<Category>) => apiCall<Category>('/api/categories', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
};

// Product API
export const productApi = {
    getAll: (categoryId?: number) => apiCall<Product[]>(`/api/products${categoryId ? `?category_id=${categoryId}` : ''}`),
    create: (data: Partial<Product>) => apiCall<Product>('/api/products', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
};

// Order API
export const orderApi = {
    getAll: () => apiCall<Order[]>('/api/orders'),
    create: (data: any) => apiCall<Order>('/api/orders', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
};

// Page API
export const pageApi = {
    getAll: () => apiCall<Page[]>('/api/pages'),
    getBySlug: (slug: string) => apiCall<Page>(`/api/pages/${slug}`),
    update: (id: number, data: Partial<Page>) => apiCall<Page>(`/api/pages/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
};

// Dashboard API
export const dashboardApi = {
    getStats: () => apiCall<any>('/api/dashboard/stats'),
};

// About Us API
export const aboutUsApi = {
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
