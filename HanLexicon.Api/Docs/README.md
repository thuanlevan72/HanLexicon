# TÀI LIỆU HỆ THỐNG HANLEXICON (OFFICIAL)

Chào mừng bạn đến với kho tài liệu chuẩn của dự án HanLexicon. Thư mục này được tổ chức theo tiêu chuẩn "Clean Documentation".

## 📂 Danh mục tài liệu

### 1. Dành cho Nhà phát triển (Frontend/Mobile)
*   **[API_SPECIFICATION.md](./API_SPECIFICATION.md)**: Danh sách Endpoint và tham số (Chính xác 100%).
*   **[hanlexicon_swagger.md](./hanlexicon_swagger.md)**: Đặc tả OpenAPI (JSON) để nạp vào Postman.

### 2. Dành cho Hệ thống & Database
*   **[BUSINESS_OVERVIEW.md](./BUSINESS_OVERVIEW.md)**: Hiểu về luồng nghiệp vụ và các quy tắc hệ thống.
*   **[DATABASE_GUIDE.md](./DATABASE_GUIDE.md)**: Chi tiết các bảng và mối quan hệ dữ liệu.
*   **[database_schema.sql](./database_schema.sql)**: File SQL khởi tạo toàn bộ Database.

---

## 💡 Luồng tích hợp nhanh (Quick Start)
1.  **Backend**: Khởi chạy API tại port `5029`. Chạy file SQL trong `Docs/` để setup dữ liệu.
2.  **Frontend**: 
    *   Lấy Token qua `/auth/login`.
    *   Sử dụng Token này trong Header `Authorization: Bearer <token>` cho mọi request.
    *   Dữ liệu luôn bọc trong trường `data`. Kiểm tra `isSuccess` để hiển thị lỗi.

---
*Cập nhật lần cuối: 25/04/2026 bởi Gemini CLI Agent.*
