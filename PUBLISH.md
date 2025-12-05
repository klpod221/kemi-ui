# 📦 Hướng dẫn Publish lên NPM

## Chuẩn bị

### 1. Đăng nhập vào NPM

```bash
npm login
```

Nhập:
- Username: `klpod221` (hoặc username npm của bạn)
- Password: (mật khẩu npm)
- Email: `klpod221@gmail.com`
- One-time password: (nếu bật 2FA)

### 2. Kiểm tra đã login chưa

```bash
npm whoami
```

## Publish Packages

### ✅ Checklist trước khi publish:

- [ ] Build thành công: `npm run build`
- [ ] Version đã tăng (nếu cập nhật)
- [ ] Git commit và push code
- [ ] Đã xóa các file không cần thiết (showcase, demo)

### Publish @klpod221/kemi-ui (Core)

```bash
cd packages/core
npm publish --access public
```

**Lưu ý**: Package core phải được publish **TRƯỚC** package Vue

### Publish @klpod221/kemi-ui-vue

Sau khi core đã publish thành công:

```bash
cd packages/vue
npm publish --access public
```

## Cập nhật Version

### Tự động tăng version:

```bash
# Trong thư mục package cần tăng version
npm version patch   # 1.0.3 -> 1.0.4 (bug fixes)
npm version minor   # 1.0.3 -> 1.1.0 (new features)
npm version major   # 1.0.3 -> 2.0.0 (breaking changes)
```

### Thủ công:

Sửa trực tiếp `version` trong `package.json`

## Xác minh sau khi publish

```bash
# Kiểm tra package đã publish
npm info @klpod221/kemi-ui
npm info @klpod221/kemi-ui-vue

# Test cài đặt
npm install @klpod221/kemi-ui
npm install @klpod221/kemi-ui-vue
```

## Unpublish (Nếu cần)

⚠️ **Chỉ có thể unpublish trong vòng 72 giờ đầu**

```bash
npm unpublish @klpod221/kemi-ui@1.0.3
npm unpublish @klpod221/kemi-ui-vue@1.0.0
```

## Publish lại version mới

Sau khi unpublish, tăng version và publish lại:

```bash
# Tăng version
npm version patch

# Build và publish
npm run build
npm publish --access public
```

## Version hiện tại

- `@klpod221/kemi-ui`: **1.0.3**
- `@klpod221/kemi-ui-vue`: **1.0.0**

## Lưu ý quan trọng

1. **Không thể publish cùng version 2 lần** - Phải tăng version mỗi lần publish
2. **Core phải publish trước Vue** - Vue phụ thuộc vào core
3. **Kiểm tra `dist/` folder** - Phải build trước khi publish
4. **Access public** - Package scoped (@klpod221) mặc định là private, cần thêm `--access public`
5. **2FA** - Nếu bật 2FA trên npm, cần OTP code khi publish
