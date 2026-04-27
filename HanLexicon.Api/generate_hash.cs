using BCrypt.Net;
using System;

// Script này tạo ra mã băm tương thích 100% với AuthService hiện tại
string password = "admin123";
string enhancedHash = BCrypt.Net.BCrypt.EnhancedHashPassword(password, 13);
Console.WriteLine("--- NEW HASH FOR admin123 ---");
Console.WriteLine(enhancedHash);
Console.WriteLine("--- SQL COMMAND ---");
Console.WriteLine($"UPDATE users SET password_hash = '{enhancedHash}' WHERE username = 'admin';");
