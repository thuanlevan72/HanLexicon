import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FileAudio, 
  Image as ImageIcon, 
  Search, 
  Filter, 
  Upload, 
  MoreVertical,
  Play,
  Trash2,
  X,
  FileSpreadsheet,
  FileArchive
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { api, Vocabulary } from '@/src/services/api';

export default function FileManager() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [mediaZip, setMediaZip] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  useEffect(() => {
    // Load initial data
    api.getVocabulary().then(data => setVocabularies(data));
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    const data = await api.getVocabulary(term);
    setVocabularies(data);
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!excelFile) return;

    setIsUploading(true);
    setUploadMessage('');
    
    try {
      // It calls api.ts which wraps adminService.importVocabularies
      const res = await api.importExcel(excelFile);
      setUploadMessage(res.message);
      if (res.success) {
        // Refresh list
        api.getVocabulary().then(data => setVocabularies(data));
        setTimeout(() => {
          setIsUploadModalOpen(false);
          setExcelFile(null);
          setMediaZip(null);
          setUploadMessage('');
        }, 2000);
      }
    } catch (error) {
      setUploadMessage('Lỗi tải lên dữ liệu.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-secondary tracking-tight">{t('admin.files.title')}</h1>
          <p className="text-slate-500 font-medium">{t('admin.files.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-brand-primary text-white font-bold h-11 rounded-xl shadow-lg shadow-brand-primary/20"
          >
            <Upload className="w-5 h-5 mr-2" /> {t('admin.files.uploadBulk')}
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
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('admin.stats.audio')}</p>
            <p className="text-2xl font-black text-brand-secondary">
              {vocabularies.length}
            </p>
          </div>
        </Card>
        <Card className="p-6 border-brand-border bg-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('admin.stats.images')}</p>
            <p className="text-2xl font-black text-brand-secondary">
              {vocabularies.filter(v => v.image).length}
            </p>
          </div>
        </Card>
        <Card className="p-6 border-brand-border bg-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('admin.stats.missing')}</p>
            <p className="text-2xl font-black text-brand-secondary">
              {vocabularies.filter(v => !v.image).length}
            </p>
          </div>
        </Card>
      </div>

      {/* Toolbox */}
      <Card className="p-4 border-brand-border bg-white flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder={t('admin.files.searchPlaceholder')}
            className="w-full h-12 pl-12 pr-4 bg-brand-surface rounded-xl border border-transparent focus:border-brand-primary focus:bg-white transition-all font-bold text-sm"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none h-12 px-6 rounded-xl border-brand-border font-bold">
            <Filter className="w-4 h-4 mr-2" /> {t('admin.files.filter')}
          </Button>
          <Button variant="outline" className="flex-1 md:flex-none h-12 px-6 rounded-xl border-brand-border font-bold">
            {t('admin.files.sort')}
          </Button>
        </div>
      </Card>

      {/* Grid Layout for Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vocabularies.map((item) => (
          <Card key={item.id} className="overflow-hidden border-brand-border bg-white group hover:shadow-xl transition-all duration-300">
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-black text-brand-secondary font-heading">{item.word}</h3>
                  <p className="text-sm font-bold text-slate-500">{item.pinyin} - {item.meaning_vn}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex gap-4">
                <div className={cn(
                  "flex-1 p-4 rounded-2xl border-2 border-dashed transition-all cursor-pointer relative group/upload",
                  true ? "bg-emerald-50 border-emerald-200" : "bg-brand-surface border-slate-200 hover:border-brand-primary/30"
                )}>
                  <div className="flex flex-col items-center gap-2">
                    <FileAudio className={cn("w-6 h-6", true ? "text-emerald-500" : "text-slate-400 group-hover/upload:text-brand-primary")} />
                    <span className={cn("text-[10px] font-black uppercase tracking-widest", true ? "text-emerald-600" : "text-slate-400 group-hover/upload:text-brand-primary")}>
                      {true ? t('admin.files.hasAudio') : t('admin.files.noAudio')}
                    </span>
                  </div>
                  {true && (
                    <div className="absolute inset-0 bg-emerald-500/80 rounded-[14px] flex items-center justify-center opacity-0 group-hover/upload:opacity-100 transition-opacity">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  )}
                </div>

                <div className={cn(
                  "flex-1 p-4 rounded-2xl border-2 border-dashed transition-all cursor-pointer relative group/upload",
                  item.image ? "bg-indigo-50 border-indigo-200" : "bg-brand-surface border-slate-200 hover:border-brand-primary/30"
                )}>
                  <div className="flex flex-col items-center gap-2">
                    <ImageIcon className={cn("w-6 h-6", item.image ? "text-indigo-500" : "text-slate-400 group-hover/upload:text-brand-primary")} />
                    <span className={cn("text-[10px] font-black uppercase tracking-widest", item.image ? "text-indigo-600" : "text-slate-400 group-hover/upload:text-brand-primary")}>
                      {item.image ? t('admin.files.hasImage') : t('admin.files.noImage')}
                    </span>
                  </div>
                  {item.image && (
                    <div className="absolute inset-0 bg-indigo-500/80 rounded-[14px] flex items-center justify-center opacity-0 group-hover/upload:opacity-100 transition-opacity">
                      <ImageIcon className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-brand-border/50">
                <span className="text-[10px] font-bold text-slate-400">{t('admin.files.updated')}: Just now</span>
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
          {t('admin.files.loadMore')}
        </Button>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/40 backdrop-blur-sm">
          <Card className="w-full max-w-md bg-white border-brand-border shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-brand-border">
              <h2 className="text-xl font-bold text-brand-secondary">Nhập dữ liệu từ Excel</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsUploadModalOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <form onSubmit={handleUploadSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest">File Excel Dữ Liệu (*.xlsx)</label>
                <div className="relative">
                  <FileSpreadsheet className="absolute left-3 top-3 w-4 h-4 text-emerald-600" />
                  <Input
                    type="file"
                    accept=".xlsx,.xls"
                    className="pl-10 h-12 pt-3 border-brand-border bg-brand-highlight/30 focus:bg-white rounded-xl cursor-pointer"
                    onChange={(e) => setExcelFile(e.target.files?.[0] || null)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest">File Zip Media (Tùy chọn)</label>
                <div className="relative">
                  <FileArchive className="absolute left-3 top-3 w-4 h-4 text-indigo-600" />
                  <Input
                    type="file"
                    accept=".zip"
                    className="pl-10 h-12 pt-3 border-brand-border bg-brand-highlight/30 focus:bg-white rounded-xl cursor-pointer"
                    onChange={(e) => setMediaZip(e.target.files?.[0] || null)}
                  />
                </div>
                <p className="text-xs text-slate-500 font-medium pt-1">
                  Chứa file âm thanh/hình ảnh, tên file khớp với cột trong Excel.
                </p>
              </div>

              {uploadMessage && (
                <div className={cn("p-4 rounded-xl text-sm font-bold", 
                  uploadMessage.includes('Lỗi') ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
                )}>
                  {uploadMessage}
                </div>
              )}

              <Button 
                type="submit" 
                disabled={!excelFile || isUploading}
                className="w-full bg-brand-primary text-white h-12 font-bold rounded-xl"
              >
                {isUploading ? 'Đang xử lý...' : 'Bắt đầu Import'}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
