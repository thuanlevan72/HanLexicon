
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar?: string;
  level?: string;
}

export interface Vocabulary {
  id: string;
  word: string;
  pinyin: string;
  meaning_vn: string;
  meaning_en: string;
  level: 'HSK 1' | 'HSK 2' | 'HSK 3' | 'HSK 4' | 'HSK 5' | 'HSK 6';
  image: string;
  example_cn?: string;
  example_vn?: string;
}

export interface LearningHistory {
  id: string;
  userId: string;
  vocabularyId?: string;
  lessonId?: string;
  type: 'word' | 'lesson' | 'quiz';
  score?: number;
  timestamp: string;
  content: string; // e.g., "Learned '你好'", "Completed Quiz: Unit 1"
}

// Mock Data
const MOCK_VOCAB: Vocabulary[] = [
  {
    id: '1',
    word: '你好',
    pinyin: 'nǐ hǎo',
    meaning_vn: 'Xin chào',
    meaning_en: 'Hello',
    level: 'HSK 1',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=400',
    example_cn: '你好，很高兴认识你。',
    example_vn: 'Xin chào, rất vui được làm quen với bạn.'
  },
  {
    id: '2',
    word: '谢谢',
    pinyin: 'xièxie',
    meaning_vn: 'Cảm ơn',
    meaning_en: 'Thank you',
    level: 'HSK 1',
    image: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=80&w=400',
    example_cn: '谢谢你的帮助。',
    example_vn: 'Cảm ơn sự giúp đỡ của bạn.'
  },
  {
    id: '3',
    word: '学习',
    pinyin: 'xuéxí',
    meaning_vn: 'Học tập',
    meaning_en: 'Study / Learn',
    level: 'HSK 2',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '4',
    word: '快乐',
    pinyin: 'kuàilè',
    meaning_vn: 'Hạnh phúc / Vui vẻ',
    meaning_en: 'Happy',
    level: 'HSK 3',
    image: 'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '5',
    word: '进步',
    pinyin: 'jìnbù',
    meaning_vn: 'Tiến bộ',
    meaning_en: 'Progress',
    level: 'HSK 4',
    image: 'https://images.unsplash.com/photo-1491336477066-31156b5e4f35?auto=format&fit=crop&q=80&w=400',
  }
];

const MOCK_HISTORY: LearningHistory[] = [
  {
    id: 'h1',
    userId: '1',
    type: 'word',
    vocabularyId: '1',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    content: "Đã học từ '你好'"
  },
  {
    id: 'h2',
    userId: '1',
    type: 'quiz',
    score: 80,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    content: "Hoàn thành bài Quiz: Chào hỏi cơ bản"
  },
  {
    id: 'h3',
    userId: '1',
    type: 'lesson',
    lessonId: '1',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    content: "Đã hoàn thành bài học: Giới thiệu bản thân"
  }
];

// Mock API Service
export const api = {
  getVocabulary: async (search?: string, level?: string): Promise<Vocabulary[]> => {
    await new Promise(r => setTimeout(r, 500)); // Simulate delay
    let filtered = [...MOCK_VOCAB];
    if (search) {
      filtered = filtered.filter(v => 
        v.word.includes(search) || 
        v.meaning_vn.toLowerCase().includes(search.toLowerCase()) ||
        v.meaning_en.toLowerCase().includes(search.toLowerCase()) ||
        v.pinyin.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (level && level !== 'Tất cả') {
      filtered = filtered.filter(v => v.level === level);
    }
    return filtered;
  },

  getHistory: async (userId: string): Promise<LearningHistory[]> => {
    await new Promise(r => setTimeout(r, 600));
    return MOCK_HISTORY.filter(h => h.userId === userId);
  },

  importExcel: async (file: File): Promise<{ success: boolean; message: string; count?: number }> => {
    await new Promise(r => setTimeout(r, 2000)); // Simulate processing
    return { 
      success: true, 
      message: 'Nhập dữ liệu thành công!', 
      count: 150 // Mocked count
    };
  },

  updateUserProfile: async (userId: string, data: Partial<User>): Promise<User> => {
    await new Promise(r => setTimeout(r, 800));
    return {
      id: userId,
      name: data.name || 'Demo User',
      email: data.email || 'demo@user.com',
      role: 'student',
      ...data
    };
  }
};
