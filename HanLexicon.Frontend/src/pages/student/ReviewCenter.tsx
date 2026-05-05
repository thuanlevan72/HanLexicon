import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  RefreshCw, ChevronRight, Trophy, Sparkles, BookMarked, History, X, CheckCircle2, XCircle, Clock, Calendar
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
      } catch (e) { logger.error("Lỗi tải danh mục ôn tập", e); }
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
     } catch (e) { logger.error("Lỗi tải lịch sử bài thi", e); }
     finally { setLoadingHistory(false); }
  };

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
      {/* ... (phần header và catalog giữ nguyên) */}
      <header className="space-y-1">
        <h1 className="text-4xl font-black text-brand-ink tracking-tight flex items-center gap-3 italic uppercase">
           <Trophy className="w-10 h-10 text-brand-primary" /> Phòng thi & Kiểm tra
        </h1>
        <p className="text-brand-secondary font-bold">Thực hiện các bài thi gõ phím Hán tự để đánh giá năng lực của bạn.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3 space-y-4">
           <h3 className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em] px-2">Cấp độ HSK</h3>
           <div className="flex flex-col gap-2">
             {loading ? Array(4).fill(0).map((_, i) => <div key={i} className="h-16 bg-brand-highlight/20 animate-pulse rounded-2xl"></div>) : 
               catalog.map((cat) => (
               <button key={cat.categorySlug} onClick={() => setSelectedCat(cat.categorySlug)}
                 className={cn("flex items-center justify-between p-5 rounded-2xl text-left font-black transition-all border-2",
                   selectedCat === cat.categorySlug ? "bg-brand-primary border-brand-primary text-white shadow-lg" : "bg-white border-transparent text-brand-secondary hover:bg-brand-highlight/30")}>
                 <span>{cat.categorySlug}</span>
                 <ChevronRight className={cn("w-5 h-5", selectedCat === cat.categorySlug ? "text-white" : "text-brand-border")} />
               </button>
             ))}
           </div>
        </div>

        <div className="lg:col-span-9">
           <AnimatePresence mode="wait">
             <motion.div key={selectedCat} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-4">
                {!loading && catalog.find(c => c.categorySlug === selectedCat)?.items.map((lesson: any, idx: number) => (
                   <div key={lesson.id} className="bg-white border-2 border-brand-border rounded-[2rem] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow-lg hover:border-brand-primary transition-all group">
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-brand-highlight rounded-2xl flex items-center justify-center font-black text-brand-primary text-2xl border-2 border-brand-border shadow-sm shrink-0">
                            {idx + 1}
                         </div>
                         <div>
                            <div className="flex items-center gap-3 mb-1">
                               <h3 className="text-2xl font-black text-brand-ink leading-tight">{lesson.title}</h3>
                               {lesson.score !== null && lesson.score !== undefined ? (
                                   <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-black italic text-[9px] uppercase px-2 py-0.5 border-0">Đã Thi</Badge>
                               ) : (
                                   <Badge className="bg-brand-primary hover:opacity-90 text-white font-black italic text-[9px] uppercase px-2 py-0.5 border-0">Sẵn sàng</Badge>
                               )}
                            </div>
                            <p className="text-sm font-bold text-brand-secondary italic mb-2">{lesson.translation}</p>
                            <div className="flex items-center gap-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                               <span className="flex items-center gap-1.5"><History className="w-3 h-3" /> Chế độ: Gõ phím</span>
                               {lesson.score !== null && lesson.score !== undefined && (
                                   <span className="flex items-center gap-1.5 text-brand-primary"><Trophy className="w-3 h-3" /> Điểm cao nhất: {lesson.score}%</span>
                               )}
                            </div>
                         </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 w-full md:w-auto mt-4 md:mt-0">
                         {lesson.score !== null && lesson.score !== undefined ? (
                            <>
                               <Button onClick={() => openHistory(lesson)} variant="outline" className="flex-1 md:flex-none h-12 rounded-xl border-2 border-brand-border font-black uppercase text-[10px] tracking-widest gap-2 hover:bg-brand-highlight">
                                  <History className="w-4 h-4" /> Lịch sử
                               </Button>
                               <Button onClick={() => navigate(`/student/lessons/${lesson.id}/review`)} className="flex-1 md:flex-none h-12 rounded-xl bg-brand-ink text-white font-black uppercase text-[10px] tracking-widest gap-2 shadow-md hover:scale-105 transition-all">
                                  <RefreshCw className="w-4 h-4 text-brand-primary" /> Thi Lại
                               </Button>
                            </>
                         ) : (
                            <Button onClick={() => navigate(`/student/lessons/${lesson.id}/review`)} className="w-full h-12 rounded-xl bg-brand-primary text-white font-black uppercase text-[10px] tracking-widest gap-2 shadow-md hover:scale-105 transition-all px-8">
                               <CheckCircle2 className="w-4 h-4" /> Bắt đầu Thi
                            </Button>
                         )}
                      </div>
                   </div>
                ))}
             </motion.div>
           </AnimatePresence>
        </div>
      </div>

      {/* Custom Modal using Framer Motion */}
      <AnimatePresence>
        {historyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setHistoryModalOpen(false)} className="absolute inset-0 bg-brand-ink/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[3rem] border-4 border-brand-border shadow-2xl overflow-hidden flex flex-col">
              <header className="p-8 border-b-4 border-brand-border bg-brand-highlight/30 flex justify-between items-center">
                 <div>
                    <h2 className="text-4xl font-black text-brand-ink italic uppercase tracking-tight">Lịch sử ôn tập</h2>
                    <p className="text-brand-secondary font-bold text-lg">{selectedLesson?.title} - {selectedLesson?.translation}</p>
                 </div>
                 <Button variant="ghost" size="icon" onClick={() => setHistoryModalOpen(false)} className="rounded-full w-12 h-12 hover:bg-white"><X className="w-6 h-6" /></Button>
              </header>

              <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                 {/* Left side: Attempts List */}
                 <div className="w-full md:w-80 border-r-4 border-brand-border overflow-y-auto p-4 bg-slate-50">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 px-2">Các lần thực hiện</h4>
                    <div className="space-y-3">
                       {loadingHistory ? Array(3).fill(0).map((_, i) => <div key={i} className="h-20 bg-white border-2 border-brand-border rounded-2xl animate-pulse" />) : 
                        reviewHistory.length === 0 ? <div className="text-center py-10 font-bold text-slate-400">Chưa có dữ liệu</div> :
                        reviewHistory.map((attempt) => (
                          <button key={attempt.id} onClick={() => setSelectedAttempt(attempt)}
                             className={cn("w-full p-4 rounded-2xl border-2 text-left transition-all",
                                selectedAttempt?.id === attempt.id ? "bg-brand-primary border-brand-primary text-white shadow-lg scale-105" : "bg-white border-brand-border text-brand-ink hover:border-brand-primary")}>
                             <div className="flex justify-between items-center mb-1">
                                <span className="font-black text-xl">{attempt.score}%</span>
                                <span className={cn("text-[10px] font-bold uppercase tracking-tighter", selectedAttempt?.id === attempt.id ? "text-white/70" : "text-slate-400")}>
                                   {new Date(attempt.createdAt).toLocaleDateString()}
                                </span>
                             </div>
                             <div className="flex items-center gap-2 text-[10px] font-bold opacity-80 italic uppercase">
                                <CheckCircle2 className="w-3 h-3" /> {attempt.correctCount}/{attempt.totalQuestions} đúng
                             </div>
                          </button>
                        ))
                       }
                    </div>
                 </div>

                 {/* Right side: Detailed View */}
                 <div className="flex-1 overflow-y-auto p-8 bg-white">
                    {!selectedAttempt ? (
                       <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                          <History className="w-20 h-20" />
                          <p className="font-black uppercase tracking-widest">Chọn một lần làm bài để xem chi tiết</p>
                       </div>
                    ) : (
                       <div className="space-y-8">
                          <div className="flex flex-wrap gap-6 items-center justify-between bg-brand-highlight/20 p-6 rounded-[2rem] border-2 border-brand-border">
                             <div className="flex gap-8">
                                <div>
                                   <p className="text-[10px] font-black uppercase text-brand-secondary tracking-widest mb-1">Kết quả</p>
                                   <p className="text-4xl font-black text-brand-primary italic">{selectedAttempt.score}%</p>
                                </div>
                                <div>
                                   <p className="text-[10px] font-black uppercase text-brand-secondary tracking-widest mb-1">Thời gian</p>
                                   <div className="flex items-center gap-2 text-xl font-black text-brand-ink italic">
                                      <Clock className="w-5 h-5 text-brand-primary" /> {new Date(selectedAttempt.createdAt).toLocaleTimeString()}
                                   </div>
                                </div>
                             </div>
                             <Button onClick={() => {
                                setHistoryModalOpen(false);
                                navigate(`/student/lessons/${selectedLesson.id}/review`);
                             }} className="rounded-2xl bg-brand-ink text-white font-black uppercase tracking-widest px-8 shadow-xl">
                                Làm lại bài này
                             </Button>
                          </div>

                          <div className="space-y-4">
                             <h5 className="text-[10px] font-black uppercase text-brand-secondary tracking-widest italic">Chi tiết đáp án</h5>
                             <div className="grid gap-4">
                                {JSON.parse(selectedAttempt.detailsJson || '[]').map((item: any, i: number) => (
                                   <div key={i} className={cn("p-5 rounded-2xl border-2 flex items-center justify-between gap-4",
                                      item.isCorrect ? "bg-emerald-50 border-emerald-100" : "bg-rose-50 border-rose-100")}>
                                      <div className="flex items-center gap-4 flex-1">
                                         <div className={cn("w-10 h-10 rounded-full flex items-center justify-center",
                                            item.isCorrect ? "bg-emerald-500 text-white" : "bg-rose-500 text-white")}>
                                            {item.isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                                         </div>
                                         <div>
                                            <div className="flex items-center gap-2">
                                               <span className="text-2xl font-black text-brand-ink">{item.word}</span>
                                               <span className="text-sm font-bold text-slate-400 italic">[{item.pinyin}]</span>
                                            </div>
                                            <p className="text-sm font-bold text-brand-secondary">Nghĩa: {item.meaning}</p>
                                         </div>
                                      </div>
                                      <div className="text-right">
                                         <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter mb-1">Bạn đã nhập</p>
                                         <p className={cn("text-xl font-black italic", item.isCorrect ? "text-emerald-600" : "text-rose-600")}>
                                            {item.userInput || "(Để trống)"}
                                         </p>
                                      </div>
                                   </div>
                                ))}
                             </div>
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


