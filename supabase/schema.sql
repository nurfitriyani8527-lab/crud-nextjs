-- Jalankan script ini di Supabase Dashboard -> SQL Editor -> New Query -> Run
-- Script ini otomatis membuat tabel "Mahasiswa" sesuai kebutuhan aplikasi CRUD.

create table if not exists public."Mahasiswa" (
  nim bigint primary key,
  nama text not null,
  kelas text not null,
  semester integer not null
);

-- Opsional: data contoh awal (boleh dihapus jika ingin tabel kosong)
insert into public."Mahasiswa" (nim, nama, kelas, semester)
values
  (20240001, 'Budi Santoso', 'TI-1A', 2),
  (20240002, 'Siti Rahma', 'TI-1B', 4)
on conflict (nim) do nothing;
