import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileAudio, 
  Image as ImageIcon, 
  Search, 
  Filter, 
  Upload, 
  MoreVertical,
  Play,
  Trash2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface VocabularyFile {
  id: string;
  word: string;
  hanzi: string;
  hasAudio: boolean;
  hasImage: boolean;
  lastUpdated: string;
}

const mockData: VocabularyFile[] = [
  { id: '1', word: 'Ni hao', hanzi: '你好', hasAudio: true, hasImage: true, lastUpdated: '2024-03-20' },
  { id: '2', word: 'Xie xie', hanzi: '谢谢', hasAudio: true, hasImage: false, lastUpdated: '2024-03-19' },
  { id: '3', word: 'Zai jian', hanzi: '再见', hasAudio: false, hasImage: true, lastUpdated: '2024-03-18' },
];

export default function FileManager() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-secondary tracking-tight">Quản Lý Tệp Tin</h1>
          <p className="text-slate-500 font-medium">Quản lý hình ảnh và âm thanh cho từng thẻ từ vựng.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-brand-primary text-white font-bold h-11 rounded-xl shadow-lg shadow-brand-primary/20">
            <Upload className="w-5 h-5 mr-2" /> Tải lên hàng loạt
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-6 border-brand-border bg-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-highlight flex items-center justify-center">
            <FileAudio className="w-6 h-6 text-brand-primary" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tổng tệp âm thanh</p>
            <p className="text-2xl font-black text-brand-secondary">1,248</p>
          </div>
        </Card>
        <Card className="p-6 border-brand-border bg-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tổng tệp hình ảnh</p>
            <p className="text-2xl font-black text-brand-secondary">856</p>
          </div>
        </Card>
        <Card className="p-6 border-brand-border bg-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Từ vựng thiếu tệp</p>
            <p className="text-2xl font-black text-brand-secondary">42</p>
          </div>
        </Card>
      </div>

      {/* Toolbox */}
      <Card className="p-4 border-brand-border bg-white flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm từ vựng hoặc hán tự..."
            className="w-full h-12 pl-12 pr-4 bg-brand-surface rounded-xl border border-transparent focus:border-brand-primary focus:bg-white transition-all font-bold text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none h-12 px-6 rounded-xl border-brand-border font-bold">
            <Filter className="w-4 h-4 mr-2" /> Bộ lọc
          </Button>
          <Button variant="outline" className="flex-1 md:flex-none h-12 px-6 rounded-xl border-brand-border font-bold">
            Sắp xếp
          </Button>
        </div>
      </Card>

      {/* Grid Layout for Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockData.map((item) => (
          <Card key={item.id} className="overflow-hidden border-brand-border bg-white group hover:shadow-xl transition-all duration-300">
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-black text-brand-secondary font-heading">{item.hanzi}</h3>
                  <p className="text-sm font-bold text-slate-500">{item.word}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex gap-4">
                <div className={cn(
                  "flex-1 p-4 rounded-2xl border-2 border-dashed transition-all cursor-pointer relative group/upload",
                  item.hasAudio ? "bg-emerald-50 border-emerald-200" : "bg-brand-surface border-slate-200 hover:border-brand-primary/30"
                )}>
                  <div className="flex flex-col items-center gap-2">
                    <FileAudio className={cn("w-6 h-6", item.hasAudio ? "text-emerald-500" : "text-slate-400 group-hover/upload:text-brand-primary")} />
                    <span className={cn("text-[10px] font-black uppercase tracking-widest", item.hasAudio ? "text-emerald-600" : "text-slate-400 group-hover/upload:text-brand-primary")}>
                      {item.hasAudio ? 'CÓ ÂM THANH' : 'THIẾU AUDIO'}
                    </span>
                  </div>
                  {item.hasAudio && (
                    <div className="absolute inset-0 bg-emerald-500/80 rounded-[14px] flex items-center justify-center opacity-0 group-hover/upload:opacity-100 transition-opacity">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  )}
                </div>

                <div className={cn(
                  "flex-1 p-4 rounded-2xl border-2 border-dashed transition-all cursor-pointer relative group/upload",
                  item.hasImage ? "bg-indigo-50 border-indigo-200" : "bg-brand-surface border-slate-200 hover:border-brand-primary/30"
                )}>
                  <div className="flex flex-col items-center gap-2">
                    <ImageIcon className={cn("w-6 h-6", item.hasImage ? "text-indigo-500" : "text-slate-400 group-hover/upload:text-brand-primary")} />
                    <span className={cn("text-[10px] font-black uppercase tracking-widest", item.hasImage ? "text-indigo-600" : "text-slate-400 group-hover/upload:text-brand-primary")}>
                      {item.hasImage ? 'CÓ HÌNH ẢNH' : 'THIẾU ẢNH'}
                    </span>
                  </div>
                  {item.hasImage && (
                    <div className="absolute inset-0 bg-indigo-500/80 rounded-[14px] flex items-center justify-center opacity-0 group-hover/upload:opacity-100 transition-opacity">
                      <ImageIcon className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-brand-border/50">
                <span className="text-[10px] font-bold text-slate-400">Cập nhật: {item.lastUpdated}</span>
                <div className="flex gap-2">
                  <Button variant="ghost" className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" className="h-8 w-8 p-0 text-brand-primary hover:bg-brand-highlight">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <Button variant="outline" className="rounded-xl border-brand-border px-8 h-12 font-bold text-slate-500">
          Xem thêm từ vựng
        </Button>
      </div>
    </div>
  );
}
