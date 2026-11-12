# NUGAS Space

**Urban Space** adalah aplikasi berbasis website yang dirancang untuk memudahkan pengguna dalam mencari dan melakukan reservasi ruang maupun meja untuk belajar atau bekerja. Aplikasi ini dikembangkan sebagai proyek Tugas Besar mata kuliah Pemrograman Web.

## 📌 Tentang Proyek

NUGAS Space bertujuan menyediakan platform reservasi ruang yang memiliki antarmuka sederhana dan mudah digunakan. Pengguna dapat melihat fasilitas yang tersedia, memilih ruang atau meja, serta melakukan simulasi proses reservasi.

Selain sisi pengguna, aplikasi ini juga menyediakan halaman Admin untuk membantu pengelolaan fasilitas dan pemantauan transaksi reservasi.

## ✨ Fitur Utama

### 1. Customer / User
- **Beranda:** Menampilkan informasi dan pengenalan NUGAS Space.
- **Login:** Halaman autentikasi pengguna.
- **Katalog Fasilitas:** Menampilkan fasilitas ruang dan meja yang tersedia.
- **Reservasi:** Memungkinkan pengguna melakukan pemesanan fasilitas.
- **Riwayat Transaksi:** Menampilkan informasi transaksi reservasi.

### 2. Admin / Staff
- **Admin Dashboard:** Menampilkan halaman pengelolaan fasilitas.
- **Manajemen Fasilitas:** Mengelola data ruang dan meja.
- **Manajemen Transaksi:** Melihat dan memverifikasi transaksi reservasi.

## 🛠️ Teknologi yang Digunakan

| Teknologi | Kegunaan |
|---|---|
| HTML5 | Struktur halaman website |
| CSS3 | Styling dan tampilan website |
| JavaScript | Interaksi dan logika aplikasi |
| Tailwind CSS | Membantu proses styling antarmuka |
| LocalStorage | Penyimpanan data sementara di browser |
| Git & GitHub | Version control dan kolaborasi tim |

## 📂 Struktur Proyek

```text
NUGAS-SPACE/
│
├── assets/
│   ├── css/
│   │   ├── input.css
│   │   └── output.css
│   ├── js/
│   └── images/
│
├── index.html
├── Beranda.html
├── login.html
├── Fasilitas.html
├── Reservasi.html
├── admin-dashboard.html
├── AdminTransaksi.html
│
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

*Catatan: Struktur folder dapat berkembang mengikuti integrasi dan pengembangan fitur.*

## 🚀 Cara Menjalankan Proyek

### 1. Clone Repository

```bash
git clone https://github.com/mYusrilMalakaini/nugas-space.git
```

### 2. Masuk ke Folder Proyek

```bash
cd nugas-space
```

### 3. Install Dependencies

Pastikan Node.js dan npm sudah terpasang.

```bash
npm install
```

Jika menggunakan Windows PowerShell dan perintah `npm` mengalami kendala, gunakan:

```bash
npm.cmd install
```

### 4. Jalankan Tailwind CSS

Untuk menjalankan proses build Tailwind CSS secara otomatis:

```bash
npx @tailwindcss/cli -i ./assets/css/input.css -o ./assets/css/output.css --watch
```

Pada Windows PowerShell, gunakan:

```bash
npx.cmd @tailwindcss/cli -i ./assets/css/input.css -o ./assets/css/output.css --watch
```

### 5. Buka Website

Buka file `index.html` melalui browser atau gunakan ekstensi Live Server pada Visual Studio Code.

## 👥 Tim Pengembang

Proyek ini dikembangkan oleh Kelompok 7.

| Nama | Tanggung Jawab |
|---|---|
| Muhammad Yusril Malakaini | Authentication, Profile, dan integrasi UI/UX |
| Muhammad Jiwa | Katalog Ruangan, Availability, dan Admin Room CRUD |
| Edmundt Jonathan | Booking, Payment, dan Admin Transactions |
| Irfan Satrio Yudanto | Invoice, Booking History, dan integrasi UI/UX |

## 🌿 Git Workflow

Pengembangan proyek menggunakan Git dan GitHub untuk mendukung kolaborasi antaranggota tim.

Branch utama yang digunakan:

- `main` — versi utama proyek.
- `develop` — branch integrasi pengembangan.
- `fitur-*` — branch untuk pengembangan fitur masing-masing anggota.

Alur kerja:

1. Mengambil perubahan terbaru dari branch `develop`.
2. Membuat atau berpindah ke feature branch.
3. Mengembangkan dan menguji fitur.
4. Melakukan commit dan push.
5. Mengajukan Pull Request ke branch `develop`.
6. Melakukan review dan integrasi perubahan.

## ⚠️ Catatan Pengembangan

NUGAS Space saat ini merupakan prototype frontend untuk kebutuhan Tugas Besar Pemrograman Web.

- Data aplikasi masih menggunakan penyimpanan sementara melalui LocalStorage.
- Proses login dan pembayaran belum terhubung dengan backend atau payment gateway sungguhan.
- Belum menggunakan database server.
- Pengembangan dan pengujian integrasi fitur dilakukan secara bertahap.

## 🎯 Tujuan Proyek

Melalui proyek ini, tim mengimplementasikan konsep pengembangan website menggunakan HTML, CSS, JavaScript, dan Tailwind CSS, sekaligus mempraktikkan kolaborasi pengembangan perangkat lunak menggunakan Git dan GitHub.

---

**NUGAS Space — Find Your Space, Focus on Your Goals.**