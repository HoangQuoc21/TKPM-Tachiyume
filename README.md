# Các thao tác với Project:

# 0. Làm việc với git:
## 0.1 Tổ chức branch:
- Nhánh chính: `main`: Chỉ chứa source code đã hoàn thiện và không có lỗi. Chỉ merge code từ nhánh `dev`.
- Nhánh phụ: `dev`: Chứa source code đang phát triển và có thể chứa lỗi. Merge code từ các nhánh `personal`.
- Nhánh con: `personal`: Chứa source code đang phát triển từ các thành viên trong nhóm.
## 0.2 Workflow:
- Mỗi thành viên tạo nhánh `personal` từ nhánh `dev` và làm việc trên nhánh `personal` của mình.
- Khi hoàn thành công việc, tạo Pull Request từ nhánh `personal` của mình đến nhánh `dev` để review code.
- Khi đã review xong và không có vấn đề gì, thì merge code từ nhánh `personal` vào nhánh `dev`.
- Khi đã hoàn thiện một tính năng hoặc một số tính năng, tạo Pull Request từ nhánh `dev` đến nhánh `main` để merge code.
## 0.3 Cú pháp commit:
`[<Tên người thực hiện>] #<stt commit cá nhân>: <tóm tắt nội dung commit>`, ví dụ: [H.Quốc] #1: Thêm các screens
***

## 1. Chạy source code "mobile" trên thiết bị Android thực / ảo:
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
***

## 2. Chạy source code "mobile" trên branch Github của người khác:
- Cài lại package, chạy lệnh: `npm install` hoặc `yarn`.
- Nạp lại thư mục '.android', chạy lệnh: `npx expo prebuild`.
- Xóa app đang có trên máy đi và cài lại app mới, chạy lệnh: `npx expo run:android`
- Đợi build xong sẽ hiện lên bảng Bundle, bấm `a` để mở app.
- Với những lần chạy tiếp ở branch này thì chỉ cần chạy lệnh: `npx expo start --dev-client`.
- (Quay về nhánh của mình thì thực hiện như ở trên)
***

## 3. Những lỗi có thể gặp phải và cách khắc phục:
0. Trong trường hợp đường cùng:
- Gỡ cài đặt app trên thiết bị (nếu đã build:android)
- Xóa thư mục `.android` và `.node_modules` trong project.
- Cài lại package, chạy lệnh: `npm install` hoặc `yarn`.
- Nạp lại thư mục '.android', chạy lệnh: `npx expo prebuild`.
- Chạy lệnh: `npx expo run:android`.

1. Lỗi file tsconfig.json cứ báo error đỏ:
- Bấm tổ hợp phím `Ctrl + Shift + P` và gõ `TypeScript: Restart TS server`.

2. Lỗi không thể cài đặt app trên thiết bị:
- Kiểm tra kết nối giữa thiết bị và máy tính.
- Kiểm tra thiết bị có đang ở chế độ Developer Options và USB Debugging.
- Kiểm tra thiết bị có đang ở chế độ Allow install apps via USB.
- Kiểm tra thiết bị và laptop có đang kết nối cùng mạng wifi.
***

## 4. Build file .apk để cài trên thiết bị Android:
- Chạy lệnh `eas login` để Đăng nhập vào tài khoản Expo trên máy tính, sử dụng tài khoản được thêm vào project trên Expo.
- Chạy lệnh `eas build -p android --profile staging` để bắt đầu build file .apk.
- Lên web https://expo.dev/accounts/tkpm-chillingchillies/projects/tachiyume/builds để xem trạng thái build.
- Sau khi build xong có thể tải file .apk từ web expo trên về và cài trên thiết bị Android.