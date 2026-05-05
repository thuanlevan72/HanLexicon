# HanLexicon - Hệ thống Quản lý Học tập (LMS) Tiếng Trung Đa phương tiện

[![Technology Stack](https://img.shields.io/badge/Stack-.NET%2010%20%7C%20React%2019%20%7C%20Postgres-blue.svg)](https://github.com/your-repo/hanlexicon)
[![Environment](https://img.shields.io/badge/Environment-Docker--Compose-green.svg)](#)
[![License](https://img.shields.io/badge/License-MIT-brightgreen.svg)](LICENSE)

**HanLexicon** là một nền tảng học tiếng Trung hiện đại, được thiết kế để tối ưu hóa trải nghiệm người dùng thông qua hình ảnh, âm thanh và các thuật toán theo dõi tiến độ học tập cá nhân hóa. Dự án tập trung vào tính hiệu quả trong quản trị nội dung và khả năng mở rộng kiến trúc.

---

## 🏗️ Kiến trúc Hệ thống (System Architecture)

Dự án áp dụng mô hình **Decoupled Architecture** với sự tách biệt hoàn toàn giữa Frontend và Backend, giao tiếp qua RESTful API.

### 1. Backend (.NET 10 Web API)
Xây dựng theo **Clean Architecture (Onion Architecture)**:
*   **HanLexicon.Domain**: Chứa các Entity, Value Objects, Domain Exceptions và Interfaces cốt lõi. Sử dụng UUID v4 cho toàn bộ khóa chính.
*   **HanLexicon.Application**: Chứa Logic nghiệp vụ (Features), DTOs, Mappers (AutoMapper) và Validation. Tổ chức theo từng Feature (ví dụ: `Auth`, `LessonsUser`, `Search`).
*   **Infrastructure.Postgres**: Triển khai EF Core, cấu hình Fluent API, Repository pattern và lưu trữ Log tập trung.
*   **Infrastructure.Minio**: Quản lý Object Storage tương thích S3 cho đa phương tiện (Ảnh/Audio).
*   **Infrastructure.BackgroundJobs**: Xử lý các tác vụ nặng như nạp dữ liệu từ Excel bất đồng bộ.

### 2. Frontend (React 19 & Vite)
*   **Rendering**: Hỗ trợ **SSR (Server-Side Rendering)** và **SSG (Static Site Generation)** giúp tối ưu tốc độ tải trang và SEO.
*   **State Management**: Redux Toolkit (RTK) giúp quản lý trạng thái học tập của người dùng.
*   **UI Engine**: Tailwind CSS v4, Motion (Animations) và Shadcn/UI tạo nên giao diện hiện đại, mượt mà.

---

## 📂 Cấu trúc Thư mục (Directory Structure)

```text
D:\Work\HanLexicon\
├── HanLexicon.Api/             # --- BACKEND SOLUTION ---
│   ├── HanLexicon.Domain/      # Thực thể & Logic lõi
│   ├── HanLexicon.Application/ # Nghiệp vụ & DTOs
│   ├── Infrastructure.Postgres/# Database (EF Core)
│   ├── Infrastructure.Minio/   # Storage (S3/MinIO)
│   ├── Infrastructure.BackgroundJobs/ # Tác vụ ngầm
│   ├── HanLexicon.Api/         # Controllers & Configuration
│   └── HanLexicon.Tests/       # Unit & Integration Tests
│
├── HanLexicon.Frontend/        # --- FRONTEND APP ---
│   ├── src/
│   │   ├── components/         # Reusable UI
│   │   ├── services/           # API Consumers (Axios)
│   │   ├── store/              # Redux Slices
│   │   └── pages/              # Route Components
│   ├── public/                 # Tệp tĩnh (audio/images)
│   └── scripts/                # SSG & Prerender scripts
│
├── docker-compose.yml          # Container orchestration
└── database.sql                # File khởi tạo dữ liệu
```

---

## 📊 Đặc tả Dữ liệu (Database Specifications)

Hệ thống quản lý 4 nhóm dữ liệu chính:

1.  **Quản lý Nội dung**:
    *   `lesson_categories` (HSK 1-6) -> `lessons` -> `vocabulary`.
    *   Mỗi từ vựng (`vocabulary`) liên kết với URL Image và Audio trên MinIO.
2.  **Định danh (Identity)**:
    *   `users`, `roles`, `user_sessions` (Quản lý JWT & Refresh Token).
3.  **Tiến độ Học tập**:
    *   `user_progress`: Lưu điểm bài học.
    *   `user_word_progress`: Trạng thái thuộc lòng của từng từ (`learning`, `mastered`, `review`).
4.  **Hệ thống & Log**:
    *   `import_jobs`: Theo dõi tiến trình Bulk Import.
    *   `logs`: Lưu log Serilog trực tiếp vào Postgres (Table `logs`).

---

## ⚙️ Quy trình Cốt lõi: Bulk Import

Tính năng quan trọng nhất dành cho Admin để nạp hàng ngàn từ vựng kèm tài nguyên media:

1.  **Giai đoạn 1 (Validation)**: Admin upload file Excel (.xlsx). Hệ thống kiểm tra cấu trúc 10 cột chuẩn.
2.  **Giai đoạn 2 (Media Mapping)**: Hệ thống ánh xạ tên file ảnh/audio từ Excel sang kho lưu trữ.
3.  **Giai đoạn 3 (Execution)**: Sử dụng **Background Job** để:
    *   Đọc Excel bằng thư viện EPPlus.
    *   Upload file lên MinIO theo cấu trúc thư mục `/vocab/{category}/{guid}/`.
    *   Lưu vào Database và ghi nhận lịch sử vào `import_jobs`.

---

## 🛠️ Cài đặt & Vận hành (Installation & Setup)

### Yêu cầu tiên quyết
*   **Runtime**: .NET 10.0 SDK & Node.js v22+
*   **Infrastructure**: Docker Desktop (để chạy Postgres & MinIO)

### Bước 1: Khởi tạo hạ tầng
```bash
docker-compose up -d
```

### Bước 2: Cấu hình Backend
Sửa file `appsettings.json` trong `HanLexicon.Api/HanLexicon.Api`:
*   Cập nhật `ConnectionStrings:DefaultConnection`.
*   Cấu hình `MinioSettings` (Endpoint, AccessKey, SecretKey).

### Bước 3: Chạy ứng dụng
*   **Backend**: `dotnet run --project HanLexicon.Api/HanLexicon.Api`
*   **Frontend**: `cd HanLexicon.Frontend && npm install && npm run dev`

---

## 📜 Quy chuẩn Phát triển (Development Workflow)

1.  **API Response**: Phải luôn sử dụng `ApiResponse<T>` wrapper.
    ```json
    { "isSuccess": true, "data": { ... }, "errors": [] }
    ```
2.  **Error Handling**: Không sử dụng try-catch rời rạc. Sử dụng `GlobalExceptionHandler` hoặc `ExceptionMiddleware`.
3.  **Logging**: Sử dụng `Log.Information()` hoặc `Log.Error()` của Serilog. Log sẽ được ghi đồng thời ra Console và Postgres.
4.  **Testing**: Mọi tính năng mới phải có Unit Test trong `HanLexicon.Tests`. Chạy test bằng lệnh `dotnet test`.

---

© 2026 HanLexicon Project. Hướng tới trải nghiệm học tiếng Trung hoàn hảo.
