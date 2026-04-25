import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, ArrowRight, Volume2, Brain, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { learningService, LessonDetail, Quiz } from '@/src/services/api';
import { playAudio } from '@/src/lib/audio';

export default function StudentQuiz() {
  const { id } = useParams();
  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (id) {
      learningService.getLessonDetail(id).then(data => {
        setLesson(data);
        if (data.quizzes && data.quizzes.length > 0) {
          // Map to local question format
          setQuestions(data.quizzes.map((q: Quiz, idx: number) => {
            const correctOptIdx = q.options.findIndex(o => o.isCorrect);
            return {
              id: idx + 1,
              type: 'general',
              question: q.question,
              options: q.options.map(o => o.optionText),
              correct: correctOptIdx >= 0 ? correctOptIdx : 0
            };
          }));
        } else {
          // Fallback questions if empty
          setQuestions([
            { id: 1, type: 'translate', question: 'Dịch sang tiếng Việt: 你好', options: ['Chào buổi sáng', 'Tạm biệt', 'Xin chào', 'Cảm ơn'], correct: 2, audio: true },
            { id: 2, type: 'matching', question: 'Chọn Hán tự cho: wǒ (Tôi)', options: ['你', '我', '好', '叫'], correct: 1 }
          ]);
        }
      }).catch(err => console.error("Failed to fetch lesson detail", err));
    }
  }, [id]);

  useEffect(() => {
    if (isFinished && id) {
      learningService.saveProgress({
        lessonId: id,
        score: Math.round((score / questions.length) * 100),
        completed: true,
        timeSpentS: 300 // example time
      }).catch(err => console.error("Failed to save progress", err));
    }
  }, [isFinished, id, score, questions.length]);

  if (!lesson || questions.length === 0) {
    return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div></div>;
  }

  const currentQuestion = questions[currentStep];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto pt-10 text-center space-y-12 animate-in zoom-in duration-500">
        <div className="relative inline-block">
          <div className="bg-brand-highlight p-10 rounded-full mb-6 border border-brand-border">
            <Trophy className="w-24 h-24 text-brand-primary fill-brand-primary" />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-5xl font-black text-brand-ink">Hoàn thành bài Quiz!</h2>
          <p className="text-brand-secondary text-xl font-medium">Bạn đã trả lời đúng <span className="text-brand-primary font-black">{score}</span>/{questions.length} câu hỏi.</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Card className="p-8 bg-brand-highlight border-brand-border rounded-3xl shadow-sm">
            <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mb-2">Kinh nghiệm</p>
            <p className="text-3xl font-black text-brand-ink">+50 XP</p>
          </Card>
          <Card className="p-8 bg-brand-surface border-brand-border rounded-3xl shadow-sm">
            <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mb-2">Chính xác</p>
            <p className="text-3xl font-black text-brand-ink">{(score / questions.length) * 100}%</p>
          </Card>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 pt-8">
          <Button variant="outline" className="flex-1 h-16 rounded-2xl font-bold border-brand-border text-brand-secondary hover:bg-brand-highlight" onClick={() => window.location.reload()}>Học lại bài này</Button>
          <Button 
            className="flex-1 h-16 rounded-2xl bg-brand-primary hover:bg-brand-secondary font-bold text-white shadow-lg shadow-brand-primary/20" 
            render={<Link to="/student/lessons">Khám phá bài học khác</Link>}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <header className="space-y-6">
        <div className="flex items-center justify-between">
          <Badge className="bg-brand-highlight text-brand-primary border border-brand-border px-6 py-1.5 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-sm">Bài học: Chào hỏi cơ bản</Badge>
          <span className="text-sm font-bold text-brand-secondary tracking-widest uppercase">Câu {currentStep + 1} / {questions.length}</span>
        </div>
        <div className="space-y-2">
           <Progress value={((currentStep + 1) / questions.length) * 100} className="h-4 bg-brand-highlight" />
        </div>
      </header>

      <div className="space-y-8">
        <div className="space-y-6 text-center py-16 md:py-24 bg-white rounded-3xl border border-brand-border shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 p-6 opacity-30">
             <Brain className="w-10 h-10 text-brand-secondary" />
           </div>
           <h2 className="text-4xl md:text-5xl font-extrabold text-brand-ink px-10 leading-tight tracking-tight">{currentQuestion.question}</h2>
           {currentQuestion.audio && (
             <Button 
               onClick={() => playAudio(currentQuestion.question.split(':').pop()?.trim() || currentQuestion.question)} 
               variant="ghost" 
               size="icon" 
               className="w-20 h-20 rounded-full bg-brand-highlight text-brand-primary border border-brand-border shadow-sm hover:scale-110 transition-transform active:scale-95"
             >
               <Volume2 className="w-10 h-10" />
             </Button>
           )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="wait">
            {currentQuestion.options.map((option, idx) => {
              const isCorrect = idx === currentQuestion.correct;
              const isSelected = idx === selectedOption;
              
              let variantClasses = "border border-brand-border hover:border-brand-primary bg-white hover:bg-brand-highlight transition-all duration-300 shadow-sm group";
              if (isAnswered) {
                if (isCorrect) variantClasses = "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-md shadow-emerald-500/10 scale-[1.02]";
                else if (isSelected) variantClasses = "border-rose-500 bg-rose-50 text-rose-900 opacity-80";
                else variantClasses = "opacity-40 border-brand-border translate-y-1";
              } else if (isSelected) {
                variantClasses = "border-brand-primary bg-brand-surface text-brand-ink ring-4 ring-brand-primary/10 shadow-md scale-[1.02]";
              }

              return (
                <motion.div
                  key={idx}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(idx)}
                >
                  <Card className={cn("p-8 cursor-pointer flex items-center justify-between rounded-3xl", variantClasses)}>
                    <span className="text-2xl font-bold flex items-center gap-6">
                      <span className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black transition-colors",
                        isSelected ? "bg-brand-primary text-white" : "bg-brand-highlight text-brand-secondary group-hover:bg-brand-primary/10"
                      )}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {option}
                    </span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-7 h-7 text-emerald-500" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-7 h-7 text-rose-500" />}
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <footer className="pt-12 flex justify-center">
        {!isAnswered ? (
          <Button
            size="lg"
            className="w-full sm:w-80 h-16 rounded-2xl bg-brand-ink hover:bg-black text-white font-black text-xl shadow-xl shadow-brand-ink/10 transition-all uppercase tracking-widest"
            disabled={selectedOption === null}
            onClick={handleCheck}
          >
            KIỂM TRA
          </Button>
        ) : (
          <Button
            size="lg"
            className={cn(
              "w-full sm:w-80 h-16 rounded-2xl font-black text-xl shadow-xl animate-in fade-in slide-in-from-bottom-4 transition-all uppercase tracking-widest",
              selectedOption === currentQuestion.correct 
                ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20" 
                : "bg-brand-primary hover:bg-brand-secondary text-white shadow-brand-primary/20"
            )}
            onClick={handleNext}
          >
            TIẾP TỤC <ArrowRight className="ml-3 w-7 h-7" />
          </Button>
        )}
      </footer>
    </div>
  );
}
