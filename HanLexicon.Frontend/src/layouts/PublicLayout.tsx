import { Outlet, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/src/context/AuthContext';
import { GraduationCap, LogIn, UserPlus, Menu, ArrowRight, MessageCircle, Youtube } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/src/components/LanguageSwitcher';

export default function PublicLayout() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-ink">
      <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group active:scale-95 transition-all duration-300 ease-out">
            <span className="text-xl font-bold tracking-tight text-brand-ink transition-colors group-hover:text-brand-primary">
              Tiếng Trung
            </span>
            <div className="bg-brand-primary w-auto px-3 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-brand-accent group-hover:rotate-3 font-heading">
              Leyi
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-brand-secondary hover:text-brand-primary transition-all duration-300 ease-out relative group">
              {t('nav.home')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>
            <Link to="/#courses" className="text-sm font-medium text-brand-secondary hover:text-brand-primary transition-all duration-300 ease-out relative group">
              {t('nav.courses')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>
            <Link to="/#tools" className="text-sm font-medium text-brand-secondary hover:text-brand-primary transition-all duration-300 ease-out relative group">
              {t('nav.tools')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>
            <Link to="/#hsk" className="text-sm font-medium text-brand-secondary hover:text-brand-primary transition-all duration-300 ease-out relative group">
              {t('nav.hsk')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
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
                    <LogIn className="w-4 h-4" /> {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-brand-accent-dark via-brand-accent to-brand-accent-light hover:opacity-90 text-white rounded-xl px-6 shadow-sm font-bold border-0 hover:-translate-y-0.5 transition-all">
                    {t('nav.start')}
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
                      <Button className="w-full bg-gradient-to-r from-brand-accent-dark via-brand-accent to-brand-accent-light hover:opacity-90 border-0 text-white font-bold">Bắt đầu học ngay</Button>
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

      <footer className="bg-brand-ink text-brand-border py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-12 relative z-10">
          <div className="space-y-6 md:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-3xl font-black text-white tracking-tight">Tiếng Trung</span>
              <div className="bg-gradient-to-br from-brand-primary to-brand-primary-light w-auto px-4 h-12 rounded-xl flex items-center justify-center text-white font-black text-2xl font-heading shadow-xl">Leyi</div>
            </div>
            <p className="text-sm leading-relaxed max-w-sm opacity-80 font-medium">
              {t('common.footerDesc')}
            </p>

            {/* In-Footer Contact Form */}
            <div className="pt-6 relative max-w-sm">
              <form className="relative bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-sm focus-within:border-brand-accent/50 focus-within:bg-white/10 transition-all duration-300 overflow-hidden">
                <input 
                  type="email" 
                  placeholder={t('common.emailPlaceHolder')}
                  className="w-full bg-transparent border-none text-brand-ink dark:text-white placeholder-white/40 h-12 pl-4 pr-32 focus:ring-0 focus:outline-none text-sm font-semibold rounded-xl autofill:bg-transparent"
                  required
                />
                <button 
                  type="submit" 
                  className="absolute right-1 top-1 bottom-1 px-4 bg-gradient-to-r from-brand-accent-dark via-brand-accent to-brand-accent-light text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-brand-accent/30 hover:-translate-y-0.5 transition-all duration-300 pointer-events-auto active:scale-95 border-0"
                >
                  {t('common.consult')}
                </button>
              </form>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs opacity-60">{t('common.explore')}</h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li><Link to="/#courses" className="hover:text-brand-accent transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> {t('nav.courses')}</Link></li>
              <li><Link to="/#tools" className="hover:text-brand-accent transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> {t('nav.tools')}</Link></li>
              <li><Link to="/login" className="hover:text-brand-accent transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> {t('nav.login')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs opacity-60">{t('common.support')}</h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li><Link to="#" className="hover:text-brand-accent transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Góc hỏi đáp</Link></li>
              <li><Link to="#" className="hover:text-brand-accent transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Hướng dẫn học</Link></li>
              <li><Link to="#" className="hover:text-brand-accent transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Đội ngũ hỗ trợ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs opacity-60">{t('common.connect')}</h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><MessageCircle className="w-4 h-4 text-brand-primary-light" /></div>
                leyihsk@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-brand-accent"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>
                0979.393.427
              </li>
              <li className="pt-4 flex gap-3">
                <a href="#" className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all outline-none text-white font-bold text-lg">FB</a>
                <a href="#" className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/20 active:scale-95 transition-all outline-none text-white font-bold text-lg"><Youtube className="w-6 h-6" /></a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-20 pt-8 border-t border-white/5 text-center text-xs font-semibold opacity-40">
          © 2026 Hệ thống Tiếng Trung Leyi. Built with Gamification. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
