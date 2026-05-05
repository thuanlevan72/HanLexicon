import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileImage, Music, FileText, Trash2, Search, Filter, 
  RefreshCw, UploadCloud, Copy, ExternalLink, HardDrive, CheckCircle2,
  Folder, ChevronRight, FolderPlus, ArrowLeft, MoreVertical,
  History, ArrowRight, ChevronLeft, Volume2, Eye, X,
  LayoutGrid, List, Download, Info, Menu, Play, FileIcon
} from 'lucide-react';
import { FormSelect } from '@/src/components/ui/FormSelect';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { adminService, mediaService } from '@/src/services/api';
import { dateUtils } from '@/src/utils/formatters';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function MediaManager() {
  const [files, setFiles] = useState<any[]>([]);
  const [folders, setFolders] = useState<string[]>([]);
  const [currentFolder, setCurrentFolder] = useState<string>('general');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const params = {
        page: page.toString(),
        pageSize: viewMode === 'grid' ? '12' : '10',
        search: searchTerm,
        mediaType: mediaType,
        folder: currentFolder,
        sortBy: 'CreatedAt',
        isDescending: 'true'
      };
      
      const res = await mediaService.getMediaList(params);
      
      if (res.isSuccess) {
        setFiles(res.data.items);
        setFolders(res.data.folders || []);
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalItems);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Không thể tải danh sách file');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [page, mediaType, currentFolder, viewMode]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchFiles();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }

    try {
      const res = await mediaService.uploadMedia(formData, currentFolder);
      if (res.isSuccess) {
        toast.success(`Đã tải lên ${res.data.total} file vào thư mục "${currentFolder}"`);
        fetchFiles();
      } else {
        toast.error(res.message || 'Lỗi tải lên file');
      }
    } catch (error: any) {
      toast.error('Lỗi: ' + error);
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá file này? File có thể đang được sử dụng trong bài học.")) return;
    
    try {
      const res = await mediaService.deleteMedia(id);
      
      if (res.isSuccess) {
        toast.success('Xoá file thành công');
        fetchFiles();
      } else {
        toast.error(res.message || 'Không thể xoá file');
      }
    } catch (error: any) {
      toast.error('Lỗi: ' + error);
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    const folderName = newFolderName.trim().toLowerCase().replace(/\s+/g, '-');
    
    try {
      const res = await mediaService.createFolder(folderName);
      
      if (res.isSuccess) {
        if (!folders.includes(folderName)) {
            setFolders([...folders, folderName]);
        }
        setCurrentFolder(folderName);
        setNewFolderName('');
        setShowNewFolderInput(false);
        toast.success(`Đã tạo thư mục: ${folderName}`);
        fetchFiles();
      } else {
        toast.error(res.message || 'Lỗi khi tạo thư mục');
      }
    } catch (error: any) {
      toast.error('Lỗi: ' + error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Đã copy đường dẫn URL');
  };

  const formatFileSize = (kb: number | null) => {
    if (!kb) return '0 KB';
    if (kb > 1024) return `${(kb / 1024).toFixed(2)} MB`;
    return `${kb} KB`;
  };

  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch(e => {
        console.error("Error playing audio:", e);
        toast.error("Không thể phát âm thanh này");
    });
  };

  const FileIconComponent = ({ type, url }: { type: string, url: string }) => {
    switch (type) {
      case 'image':
        return <img src={url} className="w-full h-full object-cover" alt="" />;
      case 'audio':
        return <Music className="w-8 h-8 text-sky-500" />;
      case 'video':
        return <Play className="w-8 h-8 text-amber-500" />;
      default:
        return <FileText className="w-8 h-8 text-slate-400" />;
    }
  };

  const FolderList = () => (
    <div className="flex flex-col gap-1">
      <Button 
        variant={currentFolder === 'general' ? 'secondary' : 'ghost'} 
        className={cn("justify-start gap-3 rounded-xl h-11 px-4 font-bold text-sm", currentFolder === 'general' ? "bg-brand-primary/10 text-brand-primary" : "text-slate-600")}
        onClick={() => setCurrentFolder('general')}
      >
        <HardDrive className="w-4 h-4" /> Root (general)
      </Button>
      {folders.filter(f => f !== 'general').map(folder => (
        <Button 
          key={folder}
          variant={currentFolder === folder ? 'secondary' : 'ghost'} 
          className={cn("justify-start gap-3 rounded-xl h-11 px-4 font-bold text-sm", currentFolder === folder ? "bg-brand-primary/10 text-brand-primary" : "text-slate-600")}
          onClick={() => setCurrentFolder(folder)}
        >
          <Folder className={cn("w-4 h-4", currentFolder === folder ? "text-brand-primary" : "text-slate-400")} />
          {folder}
        </Button>
      ))}

      {showNewFolderInput ? (
        <div className="mt-2 px-2 flex flex-col gap-2">
          <Input 
            className="h-9 rounded-lg text-xs font-bold" 
            placeholder="Tên thư mục..."
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
          />
          <div className="flex gap-2">
            <Button onClick={handleCreateFolder} size="sm" className="flex-1 h-8 rounded-lg bg-brand-primary text-white text-xs">Tạo</Button>
            <Button onClick={() => setShowNewFolderInput(false)} variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg"><X className="w-4 h-4" /></Button>
          </div>
        </div>
      ) : (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowNewFolderInput(true)}
          className="mt-2 justify-start gap-3 rounded-xl h-10 px-4 font-black text-[10px] uppercase tracking-widest text-brand-primary hover:bg-brand-primary/5 transition-all"
        >
          <FolderPlus className="w-4 h-4" /> Thư mục mới
        </Button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] gap-4 animate-in fade-in duration-500 overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0 px-1">
        <div>
          <h1 className="text-2xl font-black text-brand-ink tracking-tight uppercase italic flex items-center gap-3 font-heading">
             <HardDrive className="w-7 h-7 text-brand-primary" />
             Tệp tin & Media
          </h1>
          <Breadcrumb className="mt-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => setCurrentFolder('general')} className="cursor-pointer text-[10px] uppercase font-black tracking-widest">Bộ nhớ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[10px] uppercase font-black tracking-widest text-brand-primary">/{currentFolder}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center bg-brand-highlight/30 rounded-xl p-1 border border-brand-border">
            <Button 
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
              size="icon" 
              className="h-9 w-9 rounded-lg"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
              size="icon" 
              className="h-9 w-9 rounded-lg"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
          
          <Button onClick={fetchFiles} variant="outline" className="h-11 w-11 p-0 rounded-xl border-brand-border hover:bg-brand-highlight text-brand-secondary">
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin text-brand-primary")} />
          </Button>

          <div className="relative">
            <input 
              type="file" 
              multiple 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              onChange={handleUpload}
              disabled={isUploading}
            />
            <Button className="bg-brand-primary text-white h-11 px-5 rounded-xl font-black shadow-lg shadow-brand-primary/20 gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]">
              {isUploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
              <span className="hidden sm:inline">{isUploading ? 'Đang tải...' : 'Tải lên'}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border border-brand-border rounded-[1.5rem] p-4 shadow-sm overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Thư mục</h3>
          </div>
          <FolderList />
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* Filters Bar */}
          <Card className="p-3 border-brand-border bg-white rounded-[1.2rem] shadow-sm shrink-0">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="lg:hidden shrink-0">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="h-11 w-11 p-0 rounded-xl border-brand-border">
                      <Menu className="w-5 h-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[280px]">
                    <SheetHeader>
                      <SheetTitle className="text-left font-black uppercase italic tracking-tight">Folders</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4 px-1">
                       <FolderList />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <form onSubmit={handleSearch} className="relative group flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-brand-primary transition-colors" />
                <input
                  type="text" placeholder="Tìm kiếm file..."
                  className="w-full h-11 pl-11 pr-4 bg-brand-highlight/20 border-2 border-transparent focus:border-brand-primary focus:bg-white rounded-xl font-bold text-xs outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
              
              <div className="flex items-center gap-2 min-w-[160px]">
                <FormSelect 
                  className="h-11 border-brand-border bg-white rounded-xl text-xs font-bold"
                  value={mediaType}
                  onChange={(e) => {
                    setMediaType(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">Tất cả loại</option>
                  <option value="image">Hình ảnh</option>
                  <option value="audio">Âm thanh</option>
                </FormSelect>
              </div>
            </div>
          </Card>

          {/* Files Display */}
          <div className="flex-1 bg-white border border-brand-border rounded-[1.5rem] shadow-sm overflow-hidden flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
              {loading && files.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-40">
                   <RefreshCw className="w-10 h-10 animate-spin text-brand-primary mb-4" />
                   <p className="font-black uppercase tracking-widest text-xs">Đang tải dữ liệu...</p>
                </div>
              ) : files.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-12">
                   <div className="w-20 h-20 bg-brand-highlight rounded-full flex items-center justify-center mb-6">
                      <FileIcon className="w-10 h-10 text-slate-300" />
                   </div>
                   <h3 className="text-xl font-black text-brand-ink uppercase italic mb-2">Thư mục trống</h3>
                   <p className="text-slate-500 text-sm max-w-xs mx-auto">Chưa có file nào trong /{currentFolder}. Hãy tải lên file đầu tiên của bạn.</p>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
                  {files.map((file) => (
                    <Card key={file.id} className="group overflow-hidden border-brand-border hover:border-brand-primary/50 hover:shadow-md transition-all rounded-2xl flex flex-col">
                      <div className="aspect-square relative bg-brand-highlight/30 flex items-center justify-center overflow-hidden">
                        <FileIconComponent type={file.mediaType} url={file.cdnUrl} />
                        
                        <div className="absolute inset-0 bg-brand-ink/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                           <Button size="icon" variant="secondary" className="h-9 w-9 rounded-lg" onClick={() => copyToClipboard(file.cdnUrl)} title="Copy URL">
                             <Copy className="w-4 h-4" />
                           </Button>
                           {file.mediaType === 'image' && (
                             <Button size="icon" variant="secondary" className="h-9 w-9 rounded-lg" onClick={() => setPreviewImage(file.cdnUrl)} title="Xem">
                               <Eye className="w-4 h-4" />
                             </Button>
                           )}
                           {file.mediaType === 'audio' && (
                             <Button size="icon" variant="secondary" className="h-9 w-9 rounded-lg" onClick={() => playAudio(file.cdnUrl)} title="Nghe">
                               <Volume2 className="w-4 h-4" />
                             </Button>
                           )}
                           <Button size="icon" variant="destructive" className="h-9 w-9 rounded-lg" onClick={() => handleDelete(file.id)} title="Xóa">
                             <Trash2 className="w-4 h-4" />
                           </Button>
                        </div>

                        <div className="absolute top-2 right-2">
                           <Badge className="bg-white/90 text-brand-ink text-[8px] font-black uppercase tracking-widest border-none py-0 h-5">
                             {file.mediaType}
                           </Badge>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-black text-brand-ink truncate mb-1" title={file.fileName}>{file.fileName}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-400 italic">{formatFileSize(file.fileSizeKb)}</span>
                          <span className="text-[10px] font-bold text-slate-300">{dateUtils.formatDate(file.createdAt, 'dd/MM/yy')}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="w-full">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-brand-border text-[10px] font-black uppercase tracking-widest text-brand-secondary">
                        <th className="pb-3 px-2 w-1/2">Tên file</th>
                        <th className="pb-3 px-2">Loại</th>
                        <th className="pb-3 px-2">Dung lượng</th>
                        <th className="pb-3 px-2 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border">
                      {files.map((file) => (
                        <tr key={file.id} className="group hover:bg-brand-highlight/5">
                          <td className="py-3 px-2">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-brand-highlight flex items-center justify-center shrink-0 overflow-hidden">
                                   {file.mediaType === 'image' ? (
                                      <img src={file.cdnUrl} className="w-full h-full object-cover" alt="" />
                                   ) : <FileText className="w-4 h-4 text-slate-400" />}
                                </div>
                                <span className="text-xs font-bold text-brand-ink truncate max-w-[200px]" title={file.fileName}>{file.fileName}</span>
                             </div>
                          </td>
                          <td className="py-3 px-2">
                             <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest py-0 h-5">{file.mediaType}</Badge>
                          </td>
                          <td className="py-3 px-2 text-[10px] font-bold text-slate-500 italic">
                             {formatFileSize(file.fileSizeKb)}
                          </td>
                          <td className="py-3 px-2 text-right">
                             <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-brand-primary" onClick={() => copyToClipboard(file.cdnUrl)}><Copy className="w-3.5 h-3.5" /></Button>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-rose-500" onClick={() => handleDelete(file.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400" onClick={() => window.open(file.cdnUrl, '_blank')}><ExternalLink className="w-3.5 h-3.5" /></Button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Pagination / Footer */}
            <div className="p-4 border-t border-brand-border bg-brand-highlight/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[10px] font-black text-brand-secondary uppercase tracking-widest">
                Hiển thị <span className="text-brand-ink">{(page - 1) * (viewMode === 'grid' ? 12 : 10) + 1} - {Math.min(page * (viewMode === 'grid' ? 12 : 10), totalItems)}</span> của <span className="text-brand-ink">{totalItems}</span> files
              </p>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={page === 1} 
                  onClick={() => setPage(page - 1)} 
                  className="rounded-xl border-brand-border h-9 px-4 font-black text-xs bg-white shadow-sm gap-2"
                >
                  <ChevronLeft className="w-4 h-4" /> Trước
                </Button>
                <div className="flex items-center gap-1">
                   {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Simple pagination logic
                      let pageNum = i + 1;
                      if (totalPages > 5 && page > 3) {
                         pageNum = page - 3 + i;
                         if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                      }
                      if (pageNum <= 0) return null;
                      if (pageNum > totalPages) return null;

                      return (
                        <Button 
                          key={pageNum}
                          variant={page === pageNum ? 'secondary' : 'ghost'}
                          size="sm"
                          className={cn("h-9 w-9 rounded-xl font-black text-xs", page === pageNum ? "bg-brand-primary text-white" : "")}
                          onClick={() => setPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                   })}
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={page === totalPages} 
                  onClick={() => setPage(page + 1)} 
                  className="rounded-xl border-brand-border h-9 px-4 font-black text-xs bg-white shadow-sm gap-2"
                >
                  Sau <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-brand-ink/90 backdrop-blur-xl p-8 animate-in zoom-in duration-300" onClick={() => setPreviewImage(null)}>
           <div className="max-w-4xl max-h-full relative group">
              <img src={previewImage} className="max-w-full max-h-full rounded-[2rem] shadow-2xl border-4 border-white/20 object-contain shadow-brand-primary/10" alt="Preview" />
              <Button onClick={() => setPreviewImage(null)} variant="ghost" size="icon" className="absolute -top-12 -right-12 text-white hover:bg-white/10 rounded-full h-12 w-12"><X className="w-8 h-8" /></Button>
           </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
}
