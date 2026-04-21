import { motion } from 'motion/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Languages,
  MessageSquare,
  Trophy,
  Users,
  Search,
  CheckCircle2,
  ArrowRight,
  Play,
  Volume2,
  PenTool,
  Star,
  Youtube,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const features = [
  {
    icon: <BookOpen className="w-8 h-8 text-emerald-600" />,
    title: "Giáo trình HSK",
    description: "Học theo chuẩn HSK quốc tế từ cấp độ 1 đến 6, phù hợp với mọi trình độ.",
    count: "150 bài",
    color: "bg-emerald-50"
  },
  {
    icon: <Search className="w-8 h-8 text-amber-600" />,
    title: "Từ vựng chủ đề",
    description: "Hệ thống từ vựng được phân loại theo chủ đề, dễ học và ghi nhớ.",
    count: "80 bài",
    color: "bg-amber-50"
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-sky-600" />,
    title: "Hội thoại",
    description: "Luyện tập hội thoại thực tế với các tình huống giao tiếp hàng ngày.",
    count: "120 bài",
    color: "bg-sky-50"
  },
  {
    icon: <Languages className="w-8 h-8 text-indigo-600" />,
    title: "Đọc hiểu",
    description: "Nâng cao khả năng đọc hiểu với các bài văn từ cơ bản đến nâng cao.",
    count: "90 bài",
    color: "bg-indigo-50"
  },
  {
    icon: <Trophy className="w-8 h-8 text-rose-600" />,
    title: "Luyện thi",
    description: "Đề thi thử HSK với hệ thống chấm điểm tự động và phân tích chi tiết.",
    count: "60 bài",
    color: "bg-rose-50"
  },
  {
    icon: <PenTool className="w-8 h-8 text-teal-600" />,
    title: "Bộ thủ",
    description: "Học 214 bộ thủ cơ bản giúp nhận biết và viết chữ Hán chính xác.",
    count: "30 bài",
    color: "bg-teal-50"
  }
];

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden font-sans scroll-smooth">
      {/* Sticky Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-brand-border">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-brand-primary w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">文</div>
            <span className="font-heading font-black text-brand-secondary text-xl tracking-tight hidden sm:block">MandarinFlow</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm font-black text-brand-secondary/70 hover:text-brand-primary transition-colors uppercase tracking-widest">Trang chủ</a>
            <a href="#courses" className="text-sm font-black text-brand-secondary/70 hover:text-brand-primary transition-colors uppercase tracking-widest">Khóa học</a>
            <a href="#community" className="text-sm font-black text-brand-secondary/70 hover:text-brand-primary transition-colors uppercase tracking-widest">Cộng đồng</a>
            <a href="#contact" className="text-sm font-black text-brand-secondary/70 hover:text-brand-primary transition-colors uppercase tracking-widest">Liên hệ</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-black text-brand-secondary hover:text-brand-primary px-4 hidden sm:block">Đăng nhập</Link>
            <Link to="/register" className={cn(buttonVariants({ size: "sm" }), "bg-brand-secondary hover:bg-brand-primary text-white rounded-xl px-6 font-bold shadow-lg border-0 h-10")}>
              Thử miễn phí
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Tree Theme */}
      <section id="home" className="relative pt-32 pb-24 md:pt-40 md:pb-40 bg-brand-bg overflow-hidden text-brand-ink scroll-mt-20">
        {/* Decorative Tree Background Element */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <img
            src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Khu rừng xanh mướt - Cảm hứng từ Ghibli"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-surface text-brand-secondary text-sm font-bold border border-brand-border">
              <Star className="w-4 h-4 fill-brand-primary text-brand-primary" />
              <span>Khu Vườn Của Nga ✨</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-brand-secondary leading-[1.1] tracking-tight font-heading">
              Học Tiếng Trung <br />
              <span className="text-brand-primary">Không Nhàm Chán</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed font-semibold">
              Học Thật • Thi Thật • Ứng Dụng Thật. Hệ thống học tập chuẩn HSK quốc tế qua phương pháp Gamification đầy thú vị.
            </p>

            {/* Dictionary Search Bar - Addressing the "UI bug" and user dictionary request */}
            <div className="relative max-w-md group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Tra từ vựng HSK ngay..."
                className="w-full h-16 pl-12 pr-4 bg-white border-2 border-brand-border rounded-[2rem] text-brand-secondary font-bold focus:outline-none focus:border-brand-primary shadow-lg transition-all"
              />
              <div className="absolute right-2 top-2">
                <Button className="h-12 rounded-full bg-brand-secondary hover:bg-brand-primary text-white font-bold px-6 border-0">
                  Tìm
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register" className={cn(buttonVariants({ size: "lg" }), "bg-brand-secondary hover:bg-brand-primary text-white rounded-2xl px-10 h-16 text-lg font-bold shadow-xl shadow-brand-secondary/20 group border-0")}>
                Bắt đầu học ngay <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Button variant="outline" size="lg" className="rounded-2xl px-10 h-16 text-lg border-brand-border text-brand-secondary font-bold hover:bg-brand-highlight">
                Khám phá khóa học
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            {/* Teacher Nga Image Focal Point - Using high quality asset */}
            <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group bg-slate-100">
              <img
                src="images/anh-nga.jpg"
                alt="Meet Teacher Nga - MandarinFlow Creator"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/80 via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white p-6 backdrop-blur-xl bg-white/10 rounded-[2rem] border border-white/20 shadow-2xl">
                <h2 className="text-2xl font-black mb-1">Cô Nga Mandarin</h2>
                <p className="text-sm font-bold opacity-90 leading-tight">Tốt nghiệp NEU, Đạt HSK 6 & HSKK Cao cấp • Tâm huyết với tiếng Trung 🌿</p>
              </div>
            </div>

            {/* Floating Accents */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-primary/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-brand-accent/30 rounded-full blur-3xl animate-bounce duration-[4000ms]"></div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid with SEO Heading */}
      <section className="py-24 container mx-auto px-4 scroll-mt-20" id="courses">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <Badge className="bg-brand-highlight text-brand-secondary border border-brand-border px-6 py-2 font-black rounded-full uppercase text-[10px] tracking-widest">Hệ sinh thái học tập bài bản</Badge>
          <h2 className="text-4xl md:text-5xl font-black text-brand-secondary leading-tight font-heading">
            Tất cả những gì bạn cần để <br />
            <span className="text-brand-primary underline decoration-brand-accent decoration-4 underline-offset-8">thành thạo tiếng Trung</span>
          </h2>
          <p className="text-slate-600 font-semibold text-lg">
            Học HSK 1-6 bài bản qua các chuyên mục được thiết kế khoa học, tối ưu lộ trình cho người bận rộn.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={fadeInUp}>
              <Card className="p-8 h-full bg-white hover:bg-brand-highlight transition-all duration-300 border-brand-border group cursor-pointer relative overflow-hidden rounded-[2.5rem] shadow-sm">
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black text-brand-secondary mb-3 tracking-tight font-heading">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-semibold">
                  {feature.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-brand-border/40">
                  <span className="text-[11px] font-black text-brand-primary uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> {feature.count}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-brand-surface flex items-center justify-center group-hover:bg-brand-secondary group-hover:text-white transition-all transform group-hover:rotate-12 shadow-sm">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Community Connection Section */}
      <section className="py-24 bg-brand-surface border-y border-brand-border scroll-mt-20" id="community">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black text-brand-secondary font-heading leading-tight italic">
                Cùng Giao Lưu Với Nga Nhé! 🌿
              </h2>
              <p className="text-lg text-slate-600 font-semibold leading-relaxed">
                Bạn có câu hỏi, thắc mắc về lộ trình học, hay đơn giản là muốn chia sẻ niềm vui? Kết nối ngay qua các nền tảng mạng xã hội:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    name: 'TikTok',
                    platform: '@studyhskwithnga',
                    icon: <Play className="w-6 h-6 fill-white text-white" />,
                    gradient: 'bg-black',
                    url: 'https://www.tiktok.com/@studyhskwithnga'
                  },
                  {
                    name: 'YouTube',
                    platform: 'Nga Học HSK',
                    icon: <Youtube className="w-6 h-6 text-white" />,
                    gradient: 'bg-[#FF0000]',
                    url: 'https://youtube.com/@NguyenNgaHsk'
                  },
                  {
                    name: 'Zalo',
                    platform: '0979.393.427',
                    icon: <MessageCircle className="w-6 h-6 text-white fill-white" />,
                    gradient: 'bg-[#0068FF]',
                    url: 'https://zalo.me/0979393427'
                  },
                ].map((social) => (
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={social.name}
                    className="p-6 text-center rounded-[2.5rem] border-brand-border hover:shadow-2xl transition-all bg-white group hover:-translate-y-2 block relative overflow-hidden"
                  >
                    <div className={`w-14 h-14 ${social.gradient} rounded-[1.2rem] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      {social.icon}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">{social.name}</p>
                    <p className="text-sm font-black text-brand-secondary">{social.platform}</p>
                    <ExternalLink className="absolute top-4 right-4 w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-10 relative">
              {/* TikTok QR */}
              <div className="w-56 bg-white p-6 rounded-[3rem] shadow-2xl border-brand-border rotate-[-4deg] hover:rotate-0 transition-all duration-500 hover:scale-105 group">
                <div className="w-full aspect-square bg-slate-50 rounded-2xl flex items-center justify-center mb-6 overflow-hidden border border-slate-100">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://www.tiktok.com/@studyhskwithnga"
                    alt="TikTok QR"
                    className="w-full h-full object-cover p-2"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-center uppercase tracking-widest text-slate-400">Kết nối</p>
                  <p className="text-sm font-black text-center text-brand-secondary">QUÉT QR TIKTOK</p>
                </div>
              </div>

              {/* Zalo QR */}
              <div className="w-56 bg-white p-6 rounded-[3rem] shadow-2xl border-brand-border rotate-[4deg] hover:rotate-0 transition-all duration-500 hover:scale-105 group mt-12 sm:mt-20">
                <div className="w-full aspect-square bg-slate-50 rounded-2xl flex items-center justify-center mb-6 overflow-hidden border border-slate-100">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://zalo.me/0979393427"
                    alt="Zalo QR"
                    className="w-full h-full object-cover p-2"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-center uppercase tracking-widest text-slate-400">Tư vấn</p>
                  <p className="text-sm font-black text-center text-brand-secondary">QUÉT QR ZALO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="py-32 bg-brand-secondary relative overflow-hidden scroll-mt-20">
        <div className="absolute right-[-10%] bottom-[-10%] w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center space-y-12">
          <div className="space-y-6">
            <Badge className="bg-brand-primary text-white border-0 px-6 py-2 rounded-full uppercase text-[10px] tracking-widest font-black shadow-lg">🚀 Chinh Phục HSK Ngay</Badge>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight font-heading">Sẵn sàng bước vào Khu Vườn?</h2>
            <p className="text-white/80 max-w-2xl mx-auto text-xl font-semibold leading-relaxed">
              Tham gia cùng hàng ngàn học viên đang học tiếng Trung hiệu quả với MandarinFlow.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Link to="/register" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto h-20 px-12 rounded-[2rem] bg-brand-primary hover:bg-brand-accent text-xl font-black shadow-2xl shadow-brand-primary/40 text-brand-secondary transition-all hover:scale-105 border-0 flex items-center justify-center")}>
              Đăng ký học miễn phí
            </Link>
            <Link to="/courses" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto h-20 px-12 rounded-[2rem] border-0 bg-white text-brand-secondary hover:bg-brand-highlight text-xl font-black shadow-xl transition-all hover:scale-105 flex items-center justify-center")}>
              Xem các bài học <ArrowRight className="w-6 h-6 ml-3" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-white border-t border-brand-border text-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-brand-primary w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-brand-primary/20 shadow-lg">文</div>
            <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">© 2026 MandarinFlow • Khu Vườn Của Nga • Crafted with Heart</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
