import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileSpreadsheet, CheckCircle2, RefreshCw, XCircle, BookOpen, Info, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { adminService, learningService, LessonFlat } from '@/src/services/api';
import { FormSelect } from '@/src/components/ui/FormSelect';

interface Props {
  onImportStarted: (jobId: string) => void;
}

export default function ImportVocabulary({ onImportStarted }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [importState, setImportState] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  
  // Category & Lesson Selection
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [lessons, setLessons] = useState<LessonFlat[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingLessons, setIsLoadingLessons] = useState(false);

  // 1. Fetch Categories on Mount
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const res = await learningService.getCategories();
        const data = res.data || res || [];
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        logger.error("Failed to fetch categories", err);
        setCategories([]);
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // 2. Fetch Lessons when Category changes
  useEffect(() => {
    const fetchLessons = async () => {
      if (!selectedCategoryId) {
        setLessons([]);
        setSelectedLessonId('');
        return;
      }
      setIsLoadingLessons(true);
      try {
        const res = await learningService.getLessonsByCategoryId(Number(selectedCategoryId));
        const data = res.data || res || [];
        setLessons(Array.isArray(data) ? data : []);
        setSelectedLessonId(''); // Reset lesson when category changes
      } catch (err) {
        console.error("Failed to fetch lessons", err);
        setLessons([]);
      } finally {
        setIsLoadingLessons(false);
      }
    };
    fetchLessons();
  }, [selectedCategoryId]);

  const startImport = async () => {
    if (!file) return;
    setImportState('uploading');
    setErrorMsg('');
    
    try {
      const response = await adminService.importVocabularies(file, selectedLessonId);
      if (response.isSuccess && response.data?.jobId) {
        onImportStarted(response.data.jobId);
        setImportState('success');
      } else {
        throw new Error(response.message || "Lỗi không xác định");
      }
    } catch (error: any) {
      setErrorMsg(error.toString());
      setImportState('error');
    }
  };

  return (
    <Card className="border-0 bg-white shadow-sm rounded-3xl overflow-hidden min-h-[500px] flex flex-col">
      <CardContent className="p-10 flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {importState === 'idle' || importState === 'error' ? (
            <motion.div
              key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Category & Lesson Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-brand-ink flex items-center gap-2">
                    <Layers className="w-4 h-4 text-brand-primary" />
                    DANH MỤC
                  </label>
                  <FormSelect 
                    className="h-14 border-2 border-brand-border bg-brand-highlight/30"
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    disabled={isLoadingCategories}
                  >
                    <option value="">-- Chọn Danh mục --</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </FormSelect>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-brand-ink flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-brand-primary" />
                    BÀI HỌC ĐÍCH
                  </label>
                  <FormSelect 
                    className="h-14 border-2 border-brand-border bg-brand-highlight/30"
                    value={selectedLessonId}
                    onChange={(e) => setSelectedLessonId(e.target.value)}
                    disabled={isLoadingLessons || !selectedCategoryId}
                  >
                    <option value="">-- Chọn bài học --</option>
                    {lessons.map(lesson => (
                      <option key={lesson.id} value={lesson.id}>
                        {lesson.title} {lesson.titleVn ? `/ ${lesson.titleVn}` : ""}
                      </option>
                    ))}
                  </FormSelect>
                </div>
              </div>
              <p className="text-xs text-brand-secondary italic px-1">
                * Vui lòng chọn Danh mục trước, sau đó chọn Bài học cụ thể để nạp dữ liệu.
              </p>

              {/* Requirement Notice */}
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3 items-start">
                <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-800 leading-relaxed">
                  <p className="font-bold mb-1">YÊU CẦU DỮ LIỆU:</p>
                  <ul className="list-disc pl-4 space-y-0.5">
                    <li>Cột <b>Word</b> và <b>Meaning</b> không được để trống.</li>
                    <li>Cột <b>Audio URL</b> là bắt buộc để hỗ trợ phát âm.</li>
                    <li>Cột <b>Image URL</b> là tùy chọn.</li>
                  </ul>
                </div>
              </div>

              {/* Drag & Drop Area */}
              <div
                className={cn(
                  "border-4 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer relative",
                  isDragging ? "border-brand-primary bg-brand-primary/5" : "border-brand-highlight bg-brand-highlight/10",
                  file ? "border-emerald-500/50 bg-emerald-50/50" : ""
                )}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); setFile(e.dataTransfer.files[0]); }}
              >
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setFile(e.target.files?.[0] || null)} accept=".xlsx,.xls" />
                
                <div className="flex flex-col items-center space-y-6">
                  <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm border-2", file ? "bg-emerald-500 border-emerald-400 text-white" : "bg-white border-brand-highlight text-brand-secondary")}>
                    <FileSpreadsheet className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-1">
                     <p className="text-xl font-bold text-brand-ink">{file ? file.name : "Kéo tệp Excel Từ vựng vào đây"}</p>
                     <p className="text-sm text-brand-secondary italic">Hỗ trợ .xlsx, .xls (Tối đa 50MB)</p>
                  </div>

                  {importState === 'error' && <p className="text-rose-600 text-sm font-bold bg-rose-50 px-4 py-2 rounded-xl border border-rose-100">{errorMsg}</p>}

                  {file && (
                     <div className="flex gap-3 pt-2 relative z-10">
                      <Button onClick={(e) => { e.stopPropagation(); startImport(); }} className="bg-brand-primary hover:bg-brand-secondary text-white font-black rounded-xl px-8 h-12 shadow-lg shadow-brand-primary/20">BẮT ĐẦU NHẬP</Button>
                      <Button variant="ghost" onClick={(e) => { e.stopPropagation(); setFile(null); setImportState('idle'); }} className="text-rose-500 font-bold hover:bg-rose-50 rounded-xl px-6">Hủy</Button>
                     </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : importState === 'uploading' ? (
            <motion.div key="uploading" className="text-center space-y-8">
               <div className="w-24 h-24 bg-brand-highlight rounded-3xl flex items-center justify-center mx-auto border-2 border-brand-border">
                  <RefreshCw className="w-12 h-12 text-brand-primary animate-spin" />
               </div>
               <div className="space-y-2">
                 <h3 className="text-2xl font-black text-brand-ink">Đang tải tệp lên...</h3>
                 <p className="text-brand-secondary">Vui lòng không đóng trình duyệt lúc này.</p>
               </div>
            </motion.div>
          ) : (
            <motion.div key="success" className="text-center space-y-8">
               <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto text-white shadow-xl shadow-emerald-500/20">
                  <CheckCircle2 className="w-14 h-14" />
               </div>
               <div className="space-y-2">
                 <h3 className="text-3xl font-black text-brand-ink">Yêu cầu đã gửi!</h3>
                 <p className="text-brand-secondary italic">Hệ thống đang xử lý tệp tin dưới nền. Bạn có thể theo dõi tiến độ ở danh sách bên dưới.</p>
               </div>
               <Button onClick={() => { setFile(null); setImportState('idle'); }} className="bg-brand-primary text-white rounded-2xl px-10 h-14 font-black shadow-lg">NHẬP TỆP KHÁC</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="p-6 bg-brand-highlight/20 border-t border-brand-border block">
         <div className="flex items-center gap-3 text-brand-secondary mb-3">
            <CheckCircle2 className="w-4 h-4 text-brand-primary" />
            <span className="text-xs font-bold uppercase tracking-widest">Mẹo: Cấu trúc file chuẩn giúp dữ liệu được xử lý nhanh hơn.</span>
         </div>
         <Button variant="link" className="text-brand-primary font-bold h-auto p-0 hover:no-underline">Tải tệp mẫu HSK Vocabulary Standard .xlsx</Button>
      </CardFooter>
    </Card>
  );
}

