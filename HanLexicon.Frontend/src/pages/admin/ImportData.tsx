import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, FileSpreadsheet, Brain, Layers, Settings2, Clock, ArrowRight, Activity, Zap, CheckCircle2 } from 'lucide-react';
import ImportVocabulary from './import/ImportVocabulary';
import ImportQuiz from './import/ImportQuiz';
import ImportJobTracker from './import/ImportJobTracker';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AdminImportPage() {
  // Danh sách các Job ID đang hoạt động để Tracker theo dõi
  const [activeJobIds, setActiveJobIds] = useState<string[]>([]);

  const handleNewJob = (jobId: string) => {
    setActiveJobIds(prev => [jobId, ...prev]);
  };

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-20 max-w-6xl mx-auto">
      {/* Header Section */}
      <header className="relative p-10 md:p-14 bg-brand-ink rounded-[3.5rem] overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
               <Zap className="w-3.5 h-3.5 text-brand-primary fill-current" />
               <span className="text-[10px] font-black text-white uppercase tracking-widest">Đường truyền dữ liệu toàn cầu</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase leading-none">
               Cổng Nhập <span className="text-brand-primary">Dữ Liệu</span>
            </h1>
            <p className="text-slate-400 font-bold text-lg max-w-lg">
               Tải lên học liệu hàng loạt qua Excel và theo dõi tiến độ xử lý tự động bởi HanLexicon Engine.
            </p>
          </div>
          <div className="hidden lg:flex w-32 h-32 rounded-[2.5rem] bg-brand-primary/20 border-4 border-brand-primary/30 items-center justify-center rotate-6 hover:rotate-0 transition-transform duration-500 shadow-2xl">
             <Database className="w-16 h-16 text-brand-primary" />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Import Tabs */}
        <div className="lg:col-span-8 space-y-10">
          <Tabs defaultValue="vocabulary" className="w-full flex flex-col h-full">
            <TabsList className="bg-brand-highlight/40 p-1.5 rounded-[2rem] border-4 border-brand-border h-auto self-start mb-4">
              <TabsTrigger 
                value="vocabulary" 
                className="rounded-[1.5rem] px-8 py-3.5 font-black uppercase text-[11px] tracking-widest data-[state=active]:bg-brand-ink data-[state=active]:text-brand-primary data-[state=active]:shadow-2xl transition-all gap-3"
              >
                <FileSpreadsheet className="w-4 h-4" /> Từ vựng
              </TabsTrigger>
              <TabsTrigger 
                value="quizzes" 
                className="rounded-[1.5rem] px-8 py-3.5 font-black uppercase text-[11px] tracking-widest data-[state=active]:bg-brand-ink data-[state=active]:text-brand-primary data-[state=active]:shadow-2xl transition-all gap-3"
              >
                <Brain className="w-4 h-4" /> Câu hỏi
              </TabsTrigger>
              <TabsTrigger 
                value="lessons" 
                className="rounded-[1.5rem] px-8 py-3.5 font-black uppercase text-[11px] tracking-widest data-[state=active]:bg-brand-ink data-[state=active]:text-brand-primary data-[state=active]:shadow-2xl transition-all gap-3"
              >
                <Layers className="w-4 h-4" /> Khác
              </TabsTrigger>
            </TabsList>

            <div className="mt-4">
               <TabsContent value="vocabulary" className="focus-visible:ring-0 outline-none animate-in fade-in duration-300">
                 <ImportVocabulary onImportStarted={handleNewJob} />
               </TabsContent>

               <TabsContent value="quizzes" className="focus-visible:ring-0 outline-none animate-in fade-in duration-300">
                 <ImportQuiz />
               </TabsContent>

               <TabsContent value="lessons" className="focus-visible:ring-0 outline-none animate-in fade-in duration-300">
                 <Card className="p-24 border-4 border-brand-border border-dashed rounded-[3rem] text-center bg-white shadow-inner opacity-60">
                    <div className="w-20 h-20 bg-brand-highlight rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-brand-border shadow-lg">
                       <Zap className="w-10 h-10 text-slate-300" />
                    </div>
                    <p className="text-xl font-black text-brand-ink uppercase tracking-[0.2em] italic">Tính năng sắp ra mắt</p>
                    <p className="text-xs font-bold text-slate-400 mt-2">Hỗ trợ nhập liệu Bài học, Thử thách và Hán tự từ file Excel.</p>
                 </Card>
               </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Right Column: Active Monitoring */}
        <div className="lg:col-span-4 space-y-10 flex flex-col min-h-0">
           <div className="sticky top-8 space-y-8">
              <section className="space-y-6">
                 <div className="flex items-center gap-3 px-2">
                    <Activity className="w-5 h-5 text-brand-primary animate-pulse" />
                    <h3 className="text-xs font-black text-brand-ink uppercase tracking-widest italic leading-none">Giám sát hoạt động</h3>
                 </div>
                 
                 <div className="min-h-[200px]">
                    <ImportJobTracker activeJobIds={activeJobIds} />
                    {activeJobIds.length === 0 && (
                      <Card className="p-12 border-4 border-brand-border border-dashed rounded-[3rem] text-center bg-white shadow-inner opacity-40">
                         <div className="w-20 h-20 bg-brand-highlight rounded-full flex items-center justify-center mx-auto mb-6">
                            <Clock className="w-10 h-10 text-slate-300" />
                         </div>
                         <p className="text-[11px] font-black text-brand-ink uppercase tracking-[0.2em] leading-relaxed">Chưa ghi nhận <br/> tiến trình nhập mới</p>
                      </Card>
                    )}
                 </div>
              </section>

              <Card className="p-10 bg-brand-ink text-white rounded-[3rem] shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                 <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-inner">
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                       </div>
                       <h4 className="text-xl font-black uppercase italic tracking-tighter">Hướng dẫn</h4>
                    </div>
                    <ul className="space-y-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                       <li className="flex items-start gap-2">
                          <span className="text-brand-primary mt-1">•</span> 
                          <span>Sử dụng Template chuẩn Excel (.xlsx)</span>
                       </li>
                       <li className="flex items-start gap-2">
                          <span>•</span> 
                          <span>Đảm bảo các cột ID và Slug không trùng lặp</span>
                       </li>
                       <li className="flex items-start gap-2">
                          <span>•</span> 
                          <span>Dữ liệu sẽ được xử lý ngầm (Background)</span>
                       </li>
                    </ul>
                    <Button variant="ghost" className="w-full mt-4 h-12 bg-white/5 border-2 border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 text-white gap-2">
                       Tải file mẫu <ArrowRight className="w-4 h-4" />
                    </Button>
                 </div>
              </Card>
           </div>
        </div>
      </div>
    </div>
  );
}
