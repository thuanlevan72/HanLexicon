import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Type, Plus, Edit3, Trash2, RefreshCw, X, Save, ArrowLeft, Layers
} from 'lucide-react';
import { adminService } from '@/src/services/api';
import { cn } from '@/lib/utils';

export default function HanziManager() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchData = async () => {
    if (!lessonId) return;
    setLoading(true);
    try {
      const res = await adminService.adminGetHanziCards(lessonId);
      if (res.isSuccess) {
        setCards(res.data);
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
    setCurrentCard({ 
      lessonId, character: '', pinyin: '', meaning: '', 
      mnemonic: '', strokeCount: 0, radical: '', sortOrder: cards.length + 1 
    });
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (card: any) => {
    setCurrentCard(card);
    setIsEditModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = currentCard.id 
        ? await adminService.adminUpdateHanziCard(currentCard.id, currentCard)
        : await adminService.adminCreateHanziCard(currentCard);
      
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
    if (!window.confirm("Xóa thẻ chữ Hán này?")) return;
    try {
      await adminService.adminDeleteHanziCard(id);
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
               <Type className="w-8 h-8 text-brand-primary" />
               Quản lý Hanzi
            </h1>
            <p className="text-brand-secondary font-medium">Thêm các thẻ chữ Hán chi tiết cho bài học</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={fetchData} variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-brand-highlight">
            <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
          </Button>
          <Button onClick={handleOpenAdd} className="h-12 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-lg gap-2">
            <Plus className="w-5 h-5" /> Thêm thẻ mới
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading && cards.length === 0 ? (
          <div className="col-span-full p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></div>
        ) : cards.length === 0 ? (
          <div className="col-span-full p-20 text-center font-bold text-brand-secondary italic bg-white rounded-[2.5rem] border border-brand-border border-dashed">
            Chưa có thẻ chữ Hán nào cho bài học này.
          </div>
        ) : cards.map((card) => (
          <Card key={card.id} className="border border-brand-border bg-white rounded-[2rem] shadow-sm overflow-hidden group hover:shadow-xl transition-all">
             <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                   <div className="text-5xl font-black text-brand-ink">{card.character}</div>
                   <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button onClick={() => handleOpenEdit(card)} variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-brand-highlight/50 text-brand-primary hover:bg-brand-primary hover:text-white"><Edit3 className="w-3.5 h-3.5" /></Button>
                      <Button onClick={() => handleDelete(card.id)} variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white"><Trash2 className="w-3.5 h-3.5" /></Button>
                   </div>
                </div>
                <div className="space-y-3">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pinyin & Nghĩa</p>
                      <p className="font-bold text-brand-ink">{card.pinyin} - {card.meaning}</p>
                   </div>
                   <div className="grid grid-cols-2 gap-2">
                      <div className="bg-brand-highlight/30 rounded-xl p-2 text-center">
                         <p className="text-[8px] font-black text-brand-secondary uppercase">Nét</p>
                         <p className="text-sm font-black text-brand-primary">{card.strokeCount}</p>
                      </div>
                      <div className="bg-brand-highlight/30 rounded-xl p-2 text-center">
                         <p className="text-[8px] font-black text-brand-secondary uppercase">Bộ thủ</p>
                         <p className="text-sm font-black text-brand-primary">{card.radical || '-'}</p>
                      </div>
                   </div>
                </div>
             </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && currentCard && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-lg bg-white border-brand-border shadow-2xl rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-brand-border bg-brand-highlight/20 flex items-center justify-between">
              <h2 className="text-xl font-black text-brand-ink uppercase italic">{currentCard.id ? "Cập nhật thẻ Hanzi" : "Thêm thẻ Hanzi mới"}</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsEditModalOpen(false)} className="rounded-full h-12 w-12 hover:bg-brand-highlight"><X className="w-6 h-6" /></Button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 text-center">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Chữ Hán *</label>
                   <Input value={currentCard.character} onChange={e => setCurrentCard({ ...currentCard, character: e.target.value })} className="h-20 text-4xl text-center rounded-2xl font-black border-brand-border" required />
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pinyin *</label>
                    <Input value={currentCard.pinyin} onChange={e => setCurrentCard({ ...currentCard, pinyin: e.target.value })} className="h-12 rounded-xl font-bold border-brand-border" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nghĩa Việt *</label>
                    <Input value={currentCard.meaning} onChange={e => setCurrentCard({ ...currentCard, meaning: e.target.value })} className="h-12 rounded-xl font-bold border-brand-border" required />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Số nét</label>
                  <Input type="number" value={currentCard.strokeCount} onChange={e => setCurrentCard({ ...currentCard, strokeCount: Number(e.target.value) })} className="h-12 rounded-xl border-brand-border" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bộ thủ</label>
                  <Input value={currentCard.radical} onChange={e => setCurrentCard({ ...currentCard, radical: e.target.value })} className="h-12 rounded-xl border-brand-border" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sắp xếp</label>
                  <Input type="number" value={currentCard.sortOrder} onChange={e => setCurrentCard({ ...currentCard, sortOrder: Number(e.target.value) })} className="h-12 rounded-xl border-brand-border" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Câu thần chú ghi nhớ (Mnemonic)</label>
                <textarea 
                  className="w-full p-4 bg-white border-2 border-brand-border rounded-2xl font-medium text-brand-ink outline-none focus:border-brand-primary min-h-[100px]"
                  value={currentCard.mnemonic}
                  onChange={e => setCurrentCard({ ...currentCard, mnemonic: e.target.value })}
                />
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
