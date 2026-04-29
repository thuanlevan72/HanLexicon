import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Trophy, Plus, Edit3, Trash2, RefreshCw, X, Save, ArrowLeft, ArrowRight, CheckCircle2, History, LayoutGrid
} from 'lucide-react';
import { adminService } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function ChallengeManager() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [words, setWords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchData = async () => {
    if (!lessonId) return;
    setLoading(true);
    try {
      const res = await adminService.adminGetChallengeWords(lessonId);
      if (res.isSuccess) {
        setWords(res.data);
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
    setCurrentWord({ 
      lessonId, word: '', pinyin: '', meaning: '', sortOrder: words.length + 1 
    });
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (word: any) => {
    setCurrentWord(word);
    setIsEditModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = currentWord.id 
        ? await adminService.adminUpdateChallengeWord(currentWord.id, currentWord)
        : await adminService.adminCreateChallengeWord(currentWord);
      
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
    if (!window.confirm("Xóa từ thử thách này?")) return;
    try {
      await adminService.adminDeleteChallengeWord(id);
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
               <Trophy className="w-8 h-8 text-brand-primary" />
               Từ vựng thử thách
            </h1>
            <div className="flex items-center gap-2 mt-1">
               <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary font-black border-none px-3 py-1">
                  {words.length} TỪ KHÓ
               </Badge>
               <p className="text-brand-secondary text-xs font-bold uppercase tracking-widest opacity-60 italic">Challenge Layer Config</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={fetchData} variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-brand-highlight">
            <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
          </Button>
          <Button onClick={handleOpenAdd} className="h-12 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-lg shadow-brand-primary/20 gap-2 transition-all hover:scale-105 active:scale-95">
            <Plus className="w-5 h-5" /> Thêm từ mới
          </Button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading && words.length === 0 ? (
            <div className="col-span-full p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></div>
          ) : words.length === 0 ? (
            <div className="col-span-full p-20 text-center flex flex-col items-center justify-center space-y-4 bg-white rounded-[3rem] border-4 border-dashed border-brand-border/40">
               <div className="w-20 h-20 bg-brand-highlight rounded-full flex items-center justify-center">
                  <LayoutGrid className="w-10 h-10 text-slate-300" />
               </div>
               <p className="font-black text-brand-secondary uppercase italic">Chưa có dữ liệu thử thách cho bài học này</p>
               <Button onClick={handleOpenAdd} variant="outline" className="rounded-xl border-2 font-black uppercase text-[10px] tracking-widest">Khởi tạo ngay</Button>
            </div>
          ) : words.map((w, idx) => (
            <Card key={w.id} className="border-4 border-brand-border bg-white rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col hover:shadow-2xl transition-all group relative">
               <div className="absolute top-6 left-6 w-10 h-10 rounded-xl bg-brand-highlight text-brand-primary flex items-center justify-center text-xs font-black italic border-2 border-brand-border shadow-sm">
                  #{w.sortOrder}
               </div>
               
               <CardContent className="p-10 pt-16 flex flex-col items-center text-center space-y-6 flex-1">
                  <div className="space-y-1">
                     <p className="font-black text-xs text-brand-primary uppercase italic tracking-[0.2em]">{w.pinyin}</p>
                     <h2 className="text-5xl font-black text-brand-ink tracking-tighter leading-none">{w.word}</h2>
                  </div>
                  
                  <div className="p-4 bg-brand-highlight/30 rounded-2xl w-full border-2 border-brand-border/50">
                     <p className="font-bold text-brand-ink italic">"{w.meaning}"</p>
                  </div>

                  <div className="w-full pt-4 border-t border-brand-highlight flex items-center justify-between">
                     <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Verified</span>
                     </div>
                     <div className="flex gap-1">
                        <button onClick={() => handleOpenEdit(w)} className="h-9 w-9 rounded-xl flex items-center justify-center bg-brand-highlight/80 text-brand-primary hover:bg-brand-primary hover:text-white transition-all"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(w.id)} className="h-9 w-9 rounded-xl flex items-center justify-center bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
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
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Dữ liệu nguồn</p>
                <div className="flex items-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-brand-primary animate-pulse" />
                   <p className="text-xs font-bold text-white uppercase tracking-tighter italic">Lesson ID: {lessonId?.substring(0,8)}...</p>
                </div>
             </div>
          </div>
          <div className="flex items-center gap-2">
             <Trophy className="w-5 h-5 text-brand-primary" />
             <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">HanLexicon Challenge Suite</p>
          </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && currentWord && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-lg bg-white border-brand-border shadow-2xl rounded-[3rem] overflow-hidden border-8">
            <div className="p-8 border-b-4 border-brand-border bg-brand-highlight/20 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-ink rounded-2xl flex items-center justify-center shadow-lg rotate-3">
                     <Edit3 className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-brand-ink uppercase italic leading-none">{currentWord.id ? "Sửa từ thử thách" : "Thêm thử thách mới"}</h2>
                     <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mt-1 opacity-60 italic">Challenge Word Entry</p>
                  </div>
               </div>
               <Button variant="ghost" size="icon" onClick={() => setIsEditModalOpen(false)} className="rounded-full h-12 w-12 hover:bg-brand-highlight transition-all text-brand-ink"><X className="w-6 h-6" /></Button>
            </div>

            <form onSubmit={handleSave} className="p-10 space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Hán tự mục tiêu *</label>
                <Input value={currentWord.word} onChange={e => setCurrentWord({ ...currentWord, word: e.target.value })} className="h-16 text-4xl font-black rounded-[1.5rem] border-4 border-brand-border bg-brand-highlight/10 focus:bg-white focus:border-brand-primary transition-all text-center" placeholder="律师" required />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Pinyin *</label>
                  <Input value={currentWord.pinyin} onChange={e => setCurrentWord({ ...currentWord, pinyin: e.target.value })} className="h-12 rounded-xl font-bold border-2 border-brand-border focus:border-brand-primary transition-all" placeholder="lǜshī" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Sắp xếp</label>
                  <Input type="number" value={currentWord.sortOrder} onChange={e => setCurrentWord({ ...currentWord, sortOrder: Number(e.target.value) })} className="h-12 rounded-xl font-bold border-2 border-brand-border focus:border-brand-primary transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Nghĩa tiếng Việt *</label>
                <Input value={currentWord.meaning} onChange={e => setCurrentWord({ ...currentWord, meaning: e.target.value })} className="h-14 rounded-xl font-bold border-2 border-brand-border focus:border-brand-primary transition-all" placeholder="Luật sư" required />
              </div>

              <div className="pt-4 flex gap-4">
                 <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)} className="flex-1 h-16 rounded-2xl font-black uppercase tracking-widest border-4 border-brand-border">Hủy</Button>
                 <Button type="submit" disabled={isSaving} className="flex-[2] bg-brand-primary text-white h-16 rounded-2xl font-black shadow-xl shadow-brand-primary/20 text-lg uppercase tracking-widest transition-all active:scale-95">
                   {isSaving ? <RefreshCw className="w-6 h-6 animate-spin mx-auto" /> : <><Save className="w-5 h-5 mr-3" /> Lưu thử thách</>}
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
