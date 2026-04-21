import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Users,
  Library,
  TrendingUp,
  CreditCard,
  ArrowUpRight,
  UserPlus,
  BookMarked,
  Activity,
  Plus
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const adminStats = [
  { label: 'Tổng Học Viên', value: '1,248', change: '+12%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Bài học đã đăng', value: '450', change: '+5%', icon: Library, color: 'text-purple-500', bg: 'bg-purple-50' },
  { label: 'Từ vựng Hanzi', value: '3,200', change: '+8%', icon: BookMarked, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { label: 'Doanh thu (tháng)', value: '$5,240', change: '+15%', icon: CreditCard, color: 'text-amber-500', bg: 'bg-amber-50' },
];

const recentUsers = [
  { name: 'Hoàng Anh', email: 'anh.hoang@gmail.com', date: '2 phút trước', status: 'Active' },
  { name: 'Minh Thư', email: 'thu.minh@gmail.com', date: '15 phút trước', status: 'New' },
  { name: 'Quốc Bảo', email: 'bao.quoc@gmail.com', date: '1 giờ trước', status: 'Active' },
  { name: 'Linh Chi', email: 'chi.linh@gmail.com', date: '3 giờ trước', status: 'Inactive' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Thống Kê Hệ Thống</h1>
          <p className="text-slate-500 font-medium">Chào mừng trở lại, đây là những gì đang diễn ra hôm nay.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl font-bold">Xuất báo cáo</Button>
          <Button className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-100 flex items-center gap-2">
            <Plus className="w-5 h-5" /> Bài học mới
          </Button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="border-0 shadow-sm hover:shadow-md transition-all group overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", stat.bg)}>
                    <stat.icon className={cn("w-6 h-6", stat.color)} />
                  </div>
                  <Badge className="bg-emerald-50 text-emerald-600 border-0 flex items-center gap-1 font-bold">
                    <TrendingUp className="w-3 h-3" /> {stat.change}
                  </Badge>
                </div>
                <div className="mt-6 space-y-1">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Chart Mockup */}
        <Card className="lg:col-span-2 border-0 shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Hoạt động luyện tập</CardTitle>
              <CardDescription>Số câu trả lời đúng trong 7 ngày qua</CardDescription>
            </div>
            <Activity className="w-5 h-5 text-slate-400" />
          </CardHeader>
          <CardContent className="h-[300px] flex items-end justify-between gap-4 pt-10 px-8">
            {[45, 62, 58, 85, 42, 70, 92].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                <div className="w-full relative h-[250px] flex items-end">
                   <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="w-full bg-blue-100 group-hover:bg-blue-600 rounded-t-xl transition-all relative overflow-hidden"
                   >
                     <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   </motion.div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Day {i + 1}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Users List */}
        <Card className="border-0 shadow-sm flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Người dùng mới</CardTitle>
            <UserPlus className="w-5 h-5 text-slate-400" />
          </CardHeader>
          <CardContent className="flex-1 space-y-6">
            {recentUsers.map((user) => (
              <div key={user.email} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-slate-100">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={cn(
                    "text-[10px] font-bold uppercase",
                    user.status === 'New' ? "text-blue-600 border-blue-100 bg-blue-50" :
                    user.status === 'Active' ? "text-emerald-600 border-emerald-100 bg-emerald-50" :
                    "text-slate-400 border-slate-100 bg-slate-50"
                  )}>
                    {user.status}
                  </Badge>
                  <p className="text-[10px] text-slate-400 mt-1">{user.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="p-6 pt-0 mt-auto">
            <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold group">
              Xem tất cả người dùng <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
