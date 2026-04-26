import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/src/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { GraduationCap, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp!');
      return;
    }

    // Thuần giao diện
    await new Promise(resolve => setTimeout(resolve, 500));
    await login(email || username, password);
    navigate('/student');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 py-8 bg-brand-bg">
      <Card className="w-full max-w-md border border-brand-border shadow-xl rounded-3xl overflow-hidden mt-8">
        <CardHeader className="space-y-4 text-center pb-8 pt-10">
          <div className="flex justify-center items-center gap-2">
            <span className="text-3xl font-bold tracking-tight text-brand-ink">Tiếng Trung</span>
            <div className="bg-brand-primary w-auto px-4 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-sm font-heading">
              Leyi
            </div>
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-brand-ink">Tạo tài khoản mới</CardTitle>
            <CardDescription className="font-medium text-brand-secondary">Bắt đầu hành trình chinh phục tiếng Trung ngay hôm nay</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500 text-sm font-bold text-center">{error}</div>}
             <div className="space-y-2">
              <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Tên đăng nhập <span className="text-red-500">*</span></label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-brand-secondary" />
                <Input
                  type="text"
                  placeholder="username (4-50 ký tự)"
                  className="pl-10 h-12 border-brand-border bg-brand-highlight/30 focus:bg-white rounded-xl"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Tên hiển thị</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-brand-secondary" />
                <Input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="pl-10 h-12 border-brand-border bg-brand-highlight/30 focus:bg-white rounded-xl"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-brand-secondary" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 h-12 border-brand-border bg-brand-highlight/30 focus:bg-white rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Mật khẩu <span className="text-red-500">*</span></label>
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
              <div className="space-y-2">
                <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest">NL Mật khẩu <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-brand-secondary" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-12 border-brand-border bg-brand-highlight/30 focus:bg-white rounded-xl"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full bg-brand-primary hover:bg-brand-secondary h-14 text-white font-bold rounded-xl text-lg shadow-sm group mt-4">
              Đăng ký ngay <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center border-t border-brand-border pt-6 pb-8 bg-brand-highlight/30">
          <p className="text-sm text-brand-secondary font-medium">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-brand-primary font-bold hover:underline">
              Đăng nhập
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
