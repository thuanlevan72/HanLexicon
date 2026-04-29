import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FileText, Plus, Edit3, Trash2, RefreshCw, X, Save, Search, 
  ExternalLink, FileWarning, CheckCircle2, History, ArrowRight, Download, Filter, BookOpen
} from 'lucide-react';
import { adminService } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function DocumentManager() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentDoc, setCurrentDoc] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await adminService.adminGetDocuments();
      if (res.isSuccess) {
        setDocuments(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredDocs = documents.filter(d => 
    d.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setCurrentDoc({ title: '', description: '', url: '', type: 'PDF', sortOrder: documents.length + 1 });
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
    <div className="flex flex-col h-[calc(100vh-100px)] gap-6 animate-in fade-in duration-500 relative">
      {/* Header Section */}
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
             <p className="text-brand-secondary text-xs font-bold uppercase tracking-widest opacity-60 italic">Cloud Resource Repository</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={fetchData} variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-brand-highlight">
            <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
          </Button>
          <Button onClick={handleOpenAdd} className="h-12 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-lg shadow-brand-primary/20 gap-2 transition-all hover:scale-105 active:scale-95">
            <Plus className="w-5 h-5" /> Thêm tài liệu
          </Button>
        </div>
      </div>

      {/* Filter Card */}
      <Card className="p-4 border-brand-border bg-white rounded-[1.5rem] shadow-sm shrink-0">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-primary transition-colors" />
          <input
            type="text" placeholder="Tìm kiếm tên tài liệu hoặc loại file..."
            className="w-full h-12 pl-12 pr-4 bg-brand-highlight/20 border-2 border-transparent rounded-xl font-bold text-sm focus:border-brand-primary focus:bg-white transition-all outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Card>

      {/* Main Table Content */}
      <Card className="flex-1 border border-brand-border bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto relative custom-scrollbar">
          <table className="w-full text-left border-collapse table-fixed">
            <thead className="sticky top-0 z-10 bg-brand-highlight/95 backdrop-blur-md shadow-sm">
              <tr className="border-b border-brand-border text-[10px] font-black uppercase tracking-widest text-brand-secondary">
                <th className="p-6 w-24">Thứ tự</th>
                <th className="p-6 w-1/3">Tài liệu & Mô tả</th>
                <th className="p-6">Liên kết / Loại</th>
                <th className="p-6 w-32 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {loading && documents.length === 0 ? (
                <tr><td colSpan={4} className="p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></td></tr>
              ) : filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <p className="font-black text-brand-secondary uppercase italic opacity-40">Danh sách tài liệu trống</p>
                  </td>
                </tr>
              ) : filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-brand-highlight/5 transition-all group border-b border-brand-border">
                  <td className="p-6">
                    <div className="w-10 h-10 rounded-xl bg-brand-ink text-white flex items-center justify-center text-xs font-black italic border-2 border-brand-border shadow-sm">
                       #{doc.sortOrder}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="space-y-1">
                      <p className="text-xl font-black text-brand-ink leading-tight">{doc.title}</p>
                      <p className="text-xs font-bold text-slate-400 line-clamp-1 italic">{doc.description || "Không có mô tả"}</p>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col gap-2">
                       <div className="flex items-center gap-2">
                          <Badge className="bg-brand-highlight text-brand-secondary border-brand-border font-black text-[9px] uppercase">{doc.type}</Badge>
                          <a href={doc.url} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-brand-primary hover:underline flex items-center gap-1">
                             Truy cập <ExternalLink className="w-3 h-3" />
                          </a>
                       </div>
                       <p className="text-[9px] font-mono text-slate-300 truncate max-w-[200px]">{doc.url}</p>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button onClick={() => handleOpenEdit(doc)} className="h-9 w-9 rounded-xl flex items-center justify-center bg-brand-highlight/80 text-brand-primary hover:bg-brand-primary hover:text-white transition-all"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(doc.id)} className="h-9 w-9 rounded-xl flex items-center justify-center bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
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
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Repository Status</p>
                <div className="flex items-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <p className="text-xs font-bold text-brand-ink uppercase tracking-tighter italic">Cloud Assets Synchronized</p>
                </div>
             </div>
          </div>
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] italic">HanLexicon Data Library</p>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && currentDoc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-xl bg-white border-brand-border shadow-2xl rounded-[3rem] overflow-hidden border-8">
            <div className="p-8 border-b-4 border-brand-border bg-brand-highlight/20 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-ink rounded-2xl flex items-center justify-center shadow-lg rotate-3">
                     <FileText className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-brand-ink uppercase italic leading-none">{currentDoc.id ? "Cập nhật Tài liệu" : "Thêm tài liệu mới"}</h2>
                     <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mt-1 opacity-60 italic">Documentation Stream Entry</p>
                  </div>
               </div>
               <Button variant="ghost" size="icon" onClick={() => setIsEditModalOpen(false)} className="rounded-full h-12 w-12 hover:bg-brand-highlight transition-all text-brand-ink"><X className="w-6 h-6" /></Button>
            </div>

            <form onSubmit={handleSave} className="p-10 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Tiêu đề tài liệu *</label>
                <Input value={currentDoc.title} onChange={e => setCurrentDoc({ ...currentDoc, title: e.target.value })} className="h-14 rounded-2xl font-black border-2 border-brand-border focus:border-brand-primary transition-all text-lg" required />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Đường dẫn URL (Cloud Storage) *</label>
                <div className="flex gap-2">
                   <Input value={currentDoc.url} onChange={e => setCurrentDoc({ ...currentDoc, url: e.target.value })} className="h-12 rounded-xl font-mono text-xs border-2 border-brand-border focus:border-brand-primary transition-all flex-1" placeholder="https://..." required />
                   <Button type="button" variant="outline" className="h-12 w-12 rounded-xl border-2 border-brand-border text-brand-primary"><Download className="w-4 h-4" /></Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Loại file</label>
                   <select 
                     className="w-full h-12 px-4 bg-brand-highlight/30 border-2 border-brand-border rounded-xl font-bold text-xs text-brand-ink outline-none focus:border-brand-primary transition-all appearance-none"
                     value={currentDoc.type}
                     onChange={e => setCurrentDoc({ ...currentDoc, type: e.target.value })}
                   >
                     <option value="PDF">PDF Document</option>
                     <option value="DOCX">Word Document</option>
                     <option value="XLSX">Excel Spreadsheet</option>
                     <option value="LINK">External Website</option>
                     <option value="OTHER">Other Format</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Thứ tự ưu tiên</label>
                   <Input type="number" value={currentDoc.sortOrder} onChange={e => setCurrentDoc({ ...currentDoc, sortOrder: Number(e.target.value) })} className="h-12 rounded-xl font-bold border-2 border-brand-border focus:border-brand-primary transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Mô tả nội dung</label>
                <textarea 
                  className="w-full p-4 bg-brand-highlight/10 border-2 border-brand-border rounded-2xl font-medium text-brand-ink outline-none focus:bg-white focus:border-brand-primary transition-all min-h-[100px] text-sm"
                  value={currentDoc.description}
                  onChange={e => setCurrentDoc({ ...currentDoc, description: e.target.value })}
                  placeholder="Nhập mô tả tóm tắt về tài liệu này..."
                />
              </div>

              <div className="pt-4 flex gap-4">
                 <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)} className="flex-1 h-16 rounded-2xl font-black uppercase tracking-widest border-4 border-brand-border">Hủy</Button>
                 <Button type="submit" disabled={isSaving} className="flex-[2] bg-brand-primary text-white h-16 rounded-2xl font-black shadow-xl shadow-brand-primary/20 text-lg uppercase tracking-widest transition-all active:scale-95">
                   {isSaving ? <RefreshCw className="w-6 h-6 animate-spin mx-auto" /> : <><Save className="w-5 h-5 mr-3" /> Lưu tài liệu</>}
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
