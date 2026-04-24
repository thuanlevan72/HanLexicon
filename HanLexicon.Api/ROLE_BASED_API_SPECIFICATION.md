# ĐẶC TẢ API PHÂN CHIA THEO LUỒNG NGHIỆP VỤ (61 ENDPOINTS)

---

## 1. LUỒNG CÔNG KHAI (ALL USERS / PUBLIC)
*Các API không yêu cầu Token hoặc dùng để khởi tạo phiên làm việc.*

| STT | Tên API | Method | Route | Mô tả | Đầu vào | Đầu ra |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Login** | POST | `/api/Auth/login` | Đăng nhập tài khoản | `email/userName`, `password` | `AuthResultDto` (Token) |
| 2 | **Register** | POST | `/api/Auth/register` | Đăng ký học viên mới | `username`, `password`, `email` | `{ "message": "..." }` |
| 3 | **Get Lessons** | GET | `/Lessons/GetLessons` | Xem danh sách bài học công khai | None | `List<GameCategory>` |
| 4 | **Test Data** | GET | `/WeatherForecast/GetTestData` | Debug cấu trúc DB (Dev only) | None | Full DB JSON Tree |
| 5 | **Weather** | GET | `/WeatherForecast` | API mẫu hệ thống | None | `WeatherForecast[]` |

---

## 2. LUỒNG HỌC VIÊN (STUDENT WORKFLOW)
*Yêu cầu xác thực: `Bearer Token`. Luồng này tập trung vào trải nghiệm học tập và tương tác.*

| STT | Tên API | Method | Route | Mô tả | Đầu vào | Đầu ra |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| 6 | **Refresh Token**| POST | `/api/Auth/refresh_token` | Duy trì phiên đăng nhập | `refreshToken` | New Token |
| 7 | **Logout** | POST | `/api/Auth/logout` | Thoát thiết bị hiện tại | `clientRefreshToken` | Success message |
| 8 | **Logout All** | POST | `/api/Auth/logout-all` | Thoát toàn bộ thiết bị | None | Success message |
| 9 | **Lesson Detail**| GET | `/Lessons/{id}` | Lấy full data để nạp vào Game | `id` (Guid) | `LessonFullDetailDto` |
| 10| **Vocabs Game** | GET | `/Lessons/{id}/vocabularies` | Lấy từ vựng cho mini-game | `id` (Guid) | `List<VocabItem>` |
| 11| **Download Docs**| GET | `/Lessons/documents` | Lấy tài liệu (PDF) của Level | `categoryId` | `List<Document>` |
| 12| **Save Progress**| POST | `/Lessons/SaveProgress` | Lưu kết quả sau khi hoàn thành | `score`, `timeSpentS` | `{ "success": true }` |
| 13| **Search Word** | GET | `/api/Vocabularies/search` | Tra từ điển + Log lịch sử | `query` | `List<Vocabulary>` |
| 14| **Mark Mastery** | POST | `/api/Vocabularies/UpdateProgress`| Đánh dấu thuộc từ/cần ôn tập | `vocabId`, `status` | `{ "success": true }` |
| 15| **My Dashboard** | GET | `/api/User/stats` | Xem tổng điểm, thời gian học | None | `VUserStat` |
| 16| **My Word List** | GET | `/api/User/word-progress` | Danh sách từ vựng đang học | None | `List<UserWordProgress>` |
| 17| **Upload Media** | POST | `/api/Files/upload` | Upload ảnh cá nhân (nếu cần) | `file`, `ownerType` | `MediaFile` info |

---

## 3. LUỒNG QUẢN TRỊ VIÊN (ADMIN WORKFLOW)
*Yêu cầu xác thực: `Bearer Token` + **Role: Admin**. Luồng này dùng để quản lý nội dung số.*

### 3.1. Quản lý Bài học & Từ vựng (Core Content)
| STT | Nhóm chức năng | Endpoints (GET, POST, PUT, DELETE) | Mô tả |
| :-- | :--- | :--- | :--- |
| 18-21 | **Danh mục** | `/api/Admin/categories` | Quản lý Level (HSK 1, HSK 2...) |
| 22-25 | **Bài học** | `/api/Admin/lessons` | Quản lý thông tin bài và `Filename` (Game ID) |
| 26-29 | **Từ vựng** | `/api/Admin/vocabularies` | Quản lý nghĩa VN/EN, Pinyin, Audio, Image |
| 30-31 | **Import Bulk**| `/api/Admin/vocabularies/import` | Nạp hàng nghìn từ vựng từ Excel + Zip Media |
| 32 | **Import Job** | `/api/Admin/vocabularies/import-status/{id}` | Theo dõi tiến độ nạp dữ liệu real-time |

### 3.2. Quản lý chi tiết học thuật (Lesson Internals)
| STT | Nhóm chức năng | Endpoints (GET, POST, PUT, DELETE) | Mô tả |
| :-- | :--- | :--- | :--- |
| 33-36 | **Hanzi Cards** | `/api/Admin/hanzi-cards` | Quản lý cách viết, số nét, bộ thủ của chữ |
| 37-40 | **Challenge** | `/api/Admin/challenge-words` | Quản lý nhóm từ vựng thử thách khó |
| 41-44 | **Radical Set** | `/api/Admin/radical-sets` | Nhóm các bộ thủ liên quan trong bài |
| 45-48 | **Radical Det** | `/api/Admin/radicals` | Chi tiết từng bộ thủ và chữ Hán ví dụ |
| 49-52 | **Quizzes** | `/api/Admin/quizzes` | Quản lý câu hỏi trắc nghiệm của bài học |
| 53-56 | **Quiz Options**| `/api/Admin/quiz-options` | Quản lý đáp án đúng/sai cho câu hỏi |
| 57-60 | **Documents** | `/api/Admin/documents` | Quản lý tệp PDF tài liệu đính kèm |

### 3.3. Dashboard & Hệ thống
| STT | Tên API | Method | Route | Mô tả |
| :-- | :--- | :--- | :--- | :--- |
| 61 | **Lesson Sum** | GET | `/api/Admin/dashboard/lessons-summary` | Báo cáo số lượng Vocab/Quiz từng bài |
| 62 | **Import Hist** | GET | `/api/Admin/dashboard/import-jobs` | Lấy 50 lịch sử Import gần nhất |

---
**Ghi chú kỹ thuật:**
*   **Security**: Luồng Admin được bảo vệ bởi Policy `Authorize(Roles = "Admin")`.
*   **Integration**: Khi tích hợp Game Engine, hãy dùng **STT 9** để lấy trọn bộ dữ liệu một lần duy nhất, tránh gọi quá nhiều API lẻ.
