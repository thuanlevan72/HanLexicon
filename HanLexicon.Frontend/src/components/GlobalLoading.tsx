import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function GlobalLoading({ message = "Đang chuẩn bị không gian học tập..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-highlight rounded-full -mr-48 -mt-48 blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary rounded-full -ml-48 -mb-48 blur-3xl opacity-10 animate-pulse"></div>

      <div className="relative flex flex-col items-center gap-8">
        {/* Animated Logo Container */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.1, 1],
            rotate: [0, 5, -5, 0],
            opacity: 1 
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="w-24 h-24 bg-white border-4 border-brand-primary rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-brand-primary/30 p-2 overflow-hidden"
        >
          <img src="/images/logo/2.png" alt="Logo" className="w-full h-full object-contain" />
        </motion.div>

        {/* Text and Progress */}
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-black text-brand-ink uppercase tracking-widest font-heading"
          >
            Tiếng Trung Leyi
          </motion.h2>
          
          <div className="space-y-2">
            <p className="text-xs font-bold text-brand-secondary uppercase tracking-[0.3em] animate-pulse">
              {message}
            </p>
            {/* Custom high-end progress bar */}
            <div className="w-48 h-1 bg-brand-highlight rounded-full overflow-hidden mx-auto">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ 
                  duration: 1.2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-full h-full bg-brand-primary shadow-[0_0_10px_#FF4D4D]"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Branding */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        className="absolute bottom-10 text-[10px] font-black uppercase tracking-[0.5em] text-brand-ink"
      >
        Your Path to Fluency
      </motion.p>
    </div>
  );
}
