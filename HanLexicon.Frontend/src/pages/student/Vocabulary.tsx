import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Search, BookOpen, Volume2, Filter, RefreshCw, 
  LayoutGrid, BookMarked, Layers, ChevronLeft, ChevronRight, X, ArrowRight
} from 'lucide-react';
import { dictionaryService, learningService, Vocabulary } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function VocabularyPage() {
  const [words, setWords] = useState<Vocabulary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [selectedWord, setSelectedWord] = useState<Vocabulary | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
    } catch (e) { console.error(e); }
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

  const getMediaUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const backendUrl = (import.meta as any).env?.VITE_API_BASE_URL?.replace('/api/v1', '') || 'https://localhost:7285';
    return `${backendUrl}/${url.startsWith('/') ? url.substring(1) : url}`;
  };

  const handleOpenDetail = (word: Vocabulary) => {
    setSelectedWord(word);
    setIsModalOpen(true);
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
                           <CardContent className="p-8 flex-1 flex flex-col items-center text-center justify-center space-y-4">
                              <div className="space-y-1">
                                 <p className="text-lg font-black text-brand-primary uppercase italic tracking-wider leading-none">{w.pinyin}</p>
                                 <h2 className="text-5xl font-black text-brand-ink tracking-tighter py-2">{w.word}</h2>
                                 <p className="text-xl font-bold text-slate-500 italic">"{w.meaning}"</p>
                              </div>

                              <div className="w-full pt-4">
                                 <Button 
                                    onClick={() => handleOpenDetail(w)}
                                    className="w-full h-12 rounded-2xl bg-brand-ink text-white font-black uppercase text-[11px] tracking-widest hover:bg-brand-primary transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2 group"
                                 >
                                    Xem chi tiết
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                 </Button>
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

      {/* Vocabulary Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedWord && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-brand-ink/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border-4 border-brand-border"
            >
              <div className="relative h-64 bg-brand-highlight/30">
                {selectedWord.imageUrl ? (
                  <img src={getMediaUrl(selectedWord.imageUrl)} alt={selectedWord.word} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-10">
                    <BookOpen className="w-32 h-32" />
                  </div>
                )}
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all text-brand-ink"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-10 space-y-8">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-xl font-black text-brand-primary uppercase italic tracking-widest">{selectedWord.pinyin}</p>
                    <h2 className="text-7xl font-black text-brand-ink tracking-tighter leading-none">{selectedWord.word}</h2>
                  </div>
                  <Button 
                    onClick={() => playAudio(selectedWord.audioUrl)}
                    className="h-16 w-16 rounded-2xl bg-brand-highlight text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-md flex items-center justify-center border-2 border-brand-primary/20"
                  >
                    <Volume2 className="w-8 h-8" />
                  </Button>
                </div>

                <div className="p-8 bg-brand-highlight/20 rounded-[2rem] border-2 border-brand-border/50">
                  <p className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em] mb-2 opacity-60">Ý nghĩa tiếng Việt</p>
                  <p className="text-3xl font-black text-brand-ink italic">"{selectedWord.meaning}"</p>
                </div>

                {selectedWord.exampleCn && (
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] opacity-60">Ví dụ bối cảnh</p>
                    <div className="space-y-2">
                       <p className="text-2xl font-bold text-brand-ink leading-tight">{selectedWord.exampleCn}</p>
                       <p className="text-sm font-medium text-slate-400 italic">{selectedWord.examplePy}</p>
                       <p className="text-lg font-bold text-brand-secondary">{selectedWord.exampleVn}</p>
                    </div>
                  </div>
                )}

                <div className="pt-6 border-t border-brand-border flex items-center justify-between">
                  <Button 
                    variant="ghost" 
                    onClick={() => setIsModalOpen(false)}
                    className="h-12 px-8 rounded-xl font-black text-brand-secondary hover:bg-brand-highlight"
                  >
                    Đã hiểu
                  </Button>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">HanLexicon Data Engine</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
