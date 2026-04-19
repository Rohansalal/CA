import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    metadata?: { startTime: number };
    _isRetry?: boolean;
  }
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000');

// ── Auth helpers ──────────────────────────────────────────────────────────────

/** Decode JWT payload without verifying signature (client-side only) */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

/** Returns true if the token exists and is not expired (with 60-second buffer) */
export function isAdminTokenValid(): boolean {
  const token = localStorage.getItem('adminToken');
  if (!token) return false;
  const payload = decodeJwtPayload(token);
  if (!payload || typeof payload.exp !== 'number') return false;
  return payload.exp * 1000 > Date.now() + 60_000; // 60-second buffer
}

/** Returns ms until admin token expires, or 0 if already expired */
export function adminTokenExpiresIn(): number {
  const token = localStorage.getItem('adminToken');
  if (!token) return 0;
  const payload = decodeJwtPayload(token);
  if (!payload || typeof payload.exp !== 'number') return 0;
  return Math.max(0, payload.exp * 1000 - Date.now());
}

// ── Session clear ─────────────────────────────────────────────────────────────

let _isHandlingAuthFailure = false; // prevent concurrent redirect loops

export function clearAdminSession(reason: 'expired' | 'unauthorized' = 'expired') {
  if (_isHandlingAuthFailure) return;
  _isHandlingAuthFailure = true;

  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');

  // Notify rest of the app (React Query, etc.) so queries can stop
  window.dispatchEvent(new CustomEvent('admin:session:cleared', { detail: { reason } }));

  if (!window.location.pathname.includes('/login')) {
    window.location.replace(`/dashboard/login?reason=${reason}`);
  }

  // Reset flag after navigation completes (safety net)
  setTimeout(() => { _isHandlingAuthFailure = false; }, 3000);
}

// ── Axios instance ────────────────────────────────────────────────────────────

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ── Request interceptor ───────────────────────────────────────────────────────

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.metadata = { startTime: Date.now() };

    const token = localStorage.getItem('adminToken');

    // Pre-flight token expiry check: clear session immediately if expired
    if (token) {
      const payload = decodeJwtPayload(token);
      const isExpired = payload && typeof payload.exp === 'number'
        && payload.exp * 1000 <= Date.now();

      if (isExpired) {
        clearAdminSession('expired');
        // Cancel this request — return a rejected promise
        return Promise.reject(
          new axios.Cancel('Admin session expired — redirecting to login'),
        );
      }

      config.headers.Authorization = `Bearer ${token}`;
    }

    if (import.meta.env.DEV) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response interceptor ──────────────────────────────────────────────────────

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.DEV) {
      const ms = response.config.metadata?.startTime
        ? Date.now() - response.config.metadata.startTime
        : 0;
      console.log(`[API] ${response.status} ${response.config.url} (${ms}ms)`);
    }
    return response;
  },

  async (error: AxiosError) => {
    const { response, config } = error;

    if (import.meta.env.DEV) {
      console.error('[API Error]', {
        url: config?.url,
        status: response?.status,
        data: response?.data,
      });
    }

    // 401 — token invalid / expired: clear session and redirect once
    if (response?.status === 401) {
      clearAdminSession('expired');
      // Throw a typed error so React Query knows NOT to retry
      const authError = new Error('Unauthorized') as Error & { status: number; isAuthError: boolean };
      authError.status = 401;
      authError.isAuthError = true;
      return Promise.reject(authError);
    }

    // 403 — valid token but insufficient permissions (don't logout)
    if (response?.status === 403) {
      const forbiddenError = new Error('Forbidden') as Error & { status: number; isAuthError: boolean };
      forbiddenError.status = 403;
      forbiddenError.isAuthError = true;
      return Promise.reject(forbiddenError);
    }

    return Promise.reject(error);
  },
);

// ── Public API ────────────────────────────────────────────────────────────────

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config).then((r) => r.data),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, data, config).then((r) => r.data),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, data, config).then((r) => r.data),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, data, config).then((r) => r.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config).then((r) => r.data),
};

export default apiClient;
