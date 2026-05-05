import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Type, Plus, Edit3, Trash2, RefreshCw, X, Save, ArrowLeft, Layers, BookMarked, Search
} from 'lucide-react';
import { adminService, learningService, LessonFlat } from '@/src/services/api';
import { FormSelect } from '@/src/components/ui/FormSelect';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

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
      logger.error('Lỗi tải dữ liệu bộ thủ', error);
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
        toast.success(currentSet.id ? 'Cập nhật nhóm bộ thủ thành công' : 'Thêm nhóm bộ thủ mới thành công');
        setIsSetModalOpen(false);
        fetchInitialData();
      } else {
        toast.error(res.message || 'Có lỗi xảy ra khi lưu nhóm bộ thủ');
      }
    } catch (error: any) {
      toast.error("Lỗi: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSet = async (id: string) => {
    if (!window.confirm("Xóa bộ thủ này? Tất cả các mục bên trong sẽ bị xóa.")) return;
    try {
      const res = await adminService.adminDeleteRadicalSet(id);
      if (res.isSuccess) {
        toast.success('Xóa nhóm bộ thủ thành công');
        fetchInitialData();
      } else {
        toast.error(res.message || 'Không thể xóa nhóm bộ thủ này');
      }
    } catch (error: any) {
      toast.error("Lỗi khi xóa: " + error.message);
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
           toast.success(currentItem.id ? 'Cập nhật mục bộ thủ thành công' : 'Thêm mục bộ thủ mới thành công');
           setIsItemModalOpen(false);
           // Refresh radicals list
           const refresh = await adminService.adminGetRadicals(currentSet.id);
           if (refresh.isSuccess) setRadicals(refresh.data);
        } else {
           toast.error(res.message || 'Lỗi lưu mục bộ thủ');
        }
     } catch (e: any) { toast.error("Lỗi lưu mục bộ thủ: " + e.message); }
     finally { setIsSaving(false); }
  };

  const handleDeleteItem = async (id: string) => {
    if (!window.confirm("Xóa mục này?")) return;
    try {
      const res = await adminService.adminDeleteRadical(id);
      if (res.isSuccess) {
        toast.success('Xóa mục bộ thủ thành công');
        setRadicals(radicals.filter(r => r.id !== id));
      } else {
        toast.error(res.message || 'Không thể xóa mục này');
      }
    } catch (error: any) {
      toast.error("Lỗi khi xóa: " + error.message);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-brand-ink tracking-tight uppercase italic flex items-center gap-3 font-heading">
             <Layers className="w-8 h-8 text-brand-primary" />
             Quản lý Bộ thủ
          </h1>
          <p className="text-brand-secondary font-medium">Quản lý các bộ thủ Hán ngữ theo nhóm (Sets)</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={fetchInitialData} variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-brand-highlight">
            <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
          </Button>
          <Button onClick={handleOpenSetAdd} className="h-12 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-lg gap-2">
            <Plus className="w-5 h-5" /> Thêm nhóm mới
          </Button>
        </div>
      </div>

      <Card className="p-6 border-brand-border bg-white rounded-[2rem] shadow-sm">
        <div className="flex items-center gap-4">
          <BookMarked className="w-5 h-5 text-brand-primary" />
          <span className="text-xs font-black uppercase tracking-widest text-brand-secondary">Lọc theo bài học:</span>
          <div className="flex-1 max-w-md">
            <FormSelect
              className="h-12 border-none bg-brand-highlight/30"
              value={selectedLessonId}
              onChange={(e) => setSelectedLessonId(e.target.value)}
            >
              <option value="">Tất cả bài học</option>
              {lessons.map(l => (
                <option key={l.id} value={l.id}>[{l.level}] {l.title}</option>
              ))}
            </FormSelect>
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading && sets.length === 0 ? (
          <div className="col-span-full p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></div>
        ) : sets.length === 0 ? (
          <div className="col-span-full p-20 text-center font-bold text-brand-secondary italic bg-white rounded-[2.5rem] border border-brand-border border-dashed">
            Chưa có nhóm bộ thủ nào được tạo.
          </div>
        ) : sets.map((set) => (
          <Card key={set.id} className="border border-brand-border bg-white rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all group">
             <div className="p-8 flex-1 space-y-4">
                <div className="flex justify-between items-start">
                   <div className="text-4xl">{set.icon}</div>
                   <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button onClick={() => handleOpenSetEdit(set)} variant="ghost" size="icon" className="h-9 w-9 rounded-xl bg-brand-highlight/50 text-brand-primary hover:bg-brand-primary hover:text-white"><Edit3 className="w-4 h-4" /></Button>
                      <Button onClick={() => handleDeleteSet(set.id)} variant="ghost" size="icon" className="h-9 w-9 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white"><Trash2 className="w-4 h-4" /></Button>
                   </div>
                </div>
                <div>
                   <h3 className="text-2xl font-black text-brand-ink">Nhóm #{set.setNumber}: {set.title}</h3>
                   <p className="text-xs text-brand-secondary font-bold uppercase tracking-widest mt-1">
                      {lessons.find(l => l.id === set.lessonId)?.title || 'Chương trình chung'}
                   </p>
                </div>
             </div>
             <Button onClick={() => handleOpenSetEdit(set)} variant="ghost" className="m-4 mt-0 h-12 rounded-2xl bg-brand-highlight/30 text-brand-primary font-black uppercase text-[10px] tracking-widest hover:bg-brand-primary hover:text-white">
                Quản lý các mục (Items)
             </Button>
          </Card>
        ))}
      </div>

      {/* Set Edit Modal */}
      {isSetModalOpen && currentSet && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-5xl bg-white border-brand-border shadow-2xl rounded-[3rem] overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            {/* Left: Set Info */}
            <div className="w-full md:w-80 border-r border-brand-border bg-brand-highlight/10 p-8 space-y-6 overflow-y-auto">
               <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-black text-brand-ink uppercase italic">Thông tin nhóm</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsSetModalOpen(false)} className="md:hidden"><X /></Button>
               </div>
               
               <form onSubmit={handleSaveSet} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tiêu đề nhóm *</label>
                    <Input value={currentSet.title} onChange={e => setCurrentSet({ ...currentSet, title: e.target.value })} className="h-12 rounded-xl font-bold border-brand-border bg-white" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Biểu tượng</label>
                       <Input value={currentSet.icon} onChange={e => setCurrentSet({ ...currentSet, icon: e.target.value })} className="h-12 rounded-xl text-center text-xl bg-white border-brand-border" />
                     </div>
                     <div className="space-y-1">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thứ tự nhóm</label>
                       <Input type="number" value={currentSet.setNumber} onChange={e => setCurrentSet({ ...currentSet, setNumber: Number(e.target.value) })} className="h-12 rounded-xl bg-white border-brand-border" />
                     </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gắn vào bài học</label>
                    <FormSelect 
                      className="w-full h-12 bg-white border-2 border-brand-border rounded-xl font-bold"
                      value={currentSet.lessonId || ''}
                      onChange={e => setCurrentSet({ ...currentSet, lessonId: e.target.value || null })}
                    >
                      <option value="">-- Không gắn (Chung) --</option>
                      {lessons.map((l: any) => <option key={l.id} value={l.id}>{l.title}</option>)}
                    </FormSelect>
                  </div>
                  <Button type="submit" disabled={isSaving} className="w-full bg-brand-ink text-white h-14 rounded-xl font-black uppercase tracking-widest shadow-lg">
                    {isSaving ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'Lưu thông tin'}
                  </Button>
               </form>
            </div>

            {/* Right: Items List */}
            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar flex flex-col space-y-6">
               <div className="flex justify-between items-center">
                  <div>
                     <h2 className="text-2xl font-black text-brand-ink uppercase italic tracking-tight">Danh sách các bộ thủ</h2>
                     <p className="text-xs text-brand-secondary font-medium">Chi tiết các mục thuộc nhóm này</p>
                  </div>
                  <div className="flex items-center gap-3">
                     <Button onClick={handleOpenItemAdd} disabled={!currentSet.id} className="h-10 px-6 rounded-xl bg-brand-primary text-white font-black text-xs uppercase shadow-md gap-2">
                        <Plus className="w-4 h-4" /> Thêm mục
                     </Button>
                     <Button variant="ghost" size="icon" onClick={() => setIsSetModalOpen(false)} className="hidden md:flex rounded-full h-12 w-12 hover:bg-brand-highlight"><X className="w-6 h-6" /></Button>
                  </div>
               </div>

               <div className="space-y-3">
                  {isLoadingRadicals ? (
                     <div className="p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></div>
                  ) : radicals.length === 0 ? (
                     <div className="p-20 text-center border-2 border-dashed border-brand-border rounded-[2rem] bg-slate-50">
                        <p className="text-sm text-slate-400 italic font-bold">Chưa có mục nào. Hãy nhấn nút thêm phía trên.</p>
                     </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3">
                       {radicals.map((r) => (
                         <div key={r.id} className="flex items-center justify-between p-4 bg-white border border-brand-border rounded-2xl hover:border-brand-primary transition-colors group">
                            <div className="flex items-center gap-6">
                               <div className="text-3xl font-black text-brand-ink w-12 h-12 flex items-center justify-center bg-brand-highlight/30 rounded-xl">{r.radical}</div>
                               <div>
                                  <p className="font-black text-brand-ink">{r.name} <span className="text-brand-secondary font-medium text-xs ml-2">({r.meaning})</span></p>
                                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 italic">Ví dụ: {r.exampleChars || '---'}</p>
                               </div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                               <Button onClick={() => handleOpenItemEdit(r)} variant="ghost" size="icon" className="h-9 w-9 rounded-lg bg-brand-highlight/50 text-brand-primary hover:bg-brand-primary hover:text-white"><Edit3 className="w-4 h-4" /></Button>
                               <Button onClick={() => handleDeleteItem(r.id)} variant="ghost" size="icon" className="h-9 w-9 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                         </div>
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
         <div className="fixed inset-0 z-[110] flex items-center justify-center bg-brand-ink/40 backdrop-blur-sm p-4">
            <Card className="w-full max-w-md bg-white border-brand-border shadow-2xl rounded-[2.5rem] overflow-hidden">
               <div className="p-6 border-b border-brand-border bg-brand-highlight/20 flex items-center justify-between">
                  <h2 className="text-lg font-black text-brand-ink uppercase italic">Chi tiết mục bộ thủ</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsItemModalOpen(false)} className="rounded-full h-10 w-10"><X className="w-5 h-5" /></Button>
               </div>
               <form onSubmit={handleSaveItem} className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mặt chữ *</label>
                        <Input value={currentItem.radical} onChange={e => setCurrentItem({...currentItem, radical: e.target.value})} className="h-14 text-2xl text-center font-black border-brand-border" required />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tên gọi *</label>
                        <Input value={currentItem.name} onChange={e => setCurrentItem({...currentItem, name: e.target.value})} className="h-14 font-bold border-brand-border" required />
                     </div>
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ý nghĩa</label>
                     <Input value={currentItem.meaning} onChange={e => setCurrentItem({...currentItem, meaning: e.target.value})} className="h-12 border-brand-border" />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Chữ Hán chứa bộ này (Ví dụ)</label>
                     <Input value={currentItem.exampleChars} onChange={e => setCurrentItem({...currentItem, exampleChars: e.target.value})} className="h-12 border-brand-border font-medium" placeholder="Ví dụ: 你, 他, 们" />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thứ tự hiển thị</label>
                     <Input type="number" value={currentItem.sortOrder} onChange={e => setCurrentItem({...currentItem, sortOrder: Number(e.target.value)})} className="h-12 border-brand-border" />
                  </div>
                  <Button type="submit" disabled={isSaving} className="w-full bg-brand-primary text-white h-14 rounded-xl font-black uppercase shadow-lg mt-4">
                     {isSaving ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'Xác nhận lưu'}
                  </Button>
               </form>
            </Card>
         </div>
      )}
    </div>
  );
}
