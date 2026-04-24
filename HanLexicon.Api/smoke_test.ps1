$rand = Get-Random -Minimum 1000 -Maximum 9999
$baseUrl = "http://localhost:8080"
$username = "admin_$rand"
$email = "admin_$rand@test.com"
$slug = "hsk-1-$rand"

write-host "--- SMOKE TEST RUN (ID: $rand) ---"

write-host "1. Registering user ($username)..."
$regBody = @{
    username = $username
    password = "Password123!"
    confirmPassword = "Password123!"
    displayName = "Test Admin $rand"
    email = $email
} | ConvertTo-Json
$regRes = Invoke-RestMethod -Uri "$baseUrl/api/Auth/register" -Method Post -Body $regBody -ContentType "application/json"
write-host "Registration success: $($regRes.message)"

write-host "2. Making user Admin in DB..."
docker exec hanlexiconapi-db-1 psql -U user -d hanlexicon -c "UPDATE user_roles SET role_id = 1 WHERE user_id = (SELECT id FROM users WHERE username = '$username');"

write-host "3. Logging in..."
$loginBody = @{
    email = $email
    userName = $username
    password = "Password123!"
    ipAddress = "127.0.0.1"
} | ConvertTo-Json
$loginRes = Invoke-RestMethod -Uri "$baseUrl/api/Auth/login" -Method Post -Body $loginBody -ContentType "application/json"
$token = $loginRes.accessToken
$userId = $loginRes.userId
write-host "Login success. Token obtained for UserID: $userId"

$headers = @{
    Authorization = "Bearer $token"
}

write-host "4. Creating Lesson Category ($slug)..."
$catBody = @{
    name = "HSK 1 - $rand"
    slug = $slug
    sortOrder = 1
} | ConvertTo-Json
$catRes = Invoke-RestMethod -Uri "$baseUrl/api/Admin/categories" -Method Post -Body $catBody -ContentType "application/json" -Headers $headers
$catId = $catRes.id
write-host "Category created with ID: $catId"

write-host "5. Creating Lesson..."
$lessonBody = @{
    categoryId = $catId
    lessonNumber = 1
    filename = "lesson_$rand"
    titleCn = "你好"
    titleVn = "Chào bạn"
    icon = "hello.png"
    isPublished = $true
    sortOrder = 1
} | ConvertTo-Json
$lessonRes = Invoke-RestMethod -Uri "$baseUrl/api/Admin/lessons" -Method Post -Body $lessonBody -ContentType "application/json" -Headers $headers
$lessonId = $lessonRes.id
write-host "Lesson created with ID: $lessonId"

write-host "6. Getting Lessons (Public API)..."
$lessonsRes = Invoke-RestMethod -Uri "$baseUrl/Lessons/GetLessons" -Method Get -Headers $headers
write-host "Found $($lessonsRes.Count) categories."

write-host "7. Saving Progress..."
$progBody = @{
    lessonId = $lessonId
    score = 100
    completed = $true
    timeSpentS = 120
} | ConvertTo-Json
$progRes = Invoke-RestMethod -Uri "$baseUrl/Lessons/SaveProgress" -Method Post -Body $progBody -ContentType "application/json" -Headers $headers
write-host "Progress saved: $($progRes.success)"

write-host "8. Checking User Stats..."
$statsRes = Invoke-RestMethod -Uri "$baseUrl/api/User/stats" -Method Get -Headers $headers
write-host "User Stats - Avg Score: $($statsRes.avgScore), Lessons: $($statsRes.lessonsCompleted)"

write-host "--- TEST FLOW COMPLETED SUCCESSFULLY! ---"
