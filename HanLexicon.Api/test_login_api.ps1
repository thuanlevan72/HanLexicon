# Tắt kiểm tra chứng chỉ SSL (cho môi trường dev)
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}

$url = "https://localhost:7285/api/v1/auth/login"
$body = @{
    userName = "admin"
    password = "admin123"
    ipAddress = "127.0.0.1"
} | ConvertTo-Json

Write-Host "--- TESTING LOGIN API ---"
Write-Host "URL: $url"
Write-Host "Payload: $body"

try {
    $response = Invoke-RestMethod -Uri $url -Method Post -Body $body -ContentType "application/json" -ErrorAction Stop
    Write-Host "`nResult: SUCCESS"
    $response | ConvertTo-Json
} catch {
    Write-Host "`nResult: FAILED"
    Write-Host "StatusCode: $($_.Exception.Response.StatusCode.value__)"
    $errBody = Get-Content -Raw -Path ( [IO.Path]::GetTempFileName() ) # Placeholder
    # Đọc body lỗi nếu có
    try {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $errBody = $reader.ReadToEnd()
        Write-Host "Response Body: $errBody"
    } catch {}
}
