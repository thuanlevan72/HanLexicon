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
  lessonTitle?: string;
  word: string;
  pinyin: string;
  meaning: string;
  meaningEn?: string;
  audioUrl?: string;
  imageUrl?: string;
  exampleCn?: string;
  examplePy?: string;
  exampleVn?: string;
  sortOrder: number;
}
export interface UserStats {
  totalPoints: number;
  avgScore: number;
  lessonsCompleted: number;
  timeSpentS: number;
  lastPlayed: string;
  recentActivities?: any[];
}

export interface LearningHistory {
  lessonId: string;
  lessonName: string;
  categoryName: string;
  score: number;
  completed: boolean;
  attempts: number;
  lastPlayed: string;
}

export interface QuizOption {
  id?: string;
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
  titleVn: string;
  description?: string;
  vocabularies: Vocabulary[];
  hanziCards: HanziCard[];
  quizzes: Quiz[];
}

export interface LessonFlat {
  id: string;
  title: string;
  titleVn?: string;
  description?: string;
  level: string;
}

export interface Category {
  id: number;
  name: string;
  categorySlug: string;
  items: any[];
}

// --- DỊCH VỤ QUẢN TRỊ ---
export const adminService = {
  getVocabularies: (params: any): Promise<any> => apiClient.get('/admin/vocabularies', { params }),
  createVocabulary: (data: any): Promise<any> => apiClient.post('/admin/vocabularies', data),
  updateVocabulary: (id: string, data: any): Promise<any> => apiClient.put(`/admin/vocabularies/${id}`, data),
  deleteVocabulary: (id: string): Promise<any> => apiClient.delete(`/admin/vocabularies/${id}`),
  
  adminGetOverallStats: (): Promise<any> => apiClient.get('/admin/dashboard/overall-stats'),
  getAllImportJobs: (page: number = 1): Promise<any> => apiClient.get('/admin/vocabularies/jobs', { params: { page, pageSize: 10 } }),
  getImportStats: (): Promise<any> => apiClient.get('/admin/dashboard/import-stats'),
  getImportStatus: (id: string): Promise<any> => apiClient.get(`/admin/vocabularies/import-status/${id}`),
  importVocabularies: (file: File, lessonId?: string): Promise<any> => {
    const formData = new FormData();
    formData.append('excelFile', file);
    return apiClient.post('/admin/vocabularies/import', formData, { 
      params: { lessonId },
      headers: { 'Content-Type': 'multipart/form-data' } 
    });
  },

  adminGetCategories: (search?: string): Promise<any> => apiClient.get('/admin/categories', { params: { search } }),
  adminCreateCategory: (data: any): Promise<any> => apiClient.post('/admin/categories', data),
  adminUpdateCategory: (id: number, data: any): Promise<any> => apiClient.put(`/admin/categories/${id}`, data),
  adminDeleteCategory: (id: number): Promise<any> => apiClient.delete(`/admin/categories/${id}`),

  adminGetLessons: (categoryId?: number): Promise<any> => apiClient.get('/admin/lessons', { params: { categoryId } }),
  adminCreateLesson: (data: any): Promise<any> => apiClient.post('/admin/lessons', data),
  adminUpdateLesson: (id: string, data: any): Promise<any> => apiClient.put(`/admin/lessons/${id}`, data),
  adminDeleteLesson: (id: string): Promise<any> => apiClient.delete(`/admin/lessons/${id}`),

  adminGetLogs: (params: any): Promise<any> => apiClient.get('/admin/logs', { params }),

  adminGetHanziCards: (lessonId: string): Promise<any> => apiClient.get(`/admin/lessons/${lessonId}/hanzi`),
  adminCreateHanziCard: (data: any): Promise<any> => apiClient.post('/admin/hanzi', data),
  adminUpdateHanziCard: (id: string, data: any): Promise<any> => apiClient.put(`/admin/hanzi/${id}`, data),
  adminDeleteHanziCard: (id: string): Promise<any> => apiClient.delete(`/admin/hanzi/${id}`),

  adminGetQuizzes: (lessonId: string): Promise<any> => apiClient.get(`/admin/lessons/${lessonId}/quizzes`),
  adminCreateQuiz: (data: any): Promise<any> => apiClient.post('/admin/quizzes', data),
  adminUpdateQuiz: (id: string, data: any): Promise<any> => apiClient.put(`/admin/quizzes/${id}`, data),
  adminDeleteQuiz: (id: string): Promise<any> => apiClient.delete(`/admin/quizzes/${id}`),

  adminGetQuizOptions: (questionId: string): Promise<any> => apiClient.get(`/admin/quizzes/${questionId}/options`),
  adminCreateQuizOption: (data: any): Promise<any> => apiClient.post('/admin/quizzes/options', data),
  adminUpdateQuizOption: (id: string, data: any): Promise<any> => apiClient.put(`/admin/quizzes/options/${id}`, data),
  adminDeleteQuizOption: (id: string): Promise<any> => apiClient.delete(`/admin/quizzes/options/${id}`),

  adminGetDocuments: (categoryId?: number): Promise<any> => apiClient.get('/admin/documents', { params: { categoryId } }),
  adminCreateDocument: (data: any): Promise<any> => apiClient.post('/admin/documents', data),
  adminUpdateDocument: (id: string, data: any): Promise<any> => apiClient.put(`/admin/documents/${id}`, data),
  adminDeleteDocument: (id: string): Promise<any> => apiClient.delete(`/admin/documents/${id}`),

  adminGetRadicalSets: (lessonId?: string): Promise<any> => apiClient.get('/admin/radicals/sets', { params: { lessonId } }),
  adminCreateRadicalSet: (data: any): Promise<any> => apiClient.post('/admin/radicals/sets', data),
  adminUpdateRadicalSet: (id: string, data: any): Promise<any> => apiClient.put(`/admin/radicals/sets/${id}`, data),
  adminDeleteRadicalSet: (id: string): Promise<any> => apiClient.delete(`/admin/radicals/sets/${id}`),

  adminGetRadicals: (setId: string): Promise<any> => apiClient.get(`/admin/radicals/sets/${setId}/items`),
  adminCreateRadical: (data: any): Promise<any> => apiClient.post('/admin/radicals', data),
  adminUpdateRadical: (id: string, data: any): Promise<any> => apiClient.put(`/admin/radicals/${id}`, data),
  adminDeleteRadical: (id: string): Promise<any> => apiClient.delete(`/admin/radicals/${id}`),

  adminGetChallengeWords: (lessonId: string): Promise<any> => apiClient.get(`/admin/lessons/${lessonId}/challenge-words`),
  adminCreateChallengeWord: (data: any): Promise<any> => apiClient.post('/admin/challenge-words', data),
  adminUpdateChallengeWord: (id: string, data: any): Promise<any> => apiClient.put(`/admin/challenge-words/${id}`, data),
  adminDeleteChallengeWord: (id: string): Promise<any> => apiClient.delete(`/admin/challenge-words/${id}`),

  adminGetUsers: (params: any): Promise<any> => apiClient.get('/admin/users', { params }),
  adminGetUserDetails: (id: string): Promise<any> => apiClient.get(`/admin/users/${id}`),
  adminGetStudentStats: (id: string): Promise<any> => apiClient.get(`/admin/users/${id}/stats`),
  adminUpdateUserStatus: (id: string, isActive: boolean): Promise<any> => apiClient.patch(`/admin/users/${id}/status`, { id, isActive }),

  // File Manager
  adminGetFolders: (): Promise<any> => apiClient.get('/media/folders'),
  adminGetFiles: (folder: string, page: number = 1, pageSize: number = 50): Promise<any> => apiClient.get('/media/files', { params: { folder, page, pageSize } }),
  adminDeleteFile: (id: string): Promise<any> => apiClient.delete(`/media/${id}`),
  adminUploadFiles: (files: FileList | File[], folder: string): Promise<any> => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });
    return apiClient.post('/media/upload-batch', formData, {
      params: { folder },
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
};

// --- CÁC DỊCH VỤ KHÁC ---
export const authService = {
  login: (data: any) => apiClient.post('/auth/login', data),
  register: (data: any) => apiClient.post('/auth/register', data),
  logout: (token: string) => apiClient.post('/auth/logout', { clientRefreshToken: token })
};

export const dictionaryService = {
  getVocabularies: (params: any): Promise<any> => apiClient.get('/dictionary', { params }),
  search: (query: string) => dictionaryService.getVocabularies({ search: query, page: 1, pageSize: 50 })
};

export const learningService = {
  getCategories: async (): Promise<any> => apiClient.get('/learning/categories'),
  getLessonsByCategoryId: async (categoryId: number): Promise<any> => apiClient.get(`/learning/categories/${categoryId}/lessons`),
  getLessons: async (): Promise<any> => apiClient.get('/learning/catalog'),
  getLessonsFlat: async (): Promise<LessonFlat[]> => {
    const res: any = await learningService.getLessons();
    const categories = res.data || res || [];
    const list: LessonFlat[] = [];
    if (Array.isArray(categories)) {
       categories.forEach(cat => {
         const items = cat.items || cat.Items;
         const levelName = cat.categorySlug || cat.CategorySlug || "N/A";
         if (items && Array.isArray(items)) {
           items.forEach((item: any) => {
             const id = item.id || item.Id;
             if (id) {
               list.push({
                 id: id,
                 title: item.title || item.Title || "Không tiêu đề",
                 titleVn: item.translation || item.Translation || "",
                 description: item.desc || item.Desc || "",
                 level: levelName
               });
             }
           });
         }
       });
    }
    return list;
  },
  getLessonDetail: async (id: string): Promise<any> => apiClient.get(`/learning/lessons/${id}`),
  saveProgress: (data: any) => apiClient.post('/study-progress/lessons', data),
  getReviewHistory: (lessonId: string) => apiClient.get(`/study-progress/lessons/${lessonId}/history`)
};

export const userService = {
  getProfile: async (): Promise<any> => apiClient.get('/profile'),
  getStats: async (): Promise<any> => apiClient.get('/profile/analytics'),
  getHistory: async (): Promise<any> => apiClient.get('/profile/learning-history'),
  getVocabularyMastery: async (): Promise<any> => apiClient.get('/profile/vocabulary-mastery')
};
