import axios, { AxiosInstance } from 'axios';

// Ép kiểu để TypeScript không báo lỗi với ImportMeta
const BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'https://localhost:7285/api/v1';

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }
    const errorMsg = error.response?.data?.message || error.message || "Lỗi kết nối máy chủ";
    return Promise.reject(errorMsg);
  }
);
