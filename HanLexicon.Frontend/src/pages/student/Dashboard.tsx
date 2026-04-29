import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/src/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Flame, BookOpen, Target, Clock, Play, Award, ChevronRight, LayoutGrid, CheckCircle2, Sparkles, BookMarked, RefreshCw, Pencil, ArrowRight
} from 'lucide-react';
import { learningService, userService, Category } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [catalog, setCatalog] = useState<Category[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, statsRes] = await Promise.all([
          learningService.getLessons(),
          userService.getStats()
        ]);
        const catsData = catsRes.data || catsRes;
        const statsData = statsRes.data || statsRes;
        
        setCatalog(Array.isArray(catsData) ? catsData : []);
        setStats(statsData);
        if (catsData.length > 0) setSelectedCat(catsData[0].categorySlug);
      } catch (e) {
        console.error("Lỗi khi tải dữ liệu dashboard", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statsList = [
    { label: 'BÀI HỌC XONG', value: stats?.lessonsCompleted || 0, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'ĐIỂM TRUNG BÌNH', value: `${Math.round(stats?.avgScore || 0)}%`, icon: Target, color: 'text-sky-500', bg: 'bg-sky-50' },
    { label: 'THỜI GIAN HỌC', value: `${Math.round((stats?.totalTimeSeconds || 0) / 60)} PHÚT`, icon: Clock, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'XP TÍCH LŨY', value: "Phát triển", icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-500">
      {/* Modern Greeting Header */}
      <header className="relative p-10 md:p-14 bg-brand-ink rounded-[3.5rem] overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">Hệ thống đang hoạt động</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none flex flex-wrap justify-center md:justify-start items-center gap-3">
                 Chào mừng, <span className="text-brand-primary truncate max-w-[400px]">{(user as any)?.displayName || user?.name}</span>!
                 <Sparkles className="w-8 h-8 text-brand-accent animate-bounce" />
              </h1>
              <p className="text-slate-400 font-bold text-lg italic max-w-lg">
                 "Mỗi ngày một chút tinh hoa, vạn dặm hành trình Hán ngữ đều bắt đầu từ bước chân này."
              </p>
           </div>
           <div className="hidden lg:block">
              <div className="w-32 h-32 rounded-[2.5rem] bg-brand-primary/20 border-4 border-brand-primary/30 flex items-center justify-center rotate-6 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                 <Award className="w-16 h-16 text-brand-primary" />
              </div>
           </div>
        </div>
      </header>

      {/* Stats Summary - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsList.map((stat, idx) => (
          <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2, delay: idx * 0.05 }}>
            <Card className="border-4 border-brand-border bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all group overflow-hidden h-full active:scale-95">
               <CardContent className="p-8 relative h-full flex flex-col justify-center">
                  <div className={cn("absolute -bottom-6 -right-6 w-24 h-24 opacity-5 group-hover:scale-150 group-hover:-rotate-12 transition-all duration-700", stat.color)}>
                     <stat.icon className="w-full h-full" />
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                     <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center border-4 border-white shadow-xl group-hover:rotate-12 transition-transform", stat.bg)}>
                        <stat.icon className={cn("w-7 h-7", stat.color)} />
                     </div>
                     <div className="flex flex-col">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                        <p className="text-3xl font-black text-brand-ink leading-none mt-1 tracking-tighter">{loading ? "..." : stat.value}</p>
                     </div>
                  </div>
               </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
        {/* Sidebar Level Selection */}
        <aside className="lg:col-span-3 space-y-6">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-4 mb-4 flex items-center gap-2 italic">
              <LayoutGrid className="w-3 h-3" /> Chọn lộ trình
           </h3>
           <div className="flex flex-col gap-3">
             {loading ? (
                Array(4).fill(0).map((_, i) => <div key={i} className="h-20 bg-brand-highlight/10 animate-pulse rounded-3xl"></div>)
             ) : catalog.map((cat) => (
               <button
                 key={cat.categorySlug}
                 onClick={() => setSelectedCat(cat.categorySlug)}
                 className={cn(
                   "group flex items-center justify-between p-6 rounded-[2rem] text-left font-black transition-all border-4 relative overflow-hidden active:scale-95",
                   selectedCat === cat.categorySlug 
                    ? "bg-brand-ink border-brand-ink text-white shadow-2xl scale-[1.02]" 
                    : "bg-white border-transparent text-brand-secondary hover:bg-brand-highlight/20 hover:border-brand-border"
                 )}
               >
                 <div className="relative z-10">
                    <p className="text-[10px] opacity-40 uppercase tracking-widest mb-0.5">HSK LEVEL</p>
                    <span className="text-2xl uppercase tracking-tighter italic">{cat.categorySlug}</span>
                 </div>
                 <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                    selectedCat === cat.categorySlug ? "bg-brand-primary text-white shadow-lg rotate-12" : "bg-brand-highlight/50 text-brand-border"
                 )}>
                    <ChevronRight className="w-5 h-5" />
                 </div>
               </button>
             ))}
           </div>
        </aside>

        {/* Lessons List Area */}
        <div className="lg:col-span-9 space-y-8">
           <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
                    <BookOpen className="w-6 h-6 text-white" />
                 </div>
                 <h2 className="text-3xl font-black text-brand-ink uppercase italic tracking-tighter">Bài học đề xuất</h2>
              </div>
              <Button variant="ghost" onClick={() => navigate('/student/learning')} className="text-brand-primary font-black uppercase text-[10px] tracking-widest gap-2 hover:bg-brand-highlight">
                 Xem tất cả <ArrowRight className="w-4 h-4" />
              </Button>
           </div>

           <AnimatePresence mode="wait">
             <motion.div
               key={selectedCat}
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.98 }}
               transition={{ duration: 0.2, ease: "easeOut" }}
               className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
             >
                {!loading && catalog.find(c => c.categorySlug === selectedCat)?.items.slice(0,6).map((lesson: any, idx: number) => (
                   <Card key={lesson.id} className="border-4 border-brand-border bg-white rounded-[3rem] shadow-sm hover:shadow-2xl transition-all group hover:-translate-y-2 flex flex-col overflow-hidden relative active:scale-95">
                      <div className="p-10 flex-1 space-y-6">
                         <div className="flex justify-between items-start">
                            <div className="w-12 h-12 bg-brand-highlight rounded-2xl flex items-center justify-center font-black text-brand-primary text-lg border-4 border-brand-border group-hover:rotate-12 transition-transform">
                               {idx + 1}
                            </div>
                            <Badge className="rounded-full bg-brand-highlight text-brand-secondary border-2 border-brand-border font-black italic text-[9px] uppercase tracking-widest px-3 py-1">TỪ VỰNG</Badge>
                         </div>
                         <div>
                            <h3 className="text-3xl font-black text-brand-ink leading-[1.1] mb-2 group-hover:text-brand-primary transition-colors truncate">{lesson.title}</h3>
                            <p className="text-xl font-bold text-slate-400 italic leading-none">{lesson.translation}</p>
                         </div>
                         <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{lesson.desc || "Cùng khám phá kiến thức thú vị của bài học này ngay thôi!"}</p>
                      </div>

                      <div className="p-8 pt-0 grid grid-cols-2 gap-3">
                         <Button 
                            onClick={() => navigate(`/student/lessons/${lesson.id}`)}
                            className="h-14 rounded-2xl bg-brand-ink text-white font-black uppercase text-[10px] tracking-widest gap-2 shadow-xl hover:bg-brand-primary active:scale-95 transition-all"
                         >
                            <Play className="w-3.5 h-3.5 fill-current text-brand-primary" /> Học
                         </Button>
                         <Button 
                            onClick={() => navigate(`/student/lessons/${lesson.id}/review`)}
                            variant="outline"
                            className="h-14 rounded-2xl border-4 border-brand-border font-black uppercase text-[10px] tracking-widest gap-2 hover:bg-brand-highlight active:scale-95 transition-all"
                         >
                            <RefreshCw className="w-3.5 h-3.5 text-brand-primary" /> Luyện
                         </Button>
                      </div>
                   </Card>
                ))}
             </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
