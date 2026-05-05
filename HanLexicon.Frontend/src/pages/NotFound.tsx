import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, SearchX, Sparkles } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6 relative overflow-hidden theme-app">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-highlight rounded-full -mr-64 -mt-64 blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-primary rounded-full -ml-64 -mb-64 blur-3xl opacity-10"></div>

      <div className="max-w-2xl w-full text-center relative z-10 space-y-12">
        {/* Animated 404 Illustration */}
        <div className="relative inline-block">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="text-[12rem] md:text-[18rem] font-black text-brand-ink leading-none opacity-5 select-none"
          >
            404
          </motion.div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-48 h-48 bg-white rounded-[3.5rem] border-8 border-brand-border shadow-2xl flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-brand-highlight/20 animate-pulse"></div>
              <SearchX className="w-24 h-24 text-brand-primary relative z-10" />
              <Sparkles className="absolute top-4 right-4 w-6 h-6 text-brand-accent animate-bounce" />
            </motion.div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-black text-brand-ink tracking-tight uppercase italic"
          >
            Trang này đã "đi lạc" rồi!
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-brand-secondary font-bold max-w-md mx-auto"
          >
            Có vẻ như đường dẫn bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển sang một cấp độ khác.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto h-16 px-10 rounded-2xl border-2 border-brand-border font-black uppercase text-xs tracking-widest gap-3 hover:bg-brand-highlight transition-all"
          >
            <ArrowLeft className="w-5 h-5" /> Quay lại trang cũ
          </Button>
          <Button 
            onClick={() => navigate('/')}
            className="w-full sm:w-auto h-16 px-12 rounded-2xl bg-brand-ink text-white font-black uppercase text-xs tracking-widest gap-3 shadow-xl hover:scale-105 transition-all"
          >
            <Home className="w-5 h-5 text-brand-primary" /> Về trang chủ
          </Button>
        </motion.div>

        {/* Footer Branding */}
        <div className="pt-12">
           <img src="/images/logo/2.png" alt="Logo" className="h-10 mx-auto opacity-20 grayscale" />
        </div>
      </div>
    </div>
  );
}
