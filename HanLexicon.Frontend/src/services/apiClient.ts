import axios, { AxiosInstance } from 'axios';

const BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'https://localhost:7285/api/v1';

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Biến để tránh gọi refresh token nhiều lần cùng lúc
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

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
  async (error) => {
    const originalRequest = error.config;

    // Bỏ qua logic refresh nếu là endpoint auth (login, register, refresh-token, logout)
    const isAuthRequest = originalRequest.url?.includes('/auth/login') || 
                         originalRequest.url?.includes('/auth/register') || 
                         originalRequest.url?.includes('/auth/refresh-token') ||
                         originalRequest.url?.includes('/auth/logout');

    // Nếu lỗi 401, chưa retry và không phải là request login/register
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRequest) {
      if (isRefreshing) {
        // Nếu đang trong quá trình refresh, đợi và retry sau
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        handleLogout();
        return Promise.reject(error);
      }

      try {
        // Gọi API refresh token (sử dụng axios gốc để tránh interceptor lặp vô tận)
        const res = await axios.post(`${BASE_URL}/auth/refresh-token`, { refreshToken });
        const { isSuccess, data } = res.data;

        if (isSuccess && data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
          processQueue(null, data.accessToken);
          
          return apiClient(originalRequest);
        } else {
          handleLogout();
          return Promise.reject(error);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        handleLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const errorMsg = error.response?.data?.message || error.message || "Lỗi kết nối máy chủ";
    return Promise.reject(errorMsg);
  }
);

function handleLogout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  if (window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
}
