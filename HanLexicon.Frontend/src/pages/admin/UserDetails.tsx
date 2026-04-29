import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User as UserIcon, Mail, Calendar, Shield, MapPin, 
  Clock, Award, BookOpen, CheckCircle2, History, ArrowLeft, RefreshCw, BookMarked,
  X, ChevronRight, XCircle, BarChart3, ListChecks, ExternalLink, Sparkles, ShieldCheck, ShieldAlert, Zap, Target, Trophy, Flame, Activity
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
    if (!window.confirm(`Bạn có chắc muốn ${user.isActive ? 'KHOÁ' : 'MỞ KHOÁ'} tài khoản này?`)) return;
    try {
      const res = await adminService.adminUpdateUserStatus(user.id, !user.isActive);
      if (res.isSuccess) fetchData();
    } catch (e) { console.error(e); }
  };

  const openAttemptDetail = (attempt: any) => {
     setSelectedAttempt(attempt);
     setDetailModalOpen(true);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] gap-4">
       <RefreshCw className="w-12 h-12 animate-spin text-brand-primary opacity-40" />
       <p className="font-black text-brand-secondary uppercase tracking-[0.3em] text-xs">Đang tải hồ sơ...</p>
    </div>
  );
  
  if (!user) return (
    <div className="p-20 text-center flex flex-col items-center gap-6">
       <ShieldAlert className="w-20 h-20 text-rose-500" />
       <h2 className="text-3xl font-black text-brand-ink uppercase italic">Tài khoản không tồn tại</h2>
       <Button onClick={() => navigate('/admin/students')} className="bg-brand-ink text-white rounded-2xl h-14 px-8 font-black uppercase tracking-widest">Quay lại danh sách</Button>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 pb-20 max-w-7xl mx-auto">
      {/* Dynamic Header */}
      <header className="relative p-10 md:p-14 bg-brand-ink rounded-[3.5rem] overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Button onClick={() => navigate('/admin/students')} variant="ghost" className="h-16 w-16 p-0 rounded-2xl bg-white/5 border-2 border-white/10 text-white hover:bg-white/10 transition-all shrink-0">
               <ArrowLeft className="w-8 h-8" />
            </Button>
            <div className="flex items-center gap-6">
               <div className="w-24 h-24 rounded-[2rem] bg-brand-primary flex items-center justify-center border-4 border-brand-primary/20 shadow-2xl rotate-3">
                  <UserIcon className="w-12 h-12 text-white" />
               </div>
               <div className="space-y-2 text-center md:text-left min-w-0">
                  <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none truncate max-w-lg">
                    {user.fullName}
                  </h1>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                     <Badge className="bg-white/10 text-brand-primary border-none font-black text-[10px] px-3">@{user.username}</Badge>
                     <span className="text-slate-400 font-bold text-xs uppercase tracking-widest opacity-60">Gia nhập {dateUtils.formatDate(user.createdAt, 'dd/MM/yyyy')}</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
             <div className={cn(
                "px-6 py-2.5 rounded-2xl border-4 font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-lg",
                user.isActive ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border-rose-500/20 text-rose-400"
             )}>
                {user.isActive ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                {user.isActive ? "Hoạt động" : "Đã khóa"}
             </div>
             <Button onClick={toggleStatus} className={cn(
                "h-14 px-8 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl transition-all hover:scale-105 active:scale-95",
                user.isActive ? "bg-rose-600 text-white shadow-rose-600/20" : "bg-emerald-600 text-white shadow-emerald-600/20"
             )}>
                {user.isActive ? "Khoá tài khoản" : "Mở khoá ngay"}
             </Button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar: Profile Summary */}
        <div className="lg:col-span-3 space-y-8">
           <Card className="border-4 border-brand-border bg-white rounded-[3rem] shadow-sm overflow-hidden flex flex-col">
             <div className="p-8 space-y-8 flex-1">
                <div className="space-y-4">
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] px-1 italic">Thông tin liên hệ</p>
                   <div className="space-y-3">
                      <div className="p-4 rounded-2xl bg-brand-highlight/20 border-2 border-brand-border group hover:border-brand-primary transition-colors overflow-hidden">
                         <div className="flex items-center gap-3 mb-1 opacity-40">
                            <Mail className="w-3.5 h-3.5" />
                            <span className="text-[9px] font-black uppercase tracking-tighter">Email chính</span>
                         </div>
                         <p className="text-xs font-black text-brand-ink truncate">{user.email}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-brand-highlight/20 border-2 border-brand-border opacity-60">
                         <div className="flex items-center gap-3 mb-1 opacity-40">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="text-[9px] font-black uppercase tracking-tighter">Hoạt động cuối</span>
                         </div>
                         <p className="text-xs font-black text-brand-ink">{user.lastLoginAt ? dateUtils.formatDate(user.lastLoginAt, 'dd/MM/yyyy HH:mm') : 'Chưa từng'}</p>
                      </div>
                   </div>
                </div>

                <div className="pt-8 border-t-4 border-brand-highlight space-y-6">
                   <div className="flex justify-between items-end px-1">
                      <div>
                         <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Điểm trung bình</p>
                         <p className="text-5xl font-black text-brand-primary italic tracking-tighter leading-none">{stats?.avgScore || 0}%</p>
                      </div>
                   </div>
                   <div className="space-y-2 px-1">
                      <div className="flex justify-between text-[10px] font-black uppercase italic text-brand-secondary/60">
                         <span>Tiến độ học tập</span>
                         <span>{stats?.lessonsCompleted || 0} Bài học</span>
                      </div>
                      <div className="h-4 bg-brand-highlight/50 rounded-full border-2 border-brand-border p-0.5 overflow-hidden shadow-inner">
                         <motion.div initial={{ width: 0 }} animate={{ width: `${stats?.avgScore || 0}%` }} className="h-full bg-brand-primary rounded-full shadow-lg" />
                      </div>
                   </div>
                </div>
             </div>
             <div className="p-8 bg-brand-ink text-white rounded-t-[3rem] mt-auto relative overflow-hidden group">
                <Flame className="absolute -right-6 -bottom-6 w-24 h-24 text-brand-primary opacity-10 group-hover:scale-150 transition-transform duration-1000" />
                <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">Tổng thời gian học</p>
                <p className="text-3xl font-black italic text-brand-primary leading-none tracking-tighter">{Math.round((stats?.totalTimeSeconds || 0) / 60)} <span className="text-xs uppercase font-bold not-italic opacity-60 ml-1">Phút</span></p>
             </div>
           </Card>
        </div>

        {/* Main Content: Tabs */}
        <div className="lg:col-span-9 flex flex-col gap-8">
           <Tabs defaultValue="overview" className="w-full flex flex-col h-full">
              <TabsList className="bg-brand-highlight/40 p-1.5 rounded-[2rem] border-4 border-brand-border h-auto self-start mb-4">
                 <TabsTrigger value="overview" className="rounded-[1.5rem] px-8 py-3.5 font-black uppercase text-[11px] tracking-widest data-[state=active]:bg-brand-ink data-[state=active]:text-brand-primary data-[state=active]:shadow-2xl transition-all">Tổng quan</TabsTrigger>
                 <TabsTrigger value="roadmap" className="rounded-[1.5rem] px-8 py-3.5 font-black uppercase text-[11px] tracking-widest data-[state=active]:bg-brand-ink data-[state=active]:text-brand-primary data-[state=active]:shadow-2xl transition-all">Lộ trình</TabsTrigger>
                 <TabsTrigger value="history" className="rounded-[1.5rem] px-8 py-3.5 font-black uppercase text-[11px] tracking-widest data-[state=active]:bg-brand-ink data-[state=active]:text-brand-primary data-[state=active]:shadow-2xl transition-all">Lịch sử ôn tập</TabsTrigger>
              </TabsList>

              {/* TAB: OVERVIEW */}
              <TabsContent value="overview" className="space-y-8 outline-none animate-in fade-in duration-300">
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                      { label: 'BÀI HỌC ĐÃ BẮT ĐẦU', value: stats?.lessonsStarted || 0, icon: BookOpen, color: 'text-brand-primary', bg: 'bg-brand-highlight/20' },
                      { label: 'LẦN ÔN LUYỆN', value: stats?.reviewHistory?.length || 0, icon: RefreshCw, color: 'text-sky-500', bg: 'bg-sky-50' },
                      { label: 'CỘT MỐC HSK', value: stats?.lessonsCompleted > 0 ? `HSK ${Math.ceil(stats.lessonsCompleted / 10)}` : 'Sơ cấp', icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-50' },
                    ].map((s, idx) => (
                      <Card key={idx} className="p-8 border-4 border-brand-border bg-white rounded-[2.5rem] shadow-sm group hover:border-brand-primary transition-all active:scale-95">
                         <div className="flex items-center gap-6">
                            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center border-4 border-white shadow-xl group-hover:rotate-12 transition-transform shrink-0", s.bg)}>
                               <s.icon className={cn("w-8 h-8", s.color)} />
                            </div>
                            <div className="min-w-0">
                               <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{s.label}</p>
                               <p className="text-3xl font-black text-brand-ink italic tracking-tighter leading-none">{s.value}</p>
                            </div>
                         </div>
                      </Card>
                    ))}
                 </div>

                 <Card className="border-4 border-brand-border bg-white rounded-[3rem] shadow-xl overflow-hidden flex flex-col flex-1">
                    <header className="p-8 border-b-4 border-brand-border bg-brand-highlight/10 flex items-center justify-between gap-4">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-brand-ink rounded-xl flex items-center justify-center shadow-lg rotate-3">
                             <History className="w-6 h-6 text-brand-primary" />
                          </div>
                          <h2 className="text-lg font-black uppercase tracking-[0.2em] text-brand-ink italic leading-none pt-1">Dòng hoạt động học tập gần đây</h2>
                       </div>
                    </header>
                    <div className="overflow-y-auto max-h-[500px] custom-scrollbar divide-y-4 divide-brand-highlight/30">
                       {stats?.recentActivities?.length > 0 ? stats.recentActivities.map((act: any, idx: number) => (
                          <div key={idx} className="p-6 flex items-center justify-between hover:bg-brand-highlight/10 transition-colors gap-6 group">
                             <div className="flex items-center gap-6 min-w-0">
                                <div className="w-14 h-14 rounded-2xl bg-brand-highlight border-2 border-brand-border flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                                   <BookMarked className="w-7 h-7 text-brand-secondary" />
                                </div>
                                <div className="min-w-0">
                                   <p className="text-lg font-black text-brand-ink leading-tight truncate">{act.title}</p>
                                   <div className="flex items-center gap-3 mt-1.5">
                                      <Badge variant="outline" className="text-[8px] font-black uppercase py-0 px-2 border-brand-border text-brand-secondary">{act.activityType}</Badge>
                                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter italic">{dateUtils.formatDate(act.timestamp, 'HH:mm dd/MM/yyyy')}</span>
                                   </div>
                                </div>
                             </div>
                             <div className="text-right shrink-0">
                                <div className="w-16 h-10 bg-brand-ink text-brand-primary rounded-xl flex items-center justify-center font-black italic shadow-lg border-2 border-brand-primary/20">
                                   {act.score}%
                                </div>
                             </div>
                          </div>
                       )) : <div className="p-24 text-center border-t-2 border-brand-border border-dashed bg-slate-50/50">
                          <Activity className="w-12 h-12 mx-auto text-slate-200 mb-4" />
                          <p className="text-xs font-black uppercase text-slate-300 italic tracking-[0.3em]">Chưa ghi nhận hoạt động</p>
                       </div>}
                    </div>
                 </Card>
              </TabsContent>

              {/* TAB: ROADMAP */}
              <TabsContent value="roadmap" className="outline-none animate-in slide-in-from-right-4 duration-300">
                 <Card className="border-4 border-brand-border bg-white rounded-[3rem] shadow-xl overflow-hidden min-h-0 flex flex-col">
                    <header className="p-8 border-b-4 border-brand-border bg-brand-highlight/30 flex flex-wrap items-center justify-between gap-6">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg rotate-12">
                             <BarChart3 className="w-6 h-6 text-white" />
                          </div>
                          <h2 className="text-xl font-black uppercase tracking-tighter text-brand-ink italic leading-none pt-1">Bản đồ năng lực học thuật</h2>
                       </div>
                       <Badge className="bg-brand-ink text-brand-primary border-4 border-brand-primary/20 rounded-xl px-5 py-1.5 font-black text-[10px] uppercase tracking-[0.2em] shadow-xl">
                          {stats?.roadmap?.length || 0} BÀI HỌC THEO DÕI
                       </Badge>
                    </header>
                    <div className="overflow-y-auto max-h-[600px] custom-scrollbar divide-y-4 divide-brand-highlight/20">
                       {stats?.roadmap?.map((item: any, i: number) => (
                          <motion.div 
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                            key={item.lessonId} 
                            className="p-8 flex flex-wrap items-center justify-between gap-y-6 gap-x-10 hover:bg-brand-highlight/5 transition-all group"
                          >
                             <div className="flex items-center gap-8 flex-1 min-w-[300px]">
                                <div className="w-16 h-12 flex items-center justify-center shrink-0 bg-brand-ink border-4 border-brand-primary/40 text-brand-primary font-black italic text-sm rounded-2xl shadow-xl rotate-3 group-hover:rotate-0 transition-transform">
                                   {item.level}
                                </div>
                                <div className="min-w-0 flex-1">
                                   <h3 className="font-black text-brand-ink text-2xl tracking-tighter leading-none group-hover:text-brand-primary transition-colors truncate">{item.title}</h3>
                                   <div className="flex items-center gap-6 mt-3">
                                      <div className="flex-1 max-w-[200px] bg-brand-highlight/50 h-3 rounded-full overflow-hidden border-2 border-brand-border shadow-inner">
                                         <div className="h-full bg-brand-primary shadow-lg" style={{ width: `${item.score}%` }}></div>
                                      </div>
                                      <span className={cn(
                                         "text-[10px] font-black uppercase tracking-widest italic", 
                                         item.isCompleted ? "text-emerald-500" : "text-brand-secondary/40"
                                      )}>
                                         {item.isCompleted ? "HOÀN THÀNH" : "ĐANG HỌC"}
                                      </span>
                                   </div>
                                </div>
                             </div>
                             <div className="flex items-center gap-12 shrink-0 ml-auto sm:ml-0 px-6 border-l-4 border-brand-highlight/30">
                                <div className="text-center w-24">
                                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 opacity-40 italic">ĐIỂM CAO</p>
                                   <p className="text-3xl font-black text-brand-ink tracking-tighter leading-none italic">{item.score}%</p>
                                </div>
                                <div className="text-right min-w-[120px]">
                                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 opacity-40 italic">LẦN CUỐI</p>
                                   <p className="text-xs font-black text-brand-secondary uppercase tracking-tighter whitespace-nowrap">{item.lastPlayed ? dateUtils.formatDate(item.lastPlayed, 'dd/MM/yyyy') : '— — —'}</p>
                                </div>
                             </div>
                          </motion.div>
                       ))}
                    </div>
                 </Card>
              </TabsContent>

              {/* TAB: HISTORY */}
              <TabsContent value="history" className="outline-none animate-in slide-in-from-right-4 duration-300">
                 <Card className="border-4 border-brand-border bg-white rounded-[3rem] shadow-xl overflow-hidden min-h-0 flex flex-col">
                    <header className="p-8 border-b-4 border-brand-border bg-brand-highlight/30 flex items-center justify-between gap-6">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-brand-ink rounded-xl flex items-center justify-center shadow-lg rotate-3">
                             <ListChecks className="w-6 h-6 text-brand-primary" />
                          </div>
                          <h2 className="text-xl font-black uppercase tracking-tighter text-brand-ink italic leading-none pt-1">Nhật ký Hiệu suất Ôn tập Nâng cao</h2>
                       </div>
                    </header>
                    <div className="overflow-y-auto max-h-[600px] custom-scrollbar divide-y-4 divide-brand-highlight/20">
                       {stats?.reviewHistory?.length > 0 ? stats.reviewHistory.map((item: any, i: number) => (
                          <motion.div 
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                            key={item.id} 
                            className="p-8 flex flex-wrap items-center justify-between gap-8 hover:bg-brand-highlight/10 transition-all group"
                          >
                             <div className="flex items-center gap-10 min-w-0 flex-1">
                                <div className={cn(
                                   "w-20 h-20 rounded-[2rem] flex flex-col items-center justify-center border-4 shrink-0 shadow-2xl transition-transform group-hover:scale-105 active:scale-95 cursor-pointer rotate-2 group-hover:rotate-0",
                                   item.score >= 80 ? "bg-emerald-500 border-emerald-400 text-white" : "bg-rose-500 border-rose-400 text-white"
                                )} onClick={() => openAttemptDetail(item)}>
                                   <span className="text-2xl font-black leading-none italic">{item.score}%</span>
                                   <span className="text-[8px] font-black uppercase mt-1 tracking-widest opacity-60">ĐIỂM</span>
                                </div>
                                <div className="min-w-0">
                                   <h3 className="text-2xl font-black text-brand-ink tracking-tight mb-2 truncate group-hover:text-brand-primary transition-colors">{item.lessonTitle}</h3>
                                   <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-black text-slate-400 uppercase tracking-widest italic whitespace-nowrap">
                                      <span className="flex items-center gap-2 bg-brand-highlight/50 px-3 py-1 rounded-lg border border-brand-border"><Clock className="w-3.5 h-3.5" /> {dateUtils.formatDate(item.createdAt, 'HH:mm dd/MM/yyyy')}</span>
                                      <span className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg border border-emerald-100"><CheckCircle2 className="w-3.5 h-3.5" /> {item.correctCount} / {item.totalQuestions} ĐÚNG</span>
                                   </div>
                                </div>
                             </div>
                             <Button onClick={() => openAttemptDetail(item)} className="h-12 px-8 rounded-2xl bg-brand-ink text-white font-black uppercase text-[10px] tracking-widest gap-3 shadow-xl hover:bg-brand-primary active:scale-95 transition-all shrink-0 ml-auto sm:ml-0">
                                PHÂN TÍCH <ExternalLink className="w-4 h-4 text-brand-primary" />
                             </Button>
                          </motion.div>
                       )) : <div className="p-24 text-center border-t-2 border-brand-border border-dashed bg-slate-50/50 flex flex-col items-center gap-4">
                          <History className="w-16 h-16 text-slate-200" />
                          <p className="font-black uppercase text-[10px] tracking-[0.4em] text-slate-300">Không có dữ liệu</p>
                       </div>}
                    </div>
                 </Card>
              </TabsContent>
           </Tabs>
        </div>
      </div>

      {/* Detail Modal (Modern Redesigned) */}
      <AnimatePresence>
        {detailModalOpen && selectedAttempt && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDetailModalOpen(false)} className="absolute inset-0 bg-brand-ink/90 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 40 }} className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-[4rem] border-8 border-brand-border shadow-2xl overflow-hidden flex flex-col">
              <header className="p-8 sm:p-12 border-b-8 border-brand-border bg-brand-highlight/30 flex justify-between items-center gap-10">
                 <div className="flex items-center gap-8 min-w-0">
                    <div className={cn(
                       "w-24 h-24 rounded-[2.5rem] flex items-center justify-center shrink-0 shadow-2xl border-4 rotate-3",
                       selectedAttempt.score >= 80 ? "bg-emerald-500 border-emerald-400 text-white" : "bg-rose-500 border-rose-400 text-white"
                    )}>
                       <span className="text-4xl font-black italic">{selectedAttempt.score}%</span>
                    </div>
                    <div className="min-w-0">
                       <h2 className="text-3xl sm:text-5xl font-black text-brand-ink italic uppercase tracking-tighter truncate leading-none mb-2">{selectedAttempt.lessonTitle}</h2>
                       <div className="flex items-center gap-4">
                          <Badge className="bg-brand-ink text-brand-primary border-none font-black text-[10px] px-4 py-1 rounded-full uppercase tracking-widest">Phân tích Chi tiết Ôn tập</Badge>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{dateUtils.formatDate(selectedAttempt.createdAt, 'HH:mm dd/MM/yyyy')}</span>
                       </div>
                    </div>
                 </div>
                 <Button variant="ghost" size="icon" onClick={() => setDetailModalOpen(false)} className="rounded-full w-16 h-16 bg-white shadow-xl hover:scale-110 active:scale-95 transition-all text-brand-ink border-4 border-brand-border shrink-0"><X className="w-8 h-8" /></Button>
              </header>

              <div className="flex-1 overflow-y-auto p-6 sm:p-12 bg-slate-50/50 custom-scrollbar">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {JSON.parse(selectedAttempt.detailsJson || '[]').map((item: any, i: number) => (
                       <motion.div 
                          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                          key={i} 
                          className={cn(
                             "p-6 rounded-[2.5rem] border-4 flex items-center justify-between gap-6 transition-all bg-white group shadow-sm hover:shadow-xl",
                             item.isCorrect ? "border-emerald-100 hover:border-emerald-500" : "border-rose-100 hover:border-rose-500"
                          )}
                       >
                          <div className="flex items-center gap-6 min-w-0 flex-1">
                             <div className={cn(
                                "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border-2 group-hover:rotate-12 transition-transform",
                                item.isCorrect ? "bg-emerald-500 border-emerald-400 text-white" : "bg-rose-500 border-rose-400 text-white"
                             )}>
                                {item.isCorrect ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                             </div>
                             <div className="min-w-0">
                                <div className="flex items-center gap-3">
                                   <span className="text-3xl font-black text-brand-ink truncate tracking-tighter leading-none">{item.word}</span>
                                   <Badge variant="outline" className="text-[10px] font-black border-2 border-brand-border bg-brand-highlight/30 text-brand-secondary rounded-lg px-2">[{item.pinyin}]</Badge>
                                </div>
                                <p className="text-xs font-bold text-slate-400 truncate italic mt-1 leading-none">Nghĩa: {item.meaning}</p>
                             </div>
                          </div>
                          <div className="text-right shrink-0 px-6 border-l-4 border-brand-highlight/40">
                             <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1 opacity-60">NGƯỜI DÙNG NHẬP</p>
                             <p className={cn("text-2xl font-black italic tracking-tighter leading-none", item.isCorrect ? "text-emerald-600" : "text-rose-600")}>
                                {item.userInput || "— TRỐNG —"}
                             </p>
                          </div>
                       </motion.div>
                    ))}
                 </div>
              </div>

              <footer className="p-10 border-t-8 border-brand-border bg-white flex justify-center items-center gap-12 sm:gap-24 relative overflow-hidden">
                 <div className="absolute left-0 bottom-0 w-32 h-32 bg-brand-primary/5 rounded-full -ml-16 -mb-16 blur-3xl" />
                 <div className="absolute right-0 bottom-0 w-32 h-32 bg-brand-secondary/5 rounded-full -mr-16 -mb-16 blur-3xl" />
                 
                 <div className="text-center relative z-10">
                    <p className="text-[11px] font-black uppercase text-slate-400 tracking-[0.3em] mb-2 italic">Xếp loại năng lực</p>
                    <p className={cn(
                       "text-6xl font-black italic tracking-tighter leading-none",
                       selectedAttempt.score >= 90 ? "text-brand-primary" : selectedAttempt.score >= 70 ? "text-brand-ink" : "text-rose-500"
                    )}>
                       {selectedAttempt.score >= 90 ? "Xuất sắc" : selectedAttempt.score >= 70 ? "Khá tốt" : "Cần ôn lại"}
                    </p>
                 </div>
                 <div className="w-px h-16 bg-brand-border/50 hidden sm:block relative z-10"></div>
                 <div className="text-center relative z-10">
                    <p className="text-[11px] font-black uppercase text-slate-400 tracking-[0.3em] mb-2 italic">Tỷ lệ chính xác</p>
                    <p className="text-5xl font-black text-brand-ink uppercase italic leading-none tracking-tighter">
                       {selectedAttempt.correctCount}<span className="text-2xl opacity-20 mx-2">/</span>{selectedAttempt.totalQuestions}
                    </p>
                 </div>
              </footer>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d1d1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #bbbbbb; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
