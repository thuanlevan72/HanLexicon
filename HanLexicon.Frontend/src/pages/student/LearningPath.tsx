import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, ChevronRight, Play, CheckCircle2, Sparkles, LayoutGrid, Target, Award
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
    <div className="space-y-12 pb-20 animate-in fade-in duration-500">
      {/* Dynamic Modern Header */}
      <header className="relative p-10 md:p-16 bg-brand-ink rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-[100px] -mr-48 -mt-48 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-[80px] -ml-32 -mb-32" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <Badge className="bg-brand-primary/20 text-brand-primary border-brand-primary/30 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
               Hệ thống bài học chuẩn HSK
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase leading-none">
               Lộ trình <span className="text-brand-primary">Học tập</span>
            </h1>
            <p className="text-slate-400 font-bold text-lg max-w-lg">
              Chinh phục hàng ngàn từ vựng Hán ngữ thông qua hệ thống bài học được thiết kế khoa học.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-6">
             <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center text-white">
                <Target className="w-8 h-8 text-brand-primary mb-1" />
                <span className="text-[10px] font-black uppercase opacity-60">Mục tiêu</span>
             </div>
             <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center text-white">
                <Award className="w-8 h-8 text-brand-accent mb-1" />
                <span className="text-[10px] font-black uppercase opacity-60">Phần thưởng</span>
             </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Level Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
           <div>
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-4 mb-4 flex items-center gap-2">
                <LayoutGrid className="w-3 h-3" /> Chọn Cấp độ
             </h3>
             <div className="flex flex-col gap-3">
               {loading ? Array(4).fill(0).map((_, i) => <div key={i} className="h-20 bg-brand-highlight/10 animate-pulse rounded-3xl"></div>) : 
                 catalog.map((cat) => (
                 <button 
                   key={cat.categorySlug} 
                   onClick={() => setSelectedCat(cat.categorySlug)}
                   className={cn(
                     "group flex items-center justify-between p-6 rounded-[2rem] text-left font-black transition-all border-4 relative overflow-hidden active:scale-95",
                     selectedCat === cat.categorySlug 
                       ? "bg-white border-brand-primary text-brand-ink shadow-2xl scale-[1.02]" 
                       : "bg-brand-highlight/20 border-transparent text-slate-400 hover:bg-white hover:border-brand-highlight hover:text-brand-secondary"
                   )}
                 >
                   <div className="relative z-10 flex flex-col">
                      <span className="text-xs uppercase opacity-40 group-hover:opacity-60 transition-opacity">Cấp độ</span>
                      <span className="text-2xl tracking-tighter uppercase italic">{cat.categorySlug}</span>
                   </div>
                   <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all relative z-10",
                      selectedCat === cat.categorySlug ? "bg-brand-primary text-white shadow-lg rotate-12" : "bg-white/50 text-brand-border"
                   )}>
                      <ChevronRight className={cn("w-6 h-6", selectedCat === cat.categorySlug ? "text-white" : "text-brand-border")} />
                   </div>
                   {selectedCat === cat.categorySlug && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                   )}
                 </button>
               ))}
             </div>
           </div>

           <Card className="p-8 bg-brand-primary/10 border-brand-primary/20 rounded-[2.5rem] border-2">
              <Sparkles className="w-8 h-8 text-brand-primary mb-4" />
              <p className="font-black text-brand-ink uppercase italic text-sm leading-tight">Bạn đã sẵn sàng vượt cấp?</p>
              <p className="text-[10px] font-bold text-brand-secondary mt-2 opacity-70 uppercase tracking-wider">Học mỗi ngày 15 phút để duy trì chuỗi Streak của bạn!</p>
           </Card>
        </aside>

        {/* Lessons Grid Section */}
        <div className="lg:col-span-9">
           <AnimatePresence mode="wait">
             <motion.div 
               key={selectedCat} 
               initial={{ opacity: 0, scale: 0.98 }} 
               animate={{ opacity: 1, scale: 1 }} 
               exit={{ opacity: 0, scale: 0.98 }} 
               transition={{ duration: 0.25, ease: "easeOut" }}
               className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
             >
                {!loading && catalog.find(c => c.categorySlug === selectedCat)?.items.map((lesson: any, idx: number) => (
                   <Card 
                     key={lesson.id} 
                     className={cn(
                        "border-4 transition-all group relative overflow-hidden flex flex-col rounded-[3rem] shadow-sm hover:shadow-2xl hover:-translate-y-2",
                        lesson.isCompleted 
                           ? "bg-white border-brand-highlight" 
                           : lesson.score !== null
                           ? "bg-white border-amber-200 shadow-amber-500/5"
                           : "bg-white border-brand-border"
                     )}
                   >
                      {/* Top Accent Bar */}
                      <div className={cn(
                         "h-3 w-full",
                         lesson.isCompleted ? "bg-brand-primary" : lesson.score !== null ? "bg-amber-400" : "bg-brand-highlight"
                      )} />

                      <div className="p-10 flex-1 space-y-6">
                         <div className="flex justify-between items-start">
                            <div className={cn(
                               "w-14 h-14 rounded-[1.5rem] flex items-center justify-center font-black text-xl border-4 shadow-sm transition-transform group-hover:rotate-12",
                               lesson.isCompleted 
                                 ? "bg-brand-primary text-white border-brand-primary/20" 
                                 : "bg-brand-highlight text-brand-primary border-brand-border"
                            )}>
                               {idx + 1}
                            </div>
                            
                            {lesson.isCompleted ? (
                               <Badge className="rounded-full bg-blue-50 text-blue-600 border-2 border-blue-100 font-black italic text-[10px] uppercase px-3 py-1">
                                  <CheckCircle2 className="w-3 h-3 mr-1" /> Hoàn thành
                               </Badge>
                            ) : lesson.score !== null ? (
                               <Badge className="rounded-full bg-amber-50 text-amber-600 border-2 border-amber-100 font-black italic text-[10px] uppercase px-3 py-1">
                                  Đang học
                               </Badge>
                            ) : (
                               <Badge className="rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-100 font-black italic text-[10px] uppercase px-3 py-1">
                                  {lesson.badge || 'Lesson New'}
                               </Badge>
                            )}
                         </div>

                         <div>
                            <h3 className="text-3xl font-black text-brand-ink leading-[1.1] mb-2 group-hover:text-brand-primary transition-colors">{lesson.title}</h3>
                            <p className="text-xl font-bold text-slate-400 italic">{lesson.translation}</p>
                         </div>
                         
                         <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                            {lesson.desc || "Cùng khám phá kho từ vựng phong phú và thú vị của bài học này."}
                         </p>
                      </div>

                      <div className="p-8 pt-0">
                         <Button 
                           onClick={() => navigate(`/student/lessons/${lesson.id}`)} 
                           className={cn(
                            "w-full h-16 rounded-[2rem] font-black uppercase text-xs tracking-[0.15em] gap-3 shadow-xl transition-all active:scale-95",
                            lesson.isCompleted 
                               ? "bg-brand-ink text-white hover:bg-brand-primary" 
                               : lesson.score !== null
                               ? "bg-amber-500 text-white hover:bg-amber-600 shadow-amber-500/20"
                               : "bg-brand-primary text-white shadow-brand-primary/20 hover:scale-[1.03]"
                           )}
                         >
                            {lesson.isCompleted ? (
                               <><Sparkles className="w-4 h-4 fill-current text-brand-primary" /> Học lại ngay</>
                            ) : lesson.score !== null ? (
                               <><Play className="w-4 h-4 fill-current" /> Tiếp tục học</>
                            ) : (
                               <><Play className="w-4 h-4 fill-current" /> Bắt đầu ngay</>
                            )}
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
