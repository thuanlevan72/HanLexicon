import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, Volume2, ChevronRight, CheckCircle2, 
  XCircle, RefreshCw, Quote, Trophy, Sparkles, Send
} from 'lucide-react';
import { learningService, Vocabulary } from '@/src/services/api';
import { cn } from '@/lib/utils';

export default function LessonReview() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Interaction state
  const [userInput, setUserInput] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [history, setHistory] = useState<any[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const res = await learningService.getLessonDetail(id);
        const data = res.data || res;
        if (data && data.vocabularies) {
          setVocabularies(data.vocabularies);
          // Tự động khôi phục vị trí ôn tập (nếu chưa hoàn thành)
          if (data.currentIndex > 0 && data.currentIndex < data.vocabularies.length) {
            setCurrentIndex(data.currentIndex);
            console.log("Khôi phục vị trí ôn tập:", data.currentIndex);
          }
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!isChecked && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex, isChecked]);

  const currentWord = vocabularies[currentIndex];

  const getMediaUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const backendUrl = (import.meta as any).env?.VITE_API_BASE_URL?.replace('/api/v1', '') || 'https://localhost:7285';
    return `${backendUrl}/${url.startsWith('/') ? url.substring(1) : url}`;
  };

  const playAudio = (url?: string) => {
    if (!url || !audioRef.current) return;
    const fullUrl = getMediaUrl(url);
    console.log("Đang phát âm thanh:", fullUrl);
    audioRef.current.src = fullUrl;
    audioRef.current.play().catch(err => console.error("Lỗi phát âm thanh:", err));
  };

  const handleCheck = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isChecked || !userInput.trim()) return;

    const word = currentWord.word || (currentWord as any).Word;
    const correct = userInput.trim() === word;
    
    setIsCorrect(correct);
    setIsChecked(true);
    if (correct) setCorrectCount(prev => prev + 1);
    
    // Lưu lại lịch sử chi tiết từng câu
    setHistory(prev => [...prev, {
       vocabId: currentWord.id,
       word: word,
       userInput: userInput.trim(),
       isCorrect: correct,
       pinyin: currentWord.pinyin || (currentWord as any).Pinyin,
       meaning: currentWord.meaning || (currentWord as any).Meaning
    }]);

    // Tự động phát âm thanh khi trả lời
    const audioUrl = currentWord.audioUrl || (currentWord as any).audio || (currentWord as any).AudioUrl;
    playAudio(audioUrl);
  };

  const handleNext = async () => {
    const isLast = currentIndex === vocabularies.length - 1;
    
    // Lưu tiến độ ngay lập tức khi sang câu mới
    try {
       const currentScore = Math.round((correctCount / vocabularies.length) * 100);
       await learningService.saveProgress({
          lessonId: id,
          score: isLast ? currentScore : 0,
          completed: isLast && currentScore >= 80,
          timeSpentS: 10,
          currentIndex: isLast ? 0 : currentIndex + 1, // Reset về 0 nếu đã xong, ngược lại lưu vị trí tiếp theo
          // Gửi thêm thông tin chi tiết nếu là câu cuối
          totalQuestions: isLast ? vocabularies.length : null,
          correctCount: isLast ? correctCount : null,
          detailsJson: isLast ? JSON.stringify(history) : null
       });
    } catch (e) { console.error("Lỗi lưu tiến độ ôn luyện", e); }

    if (!isLast) {
      setCurrentIndex(prev => prev + 1);
      setUserInput('');
      setIsChecked(false);
    } else {
      setShowResult(true);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><RefreshCw className="animate-spin text-brand-primary" /></div>;
  if (vocabularies.length === 0) return <div className="text-center p-20 font-bold">Bài học này chưa có từ vựng để ôn tập.</div>;

  if (showResult) {
     return (
        <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6">
           <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full text-center space-y-8">
              <div className="w-32 h-32 bg-brand-primary rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl rotate-3">
                 <Trophy className="w-16 h-16 text-white" />
              </div>
              <div className="space-y-2">
                 <h1 className="text-4xl font-black text-brand-ink uppercase italic">Hoàn thành ôn tập!</h1>
                 <p className="text-brand-secondary font-bold">Bạn đã trả lời đúng {correctCount}/{vocabularies.length} từ vựng.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <Button onClick={() => window.location.reload()} variant="outline" className="h-16 rounded-2xl font-black border-brand-border gap-2">
                    <RefreshCw className="w-5 h-5" /> Học lại
                 </Button>
                 <Button onClick={() => navigate('/student')} className="h-16 rounded-2xl font-black bg-brand-primary text-white shadow-lg gap-2">
                    Tiếp tục <ChevronRight className="w-5 h-5" />
                 </Button>
              </div>
           </motion.div>
        </div>
     );
  }

  // Dữ liệu word an toàn (hỗ trợ cả PascalCase)
  const displayWord = currentWord.word || (currentWord as any).Word;
  const displayPinyin = currentWord.pinyin || (currentWord as any).Pinyin;
  const displayMeaning = currentWord.meaning || (currentWord as any).Meaning || currentWord.meaning_vn || (currentWord as any).MeaningVn;
  const displayAudio = currentWord.audioUrl || (currentWord as any).audio || (currentWord as any).AudioUrl;

  return (
    <div className="min-h-screen bg-brand-bg pb-20">
      <audio ref={audioRef} className="hidden" />
      
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-brand-border h-20">
         <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between gap-6">
            <Button onClick={() => navigate(-1)} variant="ghost" size="icon" className="rounded-full"><ArrowLeft /></Button>
            <div className="flex-1 max-w-md">
               <div className="flex justify-between text-[10px] font-black uppercase mb-2 tracking-widest text-brand-secondary">
                  <span>Tiến độ ôn tập</span>
                  <span className="text-brand-primary">{currentIndex + 1} / {vocabularies.length}</span>
               </div>
               <Progress value={((currentIndex + 1) / vocabularies.length) * 100} className="h-2 bg-brand-highlight" />
            </div>
            <div className="w-10" />
         </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-12 space-y-8">
         <AnimatePresence mode="wait">
            <motion.div 
               key={currentIndex}
               initial={{ x: 20, opacity: 0 }} 
               animate={{ x: 0, opacity: 1 }} 
               exit={{ x: -20, opacity: 0 }}
               className="space-y-8"
            >
               {/* Word Card - Vietnamese Side */}
               <Card className="border-4 border-brand-border bg-white rounded-[3rem] shadow-xl overflow-hidden">
                  <CardContent className="p-12 text-center space-y-6">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-secondary italic">Dịch sang tiếng Trung</p>
                     <h1 className="text-5xl font-black text-brand-ink leading-tight">
                        {displayMeaning}
                     </h1>
                  </CardContent>
               </Card>

               {/* Input Section */}
               <div className="space-y-4">
                  <form onSubmit={handleCheck} className="relative">
                     <input 
                        ref={inputRef}
                        type="text" 
                        placeholder="Gõ chữ Hán tại đây..."
                        className={cn(
                           "w-full h-24 px-8 rounded-[2rem] text-4xl font-black text-center border-4 transition-all outline-none shadow-lg",
                           !isChecked ? "bg-white border-brand-border focus:border-brand-primary" : 
                           isCorrect ? "bg-emerald-50 border-emerald-500 text-emerald-600" : "bg-rose-50 border-rose-500 text-rose-600"
                        )}
                        value={userInput}
                        onChange={e => setUserInput(e.target.value)}
                        disabled={isChecked}
                     />
                     {!isChecked && (
                        <button type="submit" className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-brand-ink text-white rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                           <Send className="w-6 h-6" />
                        </button>
                     )}
                  </form>

                  {/* Feedback Area */}
                  {isChecked && (
                     <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-6">
                        <div className="flex items-center justify-center gap-4">
                           {isCorrect ? (
                              <div className="flex items-center gap-2 text-emerald-600 font-black italic uppercase tracking-widest bg-emerald-50 px-6 py-3 rounded-2xl border-2 border-emerald-100">
                                 <CheckCircle2 className="w-5 h-5" /> Chính xác!
                              </div>
                           ) : (
                              <div className="flex items-center gap-2 text-rose-600 font-black italic uppercase tracking-widest bg-rose-50 px-6 py-3 rounded-2xl border-2 border-rose-100">
                                 <XCircle className="w-5 h-5" /> Sai rồi: <span className="text-2xl ml-2">{displayWord}</span>
                              </div>
                           )}
                           <Button onClick={() => playAudio(displayAudio)} variant="ghost" size="icon" className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-500 border border-sky-100 shadow-sm"><Volume2 /></Button>
                        </div>

                        {/* Correct Details & Examples */}
                        <Card className="border-2 border-brand-border bg-brand-ink text-white rounded-[2.5rem] overflow-hidden shadow-2xl">
                           <div className="p-8 space-y-6">
                              <div className="flex justify-between items-start">
                                 <div>
                                    <p className="text-[10px] font-black uppercase text-brand-primary tracking-widest mb-1">Phiên âm</p>
                                    <p className="text-3xl font-black italic tracking-widest">{displayPinyin}</p>
                                 </div>
                                 <Sparkles className="text-brand-primary w-8 h-8 opacity-20" />
                              </div>

                              {(currentWord.exampleCn || (currentWord as any).example_cn) && (
                                 <div className="pt-6 border-t border-white/10 space-y-3">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-brand-primary tracking-widest italic">
                                       <Quote className="w-3 h-3" /> Ví dụ sử dụng
                                    </div>
                                    <div className="space-y-1">
                                       <p className="text-xl font-bold font-serif">{currentWord.exampleCn || (currentWord as any).example_cn}</p>
                                       <p className="text-sm text-brand-primary font-bold italic">{currentWord.examplePy || (currentWord as any).example_py}</p>
                                       <p className="text-sm text-slate-400 font-medium">{currentWord.exampleVn || (currentWord as any).example_vn}</p>
                                    </div>
                                 </div>
                              )}
                           </div>
                        </Card>

                        <Button onClick={handleNext} className="w-full h-20 bg-brand-primary text-white rounded-[2rem] text-xl font-black uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                           Tiếp tục <ChevronRight className="ml-2 w-6 h-6" />
                        </Button>
                     </motion.div>
                  )}
               </div>
            </motion.div>
         </AnimatePresence>
      </main>
    </div>
  );
}
