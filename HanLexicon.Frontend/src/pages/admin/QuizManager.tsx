import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  HelpCircle, Plus, Edit3, Trash2, RefreshCw, X, Save, ArrowLeft, CheckCircle2, List, History, ArrowRight, LayoutGrid, Zap
} from 'lucide-react';
import { adminService } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function QuizManager() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Quiz Options state
  const [options, setOptions] = useState<any[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);

  const fetchData = async () => {
    if (!lessonId) return;
    setLoading(true);
    try {
      const res = await adminService.adminGetQuizzes(lessonId);
      if (res.isSuccess) {
        setQuizzes(res.data);
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
    setCurrentQuiz({ 
      lessonId, question: '', explanation: '', difficulty: 1, sortOrder: quizzes.length + 1 
    });
    setOptions([]);
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = async (quiz: any) => {
    setCurrentQuiz(quiz);
    setIsEditModalOpen(true);
    
    // Fetch options for this quiz
    setIsLoadingOptions(true);
    try {
      const res = await adminService.adminGetQuizOptions(quiz.id);
      if (res.isSuccess) setOptions(res.data);
    } catch (e) { console.error(e); }
    finally { setIsLoadingOptions(false); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = currentQuiz.id 
        ? await adminService.adminUpdateQuiz(currentQuiz.id, currentQuiz)
        : await adminService.adminCreateQuiz(currentQuiz);
      
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
    if (!window.confirm("Xóa câu hỏi này?")) return;
    try {
      await adminService.adminDeleteQuiz(id);
      fetchData();
    } catch (error) {
      alert("Lỗi khi xóa");
    }
  };

  const handleAddOption = async () => {
    if (!currentQuiz?.id) {
       alert("Vui lòng lưu câu hỏi trước khi thêm phương án.");
       return;
    }
    const newOpt = { 
       questionId: currentQuiz.id, 
       optionText: 'Phương án mới', 
       isCorrect: false, 
       sortOrder: options.length + 1 
    };
    try {
       const res = await adminService.adminCreateQuizOption(newOpt);
       if (res.isSuccess) setOptions([...options, res.data]);
    } catch (e) { alert("Lỗi khi thêm phương án"); }
  };

  const handleToggleCorrect = async (opt: any) => {
     try {
        const res = await adminService.adminUpdateQuizOption(opt.id, { ...opt, isCorrect: !opt.isCorrect });
        if (res.isSuccess) {
           setOptions(options.map(o => o.id === opt.id ? res.data : o));
        }
     } catch (e) { console.error(e); }
  };

  const handleDeleteOption = async (optId: string) => {
     try {
        await adminService.adminDeleteQuizOption(optId);
        setOptions(options.filter(o => o.id !== optId));
     } catch (e) { console.error(e); }
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
               <HelpCircle className="w-8 h-8 text-brand-primary" />
               Quản lý Quiz
            </h1>
            <div className="flex items-center gap-2 mt-1">
               <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary font-black border-none px-3 py-1">
                  {quizzes.length} CÂU HỎI
               </Badge>
               <p className="text-brand-secondary text-xs font-bold uppercase tracking-widest opacity-60 italic">Assessment Layer Config</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={fetchData} variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-brand-highlight">
            <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
          </Button>
          <Button onClick={handleOpenAdd} className="h-12 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-lg shadow-brand-primary/20 gap-2 transition-all hover:scale-105 active:scale-95">
            <Plus className="w-5 h-5" /> Thêm câu hỏi
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4">
        {loading && quizzes.length === 0 ? (
          <div className="p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></div>
        ) : quizzes.length === 0 ? (
            <div className="p-20 text-center flex flex-col items-center justify-center space-y-4 bg-white rounded-[3rem] border-4 border-dashed border-brand-border/40 mt-10">
               <div className="w-20 h-20 bg-brand-highlight rounded-full flex items-center justify-center">
                  <HelpCircle className="w-10 h-10 text-slate-300" />
               </div>
               <p className="font-black text-brand-secondary uppercase italic">Chưa có câu hỏi trắc nghiệm nào</p>
               <Button onClick={handleOpenAdd} variant="outline" className="rounded-xl border-2 font-black uppercase text-[10px] tracking-widest">Khởi tạo Quiz ngay</Button>
            </div>
        ) : quizzes.map((quiz, idx) => (
          <Card key={quiz.id} className="border-4 border-brand-border bg-white rounded-[2.5rem] shadow-sm overflow-hidden group hover:shadow-xl transition-all">
             <CardContent className="p-8 flex items-center justify-between gap-10">
                <div className="flex gap-8 flex-1">
                   <div className="w-16 h-16 bg-brand-ink text-white rounded-2xl flex items-center justify-center font-black text-2xl shrink-0 border-4 border-brand-primary/20 shadow-xl group-hover:rotate-6 transition-transform">
                      #{quiz.sortOrder}
                   </div>
                   <div className="space-y-3">
                      <h3 className="font-black text-2xl text-brand-ink leading-tight">{quiz.question}</h3>
                      <div className="flex flex-wrap gap-4 items-center">
                         <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-highlight rounded-lg border border-brand-border">
                            <Zap className="w-3 h-3 text-brand-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-secondary">Độ khó: {quiz.difficulty}</span>
                         </div>
                         <p className="text-xs text-slate-400 font-bold italic line-clamp-1">"{quiz.explanation || 'Không có giải thích'}"</p>
                      </div>
                   </div>
                </div>
                <div className="flex gap-2 shrink-0">
                    <button onClick={() => handleOpenEdit(quiz)} className="h-12 px-6 rounded-xl bg-brand-highlight/80 text-brand-primary font-black uppercase text-[10px] tracking-widest hover:bg-brand-primary hover:text-white transition-all shadow-sm border border-brand-border">
                       Chi tiết & Đáp án
                    </button>
                    <button onClick={() => handleDelete(quiz.id)} className="h-12 w-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all border border-rose-100"><Trash2 className="w-5 h-5" /></button>
                </div>
             </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Info Bar */}
      <div className="shrink-0 bg-brand-ink text-white p-6 rounded-[2rem] shadow-2xl flex items-center justify-between mt-auto">
          <div className="flex items-center gap-6">
             <div className="flex flex-col">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Master Identifier</p>
                <div className="flex items-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <p className="text-xs font-bold text-white uppercase tracking-tighter italic">Live Quiz Controller</p>
                </div>
             </div>
          </div>
          <div className="flex items-center gap-2 text-brand-primary">
             <HelpCircle className="w-5 h-5" />
             <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 text-white">HanLexicon Assessment Suite</p>
          </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && currentQuiz && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-6xl bg-white border-brand-border shadow-2xl rounded-[3rem] overflow-hidden border-8 flex flex-col md:flex-row max-h-[90vh]">
            {/* Left: Question Form */}
            <div className="flex-1 p-10 space-y-8 overflow-y-auto custom-scrollbar border-r-4 border-brand-border">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-ink rounded-2xl flex items-center justify-center shadow-lg rotate-3">
                     <Edit3 className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                     <h2 className="text-2xl font-black text-brand-ink uppercase italic leading-none">{currentQuiz.id ? "Cập nhật câu hỏi" : "Thêm câu hỏi mới"}</h2>
                     <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mt-1 opacity-60">Question Main Data</p>
                  </div>
               </div>

               <form onSubmit={handleSave} className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Nội dung câu hỏi *</label>
                    <textarea 
                      className="w-full p-8 bg-brand-highlight/20 border-4 border-brand-border rounded-[2rem] font-black text-2xl text-brand-ink outline-none focus:bg-white focus:border-brand-primary transition-all min-h-[160px] shadow-inner"
                      value={currentQuiz.question}
                      onChange={e => setCurrentQuiz({ ...currentQuiz, question: e.target.value })}
                      placeholder="Nhập câu hỏi tại đây..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Giải thích đáp án</label>
                    <textarea 
                      className="w-full p-6 bg-slate-50 border-2 border-brand-border rounded-2xl font-medium text-brand-ink outline-none focus:border-brand-primary transition-all min-h-[100px] text-sm italic"
                      value={currentQuiz.explanation}
                      onChange={e => setCurrentQuiz({ ...currentQuiz, explanation: e.target.value })}
                      placeholder="Giải thích tại sao đáp án này đúng..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Độ khó (1-5)</label>
                      <Input type="number" min="1" max="5" value={currentQuiz.difficulty} onChange={e => setCurrentQuiz({ ...currentQuiz, difficulty: Number(e.target.value) })} className="h-12 rounded-xl border-2 border-brand-border focus:border-brand-primary font-black text-center" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Thứ tự ưu tiên</label>
                      <Input type="number" value={currentQuiz.sortOrder} onChange={e => setCurrentQuiz({ ...currentQuiz, sortOrder: Number(e.target.value) })} className="h-12 rounded-xl border-2 border-brand-border focus:border-brand-primary font-black text-center" />
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
                     <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)} className="flex-1 h-16 rounded-2xl font-black uppercase tracking-widest border-4 border-brand-border">Hủy</Button>
                     <Button type="submit" disabled={isSaving} className="flex-[2] bg-brand-primary text-white h-16 rounded-2xl font-black shadow-xl shadow-brand-primary/20 text-lg uppercase tracking-widest transition-all active:scale-95">
                        {isSaving ? <RefreshCw className="w-6 h-6 animate-spin mx-auto" /> : <><Save className="w-5 h-5 mr-3" /> Lưu câu hỏi</>}
                     </Button>
                  </div>
               </form>
            </div>

            {/* Right: Options Management */}
            <div className="w-full md:w-[450px] bg-brand-highlight/10 p-10 space-y-10 overflow-y-auto custom-scrollbar">
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                     <h3 className="text-2xl font-black text-brand-ink uppercase italic tracking-tighter flex items-center gap-2">
                        <List className="w-6 h-6 text-brand-primary" /> Đáp án
                     </h3>
                     <p className="text-[10px] font-bold text-brand-secondary uppercase opacity-60">Multiple Choice Options</p>
                  </div>
                  <Button onClick={handleAddOption} disabled={!currentQuiz?.id} className="h-12 px-6 rounded-xl bg-brand-ink text-white font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all">Thêm</Button>
               </div>

               <div className="space-y-4">
                  {isLoadingOptions ? (
                     <div className="p-10 text-center"><RefreshCw className="w-8 h-8 animate-spin mx-auto text-brand-primary opacity-20" /></div>
                  ) : options.length === 0 ? (
                     <div className="p-16 text-center border-4 border-dashed border-brand-border rounded-[2rem] bg-white/50 flex flex-col items-center justify-center gap-3">
                        <List className="w-8 h-8 text-slate-200" />
                        <p className="text-xs text-slate-400 italic font-bold uppercase tracking-widest leading-tight">Chưa có phương án trắc nghiệm nào</p>
                     </div>
                  ) : (
                    <div className="space-y-4">
                       {options.map((opt, i) => (
                         <motion.div 
                           initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                           key={opt.id} 
                           className={cn(
                              "flex gap-3 items-center p-4 bg-white rounded-2xl border-4 transition-all shadow-sm group",
                              opt.isCorrect ? "border-emerald-500 shadow-emerald-500/10 scale-[1.02]" : "border-brand-border hover:border-brand-primary"
                           )}
                         >
                            <button 
                               onClick={() => handleToggleCorrect(opt)}
                               className={cn(
                                  "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all border-2",
                                  opt.isCorrect ? "bg-emerald-500 border-emerald-400 text-white shadow-lg" : "bg-brand-highlight/50 border-brand-border text-slate-300 hover:text-brand-primary"
                               )}
                               title={opt.isCorrect ? "Đáp án đúng" : "Đánh dấu là đáp án đúng"}
                            >
                               <CheckCircle2 className="w-6 h-6" />
                            </button>
                            <input 
                               value={opt.optionText} 
                               onChange={(e) => setOptions(options.map(o => o.id === opt.id ? { ...o, optionText: e.target.value } : o))}
                               onBlur={async (e) => await adminService.adminUpdateQuizOption(opt.id, { ...opt, optionText: e.target.value })}
                               className="flex-1 bg-transparent border-none outline-none font-bold text-brand-ink text-sm"
                            />
                            <button onClick={() => handleDeleteOption(opt.id)} className="h-8 w-8 rounded-lg text-rose-300 hover:bg-rose-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center">
                               <X className="w-4 h-4" />
                            </button>
                         </motion.div>
                       ))}
                    </div>
                  )}
               </div>
               
               <Card className="p-6 bg-brand-primary/10 border-2 border-brand-primary/20 rounded-2xl border-dashed">
                  <p className="text-[10px] text-brand-ink font-bold leading-relaxed italic opacity-80">
                     * Nhấn vào ô vuông để xác định đáp án chính xác. Nội dung chữ sẽ được tự động đồng bộ hóa sau khi bạn chỉnh sửa.
                  </p>
               </Card>
            </div>
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
