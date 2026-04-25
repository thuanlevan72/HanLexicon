# ĐẶC TẢ CHI TIẾT TOÀN BỘ API HỆ THỐNG HANLEXICON

Tài liệu này được biên soạn bởi Senior Backend Developer, mô tả chính xác 100% các endpoint hiện có trong mã nguồn.

---

## 1. MODULE XÁC THỰC (AUTH)
**Base URL:** `/api/Auth`

### 1.1. Đăng nhập (Login)
*   **Mô tả:** Xác thực danh tính và cấp Access Token (JWT), Refresh Token.
*   **HTTP Method:** `POST` | **URL Route:** `/login`
*   **Authorization:** None.
*   **Request:**
    *   **Headers:** `Content-Type: application/json`
    *   **Body:**
        | Trường | Kiểu | Bắt buộc | Mô tả |
        | :--- | :--- | :--- | :--- |
        | `email` | String | Không | Email tài khoản (nếu dùng email). |
        | `userName` | String | Không | Tên đăng nhập (nếu dùng username). |
        | `password` | String | Có | Mật khẩu tài khoản. |
        | `ipAddress` | String | Có | IP của thiết bị đăng nhập. |
    *   **Ví dụ JSON:**
        ```json
        {
          "email": "user@example.com",
          "userName": "user123",
          "password": "Password@123",
          "ipAddress": "192.168.1.1"
        }
        ```
*   **Responses:**
    *   **200 OK:**
        ```json
        {
          "isSuccess": true,
          "accessToken": "eyJhbGci...",
          "refreshToken": "string",
          "userId": "guid",
          "message": "Đăng nhập thành công"
        }
        ```
    *   **401 Unauthorized:** Thông tin đăng nhập sai hoặc tài khoản bị khóa (`isActive = false`).

### 1.2. Đăng ký (Register)
*   **Mô tả:** Tạo tài khoản Student mới.
*   **HTTP Method:** `POST` | **URL Route:** `/register`
*   **Authorization:** None.
*   **Request Body:**
    | Trường | Kiểu | Bắt buộc | Mô tả |
    | :--- | :--- | :--- | :--- |
    | `username` | String | Có | 4-50 ký tự, duy nhất. |
    | `password` | String | Có | Tối thiểu 6 ký tự. |
    | `confirmPassword` | String | Có | Phải khớp với password. |
    | `displayName` | String | Không | Tên hiển thị (Max 100). |
    | `email` | String | Không | Định dạng email hợp lệ, duy nhất. |
*   **Responses:**
    *   **200 OK:** `{ "message": "Đăng ký thành công" }`
    *   **400 Bad Request:** Lỗi validation: `Username already exists`, `Passwords do not match`.

---

## 2. MODULE QUẢN TRỊ (ADMIN)
**Base URL:** `/api/Admin` | **Authorization:** Bearer Token (Role: `Admin`)

### 2.1. Quản lý Danh mục (Categories)
*   **Endpoints:**
    *   `GET /categories`: Lấy toàn bộ danh sách.
    *   `POST /categories`: Tạo mới. (Body: `name`, `slug`, `sortOrder`).
    *   `PUT /categories/{id}`: Cập nhật. (Path: `id` | Body: `id`, `name`, `slug`, `sortOrder`).
    *   `DELETE /categories/{id}`: Xóa danh mục.
*   **Responses:** 200 OK trả về `LessonCategoryDto`. 400 Bad Request nếu trùng `Slug`.

### 2.2. Quản lý Bài học (Lessons)
*   **Endpoints:**
    *   `GET /lessons?categoryId={id}`: Lấy danh sách (Có lọc theo Category).
    *   `POST /lessons`: Tạo bài học. (Body: `categoryId`, `lessonNumber`, `filename`, `titleCn`, `titleVn`, `icon`, `description`, `badge`, `isPublished`, `sortOrder`).
    *   `PUT /lessons/{id}`: Cập nhật. (Path: `id` | Body tương tự POST kèm `id`).
    *   `DELETE /lessons/{id}`: Xóa bài học.

### 2.3. Import & Dashboard
*   **POST /vocabularies/import:**
    *   **Request:** Form-data (`excelFile`, `mediaZip`). Query: `categoryId`.
    *   **Chức năng:** Nạp từ vựng và media bất đồng bộ.
*   **GET /dashboard/lessons-summary:** Thống kê `lesson_id`, `title_vn`, `vocab_count`, `quiz_count`.
*   **GET /dashboard/import-jobs:** Lấy 50 lịch sử Import gần nhất.

### 2.4. Quản lý Nội dung chi tiết (Hanzi, Radical, Quiz, Doc)
*   **Hanzi Cards:** `GET /hanzi-cards?lessonId={id}`, `POST`, `PUT`, `DELETE`.
*   **Radical Sets:** `GET /radical-sets?lessonId={id}`, `POST`, `PUT`, `DELETE`.
*   **Quizzes:** `GET /quizzes?lessonId={id}`, `POST`, `PUT`, `DELETE`.
*   **Documents:** `GET /documents-admin?categoryId={id}`, `POST`, `PUT`, `DELETE`.

---

## 3. MODULE HỌC TẬP (LEARNING)
**Base URL:** `/Lessons`

### 3.1. Lấy cây bài học (GetLessons)
*   **Mô tả:** Lấy danh mục và bài học đã công khai (`isPublished = true`).
*   **HTTP Method:** `GET` | **URL Route:** `/GetLessons`
*   **Authorization:** None.
*   **Response (200 OK):**
    ```json
    [{
      "categorySlug": "hsk-1",
      "categoryName": "HSK 1",
      "items": [{ "link": "filename", "title": "CN", "translation": "VN", "icon": "url" }]
    }]
    ```

### 3.2. Chi tiết bài học (GetLessonDetail)
*   **Mô tả:** Tải toàn bộ dữ liệu Content của bài học.
*   **HTTP Method:** `GET` | **URL Route:** `/{id}`
*   **Responses:** Trả về `LessonFullDetailDto` (Gồm Hanzi, Radicals, Quizzes).

### 3.3. Lưu tiến độ (SaveProgress)
*   **HTTP Method:** `POST` | **URL Route:** `/SaveProgress`
*   **Authorization:** Bearer Token.
*   **Request Body:**
    | Trường | Kiểu | Mô tả |
    | :--- | :--- | :--- |
    | `lessonId` | Guid | ID bài học. |
    | `score` | Short | Điểm (0-100). |
    | `completed` | Boolean | Đã xong hay chưa. |
    | `timeSpentS` | Int | Thời gian làm bài (giây). |
*   **Responses:** 200 OK `{ "success": true }`. 401 Unauthorized nếu thiếu Token.

---

## 4. MODULE TỪ VỰNG & NGƯỜI DÙNG (VOCABULARY & USER)

### 4.1. Tìm kiếm (Search)
*   **URL:** `GET /api/Vocabularies/search?query=...`
*   **Chức năng:** Tìm từ, tự động log `SearchHistory` cho User hiện tại.
*   **Response:** `List<Vocabulary>`.

### 4.2. Cập nhật tiến độ từ (Update Word Progress)
*   **URL:** `POST /api/Vocabularies/UpdateProgress` | **Auth:** Bearer Token.
*   **Body:** `{ "vocabId": "guid", "status": "string" }`.

### 4.3. Thống kê cá nhân (GetStats)
*   **URL:** `GET /api/User/stats` | **Auth:** Bearer Token.
*   **Response:** `totalPoints`, `avgScore`, `lessonsCompleted`, `timeSpentS`, `lastPlayed`.

---

## 5. MODULE TỆP TIN (FILES)
*   **POST /api/Files/upload:**
    *   **Auth:** Bearer Token.
    *   **Query Params:** `ownerType` ('Lesson'/'Vocabulary'), `ownerId` (Guid).
    *   **Body:** Multipart File.
    *   **Response:** `{ "id": "guid", "cdnUrl": "url", "fileName": "string" }`.

---

## MÃ LỖI HỆ THỐNG
*   **400 Bad Request:** Dữ liệu đầu vào sai format hoặc vi phạm Unique Constraint.
*   **401 Unauthorized:** Token không hợp lệ hoặc hết hạn.
*   **403 Forbidden:** Không có quyền (Yêu cầu Role Admin).
*   **404 Not Found:** ID (Lesson/Category/User) không tồn tại.
*   **500 Internal Error:** Lỗi Server, Database hoặc xử lý File Storage.
