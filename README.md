# Cách chạy source code

## 1. Chạy source code "mobile" trên thiết bị Android thực:
### 1.0. Trước khi cài development build:
- Cài package chạy lệnh: `npm install` hoặc `yarn`.
- (Tùy chọn) chạy lệnh: `npx expo-doctor` để kiểm tra source code có bị vấn đề gì Không.
- (Tùy chọn) chạy lệnh: `npx expo install --fix` để cài các thư viện Expo với version tương thích với Expo SDK hiện tại trong project.
- Cắm dây vào thiết bị thực hoặc kết nối qua wifi.

### 1.1. Nếu chưa có bản development build trên thiết bị Android:
- Chạy lệnh: `npx expo run:android`.
- Đợi build xong sẽ hiện lên bảng Bundle và bảng chọn và có folder `.android` mới được tạo ra.
- Bấm `a`, sau đó đợi hiển thị thông báo cài đặt app và bấm chọn cài đặt.

### 1.2. Đã có bản development build trên thiết bị Android và thư mục .android:
- Chạy lệnh: `npx expo start --dev-client`.
- Đợi bảng Bundle hiện lên và chọn `a`.