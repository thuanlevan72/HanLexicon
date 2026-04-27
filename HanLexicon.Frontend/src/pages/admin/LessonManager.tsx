import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BookMarked, Plus, Edit3, Trash2, RefreshCw, X, Save, Filter, Search, Type, HelpCircle, Trophy
} from 'lucide-react';
import { adminService, Category } from '@/src/services/api';
import { cn } from '@/lib/utils';

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
    // Chuẩn hóa dữ liệu từ Backend (hỗ trợ cả PascalCase)
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
    
    // Validate & gán mặc định cho filename nếu trống
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
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-brand-ink tracking-tight uppercase italic flex items-center gap-3 font-heading">
             <BookMarked className="w-8 h-8 text-brand-primary" />
             Quản lý Bài học
          </h1>
          <p className="text-brand-secondary font-medium">Quản lý nội dung chi tiết của từng bài học</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={fetchData} variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-brand-highlight">
            <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
          </Button>
          <Button onClick={handleOpenAdd} className="h-12 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-lg gap-2">
            <Plus className="w-5 h-5" /> Thêm bài học
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 p-6 border-brand-border bg-white rounded-[2rem] shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-brand-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-brand-secondary">Theo danh mục</span>
            </div>
            <select 
              className="w-full h-12 px-4 bg-brand-highlight/30 border-none rounded-xl font-bold text-brand-ink outline-none cursor-pointer"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
            >
              <option value="0">Tất cả danh mục</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </Card>

        <Card className="md:col-span-2 p-6 border-brand-border bg-white rounded-[2rem] shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-brand-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-brand-secondary">Tìm kiếm bài học</span>
            </div>
            <Input 
              placeholder="Nhập tiêu đề tiếng Trung hoặc tiếng Việt..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 bg-brand-highlight/30 border-none rounded-xl font-bold text-brand-ink focus-visible:ring-brand-primary"
            />
          </div>
        </Card>
      </div>

      <Card className="border border-brand-border bg-white rounded-[2.5rem] shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-highlight/30 border-b border-brand-border text-[10px] font-black uppercase tracking-widest text-brand-secondary">
                <th className="p-6">Thứ tự</th>
                <th className="p-6">Tiêu đề (Trung/Việt)</th>
                <th className="p-6">Nội dung</th>
                <th className="p-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {loading && lessons.length === 0 ? (
                <tr><td colSpan={4} className="p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></td></tr>
              ) : filteredLessons.length === 0 ? (
                <tr><td colSpan={4} className="p-20 text-center font-bold text-brand-secondary italic">Không tìm thấy bài học nào.</td></tr>
              ) : filteredLessons.map((l) => (
                <tr key={l.id} className="hover:bg-brand-highlight/5 transition-colors group">
                  <td className="p-6 font-black text-brand-primary italic">{l.sortOrder}</td>
                  <td className="p-6">
                    <div className="space-y-0.5">
                      <p className="font-bold text-lg text-brand-ink">{l.titleCn}</p>
                      <p className="text-sm text-brand-secondary italic">{l.titleVn}</p>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-2">
                       <Button 
                        onClick={() => navigate(`/admin/lessons/${l.id}/hanzi`)}
                        variant="outline" size="sm" className="rounded-xl border-brand-border text-[10px] font-black uppercase gap-1.5 hover:bg-brand-highlight"
                       >
                          <Type className="w-3 h-3 text-brand-primary" /> Hanzi
                       </Button>
                       <Button 
                        onClick={() => navigate(`/admin/lessons/${l.id}/quizzes`)}
                        variant="outline" size="sm" className="rounded-xl border-brand-border text-[10px] font-black uppercase gap-1.5 hover:bg-brand-highlight"
                       >
                          <HelpCircle className="w-3 h-3 text-brand-primary" /> Quiz
                       </Button>
                       <Button 
                        onClick={() => navigate(`/admin/lessons/${l.id}/challenge`)}
                        variant="outline" size="sm" className="rounded-xl border-brand-border text-[10px] font-black uppercase gap-1.5 hover:bg-brand-highlight"
                       >
                          <Trophy className="w-3 h-3 text-brand-primary" /> Challenge
                       </Button>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Button onClick={() => handleOpenEdit(l)} variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-brand-highlight/50 text-brand-primary hover:bg-brand-primary hover:text-white transition-all"><Edit3 className="w-4 h-4" /></Button>
                      <Button onClick={() => handleDelete(l.id)} variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

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
                <select 
                  className="w-full h-14 px-4 bg-brand-highlight/30 border-2 border-brand-highlight rounded-2xl font-bold text-brand-ink outline-none"
                  value={currentLesson.categoryId}
                  onChange={e => setCurrentLesson({ ...currentLesson, categoryId: Number(e.target.value) })}
                  required
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
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
