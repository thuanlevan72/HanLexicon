# BÁO CÁO CHI TIẾT NGHIỆP VỤ HỆ THỐNG HANLEXICON

## 1. Giới thiệu tổng quan
HanLexicon là một hệ thống quản lý học tập (LMS) chuyên biệt cho việc học tiếng Trung. Hệ thống không chỉ cung cấp tài liệu mà còn tích hợp các phương pháp học tập hiện đại như Flashcards (Hanzi Cards), Gamification qua các bài học tương tác, và hệ thống theo dõi tiến độ học tập chi tiết của từng cá nhân.

---

## 2. Các Modules Nghiệp vụ Chính

### 2.1. Quản lý Nội dung Học tập (Content Management)
Đây là hạt nhân của hệ thống, được phân cấp rõ ràng:
*   **Lesson Category (Danh mục bài học):** Phân loại bài học theo các cấp độ hoặc chủ đề (ví dụ: HSK 1, HSK 2, Giao tiếp cơ bản). Sử dụng `Slug` để tối ưu SEO và truy cập nhanh.
*   **Lesson (Bài học):** 
    *   Mỗi bài học là một thực thể độc lập, chứa thông tin định danh và các tài nguyên liên quan.
    *   **Trường `Filename` quan trọng:** Dùng để liên kết với các file HTML/Game tĩnh, đóng vai trò là `game_id` để lưu trữ tiến độ.
    *   Hỗ trợ Badge (huy hiệu) và Icon để tăng tính hấp dẫn trực quan.

### 2.2. Hệ thống Học tập Chi tiết
Trong mỗi bài học, nghiệp vụ được chia nhỏ thành 4 loại dữ liệu bổ trợ:
1.  **Hanzi Cards (Thẻ chữ Hán):** Tập trung vào cấu trúc chữ. Bao gồm: Chữ (Character), Phiên âm (Pinyin), Bộ thủ (Radical), Số nét (Stroke Count) và Mẹo ghi nhớ (Mnemonic).
2.  **Vocabulary (Từ vựng):** Tập trung vào ngữ nghĩa và ứng dụng. Bao gồm: Từ, Nghĩa (Việt/Anh), Ví dụ (Trung/Phiên âm/Việt) và hỗ trợ Multimedia (Audio/Image URL).
3.  **Radical Sets (Bộ thủ):** Nhóm các bộ thủ liên quan trong bài học, giúp người học hiểu bản chất cấu tạo chữ Hán.
4.  **Quiz (Trắc nghiệm):** Hệ thống câu hỏi (`QuizQuestion`) và các lựa chọn (`QuizOption`). Hỗ trợ phân loại độ khó và giải thích đáp án (Explanation).

### 2.3. Quản lý Người dùng và Tiến trình (User & Progress)
Nghiệp vụ này theo dõi sự tương tác của người học với nội dung:
*   **User Progress:** Lưu lại kết quả sau khi hoàn thành một bài học (Điểm số, Thời gian hoàn thành, Số lần thử).
*   **User Word Progress:** Một tính năng nâng cao giúp theo dõi mức độ thuộc của từng từ vựng riêng biệt (Trạng thái: Đang học, Đã thuộc, Cần ôn tập).
*   **Search History:** Ghi lại các từ vựng người dùng đã tra cứu để đưa ra gợi ý học tập cá nhân hóa.

### 2.4. Hệ thống Tài liệu và Media
*   **Documents:** Quản lý các file tài liệu bổ trợ (PDF, v.v.) cho phép người dùng tải về theo danh mục.
*   **Media Management:** Một module dùng chung (`MediaFile`) để quản lý tất cả các tài nguyên ảnh, âm thanh trong hệ thống. Hỗ trợ đa nền tảng lưu trữ (S3, Google Cloud).

---

## 3. Luồng Nghiệp vụ Đặc thù (Workflows)

### 3.1. Quy trình Import dữ liệu nặng
Thay vì import trực tiếp qua API làm treo hệ thống, HanLexicon sử dụng **Import Job**:
1.  Admin tải file dữ liệu lên.
2.  Hệ thống tạo một bản ghi `ImportJob` với trạng thái `pending`.
3.  Background Job sẽ lấy file, xử lý từng dòng, cập nhật `ProcessedRows`, `FailedRows` và log lỗi vào trường `jsonb`.
4.  Admin có thể theo dõi trạng thái Real-time của quá trình import.

### 3.2. Cơ chế Đăng xuất và Bảo mật Phiên
Hệ thống xử lý phiên làm việc (`UserSession`) rất chặt chẽ:
*   **Đăng xuất thiết bị hiện tại:** Chỉ xóa bản ghi Session tương ứng với Refresh Token đang dùng.
*   **Đăng xuất tất cả thiết bị:** Xóa toàn bộ Session của User ID đó, buộc tất cả các nơi đang đăng nhập phải re-login.

### 3.3. Thống kê và Báo cáo (Views)
Dự án sử dụng các Database Views để xử lý logic thống kê phức tạp mà không làm chậm Application:
*   **v_lessons_summary:** Tổng hợp nhanh số lượng từ vựng, câu hỏi trắc nghiệm của từng bài học.
*   **v_user_stats:** Tính toán điểm trung bình, tổng thời gian học và số lượng bài học đã hoàn thành của người dùng.

---

## 4. Các Ràng buộc Nghiệp vụ (Business Rules)
*   **Duy nhất (Uniqueness):** Username, Email phải là duy nhất. Mỗi bài học chỉ có một bản ghi tiến độ duy nhất cho mỗi User (Unique Constraint trên `UserId` + `LessonId`).
*   **Xóa logic:** Một số dữ liệu có thể được ẩn đi thông qua trường `is_published` thay vì xóa vật lý để đảm bảo tính toàn vẹn của báo cáo thống kê.
*   **Phân quyền (RBAC):** Hệ thống phân quyền dựa trên Role (Admin, Student) và các Permission cụ thể gắn với từng chức năng.

---
*Báo cáo được trích xuất tự động dựa trên phân tích cấu trúc Domain và Persistence của dự án HanLexicon.*
