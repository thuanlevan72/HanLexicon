import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BookMarked, Plus, Edit3, Trash2, RefreshCw, X, Save, Filter, Search, Type, HelpCircle, Trophy, Layers, ArrowRight, History, CheckCircle2
} from 'lucide-react';
import { adminService, Category } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function LessonManager() {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchFilters = async () => {
    try {
      const res = await adminService.adminGetCategories();
      const data = res.data || res || [];
      setCategories(Array.isArray(data) ? data : []);
    } catch (e) { console.error(e); }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await adminService.adminGetLessons(selectedCategoryId > 0 ? selectedCategoryId : undefined);
      const data = res.data || res || [];
      setLessons(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFilters(); }, []);
  useEffect(() => { fetchData(); }, [selectedCategoryId]);

  const filteredLessons = lessons.filter(l => {
    const titleCn = l.titleCn || l.TitleCn || "";
    const titleVn = l.titleVn || l.TitleVn || "";
    return titleCn.toLowerCase().includes(searchTerm.toLowerCase()) || 
           titleVn.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleOpenAdd = () => {
    setCurrentLesson({ 
      titleCn: '', titleVn: '', description: '', 
      categoryId: selectedCategoryId > 0 ? selectedCategoryId : (categories[0]?.id || 0),
      sortOrder: lessons.length + 1, filename: '',
      icon: '📚', isPublished: true, badge: ''
    });
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (lesson: any) => {
    setCurrentLesson({
      id: lesson.id || lesson.Id,
      titleCn: lesson.titleCn || lesson.TitleCn || '',
      titleVn: lesson.titleVn || lesson.TitleVn || '',
      description: lesson.description || lesson.Description || '',
      categoryId: lesson.categoryId || lesson.CategoryId,
      sortOrder: lesson.sortOrder || lesson.SortOrder || 0,
      filename: lesson.filename || lesson.Filename || '',
      icon: lesson.icon || lesson.Icon || '📚',
      isPublished: lesson.isPublished ?? lesson.IsPublished ?? true,
      badge: lesson.badge || lesson.Badge || ''
    });
    setIsEditModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = { ...currentLesson };
    if (!dataToSave.filename) {
       dataToSave.filename = dataToSave.titleCn.toLowerCase().replace(/\s+/g, '-') + '.html';
    }

    setIsSaving(true);
    try {
      const res = dataToSave.id 
        ? await adminService.adminUpdateLesson(dataToSave.id, dataToSave)
        : await adminService.adminCreateLesson(dataToSave);
      
      if (res.isSuccess) {
        setIsEditModalOpen(false);
        fetchData();
      } else {
        alert(res.message || "Lỗi khi lưu bài học");
      }
    } catch (error: any) {
      alert("Lỗi kết nối: " + error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Xóa bài học này? Tất cả dữ liệu bên trong sẽ bị ảnh hưởng.")) return;
    try {
      const res = await adminService.adminDeleteLesson(id);
      if (res.isSuccess) {
        fetchData();
      } else {
        alert(res.message || "Không thể xóa bài học này.");
      }
    } catch (error: any) {
      alert("Lỗi: " + error.toString());
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] gap-6 animate-in fade-in duration-500 relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div>
          <h1 className="text-3xl font-black text-brand-ink tracking-tight uppercase italic flex items-center gap-3 font-heading">
             <BookMarked className="w-8 h-8 text-brand-primary" />
             Quản lý Bài học
          </h1>
          <div className="flex items-center gap-2 mt-1">
             <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary font-black border-none px-3 py-1">
                {lessons.length} NỘI DUNG
             </Badge>
             <p className="text-brand-secondary text-xs font-bold uppercase tracking-widest opacity-60 italic">HSK Curriculum Stream</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={fetchData} variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-brand-highlight">
            <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
          </Button>
          <Button onClick={handleOpenAdd} className="h-12 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-lg shadow-brand-primary/20 gap-2 transition-all hover:scale-105 active:scale-95">
            <Plus className="w-5 h-5" /> Thêm bài học
          </Button>
        </div>
      </div>

      {/* Advanced Filters Bar */}
      <Card className="p-4 border-brand-border bg-white rounded-[1.5rem] shadow-sm shrink-0">
        <div className="flex flex-col lg:flex-row gap-4">
           <form onSubmit={e => e.preventDefault()} className="relative flex-1 group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-primary transition-colors" />
             <input 
               placeholder="Tìm bài học theo tiêu đề..."
               className="w-full h-12 pl-12 pr-4 bg-brand-highlight/20 border-2 border-transparent focus:border-brand-primary focus:bg-white rounded-xl font-bold text-sm outline-none transition-all"
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
             />
           </form>
           
           <div className="flex items-center gap-2 min-w-[250px]">
              <Layers className="w-4 h-4 text-brand-secondary shrink-0" />
              <select 
                className="w-full h-12 bg-brand-highlight/30 border-none rounded-xl px-4 font-bold text-xs text-brand-ink outline-none cursor-pointer hover:bg-brand-highlight/50 transition-colors"
                value={selectedCategoryId}
                onChange={e => setSelectedCategoryId(Number(e.target.value))}
              >
                <option value="0">Tất cả danh mục cấp độ</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
           </div>
        </div>
      </Card>

      {/* Main Table Card */}
      <Card className="flex-1 border border-brand-border bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto relative custom-scrollbar">
          <table className="w-full text-left border-collapse table-fixed">
            <thead className="sticky top-0 z-10 bg-brand-highlight/95 backdrop-blur-md shadow-sm">
              <tr className="border-b border-brand-border text-[10px] font-black uppercase tracking-widest text-brand-secondary">
                <th className="p-6 w-24">Thứ tự</th>
                <th className="p-6 w-1/3">Tiêu đề (Trung/Việt)</th>
                <th className="p-6">Liên kết nội dung</th>
                <th className="p-6 w-32 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {loading && lessons.length === 0 ? (
                <tr><td colSpan={4} className="p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></td></tr>
              ) : filteredLessons.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <p className="font-black text-brand-secondary uppercase italic opacity-40">Không tìm thấy bài học nào phù hợp</p>
                  </td>
                </tr>
              ) : filteredLessons.map((l) => (
                <tr key={l.id} className="hover:bg-brand-highlight/5 transition-all group border-b border-brand-border">
                  <td className="p-6">
                    <div className="w-10 h-10 rounded-xl bg-brand-highlight text-brand-primary flex items-center justify-center text-xs font-black italic border-2 border-brand-border shadow-sm">
                       #{l.sortOrder}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="space-y-0.5">
                      <p className="text-xl font-black text-brand-ink leading-tight">{l.titleCn}</p>
                      <p className="text-sm font-bold text-brand-secondary italic opacity-70">{l.titleVn}</p>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-wrap gap-1.5">
                       <Button 
                        onClick={() => navigate(`/admin/lessons/${l.id}/hanzi`)}
                        variant="ghost" className="h-9 px-3 rounded-xl bg-brand-highlight/50 border border-brand-border text-[10px] font-black uppercase gap-1.5 hover:bg-brand-primary hover:text-white transition-all shadow-sm"
                       >
                          <Type className="w-3.5 h-3.5" /> Hanzi
                       </Button>
                       <Button 
                        onClick={() => navigate(`/admin/lessons/${l.id}/quizzes`)}
                        variant="ghost" className="h-9 px-3 rounded-xl bg-brand-highlight/50 border border-brand-border text-[10px] font-black uppercase gap-1.5 hover:bg-brand-primary hover:text-white transition-all shadow-sm"
                       >
                          <HelpCircle className="w-3.5 h-3.5" /> Quiz
                       </Button>
                       <Button 
                        onClick={() => navigate(`/admin/lessons/${l.id}/challenge`)}
                        variant="ghost" className="h-9 px-3 rounded-xl bg-brand-highlight/50 border border-brand-border text-[10px] font-black uppercase gap-1.5 hover:bg-brand-primary hover:text-white transition-all shadow-sm"
                       >
                          <Trophy className="w-3.5 h-3.5" /> Challenge
                       </Button>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button onClick={() => handleOpenEdit(l)} className="h-9 w-9 rounded-xl flex items-center justify-center bg-brand-highlight/80 text-brand-primary hover:bg-brand-primary hover:text-white transition-all"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(l.id)} className="h-9 w-9 rounded-xl flex items-center justify-center bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Footer Info Bar */}
      <div className="sticky bottom-0 z-20 shrink-0 bg-white/80 backdrop-blur-xl border border-brand-border p-4 rounded-3xl shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-6">
             <div className="flex flex-col">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Database Master</p>
                <div className="flex items-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <p className="text-xs font-bold text-brand-ink uppercase tracking-tighter italic">Live Lesson Stream</p>
                </div>
             </div>
          </div>
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] italic">HanLexicon Curriculum Core</p>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && currentLesson && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-2xl bg-white border-brand-border shadow-2xl rounded-[3rem] overflow-hidden border-8">
            <div className="p-8 border-b-4 border-brand-border bg-brand-highlight/20 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-ink rounded-2xl flex items-center justify-center shadow-lg rotate-3">
                     <BookMarked className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-brand-ink uppercase italic leading-none">{currentLesson.id ? "Sửa thông tin bài học" : "Tạo bài học mới"}</h2>
                     <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mt-1 opacity-60 italic">Lesson Curriculum Entry</p>
                  </div>
               </div>
               <Button variant="ghost" size="icon" onClick={() => setIsEditModalOpen(false)} className="rounded-full h-12 w-12 hover:bg-brand-highlight transition-all text-brand-ink"><X className="w-6 h-6" /></Button>
            </div>

            <form onSubmit={handleSave} className="p-10 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Tiêu đề Hán tự *</label>
                  <Input value={currentLesson.titleCn} onChange={e => setCurrentLesson({ ...currentLesson, titleCn: e.target.value })} className="h-14 rounded-2xl font-black border-2 border-brand-border focus:border-brand-primary transition-all text-lg" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Tiêu đề tiếng Việt *</label>
                  <Input value={currentLesson.titleVn} onChange={e => setCurrentLesson({ ...currentLesson, titleVn: e.target.value })} className="h-14 rounded-2xl font-bold border-2 border-brand-border focus:border-brand-primary transition-all" required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Danh mục Cấp độ *</label>
                <div className="relative">
                   <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-primary z-10" />
                   <select 
                     className="w-full h-14 pl-12 pr-4 bg-brand-highlight/20 border-2 border-brand-border rounded-2xl font-black text-xs text-brand-ink outline-none focus:border-brand-primary transition-all appearance-none"
                     value={currentLesson.categoryId}
                     onChange={e => setCurrentLesson({ ...currentLesson, categoryId: Number(e.target.value) })}
                     required
                   >
                     {categories.map(cat => (
                       <option key={cat.id} value={cat.id}>{cat.name}</option>
                     ))}
                   </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Mô tả tóm tắt</label>
                <textarea 
                  className="w-full p-6 bg-brand-highlight/10 border-2 border-brand-border rounded-2xl font-medium text-brand-ink outline-none focus:bg-white focus:border-brand-primary transition-all min-h-[120px] text-sm"
                  value={currentLesson.description}
                  onChange={e => setCurrentLesson({ ...currentLesson, description: e.target.value })}
                  placeholder="Nhập mô tả ngắn gọn về nội dung bài học..."
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Mã file (ID tĩnh)</label>
                  <Input value={currentLesson.filename} onChange={e => setCurrentLesson({ ...currentLesson, filename: e.target.value })} className="h-12 rounded-xl border-2 border-brand-border focus:border-brand-primary font-mono text-xs" placeholder="hsk1-b1.html" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Thứ tự hiển thị</label>
                  <Input type="number" value={currentLesson.sortOrder} onChange={e => setCurrentLesson({ ...currentLesson, sortOrder: Number(e.target.value) })} className="h-12 rounded-xl border-2 border-brand-border focus:border-brand-primary font-bold" />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                 <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)} className="flex-1 h-16 rounded-2xl font-black uppercase tracking-widest border-4 border-brand-border">Hủy bỏ</Button>
                 <Button type="submit" disabled={isSaving} className="flex-[2] bg-brand-primary text-white h-16 rounded-2xl font-black shadow-xl shadow-brand-primary/20 text-lg uppercase tracking-widest transition-all active:scale-95">
                   {isSaving ? <RefreshCw className="w-6 h-6 animate-spin mx-auto" /> : <><Save className="w-5 h-5 mr-3" /> Lưu bài học</>}
                 </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d1d1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #bbbbbb; }
      `}</style>
    </div>
  );
}
