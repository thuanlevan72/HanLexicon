
import { useState, useEffect } from 'react';
import { LearningHistory } from '@/src/services/api';
import { useAuth } from '@/src/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, BookOpen, Trophy, FileText, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function HistoryPage() {
  const { user } = useAuth();
  const [history, setHistory] = useState<LearningHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = () => {
      if (user) {
        setHistory([
          { id: '1', lessonId: '1', lessonName: 'Bài 1: Xin chào', score: 90, totalQuizzes: 10, completedAt: new Date().toISOString(), type: 'quiz', timestamp: new Date().toISOString(), content: 'Bài 1 Quiz' },
          { id: '2', lessonId: '2', lessonName: 'Từ vựng bài 1', score: 100, totalQuizzes: 5, completedAt: new Date().toISOString(), type: 'word', timestamp: new Date().toISOString(), content: 'Hoàn thành từ vựng Unit 1' }
        ] as any);
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'word': return BookOpen;
      case 'lesson': return FileText;
      case 'quiz': return Trophy;
      default: return Calendar;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'word': return 'bg-brand-primary/10 text-brand-primary border-brand-primary/20';
      case 'lesson': return 'bg-brand-accent/10 text-brand-accent border-brand-accent/20';
      case 'quiz': return 'bg-brand-secondary/10 text-brand-secondary border-brand-secondary/20';
      default: return 'bg-brand-highlight text-brand-secondary';
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="space-y-2">
        <h1 className="text-3xl font-black text-brand-ink tracking-tight">Lịch sử học tập</h1>
        <p className="text-brand-secondary font-medium">Theo dõi hoạt động học tiếng Trung của bạn</p>
      </header>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-brand-highlight/40 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="relative space-y-4">
          {/* Timeline Linker */}
          <div className="absolute left-[2.25rem] top-8 bottom-8 w-[2px] bg-brand-border -z-0"></div>

          {history.length > 0 ? (
            history.map((item, idx) => {
              const Icon = getIcon(item.type);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="border border-brand-border bg-white shadow-sm hover:shadow-md transition-all rounded-3xl overflow-hidden group">
                    <CardContent className="p-0 flex items-center">
                      <div className="p-6 md:p-8 flex items-center gap-6 flex-1">
                        {/* Type Icon Area */}
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all group-hover:scale-110",
                          getBadgeColor(item.type)
                        )}>
                          <Icon className="w-6 h-6" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-3">
                            <Badge className={cn("rounded-full px-3 py-0.5 font-bold uppercase text-[9px] tracking-wider border", getBadgeColor(item.type))}>
                              {item.type === 'word' ? 'Học từ' : item.type === 'lesson' ? 'Bài học' : 'Bài kiểm tra'}
                            </Badge>
                            <span className="flex items-center gap-1.5 text-xs text-brand-secondary font-medium">
                              <Clock className="w-3.5 h-3.5" />
                              {format(new Date(item.timestamp), 'HH:mm, do MMMM yyyy', { locale: vi })}
                            </span>
                          </div>
                          <p className="text-lg font-bold text-brand-ink">{item.content}</p>
                          {item.score !== undefined && (
                            <p className="text-sm font-black text-emerald-600">Đạt điểm: {item.score}%</p>
                          )}
                        </div>

                        <ChevronRight className="w-6 h-6 text-brand-border group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="bg-brand-highlight w-20 h-20 rounded-full flex items-center justify-center mx-auto border border-brand-border">
                <History className="w-10 h-10 text-brand-secondary" />
              </div>
              <p className="text-brand-secondary font-medium">Bạn chưa có lịch sử học tập nào.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Utility for formatting, though I need to import it properly if I use it.
// React environment usually handles cn well.
import { cn } from '@/lib/utils';
import { History } from 'lucide-react';
