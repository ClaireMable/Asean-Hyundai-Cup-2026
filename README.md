# KAPSUL4D - Live Score & Jadwal Piala AFF 2026

Platform web interaktif yang menyediakan informasi *live score*, jadwal pertandingan, klasemen, statistik pemain, dan analisis *head-to-head* untuk turnamen **Piala AFF 2026 (ASEAN Hyundai Cup)** secara *real-time*.

## Fitur Utama

- **Live Score & Real-Time Update**: Pantau skor pertandingan yang sedang berjalan secara instan.
- **Jadwal & Klasemen Lengkap**: Informasi detail fase grup hingga babak final.
- **Statistik & Skuad Timnas**: Daftar pemain, kondisi top skor, dan taktik tim di bawah pelatih.
- **Optimasi SEO & Performa**: Dibangun dengan struktur yang ramah mesin pencari (*Search Engine Optimization*).

## Teknologi yang Digunakan

- **Framework**: Next.js (React)
- **Deployment**: Vercel
- **Styling**: Tailwind CSS / CSS Modules

## Cara Menjalankan secara Lokal

### Prasyarat

Sebelum memulai, pastikan perangkat Anda sudah terinstal:
- [Node.js](https://nodejs.org) (versi LTS direkomendasikan)
- NPM atau Yarn

### Langkah Instalasi

1. **Clone Repositori dan Masuk ke Direktori Proyek**
   ```bash
   git clone <url-repositori-anda>
   cd <nama-folder-proyek>
   ```

2. **Instal Dependensi**
   Gunakan perintah berikut untuk mengunduh semua library yang dibutuhkan:
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables**
   Buat file `.env.local` di root direktori proyek Anda (jika belum ada), lalu tambahkan kredensial API yang Anda gunakan untuk menyuplai data konten:
   ```env
   DATA_API_KEY=isi_dengan_api_key_anda
   ```

4. **Jalankan Server Pengembangan**
   Mulai server lokal untuk melihat perubahan secara *real-time*:
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) pada browser Anda untuk melihat hasilnya.

## Produksi dan Deployment

Untuk membuat *build* versi produksi yang dioptimalkan:
```bash
npm run build
```
Proyek ini dikonfigurasi agar siap di-deploy langsung ke platform **Vercel** hanya dengan menghubungkan repositori GitHub Anda.