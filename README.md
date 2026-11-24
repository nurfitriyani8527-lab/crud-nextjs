## Fitur

- Menampilkan daftar data mahasiswa
- Menambah data mahasiswa (`NIM`, `Nama`, `Kelas`, `Semester`)
- Mengedit data mahasiswa
- Menghapus data mahasiswa

## Prasyarat

- [Node.js](https://nodejs.org/) (disarankan versi 20 ke atas)
- Akun [Supabase](https://supabase.com/) (gratis)

## Cara Menjalankan Project

### 1. Clone Repository

```bash
git clone https://github.com/nurfitriyani8527-lab/crud-nextjs.git
cd crud
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database & Tabel `Mahasiswa` di Supabase

Kamu **tidak perlu membuat tabel dan kolom satu per satu secara manual**:

1. Buka [Supabase Dashboard](https://supabase.com/dashboard) lalu buat project baru (atau pakai project yang sudah ada).
2. Masuk ke menu **SQL Editor** → klik **New query**.
3. Copy seluruh isi file [`supabase/schema.sql`](./supabase/schema.sql), paste ke SQL Editor, lalu klik **Run**.
4. Tabel `"Mahasiswa"` beserta data contoh awal akan otomatis terbuat.

### 4. Konfigurasi Environment Variable (`.env`)

1. Duplikat file `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Di Windows Command Prompt bisa pakai `copy .env.example .env`, atau buat file `.env` secara manual).*

2. Buka Supabase Dashboard → **Project Settings** → **API / Data API**, lalu salin **Project URL** dan **Publishable Key** ke dalam file `.env`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxx
   ```

### 5. Jalankan Aplikasi

```bash
npm run dev
```

Buka browser dan akses [http://localhost:3000](http://localhost:3000).
