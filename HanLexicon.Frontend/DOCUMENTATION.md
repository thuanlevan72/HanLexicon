# 📘 Tài Liệu Kỹ Thuật Dự Án MandarinFlow

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/a355f86d-5fc2-4abe-bcbc-3661e663eee4

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## 1. Giới thiệu tổng quan

**MandarinFlow** là một hệ thống thiết kế nhằm cải thiện trải nghiệm học tập và ôn luyện tiếng Trung (từ sơ cấp HSK1 đến trung cấp HSK4+). Hệ thống được chia làm hai khu vực (Interface) lớn:

1. **Dành cho Học Viên (Student):** Giao diện học tập, làm bài kiểm tra (Quiz), ôn luyện từ vựng, tính năng theo dõi tiến độ.
2. **Dành cho Quản trị viên (Admin):** Giao diện điều hướng cho phép nhập liệu, quản lý người dùng tập trung.

## 2. Cấu trúc thư mục (Directory Structure)

Mã nguồn React được tổ chức dạng mô-đun (Module Pattern) ở bên trong thư mục gốc `src/` nhằm dễ dàng quản lý code theo tính năng.

- `src/components/`: Nơi chứa các thành phần có thể tái sử dụng chung cho giao diện (Buttons, Cards, Modals). Gói UI đặc biệt (`ui/...`) được xây dựng trên `shadcn` và `base-ui`. Và các hook phòng chống sập giao diện (VD: `ErrorBoundary`).
- `src/config/`: Lưu trữ các tùy chọn hoặc phân quyền không thể biến đổi (Constants).
- `src/context/`: Các State Management (Ví dụ: `AuthContext` quản lý dữ liệu phiên đăng nhập).
- `src/hooks/`: Các custom hook giúp tách biệt Logic ra khỏi Giao diện. Ví dụ điển hình là `useFetch` dùng gọi API hay `useDebounce` để giảm thiểu Request lặp lại vào hệ thống.
- `src/layouts/`: Bao bọc các template mảng lớn, giúp chia Layout riêng cho Admin/Học sinh để tránh việc tải lại các Sidebar và Header nhiều lần.
- `src/pages/`: Triển khai các màn hình cụ thể cho từng đường dẫn. (Trang Đăng Nhập, Dashboard..v.v).
- `src/services/`: Nhóm tiện ích kết nối tới Back End.
- `src/types/`: Các tập tin TypeScript đảm bảo sự nhất quán cho mô hình dữ liệu (Entity Type) khi trao đổi với Database ảo / thật.
- `src/utils/`: Những hàm tái sửa dụng độc lập, phổ biến là định dạng (Formatters), cắt chuỗi, lưu Local Storage an toàn.

## 3. Cách thức hoạt động và chức năng từng thành phần

### A. Core / Base Code Engine

1. **API Client (`apiClient.ts`)**: Base Client sử dụng thư viện `axios`. Chịu trách nhiệm cấu hình chung cho mọi Request trên Website (gắn mã bảo mật, Auth Token vào header) theo thời gian thực và tự động chặn các lỗi 401 hoặc 500 do Back-end phát trả mà không làm chết ứng dụng.
2. **Global Utilities (`formatters.ts` & `storage.ts`)**: Được xây dựng nhằm định dạng tiêu chuẩn (Ngày tháng Việt Nam -> DD/MM/YYYY hoặc chuỗi thời gian "5 phút trước") hay cấu trúc Local Storage sao cho an toàn, tránh lỗi cú pháp lúc Render.
3. **Tiện ích Hooks**:
   - `useFetch`: Chuẩn hoá quá trình fetch list dữ liệu với 3 biến (Data (tải xong), IsLoading (Đang tải), Error (Có lỗi mạng)).
   - `useDebounce`: Cực kì quan trọng để làm ô thanh tìm kiếm. Thuật toán trì hoãn hàm gọi API sau mỗi khi gõ phím để chặn Spam Request lên Sever.
4. **Boundary bảo vệ (`ErrorBoundary.tsx`)**: Đây là Hook Tối Quan Trọng bao ngoài ứng dụng - giống lưới cứu sinh. Vùng này sẽ hứng tất cả các lỗi React chết người. Nếu có bất kỳ trang nào bị lỗi Object Data, hệ thống không sập toàn bộ mà sẽ bung ra giao diện "Đã xảy ra lỗi, vui lòng thử lại" ở đúng Component đó.

### B. Vùng Quản trị định tuyến (App.tsx & Layouts)

- Hệ thống trang sử dụng tiện ích React Router Dom để chia ngả giao diện:
- `PublicLayout`: Khu sinh hoạt chung cho khách chưa Đăng Nhập (Đăng nhập, Đăng ký, Landing Page) -> Dải Navbar luôn tĩnh.
- `StudentLayout`: Môi trường của học viên chứa hệ thống Drawer/Sidebar kéo rút từ trái qua và có Thanh Search trung tâm. Layout này chia nhỏ thêm các trang hiển thị như Dashboard, List Bài Học, Từ vựng, Điểm số.
- `AdminLayout`: Được che chắn và bảo hộ bởi Context Role. Sidebar màu đen cá tính tạo sự khác biệt.

### C. Cơ chế Context (Xác thực đăng nhập)

- File `AuthContext.tsx` đứng nhiệm vụ như người gác cổng siêu cấp. Nó nuôi dữ liệu (Session) User tại thiết bị. Khi ứng dụng boot lên, nó sẽ quét Storage để xem trạng thái đã đăng nhập chưa, và tự động đổi hướng User về nhánh Layout đúng (Student vào luồng Học viên, Admin vào luồng hệ thống).

## 4. Hướng phát triển nâng cấp (Future Plan)

- Hiện tại thư viện Services như `api.ts` đang triển khai các hàm Delay để mô phỏng "thời gian trễ khi đi mạng" kết hợp với dữ liệu tĩnh giả (Mocking JSON).
- Để Website chính thức gọi được Server Thật, developer kế nhiệm tiếp theo chỉ cần điều hướng các Promise ở `api.ts` thay vì trả về Mock -> Sẽ trả về lệnh Gọi `apiClient.get('/...')` theo chuẩn hóa Core API do hệ thống đã xây nền phía dưới.
