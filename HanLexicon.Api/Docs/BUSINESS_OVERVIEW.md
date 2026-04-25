# TỔNG QUAN NGHIỆP VỤ HỆ THỐNG HANLEXICON

## 1. Giới thiệu
HanLexicon là hệ thống quản lý học tập (LMS) chuyên sâu cho tiếng Trung, tập trung vào trải nghiệm người dùng thông qua hình ảnh, âm thanh và theo dõi tiến độ cá nhân hóa.

## 2. Các Trụ cột Nghiệp vụ (Core Pillars)

### 2.1. Quản lý Nội dung (Content)
*   **Phân tầng**: Cấp độ (Category - vd: HSK1) -> Nhóm bài học (Lesson) -> Từ vựng (Vocabulary).
*   **Đa phương tiện**: Mỗi từ vựng tích hợp sẵn Audio (phát âm) và Image (minh họa) để tăng hiệu quả ghi nhớ.
*   **Thành phần bổ trợ**: Bao gồm thẻ chữ Hán (Hanzi Cards), Bộ thủ (Radicals) và câu hỏi trắc nghiệm (Quizzes).

### 2.2. Học tập & Theo dõi (Learning & Tracking)
*   **Tiến độ bài học**: Lưu điểm số và thời gian thực hiện của từng User trên mỗi bài học.
*   **Thông thạo từ vựng**: Theo dõi mức độ thuộc lòng của từng từ (Trạng thái: Đang học, Đã thuộc, Cần ôn tập).
*   **Lịch sử tra cứu**: Tự động ghi lại các từ người dùng đã tìm kiếm để gợi ý nội dung phù hợp.

### 2.3. Quản trị Dữ liệu (Administration)
*   **Bulk Import**: Cơ chế quan trọng nhất giúp nạp hàng nghìn từ vựng từ Excel và tự động xử lý file đính kèm (Zip) lên hệ thống lưu trữ MinIO.

## 3. Quy tắc Dữ liệu (Technical Rules)
*   **Định danh**: Sử dụng UUID v4 cho toàn bộ các thực thể.
*   **Bảo mật**: Phân quyền dựa trên vai trò (RBAC) với JWT Token.
*   **Tính nhất quán**: Mọi phản hồi API đều được đóng gói trong một cấu trúc `ApiResponse` duy nhất.
