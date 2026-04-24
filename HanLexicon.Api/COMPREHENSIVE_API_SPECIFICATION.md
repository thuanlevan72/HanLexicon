# TÀI LIỆU ĐẶC TẢ TOÀN BỘ API HỆ THỐNG HANLEXICON

Tài liệu này mô tả chi tiết tất cả các đầu Endpoint có trong hệ thống, bao gồm cấu trúc tham số và logic xử lý. Toàn bộ các API yêu cầu xác thực sử dụng Header: `Authorization: Bearer <token>`.

---

## 1. NHÓM XÁC THỰC (AuthController)
**Base URL:** `/api/Auth`

### 1.1. Đăng nhập (Login)
*   **Mô tả:** Xác thực người dùng và cấp JWT Token.
*   **Method:** `POST` | **Route:** `/login`
*   **Request Body:**
    *   `email` (String, Optional): Email đăng nhập.
    *   `userName` (String, Optional): Tên đăng nhập.
    *   `password` (String, Required): Mật khẩu.
    *   `ipAddress` (String, Required): Địa chỉ IP client.
*   **Response (200 OK):**
    *   `isSuccess` (Bool), `accessToken` (JWT), `refreshToken` (String), `userId` (Guid), `message` (String).

### 1.2. Đăng ký (Register)
*   **Mô tả:** Tạo tài khoản học viên mới.
*   **Method:** `POST` | **Route:** `/register`
*   **Request Body:**
    *   `username`, `password`, `confirmPassword`, `displayName`, `email`.
*   **Response (200 OK):** `{ "message": "Đăng ký thành công" }`.

### 1.3. Đăng xuất (Logout)
*   **Mô tả:** Đăng xuất thiết bị hiện tại (Vô hiệu hóa Refresh Token).
*   **Method:** `POST` | **Route:** `/logout` | **Auth:** Required.
*   **Request Body:** `{ "clientRefreshToken": "string" }`.

---

## 2. NHÓM QUẢN TRỊ NỘI DUNG (AdminController)
**Base URL:** `/api/Admin` | **Role yêu cầu:** `Admin`

### 2.1. Quản lý Danh mục (Categories)
*   **GET `/categories`**: Lấy toàn bộ danh sách Category.
*   **POST `/categories`**: Tạo mới Category (`name`, `slug`, `sortOrder`).
*   **PUT `/categories/{id}`**: Cập nhật Category.
*   **DELETE `/categories/{id}`**: Xóa Category theo ID.

### 2.2. Quản lý Bài học (Lessons)
*   **GET `/lessons`**: Lấy danh sách bài học (Query Params: `categoryId` lọc theo danh mục).
*   **POST `/lessons`**: Tạo bài học (`categoryId`, `lessonNumber`, `filename`, `titleCn`, `titleVn`, `icon`, `description`, `badge`, `isPublished`, `sortOrder`).
*   **PUT `/lessons/{id}`**: Cập nhật bài học.
*   **DELETE `/lessons/{id}`**: Xóa bài học.

### 2.3. Quản lý Từ vựng & Import
*   **GET `/vocabularies`**: Lấy danh sách từ vựng (Query Params: `lessonId`).
*   **POST `/vocabularies/import`**: Import hàng loạt.
    *   **Body (Form-data):** `excelFile` (.xlsx), `mediaZip` (.zip), `categoryId` (Query).
*   **GET `/vocabularies/import-status/{jobId}`**: Kiểm tra tiến độ Import (Số dòng thành công/thất bại).

### 2.4. Quản lý Nội dung chi tiết bài học
*   **Hanzi Cards**: `GET /hanzi-cards?lessonId={id}`, `POST`, `PUT`, `DELETE`.
*   **Challenge Words**: `GET /challenge-words?lessonId={id}`, `POST`, `PUT`, `DELETE`.
*   **Radical Sets & Radicals**: `GET /radical-sets`, `GET /radicals?setId={id}`, `POST`, `PUT`, `DELETE`.
*   **Quizzes & Options**: `GET /quizzes?lessonId={id}`, `GET /quiz-options?questionId={id}`, `POST`, `PUT`, `DELETE`.

### 2.5. Báo cáo (Dashboard)
*   **GET `/dashboard/lessons-summary`**: Thống kê tổng số từ và câu hỏi của từng bài.
*   **GET `/dashboard/import-jobs`**: Lấy 50 lịch sử nạp dữ liệu gần nhất.

---

## 3. NHÓM HỌC TẬP (LessonsController)
**Base URL:** `/Lessons`

### 3.1. Danh sách bài học (GetLessons)
*   **Method:** `GET` | **Route:** `/GetLessons`
*   **Chức năng:** Lấy cấu trúc cây Danh mục -> Bài học cho người dùng.
*   **Response:** Mảng các Category, mỗi cái chứa mảng `items` là các Lesson.

### 3.2. Chi tiết bài học (GetLessonDetail)
*   **Method:** `GET` | **Route:** `/{id}`
*   **Chức năng:** Lấy full data (Hanzi, Radicals, Quizzes) để nạp vào Game.

### 3.3. Lưu kết quả (SaveProgress)
*   **Method:** `POST` | **Route:** `/SaveProgress` | **Auth:** Required.
*   **Request Body:** `{ "lessonId": "guid", "score": short, "completed": bool, "timeSpentS": int }`.
*   **Logic:** Hệ thống tự gán `UserId` từ Token, tính điểm cao nhất và cộng dồn thời gian.

---

## 4. NHÓM TỪ VỰNG & NGƯỜI DÙNG
### 4.1. VocabulariesController
*   **GET `/api/Vocabularies/search?query=...`**: Tìm kiếm từ vựng. Tự động ghi log lịch sử tra cứu.
*   **POST `/api/Vocabularies/UpdateProgress`**: Cập nhật mức độ thuộc từ (`vocabId`, `status`).

### 4.2. UserController
*   **GET `/api/User/stats`**: Lấy thống kê tổng quát (Tổng điểm, Điểm TB, Số bài đã xong).
*   **GET `/api/User/word-progress`**: Lấy danh sách từ vựng đã học của User hiện tại.

---

## 5. NHÓM TỆP TIN (FilesController)
*   **POST `/api/Files/upload`**: Upload file Media.
*   **Params:** `file` (Binary), `ownerType` ('Lesson'/'Vocabulary'), `ownerId` (Guid).
*   **Response:** `{ "id", "cdnUrl", "fileName" }`.

---

## 6. NHÓM THỬ NGHIỆM (WeatherForecastController)
*   **GET `/WeatherForecast/GetTestData`**: Trình xuất toàn bộ dữ liệu Category + Lessons (Dùng cho Debug).
*   **GET `/WeatherForecast`**: Lấy dữ liệu thời tiết mẫu.

---

## GHI CHÚ VỀ DỮ LIỆU
*   **IDs:** Tất cả sử dụng định dạng UUID/Guid.
*   **Mã lỗi:** 
    *   `400`: Dữ liệu đầu vào không hợp lệ hoặc vi phạm ràng buộc (Duplicate).
    *   `401`: Chưa đăng nhập/Token hết hạn.
    *   `403`: Không có quyền truy cập (Dành cho Admin).
    *   `404`: Không tìm thấy tài nguyên.
