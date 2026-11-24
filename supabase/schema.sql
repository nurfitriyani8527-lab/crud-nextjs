-- Membuat tabel Mahasiswa
CREATE TABLE IF NOT EXISTS public."Mahasiswa" (
    nim int8 PRIMARY KEY,
    created_at timestamptz NOT NULL DEFAULT now(),
    nama varchar NOT NULL,
    kelas varchar NOT NULL,
    semester int2 NOT NULL
);

-- Mengaktifkan Row Level Security
ALTER TABLE public."Mahasiswa"
ENABLE ROW LEVEL SECURITY;

-- Memberikan izin akses CRUD
GRANT SELECT, INSERT, UPDATE, DELETE
ON TABLE public."Mahasiswa"
TO anon;

-- Policy untuk latihan CRUD tanpa login
DROP POLICY IF EXISTS "Allow CRUD"
ON public."Mahasiswa";

CREATE POLICY "Allow CRUD"
ON public."Mahasiswa"
FOR ALL
TO anon
USING (true)
WITH CHECK (true);

-- Data contoh
INSERT INTO public."Mahasiswa"
    (nim, nama, kelas, semester)
VALUES
    (20240001, 'Budi Santoso', 'TI-1A', 2),
    (20240002, 'Siti Rahma', 'TI-1B', 4)
ON CONFLICT (nim) DO NOTHING;
