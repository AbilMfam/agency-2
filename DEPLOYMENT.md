# راهنمای استقرار (Deployment Guide)

## پیش‌نیازها

### سرور
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL یا SQLite
- Nginx یا Apache

### دامنه‌ها
- دامنه اصلی برای فرانت‌اند: `yourdomain.com`
- ساب‌دامنه برای API: `api.yourdomain.com`

---

## 1. استقرار Backend (Laravel)

### 1.1 آپلود فایل‌ها
```bash
cd backend
```

### 1.2 نصب وابستگی‌ها
```bash
composer install --optimize-autoloader --no-dev
```

### 1.3 تنظیم Environment
```bash
cp .env.example .env
php artisan key:generate
```

ویرایش `.env`:
```env
APP_NAME="Agency Website"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.yourdomain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

FRONTEND_URL=https://yourdomain.com
```

### 1.4 اجرای Migration و Seeder
```bash
php artisan migrate --force
php artisan db:seed --force
```

### 1.5 بهینه‌سازی
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan storage:link
```

### 1.6 تنظیم Permissions
```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

---

## 2. استقرار Frontend (React/Vite)

### 2.1 تنظیم Environment
```bash
cp .env.example .env
```

ویرایش `.env`:
```env
VITE_API_URL=https://api.yourdomain.com/api/v1
```

### 2.2 نصب و Build
```bash
npm install
npm run build
```

### 2.3 آپلود فایل‌های Build
محتویات پوشه `dist` را به سرور آپلود کنید.

---

## 3. تنظیمات Nginx

### Backend (api.yourdomain.com)
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;
    root /var/www/backend/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

### Frontend (yourdomain.com)
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/frontend/dist;

    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 4. SSL (Let's Encrypt)

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot --nginx -d api.yourdomain.com
```

---

## 5. CORS Configuration

فایل `backend/config/cors.php` را بررسی کنید:
```php
'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:2038')],
```

---

## 6. چک‌لیست نهایی

- [ ] APP_DEBUG=false در production
- [ ] APP_ENV=production
- [ ] SSL فعال شده
- [ ] CORS تنظیم شده
- [ ] Storage link ایجاد شده
- [ ] Permissions درست تنظیم شده
- [ ] Cache‌ها ایجاد شده
- [ ] Database migrate شده
- [ ] تصاویر و فایل‌های استاتیک آپلود شده

---

## 7. عیب‌یابی

### خطای 500
```bash
tail -f storage/logs/laravel.log
```

### خطای CORS
- بررسی `FRONTEND_URL` در `.env`
- بررسی `config/cors.php`

### خطای تصاویر
```bash
php artisan storage:link
chmod -R 775 storage/app/public
```
