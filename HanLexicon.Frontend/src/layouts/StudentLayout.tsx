import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/src/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'motion/react';
import { 
  LayoutGrid, BookOpen, History, Settings, LogOut, Menu, X, Bell, 
  MessageSquare, User, Search, Play, Trophy, Sparkles, RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StudentLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Tổng quan', path: '/student', icon: LayoutGrid },
    { label: 'Lộ trình học tập', path: '/student/learning', icon: Play },
    { label: 'Trung tâm ôn luyện', path: '/student/review', icon: RefreshCw },
    { label: 'Từ điển cá nhân', path: '/student/vocabulary', icon: BookOpen },
    { label: 'Lịch sử học tập', path: '/student/history', icon: History },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] theme-app">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200">
        <div className="p-8 flex items-center justify-center">
          <Link to="/student" className="block">
            <img src="/images/logo/2.png" alt="Tiếng Trung Leyi" className="h-28 w-auto object-contain" />
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-black transition-all group",
                location.pathname === item.path
                  ? "bg-brand-highlight text-brand-primary shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-brand-ink"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                location.pathname === item.path ? "text-brand-primary" : "text-slate-400 group-hover:text-brand-ink"
              )} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100">
          <Button 
            variant="ghost" 
            onClick={logout}
            className="w-full justify-start gap-3 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-2xl font-bold h-12"
          >
            <LogOut className="w-5 h-5" /> Đăng xuất
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-20">
          <button 
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden md:flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-2xl w-96 border border-transparent focus-within:border-brand-primary/30 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm nhanh bài học..." 
              className="bg-transparent border-none outline-none text-sm font-medium w-full"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full text-slate-400 hover:text-brand-primary hover:bg-brand-highlight">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="w-px h-6 bg-slate-200 mx-2 hidden sm:block"></div>
            <div className="flex items-center gap-3 pl-2 group cursor-pointer" onClick={() => navigate('/student/profile')}>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-brand-ink leading-none">{(user as any)?.displayName || user?.name}</p>
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Student</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-brand-primary transition-all">
                <AvatarImage src={(user as any)?.avatar} />
                <AvatarFallback className="bg-brand-primary text-white font-bold">{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 md:p-12">
          <Outlet />
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            className="absolute left-0 top-0 bottom-0 w-80 bg-white p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-10">
              <img src="/images/logo/2.png" alt="Tiếng Trung Leyi" className="h-24 w-auto object-contain" />
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}><X /></Button>
            </div>
            <nav className="flex-1 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-4 px-6 py-4 rounded-2xl text-base font-black transition-all",
                    location.pathname === item.path ? "bg-brand-highlight text-brand-primary" : "text-slate-600"
                  )}
                >
                  <item.icon className="w-6 h-6" />
                  {item.label}
                </Link>
              ))}
            </nav>
            <Button variant="outline" onClick={logout} className="mt-auto h-14 rounded-2xl font-black border-slate-200">Đăng xuất</Button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

