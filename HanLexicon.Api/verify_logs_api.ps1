$url = "https://localhost:7285/api/v1/admin/logs"
# Tắt kiểm tra chứng chỉ SSL cho môi trường dev
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}

try {
    # Giả sử cần token admin, nhưng ta thử gọi để xem cấu trúc lỗi hoặc data nếu không có auth (hoặc auth bypass trong dev)
    # Thực tế nên dùng một token hợp lệ
    $response = Invoke-RestMethod -Uri $url -Method Get -ErrorAction Stop
    Write-Host "API Status: SUCCESS"
    $response.data.items | Select-Object -First 1 | ConvertTo-Json
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "API Status: 401 Unauthorized (Expected if no token)"
    } else {
        Write-Host "API Status: ERROR"
        Write-Host $_.Exception.Message
    }
}
