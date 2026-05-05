# Test script for Media Folder and File management

[System.Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}

$baseUrl = "http://localhost:7285/api/v1"
$loginUrl = "$baseUrl/auth/login"
$mediaUrl = "$baseUrl/media"
$folderUrl = "$baseUrl/media/folders"

# 1. Login
Write-Host "--- 1. Logging in ---"
$loginBody = @{
    userName = "Admin"
    password = "admin123"
    ipAddress = "127.0.0.1"
} | ConvertTo-Json

try {
    $loginRes = Invoke-RestMethod -Uri $loginUrl -Method Post -Body $loginBody -ContentType "application/json"
    $token = $loginRes.data.accessToken
    Write-Host "Login successful. Token acquired: $token"
} catch {
    Write-Host "Login failed: $_"
    exit
}

$headers = @{
    "Authorization" = "Bearer $token"
}

# 2. Create a new folder
$folderName = "test-folder-" + (Get-Date -Format "yyyyMMdd-HHmmss")
Write-Host "`n--- 2. Creating folder: $folderName ---"
$folderBody = @{
    name = $folderName
    description = "Integration test folder"
} | ConvertTo-Json

try {
    $folderRes = Invoke-RestMethod -Uri $folderUrl -Method Post -Body $folderBody -ContentType "application/json" -Headers $headers
    Write-Host "Folder created successfully. ID: $($folderRes.data)"
} catch {
    Write-Host "Failed to create folder: $_"
}

# 3. List folders to verify
Write-Host "`n--- 3. Verifying folder in list ---"
try {
    $listRes = Invoke-RestMethod -Uri $mediaUrl -Method Get -Headers $headers
    if ($listRes.data.folders -contains $folderName) {
        Write-Host "Success: Folder found in folders list."
    } else {
        Write-Host "Failure: Folder not found in folders list."
        Write-Host "Current folders: $($listRes.data.folders -join ', ')"
    }
} catch {
    Write-Host "Failed to list media: $_"
}

# 4. Upload a file to the new folder
Write-Host "`n--- 4. Uploading file to folder: $folderName ---"
$tempFile = [System.IO.Path]::GetTempFileName()
"This is a test file content" | Out-File -FilePath $tempFile -Encoding utf8
$uploadUrl = "$mediaUrl/upload-batch?folder=$folderName"

try {
    # Using curl for multipart upload as it's easier in PS than Invoke-RestMethod for files
    $curlCmd = "curl -X POST `"$uploadUrl`" -H `"Authorization: Bearer $token`" -F `"files=@$tempFile;filename=test-file.txt`" -s"
    $uploadResRaw = iex $curlCmd
    $uploadRes = $uploadResRaw | ConvertFrom-Json
    
    if ($uploadRes.isSuccess) {
        $fileId = $uploadRes.data.files[0].id
        Write-Host "File uploaded successfully. ID: $fileId"
    } else {
        Write-Host "Upload failed: $($uploadRes.message)"
    }
} catch {
    Write-Host "Failed to upload file: $_"
} finally {
    Remove-Item $tempFile
}

# 5. Verify file in the folder
Write-Host "`n--- 5. Verifying file in folder ---"
try {
    $queryUrl = $mediaUrl + "?folder=" + $folderName
    Write-Host "Query URL: $queryUrl"
    $verifyRes = Invoke-RestMethod -Uri $queryUrl -Method Get -Headers $headers
    $found = $verifyRes.data.items | Where-Object { $_.id -eq $fileId }
    
    if ($found) {
        Write-Host "Success: File found in the folder."
        Write-Host "File name: $($found.fileName)"
        Write-Host "CDN URL: $($found.cdnUrl)"
    } else {
        Write-Host "Failure: File not found in the folder."
    }
} catch {
    Write-Host "Failed to verify file: $_"
}

# 6. Delete the file
Write-Host "`n--- 6. Deleting file ---"
if ($fileId) {
    try {
        $deleteRes = Invoke-RestMethod -Uri "$mediaUrl/$fileId" -Method Delete -Headers $headers
        if ($deleteRes.isSuccess) {
            Write-Host "File deleted successfully."
        } else {
            Write-Host "Failed to delete file: $($deleteRes.message)"
        }
    } catch {
        Write-Host "Error deleting file: $_"
    }
}

Write-Host "`n--- Test Complete ---"
