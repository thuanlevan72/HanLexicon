import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, Library, BookMarked, Activity, FileText, Layers, RefreshCw, ArrowUpRight, Database, Terminal, LayoutGrid, Zap, Sparkles, TrendingUp, History, ShieldCheck, ArrowRight
} from 'lucide-react';
import { adminService } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  const [overallStats, setOverallStats] = useState<any>(null);
  const [importStats, setImportStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [overallRes, importRes] = await Promise.all([
        adminService.adminGetOverallStats(),
        adminService.getImportStats()
      ]);
      if (overallRes.isSuccess) setOverallStats(overallRes.data);
      if (importRes.isSuccess) setImportStats(importRes.data);
    } catch (error) {
      console.error("Failed to fetch stats", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    { title: 'TỔNG HỌC VIÊN', value: overallStats?.totalUsers || 0, icon: Users, color: 'text-sky-500', bg: 'bg-sky-50', desc: 'Học viên đã đăng ký' },
    { title: 'BÀI HỌC', value: overallStats?.totalLessons || 0, icon: Library, color: 'text-amber-500', bg: 'bg-amber-50', desc: 'Số lượng bài giảng' },
    { title: 'TỪ VỰNG', value: overallStats?.totalVocabularies || 0, icon: BookMarked, color: 'text-indigo-500', bg: 'bg-indigo-50', desc: 'Dữ liệu Hán ngữ' },
    { title: 'DANH MỤC', value: overallStats?.totalCategories || 0, icon: Layers, color: 'text-emerald-500', bg: 'bg-emerald-50', desc: 'Cấp độ học (HSK...)' },
  ];

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-20 max-w-7xl mx-auto">
      {/* Dynamic Modern Header */}
      <header className="relative p-10 md:p-14 bg-brand-ink rounded-[3.5rem] overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-black text-white uppercase tracking-widest">Hệ thống đang hoạt động</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase leading-none">
               Quản trị <span className="text-brand-primary">Hệ thống</span>
            </h1>
            <p className="text-slate-400 font-bold text-lg max-w-lg">
               Tổng quan tình hình Leyi hôm nay. Giám sát toàn bộ dữ liệu & học viên.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
             <Button onClick={fetchStats} variant="ghost" className="h-16 w-16 p-0 rounded-2xl bg-white/5 border-2 border-white/10 text-white hover:bg-white/10 transition-all">
                <RefreshCw className={cn("w-8 h-8", loading && "animate-spin text-brand-primary")} />
             </Button>
             <div className="hidden lg:flex w-24 h-24 rounded-[2rem] bg-brand-primary/20 border-4 border-brand-primary/30 items-center justify-center rotate-6 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                <TrendingUp className="w-12 h-12 text-brand-primary" />
             </div>
          </div>
        </div>
      </header>

      {/* Main Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((card, idx) => (
          <motion.div key={card.title} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05, duration: 0.25 }}>
            <Card className="border-4 border-brand-border bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all group overflow-hidden h-full relative active:scale-95">
              <CardContent className="p-10 relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center border-4 border-white shadow-xl group-hover:rotate-12 transition-transform", card.bg)}>
                    <card.icon className={cn("w-8 h-8", card.color)} />
                  </div>
                  <div className="bg-brand-highlight/50 p-2 rounded-lg border border-brand-border">
                     <ArrowUpRight className="w-4 h-4 text-brand-secondary/40" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{card.title}</p>
                  <h3 className="text-5xl font-black text-brand-ink tracking-tighter leading-none">{loading ? "..." : card.value.toLocaleString()}</h3>
                  <div className="flex items-center gap-2 mt-4">
                     <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                     <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest opacity-60 italic">{card.desc}</p>
                  </div>
                </div>
              </CardContent>
              {/* Background Accent Icon */}
              <card.icon className={cn("absolute -bottom-10 -right-10 w-40 h-40 opacity-[0.03] group-hover:scale-125 transition-transform duration-1000", card.color)} />
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 min-h-[500px]">
        {/* Left: System Health & Activity */}
        <div className="lg:col-span-8 flex flex-col gap-8">
           <Card className="flex-1 border-4 border-brand-border bg-white rounded-[3.5rem] shadow-xl overflow-hidden flex flex-col relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-highlight/30 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
              
              <header className="p-10 border-b-4 border-brand-border bg-brand-highlight/10 flex items-center justify-between relative z-10">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-brand-ink rounded-[1.5rem] flex items-center justify-center shadow-xl rotate-3">
                       <ShieldCheck className="w-9 h-9 text-brand-primary" />
                    </div>
                    <div>
                       <h2 className="text-2xl font-black text-brand-ink uppercase italic tracking-tighter leading-none">Toàn vẹn hệ thống</h2>
                       <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mt-1.5 opacity-60">Hiệu năng & Kiểm toán Engine</p>
                    </div>
                 </div>
                 <Badge className="bg-emerald-500 text-white font-black text-[10px] px-4 py-1.5 rounded-xl border-none shadow-lg shadow-emerald-500/20">TRẠNG THÁI: TỐI ƯU</Badge>
              </header>

              <CardContent className="flex-1 p-12 flex flex-col items-center justify-center text-center space-y-8 relative z-10">
                 <div className="w-24 h-24 bg-brand-highlight rounded-[2rem] flex items-center justify-center border-4 border-brand-border relative">
                    <Activity className="w-12 h-12 text-brand-primary animate-pulse" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-ink rounded-full flex items-center justify-center text-white border-2 border-white">
                       <Zap className="w-4 h-4 fill-current text-brand-primary" />
                    </div>
                 </div>
                 <div className="space-y-3 max-w-lg mx-auto">
                    <h4 className="text-3xl font-black text-brand-ink tracking-tight leading-none uppercase italic">Sức khỏe máy chủ: Xuất sắc</h4>
                    <p className="text-lg font-bold text-slate-500 leading-relaxed italic">
                       Toàn bộ <span className="text-brand-primary px-2 py-0.5 bg-brand-highlight rounded-lg border-2 border-brand-border">{overallStats?.totalLogs || 0}</span> bản ghi hành động đã được hệ thống lưu trữ và đồng bộ hóa an toàn.
                    </p>
                 </div>
                 <div className="flex gap-4 pt-4">
                    <Button variant="outline" className="rounded-2xl h-16 px-10 font-black border-4 border-brand-border hover:bg-brand-highlight transition-all uppercase tracking-widest text-[11px] gap-3">
                       <History className="w-5 h-5 text-brand-primary" /> Lịch sử kiểm toán
                    </Button>
                    <Button className="rounded-2xl h-16 px-10 font-black bg-brand-ink text-white shadow-2xl transition-all uppercase tracking-widest text-[11px] hover:bg-brand-primary group">
                       Xem LOG chi tiết <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                 </div>
              </CardContent>
           </Card>
        </div>

        {/* Right: Data Import Monitoring */}
        <div className="lg:col-span-4">
           <Card className="h-full border-4 border-brand-border bg-brand-ink text-white rounded-[3.5rem] shadow-2xl overflow-hidden relative flex flex-col">
              <div className="absolute bottom-0 right-0 p-10 opacity-[0.05]">
                 <Database className="w-64 h-64" />
              </div>
              
              <header className="p-10 pb-0">
                 <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border-2 border-white/10 mb-6 shadow-inner">
                    <History className="w-8 h-8 text-brand-primary" />
                 </div>
                 <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none text-brand-primary">Dòng dữ liệu</h2>
                 <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2 opacity-60">Giám sát tiến trình Nhập Excel</p>
              </header>

              <CardContent className="p-10 space-y-12 flex-1 relative z-10">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-[2rem] p-8 border-2 border-white/10 shadow-inner group hover:bg-emerald-500/10 transition-colors">
                       <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-2 opacity-60">Thành công</p>
                       <p className="text-5xl font-black italic tracking-tighter">{importStats?.completed || 0}</p>
                    </div>
                    <div className="bg-white/5 rounded-[2rem] p-8 border-2 border-white/10 shadow-inner group hover:bg-rose-500/10 transition-colors">
                       <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-2 opacity-60">Thất bại</p>
                       <p className="text-5xl font-black italic tracking-tighter">{importStats?.failed || 0}</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="flex justify-between items-end px-2">
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic leading-none">Trạng thái đường truyền</p>
                          <p className="text-lg font-black uppercase tracking-tighter italic">Tải trọng xử lý</p>
                       </div>
                       <span className="text-4xl font-black text-brand-primary italic tracking-tighter">
                          {importStats?.total ? Math.round((importStats.completed / importStats.total) * 100) : 0}%
                       </span>
                    </div>
                    
                    <div className="h-6 w-full bg-white/5 rounded-full border-4 border-white/10 p-1 overflow-hidden shadow-inner">
                       <motion.div 
                         className="h-full bg-brand-primary rounded-full shadow-[0_0_20px_rgba(255,77,79,0.5)]" 
                         initial={{ width: 0 }} 
                         animate={{ width: importStats?.total ? `${(importStats.completed / importStats.total) * 100}%` : 0 }} 
                         transition={{ duration: 1, ease: "easeOut" }}
                       />
                    </div>
                    
                    <div className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/10 mt-6">
                       <div className="flex items-center gap-3">
                          <Activity className="w-5 h-5 text-amber-500" />
                          <span className="text-xs font-black uppercase tracking-tighter text-slate-400 italic">Đang chờ xử lý</span>
                       </div>
                       <Badge className="bg-amber-500 text-brand-ink font-black text-xs px-3 py-0.5 rounded-lg border-none">{importStats?.pending || 0}</Badge>
                    </div>
                 </div>
              </CardContent>
              
              <footer className="p-10 pt-0">
                 <Button onClick={() => navigate('/admin/import-jobs')} className="w-full h-16 bg-white text-brand-ink font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl hover:bg-brand-primary hover:text-white transition-all group text-xs border-4 border-white/10">
                    Bảng điều khiển <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
                 </Button>
              </footer>
           </Card>
        </div>
      </div>
    </div>
  );
}
