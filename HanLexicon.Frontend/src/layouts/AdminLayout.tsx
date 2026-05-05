import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/src/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ShieldCheck,
  Users,
  Library,
  BookMarked,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap,
  Bell,
  Search,
  LayoutGrid,
  Database,
  FileCode,
  FileText,
  Layers,
  Terminal,
  Type,
  HardDrive
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navigation = [
  { name: 'Bảng điều khiển', href: '/admin', icon: LayoutGrid },
  { name: 'Quản lý từ vựng', href: '/admin/vocabularies', icon: FileCode },
  { name: 'Danh mục bài học', href: '/admin/categories', icon: Layers },
  { name: 'Quản lý bài học', href: '/admin/lessons', icon: BookMarked },
  { name: 'Quản lý tài liệu', href: '/admin/documents', icon: FileText },
  { name: 'Tệp tin & Media', href: '/admin/media', icon: HardDrive },
  { name: 'Quản lý bộ thủ', href: '/admin/radicals', icon: Type },
  { name: 'Quản lý học sinh', href: '/admin/students', icon: Users },
  { name: 'Logs Hệ thống', href: '/admin/logs', icon: Terminal },
  { name: 'Quản lý Job', href: '/admin/jobs', icon: Database },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-brand-border text-brand-ink">
      <div className="p-8 border-b border-brand-border/50">
        <Link to="/" className="flex flex-col gap-1.5 items-center justify-center py-2">
          <img src="/images/logo/2.png" alt="Tiếng Trung Leyi" className="h-32 w-auto object-contain" />
          <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mt-2">Bảng Quản Trị</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-5 py-4 rounded-xl text-sm font-bold transition-all group",
              isActive(item.href)
                ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                : "text-slate-500 hover:bg-brand-highlight/50 hover:text-brand-ink"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              isActive(item.href) ? "text-white" : "text-slate-400 group-hover:text-brand-primary"
            )} />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-brand-border/50 space-y-2">
        <Button
          variant="ghost"
          onClick={logout}
          className="w-full justify-start gap-3 text-slate-500 hover:text-rose-600 hover:bg-rose-50 mt-2 font-black h-12 rounded-xl"
        >
          <LogOut className="w-5 h-5" /> Thoát Admin
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-brand-bg overflow-hidden text-brand-ink font-sans theme-app">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-80 shrink-0 overflow-hidden shadow-2xl z-20">
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-brand-border flex items-center justify-between px-8 shrink-0 z-10 font-bold uppercase tracking-widest text-[10px]">
          <div className="flex items-center gap-4">
             {/* Mobile Sidebar Trigger */}
            <Sheet>
              <SheetTrigger 
                render={
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="w-6 h-6 text-brand-ink" />
                  </Button>
                }
              />
              <SheetContent side="left" className="p-0 w-80 border-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-primary" />
              <span className="text-brand-ink">Hệ thống quản trị</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-brand-highlight rounded-full border border-brand-border text-brand-secondary font-black">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
              Trạng thái: Ổn định
            </div>
            
            <Button variant="ghost" size="icon" className="text-brand-secondary hover:text-brand-ink relative p-0 h-10 w-10">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-brand-primary rounded-full border-2 border-white"></span>
            </Button>

            <div className="flex items-center gap-4 pl-6 border-l border-brand-border">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-brand-ink leading-tight normal-case italic">Quản trị viên</p>
                <p className="text-brand-primary tracking-widest">Admin Tổng</p>
              </div>
              <Avatar className="h-10 w-10 border border-brand-border shadow-sm ring-4 ring-brand-primary/5">
                <AvatarImage src={`https://api.dicebear.com/7.x/shapes/svg?seed=Admin`} />
                <AvatarFallback className="bg-brand-primary text-white">QT</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 md:p-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
