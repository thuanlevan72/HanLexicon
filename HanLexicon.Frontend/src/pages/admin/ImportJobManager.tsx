import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { adminService, ImportJob } from '@/src/services/api';
import { 
  History, 
  CheckCircle2, 
  Loader2, 
  FileText, 
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  RefreshCw,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { dateUtils } from '@/src/utils/formatters';
import ImportJobTracker from './import/ImportJobTracker';
import ImportVocabulary from './import/ImportVocabulary';

export default function ImportJobManager() {
  const [jobs, setJobs] = useState<ImportJob[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeJobIds, setActiveJobIds] = useState<string[]>([]);
  
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

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
    // Vẫn duy trì polling nhẹ mỗi 10s cho toàn bộ list
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [page]);

  const handleNewJob = (jobId: string) => {
    setActiveJobIds(prev => [jobId, ...prev]);
    setIsImportModalOpen(false);
    fetchData(); // Tải lại list để thấy job mới ở trạng thái Pending
  };

  const handleJobFinished = (jobId: string) => {
    console.log(`Job ${jobId} đã hoàn thành, đang cập nhật dữ liệu...`);
    fetchData(); // GỌI LẠI API THỐNG KÊ VÀ DANH SÁCH
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-brand-ink tracking-tight uppercase italic flex items-center gap-3 font-heading">
             <History className="w-8 h-8 text-brand-primary" />
             Quản lý tiến trình (Jobs)
          </h1>
          <p className="text-brand-secondary font-medium">Trung tâm điều hành và giám sát dữ liệu nhập từ Excel.</p>
        </div>
        <Button onClick={() => setIsImportModalOpen(true)} className="h-12 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-lg gap-2">
           <Plus className="w-5 h-5" /> Import Excel mới
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Stats Column */}
        <div className="lg:col-span-3 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Tổng số Job', value: stats?.total || 0, color: 'text-brand-primary', bg: 'bg-brand-highlight' },
              { label: 'Hoàn thành', value: stats?.completed || 0, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Đang chạy', value: (stats?.processing || 0) + (stats?.pending || 0), color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Thất bại', value: stats?.failed || 0, color: 'text-rose-600', bg: 'bg-rose-50' },
            ].map((item, idx) => (
              <Card key={idx} className="p-6 border-brand-border bg-white rounded-3xl shadow-sm">
                <p className="text-[10px] font-black text-brand-secondary uppercase tracking-widest mb-1">{item.label}</p>
                <p className={cn("text-3xl font-black", item.color)}>{item.value}</p>
              </Card>
            ))}
          </div>

          <Card className="border border-brand-border bg-white rounded-[2.5rem] shadow-xl overflow-hidden">
            <div className="p-6 border-b border-brand-border bg-brand-highlight/10 flex items-center justify-between">
               <h2 className="text-sm font-black uppercase tracking-widest text-brand-ink italic">Lịch sử nhập liệu hệ thống</h2>
               <Button variant="ghost" size="sm" onClick={() => fetchData()} className="text-brand-primary font-bold"><RefreshCw className="w-4 h-4 mr-2" /> Làm mới</Button>
            </div>

            <div className="divide-y divide-brand-border">
              {jobs.length > 0 ? jobs.map((job) => (
                <div key={job.id} className="p-8 hover:bg-brand-highlight/5 transition-colors space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-brand-surface flex items-center justify-center border border-brand-border">
                        <FileText className="w-7 h-7 text-brand-secondary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-brand-ink leading-tight">{job.fileName}</h3>
                        <p className="text-xs text-brand-secondary mt-1 italic">ID: {job.id.substring(0, 8)}... • {dateUtils.formatDate(job.createdAt, 'HH:mm - dd/MM/yyyy')}</p>
                      </div>
                    </div>
                    <Badge className={cn(
                      "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm",
                      job.status === 'Completed' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                      job.status === 'Failed' ? "bg-rose-50 text-rose-600 border-rose-100" :
                      "bg-amber-50 text-amber-600 border-amber-100"
                    )}>
                      {job.status}
                    </Badge>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-black uppercase">
                       <span className="text-brand-secondary">Tiến độ thực tế</span>
                       <span className="text-brand-primary">{job.processedRows} / {job.totalRows} hàng</span>
                    </div>
                    <Progress value={(job.processedRows / (job.totalRows || 1)) * 100} className="h-2 bg-brand-highlight rounded-full" />
                  </div>
                </div>
              )) : <div className="p-20 text-center text-brand-secondary italic">Chưa có dữ liệu.</div>}
            </div>

            <div className="p-8 border-t border-brand-border flex items-center justify-between bg-brand-highlight/20">
              <Button variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)} className="rounded-xl font-bold bg-white h-11 px-6">Trước</Button>
              <span className="text-xs font-black text-brand-secondary uppercase tracking-widest">Trang {page} / {totalPages}</span>
              <Button variant="outline" disabled={page === totalPages} onClick={() => setPage(page + 1)} className="rounded-xl font-bold bg-white h-11 px-6">Sau</Button>
            </div>
          </Card>
        </div>

        {/* Real-time Tracking Sidebar */}
        <div className="lg:col-span-1 space-y-6">
           <div className="sticky top-8">
              <h3 className="text-xs font-black text-brand-secondary uppercase tracking-widest mb-4 px-2 italic">Đang giám sát trực tiếp</h3>
              <ImportJobTracker activeJobIds={activeJobIds} onJobFinished={handleJobFinished} />
              {activeJobIds.length === 0 && (
                <div className="p-10 border border-brand-border border-dashed rounded-3xl text-center space-y-4 opacity-40 bg-white">
                   <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">Không có Job nào <br/> đang được theo dõi</p>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/40 backdrop-blur-sm p-4 animate-in zoom-in-95 duration-200">
           <div className="w-full max-w-2xl relative">
              <Button onClick={() => setIsImportModalOpen(false)} size="icon" className="absolute -top-4 -right-4 h-12 w-12 rounded-full bg-white shadow-xl z-[110] border border-brand-border hover:rotate-90 transition-transform"><X className="w-6 h-6" /></Button>
              <ImportVocabulary onImportStarted={handleNewJob} />
           </div>
        </div>
      )}
    </div>
  );
}

import { X } from 'lucide-react';
