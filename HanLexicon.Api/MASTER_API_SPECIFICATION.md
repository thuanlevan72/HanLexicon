# MASTER API SPECIFICATION - HỆ THỐNG HANLEXICON (V1.0)

Tài liệu đặc tả toàn bộ các Endpoint API của hệ thống. 
**Base Path:** `/` hoặc `/api` tùy theo module.
**Xác thực:** Header `Authorization: Bearer <JWT_TOKEN>` cho các API yêu cầu đăng nhập.

---

## 1. MODULE XÁC THỰC (AuthController) - Path: `/api/Auth`

| STT | Tên API | Method | Route | Mô tả | Đầu vào (Body/Query) | Đầu ra (200 OK) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Login | POST | `/login` | Đăng nhập tài khoản | `email`, `userName`, `password`, `ipAddress` | `AuthResultDto` (Token, UserId...) |
| 2 | Refresh Token | POST | `/refresh_token` | Cấp Access Token mới | `refreshToken` (String) | `AuthResultDto` mới |
| 3 | Register | POST | `/register` | Đăng ký Student | `username`, `password`, `confirmPassword`, `email`, `displayName` | `{ "message": "..." }` |
| 4 | Logout | POST | `/logout` | Thoát thiết bị hiện tại | `clientRefreshToken` (String) | `{ "message": "..." }` |
| 5 | Logout All | POST | `/logout-all` | Thoát toàn bộ thiết bị | None | `{ "message": "..." }` |

---

## 2. MODULE HỌC TẬP NGƯỜI DÙNG (LessonsController) - Path: `/Lessons`

| STT | Tên API | Method | Route | Mô tả | Đầu vào | Đầu ra |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 6 | Get Lessons | GET | `/GetLessons` | Lấy cây Danh mục & Bài học | None | `List<GameCategoryResponseDto>` |
| 7 | Get Lesson Detail | GET | `/{id}` | Lấy Full data học thuật bài học | `id` (Guid - Path) | `LessonFullDetailDto` (Hanzi, Quizzes...) |
| 8 | Get Vocabularies | GET | `/{id}/vocabularies` | Lấy từ vựng phục vụ mini-game | `id` (Guid - Path) | `List<VocabularyItemDto>` |
| 9 | Get Documents | GET | `/documents` | Lấy tài liệu theo Category | `categoryId` (Short - Query) | `List<DocumentCategoryResponseDto>` |
| 10 | Save Progress | POST | `/SaveProgress` | Lưu kết quả sau khi chơi Game | `lessonId`, `score`, `completed`, `timeSpentS` | `{ "success": true }` |

---

## 3. MODULE TRA CỨU & CÁ NHÂN (Vocabularies & UserController)

| STT | Tên API | Method | Route | Mô tả | Đầu vào | Đầu ra |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 11 | Search | GET | `/api/Vocabularies/search` | Tìm từ vựng + Lưu lịch sử | `query` (String) | `List<Vocabulary>` (Max 20) |
| 12 | Update Progress | POST | `/api/Vocabularies/UpdateProgress` | Cập nhật độ thuộc từ | `vocabId`, `status` | `{ "success": true }` |
| 13 | Get User Stats | GET | `/api/User/stats` | Lấy Dashboard học tập | None | `VUserStat` (Point, AvgScore...) |
| 14 | Get Word Progress | GET | `/api/User/word-progress` | Danh sách từ vựng đã học | None | `List<UserWordProgress>` |

---

## 4. MODULE QUẢN TRỊ NỘI DUNG (AdminController) - Path: `/api/Admin`
*Yêu cầu quyền: **Role Admin***

### 4.1. Lesson Categories (Danh mục)
| STT | Tên API | Method | Route | Đầu vào |
| :--- | :--- | :--- | :--- | :--- |
| 15 | Get Categories | GET | `/categories` | None |
| 16 | Create Category | POST | `/categories` | `name`, `slug`, `sortOrder` |
| 17 | Update Category | PUT | `/categories/{id}` | `id`, `name`, `slug`, `sortOrder` |
| 18 | Delete Category | DELETE | `/categories/{id}` | `id` (Short) |

### 4.2. Lessons (Bài học)
| STT | Tên API | Method | Route | Đầu vào |
| :--- | :--- | :--- | :--- | :--- |
| 19 | Get Lessons Admin | GET | `/lessons` | `categoryId` (Optional) |
| 20 | Create Lesson | POST | `/lessons` | `categoryId`, `filename`, `titleCn`, `titleVn`... |
| 21 | Update Lesson | PUT | `/lessons/{id}` | `Guid id`, `Body command` |
| 22 | Delete Lesson | DELETE | `/lessons/{id}` | `id` (Guid) |

### 4.3. Vocabulary (Từ vựng)
| STT | Tên API | Method | Route | Đầu vào |
| :--- | :--- | :--- | :--- | :--- |
| 23 | Get Vocabularies | GET | `/vocabularies` | `lessonId` (Guid - Optional) |
| 24 | Create Vocabulary | POST | `/vocabularies` | `lessonId`, `word`, `pinyin`, `meaning`... |
| 25 | Update Vocabulary | PUT | `/vocabularies/{id}` | `Guid id`, `Body command` |
| 26 | Delete Vocabulary | DELETE | `/vocabularies/{id}` | `id` (Guid) |
| 27 | **Import Bulk** | POST | `/vocabularies/import` | **excelFile** (.xlsx), **mediaZip** (.zip) |
| 28 | Import Status | GET | `/vocabularies/import-status/{jobId}`| `jobId` (Guid) |

### 4.4. Hanzi Cards (Thẻ chữ Hán)
| STT | Tên API | Method | Route | Đầu vào |
| :--- | :--- | :--- | :--- | :--- |
| 29 | Get Hanzi Cards | GET | `/hanzi-cards` | `lessonId` (Query) |
| 30 | Create Hanzi Card | POST | `/hanzi-cards` | `lessonId`, `character`, `pinyin`, `meaning`... |
| 31 | Update Hanzi Card | PUT | `/hanzi-cards/{id}` | `id`, `character`... |
| 32 | Delete Hanzi Card | DELETE | `/hanzi-cards/{id}` | `id` (Guid) |

### 4.5. Challenge Words (Từ vựng thử thách)
| STT | Tên API | Method | Route |
| :--- | :--- | :--- | :--- |
| 33-36 | CRUD Challenge | GET/POST/PUT/DELETE | `/challenge-words` |

### 4.6. Radicals (Bộ thủ)
| STT | Tên API | Method | Route |
| :--- | :--- | :--- | :--- |
| 37 | Get Sets | GET | `/radical-sets` |
| 38 | Create Set | POST | `/radical-sets` |
| 39 | Update Set | PUT | `/radical-sets/{id}` |
| 40 | Delete Set | DELETE | `/radical-sets/{id}` |
| 41-44 | CRUD Radicals | GET/POST/PUT/DELETE | `/radicals` |

### 4.7. Quiz & Options (Trắc nghiệm)
| STT | Tên API | Method | Route |
| :--- | :--- | :--- | :--- |
| 45-48 | CRUD Quizzes | GET/POST/PUT/DELETE | `/quizzes` |
| 49-52 | CRUD Options | GET/POST/PUT/DELETE | `/quiz-options` |

### 4.8. Documents (Tài liệu)
| STT | Tên API | Method | Route |
| :--- | :--- | :--- | :--- |
| 53 | Get Admin Docs | GET | `/documents-admin` |
| 54 | Create Doc | POST | `/documents` |
| 55 | Update Doc | PUT | `/documents/{id}` |
| 56 | Delete Doc | DELETE | `/documents/{id}` |

### 4.9. Admin Dashboard
| STT | Tên API | Method | Route | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| 57 | Lessons Summary | GET | `/dashboard/lessons-summary`| Thống kê Vocab/Quiz theo bài |
| 58 | Import Jobs | GET | `/dashboard/import-jobs` | Lấy 50 lịch sử nạp dữ liệu gần nhất |

---

## 5. MODULE TỆP TIN & TEST (Files & Weather)

| STT | Tên API | Method | Route | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| 59 | Upload File | POST | `/api/Files/upload` | Tải lên ảnh/âm thanh + Lưu vào MediaFile |
| 60 | Get Test Data | GET | `/WeatherForecast/GetTestData` | Debug dữ liệu LessonCategories |
| 61 | Weather Sample | GET | `/WeatherForecast` | API thời tiết mẫu |

---

## GHI CHÚ KỸ THUẬT QUAN TRỌNG
1. **Lưu tiến độ học tập (Endpoint 10):** Hệ thống KHÔNG cho phép gửi `userId` trong body. Backend tự động lấy `userId` từ token đang đăng nhập để tránh gian lận điểm số.
2. **Import Bulk (Endpoint 27):** Yêu cầu chuẩn template Excel. Trường hợp file Zip media, tên file trong Zip phải khớp chính xác với cột MediaFileName trong Excel.
3. **Thống kê Dashboard (Endpoint 13):** Sử dụng View `v_user_stats` để tính toán Aggregate (Sum, Avg) giúp tối ưu hiệu năng Query.
4. **Data Type:** Mọi trường ID đều là **UUID (String format)**. Mọi trường điểm số/thứ tự là **Short/Integer**.
