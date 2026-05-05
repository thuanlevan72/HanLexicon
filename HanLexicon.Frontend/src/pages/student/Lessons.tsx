import React, { useState, useEffect } from 'react';
import { learningService, Category } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { logger } from '@/src/utils/logger';
import { FormSelect } from '@/src/components/ui/FormSelect';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, Filter, Play } from 'lucide-react';

export default function LessonsPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Tất cả');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await learningService.getLessons();
        const data = res.data || res;
        setCategories(Array.isArray(data) ? data : []);
      } catch (e) { logger.error("Lỗi tải danh mục bài học", e); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const allItems = categories.flatMap(cat => cat.items.map((item: any) => ({ ...item, categoryName: cat.name })));

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (item.translation && item.translation.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = selectedFilter === 'Tất cả' || item.categoryName === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const categoryNames = ['Tất cả', ...categories.map(c => c.name)];

  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-brand-ink uppercase italic flex items-center gap-3 font-heading">
             <BookOpen className="w-8 h-8 text-brand-primary" /> Thư viện bài học
          </h1>
          <p className="text-brand-secondary font-medium">Hệ thống bài học Hán ngữ chuẩn quốc tế</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <Card className="lg:col-span-3 p-4 bg-white rounded-[2rem] shadow-sm border-brand-border flex items-center gap-4">
            <Search className="w-6 h-6 text-slate-400 ml-2" />
            <Input 
               placeholder="Tìm kiếm tên bài học..." 
               className="border-none bg-transparent h-12 text-lg font-bold focus-visible:ring-0" 
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
            />
         </Card>
         <Card className="lg:col-span-1 p-4 bg-white rounded-[2rem] shadow-sm border-brand-border flex items-center gap-3">
            <Filter className="w-5 h-5 text-brand-primary shrink-0" />
            <FormSelect 
               className="h-12 border-none bg-transparent"
               value={selectedFilter}
               onChange={e => setSelectedFilter(e.target.value)}
            >
               {categoryNames.map(name => <option key={name} value={name}>{name}</option>)}
            </FormSelect>
         </Card>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {[1,2,3,4].map(i => <div key={i} className="h-64 bg-brand-highlight/20 animate-pulse rounded-[2.5rem]"></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {filteredItems.map((item, idx) => (
              <Card key={item.id} className="border-2 border-brand-border bg-white rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-brand-primary transition-all group cursor-pointer flex flex-col overflow-hidden" onClick={() => navigate(`/student/lessons/${item.id}`)}>
                 <div className="p-8 flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                       <Badge className="bg-brand-highlight text-brand-primary border-brand-primary/20">{item.categoryName}</Badge>
                       <div className="w-10 h-10 rounded-xl bg-brand-highlight flex items-center justify-center font-black text-brand-primary italic">#{idx+1}</div>
                    </div>
                    <div>
                       <h3 className="text-2xl font-black text-brand-ink leading-tight">{item.title}</h3>
                       <p className="text-brand-secondary font-bold italic">{item.translation}</p>
                    </div>
                    <p className="text-xs text-slate-400 font-medium line-clamp-2 leading-relaxed">{item.desc}</p>
                 </div>
                 <div className="px-8 py-5 bg-brand-highlight/30 border-t border-brand-border flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-secondary">Ready to learn</span>
                    <Play className="w-4 h-4 text-brand-primary fill-current group-hover:translate-x-1 transition-transform" />
                 </div>
              </Card>
           ))}
        </div>
      )}
    </div>
  );
}
