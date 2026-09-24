import { CourseLevel } from '../types';

export const PYTHON_LEVEL_0: CourseLevel = {
  id: 'py-level-0',
  title: 'Level 0 — Absolute Beginner',
  description: 'Pondasi logika programming, computational thinking, dan cara komputer mengeksekusi kode Python dari nol.',
  modules: [
    {
      id: 'py-mod-0-1',
      title: 'Modul 1: Mental Model Pemrograman & Computational Thinking',
      description: 'Bagaimana komputer berpikir, input-process-output, dan cara menulis baris pertama Python.',
      lessons: [
        {
          id: 'py-les-0-1-1',
          title: 'LEARN: Bagaimana Komputer Membaca Kodemu?',
          type: 'learn',
          xpReward: 15,
          content: [
            {
              type: 'markdown',
              content: `### Selamat Datang di Python Coding Academy!

Komputer sebenarnya adalah mesin yang sangat cerdas dalam berhitung, tetapi sangat "polos" dalam memahami instruksi. Komputer tidak bisa menebak apa yang kamu mau — ia hanya mengeksekusi apa yang kamu perintahkan secara **baris demi baris dari atas ke bawah**.

#### Model Dasar Komputer: Input → Process → Output
1. **INPUT**: Data mentah yang masuk (angka, teks dari pengguna, file).
2. **PROCESS**: Komputer memanipulasi data dengan aturan logika (menjumlahkan, membandingkan, mengubah).
3. **OUTPUT**: Hasil akhir yang dikirimkan keluar (menampilkan teks di layar/terminal, menyimpan ke file).

\`\`\`
   ┌───────────┐      ┌───────────────┐      ┌────────────┐
   │   INPUT   │ ───> │    PROCESS    │ ───> │   OUTPUT   │
   │  ("Budi") │      │  gabung teks  │      │ ("Halo Budi")│
   └───────────┘      └───────────────┘      └────────────┘
\`\`\`

#### Kenapa Memilih Python?
Python dirancang dengan prinsip **Readability Counts** (keterbacaan kode adalah yang utama). Sintaks Python sangat mirip dengan bahasa Inggris sederhana sehingga kamu bisa fokus melatih **problem-solving** tanpa tersandung tanda baca yang rumit.
`
            },
            {
              type: 'code-example',
              language: 'python',
              code: `# Kode Python pertamamu
print("Halo, calon Software Engineer!")`
            }
          ]
        },
        {
          id: 'py-les-0-1-2',
          title: 'SEE & RUN: Fungsi print() dan Output Terminal',
          type: 'practice',
          language: 'python',
          xpReward: 25,
          starterPy: `# Cetak pesan perkenalan ke terminal
print("Selamat datang di Python Academy!")
print("Saya siap belajar programming!")
`,
          hints: [
            'Fungsi print() digunakan untuk mengeluarkan tulisan ke layar terminal.',
            'Teks yang ingin dicetak harus diapit oleh tanda petik ganda "..." atau petik tunggal \'...\'.',
            'Klik tombol [Jalankan] atau tekan Ctrl+Enter untuk melihat hasilnya di layar terminal.'
          ],
          requirements: [
            {
              id: 'py-req-0-1-print',
              description: 'Menjalankan fungsi print() minimal dua kali di terminal',
              validate: (code, output) => {
                const count = (code.match(/print\s*\(/g) || []).length;
                return count >= 2 && Boolean(output && output.trim().length > 0);
              }
            }
          ],
          content: [
            {
              type: 'markdown',
              content: `### Fungsi print(): Jendela Komunikasi Pertamamu

Fungsi \`print()\` adalah instruksi bawaan Python untuk menampilkan data atau pesan teks ke layar terminal.

\`\`\`python
print("Halo Dunia!")
\`\`\`

**Latihan:**
Perhatikan kode di sebelah kanan. Klik tombol **Jalankan (Ctrl+Enter)** untuk melihat bagaimana terminal mengeksekusi baris demi baris secara urut!`
            }
          ]
        },
        {
          id: 'py-les-0-1-3',
          title: 'CHALLENGE: Cetak Kartu Identitas Programmer',
          type: 'challenge',
          language: 'python',
          xpReward: 35,
          starterPy: `# Tuliskan instruksi print() untuk menampilkan kartu profil programmer
# Baris 1: Nama kamu
# Baris 2: Bahasa yang sedang dipelajari (Python)
# Baris 3: Target impianmu
`,
          hints: [
            'Buat 3 baris print terpisah, misalnya: print("Nama: Alex")',
            'Pastikan setiap kalimat berada di dalam tanda kurung dan tanda petik: print("...")',
            'Pastikan tidak ada tanda petik yang lupa ditutup!'
          ],
          requirements: [
            {
              id: 'py-req-0-1-three-prints',
              description: 'Memiliki minimal 3 pernyataan print() yang menghasilkan output',
              validate: (code, output) => {
                const prints = (code.match(/print\s*\(/g) || []).length;
                const lines = (output || '').trim().split('\n').filter(Boolean).length;
                return prints >= 3 && lines >= 3;
              }
            },
            {
              id: 'py-req-0-1-contains-python',
              description: 'Salah satu output menyebutkan kata "Python"',
              validate: (_code, output) => (output || '').toLowerCase().includes('python')
            }
          ],
          content: [
            {
              type: 'markdown',
              content: `### Tantangan Mandiri: Kartu Identitas Programmer

Sekarang giliranmu menulis dari nol!

**Instruksi Tantangan:**
1. Gunakan minimal **3 kali** perintah \`print()\`.
2. Baris pertama berisi nama atau aliasmu.
3. Baris kedua menyebutkan kata **Python**.
4. Baris ketiga menyebutkan tujuan atau impianmu (misal: "Ingin membuat aplikasi otomatisasi").`
            }
          ]
        },
        {
          id: 'py-les-0-1-4',
          title: 'QUIZ: Cara Kerja Komputer & Python',
          type: 'quiz',
          xpReward: 30,
          questions: [
            {
              id: 'q-0-1',
              question: 'Bagaimana urutan eksekusi kode program Python secara default?',
              options: [
                'Secara acak berdasarkan panjang baris',
                'Dari baris paling bawah ke atas',
                'Baris demi baris berurutan dari atas ke bawah',
                'Hanya baris yang mengandung angka saja'
              ],
              correctAnswerIndex: 2,
              explanation: 'Python adalah interpreted language yang mengeksekusi instruksi secara linear dari atas ke bawah.'
            },
            {
              id: 'q-0-2',
              question: 'Apa fungsi utama dari instruksi print() dalam Python?',
              options: [
                'Mencetak dokumen ke mesin printer fisik',
                'Menampilkan teks atau data ke layar terminal/konsol',
                'Menghapus memori komputer',
                'Menghubungkan komputer ke jaringan internet'
              ],
              correctAnswerIndex: 1,
              explanation: 'print() adalah fungsi bawaan Python standar untuk menampilkan output teks ke layar konsol/terminal.'
            },
            {
              id: 'q-0-3',
              question: 'Manakah penulisan string teks yang VALID dalam Python?',
              options: [
                'print(Halo Dunia)',
                'print("Halo Dunia")',
                'print<Halo Dunia>',
                'print{Halo Dunia}'
              ],
              correctAnswerIndex: 1,
              explanation: 'Teks (string) wajib diapit tanda kurung dan tanda kutip ("..." atau \'...\').'
            }
          ]
        }
      ]
    },
    {
      id: 'py-mod-0-2',
      title: 'Modul 2: Variabel & Tipe Data Primitif',
      description: 'Memahami memori komputer sebagai kotak penyimpanan data (int, float, str, bool).',
      lessons: [
        {
          id: 'py-les-0-2-1',
          title: 'LEARN & UNDERSTAND: Analogi Kotak Memori',
          type: 'learn',
          xpReward: 20,
          content: [
            {
              type: 'markdown',
              content: `### Apa itu Variabel?

Bayangkan kamu memiliki beberapa **kotak kardus** berperekat label:
- Kotak berlabel **\`nama\`** kamu isi dengan kertas bertuliskan **"Andi"**.
- Kotak berlabel **\`umur\`** kamu isi dengan angka **20**.
- Kotak berlabel **\`skor\`** kamu isi dengan angka desimal **95.5**.

Di dalam pemrograman, **variabel** adalah nama penanda untuk sebuah lokasi memori di mana komputer menyimpan suatu nilai agar bisa digunakan kembali nanti.

\`\`\`python
nama = "Andi"     # Tipe data: str (String / Teks)
umur = 20         # Tipe data: int (Integer / Bilangan Bulat)
tinggi = 175.5    # Tipe data: float (Bilangan Desimal)
aktif = True      # Tipe data: bool (Boolean / True atau False)
\`\`\`

#### 4 Tipe Data Primitif Utama di Python:
1. **\`str\` (String)**: Teks apapun yang dibungkus tanda petik (\`"Python"\`, \`'Jakarta'\`).
2. **\`int\` (Integer)**: Bilangan bulat positif atau negatif tanpa desimal (\`42\`, \`-5\`, \`0\`).
3. **\`float\` (Floating Point)**: Bilangan berkoma/desimal (\`3.14\`, \`0.75\`, \`-12.4\`).
4. **\`bool\` (Boolean)**: Nilai kebenaran logika, hanya ada dua kemungkinan: \`True\` atau \`False\` (huruf pertama wajib kapital).
`
            },
            {
              type: 'code-example',
              language: 'python',
              code: `nama = "Rian"
level = 1
xp = 150.0
is_active = True

print(nama)
print(type(nama))
print(type(level))`
            }
          ]
        },
        {
          id: 'py-les-0-2-2',
          title: 'PRACTICE: Membuat & Menggabungkan Variabel (f-strings)',
          type: 'practice',
          language: 'python',
          xpReward: 30,
          starterPy: `# 1. Deklarasikan variabel
produk = "Kopi Susu Gula Aren"
harga = 18000
jumlah = 3

# 2. Hitung total bayar
total = harga * jumlah

# 3. Tampilkan nota menggunakan format f-string
print(f"Pesanan: {produk}")
print(f"Harga Satuan: Rp{harga}")
print(f"Total Bayar: Rp{total}")
`,
          hints: [
            'f-string diawali huruf f sebelum tanda petik pembuka: f"Teks {nama_variabel}"',
            'Nilai di dalam kurung kurawal { } akan otomatis digantikan nilainya oleh Python.',
            'Coba ubah nilai variabel jumlah menjadi 5 dan jalankan ulang untuk melihat perhitungannya beradaptasi!'
          ],
          requirements: [
            {
              id: 'py-req-fstring',
              description: 'Menggunakan f-string (format string) untuk menampilkan variabel',
              validate: (code, output) => {
                return code.includes('f"') || code.includes("f'") && Boolean(output && output.includes('Total'));
              }
            },
            {
              id: 'py-req-calculation',
              description: 'Menghitung total menggunakan operator perkalian (*)',
              validate: (code) => code.includes('*')
            }
          ],
          content: [
            {
              type: 'markdown',
              content: `### Memasukkan Variabel ke Dalam Teks: f-strings

Di Python modern (3.6+), cara terbaik dan paling elegan menggabungkan teks dengan nilai variabel adalah menggunakan **f-strings (Formatted String Literals)**.

Tulis huruf \`f\` tepat sebelum tanda petik, lalu masukkan nama variabel di dalam kurung kurawal \`{ }\`:

\`\`\`python
nama = "Citra"
skor = 100
print(f"Selamat {nama}, skormu adalah {skor}!")
\`\`\`

**Tugas Praktik:**
Jalankan program kasir di sebelah kanan, perhatikan bagaimana variabel \`total\` dihitung otomatis dari \`harga * jumlah\`!`
            }
          ]
        },
        {
          id: 'py-les-0-2-3',
          title: 'DEBUG: Mengatasi TypeError & NameError',
          type: 'practice',
          language: 'python',
          xpReward: 35,
          starterPy: `# Kode ini memiliki 2 bug yang sering membuat pemula bingung!
# Perbaiki agar program dapat berjalan dengan sukses.

nama = "Budi"
umur = 25

# Bug 1: Typo nama variabel (NameError)
print(f"Halo nama saya {nam}")

# Bug 2: Mencoba menjumlahkan angka string dengan angka integer tanpa konversi
angka_teks = "100"
bonus = 50

# Perbaiki baris di bawah menggunakan int(angka_teks)
total_skor = int(angka_teks) + bonus
print(f"Total skor: {total_skor}")
`,
          hints: [
            'NameError terjadi saat kamu memanggil nama variabel yang belum pernah didefinisikan (periksa ejaan: nam vs nama).',
            'TypeError terjadi saat tipe data tidak cocok (misal teks "100" ditambah angka 50).',
            'Gunakan int() untuk mengubah teks angka menjadi bilangan bulat murni.'
          ],
          requirements: [
            {
              id: 'py-debug-no-error',
              description: 'Program berhasil dijalankan tanpa error di terminal',
              validate: (_code, output) => Boolean(output && output.includes('Budi') && output.includes('150'))
            }
          ],
          content: [
            {
              type: 'markdown',
              content: `### Belajar Membaca Traceback: Teman Terbaik Programmer

Error di pemrograman bukanlah kegagalan, melainkan **petunjuk** dari komputer.

Dua error paling umum bagi pemula:
1. **NameError**: Komputer tidak kenal nama variabel tersebut (biasanya karena salah ketik/typo).
2. **TypeError**: Operasi tidak diizinkan pada tipe data tersebut (contoh: teks ditambah angka secara langsung).

**Tugas Debugging:**
Perbaiki kesalahan ketik variabel di sebelah kanan hingga program mengeluarkan output \`Halo nama saya Budi\` dan \`Total skor: 150\`!`
            }
          ]
        }
      ]
    },
    {
      id: 'py-mod-0-3',
      title: 'Modul 3: Logika Keputusan (if, elif, else) & Boolean',
      description: 'Mengajarkan komputer mengambil keputusan bercabang berdasarkan kondisi.',
      lessons: [
        {
          id: 'py-les-0-3-1',
          title: 'LEARN & UNDERSTAND: Algoritma Percabangan',
          type: 'learn',
          xpReward: 20,
          content: [
            {
              type: 'markdown',
              content: `### Mengambil Keputusan dengan Percabangan (Conditionals)

Dalam kehidupan sehari-hari, kita selalu mengambil keputusan:
- *"Jika hujan, bawa payung."*
- *"Jika lapar, makan; jika tidak, lanjut kerja."*

Di Python, kita menggunakan kata kunci \`if\`, \`elif\` (else if), dan \`else\`.

\`\`\`python
nilai = 85

if nilai >= 90:
    print("Grade: A (Luar Biasa!)")
elif nilai >= 75:
    print("Grade: B (Lulus Sangat Baik)")
elif nilai >= 60:
    print("Grade: C (Cukup)")
else:
    print("Grade: D (Perlu Mengulang)")
\`\`\`

#### Aturan Sakral Python: INDENTATION (Spasi Menjorok ke Dalam)
Di bahasa pemrograman lain seperti C++ atau Java, blok kode dibungkus kurung kurawal \`{ }\`.
Tetapi di Python, **spasi indentasi (4 spasi)** menentukan baris mana yang merupakan bagian dari keputusan \`if\`!

\`\`\`python
if lapar == True:
    print("Makan nasi goreng")  # Ini hanya dijalankan JIKA lapar
print("Selesai")                # Ini SELALU dijalankan apapun kondisinya
\`\`\`
`
            },
            {
              type: 'code-example',
              language: 'python',
              code: `usia = 18

if usia >= 17:
    print("Sudah memiliki hak membuat KTP & SIM.")
else:
    print("Belum cukup umur untuk membuat KTP.")`
            }
          ]
        },
        {
          id: 'py-les-0-3-2',
          title: 'CHALLENGE: Sistem Tiket Masuk Bioskop Otomatis',
          type: 'challenge',
          language: 'python',
          xpReward: 40,
          starterPy: `# Buat sistem penentu harga tiket berdasarkan usia penonton:
# Aturan:
# - Usia di bawah 5 tahun: Tiket GRATIS (Rp0)
# - Usia 5 s.d 17 tahun: Tiket Pelajar (Rp30.000)
# - Usia di atas 17 tahun: Tiket Reguler Dewasa (Rp50.000)

usia = 16

# Tulis percabangan if, elif, else di bawah ini:
if usia < 5:
    harga = 0
elif usia <= 17:
    harga = 30000
else:
    harga = 50000

print(f"Usia: {usia} tahun. Harga tiket: Rp{harga}")
`,
          hints: [
            'Gunakan operator perbandingan: < (kurang dari), <= (kurang dari sama dengan), > (lebih dari).',
            'Gunakan struktur: if kondisi: ... elif kondisi: ... else: ...',
            'Jangan lupa tanda titik dua (:) di akhir setiap baris if, elif, dan else!'
          ],
          requirements: [
            {
              id: 'py-req-if-elif-else',
              description: 'Menggunakan struktur lengkap if, elif, dan else',
              validate: (code) => code.includes('if ') && code.includes('elif ') && code.includes('else:')
            },
            {
              id: 'py-req-ticket-output',
              description: 'Menampilkan harga tiket sesuai umur pada output terminal',
              validate: (_code, output) => Boolean(output && (output.includes('30000') || output.includes('30.000')))
            }
          ],
          content: [
            {
              type: 'markdown',
              content: `### Tantangan: Sistem Harga Tiket Bioskop

Buat logika percabangan untuk menentukan harga tiket bioskop berdasarkan variabel \`usia\`.

Ujilah logika kodemu dengan mengubah nilai variabel \`usia\` (misal: 3 tahun, 16 tahun, dan 25 tahun), lalu klik **Jalankan**!`
            }
          ]
        }
      ]
    },
    {
      id: 'py-mod-0-4',
      title: 'Modul 4: Perulangan (Loops) & Mengotomasi Hal Berulang',
      description: 'Gunakan for loop dan while loop untuk memproses data berulang tanpa menulis kode manual berkali-kali.',
      lessons: [
        {
          id: 'py-les-0-4-1',
          title: 'LEARN & SEE: Kenapa Komputer Benci Hal Manual?',
          type: 'learn',
          xpReward: 20,
          content: [
            {
              type: 'markdown',
              content: `### Perulangan (Loops): Kekuatan Super Programmer

Jika kamu disuruh menulis angka 1 sampai 1000 secara manual dengan perintah \`print(1)\`, \`print(2)\`... kamu akan lelah dan bosan.
Tetapi bagi komputer, mengulang perintah 1 juta kali bisa diselesaikan hanya dalam beberapa milidetik!

#### 1. \`for\` Loop dengan fungsi \`range()\`
Digunakan saat kamu tahu berapa kali perulangan harus dilakukan.

\`\`\`python
# Mencetak angka 1 sampai 5
for i in range(1, 6):
    print(f"Iterasi ke-{i}")
\`\`\`

*Catatan penting:* \`range(1, 6)\` dimulai dari angka 1 dan berhenti **sebelum** angka 6 (yaitu 1, 2, 3, 4, 5).

#### 2. \`while\` Loop
Digunakan saat perulangan harus berjalan **selama suatu kondisi masih bernilai True**.

\`\`\`python
energi = 3
while energi > 0:
    print(f"Sedang berlari... sisa energi: {energi}")
    energi = energi - 1

print("Energi habis, waktu istirahat!")
\`\`\`
`
            },
            {
              type: 'code-example',
              language: 'python',
              code: `# Menghitung total jumlah 1 + 2 + 3 + 4 + 5
total = 0
for angka in range(1, 6):
    total = total + angka

print(f"Total penjumlahan: {total}")`
            }
          ]
        },
        {
          id: 'py-les-0-4-2',
          title: 'PROJECT LEVEL 0: Mesin Kasir & Kalkulator Diskon Otomatis',
          type: 'project',
          language: 'python',
          xpReward: 60,
          starterPy: `# ==========================================
# FINAL PROJECT LEVEL 0: SMART CASH REGISTER
# ==========================================
# Skenario:
# Sebuah toko memberikan diskon otomatis:
# - Belanja di atas Rp100.000 dapat diskon 10%
# - Belanja di atas Rp50.000 dapat diskon 5%
# - Belanja di bawah Rp50.000 tidak dapat diskon (0%)

daftar_harga = [25000, 45000, 35000, 15000]

# 1. Hitung total belanja menggunakan for loop
total_belanja = 0
for harga in daftar_harga:
    total_belanja = total_belanja + harga

# 2. Tentukan persentase diskon dengan if-elif-else
if total_belanja > 100000:
    diskon_persen = 10
elif total_belanja > 50000:
    diskon_persen = 5
else:
    diskon_persen = 0

# 3. Hitung potongan & total akhir
potongan = total_belanja * (diskon_persen / 100)
bayar_bersih = total_belanja - potongan

# 4. Tampilkan struk kasir
print("======== STRUK TOKO PYTHON ========")
print(f"Subtotal: Rp{total_belanja}")
print(f"Diskon ({diskon_persen}%): Rp{int(potongan)}")
print(f"Total yang Harus Dibayar: Rp{int(bayar_bersih)}")
print("===================================")
`,
          hints: [
            'Gunakan variabel akumulator: total = total + item di dalam loop.',
            'Diskon 10% sama dengan mengalikan total dengan 0.10 atau (10 / 100).',
            'Jalankan program dan amati bagaimana komputer menghitung 4 barang sekaligus dalam sekejap!'
          ],
          requirements: [
            {
              id: 'py-req-proj-loop',
              description: 'Menggunakan for loop untuk menghitung total akumulasi',
              validate: (code) => code.includes('for ') && code.includes('total_belanja')
            },
            {
              id: 'py-req-proj-discount',
              description: 'Menerapkan logika diskon percabangan if-elif-else',
              validate: (code) => code.includes('if ') && code.includes('elif ')
            },
            {
              id: 'py-req-proj-output',
              description: 'Mencetak struk kasir lengkap dengan subtotal dan total bayar',
              validate: (_code, output) => Boolean(output && output.includes('Subtotal') && output.includes('Total'))
            }
          ],
          content: [
            {
              type: 'markdown',
              content: `### Proyek Akhir Level 0: Smart Cash Register

Selamat telah mencapai tahap akhir Level 0! Sekarang kamu akan menggabungkan semua konsep yang sudah dipelajari:
1. **Variabel & Tipe Data**: Menyimpan harga barang, nama toko, dan persentase.
2. **List & Loop**: Mengiterasi barang-barang belanjaan untuk menghitung subtotal.
3. **Percabangan (if-elif-else)**: Menentukan level diskon secara otomatis.
4. **F-Strings & Output**: Mencetak struk belanjaan yang rapi dan profesional.

Klik tombol **Jalankan** untuk menguji sistem kasir otomatis pertamamu!`
            }
          ]
        }
      ]
    }
  ]
};
