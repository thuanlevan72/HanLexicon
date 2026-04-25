# CHI TIẾT ĐẶC TẢ KỸ THUẬT API HANLEXICON (V1.2)

Tài liệu này dành cho Frontend Developer. Vui lòng tuân thủ nghiêm ngặt các kiểu dữ liệu và cấu trúc phản hồi bên dưới.

## 1. QUY CHUẨN KỸ THUẬT (TECHNICAL STANDARDS)

*   **Base URL**: `http://localhost:5029/api/v1`
*   **Authentication**: `Authorization: Bearer <Access_Token>`
*   **Kiểu ID**: Toàn bộ ID sử dụng `Guid` (UUID v4), định dạng chuỗi: `3fa85f64-5717-4562-b3fc-2c963f66afa6`.
*   **Định dạng thời gian**: ISO 8601 (`YYYY-MM-DDTHH:mm:ssZ`).
*   **Cấu trúc Wrapper (Bắt buộc)**:
    ```json
    {
      "isSuccess": true,
      "statusCode": 200,
      "message": "Thông báo thành công/thất bại",
      "data": {}, // Hoặc []
      "errors": [] // Chứa danh sách string thông báo lỗi
    }
    ```

---

## 2. MODULE XÁC THỰC (AUTH)

### 2.1. Đăng ký ([POST] `/auth/register`)
*   **Body**:
    ```json
    {
      "username": "thuan123",
      "password": "Password123!",
      "confirmPassword": "Password123!",
      "displayName": "Thanh Thuận",
      "email": "thuan@example.com"
    }
    ```
*   **Lỗi thường gặp (400)**: `Username already exists`, `Passwords do not match`.

### 2.2. Đăng nhập ([POST] `/auth/login`)
*   **Body**:
    ```json
    {
      "userName": "thuan123",
      "password": "Password123!",
      "ipAddress": "127.0.0.1"
    }
    ```
*   **Response `data`**:
    ```json
    {
      "accessToken": "eyJhbG...",
      "refreshToken": "rf_...",
      "userId": "guid",
      "userName": "thuan123"
    }
    ```

---

## 3. MODULE NỘI DUNG (CONTENT)

### 3.1. Lấy danh mục bài học ([GET] `/learning/catalog`)
*   **Mô tả**: Trả về danh sách Level và các Lesson bên trong.
*   **Response `data`**:
    ```json
    [
      {
        "id": 1,
        "name": "HSK 1",
        "slug": "hsk-1",
        "lessons": [
          {
            "id": "guid",
            "titleVn": "Chào hỏi",
            "titleCn": "你好",
            "icon": "👋",
            "lessonNumber": 1
          }
        ]
      }
    ]
    ```

### 3.2. Lấy từ vựng bài học ([GET] `/learning/lessons/{id}/vocabularies`)
*   **Response `data`**: Danh sách Object `Vocabulary` (Xem cấu trúc ở module Tra từ).

---

## 4. MODULE TRA CỨU (DICTIONARY)

### 4.1. Tìm kiếm ([GET] `/dictionary/search?query=...`)
*   **Response `data`**:
    ```json
    [
      {
        "id": "guid",
        "word": "你好",
        "pinyin": "nǐ hǎo",
        "meaning": "Xin chào",
        "meaningEn": "Hello",
        "audioUrl": "http://localhost:9000/media/hello.mp3",
        "imageUrl": "http://localhost:9000/media/hello.png",
        "exampleCn": "你好吗？",
        "examplePy": "Nǐ hǎo ma?",
        "exampleVn": "Bạn khỏe không?",
        "lessonTitle": "Chào hỏi"
      }
    ]
    ```

---

## 5. MODULE TIẾN ĐỘ (STUDY PROGRESS)

### 5.1. Lưu điểm bài học ([POST] `/study-progress/lessons`)
*   **Body**:
    ```json
    {
      "lessonId": "guid",
      "score": 100,
      "timeSpentS": 120,
      "completed": true
    }
    ```

### 5.2. Đánh dấu từ vựng ([POST] `/study-progress/vocabularies`)
*   **Body**:
    ```json
    {
      "vocabId": "guid",
      "status": "mastered" // "learning", "mastered", "review"
    }
    ```

---

## 6. MODULE MEDIA (MEDIA MANAGER)

### 6.1. Upload Batch ([POST] `/media/upload-batch`)
*   **Content-Type**: `multipart/form-data`
*   **Query Param**: `folder` (vd: `avatars`)
*   **Body**: `files` (Danh sách file binary)
*   **Response `data`**:
    ```json
    {
      "total": 2,
      "files": [
        {
          "originalName": "anh1.jpg",
          "url": "http://localhost:9000/media/guid_avatars/anh1.jpg"
        }
      ]
    }
    ```

---

## 7. MODULE QUẢN TRỊ (ADMIN)

### 7.1. Import Excel ([POST] `/admin/vocabularies/import`)
*   **Cơ chế**: Import Text + URL.
*   **Body (Form-data)**: `excelFile` (.xlsx)
*   **Excel Format (10 cột)**:
    1.Word, 2.Pinyin, 3.Meaning, 4.ImageUrl, 5.AudioUrl, 6.LessonId, 7.MeaningEn, 8.ExampleCn, 9.ExamplePy, 10.ExampleVn.
