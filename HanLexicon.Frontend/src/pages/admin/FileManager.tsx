import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FolderOpen, File as FileIcon, Upload, Trash2, RefreshCw, Plus, Image as ImageIcon,
  Music, Copy, CheckCircle2, HardDrive
} from 'lucide-react';
import { adminService } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function FileManager() {
  const [folders, setFolders] = useState<string[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [currentFolder, setCurrentFolder] = useState<string>('general');
  const [loadingFolders, setLoadingFolders] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFolders = async () => {
    setLoadingFolders(true);
    try {
      const res = await adminService.adminGetFolders();
      if (res.isSuccess) {
        let fList = res.data;
        if (!fList.includes('general')) fList.push('general');
        setFolders(fList);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingFolders(false);
    }
  };

  const fetchFiles = async (folder: string) => {
    setLoadingFiles(true);
    try {
      const res = await adminService.adminGetFiles(folder, 1, 100); // Tạm thời load 100 files đầu tiên
      if (res.isSuccess) {
        setFiles(res.data.files);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingFiles(false);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  useEffect(() => {
    fetchFiles(currentFolder);
  }, [currentFolder]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    try {
      const res = await adminService.adminUploadFiles(e.target.files, currentFolder);
      if (res.isSuccess) {
        fetchFiles(currentFolder);
        if (!folders.includes(currentFolder)) fetchFolders();
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Đã xảy ra lỗi khi tải file lên.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa file này? Thao tác này không thể hoàn tác.")) return;
    try {
      const res = await adminService.adminDeleteFile(id);
      if (res.isSuccess) {
        fetchFiles(currentFolder);
      } else {
        alert(res.message);
      }
    } catch (error) {
      alert("Lỗi khi xóa file.");
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const createNewFolder = () => {
    const name = window.prompt("Nhập tên thư mục mới:");
    if (name && name.trim() !== '') {
      const folderName = name.trim();
      if (!folders.includes(folderName)) {
        setFolders([...folders, folderName]);
        setCurrentFolder(folderName);
      } else {
        setCurrentFolder(folderName);
      }
    }
  };

  const getFileIcon = (mediaType: string) => {
    if (mediaType.startsWith('image/')) return <ImageIcon className="w-8 h-8 text-blue-500" />;
    if (mediaType.startsWith('audio/')) return <Music className="w-8 h-8 text-purple-500" />;
    return <FileIcon className="w-8 h-8 text-gray-500" />;
  };

  const formatSize = (kb: number) => {
    if (!kb) return "0 KB";
    if (kb < 1024) return `${kb} KB`;
    return `${(kb / 1024).toFixed(2)} MB`;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] gap-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div>
          <h1 className="text-3xl font-black text-brand-ink tracking-tight uppercase italic flex items-center gap-3 font-heading">
             <HardDrive className="w-8 h-8 text-brand-primary" />
             Quản lý Tập tin
          </h1>
          <div className="flex items-center gap-2 mt-1">
             <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary font-black border-none px-3 py-1">
                MinIO Storage
             </Badge>
             <p className="text-brand-secondary text-xs font-bold uppercase tracking-widest opacity-60 italic">Assets & Media</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            multiple 
            className="hidden" 
          />
          <Button onClick={handleUploadClick} disabled={uploading} className="h-12 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-lg shadow-brand-primary/20 gap-2 transition-all hover:scale-105 active:scale-95">
            {uploading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
            {uploading ? "Đang tải lên..." : "Tải tệp lên"}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        {/* Sidebar: Thư mục */}
        <Card className="w-64 border-brand-border bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col shrink-0">
          <div className="p-4 border-b border-brand-border flex items-center justify-between bg-brand-highlight/20">
            <span className="font-black text-sm uppercase tracking-widest text-brand-ink">Thư mục</span>
            <Button variant="ghost" size="icon" onClick={createNewFolder} className="h-8 w-8 text-brand-primary rounded-xl hover:bg-brand-primary/10">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
            {loadingFolders ? (
              <div className="flex justify-center p-4"><RefreshCw className="w-5 h-5 animate-spin text-brand-primary opacity-50" /></div>
            ) : (
              folders.map(folder => (
                <button
                  key={folder}
                  onClick={() => setCurrentFolder(folder)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all font-bold text-sm",
                    currentFolder === folder 
                      ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20" 
                      : "text-brand-ink/70 hover:bg-brand-highlight/50 hover:text-brand-ink"
                  )}
                >
                  <FolderOpen className={cn("w-4 h-4", currentFolder === folder ? "text-white" : "text-brand-primary/50")} />
                  <span className="truncate">{folder}</span>
                </button>
              ))
            )}
          </div>
        </Card>

        {/* Main: Danh sách File */}
        <Card className="flex-1 border-brand-border bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col min-w-0">
          <div className="p-4 border-b border-brand-border flex items-center justify-between bg-brand-highlight/20">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-brand-primary" />
              <span className="font-black text-brand-ink text-lg">{currentFolder}</span>
            </div>
            <Button onClick={() => fetchFiles(currentFolder)} variant="ghost" className="h-8 w-8 p-0 rounded-xl hover:bg-brand-highlight text-brand-secondary">
              <RefreshCw className={cn("w-4 h-4", loadingFiles && "animate-spin text-brand-primary")} />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {loadingFiles ? (
              <div className="flex justify-center items-center h-full">
                <RefreshCw className="w-8 h-8 animate-spin text-brand-primary opacity-20" />
              </div>
            ) : files.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
                <FolderOpen className="w-16 h-16 mb-4 text-brand-secondary" />
                <p className="font-black uppercase tracking-widest text-brand-secondary italic">Thư mục trống</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {files.map(file => (
                  <div key={file.id} className="group relative border border-brand-border bg-white rounded-2xl p-4 flex flex-col items-center gap-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                    {/* File Preview */}
                    <div 
                      className="w-full aspect-square rounded-xl bg-brand-highlight/20 flex items-center justify-center border border-brand-border/50 overflow-hidden relative cursor-pointer group/preview"
                      onClick={() => window.open(file.cdnUrl, '_blank')}
                    >
                      {file.mediaType.startsWith('image/') ? (
                        <img src={file.cdnUrl} alt={file.fileName} className="w-full h-full object-cover group-hover/preview:scale-105 transition-transform duration-300" />
                      ) : (
                        getFileIcon(file.mediaType)
                      )}
                      
                      {/* Audio Player if audio */}
                      {file.mediaType.startsWith('audio/') && (
                        <div className="absolute bottom-2 left-2 right-2" onClick={e => e.stopPropagation()}>
                           <audio controls src={file.cdnUrl} className="w-full h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </div>
                      )}
                    </div>
                    
                    {/* File Info */}
                    <div className="w-full text-center space-y-1">
                      <p className="text-xs font-bold text-brand-ink truncate px-2" title={file.fileName}>{file.fileName}</p>
                      <p className="text-[10px] font-mono text-brand-secondary uppercase">{formatSize(file.fileSizeKb)}</p>
                    </div>

                    {/* Actions Overlay */}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleCopyUrl(file.cdnUrl, file.id)}
                        className="h-8 w-8 rounded-lg bg-white/90 backdrop-blur border border-brand-border text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors"
                        title="Sao chép URL"
                      >
                        {copiedId === file.id ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => handleDelete(file.id)}
                        className="h-8 w-8 rounded-lg bg-white/90 backdrop-blur border border-brand-border text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
}
