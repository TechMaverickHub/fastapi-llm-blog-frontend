import api from './api';
import { type LoginRequest, type RegisterRequest, type AuthResponse, type RegisterResponse } from '../types';
import { API_CONFIG } from '../constants/api';

export const authService = {
  // Login user
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  // Register user
  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  },

  // Logout (client-side only, server doesn't need to be called)
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },

  // Get stored user data
  getStoredUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get stored token
  getStoredToken: () => {
    return localStorage.getItem('access_token');
  },

  // Store auth data
  storeAuthData: (authData: AuthResponse['results']) => {
    localStorage.setItem('access_token', authData.access_token);
    localStorage.setItem('refresh_token', authData.refresh_token);
    localStorage.setItem('user', JSON.stringify(authData.user));
  },
};
