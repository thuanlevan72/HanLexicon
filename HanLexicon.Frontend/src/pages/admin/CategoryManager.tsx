import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Layers, Plus, Edit3, Trash2, RefreshCw, X, Save, Search, 
  ArrowRight, Filter, ChevronLeft, ChevronRight, History
} from 'lucide-react';
import { adminService } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

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
      console.error('Lỗi khi tải danh mục', error);
      toast.error('Không thể tải danh sách danh mục');
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
        toast.success(currentCategory.id ? 'Cập nhật danh mục thành công' : 'Thêm danh mục mới thành công');
        setIsEditModalOpen(false);
        fetchData();
      } else {
        toast.error(res.message || 'Có lỗi xảy ra khi lưu danh mục');
      }
    } catch (error: any) {
      toast.error("Lỗi: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Xóa danh mục này? Tất cả bài học bên trong sẽ bị ảnh hưởng.")) return;
    try {
      const res = await adminService.adminDeleteCategory(id);
      if (res.isSuccess) {
         toast.success('Xóa danh mục thành công');
         fetchData();
      } else {
         toast.error(res.message || "Không thể xóa danh mục này.");
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
             <Layers className="w-8 h-8 text-brand-primary" />
             Quản lý Danh mục
          </h1>
          <div className="flex items-center gap-2 mt-1">
             <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary font-black border-none px-3 py-1">
                {categories.length} DANH MỤC
             </Badge>
             <p className="text-brand-secondary text-xs font-bold uppercase tracking-widest opacity-60">Classification Tiers</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={fetchData} variant="outline" className="h-12 w-12 p-0 rounded-2xl border-brand-border hover:bg-brand-highlight transition-all hover:scale-105 active:scale-95">
            <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
          </Button>
          <Button onClick={handleOpenAdd} className="h-12 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-lg shadow-brand-primary/20 gap-2 transition-all hover:scale-105 active:scale-95">
            <Plus className="w-5 h-5" /> Thêm danh mục
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <Card className="p-4 border-brand-border bg-white rounded-[1.5rem] shadow-sm shrink-0">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-primary transition-colors" />
          <input
            type="text" placeholder="Tìm kiếm danh mục theo tên hoặc slug..."
            className="w-full h-12 pl-12 pr-4 bg-brand-highlight/20 border-2 border-transparent focus:border-brand-primary focus:bg-white rounded-xl font-bold text-sm outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Card>

      {/* Main Table Content */}
      <Card className="flex-1 border border-brand-border bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          <table className="w-full text-left border-collapse table-fixed">
            <thead className="sticky top-0 z-10 bg-brand-highlight/95 backdrop-blur-md shadow-sm">
              <tr className="border-b border-brand-border text-[10px] font-black uppercase tracking-widest text-brand-secondary">
                <th className="p-6 w-1/4">Danh mục</th>
                <th className="p-6 w-1/4">Slug (URL Path)</th>
                <th className="p-6 w-1/4">Hệ thống</th>
                <th className="p-6 w-32 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {loading && categories.length === 0 ? (
                <tr><td colSpan={4} className="p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></td></tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <div className="max-w-xs mx-auto space-y-4">
                      <div className="w-20 h-20 bg-brand-highlight rounded-full flex items-center justify-center mx-auto">
                        <Filter className="w-10 h-10 text-slate-300" />
                      </div>
                      <p className="font-black text-brand-ink uppercase italic">No categories found</p>
                      <Button variant="ghost" onClick={() => setSearchTerm('')} className="text-xs font-bold text-brand-primary">Reset search</Button>
                    </div>
                  </td>
                </tr>
              ) : categories.map((c) => (
                <tr key={c.id} className="hover:bg-brand-highlight/5 transition-all group border-b border-brand-border">
                  <td className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-ink text-white flex items-center justify-center shrink-0 text-xs font-black italic shadow-lg shadow-brand-ink/20">
                        #{c.sortOrder}
                      </div>
                      <div className="space-y-1">
                        <p className="font-black text-3xl text-brand-ink leading-tight">{c.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <code className="bg-brand-highlight px-4 py-2 rounded-xl text-xs font-black text-brand-primary border border-brand-border/50">/{c.slug}</code>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-1.5 opacity-40">
                       <History className="w-3 h-3" />
                       <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">UID: {c.id}</p>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button 
                        onClick={() => handleOpenEdit(c)} 
                        className="h-9 w-9 rounded-xl flex items-center justify-center bg-brand-highlight/80 text-brand-primary hover:bg-brand-primary hover:text-white transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(c.id)} 
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
                  Tổng cộng {categories.length} <span className="text-[10px] opacity-40 uppercase ml-1">Danh mục</span>
                </p>
             </div>
             <div className="h-8 w-px bg-brand-border mx-2" />
             <div className="flex flex-col">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng thái</p>
                <div className="flex items-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <p className="text-xs font-bold text-brand-ink uppercase tracking-tighter italic">Live Management</p>
                </div>
             </div>
          </div>
          <p className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em] opacity-40">
             Admin Dashboard <ArrowRight className="inline w-3 h-3 mx-1" /> Categories
          </p>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && currentCategory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-md bg-white border-brand-border shadow-2xl rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-brand-border bg-brand-highlight/20 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
                    {currentCategory.id ? <Edit3 className="w-6 h-6 text-white" /> : <Plus className="w-6 h-6 text-white" />}
                 </div>
                 <div>
                    <h2 className="text-xl font-black text-brand-ink uppercase italic leading-none">{currentCategory.id ? "Cập nhật danh mục" : "Thêm danh mục mới"}</h2>
                    <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mt-1 opacity-60 italic">Classification Schema</p>
                 </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsEditModalOpen(false)} className="rounded-full h-12 w-12 hover:bg-brand-highlight"><X className="w-6 h-6" /></Button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tên danh mục *</label>
                <Input value={currentCategory.name} onChange={e => setCurrentCategory({ ...currentCategory, name: e.target.value })} className="h-14 rounded-2xl font-bold border-2 border-brand-border bg-brand-highlight/10 focus:bg-white focus:border-brand-primary transition-all" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Slug (Đường dẫn) *</label>
                <Input value={currentCategory.slug} onChange={e => setCurrentCategory({ ...currentCategory, slug: e.target.value })} className="h-14 rounded-2xl font-bold border-2 border-brand-border bg-brand-highlight/10 focus:bg-white focus:border-brand-primary transition-all" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Thứ tự hiển thị</label>
                <Input type="number" value={currentCategory.sortOrder} onChange={e => setCurrentCategory({ ...currentCategory, sortOrder: Number(e.target.value) })} className="h-14 rounded-2xl font-bold border-2 border-brand-border bg-brand-highlight/10 focus:bg-white focus:border-brand-primary transition-all" />
              </div>

              <Button type="submit" disabled={isSaving} className="w-full bg-brand-primary text-white h-16 rounded-2xl font-black shadow-xl shadow-brand-primary/20 text-lg uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 mt-4">
                {isSaving ? <RefreshCw className="w-6 h-6 animate-spin" /> : <><Save className="w-5 h-5 mr-3" /> Lưu thay đổi</>}
              </Button>
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

