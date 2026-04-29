import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  History, Calendar, Trophy, ChevronRight, BookOpen, 
  CheckCircle2, XCircle, Clock, RefreshCw, Star, ArrowRight, Zap, Target, Flame
} from 'lucide-react';
import { userService } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { dateUtils } from '@/src/utils/formatters';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

export default function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [mastery, setMastery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [historyRes, statsRes, masteryRes] = await Promise.all([
        userService.getHistory(),
        userService.getStats(),
        userService.getVocabularyMastery()
      ]);
      
      if (historyRes.isSuccess) setHistory(historyRes.data);
      if (statsRes.isSuccess) setStats(statsRes.data || statsRes);
      if (masteryRes.isSuccess) setMastery(Array.isArray(masteryRes.data) ? masteryRes.data : []);
    } catch (e) {
      console.error("Lỗi tải dữ liệu lịch sử:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const statsList = [
    { label: 'BÀI HỌC', value: stats?.lessonsCompleted || 0, icon: BookOpen, color: 'text-brand-primary' },
    { label: 'ĐIỂM TB', value: `${Math.round(stats?.avgScore || 0)}%`, icon: Target, color: 'text-sky-500' },
    { label: 'TỪ VỰNG', value: mastery?.length || 0, icon: Star, color: 'text-amber-500' },
    { label: 'XP TÍCH LŨY', value: "Phát triển", icon: Flame, color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-1000">
      {/* Modern Header */}
      <header className="relative p-10 md:p-16 bg-brand-ink rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <Badge className="bg-brand-primary/20 text-brand-primary border-brand-primary/30 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
               Nhật ký học tập cá nhân
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase leading-none">
               Hành trình <span className="text-brand-primary">Chinh phục</span>
            </h1>
            <p className="text-slate-400 font-bold text-lg max-w-lg">
               Xem lại các cột mốc quan trọng và đánh giá sự tiến bộ của bạn qua từng bài học.
            </p>
          </div>
          <Button onClick={fetchData} variant="ghost" className="h-16 w-16 p-0 rounded-[2rem] bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all group">
             <RefreshCw className={cn("w-8 h-8", loading && "animate-spin text-brand-primary")} />
          </Button>
        </div>
      </header>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
         {statsList.map((s, i) => (
            <Card key={i} className="border-4 border-brand-border bg-white rounded-[2.5rem] shadow-sm overflow-hidden group">
               <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-brand-highlight/30 group-hover:rotate-12 transition-transform shadow-inner")}>
                     <s.icon className={cn("w-7 h-7", s.color)} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{s.label}</p>
                  <p className="text-3xl font-black text-brand-ink tracking-tighter italic">{loading ? "..." : s.value}</p>
               </CardContent>
            </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
        {/* Main Timeline History */}
        <div className="lg:col-span-8 space-y-8">
           <div className="flex items-center gap-4 px-4">
              <div className="w-12 h-12 bg-brand-ink rounded-2xl flex items-center justify-center shadow-lg shadow-brand-ink/20">
                 <History className="w-6 h-6 text-brand-primary" />
              </div>
              <h2 className="text-3xl font-black text-brand-ink uppercase italic tracking-tighter">Lịch sử bài học</h2>
           </div>

           {loading ? (
              <div className="space-y-6">
                 {[1, 2, 3].map(i => <div key={i} className="h-40 w-full bg-brand-highlight/10 animate-pulse rounded-[3rem]"></div>)}
              </div>
           ) : history.length === 0 ? (
              <Card className="p-20 text-center bg-white border-brand-border rounded-[3.5rem] border-dashed border-4">
                 <div className="w-24 h-24 bg-brand-highlight/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-12 h-12 text-brand-border" />
                 </div>
                 <h3 className="text-2xl font-black text-brand-ink mb-2 uppercase italic">Bảng thành tích trống</h3>
                 <p className="text-brand-secondary font-bold mb-8">Bạn chưa hoàn thành bài học nào. Bắt đầu ngay thôi!</p>
                 <Button onClick={() => navigate('/student')} className="bg-brand-primary text-white rounded-[2rem] px-12 h-16 font-black uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all">Học bài đầu tiên</Button>
              </Card>
           ) : (
              <div className="relative space-y-8">
                 {/* Better Visual Timeline Line */}
                 <div className="absolute left-10 top-0 bottom-0 w-2 bg-brand-highlight rounded-full hidden md:block"></div>
                 
                 {history.map((item, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -20 }} 
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="relative pl-0 md:pl-24"
                    >
                       {/* Timeline Marker */}
                       <div className={cn(
                         "absolute left-7 top-1/2 -translate-y-1/2 w-8 h-8 rounded-2xl border-4 border-white shadow-xl z-10 hidden md:flex items-center justify-center transition-transform hover:scale-110",
                         item.completed ? "bg-brand-primary" : "bg-brand-secondary"
                       )}>
                          {item.completed ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Clock className="w-4 h-4 text-white" />}
                       </div>

                       <Card className="border-4 border-brand-border bg-white rounded-[3rem] shadow-sm hover:shadow-2xl transition-all group overflow-hidden">
                          <CardContent className="p-0">
                             <div className="flex flex-col md:flex-row h-full">
                                <div className={cn(
                                  "md:w-32 flex flex-col items-center justify-center p-8 text-white text-center gap-1 shrink-0",
                                  item.completed ? "bg-brand-ink" : "bg-slate-400"
                                )}>
                                   <span className="text-4xl font-black italic tracking-tighter">{item.score}%</span>
                                   <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Kết quả</span>
                                </div>
                                
                                <div className="flex-1 p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                   <div className="space-y-3">
                                      <div className="flex flex-wrap items-center gap-3">
                                         <Badge className="rounded-xl bg-brand-highlight text-brand-secondary border-2 border-brand-border font-black text-[10px] px-3 py-1 uppercase tracking-widest">{item.categoryName}</Badge>
                                         <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {dateUtils.formatDate(item.lastPlayed, 'dd/MM/yyyy HH:mm')}
                                         </div>
                                      </div>
                                      <h3 className="text-3xl font-black text-brand-ink leading-tight group-hover:text-brand-primary transition-colors">{item.lessonName}</h3>
                                      <div className="flex items-center gap-6 pt-2">
                                         <div className="flex items-center gap-2 text-xs font-black uppercase text-brand-secondary tracking-tighter">
                                            <RefreshCw className="w-4 h-4 text-brand-primary" /> {item.attempts} lần thử
                                         </div>
                                         <div className={cn(
                                            "flex items-center gap-2 text-xs font-black uppercase tracking-tighter",
                                            item.completed ? "text-emerald-600" : "text-slate-400"
                                         )}>
                                            {item.completed ? <CheckCircle2 className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                                            {item.completed ? "Đã xong" : "Đang học"}
                                         </div>
                                      </div>
                                   </div>
                                   
                                   <Button 
                                     onClick={() => navigate(`/student/lessons/${item.lessonId}`)}
                                     className="rounded-[1.5rem] bg-white border-4 border-brand-border h-16 px-8 font-black uppercase text-xs tracking-widest gap-3 hover:bg-brand-highlight hover:border-brand-primary transition-all active:scale-95 shadow-lg group"
                                   >
                                      Học lại <ArrowRight className="w-5 h-5 text-brand-primary group-hover:translate-x-1 transition-transform" />
                                   </Button>
                                </div>
                             </div>
                          </CardContent>
                       </Card>
                    </motion.div>
                 ))}
              </div>
           )}
        </div>

        {/* Sidebar: Vocabulary Progress & Awards */}
        <aside className="lg:col-span-4 space-y-10">
           <div className="space-y-6">
              <div className="flex items-center gap-4 px-4">
                 <div className="w-10 h-10 bg-brand-primary/20 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-brand-primary fill-current" />
                 </div>
                 <h2 className="text-xl font-black text-brand-ink uppercase italic tracking-tighter leading-none">Chinh phục từ vựng</h2>
              </div>
              
              <Card className="border-4 border-brand-border bg-brand-ink text-white rounded-[3rem] p-10 relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/10 rounded-full -mr-24 -mt-24 blur-2xl" />
                 <div className="relative z-10 space-y-8">
                    <div className="flex items-end justify-between">
                       <div>
                          <p className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] mb-1">Tổng cộng</p>
                          <p className="text-6xl font-black italic tracking-tighter">{mastery?.length || 0}</p>
                       </div>
                       <div className="text-right">
                          <Trophy className="w-12 h-12 text-brand-primary mb-2 ml-auto" />
                          <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Từ đã thuộc</p>
                       </div>
                    </div>
                    
                    <div className="space-y-3">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-60">
                          <span>Tiến độ học tập</span>
                          <Badge variant="outline" className="text-[8px] border-white/20 text-white/50">Đang phát triển</Badge>
                       </div>
                       <div className="h-4 bg-white/10 rounded-full overflow-hidden border-2 border-white/5 p-0.5">
                          <motion.div 
                             initial={{ width: 0 }} 
                             animate={{ width: `${Math.min(100, (mastery?.length || 0) / 50 * 100)}%` }} 
                             className="h-full bg-brand-primary rounded-full" 
                          />
                       </div>
                       <p className="text-[9px] font-bold text-white/30 uppercase text-center italic">Tính năng đặt mục tiêu đang được hoàn thiện</p>
                    </div>

                    <Button variant="ghost" onClick={() => navigate('/student/vocabulary')} className="w-full h-14 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white/10">
                       Xem kho từ vựng
                    </Button>
                 </div>
              </Card>
           </div>

           <Card className="p-8 bg-brand-highlight/20 border-2 border-brand-border rounded-[2.5rem] border-dashed">
              <Zap className="w-8 h-8 text-brand-primary mb-4" />
              <h4 className="font-black text-brand-ink uppercase italic text-sm">Gợi ý cho bạn</h4>
              <p className="text-xs font-medium text-slate-500 mt-2 leading-relaxed">
                 Hãy thử ôn tập lại các bài học có điểm dưới 80% để củng cố kiến thức và tích lũy thêm điểm kinh nghiệm (XP) nhé!
              </p>
           </Card>
        </aside>
      </div>
    </div>
  );
}
