import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FileText, Plus, Edit3, Trash2, RefreshCw, X, Save, Filter, Download, ExternalLink, Eye, EyeOff,
  Search, ArrowRight, History, Layers
} from 'lucide-react';
import { adminService, learningService, Category } from '@/src/services/api';
import { FormSelect } from '@/src/components/ui/FormSelect';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

export default function DocumentManager() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState('');
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
      
      const categoriesData = catsRes.data || catsRes || [];
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      
      if (docsRes.isSuccess) setDocuments(docsRes.data);
    } catch (error) {
      console.error("Lỗi khi tải tài liệu", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategoryId]);

  const filteredDocs = documents.filter(d => 
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        toast.success(currentDoc.id ? 'Cập nhật tài liệu thành công' : 'Thêm tài liệu mới thành công');
        setIsEditModalOpen(false);
        fetchData();
      } else {
        toast.error(res.message || 'Có lỗi xảy ra khi lưu tài liệu');
      }
    } catch (error: any) {
      toast.error("Lỗi: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Xóa tài liệu này?")) return;
    try {
      const res = await adminService.adminDeleteDocument(id);
      if (res.isSuccess) {
        toast.success('Xóa tài liệu thành công');
        fetchData();
      } else {
        toast.error(res.message || 'Không thể xóa tài liệu này');
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
             <FileText className="w-8 h-8 text-brand-primary" />
             Quản lý Tài liệu
          </h1>
          <div className="flex items-center gap-2 mt-1">
             <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary font-black border-none px-3 py-1">
                {documents.length} TÀI LIỆU
             </Badge>
             <p className="text-brand-secondary text-xs font-bold uppercase tracking-widest opacity-60">Learning Resources Asset</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={fetchData} variant="outline" className="h-12 w-12 p-0 rounded-2xl border-brand-border hover:bg-brand-highlight transition-all hover:scale-105 active:scale-95">
            <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
          </Button>
          <Button onClick={handleOpenAdd} className="h-12 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-lg shadow-brand-primary/20 gap-2 transition-all hover:scale-105 active:scale-95">
            <Plus className="w-5 h-5" /> Thêm tài liệu
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <Card className="p-4 border-brand-border bg-white rounded-[1.5rem] shadow-sm shrink-0">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative group flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-primary transition-colors" />
            <input
              type="text" placeholder="Tìm kiếm tài liệu theo tên..."
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
                <th className="p-6 w-1/3">Tài liệu / Loại</th>
                <th className="p-6 w-1/4">Phân loại</th>
                <th className="p-6 w-1/4">Hệ thống</th>
                <th className="p-6 w-32 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {loading && documents.length === 0 ? (
                <tr><td colSpan={4} className="p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></td></tr>
              ) : filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <div className="max-w-xs mx-auto space-y-4">
                      <div className="w-20 h-20 bg-brand-highlight rounded-full flex items-center justify-center mx-auto">
                        <Filter className="w-10 h-10 text-slate-300" />
                      </div>
                      <p className="font-black text-brand-ink uppercase italic">No documents found</p>
                    </div>
                  </td>
                </tr>
              ) : filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-brand-highlight/5 transition-all group border-b border-brand-border">
                  <td className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-ink text-white flex items-center justify-center shrink-0 text-xs font-black italic shadow-lg shadow-brand-ink/20">
                        #{doc.sortOrder}
                      </div>
                      <div className="space-y-1 overflow-hidden">
                        <div className="flex items-center gap-2">
                           <p className="font-black text-2xl text-brand-ink leading-tight truncate">{doc.title}</p>
                           <Badge className={cn(
                             "text-[9px] font-black uppercase tracking-widest",
                             doc.docType === 'PDF' ? "bg-rose-100 text-rose-600 border-rose-200" : "bg-sky-100 text-sky-600 border-sky-200"
                           )}>
                              {doc.docType}
                           </Badge>
                        </div>
                        <p className="text-xs font-bold text-brand-secondary line-clamp-1 opacity-60">{doc.description || "Không có mô tả"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col gap-1.5">
                       <div className="flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-brand-primary" />
                          <p className="text-xs font-black text-brand-ink uppercase truncate max-w-[200px]">
                            {categories.find(c => c.id === doc.categoryId)?.name || 'Cấp độ học'}
                          </p>
                       </div>
                       <div className="flex items-center gap-1.5">
                          {doc.isPublished ? (
                            <span className="flex items-center gap-1 text-[9px] font-black text-emerald-500 uppercase"><Eye className="w-3 h-3" /> Visible</span>
                          ) : (
                            <span className="flex items-center gap-1 text-[9px] font-black text-slate-400 uppercase"><EyeOff className="w-3 h-3" /> Hidden</span>
                          )}
                       </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col gap-1.5 opacity-40">
                       <div className="flex items-center gap-1.5">
                          <History className="w-3 h-3" />
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">ID: {doc.id?.substring(0,8)}...</p>
                       </div>
                       <a href={doc.downloadUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[9px] font-black text-brand-primary hover:underline truncate max-w-[150px]">
                         <ExternalLink className="w-3 h-3" /> {doc.downloadUrl}
                       </a>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button 
                        onClick={() => handleOpenEdit(doc)} 
                        className="h-9 w-9 rounded-xl flex items-center justify-center bg-brand-highlight/80 text-brand-primary hover:bg-brand-primary hover:text-white transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(doc.id)} 
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
                  Tổng cộng {documents.length} <span className="text-[10px] opacity-40 uppercase ml-1">Tài liệu</span>
                </p>
             </div>
             <div className="h-8 w-px bg-brand-border mx-2" />
             <div className="flex flex-col">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng thái</p>
                <div className="flex items-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <p className="text-xs font-bold text-brand-ink uppercase tracking-tighter italic">Live Cloud Assets</p>
                </div>
             </div>
          </div>
          <p className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em] opacity-40">
             Admin Dashboard <ArrowRight className="inline w-3 h-3 mx-1" /> Documents
          </p>
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
                  <FormSelect 
                    className="h-12 border-2 border-brand-highlight bg-brand-highlight/30"
                    value={currentDoc.categoryId}
                    onChange={e => setCurrentDoc({ ...currentDoc, categoryId: Number(e.target.value) })}
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </FormSelect>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loại File</label>
                  <FormSelect 
                    className="h-12 border-2 border-brand-highlight bg-brand-highlight/30"
                    value={currentDoc.docType}
                    onChange={e => setCurrentDoc({ ...currentDoc, docType: e.target.value })}
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="DOCX">Word / Office</option>
                    <option value="LINK">External Link</option>
                  </FormSelect>
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
