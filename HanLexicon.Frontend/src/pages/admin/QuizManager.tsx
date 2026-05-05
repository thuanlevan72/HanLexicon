import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  HelpCircle, Plus, Edit3, Trash2, RefreshCw, X, Save, ArrowLeft, CheckCircle2, List
} from 'lucide-react';
import { adminService } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function QuizManager() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Quiz Options state (managed within the modal)
  const [options, setOptions] = useState<any[]>([]);
  const [isLoadingOptions, setIsLoadingLessons] = useState(false);

  const fetchData = async () => {
    if (!lessonId) return;
    setLoading(true);
    try {
      const res = await adminService.adminGetQuizzes(lessonId);
      if (res.isSuccess) {
        setQuizzes(res.data);
      }
    } catch (error) {
      logger.error('Lỗi tải danh sách Quiz', error);
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
    setIsLoadingLessons(true);
    try {
      const res = await adminService.adminGetQuizOptions(quiz.id);
      if (res.isSuccess) setOptions(res.data);
    } catch (e) { console.error(e); }
    finally { setIsLoadingLessons(false); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = currentQuiz.id 
        ? await adminService.adminUpdateQuiz(currentQuiz.id, currentQuiz)
        : await adminService.adminCreateQuiz(currentQuiz);
      
      if (res.isSuccess) {
        toast.success(currentQuiz.id ? 'Cập nhật câu hỏi thành công' : 'Thêm câu hỏi mới thành công');
        // If it's a new quiz, we need its ID to save options (not supported in this simple UI yet)
        // For now, let's just close and refresh
        setIsEditModalOpen(false);
        fetchData();
      } else {
        toast.error(res.message || 'Có lỗi xảy ra khi lưu câu hỏi');
      }
    } catch (error: any) {
      toast.error("Lỗi: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Xóa câu hỏi này?")) return;
    try {
      const res = await adminService.adminDeleteQuiz(id);
      if (res.isSuccess) {
        toast.success('Xóa câu hỏi thành công');
        fetchData();
      } else {
        toast.error(res.message || 'Không thể xóa câu hỏi này');
      }
    } catch (error: any) {
      toast.error("Lỗi khi xóa: " + error.message);
    }
  };

  // Option management logic
  const handleAddOption = async () => {
    if (!currentQuiz?.id) {
       toast.error("Vui lòng lưu câu hỏi trước khi thêm phương án.");
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
       if (res.isSuccess) {
          toast.success('Thêm phương án thành công');
          setOptions([...options, res.data]);
       } else {
          toast.error(res.message || 'Lỗi khi thêm phương án');
       }
    } catch (e: any) { toast.error("Lỗi khi thêm phương án: " + e.message); }
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
        const res = await adminService.adminDeleteQuizOption(optId);
        if (res.isSuccess) {
           toast.success('Xóa phương án thành công');
           setOptions(options.filter(o => o.id !== optId));
        }
     } catch (e) { console.error(e); }
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
               <HelpCircle className="w-8 h-8 text-brand-primary" />
               Quản lý Quiz
            </h1>
            <p className="text-brand-secondary font-medium">Tạo các câu hỏi trắc nghiệm cho bài học</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={fetchData} variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-brand-highlight">
            <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
          </Button>
          <Button onClick={handleOpenAdd} className="h-12 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-lg gap-2">
            <Plus className="w-5 h-5" /> Thêm câu hỏi
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {loading && quizzes.length === 0 ? (
          <div className="p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></div>
        ) : quizzes.length === 0 ? (
          <div className="p-20 text-center font-bold text-brand-secondary italic bg-white rounded-[2.5rem] border border-brand-border border-dashed">
            Chưa có câu hỏi nào cho bài học này.
          </div>
        ) : quizzes.map((quiz) => (
          <Card key={quiz.id} className="border border-brand-border bg-white rounded-[2rem] shadow-sm overflow-hidden group hover:shadow-xl transition-all">
             <CardContent className="p-8 flex items-start justify-between gap-6">
                <div className="flex gap-6 flex-1">
                   <div className="w-14 h-14 bg-brand-highlight rounded-2xl flex items-center justify-center font-black text-brand-primary text-xl shrink-0 border-2 border-brand-border">
                      {quiz.sortOrder}
                   </div>
                   <div className="space-y-2">
                      <p className="font-black text-xl text-brand-ink leading-tight">{quiz.question}</p>
                      <div className="flex gap-4 items-center">
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Độ khó: {quiz.difficulty}</span>
                         <span className="text-xs text-brand-secondary italic line-clamp-1">{quiz.explanation}</span>
                      </div>
                   </div>
                </div>
                <div className="flex gap-2 shrink-0">
                    <Button onClick={() => handleOpenEdit(quiz)} variant="ghost" size="icon" className="h-12 w-12 rounded-xl bg-brand-highlight/50 text-brand-primary hover:bg-brand-primary hover:text-white"><Edit3 className="w-5 h-5" /></Button>
                    <Button onClick={() => handleDelete(quiz.id)} variant="ghost" size="icon" className="h-12 w-12 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white"><Trash2 className="w-5 h-5" /></Button>
                </div>
             </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && currentQuiz && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-2xl bg-white border-brand-border shadow-2xl rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-brand-border bg-brand-highlight/20 flex items-center justify-between">
              <h2 className="text-xl font-black text-brand-ink uppercase italic">{currentQuiz.id ? "Cập nhật câu hỏi" : "Thêm câu hỏi mới"}</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsEditModalOpen(false)} className="rounded-full h-12 w-12 hover:bg-brand-highlight"><X className="w-6 h-6" /></Button>
            </div>

            <div className="flex flex-col md:flex-row max-h-[80vh]">
               {/* Question Form */}
               <form onSubmit={handleSave} className="flex-1 p-8 space-y-6 overflow-y-auto custom-scrollbar border-r border-brand-border">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Câu hỏi *</label>
                    <textarea 
                      className="w-full p-4 bg-white border-2 border-brand-border rounded-2xl font-bold text-lg text-brand-ink outline-none focus:border-brand-primary min-h-[100px]"
                      value={currentQuiz.question}
                      onChange={e => setCurrentQuiz({ ...currentQuiz, question: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Giải thích đáp án</label>
                    <textarea 
                      className="w-full p-4 bg-brand-highlight/30 border-2 border-transparent rounded-2xl font-medium text-brand-ink outline-none focus:border-brand-primary min-h-[80px]"
                      value={currentQuiz.explanation}
                      onChange={e => setCurrentQuiz({ ...currentQuiz, explanation: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Độ khó (1-5)</label>
                      <Input type="number" min="1" max="5" value={currentQuiz.difficulty} onChange={e => setCurrentQuiz({ ...currentQuiz, difficulty: Number(e.target.value) })} className="h-12 rounded-xl border-brand-border" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sắp xếp</label>
                      <Input type="number" value={currentQuiz.sortOrder} onChange={e => setCurrentQuiz({ ...currentQuiz, sortOrder: Number(e.target.value) })} className="h-12 rounded-xl border-brand-border" />
                    </div>
                  </div>

                  <Button type="submit" disabled={isSaving} className="w-full bg-brand-primary text-white h-16 rounded-2xl font-black shadow-xl text-lg uppercase tracking-widest">
                    {isSaving ? <RefreshCw className="w-6 h-6 animate-spin" /> : <><Save className="w-5 h-5 mr-2" /> Lưu câu hỏi</>}
                  </Button>
               </form>

               {/* Options Management */}
               <div className="flex-1 p-8 bg-brand-highlight/5 space-y-6 overflow-y-auto custom-scrollbar">
                  <div className="flex items-center justify-between">
                     <h3 className="text-xs font-black text-brand-ink uppercase tracking-widest flex items-center gap-2">
                        <List className="w-4 h-4 text-brand-primary" /> Các phương án
                     </h3>
                     <Button onClick={handleAddOption} variant="ghost" size="sm" className="h-8 rounded-lg bg-brand-primary/10 text-brand-primary font-bold text-[10px] uppercase">Thêm</Button>
                  </div>

                  <div className="space-y-3">
                     {isLoadingOptions ? (
                        <div className="p-10 text-center"><RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand-primary opacity-20" /></div>
                     ) : options.length === 0 ? (
                        <p className="text-center text-xs text-slate-400 italic py-10">Chưa có phương án nào.</p>
                     ) : options.map((opt, idx) => (
                        <div key={opt.id} className="flex gap-2 items-center">
                           <button 
                              onClick={() => handleToggleCorrect(opt)}
                              className={cn(
                                 "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all border-2",
                                 opt.isCorrect ? "bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20" : "bg-white border-brand-border text-slate-300 hover:border-brand-primary"
                              )}
                           >
                              <CheckCircle2 className="w-5 h-5" />
                           </button>
                           <Input 
                              value={opt.optionText} 
                              onChange={async (e) => {
                                 const val = e.target.value;
                                 setOptions(options.map(o => o.id === opt.id ? { ...o, optionText: val } : o));
                              }}
                              onBlur={async (e) => {
                                 await adminService.adminUpdateQuizOption(opt.id, { ...opt, optionText: e.target.value });
                              }}
                              className="h-10 rounded-xl border-brand-border bg-white text-sm font-medium"
                           />
                           <Button onClick={() => handleDeleteOption(opt.id)} variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-rose-400 hover:bg-rose-50 hover:text-rose-600 shrink-0"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                     ))}
                  </div>
                  <p className="text-[10px] text-brand-secondary italic leading-tight">
                     * Nhấn vào dấu tích xanh để chọn đáp án đúng. Mọi thay đổi về chữ sẽ tự động lưu khi bạn nhấn ra ngoài.
                  </p>
               </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
