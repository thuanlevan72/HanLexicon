# 🚀 Hướng Dẫn Triển Khai Lên VPS (Virtual Private Server) Bất Kỳ

Chào bạn, bộ source code này đã được tối ưu hóa ở mức cao nhất (đáp ứng trọn vẹn cả tính năng SEO nhờ SSG và tốc độ của SPA).
Để triển khai website lên máy chủ VPS (như của DigitalOcean, Vultr, AWS, AZONE, v.v.), bạn có 3 phương pháp phổ biến sau đây. Bạn hãy chọn cách nào phù hợp với thói quen của mình nhất:

---

## Cách 1: Triển Khai Bằng Docker (Khuyên Dùng - Gốc Rễ & Ổn Định Nhất)
Nếu VPS của bạn đã cài đặt sẵn `Docker` và `Docker Compose`. Bạn chỉ cần ném toàn bộ mã nguồn này lên server, trỏ cmd vào thư mục gốc và gõ đúng 2 lệnh:

1. **Build image và chạy ngầm (Detached mode):**
   ```bash
   docker-compose up -d --build
   ```
2. Nếu mã nguồn có thay đổi trong tương lai, bạn chỉ cần gõ lại lệnh trên để Web tự động cập nhật.

*(Lợi ích: Docker sẽ chạy website của bạn độc lập, nếu VPS bị crash và khởi động lại, web của bạn sẽ tự động chạy lên nhờ lện `restart: always` đã được cài)*.

---

## Cách 2: Setup Chạy Qua Node.js & PM2 (Dành Cho Máy Chủ Cài Sẵn Node)
Nếu VPS của bạn ưu tiên chạy dịch vụ trực tiếp, hãy cài đặt `Node.js` (khuyến nghị phiên bản 20+).

1. Cài đặt các thư viện cần thiết:
   ```bash
   npm install
   ```
2. Build (đóng gói) mã nguồn dự án:
   ```bash
   npm run build
   ```
3. Cài đặt PM2 (Tiện ích giữ cho Node app chạy 24/7):
   ```bash
   npm install pm2 -g
   ```
4. Khởi chạy Server.js bằng PM2:
   ```bash
   pm2 start server.js --name "mandarin_flow"
   pm2 save
   pm2 startup
   ```

---

## Cách 3: Ném Trực Tiếp Lên Nginx / Apache
Nếu bạn dùng các hệ thống Panel như **CyberPanel, aaPanel, DirectAdmin**, việc triển khai lại càng dễ dàng vì phía panel đã cài sẵn Nginx:

1. Copy duy nhất thư mục `dist/` (sau khi chạy `npm run build` trên máy cá nhân) đưa lên thư mục `public_html/` hoặc `/var/www/domain/` trên VPS.
2. Thiết lập chặn lỗi 404 cho React Router thông qua cấu hình `nginx.conf`:
   
   ```nginx
   server {
       listen 80;
       server_name domaincuaban.com;
       root /var/www/domaincuaban/dist; # Thay đổi đường dẫn này
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```
3. Khởi động lại Nginx (`systemctl restart nginx`) là xong. Lúc này tên miền của bạn sẽ chạy thẳng vào web!
