# Thư mục Public (Tài nguyên tĩnh)

Thư mục `public` này dùng để chứa các tài nguyên tĩnh lớn không cần đi qua bộ xử lý (bundler) của Vite. Đặc biệt phù hợp cho:
- Hình ảnh lớn, ảnh nền (`/images/`)
- Tệp âm thanh đọc tiếng Trung, file mp3 (`/audio/`)
- Video bài giảng, clip ngắn (`/videos/`)
- Mẫu file Excel nhập/xuất tĩnh, PDF giáo trình (`/docs/`)

## Quy tắc sử dụng:
Bất kỳ file nào đặt ở đây đều có thể gọi thẳng bằng đường dẫn gốc `/`.
**Ví dụ:**
Nếu tệp là `public/audio/hsk1-lesson1.mp3`
-> Code React: `<audio src="/audio/hsk1-lesson1.mp3" controls />`
