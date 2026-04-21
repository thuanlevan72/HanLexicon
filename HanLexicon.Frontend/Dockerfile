# ==========================================
# STAGE 1: BUILD (Môi trường để đóng gói code)
# ==========================================
# Sử dụng Node.js bản 20 (bản chuẩn bạn đang dùng) phiên bản alpine siêu nhẹ
FROM node:22-alpine AS builder

WORKDIR /app

# Copy các file quản lý thư viện vào trước để tận dụng cache của Docker
COPY package.json package-lock.json* ./

# Cài đặt TOÀN BỘ thư viện (bao gồm cả devDependencies để chạy Vite build)
RUN npm install

# Copy toàn bộ mã nguồn của bạn vào trong container
COPY . .

# Tiến hành Build dự án (sinh ra thư mục dist chuẩn SEO)
RUN npm run build


# ==========================================
# STAGE 2: PRODUCTION (Môi trường chạy thật)
# ==========================================
FROM node:22-alpine AS runner

WORKDIR /app

# Khai báo môi trường là Production
ENV NODE_ENV=production
ENV PORT=3000

# Chỉ copy package.json để cài thư viện
COPY package.json package-lock.json* ./

# Lần này CHỈ cài các thư viện thật sự cần lúc chạy (như express), bỏ qua đống devDependencies cho nhẹ máy
RUN npm install --omit=dev

# Copy thư mục dist và file server.js đã được build thành công từ Stage 1 sang đây
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./server.js

# Mở port 3000 cho bên ngoài gọi vào
EXPOSE 3000

# Lệnh khởi động server khi container chạy
CMD ["node", "server.js"]