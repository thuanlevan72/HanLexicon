# TÀI LIỆU ĐẶC TẢ NGHIỆP VỤ HỆ THỐNG HANLEXICON (CHI TIẾT)

## 1. GIỚI THIỆU HỆ THỐNG
**HanLexicon** là một nền tảng học tập trực tuyến (E-learning) chuyên sâu về ngôn ngữ Hán (tiếng Trung). Hệ thống kết hợp giữa quản lý nội dung số, học tập tương tác (Gamification) và theo dõi lộ trình cá nhân hóa.

---

## 2. QUẢN TRỊ NGƯỜI DÙNG & BẢO MẬT (USER MANAGEMENT & RBAC)

### 2.1. Phân quyền dựa trên vai trò (Role-Based Access Control)
*   **User (Người dùng):** Lưu trữ thông tin định danh (Username, Email - Duy nhất), mật khẩu được mã hóa Bcrypt (cost=12). Trạng thái `IsActive` cho phép khóa/mở tài khoản.
*   **Role (Vai trò):** Định nghĩa các nhóm quyền (ví dụ: Admin, Student).
*   **Permission (Quyền):** Các hành động cụ thể trong hệ thống (ví dụ: `USER_CREATE`, `LESSON_EDIT`).
*   **Mối quan hệ:** Một người dùng có thể có nhiều vai trò (`UserRole`), một vai trò có nhiều quyền (`RolePermission`).

### 2.2. Quản lý Phiên làm việc (Session Management)
*   **UserSession:** Quản lý cơ chế Refresh Token để duy trì đăng nhập an toàn.
*   **Theo dõi thiết bị:** Lưu trữ `IpAddress` và `UserAgent` để kiểm soát các phiên đăng nhập lạ.
*   **Cơ chế Logout:** Hỗ trợ đăng xuất đơn lẻ hoặc đăng xuất toàn bộ thiết bị (xóa tất cả Session của User).

---

## 3. QUẢN LÝ NỘI DUNG HỌC TẬP (LEARNING CONTENT MANAGEMENT)

### 3.1. Cấu trúc Phân cấp (Hierarchy)
*   **LessonCategory (Danh mục):** Phân loại theo HSK, chủ đề. Sử dụng `Slug` duy nhất để tối ưu đường dẫn.
*   **Lesson (Bài học):** 
    *   Mỗi bài học thuộc một danh mục.
    *   `Filename`: Đây là trường nghiệp vụ cốt lõi, liên kết với file HTML/Game tĩnh. Hệ thống sử dụng giá trị này làm `game_id` để đồng bộ dữ liệu giữa Web API và các tương tác Game.
    *   Trạng thái `IsPublished` kiểm soát việc hiển thị nội dung cho học viên.

### 3.2. Thành phần Nội dung chi tiết trong Bài học
*   **HanziCard (Thẻ chữ Hán):** Học về cấu tạo chữ. Lưu trữ: Chữ, Phiên âm, Nghĩa, Mẹo ghi nhớ (Mnemonic), Số nét (Stroke count) và Bộ thủ (Radical).
*   **Vocabulary (Từ vựng):** Học về nghĩa và cách dùng. Lưu trữ: Từ, Nghĩa (Việt/Anh), Phiên âm, Ví dụ (Trung/Việt/Phiên âm). Hỗ trợ Multimedia qua `AudioUrl` và `ImageUrl`.
*   **ChallengeWord (Thử thách):** Nhóm từ vựng quan trọng cần rèn luyện chuyên sâu trong bài học.
*   **Radical (Bộ thủ):** Được tổ chức theo `RadicalSet` (Bộ). Giúp người học nắm bắt "linh hồn" của chữ Hán thông qua các bộ thủ và ví dụ liên quan.

---

## 4. HỆ THỐNG ĐÁNH GIÁ & KIỂM TRA (ASSESSMENT SYSTEM)
*   **QuizQuestion (Câu hỏi):** Gắn liền với từng bài học. Có phân loại độ khó (`Difficulty`) và giải thích chi tiết (`Explanation`) sau khi làm bài.
*   **QuizOption (Lựa chọn):** Một câu hỏi có nhiều lựa chọn, hỗ trợ xác định đáp án đúng (`IsCorrect`).

---

## 5. THEO DÕI TIẾN ĐỘ & THỐNG KÊ (TRACKING & ANALYTICS)

### 5.1. Tiến độ Bài học (UserProgress)
*   Ghi lại kết quả làm bài: Điểm số (`Score`), trạng thái hoàn thành (`Completed`), số lần thử (`Attempts`) và tổng thời gian học (`TimeSpentS`).
*   **Ràng buộc:** Mỗi người dùng chỉ có 1 bản ghi tiến độ duy nhất cho mỗi bài học (`Unique: UserId + LessonId`).

### 5.2. Tiến độ Từ vựng (UserWordProgress)
*   Theo dõi mức độ thông thạo của từng từ vựng riêng biệt.
*   **Trạng thái (`Status`):** Ví dụ "Learning" (đang học), "Mastered" (đã thuộc).
*   Lưu vết số lần ôn tập (`ReviewCount`) và ngày ôn tập cuối cùng.

### 5.3. Lịch sử Tra cứu (SearchHistory)
*   Tự động lưu lại các truy vấn tìm kiếm của người dùng kèm theo liên kết đến từ vựng trong hệ thống (`VocabId`).

---

## 6. HẠ TẦNG HỖ TRỢ (INFRASTRUCTURE)

### 6.1. Quản lý Tệp tin (Media Management)
*   **MediaFile:** Hệ thống quản lý tệp tập trung. 
*   **Polymorphic Association:** Sử dụng `OwnerType` (ví dụ: 'Lesson', 'Vocabulary') và `OwnerId` để một tệp media có thể gắn bó linh hoạt với bất kỳ thực thể nào mà không cần tạo nhiều bảng liên kết.
*   Lưu trữ thông tin CDN (`CdnUrl`) và khóa bộ nhớ (`StorageKey`).

### 6.2. Xử lý Dữ liệu lớn (Bulk Import)
*   **ImportJob:** Quy trình xử lý bất đồng bộ cho việc nạp dữ liệu từ vựng/bài học.
*   Theo dõi trạng thái: `pending` -> `processing` -> `finished`/`failed`.
*   Báo cáo chi tiết: Số dòng tổng cộng, số dòng thành công/thất bại và log lỗi chi tiết dạng JSON (`ErrorLog`).

---

## 7. CÁC ĐIỂM ĐẶC TRƯNG VỀ DỮ LIỆU (TECHNICAL BUSINESS RULES)
1.  **UUID:** Hệ thống sử dụng UUID (v4) cho tất cả các Primary Key để đảm bảo tính duy nhất khi mở rộng hệ thống.
2.  **Audit Columns:** Hầu hết các bảng đều có `CreatedAt`, `UpdatedAt` để phục vụ việc truy vết dữ liệu.
3.  **Database Views:** 
    *   `v_lessons_summary`: Tổng hợp nhanh thống kê bài học (số từ, số câu hỏi).
    *   `v_user_stats`: Tính toán Dashboard cho người dùng (Điểm TB, Tổng thời gian).

---
*Tài liệu này được trích xuất tự động dựa trên phân tích cấu trúc Domain và Persistence của dự án HanLexicon.*
