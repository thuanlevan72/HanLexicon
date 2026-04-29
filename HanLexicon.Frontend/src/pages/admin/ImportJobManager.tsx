import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { adminService, ImportJob } from '@/src/services/api';
import { 
  History, 
  CheckCircle2, 
  FileText, 
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Zap,
  Activity,
  AlertCircle,
  Clock,
  ArrowRight,
  LayoutGrid
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { dateUtils } from '@/src/utils/formatters';
import ImportJobTracker from './import/ImportJobTracker';
import { motion, AnimatePresence } from 'motion/react';

export default function ImportJobManager() {
  const [jobs, setJobs] = useState<ImportJob[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeJobIds, setActiveJobIds] = useState<string[]>([]);
  const pageSize = 10;

  const fetchData = async () => {
    try {
      const [jobsRes, statsRes] = await Promise.all([
        adminService.getAllImportJobs(page),
        adminService.getImportStats()
      ]);
      
      if (jobsRes.isSuccess) {
        setJobs(jobsRes.data.items);
        setTotalPages(jobsRes.data.totalPages);
      }
      if (statsRes.isSuccess) {
        setStats(statsRes.data);
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [page]);

  const handleJobFinished = (jobId: string) => {
    fetchData();
  };

  const statsList = [
    { label: 'TỔNG SỐ JOB', value: stats?.total || 0, icon: History, color: 'text-brand-primary', bg: 'bg-brand-highlight' },
    { label: 'HOÀN THÀNH', value: stats?.completed || 0, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'ĐANG CHẠY', value: (stats?.processing || 0) + (stats?.pending || 0), icon: Activity, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'THẤT BẠI', value: stats?.failed || 0, icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] gap-6 animate-in fade-in duration-500 relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div>
          <h1 className="text-3xl font-black text-brand-ink tracking-tight uppercase italic flex items-center gap-3 font-heading">
             <History className="w-8 h-8 text-brand-primary" />
             Quản lý Tiến trình Import
          </h1>
          <div className="flex items-center gap-2 mt-1">
             <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary font-black border-none px-3 py-1">
                {stats?.total || 0} TIẾN TRÌNH
             </Badge>
             <p className="text-brand-secondary text-xs font-bold uppercase tracking-widest opacity-60 italic">Background Worker Stream</p>
          </div>
        </div>
        <Button onClick={fetchData} variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-brand-highlight text-brand-secondary">
          <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
        {statsList.map((s, i) => (
          <Card key={i} className="border-4 border-brand-border bg-white rounded-[2rem] shadow-sm overflow-hidden group">
            <CardContent className="p-6 flex items-center gap-4">
               <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center border-4 border-white shadow-xl transition-transform group-hover:rotate-12", s.bg)}>
                  <s.icon className={cn("w-6 h-6", s.color)} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                  <p className="text-2xl font-black text-brand-ink tracking-tighter italic">{loading ? "..." : s.value}</p>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
        {/* Main Jobs Table */}
        <Card className="lg:col-span-8 border border-brand-border bg-white rounded-[2.5rem] shadow-xl overflow-hidden flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto relative custom-scrollbar">
            <table className="w-full text-left border-collapse table-fixed">
              <thead className="sticky top-0 z-10 bg-brand-highlight/95 backdrop-blur-md shadow-sm">
                <tr className="border-b border-brand-border text-[10px] font-black uppercase tracking-widest text-brand-secondary">
                  <th className="p-6 w-1/2">Chi tiết tiến trình</th>
                  <th className="p-6 w-32 text-center">Trạng thái</th>
                  <th className="p-6">Tiến độ thực tế</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {loading && jobs.length === 0 ? (
                   <tr><td colSpan={3} className="p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></td></tr>
                ) : jobs.length === 0 ? (
                   <tr><td colSpan={3} className="p-20 text-center font-black text-brand-secondary uppercase italic opacity-40">Không có dữ liệu tiến trình</td></tr>
                ) : jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-brand-highlight/5 transition-all group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-brand-ink text-white flex items-center justify-center border-2 border-brand-primary/20 shadow-lg">
                           <FileText className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="text-lg font-black text-brand-ink leading-tight truncate">{job.fileName}</p>
                           <div className="flex items-center gap-3 mt-1 opacity-60">
                              <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-tighter flex items-center gap-1"><Clock className="w-3 h-3" /> {dateUtils.formatDate(job.createdAt, 'HH:mm - dd/MM/yyyy')}</span>
                           </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-center">
                       <Badge className={cn(
                        "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border-2",
                        job.status === 'Completed' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                        job.status === 'Failed' ? "bg-rose-50 text-rose-600 border-rose-100" :
                        "bg-amber-50 text-amber-600 border-amber-100"
                      )}>
                        {job.status === 'Completed' ? 'Hoàn thành' : job.status === 'Failed' ? 'Thất bại' : 'Đang xử lý'}
                      </Badge>
                    </td>
                    <td className="p-6">
                       <div className="space-y-2">
                          <div className="flex justify-between items-end">
                             <span className="text-[10px] font-black text-slate-400 uppercase italic">Tiến độ: {Math.round((job.processedRows / (job.totalRows || 1)) * 100)}%</span>
                             <span className="text-xs font-black text-brand-ink">{job.processedRows} <span className="text-slate-300">/</span> {job.totalRows}</span>
                          </div>
                          <Progress value={(job.processedRows / (job.totalRows || 1)) * 100} className="h-2.5 bg-brand-highlight rounded-full" />
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sticky pagination internal to card */}
          <div className="p-6 border-t border-brand-border bg-brand-highlight/10 flex items-center justify-between">
             <p className="text-[10px] font-black text-brand-secondary uppercase tracking-widest opacity-40">Trang {page} / {totalPages}</p>
             <div className="flex gap-2">
                <Button variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)} className="rounded-xl border-2 border-brand-border h-10 px-4 font-black bg-white shadow-sm hover:bg-brand-highlight transition-all">Trước</Button>
                <Button variant="outline" disabled={page === totalPages} onClick={() => setPage(page + 1)} className="rounded-xl border-2 border-brand-border h-10 px-4 font-black bg-white shadow-sm hover:bg-brand-highlight transition-all">Sau</Button>
             </div>
          </div>
        </Card>

        {/* Real-time Tracking Sidebar */}
        <div className="lg:col-span-4 space-y-6 flex flex-col min-h-0">
           <div className="flex items-center gap-3 px-2">
              <Zap className="w-5 h-5 text-brand-primary animate-pulse" />
              <h3 className="text-xs font-black text-brand-ink uppercase tracking-widest italic">Giám sát Real-time</h3>
           </div>
           
           <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
              <ImportJobTracker activeJobIds={activeJobIds} onJobFinished={handleJobFinished} />
              {activeJobIds.length === 0 && (
                <Card className="p-12 border-4 border-brand-border border-dashed rounded-[2.5rem] text-center bg-white shadow-inner opacity-60">
                   <div className="w-20 h-20 bg-brand-highlight rounded-full flex items-center justify-center mx-auto mb-6">
                      <Activity className="w-10 h-10 text-slate-300" />
                   </div>
                   <p className="text-[11px] font-black text-brand-ink uppercase tracking-[0.2em] leading-relaxed">Không có tiến trình nào<br/>đang hoạt động</p>
                </Card>
              )}
           </div>

           <Card className="p-8 bg-brand-ink text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="relative z-10 space-y-4">
                 <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <h4 className="font-black uppercase italic tracking-tighter text-lg">System Integrity</h4>
                 </div>
                 <p className="text-[10px] font-medium text-slate-400 leading-relaxed uppercase tracking-wider">Mọi tiến trình nhập liệu đều được mã hóa và kiểm tra tính toàn vẹn dữ liệu tự động bởi HanLexicon Engine.</p>
              </div>
           </Card>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d1d1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #bbbbbb; }
      `}</style>
    </div>
  );
}
