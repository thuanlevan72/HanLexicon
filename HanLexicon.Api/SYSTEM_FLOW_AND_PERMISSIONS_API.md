# TÀI LIỆU ĐẶC TẢ HỆ THỐNG API VÀ PHÂN QUYỀN (61 ENDPOINTS)

Tài liệu này mô tả chi tiết 100% các endpoint trong hệ thống HanLexicon, chia theo luồng hoạt động nghiệp vụ.

---

## 1. LUỒNG HỆ THỐNG CÔNG KHAI (PUBLIC FLOW)
**Phân quyền:** Không yêu cầu Token (`AllowAnonymous`). Dùng để tiếp cận hệ thống và khởi tạo định danh.

| STT | Tên API | Method | Route | Mô tả | Đầu vào (Params/Body) | Đầu ra (200 OK) |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Login** | POST | `/api/Auth/login` | Đăng nhập tài khoản | Body: `email/userName`, `password`, `ipAddress` | `AuthResultDto` (AccessToken, UserId) |
| 2 | **Register** | POST | `/api/Auth/register` | Đăng ký Student mới | Body: `username`, `password`, `email`, `displayName` | `{ "message": "Đăng ký thành công" }` |
| 3 | **Get Lessons Tree**| GET | `/Lessons/GetLessons` | Xem cấu trúc bài học | None | `List<GameCategoryResponseDto>` |
| 4 | **Test Data Tree** | GET | `/WeatherForecast/GetTestData` | Debug toàn bộ DB | None | Full JSON Tree (Categories -> Lessons) |
| 5 | **Weather Sample** | GET | `/WeatherForecast` | API mẫu của hệ thống | None | `WeatherForecast[]` |

---

## 2. LUỒNG HỌC VIÊN (STUDENT WORKFLOW)
**Phân quyền:** Yêu cầu `Bearer Token` hợp lệ. Tập trung vào quá trình học tập và lưu trữ cá nhân.

| STT | Tên API | Method | Route | Mô tả | Đầu vào | Đầu ra |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| 6 | **Refresh Token** | POST | `/api/Auth/refresh_token` | Làm mới phiên đăng nhập | Body: `refreshToken` | `AuthResultDto` mới |
| 7 | **Logout Single** | POST | `/api/Auth/logout` | Thoát thiết bị hiện tại | Body: `clientRefreshToken` | `{ "message": "Đã đăng xuất..." }` |
| 8 | **Logout All** | POST | `/api/Auth/logout-all` | Thoát mọi thiết bị | None | `{ "message": "Đã đăng xuất..." }` |
| 9 | **Get Full Detail** | GET | `/Lessons/{id}` | Lấy data nạp vào Game | Path: `id` (Lesson Guid) | `LessonFullDetailDto` (Hanzi, Radicals...) |
| 10 | **Get Vocabs Game** | GET | `/Lessons/{id}/vocabularies` | Lấy từ vựng chơi game | Path: `id` (Lesson Guid) | `List<VocabularyItemDto>` |
| 11 | **Get Documents** | GET | `/Lessons/documents` | Tải tài liệu theo Level | Query: `categoryId` | `List<DocumentCategoryResponseDto>` |
| 12 | **Save Progress** | POST | `/Lessons/SaveProgress` | Lưu kết quả học tập | Body: `lessonId`, `score`, `completed`, `timeSpentS` | `{ "success": true }` |
| 13 | **Search Vocab** | GET | `/api/Vocabularies/search` | Tra từ + Log lịch sử | Query: `query` (Từ khóa) | `List<Vocabulary>` (Max 20 results) |
| 14 | **Update Word** | POST | `/api/Vocabularies/UpdateProgress`| Đánh dấu độ thuộc từ | Body: `vocabId`, `status` | `{ "success": true }` |
| 15 | **Get Stats** | GET | `/api/User/stats` | Xem Dashboard cá nhân | None (Tự định danh) | `VUserStat` (Point, AvgScore...) |
| 16 | **Get My Words** | GET | `/api/User/word-progress` | List từ vựng đang học | None (Tự định danh) | `List<UserWordProgress>` |
| 17 | **Upload Media** | POST | `/api/Files/upload` | Tải lên file ảnh/audio | Form: `file`, `ownerType`, `ownerId` | `{ "id", "cdnUrl", "fileName" }` |

---

## 3. LUỒNG QUẢN TRỊ VIÊN (ADMIN WORKFLOW)
**Phân quyền:** Yêu cầu `Bearer Token` + **Role: Admin**. Quản lý toàn bộ vòng đời của dữ liệu nội dung.

### 3.1. Quản lý Danh mục & Bài học (Admin CMS)
| STT | Tên API | Method | Route | Đầu vào (Body/Path) | Đầu ra |
| :-- | :--- | :--- | :--- | :--- | :--- |
| 18 | **List Categories** | GET | `/api/Admin/categories` | None | `List<LessonCategoryDto>` |
| 19 | **Add Category** | POST | `/api/Admin/categories` | `name`, `slug`, `sortOrder` | `LessonCategoryDto` |
| 20 | **Edit Category** | PUT | `/api/Admin/categories/{id}` | Path: `id`, Body: `CategoryDto` | `LessonCategoryDto` |
| 21 | **Remove Category** | DELETE | `/api/Admin/categories/{id}` | Path: `id` | NoContent |
| 22 | **List Lessons** | GET | `/api/Admin/lessons` | Query: `categoryId` | `List<LessonDto>` |
| 23 | **Add Lesson** | POST | `/api/Admin/lessons` | `categoryId`, `filename`, `titleCn`... | `LessonDto` |
| 24 | **Edit Lesson** | PUT | `/api/Admin/lessons/{id}` | Path: `id`, Body: `LessonDto` | `LessonDto` |
| 25 | **Remove Lesson** | DELETE | `/api/Admin/lessons/{id}` | Path: `id` | NoContent |

### 3.2. Quản lý Từ vựng & Nhập dữ liệu lớn
| STT | Tên API | Method | Route | Đầu vào | Đầu ra |
| :-- | :--- | :--- | :--- | :--- | :--- |
| 26 | **List Vocabs** | GET | `/api/Admin/vocabularies` | Query: `lessonId` | `List<VocabularyDto>` |
| 27 | **Add Vocab** | POST | `/api/Admin/vocabularies` | `lessonId`, `word`, `pinyin`, `meaning` | `VocabularyDto` |
| 28 | **Edit Vocab** | PUT | `/api/Admin/vocabularies/{id}` | Path: `id`, Body: `VocabularyDto` | `VocabularyDto` |
| 29 | **Remove Vocab** | DELETE | `/api/Admin/vocabularies/{id}` | Path: `id` | NoContent |
| 30 | **Import Bulk** | POST | `/api/Admin/vocabularies/import` | Form: `excelFile`, `mediaZip`, `categoryId` | `{ "jobId": "guid" }` |
| 31 | **Import Status** | GET | `/api/Admin/vocabularies/import-status/{id}` | Path: `jobId` | `ImportJob` object |

### 3.3. Quản lý chi tiết nội dung (Hanzi, Challenge, Radical)
| STT | Tên API | Method | Route | Mô tả |
| :-- | :--- | :--- | :--- | :--- |
| 32-35 | **Hanzi Card** | G/P/P/D | `/api/Admin/hanzi-cards` | CRUD Thẻ chữ Hán (Character, Stroke, Mnemonic) |
| 36-39 | **Challenge** | G/P/P/D | `/api/Admin/challenge-words`| CRUD Từ vựng thử thách khó |
| 40-43 | **Radical Set** | G/P/P/D | `/api/Admin/radical-sets` | CRUD Nhóm bộ thủ |
| 44-47 | **Radical Det** | G/P/P/D | `/api/Admin/radicals` | CRUD Chi tiết bộ thủ (Radical char, Example) |

### 3.4. Quản lý Đánh giá & Tài liệu
| STT | Tên API | Method | Route | Mô tả |
| :-- | :--- | :--- | :--- | :--- |
| 48-51 | **Quizzes** | G/P/P/D | `/api/Admin/quizzes` | CRUD Câu hỏi trắc nghiệm bài học |
| 52-55 | **Quiz Options**| G/P/P/D | `/api/Admin/quiz-options` | CRUD Đáp án đúng/sai cho câu hỏi |
| 56-59 | **Documents** | G/P/P/D | `/api/Admin/documents` | CRUD Tài liệu PDF Level (DownloadUrl, DocType) |

### 3.5. Hệ thống Báo cáo Admin (Admin Analytics)
| STT | Tên API | Method | Route | Mô tả | Đầu ra |
| :-- | :--- | :--- | :--- | :--- | :--- |
| 60 | **Lesson Summary**| GET | `/api/Admin/dashboard/lessons-summary` | Thống kê số Vocab/Quiz theo bài | `List<VLessonsSummary>` |
| 61 | **Import History**| GET | `/api/Admin/dashboard/import-jobs` | Xem list 50 Job nạp dữ liệu gần nhất | `List<ImportJob>` |

---

## GHI CHÚ QUAN TRỌNG VỀ LUỒNG DỮ LIỆU
1.  **Hàng đợi xử lý (Endpoint 30):** Khi Import Bulk, hệ thống chạy Background Task. Frontend nên dùng Endpoint 31 để polling trạng thái xử lý cho người dùng.
2.  **Định danh tự động:** Tất cả API trong **Luồng Học viên** đều tự động lấy `UserId` từ Access Token. Frontend tuyệt đối không gửi `UserId` lên để đảm bảo tính toàn vẹn dữ liệu.
3.  **Tải Game:** Sử dụng duy nhất **Endpoint 9** để lấy cấu trúc dữ liệu hoàn chỉnh của một bài học, giúp Game Engine sẵn sàng hoạt động ngay lập tức.
