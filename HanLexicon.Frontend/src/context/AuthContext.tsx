import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { setUser, logoutUser, UserRole } from '../store/slices/authSlice';
import { authService } from '../services/api';
import { jwtDecode } from 'jwt-decode';

export type { UserRole };

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const login = async (userName: string, password?: string) => {
    try {
      const response = await authService.login({
        userName,
        password,
        ipAddress: '127.0.0.1'
      });

      if (response && response.isSuccess && response.data) {
        const { accessToken, refreshToken, userId } = response.data;
        
        try {
          // Decode JWT an toàn
          const decoded: any = jwtDecode(accessToken);
          
          const roleClaim = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decoded['role'] || 'student';
          const role = roleClaim.toLowerCase();
          const name = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || userName;
          const email = decoded['email'] || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || '';

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('user', JSON.stringify({ userId, role, name, email }));

          dispatch(setUser({
            id: userId,
            name,
            email,
            role: role as UserRole,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
          }));

          return role;
        } catch (decodeErr) {
          throw new Error("Mã xác thực không hợp lệ (JWT Error)");
        }
      } else {
        throw new Error(response?.message || 'Đăng nhập thất bại.');
      }
    } catch (error: any) {
      console.error('Login flow failed:', error);
      throw typeof error === 'string' ? error : (error.message || 'Lỗi kết nối máy chủ.');
    }
  };

  const logout = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      authService.logout(refreshToken).catch(console.warn);
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    dispatch(logoutUser());
  };

  return { user, isAuthenticated, login, logout };
};
