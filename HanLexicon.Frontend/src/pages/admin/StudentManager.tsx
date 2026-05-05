import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, Search, RefreshCw, Mail, Calendar, User as UserIcon, Filter, ArrowUpDown, ChevronUp, ChevronDown, Plus, X, Save, Lock,
  ArrowRight, History, Layers, Eye, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '@/src/services/api';
import { FormSelect } from '@/src/components/ui/FormSelect';
import { cn } from '@/lib/utils';
import { dateUtils } from '@/src/utils/formatters';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function StudentManager() {
  const navigate = useNavigate();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Filtering & Sorting State
  const [searchTerm, setSearchTerm] = useState('');
  const [isActiveFilter, setIsActiveFilter] = useState<boolean | undefined>(undefined);
  const [sortBy, setSortBy] = useState('CreatedAt');
  const [isDescending, setIsDescending] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Create Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    role: 'student'
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await adminService.adminGetUsers({
        page,
        pageSize: 12,
        search: searchTerm,
        isActive: isActiveFilter,
        sortBy: sortBy,
        isDescending: isDescending
      });
      if (res.isSuccess) {
        setStudents(res.data.items);
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalItems);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, isActiveFilter, sortBy, isDescending]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchData();
  };

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setIsDescending(!isDescending);
    } else {
      setSortBy(field);
      setIsDescending(true);
    }
    setPage(1);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await adminService.adminCreateUser(formData);
      if (res.isSuccess) {
        toast.success('Tạo tài khoản học sinh thành công');
        setIsModalOpen(false);
        setFormData({ username: '', email: '', password: '', fullName: '', role: 'student' });
        fetchData();
      } else {
        toast.error(res.message || "Lỗi khi tạo học sinh");
      }
    } catch (error: any) {
      toast.error("Lỗi: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortBy !== field) return <ArrowUpDown className="w-3.5 h-3.5 opacity-30" />;
    return isDescending ? <ChevronDown className="w-3.5 h-3.5 text-brand-primary" /> : <ChevronUp className="w-3.5 h-3.5 text-brand-primary" />;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] gap-6 animate-in fade-in duration-500 relative">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div>
          <h1 className="text-3xl font-black text-brand-ink tracking-tight uppercase italic flex items-center gap-3 font-heading">
             <Users className="w-8 h-8 text-brand-primary" />
             Quản lý Học sinh
          </h1>
          <div className="flex items-center gap-2 mt-1">
             <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary font-black border-none px-3 py-1">
                {totalItems} HỌC VIÊN
             </Badge>
             <p className="text-brand-secondary text-xs font-bold uppercase tracking-widest opacity-60">Identity Master Stream</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={fetchData} variant="outline" className="h-12 w-12 p-0 rounded-2xl border-brand-border hover:bg-brand-highlight transition-all hover:scale-105 active:scale-95">
            <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="h-12 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-lg shadow-brand-primary/20 gap-2 transition-all hover:scale-105 active:scale-95">
            <Plus className="w-5 h-5" /> Thêm học sinh
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <Card className="p-4 border-brand-border bg-white rounded-[1.5rem] shadow-sm shrink-0">
        <div className="flex flex-col lg:flex-row gap-4">
          <form onSubmit={handleSearch} className="relative group flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-primary transition-colors" />
            <input
              type="text" placeholder="Tìm học sinh theo tên, email hoặc username..."
              className="w-full h-12 pl-12 pr-4 bg-brand-highlight/20 border-2 border-transparent focus:border-brand-primary focus:bg-white rounded-xl font-bold text-sm outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          
          <div className="flex items-center gap-2 min-w-[200px]">
            <Filter className="w-4 h-4 text-brand-secondary shrink-0" />
            <FormSelect 
              className="h-12 border-none bg-brand-highlight/30"
              value={isActiveFilter === undefined ? "" : isActiveFilter.toString()}
              onChange={(e) => {
                const val = e.target.value;
                setIsActiveFilter(val === "" ? undefined : val === "true");
                setPage(1);
              }}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="true">Đang hoạt động</option>
              <option value="false">Đã bị khóa</option>
            </FormSelect>
          </div>
        </div>
      </Card>

      {/* Main Table Content */}
      <Card className="flex-1 border border-brand-border bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          <table className="w-full text-left border-collapse table-fixed">
            <thead className="sticky top-0 z-10 bg-brand-highlight/95 backdrop-blur-md shadow-sm">
              <tr className="border-b border-brand-border text-[10px] font-black uppercase tracking-widest text-brand-secondary">
                <th className="p-6 w-1/3 cursor-pointer hover:text-brand-primary transition-colors" onClick={() => toggleSort('FullName')}>
                  <div className="flex items-center gap-2">Họ tên & Username <SortIcon field="FullName" /></div>
                </th>
                <th className="p-6 w-1/4">Liên hệ & Trạng thái</th>
                <th className="p-6 w-1/4 cursor-pointer hover:text-brand-primary transition-colors" onClick={() => toggleSort('CreatedAt')}>
                  <div className="flex items-center gap-2">Ngày tham gia <SortIcon field="CreatedAt" /></div>
                </th>
                <th className="p-6 w-32 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {loading && students.length === 0 ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i}>
                    <td className="p-6"><Skeleton className="h-12 w-full rounded-xl" /></td>
                    <td className="p-6"><Skeleton className="h-12 w-full rounded-xl" /></td>
                    <td className="p-6"><Skeleton className="h-12 w-full rounded-xl" /></td>
                    <td className="p-6 text-right"><Skeleton className="h-12 w-20 rounded-xl ml-auto" /></td>
                  </tr>
                ))
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <div className="max-w-xs mx-auto space-y-4">
                      <div className="w-20 h-20 bg-brand-highlight rounded-full flex items-center justify-center mx-auto">
                        <Users className="w-10 h-10 text-slate-300" />
                      </div>
                      <p className="font-black text-brand-ink uppercase italic">Không tìm thấy học sinh nào phù hợp</p>
                    </div>
                  </td>
                </tr>
              ) : students.map((s) => (
                <tr key={s.id} className="hover:bg-brand-highlight/5 transition-all group border-b border-brand-border">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-brand-ink text-white flex items-center justify-center shrink-0 shadow-lg shadow-brand-ink/20">
                        <UserIcon className="w-6 h-6" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-black text-xl text-brand-ink truncate">{s.fullName}</p>
                        <p className="text-xs font-bold text-brand-secondary italic opacity-60">@{s.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-black text-brand-ink">
                        <Mail className="w-3.5 h-3.5 text-brand-primary" />
                        <span className="truncate">{s.email}</span>
                      </div>
                      <span className={cn(
                        "px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                        s.isActive ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                      )}>
                        {s.isActive ? "Hoạt động" : "Bị khóa"}
                      </span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col gap-1.5 opacity-40">
                       <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <p className="text-[10px] font-black text-brand-ink uppercase">{dateUtils.formatDate(s.createdAt, 'dd/MM/yyyy')}</p>
                       </div>
                       <div className="flex items-center gap-1.5">
                          <History className="w-3 h-3" />
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">ID: {s.id?.substring(0,8)}...</p>
                       </div>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button 
                        onClick={() => navigate(`/admin/students/${s.id}`)} 
                        className="h-9 px-4 rounded-xl flex items-center justify-center bg-brand-highlight/80 text-brand-primary text-[10px] font-black uppercase hover:bg-brand-primary hover:text-white transition-all gap-2"
                      >
                        <Eye className="w-3.5 h-3.5" /> Chi tiết
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* STICKY STATUS BAR */}
      <div className="sticky bottom-0 z-20 shrink-0 bg-white/80 backdrop-blur-xl border border-brand-border p-4 rounded-3xl shadow-2xl flex items-center justify-between animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-6">
             <div className="flex flex-col">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hiển thị</p>
                <p className="text-sm font-black text-brand-ink tracking-tight italic">
                  {(page - 1) * 12 + 1} - {Math.min(page * 12, totalItems)} 
                  <span className="text-brand-secondary/40 mx-2">/</span>
                  {totalItems} <span className="text-[10px] opacity-40 uppercase">Học sinh</span>
                </p>
             </div>
             <div className="h-8 w-px bg-brand-border mx-2" />
             <div className="flex flex-col">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng thái</p>
                <div className="flex items-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <p className="text-xs font-bold text-brand-ink uppercase tracking-tighter italic">Live Management</p>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  disabled={page === 1} 
                  onClick={() => setPage(page - 1)} 
                  className="rounded-2xl border-2 border-brand-border h-12 px-6 font-black bg-white shadow-lg shadow-black/5 hover:bg-brand-highlight active:scale-95 transition-all gap-2"
                >
                  <ChevronLeft className="w-5 h-5" /> Trước
                </Button>
                <Button 
                  variant="outline" 
                  disabled={page === totalPages} 
                  onClick={() => setPage(page + 1)} 
                  className="rounded-2xl border-2 border-brand-border h-12 px-6 font-black bg-white shadow-lg shadow-black/5 hover:bg-brand-highlight active:scale-95 transition-all gap-2"
                >
                  Sau <ChevronRight className="w-5 h-5" />
                </Button>
             </div>
          </div>
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-md bg-white border-brand-border shadow-2xl rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-brand-border bg-brand-highlight/20 flex items-center justify-between">
              <h2 className="text-xl font-black text-brand-ink uppercase italic">Thêm học sinh mới</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)} className="rounded-full h-12 w-12 hover:bg-brand-highlight"><X className="w-6 h-6" /></Button>
            </div>

            <form onSubmit={handleCreateUser} className="p-8 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">Họ và tên *</label>
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <Input value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} className="h-12 pl-10 rounded-xl font-bold border-brand-border" placeholder="Nguyễn Văn A" required />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">Tên đăng nhập *</label>
                <Input value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} className="h-12 rounded-xl font-bold border-brand-border" placeholder="username" required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">Email *</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <Input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="h-12 pl-10 rounded-xl font-bold border-brand-border" placeholder="email@example.com" required />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">Mật khẩu khởi tạo *</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <Input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="h-12 pl-10 rounded-xl font-bold border-brand-border" placeholder="••••••••" required />
                </div>
              </div>

              <Button type="submit" disabled={isSaving} className="w-full bg-brand-primary text-white h-16 rounded-2xl font-black shadow-xl text-lg uppercase tracking-widest mt-4">
                {isSaving ? <RefreshCw className="w-6 h-6 animate-spin" /> : <><Save className="w-5 h-5 mr-2" /> Tạo tài khoản</>}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
