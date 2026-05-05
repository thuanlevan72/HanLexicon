import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BookMarked, Plus, Edit3, Trash2, RefreshCw, X, Save, Filter, Search, Type, HelpCircle, Trophy,
  ArrowRight, History, Layers
} from 'lucide-react';
import { adminService, Category } from '@/src/services/api';
import { FormSelect } from '@/src/components/ui/FormSelect';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
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
    } catch (e) { console.error('Lỗi tải bộ lọc bài học', e); }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await adminService.adminGetLessons(selectedCategoryId > 0 ? selectedCategoryId : undefined);
      const data = res.data || res || [];
      setLessons(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Lỗi tải danh sách bài học', error);
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
        toast.success(dataToSave.id ? 'Cập nhật bài học thành công' : 'Thêm bài học mới thành công');
        setIsEditModalOpen(false);
        fetchData();
      } else {
        toast.error(res.message || "Lỗi khi lưu bài học");
      }
    } catch (error: any) {
      toast.error("Lỗi kết nối: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Xóa bài học này? Tất cả dữ liệu bên trong sẽ bị ảnh hưởng.")) return;
    try {
      const res = await adminService.adminDeleteLesson(id);
      if (res.isSuccess) {
        toast.success('Xóa bài học thành công');
        fetchData();
      } else {
        toast.error(res.message || "Không thể xóa bài học này.");
      }
    } catch (error: any) {
      toast.error("Lỗi khi xóa: " + error.message);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] gap-6 animate-in fade-in duration-500 relative">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div>
          <h1 className="text-3xl font-black text-brand-ink tracking-tight uppercase italic flex items-center gap-3 font-heading">
             <BookMarked className="w-8 h-8 text-brand-primary" />
             Quản lý Bài học
          </h1>
          <div className="flex items-center gap-2 mt-1">
             <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary font-black border-none px-3 py-1">
                {lessons.length} BÀI HỌC
             </Badge>
             <p className="text-brand-secondary text-xs font-bold uppercase tracking-widest opacity-60">Lesson Master Index</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={fetchData} variant="outline" className="h-12 w-12 p-0 rounded-2xl border-brand-border hover:bg-brand-highlight transition-all hover:scale-105 active:scale-95">
            <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
          </Button>
          <Button onClick={handleOpenAdd} className="h-12 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-lg shadow-brand-primary/20 gap-2 transition-all hover:scale-105 active:scale-95">
            <Plus className="w-5 h-5" /> Thêm bài học
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <Card className="p-4 border-brand-border bg-white rounded-[1.5rem] shadow-sm shrink-0">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative group flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-primary transition-colors" />
            <input
              type="text" placeholder="Tìm kiếm bài học theo tên..."
              className="w-full h-12 pl-12 pr-4 bg-brand-highlight/20 border-2 border-transparent focus:border-brand-primary focus:bg-white rounded-xl font-bold text-sm outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 min-w-[250px]">
            <Layers className="w-4 h-4 text-brand-secondary shrink-0" />
            <FormSelect 
              className="h-12 border-none bg-brand-highlight/30"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
            >
              <option value="0">Tất cả danh mục</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </FormSelect>
          </div>
        </div>
      </Card>

      {/* Main Table Content */}
      <Card className="flex-1 border border-brand-border bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          <table className="w-full text-left border-collapse table-fixed">
            <thead className="sticky top-0 z-10 bg-brand-highlight/95 backdrop-blur-md shadow-sm">
              <tr className="border-b border-brand-border text-[10px] font-black uppercase tracking-widest text-brand-secondary">
                <th className="p-6 w-1/3">Tiêu đề (Trung/Việt)</th>
                <th className="p-6 w-1/4">Quản lý nội dung</th>
                <th className="p-6 w-1/4">Hệ thống</th>
                <th className="p-6 w-32 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {loading && lessons.length === 0 ? (
                <tr><td colSpan={4} className="p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></td></tr>
              ) : filteredLessons.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <div className="max-w-xs mx-auto space-y-4">
                      <div className="w-20 h-20 bg-brand-highlight rounded-full flex items-center justify-center mx-auto">
                        <Filter className="w-10 h-10 text-slate-300" />
                      </div>
                      <p className="font-black text-brand-ink uppercase italic">No lessons found</p>
                    </div>
                  </td>
                </tr>
              ) : filteredLessons.map((l) => (
                <tr key={l.id} className="hover:bg-brand-highlight/5 transition-all group border-b border-brand-border">
                  <td className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-ink text-white flex items-center justify-center shrink-0 text-xs font-black italic shadow-lg shadow-brand-ink/20">
                        #{l.sortOrder}
                      </div>
                      <div className="space-y-1">
                        <p className="font-black text-3xl text-brand-ink leading-tight">{l.titleCn}</p>
                        <p className="text-sm font-bold text-brand-secondary italic opacity-60">{l.titleVn}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-wrap gap-2">
                       <button 
                        onClick={() => navigate(`/admin/lessons/${l.id}/hanzi`)}
                        className="h-9 px-3 rounded-xl bg-brand-highlight/80 text-brand-primary text-[10px] font-black uppercase flex items-center gap-1.5 hover:bg-brand-primary hover:text-white transition-all shadow-sm"
                       >
                          <Type className="w-3.5 h-3.5" /> Hanzi
                       </button>
                       <button 
                        onClick={() => navigate(`/admin/lessons/${l.id}/quizzes`)}
                        className="h-9 px-3 rounded-xl bg-brand-highlight/80 text-brand-primary text-[10px] font-black uppercase flex items-center gap-1.5 hover:bg-brand-primary hover:text-white transition-all shadow-sm"
                       >
                          <HelpCircle className="w-3.5 h-3.5" /> Quiz
                       </button>
                       <button 
                        onClick={() => navigate(`/admin/lessons/${l.id}/challenge`)}
                        className="h-9 px-3 rounded-xl bg-brand-highlight/80 text-brand-primary text-[10px] font-black uppercase flex items-center gap-1.5 hover:bg-brand-primary hover:text-white transition-all shadow-sm"
                       >
                          <Trophy className="w-3.5 h-3.5" /> Challenge
                       </button>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col gap-1.5 opacity-40">
                       <div className="flex items-center gap-1.5">
                          <History className="w-3 h-3" />
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">ID: {l.id?.substring(0,8)}...</p>
                       </div>
                       <p className="text-[9px] font-black text-slate-400 truncate max-w-[150px]">{l.filename}</p>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button 
                        onClick={() => handleOpenEdit(l)} 
                        className="h-9 w-9 rounded-xl flex items-center justify-center bg-brand-highlight/80 text-brand-primary hover:bg-brand-primary hover:text-white transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(l.id)} 
                        className="h-9 w-9 rounded-xl flex items-center justify-center bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* STICKY STATUS BAR */}
      <div className="sticky bottom-0 z-20 shrink-0 bg-white/80 backdrop-blur-xl border border-brand-border p-4 rounded-3xl shadow-2xl flex items-center justify-between animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-6">
             <div className="flex flex-col">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hệ thống</p>
                <p className="text-sm font-black text-brand-ink tracking-tight italic">
                  Tổng cộng {lessons.length} <span className="text-[10px] opacity-40 uppercase ml-1">Bài học</span>
                </p>
             </div>
             <div className="h-8 w-px bg-brand-border mx-2" />
             <div className="flex flex-col">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng thái</p>
                <div className="flex items-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <p className="text-xs font-bold text-brand-ink uppercase tracking-tighter italic">Live Lessons Stream</p>
                </div>
             </div>
          </div>
          <p className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em] opacity-40">
             Admin Dashboard <ArrowRight className="inline w-3 h-3 mx-1" /> Lessons
          </p>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && currentLesson && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-lg bg-white border-brand-border shadow-2xl rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-brand-border bg-brand-highlight/20 flex items-center justify-between">
              <h2 className="text-xl font-black text-brand-ink uppercase italic">{currentLesson.id ? "Cập nhật bài học" : "Thêm bài học mới"}</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsEditModalOpen(false)} className="rounded-full h-12 w-12 hover:bg-brand-highlight"><X className="w-6 h-6" /></Button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">Tiêu đề Hán tự *</label>
                  <Input value={currentLesson.titleCn} onChange={e => setCurrentLesson({ ...currentLesson, titleCn: e.target.value })} className="h-14 rounded-2xl font-bold border-brand-border" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">Tiêu đề Việt *</label>
                  <Input value={currentLesson.titleVn} onChange={e => setCurrentLesson({ ...currentLesson, titleVn: e.target.value })} className="h-14 rounded-2xl font-bold border-brand-border" required />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">Danh mục cấp độ *</label>
                <FormSelect 
                  className="w-full h-14 bg-brand-highlight/30 border-2 border-brand-highlight rounded-2xl font-bold"
                  value={currentLesson.categoryId || ''}
                  onChange={e => setCurrentLesson({ ...currentLesson, categoryId: Number(e.target.value) })}
                  required
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </FormSelect>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">Mô tả bài học</label>
                <textarea 
                  className="w-full p-4 bg-white border-2 border-brand-border rounded-2xl font-medium text-brand-ink outline-none focus:border-brand-primary min-h-[100px]"
                  value={currentLesson.description}
                  onChange={e => setCurrentLesson({ ...currentLesson, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">Tên file (ID tĩnh)</label>
                  <Input value={currentLesson.filename} onChange={e => setCurrentLesson({ ...currentLesson, filename: e.target.value })} className="h-14 rounded-2xl border-brand-border" placeholder="hsk1-b1.html" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">Thứ tự hiển thị</label>
                  <Input type="number" value={currentLesson.sortOrder} onChange={e => setCurrentLesson({ ...currentLesson, sortOrder: Number(e.target.value) })} className="h-14 rounded-2xl border-brand-border" />
                </div>
              </div>

              <Button type="submit" disabled={isSaving} className="w-full bg-brand-primary text-white h-16 rounded-2xl font-black shadow-xl text-lg uppercase tracking-widest mt-4">
                {isSaving ? <RefreshCw className="w-6 h-6 animate-spin" /> : <><Save className="w-5 h-5 mr-2" /> Xác nhận lưu</>}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
