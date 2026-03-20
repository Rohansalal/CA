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
    // Prefer adminToken for admin routes, fall back to user token
    const adminToken = localStorage.getItem('adminToken');
    const userToken = localStorage.getItem('token');

    const isAdminRoute = config.url?.includes('/admin') ||
        config.url?.includes('/api/admin') ||
        config.url?.includes('/api/payments/verify-manual') ||
        config.url?.includes('/api/leads') ||
        config.url?.includes('/api/employees') ||
        config.url?.includes('/api/tasks/admin');

    const token = isAdminRoute ? (adminToken || userToken) : (userToken || adminToken);

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// Response interceptor: handle 401 globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear stale tokens
            const isAdminRoute = error.config?.url?.includes('/admin');
            if (isAdminRoute) {
                localStorage.removeItem('adminToken');
                // Redirect to admin login if not already there
                if (!window.location.pathname.includes('/admin/login')) {
                    window.location.href = '/admin/login';
                }
            } else {
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
