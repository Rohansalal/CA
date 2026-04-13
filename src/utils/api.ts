import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT } from './constants';
import { AUTH_MODE, getUserToken, removeUserToken } from './auth';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor: attach the right token when needed.
api.interceptors.request.use((config) => {
    const adminToken = localStorage.getItem('adminToken');
    const userToken = getUserToken();
    const url = config.url || '';

    // Admin routes always require admin token.
    if (url.startsWith('/admin') || url.startsWith('/api/admin') ||
        url.includes('/hrms') || url.includes('/crm') || url.includes('/analytics') ||
        url.includes('/employees') || url.includes('/leads') ||
        url.includes('/compliance-calendar') || url.includes('/api/payments/verify-manual')) {
        if (adminToken && config.headers) {
            config.headers.Authorization = `Bearer ${adminToken}`;
        }
    }
    // User routes use token only in bearer mode.
    else if (AUTH_MODE === 'bearer') {
        const token = userToken || adminToken;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => Promise.reject(error));

// Response interceptor: handle 401 globally.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const url = error.config?.url || '';

            // Admin routes
            if (url.startsWith('/admin') || url.includes('/hrms') ||
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
                if (AUTH_MODE === 'bearer') {
                    removeUserToken();
                }
                if (!window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
