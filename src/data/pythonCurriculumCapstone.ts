import { CourseLevel } from '../types';

export const PYTHON_LEVEL_6: CourseLevel = {
  id: 'py-level-6',
  title: 'Level 6 — Project',
  description: 'Implementasi proyek nyata berskala penuh: Data Pipeline ETL, Server Monitoring, dan Mesin Rekomendasi E-Commerce.',
  modules: [
    {
      id: 'py-mod-6-1',
      title: 'Modul 18: Project 1 — Automated Data Pipeline & Server Log Analyzer (ETL)',
      description: 'Membangun pipeline Extract-Transform-Load (ETL) otomatis untuk menganalisis data lalu lintas dan stabilitas server.',
      lessons: [
        {
          id: 'py-les-6-1-1',
          title: 'CAPSTONE PROJECT 1: Server Log ETL & Anomaly Detector',
          type: 'project',
          language: 'python',
          xpReward: 80,
          starterPy: `# =======================================================
# CAPSTONE PROJECT 1: AUTOMATED SERVER LOG ETL PIPELINE
# =======================================================
# Skenario:
# Sebagai DevOps/Backend Engineer, kamu diminta mengolah data
# log server mentah untuk menghitung uptime dan mendeteksi anomali.

raw_logs = [
    {"ip": "192.168.1.10", "endpoint": "/api/v1/auth", "status": 200, "ms": 45},
    {"ip": "192.168.1.12", "endpoint": "/api/v1/checkout", "status": 500, "ms": 820},
    {"ip": "10.0.0.5", "endpoint": "/api/v1/products", "status": 200, "ms": 30},
    {"ip": "192.168.1.10", "endpoint": "/api/v1/dashboard", "status": 200, "ms": 65},
    {"ip": "172.16.0.4", "endpoint": "/api/v1/checkout", "status": 404, "ms": 12},
    {"ip": "10.0.0.9", "endpoint": "/api/v1/payment", "status": 503, "ms": 1200},
    {"ip": "192.168.1.10", "endpoint": "/api/v1/profile", "status": 200, "ms": 25}
]

# 1. EXTRACT & TRANSFORM: Hitung metrik kesehatan sistem
total_req = len(raw_logs)
sukses_req = [log for log in raw_logs if 200 <= log["status"] < 300]
error_req = [log for log in raw_logs if log["status"] >= 400]

# 2. DETEKSI ANOMALI: Request yang lambat (ms > 500)
slow_queries = [log for log in raw_logs if log["ms"] > 500]

uptime_percentage = (len(sukses_req) / total_req) * 100

# 3. LOAD / REPORTING: Format laporan eksekutif
print("==================================================")
print("       LAPORAN KESEHATAN INFRASTRUKTUR SERVER     ")
print("==================================================")
print(f"Total Traffic Masuk : {total_req} requests")
print(f"Permintaan Berhasil : {len(sukses_req)} (HTTP 2xx)")
print(f"Permintaan Gagal    : {len(error_req)} (HTTP 4xx / 5xx)")
print(f"Tingkat Keberhasilan: {uptime_percentage:.1f}%")
print("--------------------------------------------------")
print(f"[PERINGATAN] Terdeteksi {len(slow_queries)} query lambat (>500ms):")
for sq in slow_queries:
    print(f" - {sq['endpoint']} ({sq['ms']}ms) dari IP {sq['ip']}")
print("==================================================")
`,
          hints: [
            'ETL adalah singkatan dari Extract, Transform, Load — pilar utama data engineering.',
            'Gunakan List Comprehension untuk memfilter status HTTP dan latency query.',
            'Jalankan pipeline untuk menghasilkan laporan monitoring server otomatis!'
          ],
          requirements: [
            {
              id: 'py-req-etl-calc',
              description: 'Menghitung total, sukses, error, dan query lambat',
              validate: (code) => code.includes('total_req') && code.includes('slow_queries') && code.includes('uptime_percentage')
            },
            {
              id: 'py-req-etl-output',
              description: 'Mencetak laporan eksekutif server monitoring dengan tingkat keberhasilan terformat',
              validate: (_code, output) => Boolean(output && output.includes('LAPORAN KESEHATAN INFRASTRUKTUR') && output.includes('query lambat'))
            }
          ],
          content: [
            {
              type: 'markdown',
              content: `### Proyek Nyata: Pipeline Monitoring Log Server

Dalam lingkungan cloud modern, kemampuan memproses ribuan data log secara otomatis adalah keahlian yang sangat dicari.

Jalankan skrip ETL di editor untuk mengolah data dan mendeteksi anomali server secara real-time!`
            }
          ]
        }
      ]
    },
    {
      id: 'py-mod-6-2',
      title: 'Modul 19: Project 2 — Mesin Rekomendasi & Inventaris E-Commerce',
      description: 'Membangun mesin cerdas pencocokan produk berdasarkan preferensi pelanggan dan ketersediaan stok.',
      lessons: [
        {
          id: 'py-les-6-2-1',
          title: 'CAPSTONE PROJECT 2: Recommendation Engine & Smart Inventory',
          type: 'project',
          language: 'python',
          xpReward: 90,
          starterPy: `# ========================================================
# CAPSTONE PROJECT 2: E-COMMERCE RECOMMENDATION ENGINE
# ========================================================

katalog = [
    {"id": 101, "nama": "Laptop Gaming Pro", "kategori": "komputer", "harga": 16500000, "rating": 4.9, "stok": 12},
    {"id": 102, "nama": "Mechanical Keyboard RGB", "kategori": "aksesoris", "harga": 850000, "rating": 4.8, "stok": 45},
    {"id": 103, "nama": "Monitor Ultrawide 34-inch", "kategori": "komputer", "harga": 5200000, "rating": 4.7, "stok": 8},
    {"id": 104, "nama": "Mouse Ergonomis Wireless", "kategori": "aksesoris", "harga": 320000, "rating": 4.5, "stok": 0},
    {"id": 105, "nama": "Headset Noise Cancelling", "kategori": "audio", "harga": 1450000, "rating": 4.9, "stok": 20}
]

def cari_rekomendasi(kategori, max_budget=None, min_rating=4.6):
    hasil = []
    for item in katalog:
        # Syarat: Kategori cocok, stok tersedia (>0), rating tinggi
        if item["kategori"] == kategori and item["stok"] > 0 and item["rating"] >= min_rating:
            if max_budget is None or item["harga"] <= max_budget:
                hasil.append(item)
    return hasil

# Uji Rekomendasi
rekomendasi_komputer = cari_rekomendasi("komputer")

print("=== REKOMENDASI PRODUK UNGGULAN (STOK TERSEDIA) ===")
for r in rekomendasi_komputer:
    print(f"★ {r['nama']} (Rating: {r['rating']} | Stok: {r['stok']} unit) - Rp{r['harga']:,}")
print("====================================================")
`,
          hints: [
            'Filter mengecek kategori, ketersediaan stok > 0, dan batasan budget.',
            'Item dengan stok 0 (habis) otomatis disaring agar tidak mengecewakan pembeli.',
            'Jalankan kode untuk melihat rekomendasi produk yang tersedia.'
          ],
          requirements: [
            {
              id: 'py-req-rec-engine',
              description: 'Membuat fungsi rekomendasi dengan filter kategori, stok > 0, dan rating',
              validate: (code) => code.includes('def cari_rekomendasi') && code.includes('stok') && code.includes('rating')
            },
            {
              id: 'py-req-rec-output',
              description: 'Menampilkan daftar produk unggulan rekomendasi pada terminal',
              validate: (_code, output) => Boolean(output && output.includes('REKOMENDASI PRODUK UNGGULAN') && output.includes('Laptop Gaming Pro'))
            }
          ],
          content: [
            {
              type: 'markdown',
              content: `### Proyek Nyata: Sistem Rekomendasi Cerdas

Algoritma pencocokan katalog produk adalah tulang punggung platform seperti Tokopedia, Shopee, dan Amazon.

Jalankan program di sebelah kanan untuk melihat hasil rekomendasi berbasis aturan bisnis!`
            }
          ]
        }
      ]
    }
  ]
};

export const PYTHON_LEVEL_7: CourseLevel = {
  id: 'py-level-7',
  title: 'Level 7 — Assessment',
  description: 'Evaluasi akhir komprehensif: Ujian teori logika pemrograman, tantangan live coding mandiri, dan sertifikasi kelulusan.',
  modules: [
    {
      id: 'py-mod-7-1',
      title: 'Modul 20: Comprehensive Knowledge Assessment (Ujian Teori)',
      description: 'Ujian komprehensif menguji penguasaan materi dari Level 0 hingga Level 5 (sintaks, struktur folder, OOP, dan error handling).',
      lessons: [
        {
          id: 'py-les-7-1-1',
          title: 'ASSESSMENT QUIZ: Evaluasi Teori Python Software Engineer',
          type: 'quiz',
          xpReward: 50,
          questions: [
            {
              id: 'q-7-1',
              question: 'Dalam struktur proyek standar industri (src-layout), di folder manakah aturan logika bisnis (business logic) biasanya diletakkan?',
              options: [
                'Di folder public/ atau assets/',
                'Di folder services/ atau core/',
                'Di folder .git/',
                'Di dalam file .gitignore'
              ],
              correctAnswerIndex: 1,
              explanation: 'Dalam arsitektur berlapis (layered architecture), aturan dan logika bisnis aplikasi ditempatkan di dalam layer services/ agar independen dari tampilan dan infrastruktur.'
            },
            {
              id: 'q-7-2',
              question: 'Apa peran file __init__.py di dalam subfolder proyek Python?',
              options: [
                'Menghapus file yang tidak terpakai saat build',
                'Menandai direktori tersebut sebagai Python Package agar modul di dalamnya dapat di-import',
                'Mempercepat kecepatan internet komputer',
                'Mengubah kode Python menjadi file biner .exe'
              ],
              correctAnswerIndex: 1,
              explanation: '__init__.py memberitahu Python interpreter bahwa folder tersebut adalah package yang dapat di-import modul-modulnya.'
            },
            {
              id: 'q-7-3',
              question: 'Manakah cara yang benar untuk mendefinisikan type hinting pada fungsi Python modern (PEP 484)?',
              options: [
                'def hitung(angka as int): return string',
                'def hitung(angka: int) -> str: pass',
                'function hitung(int angka): String',
                'def hitung(int: angka) => str:'
              ],
              correctAnswerIndex: 1,
              explanation: 'Standar Python PEP 484 menggunakan format "parameter: tipe" dan "-> tipe_kembalian:".'
            },
            {
              id: 'q-7-4',
              question: 'Di antara pilihan berikut, manakah struktur perulangan yang menghasilkan list baru secara efisien dalam satu baris (Pythonic)?',
              options: [
                'List Comprehension: [x * 2 for x in data if x > 0]',
                'Goto loop: goto line 10',
                'Recursive print loop',
                'Infinite while statement'
              ],
              correctAnswerIndex: 0,
              explanation: 'List comprehension adalah sintaks resmi Python untuk mentransformasi dan memfilter iterable secara ringkas dan berkecepatan tinggi.'
            },
            {
              id: 'q-7-5',
              question: 'Mengapa file .env tidak boleh di-commit ke repositori publik seperti GitHub?',
              options: [
                'Karena file .env membuat ukuran repositori menjadi terlalu berat',
                'Karena file .env berisi rahasia sensitif seperti API key, kata sandi database, dan kredensial server',
                'Karena Python tidak bisa membaca file berawalan titik',
                'Karena file .env hanya bisa dibaca oleh sistem operasi Windows'
              ],
              correctAnswerIndex: 1,
              explanation: '.env menyimpan kredensial rahasia. Mempublikasikannya ke Git dapat membahayakan keamanan sistem server produksi.'
            }
          ]
        }
      ]
    },
    {
      id: 'py-mod-7-2',
      title: 'Modul 21: Live Coding Technical Assessment (Ujian Praktik)',
      description: 'Ujian live coding mandiri tanpa template awal: membangun sistem kalkulasi inventaris dan analitik terpadu.',
      lessons: [
        {
          id: 'py-les-7-2-1',
          title: 'FINAL LIVE CODING: Algoritma Pengolahan Data & Statistik Inventaris',
          type: 'challenge',
          language: 'python',
          xpReward: 100,
          starterPy: `# =======================================================
# FINAL TECHNICAL ASSESSMENT: INVENTORY ANALYTICS ENGINE
# =======================================================
# Tugas Ujian:
# Implementasikan fungsi 'analisis_inventaris(data_barang)'
# yang mengembalikan dictionary laporan dengan metrik:
# 1. "total_item": Jumlah macam barang di daftar
# 2. "total_nilai_aset": Jumlah akumulasi (harga * stok) seluruh barang
# 3. "barang_termahal": Nama barang dengan harga satuan tertinggi

data_gudang = [
    {"nama": "Monitor 4K", "harga": 5000000, "stok": 10},
    {"nama": "Keyboard Mekanikal", "harga": 800000, "stok": 25},
    {"nama": "Laptop Workstation", "harga": 22000000, "stok": 5},
    {"nama": "Mouse Bluetooth", "harga": 250000, "stok": 40}
]

def analisis_inventaris(barang_list):
    total_item = len(barang_list)
    total_aset = sum(item["harga"] * item["stok"] for item in barang_list)
    
    # Cari barang dengan harga tertinggi
    termahal = max(barang_list, key=lambda x: x["harga"])["nama"]
    
    laporan = {
        "total_item": total_item,
        "total_nilai_aset": total_aset,
        "barang_termahal": termahal
    }
    return laporan

# Jalankan pengujian
hasil = analisis_inventaris(data_gudang)

print("=== LAPORAN AUDIT ASET PERUSAHAAN ===")
print(f"Total Jenis Barang : {hasil['total_item']}")
print(f"Total Nilai Aset   : Rp{hasil['total_nilai_aset']:,}")
print(f"Barang Termahal    : {hasil['barang_termahal']}")
print("=====================================")
`,
          hints: [
            'Total aset adalah akumulasi dari (harga * stok) setiap barang.',
            'Gunakan fungsi built-in max(list, key=lambda x: x["harga"]) untuk menemukan barang termahal.',
            'Jalankan kode untuk memverifikasi bahwa total nilai aset mencapai Rp190,000,000.'
          ],
          requirements: [
            {
              id: 'py-req-final-fn',
              description: 'Mendefinisikan fungsi analisis_inventaris yang mengembalikan dictionary laporan',
              validate: (code) => code.includes('def analisis_inventaris') && code.includes('total_nilai_aset')
            },
            {
              id: 'py-req-final-out',
              description: 'Menghasilkan kalkulasi total nilai aset Rp190,000,000 dan mendeteksi Laptop Workstation',
              validate: (_code, output) => Boolean(output && (output.includes('190,000,000') || output.includes('190000000')) && output.includes('Laptop Workstation'))
            }
          ],
          content: [
            {
              type: 'markdown',
              content: `### Ujian Akhir Praktik: Inventory Analytics Engine

Selamat atas perjalanan belajarmu dari **Level 0 (Absolute Beginner)** hingga tahap **Level 7 (Assessment)**!

Selesaikan tantangan analitik inventaris ini untuk membuktikan kemampuan pemecahan masalah (problem-solving) dan pemahaman algoritma Python-mu.

Klik tombol **Jalankan** untuk menguji sistem analitikmu!`
            }
          ]
        },
        {
          id: 'py-les-7-2-2',
          title: 'CERTIFICATION: Panduan Portofolio GitHub & Kelulusan',
          type: 'learn',
          xpReward: 50,
          content: [
            {
              type: 'markdown',
              content: `### Selamat, Kamu Telah Menyelesaikan Kurikulum Python Lengkap!

Kamu telah melewati 8 jenjang progresi terstruktur:
- **Level 0 (Absolute Beginner)**: Mental model komputasi, variabel, conditionals, dan perulangan dasar.
- **Level 1 (Fundamental)**: List, Tuple, Dictionary, fungsi modular, dan penanganan error.
- **Level 2 (Beginner)**: Pembuatan struktur folder proyek, \`__init__.py\`, modul import, dan File I/O.
- **Level 3 (Intermediate)**: Pemrograman Berorientasi Objek (OOP), class, enkapsulasi, dan list comprehensions.
- **Level 4 (Advanced)**: Decorators, magic dunder methods, dan type hinting enterprise (PEP 484).
- **Level 5 (Professional)**: Standar arsitektur industri (\`src-layout\`), virtual environment, dan REST API.
- **Level 6 (Project)**: Dua capstone project nyata (Server Log ETL Pipeline & E-Commerce Recommendation Engine).
- **Level 7 (Assessment)**: Evaluasi teori komprehensif dan live coding technical challenge.

---

#### Langkah Selanjutnya: Publikasikan Portofoliomu ke GitHub
1. Buat repositori baru di GitHub dengan nama \`python-mastery-portfolio\`.
2. Gunakan struktur folder standar industri yang sudah kamu pelajari:
   \`\`\`text
   python-portfolio/
   ├── src/
   │   └── my_project/
   ├── tests/
   ├── requirements.txt
   ├── .gitignore
   └── README.md
   \`\`\`
3. Tambahkan dokumentasi penjelasan proyek dan tangkapan layar hasil eksekusi terminal.
4. Tautkan portofoliomu di profil LinkedIn atau resume CV lamaran kerjamu!
`
            }
          ]
        }
      ]
    }
  ]
};
