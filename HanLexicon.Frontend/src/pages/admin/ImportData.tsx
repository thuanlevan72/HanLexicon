
import React, { useState } from 'react';
import { api } from '@/src/services/api';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, RefreshCw, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export default function AdminImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [importState, setImportState] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [resultCount, setResultCount] = useState(0);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.name.endsWith('.xlsx') || droppedFile.name.endsWith('.xls') || droppedFile.name.endsWith('.csv'))) {
      setFile(droppedFile);
    } else {
      alert('Vui lòng chỉ tải lên tệp Excel (.xlsx, .xls) hoặc CSV.');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const startImport = async () => {
    if (!file) return;

    setImportState('uploading');
    setProgress(10);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    const result = await api.importExcel(file);
    
    clearInterval(interval);
    setProgress(100);
    
    if (result.success) {
      setResultCount(result.count || 0);
      setImportState('success');
    } else {
      setImportState('error');
    }
  };

  const reset = () => {
    setFile(null);
    setImportState('idle');
    setProgress(0);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="space-y-2">
        <h1 className="text-3xl font-black text-brand-ink tracking-tight">Cổng nhập dữ liệu</h1>
        <p className="text-brand-secondary font-medium">Bổ sung học liệu hàng loạt từ tệp Excel hoặc CSV</p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <Card className="border border-brand-border bg-white shadow-sm rounded-3xl overflow-hidden min-h-[400px] flex flex-col">
          <CardHeader className="p-8 border-b border-brand-border bg-brand-highlight/30">
            <CardTitle className="text-2xl font-bold tracking-tight text-brand-ink">Tải lên tài liệu</CardTitle>
            <CardDescription className="text-brand-secondary font-medium">Hỗ trợ các định dạng .xlsx, .xls và .csv</CardDescription>
          </CardHeader>
          
          <CardContent className="p-10 flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {importState === 'idle' ? (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={cn(
                    "border-4 border-dashed rounded-3xl p-12 text-center transition-all duration-300 relative",
                    isDragging ? "border-brand-primary bg-brand-primary/5 scale-[1.02]" : "border-brand-highlight bg-brand-highlight/10",
                    file ? "border-emerald-500/50 bg-emerald-50/20" : ""
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileSelect}
                    accept=".xlsx,.xls,.csv"
                  />
                  
                  <div className="flex flex-col items-center space-y-6">
                    <div className={cn(
                      "w-20 h-20 rounded-2xl flex items-center justify-center border-4 shadow-sm transition-all",
                      file ? "bg-emerald-500 border-emerald-400 text-white" : "bg-white border-brand-highlight text-brand-secondary"
                    )}>
                      {file ? <FileSpreadsheet className="w-10 h-10" /> : <Upload className="w-10 h-10" />}
                    </div>
                    
                    <div className="space-y-1">
                      {file ? (
                        <p className="text-xl font-bold text-brand-ink truncate max-w-md mx-auto">{file.name}</p>
                      ) : (
                        <>
                          <p className="text-xl font-bold text-brand-ink">Kéo tệp vào đây hoặc <span className="text-brand-primary underline underline-offset-4">chọn tệp</span></p>
                          <p className="text-sm text-brand-secondary italic">Dung lượng tối đa: 50MB</p>
                        </>
                      )}
                    </div>

                    {file && (
                      <div className="flex gap-3">
                        <Button
                          onClick={(e) => { e.stopPropagation(); startImport(); }}
                          className="px-8 h-12 bg-brand-primary hover:bg-brand-secondary text-white font-black rounded-xl shadow-lg shadow-brand-primary/10 transition-all uppercase tracking-widest"
                        >
                          Bắt đầu nhập
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={(e) => { e.stopPropagation(); setFile(null); }}
                          className="px-6 h-12 text-rose-500 hover:bg-rose-50 font-bold rounded-xl"
                        >
                          Hủy bỏ
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : importState === 'uploading' || importState === 'processing' ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8 text-center"
                >
                  <div className="w-20 h-20 bg-brand-highlight rounded-2xl flex items-center justify-center mx-auto border-4 border-brand-border animate-bounce">
                    <RefreshCw className={cn("w-10 h-10 text-brand-primary", importState === 'processing' ? "animate-spin" : "")} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-brand-ink">{importState === 'uploading' ? 'Đang tải tệp lên...' : 'Đang xử lý dữ liệu...'}</h3>
                    <div className="max-w-md mx-auto space-y-2">
                       <Progress value={progress} className="h-4 bg-brand-highlight" />
                       <p className="text-xs font-bold text-brand-secondary tracking-widest uppercase">{progress}% Hoàn thành</p>
                    </div>
                  </div>
                </motion.div>
              ) : importState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center space-y-8"
                >
                  <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20 text-white">
                    <CheckCircle2 className="w-14 h-14" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black text-brand-ink">Tuyệt vời!</h3>
                    <p className="text-lg font-medium text-brand-secondary italic">Đã nhập thành công <span className="text-emerald-600 font-black">{resultCount}</span> dòng dữ liệu vào hệ thống.</p>
                  </div>
                  <Button
                    onClick={reset}
                    className="px-10 h-14 bg-brand-primary hover:bg-brand-secondary text-white font-black rounded-2xl shadow-lg shadow-brand-primary/20 transition-all uppercase tracking-widest"
                  >
                    Tiếp tục nhập tệp khác
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="error"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="w-24 h-24 bg-rose-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-rose-500/20 text-white">
                    <AlertCircle className="w-14 h-14" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black text-brand-ink">Có lỗi xảy ra</h3>
                    <p className="text-lg font-medium text-brand-secondary">Vui lòng kiểm tra lại định dạng tệp của bạn.</p>
                  </div>
                  <Button onClick={reset} variant="outline" className="px-10 h-14 rounded-2xl font-bold border-brand-border">
                    Thử lại
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>

          <CardFooter className="p-8 bg-brand-highlight/20 border-t border-brand-border block space-y-4">
             <div className="flex items-center gap-3 text-brand-secondary">
               <AlertCircle className="w-5 h-5 text-brand-primary" />
               <p className="text-sm font-medium italic">Lưu ý: Bạn nên sử dụng tệp mẫu để đảm bảo cấu trúc dữ liệu chính xác nhất.</p>
             </div>
             <Button variant="link" className="p-0 h-auto text-brand-primary font-bold hover:no-underline flex items-center gap-2">
               Tải xuống tệp mẫu .xlsx <FileText className="w-4 h-4" />
             </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
