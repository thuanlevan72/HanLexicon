import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, Plus, Upload, Edit3, Trash2, X, Volume2, 
  Image as ImageIcon, RefreshCw, ChevronLeft, ChevronRight, Play,
  Link as LinkIcon, BookOpen, Quote, LayoutGrid, Music, Maximize2,
  Filter, Layers, BookMarked
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Vocabulary, adminService, learningService, LessonFlat, Category } from '@/src/services/api';
import { Badge } from '@/components/ui/badge';
import ImportVocabulary from './import/ImportVocabulary';

export default function VocabularyManager() {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtering states
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [flatLessons, setFlatLessons] = useState<LessonFlat[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 10;
  
  // Modals
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentVocab, setCurrentVocab] = useState<Partial<Vocabulary> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchFilters = async () => {
    try {
      const [catsRes, lessonsRes] = await Promise.all([
        learningService.getLessons(),
        learningService.getLessonsFlat()
      ]);
      setCategories(catsRes);
      setFlatLessons(lessonsRes);
    } catch (e) { console.error("Lỗi fetch filters", e); }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const vocabRes = await adminService.getVocabularies({ 
        page: currentPage, 
        pageSize, 
        search: searchTerm,
        categoryId: selectedCategoryId > 0 ? selectedCategoryId : undefined,
        lessonId: selectedLessonId || undefined
      });
      if (vocabRes.isSuccess) {
        setVocabularies(vocabRes.data.items);
        setTotalPages(vocabRes.data.totalPages);
        setTotalItems(vocabRes.data.totalItems);
      }
    } catch (error) { console.error(error); } 
    finally { setLoading(false); }
  };

  useEffect(() => { fetchFilters(); }, []);
  useEffect(() => { fetchData(); }, [currentPage, selectedCategoryId, selectedLessonId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchData();
  };

  const handleRefresh = () => {
    setSearchTerm('');
    setSelectedCategoryId(0);
    setSelectedLessonId('');
    setCurrentPage(1);
    fetchData();
  };

  const handlePlayAudio = (url?: string) => {
    if (!url) return;
    new Audio(url).play().catch(console.error);
  };

  const handleOpenAdd = () => {
    setCurrentVocab({ 
      word: '', pinyin: '', meaning_vn: '', meaning_en: '', 
      example_cn: '', example_vn: '', example_py: '',
      audio: '', image: '', sortOrder: 0, 
      lessonId: flatLessons[0]?.id || '' 
    });
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (vocab: Vocabulary) => {
    setCurrentVocab(vocab);
    setIsEditModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentVocab || !currentVocab.lessonId) return;
    setIsSaving(true);
    const payload = {
      Id: currentVocab.id || '00000000-0000-0000-0000-000000000000',
      LessonId: currentVocab.lessonId,
      Word: currentVocab.word,
      Pinyin: currentVocab.pinyin,
      Meaning: currentVocab.meaning_vn,
      MeaningEn: currentVocab.meaning_en || "",
      AudioUrl: currentVocab.audio || "",
      ImageUrl: currentVocab.image || "",
      ExampleCn: currentVocab.example_cn || "",
      ExamplePy: currentVocab.example_py || "",
      ExampleVn: currentVocab.example_vn || "",
      SortOrder: Number(currentVocab.sortOrder) || 0
    };
    try {
      const res = currentVocab.id ? await adminService.updateVocabulary(currentVocab.id, payload) : await adminService.createVocabulary(payload);
      if (res.isSuccess) { setIsEditModalOpen(false); fetchData(); } else { alert(res.message); }
    } catch (error: any) { alert("Lỗi: " + error?.message); } 
    finally { setIsSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Xóa từ vựng này?")) return;
    try { await adminService.deleteVocabulary(id); fetchData(); } catch (error) { alert("Lỗi khi xóa"); }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-brand-ink tracking-tight uppercase italic font-heading">Quản lý kho từ vựng</h1>
          <p className="text-brand-secondary font-medium">Hiện có {totalItems} từ vựng trong hệ thống.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleRefresh} variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-brand-highlight text-brand-secondary">
             <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
          </Button>
          <Button onClick={() => setIsImportModalOpen(true)} variant="outline" className="h-12 px-6 rounded-2xl border-brand-border font-bold gap-2 hover:bg-brand-highlight shadow-sm">
            <Upload className="w-5 h-5" /> Import Excel
          </Button>
          <Button onClick={handleOpenAdd} className="h-12 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-lg gap-2 hover:scale-[1.02] active:scale-95 transition-all">
            <Plus className="w-5 h-5" /> Thêm từ mới
          </Button>
        </div>
      </div>

      <Card className="p-6 border-brand-border bg-white rounded-[2rem] shadow-sm">
        <form onSubmit={handleSearch} className="space-y-4">
          {/* Hàng 1: Tìm kiếm văn bản (Full width) */}
          <div className="relative w-full group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
            <input 
              type="text" placeholder="Tìm kiếm theo Hán tự, Pinyin hoặc Nghĩa tiếng Việt..."
              className="w-full h-16 pl-14 pr-4 bg-brand-surface border-2 border-transparent rounded-2xl font-bold text-base focus:border-brand-primary focus:bg-white transition-all outline-none shadow-inner"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Hàng 2: Bộ lọc chuyên sâu & Hành động */}
          <div className="flex flex-col lg:flex-row gap-4 items-center">
             <div className="flex flex-1 gap-4 w-full">
                {/* Category Filter */}
                <div className="relative flex-1">
                    <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <select 
                      className="w-full h-14 pl-10 pr-4 bg-brand-highlight/30 border-none rounded-2xl font-black text-[10px] uppercase tracking-widest text-brand-ink outline-none cursor-pointer appearance-none hover:bg-brand-highlight/50 transition-colors"
                      value={selectedCategoryId}
                      onChange={(e) => { setSelectedCategoryId(Number(e.target.value)); setSelectedLessonId(''); setCurrentPage(1); }}
                    >
                       <option value="0">TẤT CẢ DANH MỤC</option>
                       {Array.isArray(categories) && categories.map((c, idx) => (
                         <option key={`cat-${c.id}-${idx}`} value={c.id}>
                           {(c.categoryName || 'N/A').toUpperCase()}
                         </option>
                       ))}
                    </select>
                    </div>

                    {/* Lesson Filter */}
                    <div className="relative flex-[2]">
                    <BookMarked className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <select 
                      className="w-full h-14 pl-10 pr-4 bg-brand-highlight/30 border-none rounded-2xl font-black text-[10px] uppercase tracking-widest text-brand-ink outline-none cursor-pointer appearance-none hover:bg-brand-highlight/50 transition-colors"
                      value={selectedLessonId}
                      onChange={(e) => { setSelectedLessonId(e.target.value); setCurrentPage(1); }}
                    >
                       <option value="">TẤT CẢ HỌC LIỆU</option>
                       {Array.isArray(flatLessons) && flatLessons
                        .filter(l => selectedCategoryId === 0 || categories?.find(c => c.id === selectedCategoryId)?.categoryName === l.level)
                        .map((l, idx) => (
                          <option key={`lesson-${l.id}-${idx}`} value={l.id}>
                            {(l.title || 'KHÔNG TÊN').toUpperCase()}
                          </option>
                        ))
                       }
                    </select>

                </div>
             </div>

             <Button type="submit" className="h-14 px-12 w-full lg:w-auto bg-brand-ink text-white rounded-2xl font-black shadow-lg hover:bg-black transition-all hover:scale-[1.02] active:scale-95">
                ÁP DỤNG BỘ LỌC
             </Button>
          </div>
        </form>
      </Card>

      <Card className="border border-brand-border bg-white rounded-[2.5rem] shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-highlight/30 border-b border-brand-border text-[10px] font-black uppercase tracking-widest text-brand-secondary">
                <th className="p-6">Từ vựng</th>
                <th className="p-6">Thông tin học liệu</th>
                <th className="p-6">Nghĩa tiếng Việt</th>
                <th className="p-6">Media</th>
                <th className="p-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {loading && vocabularies.length === 0 ? (
                <tr><td colSpan={5} className="p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></td></tr>
              ) : vocabularies.map((v) => (
                <tr key={v.id} className="hover:bg-brand-highlight/5 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-2xl border-2 border-brand-highlight flex items-center justify-center text-3xl font-black text-brand-ink shadow-sm shrink-0">
                        {v.word}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-brand-primary italic truncate uppercase tracking-tighter">{v.pinyin}</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest leading-none">Hanzi: {v.word}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                     <div className="space-y-1">
                        <Badge className="bg-indigo-50 text-indigo-700 border-indigo-100 font-bold px-3 py-1 rounded-lg text-[10px] leading-relaxed max-w-[220px] inline-block truncate italic shadow-sm">
                           {v.level}
                        </Badge>
                     </div>
                  </td>
                  <td className="p-6 font-bold text-sm text-brand-ink">{v.meaning_vn}</td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                        {v.image ? (
                          <div 
                            onClick={() => setPreviewImage(v.image || null)}
                            className="w-10 h-10 rounded-lg overflow-hidden border border-brand-border shadow-sm group/img cursor-pointer relative shrink-0 active:scale-90 transition-transform"
                          >
                             <img src={v.image} className="w-full h-full object-cover transition-transform group-hover/img:scale-125" alt="thumb" />
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                                <Maximize2 className="w-3 h-3 text-white" />
                             </div>
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center text-slate-300 shrink-0">
                             <ImageIcon className="w-4 h-4" />
                          </div>
                        )}
                        
                        {v.audio ? (
                          <Button 
                            onClick={() => handlePlayAudio(v.audio)}
                            variant="ghost" size="icon" className="w-9 h-9 rounded-full bg-brand-highlight text-brand-primary hover:bg-brand-primary hover:text-white shadow-sm transition-all"
                          >
                             <Play className="w-4 h-4 fill-current" />
                          </Button>
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 border border-dashed border-slate-200 shrink-0">
                             <Music className="w-4 h-4" />
                          </div>
                        )}
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Button onClick={() => handleOpenEdit(v)} variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-brand-highlight/50 text-brand-primary hover:bg-brand-primary hover:text-white shadow-sm transition-all"><Edit3 className="w-4 h-4" /></Button>
                      <Button onClick={() => handleDelete(v.id)} variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white shadow-sm transition-all"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-8 border-t border-brand-border flex items-center justify-between bg-brand-highlight/10">
          <p className="text-xs font-bold text-brand-secondary uppercase tracking-widest opacity-60">Trang {currentPage} / {totalPages}</p>
          <div className="flex gap-2">
            <Button variant="outline" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="rounded-xl border-brand-border h-11 px-6 font-bold bg-white hover:bg-brand-highlight transition-all shadow-sm">Trước</Button>
            <Button variant="outline" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="rounded-xl border-brand-border h-11 px-6 font-bold bg-white hover:bg-brand-highlight transition-all shadow-sm">Sau</Button>
          </div>
        </div>
      </Card>

      {/* Edit Modal */}
      {isEditModalOpen && currentVocab && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/60 backdrop-blur-md p-4 overflow-y-auto">
           <Card className="w-full max-w-2xl bg-white border-brand-border shadow-2xl animate-in zoom-in-95 duration-200 rounded-[2.5rem] overflow-hidden my-auto">
              <div className="p-8 border-b border-brand-border bg-brand-highlight/20 flex items-center justify-between sticky top-0 bg-white z-10">
                <div>
                   <h2 className="text-xl font-black text-brand-ink uppercase italic">{currentVocab.id ? "Cập nhật từ vựng" : "Thêm từ mới"}</h2>
                   <p className="text-xs font-bold text-brand-secondary">Vui lòng chọn học liệu bài học trước khi lưu.</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsEditModalOpen(false)} className="rounded-full h-12 w-12 hover:bg-brand-highlight transition-colors"><X className="w-6 h-6" /></Button>
              </div>
              
              <form onSubmit={handleSave} className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                 <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase text-brand-primary tracking-widest flex items-center gap-2"><LayoutGrid className="w-3 h-3" /> Chọn học liệu</h3>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 ml-1 italic">BÀI HỌC (LESSON) *</label>
                        <select 
                          className="w-full h-14 px-4 bg-brand-highlight/30 border-2 border-brand-highlight rounded-2xl font-bold text-brand-ink outline-none focus:border-brand-primary transition-all shadow-inner"
                          value={currentVocab.lessonId}
                          onChange={e => setCurrentVocab({...currentVocab, lessonId: e.target.value})}
                          required
                        >
                           <option value="" disabled>-- Chọn bài học từ danh sách --</option>
                           {flatLessons.map(lesson => (
                             <option key={lesson.id} value={lesson.id}>[{lesson.level}] {lesson.title}</option>
                           ))}
                        </select>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase text-brand-primary tracking-widest flex items-center gap-2"><BookOpen className="w-3 h-3" /> Thông tin từ vựng</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 ml-1 italic">HÁN TỰ *</label>
                            <Input value={currentVocab.word} onChange={e => setCurrentVocab({...currentVocab, word: e.target.value})} className="h-12 rounded-xl font-bold text-lg border-brand-border" required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 ml-1 italic">PINYIN *</label>
                            <Input value={currentVocab.pinyin} onChange={e => setCurrentVocab({...currentVocab, pinyin: e.target.value})} className="h-12 rounded-xl font-bold border-brand-border" required />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 ml-1 italic">NGHĨA TIẾNG VIỆT *</label>
                        <Input value={currentVocab.meaning_vn} onChange={e => setCurrentVocab({...currentVocab, meaning_vn: e.target.value})} className="h-12 rounded-xl font-bold border-brand-border" required />
                    </div>
                 </div>

                 <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase text-brand-primary tracking-widest flex items-center gap-2"><Quote className="w-3 h-3" /> Ví dụ & Media</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-brand-highlight/10 p-6 rounded-3xl border border-brand-border/40 shadow-inner">
                        <Input placeholder="Ví dụ (Trung)" value={currentVocab.example_cn} onChange={e => setCurrentVocab({...currentVocab, example_cn: e.target.value})} className="h-12 rounded-xl bg-white border-brand-border" />
                        <Input placeholder="Dịch ví dụ" value={currentVocab.example_vn} onChange={e => setCurrentVocab({...currentVocab, example_vn: e.target.value})} className="h-12 rounded-xl bg-white border-brand-border" />
                        <Input placeholder="Link ảnh (URL)" value={currentVocab.image} onChange={e => setCurrentVocab({...currentVocab, image: e.target.value})} className="h-12 rounded-xl bg-white border-brand-border" />
                        <Input placeholder="Link audio (URL)" value={currentVocab.audio} onChange={e => setCurrentVocab({...currentVocab, audio: e.target.value})} className="h-12 rounded-xl bg-white border-brand-border" />
                    </div>
                 </div>
              </form>

              <div className="p-8 border-t border-brand-border bg-white sticky bottom-0 flex gap-4">
                 <Button type="submit" onClick={handleSave} disabled={isSaving || !currentVocab.lessonId} className="flex-1 bg-brand-primary text-white h-16 rounded-2xl font-black shadow-xl shadow-brand-primary/20 text-lg uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-95">
                    {isSaving ? <RefreshCw className="w-6 h-6 animate-spin mr-2" /> : "XÁC NHẬN LƯU VÀO DATABASE"}
                 </Button>
              </div>
           </Card>
        </div>
      )}

      {/* Lightbox Image Preview */}
      {previewImage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-8 animate-in fade-in zoom-in-95 duration-200" onClick={() => setPreviewImage(null)}>
           <Button onClick={() => setPreviewImage(null)} variant="ghost" size="icon" className="absolute top-8 right-8 h-12 w-12 rounded-full text-white hover:bg-white/10"><X className="w-8 h-8" /></Button>
           <img src={previewImage} className="max-w-full max-h-full rounded-2xl shadow-2xl" alt="Full Preview" />
        </div>
      )}

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/40 backdrop-blur-sm p-4 animate-in zoom-in-95 duration-200">
           <div className="w-full max-w-2xl relative">
              <Button onClick={() => setIsImportModalOpen(false)} size="icon" className="absolute -top-4 -right-4 h-12 w-12 rounded-full bg-white shadow-xl z-[110] border border-brand-border hover:rotate-90 transition-transform"><X className="w-6 h-6" /></Button>
              <ImportVocabulary onImportStarted={() => { setIsImportModalOpen(false); fetchData(); }} />
           </div>
        </div>
      )}
    </div>
  );
}
