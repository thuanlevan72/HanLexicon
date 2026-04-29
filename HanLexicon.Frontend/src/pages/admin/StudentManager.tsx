import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, Search, RefreshCw, Mail, Calendar, User as UserIcon, Filter, ArrowUpDown, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, ShieldAlert
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { dateUtils } from '@/src/utils/formatters';
import { Badge } from '@/components/ui/badge';

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
  const pageSize = 12;

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await adminService.adminGetUsers({
        page,
        pageSize: pageSize,
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

  const SortIcon = ({ field }: { field: string }) => {
    if (sortBy !== field) return <ArrowUpDown className="w-3 h-3 opacity-30" />;
    return isDescending ? <ChevronDown className="w-3 h-3 text-brand-primary" /> : <ChevronUp className="w-3 h-3 text-brand-primary" />;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] gap-6 animate-in fade-in duration-500 relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div>
          <h1 className="text-3xl font-black text-brand-ink tracking-tight uppercase italic flex items-center gap-3 font-heading">
             <Users className="w-8 h-8 text-brand-primary" />
             Quản lý Học viên
          </h1>
          <div className="flex items-center gap-2 mt-1">
             <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary font-black border-none px-3 py-1">
                {totalItems} TÀI KHOẢN
             </Badge>
             <p className="text-brand-secondary text-xs font-bold uppercase tracking-widest opacity-60 italic">User Management Gateway</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={fetchData} variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-brand-highlight text-brand-secondary">
            <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
          </Button>
        </div>
      </div>

      {/* Advanced Filters Bar */}
      <Card className="p-4 border-brand-border bg-white rounded-[1.5rem] shadow-sm shrink-0">
        <div className="flex flex-col lg:flex-row gap-4">
           <form onSubmit={handleSearch} className="relative flex-1 group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-primary transition-colors" />
             <input 
               placeholder="Tìm theo tên, email, username..."
               className="w-full h-12 pl-12 pr-4 bg-brand-highlight/20 border-2 border-transparent focus:border-brand-primary focus:bg-white rounded-xl font-bold text-sm outline-none transition-all"
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
             />
           </form>
           
           <div className="flex items-center gap-2 min-w-[200px]">
              <Filter className="w-4 h-4 text-brand-secondary shrink-0" />
              <select 
                className="w-full h-12 bg-brand-highlight/30 border-none rounded-xl px-4 font-bold text-xs text-brand-ink outline-none cursor-pointer hover:bg-brand-highlight/50 transition-colors"
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
              </select>
           </div>
        </div>
      </Card>

      {/* Main Table Card */}
      <Card className="flex-1 border border-brand-border bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto relative custom-scrollbar">
          <table className="w-full text-left border-collapse table-fixed">
            <thead className="sticky top-0 z-10 bg-brand-highlight/95 backdrop-blur-md shadow-sm">
              <tr className="border-b border-brand-border text-[10px] font-black uppercase tracking-widest text-brand-secondary">
                <th className="p-6 w-1/3 cursor-pointer hover:text-brand-primary transition-colors" onClick={() => toggleSort('FullName')}>
                  <div className="flex items-center gap-2">Học viên <SortIcon field="FullName" /></div>
                </th>
                <th className="p-6">Liên hệ</th>
                <th className="p-6 w-48 cursor-pointer hover:text-brand-primary transition-colors" onClick={() => toggleSort('CreatedAt')}>
                   <div className="flex items-center gap-2">Ngày gia nhập <SortIcon field="CreatedAt" /></div>
                </th>
                <th className="p-6 w-40">Trạng thái</th>
                <th className="p-6 w-32 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {loading && students.length === 0 ? (
                <tr><td colSpan={5} className="p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></td></tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-20 text-center">
                    <p className="font-black text-brand-secondary uppercase italic opacity-40">Không tìm thấy học viên nào</p>
                  </td>
                </tr>
              ) : students.map((s) => (
                <tr key={s.id} className="hover:bg-brand-highlight/5 transition-all group border-b border-brand-border">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-brand-ink text-white flex items-center justify-center shrink-0 border-2 border-brand-primary/20 shadow-lg shadow-brand-ink/10">
                        <UserIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-lg font-black text-brand-ink leading-tight">{s.fullName}</p>
                        <p className="text-[10px] text-brand-secondary font-black uppercase tracking-widest opacity-60">@{s.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                      <Mail className="w-4 h-4 text-brand-primary opacity-40" />
                      {s.email}
                    </div>
                  </td>
                  <td className="p-6">
                     <div className="flex items-center gap-2 text-sm font-bold text-slate-500 italic">
                        <Calendar className="w-4 h-4 opacity-30" />
                        {dateUtils.formatDate(s.createdAt, 'dd/MM/yyyy')}
                     </div>
                  </td>
                  <td className="p-6">
                     <div className={cn(
                        "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border-2",
                        s.isActive ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                     )}>
                        {s.isActive ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                        {s.isActive ? "Hoạt động" : "Bị khóa"}
                     </div>
                  </td>
                  <td className="p-6 text-right">
                    <Button onClick={() => navigate(`/admin/students/${s.id}`)} variant="ghost" className="h-10 px-4 rounded-xl bg-brand-highlight/80 text-brand-primary font-black uppercase text-[10px] tracking-widest hover:bg-brand-primary hover:text-white transition-all shadow-sm">
                       Chi tiết <ArrowRight className="w-3.5 h-3.5 ml-2" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* STICKY PAGINATION BAR */}
      <div className="sticky bottom-0 z-20 shrink-0 bg-white/80 backdrop-blur-xl border border-brand-border p-4 rounded-3xl shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-6">
             <div className="flex flex-col">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hiển thị</p>
                <p className="text-sm font-black text-brand-ink tracking-tight italic">
                  {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, totalItems)} 
                  <span className="text-brand-secondary/40 mx-2">/</span>
                  {totalItems} <span className="text-[10px] opacity-40 uppercase">Học viên</span>
                </p>
             </div>
             <div className="h-8 w-px bg-brand-border mx-2" />
             <div className="flex flex-col">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng thái</p>
                <div className="flex items-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <p className="text-xs font-bold text-brand-ink uppercase tracking-tighter italic">Live User Stream</p>
                </div>
             </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)} className="rounded-2xl border-2 border-brand-border h-12 px-6 font-black bg-white shadow-lg shadow-black/5 hover:bg-brand-highlight active:scale-95 transition-all gap-2">
               <ChevronLeft className="w-5 h-5" /> Trước
            </Button>
            <div className="h-12 px-6 bg-brand-ink text-white rounded-2xl flex items-center justify-center font-black italic shadow-lg">
               TRANG {page} / {totalPages}
            </div>
            <Button variant="outline" disabled={page === totalPages} onClick={() => setPage(page + 1)} className="rounded-2xl border-2 border-brand-border h-12 px-6 font-black bg-white shadow-lg shadow-black/5 hover:bg-brand-highlight active:scale-95 transition-all gap-2">
               Sau <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d1d1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #bbbbbb; }
      `}</style>
    </div>
  );
}
