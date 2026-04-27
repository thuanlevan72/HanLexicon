import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, ArrowRight, Loader2, KeyRound, User as UserIcon } from 'lucide-react';

export default function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Backend yêu cầu ipAddress, tạm thời lấy giả lập hoặc từ dịch vụ bên thứ 3
      await login({ 
        userName, 
        password, 
        ipAddress: '127.0.0.1' // Backend yêu cầu bắt buộc
      });
      
      // Chờ context cập nhật user role và navigate
      // navigate được thực hiện dựa trên role sau khi login thành công
    } catch (err: any) {
      setError(err.message || 'Sai tên đăng nhập hoặc mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  // Tự động chuyển hướng nếu đã đăng nhập
  React.useEffect(() => {
    if (user) {
      const role = user.role;
      const isAdmin = (Array.isArray(role) 
        ? role.some(r => r.toLowerCase() === 'admin')
        : typeof role === 'string' && role.toLowerCase() === 'admin') 
        || user.username?.toLowerCase() === 'admin'; // Override khẩn cấp cho username admin

      if (isAdmin) navigate('/admin');
      else navigate('/student');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-highlight rounded-full -mr-48 -mt-48 blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary rounded-full -ml-48 -mb-48 blur-3xl opacity-10"></div>

      <div className="w-full max-w-md relative z-10 space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-brand-primary rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-brand-primary/20 rotate-3">
             <Sparkles className="w-10 h-10 text-white fill-current" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-brand-ink tracking-tighter uppercase italic">HanLexicon</h1>
            <p className="text-brand-secondary font-bold mt-1 italic uppercase tracking-widest text-[10px]">Chinh phục Hán ngữ mỗi ngày</p>
          </div>
        </div>

        <Card className="border-4 border-brand-border bg-white rounded-[3rem] shadow-2xl overflow-hidden">
          <CardHeader className="pt-10 pb-2 px-10 text-center">
            <CardTitle className="text-2xl font-black text-brand-ink">Đăng nhập</CardTitle>
            <p className="text-sm text-slate-400 font-medium">Vui lòng nhập tài khoản để tiếp tục</p>
          </CardHeader>
          
          <CardContent className="p-10 pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-rose-50 border-2 border-rose-100 rounded-2xl text-rose-600 text-xs font-black uppercase text-center animate-shake">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Tên đăng nhập</Label>
                  <div className="relative group">
                    <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-primary transition-colors" />
                    <Input 
                      placeholder="Username..." 
                      className="h-16 pl-14 pr-6 bg-brand-highlight/20 border-2 border-transparent rounded-[1.5rem] font-bold text-brand-ink focus:border-brand-primary focus:bg-white transition-all text-lg shadow-inner"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Mật khẩu</Label>
                  <div className="relative group">
                    <KeyRound className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-primary transition-colors" />
                    <Input 
                      type="password"
                      placeholder="••••••••" 
                      className="h-16 pl-14 pr-6 bg-brand-highlight/20 border-2 border-transparent rounded-[1.5rem] font-bold text-brand-ink focus:border-brand-primary focus:bg-white transition-all text-lg shadow-inner"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-20 bg-brand-ink text-white rounded-[2rem] text-xl font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
                >
                  {loading ? (
                    <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
                  ) : (
                    <>
                      Vào hệ thống
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform text-brand-primary" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-10 text-center space-y-4">
              <p className="text-sm font-medium text-slate-400">
                Chưa có tài khoản?{' '}
                <Link to="/register" className="text-brand-primary font-black hover:underline underline-offset-4">Đăng ký ngay</Link>
              </p>
              <div className="pt-6 border-t border-brand-border">
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">© 2026 HanLexicon Studio</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
