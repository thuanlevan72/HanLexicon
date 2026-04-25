# Tài Khoản Test (Mock Accounts)

Hệ thống đã loại bỏ đăng nhập giả (fallback) và thay thế bằng chức năng kiểm tra đăng nhập chặt chẽ. Dưới đây là các tài khoản test đang nhận diện trên hệ thống (chỉnh sửa trong \`src/services/api.ts\`):

### 1. Tài khoản Học viên (Student)
- **Role:** Học viên (Student)
- **Email:** \`student@chuang.com\`
- **Mật khẩu:** \`student123\`

### 2. Tài khoản Quản trị (Admin)
- **Role:** Admin
- **Email:** \`admin@chuang.com\`
- **Mật khẩu:** \`admin123\`

*Ghi chú*: Nếu nhập sai pass hoặc chọn sai Role, phần mềm sẽ báo lỗi "Sai thông tin đăng nhập hoặc sai vai trò".
