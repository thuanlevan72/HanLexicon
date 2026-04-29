import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Type, Plus, Edit3, Trash2, RefreshCw, X, Save, ArrowLeft, ArrowRight, BookOpen, Layers, Search, CheckCircle2, History, Pencil
} from 'lucide-react';
import { adminService } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function HanziManager() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [hanzis, setHanzis] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentHanzi, setCurrentHanzi] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchData = async () => {
    if (!lessonId) return;
    setLoading(true);
    try {
      const res = await adminService.adminGetHanziCards(lessonId);
      if (res.isSuccess) {
        setHanzis(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lessonId]);

  const handleOpenAdd = () => {
    setCurrentHanzi({ 
      lessonId, hanzi: '', pinyin: '', meaning: '', 
      radical: '', strokeCount: 0, sortOrder: hanzis.length + 1 
    });
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (hanzi: any) => {
    setCurrentHanzi(hanzi);
    setIsEditModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = currentHanzi.id 
        ? await adminService.adminUpdateHanziCard(currentHanzi.id, currentHanzi)
        : await adminService.adminCreateHanziCard(currentHanzi);
      
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
    if (!window.confirm("Xóa thẻ Hán tự này?")) return;
    try {
      await adminService.adminDeleteHanziCard(id);
      fetchData();
    } catch (error) {
      alert("Lỗi khi xóa");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] gap-6 animate-in fade-in duration-500 relative pb-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div className="flex items-center gap-4">
          <Button onClick={() => navigate('/admin/lessons')} variant="ghost" className="h-14 w-14 p-0 rounded-2xl bg-white border-2 border-brand-border hover:bg-brand-highlight transition-all shadow-sm">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-black text-brand-ink tracking-tight uppercase italic flex items-center gap-3 font-heading">
               <Pencil className="w-8 h-8 text-brand-primary" />
               Quản lý Hán tự
            </h1>
            <div className="flex items-center gap-2 mt-1">
               <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary font-black border-none px-3 py-1">
                  {hanzis.length} HÁN TỰ
               </Badge>
               <p className="text-brand-secondary text-xs font-bold uppercase tracking-widest opacity-60 italic">Character Stroke Layer</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={fetchData} variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-brand-highlight">
            <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
          </Button>
          <Button onClick={handleOpenAdd} className="h-12 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-lg shadow-brand-primary/20 gap-2 transition-all hover:scale-105 active:scale-95">
            <Plus className="w-5 h-5" /> Thêm Hán tự
          </Button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {loading && hanzis.length === 0 ? (
            <div className="col-span-full p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></div>
          ) : hanzis.length === 0 ? (
            <div className="col-span-full p-20 text-center flex flex-col items-center justify-center space-y-4 bg-white rounded-[3rem] border-4 border-dashed border-brand-border/40">
               <div className="w-20 h-20 bg-brand-highlight rounded-full flex items-center justify-center">
                  <Type className="w-10 h-10 text-slate-300" />
               </div>
               <p className="font-black text-brand-secondary uppercase italic">Chưa có thẻ Hán tự nào cho bài học này</p>
               <Button onClick={handleOpenAdd} variant="outline" className="rounded-xl border-2 font-black uppercase text-[10px] tracking-widest">Tạo ngay</Button>
            </div>
          ) : hanzis.map((h) => (
            <Card key={h.id} className="border-4 border-brand-border bg-white rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col hover:shadow-2xl transition-all group relative">
               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
                  <button onClick={() => handleOpenEdit(h)} className="h-8 w-8 rounded-lg bg-brand-ink text-white flex items-center justify-center hover:bg-brand-primary transition-colors"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(h.id)} className="h-8 w-8 rounded-lg bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
               </div>
               
               <CardContent className="p-8 flex flex-col items-center text-center space-y-6 flex-1">
                  <div className="w-24 h-24 bg-brand-highlight/30 rounded-3xl flex items-center justify-center border-4 border-brand-border shadow-inner group-hover:scale-110 transition-transform">
                     <span className="text-6xl font-black text-brand-ink">{h.hanzi}</span>
                  </div>
                  
                  <div className="space-y-1">
                     <p className="font-black text-xs text-brand-primary uppercase italic tracking-[0.2em]">{h.pinyin}</p>
                     <p className="font-bold text-brand-ink text-lg leading-tight line-clamp-1">"{h.meaning}"</p>
                  </div>
                  
                  <div className="w-full pt-4 border-t border-brand-highlight grid grid-cols-2 gap-2">
                     <div className="bg-brand-highlight/50 p-2 rounded-xl border border-brand-border">
                        <p className="text-[8px] font-black text-slate-400 uppercase leading-none mb-1">Bộ thủ</p>
                        <p className="text-sm font-black text-brand-secondary">{h.radical || "—"}</p>
                     </div>
                     <div className="bg-brand-highlight/50 p-2 rounded-xl border border-brand-border">
                        <p className="text-[8px] font-black text-slate-400 uppercase leading-none mb-1">Số nét</p>
                        <p className="text-sm font-black text-brand-secondary">{h.strokeCount || 0}</p>
                     </div>
                  </div>
               </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer Info Bar */}
      <div className="shrink-0 bg-brand-ink text-white p-6 rounded-[2rem] shadow-2xl flex items-center justify-between mt-auto">
          <div className="flex items-center gap-6">
             <div className="flex flex-col">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Master Identifier</p>
                <div className="flex items-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-brand-primary animate-pulse" />
                   <p className="text-xs font-bold text-white uppercase tracking-tighter italic">Source Lesson: {lessonId?.substring(0,8)}...</p>
                </div>
             </div>
          </div>
          <div className="flex items-center gap-2 text-brand-primary">
             <Pencil className="w-5 h-5" />
             <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 text-white">HanLexicon Hanzi Engine</p>
          </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && currentHanzi && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-2xl bg-white border-brand-border shadow-2xl rounded-[3rem] overflow-hidden border-8">
            <div className="p-8 border-b-4 border-brand-border bg-brand-highlight/20 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-ink rounded-2xl flex items-center justify-center shadow-lg rotate-3">
                     <Pencil className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-brand-ink uppercase italic leading-none">{currentHanzi.id ? "Sửa thẻ Hán tự" : "Thêm Hán tự mới"}</h2>
                     <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mt-1 opacity-60 italic">Hanzi Data Entry</p>
                  </div>
               </div>
               <Button variant="ghost" size="icon" onClick={() => setIsEditModalOpen(false)} className="rounded-full h-12 w-12 hover:bg-brand-highlight transition-all text-brand-ink"><X className="w-6 h-6" /></Button>
            </div>

            <form onSubmit={handleSave} className="p-10 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col items-center justify-center bg-brand-highlight/10 rounded-[2.5rem] border-4 border-brand-border border-dashed p-8">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Hán tự hiển thị *</label>
                   <input 
                      value={currentHanzi.hanzi} 
                      onChange={e => setCurrentHanzi({ ...currentHanzi, hanzi: e.target.value })} 
                      className="w-32 h-32 text-center text-7xl font-black bg-white border-4 border-brand-border rounded-3xl outline-none focus:border-brand-primary transition-all shadow-xl"
                      placeholder="字"
                      required 
                   />
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Pinyin phát âm *</label>
                    <Input value={currentHanzi.pinyin} onChange={e => setCurrentHanzi({ ...currentHanzi, pinyin: e.target.value })} className="h-12 rounded-xl font-black border-2 border-brand-border focus:border-brand-primary transition-all text-lg" placeholder="zì" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Nghĩa tiếng Việt *</label>
                    <Input value={currentHanzi.meaning} onChange={e => setCurrentHanzi({ ...currentHanzi, meaning: e.target.value })} className="h-12 rounded-xl font-bold border-2 border-brand-border focus:border-brand-primary transition-all" placeholder="Chữ, từ" required />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Bộ thủ</label>
                  <Input value={currentHanzi.radical} onChange={e => setCurrentHanzi({ ...currentHanzi, radical: e.target.value })} className="h-12 rounded-xl font-bold border-2 border-brand-border focus:border-brand-primary transition-all text-center" placeholder="宀" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Số nét</label>
                  <Input type="number" value={currentHanzi.strokeCount} onChange={e => setCurrentHanzi({ ...currentHanzi, strokeCount: Number(e.target.value) })} className="h-12 rounded-xl font-bold border-2 border-brand-border focus:border-brand-primary transition-all text-center" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Thứ tự</label>
                  <Input type="number" value={currentHanzi.sortOrder} onChange={e => setCurrentHanzi({ ...currentHanzi, sortOrder: Number(e.target.value) })} className="h-12 rounded-xl font-bold border-2 border-brand-border focus:border-brand-primary transition-all text-center" />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                 <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)} className="flex-1 h-16 rounded-2xl font-black uppercase tracking-widest border-4 border-brand-border">Hủy</Button>
                 <Button type="submit" disabled={isSaving} className="flex-[2] bg-brand-primary text-white h-16 rounded-2xl font-black shadow-xl shadow-brand-primary/20 text-lg uppercase tracking-widest transition-all active:scale-95">
                   {isSaving ? <RefreshCw className="w-6 h-6 animate-spin mx-auto" /> : <><Save className="w-5 h-5 mr-3" /> Lưu thay đổi</>}
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
