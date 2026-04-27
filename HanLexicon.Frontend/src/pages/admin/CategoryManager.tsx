import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Layers, Plus, Edit3, Trash2, RefreshCw, X, Save, Search
} from 'lucide-react';
import { adminService } from '@/src/services/api';
import { cn } from '@/lib/utils';

export default function CategoryManager() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await adminService.adminGetCategories(searchTerm || undefined);
      if (res.isSuccess) {
        setCategories(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  const handleOpenAdd = () => {
    setCurrentCategory({ name: '', slug: '', sortOrder: categories.length + 1 });
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (cat: any) => {
    setCurrentCategory(cat);
    setIsEditModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = currentCategory.id 
        ? await adminService.adminUpdateCategory(currentCategory.id, currentCategory)
        : await adminService.adminCreateCategory(currentCategory);
      
      if (res.isSuccess) {
        setIsEditModalOpen(false);
        fetchData();
      } else {
        alert(res.message);
      }
    } catch (error: any) {
      alert("Lỗi: " + error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Xóa danh mục này? Tất cả bài học bên trong sẽ bị ảnh hưởng.")) return;
    try {
      const res = await adminService.adminDeleteCategory(id);
      if (res.isSuccess) {
         fetchData();
      } else {
         alert(res.message || "Không thể xóa danh mục này.");
      }
    } catch (error) {
      alert("Lỗi khi xóa");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-brand-ink tracking-tight uppercase italic flex items-center gap-3 font-heading">
             <Layers className="w-8 h-8 text-brand-primary" />
             Quản lý Danh mục
          </h1>
          <p className="text-brand-secondary font-medium">Phân loại học liệu theo cấp độ (HSK 1, HSK 2...)</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={fetchData} variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-brand-highlight">
            <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
          </Button>
          <Button onClick={handleOpenAdd} className="h-12 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-lg gap-2">
            <Plus className="w-5 h-5" /> Thêm danh mục
          </Button>
        </div>
      </div>

      <Card className="p-4 border-brand-border bg-white rounded-[2rem] shadow-sm">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
          <input
            type="text" placeholder="Tìm kiếm danh mục theo tên hoặc slug..."
            className="w-full h-14 pl-14 pr-4 bg-brand-highlight/20 border-2 border-transparent rounded-2xl font-bold text-base focus:border-brand-primary focus:bg-white transition-all outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Card>

      <Card className="border border-brand-border bg-white rounded-[2.5rem] shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-highlight/30 border-b border-brand-border text-[10px] font-black uppercase tracking-widest text-brand-secondary">
                <th className="p-6">Thứ tự</th>
                <th className="p-6">Tên danh mục</th>
                <th className="p-6">Slug (URL)</th>
                <th className="p-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {loading && categories.length === 0 ? (
                <tr><td colSpan={4} className="p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></td></tr>
              ) : categories.length === 0 ? (
                <tr><td colSpan={4} className="p-20 text-center font-bold text-brand-secondary italic">Không tìm thấy danh mục nào.</td></tr>
              ) : categories.map((c) => (
                <tr key={c.id} className="hover:bg-brand-highlight/5 transition-colors group">
                  <td className="p-6 font-black text-brand-primary italic">{c.sortOrder}</td>
                  <td className="p-6">
                    <p className="font-bold text-lg text-brand-ink">{c.name}</p>
                  </td>
                  <td className="p-6">
                    <code className="bg-brand-highlight px-3 py-1 rounded-lg text-xs font-bold text-brand-secondary">/{c.slug}</code>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Button onClick={() => handleOpenEdit(c)} variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-brand-highlight/50 text-brand-primary hover:bg-brand-primary hover:text-white transition-all"><Edit3 className="w-4 h-4" /></Button>
                      <Button onClick={() => handleDelete(c.id)} variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit Modal */}
      {isEditModalOpen && currentCategory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-md bg-white border-brand-border shadow-2xl rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-brand-border bg-brand-highlight/20 flex items-center justify-between">
              <h2 className="text-xl font-black text-brand-ink uppercase italic">{currentCategory.id ? "Cập nhật danh mục" : "Thêm danh mục mới"}</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsEditModalOpen(false)} className="rounded-full h-12 w-12 hover:bg-brand-highlight"><X className="w-6 h-6" /></Button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">Tên danh mục *</label>
                <Input value={currentCategory.name} onChange={e => setCurrentCategory({ ...currentCategory, name: e.target.value })} className="h-14 rounded-2xl font-bold border-brand-border focus:border-brand-primary" required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">Slug (Đường dẫn) *</label>
                <Input value={currentCategory.slug} onChange={e => setCurrentCategory({ ...currentCategory, slug: e.target.value })} className="h-14 rounded-2xl font-bold border-brand-border focus:border-brand-primary" required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">Thứ tự hiển thị</label>
                <Input type="number" value={currentCategory.sortOrder} onChange={e => setCurrentCategory({ ...currentCategory, sortOrder: Number(e.target.value) })} className="h-14 rounded-2xl font-bold border-brand-border focus:border-brand-primary" />
              </div>

              <Button type="submit" disabled={isSaving} className="w-full bg-brand-primary text-white h-16 rounded-2xl font-black shadow-xl text-lg uppercase tracking-widest mt-4">
                {isSaving ? <RefreshCw className="w-6 h-6 animate-spin" /> : <><Save className="w-5 h-5 mr-2" /> Lưu thay đổi</>}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
