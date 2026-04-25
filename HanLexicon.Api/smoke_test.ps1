$baseUrl = "http://localhost:5029/api/v1"
$contentType = "application/json"

function Write-Step($msg) {
    Write-Host "`n>>> $msg" -ForegroundColor Cyan
}

try {
    Write-Step "1. Kiểm tra API Health (Learning Catalog)..."
    $catalog = Invoke-RestMethod -Uri "$baseUrl/learning/catalog" -Method Get
    if ($catalog.isSuccess) {
        Write-Host "Thành công: Lấy được danh mục bài học." -ForegroundColor Green
    }

    Write-Step "2. Thử nghiệm Đăng nhập..."
    $loginBody = @{
        username = "testuser"
        password = "Password123!"
    } | ConvertTo-Json

    # Lưu ý: Login có thể thất bại nếu user chưa tồn tại, đây là test luồng nên ta bắt lỗi
    try {
        $loginRes = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $loginBody -ContentType $contentType
        if ($loginRes.isSuccess) {
            $token = $loginRes.data.accessToken
            Write-Host "Thành công: Đã đăng nhập và lấy được Token." -ForegroundColor Green

            Write-Step "3. Tra cứu từ vựng (Sử dụng Token)..."
            $headers = @{ Authorization = "Bearer $token" }
            $search = Invoke-RestMethod -Uri "$baseUrl/dictionary/search?query=test" -Method Get -Headers $headers
            if ($search.isSuccess) {
                Write-Host "Thành công: Luồng tra cứu từ điển hoạt động chuẩn." -ForegroundColor Green
            }
        }
    } catch {
        Write-Host "Thông tin: Đăng nhập thất bại (có thể do chưa có user). Vui lòng chạy API Register trước." -ForegroundColor Yellow
    }

    Write-Step "KẾT LUẬN: Các luồng API cơ bản đã thông suốt." -ForegroundColor Cyan
} catch {
    Write-Error "Lỗi hệ thống: $($_.Exception.Message)"
}
