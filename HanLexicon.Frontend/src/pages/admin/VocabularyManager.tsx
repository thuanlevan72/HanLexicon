import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search, Plus, Upload, Edit3, Trash2, X, Volume2,
  Image as ImageIcon, RefreshCw, ChevronLeft, ChevronRight,
  BookOpen, Quote, Layers, BookMarked, Save, FileWarning, 
  AlertCircle, ArrowRight, Eye, CheckCircle2, History, Music, Play, Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Vocabulary, adminService, learningService, LessonFlat } from '@/src/services/api';
import { FormSelect } from '@/src/components/ui/FormSelect';
import { Badge } from '@/components/ui/badge';
import ImportVocabulary from './import/ImportVocabulary';
import { toast } from 'sonner';

export default function VocabularyManager() {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering states
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [lessons, setLessons] = useState<LessonFlat[]>([]);
  const [flatLessons, setFlatLessons] = useState<LessonFlat[]>([]); // Phục vụ Dropdown trong Modal
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  const [missingAudio, setMissingAudio] = useState(false);
  const [missingImage, setMissingImage] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 12;

  // Modals
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentVocab, setCurrentVocab] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchFilterData = async () => {
    try {
      const [catsRes, allLessons] = await Promise.all([
        learningService.getCategories(),
        learningService.getLessonsFlat()
      ]);
      
      const cats = catsRes.data || catsRes || [];
      setCategories(Array.isArray(cats) ? cats : []);
      setFlatLessons(allLessons);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    fetchFilterData();
  }, []);

  useEffect(() => {
    const fetchLessons = async () => {
      if (selectedCategoryId > 0) {
        try {
          const res = await learningService.getLessonsByCategoryId(selectedCategoryId);
          const data = res.data || res || [];
          setLessons(Array.isArray(data) ? data : []);
        } catch (e) { console.error(e); }
      } else {
        setLessons([]);
      }
      setSelectedLessonId('');
      setCurrentPage(1);
    };
    fetchLessons();
  }, [selectedCategoryId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params: any = {
        page: currentPage,
        pageSize: pageSize,
        search: searchTerm || undefined,
        categoryId: selectedCategoryId > 0 ? selectedCategoryId : undefined,
        lessonId: selectedLessonId || undefined,
        missingAudio: missingAudio || undefined,
        missingImage: missingImage || undefined
      };
      
      const res = await adminService.getVocabularies(params) as any;
      if (res.isSuccess) {
        setVocabularies(res.data.items);
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalItems);
      }
    } catch (error) {
      logger.error("Lỗi tải dữ liệu từ vựng", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, selectedLessonId, selectedCategoryId, missingAudio, missingImage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchData();
  };

  const getMediaUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const backendUrl = (import.meta as any).env?.VITE_API_BASE_URL?.replace('/api/v1', '') || 'https://localhost:7285';
    return `${backendUrl}/${url.startsWith('/') ? url.substring(1) : url}`;
  };

  const handleOpenAdd = () => {
    setCurrentVocab({ 
      word: '', pinyin: '', meaning: '', meaningEn: '', 
      lessonId: selectedLessonId || '', sortOrder: vocabularies.length + 1,
      exampleCn: '', examplePy: '', exampleVn: '',
      audioUrl: '', imageUrl: ''
    });
    setIsEditModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentVocab.lessonId) {
       toast.error("Vui lòng chọn bài học gắn kèm!");
       return;
    }
    setIsSaving(true);
    try {
      const res = currentVocab.id 
        ? await adminService.updateVocabulary(currentVocab.id, currentVocab) as any
        : await adminService.createVocabulary(currentVocab) as any;
      
      if (res.isSuccess) {
        toast.success(currentVocab.id ? 'Cập nhật từ vựng thành công' : 'Thêm từ vựng mới thành công');
        setIsEditModalOpen(false);
        fetchData();
      } else {
        toast.error(res.message || 'Có lỗi xảy ra khi lưu từ vựng');
      }
    } catch (err: any) {
      toast.error("Lỗi: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Xóa từ vựng này?")) return;
    try {
      const res = await adminService.deleteVocabulary(id);
      if (res.isSuccess) {
        toast.success('Xóa từ vựng thành công');
        fetchData();
      } else {
        toast.error(res.message || 'Không thể xóa từ vựng này');
      }
    } catch (err: any) {
      toast.error("Lỗi khi xóa: " + err.message);
    }
  };

  const playAudio = (url?: string) => {
    if (!url) return;
    const fullUrl = getMediaUrl(url);
    const audio = new Audio(fullUrl);
    audio.play().catch(e => {
      console.error("Lỗi phát âm thanh:", e);
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] gap-6 animate-in fade-in duration-500 relative">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div>
          <h1 className="text-3xl font-black text-brand-ink tracking-tight uppercase italic flex items-center gap-3 font-heading">
             <BookOpen className="w-8 h-8 text-brand-primary" />
             Quản lý Từ vựng
          </h1>
          <div className="flex items-center gap-2 mt-1">
             <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary font-black border-none px-3 py-1">
                {totalItems} BẢN GHI
             </Badge>
             <p className="text-brand-secondary text-xs font-bold uppercase tracking-widest opacity-60">Database Master Stream</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={() => setIsImportModalOpen(true)} variant="outline" className="h-12 px-6 rounded-2xl border-brand-border font-bold gap-2 hover:bg-brand-highlight transition-all hover:scale-105 active:scale-95">
            <Upload className="w-5 h-5 text-brand-primary" /> Import Excel
          </Button>
          <Button onClick={handleOpenAdd} className="h-12 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-lg shadow-brand-primary/20 gap-2 transition-all hover:scale-105 active:scale-95">
            <Plus className="w-5 h-5" /> Thêm từ mới
          </Button>
        </div>
      </div>

      {/* Advanced Filters Bar */}
      <Card className="p-4 border-brand-border bg-white rounded-[1.5rem] shadow-sm space-y-4 shrink-0">
        <div className="flex flex-col lg:flex-row gap-4">
           <form onSubmit={handleSearch} className="relative flex-1 group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-primary transition-colors" />
             <input 
               placeholder="Tìm từ vựng, pinyin hoặc ý nghĩa..."
               className="w-full h-12 pl-12 pr-4 bg-brand-highlight/20 border-2 border-transparent focus:border-brand-primary focus:bg-white rounded-xl font-bold text-sm outline-none transition-all"
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
             />
           </form>
           
           <div className="flex items-center gap-2 min-w-[200px]">
              <Layers className="w-4 h-4 text-brand-secondary shrink-0" />
              <FormSelect 
                className="h-12 border-none bg-brand-highlight/30"
                value={selectedCategoryId}
                onChange={e => setSelectedCategoryId(Number(e.target.value))}
              >
                <option value="0">Tất cả danh mục</option>
                {categories.map(c => {
                  const id = c.id || c.Id;
                  const name = c.name || c.Name;
                  return <option key={id} value={id}>{name}</option>;
                })}
              </FormSelect>
           </div>

           <div className="flex items-center gap-2 min-w-[200px]">
              <BookMarked className="w-4 h-4 text-brand-secondary shrink-0" />
              <FormSelect 
                className="h-12 border-none bg-brand-highlight/30"
                value={selectedLessonId}
                onChange={e => setSelectedLessonId(e.target.value)}
                disabled={selectedCategoryId === 0}
              >
                <option value="">Tất cả bài học</option>
                {lessons.map((l: any) => {
                  const id = l.id || l.Id;
                  const title = l.title || l.Title || l.translation || l.Translation;
                  return <option key={id} value={id}>{title}</option>;
                })}
              </FormSelect>
           </div>

           <div className="flex items-center gap-2 border-l border-brand-border pl-4">
             <button 
                onClick={() => { setMissingAudio(!missingAudio); setCurrentPage(1); }}
                className={cn(
                  "h-12 w-12 rounded-xl flex items-center justify-center border-2 transition-all",
                  missingAudio ? "bg-rose-50 border-rose-500 text-rose-600 shadow-sm" : "bg-brand-highlight/20 border-transparent text-slate-400 hover:border-brand-border"
                )}
                title="Lọc từ thiếu âm thanh"
             >
                <Music className="w-5 h-5" />
             </button>
             <button 
                onClick={() => { setMissingImage(!missingImage); setCurrentPage(1); }}
                className={cn(
                  "h-12 w-12 rounded-xl flex items-center justify-center border-2 transition-all",
                  missingImage ? "bg-amber-50 border-amber-500 text-amber-600 shadow-sm" : "bg-brand-highlight/20 border-transparent text-slate-400 hover:border-brand-border"
                )}
                title="Lọc từ thiếu hình ảnh"
             >
                <ImageIcon className="w-5 h-5" />
             </button>
             {(missingAudio || missingImage || searchTerm || selectedCategoryId > 0) && (
                <button 
                  onClick={() => {
                    setMissingAudio(false); setMissingImage(false);
                    setSearchTerm(''); setSelectedCategoryId(0);
                    setSelectedLessonId(''); setCurrentPage(1);
                  }}
                  className="h-12 w-12 rounded-xl flex items-center justify-center bg-brand-ink text-white hover:bg-brand-ink/90 transition-all"
                  title="Xóa tất cả bộ lọc"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
             )}
           </div>
        </div>
      </Card>

      {/* Main Table Content - Scrollable */}
      <Card className="flex-1 border border-brand-border bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          <table className="w-full text-left border-collapse table-fixed">
            <thead className="sticky top-0 z-10 bg-brand-highlight/95 backdrop-blur-md shadow-sm">
              <tr className="border-b border-brand-border text-[10px] font-black uppercase tracking-widest text-brand-secondary">
                <th className="p-6 w-1/4">Từ vựng</th>
                <th className="p-6 w-1/4">Phát âm & Nghĩa</th>
                <th className="p-6 w-1/4">Thông tin Bài học</th>
                <th className="p-6 w-32">Media</th>
                <th className="p-6 w-32 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {loading && vocabularies.length === 0 ? (
                <tr><td colSpan={5} className="p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></td></tr>
              ) : vocabularies.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-20 text-center">
                    <div className="max-w-xs mx-auto space-y-4">
                      <div className="w-20 h-20 bg-brand-highlight rounded-full flex items-center justify-center mx-auto">
                        <Filter className="w-10 h-10 text-slate-300" />
                      </div>
                      <p className="font-black text-brand-ink uppercase italic">No data matched your criteria</p>
                      <Button variant="ghost" onClick={() => { setSearchTerm(''); setSelectedCategoryId(0); }} className="text-xs font-bold text-brand-primary">Reset all filters</Button>
                    </div>
                  </td>
                </tr>
              ) : vocabularies.map((v: any) => {
                const id = v.id || v.Id;
                const word = v.word || v.Word;
                const pinyin = v.pinyin || v.Pinyin;
                const meaning = v.meaning || v.Meaning || v.meaning_vn || v.MeaningVn;
                const lessonTitle = v.lessonTitle || v.LessonTitle;
                const audioUrl = v.audioUrl || v.AudioUrl;
                const imageUrl = v.imageUrl || v.ImageUrl;
                const sortOrder = v.sortOrder || v.SortOrder;

                return (
                  <tr key={id} className="hover:bg-brand-highlight/5 transition-all group border-b border-brand-border">
                    <td className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-ink text-white flex items-center justify-center shrink-0 text-xs font-black italic shadow-lg shadow-brand-ink/20">
                          #{sortOrder}
                        </div>
                        <div>
                          <p className="text-4xl font-black text-brand-ink leading-none">{word}</p>
                          {v.exampleCn && <p className="text-[10px] text-brand-secondary font-bold mt-2 opacity-60 flex items-center gap-1"><Quote className="w-2.5 h-2.5" /> {v.exampleCn}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                           <p className="font-black text-brand-primary uppercase tracking-widest text-xs italic">{pinyin}</p>
                           {audioUrl && (
                             <button onClick={() => playAudio(audioUrl)} className="text-brand-secondary hover:text-brand-primary transition-colors">
                               <Volume2 className="w-3.5 h-3.5" />
                             </button>
                           )}
                        </div>
                        <p className="font-bold text-brand-ink text-lg">{meaning}</p>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col gap-1.5">
                         <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            <p className="text-xs font-black text-brand-ink uppercase truncate max-w-[200px]">{lessonTitle || "Chưa gán bài học"}</p>
                         </div>
                         <div className="flex items-center gap-1.5 opacity-40">
                            <History className="w-3 h-3" />
                            <p className="text-[10px] font-bold text-slate-500">ID: {id.substring(0,8)}...</p>
                         </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex gap-2">
                         {audioUrl ? (
                           <button 
                              onClick={() => playAudio(audioUrl)}
                              className="h-9 w-9 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-600 border border-sky-500/20 hover:bg-sky-500 hover:text-white transition-all shadow-sm" 
                           >
                              <Volume2 className="w-4 h-4" />
                           </button>
                         ) : (
                           <div className="h-9 w-9 bg-rose-50 rounded-xl flex items-center justify-center text-rose-300 border border-rose-100 border-dashed">
                              <AlertCircle className="w-4 h-4" />
                           </div>
                         )}
                         {imageUrl ? (
                           <button 
                              onClick={() => setPreviewImage(getMediaUrl(imageUrl))} 
                              className="h-9 w-9 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                           >
                              <ImageIcon className="w-4 h-4" />
                           </button>
                         ) : (
                           <div className="h-9 w-9 bg-amber-50 rounded-xl flex items-center justify-center text-amber-300 border border-amber-100 border-dashed">
                              <ImageIcon className="w-4 h-4" />
                           </div>
                         )}
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button 
                          onClick={() => { setCurrentVocab(v); setIsEditModalOpen(true); }} 
                          className="h-9 w-9 rounded-xl flex items-center justify-center bg-brand-highlight/80 text-brand-primary hover:bg-brand-primary hover:text-white transition-all"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(id)} 
                          className="h-9 w-9 rounded-xl flex items-center justify-center bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* STICKY PAGINATION BAR */}
      <div className="sticky bottom-0 z-20 shrink-0 bg-white/80 backdrop-blur-xl border border-brand-border p-4 rounded-3xl shadow-2xl flex items-center justify-between animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-6">
             <div className="flex flex-col">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hiển thị</p>
                <p className="text-sm font-black text-brand-ink tracking-tight italic">
                  {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalItems)} 
                  <span className="text-brand-secondary/40 mx-2">/</span>
                  {totalItems} <span className="text-[10px] opacity-40 uppercase">Từ vựng</span>
                </p>
             </div>
             <div className="h-8 w-px bg-brand-border mx-2" />
             <div className="flex flex-col">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng thái</p>
                <div className="flex items-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <p className="text-xs font-bold text-brand-ink uppercase tracking-tighter italic">Live Database Stream</p>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-4">
             <p className="hidden md:block text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em] opacity-40 mr-4">
               Trang {currentPage} <ArrowRight className="inline w-3 h-3 mx-1" /> {totalPages}
             </p>
             <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  disabled={currentPage === 1} 
                  onClick={() => setCurrentPage(currentPage - 1)} 
                  className="rounded-2xl border-2 border-brand-border h-12 px-6 font-black bg-white shadow-lg shadow-black/5 hover:bg-brand-highlight active:scale-95 transition-all gap-2"
                >
                  <ChevronLeft className="w-5 h-5" /> Trước
                </Button>
                <div className="hidden md:flex gap-1 items-center px-2">
                   {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Logic đơn giản hiển thị vài trang xung quanh trang hiện tại
                      let pageNum = currentPage;
                      if (currentPage <= 3) pageNum = i + 1;
                      else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                      else pageNum = currentPage - 2 + i;

                      if (pageNum <= 0 || pageNum > totalPages) return null;

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={cn(
                            "w-10 h-10 rounded-xl text-xs font-black transition-all",
                            currentPage === pageNum ? "bg-brand-ink text-white shadow-lg" : "text-brand-secondary hover:bg-brand-highlight"
                          )}
                        >
                          {pageNum}
                        </button>
                      );
                   })}
                </div>
                <Button 
                  variant="outline" 
                  disabled={currentPage === totalPages} 
                  onClick={() => setCurrentPage(currentPage + 1)} 
                  className="rounded-2xl border-2 border-brand-border h-12 px-6 font-black bg-white shadow-lg shadow-black/5 hover:bg-brand-highlight active:scale-95 transition-all gap-2"
                >
                  Sau <ChevronRight className="w-5 h-5" />
                </Button>
             </div>
          </div>
      </div>

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
           <div className="w-full max-w-2xl relative">
              <Button onClick={() => setIsImportModalOpen(false)} variant="ghost" size="icon" className="absolute -top-12 -right-12 text-white hover:bg-white/10 rounded-full h-10 w-10"><X className="w-6 h-6" /></Button>
              <ImportVocabulary onImportStarted={() => { setIsImportModalOpen(false); fetchData(); }} />
           </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && currentVocab && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
           <Card className="w-full max-w-4xl bg-white border-brand-border shadow-2xl rounded-[2.5rem] overflow-hidden">
             <div className="p-8 border-b border-brand-border bg-brand-highlight/20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
                      <Edit3 className="w-6 h-6 text-white" />
                   </div>
                   <div>
                      <h2 className="text-xl font-black text-brand-ink uppercase italic leading-none">{currentVocab.id ? "Cập nhật Từ vựng" : "Thêm từ vựng mới"}</h2>
                      <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mt-1 opacity-60 italic">Vocabulary Data Entry</p>
                   </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsEditModalOpen(false)} className="rounded-full h-12 w-12 hover:bg-brand-highlight"><X className="w-6 h-6" /></Button>
             </div>
             
             <form onSubmit={handleSave} className="p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                           <LayoutGrid className="w-3 h-3 text-brand-primary" /> Từ vựng Hán tự *
                         </label>
                         <Input 
                            value={currentVocab.word} 
                            onChange={e => setCurrentVocab({...currentVocab, word: e.target.value})} 
                            placeholder="Vd: 律师"
                            className="h-16 text-3xl font-black border-2 border-brand-border bg-brand-highlight/10 focus:bg-white focus:border-brand-primary rounded-2xl transition-all" 
                            required 
                         />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pinyin *</label>
                            <Input value={currentVocab.pinyin} onChange={e => setCurrentVocab({...currentVocab, pinyin: e.target.value})} placeholder="lǜshī" className="h-12 font-bold border-brand-border rounded-xl" required />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Thứ tự ưu tiên</label>
                            <Input type="number" value={currentVocab.sortOrder} onChange={e => setCurrentVocab({...currentVocab, sortOrder: Number(e.target.value)})} className="h-12 border-brand-border rounded-xl font-bold" />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nghĩa tiếng Việt *</label>
                         <Input value={currentVocab.meaning} onChange={e => setCurrentVocab({...currentVocab, meaning: e.target.value})} placeholder="Luật sư" className="h-12 font-bold border-brand-border rounded-xl" required />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Đích đến (Bài học) *</label>
                         <div className="relative">
                            <BookMarked className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-primary z-10" />
                            <FormSelect 
                                className="w-full h-12 pl-12 pr-4 bg-brand-highlight/20 border-2 border-brand-border rounded-xl font-bold"
                                value={currentVocab.lessonId || ''}
                                onChange={e => setCurrentVocab({...currentVocab, lessonId: e.target.value})}
                                required
                            >
                                <option value="">-- Chọn bài học đích --</option>
                                {flatLessons.map(l => (
                                   <option key={l.id} value={l.id}>{l.title} ({l.level})</option>
                                ))}
                            </FormSelect>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Music className="w-3 h-3 text-brand-primary" /> Cloud Audio Asset (mp3)</label>
                         <div className="flex gap-2">
                            <Input value={currentVocab.audioUrl} onChange={e => setCurrentVocab({...currentVocab, audioUrl: e.target.value})} placeholder="Vd: audio/lesson1/word1.mp3" className="h-12 border-brand-border rounded-xl font-mono text-xs flex-1" />
                            {currentVocab.audioUrl && <Button type="button" onClick={() => playAudio(currentVocab.audioUrl)} variant="outline" className="h-12 w-12 rounded-xl border-brand-border text-brand-primary"><Play className="w-4 h-4" /></Button>}
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><ImageIcon className="w-3 h-3 text-brand-primary" /> Visual Asset (jpg/png)</label>
                         <div className="flex gap-2">
                            <Input value={currentVocab.imageUrl} onChange={e => setCurrentVocab({...currentVocab, imageUrl: e.target.value})} placeholder="Vd: images/lesson1/word1.jpg" className="h-12 border-brand-border rounded-xl font-mono text-xs flex-1" />
                            {currentVocab.imageUrl && <Button type="button" onClick={() => setPreviewImage(getMediaUrl(currentVocab.imageUrl))} variant="outline" className="h-12 w-12 rounded-xl border-brand-border text-emerald-500"><Eye className="w-4 h-4" /></Button>}
                         </div>
                      </div>
                      <div className="space-y-4 pt-4 border-t border-brand-border">
                         <label className="text-[10px] font-black text-brand-primary uppercase tracking-widest flex items-center gap-2 italic"><Quote className="w-4 h-4" /> Bối cảnh sử dụng (Example)</label>
                         <Input value={currentVocab.exampleCn} onChange={e => setCurrentVocab({...currentVocab, exampleCn: e.target.value})} placeholder="Câu tiếng Trung mẫu..." className="h-11 border-brand-border bg-brand-highlight/10 rounded-xl text-sm font-bold" />
                         <Input value={currentVocab.examplePy} onChange={e => setCurrentVocab({...currentVocab, examplePy: e.target.value})} placeholder="Phiên âm Pinyin..." className="h-11 border-brand-border bg-brand-highlight/10 rounded-xl text-xs italic" />
                         <Input value={currentVocab.exampleVn} onChange={e => setCurrentVocab({...currentVocab, exampleVn: e.target.value})} placeholder="Bản dịch tiếng Việt..." className="h-11 border-brand-border bg-brand-highlight/10 rounded-xl text-sm" />
                      </div>
                   </div>
                </div>

                <div className="pt-6 border-t border-brand-border flex gap-4">
                   <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)} className="h-16 px-10 rounded-2xl font-black uppercase tracking-widest border-brand-border">Hủy bỏ</Button>
                   <Button type="submit" disabled={isSaving} className="flex-1 bg-brand-primary text-white h-16 rounded-2xl font-black shadow-xl shadow-brand-primary/20 text-lg uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95">
                      {isSaving ? <RefreshCw className="w-6 h-6 animate-spin" /> : <><Save className="w-5 h-5 mr-3" /> Lưu thay đổi</>}
                   </Button>
                </div>
             </form>
           </Card>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-brand-ink/90 backdrop-blur-xl p-8 animate-in zoom-in duration-300" onClick={() => setPreviewImage(null)}>
           <div className="max-w-4xl max-h-full relative group">
              <img src={previewImage} className="max-w-full max-h-full rounded-[2rem] shadow-2xl border-4 border-white/20 object-contain shadow-brand-primary/10" alt="Preview" />
              <Button onClick={() => setPreviewImage(null)} variant="ghost" size="icon" className="absolute -top-12 -right-12 text-white hover:bg-white/10 rounded-full h-12 w-12"><X className="w-8 h-8" /></Button>
           </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d1d1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #bbbbbb;
        }
      `}</style>
    </div>
  );
}

// Layout components
const LayoutGrid = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
);
