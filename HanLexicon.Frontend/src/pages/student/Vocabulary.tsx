
import React, { useState, useEffect } from 'react';
import { api, Vocabulary } from '@/src/services/api';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Filter, Volume2, Image as ImageIcon, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const HSK_LEVELS = ['Tất cả', 'HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6'];

export default function VocabularyPage() {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('Tất cả');
  const [words, setWords] = useState<Vocabulary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      setLoading(true);
      const data = await api.getVocabulary(search, level);
      setWords(data);
      setLoading(false);
    };
    const timer = setTimeout(fetchWords, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [search, level]);

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-3xl font-black text-brand-ink tracking-tight">Từ điển HSK</h1>
        <p className="text-brand-secondary font-medium">Tìm kiếm và học từ vựng theo từng cấp độ</p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-brand-secondary" />
            <Input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 bg-white border-brand-border rounded-xl focus:ring-brand-primary" 
              placeholder="Nhập từ Hán, Pinyin hoặc nghĩa..." 
            />
          </div>
        </div>
      </header>

      {/* Levels Filter */}
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
        {HSK_LEVELS.map((l) => (
          <Button
            key={l}
            variant={level === l ? 'default' : 'outline'}
            onClick={() => setLevel(l)}
            className={cn(
              "rounded-xl px-6 h-10 font-bold shrink-0 transition-all",
              level === l 
                ? "bg-brand-primary text-white shadow-md" 
                : "bg-white border-brand-border text-brand-secondary hover:bg-brand-highlight"
            )}
          >
            {l}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-brand-highlight/40 h-64 rounded-3xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {words.map((w) => (
              <motion.div
                key={w.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="group overflow-hidden border border-brand-border bg-white shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl h-full flex flex-col">
                  {/* Word Display */}
                  <div className="p-8 bg-brand-highlight/30 border-b border-brand-border text-center relative overflow-hidden group-hover:bg-brand-highlight/50 transition-colors">
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 font-black">{w.level}</Badge>
                    </div>
                    <h2 className="text-6xl font-black text-brand-ink mb-2 tracking-tight">{w.word}</h2>
                    <p className="text-xl font-bold text-brand-primary mb-4 italic">{w.pinyin}</p>
                    <div className="flex justify-center gap-3">
                      <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-white border border-brand-border text-brand-primary hover:bg-brand-primary hover:text-white transition-all">
                        <Volume2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-6 flex-1 flex flex-col space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-brand-secondary uppercase tracking-widest">Nghĩa tiếng Việt</p>
                      <p className="text-lg font-bold text-brand-ink">{w.meaning_vn}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-brand-secondary uppercase tracking-widest">English Meaning</p>
                      <p className="text-base font-medium text-brand-secondary italic">{w.meaning_en}</p>
                    </div>

                    {w.image && (
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-brand-border mt-4">
                        <img 
                          src={w.image} 
                          alt={w.word}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    )}

                    {w.example_cn && (
                      <div className="mt-4 p-4 bg-brand-highlight rounded-2xl border border-brand-border/40">
                         <p className="text-sm font-bold text-brand-ink mb-1">{w.example_cn}</p>
                         <p className="text-xs text-brand-secondary italic">{w.example_vn}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {words.length === 0 && (
            <div className="col-span-full py-20 text-center space-y-4">
              <div className="bg-brand-highlight w-20 h-20 rounded-full flex items-center justify-center mx-auto border border-brand-border">
                <Search className="w-10 h-10 text-brand-secondary" />
              </div>
              <p className="text-brand-secondary font-medium">Không tìm thấy từ vựng nào phù hợp.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
