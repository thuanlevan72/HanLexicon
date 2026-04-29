import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
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
  RotateCcw,
  Cpu,
  Lock,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function SystemSettings() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-20 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 shrink-0">
        <div className="space-y-2">
           <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-brand-ink rounded-2xl flex items-center justify-center shadow-lg rotate-3">
                 <Settings className="w-8 h-8 text-brand-primary" />
              </div>
              <h1 className="text-4xl font-black text-brand-ink tracking-tight uppercase italic leading-none">{t('admin.settings')}</h1>
           </div>
           <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-brand-highlight text-brand-secondary font-black border-2 border-brand-border px-3 py-1">
                 CORE VERSION 2.0.4
              </Badge>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest italic">System Governance Control Panel</p>
           </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="h-14 px-8 rounded-2xl border-4 border-brand-border font-black uppercase text-[10px] tracking-widest gap-2 bg-white hover:bg-brand-highlight transition-all active:scale-95">
            <RotateCcw className="w-5 h-5 text-brand-primary" /> {t('admin.reset')}
          </Button>
          <Button className="bg-brand-ink text-white h-14 px-10 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl hover:bg-brand-primary transition-all hover:scale-105 active:scale-95 gap-3 border-4 border-brand-primary/20">
            <Save className="w-5 h-5 text-brand-primary" /> {t('admin.save')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Form Settings */}
        <div className="lg:col-span-8 space-y-10">
          {/* General Section */}
          <section className="space-y-6">
             <div className="flex items-center gap-4 px-2">
                <div className="w-8 h-8 bg-brand-highlight rounded-xl flex items-center justify-center border-2 border-brand-border">
                   <Globe className="w-4 h-4 text-brand-secondary" />
                </div>
                <h3 className="text-lg font-black text-brand-ink uppercase italic tracking-widest">{t('admin.basicInfo')}</h3>
             </div>
             <Card className="p-10 border-4 border-brand-border bg-white rounded-[3rem] shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-highlight/30 rounded-full -mr-16 -mt-16 blur-2xl opacity-50" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{t('admin.form.appNameLabel')} *</label>
                    <input 
                      type="text" 
                      defaultValue={t('admin.form.appTitle')}
                      className="w-full h-14 px-6 bg-brand-highlight/20 border-4 border-transparent focus:border-brand-primary focus:bg-white rounded-2xl transition-all font-black text-brand-ink outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{t('admin.form.defaultLangLabel')}</label>
                    <div className="relative">
                       <select className="w-full h-14 px-6 bg-brand-highlight/20 border-4 border-transparent focus:border-brand-primary focus:bg-white rounded-2xl transition-all font-black text-brand-ink outline-none appearance-none">
                         <option>{t('admin.form.vi')} (VN)</option>
                         <option>{t('admin.form.en')} (US)</option>
                       </select>
                       <Zap className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-primary pointer-events-none" />
                    </div>
                  </div>
                </div>
             </Card> section
          </section>

          {/* AI Configuration Section */}
          <section className="space-y-6">
             <div className="flex items-center gap-4 px-2">
                <div className="w-8 h-8 bg-brand-highlight rounded-xl flex items-center justify-center border-2 border-brand-border">
                   <Cpu className="w-4 h-4 text-brand-secondary" />
                </div>
                <h3 className="text-lg font-black text-brand-ink uppercase italic tracking-widest">AI Intelligence {t('admin.aiIntegration')}</h3>
             </div>
             <Card className="p-10 border-4 border-brand-border bg-white rounded-[3rem] shadow-xl space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 blur-2xl" />
                
                <div className="flex items-center justify-between p-8 bg-brand-highlight/10 rounded-[2.5rem] border-4 border-brand-border group hover:border-brand-primary transition-all relative z-10">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-3xl bg-brand-ink flex items-center justify-center shadow-2xl rotate-3 group-hover:rotate-0 transition-transform">
                         <Sparkles className="w-8 h-8 text-brand-primary" />
                      </div>
                      <div>
                         <p className="text-xl font-black text-brand-ink leading-none mb-2">Google Gemini API</p>
                         <Badge className="bg-emerald-500 text-white border-none font-black text-[9px] uppercase tracking-tighter">Active v1.5 Pro</Badge>
                      </div>
                   </div>
                   <Button variant="ghost" className="h-12 px-6 rounded-xl bg-white border-2 border-brand-border font-black text-[10px] uppercase tracking-widest hover:bg-brand-ink hover:text-white shadow-sm transition-all">{t('admin.form.aiConfig')}</Button>
                </div>

                <div className="flex items-center justify-between p-8 bg-slate-50/50 rounded-[2.5rem] border-4 border-dashed border-brand-border opacity-60 relative z-10">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-3xl bg-white border-2 border-brand-border flex items-center justify-center">
                         <Database className="w-8 h-8 text-slate-300" />
                      </div>
                      <div>
                         <p className="text-xl font-black text-slate-400 leading-none mb-2">Firebase Vector DB</p>
                         <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">{t('admin.form.syncInterval')}: Never</p>
                      </div>
                   </div>
                   <Badge variant="outline" className="h-10 px-4 rounded-xl border-2 border-brand-border font-black uppercase text-[10px] text-slate-300">Soon</Badge>
                </div>
             </Card>
          </section>
        </div>

        {/* Right Column: Security Toggles */}
        <div className="lg:col-span-4 space-y-10">
           <section className="space-y-6">
              <div className="flex items-center gap-4 px-2">
                 <div className="w-8 h-8 bg-brand-highlight rounded-xl flex items-center justify-center border-2 border-brand-border">
                    <Lock className="w-4 h-4 text-brand-secondary" />
                 </div>
                 <h3 className="text-lg font-black text-brand-ink uppercase italic tracking-widest">Bảo mật & Access</h3>
              </div>
              
              <Card className="border-4 border-brand-border bg-brand-ink text-white rounded-[3rem] p-10 space-y-10 relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/10 rounded-full -mr-24 -mt-24 blur-2xl" />
                 
                 <div className="space-y-8 relative z-10">
                    {[
                      { icon: Mail, label: t('admin.form.emailAuth'), desc: "Verify new login attempts", enabled: true },
                      { icon: Smartphone, label: t('admin.form.multiDevice'), desc: "Allow concurrent sessions", enabled: false },
                      { icon: Bell, label: t('admin.form.notifications'), desc: "Real-time audit alerts", enabled: true },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between group">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-primary/20 transition-all">
                               <item.icon className="w-5 h-5 text-brand-primary" />
                            </div>
                            <div>
                               <p className="text-sm font-black text-white uppercase tracking-tighter">{item.label}</p>
                               <p className="text-[10px] font-bold text-slate-400 italic">{item.desc}</p>
                            </div>
                         </div>
                         <div className={cn(
                           "w-14 h-7 rounded-full relative transition-all duration-500 cursor-pointer border-2",
                           item.enabled ? "bg-brand-primary border-brand-primary/20" : "bg-white/10 border-white/5"
                         )}>
                            <div className={cn(
                              "w-5 h-5 bg-white rounded-full shadow-xl transition-all duration-500 absolute top-0.5",
                              item.enabled ? "left-7" : "left-1"
                            )}></div>
                         </div>
                      </div>
                    ))}
                 </div>

                 <div className="pt-8 border-t border-white/5 space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">System Integrity Badge</p>
                    <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 shadow-inner">
                       <Shield className="w-8 h-8 text-emerald-400" />
                       <div>
                          <p className="text-xs font-black text-white leading-none">ISO 27001 Standard</p>
                          <p className="text-[9px] font-bold text-slate-500 mt-1 uppercase">Cloud Data Encryption Active</p>
                       </div>
                    </div>
                 </div>
              </Card>
           </section>

           <Card className="p-8 bg-brand-highlight/20 border-4 border-brand-border border-dashed rounded-[3rem] text-center space-y-4 shadow-inner">
              <Zap className="w-10 h-10 text-brand-primary mx-auto animate-pulse" />
              <h4 className="font-black text-brand-ink uppercase italic text-lg tracking-tighter">Cảnh báo hệ thống</h4>
              <p className="text-xs font-medium text-slate-500 leading-relaxed italic">
                 Các thay đổi trong phần Cài đặt Hệ thống có thể ảnh hưởng trực tiếp đến hiệu năng và tính ổn định của ứng dụng trên môi trường thực tế. Hãy kiểm tra kỹ trước khi nhấn Lưu.
              </p>
              <Button variant="ghost" className="w-full text-brand-primary font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-brand-highlight transition-all">
                 Xem Nhật ký Thay đổi <ArrowRight className="w-3.5 h-3.5" />
              </Button>
           </Card>
        </div>
      </div>
    </div>
  );
}
