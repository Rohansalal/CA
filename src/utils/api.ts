import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT } from './constants';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor: attach the right token
api.interceptors.request.use((config) => {
    const superAdminToken = localStorage.getItem('superAdminToken');
    const adminToken = localStorage.getItem('adminToken');
    const userToken = localStorage.getItem('token');
    const url = config.url || '';
    
    // EXACT match for super-admin routes (must check BEFORE admin)
    if (url.startsWith('/super-admin') || url.startsWith('/api/super-admin')) {
        if (superAdminToken && config.headers) {
            config.headers.Authorization = `Bearer ${superAdminToken}`;
        }
    }
    // Exact match for admin routes
    else if (url.startsWith('/admin') || url.startsWith('/api/admin') ||
        url.includes('/hrms') || url.includes('/crm') || url.includes('/analytics') ||
        url.includes('/employees') || url.includes('/leads') ||
        url.includes('/compliance-calendar') || url.includes('/api/payments/verify-manual')) {
        if (adminToken && config.headers) {
            config.headers.Authorization = `Bearer ${adminToken}`;
        }
    }
    // User routes
    else {
        const token = userToken || adminToken;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => Promise.reject(error));

// Response interceptor: handle 401 globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const url = error.config?.url || '';
            
            // Super Admin routes (check BEFORE admin)
            if (url.startsWith('/super-admin') || url.startsWith('/api/super-admin')) {
                localStorage.removeItem('superAdminToken');
                localStorage.removeItem('superAdminData');
                if (!window.location.pathname.includes('/super-admin/login')) {
                    window.location.href = '/super-admin/login';
                }
            }
            // Admin routes
            else if (url.startsWith('/admin') || url.includes('/hrms') ||
                url.includes('/crm') || url.includes('/analytics') ||
                url.includes('/employees') || url.includes('/leads') ||
                url.includes('/compliance-calendar')) {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminData');
                if (!window.location.pathname.includes('/admin/login')) {
                    window.location.href = '/admin/login';
                }
            }
            // User routes
            else {
                localStorage.removeItem('token');
                if (!window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
