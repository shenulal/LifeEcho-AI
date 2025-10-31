import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (email: string, password: string, fullName?: string) => {
    const response = await api.post('/api/v1/auth/register', {
      email,
      password,
      full_name: fullName,
    });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await api.post('/api/v1/auth/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/api/v1/auth/me');
    return response.data;
  },
};

// Decisions API
export const decisionsAPI = {
  create: async (decision: {
    title: string;
    description?: string;
    category: string;
    context?: any;
  }) => {
    const response = await api.post('/api/v1/decisions', decision);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/api/v1/decisions');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/api/v1/decisions/${id}`);
    return response.data;
  },

  update: async (id: string, updates: any) => {
    const response = await api.put(`/api/v1/decisions/${id}`, updates);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/api/v1/decisions/${id}`);
  },

  simulate: async (id: string, numScenarios: number = 3, timeHorizon: number = 5) => {
    const response = await api.post(`/api/v1/decisions/${id}/simulate`, {
      decision_id: id,
      num_scenarios: numScenarios,
      time_horizon_years: timeHorizon,
    });
    return response.data;
  },
};

export default api;

