import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, BookOpen, Star, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { learningService, Category } from '@/src/services/api';

export default function StudentLessons() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    learningService.getLessons()
      .then(data => {
        setCategories(data);
      })
      .catch(err => {
        console.error("Failed to fetch lessons", err);
        // We could set some fallback data here if needed
      });
  }, []);

  // Compute total list of items across all categories
  const allItems = categories.flatMap(cat => cat.items.map(item => ({ ...item, categoryName: cat.categoryName })));

  // Filter based on selected category and search query
  const filteredItems = allItems.filter(item => {
    const matchCat = selectedCategory === 'Tất cả' || item.categoryName === selectedCategory;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       item.translation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const categoryNames = ['Tất cả', ...categories.map(c => c.categoryName)];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-brand-ink tracking-tight flex items-center gap-3">
              Danh Sách Bài Học
              <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 hover:bg-brand-primary/20">HSK</Badge>
            </h1>
            <p className="text-brand-secondary font-medium">Khám phá lộ trình học tập bài bản từ sơ cấp đến trung cấp.</p>
          </div>
          <Button variant="outline" className="h-12 px-8 gap-2 border-brand-border font-bold rounded-xl text-brand-secondary hover:bg-brand-highlight transition-all">
            <Filter className="w-5 h-5" /> Lọc kết quả
          </Button>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-secondary group-focus-within:text-brand-primary transition-colors" />
          <Input 
            className="pl-12 h-14 bg-white border-brand-border rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all shadow-sm text-lg" 
            placeholder="Tìm bài học, từ vựng hoặc chủ đề..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 -mx-1 px-1 no-scrollbar">
        {categoryNames.map((cat) => (
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
        {filteredItems.map((item, idx) => (
          <Link key={idx} to={`/student/lessons/${item.id || item.link.split('/').pop()}`}>
            <Card className="group overflow-hidden border border-brand-border bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col rounded-3xl relative">
              {item.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-brand-accent text-white shadow-lg border-0">{item.badge}</Badge>
                </div>
              )}
              <div className="relative h-56 overflow-hidden bg-brand-surface flex items-center justify-center p-6">
                <img
                  src={item.icon || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=400'}
                  alt={item.title}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 mix-blend-multiply"
                  referrerPolicy="no-referrer"
                />
              </div>
              <CardContent className="p-8 flex-1 flex flex-col">
                <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-2">{item.categoryName}</p>
                <h3 className="text-2xl font-bold text-brand-ink group-hover:text-brand-primary transition-colors mb-2 tracking-tight leading-tight">{item.title}</h3>
                <p className="text-sm font-medium text-slate-500 line-clamp-2">{item.translation} - {item.desc}</p>
                
                <div className="flex items-center gap-5 text-xs text-brand-secondary mt-auto pt-6 font-medium">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 15 phút</span>
                  <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> Từ vựng</span>
                </div>
                
                <div className="mt-6 pt-6 border-t border-brand-border/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-amber-600 font-bold">
                    <Star className="w-4 h-4 fill-amber-600" /> 4.9
                  </div>
                  <span className="font-bold text-brand-primary group-hover:translate-x-1 transition-transform">Bắt đầu học →</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        {filteredItems.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-400 font-medium">
            Không tìm thấy bài học nào phù hợp.
          </div>
        )}
      </div>
    </div>
  );
}
