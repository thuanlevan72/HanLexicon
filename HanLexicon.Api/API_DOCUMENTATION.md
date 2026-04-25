# CHI TIẾT ĐẶC TẢ API HỆ THỐNG HANLEXICON (FULL)

Tài liệu này mô tả chi tiết các tham số đầu vào (Request) và cấu trúc dữ liệu trả về (Response) cho toàn bộ hệ thống.

---

## 1. Module Xác thực (Authentication)
**Base URL:** `/api/Auth`

### 1.1. Đăng nhập (Login)
*   **Endpoint:** `POST /login`
*   **Request Body:**
    | Trường | Kiểu | Bắt buộc | Mô tả |
    | :--- | :--- | :--- | :--- |
    | `email` | String | Không | Email người dùng. |
    | `userName` | String | Không | Tên đăng nhập. |
    | `password` | String | Có | Mật khẩu. |
    | `ipAddress` | String | Có | Địa chỉ IP của client để bảo mật phiên. |
*   **Response (AuthResultDto):**
    | Trường | Kiểu | Mô tả |
    | :--- | :--- | :--- |
    | `isSuccess` | Boolean | Trạng thái thành công của yêu cầu. |
    | `accessToken` | String | JWT Token dùng cho các API yêu cầu xác thực. |
    | `refreshToken` | String | Token dùng để lấy AccessToken mới. |
    | `userId` | Guid | ID định danh của người dùng. |
    | `message` | String | Thông báo phản hồi. |
    | `errors` | Array | Danh sách các lỗi nếu `isSuccess = false`. |

### 1.2. Đăng ký (Register)
*   **Endpoint:** `POST /register`
*   **Request Body:**
    | Trường | Kiểu | Mô tả |
    | :--- | :--- | :--- |
    | `username` | String | Tên đăng nhập (4-50 ký tự). |
    | `password` | String | Mật khẩu (tối thiểu 6 ký tự). |
    | `confirmPassword` | String | Phải khớp với `password`. |
    | `displayName` | String | Tên hiển thị trên ứng dụng. |
    | `email` | String | Email người dùng (định dạng hợp lệ). |

---

## 2. Module Học tập (Learning)
**Base URL:** `/Lessons`

### 2.1. Lấy cây bài học (GetLessons)
*   **Endpoint:** `GET /GetLessons`
*   **Response:** Danh sách đối tượng `GameCategoryResponseDto`:
    *   `categorySlug` (String): Slug của danh mục (SEO).
    *   `categoryName` (String): Tên danh mục (vị dụ: HSK 1).
    *   `items` (Array): Danh sách `GameItemDto`:
        *   `link` (String): Map từ `filename`, dùng để load file game/html.
        *   `icon` (String): Tên file icon.
        *   `title` (String): Tiêu đề tiếng Trung.
        *   `translation` (String): Tiêu đề tiếng Việt.
        *   `desc` (String): Mô tả ngắn.
        *   `badge` (String): Huy hiệu (New, Hot...).

### 2.2. Chi tiết bài học (GetLessonDetail)
*   **Endpoint:** `GET /{id}` (id là Guid của Lesson)
*   **Response (LessonFullDetailDto):**
    *   `id` (Guid): ID bài học.
    *   `titleCn` / `titleVn` (String): Tiêu đề.
    *   `hanziCards` (Array): Danh sách thẻ chữ Hán:
        *   `character`, `pinyin`, `meaning`, `mnemonic`, `strokeCount`, `radical`.
    *   `radicalSets` (Array): Danh sách bộ thủ:
        *   `title`, `icon`, `radicals` (Array): `{ radical, name, meaning, exampleChars }`.
    *   `quizzes` (Array): Danh sách câu hỏi:
        *   `question`, `explanation`, `difficulty`, `options` (Array): `{ optionText, isCorrect }`.

### 2.3. Lưu tiến độ (SaveProgress)
*   **Endpoint:** `POST /SaveProgress` (Yêu cầu Token)
*   **Request Body:**
    | Trường | Kiểu | Mô tả |
    | :--- | :--- | :--- |
    | `lessonId` | Guid | ID của bài học vừa hoàn thành. |
    | `score` | Short | Điểm số đạt được (0-100). |
    | `completed` | Boolean | Trạng thái hoàn thành bài học. |
    | `timeSpentS` | Integer | Thời gian học tính bằng giây (cộng dồn vào tổng). |

---

## 3. Module Quản trị (Admin)
**Base URL:** `/api/Admin`

### 3.1. Import Từ vựng (Bulk Import)
*   **Endpoint:** `POST /vocabularies/import` (Form-data)
*   **Tham số:**
    *   `excelFile`: File Excel theo template quy định.
    *   `mediaZip`: File Zip chứa toàn bộ Audio/Ảnh tương ứng.
    *   `categoryId` (Query): Gán vào danh mục cụ thể.
*   **Xử lý Logic:** 
    *   Hệ thống giải nén Zip ra thư mục tạm.
    *   Đọc Excel, khớp tên file trong Excel với file trong Zip.
    *   Upload file lên Minio/S3.
    *   Lưu thông tin vào bảng `vocabulary`.

### 3.2. Dashboard Quản trị (Lessons Summary)
*   **Endpoint:** `GET /dashboard/lessons-summary`
*   **Response:** Danh sách các bản ghi từ View `v_lessons_summary`:
    | Trường | Kiểu | Mô tả |
    | :--- | :--- | :--- |
    | `lesson_id` | Guid | ID bài học. |
    | `title_vn` | String | Tên bài học. |
    | `vocab_count` | Long | Tổng số từ vựng trong bài. |
    | `quiz_count` | Long | Tổng số câu hỏi trắc nghiệm. |

---

## 4. Module Người dùng & Thống kê
**Base URL:** `/api/User`

### 4.1. Thống kê cá nhân (GetStats)
*   **Endpoint:** `GET /stats`
*   **Response (VUserStat):**
    | Trường | Kiểu | Mô tả |
    | :--- | :--- | :--- |
    | `total_points` | Long | Tổng điểm tích lũy từ tất cả bài học. |
    | `avg_score` | Decimal | Điểm trung bình. |
    | `lessons_completed`| Integer| Số lượng bài học đã đạt trạng thái Completed. |
    | `time_spent_s` | Integer | Tổng thời gian đã học (giây). |
    | `last_played` | DateTime | Lần tương tác cuối cùng của người dùng. |

---

## 5. Module Tệp tin (Files)
**Base URL:** `/api/Files`

### 5.1. Upload (UploadFile)
*   **Endpoint:** `POST /upload`
*   **Request Params:**
    *   `file` (IFormFile): Tệp cần upload.
    *   `ownerType` (String): Loại thực thể (ví dụ: 'Lesson', 'Vocabulary').
    *   `ownerId` (Guid): ID của Lesson hoặc Vocab tương ứng.
*   **Response:**
    *   `id` (Guid): ID của bản ghi MediaFile vừa tạo.
    *   `cdnUrl` (String): Đường dẫn trực tiếp để truy cập file từ CDN/Storage.
    *   `fileName` (String): Tên gốc của tệp.
