import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User as UserIcon, Mail, Calendar, Shield, MapPin, 
  Clock, Award, BookOpen, CheckCircle2, History, ArrowLeft, RefreshCw, BookMarked,
  X, ChevronRight, XCircle, BarChart3, ListChecks, ExternalLink, Sparkles
} from 'lucide-react';
import { adminService } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { dateUtils } from '@/src/utils/formatters';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'motion/react';

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Review Detail Modal
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedAttempt, setSelectedAttempt] = useState<any>(null);

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const [userRes, statsRes]: any = await Promise.all([
        adminService.adminGetUserDetails(id),
        adminService.adminGetStudentStats(id)
      ]);
      if (userRes.isSuccess) setUser(userRes.data);
      if (statsRes.isSuccess) setStats(statsRes.data);
    } catch (error) {
      console.error("Lỗi tải chi tiết học viên:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [id]);

  const toggleStatus = async () => {
    if (!user) return;
    try {
      const res = await adminService.adminUpdateUserStatus(user.id, !user.isActive);
      if (res.isSuccess) fetchData();
    } catch (e) { console.error(e); }
  };

  const openAttemptDetail = (attempt: any) => {
     setSelectedAttempt(attempt);
     setDetailModalOpen(true);
  };

  if (loading) return <div className="p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></div>;
  if (!user) return <div className="p-20 text-center font-bold text-brand-secondary">Không tìm thấy học viên này.</div>;

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-500 max-w-[1400px] mx-auto px-4">
      {/* Header Bar */}
      <div className="bg-white border-2 border-brand-border rounded-[2rem] p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Button onClick={() => navigate('/admin/students')} variant="outline" className="h-12 w-12 rounded-xl border-2 border-brand-border hover:bg-brand-highlight transition-all">
             <ArrowLeft className="w-5 h-5 text-brand-ink" />
          </Button>
          <div className="min-w-0">
            <h1 className="text-xl font-black text-brand-ink uppercase italic truncate max-w-[200px] sm:max-w-md">
               {user.fullName}
            </h1>
            <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest flex items-center gap-2">
               <span className="text-brand-primary">@{user.username}</span> 
               <span className="opacity-30">•</span> 
               <span className="truncate">UID: {user.id}</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           <Badge className={cn("px-4 py-1.5 rounded-lg font-black text-[10px] uppercase tracking-widest border-2", 
              user.isActive ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100")}>
              {user.isActive ? "Đang hoạt động" : "Đã bị khóa"}
           </Badge>
           <Button onClick={toggleStatus} variant="ghost" size="icon" className={cn("rounded-xl w-11 h-11 border-2 transition-all", user.isActive ? "border-rose-100 text-rose-500 hover:bg-rose-50" : "border-emerald-100 text-emerald-500 hover:bg-emerald-50")}>
              {user.isActive ? <Shield className="w-5 h-5" /> : <RefreshCw className="w-5 h-5" />}
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar: Profile Summary */}
        <div className="lg:col-span-3 space-y-6">
           <Card className="border-2 border-brand-border bg-white rounded-[2.5rem] shadow-sm overflow-hidden">
             <div className="p-6 space-y-6">
                <div className="w-24 h-24 mx-auto rounded-3xl bg-brand-highlight flex items-center justify-center border-2 border-brand-border shadow-inner rotate-3 overflow-hidden">
                   <UserIcon className="w-12 h-12 text-brand-primary -rotate-3" />
                </div>
                
                <div className="space-y-2">
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] px-1">Thông tin liên hệ</p>
                   <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-brand-border/50 group hover:border-brand-primary transition-colors overflow-hidden">
                         <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                         <span className="text-[11px] font-bold text-brand-ink truncate" title={user.email}>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-brand-border/50">
                         <Calendar className="w-4 h-4 text-brand-primary shrink-0" />
                         <span className="text-[11px] font-bold text-brand-ink whitespace-nowrap">Gia nhập: {dateUtils.formatDate(user.createdAt, 'dd/MM/yyyy')}</span>
                      </div>
                   </div>
                </div>

                <div className="pt-4 border-t-2 border-dashed border-brand-border space-y-4">
                   <div className="flex justify-between items-end px-1">
                      <div>
                         <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Điểm trung bình</p>
                         <p className="text-3xl font-black text-brand-primary italic">{stats?.avgScore || 0}%</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Đã xong</p>
                         <p className="text-2xl font-black text-brand-ink">{stats?.lessonsCompleted || 0} bài</p>
                      </div>
                   </div>
                   <Progress value={stats?.avgScore || 0} className="h-2.5 bg-brand-highlight" />
                </div>
             </div>
           </Card>

           <Card className="p-5 border-2 border-brand-border bg-brand-ink rounded-[2rem] text-white shadow-lg overflow-hidden relative group">
              <Sparkles className="absolute -right-4 -top-4 w-20 h-20 text-white/5 rotate-12 group-hover:scale-125 transition-transform duration-1000" />
              <div className="relative z-10 space-y-3">
                 <div className="flex items-center gap-2 opacity-60">
                    <Clock className="w-4 h-4 text-brand-primary" />
                    <span className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap">Thời gian tích lũy</span>
                 </div>
                 <p className="text-2xl font-black italic">{Math.round((stats?.totalTimeSeconds || 0) / 60)} <small className="text-xs font-bold uppercase tracking-normal not-italic opacity-60">phút học tập</small></p>
              </div>
           </Card>
        </div>

        {/* Main Content: Tabs */}
        <div className="lg:col-span-9">
           <Tabs defaultValue="overview" className="w-full">
              <div className="flex items-center justify-between mb-6 overflow-x-auto pb-2 scrollbar-hide">
                 <TabsList className="bg-brand-highlight/30 p-1 rounded-2xl border-2 border-brand-border h-auto shrink-0">
                    <TabsTrigger value="overview" className="rounded-xl px-5 py-2.5 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-brand-primary data-[state=active]:text-white whitespace-nowrap">Tổng quan</TabsTrigger>
                    <TabsTrigger value="roadmap" className="rounded-xl px-5 py-2.5 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-brand-primary data-[state=active]:text-white whitespace-nowrap">Lộ trình</TabsTrigger>
                    <TabsTrigger value="history" className="rounded-xl px-5 py-2.5 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-brand-primary data-[state=active]:text-white whitespace-nowrap">Lịch sử</TabsTrigger>
                 </TabsList>
              </div>

              {/* TAB: OVERVIEW */}
              <TabsContent value="overview" className="space-y-6 outline-none">
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { label: 'Bài học đã mở', value: stats?.lessonsStarted || 0, icon: BookOpen, color: 'text-brand-primary' },
                      { label: 'Số lần ôn luyện', value: stats?.reviewHistory?.length || 0, icon: RefreshCw, color: 'text-sky-500' },
                      { label: 'Hoạt động cuối', value: user.lastLoginAt ? dateUtils.formatDate(user.lastLoginAt, 'dd/MM/yyyy') : 'N/A', icon: MapPin, color: 'text-rose-500' },
                    ].map((s, idx) => (
                      <Card key={idx} className="p-5 border-2 border-brand-border bg-white rounded-[2rem] shadow-sm hover:scale-[1.02] transition-all">
                         <div className="flex items-center gap-4">
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-brand-highlight/30 border border-brand-border", s.color)}>
                               <s.icon className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                               <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest whitespace-nowrap overflow-hidden text-ellipsis">{s.label}</p>
                               <p className="text-lg font-black text-brand-ink whitespace-nowrap">{s.value}</p>
                            </div>
                         </div>
                      </Card>
                    ))}
                 </div>

                 <Card className="border-2 border-brand-border bg-white rounded-[2.5rem] shadow-sm overflow-hidden">
                    <header className="p-6 border-b-2 border-brand-border bg-brand-highlight/10 flex items-center gap-3">
                       <History className="w-5 h-5 text-brand-primary" />
                       <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-ink italic">Nhật ký hoạt động mới nhất</h2>
                    </header>
                    <div className="divide-y-2 divide-brand-border">
                       {stats?.recentActivities?.length > 0 ? stats.recentActivities.map((act: any, idx: number) => (
                          <div key={idx} className="p-5 flex items-center justify-between hover:bg-brand-highlight/5 transition-colors gap-4">
                             <div className="flex items-center gap-4 min-w-0">
                                <div className="w-10 h-10 rounded-xl bg-brand-surface border-2 border-brand-border flex items-center justify-center shrink-0">
                                   <BookMarked className="w-5 h-5 text-brand-secondary" />
                                </div>
                                <div className="min-w-0">
                                   <p className="font-bold text-brand-ink truncate max-w-[200px] sm:max-w-md">{act.title}</p>
                                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">{act.activityType} • {dateUtils.formatDate(act.timestamp, 'HH:mm dd/MM/yyyy')}</p>
                                </div>
                             </div>
                             <div className="text-right shrink-0">
                                <Badge className="bg-brand-primary/10 text-brand-primary border-none font-black italic">{act.score}%</Badge>
                             </div>
                          </div>
                       )) : <div className="p-10 text-center text-brand-secondary italic font-bold">Chưa ghi nhận hoạt động nào.</div>}
                    </div>
                 </Card>
              </TabsContent>

              {/* TAB: ROADMAP (Bỏ table, dùng Flex List) */}
              <TabsContent value="roadmap" className="outline-none space-y-4">
                 <Card className="border-2 border-brand-border bg-white rounded-[2.5rem] shadow-sm overflow-hidden">
                    <header className="p-6 border-b-2 border-brand-border bg-brand-highlight/30 flex flex-wrap items-center justify-between gap-4">
                       <div className="flex items-center gap-3">
                          <BarChart3 className="w-5 h-5 text-brand-primary" />
                          <h2 className="text-sm font-black uppercase tracking-widest text-brand-ink italic">Tiến trình theo lộ trình bài học</h2>
                       </div>
                       <Badge className="bg-brand-ink text-white rounded-lg px-4 py-1 font-black text-[9px] uppercase tracking-[0.2em] whitespace-nowrap">
                          {stats?.roadmap?.length || 0} BÀI HỌC
                       </Badge>
                    </header>
                    <div className="divide-y-2 divide-brand-border">
                       {stats?.roadmap?.map((item: any) => (
                          <div key={item.lessonId} className="p-5 flex flex-wrap items-center justify-between gap-y-4 gap-x-8 hover:bg-brand-highlight/5 transition-all group">
                             <div className="flex items-center gap-4 flex-1 min-w-[280px]">
                                <Badge variant="outline" className="w-14 h-8 flex items-center justify-center shrink-0 border-2 border-brand-primary text-brand-primary font-black italic text-[10px] rounded-lg">{item.level}</Badge>
                                <div className="min-w-0">
                                   <p className="font-black text-brand-ink text-sm sm:text-base leading-tight truncate">{item.title}</p>
                                   <div className="flex items-center gap-3 mt-1.5">
                                      <div className="w-24 bg-brand-highlight h-1.5 rounded-full overflow-hidden shrink-0">
                                         <div className="h-full bg-brand-primary" style={{ width: `${item.score}%` }}></div>
                                      </div>
                                      <span className={cn("text-[9px] font-black uppercase tracking-tighter", item.isCompleted ? "text-emerald-500" : "text-brand-secondary whitespace-nowrap")}>
                                         {item.isCompleted ? "ĐÃ HOÀN THÀNH" : "ĐANG HỌC"}
                                      </span>
                                   </div>
                                </div>
                             </div>
                             <div className="flex items-center gap-8 shrink-0 ml-auto sm:ml-0">
                                <div className="text-center w-16">
                                   <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">SCORE</p>
                                   <p className="text-xl font-black text-brand-primary leading-none">{item.score}%</p>
                                </div>
                                <div className="text-right min-w-[80px]">
                                   <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">LẦN CUỐI</p>
                                   <p className="text-[10px] font-bold text-brand-secondary italic whitespace-nowrap">{item.lastPlayed ? dateUtils.formatDate(item.lastPlayed, 'dd/MM/yyyy') : '--/--'}</p>
                                </div>
                             </div>
                          </div>
                       ))}
                    </div>
                 </Card>
              </TabsContent>

              {/* TAB: HISTORY */}
              <TabsContent value="history" className="outline-none space-y-4">
                 <Card className="border-2 border-brand-border bg-white rounded-[2.5rem] shadow-sm overflow-hidden">
                    <header className="p-6 border-b-2 border-brand-border bg-brand-highlight/30 flex items-center gap-3">
                       <ListChecks className="w-5 h-5 text-brand-primary" />
                       <h2 className="text-sm font-black uppercase tracking-widest text-brand-ink italic">Nhật ký ôn luyện chi tiết</h2>
                    </header>
                    <div className="divide-y-2 divide-brand-border">
                       {stats?.reviewHistory?.length > 0 ? stats.reviewHistory.map((item: any) => (
                          <div key={item.id} className="p-6 flex flex-wrap items-center justify-between gap-4 hover:bg-brand-highlight/5 transition-all group">
                             <div className="flex items-center gap-6 min-w-0 flex-1">
                                <div className={cn(
                                   "w-14 h-14 rounded-2xl flex flex-col items-center justify-center border-2 shrink-0",
                                   item.score >= 80 ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "bg-rose-50 border-rose-200 text-rose-600"
                                )}>
                                   <span className="text-lg font-black leading-none">{item.score}%</span>
                                   <span className="text-[7px] font-black uppercase mt-1">ĐIỂM</span>
                                </div>
                                <div className="min-w-0">
                                   <h3 className="text-lg font-black text-brand-ink tracking-tight mb-1 truncate">{item.lessonTitle}</h3>
                                   <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest italic whitespace-nowrap">
                                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {dateUtils.formatDate(item.createdAt, 'HH:mm dd/MM/yyyy')}</span>
                                      <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> {item.correctCount}/{item.totalQuestions} ĐÚNG</span>
                                   </div>
                                </div>
                             </div>
                             <Button onClick={() => openAttemptDetail(item)} variant="outline" className="h-10 rounded-xl border-2 border-brand-border bg-white text-brand-ink font-black uppercase text-[9px] tracking-widest gap-2 hover:bg-brand-ink hover:text-white transition-all shrink-0 ml-auto sm:ml-0">
                                Chi tiết <ExternalLink className="w-3 h-3" />
                             </Button>
                          </div>
                       )) : <div className="p-20 text-center space-y-4 opacity-30">
                          <History className="w-16 h-16 mx-auto" />
                          <p className="font-black uppercase text-[10px] tracking-widest">Chưa có lịch sử kiểm tra</p>
                       </div>}
                    </div>
                 </Card>
              </TabsContent>
           </Tabs>
        </div>
      </div>

      {/* Detail Modal (Responsive Grid) */}
      <AnimatePresence>
        {detailModalOpen && selectedAttempt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDetailModalOpen(false)} className="absolute inset-0 bg-brand-ink/70 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 30 }} className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-[2.5rem] border-4 border-brand-border shadow-2xl overflow-hidden flex flex-col">
              <header className="p-6 sm:p-8 border-b-4 border-brand-border bg-brand-highlight/30 flex justify-between items-center">
                 <div className="min-w-0">
                    <h2 className="text-2xl sm:text-3xl font-black text-brand-ink italic uppercase tracking-tight truncate">{selectedAttempt.lessonTitle}</h2>
                    <p className="text-[10px] sm:text-xs font-black text-brand-secondary uppercase tracking-[0.2em] mt-1 italic">Kết quả kiểm tra chi tiết</p>
                 </div>
                 <Button variant="ghost" size="icon" onClick={() => setDetailModalOpen(false)} className="rounded-full w-10 h-10 hover:bg-white shrink-0"><X className="w-5 h-5" /></Button>
              </header>

              <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {JSON.parse(selectedAttempt.detailsJson || '[]').map((item: any, i: number) => (
                       <div key={i} className={cn(
                          "p-4 rounded-2xl border-2 flex items-center justify-between gap-3 transition-all bg-white",
                          item.isCorrect ? "border-emerald-100" : "border-rose-100"
                       )}>
                          <div className="flex items-center gap-3 min-w-0">
                             <div className={cn(
                                "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                                item.isCorrect ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                             )}>
                                {item.isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                             </div>
                             <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                   <span className="text-lg font-black text-brand-ink truncate">{item.word}</span>
                                   <span className="text-[10px] font-bold text-slate-400 italic shrink-0">[{item.pinyin}]</span>
                                </div>
                                <p className="text-[10px] font-bold text-brand-secondary truncate italic">Nghĩa: {item.meaning}</p>
                             </div>
                          </div>
                          <div className="text-right shrink-0">
                             <p className="text-[8px] font-black text-slate-300 uppercase tracking-tighter mb-0.5">HỌC VIÊN NHẬP</p>
                             <p className={cn("text-sm font-black italic", item.isCorrect ? "text-emerald-600" : "text-rose-600")}>
                                {item.userInput || "—"}
                             </p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <footer className="p-6 border-t-4 border-brand-border bg-white flex justify-center items-center gap-8 sm:gap-16">
                 <div className="text-center">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">TỔNG ĐIỂM</p>
                    <p className="text-3xl font-black text-brand-primary italic">{selectedAttempt.score}%</p>
                 </div>
                 <div className="w-px h-10 bg-brand-border/50 hidden sm:block"></div>
                 <div className="text-center">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">KẾT QUẢ</p>
                    <p className="text-2xl font-black text-brand-ink uppercase italic">{selectedAttempt.correctCount}<span className="text-sm opacity-30 mx-1">/</span>{selectedAttempt.totalQuestions}</p>
                 </div>
              </footer>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
