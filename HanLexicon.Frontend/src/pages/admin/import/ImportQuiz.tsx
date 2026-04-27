import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, HelpCircle, FileJson } from 'lucide-react';

export default function ImportQuiz() {
  return (
    <Card className="border-0 bg-white shadow-sm rounded-3xl overflow-hidden min-h-[400px] flex flex-col">
      <CardContent className="p-20 text-center space-y-8 flex-1 flex flex-col justify-center">
        <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto border-2 border-dashed border-indigo-200">
          <Brain className="w-12 h-12 text-indigo-500" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-brand-ink">Import Câu hỏi trắc nghiệm</h3>
          <p className="text-brand-secondary max-w-sm mx-auto">Tính năng này cho phép bạn tải lên hàng loạt câu hỏi cho các bài học từ HSK 1 đến HSK 6.</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <Button variant="outline" className="h-16 rounded-2xl border-brand-border font-bold flex flex-col gap-1 items-center justify-center">
            <FileJson className="w-5 h-5 text-amber-500" />
            <span className="text-[10px]">Mẫu JSON</span>
          </Button>
          <Button variant="outline" className="h-16 rounded-2xl border-brand-border font-bold flex flex-col gap-1 items-center justify-center">
            <HelpCircle className="w-5 h-5 text-brand-primary" />
            <span className="text-[10px]">Hướng dẫn</span>
          </Button>
        </div>

        <div className="pt-8">
           <Button className="bg-brand-ink text-white font-black rounded-2xl px-12 h-14 shadow-xl">CHỌN TỆP DỮ LIỆU</Button>
        </div>
      </CardContent>
    </Card>
  );
}
