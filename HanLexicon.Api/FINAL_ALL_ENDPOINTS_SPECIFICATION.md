# TÀI LIỆU CHI TIẾT 61 ENDPOINT HỆ THỐNG HANLEXICON

| STT | Tên API | Method | Route | Mô tả | Đầu vào (Parameters/Body) | Đầu ra (200 OK) |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Login** | POST | `/api/Auth/login` | Đăng nhập hệ thống | `email`, `userName`, `password`, `ipAddress` | `AuthResultDto` (Token, UserId) |
| **2** | **Refresh Token** | POST | `/api/Auth/refresh_token` | Cấp lại Access Token | `refreshToken` (String) | `AuthResultDto` mới |
| **3** | **Register** | POST | `/api/Auth/register` | Đăng ký tài khoản học viên | `username`, `password`, `confirmPassword`, `displayName`, `email` | `{ "message": "..." }` |
| **4** | **Logout** | POST | `/api/Auth/logout` | Thoát thiết bị hiện tại | `clientRefreshToken` (String) | `{ "message": "..." }` |
| **5** | **Logout All** | POST | `/api/Auth/logout-all` | Thoát tất cả các thiết bị | None | `{ "message": "..." }` |
| **6** | **Upload File** | POST | `/api/api/Files/upload` | Upload Media (Ảnh/Audio) | `file` (FormFile), `ownerType`, `ownerId` | `{ "id", "cdnUrl", "fileName" }` |
| **7** | **Get Lessons** | GET | `/Lessons/GetLessons` | Cấu trúc Danh mục & Bài học | None | `List<GameCategoryResponseDto>` |
| **8** | **Get Detail** | GET | `/Lessons/{id}` | Full data nạp vào Game | `id` (Guid - Path) | `LessonFullDetailDto` |
| **9** | **Get Vocabs** | GET | `/Lessons/{id}/vocabularies` | Từ vựng cho mini-game | `id` (Guid - Path) | `List<VocabularyItemDto>` |
| **10** | **Get Docs** | GET | `/Lessons/documents` | Tài liệu học tập | `categoryId` (Short - Query) | `List<DocumentCategoryResponseDto>` |
| **11** | **Save Progress**| POST | `/Lessons/SaveProgress` | Lưu điểm & thời gian học | `lessonId`, `score`, `completed`, `timeSpentS` | `{ "success": true }` |
| **12** | **User Stats** | GET | `/api/User/stats` | Thống kê Dashboard học viên | None (Lấy từ Token) | `VUserStat` (Point, AvgScore...) |
| **13** | **Word Progress**| GET | `/api/User/word-progress` | Các từ vựng đang học | None (Lấy từ Token) | `List<UserWordProgress>` |
| **14** | **Search Vocab** | GET | `/api/Vocabularies/search` | Tìm từ + Log lịch sử | `query` (String) | `List<Vocabulary>` |
| **15** | **Update Word** | POST | `/api/Vocabularies/UpdateProgress`| Cập nhật mức độ thuộc từ | `vocabId`, `status` (Mastered/...) | `{ "success": true }` |
| **16** | **Admin Cats** | GET | `/api/Admin/categories` | Lấy list danh mục (Admin) | None | `List<LessonCategoryDto>` |
| **17** | **Create Cat** | POST | `/api/Admin/categories` | Tạo mới danh mục | `name`, `slug`, `sortOrder` | `LessonCategoryDto` |
| **18** | **Update Cat** | PUT | `/api/Admin/categories/{id}` | Sửa danh mục | `id` (Path), `Body CategoryDto` | `LessonCategoryDto` |
| **19** | **Delete Cat** | DELETE | `/api/Admin/categories/{id}` | Xóa danh mục | `id` (Short - Path) | NoContent |
| **20** | **Admin Lessons**| GET | `/api/Admin/lessons` | Lấy list bài học (Admin) | `categoryId` (Query - Optional) | `List<LessonDto>` |
| **21** | **Create Lesson**| POST | `/api/Admin/lessons` | Tạo mới bài học | `categoryId`, `filename`, `titleCn`... | `LessonDto` |
| **22** | **Update Lesson**| PUT | `/api/Admin/lessons/{id}` | Sửa bài học | `id` (Path), `Body LessonDto` | `LessonDto` |
| **23** | **Delete Lesson**| DELETE | `/api/Admin/lessons/{id}` | Xóa bài học | `id` (Guid - Path) | NoContent |
| **24** | **Admin Vocabs** | GET | `/api/Admin/vocabularies` | Lấy list từ vựng (Admin) | `lessonId` (Query - Optional) | `List<VocabularyDto>` |
| **25** | **Create Vocab** | POST | `/api/Admin/vocabularies` | Tạo mới từ vựng | `lessonId`, `word`, `pinyin`... | `VocabularyDto` |
| **26** | **Update Vocab** | PUT | `/api/Admin/vocabularies/{id}` | Sửa từ vựng | `id` (Path), `Body VocabularyDto` | `VocabularyDto` |
| **27** | **Delete Vocab** | DELETE | `/api/Admin/vocabularies/{id}` | Xóa từ vựng | `id` (Guid - Path) | NoContent |
| **28** | **Import Vocab** | POST | `/api/Admin/vocabularies/import` | Nạp Excel + Zip Media | `excelFile`, `mediaZip`, `categoryId` | `{ "jobId": "guid" }` |
| **29** | **Import Status**| GET | `/api/Admin/vocabularies/import-status/{jobId}` | Xem tiến độ Import | `jobId` (Guid - Path) | `ImportJob` object |
| **30** | **Get Hanzis** | GET | `/api/Admin/hanzi-cards` | Lấy thẻ chữ Hán | `lessonId` (Guid - Query) | `List<HanziCardDto>` |
| **31** | **Create Hanzi** | POST | `/api/Admin/hanzi-cards` | Tạo thẻ chữ Hán | `lessonId`, `character`, `pinyin`... | `HanziCardDto` |
| **32** | **Update Hanzi** | PUT | `/api/Admin/hanzi-cards/{id}` | Sửa thẻ chữ Hán | `id` (Path), `Body HanziCardDto` | `HanziCardDto` |
| **33** | **Delete Hanzi** | DELETE | `/api/Admin/hanzi-cards/{id}` | Xóa thẻ chữ Hán | `id` (Guid - Path) | NoContent |
| **34** | **Get Challenges**| GET | `/api/Admin/challenge-words` | Lấy từ vựng thử thách | `lessonId` (Guid - Query) | `List<ChallengeWordDto>` |
| **35** | **Create Chal** | POST | `/api/Admin/challenge-words` | Tạo từ vựng thử thách | `lessonId`, `word`, `pinyin`... | `ChallengeWordDto` |
| **36** | **Update Chal** | PUT | `/api/Admin/challenge-words/{id}` | Sửa từ vựng thử thách | `id` (Path), `Body ChallengeWordDto` | `ChallengeWordDto` |
| **37** | **Delete Chal** | DELETE | `/api/Admin/challenge-words/{id}` | Xóa từ vựng thử thách | `id` (Guid - Path) | NoContent |
| **38** | **Get RadSets** | GET | `/api/Admin/radical-sets` | Lấy danh sách bộ thủ | `lessonId` (Query - Optional) | `List<RadicalSetDto>` |
| **39** | **Create RadSet**| POST | `/api/Admin/radical-sets` | Tạo bộ thủ (Set) | `lessonId`, `title`, `icon`, `setNumber` | `RadicalSetDto` |
| **40** | **Update RadSet**| PUT | `/api/Admin/radical-sets/{id}` | Sửa bộ thủ (Set) | `id` (Path), `Body RadicalSetDto` | `RadicalSetDto` |
| **41** | **Delete RadSet**| DELETE | `/api/Admin/radical-sets/{id}` | Xóa bộ thủ (Set) | `id` (Guid - Path) | NoContent |
| **42** | **Get Radicals** | GET | `/api/Admin/radicals` | Lấy chi tiết bộ thủ | `setId` (Guid - Query) | `List<RadicalDto>` |
| **43** | **Create Rad** | POST | `/api/Admin/radicals` | Tạo bộ thủ chi tiết | `setId`, `radical`, `name`, `meaning` | `RadicalDto` |
| **44** | **Update Rad** | PUT | `/api/Admin/radicals/{id}` | Sửa bộ thủ chi tiết | `id` (Path), `Body RadicalDto` | `RadicalDto` |
| **45** | **Delete Rad** | DELETE | `/api/Admin/radicals/{id}` | Xóa bộ thủ chi tiết | `id` (Guid - Path) | NoContent |
| **46** | **Get Quizzes** | GET | `/api/Admin/quizzes` | Lấy list câu hỏi | `lessonId` (Guid - Query) | `List<QuizQuestionDto>` |
| **47** | **Create Quiz** | POST | `/api/Admin/quizzes` | Tạo câu hỏi trắc nghiệm | `lessonId`, `question`, `explanation` | `QuizQuestionDto` |
| **48** | **Update Quiz** | PUT | `/api/Admin/quizzes/{id}` | Sửa câu hỏi | `id` (Path), `Body QuizQuestionDto` | `QuizQuestionDto` |
| **49** | **Delete Quiz** | DELETE | `/api/Admin/quizzes/{id}` | Xóa câu hỏi | `id` (Guid - Path) | NoContent |
| **50** | **Get Options** | GET | `/api/Admin/quiz-options` | Lấy list đáp án | `questionId` (Guid - Query) | `List<QuizOptionDto>` |
| **51** | **Create Opt** | POST | `/api/Admin/quiz-options` | Tạo đáp án trắc nghiệm | `questionId`, `optionText`, `isCorrect` | `QuizOptionDto` |
| **52** | **Update Opt** | PUT | `/api/Admin/quiz-options/{id}` | Sửa đáp án | `id` (Path), `Body QuizOptionDto` | `QuizOptionDto` |
| **53** | **Delete Opt** | DELETE | `/api/Admin/quiz-options/{id}` | Xóa đáp án | `id` (Guid - Path) | NoContent |
| **54** | **Get AdminDocs**| GET | `/api/Admin/documents-admin` | List tài liệu quản trị | `categoryId` (Query - Optional) | `List<AdminDocumentDto>` |
| **55** | **Create Doc** | POST | `/api/Admin/documents` | Tạo mới tài liệu | `categoryId`, `title`, `downloadUrl` | `AdminDocumentDto` |
| **56** | **Update Doc** | PUT | `/api/Admin/documents/{id}` | Sửa tài liệu | `id` (Path), `Body AdminDocumentDto` | `AdminDocumentDto` |
| **57** | **Delete Doc** | DELETE | `/api/Admin/documents/{id}` | Xóa tài liệu | `id` (Guid - Path) | NoContent |
| **58** | **Lesson Sum** | GET | `/api/Admin/dashboard/lessons-summary` | Thống kê Vocab/Quiz | None | `List<VLessonsSummary>` |
| **59** | **Import Jobs** | GET | `/api/Admin/dashboard/import-jobs` | Xem list Job nạp dữ liệu | None | `List<ImportJob>` (Take 50) |
| **60** | **Test Data** | GET | `/WeatherForecast/GetTestData` | Debug Lessons | None | Full Json DB Tree |
| **61** | **Weather** | GET | `/WeatherForecast` | Thời tiết mẫu | None | `WeatherForecast[]` |

---
**Ghi chú bổ sung:**
*   **Authorization**: Các STT 4, 5, 6, 11, 12, 13, 14, 15 yêu cầu `Bearer Token` của User.
*   **Admin Permission**: Các STT từ 16 đến 59 yêu cầu `Bearer Token` có Role `Admin`.
*   **Body JSON**: Tất cả Body đều tuân thủ cấu trúc của các lớp `Command` hoặc `Dto` tương ứng trong project `HanLexicon.Application`.
