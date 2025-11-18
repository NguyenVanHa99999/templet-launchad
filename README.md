# 🚀 Templet Launchad

Dự án Full-stack với Next.js (Frontend) và Strapi CMS (Backend).

---

## 📋 Yêu Cầu Hệ Thống

- **Node.js**: >= 18.x
- **Yarn**: >= 1.22.x
- **MySQL**: >= 8.0
- **Git**: Để clone project

### **Cài Đặt Các Công Cụ Cần Thiết**

#### **1. Cài Node.js**

**macOS:**
```bash
# Dùng Homebrew
brew install node@18

# Hoặc tải từ trang chủ
# https://nodejs.org/
```

**Windows:**
- Tải installer từ: https://nodejs.org/
- Chọn phiên bản LTS (18.x hoặc mới hơn)
- Chạy file `.msi` và làm theo hướng dẫn

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Kiểm tra cài đặt:**
```bash
node --version  # Phải >= v18.x
npm --version
```

#### **2. Cài Yarn**

```bash
# Sau khi đã cài Node.js
npm install -g yarn

# Kiểm tra
yarn --version  # Phải >= 1.22.x
```

#### **3. Cài MySQL**

**macOS:**
```bash
# Dùng Homebrew
brew install mysql@8.0
brew services start mysql

# Thiết lập mật khẩu root
mysql_secure_installation
```

**Windows:**
- Tải MySQL Installer: https://dev.mysql.com/downloads/installer/
- Chọn "MySQL Server 8.0"
- Làm theo hướng dẫn cài đặt
- Nhớ mật khẩu root đã đặt!

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

**Kiểm tra MySQL:**
```bash
mysql --version  # Phải >= 8.0
mysql -u root -p  # Đăng nhập thử
```

---

## 🛠️ Cài Đặt & Chạy Dự Án

### **Bước 1: Clone Project**

```bash
git clone <repository-url>
cd templet-launchad
```

### **Bước 2: Cài Đặt Dependencies**

```bash
yarn install
```

### **Bước 3: Cấu Hình Database**

1. Tạo database MySQL:
```bash
mysql -u root -p
CREATE DATABASE iph;
EXIT;
```

2. Cấu hình Strapi:
   - Mở file `templet-launchad/strapi/.env.example`
   - Tìm dòng `DATABASE_PASSWORD=YOUR_PASSWORD_HERE`
   - Thay `YOUR_PASSWORD_HERE` bằng mật khẩu MySQL của bạn
   - Lưu file

**Ví dụ:**
```env
DATABASE_PASSWORD=your_mysql_password
```

### **Bước 4: Chạy Dự Án**

```bash
yarn develop
```

Lệnh này sẽ chạy **đồng thời**:
- ✅ **Backend (Strapi)**: `http://localhost:1337`
- ✅ **Frontend (Next.js)**: `http://localhost:3000`

---

## 🌐 Truy Cập Ứng Dụng

### **Frontend (Website)**
```
http://localhost:3000
```

### **Backend (Strapi Admin)**
```
http://localhost:1337/admin
```

**Lần đầu truy cập:** Tạo tài khoản admin mới

---

## 📁 Cấu Trúc Project

```
templet-launchad/
├── next/                  # Frontend (Next.js)
│   ├── app/              # Next.js App Router
│   ├── components/       # React Components
│   └── public/           # Static files
│
├── strapi/               # Backend (Strapi CMS)
│   ├── src/
│   │   ├── api/         # API endpoints
│   │   └── admin/       # Admin customization
│   ├── config/          # Configuration
│   └── .env.example     # Environment variables template
│
└── package.json         # Root package.json
```

---

## 🔧 Scripts Có Sẵn

### **Development (Chạy cả 2)**
```bash
yarn develop
```

### **Chạy riêng Frontend**
```bash
yarn dev:next
```

### **Chạy riêng Backend**
```bash
yarn dev:strapi
```

### **Build Production**
```bash
yarn build
```

### **Start Production**
```bash
yarn start
```

---

## 📦 Backup & Restore Data

⚠️ **LƯU Ý QUAN TRỌNG:** 
- Trước khi đẩy code lên repo, **BẮT BUỘC** phải backup data!
- Khi team khác clone về, họ cần import data để có đầy đủ content.

### **Export Data (Backup)**

#### **Cách 1: Backup KHÔNG MÃ HÓA (Khuyến nghị cho development)**

```bash
cd strapi && yarn strapi export --no-encrypt -f ./data/backup_20251118
```

→ Không cần mật khẩu, file backup không được mã hóa  
→ Dễ dàng import lại, phù hợp cho team development

#### **Cách 2: Backup CÓ MÃ HÓA (Cho production/sensitive data)**

```bash
cd strapi && yarn strapi export -f ./data/backup_20251118
```

**Chỉ cần BỎ `--no-encrypt`!**

**Strapi sẽ hỏi encryption key:**
```
? Please enter an encryption key [input is hidden]
```

→ Nhập mật khẩu (ví dụ: `backup2024`) và nhấn Enter  
→ **Nhớ mật khẩu này** để import sau!

**Kết quả:**
```
✔ entities: 191 transferred
✔ assets: 115 transferred
→ File: strapi/data/backup_20251118.tar.gz
```

### **Import Data (Restore)**

#### **Nếu file backup KHÔNG MÃ HÓA:**
file backup không có mã hóa đang được cải script rồi nên chỉ cần chạy lệnh 

```bash
cd templet-launchad && yarn develop
```
- Lưu ý chạy yarn install trước nhé rồi mới run yarn develop nhé sẽ tự động import data

#### **Nếu file backup CÓ MÃ HÓA:**

```bash
cd strapi && yarn strapi import -f ./data/backup_20251118.tar.gz --force
```

**Strapi sẽ hỏi encryption key:**
```
? Please enter the decryption key [input is hidden]
```

→ Nhập **ĐÚNG mật khẩu** đã dùng khi export

---

**Nếu KHÔNG dùng `--force`, Strapi sẽ hỏi xác nhận:**
```
? The import will delete your existing data! Are you sure? (Y/n)
```

→ Gõ `Y` nếu chắc chắn (⚠️ Sẽ xóa data hiện tại!)

⚠️ **Lưu ý:** 
- Import sẽ **XÓA** data hiện tại
- Luôn backup database trước khi import
- Nếu có mã hóa, encryption key phải **GIỐNG NHAU** khi export/import
- Dùng `--force` để tự động xác nhận (cẩn thận!)

---

## 🐛 Troubleshooting

### **Lỗi: "Cannot connect to database"**
- Kiểm tra MySQL đã chạy chưa
- Kiểm tra `DATABASE_PASSWORD` trong `strapi/.env.example`
- Đảm bảo database `iph` đã được tạo

### **Lỗi: "Port 3000 already in use"**
```bash
# Tìm và kill process đang dùng port 3000
lsof -ti:3000 | xargs kill -9
```

### **Lỗi: "Port 1337 already in use"**
```bash
# Tìm và kill process đang dùng port 1337
lsof -ti:1337 | xargs kill -9
```

### **Reset hoàn toàn**
```bash
# Xóa node_modules và cài lại
rm -rf node_modules next/node_modules strapi/node_modules
yarn install
```

---

## 📝 Environment Variables

### **Strapi (.env.example)**
```env
# Database
DATABASE_CLIENT=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=iph
DATABASE_USERNAME=root
DATABASE_PASSWORD=YOUR_PASSWORD_HERE  # ← Thay đổi ở đây!

# Strapi
ADMIN_JWT_SECRET=tobemodified
JWT_SECRET=tobemodified

# Next.js
CLIENT_URL=http://localhost:3000
```

---

## 🤝 Contributing

1. Fork project
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

---

## 📄 License

[Thêm license của bạn ở đây]

---

## 💬 Support

Nếu gặp vấn đề, vui lòng tạo issue trên GitHub hoặc liên hệ team.

---

**Happy Coding! 🎉**
