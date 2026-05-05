import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Search, BookOpen, Volume2, Filter, RefreshCw, 
  LayoutGrid, BookMarked, Layers, ChevronLeft, ChevronRight
} from 'lucide-react';
import { dictionaryService, learningService, Vocabulary } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { logger } from '@/src/utils/logger';

export default function VocabularyPage() {
  const [words, setWords] = useState<Vocabulary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination & Filter state
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedLevel, setSelectedLevel] = useState('Tất cả');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fetchFilters = async () => {
    try {
      const res = await learningService.getCategories();
      const data = res.data || res || [];
      if (Array.isArray(data)) setCategories(data);
    } catch (e) { logger.error("Lỗi tải bộ lọc từ điển", e); }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        pageSize: 12,
        search: searchTerm || undefined,
        level: selectedLevel !== 'Tất cả' ? selectedLevel : undefined
      };
      const res = await dictionaryService.getVocabularies(params);
      if (res.isSuccess) {
        setWords(res.data.items);
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalItems);
      }
    } catch (e) { 
       console.error("Lỗi tải từ điển:", e);
       setWords([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchFilters(); }, []);
  useEffect(() => { fetchData(); }, [currentPage, selectedLevel]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchData();
  };

  const playAudio = (url?: string) => {
    if (!url || !audioRef.current) return;
    const backendUrl = (import.meta as any).env?.VITE_API_BASE_URL?.replace('/api/v1', '') || 'https://localhost:7285';
    const fullUrl = url.startsWith('http') ? url : `${backendUrl}/${url.startsWith('/') ? url.substring(1) : url}`;
    audioRef.current.src = fullUrl;
    audioRef.current.play().catch(err => console.error("Lỗi âm thanh:", err));
  };

  return (
    <div className="space-y-10 pb-20 max-w-6xl mx-auto animate-in fade-in duration-700">
      <audio ref={audioRef} className="hidden" />
      
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-brand-ink tracking-tight uppercase italic flex items-center gap-3 font-heading">
             <BookOpen className="w-8 h-8 text-brand-primary" />
             Kho Từ vựng HSK
          </h1>
          <p className="text-brand-secondary font-medium">Khám phá và tra cứu toàn bộ từ vựng trong hệ thống</p>
        </div>
        <div className="flex items-center gap-3">
           <Button onClick={fetchData} variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-brand-highlight">
              <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
           </Button>
           <div className="bg-white p-1 rounded-2xl border border-brand-border flex gap-1 overflow-x-auto max-w-md no-scrollbar">
              <button
                onClick={() => { setSelectedLevel('Tất cả'); setCurrentPage(1); }}
                className={cn(
                  "px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                  selectedLevel === 'Tất cả' ? "bg-brand-ink text-white shadow-lg" : "text-slate-400 hover:bg-brand-highlight"
                )}
              >
                Tất cả
              </button>
              {categories.map((cat) => (
                 <button
                   key={cat.id}
                   onClick={() => { setSelectedLevel(cat.name); setCurrentPage(1); }}
                   className={cn(
                     "px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                     selectedLevel === cat.name ? "bg-brand-primary text-white shadow-lg" : "text-slate-400 hover:bg-brand-highlight"
                   )}
                 >
                   {cat.name}
                 </button>
              ))}
           </div>
        </div>
      </header>

      {/* Search & Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <Card className="lg:col-span-3 p-4 border-brand-border bg-white rounded-[2rem] shadow-sm">
            <form onSubmit={handleSearch} className="relative group">
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
               <input
                  type="text" 
                  placeholder="Tìm kiếm Hán tự, Pinyin hoặc ý nghĩa..."
                  className="w-full h-14 pl-14 pr-4 bg-brand-highlight/20 border-2 border-transparent rounded-2xl font-bold text-base focus:border-brand-primary focus:bg-white transition-all outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </form>
         </Card>
         <Card className="p-4 border-brand-border bg-brand-ink text-white rounded-[2rem] shadow-sm flex flex-col justify-center items-center text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary/60 mb-1">Tổng số từ vựng</p>
            <p className="text-3xl font-black italic">{totalItems}</p>
         </Card>
      </div>

      {/* Grid Danh sách từ vựng */}
      {loading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="h-64 w-full bg-brand-highlight/10 animate-pulse rounded-[2.5rem]"></div>)}
         </div>
      ) : words.length === 0 ? (
         <div className="p-20 text-center bg-white border-brand-border rounded-[2.5rem] border-dashed border-4">
            <LayoutGrid className="w-12 h-12 text-brand-border mx-auto mb-4 opacity-30" />
            <h3 className="text-xl font-bold text-brand-ink mb-1 italic">Không tìm thấy kết quả</h3>
            <p className="text-brand-secondary">Hãy thử từ khóa khác hoặc thay đổi cấp độ nhé!</p>
         </div>
      ) : (
         <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <AnimatePresence mode="popLayout">
                  {words.map((w, idx) => (
                     <motion.div 
                        key={w.id} 
                        layout
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                     >
                        <Card className="border border-brand-border bg-white rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group overflow-hidden flex flex-col h-full border-b-8 border-b-brand-highlight">
                           <CardContent className="p-8 flex-1 flex flex-col gap-6">
                              <div className="flex justify-between items-start">
                                 <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-brand-highlight/50 text-brand-secondary border border-brand-border">
                                    <BookMarked className="w-3 h-3" /> {w.lessonTitle || 'Từ vựng'}
                                 </div>
                                 <Button 
                                    onClick={() => playAudio(w.audioUrl)} 
                                    variant="ghost" 
                                    size="icon" 
                                    className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 border border-sky-100 hover:bg-sky-500 hover:text-white transition-all"
                                 >
                                    <Volume2 className="w-5 h-5" />
                                 </Button>
                              </div>

                              <div className="text-center space-y-2">
                                 <h2 className="text-5xl font-black text-brand-ink tracking-tighter">{w.word}</h2>
                                 <p className="text-lg font-black text-brand-primary uppercase italic tracking-wider">{w.pinyin}</p>
                                 <p className="font-bold text-slate-500 leading-tight">"{w.meaning}"</p>
                              </div>

                              <div className="mt-auto pt-6 border-t border-brand-border/50">
                                 <div className="flex items-center justify-center gap-2">
                                    <Layers className="w-3 h-3 text-brand-secondary" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-secondary opacity-60">Thứ tự: {w.sortOrder}</span>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     </motion.div>
                  ))}
               </AnimatePresence>
            </div>

            {/* Pagination UI */}
            <div className="flex items-center justify-center gap-4 pt-10">
               <Button 
                  variant="outline" 
                  disabled={currentPage === 1} 
                  onClick={() => { setCurrentPage(v => v - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="h-14 w-14 rounded-2xl border-2 border-brand-border"
               >
                  <ChevronLeft className="w-6 h-6" />
               </Button>
               <div className="h-14 px-8 bg-white border-2 border-brand-border rounded-2xl flex items-center justify-center font-black italic">
                  TRANG {currentPage} / {totalPages}
               </div>
               <Button 
                  variant="outline" 
                  disabled={currentPage === totalPages} 
                  onClick={() => { setCurrentPage(v => v + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="h-14 w-14 rounded-2xl border-2 border-brand-border"
               >
                  <ChevronRight className="w-6 h-6" />
               </Button>
            </div>
         </>
      )}
    </div>
  );
}
