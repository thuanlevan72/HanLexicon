import { Outlet, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/src/context/AuthContext';
import { GraduationCap, LogIn, UserPlus, Menu } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function PublicLayout() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-ink">
      <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-brand-primary w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm transition-transform group-hover:scale-105">
              文
            </div>
            <span className="text-xl font-bold tracking-tight text-brand-ink">
              MandarinFlow
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/#courses" className="text-sm font-medium text-brand-secondary hover:text-brand-primary transition-colors">Khóa học</Link>
            <Link to="/#tools" className="text-sm font-medium text-brand-secondary hover:text-brand-primary transition-colors">Công cụ</Link>
            <Link to="/#hsk" className="text-sm font-medium text-brand-secondary hover:text-brand-primary transition-colors">HSK 3.0</Link>
            <Link to="/#contact" className="text-sm font-medium text-brand-secondary hover:text-brand-primary transition-colors">Liên hệ</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link to={user.role === 'admin' ? '/admin' : '/student'}>
                  <Button variant="ghost" className="text-brand-primary font-bold">Dashboard</Button>
                </Link>
                <Button variant="outline" onClick={logout} className="border-brand-border text-brand-secondary">Đăng xuất</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="flex items-center gap-2 text-brand-secondary font-bold hover:text-brand-ink">
                    <LogIn className="w-4 h-4" /> Đăng nhập
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-brand-primary hover:bg-brand-secondary text-white rounded-xl px-6 shadow-sm font-bold">
                    Đăng ký miễn phí
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger 
                render={
                  <Button variant="ghost" size="icon">
                    <Menu className="w-6 h-6" />
                  </Button>
                }
              />
              <SheetContent side="right">
                <div className="flex flex-col gap-6 pt-10">
                  <Link to="/" onClick={() => setIsOpen(false)} className="text-lg font-semibold">Trang chủ</Link>
                  <Link to="/#courses" onClick={() => setIsOpen(false)}>Khóa học</Link>
                  <Link to="/#tools" onClick={() => setIsOpen(false)}>Công cụ</Link>
                  <Link to="/#hsk" onClick={() => setIsOpen(false)}>HSK 3.0</Link>
                  <div className="flex flex-col gap-3 pt-4 border-t">
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">Đăng nhập</Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-blue-600">Bắt đầu học ngay</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-brand-ink text-brand-border py-20">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-brand-primary w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl">文</div>
              <span className="text-2xl font-bold text-white tracking-tight">MandarinFlow</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs opacity-80">
              Nền tảng học tiếng Trung trực tuyến hàng đầu. Chinh phục HSK thật dễ dàng với phương pháp học hiện đại.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Khóa học</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="#" className="hover:text-brand-primary transition-colors">Giáo trình HSK</Link></li>
              <li><Link to="#" className="hover:text-brand-primary transition-colors">Từ vựng chủ đề</Link></li>
              <li><Link to="#" className="hover:text-brand-primary transition-colors">Hội thoại thực tế</Link></li>
              <li><Link to="#" className="hover:text-brand-primary transition-colors">Luyện thi HSK</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Công cụ</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="#" className="hover:text-brand-primary transition-colors">Bộ thủ Hán tự</Link></li>
              <li><Link to="#" className="hover:text-brand-primary transition-colors">Công cụ dịch</Link></li>
              <li><Link to="#" className="hover:text-brand-primary transition-colors">Luyện phát âm</Link></li>
              <li><Link to="#" className="hover:text-brand-primary transition-colors">Đọc hiểu</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Liên hệ</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-2">hihsk.com@gmail.com</li>
              <li>Hotline: 1900 1234</li>
              <li className="pt-4 flex gap-4">
                <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-brand-primary transition-all">FB</a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-rose-600 transition-all">YT</a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-brand-accent transition-all">TT</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-20 pt-8 border-t border-white/10 text-center text-xs opacity-40">
          © 2026 MandarinFlow. Tất cả quyền được bảo lưu.
        </div>
      </footer>
    </div>
  );
}
