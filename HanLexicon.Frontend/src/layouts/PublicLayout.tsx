import { Outlet, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/src/context/AuthContext';
import { GraduationCap, LogIn, UserPlus, Menu, ArrowRight, MessageCircle, Youtube, X } from 'lucide-react';
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
          <Link to="/" className="flex items-center group active:scale-95 transition-all duration-300 ease-out">
            <img src="/images/logo/2.png" alt="Tiếng Trung Leyi" className="h-16 w-auto group-hover:scale-105 transition-transform duration-300" />
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
                  <Button className="bg-gradient-to-r from-brand-accent-dark via-brand-accent to-brand-accent-light hover:opacity-90 text-white rounded-xl px-6 shadow-sm font-bold border-0 hover:-translate-y-0.5 transition-all">
                    {t('nav.login')}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Nav */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger render={(triggerProps) => (
                <Button variant="ghost" size="icon" className="h-10 w-10" {...triggerProps}>
                  <Menu className="w-6 h-6" />
                </Button>
              )} />
              <SheetContent side="right" className="w-full sm:w-[350px] p-0 border-l border-brand-border">
                <div className="flex flex-col h-full bg-white">
                  <div className="p-6 border-b border-brand-border flex items-center justify-between">
                    <span className="text-xl font-bold tracking-tight text-brand-ink">Menu</span>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="w-6 h-6" />
                    </Button>
                  </div>
                  
                  <nav className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto">
                    <Link 
                      to="/" 
                      onClick={() => setIsOpen(false)} 
                      className="flex items-center justify-between p-4 rounded-2xl bg-brand-highlight/30 text-brand-ink font-bold text-lg"
                    >
                      {t('nav.home')}
                      <ArrowRight className="w-5 h-5 text-brand-primary" />
                    </Link>
                    <Link 
                      to="/#courses" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between p-4 rounded-2xl border border-brand-border text-brand-secondary font-bold"
                    >
                      {t('nav.courses')}
                      <ArrowRight className="w-5 h-5 opacity-30" />
                    </Link>
                    <Link 
                      to="/#tools" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between p-4 rounded-2xl border border-brand-border text-brand-secondary font-bold"
                    >
                      {t('nav.tools')}
                      <ArrowRight className="w-5 h-5 opacity-30" />
                    </Link>
                    <Link 
                      to="/#hsk" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between p-4 rounded-2xl border border-brand-border text-brand-secondary font-bold"
                    >
                      {t('nav.hsk')}
                      <ArrowRight className="w-5 h-5 opacity-30" />
                    </Link>
                  </nav>

                  <div className="p-6 border-t border-brand-border flex flex-col gap-3 bg-brand-surface/30">
                    {user ? (
                      <>
                        <Link to={user.role === 'admin' ? '/admin' : '/student'} onClick={() => setIsOpen(false)}>
                          <Button className="w-full h-14 rounded-2xl font-black text-lg">Dashboard</Button>
                        </Link>
                        <Button variant="outline" onClick={() => { logout(); setIsOpen(false); }} className="w-full h-14 rounded-2xl border-brand-border font-bold">Đăng xuất</Button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                          <Button className="w-full h-14 bg-gradient-to-r from-brand-accent-dark via-brand-accent to-brand-accent-light hover:opacity-90 border-0 text-white font-black text-lg rounded-2xl shadow-xl shadow-brand-accent/20">
                             {t('nav.login')}
                          </Button>
                        </Link>
                      </>
                    )}
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
              <img src="/images/logo/logo-transparent.png" alt="Tiếng Trung Leyi" className="h-12 w-auto" />
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

