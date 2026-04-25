# Tài liệu Hướng dẫn Hệ thống Học Tiếng Trung

Tài liệu này mô tả chi tiết về cấu trúc các màn hình (screens/pages) trong ứng dụng, nguồn dữ liệu cung cấp cho các màn hình và cách thức điều chỉnh (thêm/sửa/xóa) dữ liệu.

---

## 1. Tổng quan Kiến trúc Dữ liệu

Hiện tại ứng dụng sử dụng **dữ liệu giả lập (Mock Data)** được định nghĩa trực tiếp trong Source Code để mô phỏng hoạt động của API thực tế. 

- **Vị trí file dữ liệu chính:** `src/services/api.ts`
- **Cách thức hoạt động:** Các trang trong ứng dụng sẽ gọi các hàm từ `api.ts` (ví dụ: `learningService.getLessons()`, `api.getVocabulary()`). Các hàm này kết hợp cơ chế `sleep` để tạo độ trễ giả lập giống như đang gọi lên máy chủ (server), sau đó trả về dữ liệu mock.

---

## 2. Chi tiết các màn hình (Screens)

Ứng dụng được chia thành 3 phân hệ chính: **Public** (Giao diện khách), **Student** (Giao diện người học), và **Admin** (Giao diện Quản trị).

### A. Phân hệ Người học (Student)

**1. Màn hình Dashboard (Trang Chủ Nguời Học)**
- **File:** `src/pages/student/Dashboard.tsx`
- **Chức năng:** Hiển thị tổng quan tiến trình học tập (điểm số, số bài đã hoàn thành, thời gian học) và lịch sử học tập gần đây.
- **Nguồn dữ liệu:** `userService.getStats()`, `learningService.getLessons()`, `userService.getRecentHistory()`.
- **Cách điều chỉnh:** Trong `api.ts`, tìm đến `userService` và chỉnh sửa mock object trả về trong các hàm.

**2. Màn hình Bài học (Lessons List)**
- **File:** `src/pages/student/Lessons.tsx` (hoặc tương tự)
- **Chức năng:** Liệt kê các chủ đề bài học theo các cấp độ (Sơ cấp, Trung cấp, Cao cấp).
- **Nguồn dữ liệu:** Biến `MOCK_CATEGORIES` gọi qua `learningService.getLessons()`.
- **Cách điều chỉnh:**
  - Mở `src/services/api.ts`.
  - Tìm `MOCK_CATEGORIES`. Nó là một mảng các danh mục (Category).
  - Thêm một bài học mới bằng cách thêm một object vào mảng `items` của danh mục tương ứng.

**3. Màn hình Chi tiết Bài học & Thẻ Hán Tự (Lesson Detail)**
- **File:** `src/pages/student/LessonDetail.tsx`
- **Chức năng:** Khi nhấp vào một bài học, màn hình này hiển thị chi tiết gồm Thẻ từ vựng Hán Tự, Bộ thủ và Nút làm bài tập (Quiz).
- **Nguồn dữ liệu:** Biến `MOCK_LESSON_DETAIL` gọi qua `learningService.getLessonDetail(id)`.
- **Cách điều chỉnh:** 
  - Trong `src/services/api.ts`, tìm `MOCK_LESSON_DETAIL`.
  - Để thêm Flashcard (Hán tự), thêm vào mảng `hanziCards`.
  - Để thêm bộ thủ, thêm vào `radicalSets`.

**4. Màn hình Bài Tập Trắc Nghiệm (Quiz)**
- **File:** `src/pages/student/Quiz.tsx`
- **Chức năng:** Cung cấp chức năng chọn đáp án trắc nghiệm cho bài học, chấm điểm sau khi hoàn thành.
- **Nguồn dữ liệu:** Cùng nguồn từ `MOCK_LESSON_DETAIL.quizzes`.
- **Cách điều chỉnh:** 
  - Tìm mảng `quizzes` bên trong `MOCK_LESSON_DETAIL` trong `src/services/api.ts`.
  - Cấu trúc một câu hỏi gồm `id`, `question`, `options` (chứa các đáp án, với `isCorrect: true` cho đáp án đúng). Thêm/sửa trực tiếp tại đây.

**5. Màn hình Thư viện Từ vựng (Vocabulary)**
- **File:** `src/pages/student/Vocabulary.tsx`
- **Chức năng:** Danh sách từ vựng dưới dạng bảng và thẻ (card), hỗ trợ tìm kiếm và lọc theo cấp độ HSK.
- **Nguồn dữ liệu:** Gọi qua `api.getVocabulary()` lấy từ `MOCK_VOCABULARIES`.
- **Cách điều chỉnh:**
  - Tìm `MOCK_VOCABULARIES` trong `src/services/api.ts`.
  - Là một mảng khổng lồ các object. Có thể thêm thông tin: `word`, `pinyin`, `meaning_vn`, `level`, `exampleCn`, `exampleVn`.

---

### B. Phân hệ Quản trị (Admin)

**1. Màn hình Dashboard Quản trị**
- **File:** `src/pages/admin/Dashboard.tsx`
- **Chức năng:** Hiển thị thống kê hệ thống (tổng học viên, lượng từ vựng, tài liệu đã tải lên...)
- **Nguồn dữ liệu:** `adminService.getSystemStats()`, `adminService.getRecentImportJobs()`, `adminService.getLessonsSummary()`.
- **Cách điều chỉnh:** Sửa các giá trị trả về trong `adminService` tại file `api.ts`.

**2. Quản lý File & Từ vựng (Vocabulary Manager)**
- **File:** `src/pages/admin/FileManager.tsx`
- **Chức năng:** Liệt kê bảng từ vựng toàn hệ thống dưới góc độ quản trị, thanh tìm kiếm từ vựng.
- **Nguồn dữ liệu:** Tương tự màn hình từ vựng của sinh viên, lấy từ `api.getVocabulary()`.

**3. Nhập Dữ liệu (Import Data)**
- **File:** `src/pages/admin/ImportData.tsx`
- **Chức năng:** Mô phỏng tính năng upload file Excel để import lượng lớn từ vựng/bài học vào hệ thống.
- **Nguồn dữ liệu:** Gọi hàm `api.importExcel()`. Hiện tại hàm này chỉ mock trả về `success: true`.
- **Cách điều chỉnh:** Do đây là frontend-only, chức năng upload không thực sự ghi dữ liệu vĩnh viễn vào DB.

---

## 3. Cách Tùy Chỉnh & Mở Rộng Hệ thống sau này

### Nếu muốn chuyển sang dùng Database thật (Firebase / REST API backend)

1. **Chuẩn bị Backend:** Cài đặt Firebase hoặc một server Node.js/Python... 
2. **Sửa file `src/services/api.ts`:**
   Thay vì trả về `MOCK_VOCABULARIES` và dùng `sleep()`, bạn cần sử dụng thư viện `axios` hoặc `fetch` (hoặc SDK Firebase) để gọi API thật.
   *Ví dụ chuyển đổi:*
   ```typescript
   export const api = {
     getVocabulary: async (search?: string, level?: string) => {
        // Hiện tại:
        // return MOCK_VOCABULARIES;
        
        // Cần đổi thành:
        // const response = await fetch('/api/vocabulary?search=' + search);
        // const data = await response.json();
        // return data;
     }
   }
   ```

### C. Chuyển đổi sang API Thật (Real Backend API)

Khi dự án của bạn đã có backend thật (RESTful API viết bằng Node.js, Python, Java...), bạn không cần dùng dữ liệu mock nữa. Dưới đây là hướng dẫn từng bước để kết nối ứng dụng React này với backend thật.

**1. Chuẩn bị biến môi trường (Environment Variables)**
Trong môi trường thực tế, URL của API sẽ thay đổi tùy thuộc vào nơi ứng dụng đang chạy (local, test, production). 
Tạo file `.env` ở thư mục gốc của dự án nếu chưa có, và thêm biến môi trường cho base URL của API:
```env
VITE_API_BASE_URL=https://api.domain-cua-ban.com/api/v1
```

**2. Cập nhật file `src/services/apiClient.ts`**
Dự án đã có sẵn file `apiClient.ts`. File này đóng vai trò như một màng bọc cho `axios` hoặc `fetch`. Hãy mở thư mục `src/services/` và xem hoặc tạo file `apiClient.ts`.
Chỉnh sửa file này để tự động lấy token và gắn vào request:

```typescript
// src/services/apiClient.ts
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Trước khi gửi request đi
apiClient.interceptors.request.use((config) => {
  // Lấy token từ localStorage (người dùng đã đăng nhập)
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

// Interceptor: Xử lý lỗi trả về (VD: Token hết hạn)
apiClient.interceptors.response.use(
  (response) => response.data, // Chỉ lấy nội dung data, bỏ qua header của axios
  async (error) => {
    // Xử lý logic 401 Unauthorized tại đây nếu cần (refresh token)
    return Promise.reject(error);
  }
);
```

**3. Thay thế các lệnh trả về dữ liệu Mock bằng gọi API thật trong `api.ts`**
Mở file `src/services/api.ts`. Hiện tại các service đang dùng lệnh \`await sleep()\` và trả về biến `MOCK_XXX`. Bạn sẽ xóa những biến mock đi và dùng \`apiClient\` đã thiết lập ở trên.

*Ví dụ chuyển `userService`:*
```typescript
// --- TRƯỚC KHI CHUYỂN ĐỔI ---
export const userService = {
  getStats: async () => { 
    await sleep(400); 
    return { totalPoints: 1250, avgScore: 85.5, lessonsCompleted: 12, timeSpentS: 3600 * 5, lastPlayed: new Date().toISOString() }; 
  },
  // ...
};

// --- SAU KHI CHUYỂN ĐỔI ---
import { apiClient } from './apiClient';

export const userService = {
  getStats: async () => { 
     // Gửi GET request tới <VITE_API_BASE_URL>/users/me/stats
     return await apiClient.get('/users/me/stats'); 
  },
  getRecentHistory: async () => {
     return await apiClient.get('/users/me/history');
  }
};
```

*Ví dụ chuyển `vocabularyService` có truyền tham số dạng Query / Body:*
```typescript
// api.ts
import { apiClient } from './apiClient';

export const api = {
  // GET: ?search=abc&level=HSK 1
  getVocabulary: async (search?: string, level?: string) => {
    return await apiClient.get('/vocabularies', {
       params: { search, level } // Tự động nối thành url query string
    });
  },

  // POST Form Data (Upload File)
  importExcel: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return await apiClient.post('/admin/import-excel', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  // ...
};
```

**4. Kết nối logic Đăng nhập / Đăng xuất với Backend**
```typescript
// Ví dụ với authService trong api.ts
export const authService = {
  login: async (credentials: any) => { 
    const data = await apiClient.post('/auth/login', credentials);
    // Lưu token sau khi đăng nhập thành công
    if (data.accessToken) {
       localStorage.setItem('access_token', data.accessToken);
    }
    return data;
  },
  logout: async () => { 
    try {
      await apiClient.post('/auth/logout');
    } finally {
      // Dù API có trả lỗi thì vẫn phải xóa token ở Browser
      localStorage.removeItem('access_token');
      window.location.href = '/login'; 
    }
  }
};
```

### Tổng kết quy trình chuyển từ Mock sang Real API:
Đó hoàn toàn là một quá trình Refactor (sửa cấu trúc code). Vì React Component đã gọi các hàm như `api.getVocabulary()`, miễn là hàm này bây giờ trả về từ backend thật (với cấu trúc Interface TypeScript khớp nhau), bạn sẽ **KHÔNG PHẢI SỬA BẤT KỲ FILE GIAO DIỆN (`.tsx`) NÀO**.

1. Cài đặt thư viện `axios` (`npm install axios`) nếu chưa có hoặc copy mẫu `fetch` API.
2. Xây dựng một Client cấu hình sẵn BaseURL và Authentication Headers (`apiClient.ts`).
3. Xóa các biến `MOCK_` (VD: `MOCK_LESSON_DETAIL`, `MOCK_VOCABULARIES`).
4. Thay lõi của các hàm async trong `src/services/api.ts` bằng các lệnh gọi `apiClient.get()`, `.post()`.
5. Đảm bảo cấu trúc dữ liệu JSON backend trả về trùng khớp với Interface đã khai báo (như `export interface LessonDetail { id: string, titleCn: string... }`). Nếu có sự khác biệt (ví dụ backend trả về \`title_cn\` snake_case), bạn map/chuyển đổi nó ra frontend tại lớp `api.ts` thay vì rải lỗi gõ phím ở mọi giao diện.

---

## 4. Quản lý trạng thái (State Management) với Redux Toolkit

Gần đây hệ thống đã chuyển từ React Context API sang sử dụng **Redux Toolkit** để quản lý trạng thái global hiệu quả hơn (bao gồm trạng thái đăng nhập, thông tin user).

### Cấu trúc Redux trong dự án
- **File Store chính:** `src/store/index.ts` (Nơi tổng hợp tất cả các reducer)
- **Các Slice (Module trạng thái):** Nằm trong thư mục `src/store/slices/`. Hiện tại có file `authSlice.ts` định nghĩa quản lý thông tin User và Auth.
- **Provider:** Store được bọc (wrap) ở file `src/App.tsx` hoặc `src/entry-server.tsx` thông qua thẻ `<Provider store={store}>`.

### Cách thao tác với State (Dành cho Developer)

**1. Trong một UI Component bất kỳ:**
Mặc dù dùng Redux, chúng tôi vẫn giữ lại Hook tuỳ chỉnh `useAuth()` (nay bọc bên trong Redux) để các màn hình không bị ảnh hưởng. Bạn có thể gọi auth như trước đây:
```typescript
import { useAuth } from '@/src/context/AuthContext';

const MyComponent = () => {
  const { user, isAuthenticated, logout } = useAuth();
  // ...
};
```

Tuy nhiên, nếu bạn muốn dùng Redux thuần chủng, bạn có thể gọi như sau:
```typescript
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/src/store';
import { logoutUser } from '@/src/store/slices/authSlice';

const MyComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  
  const handleLogout = () => {
    dispatch(logoutUser());
  }
};
```

**2. Thêm một State Global mới (Ví dụ thêm quản lý Theme hoặc Setting):**
Bước 1: Tạo một file Slice mới ở `src/store/slices/themeSlice.ts`:
```typescript
import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: 'light' },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    }
  }
});
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
```

Bước 2: Đăng ký Slice vào Store chính tại `src/store/index.ts`:
```typescript
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer, // <-- Thêm vào đây
  },
});
```

Bước 3: Từ mọi nơi trong ứng dụng, dùng `useSelector` để lấy \`state.theme.mode\`.

