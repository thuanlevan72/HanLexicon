import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Users, BookOpen, Layers, Terminal, Database, 
  Plus, Settings, Command, X, ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const actions = [
    { name: 'Thêm học sinh mới', icon: Users, shortcut: 'A S', path: '/admin/students' },
    { name: 'Quản lý từ vựng', icon: BookOpen, shortcut: 'V M', path: '/admin/vocabularies' },
    { name: 'Logs hệ thống', icon: Terminal, shortcut: 'L G', path: '/admin/logs' },
    { name: 'Import dữ liệu', icon: Database, shortcut: 'I D', path: '/admin/jobs' },
    { name: 'Danh mục bài học', icon: Layers, shortcut: 'C T', path: '/admin/categories' },
  ];

  const filteredActions = actions.filter(action => 
    action.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleAction = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[10vh] px-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-brand-ink/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-white rounded-[2rem] border-2 border-brand-border shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b-2 border-brand-border flex items-center gap-4">
              <Search className="w-6 h-6 text-brand-primary" />
              <input 
                autoFocus
                placeholder="Gõ lệnh hoặc tìm kiếm nhanh... (Ctrl + K)"
                className="flex-1 bg-transparent border-none outline-none text-xl font-bold text-brand-ink placeholder:text-slate-300"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <div className="flex items-center gap-1 bg-brand-highlight px-2 py-1 rounded-lg border border-brand-border">
                <Command className="w-3 h-3 text-brand-secondary" />
                <span className="text-[10px] font-black text-brand-secondary uppercase">K</span>
              </div>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {filteredActions.length === 0 ? (
                <div className="p-10 text-center space-y-2">
                   <p className="font-bold text-slate-400 italic text-lg">Không tìm thấy lệnh nào khớp với "{query}"</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Lệnh phổ biến</p>
                  {filteredActions.map((action, idx) => (
                    <button
                      key={action.name}
                      onClick={() => handleAction(action.path)}
                      className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-brand-highlight transition-all group text-left border-2 border-transparent hover:border-brand-primary/20"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl border-2 border-brand-border flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm">
                           <action.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-black text-brand-ink text-lg">{action.name}</p>
                          <p className="text-xs text-brand-secondary font-bold uppercase tracking-tighter opacity-60">Chuyển hướng nhanh</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-brand-border group-hover:text-brand-primary transition-all group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-brand-highlight/30 border-t-2 border-brand-border flex items-center justify-between">
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                     <span className="bg-white px-1.5 py-0.5 rounded border border-brand-border text-[9px] font-black">ENTER</span>
                     <span className="text-[9px] font-bold text-slate-400 uppercase">Chọn</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="bg-white px-1.5 py-0.5 rounded border border-brand-border text-[9px] font-black">ESC</span>
                     <span className="text-[9px] font-bold text-slate-400 uppercase">Thoát</span>
                  </div>
               </div>
               <p className="text-[10px] font-black text-brand-primary italic tracking-tight uppercase">HanLexicon Power Console</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
