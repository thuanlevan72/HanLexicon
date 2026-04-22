import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Settings, 
  Globe, 
  Bell, 
  Shield, 
  Database, 
  Cloud, 
  Mail,
  Smartphone,
  Save,
  RotateCcw
} from 'lucide-react';

export default function SystemSettings() {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-secondary tracking-tight">Cài Đặt Hệ Thống</h1>
          <p className="text-slate-500 font-medium">Cấu hình tham số vận hành cho toàn bộ ứng dụng.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 px-6 rounded-xl border-brand-border font-bold">
            <RotateCcw className="w-5 h-5 mr-2" /> Khôi phục
          </Button>
          <Button className="bg-brand-primary text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
            <Save className="w-5 h-5 mr-2" /> Lưu thay đổi
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* General Settings */}
        <Card className="p-8 border-brand-border bg-white space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-highlight flex items-center justify-center">
              <Globe className="w-6 h-6 text-brand-primary" />
            </div>
            <div>
              <h3 className="text-lg font-black text-brand-secondary">Thông tin cơ bản</h3>
              <p className="text-sm text-slate-500 font-medium">Tên ứng dụng và cấu hình hiển thị mặc định.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Tên ứng dụng</label>
              <input 
                type="text" 
                defaultValue="Tiếng Trung Leyi"
                className="w-full h-12 px-4 bg-brand-surface rounded-xl border border-transparent focus:border-brand-primary focus:bg-white transition-all font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Ngôn ngữ mặc định</label>
              <select className="w-full h-12 px-4 bg-brand-surface rounded-xl border border-transparent focus:border-brand-primary focus:bg-white transition-all font-bold appearance-none">
                <option>Tiếng Việt (Vietnam)</option>
                <option>English (International)</option>
              </select>
            </div>
          </div>
        </Card>

        {/* AI & Integration */}
        <Card className="p-8 border-brand-border bg-white space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
              <Cloud className="w-6 h-6 text-indigo-500" />
            </div>
            <div>
              <h3 className="text-lg font-black text-brand-secondary">Tích hợp AI & API</h3>
              <p className="text-sm text-slate-500 font-medium">Cấu hình kết nối với các dịch vụ thông minh.</p>
            </div>
          </div>

          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between p-4 bg-brand-surface rounded-2xl border border-dashed border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  <Settings className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <p className="text-sm font-black text-brand-secondary leading-none">Google Gemini API</p>
                  <p className="text-[10px] font-bold text-slate-400">Kết nối đang hoạt động (v1.5 Pro)</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="h-9 px-4 rounded-lg bg-white font-bold border-brand-border">Cấu hình</Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-brand-surface rounded-2xl border border-dashed border-slate-200 opacity-60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  <Database className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-black text-brand-secondary leading-none">Firebase Storage</p>
                  <p className="text-[10px] font-bold text-slate-400">Đồng bộ tự động mỗi 24h</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="h-9 px-4 rounded-lg bg-white font-bold border-brand-border">Cấu hình</Button>
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-8 border-brand-border bg-white space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center">
              <Shield className="w-6 h-6 text-rose-500" />
            </div>
            <div>
              <h3 className="text-lg font-black text-brand-secondary">Bảo mật & Quyền truy cập</h3>
              <p className="text-sm text-slate-500 font-medium">Giới hạn truy cập và quy tắc kiểm soát người dùng.</p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
             {[
               { icon: Mail, label: 'Xác thực Email bắt buộc', desc: 'Người dùng phải xác nhận email để kích hoạt tài khoản.', enabled: true },
               { icon: Smartphone, label: 'Đăng nhập đa thiết bị', desc: 'Cho phép đăng nhập trên máy tính và điện thoại cùng lúc.', enabled: false },
               { icon: Bell, label: 'Thông báo hệ thống', desc: 'Gửi thông báo đẩy khi có bài học hoặc sự kiện mới.', enabled: true },
             ].map((item, idx) => (
               <div key={idx} className="flex items-center justify-between py-2 border-b border-brand-border/30 last:border-0">
                 <div className="flex items-center gap-4">
                   <item.icon className="w-5 h-5 text-slate-400" />
                   <div>
                     <p className="text-sm font-bold text-brand-secondary">{item.label}</p>
                     <p className="text-[11px] font-medium text-slate-400">{item.desc}</p>
                   </div>
                 </div>
                 <div className={cn(
                   "w-12 h-6 rounded-full relative transition-all duration-300 cursor-pointer p-1",
                   item.enabled ? "bg-brand-primary" : "bg-slate-200"
                 )}>
                    <div className={cn(
                      "w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300",
                      item.enabled ? "translate-x-6" : "translate-x-0"
                    )}></div>
                 </div>
               </div>
             ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
