import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  History, Calendar, Trophy, ChevronRight, BookOpen, 
  CheckCircle2, XCircle, Clock, RefreshCw, Star
} from 'lucide-react';
import { userService } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { dateUtils } from '@/src/utils/formatters';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await userService.getHistory();
      if (res.isSuccess) setHistory(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHistory(); }, []);

  return (
    <div className="space-y-10 pb-20 max-w-4xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-brand-ink tracking-tight uppercase italic flex items-center gap-3 font-heading">
             <History className="w-8 h-8 text-brand-primary" />
             Lịch sử học tập
          </h1>
          <p className="text-brand-secondary font-medium">Theo dõi hành trình chinh phục tiếng Trung của bạn</p>
        </div>
        <Button onClick={fetchHistory} variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-brand-highlight">
           <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
        </Button>
      </header>

      {loading ? (
         <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-32 w-full bg-brand-highlight/20 animate-pulse rounded-3xl"></div>)}
         </div>
      ) : history.length === 0 ? (
         <Card className="p-20 text-center bg-white border-brand-border rounded-[2.5rem] border-dashed border-4">
            <div className="w-20 h-20 bg-brand-highlight rounded-full flex items-center justify-center mx-auto mb-6">
               <BookOpen className="w-10 h-10 text-brand-border" />
            </div>
            <h3 className="text-xl font-bold text-brand-ink mb-2">Chưa có lịch sử học tập</h3>
            <p className="text-brand-secondary mb-8">Hãy bắt đầu bài học đầu tiên để tích lũy thành tích nhé!</p>
            <Button onClick={() => navigate('/student')} className="bg-brand-primary text-white rounded-2xl px-10 h-14 font-black shadow-lg">Vào học ngay</Button>
         </Card>
      ) : (
         <div className="relative space-y-6">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-brand-border/30 hidden md:block"></div>
            
            {history.map((item, idx) => (
               <motion.div 
                 key={idx} 
                 initial={{ opacity: 0, x: -20 }} 
                 animate={{ opacity: 1, x: 0 }} 
                 transition={{ delay: idx * 0.05 }}
                 className="relative pl-0 md:pl-20"
               >
                  {/* Timeline Dot */}
                  <div className={cn(
                    "absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4 border-white shadow-sm z-10 hidden md:block",
                    item.completed ? "bg-emerald-500" : "bg-orange-400"
                  )}></div>

                  <Card className="border border-brand-border bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all group overflow-hidden">
                     <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                           <div className={cn(
                             "md:w-32 flex flex-col items-center justify-center p-6 text-white text-center gap-1",
                             item.completed ? "bg-emerald-500" : "bg-orange-500"
                           )}>
                              <span className="text-3xl font-black">{item.score}%</span>
                              <span className="text-[10px] font-black uppercase tracking-tighter opacity-80">Chính xác</span>
                           </div>
                           
                           <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                              <div className="space-y-2">
                                 <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="rounded-lg bg-brand-highlight/50 border-brand-border text-brand-secondary font-black text-[10px] px-2 py-0.5 uppercase tracking-widest">{item.categoryName}</Badge>
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                       <Calendar className="w-3 h-3" />
                                       {dateUtils.formatDate(item.lastPlayed, 'dd/MM/yyyy HH:mm')}
                                    </div>
                                 </div>
                                 <h3 className="text-2xl font-black text-brand-ink">{item.lessonName}</h3>
                                 <div className="flex items-center gap-4 text-xs font-bold text-brand-secondary italic">
                                    <span className="flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5 text-brand-primary" /> {item.attempts} lần học</span>
                                    {item.completed ? (
                                       <span className="flex items-center gap-1.5 text-emerald-600"><CheckCircle2 className="w-3.5 h-3.5" /> Đã hoàn thành</span>
                                    ) : (
                                       <span className="flex items-center gap-1.5 text-orange-600"><XCircle className="w-3.5 h-3.5" /> Chưa đạt</span>
                                    )}
                                 </div>
                              </div>
                              
                              <Button 
                                onClick={() => navigate(`/student/lessons/${item.lessonId}`)}
                                variant="outline" 
                                className="rounded-2xl border-brand-border h-14 px-8 font-black gap-2 hover:bg-brand-highlight group-hover:border-brand-primary transition-all shadow-sm"
                              >
                                 Học lại <ChevronRight className="w-5 h-5 text-brand-primary" />
                              </Button>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </motion.div>
            ))}
         </div>
      )}

      {/* Vocabulary Mastery Section - Quick View */}
      <div className="pt-10 space-y-6">
         <h2 className="text-xl font-black text-brand-ink flex items-center gap-3 uppercase italic">
            <Star className="w-6 h-6 text-brand-highlight fill-current" /> Từ vựng đã chinh phục
         </h2>
         <Card className="border border-brand-border bg-brand-highlight/20 rounded-[2.5rem] p-10 text-center border-dashed">
            <p className="text-brand-secondary font-medium italic">Tính năng xem chi tiết bảng từ vựng đã học đang được cập nhật...</p>
         </Card>
      </div>
    </div>
  );
}

import { Badge } from '@/components/ui/badge';
