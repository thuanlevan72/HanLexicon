# TÀI LIỆU CẤU TRÚC DATABASE - HỆ THỐNG HANLEXICON

Tài liệu này mô tả chi tiết các thực thể dữ liệu, mối quan hệ và nghiệp vụ tương ứng trong hệ thống.

---

## 1. Module Xác thực & Người dùng (Identity & Access)

### Bảng `users`
*   **Mục đích**: Lưu trữ thông tin định danh của người học và quản trị viên.
*   **Trường chính**:
    *   `id` (UUID): Khóa chính, tự động tạo bằng `uuid_generate_v4()`.
    *   `username`: Tên đăng nhập duy nhất.
    *   `password_hash`: Mã hóa mật khẩu bằng thuật toán Bcrypt.
    *   `email`: Địa chỉ liên lạc (duy nhất).
    *   `is_active`: Trạng thái kích hoạt tài khoản.

### Bảng `roles` & `permissions`
*   **Mục đích**: Phân quyền hệ thống (RBAC). Hiện tại hỗ trợ quyền `admin` và `user`.
*   **Quan hệ**: 
    *   `user_roles`: Liên kết N-N giữa User và Role.
    *   `role_permissions`: Liên kết N-N giữa Role và Quyền hạn cụ thể.

### Bảng `user_sessions`
*   **Mục đích**: Quản lý các phiên làm việc và Refresh Token của người dùng trên các thiết bị khác nhau.

---

## 2. Module Nội dung & Học thuật (Content & Academic)

### Bảng `lesson_categories` (Level/Cấp độ)
*   **Nghiệp vụ**: Phân loại nội dung theo cấp độ như HSK1, HSK2, Tiếng Trung Giao Tiếp...
*   **Dữ liệu**: `slug` (dùng cho URL), `name` (tên hiển thị), `sort_order` (thứ tự hiển thị).

### Bảng `lessons` (Nhóm bài học)
*   **Nghiệp vụ**: Là đơn vị chứa kiến thức. Mỗi bài học thuộc về 1 `category`.
*   **Quan hệ**: 1 Category -> N Lessons.

### Bảng `vocabulary` (Từ vựng cốt lõi)
*   **Nghiệp vụ**: Lưu trữ chi tiết về từng từ chữ Hán. Đây là bảng quan trọng nhất cho tính năng **Tra từ**.
*   **Trường mới cập nhật**:
    *   `meaning_en`: Nghĩa tiếng Anh.
    *   `meaning`: Nghĩa tiếng Việt.
    *   `audio_url`: Link file phát âm (MP3).
    *   `image_url`: Link hình ảnh minh họa.
    *   `example_cn/py/vn`: Câu ví dụ bằng chữ Hán, Pinyin và Nghĩa Việt.
*   **Quan hệ**: 1 Lesson -> N Vocabularies.

### Bảng `hanzi_cards`, `challenge_words`, `quiz_questions`
*   **Mục đích**: Các thành phần mở rộng của bài học phục vụ việc học viết và kiểm tra trắc nghiệm.

---

## 3. Module Tiến độ & Hành vi (Learning Progress)

### Bảng `user_progress` (Tiến độ bài học)
*   **Nghiệp vụ**: Lưu kết quả sau mỗi lần người dùng hoàn thành 1 game/bài học.
*   **Trường**: `score` (điểm), `time_spent_s` (thời gian học), `attempts` (số lần làm lại).

### Bảng `user_word_progress` (Thông thạo từ vựng)
*   **Nghiệp vụ**: Theo dõi mức độ thuộc lòng của từng từ vựng riêng biệt.
*   **Dữ liệu**: `status` (learning, mastered, review). 
*   **Quan hệ**: User <-> Vocabulary.

### Bảng `search_history` (Lịch sử tra cứu)
*   **Nghiệp vụ**: Tự động ghi lại mỗi khi người dùng gọi API Tra từ. Giúp hệ thống gợi ý từ vựng người dùng đang quan tâm.

---

## 4. Module Hệ thống (System)

### Bảng `import_jobs`
*   **Nghiệp vụ**: Theo dõi các phiên Import dữ liệu từ Excel.
*   **Dữ liệu**: `status` (pending, processing, completed, failed), `error_log` (lưu lỗi nếu file Excel sai định dạng).

### Bảng `media_files`
*   **Nghiệp vụ**: Quản lý tập trung các tệp tin đã upload lên Storage. Link tới các bảng khác thông qua `owner_type` và `owner_id`.

---

## Sơ đồ mối quan hệ chính (Simplified ERD)

1.  **Học tập**: `Category` -> `Lesson` -> `Vocabulary` -> `MediaFile`.
2.  **Cá nhân hóa**: `User` -> `UserProgress` (liên kết với Lesson).
3.  **Cá nhân hóa**: `User` -> `UserWordProgress` (liên kết với Vocabulary).
4.  **Tra cứu**: `User` -> `SearchHistory` -> `Vocabulary`.
