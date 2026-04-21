import { useState } from 'react';
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

const vocab = [
  { hanzi: '我', pinyin: 'wǒ', meaning: 'Tôi, mình' },
  { hanzi: '你', pinyin: 'nǐ', meaning: 'Bạn, anh, chị' },
  { hanzi: '好', pinyin: 'hǎo', meaning: 'Tốt, khỏe, hay' },
  { hanzi: '叫', pinyin: 'jiào', meaning: 'Gọi, tên là' },
  { hanzi: '什么', pinyin: 'shénme', meaning: 'Cái gì' },
];

export default function StudentLessonDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('vocab');

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
              <BreadcrumbPage>Chào hỏi cơ bản</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Cơ bản</Badge>
              <Badge variant="outline">HSK 1</Badge>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Chào hỏi cơ bản</h1>
            <p className="text-slate-500">Học cách nói xin chào và giới thiệu tên cơ bản trong tiếng Trung.</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 h-12 px-8 rounded-xl font-bold shadow-lg shadow-blue-100 gap-2">
            <Brain className="w-5 h-5" /> Làm Quiz ngay
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Video/Content Player Mockup */}
          <div className="aspect-video bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl flex items-center justify-center group cursor-pointer">
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
            <TabsList className="bg-slate-100 p-1 rounded-2xl w-full max-w-md">
              <TabsTrigger value="vocab" className="flex-1 rounded-xl font-bold py-3"><BookOpen className="w-4 h-4 mr-2" /> Từ vựng</TabsTrigger>
              <TabsTrigger value="grammar" className="flex-1 rounded-xl font-bold py-3"><FileText className="w-4 h-4 mr-2" /> Ngữ pháp</TabsTrigger>
              <TabsTrigger value="practice" className="flex-1 rounded-xl font-bold py-3"><MessageCircle className="w-4 h-4 mr-2" /> Hội thoại</TabsTrigger>
            </TabsList>

            <TabsContent value="vocab" className="pt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {vocab.map((item, idx) => (
                  <Card key={idx} className="border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-default group">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl font-bold border border-slate-100 shadow-sm group-hover:scale-110 transition-transform">
                          {item.hanzi}
                        </div>
                        <div>
                          <p className="text-xl font-bold text-blue-600 font-mono tracking-tight">{item.pinyin}</p>
                          <p className="text-slate-600 font-medium">{item.meaning}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-white shadow-sm hover:bg-blue-600 hover:text-white transition-all">
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
                  Trình tự SVO trong tiếng Trung
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Cũng giống như tiếng Việt, trình tự cơ bản của câu tiếng Trung là <strong>Chủ ngữ + Động từ + Tân ngữ (SVO)</strong>.
                </p>
                <div className="bg-slate-50 p-6 rounded-2xl space-y-4 font-mono">
                  <div className="flex items-center gap-4">
                    <span className="text-blue-600 font-black">我</span> + <span className="text-emerald-600 font-black">爱</span> + <span className="text-amber-600 font-black">你</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>(Wǒ)</span> <span>(ài)</span> <span>(nǐ)</span>
                  </div>
                  <div className="text-sm text-slate-600 pt-2 border-t border-slate-200 italic">
                    Dịch: Tôi yêu bạn.
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-8">
          <Card className="border-0 shadow-sm p-6 space-y-6">
            <h3 className="font-bold text-lg">Bài học bao gồm</h3>
            <div className="space-y-4">
              {[
                { label: '5 từ vựng mới', done: true },
                { label: 'Cách chào hỏi cơ bản', done: true },
                { label: 'Cấu trúc câu SVO', done: false },
                { label: '3 mẫu hội thoại', done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  {item.done ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-slate-200 rounded-full" />
                  )}
                  <span className={item.done ? "text-slate-400 line-through" : "text-slate-700 font-medium"}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-50">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                <span>Tiến trình bài học</span>
                <span>50%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-1/2 rounded-full transition-all duration-500"></div>
              </div>
            </div>
          </Card>

          <Card className="border-0 bg-blue-50 p-6 space-y-4 relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-blue-100 rounded-full group-hover:scale-125 transition-transform"></div>
            <div className="relative z-10 space-y-3">
              <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">
                <Star className="w-5 h-5 text-blue-600 fill-blue-600" />
              </div>
              <h4 className="font-bold text-blue-900">Mẹo ghi nhớ</h4>
              <p className="text-sm text-blue-700/80 leading-relaxed">
                Khi học chữ Hán "你好", hãy nhớ chữ "你" đại diện cho đối phương, còn "好" là sự tốt đẹp. Một lời chào là mong mọi điều tốt đẹp cho nhau.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
