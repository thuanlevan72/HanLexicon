# TÀI LIỆU ĐẶC TẢ CHI TIẾT API HANLEXICON

Tài liệu dành cho Backend/Frontend Integration. Hệ thống sử dụng chuẩn RESTful, dữ liệu trao đổi định dạng JSON. Toàn bộ thời gian sử dụng chuẩn ISO 8601 (UTC).

---

## 1. MODULE XÁC THỰC (AUTH)

### 1.1. Đăng nhập (Login)
*   **Mô tả:** Xác thực người dùng và cấp chứng chỉ truy cập.
*   **HTTP Method:** `POST`
*   **URL Route:** `/api/Auth/login`
*   **Authorization:** None
*   **Request:**
    *   **Headers:** `Content-Type: application/json`
    *   **Body:**
        | Trường | Kiểu | Bắt buộc | Mô tả |
        | :--- | :--- | :--- | :--- |
        | `email` | String | Không | Email người dùng. |
        | `userName` | String | Không | Tên đăng nhập. |
        | `password` | String | Có | Mật khẩu. |
        | `ipAddress` | String | Có | IP của client (ví dụ: 127.0.0.1). |
    *   **Ví dụ:** `{"email": "admin@test.com", "password": "Password123!", "ipAddress": "127.0.0.1"}`
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
    *   **401 Unauthorized:** Thông tin đăng nhập sai hoặc tài khoản bị khóa.

### 1.2. Đăng ký (Register)
*   **Mô tả:** Tạo tài khoản học viên mới.
*   **HTTP Method:** `POST`
*   **URL Route:** `/api/Auth/register`
*   **Authorization:** None
*   **Request Body:**
    | Trường | Kiểu | Bắt buộc | Mô tả |
    | :--- | :--- | :--- | :--- |
    | `username` | String | Có | 4-50 ký tự. |
    | `password` | String | Có | Tối thiểu 6 ký tự. |
    | `confirmPassword` | String | Có | Phải trùng với password. |
    | `displayName` | String | Không | Tên hiển thị (Max 100). |
    | `email` | String | Không | Định dạng email hợp lệ. |
*   **Responses:**
    *   **200 OK:** `{"message": "Đăng ký thành công"}`
    *   **400 Bad Request:** Username/Email đã tồn tại hoặc confirm password sai.

---

## 2. MODULE HỌC TẬP (LEARNING)

### 2.1. Lấy cây bài học (Get Lessons)
*   **Mô tả:** Lấy danh sách danh mục và các bài học bên trong.
*   **HTTP Method:** `GET`
*   **URL Route:** `/Lessons/GetLessons`
*   **Authorization:** None
*   **Responses:**
    *   **200 OK:**
        ```json
        [
          {
            "categorySlug": "hsk-1",
            "categoryName": "HSK 1",
            "items": [
              {
                "link": "hsk1-lesson1",
                "icon": "icon.png",
                "title": "你好",
                "translation": "Chào bạn",
                "desc": "Mô tả",
                "badge": "New"
              }
            ]
          }
        ]
        ```

### 2.2. Chi tiết bài học (Get Lesson Detail)
*   **Mô tả:** Lấy toàn bộ nội dung học thuật của bài học.
*   **HTTP Method:** `GET`
*   **URL Route:** `/Lessons/{id}`
*   **Authorization:** None
*   **Parameters:** `id` (Guid - Path)
*   **Responses:**
    *   **200 OK:**
        ```json
        {
          "id": "guid",
          "titleCn": "string",
          "filename": "hsk1-lesson1",
          "hanziCards": [
            { "character": "你", "pinyin": "nǐ", "meaning": "Bạn", "strokeCount": 7, "radical": "亻" }
          ],
          "radicalSets": [
            { "title": "string", "radicals": [{ "radical": "亻", "name": "Nhân", "exampleChars": "你, 他" }] }
          ],
          "quizzes": [
            { "question": "string", "difficulty": 1, "options": [{ "optionText": "A", "isCorrect": true }] }
          ]
        }
        ```
    *   **404 Not Found:** Bài học không tồn tại.

### 2.3. Lưu tiến độ (Save Progress)
*   **Mô tả:** Ghi nhận kết quả hoàn thành bài học của User.
*   **HTTP Method:** `POST`
*   **URL Route:** `/Lessons/SaveProgress`
*   **Authorization:** Bearer Token
*   **Request Body:**
    | Trường | Kiểu | Bắt buộc | Mô tả |
    | :--- | :--- | :--- | :--- |
    | `lessonId` | Guid | Có | ID bài học. |
    | `score` | Short | Có | Điểm số (0-100). |
    | `completed` | Boolean | Có | Đã xong hay chưa. |
    | `timeSpentS` | Int | Có | Thời gian học (giây). |
*   **Responses:**
    *   **200 OK:** `{"success": true}`
    *   **401 Unauthorized:** Thiếu hoặc sai Token.

---

## 3. MODULE QUẢN TRỊ (ADMIN) - Yêu cầu Role: Admin

### 3.1. Tạo danh mục bài học
*   **HTTP Method:** `POST`
*   **URL Route:** `/api/Admin/categories`
*   **Authorization:** Bearer Token + Role Admin
*   **Request Body:**
    | Trường | Kiểu | Bắt buộc | Mô tả |
    | :--- | :--- | :--- | :--- |
    | `name` | String | Có | Tên danh mục. |
    | `slug` | String | Có | Slug duy nhất (hsk-1). |
    | `sortOrder` | Short | Có | Thứ tự (1, 2, 3). |
*   **Responses:**
    *   **200 OK:** Trả về đối tượng vừa tạo kèm ID.
    *   **400 Bad Request:** Slug bị trùng.

### 3.2. Import Từ vựng hàng loạt
*   **HTTP Method:** `POST`
*   **URL Route:** `/api/Admin/vocabularies/import`
*   **Authorization:** Bearer Token + Role Admin
*   **Request:**
    *   **Query Params:** `categoryId` (Short - Optional)
    *   **Body (Form-data):**
        *   `excelFile`: File .xlsx (Bắt buộc).
        *   `mediaZip`: File .zip chứa media (Tùy chọn).
*   **Responses:**
    *   **200 OK:** `{"jobId": "guid"}`
    *   **403 Forbidden:** Không có quyền Admin.

---

## 4. MODULE NGƯỜI DÙNG (USER)

### 4.1. Lấy thống kê cá nhân
*   **Mô tả:** Truy xuất Dashboard cá nhân.
*   **HTTP Method:** `GET`
*   **URL Route:** `/api/User/stats`
*   **Authorization:** Bearer Token
*   **Responses:**
    *   **200 OK:**
        ```json
        {
          "totalPoints": 1500,
          "avgScore": 95.0,
          "lessonsCompleted": 5,
          "timeSpentS": 7200,
          "lastPlayed": "2026-04-24T15:00:00Z"
        }
        ```

---

## 5. MODULE TỆP TIN (FILES)

### 5.1. Upload File
*   **HTTP Method:** `POST`
*   **URL Route:** `/api/Files/upload`
*   **Authorization:** Bearer Token
*   **Parameters (Query):**
    | Trường | Kiểu | Bắt buộc | Mô tả |
    | :--- | :--- | :--- | :--- |
    | `ownerType` | String | Có | 'Lesson' hoặc 'Vocabulary'. |
    | `ownerId` | Guid | Có | ID của đối tượng liên quan. |
*   **Body (Form-data):** `file` (Binary).
*   **Responses:**
    *   **200 OK:** `{"id": "guid", "cdnUrl": "url_string", "fileName": "string"}`
    *   **400 Bad Request:** File rỗng hoặc sai định dạng.

---

## MÃ LỖI (ERROR CODES)
*   **400:** Validation failed (Thiếu trường, sai format Guid).
*   **401:** Unauthorized (Thiếu header Authorization).
*   **403:** Forbidden (Không đúng Role Admin).
*   **404:** Not Found (ID không tồn tại trong DB).
*   **500:** Internal Server Error (Lỗi logic xử lý file hoặc Database).
