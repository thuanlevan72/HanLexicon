import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  RefreshCw, ChevronRight, Trophy, Sparkles, BookMarked, History, X, CheckCircle2, XCircle, Clock, Calendar, LayoutGrid, Zap
} from 'lucide-react';
import { learningService, Category } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function ReviewCenter() {
  const navigate = useNavigate();
  const [catalog, setCatalog] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  // History state
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [reviewHistory, setReviewHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [selectedAttempt, setSelectedAttempt] = useState<any>(null);

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

  const openHistory = async (lesson: any) => {
     setSelectedLesson(lesson);
     setHistoryModalOpen(true);
     setLoadingHistory(true);
     setSelectedAttempt(null);
     try {
        const res = await learningService.getReviewHistory(lesson.id);
        setReviewHistory(res.data || []);
     } catch (e) { console.error(e); }
     finally { setLoadingHistory(false); }
  };

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-500">
      {/* Dynamic Modern Header */}
      <header className="relative p-10 md:p-16 bg-brand-ink rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-[100px] -mr-48 -mt-48 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-[80px] -ml-32 -mb-32" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <Badge className="bg-brand-primary/20 text-brand-primary border-brand-primary/30 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
               Ghi nhớ từ vựng vĩnh viễn
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase leading-none">
               Trung tâm <span className="text-brand-primary">Ôn luyện</span>
            </h1>
            <p className="text-slate-400 font-bold text-lg max-w-lg">
              Luyện tập gõ phím Hán tự để khắc sâu kiến thức và theo dõi tiến độ cải thiện của bạn.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-6">
             <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center text-white">
                <Zap className="w-8 h-8 text-brand-primary mb-1" />
                <span className="text-[10px] font-black uppercase opacity-60">Phản xạ</span>
             </div>
             <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center text-white">
                <History className="w-8 h-8 text-brand-accent mb-1" />
                <span className="text-[10px] font-black uppercase opacity-60">Lịch sử</span>
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
        </aside>

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
                   <Card key={lesson.id} className="border-4 border-brand-border bg-white rounded-[3rem] shadow-sm hover:shadow-2xl transition-all group hover:-translate-y-2 flex flex-col overflow-hidden">
                      <div className="p-10 flex-1 space-y-6">
                         <div className="flex justify-between items-start">
                            <div className="w-14 h-14 bg-brand-highlight rounded-[1.5rem] flex items-center justify-center font-black text-brand-primary text-xl border-4 border-brand-border shadow-sm group-hover:rotate-12 transition-transform">{idx + 1}</div>
                            {lesson.score !== null && lesson.score !== undefined ? (
                               <div className="text-right flex flex-col items-end gap-1">
                                  <Badge className="rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-100 font-black italic text-[10px] uppercase">Luyện tập xong</Badge>
                                  <div className="text-3xl font-black text-brand-primary tracking-tighter leading-none">{lesson.score}%</div>
                               </div>
                            ) : (
                               <Badge className="rounded-full bg-amber-50 text-amber-600 border-2 border-amber-100 font-black italic text-[10px] uppercase">Sẵn sàng</Badge>
                            )}
                         </div>
                         <div>
                            <h3 className="text-3xl font-black text-brand-ink leading-[1.1] mb-2 group-hover:text-brand-primary transition-colors">{lesson.title}</h3>
                            <p className="text-xl font-bold text-slate-400 italic">{lesson.translation}</p>
                         </div>
                         <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-300 tracking-widest border-t border-brand-highlight pt-4">
                            <Zap className="w-3 h-3 text-brand-primary" /> Chế độ: Gõ phím chuẩn
                         </div>
                      </div>
                      <div className="p-8 pt-0 flex flex-col gap-3">
                         {lesson.score !== null && lesson.score !== undefined ? (
                            <div className="grid grid-cols-2 gap-3">
                               <Button onClick={() => openHistory(lesson)} variant="outline" className="h-14 rounded-2xl border-4 border-brand-border font-black uppercase text-[10px] tracking-widest gap-2 hover:bg-brand-highlight active:scale-95 transition-all">
                                  <History className="w-4 h-4" /> Lịch sử
                               </Button>
                               <Button onClick={() => navigate(`/student/lessons/${lesson.id}/review`)} className="h-14 rounded-2xl bg-brand-ink text-white font-black uppercase text-[10px] tracking-widest gap-2 shadow-xl hover:bg-brand-primary active:scale-95 transition-all">
                                  <RefreshCw className="w-4 h-4 text-brand-primary" /> Làm lại
                               </Button>
                            </div>
                         ) : (
                            <Button onClick={() => navigate(`/student/lessons/${lesson.id}/review`)} className="w-full h-16 rounded-[2rem] bg-brand-primary text-white font-black uppercase text-xs tracking-[0.15em] gap-3 shadow-xl hover:scale-[1.03] active:scale-95 transition-all">
                               <Zap className="w-5 h-5 fill-current" /> Bắt đầu luyện tập
                            </Button>
                         )}
                      </div>
                   </Card>
                ))}
             </motion.div>
           </AnimatePresence>
        </div>
      </div>

      {/* Modern Redesigned History Modal */}
      <AnimatePresence>
        {historyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setHistoryModalOpen(false)} className="absolute inset-0 bg-brand-ink/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.3, ease: "easeOut" }} className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-[4rem] border-8 border-brand-border shadow-2xl overflow-hidden flex flex-col">
              <header className="p-10 md:p-12 border-b-4 border-brand-border bg-brand-highlight/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                 <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-brand-ink rounded-[2rem] flex items-center justify-center shadow-2xl rotate-3">
                       <History className="w-10 h-10 text-brand-primary" />
                    </div>
                    <div>
                       <h2 className="text-4xl md:text-5xl font-black text-brand-ink italic uppercase tracking-tighter leading-none mb-2">Nhật ký ôn tập</h2>
                       <p className="text-brand-secondary font-bold text-xl opacity-70">{selectedLesson?.title} <span className="mx-2 opacity-30">/</span> {selectedLesson?.translation}</p>
                    </div>
                 </div>
                 <Button variant="ghost" size="icon" onClick={() => setHistoryModalOpen(false)} className="absolute top-8 right-8 md:relative md:top-0 md:right-0 rounded-full w-14 h-14 bg-white shadow-lg hover:scale-110 active:scale-95 transition-all text-brand-ink"><X className="w-8 h-8" /></Button>
              </header>

              <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
                 {/* Left side: Attempts List */}
                 <div className="w-full lg:w-[400px] border-r-4 border-brand-border overflow-y-auto p-8 bg-slate-50/50">
                    <div className="flex items-center justify-between mb-8">
                       <h4 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em]">Các lần thực hiện</h4>
                       <Badge className="bg-brand-highlight text-brand-ink border-brand-border font-black">{reviewHistory.length} lần</Badge>
                    </div>
                    <div className="space-y-4">
                       {loadingHistory ? Array(3).fill(0).map((_, i) => <div key={i} className="h-24 bg-white border-4 border-brand-border rounded-3xl animate-pulse" />) : 
                        reviewHistory.length === 0 ? (
                           <div className="text-center py-20 bg-white rounded-[3rem] border-4 border-dashed border-brand-border/40">
                              <History className="w-12 h-12 text-brand-border mx-auto mb-4 opacity-30" />
                              <p className="font-black text-slate-300 uppercase tracking-widest text-xs">Chưa có dữ liệu</p>
                           </div>
                        ) :
                        reviewHistory.map((attempt) => (
                          <button key={attempt.id} onClick={() => setSelectedAttempt(attempt)}
                             className={cn("w-full p-6 rounded-[2.5rem] border-4 text-left transition-all relative overflow-hidden group active:scale-95",
                                selectedAttempt?.id === attempt.id 
                                   ? "bg-brand-ink border-brand-ink text-white shadow-2xl scale-[1.03] z-10" 
                                   : "bg-white border-brand-border text-brand-ink hover:border-brand-primary hover:-translate-y-1")}>
                             <div className="flex justify-between items-center mb-2 relative z-10">
                                <span className={cn("font-black text-3xl italic tracking-tighter", selectedAttempt?.id === attempt.id ? "text-brand-primary" : "text-brand-ink")}>{attempt.score}%</span>
                                <div className="flex flex-col items-end">
                                   <span className={cn("text-[10px] font-black uppercase tracking-tighter", selectedAttempt?.id === attempt.id ? "text-white/40" : "text-slate-400")}>
                                      {new Date(attempt.createdAt).toLocaleDateString('vi-VN')}
                                   </span>
                                   <span className={cn("text-[10px] font-bold opacity-60", selectedAttempt?.id === attempt.id ? "text-white/60" : "text-slate-400")}>
                                      {new Date(attempt.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                                   </span>
                                </div>
                             </div>
                             <div className="flex items-center gap-3 relative z-10">
                                <div className={cn("px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest", selectedAttempt?.id === attempt.id ? "bg-white/10 text-white" : "bg-brand-highlight text-brand-secondary")}>
                                   {attempt.correctCount}/{attempt.totalQuestions} đúng
                                </div>
                                {attempt.score >= 80 && <Sparkles className="w-4 h-4 text-brand-primary animate-pulse" />}
                             </div>
                             {selectedAttempt?.id === attempt.id && (
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full -mr-16 -mt-16 blur-2xl animate-pulse" />
                             )}
                          </button>
                        ))
                       }
                    </div>
                 </div>

                 {/* Right side: Detailed View */}
                 <div className="flex-1 overflow-y-auto p-10 bg-white">
                    {!selectedAttempt ? (
                       <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-20">
                          <LayoutGrid className="w-32 h-32 text-brand-ink" />
                          <div className="space-y-2">
                             <p className="text-2xl font-black uppercase tracking-[0.2em]">Bảng chi tiết</p>
                             <p className="font-bold">Vui lòng chọn một phiên ôn tập từ danh sách bên trái</p>
                          </div>
                       </div>
                    ) : (
                       <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             <div className="md:col-span-2 flex flex-col justify-center bg-brand-highlight/20 p-8 rounded-[3rem] border-4 border-brand-border">
                                <p className="text-xs font-black uppercase text-brand-secondary tracking-[0.2em] mb-4">Phân tích kết quả</p>
                                <div className="flex items-end gap-10">
                                   <div>
                                      <p className="text-7xl font-black text-brand-ink italic tracking-tighter">{selectedAttempt.score}<span className="text-3xl text-brand-primary ml-1">%</span></p>
                                   </div>
                                   <div className="flex-1 space-y-4">
                                      <div className="h-4 bg-white rounded-full overflow-hidden border-2 border-brand-border">
                                         <motion.div initial={{ width: 0 }} animate={{ width: `${selectedAttempt.score}%` }} transition={{ duration: 0.5, ease: "easeOut" }} className="h-full bg-brand-primary" />
                                      </div>
                                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                         <span>Chính xác: {selectedAttempt.correctCount}</span>
                                         <span>Tổng số: {selectedAttempt.totalQuestions}</span>
                                      </div>
                                   </div>
                                </div>
                             </div>
                             <div className="flex flex-col items-center justify-center bg-brand-ink p-8 rounded-[3rem] text-center shadow-xl">
                                <Trophy className="w-12 h-12 text-brand-primary mb-3" />
                                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Xếp hạng</p>
                                <p className="text-2xl font-black text-white italic uppercase tracking-tighter">
                                   {selectedAttempt.score >= 90 ? "Xuất sắc" : selectedAttempt.score >= 70 ? "Khá tốt" : "Cần cố gắng"}
                                </p>
                             </div>
                          </div>

                          <div className="space-y-6">
                             <div className="flex items-center gap-3">
                                <div className="h-px flex-1 bg-brand-border" />
                                <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] italic px-4">Bảng đáp án chi tiết</h5>
                                <div className="h-px flex-1 bg-brand-border" />
                             </div>
                             
                             <div className="grid gap-6">
                                {JSON.parse(selectedAttempt.detailsJson || '[]').map((item: any, i: number) => (
                                   <motion.div 
                                      initial={{ opacity: 0, x: 10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.03, duration: 0.2 }}
                                      key={i} 
                                      className={cn("p-6 rounded-[2.5rem] border-4 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm",
                                      item.isCorrect ? "bg-emerald-50/50 border-emerald-100" : "bg-rose-50/50 border-rose-100")}
                                   >
                                      <div className="flex items-center gap-6 flex-1">
                                         <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-lg",
                                            item.isCorrect ? "bg-emerald-500 text-white" : "bg-rose-500 text-white")}>
                                            {item.isCorrect ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                                         </div>
                                         <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                               <span className="text-4xl font-black text-brand-ink tracking-tighter leading-none">{item.word}</span>
                                               <span className="px-3 py-1 bg-white rounded-lg text-xs font-black text-brand-secondary border-2 border-brand-border uppercase tracking-widest">{item.pinyin}</span>
                                            </div>
                                            <p className="text-sm font-bold text-slate-400 italic">Nghĩa: {item.meaning}</p>
                                         </div>
                                      </div>
                                      <div className="text-left md:text-right px-4 md:px-0 border-t md:border-t-0 md:border-l-4 border-brand-border/20 pt-4 md:pt-0 md:pl-10 min-w-[150px]">
                                         <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter mb-1">Kết quả nhập</p>
                                         <p className={cn("text-2xl font-black italic tracking-tight", item.isCorrect ? "text-emerald-600" : "text-rose-600")}>
                                            {item.userInput || "TRỐNG"}
                                         </p>
                                      </div>
                                   </motion.div>
                                ))}
                             </div>
                          </div>
                          
                          <div className="pt-10 flex justify-center">
                             <Button onClick={() => {
                                setHistoryModalOpen(false);
                                navigate(`/student/lessons/${selectedLesson.id}/review`);
                             }} className="h-16 px-12 rounded-[2rem] bg-brand-ink text-white font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all gap-4">
                                <Zap className="w-6 h-6 text-brand-primary" /> Luyện tập lại bài này
                             </Button>
                          </div>
                       </div>
                    )}
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
