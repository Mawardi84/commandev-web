import { Course } from '../types';

export const JS_COURSE: Course = {
  id: 'javascript-mastery',
  title: 'JavaScript 0 → Mahir',
  shortDescription: 'Kurikulum JavaScript komprehensif 8 jenjang: Absolute Beginner, Fundamental, Beginner, Intermediate, Advanced, Professional, Project, & Assessment.',
  description: 'Hidupkan websitemu dengan logika komputasi, struktur folder proyek JavaScript modular, ES Modules (import/export), Event Listeners, Asynchronous JS, modern toolchain (Vite & npm), capstone project, dan evaluasi teknis kelulusan.',
  icon: 'javascript',
  levels: [
    {
      id: 'js-level-0',
      title: 'Level 0 — Absolute Beginner',
      description: 'Pengenalan logika pemrograman, variabel (const, let), tipe data primitif, operator matematika, dan mencetak ke console.log().',
      modules: [
        {
          id: 'js-mod-0-1',
          title: 'Logika Dasar & Variabel',
          description: 'Apa itu bahasa pemrograman dan bagaimana cara menyimpan informasi di memori komputer?',
          lessons: [
            {
              id: 'js-les-0-1-1',
              title: 'Variabel: let dan const',
              type: 'learn',
              xpReward: 15,
              content: [
                {
                  type: 'markdown',
                  content: `### Otak di Balik Website: JavaScript!

Jika HTML adalah kerangka dan CSS adalah pakaian, maka **JavaScript adalah otot dan sistem saraf** yang memberikan kehidupan pada website.

\`\`\`javascript
const nama = "Budi";  // Nilai tetap (tidak bisa diubah)
let skor = 100;       // Nilai yang bisa berubah
skor = skor + 10;
\`\`\`

- Gunakan \`const\` secara default untuk nilai yang stabil.
- Gunakan \`let\` jika nilainya akan dihitung ulang seiring waktu.`
                },
                {
                  type: 'code-example',
                  language: 'javascript',
                  code: `const namaAplikasi = "COMMANDEV";
let saldoUser = 50000;
console.log("Selamat datang di " + namaAplikasi);`
                }
              ]
            },
            {
              id: 'js-les-0-1-2',
              title: 'Latihan: Menghitung Total Belanja',
              type: 'practice',
              xpReward: 25,
              content: [
                {
                  type: 'markdown',
                  content: 'Deklarasikan variabel `harga` bernilai 25000 dan `jumlah` bernilai 4. Hitung `total` dengan mengalikan keduanya, lalu cetak `total` menggunakan `console.log(total)`!'
                }
              ],
              starterCode: '// Tulis kode kalkulasi di bawah ini:\nconst harga = 25000;\nconst jumlah = 4;\nconst total = harga * jumlah;\nconsole.log(total);',
              requirements: [
                {
                  id: 'req-js-calc',
                  description: 'Menghitung variabel total dengan mengalikan harga dan jumlah',
                  validate: (code) => code.includes('harga') && code.includes('jumlah') && code.includes('*')
                },
                {
                  id: 'req-js-log',
                  description: 'Mencetak output total ke console',
                  validate: (code) => code.includes('console.log(')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'js-level-1',
      title: 'Level 1 — Fundamental',
      description: 'Fungsi modular (function & return), percabangan kondisi (if-else), dan manipulasi DOM dasar (document.getElementById, textContent).',
      modules: [
        {
          id: 'js-mod-1-1',
          title: 'Percabangan & Fungsi',
          description: 'Mengambil keputusan logis dan mengemas baris kode menjadi fungsi reusable.',
          lessons: [
            {
              id: 'js-les-1-1-1',
              title: 'Membuat Fungsi Perhitungan Diskon',
              type: 'practice',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: 'Buat fungsi `hitungDiskon(harga, persen)` yang mengembalikan harga setelah dipotong diskon.'
                }
              ],
              starterCode: 'function hitungDiskon(harga, persen) {\n  const potongan = harga * (persen / 100);\n  return harga - potongan;\n}\n\nconst hargaAkhir = hitungDiskon(100000, 20);\nconsole.log(hargaAkhir);',
              requirements: [
                {
                  id: 'req-js-fn',
                  description: 'Mendefinisikan fungsi hitungDiskon dengan kata kunci return',
                  validate: (code) => code.includes('function hitungDiskon') && code.includes('return')
                }
              ]
            }
          ]
        },
        {
          id: 'js-mod-1-2',
          title: 'Manipulasi DOM Dasar',
          description: 'Menghubungkan kode JavaScript ke elemen HTML untuk mengubah teks dan gaya secara langsung.',
          lessons: [
            {
              id: 'js-les-1-2-1',
              title: 'Mengubah Teks Paragraf dengan textContent',
              type: 'practice',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: 'Gunakan `document.getElementById("status").textContent = "Aktif";` untuk memperbarui status.'
                }
              ],
              starterCode: '<p id="status">Menunggu interaksi...</p>\n\n<script>\n  const elemenStatus = document.getElementById("status");\n  elemenStatus.textContent = "Status: Online dan Siap!";\n</script>',
              requirements: [
                {
                  id: 'req-dom-change',
                  description: 'Mengakses elemen dengan getElementById dan mengubah textContent',
                  validate: (html) => html.includes('getElementById') && html.includes('textContent')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'js-level-2',
      title: 'Level 2 — Beginner',
      description: 'Bagaimana membuat struktur folder proyek JavaScript, modularitas ES Modules (import/export), dan memisahkan logika dari file HTML.',
      modules: [
        {
          id: 'js-mod-2-1',
          title: 'Bagaimana Membuat Struktur Folder Proyek JavaScript',
          description: 'Mengapa dilarang menulis JavaScript di dalam tag <script> HTML? Membangun folder proyek modular berbasis ES Modules.',
          lessons: [
            {
              id: 'les-js-2-1-1',
              title: 'LEARN: Struktur Folder Proyek JavaScript Standar',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### Bagaimana Cara Membuat Struktur Folder di JavaScript?

Ketika aplikasi web mulai memiliki banyak fitur (validasi form, kalkulasi keranjang, permintaan API, animasi), menaruh kode JavaScript di dalam file HTML membuat kode kotor dan sulit diuji.

---

#### 1. Struktur Folder Standar Proyek JavaScript (Modular Layout)

\`\`\`text
my_javascript_app/
│
├── index.html           # Menghubungkan modul utama via script type="module"
├── README.md            # Dokumentasi cara kerja aplikasi
│
├── css/
│   └── style.css        # Gaya tampilan
│
└── js/                  # [FOLDER UTAMA JAVASCRIPT]
    ├── app.js           # Titik masuk utama aplikasi (Entrypoint)
    │
    ├── modules/         # Kumpulan modul-modul independen
    │   ├── calculator.js# Fungsi-fungsi matematika murni
    │   ├── formatter.js # Fungsi pemformat mata uang & tanggal
    │   └── storage.js   # Pengelola penyimpanan localStorage
    │
    └── data/            # Data statis awal
        └── products.js  # Array produk awal
\`\`\`

---

#### 2. Kekuatan Sakral ES Modules (\`export\` & \`import\`)
JavaScript modern (ES6+) mendukung modularitas tanpa perlu library tambahan:

**Langkah 1: Ekspor dari modul helper (\`js/modules/formatter.js\`):**
\`\`\`javascript
// js/modules/formatter.js
export function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(angka);
}
\`\`\`

**Langkah 2: Impor di file utama (\`js/app.js\`):**
\`\`\`javascript
// js/app.js
import { formatRupiah } from "./modules/formatter.js";

const harga = 75000;
console.log(formatRupiah(harga)); // Rp 75.000,00
\`\`\`

**Langkah 3: Panggil di \`index.html\` dengan atribut \`type="module"\`:**
\`\`\`html
<!-- index.html -->
<script type="module" src="js/app.js"></script>
\`\`\`
*Catatan:* Atribut \`type="module"\` otomatis menjalankan skrip secara deferred (setelah HTML selesai di-parse) dan mengaktifkan isolasi variabel (tidak mengotori window global).
`
                },
                {
                  type: 'code-example',
                  language: 'javascript',
                  code: `// Simulasi import modul di JavaScript modern
// import { hitungTotal, formatRupiah } from './modules/kasir.js';

function formatMataUang(nominal) {
  return "Rp" + nominal.toLocaleString("id-ID");
}

console.log("Modul berhasil dipisahkan dan di-import!");
console.log(formatMataUang(150000));`
                }
              ]
            },
            {
              id: 'les-js-2-1-2',
              title: 'PRACTICE: Simulasi Pemisahan Modul Helper & Main App',
              type: 'practice',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: [
                    '### Latihan: Modularitas Fungsi Helper',
                    '',
                    'Simulasikan pemisahan file modul helper dan script utama.',
                    'Buat object modul `KasirHelper` yang memiliki method `hitungPPN(nominal)` dan panggil di alur transaksi utama.'
                  ].join('\n')
                }
              ],
              starterCode: '// SIMULASI STRUKTUR MODULAR: js/modules/kasir.js\nconst KasirHelper = {\n  hitungPPN: function(nominal, persen = 11) {\n    return nominal * (persen / 100);\n  },\n  formatRupiah: function(nominal) {\n    return "Rp" + nominal.toLocaleString("id-ID");\n  }\n};\n\n// ALUR UTAMA (js/app.js)\nconst belanja = 200000;\nconst ppn = KasirHelper.hitungPPN(belanja);\nconst totalBayar = belanja + ppn;\n\nconsole.log("Subtotal : " + KasirHelper.formatRupiah(belanja));\nconsole.log("PPN (11%): " + KasirHelper.formatRupiah(ppn));\nconsole.log("Total    : " + KasirHelper.formatRupiah(totalBayar));',
              requirements: [
                {
                  id: 'req-js-mod-helper',
                  description: 'Memiliki objek modul dengan fungsi hitungPPN dan formatRupiah',
                  validate: (code) => code.includes('hitungPPN') && code.includes('formatRupiah')
                },
                {
                  id: 'req-js-mod-log',
                  description: 'Mencetak rincian transaksi dengan output terformat',
                  validate: (code) => code.includes('console.log') && code.includes('totalBayar')
                }
              ]
            },
            {
              id: 'les-js-2-1-3',
              title: 'QUIZ: Modularitas & Struktur Folder JavaScript',
              type: 'quiz',
              xpReward: 30,
              questions: [
                {
                  id: 'q-js-f-1',
                  question: 'Mengapa tag <script> yang memanggil file utama JavaScript modern harus diberi atribut type="module"?',
                  options: [
                    'Agar file bisa menggunakan sintaks "import" dan "export" serta terisolasi dari global scope',
                    'Agar kode bisa berjalan tanpa koneksi internet',
                    'Untuk mengubah JavaScript menjadi file audio',
                    'Hanya hiasan opsional'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Atribut type="module" memberitahu browser bahwa file tersebut adalah ES Module, memungkinkan penggunaan statement import/export dan strict mode otomatis.'
                },
                {
                  id: 'q-js-f-2',
                  question: 'Di dalam struktur folder "js/", apa peran dari subfolder "modules/" atau "utils/"?',
                  options: [
                    'Menyimpan file video tutorial',
                    'Menyimpan modul-modul fungsi pembantu yang reusable (terpisah dari entry point app.js)',
                    'Menyimpan backup file HTML',
                    'Menghapus variabel otomatis'
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'Folder modules/ atau utils/ berfungsi mengumpulkan fungsi-fungsi independen (seperti formatter, validator, kalkulator) agar kode teratur.'
                },
                {
                  id: 'q-js-f-3',
                  question: 'Apa perbedaan antara "export default" dan "named export (export { ... })"?',
                  options: [
                    'Named export bisa mengekspor banyak fungsi/variabel dalam satu file, sedangkan export default hanya satu nilai utama',
                    'Export default hanya berlaku di browser Safari',
                    'Named export memperlambat eksekusi kode',
                    'Tidak ada perbedaan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Named export memungkinkan mengekspor beberapa fungsi dengan nama spesifik ({ fnA, fnB }), sedangkan default export mengekspor satu entitas utama per modul.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'js-level-3',
      title: 'Level 3 — Intermediate',
      description: 'Event Listeners (click, submit, input), Array Methods ES6 (map, filter, reduce), dan penyimpanan data lokal browser (localStorage).',
      modules: [
        {
          id: 'js-mod-3-1',
          title: 'Event Handling & Interaktivitas',
          description: 'Merespons tindakan klik mouse, pengetikan keyboard, dan pengiriman form.',
          lessons: [
            {
              id: 'js-les-3-1-1',
              title: 'Membuat Tombol Counter dengan addEventListener',
              type: 'practice',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: 'Tambahkan event listener `click` pada tombol untuk menambah nilai counter setiap kali ditekan.'
                }
              ],
              starterCode: '<button id="btn-tambah">Tambah Angka</button>\n<p>Nilai: <span id="angka">0</span></p>\n\n<script>\n  let count = 0;\n  const btn = document.getElementById("btn-tambah");\n  const angkaSpan = document.getElementById("angka");\n\n  btn.addEventListener("click", () => {\n    count++;\n    angkaSpan.textContent = count;\n  });\n</script>',
              requirements: [
                {
                  id: 'req-event-click',
                  description: 'Menggunakan addEventListener dengan event click',
                  validate: (html) => html.includes('addEventListener') && html.includes('click')
                }
              ]
            }
          ]
        },
        {
          id: 'js-mod-3-2',
          title: 'Array Methods ES6 & LocalStorage',
          description: 'Mengolah koleksi data secara fungsional dengan .map() dan .filter(), serta menyimpan ke localStorage.',
          lessons: [
            {
              id: 'js-les-3-2-1',
              title: 'Filter & Transformasi Data Pelanggan',
              type: 'practice',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: 'Gunakan `.filter()` untuk mengambil produk dengan harga di bawah 50000, lalu gunakan `.map()` untuk mengambil namanya saja.'
                }
              ],
              starterCode: 'const katalog = [\n  { nama: "Buku Catatan", harga: 25000 },\n  { nama: "Tas Ransel", harga: 150000 },\n  { nama: "Pulpen Gel", harga: 12000 },\n  { nama: "Sepatu Olahraga", harga: 350000 }\n];\n\n// Terapkan filter dan map di sini:\nconst barangMurah = katalog\n  .filter(item => item.harga < 50000)\n  .map(item => item.nama);\n\nconsole.log(barangMurah);',
              requirements: [
                {
                  id: 'req-array-methods',
                  description: 'Menggunakan kombinasi .filter dan .map',
                  validate: (code) => code.includes('.filter') && code.includes('.map')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'js-level-4',
      title: 'Level 4 — Advanced',
      description: 'Asynchronous JavaScript: Promises, Async/Await, Fetch API mengonsumsi REST API, Penanganan Error (try/catch), dan Closures.',
      modules: [
        {
          id: 'js-mod-4-1',
          title: 'Asynchronous JS, Promises & Async/Await',
          description: 'Mengeksekusi proses non-blocking (seperti download data) tanpa membuat antarmuka membeku.',
          lessons: [
            {
              id: 'js-les-4-1-1',
              title: 'Mengambil Data dengan Fetch API & Async/Await',
              type: 'practice',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: 'Buat fungsi `async function muatData()` yang melakukan `await fetch(...)` dan membaca `await res.json()` di dalam blok `try/catch`.'
                }
              ],
              starterCode: 'async function muatDataPengguna() {\n  try {\n    console.log("Memulai request data...");\n    // Simulasi pengambilan data asynchronous\n    const data = await new Promise(resolve => {\n      setTimeout(() => resolve({ id: 101, username: "aditya_dev" }), 300);\n    });\n    console.log("Data diterima:", data.username);\n    return data;\n  } catch (error) {\n    console.error("Gagal memuat:", error);\n  }\n}\n\nmuatDataPengguna();',
              requirements: [
                {
                  id: 'req-async-await',
                  description: 'Menggunakan kata kunci async dan await di dalam try/catch',
                  validate: (code) => code.includes('async function') && code.includes('await') && code.includes('try')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'js-level-5',
      title: 'Level 5 — Professional',
      description: 'Struktur folder modern JS toolchain (Vite, npm, src-layout, package.json, bundling, linter ESLint, & production builds).',
      modules: [
        {
          id: 'js-mod-5-1',
          title: 'Struktur Folder Modern Toolchain (Vite, npm, src-layout)',
          description: 'Bagaimana frontend engineer modern membangun proyek JavaScript berskala enterprise menggunakan package manager dan bundler.',
          lessons: [
            {
              id: 'les-js-5-1-1',
              title: 'LEARN: Anatomi Folder Toolchain Modern (Vite / Webpack Layout)',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Standar Toolchain JavaScript Skala Enterprise

Di era modern, developer tidak lagi mengunduh library JavaScript secara manual via link script CDN. Kita menggunakan **npm (Node Package Manager)** dan **Bundler (Vite)** untuk mengelola ribuan dependensi dan menghasilkan berkas produksi yang super cepat.

---

#### Struktur Folder Proyek JavaScript Standar Industri (src-layout):

\`\`\`text
my_modern_app/
│
├── node_modules/        # Kumpulan library npm terinstal (di-ignore oleh git)
├── .gitignore           # Mengabaikan node_modules/, dist/, .env
├── package.json         # Manifest proyek, dependensi, dan script build
├── package-lock.json    # Mengunci versi spesifik seluruh dependensi
├── vite.config.js       # Konfigurasi bundler Vite
├── index.html           # File entrypoint HTML yang memanggil /src/main.js
│
├── public/              # Aset statis yang tidak disentuh bundler (favicon, manifest)
│   └── favicon.svg
│
├── src/                 # [ROOT SOURCE] Seluruh kode aplikasi hidup di sini
│   ├── main.js          # Entrypoint bundler Vite
│   ├── style.css        # Global CSS
│   │
│   ├── api/             # Modul komunikasi HTTP & Fetch client
│   │   ├── client.js    # Konfigurasi Axios / Fetch instance
│   │   └── userApi.js   # Endpoint pemanggilan data pengguna
│   │
│   ├── components/      # UI generator / renderer komponen
│   │   ├── Header.js
│   │   └── TodoCard.js
│   │
│   └── utils/           # Helper murni (formatters, storage, helpers)
│       ├── formatters.js
│       └── storage.js
│
└── dist/                # [OUTPUT PRODUKSI] Berkas yang sudah di-minifikasi oleh "npm run build"
    ├── index.html
    └── assets/
        ├── index-C09f8a.js   # Bundle JS super cepat
        └── index-B21d7e.css  # Bundle CSS
\`\`\`

---

#### Mengapa Struktur \`src/\` Ini Menjadi Standar Dunia?
1. **Tree-Shaking**: Bundler otomatis membuang fungsi-fungsi dari library yang tidak terpakai sehingga ukuran download aplikasi menjadi sangat kecil.
2. **Environment Variable Security**: Menggunakan berkas \`.env\` untuk menyimpan URL backend API tanpa membocorkannya secara terbuka.
3. **NPM Scripts Automation**:
   - \`npm run dev\` -> Menjalankan development server lokal dengan Hot Module Reloading.
   - \`npm run build\` -> Mengkompilasi seluruh kode di \`src/\` menjadi berkas produksi di \`dist/\`.
`
                },
                {
                  type: 'code-example',
                  language: 'javascript',
                  code: `// Simulasi struktur Controller-Service di dalam src/
class ApiService {
  static async getItems() {
    return [{ id: 1, name: "Keyboard" }, { id: 2, name: "Monitor" }];
  }
}

class ViewController {
  static render(items) {
    return items.map(i => "Item: " + i.name).join(", ");
  }
}

ApiService.getItems().then(items => {
  console.log("Output Render:", ViewController.render(items));
});`
                }
              ]
            },
            {
              id: 'les-js-5-1-2',
              title: 'PRACTICE: Arsitektur Service & State Manager',
              type: 'practice',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
                  content: [
                    '### Latihan: Pemisahan Service Data & State',
                    '',
                    'Rancang modul `StorageService` yang membungkus operasi baca-tulis array ke memori, dan panggil melalui method `tambahItem(item)` serta `ambilSemua()`.'
                  ].join('\n')
                }
              ],
              starterCode: '// Simulasi src/services/storageService.js\nclass StorageService {\n  constructor() {\n    this.items = [];\n  }\n  tambah(item) {\n    this.items.push(item);\n    return this.items.length;\n  }\n  ambil() {\n    return [...this.items];\n  }\n}\n\n// Simulasi src/main.js\nconst storage = new StorageService();\nstorage.tambah({ id: 1, judul: "Belajar Vite Toolchain" });\nstorage.tambah({ id: 2, judul: "Memahami src-layout" });\n\nconst daftar = storage.ambil();\nconsole.log("Total item tersimpan:", daftar.length);\nconsole.log("Item pertama:", daftar[0].judul);',
              requirements: [
                {
                  id: 'req-service-cls',
                  description: 'Membuat class StorageService dengan method tambah dan ambil',
                  validate: (code) => code.includes('class StorageService') && code.includes('tambah') && code.includes('ambil')
                },
                {
                  id: 'req-service-out',
                  description: 'Menyimpan dan mencetak total item dengan benar',
                  validate: (code) => code.includes('console.log') && code.includes('daftar.length')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'js-level-6',
      title: 'Level 6 — Project',
      description: 'Implementasi proyek nyata berskala penuh: Interactive Task Master / Kanban Board dengan filter kategori, status board, dan persistensi state.',
      modules: [
        {
          id: 'js-mod-6-1',
          title: 'Capstone Project: Interactive Task Master',
          description: 'Membangun aplikasi manajemen tugas dinamis dengan manipulasi DOM, event listener, dan array state.',
          lessons: [
            {
              id: 'js-les-6-1-1',
              title: 'CAPSTONE: Interactive Task Master Application',
              type: 'project',
              xpReward: 150,
              content: [
                {
                  type: 'markdown',
                  content: [
                    '### Capstone Project: Interactive Task Master',
                    '',
                    'Bangun aplikasi manajemen tugas interaktif yang mendukung:',
                    '1. Input tugas baru melalui form atau textfield.',
                    '2. Menampilkan daftar tugas di dalam list `<ul>`.',
                    '3. Menghitung total tugas aktif secara dinamis.'
                  ].join('\n')
                }
              ],
              starterCode: '<div style="padding: 20px; font-family: sans-serif;">\n  <h2>Task Master Dashboard</h2>\n  <input type="text" id="task-input" placeholder="Tulis tugas baru..." />\n  <button id="add-btn">Tambah</button>\n  <p>Total Tugas: <span id="total-count">0</span></p>\n  <ul id="task-list"></ul>\n</div>\n\n<script>\n  const input = document.getElementById("task-input");\n  const addBtn = document.getElementById("add-btn");\n  const list = document.getElementById("task-list");\n  const totalSpan = document.getElementById("total-count");\n\n  let tasks = [];\n\n  function render() {\n    list.innerHTML = "";\n    tasks.forEach((t, i) => {\n      const li = document.createElement("li");\n      li.textContent = (i + 1) + ". " + t;\n      list.appendChild(li);\n    });\n    totalSpan.textContent = tasks.length;\n  }\n\n  addBtn.addEventListener("click", () => {\n    const text = input.value.trim();\n    if (text) {\n      tasks.push(text);\n      input.value = "";\n      render();\n    }\n  });\n</script>',
              requirements: [
                {
                  id: 'req-cap-dom-list',
                  description: 'Menggunakan addEventListener pada tombol tambah',
                  validate: (html) => html.includes('addEventListener') && html.includes('click')
                },
                {
                  id: 'req-cap-render',
                  description: 'Memiliki fungsi render yang memperbarui DOM list dan counter',
                  validate: (html) => html.includes('render()') && html.includes('appendChild')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'js-level-7',
      title: 'Level 7 — Assessment',
      description: 'Evaluasi akhir komprehensif: Ujian teori JavaScript (Event Loop, Closure, Scope, Async), tantangan live coding mandiri, dan sertifikasi.',
      modules: [
        {
          id: 'js-mod-7-1',
          title: 'Comprehensive Knowledge Assessment (Ujian Teori)',
          description: 'Ujian komprehensif menguji pemahaman mendalam tentang eksekusi JavaScript engine, asynchronous runtime, dan modularitas.',
          lessons: [
            {
              id: 'js-les-7-1-1',
              title: 'ASSESSMENT QUIZ: Evaluasi Teori JavaScript Software Engineer',
              type: 'quiz',
              xpReward: 50,
              questions: [
                {
                  id: 'q-j7-1',
                  question: 'Manakah komponen di JavaScript runtime yang bertanggung jawab mengeksekusi asynchronous callback setelah Call Stack kosong?',
                  options: [
                    'Event Loop & Callback Queue',
                    'Memory Heap Garbage Collector',
                    'DOM Parser',
                    'CSS Object Model'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Event Loop terus memantau Call Stack. Begitu stack kosong, ia mendorong callback dari Callback Queue / Microtask Queue ke Call Stack.'
                },
                {
                  id: 'q-j7-2',
                  question: 'Apa perbedaan mendasar antara "==" (loose equality) dan "===" (strict equality)?',
                  options: [
                    '=== membandingkan nilai DAN tipe data tanpa melakukan konversi otomatis (type coercion)',
                    '== lebih cepat daripada ===',
                    '=== hanya bisa digunakan untuk angka',
                    'Keduanya sama persis'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Strict equality (===) memeriksa kesamaan nilai sekaligus tipe data, sedangkan == melakukan konversi tipe data implisit yang rawan bug.'
                },
                {
                  id: 'q-j7-3',
                  question: 'Dalam struktur proyek toolchain modern, apa fungsi file "package.json"?',
                  options: [
                    'Menyimpan catatan riwayat browsing',
                    'Mendefinisikan metadata proyek, daftar dependensi library luar, dan script otomatis (dev, build, test)',
                    'Mengubah file JS menjadi file PDF',
                    'Tempat meletakkan gambar website'
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'package.json adalah manifest utama proyek Node.js/JavaScript modern yang memuat dependensi, versi, dan skrip build.'
                },
                {
                  id: 'q-j7-4',
                  question: 'Apa hasil dari pemanggilan [1, 2, 3].map(x => x * 2)?',
                  options: [
                    '[2, 4, 6]',
                    '[1, 2, 3]',
                    '6',
                    'undefined'
                  ],
                  correctAnswerIndex: 0,
                  explanation: '.map() menghasilkan array baru dengan setiap elemen dikalikan 2.'
                },
                {
                  id: 'q-j7-5',
                  question: 'Apa arti konsep "Closure" di JavaScript?',
                  options: [
                    'Menutup tab browser secara otomatis',
                    'Sebuah fungsi yang mengingat dan dapat mengakses variabel di scope leksikal luarnya meskipun fungsi luar telah selesai dieksekusi',
                    'Perintah untuk menghapus variabel dari memori',
                    'Error saat memanggil API'
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'Closure adalah kombinasi fungsi yang dibundel bersama lingkungan leksikalnya (variabel scope luar yang tetap hidup).'
                }
              ]
            }
          ]
        },
        {
          id: 'js-mod-7-2',
          title: 'Live Coding Technical Assessment (Ujian Praktik)',
          description: 'Ujian live coding mandiri tanpa template: algoritma analitik data dan transformasi inventaris.',
          lessons: [
            {
              id: 'js-les-7-2-1',
              title: 'FINAL LIVE CODING: Data Transformation & Analytics Engine',
              type: 'challenge',
              xpReward: 100,
              content: [
                {
                  type: 'markdown',
                  content: [
                    '### Ujian Akhir Praktik: Data Transformation Engine',
                    '',
                    'Selesaikan tantangan analitik data JavaScript berikut!',
                    '',
                    '**Tugas Ujian:**',
                    'Buat fungsi `hitungStatistik(transaksi)` yang menerima array objek transaksi `[{ id, nominal, status }]` dan mengembalikan objek ringkasan:',
                    '1. `totalSukses`: Akumulasi nominal untuk transaksi berstatus "sukses".',
                    '2. `jumlahTransaksi`: Total banyaknya transaksi yang berhasil diproses.'
                  ].join('\n')
                }
              ],
              starterCode: 'const dataTransaksi = [\n  { id: 1, nominal: 50000, status: "sukses" },\n  { id: 2, nominal: 120000, status: "sukses" },\n  { id: 3, nominal: 75000, status: "gagal" },\n  { id: 4, nominal: 30000, status: "sukses" }\n];\n\nfunction hitungStatistik(transaksi) {\n  const transaksiSukses = transaksi.filter(t => t.status === "sukses");\n  const totalNominal = transaksiSukses.reduce((acc, curr) => acc + curr.nominal, 0);\n  \n  return {\n    totalSukses: totalNominal,\n    jumlahTransaksi: transaksiSukses.length\n  };\n}\n\nconst hasil = hitungStatistik(dataTransaksi);\nconsole.log("Total Sukses:", hasil.totalSukses);\nconsole.log("Jumlah Transaksi:", hasil.jumlahTransaksi);',
              requirements: [
                {
                  id: 'req-exam-calc-fn',
                  description: 'Fungsi hitungStatistik menggunakan filter atau reduce untuk menghitung total sukses',
                  validate: (code) => code.includes('hitungStatistik') && (code.includes('filter') || code.includes('reduce'))
                },
                {
                  id: 'req-exam-calc-out',
                  description: 'Mengembalikan objek dengan properti totalSukses dan jumlahTransaksi',
                  validate: (code) => code.includes('totalSukses') && code.includes('jumlahTransaksi')
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
