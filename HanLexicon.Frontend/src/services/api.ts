import { apiClient } from './apiClient';

// --- Kiểu dữ liệu đồng bộ với Backend ---
export interface ApiResponse<T> {
  isSuccess: boolean;
  statusCode: number;
  message: string;
  data: T;
  errors: string[] | null;
}

export interface PaginatedResult<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface Vocabulary {
  id: string;
  lessonId: string;
  word: string;
  pinyin: string;
  meaning_vn: string;
  meaning_en?: string;
  audio?: string;
  image?: string;
  example_cn?: string;
  example_py?: string;
  example_vn?: string;
  sortOrder: number;
  level?: string;
}

export interface UserStats {
  totalPoints: number;
  avgScore: number;
  lessonsCompleted: number;
  timeSpentS: number;
  lastPlayed: string;
}

export interface LearningHistory {
  id: string;
  lessonId: string;
  lessonName: string;
  score: number;
  totalQuizzes: number;
  completedAt: string;
  type: 'word' | 'lesson' | 'quiz';
  timestamp: string;
  content: string;
}

export interface QuizOption {
  optionText: string;
  isCorrect: boolean;
}

export interface Quiz {
  id: string;
  question: string;
  explanation?: string;
  difficulty: number;
  options: QuizOption[];
  audio?: string;
}

export interface HanziCard {
  id: string;
  character: string;
  pinyin: string;
  meaning: string;
  strokeCount: number;
  radical: string;
  mnemonic?: string;
}

export interface LessonDetail {
  id: string;
  titleCn: string;
  titleVn?: string;
  filename: string;
  hanziCards: HanziCard[];
  quizzes: Quiz[];
}

// Interface phục vụ chọn bài học
export interface LessonFlat {
  id: string;
  title: string;
  level: string;
}

export interface Category {
  id: string;
  categoryName: string;
  categorySlug: string;
  items: any[];
}

export interface ImportJob {
  id: string;
  status: 'Pending' | 'Processing' | 'Completed' | 'Failed';
  fileName: string;
  totalRows: number;
  processedRows: number;
  failedRows: number;
  errorLog?: string;
  createdAt: string;
  finishedAt?: string;
}

// --- DỊCH VỤ QUẢN TRỊ ---
export const adminService = {
  getVocabularies: async (params: { search?: string, categoryId?: number, lessonId?: string, page: number, pageSize: number }): Promise<ApiResponse<PaginatedResult<Vocabulary>>> => {
    const response: ApiResponse<PaginatedResult<any>> = await apiClient.get('/admin/vocabularies', { params });
    const mappedItems = response.data.items.map(v => ({
      id: v.id,
      lessonId: v.lessonId,
      word: v.word,
      pinyin: v.pinyin,
      meaning_vn: v.meaning,
      meaning_en: v.meaningEn,
      audio: v.audioUrl,
      image: v.imageUrl,
      example_cn: v.exampleCn,
      example_py: v.examplePy,
      example_vn: v.exampleVn,
      sortOrder: v.sortOrder || 0,
      level: v.lesson 
        ? `${v.lesson.titleCn} + ${v.lesson.titleVn}${v.lesson.description ? ' + ' + v.lesson.description : ''}` 
        : "Chưa gắn bài học"
    }));
    return { ...response, data: { ...response.data, items: mappedItems } };
  },
  createVocabulary: (data: any) => apiClient.post('/admin/vocabularies', data),
  updateVocabulary: (id: string, data: any) => apiClient.put(`/admin/vocabularies/${id}`, data),
  deleteVocabulary: (id: string) => apiClient.delete(`/admin/vocabularies/${id}`),
  getAllImportJobs: (page: number = 1) => apiClient.get('/admin/vocabularies/jobs', { params: { page, pageSize: 10 } }),
  getImportStats: async (): Promise<ApiResponse<any>> => {
    const response: ApiResponse<any> = await apiClient.get('/admin/dashboard/import-stats');
    const raw = response.data || {};
    return { ...response, data: {
      total: (raw.total !== undefined ? raw.total : raw.Total) || 0,
      pending: (raw.pending !== undefined ? raw.pending : raw.Pending) || 0,
      processing: (raw.processing !== undefined ? raw.processing : raw.Processing) || 0,
      completed: (raw.completed !== undefined ? raw.completed : raw.Completed) || 0,
      failed: (raw.failed !== undefined ? raw.failed : raw.Failed) || 0
    }};
  },
  getImportStatus: (id: string) => apiClient.get(`/admin/vocabularies/import-status/${id}`),
  importVocabularies: (file: File) => {
    const formData = new FormData();
    formData.append('excelFile', file);
    return apiClient.post('/admin/vocabularies/import', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  }
};

// --- CÁC DỊCH VỤ KHÁC ---
export const authService = {
  login: (data: any): Promise<ApiResponse<LoginResponse>> => apiClient.post('/auth/login', data),
  logout: (token: string) => apiClient.post('/auth/logout', { clientRefreshToken: token })
};

// --- DỊCH VỤ TỪ ĐIỂN (HỌC VIÊN) ---
export const dictionaryService = {
  getVocabularies: async (params: { search?: string, level?: string, page: number, pageSize: number }): Promise<ApiResponse<PaginatedResult<Vocabulary>>> => {
    const response: ApiResponse<PaginatedResult<any>> = await apiClient.get('/dictionary', { params });
    const mappedItems = response.data.items.map(v => ({
      id: v.id,
      word: v.word,
      pinyin: v.pinyin,
      meaning_vn: v.meaning,
      meaning_en: v.meaningEn,
      level: v.lesson?.category?.name || "HSK",
      image: v.imageUrl,
      audio: v.audioUrl,
      example_cn: v.exampleCn,
      example_vn: v.exampleVn
    }));
    return { ...response, data: { ...response.data, items: mappedItems } };
  },
  search: (query: string) => dictionaryService.getVocabularies({ search: query, page: 1, pageSize: 50 })
};

export const learningService = {
  getLessons: async (): Promise<Category[]> => {
    const res = await apiClient.get('/learning/catalog');
    return res.data.data; // Backend trả về ApiResponse<T>, dữ liệu nằm trong trường .data của đối tượng trả về
  },
  // Hàm lấy bài học phẳng phục vụ Dropdown
  getLessonsFlat: async (): Promise<LessonFlat[]> => {
    const cats = await learningService.getLessons();
    if (!cats || !Array.isArray(cats)) return [];
    
    const list: LessonFlat[] = [];
    cats.forEach(c => {
      if (!c.items) return;
      c.items.forEach(i => {
        // Lấy ID: Ưu tiên id, sau đó đến link
        const rawId = i.id || (i.link?.includes('/') ? i.link.split('/').pop()?.replace('.html', '') : i.link);
        
        if (rawId) { 
          list.push({
            id: rawId,
            title: i.title || i.titleCn || "Không tên",
            level: c.categoryName
          });
        }
      });
    });
    return list;
  },
  getLessonDetail: async (id: string): Promise<LessonDetail> => (await apiClient.get(`/learning/lessons/${id}/vocabularies`)).data,
  saveProgress: (data: any) => apiClient.post('/study-progress/lessons', data)
};

export const userService = {
  getStats: async (): Promise<UserStats> => (await apiClient.get('/profile/analytics')).data,
  getHistory: async (): Promise<LearningHistory[]> => (await apiClient.get('/profile/vocabulary-mastery')).data
};

export const api = {
  getVocabulary: async (query?: string, level?: string) => {
    const res = await adminService.getVocabularies({ search: query, page: 1, pageSize: 200 });
    let data = res.data.items;
    if (level && level !== 'Tất cả') data = data.filter(w => w.level === level);
    return data;
  }
};
