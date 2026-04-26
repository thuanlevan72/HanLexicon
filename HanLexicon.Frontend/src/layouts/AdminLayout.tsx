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
  FileCode
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutGrid },
  { name: 'Quản lý từ vựng', href: '/admin/vocabularies', icon: FileCode },
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
    <div className="flex flex-col h-full bg-brand-ink text-brand-secondary">
      <div className="p-8 border-b border-white/5">
        <Link to="/" className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white leading-none">
              Tiếng Trung
            </span>
            <div className="bg-brand-primary w-auto px-3 h-9 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm font-heading">
              Leyi
            </div>
          </div>
          <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest opacity-80">Admin Console</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-10 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-5 py-4 rounded-xl text-sm font-bold transition-all group",
              isActive(item.href)
                ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                : "text-brand-border/60 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              isActive(item.href) ? "text-white" : "text-brand-border/40 group-hover:text-brand-border"
            )} />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5 space-y-2">
        <Button
          variant="ghost"
          onClick={logout}
          className="w-full justify-start gap-3 text-brand-primary hover:text-brand-accent hover:bg-white/5 mt-4 font-black"
        >
          <LogOut className="w-5 h-5" /> Thoát Admin
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-brand-bg overflow-hidden text-brand-ink font-sans">
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
                <p className="text-brand-primary tracking-widest">Master Admin</p>
              </div>
              <Avatar className="h-10 w-10 border border-brand-border shadow-sm ring-4 ring-brand-primary/5">
                <AvatarImage src={`https://api.dicebear.com/7.x/shapes/svg?seed=Admin`} />
                <AvatarFallback className="bg-brand-primary text-white">AD</AvatarFallback>
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
