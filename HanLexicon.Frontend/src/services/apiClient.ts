import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Create a configured axios instance
export const apiClient = axios.create({
  baseURL: (typeof process !== 'undefined' ? process.env.VITE_API_URL : (import.meta as any).env?.VITE_API_URL) || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Auth Token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Attempt to get token from storage securely
    const token = localStorage.getItem('auth_token');
    
    // If token exists and headers exist, attach it safely
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Global Errors (e.g., 401 Unauthorized)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Handle 401 Unauthorized globally
    if (error.response?.status === 401) {
      console.warn('Unauthorized request. Token might be expired.');
      // Optional: Clear token or dispatch a logout event here
      // localStorage.removeItem('auth_token');
      // window.location.href = '/login'; 
    }

    // Handle generic server errors
    if (error.response?.status && error.response.status >= 500) {
      console.error('Server error occurred.');
    }

    // Format error response into a generic structure if needed
    const customError = {
      message: (error.response?.data as any)?.message || error.message || 'An unexpected error occurred',
      status: error.response?.status || 500,
      data: error.response?.data,
    };

    return Promise.reject(customError);
  }
);
