# HanLexicon 🏮

HanLexicon là một nền tảng học tập trực tuyến (E-learning) chuyên sâu về tiếng Trung (Hán ngữ). Hệ thống kết hợp giữa quản lý nội dung học tập theo chuẩn HSK, học tập tương tác qua trò chơi (Gamification) và theo dõi lộ trình cá nhân hóa.

## 🚀 Các Tính Năng Chính

- **Quản Trị Người Dùng & Phân Quyền (RBAC):** Xác thực an toàn với JWT và Refresh Token, phân quyền dựa trên vai trò (Admin, Student) và quản lý phiên làm việc.
- **Quản Lý Nội Dung Học Tập:**
  - Cấu trúc phân cấp: Danh mục (Cấp độ HSK) -> Bài học.
  - **Thẻ Chữ Hán (Hanzi):** Thông tin số nét, bộ thủ, phiên âm và mẹo ghi nhớ.
  - **Từ Vựng (Vocabulary):** Hỗ trợ đa ngôn ngữ (Trung, Việt, Anh) kèm hình ảnh và âm thanh trực quan.
  - **Bộ Thủ (Radicals):** Tìm hiểu cấu tạo chữ Hán thông qua các bộ thủ cơ bản.
- **Hệ Thống Đánh Giá & Kiểm Tra:** Các bài trắc nghiệm (Quiz) tương tác với nhiều cấp độ khó và giải thích chi tiết.
- **Theo Dõi Tiến Độ Học Tập:**
  - **Tiến độ bài học:** Lưu trữ điểm số, trạng thái hoàn thành và thời gian học.
  - **Tiến độ từ vựng:** Theo dõi mức độ thuộc từ của từng cá nhân (tương tự phương pháp SRS).
  - **Lịch sử tra cứu:** Lưu lại các từ đã tìm kiếm để ôn tập nhanh.
- **Bảng Điều Khiển Admin:**
  - **Nhập dữ liệu lớn (Bulk Import):** Hệ thống nhập dữ liệu từ Excel mạnh mẽ cho bài học, từ vựng và tệp media.
  - **Quản lý Media:** Xử lý tệp tập trung qua lưu trữ tương thích S3 (Minio).

## 🛠 Công Nghệ Sử Dụng

### Backend
- **Framework:** .NET 10 Web API
- **Kiến trúc:** Clean Architecture / Domain-Driven Design (DDD)
- **Cơ sở dữ liệu:** PostgreSQL với Entity Framework Core
- **Giao tiếp nội bộ:** MediatR (Pattern CQRS)
- **Xác thực dữ liệu:** FluentValidation
- **Ánh xạ đối tượng:** AutoMapper
- **Bảo mật:** JWT, BCrypt.Net
- **Tác vụ nền:** Xử lý nhập dữ liệu lớn qua Background Jobs

### Frontend
- **Framework:** React 19 (TypeScript)
- **Công cụ build:** Vite 6
- **Quản lý trạng thái:** Redux Toolkit
- **Giao diện:** Tailwind CSS v4, Shadcn UI
- **Hiệu ứng:** Framer Motion (Motion)
- **Điều hướng:** React Router v7
- **Đa ngôn ngữ:** i18next

### Hạ tầng
- **Containerization:** Docker & Docker Compose
- **Lưu trữ đối tượng:** Minio (S3-compatible)
- **Cơ sở dữ liệu:** PostgreSQL

## 📂 Cấu Trúc Dự Án

```text
HanLexicon/
├── HanLexicon.Api/             # Backend .NET 10
│   ├── HanLexicon.Domain/      # Thực thể và Logic nghiệp vụ lõi
│   ├── HanLexicon.Application/ # Use Cases, DTOs, Handlers
│   ├── Infrastructure.Postgres/# Kết nối DB và Repositories
│   ├── Infrastructure.Minio/   # Triển khai lưu trữ Object Storage
│   └── HanLexicon.Api/         # Controllers và Cấu hình API
├── HanLexicon.Frontend/        # Frontend React 19
│   ├── src/
│   │   ├── components/         # Các thành phần giao diện dùng chung
│   │   ├── pages/              # Các trang giao diện chính
│   │   ├── store/              # Cấu hình Redux Slices
│   │   └── services/           # Gọi API backend
└── docker-compose.yml          # Điều phối hạ tầng (DB, Storage)
```

## 🚦 Hướng Dẫn Cài Đặt

### Yêu cầu hệ thống
- .NET 10 SDK
- Node.js (v20+) & npm
- Docker Desktop

### Các bước thiết lập

1. **Sao chép mã nguồn:**
   ```bash
   git clone https://github.com/your-repo/HanLexicon.git
   cd HanLexicon
   ```

2. **Khởi chạy hạ tầng:**
   Sử dụng Docker Compose để chạy Database và Minio:
   ```bash
   docker-compose up -d
   ```

3. **Thiết lập Backend:**
   ```bash
   cd HanLexicon.Api
   dotnet restore
   dotnet run --project HanLexicon.Api
   ```

4. **Thiết lập Frontend:**
   ```bash
   cd HanLexicon.Frontend
   npm install
   npm run dev
   ```

## 📖 Tài Liệu API
Khi backend đang chạy, bạn có thể truy cập tài liệu Swagger tại:
`http://localhost:5029/swagger` (Hoặc port được cấu hình trong `launchSettings.json`).

## 📄 Giấy phép
Dự án này được cấp phép theo MIT License.
