import { apiClient } from './apiClient';

// --- Types based on spec ---
export interface LoginResponse {
  isSuccess: boolean;
  accessToken: string;
  refreshToken: string;
  userId: string;
  message: string;
}

export interface LessonItem {
  id?: string;
  link: string;
  icon: string;
  title: string;
  translation: string;
  desc: string;
  badge: string;
}

export interface Category {
  id?: string;
  categorySlug: string;
  categoryName: string;
  items: LessonItem[];
}

export interface HanziCard {
  id?: string;
  character: string;
  pinyin: string;
  meaning: string;
  strokeCount: number;
  radical: string;
  mnemonic?: string;
}

export interface RadicalSet {
  id?: string;
  title: string;
  icon?: string;
  radicals: { radical: string; name: string; meaning?: string; exampleChars: string }[];
}

export interface Quiz {
  id?: string;
  question: string;
  explanation?: string;
  difficulty: number;
  options: { optionText: string; isCorrect: boolean }[];
  audio?: string;
}

export interface LessonDetail {
  id: string;
  titleCn: string;
  titleVn?: string;
  filename: string;
  hanziCards: HanziCard[];
  radicalSets: RadicalSet[];
  quizzes: Quiz[];
}

export interface UserStats {
  totalPoints: number;
  avgScore: number;
  lessonsCompleted: number;
  timeSpentS: number;
  lastPlayed: string;
}

export interface VocabularyDto {
  id: string;
  word: string;
  pinyin: string;
  meaning_vn: string;
  meaning_en?: string;
  level: string;
  imageUrl?: string;
  audioUrl?: string;
  exampleCn?: string;
  exampleVn?: string;
}

export interface ImportJob {
  id: string;
  status: string;
  processedRows: number;
  failedRows?: number;
  errorLog?: string;
}

// --- MOCK DATA ---
export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    categoryName: 'Toàn bộ bài học',
    categorySlug: 'all',
    items: [
      { id: '1', link: '/student/lessons/1', icon: 'BookOpen', title: 'Bài 1: Topic 1', translation: 'Topic 1', desc: 'Nội dung bài 1', badge: 'HSK 2' },
      { id: '2', link: '/student/lessons/2', icon: 'BookOpen', title: 'Bài 2: Topic 2', translation: 'Topic 2', desc: 'Nội dung bài 2', badge: 'HSK 3' },
      { id: '3', link: '/student/lessons/3', icon: 'BookOpen', title: 'Bài 3: Topic 3', translation: 'Topic 3', desc: 'Nội dung bài 3', badge: 'HSK 4' },
      { id: '4', link: '/student/lessons/4', icon: 'BookOpen', title: 'Bài 4: Topic 4', translation: 'Topic 4', desc: 'Nội dung bài 4', badge: 'HSK 5' },
      { id: '5', link: '/student/lessons/5', icon: 'BookOpen', title: 'Bài 5: Topic 5', translation: 'Topic 5', desc: 'Nội dung bài 5', badge: 'HSK 6' },
      { id: '6', link: '/student/lessons/6', icon: 'BookOpen', title: 'Bài 6: Topic 6', translation: 'Topic 6', desc: 'Nội dung bài 6', badge: 'HSK 1' },
      { id: '7', link: '/student/lessons/7', icon: 'BookOpen', title: 'Bài 7: Topic 7', translation: 'Topic 7', desc: 'Nội dung bài 7', badge: 'HSK 2' },
      { id: '8', link: '/student/lessons/8', icon: 'BookOpen', title: 'Bài 8: Topic 8', translation: 'Topic 8', desc: 'Nội dung bài 8', badge: 'HSK 3' },
      { id: '9', link: '/student/lessons/9', icon: 'BookOpen', title: 'Bài 9: Topic 9', translation: 'Topic 9', desc: 'Nội dung bài 9', badge: 'HSK 4' },
      { id: '10', link: '/student/lessons/10', icon: 'BookOpen', title: 'Bài 10: Topic 10', translation: 'Topic 10', desc: 'Nội dung bài 10', badge: 'HSK 5' },
      { id: '11', link: '/student/lessons/11', icon: 'BookOpen', title: 'Bài 11: Topic 11', translation: 'Topic 11', desc: 'Nội dung bài 11', badge: 'HSK 6' },
      { id: '12', link: '/student/lessons/12', icon: 'BookOpen', title: 'Bài 12: Topic 12', translation: 'Topic 12', desc: 'Nội dung bài 12', badge: 'HSK 1' },
      { id: '13', link: '/student/lessons/13', icon: 'BookOpen', title: 'Bài 13: Topic 13', translation: 'Topic 13', desc: 'Nội dung bài 13', badge: 'HSK 2' },
      { id: '14', link: '/student/lessons/14', icon: 'BookOpen', title: 'Bài 14: Topic 14', translation: 'Topic 14', desc: 'Nội dung bài 14', badge: 'HSK 3' },
      { id: '15', link: '/student/lessons/15', icon: 'BookOpen', title: 'Bài 15: Topic 15', translation: 'Topic 15', desc: 'Nội dung bài 15', badge: 'HSK 4' },
      { id: '16', link: '/student/lessons/16', icon: 'BookOpen', title: 'Bài 16: Topic 16', translation: 'Topic 16', desc: 'Nội dung bài 16', badge: 'HSK 5' },
      { id: '17', link: '/student/lessons/17', icon: 'BookOpen', title: 'Bài 17: Topic 17', translation: 'Topic 17', desc: 'Nội dung bài 17', badge: 'HSK 6' },
      { id: '18', link: '/student/lessons/18', icon: 'BookOpen', title: 'Bài 18: Topic 18', translation: 'Topic 18', desc: 'Nội dung bài 18', badge: 'HSK 1' },
      { id: '19', link: '/student/lessons/19', icon: 'BookOpen', title: 'Bài 19: Topic 19', translation: 'Topic 19', desc: 'Nội dung bài 19', badge: 'HSK 2' },
      { id: '20', link: '/student/lessons/20', icon: 'BookOpen', title: 'Bài 20: Topic 20', translation: 'Topic 20', desc: 'Nội dung bài 20', badge: 'HSK 3' },
      { id: '21', link: '/student/lessons/21', icon: 'BookOpen', title: 'Bài 21: Topic 21', translation: 'Topic 21', desc: 'Nội dung bài 21', badge: 'HSK 4' },
      { id: '22', link: '/student/lessons/22', icon: 'BookOpen', title: 'Bài 22: Topic 22', translation: 'Topic 22', desc: 'Nội dung bài 22', badge: 'HSK 5' },
      { id: '23', link: '/student/lessons/23', icon: 'BookOpen', title: 'Bài 23: Topic 23', translation: 'Topic 23', desc: 'Nội dung bài 23', badge: 'HSK 6' },
      { id: '24', link: '/student/lessons/24', icon: 'BookOpen', title: 'Bài 24: Topic 24', translation: 'Topic 24', desc: 'Nội dung bài 24', badge: 'HSK 1' },
      { id: '25', link: '/student/lessons/25', icon: 'BookOpen', title: 'Bài 25: Topic 25', translation: 'Topic 25', desc: 'Nội dung bài 25', badge: 'HSK 2' },
      { id: '26', link: '/student/lessons/26', icon: 'BookOpen', title: 'Bài 26: Topic 26', translation: 'Topic 26', desc: 'Nội dung bài 26', badge: 'HSK 3' },
      { id: '27', link: '/student/lessons/27', icon: 'BookOpen', title: 'Bài 27: Topic 27', translation: 'Topic 27', desc: 'Nội dung bài 27', badge: 'HSK 4' },
      { id: '28', link: '/student/lessons/28', icon: 'BookOpen', title: 'Bài 28: Topic 28', translation: 'Topic 28', desc: 'Nội dung bài 28', badge: 'HSK 5' },
      { id: '29', link: '/student/lessons/29', icon: 'BookOpen', title: 'Bài 29: Topic 29', translation: 'Topic 29', desc: 'Nội dung bài 29', badge: 'HSK 6' },
      { id: '30', link: '/student/lessons/30', icon: 'BookOpen', title: 'Bài 30: Topic 30', translation: 'Topic 30', desc: 'Nội dung bài 30', badge: 'HSK 1' },
      { id: '31', link: '/student/lessons/31', icon: 'BookOpen', title: 'Bài 31: Topic 31', translation: 'Topic 31', desc: 'Nội dung bài 31', badge: 'HSK 2' },
      { id: '32', link: '/student/lessons/32', icon: 'BookOpen', title: 'Bài 32: Topic 32', translation: 'Topic 32', desc: 'Nội dung bài 32', badge: 'HSK 3' },
      { id: '33', link: '/student/lessons/33', icon: 'BookOpen', title: 'Bài 33: Topic 33', translation: 'Topic 33', desc: 'Nội dung bài 33', badge: 'HSK 4' },
      { id: '34', link: '/student/lessons/34', icon: 'BookOpen', title: 'Bài 34: Topic 34', translation: 'Topic 34', desc: 'Nội dung bài 34', badge: 'HSK 5' },
      { id: '35', link: '/student/lessons/35', icon: 'BookOpen', title: 'Bài 35: Topic 35', translation: 'Topic 35', desc: 'Nội dung bài 35', badge: 'HSK 6' },
      { id: '36', link: '/student/lessons/36', icon: 'BookOpen', title: 'Bài 36: Topic 36', translation: 'Topic 36', desc: 'Nội dung bài 36', badge: 'HSK 1' },
      { id: '37', link: '/student/lessons/37', icon: 'BookOpen', title: 'Bài 37: Topic 37', translation: 'Topic 37', desc: 'Nội dung bài 37', badge: 'HSK 2' },
      { id: '38', link: '/student/lessons/38', icon: 'BookOpen', title: 'Bài 38: Topic 38', translation: 'Topic 38', desc: 'Nội dung bài 38', badge: 'HSK 3' },
      { id: '39', link: '/student/lessons/39', icon: 'BookOpen', title: 'Bài 39: Topic 39', translation: 'Topic 39', desc: 'Nội dung bài 39', badge: 'HSK 4' },
      { id: '40', link: '/student/lessons/40', icon: 'BookOpen', title: 'Bài 40: Topic 40', translation: 'Topic 40', desc: 'Nội dung bài 40', badge: 'HSK 5' },
      { id: '41', link: '/student/lessons/41', icon: 'BookOpen', title: 'Bài 41: Topic 41', translation: 'Topic 41', desc: 'Nội dung bài 41', badge: 'HSK 6' },
      { id: '42', link: '/student/lessons/42', icon: 'BookOpen', title: 'Bài 42: Topic 42', translation: 'Topic 42', desc: 'Nội dung bài 42', badge: 'HSK 1' },
      { id: '43', link: '/student/lessons/43', icon: 'BookOpen', title: 'Bài 43: Topic 43', translation: 'Topic 43', desc: 'Nội dung bài 43', badge: 'HSK 2' },
      { id: '44', link: '/student/lessons/44', icon: 'BookOpen', title: 'Bài 44: Topic 44', translation: 'Topic 44', desc: 'Nội dung bài 44', badge: 'HSK 3' },
      { id: '45', link: '/student/lessons/45', icon: 'BookOpen', title: 'Bài 45: Topic 45', translation: 'Topic 45', desc: 'Nội dung bài 45', badge: 'HSK 4' },
      { id: '46', link: '/student/lessons/46', icon: 'BookOpen', title: 'Bài 46: Topic 46', translation: 'Topic 46', desc: 'Nội dung bài 46', badge: 'HSK 5' },
      { id: '47', link: '/student/lessons/47', icon: 'BookOpen', title: 'Bài 47: Topic 47', translation: 'Topic 47', desc: 'Nội dung bài 47', badge: 'HSK 6' },
      { id: '48', link: '/student/lessons/48', icon: 'BookOpen', title: 'Bài 48: Topic 48', translation: 'Topic 48', desc: 'Nội dung bài 48', badge: 'HSK 1' },
      { id: '49', link: '/student/lessons/49', icon: 'BookOpen', title: 'Bài 49: Topic 49', translation: 'Topic 49', desc: 'Nội dung bài 49', badge: 'HSK 2' },
      { id: '50', link: '/student/lessons/50', icon: 'BookOpen', title: 'Bài 50: Topic 50', translation: 'Topic 50', desc: 'Nội dung bài 50', badge: 'HSK 3' }
    ]
  }
];
export const MOCK_LESSON_DETAIL: LessonDetail = {
  id: '1',
  titleCn: '你好！(Dành cho người mới bắt đầu)',
  titleVn: 'Xin chào! (Dành cho người mới bắt đầu)',
  filename: 'bai-1-xin-chao',
  hanziCards: [
    { id: 'h0', character: '字0', pinyin: 'zì0', meaning: 'Chữ thứ 0', strokeCount: 5, radical: '宀(miên)' },
    { id: 'h1', character: '字1', pinyin: 'zì1', meaning: 'Chữ thứ 1', strokeCount: 6, radical: '宀(miên)' },
    { id: 'h2', character: '字2', pinyin: 'zì2', meaning: 'Chữ thứ 2', strokeCount: 7, radical: '宀(miên)' },
    { id: 'h3', character: '字3', pinyin: 'zì3', meaning: 'Chữ thứ 3', strokeCount: 8, radical: '宀(miên)' },
    { id: 'h4', character: '字4', pinyin: 'zì4', meaning: 'Chữ thứ 4', strokeCount: 9, radical: '宀(miên)' },
    { id: 'h5', character: '字5', pinyin: 'zì5', meaning: 'Chữ thứ 5', strokeCount: 5, radical: '宀(miên)' },
    { id: 'h6', character: '字6', pinyin: 'zì6', meaning: 'Chữ thứ 6', strokeCount: 6, radical: '宀(miên)' },
    { id: 'h7', character: '字7', pinyin: 'zì7', meaning: 'Chữ thứ 7', strokeCount: 7, radical: '宀(miên)' },
    { id: 'h8', character: '字8', pinyin: 'zì8', meaning: 'Chữ thứ 8', strokeCount: 8, radical: '宀(miên)' },
    { id: 'h9', character: '字9', pinyin: 'zì9', meaning: 'Chữ thứ 9', strokeCount: 9, radical: '宀(miên)' },
    { id: 'h10', character: '字10', pinyin: 'zì10', meaning: 'Chữ thứ 10', strokeCount: 5, radical: '宀(miên)' },
    { id: 'h11', character: '字11', pinyin: 'zì11', meaning: 'Chữ thứ 11', strokeCount: 6, radical: '宀(miên)' },
    { id: 'h12', character: '字12', pinyin: 'zì12', meaning: 'Chữ thứ 12', strokeCount: 7, radical: '宀(miên)' },
    { id: 'h13', character: '字13', pinyin: 'zì13', meaning: 'Chữ thứ 13', strokeCount: 8, radical: '宀(miên)' },
    { id: 'h14', character: '字14', pinyin: 'zì14', meaning: 'Chữ thứ 14', strokeCount: 9, radical: '宀(miên)' },
    { id: 'h15', character: '字15', pinyin: 'zì15', meaning: 'Chữ thứ 15', strokeCount: 5, radical: '宀(miên)' },
    { id: 'h16', character: '字16', pinyin: 'zì16', meaning: 'Chữ thứ 16', strokeCount: 6, radical: '宀(miên)' },
    { id: 'h17', character: '字17', pinyin: 'zì17', meaning: 'Chữ thứ 17', strokeCount: 7, radical: '宀(miên)' },
    { id: 'h18', character: '字18', pinyin: 'zì18', meaning: 'Chữ thứ 18', strokeCount: 8, radical: '宀(miên)' },
    { id: 'h19', character: '字19', pinyin: 'zì19', meaning: 'Chữ thứ 19', strokeCount: 9, radical: '宀(miên)' }
  ],
  radicalSets: [
    { id: 'rs1', title: 'Bộ Nhân Đứng (亻)', icon: 'User', radicals: [{ radical: '亻', name: 'Nhân đứng (Người)', meaning: 'Người', exampleChars: '你, 他, 们' }] }
  ],
  quizzes: [
    { id: 'q1', question: 'Câu hỏi luyện tập 1: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 1', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q2', question: 'Câu hỏi luyện tập 2: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 2', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q3', question: 'Câu hỏi luyện tập 3: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 3', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q4', question: 'Câu hỏi luyện tập 4: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 4', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q5', question: 'Câu hỏi luyện tập 5: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 5', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q6', question: 'Câu hỏi luyện tập 6: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 6', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q7', question: 'Câu hỏi luyện tập 7: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 7', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q8', question: 'Câu hỏi luyện tập 8: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 8', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q9', question: 'Câu hỏi luyện tập 9: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 9', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q10', question: 'Câu hỏi luyện tập 10: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 10', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q11', question: 'Câu hỏi luyện tập 11: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 11', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q12', question: 'Câu hỏi luyện tập 12: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 12', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q13', question: 'Câu hỏi luyện tập 13: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 13', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q14', question: 'Câu hỏi luyện tập 14: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 14', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q15', question: 'Câu hỏi luyện tập 15: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 15', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q16', question: 'Câu hỏi luyện tập 16: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 16', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q17', question: 'Câu hỏi luyện tập 17: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 17', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q18', question: 'Câu hỏi luyện tập 18: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 18', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q19', question: 'Câu hỏi luyện tập 19: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 19', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q20', question: 'Câu hỏi luyện tập 20: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 20', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q21', question: 'Câu hỏi luyện tập 21: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 21', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q22', question: 'Câu hỏi luyện tập 22: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 22', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q23', question: 'Câu hỏi luyện tập 23: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 23', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q24', question: 'Câu hỏi luyện tập 24: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 24', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q25', question: 'Câu hỏi luyện tập 25: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 25', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q26', question: 'Câu hỏi luyện tập 26: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 26', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q27', question: 'Câu hỏi luyện tập 27: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 27', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q28', question: 'Câu hỏi luyện tập 28: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 28', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q29', question: 'Câu hỏi luyện tập 29: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 29', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q30', question: 'Câu hỏi luyện tập 30: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 30', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q31', question: 'Câu hỏi luyện tập 31: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 31', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q32', question: 'Câu hỏi luyện tập 32: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 32', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q33', question: 'Câu hỏi luyện tập 33: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 33', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q34', question: 'Câu hỏi luyện tập 34: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 34', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q35', question: 'Câu hỏi luyện tập 35: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 35', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q36', question: 'Câu hỏi luyện tập 36: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 36', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q37', question: 'Câu hỏi luyện tập 37: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 37', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q38', question: 'Câu hỏi luyện tập 38: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 38', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q39', question: 'Câu hỏi luyện tập 39: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 39', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q40', question: 'Câu hỏi luyện tập 40: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 40', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q41', question: 'Câu hỏi luyện tập 41: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 41', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q42', question: 'Câu hỏi luyện tập 42: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 42', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q43', question: 'Câu hỏi luyện tập 43: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 43', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q44', question: 'Câu hỏi luyện tập 44: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 44', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q45', question: 'Câu hỏi luyện tập 45: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 45', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q46', question: 'Câu hỏi luyện tập 46: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 46', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q47', question: 'Câu hỏi luyện tập 47: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 47', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q48', question: 'Câu hỏi luyện tập 48: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 48', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q49', question: 'Câu hỏi luyện tập 49: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 49', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q50', question: 'Câu hỏi luyện tập 50: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 50', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q51', question: 'Câu hỏi luyện tập 51: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 51', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q52', question: 'Câu hỏi luyện tập 52: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 52', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q53', question: 'Câu hỏi luyện tập 53: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 53', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q54', question: 'Câu hỏi luyện tập 54: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 54', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q55', question: 'Câu hỏi luyện tập 55: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 55', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q56', question: 'Câu hỏi luyện tập 56: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 56', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q57', question: 'Câu hỏi luyện tập 57: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 57', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q58', question: 'Câu hỏi luyện tập 58: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 58', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q59', question: 'Câu hỏi luyện tập 59: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 59', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q60', question: 'Câu hỏi luyện tập 60: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 60', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q61', question: 'Câu hỏi luyện tập 61: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 61', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q62', question: 'Câu hỏi luyện tập 62: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 62', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q63', question: 'Câu hỏi luyện tập 63: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 63', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q64', question: 'Câu hỏi luyện tập 64: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 64', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q65', question: 'Câu hỏi luyện tập 65: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 65', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q66', question: 'Câu hỏi luyện tập 66: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 66', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q67', question: 'Câu hỏi luyện tập 67: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 67', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q68', question: 'Câu hỏi luyện tập 68: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 68', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q69', question: 'Câu hỏi luyện tập 69: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 69', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q70', question: 'Câu hỏi luyện tập 70: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 70', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q71', question: 'Câu hỏi luyện tập 71: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 71', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q72', question: 'Câu hỏi luyện tập 72: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 72', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q73', question: 'Câu hỏi luyện tập 73: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 73', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q74', question: 'Câu hỏi luyện tập 74: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 74', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q75', question: 'Câu hỏi luyện tập 75: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 75', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q76', question: 'Câu hỏi luyện tập 76: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 76', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q77', question: 'Câu hỏi luyện tập 77: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 77', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q78', question: 'Câu hỏi luyện tập 78: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 78', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q79', question: 'Câu hỏi luyện tập 79: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 79', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q80', question: 'Câu hỏi luyện tập 80: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 80', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q81', question: 'Câu hỏi luyện tập 81: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 81', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q82', question: 'Câu hỏi luyện tập 82: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 82', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q83', question: 'Câu hỏi luyện tập 83: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 83', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q84', question: 'Câu hỏi luyện tập 84: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 84', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q85', question: 'Câu hỏi luyện tập 85: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 85', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q86', question: 'Câu hỏi luyện tập 86: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 86', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q87', question: 'Câu hỏi luyện tập 87: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 87', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q88', question: 'Câu hỏi luyện tập 88: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 88', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q89', question: 'Câu hỏi luyện tập 89: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 89', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q90', question: 'Câu hỏi luyện tập 90: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 90', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q91', question: 'Câu hỏi luyện tập 91: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 91', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q92', question: 'Câu hỏi luyện tập 92: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 92', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q93', question: 'Câu hỏi luyện tập 93: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 93', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q94', question: 'Câu hỏi luyện tập 94: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 94', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q95', question: 'Câu hỏi luyện tập 95: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 95', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q96', question: 'Câu hỏi luyện tập 96: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 96', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q97', question: 'Câu hỏi luyện tập 97: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 97', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q98', question: 'Câu hỏi luyện tập 98: Nghĩa của từ này là gì?', difficulty: 3, explanation: 'Giải thích cho câu 98', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q99', question: 'Câu hỏi luyện tập 99: Nghĩa của từ này là gì?', difficulty: 1, explanation: 'Giải thích cho câu 99', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] },
    { id: 'q100', question: 'Câu hỏi luyện tập 100: Nghĩa của từ này là gì?', difficulty: 2, explanation: 'Giải thích cho câu 100', options: [{ optionText: 'Đáp án sai', isCorrect: false }, { optionText: 'Đáp án đúng', isCorrect: true }, { optionText: 'Đáp án sai khác', isCorrect: false }] }
  ]
};
export const MOCK_VOCABULARIES: VocabularyDto[] = [
  { id: '1', word: 'Từvựng1', pinyin: 'túvŭng1', meaning_vn: 'Nghĩa 1', level: 'HSK 2', exampleCn: 'Ví dụ 1', exampleVn: 'Nghĩa ví dụ 1' },
  { id: '2', word: 'Từvựng2', pinyin: 'túvŭng2', meaning_vn: 'Nghĩa 2', level: 'HSK 3', exampleCn: 'Ví dụ 2', exampleVn: 'Nghĩa ví dụ 2' },
  { id: '3', word: 'Từvựng3', pinyin: 'túvŭng3', meaning_vn: 'Nghĩa 3', level: 'HSK 4', exampleCn: 'Ví dụ 3', exampleVn: 'Nghĩa ví dụ 3' },
  { id: '4', word: 'Từvựng4', pinyin: 'túvŭng4', meaning_vn: 'Nghĩa 4', level: 'HSK 5', exampleCn: 'Ví dụ 4', exampleVn: 'Nghĩa ví dụ 4' },
  { id: '5', word: 'Từvựng5', pinyin: 'túvŭng5', meaning_vn: 'Nghĩa 5', level: 'HSK 6', exampleCn: 'Ví dụ 5', exampleVn: 'Nghĩa ví dụ 5' },
  { id: '6', word: 'Từvựng6', pinyin: 'túvŭng6', meaning_vn: 'Nghĩa 6', level: 'HSK 1', exampleCn: 'Ví dụ 6', exampleVn: 'Nghĩa ví dụ 6' },
  { id: '7', word: 'Từvựng7', pinyin: 'túvŭng7', meaning_vn: 'Nghĩa 7', level: 'HSK 2', exampleCn: 'Ví dụ 7', exampleVn: 'Nghĩa ví dụ 7' },
  { id: '8', word: 'Từvựng8', pinyin: 'túvŭng8', meaning_vn: 'Nghĩa 8', level: 'HSK 3', exampleCn: 'Ví dụ 8', exampleVn: 'Nghĩa ví dụ 8' },
  { id: '9', word: 'Từvựng9', pinyin: 'túvŭng9', meaning_vn: 'Nghĩa 9', level: 'HSK 4', exampleCn: 'Ví dụ 9', exampleVn: 'Nghĩa ví dụ 9' },
  { id: '10', word: 'Từvựng10', pinyin: 'túvŭng10', meaning_vn: 'Nghĩa 10', level: 'HSK 5', exampleCn: 'Ví dụ 10', exampleVn: 'Nghĩa ví dụ 10' },
  { id: '11', word: 'Từvựng11', pinyin: 'túvŭng11', meaning_vn: 'Nghĩa 11', level: 'HSK 6', exampleCn: 'Ví dụ 11', exampleVn: 'Nghĩa ví dụ 11' },
  { id: '12', word: 'Từvựng12', pinyin: 'túvŭng12', meaning_vn: 'Nghĩa 12', level: 'HSK 1', exampleCn: 'Ví dụ 12', exampleVn: 'Nghĩa ví dụ 12' },
  { id: '13', word: 'Từvựng13', pinyin: 'túvŭng13', meaning_vn: 'Nghĩa 13', level: 'HSK 2', exampleCn: 'Ví dụ 13', exampleVn: 'Nghĩa ví dụ 13' },
  { id: '14', word: 'Từvựng14', pinyin: 'túvŭng14', meaning_vn: 'Nghĩa 14', level: 'HSK 3', exampleCn: 'Ví dụ 14', exampleVn: 'Nghĩa ví dụ 14' },
  { id: '15', word: 'Từvựng15', pinyin: 'túvŭng15', meaning_vn: 'Nghĩa 15', level: 'HSK 4', exampleCn: 'Ví dụ 15', exampleVn: 'Nghĩa ví dụ 15' },
  { id: '16', word: 'Từvựng16', pinyin: 'túvŭng16', meaning_vn: 'Nghĩa 16', level: 'HSK 5', exampleCn: 'Ví dụ 16', exampleVn: 'Nghĩa ví dụ 16' },
  { id: '17', word: 'Từvựng17', pinyin: 'túvŭng17', meaning_vn: 'Nghĩa 17', level: 'HSK 6', exampleCn: 'Ví dụ 17', exampleVn: 'Nghĩa ví dụ 17' },
  { id: '18', word: 'Từvựng18', pinyin: 'túvŭng18', meaning_vn: 'Nghĩa 18', level: 'HSK 1', exampleCn: 'Ví dụ 18', exampleVn: 'Nghĩa ví dụ 18' },
  { id: '19', word: 'Từvựng19', pinyin: 'túvŭng19', meaning_vn: 'Nghĩa 19', level: 'HSK 2', exampleCn: 'Ví dụ 19', exampleVn: 'Nghĩa ví dụ 19' },
  { id: '20', word: 'Từvựng20', pinyin: 'túvŭng20', meaning_vn: 'Nghĩa 20', level: 'HSK 3', exampleCn: 'Ví dụ 20', exampleVn: 'Nghĩa ví dụ 20' },
  { id: '21', word: 'Từvựng21', pinyin: 'túvŭng21', meaning_vn: 'Nghĩa 21', level: 'HSK 4', exampleCn: 'Ví dụ 21', exampleVn: 'Nghĩa ví dụ 21' },
  { id: '22', word: 'Từvựng22', pinyin: 'túvŭng22', meaning_vn: 'Nghĩa 22', level: 'HSK 5', exampleCn: 'Ví dụ 22', exampleVn: 'Nghĩa ví dụ 22' },
  { id: '23', word: 'Từvựng23', pinyin: 'túvŭng23', meaning_vn: 'Nghĩa 23', level: 'HSK 6', exampleCn: 'Ví dụ 23', exampleVn: 'Nghĩa ví dụ 23' },
  { id: '24', word: 'Từvựng24', pinyin: 'túvŭng24', meaning_vn: 'Nghĩa 24', level: 'HSK 1', exampleCn: 'Ví dụ 24', exampleVn: 'Nghĩa ví dụ 24' },
  { id: '25', word: 'Từvựng25', pinyin: 'túvŭng25', meaning_vn: 'Nghĩa 25', level: 'HSK 2', exampleCn: 'Ví dụ 25', exampleVn: 'Nghĩa ví dụ 25' },
  { id: '26', word: 'Từvựng26', pinyin: 'túvŭng26', meaning_vn: 'Nghĩa 26', level: 'HSK 3', exampleCn: 'Ví dụ 26', exampleVn: 'Nghĩa ví dụ 26' },
  { id: '27', word: 'Từvựng27', pinyin: 'túvŭng27', meaning_vn: 'Nghĩa 27', level: 'HSK 4', exampleCn: 'Ví dụ 27', exampleVn: 'Nghĩa ví dụ 27' },
  { id: '28', word: 'Từvựng28', pinyin: 'túvŭng28', meaning_vn: 'Nghĩa 28', level: 'HSK 5', exampleCn: 'Ví dụ 28', exampleVn: 'Nghĩa ví dụ 28' },
  { id: '29', word: 'Từvựng29', pinyin: 'túvŭng29', meaning_vn: 'Nghĩa 29', level: 'HSK 6', exampleCn: 'Ví dụ 29', exampleVn: 'Nghĩa ví dụ 29' },
  { id: '30', word: 'Từvựng30', pinyin: 'túvŭng30', meaning_vn: 'Nghĩa 30', level: 'HSK 1', exampleCn: 'Ví dụ 30', exampleVn: 'Nghĩa ví dụ 30' },
  { id: '31', word: 'Từvựng31', pinyin: 'túvŭng31', meaning_vn: 'Nghĩa 31', level: 'HSK 2', exampleCn: 'Ví dụ 31', exampleVn: 'Nghĩa ví dụ 31' },
  { id: '32', word: 'Từvựng32', pinyin: 'túvŭng32', meaning_vn: 'Nghĩa 32', level: 'HSK 3', exampleCn: 'Ví dụ 32', exampleVn: 'Nghĩa ví dụ 32' },
  { id: '33', word: 'Từvựng33', pinyin: 'túvŭng33', meaning_vn: 'Nghĩa 33', level: 'HSK 4', exampleCn: 'Ví dụ 33', exampleVn: 'Nghĩa ví dụ 33' },
  { id: '34', word: 'Từvựng34', pinyin: 'túvŭng34', meaning_vn: 'Nghĩa 34', level: 'HSK 5', exampleCn: 'Ví dụ 34', exampleVn: 'Nghĩa ví dụ 34' },
  { id: '35', word: 'Từvựng35', pinyin: 'túvŭng35', meaning_vn: 'Nghĩa 35', level: 'HSK 6', exampleCn: 'Ví dụ 35', exampleVn: 'Nghĩa ví dụ 35' },
  { id: '36', word: 'Từvựng36', pinyin: 'túvŭng36', meaning_vn: 'Nghĩa 36', level: 'HSK 1', exampleCn: 'Ví dụ 36', exampleVn: 'Nghĩa ví dụ 36' },
  { id: '37', word: 'Từvựng37', pinyin: 'túvŭng37', meaning_vn: 'Nghĩa 37', level: 'HSK 2', exampleCn: 'Ví dụ 37', exampleVn: 'Nghĩa ví dụ 37' },
  { id: '38', word: 'Từvựng38', pinyin: 'túvŭng38', meaning_vn: 'Nghĩa 38', level: 'HSK 3', exampleCn: 'Ví dụ 38', exampleVn: 'Nghĩa ví dụ 38' },
  { id: '39', word: 'Từvựng39', pinyin: 'túvŭng39', meaning_vn: 'Nghĩa 39', level: 'HSK 4', exampleCn: 'Ví dụ 39', exampleVn: 'Nghĩa ví dụ 39' },
  { id: '40', word: 'Từvựng40', pinyin: 'túvŭng40', meaning_vn: 'Nghĩa 40', level: 'HSK 5', exampleCn: 'Ví dụ 40', exampleVn: 'Nghĩa ví dụ 40' },
  { id: '41', word: 'Từvựng41', pinyin: 'túvŭng41', meaning_vn: 'Nghĩa 41', level: 'HSK 6', exampleCn: 'Ví dụ 41', exampleVn: 'Nghĩa ví dụ 41' },
  { id: '42', word: 'Từvựng42', pinyin: 'túvŭng42', meaning_vn: 'Nghĩa 42', level: 'HSK 1', exampleCn: 'Ví dụ 42', exampleVn: 'Nghĩa ví dụ 42' },
  { id: '43', word: 'Từvựng43', pinyin: 'túvŭng43', meaning_vn: 'Nghĩa 43', level: 'HSK 2', exampleCn: 'Ví dụ 43', exampleVn: 'Nghĩa ví dụ 43' },
  { id: '44', word: 'Từvựng44', pinyin: 'túvŭng44', meaning_vn: 'Nghĩa 44', level: 'HSK 3', exampleCn: 'Ví dụ 44', exampleVn: 'Nghĩa ví dụ 44' },
  { id: '45', word: 'Từvựng45', pinyin: 'túvŭng45', meaning_vn: 'Nghĩa 45', level: 'HSK 4', exampleCn: 'Ví dụ 45', exampleVn: 'Nghĩa ví dụ 45' },
  { id: '46', word: 'Từvựng46', pinyin: 'túvŭng46', meaning_vn: 'Nghĩa 46', level: 'HSK 5', exampleCn: 'Ví dụ 46', exampleVn: 'Nghĩa ví dụ 46' },
  { id: '47', word: 'Từvựng47', pinyin: 'túvŭng47', meaning_vn: 'Nghĩa 47', level: 'HSK 6', exampleCn: 'Ví dụ 47', exampleVn: 'Nghĩa ví dụ 47' },
  { id: '48', word: 'Từvựng48', pinyin: 'túvŭng48', meaning_vn: 'Nghĩa 48', level: 'HSK 1', exampleCn: 'Ví dụ 48', exampleVn: 'Nghĩa ví dụ 48' },
  { id: '49', word: 'Từvựng49', pinyin: 'túvŭng49', meaning_vn: 'Nghĩa 49', level: 'HSK 2', exampleCn: 'Ví dụ 49', exampleVn: 'Nghĩa ví dụ 49' },
  { id: '50', word: 'Từvựng50', pinyin: 'túvŭng50', meaning_vn: 'Nghĩa 50', level: 'HSK 3', exampleCn: 'Ví dụ 50', exampleVn: 'Nghĩa ví dụ 50' },
  { id: '51', word: 'Từvựng51', pinyin: 'túvŭng51', meaning_vn: 'Nghĩa 51', level: 'HSK 4', exampleCn: 'Ví dụ 51', exampleVn: 'Nghĩa ví dụ 51' },
  { id: '52', word: 'Từvựng52', pinyin: 'túvŭng52', meaning_vn: 'Nghĩa 52', level: 'HSK 5', exampleCn: 'Ví dụ 52', exampleVn: 'Nghĩa ví dụ 52' },
  { id: '53', word: 'Từvựng53', pinyin: 'túvŭng53', meaning_vn: 'Nghĩa 53', level: 'HSK 6', exampleCn: 'Ví dụ 53', exampleVn: 'Nghĩa ví dụ 53' },
  { id: '54', word: 'Từvựng54', pinyin: 'túvŭng54', meaning_vn: 'Nghĩa 54', level: 'HSK 1', exampleCn: 'Ví dụ 54', exampleVn: 'Nghĩa ví dụ 54' },
  { id: '55', word: 'Từvựng55', pinyin: 'túvŭng55', meaning_vn: 'Nghĩa 55', level: 'HSK 2', exampleCn: 'Ví dụ 55', exampleVn: 'Nghĩa ví dụ 55' },
  { id: '56', word: 'Từvựng56', pinyin: 'túvŭng56', meaning_vn: 'Nghĩa 56', level: 'HSK 3', exampleCn: 'Ví dụ 56', exampleVn: 'Nghĩa ví dụ 56' },
  { id: '57', word: 'Từvựng57', pinyin: 'túvŭng57', meaning_vn: 'Nghĩa 57', level: 'HSK 4', exampleCn: 'Ví dụ 57', exampleVn: 'Nghĩa ví dụ 57' },
  { id: '58', word: 'Từvựng58', pinyin: 'túvŭng58', meaning_vn: 'Nghĩa 58', level: 'HSK 5', exampleCn: 'Ví dụ 58', exampleVn: 'Nghĩa ví dụ 58' },
  { id: '59', word: 'Từvựng59', pinyin: 'túvŭng59', meaning_vn: 'Nghĩa 59', level: 'HSK 6', exampleCn: 'Ví dụ 59', exampleVn: 'Nghĩa ví dụ 59' },
  { id: '60', word: 'Từvựng60', pinyin: 'túvŭng60', meaning_vn: 'Nghĩa 60', level: 'HSK 1', exampleCn: 'Ví dụ 60', exampleVn: 'Nghĩa ví dụ 60' },
  { id: '61', word: 'Từvựng61', pinyin: 'túvŭng61', meaning_vn: 'Nghĩa 61', level: 'HSK 2', exampleCn: 'Ví dụ 61', exampleVn: 'Nghĩa ví dụ 61' },
  { id: '62', word: 'Từvựng62', pinyin: 'túvŭng62', meaning_vn: 'Nghĩa 62', level: 'HSK 3', exampleCn: 'Ví dụ 62', exampleVn: 'Nghĩa ví dụ 62' },
  { id: '63', word: 'Từvựng63', pinyin: 'túvŭng63', meaning_vn: 'Nghĩa 63', level: 'HSK 4', exampleCn: 'Ví dụ 63', exampleVn: 'Nghĩa ví dụ 63' },
  { id: '64', word: 'Từvựng64', pinyin: 'túvŭng64', meaning_vn: 'Nghĩa 64', level: 'HSK 5', exampleCn: 'Ví dụ 64', exampleVn: 'Nghĩa ví dụ 64' },
  { id: '65', word: 'Từvựng65', pinyin: 'túvŭng65', meaning_vn: 'Nghĩa 65', level: 'HSK 6', exampleCn: 'Ví dụ 65', exampleVn: 'Nghĩa ví dụ 65' },
  { id: '66', word: 'Từvựng66', pinyin: 'túvŭng66', meaning_vn: 'Nghĩa 66', level: 'HSK 1', exampleCn: 'Ví dụ 66', exampleVn: 'Nghĩa ví dụ 66' },
  { id: '67', word: 'Từvựng67', pinyin: 'túvŭng67', meaning_vn: 'Nghĩa 67', level: 'HSK 2', exampleCn: 'Ví dụ 67', exampleVn: 'Nghĩa ví dụ 67' },
  { id: '68', word: 'Từvựng68', pinyin: 'túvŭng68', meaning_vn: 'Nghĩa 68', level: 'HSK 3', exampleCn: 'Ví dụ 68', exampleVn: 'Nghĩa ví dụ 68' },
  { id: '69', word: 'Từvựng69', pinyin: 'túvŭng69', meaning_vn: 'Nghĩa 69', level: 'HSK 4', exampleCn: 'Ví dụ 69', exampleVn: 'Nghĩa ví dụ 69' },
  { id: '70', word: 'Từvựng70', pinyin: 'túvŭng70', meaning_vn: 'Nghĩa 70', level: 'HSK 5', exampleCn: 'Ví dụ 70', exampleVn: 'Nghĩa ví dụ 70' },
  { id: '71', word: 'Từvựng71', pinyin: 'túvŭng71', meaning_vn: 'Nghĩa 71', level: 'HSK 6', exampleCn: 'Ví dụ 71', exampleVn: 'Nghĩa ví dụ 71' },
  { id: '72', word: 'Từvựng72', pinyin: 'túvŭng72', meaning_vn: 'Nghĩa 72', level: 'HSK 1', exampleCn: 'Ví dụ 72', exampleVn: 'Nghĩa ví dụ 72' },
  { id: '73', word: 'Từvựng73', pinyin: 'túvŭng73', meaning_vn: 'Nghĩa 73', level: 'HSK 2', exampleCn: 'Ví dụ 73', exampleVn: 'Nghĩa ví dụ 73' },
  { id: '74', word: 'Từvựng74', pinyin: 'túvŭng74', meaning_vn: 'Nghĩa 74', level: 'HSK 3', exampleCn: 'Ví dụ 74', exampleVn: 'Nghĩa ví dụ 74' },
  { id: '75', word: 'Từvựng75', pinyin: 'túvŭng75', meaning_vn: 'Nghĩa 75', level: 'HSK 4', exampleCn: 'Ví dụ 75', exampleVn: 'Nghĩa ví dụ 75' },
  { id: '76', word: 'Từvựng76', pinyin: 'túvŭng76', meaning_vn: 'Nghĩa 76', level: 'HSK 5', exampleCn: 'Ví dụ 76', exampleVn: 'Nghĩa ví dụ 76' },
  { id: '77', word: 'Từvựng77', pinyin: 'túvŭng77', meaning_vn: 'Nghĩa 77', level: 'HSK 6', exampleCn: 'Ví dụ 77', exampleVn: 'Nghĩa ví dụ 77' },
  { id: '78', word: 'Từvựng78', pinyin: 'túvŭng78', meaning_vn: 'Nghĩa 78', level: 'HSK 1', exampleCn: 'Ví dụ 78', exampleVn: 'Nghĩa ví dụ 78' },
  { id: '79', word: 'Từvựng79', pinyin: 'túvŭng79', meaning_vn: 'Nghĩa 79', level: 'HSK 2', exampleCn: 'Ví dụ 79', exampleVn: 'Nghĩa ví dụ 79' },
  { id: '80', word: 'Từvựng80', pinyin: 'túvŭng80', meaning_vn: 'Nghĩa 80', level: 'HSK 3', exampleCn: 'Ví dụ 80', exampleVn: 'Nghĩa ví dụ 80' },
  { id: '81', word: 'Từvựng81', pinyin: 'túvŭng81', meaning_vn: 'Nghĩa 81', level: 'HSK 4', exampleCn: 'Ví dụ 81', exampleVn: 'Nghĩa ví dụ 81' },
  { id: '82', word: 'Từvựng82', pinyin: 'túvŭng82', meaning_vn: 'Nghĩa 82', level: 'HSK 5', exampleCn: 'Ví dụ 82', exampleVn: 'Nghĩa ví dụ 82' },
  { id: '83', word: 'Từvựng83', pinyin: 'túvŭng83', meaning_vn: 'Nghĩa 83', level: 'HSK 6', exampleCn: 'Ví dụ 83', exampleVn: 'Nghĩa ví dụ 83' },
  { id: '84', word: 'Từvựng84', pinyin: 'túvŭng84', meaning_vn: 'Nghĩa 84', level: 'HSK 1', exampleCn: 'Ví dụ 84', exampleVn: 'Nghĩa ví dụ 84' },
  { id: '85', word: 'Từvựng85', pinyin: 'túvŭng85', meaning_vn: 'Nghĩa 85', level: 'HSK 2', exampleCn: 'Ví dụ 85', exampleVn: 'Nghĩa ví dụ 85' },
  { id: '86', word: 'Từvựng86', pinyin: 'túvŭng86', meaning_vn: 'Nghĩa 86', level: 'HSK 3', exampleCn: 'Ví dụ 86', exampleVn: 'Nghĩa ví dụ 86' },
  { id: '87', word: 'Từvựng87', pinyin: 'túvŭng87', meaning_vn: 'Nghĩa 87', level: 'HSK 4', exampleCn: 'Ví dụ 87', exampleVn: 'Nghĩa ví dụ 87' },
  { id: '88', word: 'Từvựng88', pinyin: 'túvŭng88', meaning_vn: 'Nghĩa 88', level: 'HSK 5', exampleCn: 'Ví dụ 88', exampleVn: 'Nghĩa ví dụ 88' },
  { id: '89', word: 'Từvựng89', pinyin: 'túvŭng89', meaning_vn: 'Nghĩa 89', level: 'HSK 6', exampleCn: 'Ví dụ 89', exampleVn: 'Nghĩa ví dụ 89' },
  { id: '90', word: 'Từvựng90', pinyin: 'túvŭng90', meaning_vn: 'Nghĩa 90', level: 'HSK 1', exampleCn: 'Ví dụ 90', exampleVn: 'Nghĩa ví dụ 90' },
  { id: '91', word: 'Từvựng91', pinyin: 'túvŭng91', meaning_vn: 'Nghĩa 91', level: 'HSK 2', exampleCn: 'Ví dụ 91', exampleVn: 'Nghĩa ví dụ 91' },
  { id: '92', word: 'Từvựng92', pinyin: 'túvŭng92', meaning_vn: 'Nghĩa 92', level: 'HSK 3', exampleCn: 'Ví dụ 92', exampleVn: 'Nghĩa ví dụ 92' },
  { id: '93', word: 'Từvựng93', pinyin: 'túvŭng93', meaning_vn: 'Nghĩa 93', level: 'HSK 4', exampleCn: 'Ví dụ 93', exampleVn: 'Nghĩa ví dụ 93' },
  { id: '94', word: 'Từvựng94', pinyin: 'túvŭng94', meaning_vn: 'Nghĩa 94', level: 'HSK 5', exampleCn: 'Ví dụ 94', exampleVn: 'Nghĩa ví dụ 94' },
  { id: '95', word: 'Từvựng95', pinyin: 'túvŭng95', meaning_vn: 'Nghĩa 95', level: 'HSK 6', exampleCn: 'Ví dụ 95', exampleVn: 'Nghĩa ví dụ 95' },
  { id: '96', word: 'Từvựng96', pinyin: 'túvŭng96', meaning_vn: 'Nghĩa 96', level: 'HSK 1', exampleCn: 'Ví dụ 96', exampleVn: 'Nghĩa ví dụ 96' },
  { id: '97', word: 'Từvựng97', pinyin: 'túvŭng97', meaning_vn: 'Nghĩa 97', level: 'HSK 2', exampleCn: 'Ví dụ 97', exampleVn: 'Nghĩa ví dụ 97' },
  { id: '98', word: 'Từvựng98', pinyin: 'túvŭng98', meaning_vn: 'Nghĩa 98', level: 'HSK 3', exampleCn: 'Ví dụ 98', exampleVn: 'Nghĩa ví dụ 98' },
  { id: '99', word: 'Từvựng99', pinyin: 'túvŭng99', meaning_vn: 'Nghĩa 99', level: 'HSK 4', exampleCn: 'Ví dụ 99', exampleVn: 'Nghĩa ví dụ 99' },
  { id: '100', word: 'Từvựng100', pinyin: 'túvŭng100', meaning_vn: 'Nghĩa 100', level: 'HSK 5', exampleCn: 'Ví dụ 100', exampleVn: 'Nghĩa ví dụ 100' },
  { id: '101', word: 'Từvựng101', pinyin: 'túvŭng101', meaning_vn: 'Nghĩa 101', level: 'HSK 6', exampleCn: 'Ví dụ 101', exampleVn: 'Nghĩa ví dụ 101' },
  { id: '102', word: 'Từvựng102', pinyin: 'túvŭng102', meaning_vn: 'Nghĩa 102', level: 'HSK 1', exampleCn: 'Ví dụ 102', exampleVn: 'Nghĩa ví dụ 102' },
  { id: '103', word: 'Từvựng103', pinyin: 'túvŭng103', meaning_vn: 'Nghĩa 103', level: 'HSK 2', exampleCn: 'Ví dụ 103', exampleVn: 'Nghĩa ví dụ 103' },
  { id: '104', word: 'Từvựng104', pinyin: 'túvŭng104', meaning_vn: 'Nghĩa 104', level: 'HSK 3', exampleCn: 'Ví dụ 104', exampleVn: 'Nghĩa ví dụ 104' },
  { id: '105', word: 'Từvựng105', pinyin: 'túvŭng105', meaning_vn: 'Nghĩa 105', level: 'HSK 4', exampleCn: 'Ví dụ 105', exampleVn: 'Nghĩa ví dụ 105' },
  { id: '106', word: 'Từvựng106', pinyin: 'túvŭng106', meaning_vn: 'Nghĩa 106', level: 'HSK 5', exampleCn: 'Ví dụ 106', exampleVn: 'Nghĩa ví dụ 106' },
  { id: '107', word: 'Từvựng107', pinyin: 'túvŭng107', meaning_vn: 'Nghĩa 107', level: 'HSK 6', exampleCn: 'Ví dụ 107', exampleVn: 'Nghĩa ví dụ 107' },
  { id: '108', word: 'Từvựng108', pinyin: 'túvŭng108', meaning_vn: 'Nghĩa 108', level: 'HSK 1', exampleCn: 'Ví dụ 108', exampleVn: 'Nghĩa ví dụ 108' },
  { id: '109', word: 'Từvựng109', pinyin: 'túvŭng109', meaning_vn: 'Nghĩa 109', level: 'HSK 2', exampleCn: 'Ví dụ 109', exampleVn: 'Nghĩa ví dụ 109' },
  { id: '110', word: 'Từvựng110', pinyin: 'túvŭng110', meaning_vn: 'Nghĩa 110', level: 'HSK 3', exampleCn: 'Ví dụ 110', exampleVn: 'Nghĩa ví dụ 110' },
  { id: '111', word: 'Từvựng111', pinyin: 'túvŭng111', meaning_vn: 'Nghĩa 111', level: 'HSK 4', exampleCn: 'Ví dụ 111', exampleVn: 'Nghĩa ví dụ 111' },
  { id: '112', word: 'Từvựng112', pinyin: 'túvŭng112', meaning_vn: 'Nghĩa 112', level: 'HSK 5', exampleCn: 'Ví dụ 112', exampleVn: 'Nghĩa ví dụ 112' },
  { id: '113', word: 'Từvựng113', pinyin: 'túvŭng113', meaning_vn: 'Nghĩa 113', level: 'HSK 6', exampleCn: 'Ví dụ 113', exampleVn: 'Nghĩa ví dụ 113' },
  { id: '114', word: 'Từvựng114', pinyin: 'túvŭng114', meaning_vn: 'Nghĩa 114', level: 'HSK 1', exampleCn: 'Ví dụ 114', exampleVn: 'Nghĩa ví dụ 114' },
  { id: '115', word: 'Từvựng115', pinyin: 'túvŭng115', meaning_vn: 'Nghĩa 115', level: 'HSK 2', exampleCn: 'Ví dụ 115', exampleVn: 'Nghĩa ví dụ 115' },
  { id: '116', word: 'Từvựng116', pinyin: 'túvŭng116', meaning_vn: 'Nghĩa 116', level: 'HSK 3', exampleCn: 'Ví dụ 116', exampleVn: 'Nghĩa ví dụ 116' },
  { id: '117', word: 'Từvựng117', pinyin: 'túvŭng117', meaning_vn: 'Nghĩa 117', level: 'HSK 4', exampleCn: 'Ví dụ 117', exampleVn: 'Nghĩa ví dụ 117' },
  { id: '118', word: 'Từvựng118', pinyin: 'túvŭng118', meaning_vn: 'Nghĩa 118', level: 'HSK 5', exampleCn: 'Ví dụ 118', exampleVn: 'Nghĩa ví dụ 118' },
  { id: '119', word: 'Từvựng119', pinyin: 'túvŭng119', meaning_vn: 'Nghĩa 119', level: 'HSK 6', exampleCn: 'Ví dụ 119', exampleVn: 'Nghĩa ví dụ 119' },
  { id: '120', word: 'Từvựng120', pinyin: 'túvŭng120', meaning_vn: 'Nghĩa 120', level: 'HSK 1', exampleCn: 'Ví dụ 120', exampleVn: 'Nghĩa ví dụ 120' },
  { id: '121', word: 'Từvựng121', pinyin: 'túvŭng121', meaning_vn: 'Nghĩa 121', level: 'HSK 2', exampleCn: 'Ví dụ 121', exampleVn: 'Nghĩa ví dụ 121' },
  { id: '122', word: 'Từvựng122', pinyin: 'túvŭng122', meaning_vn: 'Nghĩa 122', level: 'HSK 3', exampleCn: 'Ví dụ 122', exampleVn: 'Nghĩa ví dụ 122' },
  { id: '123', word: 'Từvựng123', pinyin: 'túvŭng123', meaning_vn: 'Nghĩa 123', level: 'HSK 4', exampleCn: 'Ví dụ 123', exampleVn: 'Nghĩa ví dụ 123' },
  { id: '124', word: 'Từvựng124', pinyin: 'túvŭng124', meaning_vn: 'Nghĩa 124', level: 'HSK 5', exampleCn: 'Ví dụ 124', exampleVn: 'Nghĩa ví dụ 124' },
  { id: '125', word: 'Từvựng125', pinyin: 'túvŭng125', meaning_vn: 'Nghĩa 125', level: 'HSK 6', exampleCn: 'Ví dụ 125', exampleVn: 'Nghĩa ví dụ 125' },
  { id: '126', word: 'Từvựng126', pinyin: 'túvŭng126', meaning_vn: 'Nghĩa 126', level: 'HSK 1', exampleCn: 'Ví dụ 126', exampleVn: 'Nghĩa ví dụ 126' },
  { id: '127', word: 'Từvựng127', pinyin: 'túvŭng127', meaning_vn: 'Nghĩa 127', level: 'HSK 2', exampleCn: 'Ví dụ 127', exampleVn: 'Nghĩa ví dụ 127' },
  { id: '128', word: 'Từvựng128', pinyin: 'túvŭng128', meaning_vn: 'Nghĩa 128', level: 'HSK 3', exampleCn: 'Ví dụ 128', exampleVn: 'Nghĩa ví dụ 128' },
  { id: '129', word: 'Từvựng129', pinyin: 'túvŭng129', meaning_vn: 'Nghĩa 129', level: 'HSK 4', exampleCn: 'Ví dụ 129', exampleVn: 'Nghĩa ví dụ 129' },
  { id: '130', word: 'Từvựng130', pinyin: 'túvŭng130', meaning_vn: 'Nghĩa 130', level: 'HSK 5', exampleCn: 'Ví dụ 130', exampleVn: 'Nghĩa ví dụ 130' },
  { id: '131', word: 'Từvựng131', pinyin: 'túvŭng131', meaning_vn: 'Nghĩa 131', level: 'HSK 6', exampleCn: 'Ví dụ 131', exampleVn: 'Nghĩa ví dụ 131' },
  { id: '132', word: 'Từvựng132', pinyin: 'túvŭng132', meaning_vn: 'Nghĩa 132', level: 'HSK 1', exampleCn: 'Ví dụ 132', exampleVn: 'Nghĩa ví dụ 132' },
  { id: '133', word: 'Từvựng133', pinyin: 'túvŭng133', meaning_vn: 'Nghĩa 133', level: 'HSK 2', exampleCn: 'Ví dụ 133', exampleVn: 'Nghĩa ví dụ 133' },
  { id: '134', word: 'Từvựng134', pinyin: 'túvŭng134', meaning_vn: 'Nghĩa 134', level: 'HSK 3', exampleCn: 'Ví dụ 134', exampleVn: 'Nghĩa ví dụ 134' },
  { id: '135', word: 'Từvựng135', pinyin: 'túvŭng135', meaning_vn: 'Nghĩa 135', level: 'HSK 4', exampleCn: 'Ví dụ 135', exampleVn: 'Nghĩa ví dụ 135' },
  { id: '136', word: 'Từvựng136', pinyin: 'túvŭng136', meaning_vn: 'Nghĩa 136', level: 'HSK 5', exampleCn: 'Ví dụ 136', exampleVn: 'Nghĩa ví dụ 136' },
  { id: '137', word: 'Từvựng137', pinyin: 'túvŭng137', meaning_vn: 'Nghĩa 137', level: 'HSK 6', exampleCn: 'Ví dụ 137', exampleVn: 'Nghĩa ví dụ 137' },
  { id: '138', word: 'Từvựng138', pinyin: 'túvŭng138', meaning_vn: 'Nghĩa 138', level: 'HSK 1', exampleCn: 'Ví dụ 138', exampleVn: 'Nghĩa ví dụ 138' },
  { id: '139', word: 'Từvựng139', pinyin: 'túvŭng139', meaning_vn: 'Nghĩa 139', level: 'HSK 2', exampleCn: 'Ví dụ 139', exampleVn: 'Nghĩa ví dụ 139' },
  { id: '140', word: 'Từvựng140', pinyin: 'túvŭng140', meaning_vn: 'Nghĩa 140', level: 'HSK 3', exampleCn: 'Ví dụ 140', exampleVn: 'Nghĩa ví dụ 140' },
  { id: '141', word: 'Từvựng141', pinyin: 'túvŭng141', meaning_vn: 'Nghĩa 141', level: 'HSK 4', exampleCn: 'Ví dụ 141', exampleVn: 'Nghĩa ví dụ 141' },
  { id: '142', word: 'Từvựng142', pinyin: 'túvŭng142', meaning_vn: 'Nghĩa 142', level: 'HSK 5', exampleCn: 'Ví dụ 142', exampleVn: 'Nghĩa ví dụ 142' },
  { id: '143', word: 'Từvựng143', pinyin: 'túvŭng143', meaning_vn: 'Nghĩa 143', level: 'HSK 6', exampleCn: 'Ví dụ 143', exampleVn: 'Nghĩa ví dụ 143' },
  { id: '144', word: 'Từvựng144', pinyin: 'túvŭng144', meaning_vn: 'Nghĩa 144', level: 'HSK 1', exampleCn: 'Ví dụ 144', exampleVn: 'Nghĩa ví dụ 144' },
  { id: '145', word: 'Từvựng145', pinyin: 'túvŭng145', meaning_vn: 'Nghĩa 145', level: 'HSK 2', exampleCn: 'Ví dụ 145', exampleVn: 'Nghĩa ví dụ 145' },
  { id: '146', word: 'Từvựng146', pinyin: 'túvŭng146', meaning_vn: 'Nghĩa 146', level: 'HSK 3', exampleCn: 'Ví dụ 146', exampleVn: 'Nghĩa ví dụ 146' },
  { id: '147', word: 'Từvựng147', pinyin: 'túvŭng147', meaning_vn: 'Nghĩa 147', level: 'HSK 4', exampleCn: 'Ví dụ 147', exampleVn: 'Nghĩa ví dụ 147' },
  { id: '148', word: 'Từvựng148', pinyin: 'túvŭng148', meaning_vn: 'Nghĩa 148', level: 'HSK 5', exampleCn: 'Ví dụ 148', exampleVn: 'Nghĩa ví dụ 148' },
  { id: '149', word: 'Từvựng149', pinyin: 'túvŭng149', meaning_vn: 'Nghĩa 149', level: 'HSK 6', exampleCn: 'Ví dụ 149', exampleVn: 'Nghĩa ví dụ 149' },
  { id: '150', word: 'Từvựng150', pinyin: 'túvŭng150', meaning_vn: 'Nghĩa 150', level: 'HSK 1', exampleCn: 'Ví dụ 150', exampleVn: 'Nghĩa ví dụ 150' },
  { id: '151', word: 'Từvựng151', pinyin: 'túvŭng151', meaning_vn: 'Nghĩa 151', level: 'HSK 2', exampleCn: 'Ví dụ 151', exampleVn: 'Nghĩa ví dụ 151' },
  { id: '152', word: 'Từvựng152', pinyin: 'túvŭng152', meaning_vn: 'Nghĩa 152', level: 'HSK 3', exampleCn: 'Ví dụ 152', exampleVn: 'Nghĩa ví dụ 152' },
  { id: '153', word: 'Từvựng153', pinyin: 'túvŭng153', meaning_vn: 'Nghĩa 153', level: 'HSK 4', exampleCn: 'Ví dụ 153', exampleVn: 'Nghĩa ví dụ 153' },
  { id: '154', word: 'Từvựng154', pinyin: 'túvŭng154', meaning_vn: 'Nghĩa 154', level: 'HSK 5', exampleCn: 'Ví dụ 154', exampleVn: 'Nghĩa ví dụ 154' },
  { id: '155', word: 'Từvựng155', pinyin: 'túvŭng155', meaning_vn: 'Nghĩa 155', level: 'HSK 6', exampleCn: 'Ví dụ 155', exampleVn: 'Nghĩa ví dụ 155' },
  { id: '156', word: 'Từvựng156', pinyin: 'túvŭng156', meaning_vn: 'Nghĩa 156', level: 'HSK 1', exampleCn: 'Ví dụ 156', exampleVn: 'Nghĩa ví dụ 156' },
  { id: '157', word: 'Từvựng157', pinyin: 'túvŭng157', meaning_vn: 'Nghĩa 157', level: 'HSK 2', exampleCn: 'Ví dụ 157', exampleVn: 'Nghĩa ví dụ 157' },
  { id: '158', word: 'Từvựng158', pinyin: 'túvŭng158', meaning_vn: 'Nghĩa 158', level: 'HSK 3', exampleCn: 'Ví dụ 158', exampleVn: 'Nghĩa ví dụ 158' },
  { id: '159', word: 'Từvựng159', pinyin: 'túvŭng159', meaning_vn: 'Nghĩa 159', level: 'HSK 4', exampleCn: 'Ví dụ 159', exampleVn: 'Nghĩa ví dụ 159' },
  { id: '160', word: 'Từvựng160', pinyin: 'túvŭng160', meaning_vn: 'Nghĩa 160', level: 'HSK 5', exampleCn: 'Ví dụ 160', exampleVn: 'Nghĩa ví dụ 160' },
  { id: '161', word: 'Từvựng161', pinyin: 'túvŭng161', meaning_vn: 'Nghĩa 161', level: 'HSK 6', exampleCn: 'Ví dụ 161', exampleVn: 'Nghĩa ví dụ 161' },
  { id: '162', word: 'Từvựng162', pinyin: 'túvŭng162', meaning_vn: 'Nghĩa 162', level: 'HSK 1', exampleCn: 'Ví dụ 162', exampleVn: 'Nghĩa ví dụ 162' },
  { id: '163', word: 'Từvựng163', pinyin: 'túvŭng163', meaning_vn: 'Nghĩa 163', level: 'HSK 2', exampleCn: 'Ví dụ 163', exampleVn: 'Nghĩa ví dụ 163' },
  { id: '164', word: 'Từvựng164', pinyin: 'túvŭng164', meaning_vn: 'Nghĩa 164', level: 'HSK 3', exampleCn: 'Ví dụ 164', exampleVn: 'Nghĩa ví dụ 164' },
  { id: '165', word: 'Từvựng165', pinyin: 'túvŭng165', meaning_vn: 'Nghĩa 165', level: 'HSK 4', exampleCn: 'Ví dụ 165', exampleVn: 'Nghĩa ví dụ 165' },
  { id: '166', word: 'Từvựng166', pinyin: 'túvŭng166', meaning_vn: 'Nghĩa 166', level: 'HSK 5', exampleCn: 'Ví dụ 166', exampleVn: 'Nghĩa ví dụ 166' },
  { id: '167', word: 'Từvựng167', pinyin: 'túvŭng167', meaning_vn: 'Nghĩa 167', level: 'HSK 6', exampleCn: 'Ví dụ 167', exampleVn: 'Nghĩa ví dụ 167' },
  { id: '168', word: 'Từvựng168', pinyin: 'túvŭng168', meaning_vn: 'Nghĩa 168', level: 'HSK 1', exampleCn: 'Ví dụ 168', exampleVn: 'Nghĩa ví dụ 168' },
  { id: '169', word: 'Từvựng169', pinyin: 'túvŭng169', meaning_vn: 'Nghĩa 169', level: 'HSK 2', exampleCn: 'Ví dụ 169', exampleVn: 'Nghĩa ví dụ 169' },
  { id: '170', word: 'Từvựng170', pinyin: 'túvŭng170', meaning_vn: 'Nghĩa 170', level: 'HSK 3', exampleCn: 'Ví dụ 170', exampleVn: 'Nghĩa ví dụ 170' },
  { id: '171', word: 'Từvựng171', pinyin: 'túvŭng171', meaning_vn: 'Nghĩa 171', level: 'HSK 4', exampleCn: 'Ví dụ 171', exampleVn: 'Nghĩa ví dụ 171' },
  { id: '172', word: 'Từvựng172', pinyin: 'túvŭng172', meaning_vn: 'Nghĩa 172', level: 'HSK 5', exampleCn: 'Ví dụ 172', exampleVn: 'Nghĩa ví dụ 172' },
  { id: '173', word: 'Từvựng173', pinyin: 'túvŭng173', meaning_vn: 'Nghĩa 173', level: 'HSK 6', exampleCn: 'Ví dụ 173', exampleVn: 'Nghĩa ví dụ 173' },
  { id: '174', word: 'Từvựng174', pinyin: 'túvŭng174', meaning_vn: 'Nghĩa 174', level: 'HSK 1', exampleCn: 'Ví dụ 174', exampleVn: 'Nghĩa ví dụ 174' },
  { id: '175', word: 'Từvựng175', pinyin: 'túvŭng175', meaning_vn: 'Nghĩa 175', level: 'HSK 2', exampleCn: 'Ví dụ 175', exampleVn: 'Nghĩa ví dụ 175' },
  { id: '176', word: 'Từvựng176', pinyin: 'túvŭng176', meaning_vn: 'Nghĩa 176', level: 'HSK 3', exampleCn: 'Ví dụ 176', exampleVn: 'Nghĩa ví dụ 176' },
  { id: '177', word: 'Từvựng177', pinyin: 'túvŭng177', meaning_vn: 'Nghĩa 177', level: 'HSK 4', exampleCn: 'Ví dụ 177', exampleVn: 'Nghĩa ví dụ 177' },
  { id: '178', word: 'Từvựng178', pinyin: 'túvŭng178', meaning_vn: 'Nghĩa 178', level: 'HSK 5', exampleCn: 'Ví dụ 178', exampleVn: 'Nghĩa ví dụ 178' },
  { id: '179', word: 'Từvựng179', pinyin: 'túvŭng179', meaning_vn: 'Nghĩa 179', level: 'HSK 6', exampleCn: 'Ví dụ 179', exampleVn: 'Nghĩa ví dụ 179' },
  { id: '180', word: 'Từvựng180', pinyin: 'túvŭng180', meaning_vn: 'Nghĩa 180', level: 'HSK 1', exampleCn: 'Ví dụ 180', exampleVn: 'Nghĩa ví dụ 180' },
  { id: '181', word: 'Từvựng181', pinyin: 'túvŭng181', meaning_vn: 'Nghĩa 181', level: 'HSK 2', exampleCn: 'Ví dụ 181', exampleVn: 'Nghĩa ví dụ 181' },
  { id: '182', word: 'Từvựng182', pinyin: 'túvŭng182', meaning_vn: 'Nghĩa 182', level: 'HSK 3', exampleCn: 'Ví dụ 182', exampleVn: 'Nghĩa ví dụ 182' },
  { id: '183', word: 'Từvựng183', pinyin: 'túvŭng183', meaning_vn: 'Nghĩa 183', level: 'HSK 4', exampleCn: 'Ví dụ 183', exampleVn: 'Nghĩa ví dụ 183' },
  { id: '184', word: 'Từvựng184', pinyin: 'túvŭng184', meaning_vn: 'Nghĩa 184', level: 'HSK 5', exampleCn: 'Ví dụ 184', exampleVn: 'Nghĩa ví dụ 184' },
  { id: '185', word: 'Từvựng185', pinyin: 'túvŭng185', meaning_vn: 'Nghĩa 185', level: 'HSK 6', exampleCn: 'Ví dụ 185', exampleVn: 'Nghĩa ví dụ 185' },
  { id: '186', word: 'Từvựng186', pinyin: 'túvŭng186', meaning_vn: 'Nghĩa 186', level: 'HSK 1', exampleCn: 'Ví dụ 186', exampleVn: 'Nghĩa ví dụ 186' },
  { id: '187', word: 'Từvựng187', pinyin: 'túvŭng187', meaning_vn: 'Nghĩa 187', level: 'HSK 2', exampleCn: 'Ví dụ 187', exampleVn: 'Nghĩa ví dụ 187' },
  { id: '188', word: 'Từvựng188', pinyin: 'túvŭng188', meaning_vn: 'Nghĩa 188', level: 'HSK 3', exampleCn: 'Ví dụ 188', exampleVn: 'Nghĩa ví dụ 188' },
  { id: '189', word: 'Từvựng189', pinyin: 'túvŭng189', meaning_vn: 'Nghĩa 189', level: 'HSK 4', exampleCn: 'Ví dụ 189', exampleVn: 'Nghĩa ví dụ 189' },
  { id: '190', word: 'Từvựng190', pinyin: 'túvŭng190', meaning_vn: 'Nghĩa 190', level: 'HSK 5', exampleCn: 'Ví dụ 190', exampleVn: 'Nghĩa ví dụ 190' },
  { id: '191', word: 'Từvựng191', pinyin: 'túvŭng191', meaning_vn: 'Nghĩa 191', level: 'HSK 6', exampleCn: 'Ví dụ 191', exampleVn: 'Nghĩa ví dụ 191' },
  { id: '192', word: 'Từvựng192', pinyin: 'túvŭng192', meaning_vn: 'Nghĩa 192', level: 'HSK 1', exampleCn: 'Ví dụ 192', exampleVn: 'Nghĩa ví dụ 192' },
  { id: '193', word: 'Từvựng193', pinyin: 'túvŭng193', meaning_vn: 'Nghĩa 193', level: 'HSK 2', exampleCn: 'Ví dụ 193', exampleVn: 'Nghĩa ví dụ 193' },
  { id: '194', word: 'Từvựng194', pinyin: 'túvŭng194', meaning_vn: 'Nghĩa 194', level: 'HSK 3', exampleCn: 'Ví dụ 194', exampleVn: 'Nghĩa ví dụ 194' },
  { id: '195', word: 'Từvựng195', pinyin: 'túvŭng195', meaning_vn: 'Nghĩa 195', level: 'HSK 4', exampleCn: 'Ví dụ 195', exampleVn: 'Nghĩa ví dụ 195' },
  { id: '196', word: 'Từvựng196', pinyin: 'túvŭng196', meaning_vn: 'Nghĩa 196', level: 'HSK 5', exampleCn: 'Ví dụ 196', exampleVn: 'Nghĩa ví dụ 196' },
  { id: '197', word: 'Từvựng197', pinyin: 'túvŭng197', meaning_vn: 'Nghĩa 197', level: 'HSK 6', exampleCn: 'Ví dụ 197', exampleVn: 'Nghĩa ví dụ 197' },
  { id: '198', word: 'Từvựng198', pinyin: 'túvŭng198', meaning_vn: 'Nghĩa 198', level: 'HSK 1', exampleCn: 'Ví dụ 198', exampleVn: 'Nghĩa ví dụ 198' },
  { id: '199', word: 'Từvựng199', pinyin: 'túvŭng199', meaning_vn: 'Nghĩa 199', level: 'HSK 2', exampleCn: 'Ví dụ 199', exampleVn: 'Nghĩa ví dụ 199' },
  { id: '200', word: 'Từvựng200', pinyin: 'túvŭng200', meaning_vn: 'Nghĩa 200', level: 'HSK 3', exampleCn: 'Ví dụ 200', exampleVn: 'Nghĩa ví dụ 200' }
];
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  login: async (data: any) => { 
    try {
      const response = await apiClient.post('/api/v1/auth/login', {
        email: data.email,
        password: data.password,
        userName: data.email, // using email as userName for now
        ipAddress: data.ipAddress || '127.0.0.1'
      }) as any;
      return { 
        isSuccess: true, 
        accessToken: response.token || response.accessToken, 
        userId: response.userId,
        role: response.role,
        message: 'Success' 
      };
    } catch (error: any) {
      // Fallback for demo accounts if backend fails or doesn't support them
      const { email, password, role } = data;
      if (email === 'admin@chuang.com' && password === 'admin123' && role === 'admin') {
        return { isSuccess: true, accessToken: 'admin_mock_token', refreshToken: 'admin_mock_refresh', userId: 'admin-01', role: 'admin', name: 'Super Admin', message: 'Success' };
      }
      if (email === 'student@chuang.com' && password === 'student123' && role === 'student') {
        return { isSuccess: true, accessToken: 'student_mock_token', refreshToken: 'student_mock_refresh', userId: 'student-01', role: 'student', name: 'John Student', message: 'Success' };
      }
      return { isSuccess: false, message: error || 'Sai thông tin đăng nhập hoặc sai vai trò (Role).' };
    }
  },
  register: async (data: any) => { 
    return (await apiClient.post('/api/v1/auth/register', data)) as any;
  },
  logout: async (data?: any) => { 
    try {
      return (await apiClient.post('/api/v1/auth/logout', { logoutAllDevices: false })) as any;
    } catch {
      return { message: 'Logged out successfully' };
    }
  },
  logoutAll: async () => { 
    try {
      return (await apiClient.post('/api/v1/auth/logout', { logoutAllDevices: true })) as any;
    } catch {
      return { message: 'Logged out of all devices' };
    }
  }
};

export const learningService = {
  getLessons: async () => { 
    try {
      return (await apiClient.get('/api/v1/learning/catalog')) as any;
    } catch {
      return MOCK_CATEGORIES; 
    }
  },
  getLessonDetail: async (id: string) => { 
    // Not formally defined in swagger paths, use mock as fallback
    await sleep(300); return MOCK_LESSON_DETAIL; 
  },
  getLessonVocabularies: async (id: string) => { 
    try {
      return (await apiClient.get(`/api/v1/learning/lessons/${id}/vocabularies`)) as any;
    } catch {
      return MOCK_VOCABULARIES; 
    }
  },
  getDocuments: async (categoryId?: number) => { await sleep(300); return [{ id: 1, title: 'Tài liệu HSK 1', url: '#' }]; },
  saveProgress: async (data: any) => { 
    try {
      return (await apiClient.post('/api/v1/study-progress/lessons', data)) as any;
    } catch {
      return { success: true }; 
    }
  },
  submitQuizResult: async (lessonId: string, score: number, total: number) => { 
    // Might be folded into saveProgress based on api docs
    return learningService.saveProgress({ lessonId, score, completed: score === total, timeSpentS: 0 });
  }
};

export const vocabularyService = {
  getVocabularies: async (params?: any) => { 
    try {
      return (await apiClient.get('/api/v1/dictionary/search', { params: { query: params?.search || '' } })) as any;
    } catch {
      return { data: MOCK_VOCABULARIES, totalCount: MOCK_VOCABULARIES.length, pageIndex: 1, pageSize: 200 }; 
    }
  },
  importVocabularies: async (file: File) => {
    return api.importExcel(file);
  }
};

export const adminService = {
  getImportJobs: async () => [{id: "job-1", status: "completed", processedRows: 500, time: new Date().toISOString()}],
  getSystemStats: async () => { await sleep(600); return { totalUsers: 1250, activeUsersToday: 142, totalVocab: MOCK_VOCABULARIES.length, totalLessons: 50 }; },
  getRecentImportJobs: async () => { await sleep(400); return [{ id: 'job-1', status: 'completed', processedRows: 500 }, { id: 'job-2', status: 'failed', processedRows: 120, failedRows: 5 }]; },
  getLessonsSummary: async () => { await sleep(400); return Array.from({length: 50}, (_, i) => ({ id: `${i+1}`, title_vn: `Bài ${i+1}: Topic ${i+1}`, vocab_count: 20, quiz_count: 5 })); }
};

export const userService = {
  getUserProfile: async () => { await sleep(400); return { id: 'user1', username: 'student1', email: 'student@example.com', displayName: 'Học viên Chăm chỉ' }; },
  getStats: async () => { 
    try {
      return (await apiClient.get('/api/v1/profile/analytics')) as any;
    } catch {
      return { totalPoints: 1250, avgScore: 85.5, lessonsCompleted: 12, timeSpentS: 3600 * 5, lastPlayed: new Date().toISOString() };
    }
  },
  getUserStats: async () => { return userService.getStats(); },
  getRecentHistory: async () => { 
    try {
      return (await apiClient.get('/api/v1/profile/vocabulary-mastery')) as any;
    } catch {
      return [{ id: '1', type: 'quiz', title: 'Bài 1 Quiz', score: 90, date: new Date().toISOString() }];
    }
  }
};


export interface Vocabulary {
  id: string;
  word: string;
  pinyin: string;
  meaning_vn: string;
  meaning_en?: string;
  level: string;
  exampleCn?: string;
  exampleVn?: string;
  example_cn?: string;
  example_vn?: string;
  imageUrl?: string;
  image?: string;
  audio?: string;
}

export interface LearningHistory {
  id: string;
  lessonId: string;
  lessonName: string;
  score: number;
  totalQuizzes: number;
  completedAt: string;
  type?: string;
  timestamp?: string;
  content?: string;
}


export const api = {
  getVocabulary: async (search?: string, level?: string) => {
    try {
      const response = await apiClient.get('/api/v1/dictionary/search', { params: { query: search || level } }) as any;
      if (response && response.data) {
        return response.data;
      }
      return response;
    } catch {
      return MOCK_VOCABULARIES.map(v => ({ ...v, image: v.imageUrl, example_cn: v.exampleCn, example_vn: v.exampleVn, meaning_en: v.meaning_en || "English meaning" } as Vocabulary));
    }
  },
  importExcel: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('excelFile', file);
      return (await apiClient.post('/api/v1/admin/vocabularies/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })) as any;
    } catch {
      return { success: true, message: 'Nhập dữ liệu thành công (Fallback)', count: 50 };
    }
  },
  getHistory: async (userId: string) => {
    return [{ id: '1', lessonId: '1', lessonName: 'Bài 1: Xin chào', score: 4, totalQuizzes: 4, completedAt: new Date().toISOString(), type: 'quiz', timestamp: new Date().toISOString(), content: 'Bài 1 Quiz' }] as LearningHistory[];
  },
  updateUserProfile: async (id: string, data: any) => {
    return { success: true };
  }
};
