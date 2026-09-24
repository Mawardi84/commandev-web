import { CourseLevel } from '../types';

export const PYTHON_LEVEL_4: CourseLevel = {
  id: 'py-level-4',
  title: 'Level 4 — Advanced',
  description: 'Decorators, Magic Dunder Methods, Type Hinting standar PEP 484, dan arsitektur kode enterprise.',
  modules: [
    {
      id: 'py-mod-4-1',
      title: 'Modul 14: Decorators & Magic Dunder Methods',
      description: 'Memodifikasi perilaku fungsi secara dinamis tanpa mengubah kodenya, serta dunder methods (__str__, __len__, __repr__).',
      lessons: [
        {
          id: 'py-les-4-1-1',
          title: 'LEARN & PRACTICE: Membuat Function Decorator Kustom',
          type: 'practice',
          language: 'python',
          xpReward: 45,
          starterPy: `# Memahami Decorator: Fungsi yang menerima fungsi lain sebagai argumen
def log_eksekusi(fungsi):
    def pembungkus(*args, **kwargs):
        print(f"[LOG] Memulai eksekusi fungsi: '{fungsi.__name__}'")
        hasil = fungsi(*args, **kwargs)
        print(f"[LOG] Selesai eksekusi: '{fungsi.__name__}' -> Hasil: {hasil}")
        return hasil
    return pembungkus

# Menggunakan decorator dengan simbol @
@log_eksekusi
def hitung_diskon(harga, persen=10):
    return harga - (harga * (persen / 100))

@log_eksekusi
def gabung_nama(depan, belakang):
    return f"{depan} {belakang}"

# Menjalankan fungsi yang telah di-decorate
h_akhir = hitung_diskon(100000, 20)
nama = gabung_nama("Ahmad", "Dahlan")
`,
          hints: [
            'Decorator diawali dengan tanda @ di atas definisi fungsi.',
            '*args dan **kwargs memungkinkan fungsi pembungkus menerima argumen apapun secara dinamis.',
            'Jalankan kode untuk melihat bagaimana log dicetak otomatis sebelum dan sesudah fungsi dijalankan!'
          ],
          requirements: [
            {
              id: 'py-req-dec-usage',
              description: 'Mendefinisikan dan menggunakan decorator log_eksekusi dengan sintaks @',
              validate: (code) => code.includes('@log_eksekusi') && code.includes('def pembungkus')
            },
            {
              id: 'py-req-dec-output',
              description: 'Menghasilkan log eksekusi otomatis pada output terminal',
              validate: (_code, output) => Boolean(output && output.includes('[LOG] Memulai') && output.includes('80000'))
            }
          ],
          content: [
            {
              type: 'markdown',
              content: `### Apa itu Decorator di Python?

Decorator adalah salah satu fitur paling canggih di Python. Decorator memungkinkan kamu menyisipkan fungsionalitas tambahan (seperti logging, pengukur waktu, pengecekan hak akses, autentikasi) ke banyak fungsi tanpa menduplikasi kode.

Jalankan kode di sebelah kanan untuk melihat decorator beraksi!`
            }
          ]
        }
      ]
    },
    {
      id: 'py-mod-4-2',
      title: 'Modul 15: Type Hinting (PEP 484) & Clean Architecture',
      description: 'Menulis kode Python berskala industri yang terverifikasi tipe data, mudah dirawat tim besar, dan bebas bug runtime.',
      lessons: [
        {
          id: 'py-les-4-2-1',
          title: 'CHALLENGE: Type Hints & Pipeline Pemrosesan Data',
          type: 'challenge',
          language: 'python',
          xpReward: 50,
          starterPy: `# Python Modern Skala Enterprise dengan Type Hinting (PEP 484)
from typing import List, Dict, Optional

class UserDTO:
    def __init__(self, username: str, email: str, role: str = "member"):
        self.username: str = username
        self.email: str = email
        self.role: str = role

def format_user_summary(user: UserDTO) -> str:
    return f"[{user.role.upper()}] @{user.username} <{user.email}>"

# Pengujian
pengguna = UserDTO("adit_dev", "adit@company.id", "lead_engineer")
hasil = format_user_summary(pengguna)
print(hasil)
`,
          hints: [
            'Gunakan tanda titik dua : tipe_data setelah nama parameter.',
            'Gunakan tanda panah -> tipe_kembalian sebelum titik dua pada def fungsi.',
            'Jalankan untuk melihat format ringkasan profil user.'
          ],
          requirements: [
            {
              id: 'py-req-typehints',
              description: 'Menerapkan type hinting pada parameter dan return type',
              validate: (code) => code.includes(': str') && code.includes('-> str')
            },
            {
              id: 'py-req-typehints-output',
              description: 'Mencetak data user terformat dengan role huruf kapital',
              validate: (_code, output) => Boolean(output && output.includes('LEAD_ENGINEER') && output.includes('adit_dev'))
            }
          ],
          content: [
            {
              type: 'markdown',
              content: `### Type Hinting untuk Standard Enterprise

Di tim software engineering modern, ribuan baris kode Python dikelola dengan bantuan **Type Hints** agar IDE dan linter (seperti MyPy) dapat mendeteksi kesalahan sebelum kode dirilis ke server produksi.`
            }
          ]
        }
      ]
    }
  ]
};

export const PYTHON_LEVEL_5: CourseLevel = {
  id: 'py-level-5',
  title: 'Level 5 — Professional',
  description: 'Struktur folder produksi industri (src layout, venv, requirements.txt, pyproject.toml), REST API, dan arsitektur backend modular.',
  modules: [
    {
      id: 'py-mod-5-1',
      title: 'Modul 16: Standar Struktur Folder Industri (Enterprise / Production Layout)',
      description: 'Bagaimana engineer profesional menyusun folder proyek skala besar, memisahkan environment, config, source code, dan automated tests.',
      lessons: [
        {
          id: 'py-les-5-1-1',
          title: 'LEARN: Anatomi Struktur Folder Standar Industri (src-layout)',
          type: 'learn',
          xpReward: 35,
          content: [
            {
              type: 'markdown',
              content: `### Standar Struktur Folder Python di Tingkat Industri

Ketika kamu bekerja di startup teknologi atau perusahaan software terkemuka, kamu tidak lagi meletakkan semua file di folder root. Komunitas resmi Python (PyPA) merekomendasikan pola **\`src-layout\`** (layout berbasis folder \`src/\`).

---

#### Struktur Folder Lengkap Proyek Produksi (Professional Enterprise Layout):

\`\`\`text
my_python_project/
│
├── .venv/                      # Virtual Environment lokal (di-ignore oleh git)
├── .env                        # Rahasia & API Key (JANGAN PERNAH di-commit ke Git!)
├── .env.example                # Template contoh variabel lingkungan
├── .gitignore                  # Berkas pengecualian Git (__pycache__, .venv, dll)
├── README.md                   # Dokumentasi lengkap proyek
├── requirements.txt            # Daftar library & versi dependensi (pip)
├── pyproject.toml              # Konfigurasi build tool modern & metadata proyek
│
├── src/                        # [UTAMA] Semua kode aplikasi berada di sini
│   └── my_app/                 # Nama package aplikasi
│       ├── __init__.py         # Inisialisasi package utama
│       ├── main.py             # Entrypoint utama eksekusi
│       │
│       ├── core/               # Konfigurasi inti dan koneksi database
│       │   ├── __init__.py
│       │   ├── config.py       # Pydantic Settings / Environment loader
│       │   └── database.py     # Connection pool / Session manager
│       │
│       ├── models/             # Definisi skema data & tabel database
│       │   ├── __init__.py
│       │   ├── user.py
│       │   └── product.py
│       │
│       ├── services/           # Business Logic murni (logika bisnis aplikasi)
│       │   ├── __init__.py
│       │   ├── auth_service.py
│       │   └── payment_service.py
│       │
│       └── utils/              # Fungsi-fungsi pembantu umum
│           ├── __init__.py
│           └── security.py     # Hashing password, generator token
│
└── tests/                      # Kumpulan pengujian otomatis (Unit & Integration Tests)
    ├── __init__.py
    ├── conftest.py             # Fixture konfigurasi Pytest
    ├── test_services.py        # Pengujian fungsi bisnis
    └── test_models.py          # Pengujian skema data
\`\`\`

---

#### Mengapa Pola \`src-layout\` Ini Sangat Direkomendasikan?
1. **Mencegah Import Accidental**: Menghindari Python secara tidak sengaja meng-import folder lokal alih-alih paket yang sudah terinstal dengan benar di virtual environment.
2. **Separation of Concerns (Pemisahan Tanggung Jawab)**:
   - **\`models/\`**: Hanya fokus pada representasi data.
   - **\`services/\`**: Hanya fokus pada logika aturan bisnis (perhitungan, validasi transaksi).
   - **\`core/\`**: Menangani koneksi infrastruktur dan environment.
3. **Reproducibility**: Siapapun yang meng-clone repositorimu dari GitHub dapat langsung menjalankan:
   \`\`\`bash
   python -m venv .venv
   source .venv/bin/activate  # (atau .venv\\Scripts\\activate di Windows)
   pip install -r requirements.txt
   python src/my_app/main.py
   \`\`\`
`
            },
            {
              type: 'code-example',
              language: 'python',
              code: `# Simulasi pemanggilan modular dalam arsitektur src-layout
# from my_app.services.auth_service import register_user
# from my_app.core.config import settings

print("Arsitektur src-layout siap memisahkan core, models, services, dan tests!")`
            }
          ]
        },
        {
          id: 'py-les-5-1-2',
          title: 'PRACTICE: Simulasi Arsitektur Service-Repository Berbasis Folder',
          type: 'practice',
          language: 'python',
          xpReward: 45,
          starterPy: `# SIMULASI ARSITEKTUR MULTI-LAYER (Layered Architecture):
# src/my_app/
# ├── models/user.py
# ├── services/user_service.py
# └── main.py

# 1. Layer Model (src/my_app/models/user.py)
class User:
    def __init__(self, user_id, username, saldo=0):
        self.id = user_id
        self.username = username
        self.saldo = saldo

# 2. Layer Service / Business Logic (src/my_app/services/user_service.py)
class UserService:
    def __init__(self):
        # Simulasi database in-memory
        self.database = {}

    def daftar_user(self, user_id, username, saldo_awal=50000):
        user = User(user_id, username, saldo_awal)
        self.database[user_id] = user
        return f"[SUCCESS] User '{username}' terdaftar dengan saldo awal Rp{saldo_awal:,}"

    def transfer(self, pengirim_id, penerima_id, nominal):
        if pengirim_id not in self.database or penerima_id not in self.database:
            return "[ERROR] Salah satu user tidak ditemukan!"
        
        pengirim = self.database[pengirim_id]
        penerima = self.database[penerima_id]

        if pengirim.saldo < nominal:
            return "[ERROR] Saldo pengirim tidak mencukupi!"

        # Transaksi atomik
        pengirim.saldo -= nominal
        penerima.saldo += nominal
        return f"[SUCCESS] Transfer Rp{nominal:,} dari @{pengirim.username} ke @{penerima.username} BERHASIL!"

# 3. Layer App Entrypoint (src/my_app/main.py)
service = UserService()
print(service.daftar_user(1, "budi_santoso", 100000))
print(service.daftar_user(2, "citra_lestari", 20000))
print(service.transfer(1, 2, 40000))
print(f"Saldo Budi sekarang: Rp{service.database[1].saldo:,}")
print(f"Saldo Citra sekarang: Rp{service.database[2].saldo:,}")
`,
          hints: [
            'Arsitektur layered memisahkan Model data dari Logika Bisnis (Service).',
            'Layer Service menjaga agar aturan transaksi (misal saldo tidak boleh minus) tidak tercecer di file UI.',
            'Jalankan simulasi untuk melihat alur transfer saldo.'
          ],
          requirements: [
            {
              id: 'py-req-service-transfer',
              description: 'Menjalankan fungsi registrasi dan transfer antar pengguna',
              validate: (code) => code.includes('daftar_user') && code.includes('transfer')
            },
            {
              id: 'py-req-transfer-out',
              description: 'Menghasilkan output transaksi transfer berhasil',
              validate: (_code, output) => Boolean(output && output.includes('Transfer Rp40,000') && output.includes('Saldo Budi sekarang: Rp60,000'))
            }
          ],
          content: [
            {
              type: 'markdown',
              content: `### Latihan Praktik: Arsitektur Service & Layered Design

Model struktur folder industri memisahkan file menjadi beberapa layer independen. Hal ini membuat aplikasi perbankan, e-commerce, dan fintech dapat diuji secara otomatis tanpa risiko kesalahan data.`
            }
          ]
        }
      ]
    },
    {
      id: 'py-mod-5-2',
      title: 'Modul 17: REST API & Serialisasi Payload JSON',
      description: 'Menghubungkan aplikasi Python dengan klien web/mobile menggunakan standar pertukaran data JSON.',
      lessons: [
        {
          id: 'py-les-5-2-1',
          title: 'CHALLENGE: Membangun Mock REST API Controller',
          type: 'challenge',
          language: 'python',
          xpReward: 50,
          starterPy: `# Membangun Handler Endpoint REST API Standar
import json

def api_response(status_code, pesan, data=None):
    payload = {
        "meta": {
            "code": status_code,
            "status": "success" if 200 <= status_code < 300 else "error",
            "message": pesan
        },
        "data": data
    }
    return payload

# Simulasi route: GET /api/v1/courses
daftar_kursus = [
    {"id": "py-01", "judul": "Python Level 0 - Absolute Beginner"},
    {"id": "py-02", "judul": "Python Level 5 - Professional Architecture"}
]

res = api_response(200, "Daftar kursus berhasil dimuat", daftar_kursus)
print(f"Response Status: {res['meta']['status']}")
print(f"Message: {res['meta']['message']}")
print(f"Total Item: {len(res['data'])}")
`,
          hints: [
            'API modern membungkus data dalam amplop (envelope) meta berisi kode status dan pesan.',
            'Jalankan kode untuk memeriksa format response JSON.'
          ],
          requirements: [
            {
              id: 'py-req-api-envelope',
              description: 'Membuat payload response API dengan format meta dan data',
              validate: (code) => code.includes('"meta"') && code.includes('"data"')
            },
            {
              id: 'py-req-api-ok-output',
              description: 'Menampilkan respons sukses dengan jumlah item yang tepat',
              validate: (_code, output) => Boolean(output && output.includes('success') && output.includes('Total Item: 2'))
            }
          ],
          content: [
            {
              type: 'markdown',
              content: `### Standar API Response di Industri

Backend Python (seperti FastAPI, Django, atau Flask) mengirimkan respon terstruktur dengan payload meta dan data agar frontend (React, Vue, mobile app) dapat mengonsumsinya secara konsisten.`
            }
          ]
        }
      ]
    }
  ]
};
