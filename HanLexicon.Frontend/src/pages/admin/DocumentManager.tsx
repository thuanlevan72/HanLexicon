import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FileText, Plus, Edit3, Trash2, RefreshCw, X, Save, Filter, Download, ExternalLink, Eye, EyeOff
} from 'lucide-react';
import { adminService, learningService, Category } from '@/src/services/api';
import { cn } from '@/lib/utils';

export default function DocumentManager() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentDoc, setCurrentDoc] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [catsRes, docsRes] = await Promise.all([
        learningService.getCategories(),
        adminService.adminGetDocuments(selectedCategoryId > 0 ? selectedCategoryId : undefined)
      ]);
      
      // Fix lỗi categories.map is not a function
      const categoriesData = catsRes.data || catsRes || [];
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      
      if (docsRes.isSuccess) setDocuments(docsRes.data);
    } catch (error) {
      console.error("Lỗi khi tải tài liệu:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategoryId]);

  const handleOpenAdd = () => {
    setCurrentDoc({ 
      title: '', description: '', categoryId: selectedCategoryId > 0 ? selectedCategoryId : (categories[0]?.id || 0),
      downloadUrl: '', docType: 'PDF', sortOrder: documents.length + 1, isPublished: true 
    });
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (doc: any) => {
    setCurrentDoc(doc);
    setIsEditModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = currentDoc.id 
        ? await adminService.adminUpdateDocument(currentDoc.id, currentDoc)
        : await adminService.adminCreateDocument(currentDoc);
      
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

  const handleDelete = async (id: string) => {
    if (!window.confirm("Xóa tài liệu này?")) return;
    try {
      await adminService.adminDeleteDocument(id);
      fetchData();
    } catch (error) {
      alert("Lỗi khi xóa");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-brand-ink tracking-tight uppercase italic flex items-center gap-3 font-heading">
             <FileText className="w-8 h-8 text-brand-primary" />
             Quản lý Tài liệu
          </h1>
          <p className="text-brand-secondary font-medium">Quản lý các tệp PDF, Word hướng dẫn và tài liệu bổ trợ</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={fetchData} variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-brand-highlight">
            <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
          </Button>
          <Button onClick={handleOpenAdd} className="h-12 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-lg gap-2">
            <Plus className="w-5 h-5" /> Thêm tài liệu
          </Button>
        </div>
      </div>

      <Card className="p-6 border-brand-border bg-white rounded-[2rem] shadow-sm">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-brand-primary" />
          <span className="text-xs font-black uppercase tracking-widest text-brand-secondary">Lọc theo cấp độ:</span>
          <select 
            className="h-12 px-4 bg-brand-highlight/30 border-none rounded-xl font-bold text-brand-ink outline-none cursor-pointer"
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading && documents.length === 0 ? (
          <div className="col-span-full p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></div>
        ) : documents.length === 0 ? (
          <div className="col-span-full p-20 text-center font-bold text-brand-secondary italic bg-white rounded-[2.5rem] border border-brand-border border-dashed">
            Chưa có tài liệu nào trong danh mục này.
          </div>
        ) : documents.map((doc) => (
          <Card key={doc.id} className="border border-brand-border bg-white rounded-[2rem] shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all group">
             <div className="p-6 flex-1 space-y-4">
                <div className="flex justify-between items-start">
                   <div className={cn(
                     "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs",
                     doc.docType === 'PDF' ? "bg-rose-100 text-rose-600" : "bg-blue-100 text-blue-600"
                   )}>
                      {doc.docType}
                   </div>
                   <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button onClick={() => handleOpenEdit(doc)} variant="ghost" size="icon" className="h-9 w-9 rounded-xl bg-brand-highlight/50 text-brand-primary hover:bg-brand-primary hover:text-white"><Edit3 className="w-4 h-4" /></Button>
                      <Button onClick={() => handleDelete(doc.id)} variant="ghost" size="icon" className="h-9 w-9 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white"><Trash2 className="w-4 h-4" /></Button>
                   </div>
                </div>
                <div>
                   <h3 className="text-xl font-black text-brand-ink line-clamp-1">{doc.title}</h3>
                   <p className="text-sm text-brand-secondary font-medium italic mb-2">
                     {categories.find(c => c.id === doc.categoryId)?.name || 'Cấp độ học'}
                   </p>
                   <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{doc.description}</p>
                </div>
             </div>
             <div className="px-6 py-4 bg-brand-highlight/10 border-t border-brand-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                   {doc.isPublished ? (
                     <span className="flex items-center gap-1 text-[10px] font-black text-emerald-500 uppercase"><Eye className="w-3 h-3" /> Hiện</span>
                   ) : (
                     <span className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase"><EyeOff className="w-3 h-3" /> Ẩn</span>
                   )}
                </div>
                <a href={doc.downloadUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[10px] font-black text-brand-primary hover:text-brand-secondary uppercase tracking-widest transition-colors">
                   Tải xuống <ExternalLink className="w-3 h-3" />
                </a>
             </div>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && currentDoc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-lg bg-white border-brand-border shadow-2xl rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-brand-border bg-brand-highlight/20 flex items-center justify-between">
              <h2 className="text-xl font-black text-brand-ink uppercase italic">{currentDoc.id ? "Cập nhật tài liệu" : "Thêm tài liệu mới"}</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsEditModalOpen(false)} className="rounded-full h-12 w-12 hover:bg-brand-highlight"><X className="w-6 h-6" /></Button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tiêu đề tài liệu *</label>
                <Input value={currentDoc.title} onChange={e => setCurrentDoc({ ...currentDoc, title: e.target.value })} className="h-12 rounded-xl font-bold border-brand-border" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Danh mục bài học *</label>
                  <select 
                    className="w-full h-12 px-4 bg-brand-highlight/30 border-2 border-brand-highlight rounded-xl font-bold text-brand-ink outline-none"
                    value={currentDoc.categoryId}
                    onChange={e => setCurrentDoc({ ...currentDoc, categoryId: Number(e.target.value) })}
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loại File</label>
                  <select 
                    className="w-full h-12 px-4 bg-brand-highlight/30 border-2 border-brand-highlight rounded-xl font-bold text-brand-ink outline-none"
                    value={currentDoc.docType}
                    onChange={e => setCurrentDoc({ ...currentDoc, docType: e.target.value })}
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="DOCX">Word / Office</option>
                    <option value="LINK">External Link</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Đường dẫn tải xuống / Link *</label>
                <Input value={currentDoc.downloadUrl} onChange={e => setCurrentDoc({ ...currentDoc, downloadUrl: e.target.value })} className="h-12 rounded-xl border-brand-border font-mono text-xs" placeholder="https://..." required />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mô tả ngắn</label>
                <textarea 
                  className="w-full p-4 bg-white border-2 border-brand-border rounded-xl font-medium text-brand-ink outline-none focus:border-brand-primary min-h-[80px]"
                  value={currentDoc.description}
                  onChange={e => setCurrentDoc({ ...currentDoc, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thứ tự</label>
                    <Input type="number" value={currentDoc.sortOrder} onChange={e => setCurrentDoc({ ...currentDoc, sortOrder: Number(e.target.value) })} className="h-12 rounded-xl border-brand-border" />
                 </div>
                 <div className="flex items-center gap-3 pt-4">
                    <button 
                      type="button"
                      onClick={() => setCurrentDoc({ ...currentDoc, isPublished: !currentDoc.isPublished })}
                      className={cn(
                        "w-12 h-6 rounded-full transition-all relative border-2",
                        currentDoc.isPublished ? "bg-emerald-500 border-emerald-400" : "bg-slate-200 border-slate-300"
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all shadow-sm",
                        currentDoc.isPublished ? "left-6" : "left-0.5"
                      )} />
                    </button>
                    <span className="text-xs font-black uppercase text-brand-secondary">Công khai</span>
                 </div>
              </div>

              <Button type="submit" disabled={isSaving} className="w-full bg-brand-primary text-white h-16 rounded-2xl font-black shadow-xl text-lg uppercase tracking-widest mt-4">
                {isSaving ? <RefreshCw className="w-6 h-6 animate-spin" /> : <><Save className="w-5 h-5 mr-2" /> Lưu tài liệu</>}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
