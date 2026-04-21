import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, BookOpen, Star, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const lessonCategories = ['Tất cả', 'Cơ bản', 'Giao tiếp', 'HSK 1', 'HSK 2', 'Từ vựng'];

const lessons = [
  {
    id: '1',
    title: 'Chào hỏi cơ bản',
    category: 'Cơ bản',
    level: 'HSK 1',
    duration: '15 phút',
    completed: true,
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '2',
    title: 'Giới thiệu bản thân',
    category: 'Giao tiếp',
    level: 'HSK 1',
    duration: '20 phút',
    completed: true,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '3',
    title: 'Số đếm từ 1-100',
    category: 'Cơ bản',
    level: 'HSK 1',
    duration: '10 phút',
    completed: false,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '4',
    title: 'Mua sắm tại chợ',
    category: 'Giao tiếp',
    level: 'HSK 2',
    duration: '25 phút',
    completed: false,
    image: 'https://images.unsplash.com/photo-1488459718432-0685980d248b?auto=format&fit=crop&q=80&w=400'
  }
];

export default function StudentLessons() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  return (
    <div className="space-y-8">
      <header className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-brand-ink tracking-tight flex items-center gap-3">
              Danh Sách Bài Học
              <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 hover:bg-brand-primary/20">HSK1-4</Badge>
            </h1>
            <p className="text-brand-secondary font-medium">Khám phá lộ trình học tập bài bản từ sơ cấp đến trung cấp.</p>
          </div>
          <Button variant="outline" className="h-12 px-8 gap-2 border-brand-border font-bold rounded-xl text-brand-secondary hover:bg-brand-highlight transition-all">
            <Filter className="w-5 h-5" /> Lọc kết quả
          </Button>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-secondary group-focus-within:text-brand-primary transition-colors" />
          <Input className="pl-12 h-14 bg-white border-brand-border rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all shadow-sm text-lg" placeholder="Tìm bài học, từ vựng hoặc chủ đề..." />
        </div>
      </header>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 -mx-1 px-1 no-scrollbar">
        {lessonCategories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "rounded-xl px-6 h-10 font-bold shrink-0 transition-all",
              selectedCategory === cat ? "bg-brand-primary text-white shadow-md shadow-brand-primary/10" : "bg-white border-brand-border text-brand-secondary hover:bg-brand-highlight"
            )}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lessons.map((lesson) => (
          <Link key={lesson.id} to={`/student/lessons/${lesson.id}`}>
            <Card className="group overflow-hidden border border-brand-border bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col rounded-3xl">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-white/95 text-brand-ink backdrop-blur-md border border-brand-border font-bold rounded-lg px-3 py-1 shadow-sm">{lesson.level}</Badge>
                </div>
                {lesson.completed && (
                  <div className="absolute top-4 right-4 text-emerald-500 bg-white rounded-full p-2 shadow-xl border border-emerald-50">
                    <CheckCircle2 className="w-6 h-6 fill-emerald-500 text-white" />
                  </div>
                )}
              </div>
              <CardContent className="p-8 flex-1 flex flex-col">
                <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-2">{lesson.category}</p>
                <h3 className="text-2xl font-bold text-brand-ink group-hover:text-brand-primary transition-colors mb-4 tracking-tight leading-tight">{lesson.title}</h3>
                
                <div className="flex items-center gap-5 text-xs text-brand-secondary mt-auto font-medium">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {lesson.duration}</span>
                  <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> 12 từ vựng</span>
                </div>
                
                <div className="mt-8 pt-6 border-t border-brand-border/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-amber-600 font-bold">
                    <Star className="w-4 h-4 fill-amber-600" /> 4.9
                  </div>
                  <span className="font-bold text-brand-ink group-hover:translate-x-1 transition-transform">Bắt đầu học →</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
