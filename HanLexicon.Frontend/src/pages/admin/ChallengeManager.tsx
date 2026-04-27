import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Trophy, Plus, Edit3, Trash2, RefreshCw, X, Save, ArrowLeft
} from 'lucide-react';
import { adminService } from '@/src/services/api';
import { cn } from '@/lib/utils';

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
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Button onClick={() => navigate('/admin/lessons')} variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-brand-highlight">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-black text-brand-ink tracking-tight uppercase italic flex items-center gap-3 font-heading">
               <Trophy className="w-8 h-8 text-brand-primary" />
               Từ vựng thử thách
            </h1>
            <p className="text-brand-secondary font-medium">Quản lý danh sách từ khó để thử thách học viên</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={fetchData} variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-brand-highlight">
            <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
          </Button>
          <Button onClick={handleOpenAdd} className="h-12 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-lg gap-2">
            <Plus className="w-5 h-5" /> Thêm từ mới
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && words.length === 0 ? (
          <div className="col-span-full p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></div>
        ) : words.length === 0 ? (
          <div className="col-span-full p-20 text-center font-bold text-brand-secondary italic bg-white rounded-[2.5rem] border border-brand-border border-dashed">
            Chưa có từ vựng thử thách nào cho bài học này.
          </div>
        ) : words.map((w) => (
          <Card key={w.id} className="border border-brand-border bg-white rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all group">
             <CardContent className="p-8 space-y-4">
                <div className="flex justify-between items-start">
                   <div className="text-4xl font-black text-brand-ink tracking-tighter">{w.word}</div>
                   <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button onClick={() => handleOpenEdit(w)} variant="ghost" size="icon" className="h-9 w-9 rounded-xl bg-brand-highlight/50 text-brand-primary hover:bg-brand-primary hover:text-white"><Edit3 className="w-4 h-4" /></Button>
                      <Button onClick={() => handleDelete(w.id)} variant="ghost" size="icon" className="h-9 w-9 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white"><Trash2 className="w-4 h-4" /></Button>
                   </div>
                </div>
                <div className="space-y-1">
                   <p className="font-bold text-lg text-brand-primary uppercase italic tracking-wider">{w.pinyin}</p>
                   <p className="font-bold text-brand-ink leading-tight">{w.meaning}</p>
                </div>
                <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Sắp xếp: {w.sortOrder}</span>
                   <Trophy className="w-4 h-4 text-brand-highlight" />
                </div>
             </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && currentWord && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-lg bg-white border-brand-border shadow-2xl rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-brand-border bg-brand-highlight/20 flex items-center justify-between">
              <h2 className="text-xl font-black text-brand-ink uppercase italic">{currentWord.id ? "Cập nhật từ thử thách" : "Thêm từ thử thách mới"}</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsEditModalOpen(false)} className="rounded-full h-12 w-12 hover:bg-brand-highlight"><X className="w-6 h-6" /></Button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Từ vựng (Hán tự) *</label>
                <Input value={currentWord.word} onChange={e => setCurrentWord({ ...currentWord, word: e.target.value })} className="h-14 text-2xl font-black rounded-2xl border-brand-border" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pinyin *</label>
                  <Input value={currentWord.pinyin} onChange={e => setCurrentWord({ ...currentWord, pinyin: e.target.value })} className="h-12 rounded-xl font-bold border-brand-border" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thứ tự</label>
                  <Input type="number" value={currentWord.sortOrder} onChange={e => setCurrentWord({ ...currentWord, sortOrder: Number(e.target.value) })} className="h-12 rounded-xl border-brand-border" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ý nghĩa tiếng Việt *</label>
                <Input value={currentWord.meaning} onChange={e => setCurrentWord({ ...currentWord, meaning: e.target.value })} className="h-12 rounded-xl font-bold border-brand-border" required />
              </div>

              <Button type="submit" disabled={isSaving} className="w-full bg-brand-primary text-white h-16 rounded-2xl font-black shadow-xl text-lg uppercase tracking-widest mt-4">
                {isSaving ? <RefreshCw className="w-6 h-6 animate-spin" /> : <><Save className="w-5 h-5 mr-2" /> Lưu từ vựng</>}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
