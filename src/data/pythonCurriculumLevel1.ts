import { CourseLevel } from '../types';

export const PYTHON_LEVEL_1: CourseLevel = {
  id: 'py-level-1',
  title: 'Level 1 — Fundamental',
  description: 'Tipe data terstruktur (List, Tuple, Dictionary, Set), fungsi modular (def), dan penanganan error.',
  modules: [
    {
      id: 'py-mod-1-1',
      title: 'Modul 5: Struktur Data List & Tuple',
      description: 'Menyimpan koleksi data, indexing 0-based, slicing, dan manipulasi elemen.',
      lessons: [
        {
          id: 'py-les-1-1-1',
          title: 'LEARN & UNDERSTAND: Indexing & Slicing di Python',
          type: 'learn',
          xpReward: 20,
          content: [
            {
              type: 'markdown',
              content: `### Mengapa Butuh List?

Jika kamu memiliki 100 siswa, kamu tidak mungkin membuat 100 variabel terpisah (\`siswa1\`, \`siswa2\`, ...).
Kamu membutuhkan **List**: wadah untuk menyimpan kumpulan item dalam satu tempat.

\`\`\`python
bahasa = ["Python", "JavaScript", "Rust", "Go", "TypeScript"]
\`\`\`

#### 1. Zero-Based Indexing
Di dunia programming, penghitungan posisi selalu dimulai dari angka **0**:
- \`bahasa[0]\` menghasilkan \`"Python"\` (Elemen ke-1)
- \`bahasa[1]\` menghasilkan \`"JavaScript"\` (Elemen ke-2)
- \`bahasa[-1]\` menghasilkan \`"TypeScript"\` (Elemen paling terakhir / negative index)

#### 2. Slicing (Memotong Bagian List: [start:stop])
Kamu bisa mengambil sebagian elemen menggunakan tanda titik dua \`:\`:
- \`bahasa[0:2]\` menghasilkan \`["Python", "JavaScript"]\` (indeks 0 hingga sebelum 2)
- \`bahasa[2:]\` mengambil dari indeks 2 sampai selesai

#### 3. Method Populer List:
- \`.append(item)\`: Menambahkan elemen baru ke urutan paling belakang.
- \`.pop()\`: Menghapus dan mengambil elemen paling belakang.
- \`.sort()\`: Mengurutkan elemen (secara alfabetis atau numerik).
`
            },
            {
              type: 'code-example',
              language: 'python',
              code: `skills = ["HTML", "CSS"]
skills.append("Python")
print(f"Daftar skill: {skills}")
print(f"Skill pertama: {skills[0]}")
print(f"Jumlah skill: {len(skills)}")`
            }
          ]
        },
        {
          id: 'py-les-1-1-2',
          title: 'PRACTICE: Manipulasi Data List Mahasiswa',
          type: 'practice',
          language: 'python',
          xpReward: 30,
          starterPy: `# Data nilai tugas siswa
nilai = [75, 88, 92, 60, 85]

# 1. Tambahkan nilai tugas terbaru (95) ke dalam list menggunakan .append()
nilai.append(95)

# 2. Ambil nilai tertinggi dan terendah
nilai_tertinggi = max(nilai)
nilai_terendah = min(nilai)

# 3. Hitung rata-rata nilai
rata_rata = sum(nilai) / len(nilai)

print(f"Daftar nilai: {nilai}")
print(f"Nilai Tertinggi: {nilai_tertinggi}")
print(f"Nilai Rata-rata: {rata_rata:.1f}")
`,
          hints: [
            'Gunakan nilai.append(95) untuk menambah item baru di akhir list.',
            'Fungsi sum(list) menjumlahkan semua angka di list.',
            'Fungsi len(list) menghitung banyaknya anggota list.'
          ],
          requirements: [
            {
              id: 'py-req-append',
              description: 'Menggunakan method .append() untuk menambah elemen',
              validate: (code) => code.includes('.append(')
            },
            {
              id: 'py-req-stats',
              description: 'Menghasilkan kalkulasi rata-rata pada output',
              validate: (_code, output) => Boolean(output && output.includes('Rata-rata'))
            }
          ],
          content: [
            {
              type: 'markdown',
              content: `### Latihan Praktik: Analisis Nilai Kelas

Gunakan fungsi built-in Python seperti \`sum()\`, \`len()\`, \`max()\`, dan method \`.append()\` untuk mengelola data kelas.

Jalankan kode dan perhatikan bagaimana Python menghitung rata-rata secara presisi!`
            }
          ]
        }
      ]
    },
    {
      id: 'py-mod-1-2',
      title: 'Modul 6: Dictionary (Key-Value) & Data Mapping',
      description: 'Menyimpan data terstruktur seperti JSON/Database menggunakan pasangan kunci dan nilai.',
      lessons: [
        {
          id: 'py-les-1-2-1',
          title: 'LEARN & PRACTICE: Kamus Data (Key-Value)',
          type: 'practice',
          language: 'python',
          xpReward: 30,
          starterPy: `# Representasi data profil user dalam Dictionary
user = {
    "username": "coder_id",
    "nama": "Farhan",
    "level": 5,
    "is_premium": True
}

# Mengakses data berdasarkan key (kunci)
print(f"Selamat datang, {user['nama']}!")

# Menambahkan atau memperbarui key
user["xp"] = 1250
user["level"] = 6

print(f"Level saat ini: {user['level']} (XP: {user['xp']})")
`,
          hints: [
            'Dictionary didefinisikan dengan kurung kurawal { "key": nilai }',
            'Akses nilai menggunakan tanda kurung siku: dictionary["nama_key"]',
            'Sangat mirip dengan format JSON di web API modern.'
          ],
          requirements: [
            {
              id: 'py-req-dict',
              description: 'Memiliki struktur dictionary dengan minimal 3 key',
              validate: (code) => code.includes('{') && code.includes('username')
            },
            {
              id: 'py-req-dict-output',
              description: 'Menampilkan data dari dictionary ke terminal',
              validate: (_code, output) => Boolean(output && output.includes('Farhan'))
            }
          ],
          content: [
            {
              type: 'markdown',
              content: `### Apa itu Dictionary?

Jika di List data diakses menggunakan nomor indeks (\`0, 1, 2\`), di **Dictionary** data diakses menggunakan **nama label (Key)**.

\`\`\`python
mobil = {
    "merk": "Toyota",
    "warna": "Hitam",
    "tahun": 2024
}
print(mobil["merk"])  # Output: Toyota
\`\`\`

Dictionary adalah tulang punggung data di internet (REST API, database, konfigurasian).`
            }
          ]
        }
      ]
    },
    {
      id: 'py-mod-1-3',
      title: 'Modul 7: Fungsi Modular (def) & Scope Variabel',
      description: 'Memecah kode menjadi blok-blok reusable (Don\'t Repeat Yourself), parameter, dan return value.',
      lessons: [
        {
          id: 'py-les-1-3-1',
          title: 'CHALLENGE: Membuat Fungsi Konversi Suhu & Validasi',
          type: 'challenge',
          language: 'python',
          xpReward: 40,
          starterPy: `# Buat fungsi bernama celsius_ke_fahrenheit(celsius)
# Rumus: (celsius * 9/5) + 32

def celsius_ke_fahrenheit(celsius):
    hasil = (celsius * 9 / 5) + 32
    return hasil

# Uji fungsi dengan beberapa nilai
suhu_jakarta = 30
suhu_bandung = 22

f_jakarta = celsius_ke_fahrenheit(suhu_jakarta)
f_bandung = celsius_ke_fahrenheit(suhu_bandung)

print(f"{suhu_jakarta}°C = {f_jakarta}°F")
print(f"{suhu_bandung}°C = {f_bandung}°F")
`,
          hints: [
            'Gunakan def nama_fungsi(parameter): untuk membuat fungsi baru.',
            'Jangan lupa kata kunci return untuk mengembalikan hasil perhitungan ke pemanggil fungsi.',
            'Jalankan kode untuk memverifikasi apakah konversi suhu akurat!'
          ],
          requirements: [
            {
              id: 'py-req-def-function',
              description: 'Mendefinisikan fungsi menggunakan kata kunci def dan return',
              validate: (code) => code.includes('def celsius_ke_fahrenheit') && code.includes('return ')
            },
            {
              id: 'py-req-def-output',
              description: 'Memanggil fungsi dan mencetak hasil konversi',
              validate: (_code, output) => Boolean(output && output.includes('86') && output.includes('°F'))
            }
          ],
          content: [
            {
              type: 'markdown',
              content: `### Prinsip DRY (Don't Repeat Yourself)

Daripada menulis rumus yang sama berulang-ulang, bungkuslah ke dalam sebuah **Function**.

\`\`\`python
def sapa_user(nama):
    return f"Halo {nama}, selamat belajar!"

pesan = sapa_user("Maya")
print(pesan)
\`\`\`

**Tugas Tantangan:**
Lengkapi fungsi \`celsius_ke_fahrenheit\` dan jalankan untuk mengonversi suhu secara instan!`
            }
          ]
        }
      ]
    },
    {
      id: 'py-mod-1-4',
      title: 'Modul 8: Penanganan Error (try - except)',
      description: 'Menjaga program agar tidak crash saat terjadi data anomali atau kesalahan input pengguna.',
      lessons: [
        {
          id: 'py-les-1-4-1',
          title: 'PROJECT LEVEL 1: Mini Database Nilai & Validator Kontak',
          type: 'project',
          language: 'python',
          xpReward: 65,
          starterPy: `# =========================================
# FINAL PROJECT LEVEL 1: CONTACT DIRECTORY
# =========================================

buku_telepon = {
    "Andi": "08123456789",
    "Budi": "08987654321",
    "Citra": "08112233445"
}

def cari_nomor(nama):
    try:
        # Coba ambil nomor dari dictionary
        nomor = buku_telepon[nama]
        return f"Kontak {nama}: {nomor}"
    except:
        return f"Peringatan: Kontak '{nama}' tidak ditemukan di sistem!"

# Test pencarian kontak yang ada dan yang tidak ada
print(cari_nomor("Andi"))
print(cari_nomor("Citra"))
print(cari_nomor("Zul"))  # Tidak ada di database
`,
          hints: [
            'Blok try akan mencoba mengeksekusi kode yang berpotensi error.',
            'Blok except akan menangkap error jika terjadi dan menjalankan rencana cadangan tanpa mematikan program.',
            'Jalankan program dan lihat bagaimana pencarian kontak yang hilang ditangani dengan anggun!'
          ],
          requirements: [
            {
              id: 'py-proj-try-except',
              description: 'Menggunakan blok try dan except untuk error handling',
              validate: (code) => code.includes('try:') && code.includes('except')
            },
            {
              id: 'py-proj-dict-lookup',
              description: 'Melakukan lookup dictionary dan mengembalikan respons yang sesuai',
              validate: (_code, output) => Boolean(output && output.includes('08123456789') && output.includes('tidak ditemukan'))
            }
          ],
          content: [
            {
              type: 'markdown',
              content: `### Proyek Akhir Level 1: Contact Directory & Safe Lookup

Aplikasi dunia nyata tidak boleh langsung crash saat pengguna mencari data yang tidak terdaftar.
Dengan **try-except**, programmu menjadi tangguh (resilient) dan siap digunakan di production!

Jalankan program untuk melihat penanganan pencarian kontak.`
            }
          ]
        }
      ]
    }
  ]
};
