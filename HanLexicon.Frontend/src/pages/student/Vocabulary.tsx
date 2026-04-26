import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, BookOpen, Volume2, Bookmark, 
  ChevronRight, Filter, LayoutGrid, List,
  RefreshCw, Play, ImageIcon, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Vocabulary, dictionaryService } from '@/src/services/api';
import { Badge } from '@/components/ui/badge';

const HSK_LEVELS = ['Tất cả', 'HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6'];

export default function StudentVocabulary() {
  const [words, setWords] = useState<Vocabulary[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('Tất cả');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fetchWords = async (isNewSearch = false) => {
    if (loading) return;
    setLoading(true);
    const targetPage = isNewSearch ? 1 : page;
    
    try {
      const res = await dictionaryService.getVocabularies({
        search,
        level,
        page: targetPage,
        pageSize: 12
      });

      if (res.isSuccess) {
        const newItems = res.data.items;
        if (isNewSearch) {
          setWords(newItems);
        } else {
          setWords(prev => [...prev, ...newItems]);
        }
        setHasMore(targetPage < res.data.totalPages);
        setPage(targetPage + 1);
      }
    } catch (error) {
      console.error("Lỗi tải từ điển", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset và gọi lại khi Search hoặc Level thay đổi
  useEffect(() => {
    setPage(1);
    fetchWords(true);
  }, [level]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWords(true);
  };

  const handlePlayAudio = (url?: string) => {
    if (!url) return;
    new Audio(url).play().catch(console.error);
  };

  return (
    <div className="min-h-screen bg-brand-surface pb-20">
      {/* Hero Header */}
      <div className="bg-brand-ink text-white pt-32 pb-20 px-6 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute top-10 left-10 w-64 h-64 bg-brand-primary rounded-full blur-3xl"></div>
           <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <Badge className="bg-brand-primary/20 text-brand-primary border-brand-primary/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
            Hán Ngữ Lexicon
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter font-heading">
            Từ điển <span className="text-brand-primary">Thông minh</span>
          </h1>
          <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            Tra cứu hơn 5000+ từ vựng chuẩn HSK với đầy đủ âm thanh, hình ảnh minh họa và ví dụ thực tế.
          </p>

          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-indigo-500 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-6 w-6 h-6 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm kiếm bằng Hán tự, Pinyin hoặc Nghĩa..."
                className="w-full h-20 pl-16 pr-40 bg-white border-none rounded-[2rem] text-brand-ink font-bold shadow-2xl focus:ring-4 focus:ring-brand-primary/20 transition-all text-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button type="submit" className="absolute right-3 h-14 px-8 rounded-2xl bg-brand-ink text-white font-black hover:bg-black transition-all">
                TRA CỨU
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20 space-y-12">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {HSK_LEVELS.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevel(lvl)}
              className={cn(
                "h-12 px-8 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-sm border-2",
                level === lvl 
                  ? "bg-brand-primary border-brand-primary text-white scale-110 shadow-lg shadow-brand-primary/30" 
                  : "bg-white border-brand-border text-brand-secondary hover:border-brand-primary/50"
              )}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Word Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {words.map((word, idx) => (
            <Card key={word.id + idx} className="group relative bg-white border-brand-border rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
               {/* Word Header */}
               <div className="p-8 pb-4 space-y-4">
                  <div className="flex justify-between items-start">
                     <Badge className="bg-brand-highlight text-brand-primary border-none font-black px-3 py-1 rounded-lg text-[10px] uppercase">
                        {word.level}
                     </Badge>
                     <Button variant="ghost" size="icon" className="rounded-full hover:bg-rose-50 hover:text-rose-500 text-slate-300">
                        <Bookmark className="w-5 h-5" />
                     </Button>
                  </div>
                  
                  <div className="text-center space-y-2">
                     <h3 className="text-5xl font-black text-brand-ink tracking-tighter group-hover:scale-110 transition-transform duration-500">{word.word}</h3>
                     <p className="text-brand-primary font-black italic text-lg uppercase tracking-tight">{word.pinyin}</p>
                  </div>
               </div>

               {/* Media & Meaning */}
               <div className="px-8 pb-8 space-y-6">
                  <div className="h-px bg-brand-highlight w-full"></div>
                  
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ý nghĩa</p>
                     <p className="font-bold text-brand-ink text-xl leading-tight">{word.meaning_vn}</p>
                     {word.meaning_en && <p className="text-sm text-slate-400 font-medium italic">{word.meaning_en}</p>}
                  </div>

                  <div className="flex items-center gap-3">
                     {word.audio && (
                       <Button 
                         onClick={() => handlePlayAudio(word.audio)}
                         className="flex-1 h-14 rounded-2xl bg-brand-highlight text-brand-primary font-black hover:bg-brand-primary hover:text-white border-none gap-2 transition-all"
                       >
                          <Volume2 className="w-5 h-5" /> PHÁT ÂM
                       </Button>
                     )}
                     {word.image && (
                       <Button 
                         onClick={() => setPreviewImage(word.image || null)}
                         variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-brand-border hover:bg-brand-highlight"
                       >
                          <ImageIcon className="w-6 h-6 text-brand-secondary" />
                       </Button>
                     )}
                  </div>
               </div>

               {/* Example Peek (Hover only) */}
               <div className="absolute inset-0 bg-brand-ink/95 flex flex-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                  <div className="w-full space-y-6 self-center">
                     <div className="space-y-2">
                        <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Ví dụ thực tế</p>
                        <p className="text-2xl font-bold text-white leading-tight">{word.example_cn || "Chưa có ví dụ."}</p>
                        <p className="text-slate-400 text-sm italic">{word.example_vn}</p>
                     </div>
                     <Button className="w-full h-12 rounded-xl bg-white/10 text-white border border-white/20 font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-brand-ink transition-all">
                        Xem chi tiết <ChevronRight className="ml-2 w-4 h-4" />
                     </Button>
                  </div>
               </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center pt-10">
            <Button 
              onClick={() => fetchWords()} 
              disabled={loading}
              className="h-16 px-12 rounded-[2rem] bg-white border-2 border-brand-border text-brand-ink font-black hover:border-brand-primary transition-all shadow-xl gap-3"
            >
              {loading ? <RefreshCw className="w-6 h-6 animate-spin text-brand-primary" /> : <LayoutGrid className="w-6 h-6 text-brand-primary" />}
              {loading ? "ĐANG TẢI..." : "XEM THÊM TỪ VỰNG"}
            </Button>
          </div>
        )}

        {!loading && words.length === 0 && (
          <div className="text-center py-40 space-y-6">
             <div className="w-24 h-24 bg-brand-highlight rounded-full flex items-center justify-center mx-auto">
                <Search className="w-10 h-10 text-brand-secondary opacity-20" />
             </div>
             <p className="text-brand-secondary font-bold text-lg uppercase tracking-widest italic">Không tìm thấy từ vựng phù hợp</p>
          </div>
        )}
      </div>

      {/* Lightbox Preview */}
      {previewImage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-8 animate-in fade-in zoom-in-95 duration-200">
           <Button onClick={() => setPreviewImage(null)} variant="ghost" size="icon" className="absolute top-8 right-8 h-12 w-12 rounded-full text-white hover:bg-white/10">
              <X className="w-8 h-8" />
           </Button>
           <img src={previewImage} className="max-w-full max-h-full rounded-2xl shadow-2xl" alt="Preview" />
        </div>
      )}
    </div>
  );
}
