import { test, expect } from '@playwright/test';

test.describe('Authentication & UX Flow', () => {
  test('should login successfully and show correct UI feedback', async ({ page }) => {
    await page.goto('/login');

    // Đánh giá UX: Kiểm tra tiêu đề trang rõ ràng
    // Sử dụng getByText với exact: true để tránh trùng với "Tên đăng nhập"
    await expect(page.getByText('Đăng nhập', { exact: true })).toBeVisible();

    await page.fill('input[placeholder="Username..."]', 'Admin');
    await page.fill('input[placeholder="••••••••"]', 'admin123');

    // Click và kiểm tra chuyển hướng
    await page.click('button:has-text("Vào hệ thống")');
    
    // Kiểm tra chuyển hướng đến admin
    await expect(page).toHaveURL(/\/admin/, { timeout: 15000 });

    // Kiểm tra sự tồn tại của các thành phần Dashboard
    const dashboardHeading = page.locator('h1').filter({ hasText: 'Dashboard' });
    await expect(dashboardHeading).toBeVisible();
    
    console.log('✅ Login flow & Dashboard UI check passed');
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Giả lập iPhone 13
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/login');

    // Kiểm tra nút login có hiển thị đầy đủ và không bị tràn
    const loginButton = page.locator('button:has-text("Vào hệ thống")');
    await expect(loginButton).toBeVisible();
    
    // Kiểm tra tính cân đối (UX: Button nên chiếm phần lớn chiều ngang trên mobile)
    const box = await loginButton.boundingBox();
    if (box) {
      expect(box.width).toBeGreaterThan(300); // Đảm bảo nút đủ lớn để touch
    }
    
    console.log('✅ Mobile responsiveness basic check passed');
  });

  test('should show validation feedback on empty fields', async ({ page }) => {
    await page.goto('/login');
    
    // Thử submit trống
    await page.click('button:has-text("Vào hệ thống")');
    
    // Kiểm tra HTML5 validation (UX: Browser tự chặn)
    const usernameInput = page.locator('input[placeholder="Username..."]');
    const isRequired = await usernameInput.getAttribute('required');
    expect(isRequired).not.toBeNull();
    
    console.log('✅ Form validation UX check passed');
  });
});
