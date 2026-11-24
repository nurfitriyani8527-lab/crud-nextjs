"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { table } from "console"

type Mahasiswa = {
    nim: number
    nama: string
    kelas: string
    semester: number
};

export default function Home() {
    const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([])
    const [nim, setNim] = useState(0)
    const [nama, setNama] = useState("")
    const [kelas, setKelas] = useState("")
    const [semester, setSemester] = useState(0)
    const [editNim, setEditNim] = useState<number | null>(null)
    const [showForm, setShowForm] = useState(false)

    async function getMahasiswa() {
        const { data, error } = await supabase
            .from("Mahasiswa")
            .select("*")

        if (error) {
            alert("Error saat memunculkan data:")
        } else {
            setMahasiswa(data)
        }
    }
    useEffect(() => {
        getMahasiswa()
    }, [])

  // CREATE DAN UPDATE DATA
    async function simpanData() {
        if (!nim || !nama || !kelas || !semester) {
            alert("Semua data wajib diisi!")
            return
        }
        const dataMahasiswa = {
            nim: nim,
            nama: nama,
            kelas: kelas,
            semester: semester
        }

        if (editNim !== null) {
            const { error } = await supabase
                .from("Mahasiswa")
                .update(dataMahasiswa)
                .eq("nim", editNim)

            if (error) {
                alert(error.message)
                return
            }
        } else {
            const { error } = await supabase
                .from("Mahasiswa")
                .insert(dataMahasiswa)

            if (error) {
                alert(error.message)
                return
            }
        }

        setShowForm(false)
        await getMahasiswa()
    }

    // MENAMPILKAN DATA YANG AKAN DIEDIT
    function editData(item: Mahasiswa) {
        setEditNim(item.nim)
        setNim(item.nim)
        setNama(item.nama)
        setKelas(item.kelas)
        setSemester(item.semester)
        setShowForm(true)
    }

    // DELETE DATA
    async function hapusData(nim: number) {
        const konfirmasi = confirm("Yakin ingin menghapus data?")

        if (!konfirmasi) {
            return
        }

        const { error } = await supabase
            .from("Mahasiswa")
            .delete()
            .eq("nim", nim)

        if (error) {
            alert(error.message)
            return
        }
        await getMahasiswa()
    }

    function resetForm() {
        setNim(0)
        setNama("")
        setKelas("")
        setSemester(0)
        setEditNim(null)
        setShowForm(false)
    }

    return (
        <>
            <div className="p-8 min-h-screen bg-gray-100 text-gray-800">

                <h1 className="text-3xl font-bold mb-6">
                    Data Mahasiswa
                </h1>

                <button onClick={() => { setShowForm(true); }} className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
                    Tambah Data Mahasiswa
                </button>

                {showForm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md mx-4">
                
                            <h2 className="text-xl font-bold mb-5">
                                {editNim !== null
                                    ? "Edit Data Mahasiswa"
                                    : "Tambah Data Mahasiswa"}
                            </h2>
                                
                            <label className="block mb-1">
                                NIM
                            </label>
                            <input type="number" placeholder="Masukkan NIM" value={nim === 0 ? "" : nim} onChange={(e) => setNim(Number(e.target.value))} className="border p-2 rounded-md w-full mb-4"/>
                
                            <label className="block mb-1">
                                Nama
                            </label>
                            <input type="text" placeholder="Masukkan Nama" value={nama} onChange={(e) => setNama(e.target.value)} className="border p-2 rounded-md w-full mb-4"/>
                
                            <label className="block mb-1">
                                Kelas
                            </label>
                            <input type="text" placeholder="Masukkan kelas" value={kelas} onChange={(e) => setKelas(e.target.value)} className="border p-2 rounded-md w-full mb-4"/>

                            <label className="block mb-1">
                                Semester
                            </label>
                            <input type="number" placeholder="Masukkan semester" value={semester} onChange={(e) => setSemester(Number(e.target.value))} className="border p-2 rounded-md w-full mb-4"/>
                
                            <div className="flex justify-end gap-2 mt-4">
                                
                                <button onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer">
                                    Batal
                                </button>
                                
                                <button onClick={simpanData} className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
                                    {editNim !== null ? "Update" : "Simpan"}
                                </button>
                                
                            </div>
                                
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto mt-6">

                    <table className="w-full bg-white border-collapse">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border p-3">NIM</th>
                                <th className="border p-3">Nama</th>
                                <th className="border p-3">Program Studi</th>
                                <th className="border p-3">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {mahasiswa.map((item) => (
                                <tr key={item.nim}>

                                    <td className="border p-3">
                                        {item.nama}
                                    </td>

                                    <td className="border p-3">
                                        {item.kelas}
                                    </td>

                                    <td className="border p-3">
                                        {item.semester}
                                    </td>

                                    <td className="border p-3 text-center">

                                        <button onClick={() => editData(item)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 cursor-pointer">
                                            Edit
                                        </button>

                                        <button onClick={() => hapusData(item.nim)} className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer">
                                            Hapus
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            </div>
        </>
    );
}
