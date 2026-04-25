import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { setUser, logoutUser, UserRole } from '../store/slices/authSlice';
import { authService } from '../services/api';

export type { UserRole };

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const login = async (email: string, role: string, password?: string) => {
    try {
      const response = await authService.login({
        email,
        password,
        role,
        ipAddress: '127.0.0.1' // In a real app, this might be handled by the backend
      });
      
      if (response.isSuccess) {
        localStorage.setItem('auth_token', response.accessToken);
        dispatch(setUser({
          id: response.userId,
          name: response.name || email.split('@')[0],
          email,
          role: (response.role || role) as UserRole,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        }));
        return;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('API Login failed', error);
      throw error; // Re-throw so UI can catch it
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    dispatch(logoutUser());
  };

  return { user, isAuthenticated, login, logout };
};
