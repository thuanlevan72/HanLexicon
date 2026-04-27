import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/src/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Flame, BookOpen, Target, Clock, Play, Award, ChevronRight, LayoutGrid, CheckCircle2, Sparkles, BookMarked, RefreshCw, Pencil
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
    { label: 'Bài học đã xong', value: stats?.lessonsCompleted || 0, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Điểm trung bình', value: `${Math.round(stats?.avgScore || 0)}%`, icon: Target, color: 'text-sky-500', bg: 'bg-sky-50' },
    { label: 'Thời gian học', value: `${Math.round((stats?.timeSpentS || 0) / 60)} phút`, icon: Clock, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Tổng điểm tích lũy', value: (stats?.totalPoints || 0).toLocaleString(), icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-brand-ink tracking-tight flex items-center gap-3">
             Chào mừng trở lại, {(user as any)?.displayName || user?.name}! <Sparkles className="w-8 h-8 text-brand-primary animate-pulse" />
          </h1>
          <p className="text-brand-secondary font-bold italic">Hôm nay bạn muốn học hay ôn luyện kiến thức cũ?</p>
        </div>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {statsList.map((stat, idx) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
            <Card className="border-brand-border bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all group overflow-hidden">
               <CardContent className="p-6 relative">
                  <div className={cn("absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 opacity-5 group-hover:scale-125 transition-transform", stat.color)}>
                     <stat.icon className="w-full h-full" />
                  </div>
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-white shadow-sm", stat.bg)}>
                     <stat.icon className={cn("w-6 h-6", stat.color)} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-black text-brand-ink mt-1">{loading ? "..." : stat.value}</p>
               </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3 space-y-6">
           <h3 className="text-xs font-black text-brand-secondary uppercase tracking-[0.2em] px-2 italic">Chọn cấp độ</h3>
           <div className="flex flex-col gap-2">
             {loading ? (
                Array(4).fill(0).map((_, i) => <div key={i} className="h-16 w-full bg-brand-highlight/20 animate-pulse rounded-2xl"></div>)
             ) : catalog.map((cat) => (
               <button
                 key={cat.categorySlug}
                 onClick={() => setSelectedCat(cat.categorySlug)}
                 className={cn(
                   "flex items-center justify-between p-5 rounded-2xl text-left font-black transition-all border-2",
                   selectedCat === cat.categorySlug 
                    ? "bg-brand-ink border-brand-ink text-white shadow-lg shadow-brand-ink/20 translate-x-2" 
                    : "bg-white border-transparent text-brand-secondary hover:bg-brand-highlight/30 hover:border-brand-border"
                 )}
               >
                 <span className="text-lg uppercase tracking-tight">{cat.categorySlug}</span>
                 <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center bg-white/10", selectedCat === cat.categorySlug ? "text-brand-primary" : "text-brand-border")}>
                    <ChevronRight className="w-5 h-5" />
                 </div>
               </button>
             ))}
           </div>
        </div>

        <div className="lg:col-span-9 space-y-6">
           <AnimatePresence mode="wait">
             <motion.div
               key={selectedCat}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.3 }}
               className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
             >
                {!loading && catalog.find(c => c.categorySlug === selectedCat)?.items.map((lesson: any, idx: number) => (
                   <Card key={lesson.id} className="border-brand-border bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all overflow-hidden group border-2 hover:border-brand-primary flex flex-col">
                      <div className="p-8 flex-1 space-y-5">
                         <div className="flex justify-between items-start">
                            <div className="w-12 h-12 bg-brand-highlight rounded-2xl flex items-center justify-center font-black text-brand-primary text-lg border-2 border-brand-border shadow-sm">
                               {idx + 1}
                            </div>
                            <Badge variant="outline" className="rounded-full bg-brand-highlight/30 text-brand-secondary border-brand-border font-black italic text-[10px] uppercase tracking-tighter">Từ vựng</Badge>
                         </div>
                         <div>
                            <h3 className="text-3xl font-black text-brand-ink leading-tight mb-1">{lesson.title}</h3>
                            <p className="text-lg font-bold text-brand-secondary italic">{lesson.translation}</p>
                         </div>
                         <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed">{lesson.desc}</p>
                      </div>

                      <div className="p-6 pt-0 flex gap-3">
                         <Button 
                            onClick={() => navigate(`/student/lessons/${lesson.id}`)}
                            className="flex-1 h-14 rounded-2xl bg-brand-ink text-white font-black uppercase text-xs tracking-widest gap-2 shadow-lg hover:scale-105 transition-transform"
                         >
                            <Play className="w-4 h-4 fill-current text-brand-primary" /> Học tập
                         </Button>
                         <Button 
                            onClick={() => navigate(`/student/lessons/${lesson.id}/review`)}
                            variant="outline"
                            className="flex-1 h-14 rounded-2xl border-2 border-brand-border font-black uppercase text-xs tracking-widest gap-2 hover:bg-brand-highlight transition-all"
                         >
                            <RefreshCw className="w-4 h-4 text-brand-primary" /> Ôn luyện
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
