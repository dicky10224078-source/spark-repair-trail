# Spark Repair Trail

Buatkan komponen UI "Express Intake Form" (Form Entri Servis Baru) berbasis React dan Tailwind CSS untuk platform "ElectroTrack Service & Diagnostics" dengan ketentuan desain dan field sebagai berikut:

1. Panduan Desain & Theme:

   - Primary Color: Crimson Red (#DC2626)

   - Background Card: White (#FFFFFF) dengan border border-slate-200/80 dan shadow-sm

   - Typography: Font sans-serif (Inter / Plus Jakarta Sans)

   - Style Input: rounded-lg, focus:ring-2 focus:ring-red-500, padding pas, clean & modern layout

2. Layout Multi-Step / Multi-Section Form:

   Section 1: Data Pelanggan

   - Nama Pelanggan (Text Input, Required)

   - Nomor WhatsApp (Tel Input dengan prefix +62, Required)

   - Email (Email Input, Optional)

   - Alamat (Textarea, Optional)

   Section 2: Spesifikasi Perangkat

   - Kategori Perangkat (Dropdown Select: Laptop & PC Workstation, Smartphone, TV, Audio, Lainnya)

   - Merk / Seri Unit (Text Input, misal: Asus ROG Zephyrus G14)

   - Serial Number / IMEI (Text Input)

   - Tag Kondisi Fisik (Checkbox Group / Multi-select Badge: "Lecet Sudut / Dent", "Segel Utuh", "Layar Bergores", "Baut Kurang")

   Section 3: Diagnosa Awal & Resi Engine

   - Preview Resi Otomatis (Disabled Input / Badge Readonly dengan format otomatis: TRX-YYYYMM-XXXX)

   - Keluhan / Keluhan Awal (Textarea, Required)

   - Prioritas SLA (Dropdown Select: Standard Queue, Express Service, Urgent)

   - Assign Teknisi (Dropdown Select list teknisi PIC)

   - Upload Foto Awal Kondisi Unit (File Upload Drag-and-Drop, support JPG/PNG max 5MB)

3. Tombol Aksi:

   - Tombol "Batal" (Outline/Ghost button)

   - Tombol Utama "Simpan & Cetak Resi" (Solid Crimson Red #DC2626, rounded-lg, font-semibold)

Buatkan komponen Modal Dialog "Update Status Perbaikan & Log Catatan Teknisi" berbasis React dan Tailwind CSS dengan spesifikasi berikut:

1. Modal Header:

   - Judul: "Update Progress Servis"

   - Subtitle: Menampilkan Nomor Tiket (misal: #TRX-8892 / #REP-2024-8849) dan nama unit.

   - Tombol Close (Icon X di sudut kanan atas)

2. Form Field & Kontrol:

   - Status Utama (Dropdown Select / Radio Group): 

     * Diterima & Diagnosa

     * Dalam Perbaikan (Blue Badge)

     * Menunggu Sparepart (Purple Badge)

     * Pengujian / QC Pass (Green Badge)

     * Selesai / Siap Ambil (Green Badge)

   - Estimasi Waktu Selesai (Datetime Picker Input)

   - Catatan Teknis Lab / Technical Note (Textarea, tempat teknisi menulis rincian tindakan perbaikan)

   - Upload Foto Bukti Component/Part Aus (Drag-and-Drop File Upload zone, validasi max 5MB, format PNG/JPG)

   - Toggle Switch Notification: "Kirim Notifikasi Otomatis ke WhatsApp Pelanggan" (Default: Active/Checked)

3. Modal Footer / Action Buttons:

   - Tombol "Batal" (Secondary Button)

   - Tombol "Simpan Perubahan" (Primary Crimson Red Button)

Buatkan komponen Form Pencarian Pelacakan Resi (Public Tracking Hero Search Box) untuk halaman utama pelanggan (Zero-friction access):

1. UI Elements:

   - Input Field Besar dengan Icon Pencarian (Search Icon): Placeholder "Masukkan Nomor Resi (contoh: REP-2024-8849) atau No. Telepon..."

   - Tombol Utama Aksi: "Cek Status →" (Warna Crimson Red #DC2626, rounded-lg, hover:bg-red-700)

   - Sampel Resi Instan: Sediakan 3 Quick Clickable Badges/Buttons di bawah kolom input untuk testing (misal: "Sample Resi: REP-2024-8849", "TRX-2026-1002", "TRX-2026-1005") yang ketika diklik langsung mengisi nilai ke input field.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://spark-repair-trail.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cd225282-939e-48fa-920c-d94b278adb60).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
