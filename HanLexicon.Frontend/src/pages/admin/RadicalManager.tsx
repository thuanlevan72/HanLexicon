import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Type, Plus, Edit3, Trash2, RefreshCw, X, Save, ArrowLeft, Layers, BookMarked, Search, CheckCircle2, History, ArrowRight
} from 'lucide-react';
import { adminService, learningService, LessonFlat } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function RadicalManager() {
  const [sets, setSets] = useState<any[]>([]);
  const [lessons, setLessons] = useState<LessonFlat[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  
  // Radical Items State
  const [currentSet, setCurrentSet] = useState<any>(null);
  const [radicals, setRadicals] = useState<any[]>([]);
  const [isLoadingRadicals, setIsLoadingRadicals] = useState(false);

  // Modals
  const [isSetModalOpen, setIsSetModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [lessonsRes, setsRes] = await Promise.all([
        learningService.getLessonsFlat(),
        adminService.adminGetRadicalSets(selectedLessonId || undefined)
      ]);
      setLessons(lessonsRes);
      if (setsRes.isSuccess) setSets(setsRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [selectedLessonId]);

  const handleOpenSetAdd = () => {
    setCurrentSet({ 
      title: '', icon: '🌟', lessonId: selectedLessonId || '', setNumber: sets.length + 1 
    });
    setIsSetModalOpen(true);
  };

  const handleOpenSetEdit = async (set: any) => {
    setCurrentSet(set);
    setIsSetModalOpen(true);
    
    // Fetch radicals for this set
    setIsLoadingRadicals(true);
    try {
      const res = await adminService.adminGetRadicals(set.id);
      if (res.isSuccess) setRadicals(res.data);
    } catch (e) { console.error(e); }
    finally { setIsLoadingRadicals(false); }
  };

  const handleSaveSet = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = currentSet.id 
        ? await adminService.adminUpdateRadicalSet(currentSet.id, currentSet)
        : await adminService.adminCreateRadicalSet(currentSet);
      
      if (res.isSuccess) {
        setIsSetModalOpen(false);
        fetchInitialData();
      } else {
        alert(res.message);
      }
    } catch (error: any) {
      alert("Lỗi: " + error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSet = async (id: string) => {
    if (!window.confirm("Xóa bộ thủ này? Tất cả các mục bên trong sẽ bị xóa.")) return;
    try {
      await adminService.adminDeleteRadicalSet(id);
      fetchInitialData();
    } catch (error) {
      alert("Lỗi khi xóa");
    }
  };

  // --- ITEM LOGIC ---
  const handleOpenItemAdd = () => {
     setCurrentItem({
        setId: currentSet.id,
        radical: '',
        name: '',
        meaning: '',
        exampleChars: '',
        sortOrder: radicals.length + 1
     });
     setIsItemModalOpen(true);
  };

  const handleOpenItemEdit = (item: any) => {
     setCurrentItem(item);
     setIsItemModalOpen(true);
  };

  const handleSaveItem = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsSaving(true);
     try {
        const res = currentItem.id 
          ? await adminService.adminUpdateRadical(currentItem.id, currentItem)
          : await adminService.adminCreateRadical(currentItem);
        if (res.isSuccess) {
           setIsItemModalOpen(false);
           // Refresh radicals list
           const refresh = await adminService.adminGetRadicals(currentSet.id);
           if (refresh.isSuccess) setRadicals(refresh.data);
        }
     } catch (e) { alert("Lỗi lưu mục bộ thủ"); }
     finally { setIsSaving(false); }
  };

  const handleDeleteItem = async (id: string) => {
    if (!window.confirm("Xóa mục này?")) return;
    try {
      await adminService.adminDeleteRadical(id);
      setRadicals(radicals.filter(r => r.id !== id));
    } catch (error) {
      alert("Lỗi khi xóa");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] gap-6 animate-in fade-in duration-500 relative pb-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div>
          <h1 className="text-3xl font-black text-brand-ink tracking-tight uppercase italic flex items-center gap-3 font-heading">
             <Layers className="w-8 h-8 text-brand-primary" />
             Quản lý Bộ thủ
          </h1>
          <div className="flex items-center gap-2 mt-1">
             <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary font-black border-none px-3 py-1">
                {sets.length} NHÓM
             </Badge>
             <p className="text-brand-secondary text-xs font-bold uppercase tracking-widest opacity-60 italic">Radical Configuration Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={fetchInitialData} variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-brand-highlight">
            <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
          </Button>
          <Button onClick={handleOpenSetAdd} className="h-12 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-lg shadow-brand-primary/20 gap-2 transition-all hover:scale-105 active:scale-95">
            <Plus className="w-5 h-5" /> Thêm nhóm mới
          </Button>
        </div>
      </div>

      {/* Filter Card */}
      <Card className="p-4 border-brand-border bg-white rounded-[1.5rem] shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <BookMarked className="w-5 h-5 text-brand-primary" />
          <span className="text-xs font-black uppercase tracking-widest text-brand-secondary">Lọc theo bài học:</span>
          <select 
            className="h-12 px-4 bg-brand-highlight/30 border-none rounded-xl font-bold text-xs text-brand-ink outline-none cursor-pointer max-w-md hover:bg-brand-highlight/50 transition-colors"
            value={selectedLessonId}
            onChange={(e) => setSelectedLessonId(e.target.value)}
          >
            <option value="">Tất cả bài học</option>
            {lessons.map(l => (
              <option key={l.id} value={l.id}>[{l.level}] {l.title}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Main Grid Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading && sets.length === 0 ? (
            <div className="col-span-full p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></div>
          ) : sets.length === 0 ? (
            <div className="col-span-full p-20 text-center flex flex-col items-center justify-center space-y-4 bg-white rounded-[3rem] border-4 border-dashed border-brand-border/40">
               <div className="w-20 h-20 bg-brand-highlight rounded-full flex items-center justify-center">
                  <Type className="w-10 h-10 text-slate-300" />
               </div>
               <p className="font-black text-brand-secondary uppercase italic">Chưa có dữ liệu bộ thủ nào</p>
               <Button onClick={handleOpenSetAdd} variant="outline" className="rounded-xl border-2 font-black uppercase text-[10px] tracking-widest">Khởi tạo ngay</Button>
            </div>
          ) : sets.map((set) => (
            <Card key={set.id} className="border-4 border-brand-border bg-white rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col hover:shadow-2xl transition-all group relative active:scale-95">
               <div className="absolute top-6 left-6 w-12 h-12 rounded-2xl bg-brand-highlight text-3xl flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform">
                  {set.icon}
               </div>
               
               <CardContent className="p-10 pt-20 flex flex-col items-center text-center space-y-6 flex-1">
                  <div>
                     <p className="font-black text-[10px] text-brand-primary uppercase tracking-[0.2em] mb-1 opacity-60 italic">Nhóm số #{set.setNumber}</p>
                     <h2 className="text-3xl font-black text-brand-ink tracking-tighter leading-tight line-clamp-1">{set.title}</h2>
                  </div>
                  
                  <div className="bg-brand-highlight/30 px-4 py-2 rounded-xl border border-brand-border/50">
                     <p className="text-[10px] font-black text-brand-secondary uppercase tracking-widest truncate max-w-[150px]">
                        {lessons.find(l => l.id === set.lessonId)?.title || 'Chương trình chung'}
                     </p>
                  </div>

                  <div className="w-full pt-4 border-t border-brand-highlight flex flex-col gap-3">
                     <Button onClick={() => handleOpenSetEdit(set)} className="w-full h-12 rounded-2xl bg-brand-ink text-white font-black uppercase text-[10px] tracking-widest gap-2 shadow-lg hover:bg-brand-primary active:scale-95 transition-all">
                        Quản lý mục <ArrowRight className="w-3.5 h-3.5" />
                     </Button>
                     <div className="flex gap-2">
                        <button onClick={() => handleOpenSetEdit(set)} className="flex-1 h-9 rounded-xl bg-brand-highlight/80 text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDeleteSet(set.id)} className="flex-1 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                     </div>
                  </div>
               </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer Info Bar */}
      <div className="sticky bottom-0 z-20 shrink-0 bg-white/80 backdrop-blur-xl border border-brand-border p-4 rounded-3xl shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-6">
             <div className="flex flex-col">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Master Repository</p>
                <div className="flex items-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <p className="text-xs font-bold text-brand-ink uppercase tracking-tighter italic">Live Radical Stream</p>
                </div>
             </div>
          </div>
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] italic">HanLexicon Admin Radical Core</p>
      </div>

      {/* Set Edit Modal */}
      {isSetModalOpen && currentSet && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-6xl bg-white border-brand-border shadow-2xl rounded-[3rem] overflow-hidden border-8 flex flex-col md:flex-row max-h-[90vh]">
            {/* Left: Set Info */}
            <div className="w-full md:w-96 border-r-4 border-brand-border bg-brand-highlight/20 p-10 space-y-10 overflow-y-auto custom-scrollbar">
               <div className="space-y-4">
                  <div className="w-20 h-20 bg-brand-ink rounded-[2rem] flex items-center justify-center shadow-xl rotate-3">
                     <Edit3 className="w-10 h-10 text-brand-primary" />
                  </div>
                  <div>
                     <h2 className="text-2xl font-black text-brand-ink uppercase italic leading-none">Thông tin nhóm</h2>
                     <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mt-1 opacity-60">Set Configuration</p>
                  </div>
               </div>
               
               <form onSubmit={handleSaveSet} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Tiêu đề nhóm *</label>
                    <Input value={currentSet.title} onChange={e => setCurrentSet({ ...currentSet, title: e.target.value })} className="h-14 rounded-2xl font-black border-2 border-brand-border focus:border-brand-primary transition-all text-lg" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Icon</label>
                       <Input value={currentSet.icon} onChange={e => setCurrentSet({ ...currentSet, icon: e.target.value })} className="h-12 rounded-xl text-center text-3xl font-bold border-2 border-brand-border focus:border-brand-primary transition-all" />
                     </div>
                     <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Thứ tự</label>
                       <Input type="number" value={currentSet.setNumber} onChange={e => setCurrentSet({ ...currentSet, setNumber: Number(e.target.value) })} className="h-12 rounded-xl border-2 border-brand-border focus:border-brand-primary transition-all font-black text-center" />
                     </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Gắn vào bài học</label>
                    <div className="relative">
                       <BookMarked className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-primary z-10" />
                       <select 
                         className="w-full h-14 pl-12 pr-4 bg-white border-2 border-brand-border rounded-2xl font-black text-xs text-brand-ink outline-none focus:border-brand-primary transition-all appearance-none shadow-inner"
                         value={currentSet.lessonId || ''}
                         onChange={e => setCurrentSet({ ...currentSet, lessonId: e.target.value || null })}
                       >
                         <option value="">-- Chương trình chung --</option>
                         {lessons.map(l => <option key={l.id} value={l.id}>{l.title}</option>)}
                       </select>
                    </div>
                  </div>
                  <Button type="submit" disabled={isSaving} className="w-full bg-brand-primary text-white h-16 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-lg">
                    {isSaving ? <RefreshCw className="w-6 h-6 animate-spin mx-auto" /> : <><Save className="w-5 h-5 mr-3" /> Lưu nhóm</>}
                  </Button>
               </form>
            </div>

            {/* Right: Items List */}
            <div className="flex-1 p-10 overflow-y-auto custom-scrollbar flex flex-col space-y-10">
               <div className="flex justify-between items-end">
                  <div className="space-y-2">
                     <h2 className="text-4xl font-black text-brand-ink uppercase italic tracking-tighter leading-none">Danh sách bộ thủ</h2>
                     <p className="text-sm text-brand-secondary font-bold opacity-60">Hệ thống thành phần tạo nên Hán tự</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <Button onClick={handleOpenItemAdd} disabled={!currentSet.id} className="h-14 px-8 rounded-2xl bg-brand-ink text-white font-black text-xs uppercase tracking-[0.15em] shadow-xl gap-3 hover:bg-brand-primary transition-all hover:scale-105 active:scale-95">
                        <Plus className="w-5 h-5" /> Thêm thành phần
                     </Button>
                     <Button variant="ghost" size="icon" onClick={() => setIsSetModalOpen(false)} className="rounded-full h-14 w-14 bg-brand-highlight hover:bg-brand-border transition-all text-brand-ink"><X className="w-8 h-8" /></Button>
                  </div>
               </div>

               <div className="space-y-4">
                  {isLoadingRadicals ? (
                     <div className="p-20 text-center"><RefreshCw className="w-12 h-12 animate-spin mx-auto text-brand-primary opacity-20" /></div>
                  ) : radicals.length === 0 ? (
                     <div className="p-24 text-center border-4 border-dashed border-brand-border rounded-[3rem] bg-slate-50 flex flex-col items-center justify-center gap-4">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg"><Layers className="w-10 h-10 text-slate-200" /></div>
                        <p className="text-lg text-slate-300 italic font-black uppercase tracking-widest">Danh mục rỗng</p>
                     </div>
                  ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                       {radicals.map((r, i) => (
                         <motion.div 
                           initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                           key={r.id} 
                           className="flex items-center justify-between p-6 bg-white border-4 border-brand-border rounded-[2rem] hover:border-brand-primary hover:shadow-xl transition-all group overflow-hidden relative"
                         >
                            <div className="flex items-center gap-6 relative z-10">
                               <div className="text-4xl font-black text-brand-ink w-16 h-16 flex items-center justify-center bg-brand-highlight rounded-2xl border-2 border-brand-border group-hover:rotate-12 transition-transform">{r.radical}</div>
                               <div>
                                  <div className="flex items-center gap-3">
                                     <p className="text-2xl font-black text-brand-ink tracking-tight">{r.name}</p>
                                     <Badge className="bg-brand-highlight text-brand-secondary border-brand-border text-[9px] font-black uppercase">{r.meaning}</Badge>
                                  </div>
                                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5 italic">Chứa bộ: {r.exampleChars || '—'}</p>
                               </div>
                            </div>
                            <div className="flex gap-2 relative z-10">
                               <button onClick={() => handleOpenItemEdit(r)} className="h-10 w-10 rounded-xl bg-brand-highlight/80 text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all shadow-sm"><Edit3 className="w-4 h-4" /></button>
                               <button onClick={() => handleDeleteItem(r.id)} className="h-10 w-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm"><Trash2 className="w-4 h-4" /></button>
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-primary/5 rounded-full group-hover:scale-150 transition-transform" />
                         </motion.div>
                       ))}
                    </div>
                  )}
               </div>
            </div>
          </Card>
        </div>
      )}

      {/* Item Edit Modal */}
      {isItemModalOpen && currentItem && (
         <div className="fixed inset-0 z-[110] flex items-center justify-center bg-brand-ink/80 backdrop-blur-xl p-4">
            <Card className="w-full max-w-md bg-white border-brand-border shadow-2xl rounded-[3rem] overflow-hidden border-8 animate-in zoom-in duration-300">
               <div className="p-8 border-b-4 border-brand-border bg-brand-highlight/20 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-brand-ink rounded-xl flex items-center justify-center rotate-3 shadow-lg">
                        <Plus className="w-5 h-5 text-brand-primary" />
                     </div>
                     <h2 className="text-xl font-black text-brand-ink uppercase italic leading-none">Thành phần bộ thủ</h2>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsItemModalOpen(false)} className="rounded-full h-12 w-12 hover:bg-brand-highlight text-brand-ink"><X className="w-6 h-6" /></Button>
               </div>
               <form onSubmit={handleSaveItem} className="p-10 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center block italic">Mặt chữ *</label>
                        <input 
                           value={currentItem.radical} 
                           onChange={e => setCurrentItem({...currentItem, radical: e.target.value})} 
                           className="h-20 w-full text-4xl text-center font-black border-4 border-brand-border rounded-2xl bg-brand-highlight/10 focus:bg-white focus:border-brand-primary transition-all outline-none" 
                           placeholder="亻"
                           required 
                        />
                     </div>
                     <div className="space-y-2 flex flex-col justify-end pb-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Tên gọi *</label>
                        <Input value={currentItem.name} onChange={e => setCurrentItem({...currentItem, name: e.target.value})} className="h-12 font-black border-2 border-brand-border focus:border-brand-primary rounded-xl" placeholder="Bộ nhân đứng" required />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Ý nghĩa</label>
                     <Input value={currentItem.meaning} onChange={e => setCurrentItem({...currentItem, meaning: e.target.value})} className="h-12 border-2 border-brand-border focus:border-brand-primary rounded-xl font-bold" placeholder="Liên quan đến con người" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Ví dụ chữ Hán</label>
                     <Input value={currentItem.exampleChars} onChange={e => setCurrentItem({...currentItem, exampleChars: e.target.value})} className="h-12 border-2 border-brand-border focus:border-brand-primary rounded-xl font-black text-lg" placeholder="你, 他, 们" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Thứ tự hiển thị</label>
                     <Input type="number" value={currentItem.sortOrder} onChange={e => setCurrentItem({...currentItem, sortOrder: Number(e.target.value)})} className="h-12 border-2 border-brand-border focus:border-brand-primary rounded-xl font-bold text-center" />
                  </div>
                  <Button type="submit" disabled={isSaving} className="w-full bg-brand-primary text-white h-16 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-brand-primary/20 mt-4 transition-all hover:scale-[1.02] active:scale-95">
                     {isSaving ? <RefreshCw className="w-6 h-6 animate-spin mx-auto" /> : <><Save className="w-5 h-5 mr-3" /> Xác nhận lưu</>}
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
