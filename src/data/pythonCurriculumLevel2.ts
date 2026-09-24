import { CourseLevel } from '../types';

export const PYTHON_LEVEL_2: CourseLevel = {
  id: 'py-level-2',
  title: 'Level 2 — Beginner',
  description: 'Struktur folder proyek Python, modularisasi file (__init__.py, import), File I/O, dan pengorganisasian kode bersih.',
  modules: [
    {
      id: 'py-mod-2-1',
      title: 'Modul 9: Bagaimana Membuat Struktur Folder Proyek Python',
      description: 'Dari single-file script menuju proyek multi-file: anatomi folder standar, peran __init__.py, dan cara import antar modul.',
      lessons: [
        {
          id: 'py-les-2-1-1',
          title: 'LEARN: Anatomi & Standar Struktur Folder Proyek Python',
          type: 'learn',
          xpReward: 25,
          content: [
            {
              type: 'markdown',
              content: `### Bagaimana Cara Membuat Struktur Folder di Python?

Banyak pemula memulai dengan satu file \`script.py\` yang berisi ratusan baris kode. Seiring aplikasi bertambah besar, menaruh semua kode di satu file membuat kode sulit dibaca, sulit diuji, dan rawan bug.

Di dunia industri, kita memecah kode menjadi **Modul** (file \`.py\` tunggal) dan **Paket** (folder berisi modul-modul).

---

#### 1. Struktur Folder Standar untuk Pemula (Beginner Project)
Untuk proyek skala kecil hingga menengah (misal aplikasi kasir, scraper, atau bot):

\`\`\`text
proyek_pertamaku/
│
├── main.py              # Titik masuk utama program (Entry Point)
├── config.py            # Konfigurasi aplikasi (konstanta, pengaturan)
├── README.md            # Dokumentasi cara menjalankan program
│
├── utils/               # Folder fungsi bantuan (Package)
│   ├── __init__.py      # Menandai folder ini sebagai Python Package
│   ├── formatters.py    # Fungsi format teks, rupiah, tanggal
│   └── validators.py    # Fungsi validasi email, angka, input
│
└── data/                # File penyimpanan data
    ├── database.json    # File data lokal
    └── log.txt          # File log aktivitas
\`\`\`

---

#### 2. Apa Fungsi Sakral \`__init__.py\`?
File \`__init__.py\` (dua garis bawah sebelum dan sesudah kata *init*) adalah penanda resmi untuk Python runtime:
- **Memberitahu Python**: Folder ini bukan folder dokumen biasa, melainkan sebuah **Python Package** yang berisi modul-modul kode.
- **Memungkinkan Import**: Tanpa \`__init__.py\`, Python di beberapa versi atau lingkungan tidak akan mengenali folder tersebut saat kamu menulis \`from utils import formatters\`.
- File ini bisa dibiarkan **kosong** (0 byte) atau digunakan untuk mengekspos fungsi utama paket.

---

#### 3. Cara Meng-Import Antar File
Misalkan di dalam \`utils/formatters.py\` kamu memiliki:
\`\`\`python
# utils/formatters.py
def format_rupiah(angka):
    return f"Rp{angka:,.0f}".replace(",", ".")
\`\`\`

Di dalam \`main.py\` di root folder, kamu bisa memanggilnya dengan:
\`\`\`python
# main.py
from utils.formatters import format_rupiah

harga = 50000
print(format_rupiah(harga))  # Output: Rp50.000
\`\`\`

---

#### 4. Pola Sakral: \`if __name__ == '__main__':\`
Pernahkah kamu melihat kode ini di baris paling bawah file Python?
\`\`\`python
if __name__ == '__main__':
    main()
\`\`\`
**Mengapa ini penting?**
- Ketika kamu menjalankan file secara langsung (\`python main.py\`), variabel bawaan \`__name__\` bernilai \`'__main__'\`.
- Tetapi ketika file tersebut di-import oleh file lain (\`import main\`), variabel \`__name__\` berisi nama filenya (\`'main'\`).
- Membungkus eksekusi dalam \`if __name__ == '__main__':\` mencegah kode berjalan secara tidak sengaja ketika file hanya di-import sebagai pustaka fungsi!
`
            },
            {
              type: 'code-example',
              language: 'python',
              code: `# Contoh pola file modular Python
def sapa_pengguna(nama):
    return f"Halo {nama}, selamat datang di arsitektur modular!"

def main():
    pesan = sapa_pengguna("Budi")
    print(pesan)

# Titik eksekusi aman
if __name__ == '__main__':
    main()`
            }
          ]
        },
        {
          id: 'py-les-2-1-2',
          title: 'PRACTICE: Simulasi Modular Import & Namespacing',
          type: 'practice',
          language: 'python',
          xpReward: 35,
          starterPy: `# SIMULASI STRUKTUR FOLDER:
# project/
# ├── utils/
# │   └── helper.py    -> modul helper
# └── main.py          -> file yang sedang kita jalankan

# 1. Modul helper (simulasi isi file utils/helper.py)
class HelperModule:
    @staticmethod
    def format_rupiah(nominal):
        return f"Rp{nominal:,}".replace(",", ".")
    
    @staticmethod
    def hitung_pajak(nominal, persen=11):
        return nominal * (persen / 100)

# 2. File main.py: Menggunakan helper untuk transaksi
helper = HelperModule()

harga_barang = 250000
pajak = helper.hitung_pajak(harga_barang)
total = harga_barang + pajak

print("=== TRANSAKSI ELEKTRONIK ===")
print(f"Harga Barang: {helper.format_rupiah(harga_barang)}")
print(f"PPN (11%):    {helper.format_rupiah(pajak)}")
print(f"Total Bayar:  {helper.format_rupiah(total)}")
print("============================")
`,
          hints: [
            'Modularisasi memisahkan fungsi kalkulasi (helper) dari alur tampilan utama (main).',
            'Metode statis memungkinkan kita mengorganisir fungsi dalam namespace yang rapi.',
            'Klik Jalankan (Ctrl+Enter) untuk melihat bagaimana modul helper memformat nominal uang secara profesional.'
          ],
          requirements: [
            {
              id: 'py-req-modular-call',
              description: 'Memanggil fungsi helper untuk kalkulasi pajak dan format rupiah',
              validate: (code) => code.includes('hitung_pajak') && code.includes('format_rupiah')
            },
            {
              id: 'py-req-modular-out',
              description: 'Menghasilkan output struk transaksi yang terformat rapi',
              validate: (_code, output) => Boolean(output && output.includes('TRANSAKSI ELEKTRONIK') && output.includes('Rp250.000'))
            }
          ],
          content: [
            {
              type: 'markdown',
              content: `### Memisahkan Tanggung Jawab Kode (Separation of Concerns)

Latihan ini mensimulasikan pemisahan file antara modul utility (\`utils/helper.py\`) dan pengendali alur (\`main.py\`).

Perhatikan bagaimana logika perhitungan dipisahkan sehingga file \`main.py\` tetap bersih dan mudah dibaca!`
            }
          ]
        },
        {
          id: 'py-les-2-1-3',
          title: 'CHALLENGE: Desain Modul Validator & Config',
          type: 'challenge',
          language: 'python',
          xpReward: 40,
          starterPy: `# TANTANGAN: Bangun modul validator sederhana
# Aturan validasi email:
# 1. Harus mengandung karakter '@'
# 2. Harus mengandung karakter '.'
# 3. Panjang minimal 5 karakter

def validasi_email(email):
    # Tulis logika validasi di sini
    # Return True jika valid, False jika tidak valid
    if "@" in email and "." in email and len(email) >= 5:
        return True
    return False

# Pengujian
test_emails = ["user@mail.com", "salah-format", "admin@domain.id"]

for e in test_emails:
    status = "VALID" if validasi_email(e) else "TIDAK VALID"
    print(f"Email '{e}' -> {status}")
`,
          hints: [
            'Gunakan operator in untuk memeriksa apakah karakter ada di dalam string: "@" in email',
            'Gunakan len(email) untuk memeriksa panjang string.',
            'Jalankan untuk memvalidasi daftar email.'
          ],
          requirements: [
            {
              id: 'py-req-val-email',
              description: 'Fungsi validasi_email mengembalikan True untuk format benar dan False untuk salah',
              validate: (code) => code.includes('def validasi_email') && code.includes('@') && code.includes('.')
            },
            {
              id: 'py-req-val-output',
              description: 'Menampilkan hasil pengujian ketiga email ke terminal',
              validate: (_code, output) => Boolean(output && output.includes('user@mail.com') && output.includes('VALID'))
            }
          ],
          content: [
            {
              type: 'markdown',
              content: `### Tantangan: Modul Validator

Dalam folder \`utils/validators.py\`, fungsi-fungsi pemeriksaan input seperti validasi email, password, dan nomor telepon dikumpulkan.

Lengkapi logika fungsi \`validasi_email\` dan jalankan kode untuk memastikan hasilnya tepat!`
            }
          ]
        }
      ]
    },
    {
      id: 'py-mod-2-2',
      title: 'Modul 10: File I/O & Penanganan Berkas (Data Storage)',
      description: 'Membaca, menulis, dan memanipulasi file teks dan JSON secara aman dengan context manager (with open).',
      lessons: [
        {
          id: 'py-les-2-2-1',
          title: 'LEARN & PRACTICE: Operasi Berkas dengan with open()',
          type: 'practice',
          language: 'python',
          xpReward: 35,
          starterPy: `# Simulasi Penyimpanan Data Berkas (File I/O)
# Di Python, berkas dikelola dengan: with open("nama_file.txt", "w") as f:

# Contoh simulasi format penyimpanan teks berbasis baris
catatan_harian = [
    "[2026-09-17] Memulai kurikulum Python Level 2",
    "[2026-09-17] Memahami struktur folder dan package",
    "[2026-09-17] Berhasil membuat modul helper pertama"
]

print("=== SIMULASI MENULIS KE FILE (storage/logs.txt) ===")
# Menggabungkan data menjadi teks berkas
isi_file = "\\n".join(catatan_harian)
print(f"Total karakter yang disimpan: {len(isi_file)} byte")

print("\\n=== SIMULASI MEMBACA DARI FILE ===")
baris_terbaca = isi_file.split("\\n")
for index, baris in enumerate(baris_terbaca, 1):
    print(f"{index}. {baris}")
`,
          hints: [
            'Pernyataan with open(...) otomatis menutup file setelah selesai, mencegah kebocoran memori (memory leak).',
            'Mode "w" digunakan untuk menulis (write), mode "r" untuk membaca (read), dan mode "a" untuk menambahkan di akhir (append).'
          ],
          requirements: [
            {
              id: 'py-req-file-io',
              description: 'Memproses teks catatan dan menampilkan baris terformat',
              validate: (_code, output) => Boolean(output && output.includes('SIMULASI MENULIS') && output.includes('Level 2'))
            }
          ],
          content: [
            {
              type: 'markdown',
              content: `### Bekerja dengan Berkas (Files) di Python

Untuk menyimpan data secara permanen di komputer pengguna atau server, kita menggunakan operasi File I/O.

\`\`\`python
# Menulis ke file
with open("data/catatan.txt", "w", encoding="utf-8") as file:
    file.write("Halo dari Python!\\n")

# Membaca dari file
with open("data/catatan.txt", "r", encoding="utf-8") as file:
    konten = file.read()
    print(konten)
\`\`\`

**Aturan Emas:** Selalu gunakan pernyataan \`with\` karena Python akan otomatis menutup berkas sekalipun terjadi error di tengah proses!`
            }
          ]
        }
      ]
    },
    {
      id: 'py-mod-2-3',
      title: 'Modul 11: Kuis & Proyek Mini Level 2 (Modular App)',
      description: 'Uji pemahaman tentang struktur folder, import, dan modul Python.',
      lessons: [
        {
          id: 'py-les-2-3-1',
          title: 'QUIZ: Struktur Folder & Modul Python',
          type: 'quiz',
          xpReward: 35,
          questions: [
            {
              id: 'q-2-1',
              question: 'Apa fungsi utama dari file __init__.py di dalam sebuah folder Python?',
              options: [
                'Untuk menginstall dependensi dari internet',
                'Menandai folder tersebut sebagai Python Package agar modul di dalamnya bisa di-import',
                'Mengunci folder agar tidak bisa diubah',
                'Menghapus cache komputer'
              ],
              correctAnswerIndex: 1,
              explanation: '__init__.py menandai sebuah direktori sebagai Python package sehingga Python dapat mengenali dan meng-import modul-modul di dalamnya.'
            },
            {
              id: 'q-2-2',
              question: 'Mengapa baris "if __name__ == \'__main__\':" sangat dianjurkan di file utama?',
              options: [
                'Agar program bisa berjalan lebih cepat',
                'Mencegah kode utama dieksekusi tanpa sengaja saat file di-import sebagai modul oleh file lain',
                'Wajib ditulis karena aturan compiler',
                'Untuk menyembunyikan kode dari user'
              ],
              correctAnswerIndex: 1,
              explanation: 'Kode di dalam if __name__ == "__main__": hanya akan dijalankan jika file tersebut dieksekusi langsung, bukan saat di-import modul lain.'
            },
            {
              id: 'q-2-3',
              question: 'Di mana biasanya file konfigurasi atau konstanta disimpan dalam struktur folder proyek?',
              options: [
                'Di file config.py atau folder config/',
                'Di dalam recycle bin',
                'Di folder __pycache__',
                'Di nama file main.exe'
              ],
              correctAnswerIndex: 0,
              explanation: 'Standar industri meletakkan konfigurasi di file config.py atau direktori config/ agar mudah dimodifikasi di satu tempat terpusat.'
            }
          ]
        }
      ]
    }
  ]
};

export const PYTHON_LEVEL_3: CourseLevel = {
  id: 'py-level-3',
  title: 'Level 3 — Intermediate',
  description: 'Object-Oriented Programming (Class, Object, Inheritance, Encapsulation), Comprehensions, dan Lambda.',
  modules: [
    {
      id: 'py-mod-3-1',
      title: 'Modul 12: Object-Oriented Programming (OOP) Mendalam',
      description: 'Membangun cetak biru data, konstruktor __init__, enkapsulasi, dan pewarisan (inheritance).',
      lessons: [
        {
          id: 'py-les-3-1-1',
          title: 'LEARN: Blueprint Class & Enkapsulasi Atribut',
          type: 'learn',
          xpReward: 30,
          content: [
            {
              type: 'markdown',
              content: `### Mengapa Butuh Object-Oriented Programming (OOP)?

Dalam aplikasi berskala besar, data dan fungsi yang memanipulasinya harus disatukan agar tidak tercecer di mana-mana.
Konsep ini disebut **Class (Cetak Biru)** dan **Object (Wujud Nyata)**.

\`\`\`
   [ CLASS: Mobil ]  ──(dibuat jadi)──>  [ OBJECT: mobil_avanza ]
   - Atribut: merk, warna                 - merk: "Toyota", warna: "Hitam"
   - Method: klakson(), jalan()           - aksi: membunyikan klakson
\`\`\`

#### 4 Pilar Utama OOP:
1. **Encapsulation**: Membungkus data dan method dalam satu wadah, serta melindungi data penting dari modifikasi sembarangan.
2. **Inheritance (Pewarisan)**: Membuat class anak yang mewarisi sifat class induk tanpa menulis ulang kode.
3. **Polymorphism**: Satu method yang memiliki implementasi berbeda pada class yang berbeda.
4. **Abstraction**: Menyembunyikan kompleksitas internal dan hanya menampilkan antarmuka yang penting.
`
            },
            {
              type: 'code-example',
              language: 'python',
              code: `class Kendaraan:
    def __init__(self, merk, jenis):
        self.merk = merk
        self.jenis = jenis

    def info(self):
        return f"{self.jenis} merk {self.merk}"

# Inheritance (Pewarisan)
class Mobil(Kendaraan):
    def __init__(self, merk, jumlah_pintu=4):
        super().__init__(merk, "Mobil")
        self.jumlah_pintu = jumlah_pintu

mobil_saya = Mobil("Honda", 4)
print(mobil_saya.info())`
            }
          ]
        },
        {
          id: 'py-les-3-1-2',
          title: 'PRACTICE: Sistem Manajemen Rekening Bank Berbasis OOP',
          type: 'practice',
          language: 'python',
          xpReward: 40,
          starterPy: `# Sistem Rekening Bank OOP dengan Enkapsulasi
class RekeningBank:
    def __init__(self, nomor_rekening, nama_nasabah, saldo_awal=0):
        self.no_rek = nomor_rekening
        self.nasabah = nama_nasabah
        self._saldo = saldo_awal  # Atribut privat terenkapsulasi

    def cek_saldo(self):
        return self._saldo

    def setor(self, jumlah):
        if jumlah > 0:
            self._saldo = self._saldo + jumlah
            return f"Setor Rp{jumlah:,} sukses. Saldo: Rp{self._saldo:,}"
        return "Jumlah setor harus positif!"

    def tarik(self, jumlah):
        if jumlah > self._saldo:
            return "Gagal: Saldo tidak mencukupi!"
        self._saldo = self._saldo - jumlah
        return f"Tarik Rp{jumlah:,} sukses. Sisa saldo: Rp{self._saldo:,}"

# Uji coba sistem
akun = RekeningBank("102-304-500", "Ahmad Fauzi", 500000)
print(f"Nasabah: {akun.nasabah} (Rek: {akun.no_rek})")
print(akun.setor(250000))
print(akun.tarik(100000))
print(f"Saldo Akhir: Rp{akun.cek_saldo():,}")
`,
          hints: [
            'Gunakan kata kunci self untuk mengakses atribut dan method milik objek itu sendiri.',
            'Awalan garis bawah seperti self._saldo menandakan atribut bersifat internal (protected).',
            'Jalankan kode untuk menguji transaksi perbankan.'
          ],
          requirements: [
            {
              id: 'py-req-bank-oop',
              description: 'Membuat class RekeningBank dengan method setor, tarik, dan cek_saldo',
              validate: (code) => code.includes('class RekeningBank') && code.includes('def setor') && code.includes('def tarik')
            },
            {
              id: 'py-req-bank-out',
              description: 'Menghasilkan saldo akhir Rp650,000 pada output',
              validate: (_code, output) => Boolean(output && (output.includes('650,000') || output.includes('650000')))
            }
          ],
          content: [
            {
              type: 'markdown',
              content: `### Latihan Praktik: Sistem Perbankan Terenkapsulasi

Terapkan prinsip OOP untuk membuat sistem pengelolaan rekening bank yang aman dari perubahan saldo sembarangan.

Jalankan kode di editor untuk mengamati alur penyetoran dan penarikan saldo!`
            }
          ]
        }
      ]
    },
    {
      id: 'py-mod-3-2',
      title: 'Modul 13: Functional Tools & List Comprehensions',
      description: 'Menulis kode Pythonic yang ringkas, ekspresif, dan efisien dengan list/dict comprehensions.',
      lessons: [
        {
          id: 'py-les-3-2-1',
          title: 'CHALLENGE: Transformasi & Filter Data Nilai Siswa',
          type: 'challenge',
          language: 'python',
          xpReward: 45,
          starterPy: `# Filter dan transformasi data siswa
data_siswa = [
    {"nama": "Dewi", "nilai": 85},
    {"nama": "Rizky", "nilai": 55},
    {"nama": "Sarah", "nilai": 92},
    {"nama": "Bima", "nilai": 60},
    {"nama": "Tasya", "nilai": 78}
]

# TANTANGAN:
# 1. Gunakan List Comprehension untuk mengambil nama siswa yang LULUS (nilai >= 70)
siswa_lulus = [s["nama"] for s in data_siswa if s["nilai"] >= 70]

# 2. Gunakan List Comprehension untuk mengonversi semua nama siswa lulus menjadi HURUF BESAR
nama_kapital = [nama.upper() for nama in siswa_lulus]

print("=== DAFTAR SISWA LULUS ===")
for nama in nama_kapital:
    print(f"✓ {nama}")
print(f"Total yang lulus: {len(nama_kapital)} siswa")
`,
          hints: [
            'Sintaks List Comprehension: [rumus for item in iterable if kondisi]',
            'Method .upper() mengubah string menjadi huruf kapital.',
            'Jalankan untuk memvalidasi siswa yang lulus (Dewi, Sarah, Tasya).'
          ],
          requirements: [
            {
              id: 'py-req-comp-syntax',
              description: 'Menggunakan list comprehension untuk memfilter nilai >= 70',
              validate: (code) => code.includes('[') && code.includes('for ') && code.includes('>= 70')
            },
            {
              id: 'py-req-comp-out',
              description: 'Menampilkan nama siswa lulus dalam huruf kapital (DEWI, SARAH, TASYA)',
              validate: (_code, output) => Boolean(output && output.includes('DEWI') && output.includes('SARAH') && output.includes('TASYA'))
            }
          ],
          content: [
            {
              type: 'markdown',
              content: `### Menulis Kode Pythonic dengan List Comprehension

List comprehension adalah salah satu fitur paling dicintai di Python karena membuat kode transformasi data menjadi sangat ringkas dan berkecepatan tinggi.

Selesaikan tantangan di editor dan periksa outputnya!`
            }
          ]
        }
      ]
    }
  ]
};
