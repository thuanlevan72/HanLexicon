Để rõ ràng hơn, để tôi vẽ sơ đồ mapping từng tính năng → bảng DB, rồi giải thích chiến lược import file.
::view-transition-group(_),
::view-transition-old(_),
::view-transition-new(\*) {
animation-duration: 0.25s;
animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
}
VvisualizeVvisualize show_widgetDưới đây là giải thích chi tiết cho từng phần:

Các bảng cần dùng theo tính năng
Tính năng 1 — Quản lý user: Dùng nguyên users và user_sessions đã có, không cần thêm gì.
Tính năng 2 — Tra từ: Đây là tính năng cần thay đổi nhiều nhất. Bảng vocabularies hiện tại chỉ có example_cn/py/vn, cần ALTER để thêm 3 cột: meaning_en TEXT, image_url TEXT, audio_url TEXT. Ngoài ra cần tạo thêm 2 bảng mới: media_files (quản lý file vật lý) và word_meanings (để lưu nghĩa đa ngôn ngữ linh hoạt hơn nếu sau này cần thêm ngôn ngữ).
Tính năng 3 — Lịch sử học: Bảng user_progress đã có đủ cho tiến độ game. Chỉ cần tạo thêm search_history để lưu lịch sử tra từ.
Tính năng 4 — Import Excel: Cần bảng import_jobs để track trạng thái job, data ghi vào lessons + vocabularies + media_files.

Schema cho 3 bảng mới + 1 ALTER
sql-- ALTER bảng vocabularies hiện có
ALTER TABLE vocabularies
ADD COLUMN meaning_en TEXT,
ADD COLUMN image_url TEXT, -- URL trỏ tới S3/CDN
ADD COLUMN audio_url TEXT; -- URL file mp3

-- Bảng lưu metadata file vật lý (ảnh + mp3)
CREATE TABLE media_files (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
owner_type VARCHAR(30) NOT NULL, -- 'vocabulary', 'hanzi', 'lesson'
owner_id UUID NOT NULL,
media_type VARCHAR(10) NOT NULL CHECK (media_type IN ('image','audio')),
file_name VARCHAR(255) NOT NULL, -- tên file gốc từ Excel
storage_key TEXT NOT NULL, -- path trên S3: 'vocab/hsk1/ni_hao.jpg'
cdn_url TEXT NOT NULL, -- URL public để frontend dùng
mime_type VARCHAR(50), -- 'image/jpeg', 'audio/mpeg'
file_size_kb INTEGER,
uploaded_by UUID REFERENCES users(id),
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_media_owner ON media_files(owner_type, owner_id);

-- Bảng lịch sử tra từ
CREATE TABLE search_history (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
query VARCHAR(200) NOT NULL, -- từ người dùng tìm
vocab_id UUID REFERENCES vocabularies(id), -- từ tìm thấy (nullable)
searched_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_search_user ON search_history(user_id, searched_at DESC);

-- Bảng quản lý job import Excel
CREATE TABLE import_jobs (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
uploaded_by UUID NOT NULL REFERENCES users(id),
file_name VARCHAR(255) NOT NULL,
status VARCHAR(20) NOT NULL DEFAULT 'pending'
CHECK (status IN ('pending','processing','done','failed')),
total_rows INTEGER NOT NULL DEFAULT 0,
processed_rows INTEGER NOT NULL DEFAULT 0,
failed_rows INTEGER NOT NULL DEFAULT 0,
error_log JSONB, -- [{row:3, error:"thiếu pinyin"}, ...]
category_id SMALLINT REFERENCES lesson_categories(id),
started_at TIMESTAMPTZ,
finished_at TIMESTAMPTZ,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

Chiến lược Import Excel có ảnh + MP3
Đây là phần phức tạp nhất. Có 2 cách người dùng gửi file lên — bạn nên chọn cách 2 vì nó thực tế hơn:
Cách 1 — ZIP chứa tất cả: Người dùng nén data.xlsx + folder images/ + folder audio/ thành một file .zip, upload lên một lần. Backend giải nén, đọc Excel, map tên file → upload từng media lên S3.
Cách 2 (khuyến nghị) — Upload riêng 3 bước:
Bước 1: POST /api/import/upload-excel → trả về import_job_id + danh sách hàng preview
Bước 2: POST /api/import/upload-media → upload ảnh/mp3 theo batch, map vào job
Bước 3: POST /api/import/{job_id}/run → xác nhận, chạy background job ghi vào DB
Format Excel chuẩn để backend đọc được:
wordpinyinmeaning_vnmeaning_enlevelimage_fileaudio_file你好nǐ hǎoXin chàoHellohsk1ni_hao.jpgni_hao.mp3谢谢xièxieCảm ơnThank youhsk1xiexie.pngxiexie.mp3
Flow xử lý trong .NET backend:
csharp// 1. Đọc Excel bằng ClosedXML hoặc EPPlus
using var workbook = new XLWorkbook(stream);
var ws = workbook.Worksheet(1);

// 2. Với mỗi hàng → upsert vocabulary
foreach (var row in ws.RowsUsed().Skip(1))
{
var word = row.Cell(1).GetString();
var imageFile = row.Cell(6).GetString(); // "ni_hao.jpg"
var audioFile = row.Cell(7).GetString(); // "ni_hao.mp3"

    // 3. Upload media lên S3 nếu file tồn tại trong batch đã upload
    string? imageUrl = null;
    if (!string.IsNullOrEmpty(imageFile) && uploadedFiles.ContainsKey(imageFile))
    {
        var s3Key  = $"vocab/{level}/{Guid.NewGuid()}/{imageFile}";
        await s3Client.PutObjectAsync(bucket, s3Key, uploadedFiles[imageFile]);
        imageUrl = $"https://cdn.yourdomain.com/{s3Key}";

        // Ghi vào media_files
        db.MediaFiles.Add(new MediaFile {
            OwnerType  = "vocabulary",
            OwnerId    = vocabId,
            MediaType  = "image",
            FileName   = imageFile,
            StorageKey = s3Key,
            CdnUrl     = imageUrl,
        });
    }

    // 4. Ghi vocabulary với URL đã có
    db.Vocabularies.Add(new Vocabulary {
        Word      = word,
        ImageUrl  = imageUrl,
        AudioUrl  = audioUrl,
        ...
    });

}

// 5. Cập nhật import_job status = 'done'
job.Status = "done";
job.FinishedAt = DateTime.UtcNow;
await db.SaveChangesAsync();
Lưu ý quan trọng về storage: Đừng lưu file binary vào PostgreSQL — BYTEA cho ảnh/mp3 sẽ làm DB phình to nhanh chóng và query chậm. Luôn lưu vào S3-compatible storage (AWS S3, MinIO tự host, Cloudflare R2) và chỉ lưu URL vào DB. MinIO là lựa chọn tốt nếu muốn tự host, hoàn toàn tương thích API S3.
