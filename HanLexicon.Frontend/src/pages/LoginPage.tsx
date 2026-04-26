import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, UserRole } from '@/src/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { GraduationCap, Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    try {
      const detectedRole = await login(email, password);
      navigate(detectedRole === 'admin' ? '/admin' : '/student');
    } catch (error: any) {
      setErrorMsg(error.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-brand-bg">
      <Card className="w-full max-w-md border border-brand-border shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="space-y-4 text-center pb-8 pt-10">
          <div className="flex justify-center items-center gap-2">
            <span className="text-3xl font-bold tracking-tight text-brand-ink">Tiếng Trung</span>
            <div className="bg-brand-primary w-auto px-4 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-sm font-heading">
              Leyi
            </div>
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-brand-ink">Chào mừng trở lại</CardTitle>
            <CardDescription className="font-medium text-brand-secondary">Đăng nhập để tiếp tục hành trình học tập</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm text-center font-medium">
              {errorMsg}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Email / Tên đăng nhập</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-brand-secondary" />
                <Input
                  type="text"
                  placeholder="name@example.com hoặc username"
                  className="pl-10 h-12 border-brand-border bg-brand-highlight/30 focus:bg-white rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-brand-secondary" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-12 border-brand-border bg-brand-highlight/30 focus:bg-white rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-xs leading-relaxed mt-2 border border-blue-100">
              <strong className="block mb-1">Tài khoản trải nghiệm:</strong>
              • Học viên: <code className="bg-white px-1 font-bold">student@chuang.com</code> / <code className="bg-white px-1 font-bold">student123</code><br/>
              • Admin: <code className="bg-white px-1 font-bold">Admin</code> / <code className="bg-white px-1 font-bold">@Anh123anh</code>
            </div>

            <Button disabled={isLoading} type="submit" className="w-full bg-brand-primary hover:bg-brand-secondary h-14 text-white rounded-xl text-lg font-bold shadow-sm group">
              {isLoading ? 'Đang đăng nhập...' : t('nav.login')} {!isLoading && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>

          <div className="relative my-8 text-center text-xs uppercase tracking-widest text-slate-400 font-bold">
            <span className="bg-white px-2 relative z-10">Hoặc tiếp tục với</span>
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-100 -z-0"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-11 gap-2">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" /> Google
            </Button>
            <Button variant="outline" className="h-11 gap-2">
              <Github className="w-4 h-4" /> Github
            </Button>
          </div>
        </CardContent>
        <CardFooter className="justify-center border-t border-brand-border pt-6 pb-8 bg-brand-highlight/30">
          <p className="text-sm text-brand-secondary font-medium">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-brand-primary font-bold hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
