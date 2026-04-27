import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, Search, RefreshCw, Mail, Calendar, User as UserIcon, Filter, ArrowUpDown, ChevronUp, ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { dateUtils } from '@/src/utils/formatters';

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await adminService.adminGetUsers({
        page,
        pageSize: 10,
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
    if (sortBy !== field) return <ArrowUpDown className="w-3.5 h-3.5 opacity-30" />;
    return isDescending ? <ChevronDown className="w-3.5 h-3.5 text-brand-primary" /> : <ChevronUp className="w-3.5 h-3.5 text-brand-primary" />;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-brand-ink tracking-tight uppercase italic flex items-center gap-3 font-heading">
             <Users className="w-8 h-8 text-brand-primary" />
             Quản lý Học sinh
          </h1>
          <p className="text-brand-secondary font-medium">Hiện có {totalItems} học viên trong hệ thống</p>
        </div>
        <Button onClick={fetchData} variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-brand-highlight text-brand-secondary">
          <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-brand-primary")} />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <Card className="lg:col-span-3 p-4 border-brand-border bg-white rounded-[2rem] shadow-sm">
            <form onSubmit={handleSearch} className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
              <input
                type="text" placeholder="Tìm học sinh theo tên, email hoặc username..."
                className="w-full h-16 pl-14 pr-4 bg-brand-highlight/20 border-2 border-transparent rounded-2xl font-bold text-base focus:border-brand-primary focus:bg-white transition-all outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-brand-ink text-white rounded-xl px-6 h-10 font-bold">Tìm kiếm</Button>
            </form>
         </Card>

         <Card className="lg:col-span-1 p-4 border-brand-border bg-white rounded-[2rem] shadow-sm flex items-center gap-3">
            <Filter className="w-5 h-5 text-brand-primary shrink-0 ml-2" />
            <select 
               className="w-full h-12 bg-transparent font-bold text-brand-ink outline-none appearance-none cursor-pointer"
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
         </Card>
      </div>

      <Card className="border border-brand-border bg-white rounded-[2.5rem] shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-highlight/30 border-b border-brand-border text-[10px] font-black uppercase tracking-widest text-brand-secondary">
                <th className="p-6 cursor-pointer hover:text-brand-primary transition-colors" onClick={() => toggleSort('FullName')}>
                  <div className="flex items-center gap-2">Học viên <SortIcon field="FullName" /></div>
                </th>
                <th className="p-6">Liên hệ</th>
                <th className="p-6 cursor-pointer hover:text-brand-primary transition-colors" onClick={() => toggleSort('CreatedAt')}>
                   <div className="flex items-center gap-2">Ngày gia nhập <SortIcon field="CreatedAt" /></div>
                </th>
                <th className="p-6">Trạng thái</th>
                <th className="p-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {loading && students.length === 0 ? (
                <tr><td colSpan={5} className="p-20 text-center"><RefreshCw className="w-10 h-10 animate-spin mx-auto text-brand-primary opacity-20" /></td></tr>
              ) : students.length === 0 ? (
                <tr><td colSpan={5} className="p-20 text-center font-bold text-brand-secondary italic">Không tìm thấy học sinh nào phù hợp.</td></tr>
              ) : students.map((s) => (
                <tr key={s.id} className="hover:bg-brand-highlight/5 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20 text-brand-primary">
                        <UserIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-brand-ink">{s.fullName}</p>
                        <p className="text-xs text-brand-secondary font-medium italic">@{s.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                      <Mail className="w-4 h-4 text-brand-secondary" />
                      {s.email}
                    </div>
                  </td>
                  <td className="p-6 text-sm font-medium text-slate-600 italic">
                    {dateUtils.formatDate(s.createdAt, 'dd/MM/yyyy')}
                  </td>
                  <td className="p-6">
                     <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border",
                        s.isActive ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                     )}>
                        {s.isActive ? "Hoạt động" : "Bị khóa"}
                     </span>
                  </td>
                  <td className="p-6 text-right">
                    <Button onClick={() => navigate(`/admin/students/${s.id}`)} variant="outline" className="rounded-xl border-brand-border text-xs font-bold hover:bg-brand-highlight h-9 px-4">Xem chi tiết</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-8 border-t border-brand-border flex items-center justify-between bg-brand-highlight/10">
          <p className="text-xs font-bold text-brand-secondary uppercase tracking-widest opacity-60">Trang {page} / {totalPages}</p>
          <div className="flex gap-2">
            <Button variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)} className="rounded-xl border-brand-border h-11 px-6 font-bold bg-white shadow-sm">Trước</Button>
            <Button variant="outline" disabled={page === totalPages} onClick={() => setPage(page + 1)} className="rounded-xl border-brand-border h-11 px-6 font-bold bg-white shadow-sm">Sau</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
