import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChevronLeft,
  Volume2,
  Play,
  CheckCircle2,
  BookOpen,
  MessageCircle,
  FileText,
  Star,
  Brain
} from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { learningService, LessonDetail } from '@/src/services/api';
import { playAudio } from '@/src/lib/audio';

export default function StudentLessonDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('vocab');
  const [lesson, setLesson] = useState<LessonDetail | null>(null);

  useEffect(() => {
    if (id) {
      learningService.getLessonDetail(id).then(data => {
        setLesson(data);
      }).catch(err => {
        console.error("Failed to fetch lesson detail", err);
      });
    }
  }, [id]);

  if (!lesson) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink 
                render={<Link to="/student/lessons">Bài học</Link>}
              />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{lesson.titleCn || 'Đang tải...'}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-brand-highlight text-brand-primary hover:bg-brand-highlight">Từ vựng</Badge>
              <Badge variant="outline">HSK</Badge>
            </div>
            <h1 className="text-4xl font-black text-brand-ink tracking-tight">{lesson.titleCn}</h1>
            <p className="text-slate-500">Học từ mới và nét chữ.</p>
          </div>
          <Link to={`/student/quiz/${id}`}>
            <Button className="bg-brand-primary hover:bg-brand-secondary h-12 px-8 rounded-xl font-bold shadow-lg shadow-brand-primary/20 gap-2 text-white">
              <Brain className="w-5 h-5" /> Làm Quiz ngay
            </Button>
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Video/Content Player Mockup */}
          <div className="aspect-video bg-brand-ink rounded-3xl overflow-hidden relative shadow-2xl flex items-center justify-center group cursor-pointer group hover:bg-black transition-colors">
            <img
              src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1200"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
          </div>

          <Tabs defaultValue="vocab" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-brand-highlight p-1 rounded-2xl w-full max-w-md">
              <TabsTrigger value="vocab" className="flex-1 rounded-xl font-bold py-3 text-brand-secondary data-[state=active]:bg-white data-[state=active]:text-brand-primary"><BookOpen className="w-4 h-4 mr-2" /> Từ vựng</TabsTrigger>
              <TabsTrigger value="grammar" className="flex-1 rounded-xl font-bold py-3 text-brand-secondary data-[state=active]:bg-white data-[state=active]:text-brand-primary"><FileText className="w-4 h-4 mr-2" /> Ngữ pháp</TabsTrigger>
              <TabsTrigger value="practice" className="flex-1 rounded-xl font-bold py-3 text-brand-secondary data-[state=active]:bg-white data-[state=active]:text-brand-primary"><MessageCircle className="w-4 h-4 mr-2" /> Hội thoại</TabsTrigger>
            </TabsList>

            <TabsContent value="vocab" className="pt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {lesson.hanziCards?.map((item, idx) => (
                  <Card key={idx} className="border-brand-border hover:border-brand-primary/30 hover:bg-brand-highlight/30 transition-all cursor-default group">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl font-bold border border-brand-border shadow-sm group-hover:scale-110 transition-transform font-serif text-brand-ink">
                          {item.character}
                        </div>
                        <div>
                          <p className="text-xl font-bold text-brand-primary font-mono tracking-tight">{item.pinyin}</p>
                          <p className="text-slate-600 font-medium">{item.meaning}</p>
                          {item.radical && (
                            <p className="text-xs text-brand-secondary mt-1 tracking-widest uppercase">Bộ thủ: {item.radical}</p>
                          )}
                        </div>
                      </div>
                      <Button onClick={() => playAudio(item.character)} variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-white shadow-sm hover:bg-brand-primary hover:text-white transition-all text-brand-primary">
                        <Volume2 className="w-6 h-6" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="grammar" className="pt-6">
              <Card className="border-0 shadow-sm p-8 space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-purple-600" />
                  </div>
                  Chưa có dữ liệu ngữ pháp
                </h3>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-8">
          <Card className="border-0 shadow-sm p-6 space-y-6 bg-white border border-brand-border rounded-3xl">
            <h3 className="font-bold text-lg text-brand-ink">Bài học bao gồm</h3>
            <div className="space-y-4">
              {[
                { label: `${lesson.hanziCards?.length || 0} từ vựng mới`, done: true },
                { label: 'Cách viết nét cơ bản', done: true },
                { label: 'Câu hỏi trắc nghiệm', done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  {item.done ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-slate-200 rounded-full" />
                  )}
                  <span className={item.done ? "text-slate-400 line-through" : "text-brand-secondary font-medium"}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-brand-border/40">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                <span>Tiến trình bài học</span>
                <span className="text-brand-primary">0%</span>
              </div>
              <div className="h-2 bg-brand-highlight rounded-full overflow-hidden">
                <div className="h-full bg-brand-primary w-0 rounded-full transition-all duration-500"></div>
              </div>
            </div>
          </Card>

          <Card className="border-0 bg-brand-highlight p-6 space-y-4 relative overflow-hidden group rounded-3xl">
            <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-white/40 rounded-full group-hover:scale-125 transition-transform"></div>
            <div className="relative z-10 space-y-3">
              <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              </div>
              <h4 className="font-bold text-brand-ink">Mẹo ghi nhớ</h4>
              <p className="text-sm text-brand-secondary leading-relaxed">
                Đừng quên luyện viết từng nét cho mỗi chữ Hán với công cụ luyện chữ trong hệ thống! Nhấn nút Quiz để tham gia nhé.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
