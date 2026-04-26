import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/src/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  BarChart3,
  LogOut,
  Menu,
  X,
  GraduationCap,
  Bell,
  Search,
  Settings,
  HelpCircle,
  Library,
  History
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navigation = [
  { name: 'Tổng quan', href: '/student', icon: LayoutDashboard },
  { name: 'Từ điển', href: '/student/vocabulary', icon: Library },
  { name: 'Lịch sử', href: '/student/history', icon: History },
];

export default function StudentLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isActive = (path: string) => {
    if (path === '/student') {
      return location.pathname === '/student';
    }
    return location.pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-brand-surface border-r border-brand-border">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-semibold text-lg tracking-tight text-brand-ink">
            Tiếng Trung
          </span>
          <div className="bg-brand-primary w-auto px-3 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm font-heading">
            Leyi
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group",
              isActive(item.href)
                ? "bg-brand-primary text-white shadow-sm"
                : "text-brand-secondary hover:bg-brand-highlight hover:text-brand-ink"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              isActive(item.href) ? "text-white" : "text-brand-secondary group-hover:text-brand-primary"
            )} />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-brand-border space-y-1">
        <div className="bg-brand-highlight rounded-xl p-4 mb-4">
          <p className="text-[10px] text-brand-secondary font-semibold uppercase mb-2 tracking-wider">Cấp độ hiện tại</p>
          <p className="font-bold text-sm text-brand-ink">HSK 3 Intermediate</p>
          <div className="w-full bg-brand-border h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-brand-accent h-full w-3/4 transition-all"></div>
          </div>
        </div>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/student/profile')}
          className={cn(
            "w-full justify-start gap-3 text-brand-secondary hover:text-brand-ink hover:bg-brand-highlight",
            location.pathname === '/student/profile' && "bg-brand-highlight text-brand-ink"
          )}
        >
          <Settings className="w-5 h-5" /> Cài đặt
        </Button>
        <Button
          variant="ghost"
          onClick={logout}
          className="w-full justify-start gap-3 text-rose-500 hover:text-rose-600 hover:bg-rose-50"
        >
          <LogOut className="w-5 h-5" /> Đăng xuất
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-brand-bg text-brand-ink overflow-hidden">
      {/* Thanh điều hướng bên (Sidebar) trên Desktop của học viên */}
      <aside className={cn(
        "hidden md:block transition-all duration-300 ease-in-out shrink-0 overflow-hidden",
        isSidebarOpen ? "w-64" : "w-0"
      )}>
        <div className="w-64 h-full">
          <SidebarContent />
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 overflow-hidden">
        {/* Thanh chắn ngang (Topbar) */}
        <header className="h-20 bg-white border-b border-brand-border flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden md:flex text-brand-secondary hover:text-brand-ink"
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Nút Trigger bung khay danh mục áp dụng trên Điện thoại di động */}
            <Sheet>
              <SheetTrigger 
                render={
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="w-6 h-6" />
                  </Button>
                }
              />
              <SheetContent side="left" className="p-0 w-64">
                <SidebarContent />
              </SheetContent>
            </Sheet>

            <div className="hidden sm:flex items-center relative group">
              <Search className="w-4 h-4 text-brand-secondary absolute left-3 group-focus-within:text-brand-primary transition-colors" />
              <input
                type="text"
                placeholder="Tìm kiếm bài học..."
                className="bg-brand-highlight border-0 rounded-lg pl-10 pr-4 py-2.5 text-sm w-64 focus:ring-2 focus:ring-brand-primary/20 transition-all focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-brand-secondary hover:text-brand-ink transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </Button>

            <div className="flex items-center gap-3 pl-6 border-l border-brand-border">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-brand-ink leading-tight">{user?.name}</p>
                <p className="text-[10px] text-brand-secondary font-bold uppercase tracking-widest leading-tight">{user?.role === 'admin' ? 'Quản trị viên' : 'Học viên'}</p>
              </div>
              <Avatar className="h-10 w-10 border border-brand-border shadow-sm">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-brand-accent text-white font-bold">{user?.name?.[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Điểm đổ nội dung chính của trang (Content Area) */}
        <main className="flex-1 overflow-y-auto bg-brand-bg/50">
          <div className="max-w-6xl mx-auto p-4 md:p-10 space-y-8">
            <div className="flex items-center gap-2 text-[10px] font-bold text-brand-secondary uppercase tracking-widest">
              <Link to="/student" className="hover:text-brand-primary transition-colors">Học viên</Link>
              <span>/</span>
              <span className="text-brand-ink">{location.pathname.split('/').pop()}</span>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
