import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '@/src/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Flame,
  BookOpen,
  Target,
  Clock,
  Play,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { userService, UserStats } from '@/src/services/api';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState<UserStats | null>(null);

  useEffect(() => {
    userService.getStats()
      .then(stats => setUserStats(stats))
      .catch(err => console.error("Failed to load user stats", err));
  }, []);

  const statsList = [
    { label: 'Điểm số', value: userStats?.totalPoints?.toString() || '...', icon: Flame, color: 'text-brand-primary', bg: 'bg-brand-highlight' },
    { label: 'Bài học', value: userStats?.lessonsCompleted?.toString() || '...', icon: BookOpen, color: 'text-amber-600', bg: 'bg-[#FEF3C7]' },
    { label: 'Điểm TB', value: userStats ? `${userStats.avgScore}%` : '...', icon: Target, color: 'text-brand-secondary', bg: 'bg-brand-highlight' },
    { label: 'Số giờ học', value: userStats ? (userStats.timeSpentS / 3600).toFixed(1) : '...', icon: Clock, color: 'text-purple-500', bg: 'bg-[#F5F3FF]' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-brand-ink tracking-tight">
            Chào mừng, {user?.name}! 👋
          </h1>
          <p className="text-brand-secondary font-medium">Bạn đã hoàn thành 85% mục tiêu học tập tuần này.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-brand-primary text-white border-0">Cấp độ HSK 2</Badge>
          <Badge variant="outline" className="text-brand-secondary border-brand-border bg-white">Bản miễn phí</Badge>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsList.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -4 }}
            className="transition-all"
          >
            <Card className="border border-brand-border shadow-sm overflow-hidden group bg-white rounded-2xl">
              <CardContent className="p-6 relative">
                <div className={cn("absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-10 group-hover:scale-120 transition-transform")}>
                  <stat.icon className={cn("w-full h-full", stat.color)} />
                </div>
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest leading-none">{stat.label}</p>
                <p className="text-3xl font-black text-brand-ink mt-1.5 leading-none">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main learning section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-3xl border border-brand-border shadow-sm bg-brand-highlight overflow-hidden relative group">
            <CardContent className="p-8 relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="space-y-4 flex-1 text-center md:text-left">
                <span className="inline-block px-3 py-1 bg-brand-primary text-white text-[10px] font-bold uppercase rounded-full">Tiếp tục bài học</span>
                <h3 className="text-3xl font-bold text-brand-ink">Hội thoại tại nhà hàng</h3>
                <p className="text-brand-secondary text-sm max-w-sm font-medium">Bài 14: Cách gọi món và hỏi giá tiền bằng tiếng Trung phổ thông.</p>
                <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                  <Button className="bg-brand-ink text-white hover:bg-black rounded-xl px-8 font-bold h-12 shadow-sm flex items-center gap-2">
                    Bắt đầu ngay <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="w-40 h-40 bg-white/50 rounded-2xl border border-white flex flex-col items-center justify-center space-y-2 shrink-0 shadow-sm">
                <span className="text-6xl">🍜</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-brand-ink flex items-center gap-2">
              <Award className="w-6 h-6 text-brand-primary" /> Thành tựu mới nhất
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="border-brand-border bg-white rounded-2xl p-4 flex gap-4 items-center shadow-sm">
                <div className="w-12 h-12 bg-brand-highlight rounded-full flex items-center justify-center shrink-0">🏆</div>
                <div>
                  <p className="font-bold text-brand-ink">Chiến thần học tập</p>
                  <p className="text-xs text-brand-secondary">Học liên tiếp 7 ngày</p>
                </div>
              </Card>
              <Card className="border-brand-border bg-white rounded-2xl p-4 flex gap-4 items-center shadow-sm">
                <div className="w-12 h-12 bg-brand-highlight rounded-full flex items-center justify-center shrink-0">🔝</div>
                <div>
                  <p className="font-bold text-brand-ink">Vua từ vựng</p>
                  <p className="text-xs text-brand-secondary">Ghi nhớ 100 từ vựng HSK 1</p>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Sidebar widgets */}
        <div className="space-y-8">
          <Card className="bg-white border border-brand-border shadow-sm rounded-3xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between text-brand-ink">
                Mục tiêu hôm nay
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-brand-secondary">Học từ vựng</span>
                  <span className="text-brand-ink">15/20</span>
                </div>
                <div className="w-full h-2 bg-brand-highlight rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[75%] transition-all"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-brand-secondary">Học ngữ pháp</span>
                  <span className="text-brand-ink">1/2</span>
                </div>
                <div className="w-full h-2 bg-brand-highlight rounded-full overflow-hidden">
                  <div className="bg-brand-primary h-full w-[50%] transition-all"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-brand-secondary">Luyện nghe</span>
                  <span className="text-brand-ink">0/15p</span>
                </div>
                <div className="w-full h-2 bg-brand-highlight rounded-full overflow-hidden">
                  <div className="bg-brand-border h-full w-0 transition-all"></div>
                </div>
              </div>
              <Button variant="outline" className="w-full font-bold text-brand-secondary border-brand-border hover:bg-brand-highlight rounded-xl">Thay đổi mục tiêu</Button>
            </CardContent>
          </Card>

          <Card className="bg-white border border-brand-border shadow-sm rounded-3xl text-center p-8">
            <h3 className="text-xs font-bold text-brand-secondary uppercase mb-6 tracking-widest">Hán Tự Mỗi Ngày</h3>
            <div className="text-7xl mb-4 font-serif text-brand-ink">學</div>
            <p className="text-xl font-bold text-brand-ink">xué</p>
            <p className="text-brand-secondary italic text-sm">Học / Học tập</p>
            <div className="mt-8 pt-6 border-t border-dashed border-brand-border">
              <p className="text-xs font-medium text-brand-primary">3 từ liên quan đã sẵn sàng</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
