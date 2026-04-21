import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Phục vụ toàn bộ các file tĩnh đã được Build trong thư mục dist/ (bao gồm CSS, JS, HTML, Hình ảnh,...)
app.use(express.static(path.join(__dirname, "dist")));

// Fallback: Nếu người dùng truy cập một đường dẫn lạ hoặc làm mới (F5) trang con (ví dụ: /login),
// trả về index.html để React Router xử lý thay vì báo lỗi 404 từ máy chủ.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Lắng nghe trên 0.0.0.0 để cho phép truy cập từ internet/bên ngoài VPS
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Production server is running on http://0.0.0.0:${PORT}`);
});
