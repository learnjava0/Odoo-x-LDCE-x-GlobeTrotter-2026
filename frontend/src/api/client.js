import axios from 'axios';

// Base URL — proxied through Vite in dev, or set via env var in production
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request interceptor — attach JWT access token ─────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor — auto-refresh on 401 ───────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const { data } = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
          refresh: refreshToken,
        });
        localStorage.setItem('access_token', data.access);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// ══════════════════════════════════════════════════════════════════════════════
// Auth service
// ══════════════════════════════════════════════════════════════════════════════
export const authService = {
  /**
   * POST /api/auth/login/
   * @returns {{ user, access, refresh }}
   */
  login: (email, password) =>
    apiClient.post('/auth/login/', { email, password }).then((r) => r.data),

  /**
   * POST /api/auth/register/
   * @returns {{ user, access, refresh }}
   */
  register: (name, email, password, confirm_password) =>
    apiClient.post('/auth/register/', { name, email, password, confirm_password }).then((r) => r.data),

  /**
   * POST /api/auth/logout/
   */
  logout: (refresh) =>
    apiClient.post('/auth/logout/', { refresh }),

  /**
   * POST /api/auth/forgot_password/
   */
  forgotPassword: (email, new_password) =>
    apiClient.post('/auth/forgot_password/', { email, new_password }).then((r) => r.data),
};

// ══════════════════════════════════════════════════════════════════════════════
// User / Profile service
// ══════════════════════════════════════════════════════════════════════════════
export const userService = {
  /** GET /api/users/me/ */
  getMe: () => apiClient.get('/users/me/').then((r) => r.data),

  /** PATCH /api/users/me/ */
  updateMe: (data) => apiClient.patch('/users/me/', data).then((r) => r.data),

  /** DELETE /api/users/me/ */
  deleteMe: () => apiClient.delete('/users/me/'),
};

// ══════════════════════════════════════════════════════════════════════════════
// Trips service
// ══════════════════════════════════════════════════════════════════════════════
export const tripService = {
  /** GET /api/trips/ */
  list: (params) => apiClient.get('/trips/', { params }).then((r) => r.data),

  /** GET /api/trips/:id/ */
  get: (id) => apiClient.get(`/trips/${id}/`).then((r) => r.data),

  /** POST /api/trips/ */
  create: (data) => apiClient.post('/trips/', data).then((r) => r.data),

  /** PATCH /api/trips/:id/ */
  update: (id, data) => apiClient.patch(`/trips/${id}/`, data).then((r) => r.data),

  /** DELETE /api/trips/:id/ */
  delete: (id) => apiClient.delete(`/trips/${id}/`),

  /** POST /api/trips/:id/duplicate/ */
  duplicate: (id) => apiClient.post(`/trips/${id}/duplicate/`).then((r) => r.data),

  /** POST /api/trips/:id/share/ */
  share: (id, is_public) => apiClient.post(`/trips/${id}/share/`, { is_public }).then((r) => r.data),

  /** GET /api/trips/:id/budget/ */
  getBudget: (id) => apiClient.get(`/trips/${id}/budget/`).then((r) => r.data),

  /** GET /api/trips/:id/itinerary/ */
  getItinerary: (id) => apiClient.get(`/trips/${id}/itinerary/`).then((r) => r.data),

  /** POST /api/trips/:id/reorder-stops/ */
  reorderStops: (id, items) => apiClient.post(`/trips/${id}/reorder-stops/`, { items }).then((r) => r.data),
};

// ══════════════════════════════════════════════════════════════════════════════
// Trip Stops service
// ══════════════════════════════════════════════════════════════════════════════
export const stopService = {
  /** GET /api/trips/:tripId/stops/ */
  listForTrip: (tripId) => apiClient.get(`/trips/${tripId}/stops/`).then((r) => r.data),

  /** POST /api/trips/:tripId/stops/ */
  create: (tripId, data) => apiClient.post(`/trips/${tripId}/stops/`, data).then((r) => r.data),

  /** PATCH /api/stops/:id/ */
  update: (id, data) => apiClient.patch(`/stops/${id}/`, data).then((r) => r.data),

  /** DELETE /api/stops/:id/ */
  delete: (id) => apiClient.delete(`/stops/${id}/`),
};

// ══════════════════════════════════════════════════════════════════════════════
// Destinations (cities) service
// ══════════════════════════════════════════════════════════════════════════════
export const destinationService = {
  /** GET /api/destinations/ */
  list: (params) => apiClient.get('/destinations/', { params }).then((r) => r.data),

  /** GET /api/destinations/:id/ */
  get: (id) => apiClient.get(`/destinations/${id}/`).then((r) => r.data),

  /** GET /api/destinations/search/?q=... */
  search: (q, params) => apiClient.get('/destinations/search/', { params: { q, ...params } }).then((r) => r.data),

  /** POST /api/destinations/:id/save/ */
  save: (id) => apiClient.post(`/destinations/${id}/save/`).then((r) => r.data),

  /** DELETE /api/destinations/:id/unsave/ */
  unsave: (id) => apiClient.delete(`/destinations/${id}/unsave/`),
};

// ══════════════════════════════════════════════════════════════════════════════
// Activities service
// ══════════════════════════════════════════════════════════════════════════════
export const activityService = {
  /** GET /api/activities/ */
  list: (params) => apiClient.get('/activities/', { params }).then((r) => r.data),

  /** GET /api/activities/:id/ */
  get: (id) => apiClient.get(`/activities/${id}/`).then((r) => r.data),

  /** GET /api/activities/search/?q=... */
  search: (q, params) => apiClient.get('/activities/search/', { params: { q, ...params } }).then((r) => r.data),
};

// ══════════════════════════════════════════════════════════════════════════════
// Expenses / Budget service
// ══════════════════════════════════════════════════════════════════════════════
export const expenseService = {
  /** GET /api/expenses/?trip=... */
  list: (tripId) => apiClient.get('/expenses/', { params: { trip: tripId } }).then((r) => r.data),

  /** POST /api/expenses/ */
  create: (data) => apiClient.post('/expenses/', data).then((r) => r.data),

  /** PATCH /api/expenses/:id/ */
  update: (id, data) => apiClient.patch(`/expenses/${id}/`, data).then((r) => r.data),

  /** DELETE /api/expenses/:id/ */
  delete: (id) => apiClient.delete(`/expenses/${id}/`),
};

// ══════════════════════════════════════════════════════════════════════════════
// Public / Sharing service
// ══════════════════════════════════════════════════════════════════════════════
export const publicService = {
  /** GET /api/public/:slug/ */
  getTrip: (slug) => apiClient.get(`/public/${slug}/`).then((r) => r.data),

  /** POST /api/public/:slug/copy/ */
  copyTrip: (slug) => apiClient.post(`/public/${slug}/copy/`).then((r) => r.data),
};

// ══════════════════════════════════════════════════════════════════════════════
// Admin analytics service
// ══════════════════════════════════════════════════════════════════════════════
export const adminService = {
  /** GET /api/admin/statistics/ */
  statistics: () => apiClient.get('/admin/statistics/').then((r) => r.data),

  /** GET /api/admin/users/ */
  users: () => apiClient.get('/admin/users/').then((r) => r.data),

  /** GET /api/admin/trips/ */
  trips: () => apiClient.get('/admin/trips/').then((r) => r.data),

  /** GET /api/admin/popular-destinations/ */
  popularDestinations: () => apiClient.get('/admin/popular-destinations/').then((r) => r.data),
};
