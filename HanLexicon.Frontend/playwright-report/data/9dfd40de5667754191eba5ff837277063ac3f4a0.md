# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Authentication & UX Flow >> should be responsive on mobile
- Location: tests\auth.spec.ts:27:3

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 300
Received:   94.30606079101562
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - link "Tiếng Trung Leyi" [ref=e6] [cursor=pointer]:
        - /url: /
        - img "Tiếng Trung Leyi" [ref=e7]
      - generic [ref=e8]:
        - button "en" [ref=e9]:
          - img
          - generic [ref=e10]: en
        - button [ref=e11]:
          - img
  - main [ref=e12]:
    - generic [ref=e16]:
      - generic [ref=e17]:
        - img "Tiếng Trung Leyi Logo" [ref=e19]
        - generic [ref=e20]:
          - heading "Tiếng Trung Leyi" [level=1] [ref=e21]
          - paragraph [ref=e22]: Chinh phục Hán ngữ mỗi ngày
      - generic [ref=e23]:
        - generic [ref=e24]:
          - generic [ref=e25]: Đăng nhập
          - paragraph [ref=e26]: Vui lòng nhập tài khoản để tiếp tục
        - generic [ref=e27]:
          - generic [ref=e28]:
            - generic [ref=e29]:
              - generic [ref=e30]:
                - text: Tên đăng nhập
                - generic [ref=e31]:
                  - img [ref=e32]
                  - textbox "Username..." [ref=e35]
              - generic [ref=e36]:
                - text: Mật khẩu
                - generic [ref=e37]:
                  - img [ref=e38]
                  - textbox "••••••••" [ref=e41]
            - button "Vào hệ thống" [ref=e43]:
              - text: Vào hệ thống
              - img
          - generic [ref=e44]:
            - paragraph [ref=e45]:
              - text: Chưa có tài khoản?
              - link "Đăng ký ngay" [ref=e46] [cursor=pointer]:
                - /url: /register
            - paragraph [ref=e48]: © 2026 HanLexicon Studio
  - contentinfo [ref=e49]:
    - generic [ref=e50]:
      - generic [ref=e51]:
        - img "Tiếng Trung Leyi" [ref=e53]
        - paragraph [ref=e54]: We are here to help you shorten your HSK conquest path. Inbox us if you are looking for a guide for self-study!
        - generic [ref=e56]:
          - textbox "Enter email for consultation..." [ref=e57]
          - button "Send Now" [ref=e58]
      - generic [ref=e59]:
        - heading "Explore" [level=4] [ref=e60]
        - list [ref=e61]:
          - listitem [ref=e62]:
            - link "Courses" [ref=e63] [cursor=pointer]:
              - /url: /#courses
              - img [ref=e64]
              - text: Courses
          - listitem [ref=e66]:
            - link "Tools" [ref=e67] [cursor=pointer]:
              - /url: /#tools
              - img [ref=e68]
              - text: Tools
          - listitem [ref=e70]:
            - link "Login" [ref=e71] [cursor=pointer]:
              - /url: /login
              - img [ref=e72]
              - text: Login
      - generic [ref=e74]:
        - heading "Support" [level=4] [ref=e75]
        - list [ref=e76]:
          - listitem [ref=e77]:
            - link "Góc hỏi đáp" [ref=e78] [cursor=pointer]:
              - /url: /login
              - img [ref=e79]
              - text: Góc hỏi đáp
          - listitem [ref=e81]:
            - link "Hướng dẫn học" [ref=e82] [cursor=pointer]:
              - /url: /login
              - img [ref=e83]
              - text: Hướng dẫn học
          - listitem [ref=e85]:
            - link "Đội ngũ hỗ trợ" [ref=e86] [cursor=pointer]:
              - /url: /login
              - img [ref=e87]
              - text: Đội ngũ hỗ trợ
      - generic [ref=e89]:
        - heading "Connect Now" [level=4] [ref=e90]
        - list [ref=e91]:
          - listitem [ref=e92]:
            - img [ref=e94]
            - text: leyihsk@gmail.com
          - listitem [ref=e96]:
            - img [ref=e98]
            - text: 0979.393.427
          - listitem [ref=e100]:
            - link "FB" [ref=e101] [cursor=pointer]:
              - /url: "#"
            - link [ref=e102] [cursor=pointer]:
              - /url: "#"
              - img [ref=e103]
    - generic [ref=e106]: © 2026 Hệ thống Tiếng Trung Leyi. Built with Gamification. All rights reserved.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Authentication & UX Flow', () => {
  4  |   test('should login successfully and show correct UI feedback', async ({ page }) => {
  5  |     await page.goto('/login');
  6  | 
  7  |     // Đánh giá UX: Kiểm tra tiêu đề trang rõ ràng
  8  |     // Sử dụng getByText với exact: true để tránh trùng với "Tên đăng nhập"
  9  |     await expect(page.getByText('Đăng nhập', { exact: true })).toBeVisible();
  10 | 
  11 |     await page.fill('input[placeholder="Username..."]', 'Admin');
  12 |     await page.fill('input[placeholder="••••••••"]', 'admin123');
  13 | 
  14 |     // Click và kiểm tra chuyển hướng
  15 |     await page.click('button:has-text("Vào hệ thống")');
  16 |     
  17 |     // Kiểm tra chuyển hướng đến admin
  18 |     await expect(page).toHaveURL(/\/admin/, { timeout: 15000 });
  19 | 
  20 |     // Kiểm tra sự tồn tại của các thành phần Dashboard
  21 |     const dashboardHeading = page.locator('h1').filter({ hasText: 'Dashboard' });
  22 |     await expect(dashboardHeading).toBeVisible();
  23 |     
  24 |     console.log('✅ Login flow & Dashboard UI check passed');
  25 |   });
  26 | 
  27 |   test('should be responsive on mobile', async ({ page }) => {
  28 |     // Giả lập iPhone 13
  29 |     await page.setViewportSize({ width: 390, height: 844 });
  30 |     await page.goto('/login');
  31 | 
  32 |     // Kiểm tra nút login có hiển thị đầy đủ và không bị tràn
  33 |     const loginButton = page.locator('button:has-text("Vào hệ thống")');
  34 |     await expect(loginButton).toBeVisible();
  35 |     
  36 |     // Kiểm tra tính cân đối (UX: Button nên chiếm phần lớn chiều ngang trên mobile)
  37 |     const box = await loginButton.boundingBox();
  38 |     if (box) {
> 39 |       expect(box.width).toBeGreaterThan(300); // Đảm bảo nút đủ lớn để touch
     |                         ^ Error: expect(received).toBeGreaterThan(expected)
  40 |     }
  41 |     
  42 |     console.log('✅ Mobile responsiveness basic check passed');
  43 |   });
  44 | 
  45 |   test('should show validation feedback on empty fields', async ({ page }) => {
  46 |     await page.goto('/login');
  47 |     
  48 |     // Thử submit trống
  49 |     await page.click('button:has-text("Vào hệ thống")');
  50 |     
  51 |     // Kiểm tra HTML5 validation (UX: Browser tự chặn)
  52 |     const usernameInput = page.locator('input[placeholder="Username..."]');
  53 |     const isRequired = await usernameInput.getAttribute('required');
  54 |     expect(isRequired).not.toBeNull();
  55 |     
  56 |     console.log('✅ Form validation UX check passed');
  57 |   });
  58 | });
  59 | 
```