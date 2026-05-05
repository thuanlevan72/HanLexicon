import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, Library, BookMarked, Activity, FileText, Layers, RefreshCw, ArrowUpRight, Database, Terminal
} from 'lucide-react';
import { adminService } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [overallStats, setOverallStats] = useState<any>(null);
  const [importStats, setImportStats] = useState<any>(null);
  const [growthStats, setGrowthStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async (isManual = false) => {
    if (isManual) setLoading(true);
    try {
      const [overallRes, importRes, growthRes] = await Promise.all([
        adminService.adminGetOverallStats(),
        adminService.getImportStats(),
        adminService.adminGetGrowthStats()
      ]);
      if (overallRes.isSuccess) setOverallStats(overallRes.data);
      if (importRes.isSuccess) setImportStats(importRes.data);
      if (growthRes.isSuccess) setGrowthStats(growthRes.data);
      
      if (isManual) toast.success('Dữ liệu đã được cập nhật mới nhất');
    } catch (error) {
      logger.error("Failed to fetch stats", error);
      toast.error('Lỗi khi tải dữ liệu thống kê');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    { title: 'TỔNG HỌC VIÊN', value: overallStats?.totalUsers || 0, icon: Users, color: 'text-orange-500', bg: 'bg-orange-50', desc: 'Học viên đã đăng ký' },
    { title: 'BÀI HỌC', value: overallStats?.totalLessons || 0, icon: Library, color: 'text-brand-primary', bg: 'bg-brand-highlight', desc: 'Số lượng bài giảng' },
    { title: 'TỪ VỰNG', value: overallStats?.totalVocabularies || 0, icon: BookMarked, color: 'text-rose-500', bg: 'bg-rose-50', desc: 'Dữ liệu Hán ngữ' },
    { title: 'DANH MỤC', value: overallStats?.totalCategories || 0, icon: Layers, color: 'text-emerald-500', bg: 'bg-emerald-50', desc: 'Cấp độ học (HSK...)' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-10 theme-app">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-brand-ink tracking-tight uppercase italic font-heading">Dashboard Quản Trị</h1>
          <p className="text-brand-secondary font-bold italic">Tổng quan tình hình hệ thống Leyi hôm nay.</p>
        </div>
        <Button onClick={() => fetchStats(true)} variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-brand-highlight">
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
            <Card className="border-2 border-brand-border bg-white rounded-[2.5rem] shadow-sm overflow-hidden hover:shadow-xl hover:border-brand-primary transition-all group">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className={cn("p-4 rounded-2xl transition-all group-hover:scale-110", card.bg, card.color)}>
                    <card.icon className="w-8 h-8" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-brand-primary transition-colors" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{card.title}</p>
                  <h3 className="text-4xl font-black text-brand-ink font-heading tracking-tight">{loading ? "..." : card.value.toLocaleString()}</h3>
                  <p className="text-xs font-bold text-brand-secondary italic">{card.desc}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Growth Chart */}
        <Card className="lg:col-span-2 border-2 border-brand-border bg-white rounded-[3rem] shadow-sm overflow-hidden flex flex-col">
          <CardHeader className="p-8 border-b-2 border-brand-border bg-brand-highlight/30 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-black uppercase italic tracking-wider text-brand-ink">Tăng trưởng hệ thống</CardTitle>
              <CardDescription className="text-brand-secondary font-bold italic">Thống kê tích lũy 5 tháng gần nhất</CardDescription>
            </div>
            <Users className="w-6 h-6 text-brand-primary" />
          </CardHeader>
          <CardContent className="p-8 flex-1 min-h-[350px]">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthStats}>
                   <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#E24A29" stopOpacity={0.3}/>
                         <stop offset="95%" stopColor="#E24A29" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorLessons" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                         <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                      </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E1DA" />
                   <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 'bold', fill: '#B3361B' }}
                      dy={10}
                   />
                   <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 'bold', fill: '#B3361B' }}
                   />
                   <Tooltip 
                      contentStyle={{ borderRadius: '1rem', border: '2px solid #E5E1DA', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      itemStyle={{ fontWeight: 'black', textTransform: 'uppercase', fontSize: '10px' }}
                   />
                   <Area 
                      type="monotone" 
                      dataKey="users" 
                      name="Học viên"
                      stroke="#E24A29" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorUsers)" 
                   />
                   <Area 
                      type="monotone" 
                      dataKey="lessons" 
                      name="Bài học"
                      stroke="#059669" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorLessons)" 
                   />
                </AreaChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Import Stats Card */}
        <Card className="lg:col-span-1 border-0 bg-gradient-to-br from-brand-secondary to-brand-primary text-white rounded-[3rem] shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
             <Database className="w-32 h-32" />
          </div>
          <CardHeader className="p-10 pb-4">
            <CardTitle className="text-2xl font-black uppercase italic tracking-wider text-white">Thống kê Import</CardTitle>
            <CardDescription className="text-white/70 font-bold italic">Tình trạng nạp dữ liệu Excel</CardDescription>
          </CardHeader>
          <CardContent className="p-10 pt-0 space-y-8">
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
                   <p className="text-[10px] font-black text-white/60 uppercase mb-1">Thành công</p>
                   <p className="text-3xl font-black">{importStats?.completed || 0}</p>
                </div>
                <div className="bg-rose-500/20 backdrop-blur-md rounded-3xl p-6 border border-white/20">
                   <p className="text-[10px] font-black text-rose-200 uppercase mb-1">Thất bại</p>
                   <p className="text-3xl font-black">{importStats?.failed || 0}</p>
                </div>
             </div>
             <div className="space-y-4">
                <div className="flex justify-between items-center px-2">
                   <span className="text-sm font-bold text-white/70 uppercase">Tiến độ tổng:</span>
                   <span className="text-lg font-black text-white">{importStats?.total ? Math.round((importStats.completed / importStats.total) * 100) : 0}%</span>
                </div>
                <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden border border-white/10">
                   <motion.div 
                     className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
                     initial={{ width: 0 }} 
                     animate={{ width: importStats?.total ? `${(importStats.completed / importStats.total) * 100}%` : 0 }} 
                   />
                </div>
             </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* System Activity Summary */}
        <Card className="border-2 border-brand-border bg-white rounded-[3rem] shadow-sm overflow-hidden">
          <CardHeader className="p-8 border-b-2 border-brand-border bg-brand-highlight/30 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-black uppercase italic tracking-wider text-brand-ink">Hoạt động hệ thống</CardTitle>
              <CardDescription className="text-brand-secondary font-bold italic">Tổng hợp log và truy vấn</CardDescription>
            </div>
            <Terminal className="w-8 h-8 text-brand-primary" />
          </CardHeader>
          <CardContent className="p-12 flex flex-col items-center justify-center min-h-[350px] text-center space-y-8">
             <div className="w-24 h-24 bg-brand-highlight rounded-[2rem] flex items-center justify-center border-2 border-brand-border shadow-inner rotate-3">
                <Activity className="w-12 h-12 text-brand-primary -rotate-3" />
             </div>
             <div className="space-y-3">
                <h4 className="text-3xl font-black text-brand-ink">Sức khỏe máy chủ: Ổn định</h4>
                <p className="text-brand-secondary font-bold italic text-lg">Toàn bộ {overallStats?.totalLogs || 0} bản ghi log đã được lưu trữ an toàn.</p>
             </div>
             <Button className="rounded-2xl h-16 px-10 font-black bg-brand-ink text-white shadow-xl hover:scale-105 active:scale-95 transition-all gap-2 uppercase tracking-widest text-xs">
                XEM LOG CHI TIẾT <ArrowUpRight className="w-4 h-4" />
             </Button>
          </CardContent>
        </Card>

        {/* Quick Actions / New Feature Placeholder */}
        <Card className="border-2 border-brand-border bg-brand-ink text-white rounded-[3rem] shadow-sm overflow-hidden flex flex-col">
           <CardHeader className="p-8">
              <CardTitle className="text-xl font-black uppercase italic tracking-wider text-brand-primary">Lệnh tắt quản trị</CardTitle>
              <CardDescription className="text-slate-400 font-bold italic">Nhấn Ctrl + K để mở toàn bộ lệnh</CardDescription>
           </CardHeader>
           <CardContent className="p-8 pt-0 grid grid-cols-2 gap-4 flex-1">
              {[
                { label: 'Thêm Học Sinh', icon: Users, path: '/admin/students' },
                { label: 'Nạp Từ Vựng', icon: FileText, path: '/admin/vocabularies' },
                { label: 'Xóa Cache', icon: RefreshCw, action: () => toast.info('Đang xóa cache hệ thống...') },
                { label: 'Cài Đặt', icon: Terminal, path: '/admin/logs' },
              ].map((act, i) => (
                <button 
                  key={i}
                  onClick={() => act.path ? navigate(act.path) : act.action?.()}
                  className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col items-center justify-center gap-3 hover:bg-brand-primary hover:border-brand-primary transition-all group"
                >
                  <act.icon className="w-8 h-8 text-brand-primary group-hover:text-white transition-colors" />
                  <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-white">{act.label}</span>
                </button>
              ))}
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
