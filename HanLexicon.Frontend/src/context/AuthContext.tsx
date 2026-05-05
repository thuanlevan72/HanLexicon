import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, userService } from '../services/api';
import { logger } from '@/src/utils/logger';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(
    typeof window !== 'undefined' ? !!localStorage.getItem('accessToken') : false
  );

  const refreshProfile = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const response: any = await userService.getProfile();
      const data = response.data || response;
      
      // Đảm bảo object user có đầy đủ thuộc tính bao gồm role
      if (data && (data.username || data.id)) {
        setUser(data);
        setIsAuthenticated(true);
      } else {
        throw new Error("Dữ liệu profile không hợp lệ");
      }
    } catch (error) {
      logger.error("Xác thực profile thất bại", error);
      setIsAuthenticated(false);
      setUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  const login = async (loginData: any) => {
    setLoading(true);
    try {
      const response: any = await authService.login(loginData);
      const data = response.data || response;
      if (data && data.accessToken) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
        }
        
        // Nếu API trả về user trực tiếp, cập nhật ngay lập tức
        if (data.user) {
          setUser(data.user);
          setIsAuthenticated(true);
          setLoading(false);
        } else {
          setIsAuthenticated(true);
          // Fallback: Đợi refreshProfile tải xong role nếu response không có user
          await refreshProfile();
        }
      } else {
        throw new Error(response?.message || 'Đăng nhập thất bại.');
      }
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const register = async (regData: any) => {
    const response: any = await authService.register(regData);
    const data = response.data || response;
    if (response && (response.isSuccess || data.isSuccess)) {
      // Success
    } else {
      throw new Error(response?.message || 'Đăng ký thất bại.');
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
