import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, ChevronRight, Play, CheckCircle2, Sparkles, BookMarked
} from 'lucide-react';
import { learningService, Category } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function LearningPath() {
  const navigate = useNavigate();
  const [catalog, setCatalog] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await learningService.getLessons();
        const data = res.data || res;
        const categories = Array.isArray(data) ? data : [];
        setCatalog(categories);
        if (categories.length > 0) setSelectedCat(categories[0].categorySlug);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
      <header className="space-y-1">
        <h1 className="text-4xl font-black text-brand-ink tracking-tight flex items-center gap-3 italic uppercase">
           <BookOpen className="w-10 h-10 text-brand-primary" /> Lộ trình học tập
        </h1>
        <p className="text-brand-secondary font-bold">Khám phá và học mới hàng ngàn từ vựng Hán ngữ theo cấp độ.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3 space-y-4">
           <h3 className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em] px-2">Cấp độ HSK</h3>
           <div className="flex flex-col gap-2">
             {loading ? Array(4).fill(0).map((_, i) => <div key={i} className="h-16 bg-brand-highlight/20 animate-pulse rounded-2xl"></div>) : 
               catalog.map((cat) => (
               <button key={cat.categorySlug} onClick={() => setSelectedCat(cat.categorySlug)}
                 className={cn("flex items-center justify-between p-5 rounded-2xl text-left font-black transition-all border-2",
                   selectedCat === cat.categorySlug ? "bg-brand-ink border-brand-ink text-white shadow-lg" : "bg-white border-transparent text-brand-secondary hover:bg-brand-highlight/30")}>
                 <span>{cat.categorySlug}</span>
                 <ChevronRight className={cn("w-5 h-5", selectedCat === cat.categorySlug ? "text-brand-primary" : "text-brand-border")} />
               </button>
             ))}
           </div>
        </div>

        <div className="lg:col-span-9">
           <AnimatePresence mode="wait">
             <motion.div key={selectedCat} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {!loading && catalog.find(c => c.categorySlug === selectedCat)?.items.map((lesson: any, idx: number) => (
                   <Card key={lesson.id} className="border-brand-border bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all group border-2 hover:border-brand-primary flex flex-col">
                      <div className="p-8 flex-1 space-y-5">
                         <div className="flex justify-between items-start">
                            <div className="w-12 h-12 bg-brand-highlight rounded-2xl flex items-center justify-center font-black text-brand-primary text-lg border-2 border-brand-border shadow-sm">{idx + 1}</div>
                            <Badge variant="outline" className="rounded-full bg-emerald-50 text-emerald-600 border-emerald-100 font-black italic text-[10px] uppercase">New Lesson</Badge>
                         </div>
                         <div>
                            <h3 className="text-3xl font-black text-brand-ink leading-tight mb-1">{lesson.title}</h3>
                            <p className="text-lg font-bold text-brand-secondary italic">{lesson.translation}</p>
                         </div>
                         <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed">{lesson.desc}</p>
                      </div>
                      <div className="p-6 pt-0">
                         <Button onClick={() => navigate(`/student/lessons/${lesson.id}`)} className="w-full h-14 rounded-2xl bg-brand-primary text-white font-black uppercase text-xs tracking-widest gap-2 shadow-lg shadow-brand-primary/20">
                            <Play className="w-4 h-4 fill-current" /> Bắt đầu học ngay
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
