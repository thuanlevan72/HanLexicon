
import React, { useState } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { api } from '@/src/services/api';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User, Mail, Shield, Save, Camera, Bell, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await api.updateUserProfile(user?.id || '1', { name, email });
    setLoading(false);
    alert('Thông tin đã được cập nhật!');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="space-y-2">
        <h1 className="text-3xl font-black text-brand-ink tracking-tight">Hồ sơ cá nhân</h1>
        <p className="text-brand-secondary font-medium">Quản lý thông tin tài khoản và cài đặt của bạn</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border border-brand-border bg-white shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-8 text-center space-y-6">
              <div className="relative inline-block group">
                <Avatar className="h-32 w-32 border-4 border-brand-highlight shadow-xl shadow-brand-primary/10">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-brand-primary text-white text-4xl font-black">
                    {user?.name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-brand-ink tracking-tight">{user?.name}</h2>
                <p className="text-sm font-bold text-brand-primary uppercase tracking-widest">{user?.role === 'admin' ? 'Chỉ huy Master' : 'Chiến binh Học tập'}</p>
              </div>

              <div className="pt-6 border-t border-brand-border grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-black text-brand-ink">12</p>
                  <p className="text-[10px] text-brand-secondary font-bold uppercase tracking-widest leading-none">Bài học</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-brand-ink">450</p>
                  <p className="text-[10px] text-brand-secondary font-bold uppercase tracking-widest leading-none">Từ vựng</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <nav className="space-y-2">
            {[
              { label: 'Thông tin cá nhân', icon: User, active: true },
              { label: 'Bảo mật & Mật khẩu', icon: Lock, active: false },
              { label: 'Thông báo', icon: Bell, active: false },
              { label: 'Quyền hạn', icon: Shield, active: false },
            ].map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-4 h-14 rounded-2xl font-bold tracking-tight px-6 transition-all",
                  item.active 
                    ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
                    : "text-brand-secondary hover:bg-brand-highlight hover:text-brand-ink border border-transparent hover:border-brand-border"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>

        {/* Edit Area */}
        <div className="lg:col-span-2">
          <Card className="border border-brand-border bg-white shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="p-8 border-b border-brand-border bg-brand-highlight/30">
              <CardTitle className="text-2xl font-bold tracking-tight text-brand-ink">Thông tin cá nhân</CardTitle>
              <CardDescription className="text-brand-secondary font-medium">Cập nhật tên và địa chỉ email của bạn</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="space-y-2 text-[10px] font-black text-brand-secondary uppercase tracking-widest">
                  <label htmlFor="name">Họ và tên</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 w-5 h-5 text-brand-secondary" />
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-12 h-14 border-brand-border bg-brand-highlight/20 focus:bg-white rounded-2xl font-bold text-brand-ink text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-[10px] font-black text-brand-secondary uppercase tracking-widest">
                  <label htmlFor="email">Địa chỉ Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-brand-secondary" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-14 border-brand-border bg-brand-highlight/20 focus:bg-white rounded-2xl font-bold text-brand-ink text-base"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full sm:w-auto px-10 h-14 bg-brand-primary hover:bg-brand-secondary text-white font-black rounded-2xl shadow-lg shadow-brand-primary/20 transition-all uppercase tracking-widest"
                  >
                    {loading ? 'Đang lưu...' : (
                      <span className="flex items-center gap-2">
                        <Save className="w-5 h-5" /> Lưu thay đổi
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
