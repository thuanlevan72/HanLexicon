import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, ArrowRight, Loader2, Mail, Lock, User as UserIcon } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    displayName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        displayName: formData.displayName,
        role: 'student'
      });
      // Nếu không ném lỗi thì coi như thành công
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-highlight rounded-full -mr-48 -mt-48 blur-3xl opacity-50"></div>
      <div className="w-full max-w-md relative z-10 space-y-8 animate-in fade-in zoom-in duration-500">
        <Card className="border-4 border-brand-border bg-white rounded-[3rem] shadow-2xl overflow-hidden">
          <CardHeader className="pt-10 pb-2 px-10 text-center">
            <CardTitle className="text-2xl font-black text-brand-ink">Tạo tài khoản</CardTitle>
            <p className="text-sm text-slate-400 font-medium">Bắt đầu hành trình chinh phục Hán ngữ</p>
          </CardHeader>
          <CardContent className="p-10 pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="p-4 bg-rose-50 border-2 border-rose-100 rounded-2xl text-rose-600 text-xs font-black text-center">{error}</div>}
              
              <div className="space-y-1">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Họ và tên</Label>
                <Input value={formData.displayName} onChange={e => setFormData({...formData, displayName: e.target.value})} className="h-14 rounded-2xl" placeholder="Nguyễn Văn A" required />
              </div>

              <div className="space-y-1">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Tên đăng nhập</Label>
                <Input value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} className="h-14 rounded-2xl" placeholder="username" required />
              </div>

              <div className="space-y-1">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email</Label>
                <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="h-14 rounded-2xl" placeholder="email@example.com" required />
              </div>

              <div className="space-y-1">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Mật khẩu</Label>
                <Input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="h-14 rounded-2xl" placeholder="••••••••" required />
              </div>

              <Button type="submit" disabled={loading} className="w-full h-16 bg-brand-primary text-white rounded-2xl text-lg font-black uppercase tracking-widest mt-4">
                {loading ? <Loader2 className="animate-spin" /> : "Đăng ký ngay"}
              </Button>
            </form>
            <p className="mt-8 text-center text-sm font-medium text-slate-400">
               Đã có tài khoản? <Link to="/login" className="text-brand-primary font-black hover:underline">Đăng nhập</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
