const fs = require('fs');
const path = require('path');

const replacers = [
  { f: 'src/services/apiClient.ts', rules: [
    ['// Create a configured axios instance', '// Tạo một instance axios đã được cấu hình'],
    ['// Request Interceptor: Attach Auth Token', '// Request Interceptor: Đính kèm Auth Token vào các Request'],
    ['// Attempt to get token from storage securely', '// Thử lấy token từ bộ nhớ Storage một cách an toàn'],
    ['// If token exists and headers exist, attach it safely', '// Nếu có token và header, gài token vào header để xác thực'],
    ['// Response Interceptor: Handle Global Errors (e.g., 401 Unauthorized)', '// Response Interceptor: Xử lý các lỗi HTTP toàn cục (ví dụ: 401 Không có quyền truy cập)'],
    ['// Handle 401 Unauthorized globally', '// Xử lý chặn lỗi 401 Unauthorized trên toàn cục'],
    ['// Optional: Clear token or dispatch a logout event here', '// [Tùy chọn] Có thể xóa token hoặc kích hoạt sự kiện đăng xuất tại đây'],
    ['// Handle generic server errors', '// Xử lý các lỗi máy chủ chung (như mã lỗi >= 500)'],
    ['// Format error response into a generic structure if needed', '// Tái cấu trúc lại luồng phản hồi lỗi thành một định dạng chung nếu cần']
  ]},
  { f: 'src/types/index.ts', rules: [
    ['* Core Application Types', '* Các Kiểu Dữ Liệu Lõi Của Ứng Dụng'],
    ['* Centralized location for generic API and Entity interfaces.', '* Vị trí tập trung khai báo trước các interface API và Thực thể (Entity) chung.'],
    ['// Global User interface for broader application state', '// Khai báo Kiểu dữ liệu Người dùng phục vụ quản lý trạng thái hệ thống']
  ]},
  { f: 'src/utils/formatters.ts', rules: [
    ['* Utility for formatting dates consistently across the app.', '* Tiện ích giúp định dạng ngày tháng nhất quán trên toàn ứng dụng.'],
    ['* Format generic Date/string objects to specified patterns.', '* Định dạng object Date hoặc chuỗi về dạng cụ thể.'],
    ['* Defaults to Vietnamese locale standard formatting.', '* Mặc định sử dụng chuẩn định dạng của tiếng Việt.'],
    ['* Returns a relative time string (e.g., "5 minutes ago", "Vừa xong").', '* Trả về chuỗi thời gian tương đối (ví dụ: "5 phút trước", "Vừa xong").'],
    ['* Format system for text, numbers, and currency.', '* Cấu trúc định dạng hệ thống cho văn bản, chữ số và tiền tệ.'],
    ['* Format numbers to local notation (e.g., 1000 -> 1.000).', '* Định dạng số theo ký hiệu địa phương (ví dụ 1000 -> 1.000).'],
    ['* Truncate long strings effectively adding ellipsis.', '* Cắt chiết các chuỗi dài hiệu quả và thêm kí hiêu ba chấm đằng sau.'],
    ['* Create URL safe slugs out of strings (useful for SEO friendly routes).', '* Tạo URL an toàn (Slug) từ chuỗi gốc (Cực kì hữu ích cho đường dẫn thân thiện SEO).'],
    ['// Unaccent', '// Loại bỏ dấu câu tiếng việt sang dạng Latin gốc']
  ]},
  { f: 'src/utils/storage.ts', rules: [
    ['* Type-safe LocalStorage wrappers to avoid direct manipulation errors.', '* Các wrapper an toàn (type-safe) để thao tác tránh lỗi LocalStorage.'],
    ['* Safe setItem for parsing JSON.', '* Hàm setItem an toàn nhận vào JSON.'],
    ['* Safe getItem returning generic types.', '* Hàm getItem an toàn trả ra giá trị generic.'],
    ['* Remove item safely.', '* Hàm xoá mục dữ liệu an toàn.'],
    ['* Clear fully.', '* Xóa trắng toàn bộ storage của Website.']
  ]},
  { f: 'src/hooks/useDebounce.ts', rules: [
    ['* A generic hook to debounce fast-changing values (like Search Input).', '* Một Hook dùng chung để làm trễ (debounce) các giá trị thay đổi liên tục (như gõ Text Tìm kiếm).'],
    ['* Prevents rapid API calling on every keystroke.', '* Thuật toán giúp ngăn chặn việc gọi API dồn dập sau mỗi sự kiện nhấn phím.'],
    ['@param value The value to debounce', '@param value Giá trị cần debounce'],
    ['@param delay Delay in ms (default: 500)', '@param delay Độ trễ theo đơn vị MiniGiây (ms). Mặc định là 500ms'],
    ['@returns The debounced value', '@returns Giá trị debounced cuối cùng sau khi hết khoảng Delay'],
    ['// Set debouncedValue to value (passed in) after the specified delay', '// Cập nhật giá trị biến debouncedValue thay cho giá trị truyền vào hiện tại sau khi đợi 1 khoảng delay'],
    ['// Return a cleanup function that will be called every time useEffect is re-called.', '// Hàm này luôn trả về cơ chế Cleanup. Nó có tác dụng dọn dẹp các hook chạy lần sau cùng lúc render lại.'],
    ['// This removes the previous timeout, ensuring that only the last value is set', '// Khi Component thay đổi hoặc huỷ, chức năng xoá này dọn sạch các hành động lập lịch timeout.'],
    ['// when the user stops typing for the specified delay.', '// Việc này sẽ đảm bảo hệ thống chỉ lấy ra dòng Text bị bỏ trễ chậm nhất.'],
    ['// Only re-call effect if value or delay changes', '// Chỉ kích hoạt lại luồng Effect nếu biến value hay cấu hình delay bị thay đổi']
  ]},
  { f: 'src/hooks/useLocalStorage.ts', rules: [
    ['* A custom hook to interact with LocalStorage that triggers React renders.', '* Một custom hook để tương tác mượt mà với LocalStorage. Mỗi khi update, nó sẽ Trigger Render lại giao diện React tương tự như UseState.'],
    ['@param key The local storage key', '@param key Khoá chỉ mục bộ nhớ Storage'],
    ['@param initialValue Fallback value if missing', '@param initialValue Dữ liệu dự phòng mặc định nếu truy cập bị dể trống'],
    ['// Pass initial state function to useState so logic is only executed once', '// Chèn dữ liệu ban đầu dưới dạng function truyền vào useState để tránh lặp logic Re-render thừa thãi'],
    ['// Return a wrapped version of useState\'s setter function that', '// Trả về phiên bản tương thích được tích hợp từ UseState Setter'],
    ['// persists the new value to localStorage.', '// Lưu giữ lại giá trị này ngay vào localStorage.'],
    ['// Allow value to be a function so we have same API as useState', '// Tính tương thích kiểu dữ liệu và tham số truyền vào tương đương giống hệt hàm React API `useState`'],
    ['// Save state', '// Cập nhật State để render'],
    ['// Save to local storage using util', '// Và lưu nó xuống dữ liệu cục bộ dưới LocalStorage nhờ hàm thư viện util ở trên']
  ]},
  { f: 'src/hooks/useFetch.ts', rules: [
    ['* A generic hook to encapsulate Axios calls with loading and error states.', '* Một custom hook đóng gói trực tiếp các Lời gọi Mạng (Axios Request) gom chung các biến Loading và Error.'],
    ['* Best used for initial data fetching where React-Query isn\'t available.', '* Mang lại hiệu suất cực cao khi gọi Data cho lần render đầu hoặc cho tới khi thư viện xịn React-Query được thêm vào.']
  ]},
  { f: 'src/config/constants.ts', rules: [
    ['* Application Constants', '* Hằng Số Ứng Dụng'],
    ['* Store system-wide immutable values, configuration keys, and enum mappings here.', '* Nơi chứa toàn bộ các Khai báo Cấu hình, Từ khoá cố định, Dữ liệu bảo mật và Enums thiết yếu không định đổi cho cả Website nhằm tránh gọi chữ String thủ công.'],
    ['// Storage Keys', '// Danh sách các Khoá cấp cho việc lưu LocalStorage'],
    ['// API Configurations', '// Các cấp phép gọi HTTP API']
  ]},
  { f: 'src/components/ErrorBoundary.tsx', rules: [
    ['* A generic React Error Boundary to prevent crashes in the component tree.', '* Error Boundary (Xây tường lỗi) có nhiệm vụ chặn chặn tình huống App React Crash (sập web trắng xoá) do bị lỗi DOM Render.'],
    ['* Can be wrapped around the entire App or specific fragile features (like dynamic content).', '* Hook này sẽ là thành quả bọc bao ở xung quanh gốc (Root element) ứng dụng và khu trú lỗi ở đúng phần bị hỏng mà thôi.'],
    ['// Update state so the next render will show the fallback UI.', '// Đảo ngược State để các bước hiển thị render kế tiếp sẽ bung ra "Giải Pháp Dự Phòng - Fallback UI/Thẻ Thông Cáo" chèn lấp báo cáo tránh cho người dùng biết rẳng chức năng bị sập.']
  ]},
  { f: 'src/services/api.ts', rules: [
    ['// Mock Data', '// Dữ liệu giả lập tĩnh (Mock Data)'],
    ['// Mock API Service', '// Hàm dịch vụ API giả lập (Mocking Fake APIs)'],
    ['// e.g., "Learned \\\'你好\\\'", "Completed Quiz: Unit 1"', '// Ví dụ: "Đã học được chữ \\\'你好\\\'", "Vừa hoàn thành Quiz: Khoá học 1"'],
    ['// Simulate delay', '// Cố tính trì trệ xử lý bằng Delay giả giống như thời gian phản hồi API thật'],
    ['// Simulate processing', '// Giả lập thời gian máy chủ đang thu nạp hệ thống'],
    ['// Mocked count', '// Cung cấp con số giả']
  ]},
  { f: 'src/layouts/StudentLayout.tsx', rules: [
    ['{/* Desktop Sidebar */}', '{/* Thanh điều hướng dạng cây dọc (Sidebar) trên Desktop của học viên */}'],
    ['{/* Topbar */}', '{/* Thanh thanh chắn phía tên (Navbar) */}'],
    ['{/* Mobile Sidebar Trigger */}', '{/* Các Nút Bấm Để Bung Menu Khay (Drawer) áp dụng lúc dùng Màn hình mobile */}'],
    ['{/* Content Area */}', '{/* Điểm đổ nội dung (Outlet) chứa các đường dẫn con */}']
  ]},
  { f: 'src/layouts/AdminLayout.tsx', rules: [
    ['{/* Desktop Sidebar */}', '{/* Khu vực cấu trúc bên của quản lí viên (Desktop Sidebar) */}'],
    ['{/* Topbar */}', '{/* Thanh bao trùm bên trên cho Admin */}'],
    ['{/* Mobile Sidebar Trigger */}', '{/* Nhóm nút Trigger bung danh mục cho bản Điện thoại */}'],
    ['{/* Content Area */}', '{/* Vùng Outlet Chứa Các Content Của Quản Trị Hệ System Viên */}']
  ]},
  { f: 'src/App.tsx', rules: [
    ['// Admin Pages', '// Danh Sách Các Trang Route Dành Thiết Thực Riêng Cho Quản Trị'],
    ['// Student Pages', '// Các Thư Phân Nhánh Dành Giêng Cho Trải Nghiệm Học Việc Nhóm Người Học'],
    ['// Components', '// Khai báo các Thành Phần Hệ Sinh Thái Rẻ Nhánh'],
    ['{/* Public Routes */}', '{/* Tuyến Đường Khách Ngoài Cho Dùng Thoải Mái */}'],
    ['{/* Student Routes */}', '{/* Tập Cập Các Đường Dẫn Mà Khi Đăng Nhập Xong Mới Vào Được */}'],
    ['{/* Admin Routes */}', '{/* Truy cập Siêu Cấp Chống Chỉ Định Học Viên (Routing Quản Trị Hệ Tác) */}'],
    ['{/* Fallback Route */}', '{/* Kịch bản Đi lạc - Route Bọc Không Liệt Kê Nào Cả -> Bay Về Trang Phụ Trợ (Hoặc Auto Đẩy Về Login 404 Dashboard) */}']
  ]}
];

replacers.forEach(({ f, rules }) => {
  const p = path.resolve(process.cwd(), f);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    rules.forEach(([en, vi]) => {
      content = content.replace(new RegExp(en.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&'), 'g'), vi);
    });
    fs.writeFileSync(p, content);
  }
});
console.log('Successfully updated all English comments to Vietnamese comments!');
