import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { adminService, ImportJob } from '@/src/services/api';
import { CheckCircle2, XCircle, Loader2, FileText, BarChart3, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface Props {
  activeJobIds: string[];
  onJobFinished?: (jobId: string) => void;
}

export default function ImportJobTracker({ activeJobIds, onJobFinished }: Props) {
  const [jobs, setJobs] = useState<ImportJob[]>([]);
  const finishedJobsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (activeJobIds.length === 0) return;

    const fetchStatuses = async () => {
      try {
        const results = await Promise.all(
          activeJobIds.map(id => adminService.getImportStatus(id))
        );
        const currentJobs = results.map(r => r.data).filter(Boolean);
        setJobs(currentJobs);

        // Kiểm tra xem có Job nào vừa mới hoàn thành không
        currentJobs.forEach(job => {
          if ((job.status === 'Completed' || job.status === 'Failed') && !finishedJobsRef.current.has(job.id)) {
            finishedJobsRef.current.add(job.id);
            if (onJobFinished) {
              // Chờ 1 chút để DB ổn định rồi gọi callback refresh dữ liệu
              setTimeout(() => onJobFinished(job.id), 1000);
            }
          }
        });
      } catch (error) {
        console.error("Lỗi cập nhật trạng thái Job", error);
      }
    };

    fetchStatuses();
    const interval = setInterval(fetchStatuses, 3000); // Polling mỗi 3s
    return () => clearInterval(interval);
  }, [activeJobIds, onJobFinished]);

  if (activeJobIds.length === 0) return null;

  return (
    <Card className="border border-brand-border bg-white shadow-xl rounded-3xl overflow-hidden animate-in slide-in-from-right-4 duration-500">
      <CardHeader className="p-6 border-b border-brand-border bg-brand-highlight/30 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
           <BarChart3 className="w-5 h-5 text-brand-primary" />
           <CardTitle className="text-sm font-black text-brand-ink uppercase tracking-tight">Tiến độ Import</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 max-h-[400px] overflow-y-auto">
        <div className="divide-y divide-brand-border">
          {jobs.map((job) => (
            <div key={job.id} className="p-5 space-y-3 hover:bg-brand-highlight/10 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 overflow-hidden">
                  <FileText className="w-4 h-4 text-brand-secondary shrink-0" />
                  <p className="font-bold text-brand-ink text-xs truncate">{job.fileName}</p>
                </div>
                
                <div className={cn(
                  "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shrink-0",
                  job.status === 'Completed' ? "bg-emerald-50 text-emerald-600" :
                  job.status === 'Failed' ? "bg-rose-50 text-rose-600" :
                  "bg-amber-50 text-amber-600"
                )}>
                  {job.status === 'Processing' && <Loader2 className="w-2.5 h-2.5 animate-spin" />}
                  {job.status === 'Completed' ? 'Hoàn thành' : job.status === 'Failed' ? 'Thất bại' : 'Đang xử lý'}
                </div>
              </div>

              {job.status !== 'Failed' ? (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-brand-secondary">{job.processedRows}/{job.totalRows} hàng</span>
                    <span className="text-brand-primary">{Math.round((job.processedRows / (job.totalRows || 1)) * 100)}%</span>
                  </div>
                  <Progress value={(job.processedRows / (job.totalRows || 1)) * 100} className="h-1.5 bg-brand-highlight" />
                </div>
              ) : (
                <div className="p-2 bg-rose-50 rounded-lg text-[10px] text-rose-700 italic border border-rose-100 flex gap-1 items-start">
                   <AlertCircle className="w-3 h-3 mt-0.5" />
                   <span>{job.errorLog || "Lỗi xử lý file."}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
