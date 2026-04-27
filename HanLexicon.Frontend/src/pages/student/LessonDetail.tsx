import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, Volume2, ChevronRight, ChevronLeft, CheckCircle2, 
  BookOpen, Trophy, Play, Star, RefreshCw, Quote, ArrowRight
} from 'lucide-react';
import { learningService, Vocabulary } from '@/src/services/api';
import { cn } from '@/lib/utils';

export default function StudentLessonDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [vocabIndex, setVocabIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!id) return;
      try {
        const res = await learningService.getLessonDetail(id);
        const data = res.data || res;
        if (data) {
          setLesson(data);
          // Tự động nhảy đến vị trí đang học dở
          if (data.currentIndex > 0 && data.currentIndex < (data.vocabularies?.length || 0)) {
            setVocabIndex(data.currentIndex);
          }
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchLesson();
  }, [id]);

  // Tự động lưu tiến độ khi thay đổi từ vựng
  useEffect(() => {
    if (lesson && vocabIndex >= 0) {
      const saveProgress = async () => {
        try {
          await learningService.saveProgress({
            lessonId: lesson.id,
            score: 0,
            completed: vocabIndex === lesson.vocabularies.length - 1,
            timeSpentS: 0,
            currentIndex: vocabIndex
          });
        } catch (e) { console.error("Lỗi lưu tiến độ", e); }
      };
      // Debounce hoặc chỉ lưu khi thực sự cần thiết, ở đây lưu mỗi lần next để đảm bảo trải nghiệm
      saveProgress();
    }
  }, [vocabIndex, lesson]);

  const playAudio = (url?: string) => {
    if (!url || !audioRef.current) return;
    const backendUrl = (import.meta as any).env?.VITE_API_BASE_URL?.replace('/api/v1', '') || 'https://localhost:7285';
    const fullUrl = url.startsWith('http') ? url : `${backendUrl}/${url.startsWith('/') ? url.substring(1) : url}`;
    audioRef.current.src = fullUrl;
    audioRef.current.play();
  };

  const handleFinishStudy = async () => {
    if (!lesson) return;
    setIsFinished(true);
    try {
       await learningService.saveProgress({
          lessonId: lesson.id,
          score: 100,
          completed: true,
          timeSpentS: 120,
          currentIndex: vocabIndex
       });
    } catch (e) { console.error("Lỗi lưu tiến độ học tập", e); }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-brand-bg"><RefreshCw className="w-10 h-10 animate-spin text-brand-primary opacity-20" /></div>;
  if (!lesson || !lesson.vocabularies?.length) return <div className="text-center p-20 font-bold">Bài học này chưa có nội dung từ vựng.</div>;

  const currentVocab = lesson.vocabularies[vocabIndex];

  if (isFinished) {
    return (
       <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full text-center space-y-8">
             <div className="w-32 h-32 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl rotate-3">
                <CheckCircle2 className="w-16 h-16 text-white" />
             </div>
             <div className="space-y-2">
                <h1 className="text-4xl font-black text-brand-ink uppercase italic">Học tập hoàn tất!</h1>
                <p className="text-brand-secondary font-bold">Bạn đã xem toàn bộ từ vựng của bài học này.</p>
             </div>
             <div className="grid grid-cols-1 gap-4">
                <Button onClick={() => navigate('/student')} className="h-16 rounded-2xl font-black bg-brand-ink text-white shadow-lg gap-2">
                   Quay về Dashboard <ArrowRight className="w-5 h-5 text-brand-primary" />
                </Button>
                <Button onClick={() => navigate(`/student/lessons/${id}/review`)} variant="outline" className="h-16 rounded-2xl font-black border-2 border-brand-border gap-2 hover:bg-brand-highlight">
                   <RefreshCw className="w-5 h-5 text-brand-primary" /> Sang phần Ôn luyện ngay
                </Button>
             </div>
          </motion.div>
       </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg pb-20">
      <audio ref={audioRef} className="hidden" />
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-brand-border h-20">
         <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between gap-6">
            <Button onClick={() => navigate('/student')} variant="ghost" size="icon" className="rounded-full hover:bg-brand-highlight"><ArrowLeft /></Button>
            <div className="flex-1 max-w-md">
               <div className="flex justify-between text-[10px] font-black uppercase mb-2 tracking-widest text-brand-secondary">
                  <span>Tiến độ học từ mới</span>
                  <span className="text-brand-primary">{vocabIndex + 1} / {lesson.vocabularies.length}</span>
               </div>
               <Progress value={((vocabIndex + 1) / lesson.vocabularies.length) * 100} className="h-2 bg-brand-highlight" />
            </div>
            <div className="w-10" />
         </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-12 space-y-8">
         <AnimatePresence mode="wait">
            <motion.div key={vocabIndex} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-8">
               <Card className="border-4 border-brand-border bg-white rounded-[3.5rem] shadow-xl overflow-hidden min-h-[450px] flex flex-col hover:border-brand-primary transition-colors">
                  <CardContent className="p-12 flex-1 flex flex-col items-center justify-center text-center space-y-8">
                     {(currentVocab.imageUrl || currentVocab.image) && (
                        <div className="w-40 h-40 rounded-3xl overflow-hidden border-4 border-brand-highlight shadow-md">
                           <img src={currentVocab.imageUrl || currentVocab.image} className="w-full h-full object-cover" />
                        </div>
                     )}
                     <div className="space-y-2">
                        <h1 className="text-8xl font-black text-brand-ink tracking-tighter">{currentVocab.word}</h1>
                        <p className="text-3xl font-black text-brand-primary uppercase italic tracking-widest">{currentVocab.pinyin}</p>
                     </div>
                     <div className="bg-brand-highlight/30 px-8 py-4 rounded-2xl border border-brand-border/50">
                        <p className="text-2xl font-black text-brand-ink italic">"{currentVocab.meaning || currentVocab.meaning_vn}"</p>
                     </div>
                     <Button onClick={() => playAudio(currentVocab.audioUrl || currentVocab.audio)} size="lg" className="w-16 h-16 rounded-full bg-sky-500 text-white shadow-xl hover:scale-110 active:scale-95 transition-all">
                        <Volume2 className="w-8 h-8" />
                     </Button>
                  </CardContent>

                  {(currentVocab.example_cn || currentVocab.exampleCn) && (
                     <div className="p-8 bg-brand-ink text-white/90">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-primary mb-3">
                           <Quote className="w-3 h-3" /> Ví dụ minh họa
                        </div>
                        <div className="space-y-1">
                           <p className="text-xl font-bold font-serif">{currentVocab.example_cn || currentVocab.exampleCn}</p>
                           <p className="text-sm text-brand-primary font-bold italic">{currentVocab.example_py || currentVocab.examplePy}</p>
                           <p className="text-sm font-medium text-slate-400">{currentVocab.example_vn || currentVocab.exampleVn}</p>
                        </div>
                     </div>
                  )}
               </Card>

               <div className="flex gap-4">
                  <Button 
                     disabled={vocabIndex === 0} 
                     onClick={() => setVocabIndex(v => v - 1)}
                     className="h-16 flex-1 bg-white border-2 border-brand-border text-brand-secondary rounded-2xl font-black uppercase tracking-widest hover:bg-brand-highlight"
                  >
                     <ChevronLeft className="mr-2" /> Quay lại
                  </Button>
                  <Button 
                     onClick={() => {
                        if (vocabIndex < lesson.vocabularies.length - 1) setVocabIndex(v => v + 1);
                        else handleFinishStudy();
                     }}
                     className="h-16 flex-[2] bg-brand-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-brand-primary/20"
                  >
                     {vocabIndex < lesson.vocabularies.length - 1 ? 'Tiếp theo' : 'Hoàn thành học'} <ChevronRight className="ml-2" />
                  </Button>
               </div>
            </motion.div>
         </AnimatePresence>
      </main>
    </div>
  );
}
