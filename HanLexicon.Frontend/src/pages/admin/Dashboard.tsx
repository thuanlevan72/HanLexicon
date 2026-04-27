import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, Library, BookMarked, Activity, FileText, Layers, RefreshCw, ArrowUpRight, Database, Terminal
} from 'lucide-react';
import { adminService } from '@/src/services/api';
import { cn } from '@/lib/utils';

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
    <div className="space-y-10 animate-in fade-in duration-500 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-brand-ink tracking-tight uppercase italic font-heading">Dashboard Quản Trị</h1>
          <p className="text-brand-secondary font-medium italic">Tổng quan tình hình hệ thống Leyi hôm nay.</p>
        </div>
        <Button onClick={fetchStats} variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-brand-highlight">
           <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
        </Button>
      </header>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="border-brand-border bg-white rounded-[2rem] shadow-xl overflow-hidden hover:shadow-2xl transition-all group">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className={cn("p-4 rounded-2xl transition-all group-hover:scale-110", card.bg, card.color)}>
                    <card.icon className="w-8 h-8" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-brand-primary transition-colors" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{card.title}</p>
                  <h3 className="text-4xl font-black text-brand-ink font-heading">{loading ? "..." : card.value.toLocaleString()}</h3>
                  <p className="text-xs font-medium text-brand-secondary italic">{card.desc}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Import Stats Card */}
        <Card className="lg:col-span-1 border-brand-border bg-brand-ink text-white rounded-[2.5rem] shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <Database className="w-32 h-32" />
          </div>
          <CardHeader className="p-8">
            <CardTitle className="text-xl font-black uppercase italic tracking-wider text-brand-primary">Thống kê Import</CardTitle>
            <CardDescription className="text-slate-400 font-medium italic">Tình trạng nạp dữ liệu Excel</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-6">
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                   <p className="text-[10px] font-black text-brand-primary uppercase mb-1">Thành công</p>
                   <p className="text-2xl font-black">{importStats?.completed || 0}</p>
                </div>
                <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                   <p className="text-[10px] font-black text-rose-400 uppercase mb-1">Thất bại</p>
                   <p className="text-2xl font-black">{importStats?.failed || 0}</p>
                </div>
             </div>
             <div className="space-y-4">
                <div className="flex justify-between items-center px-2">
                   <span className="text-sm font-bold text-slate-400">Đang chờ xử lý:</span>
                   <span className="text-lg font-black text-brand-primary">{importStats?.pending || 0}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     className="h-full bg-brand-primary" 
                     initial={{ width: 0 }} 
                     animate={{ width: importStats?.total ? `${(importStats.completed / importStats.total) * 100}%` : 0 }} 
                   />
                </div>
                <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest">Tỉ lệ hoàn thành: {importStats?.total ? Math.round((importStats.completed / importStats.total) * 100) : 0}%</p>
             </div>
          </CardContent>
        </Card>

        {/* System Activity Summary */}
        <Card className="lg:col-span-2 border-brand-border bg-white rounded-[2.5rem] shadow-xl overflow-hidden">
          <CardHeader className="p-8 border-b border-brand-border bg-brand-highlight/10 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-black uppercase italic tracking-wider text-brand-ink">Hoạt động hệ thống</CardTitle>
              <CardDescription className="text-slate-500 font-medium italic">Tổng hợp log và truy vấn</CardDescription>
            </div>
            <Terminal className="w-6 h-6 text-brand-primary" />
          </CardHeader>
          <CardContent className="p-10 flex flex-col items-center justify-center min-h-[300px] text-center space-y-6">
             <div className="w-20 h-20 bg-brand-highlight rounded-3xl flex items-center justify-center border-2 border-brand-border">
                <Activity className="w-10 h-10 text-brand-primary" />
             </div>
             <div className="space-y-2">
                <h4 className="text-2xl font-black text-brand-ink">Sức khỏe máy chủ: Tốt</h4>
                <p className="text-brand-secondary font-medium italic">Toàn bộ {overallStats?.totalLogs || 0} bản ghi log đã được lưu trữ an toàn trong Database.</p>
             </div>
             <Button variant="outline" className="rounded-2xl h-12 px-8 font-black border-brand-border hover:bg-brand-highlight transition-all">XEM LOG CHI TIẾT</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
