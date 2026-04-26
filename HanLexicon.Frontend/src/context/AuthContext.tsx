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
      // 1. Giả lập gọi API login thuần túy
      const response = await authService.login({
        userName,
        password,
        ipAddress: '127.0.0.1'
      });

      if (response && response.isSuccess && response.data) {
        const { accessToken, refreshToken, userId } = response.data;
        
        // 2. Decode JWT
        const decoded: any = jwtDecode(accessToken);
        
        // Cấu trúc typical JWT claims array / URLs
        const roleClaimKeys = [
          'role',
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
          'roles'
        ];
        let role = 'student';
        for (const key of roleClaimKeys) {
          if (decoded[key]) {
            role = decoded[key].toLowerCase();
            break;
          }
        }

        const nameClaimKeys = [
          'name',
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ];
        let name = userName;
        for (const key of nameClaimKeys) {
          if (decoded[key]) {
            name = decoded[key];
            break; // Stop at the first valid claim found for Name
          }
        }
        
        const email = decoded.email || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || userName;

        // 3. Lưu vào localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify({ userId, role, name, email }));

        // 4. Update Redux
        dispatch(setUser({
          id: userId,
          name,
          email,
          role: role as UserRole,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
        }));

        return role;
      } else {
        throw new Error(response?.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('API Login failed', error);
      throw new Error(error?.message || 'Lỗi đăng nhập'); // Re-throw so UI can catch it
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    dispatch(logoutUser());
  };

  return { user, isAuthenticated, login, logout };
};

