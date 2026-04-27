import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, FileSpreadsheet, Brain, Layers, Settings2 } from 'lucide-react';
import ImportVocabulary from './import/ImportVocabulary';
import ImportQuiz from './import/ImportQuiz';
import ImportJobTracker from './import/ImportJobTracker';

export default function AdminImportPage() {
  // Danh sách các Job ID đang hoạt động để Tracker theo dõi
  const [activeJobIds, setActiveJobIds] = useState<string[]>([]);

  const handleNewJob = (jobId: string) => {
    setActiveJobIds(prev => [jobId, ...prev]);
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
                <Database className="w-6 h-6 text-white" />
             </div>
             <h1 className="text-3xl font-black text-brand-ink tracking-tight uppercase italic font-heading">Cổng Nhập Dữ Liệu</h1>
          </div>
          <p className="text-brand-secondary font-medium pl-1">Tải lên học liệu hàng loạt và theo dõi tiến độ xử lý tự động.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Cột trái: Các Tab Nhập Liệu */}
        <div className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="vocabulary" className="w-full">
            <TabsList className="bg-white p-1.5 rounded-[2rem] border border-brand-border shadow-sm flex h-auto mb-8">
              <TabsTrigger 
                value="vocabulary" 
                className="flex-1 h-12 px-6 rounded-[1.5rem] font-bold gap-2 data-[state=active]:bg-brand-primary data-[state=active]:text-white transition-all"
              >
                <FileSpreadsheet className="w-4 h-4" /> Từ vựng
              </TabsTrigger>
              <TabsTrigger 
                value="quizzes" 
                className="flex-1 h-12 px-6 rounded-[1.5rem] font-bold gap-2 data-[state=active]:bg-brand-primary data-[state=active]:text-white transition-all"
              >
                <Brain className="w-4 h-4" /> Câu hỏi
              </TabsTrigger>
              <TabsTrigger 
                value="lessons" 
                className="flex-1 h-12 px-6 rounded-[1.5rem] font-bold gap-2 data-[state=active]:bg-brand-primary data-[state=active]:text-white transition-all"
              >
                <Layers className="w-4 h-4" /> Khác
              </TabsTrigger>
            </TabsList>

            <TabsContent value="vocabulary" className="mt-0 focus-visible:ring-0 outline-none">
              <ImportVocabulary onImportStarted={handleNewJob} />
            </TabsContent>

            <TabsContent value="quizzes" className="mt-0 focus-visible:ring-0 outline-none">
              <ImportQuiz />
            </TabsContent>

            <TabsContent value="lessons" className="mt-0 focus-visible:ring-0 outline-none">
              <div className="bg-white p-20 rounded-[3rem] border border-dashed border-brand-border text-center space-y-4">
                 <p className="text-brand-secondary font-bold uppercase tracking-widest text-xs italic">Sắp ra mắt...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Cột phải: Tracker theo dõi Job */}
        <div className="lg:col-span-1 sticky top-8">
          <ImportJobTracker activeJobIds={activeJobIds} />
          
          {activeJobIds.length === 0 && (
             <div className="p-10 border border-brand-border border-dashed rounded-3xl text-center space-y-4 opacity-40">
                <Clock className="w-10 h-10 text-brand-secondary mx-auto" />
                <p className="text-xs font-bold uppercase tracking-widest leading-relaxed">Chưa có hoạt động <br/> nhập liệu gần đây</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { Clock } from 'lucide-react';
