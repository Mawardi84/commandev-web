import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Copy, 
  Check, 
  Code2, 
  ExternalLink, 
  Terminal, 
  Layers, 
  Flame, 
  Bookmark, 
  FolderGit2, 
  Sparkles, 
  Database, 
  Globe, 
  FileCode2,
  ChevronRight,
  Filter,
  Lightbulb,
  AlertTriangle,
  ShieldCheck,
  Cpu,
  Lock,
  Play,
  Server,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface DocSnippet {
  id: string;
  category: 'html' | 'css' | 'javascript' | 'python' | 'git' | 'react' | 'sql' | 'platform' | 'security' | 'devops' | 'testing' | 'privacy' | 'architecture' | 'analytics';
  title: string;
  level: 'Dasar' | 'Menengah' | 'Mahir';
  description: string;
  syntax: string;
  code: string;
  explanation: string[];
  tips?: string;
  gotcha?: string;
  tags: string[];
}

const DOC_ITEMS: DocSnippet[] = [
  // HTML
  {
    id: 'html-boilerplate',
    category: 'html',
    title: 'Struktur Standar HTML5 (Boilerplate)',
    level: 'Dasar',
    description: 'Struktur kerangka dasar dokumen web standar modern dengan deklarasi DOCTYPE dan meta tags penting.',
    syntax: '<!DOCTYPE html>\n<html lang="id">\n<head>...</head>\n<body>...</body>\n</html>',
    code: `<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Halaman Web Saya</title>
  </head>
  <body>
    <header>
      <h1>Selamat Datang di COMMANDEV</h1>
    </header>
    <main>
      <p>Belajar pemrograman secara interaktif dan praktis.</p>
    </main>
  </body>
</html>`,
    explanation: [
      '<!DOCTYPE html> memberitahu browser bahwa dokumen menggunakan standar HTML5.',
      '<meta charset="UTF-8"> memastikan encoding karakter mencakup semua simbol dan huruf internasional.',
      '<meta name="viewport"> wajib untuk membuat tata letak responsif di perangkat mobile.'
    ],
    tips: 'Selalu berikan atribut lang="id" atau bahasa yang sesuai untuk meningkatkan aksesibilitas screen-reader dan SEO.',
    tags: ['html5', 'doctype', 'meta', 'boilerplate', 'struktur']
  },
  {
    id: 'html-semantic',
    category: 'html',
    title: 'Elemen Semantik Modern (header, nav, main, article, section)',
    level: 'Menengah',
    description: 'Gunakan elemen semantik alih-alih <div> generik untuk struktur dokumen yang bersih, mudah dibaca mesin pencari, dan aksesibel.',
    syntax: '<header> / <nav> / <main> / <article> / <section> / <aside> / <footer>',
    code: `<header>
  <nav aria-label="Navigasi Utama">
    <a href="#beranda">Beranda</a>
    <a href="#kursus">Kursus</a>
  </nav>
</header>

<main>
  <article>
    <h2>Panduan Belajar JavaScript</h2>
    <p>Dipublikasikan pada <time datetime="2026-09-18">18 September 2026</time></p>
    <section>
      <h3>1. Variabel & Tipe Data</h3>
      <p>Mengenal let, const, dan immutability...</p>
    </section>
  </article>
  
  <aside>
    <h3>Artikel Terkait</h3>
    <ul>
      <li><a href="#python">Dasar Python</a></li>
    </ul>
  </aside>
</main>

<footer>
  <p>&copy; 2026 COMMANDEV Academy</p>
</footer>`,
    explanation: [
      '<header> memuat pengenalan atau navigasi grup.',
      '<main> hanya boleh ada 1 per halaman untuk konten inti dominan.',
      '<article> untuk konten independen yang bisa berdiri sendiri (misal: postingan blog).',
      '<aside> untuk konten pelengkap atau sidebar.'
    ],
    tips: 'Hindari div-soup (menumpuk banyak <div> tanpa makna). Semantik meningkatkan skor Lighthouse SEO hingga 100%.',
    tags: ['semantic', 'accessibility', 'aria', 'seo', 'html5']
  },
  {
    id: 'html-forms',
    category: 'html',
    title: 'Formulir Interaktif & Validasi HTML5',
    level: 'Menengah',
    description: 'Membangun input formulir aman dengan validasi bawaan browser tanpa JavaScript berat.',
    syntax: '<form action="..." method="POST">\n  <label for="id">Label</label>\n  <input id="id" required />\n</form>',
    code: `<form action="/api/register" method="POST" class="form-container">
  <div class="field">
    <label for="user-email">Alamat Email:</label>
    <input 
      type="email" 
      id="user-email" 
      name="email" 
      required 
      placeholder="nama@domain.com"
      autocomplete="email"
    />
  </div>

  <div class="field">
    <label for="user-pass">Password (Min. 8 karakter):</label>
    <input 
      type="password" 
      id="user-pass" 
      name="password" 
      minlength="8" 
      required 
    />
  </div>

  <button type="submit">Daftar Sekarang</button>
</form>`,
    explanation: [
      'Hubungkan selalu <label for="id_input"> dengan <input id="id_input"> agar ramah klik dan terbaca screen reader.',
      'Atribut required, minlength, pattern, type="email" memvalidasi data otomatis sebelum submit.'
    ],
    gotcha: 'Jangan lupa sertakan type="submit" pada tombol pengirim atau type="button" untuk tombol aksi biasa agar tidak memicu refresh form yang tidak diinginkan.',
    tags: ['form', 'input', 'validation', 'accessibility', 'label']
  },

  // CSS
  {
    id: 'css-flexbox',
    category: 'css',
    title: 'CSS Flexbox 1-Dimensi (Alignment & Distirbusi)',
    level: 'Dasar',
    description: 'Panduan lengkap sumbu utama (main axis) dan sumbu silang (cross axis) untuk tata letak 1 dimensi yang fleksibel.',
    syntax: 'display: flex;\njustify-content: center | space-between | flex-start;\nalign-items: center | stretch;',
    code: `.flex-navbar {
  display: flex;
  justify-content: space-between; /* Distribusi horizontal */
  align-items: center;            /* Pusatkan secara vertikal */
  gap: 1.5rem;                    /* Jarak antar item */
  padding: 1rem 2rem;
  background-color: #0f172a;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1rem;
  list-style: none;
}`,
    explanation: [
      'display: flex mengubah elemen menjadi kontainer flex dengan item anak sebagai flex items.',
      'justify-content mengatur posisi sepanjang main axis (default: horizontal).',
      'align-items mengatur posisi sepanjang cross axis (default: vertikal).',
      'gap memberikan spasi konsisten tanpa perlu margin manual pada tiap child.'
    ],
    tips: 'Gunakan flex: 1 pada salah satu anak untuk membuatnya mengisi sisa ruang yang tersedia.',
    tags: ['css', 'flexbox', 'layout', 'alignment', 'gap']
  },
  {
    id: 'css-grid',
    category: 'css',
    title: 'CSS Grid 2-Dimensi (Template Columns & Responsive)',
    level: 'Menengah',
    description: 'Membuat tata letak multi-kolom responsif otomatis tanpa media queries menggunakan repeat & minmax.',
    syntax: 'display: grid;\ngrid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\ngap: 1.5rem;',
    code: `.card-grid {
  display: grid;
  /* Responsif otomatis: minimal lebar 280px, maksimal 1 fraksi */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.card {
  background: #1e293b;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #334155;
}`,
    explanation: [
      'auto-fit otomatis menghitung berapa kolom yang muat di lebar layar saat ini.',
      'minmax(280px, 1fr) memastikan kartu tidak pernah lebih sempit dari 280px dan membesar jika ada sisa ruang.',
      'Sangat ampuh untuk dashboard card dan galeri tanpa boilerplate CSS tambahan.'
    ],
    tips: 'Gunakan grid-template-areas untuk tata letak halaman komprehensif (header, sidebar, content, footer).',
    tags: ['css', 'grid', 'responsive', 'minmax', 'layout']
  },

  // JavaScript
  {
    id: 'js-array-methods',
    category: 'javascript',
    title: 'Modern Array Methods (map, filter, reduce, find)',
    level: 'Dasar',
    description: 'Manipulasi array secara fungsional dan immutable tanpa for loop konvensional.',
    syntax: 'array.map(fn) | array.filter(fn) | array.reduce(fn, initial) | array.find(fn)',
    code: `const products = [
  { id: 1, name: 'Keyboard Mekanikal', price: 650000, inStock: true },
  { id: 2, name: 'Mouse Gaming', price: 350000, inStock: false },
  { id: 3, name: 'Monitor 27 inch 144Hz', price: 2800000, inStock: true }
];

// 1. FILTER: Hanya barang yang ready stock
const available = products.filter(p => p.inStock);

// 2. MAP: Ambil daftar nama dengan format rupiah
const formatted = available.map(p => ({
  name: p.name,
  formattedPrice: \`Rp \${p.price.toLocaleString('id-ID')}\`
}));

// 3. REDUCE: Hitung total nilai inventaris barang yang tersedia
const totalInventory = available.reduce((acc, p) => acc + p.price, 0);

console.log('Total Nilai Barang:', totalInventory); // Rp 3.450.000`,
    explanation: [
      'map() mengembalikan array baru dengan panjang yang sama berdasarkan hasil transformasi.',
      'filter() mengembalikan array baru berisi elemen yang lolos kondisi boolean (true).',
      'reduce() mengakumulasi seluruh elemen menjadi satu nilai tunggal (angka, objek, atau array baru).'
    ],
    tips: 'Selalu berikan nilai awal (misal: 0 atau {}) pada parameter kedua reduce untuk menghindari runtime error jika array kosong.',
    tags: ['javascript', 'es6', 'array', 'map', 'filter', 'reduce']
  },
  {
    id: 'js-async-await',
    category: 'javascript',
    title: 'Async/Await & Fetch API dengan Error Handling',
    level: 'Menengah',
    description: 'Pola asinkron modern untuk mengambil data API dengan try/catch terstruktur.',
    syntax: 'async function getData() {\n  try {\n    const res = await fetch(url);\n    const data = await res.json();\n  } catch (err) {}\n}',
    code: `async function fetchUserProfile(userId) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    
    // Periksa status HTTP selain 200-299
    if (!response.ok) {
      throw new Error(\`Gagal memuat data. Status: \${response.status}\`);
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error saat fetch profil:', error.message);
    // Berikan fallback aman
    return null;
  }
}

// Penggunaan:
// const profile = await fetchUserProfile(42);`,
    explanation: [
      'await menghentikan eksekusi baris sementara hingga Promise selesai (resolved).',
      'fetch() tidak otomatis melempar error pada kode status 404 atau 500, periksa selalu response.ok.',
      'try/catch menangkap error jaringan (offline, CORS, DNS).'
    ],
    tips: 'Gunakan AbortController untuk membatalkan request HTTP yang sudah tidak dibutuhkan (misal: saat pengguna mengetik di search bar).',
    tags: ['javascript', 'async', 'await', 'fetch', 'promise', 'api']
  },

  // Python
  {
    id: 'py-data-structures',
    category: 'python',
    title: 'Struktur Data Utama Python (List, Tuple, Dict, Set)',
    level: 'Dasar',
    description: 'Perbandingan 4 tipe koleksi bawaan Python beserta karakteristik mutabilitas dan waktu akses.',
    syntax: 'list = [1, 2] | tuple = (1, 2) | dict = {"a": 1} | set = {1, 2}',
    code: `# 1. LIST: Terurut, bisa diubah (mutable), duplikasi diizinkan
fruits = ["apel", "mangga", "pisang"]
fruits.append("jeruk")

# 2. TUPLE: Terurut, TIDAK bisa diubah (immutable), hemat memori
coordinates = (-6.2088, 106.8456)

# 3. DICT: Pasangan Key-Value unik, pencarian super cepat O(1)
developer = {
    "name": "Budi Pratama",
    "role": "Full Stack Dev",
    "xp": 450,
    "skills": ["Python", "JavaScript"]
}
print(developer.get("role", "Tamu"))

# 4. SET: Tidak terurut, elemen UNIK tanpa duplikasi
unique_tags = {"python", "ai", "python", "fastapi"}
# Hasil: {'python', 'ai', 'fastapi'}`,
    explanation: [
      'Gunakan List saat urutan penting dan data sering bertambah/berkurang.',
      'Gunakan Tuple untuk data konfigurasi konstan yang tidak boleh diubah tidak sengaja.',
      'Gunakan Dict untuk pemetaan data terstruktur (mirip JSON).',
      'Gunakan Set untuk operasi matematika himpunan (union, intersection) atau menghapus duplikasi.'
    ],
    tips: 'Gunakan dict.get(key, default) alih-alih dict[key] untuk menghindari KeyError saat key tidak ditemukan.',
    tags: ['python', 'list', 'dict', 'set', 'tuple', 'data-structures']
  },
  {
    id: 'py-comprehensions',
    category: 'python',
    title: 'List & Dict Comprehensions',
    level: 'Menengah',
    description: 'Sintaks elegan dan cepat (Pythonic) untuk membuat list atau dictionary baru dalam satu baris.',
    syntax: '[expression for item in iterable if condition]\n{key_expr: val_expr for item in iterable}',
    code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# List Comprehension: Kuadratkan hanya angka genap
even_squares = [n ** 2 for n in numbers if n % 2 == 0]
print(even_squares) # [4, 16, 36, 64, 100]

# Dict Comprehension: Mapping kata ke panjang karakternya
words = ["python", "commandev", "backend", "developer"]
word_lengths = {w: len(w) for w in words}
print(word_lengths)
# {'python': 6, 'commandev': 9, 'backend': 7, 'developer': 9}`,
    explanation: [
      'Comprehension lebih cepat secara performa dibanding loop .append() karena dioptimalkan di tingkat C bytecode Python.',
      'Menjaga kode tetap bersih dan mudah dibaca (Pythonic code).'
    ],
    gotcha: 'Jangan membuat comprehension terlalu bersarang (nested) lebih dari 2 level karena akan merusak keterbacaan kode.',
    tags: ['python', 'comprehension', 'list', 'dict', 'pythonic']
  },
  {
    id: 'py-oop',
    category: 'python',
    title: 'Object-Oriented Programming (OOP) & Inheritance',
    level: 'Menengah',
    description: 'Membangun arsitektur perangkat lunak modular dengan Class, constructor __init__, enkapsulasi, dan pewarisan.',
    syntax: 'class Name(Parent):\n  def __init__(self, arg):\n    self.attr = arg',
    code: `class Developer:
    """Kelas dasar untuk developer di tim COMMANDEV."""
    def __init__(self, name: str, xp: int = 0):
        self.name = name
        self.xp = xp

    def gain_xp(self, amount: int):
        self.xp += amount
        print(f"🎉 {self.name} mendapat +{amount} XP! Total: {self.xp}")

    def code(self) -> str:
        return f"{self.name} sedang menulis kode..."


class PythonMaster(Developer):
    """Pewarisan: Spesialis Python dengan kemampuan tambahan."""
    def __init__(self, name: str, xp: int = 0, framework: str = "FastAPI"):
        super().__init__(name, xp)
        self.framework = framework

    def code(self) -> str:
        # Override method
        return f"{self.name} sedang membangun REST API dengan {self.framework}!"


# Instansiasi
dev = PythonMaster(name="Ahmad", xp=120, framework="FastAPI")
print(dev.code())
dev.gain_xp(50)`,
    explanation: [
        'self merepresentasikan instance objek saat ini.',
        '__init__ adalah constructor yang otomatis dipanggil saat objek dibuat.',
        'super().__init__() memanggil constructor dari parent class untuk mewarisi atribut.'
    ],
    tips: 'Gunakan Type Hints (misal: name: str, xp: int = 0) untuk membantu autocomplete IDE dan mencegah bug tipe data.',
    tags: ['python', 'oop', 'class', 'inheritance', 'methods']
  },

  // Git & GitHub
  {
    id: 'git-essential-workflow',
    category: 'git',
    title: 'Alur Kerja Inti Git (Init, Add, Commit, Push)',
    level: 'Dasar',
    description: 'Urutan siklus harian developer saat menyimpan dan mengunggah perubahan kode ke GitHub.',
    syntax: 'git init -> git add . -> git commit -m "..." -> git push origin main',
    code: `# 1. Inisialisasi repo di direktori baru
git init

# 2. Periksa status file yang baru dibuat / dimodifikasi
git status

# 3. Pindahkan file ke Staging Area (Siap di-commit)
git add index.html app.js
# atau seluruh file:
git add .

# 4. Rekam snapshot perubahan permanen dengan pesan deskriptif
git commit -m "feat(auth): implementasi formulir login dan validasi email"

# 5. Hubungkan ke remote GitHub & Push
git remote add origin https://github.com/username/project.git
git branch -M main
git push -u origin main`,
    explanation: [
      'Working Directory: Area kerja tempat file Anda diedit.',
      'Staging Area: Tempat file dipilih sebelum disimpan menjadi snapshot.',
      'Repository (.git): Riwayat commit snapshot yang permanen dan terenkripsi hash SHA-1.'
    ],
    tips: 'Gunakan konvensi Conventional Commits (misal: feat:, fix:, docs:, refactor:) agar riwayat proyek profesional.',
    tags: ['git', 'github', 'commit', 'staging', 'push', 'cli']
  },
  {
    id: 'git-branching-merge',
    category: 'git',
    title: 'Git Branching & Safe Merging Strategy',
    level: 'Menengah',
    description: 'Membuat fitur baru di branch terisolasi tanpa mengganggu branch utama (main/master).',
    syntax: 'git checkout -b <nama-branch> | git switch -c <nama-branch>\ngit merge <nama-branch>',
    code: `# 1. Buat dan langsung pindah ke branch fitur baru
git checkout -b feat/payment-gateway
# atau cara modern:
git switch -c feat/payment-gateway

# 2. Kerjakan kode, lalu simpan commit di branch ini
git add .
git commit -m "feat: integrasi webhook Stripe payment"

# 3. Kembali ke branch utama (main)
git switch main

# 4. Pastikan main terupdate dari remote
git pull origin main

# 5. Gabungkan fitur baru ke branch main
git merge feat/payment-gateway

# 6. Hapus branch fitur yang sudah selesai di-merge
git branch -d feat/payment-gateway`,
    explanation: [
      'Branch adalah penunjuk ringan (pointer) ke commit tertentu, membuat branching di Git sangat cepat (instan).',
      'git switch diperkenalkan di Git modern untuk membedakan perpindahan branch dengan restore file di git checkout.'
    ],
    gotcha: 'Jika terjadi Merge Conflict, buka file yang konflik, pilih kode yang benar antara <<<<<<< HEAD dan >>>>>>>, lalu lakukan git add & git commit.',
    tags: ['git', 'branch', 'merge', 'checkout', 'switch', 'conflict']
  },

  // React
  {
    id: 'react-hooks-core',
    category: 'react',
    title: 'React Core Hooks (useState & useEffect)',
    level: 'Dasar',
    description: 'Manajemen state lokal komponen dan penanganan efek samping siklus hidup komponen fungsional.',
    syntax: 'const [state, setState] = useState(initial);\nuseEffect(() => { ... return () => cleanup; }, [deps]);',
    code: `import React, { useState, useEffect } from 'react';

export function TimerCounter() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId = null;

    if (isActive) {
      intervalId = window.setInterval(() => {
        // Gunakan functional updater agar tidak bergantung pada stale state
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    // Cleanup function: Wajib membersihkan interval saat unmount/stop
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive]); // Dependency array: hanya jalan ulang saat isActive berubah

  return (
    <div className="p-4 rounded-xl bg-slate-900 text-white">
      <h3 className="text-xl font-bold">Waktu: {seconds} detik</h3>
      <div className="flex gap-2 mt-3">
        <button 
          onClick={() => setIsActive(!isActive)}
          className="px-4 py-2 bg-indigo-600 rounded-lg font-bold"
        >
          {isActive ? 'Jeda' : 'Mulai'}
        </button>
        <button 
          onClick={() => { setIsActive(false); setSeconds(0); }}
          className="px-4 py-2 bg-slate-700 rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
}`,
    explanation: [
      'useState memicu render ulang komponen setiap kali nilai state diperbarui.',
      'useEffect menjalankan kode efek samping setelah DOM di-render.',
      'Fungsi return di dalam useEffect adalah fungsi pembersih (cleanup) untuk mencegah memory leak.'
    ],
    tips: 'Selalu gunakan functional update (prev => prev + 1) jika state baru bergantung pada state sebelumnya.',
    tags: ['react', 'hooks', 'usestate', 'useeffect', 'state']
  },

  // SQL
  {
    id: 'sql-crud-joins',
    category: 'sql',
    title: 'SQL Fundamental (CRUD Queries & INNER / LEFT JOIN)',
    level: 'Menengah',
    description: 'Sintaks standar pengambilan data relasional, agregasi, dan penggabungan multi-tabel.',
    syntax: 'SELECT col FROM table1 JOIN table2 ON table1.id = table2.t1_id WHERE condition;',
    code: `-- 1. MEMBUAT TABEL DENGAN RELASI FOREIGN KEY
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id) ON DELETE CASCADE,
  course_name VARCHAR(100) NOT NULL,
  score INT DEFAULT 0
);

-- 2. QUERY RELASIONAL DENGAN INNER JOIN & AGGREGASI
SELECT 
  s.name AS student_name,
  s.email,
  COUNT(e.id) AS total_courses,
  AVG(e.score) AS average_score
FROM students s
INNER JOIN enrollments e ON s.id = e.student_id
WHERE e.score >= 75
GROUP BY s.id, s.name, s.email
HAVING COUNT(e.id) >= 2
ORDER BY average_score DESC
LIMIT 10;`,
    explanation: [
      'INNER JOIN hanya mengembalikan baris yang memiliki kecocokan di kedua tabel.',
      'LEFT JOIN mengembalikan semua baris dari tabel kiri meskipun tidak ada relasi di tabel kanan.',
      'GROUP BY mengelompokkan baris untuk fungsi agregat (COUNT, AVG, SUM, MAX, MIN).',
      'HAVING menyaring hasil setelah agregasi (berbeda dengan WHERE yang menyaring sebelum agregasi).'
    ],
    tips: 'Gunakan INDEX pada kolom yang sering digunakan dalam klausa WHERE dan JOIN (seperti foreign key) untuk mempercepat query.',
    tags: ['sql', 'database', 'join', 'select', 'postgres', 'crud']
  },

  // Platform
  {
    id: 'codera-learning-loop',
    category: 'platform',
    title: 'Siklus Belajar COMMANDEV: 8 Tahap Penguasaan',
    level: 'Dasar',
    description: 'Filosofi pedagogi pembelajaran aktif COMMANDEV untuk membangun kemampuan problem solving nyata.',
    syntax: 'LEARN -> UNDERSTAND -> CODE -> PRACTICE -> CHALLENGE -> QUIZ -> BUILD -> MASTER',
    code: `/* COMMANDEV Active Mastery Framework */
1. LEARN       -> Membaca konsep inti tanpa teori bertele-tele
2. UNDERSTAND  -> Melihat visualisasi dan contoh kode dunia nyata
3. CODE        -> Mengetik langsung di editor dengan real-time execution
4. PRACTICE    -> Memperbaiki bug dan memodifikasi parameter
5. CHALLENGE   -> Menyelesaikan soal dengan automated AST & DOM test engine
6. QUIZ        -> Menguji pemahaman prediktif dan konseptual
7. BUILD       -> Mengerjakan proyek portofolio end-to-end
8. MASTER      -> Mendapatkan XP, streak, dan keterampilan siap industri`,
    explanation: [
      'COMMANDEV memprioritaskan pemecahan masalah dan kemampuan menulis kode langsung dibanding menonton video pasif.',
      'AI Tutor hadir dengan panduan bertingkat (5-stage Hint) untuk membimbing pola pikir mandiri.'
    ],
    tips: 'Kerjakan latihan harian minimal 15 menit untuk mempertahankan streak dan memaksimalkan retensi memori jangka panjang.',
    tags: ['commandev', 'pedagogy', 'methodology', 'mastery', 'xp']
  },

  // Cybersecurity & Web Defense
  {
    id: 'sec-sqli-mitigation',
    category: 'security',
    title: 'Pencegahan SQL Injection: Parameterized Query & ORM',
    level: 'Mahir',
    description: 'Pemisahan tegas kode query dengan input pengguna menggunakan placeholder terkompilasi (Prepared Statements) atau ORM ber-typed.',
    syntax: 'db.query("SELECT * FROM users WHERE email = $1 AND role = $2", [email, role])',
    code: `// Express + PostgreSQL Driver
// ❌ RENTAN VULNERABILITY (String Concatenation)
// const badQuery = "SELECT * FROM users WHERE email = '" + req.body.email + "'";

// ✅ AMAN DEFENSIVE (Parameterized Query / Prepared Statement)
const safeQuery = 'SELECT id, email, password_hash, role FROM users WHERE email = $1 LIMIT 1';
const result = await db.query(safeQuery, [req.body.email]);

// ✅ AMAN dengan Prisma ORM / Query Builder
const user = await prisma.user.findUnique({
  where: { email: req.body.email },
  select: { id: true, email: true, role: true }
});`,
    explanation: [
      'Database mengkompilasi struktur AST query sebelum menerima nilai parameter $1, sehingga karakter petik atau SQL command dari user diperlakukan murni sebagai string literal.',
      'Menghilangkan 100% risiko bypass autentikasi (\' OR 1=1 --) dan kebocoran basis data.',
      'Hindari penggunaan raw string concatenation atau format string f"SELECT... {input}" di bahasa manapun.'
    ],
    tips: 'Selalu gunakan akun database dengan prinsip Least Privilege (aplikasi backend tidak boleh login sebagai superuser postgres/root).',
    gotcha: 'Pustaka query builder yang menggunakan raw literal method (seperti db.raw(userInput)) tetap berisiko jika tidak menggunakan binding.',
    tags: ['security', 'sqli', 'owasp', 'defense', 'database', 'postgres', 'prepared-statements']
  },
  {
    id: 'sec-xss-mitigation',
    category: 'security',
    title: 'Pencegahan DOM & Stored XSS: Contextual Encoding & CSP',
    level: 'Mahir',
    description: 'Mencegah eksekusi script jahat di browser pengguna dengan menghentikan innerHTML yang tidak disanitasi dan menegakkan Content Security Policy.',
    syntax: 'element.textContent = untrustedInput;\n// atau gunakan DOMPurify.sanitize(input)',
    code: `// ❌ BAHAYA (DOM XSS via innerHTML)
// userContainer.innerHTML = \`<span>Halo \${userName}</span>\`; 

// ✅ AMAN (DOM Safe Insertion dengan textContent)
const greetingSpan = document.createElement('span');
greetingSpan.textContent = \`Halo \${userName}\`; // Otomatis di-escape oleh browser engine
userContainer.appendChild(greetingSpan);

// ✅ Jika wajib merender format HTML berizin, gunakan DOMPurify:
import DOMPurify from 'dompurify';
const cleanHtml = DOMPurify.sanitize(userBioMarkdown, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'code'],
  ALLOWED_ATTR: ['href', 'target', 'rel']
});
userContainer.innerHTML = cleanHtml;`,
    explanation: [
      'textContent memperlakukan semua input sebagai teks murni sehingga tag <script> atau payload onerror tidak akan dieksekusi.',
      'React JSX secara default meng-escape nilai variabel dalam kurung kurawal {userName}. Hindari dangerouslySetInnerHTML kecuali sudah melalui DOMPurify.',
      'Tambahkan header HTTP Content-Security-Policy: default-src \'self\' untuk memblokir script luar tak berizin.'
    ],
    tips: 'Atur cookie sesi penting dengan flag HttpOnly; Secure; SameSite=Lax agar script XSS tidak dapat mencuri token sesi via document.cookie.',
    gotcha: 'Jangan percaya sanitasi regex sederhana seperti input.replace("<script>", "") karena penyerang dapat menggunakan variasi <SCRIPT>, <svg onload=...>, atau <img src=x onerror=...>.',
    tags: ['security', 'xss', 'dompurify', 'csp', 'defense', 'owasp']
  },
  {
    id: 'sec-password-hashing',
    category: 'security',
    title: 'Password Hashing Standar Industri (Argon2id / Bcrypt + Salt)',
    level: 'Mahir',
    description: 'Melindungi kata sandi pengguna secara satu arah (one-way hashing) dengan salt acak dan work factor tinggi untuk menahan serangan brute-force GPU.',
    syntax: 'const hash = await bcrypt.hash(rawPassword, saltRounds = 12);\nconst isMatch = await bcrypt.compare(candidatePassword, hash);',
    code: `import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12; // Work factor adaptif

// 1. Registrasi Akun: Hash Password
export async function registerUser(email: string, rawPass: string) {
  // Jangan pernah simpan plain-text atau hash lemah seperti MD5/SHA-1!
  const passwordHash = await bcrypt.hash(rawPass, SALT_ROUNDS);
  
  return await db.user.create({
    data: { email, passwordHash }
  });
}

// 2. Login: Verifikasi Hash dengan Constant-Time Comparison
export async function authenticateUser(email: string, candidatePass: string) {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) return null;

  // bcrypt.compare aman dari timing attack
  const isValid = await bcrypt.compare(candidatePass, user.passwordHash);
  if (!isValid) return null;

  return { id: user.id, email: user.email };
}`,
    explanation: [
      'MD5, SHA-1, dan SHA-256 dibuat cepat untuk integritas file dan TIDAK aman untuk password karena dapat di-crack triliunan kali per detik di GPU.',
      'Bcrypt dan Argon2id adalah memory-hard dan CPU-intensive adaptive hash function yang mempersulit cracking massal.',
      'Salt unik di-generate otomatis untuk setiap password sehingga rainbow table attack menjadi sia-sia.'
    ],
    tips: 'Gunakan argon2id jika tersedia pada runtime, atau bcrypt dengan salt round minimal 12 untuk sistem produksi modern.',
    tags: ['security', 'auth', 'bcrypt', 'argon2', 'password', 'hashing', 'salt']
  },
  {
    id: 'sec-http-security-headers',
    category: 'security',
    title: 'HTTP Security Headers Esensial (Helmet / Nginx)',
    level: 'Menengah',
    description: 'Kumpulan header respons HTTP wajib untuk melindungi web aplikasi dari clickjacking, sniffing tipe MIME, dan downgrade HTTPS.',
    syntax: 'app.use(helmet()); // Node.js Express\n# Atau konfigurasi server block Nginx',
    code: `// Express.js dengan middleware Helmet
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      frameAncestors: ["'none'"] // Anti Clickjacking
    }
  },
  strictTransportSecurity: {
    maxAge: 31536000, // 1 tahun
    includeSubDomains: true,
    preload: true
  }
}));

// Header yang otomatis dipasang:
// Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
// X-Frame-Options: DENY
// X-Content-Type-Options: nosniff
// Referrer-Policy: strict-origin-when-cross-origin`,
    explanation: [
      'Strict-Transport-Security (HSTS) memaksa browser selalu memakai HTTPS, mencegah serangan Man-in-the-Middle SSL stripping.',
      'X-Frame-Options: DENY mencegah halaman dimuat dalam <iframe> oleh situs lain (mitigasi clickjacking).',
      'X-Content-Type-Options: nosniff mencegah browser mengeksekusi file non-script sebagai script melalui MIME confusion.'
    ],
    tips: 'Uji header web Anda secara gratis di securityheaders.com untuk memastikan mendapatkan skor A+.',
    tags: ['security', 'headers', 'helmet', 'hsts', 'csp', 'hardening', 'nginx']
  },

  // DevSecOps & Cloud Deployment
  {
    id: 'devops-docker-nonroot',
    category: 'devops',
    title: 'Dockerfile Minimalis & Non-Root User Hardening',
    level: 'Menengah',
    description: 'Praktik terbaik containerization Node.js/Python dengan multi-stage build, layer caching, dan eksekusi non-root untuk mencegah container escape.',
    syntax: 'USER node\n# Jangan pernah menjalankan container produksi sebagai root!',
    code: `# Multi-stage Build untuk Node.js Production
# Stage 1: Build & Dependencies
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --production

# Stage 2: Production Minimal Runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Gunakan non-root user bawaan Alpine ('node')
USER node

COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/package.json ./

EXPOSE 3000
CMD ["node", "dist/server.js"]`,
    explanation: [
      'Multi-stage build memisahkan alat build (compilers, devDependencies) dari image produksi akhir sehingga ukurannya sangat ramping (<150MB).',
      'Menjalankan container sebagai USER node mencegah penyerang mengambil alih root host kernel jika terjadi celah container escape.',
      'Layer COPY package*.json mendahului source code agar layer docker cache tidak rebuild jika dependencies tidak berubah.'
    ],
    tips: 'Jalankan "docker scout quickview" atau "trivy image nama-image" untuk memindai CVE kerentanan OS base image.',
    tags: ['devops', 'docker', 'container', 'non-root', 'multi-stage', 'hardening']
  },
  {
    id: 'devops-cicd-security',
    category: 'devops',
    title: 'Pipeline CI/CD DevSecOps (Shift-Left Security Automated Gate)',
    level: 'Mahir',
    description: 'Otomatisasi pengujian, linting, SAST (Static Application Security Testing), dan audit dependensi pada setiap pull request.',
    syntax: 'GitHub Actions: .github/workflows/ci.yml',
    code: `name: DevSecOps CI Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test-and-audit:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Linter & Type Check
        run: npm run lint

      - name: Run Automated Test Suite
        run: npm test -- --coverage

      - name: Dependency Vulnerability Audit
        run: npm audit --audit-level=high`,
    explanation: [
      'Shift-Left Security: Mendeteksi bug dan kerentanan keamanan di tahap commit awal sebelum kode pernah mencapai server staging atau produksi.',
      'npm audit --audit-level=high memblokir build jika ada library pihak ketiga yang memiliki CVE eksploitatif parah.',
      'Pengujian terintegrasi memastikan tidak ada regresi logika saat kode baru di-merge.'
    ],
    tips: 'Gunakan branch protection rule di GitHub agar PR tidak bisa di-merge jika status CI ada yang gagal.',
    tags: ['devops', 'cicd', 'github-actions', 'sast', 'audit', 'shift-left']
  },

  // Testing QA
  {
    id: 'test-unit-assertions',
    category: 'testing',
    title: 'Testing Pyramid: Unit Testing & Assertions (Vitest / Jest)',
    level: 'Dasar',
    description: 'Menulis pengujian unit modular dan deterministik dengan AAA pattern (Arrange, Act, Assert) untuk menjaga keandalan kode.',
    syntax: 'describe("feature", () => { it("should do X", () => { expect(result).toBe(expected); }); });',
    code: `import { describe, it, expect } from 'vitest';
import { calculateOrderTotal, applyDiscount } from './orderService';

describe('Order Calculation Logic', () => {
  // Arrange
  const sampleItems = [
    { name: 'Buku TypeScript', price: 150000, qty: 2 },
    { name: 'Stiker Dev', price: 25000, qty: 1 }
  ];

  it('menghitung subtotal dengan benar untuk kumpulan item', () => {
    // Act
    const total = calculateOrderTotal(sampleItems);

    // Assert
    expect(total).toBe(325000);
  });

  it('menerapkan diskon promo 20% secara presisi', () => {
    const discounted = applyDiscount(100000, 0.20);
    expect(discounted).toBe(80000);
  });

  it('menolak nilai diskon negatif atau di atas 100%', () => {
    expect(() => applyDiscount(100000, -0.1)).toThrow('Diskon tidak valid');
    expect(() => applyDiscount(100000, 1.5)).toThrow('Diskon tidak valid');
  });
});`,
    explanation: [
      'Pola Arrange-Act-Assert (AAA): Siapkan data uji, jalankan fungsi target, dan verifikasi hasilnya dengan ekspektasi ketat.',
      'Unit test harus berjalan cepat (dalam hitungan milidetik), terisolasi, dan tidak boleh bergantung pada koneksi internet luar atau database hidup.',
      'Uji selalu edge cases (input 0, nilai negatif, string kosong, null, array kosong).'
    ],
    tips: 'Targetkan minimal 80% code coverage pada modul bisnis penting (financial calculation, authentication, permission logic).',
    tags: ['testing', 'unit-test', 'vitest', 'jest', 'qa', 'assertions', 'edge-cases']
  },

  // Privacy & Production Ops
  {
    id: 'priv-uu-pdp-checklist',
    category: 'privacy',
    title: 'Kepatuhan UU PDP No. 27/2022 & Data Minimization',
    level: 'Menengah',
    description: 'Pedoman implementasi teknis pemrosesan Data Pribadi di Indonesia (persetujuan eksplisit, enkripsi, dan hak penghapusan data).',
    syntax: 'Prinsip: Akuntabilitas, Pembatasan Tujuan, dan Retensi Terbatas',
    code: `/* Standar Kepatuhan UU Pelindungan Data Pribadi (UU PDP No. 27/2022) */

// 1. Data Minimization (Hanya kumpulkan data yang benar-benar esensial)
interface SafeUserRegistrationInput {
  email: string;       // Dibutuhkan untuk identifikasi & komunikasi akun
  password: string;    // Di-hash dengan salt
  // JANGAN meminta NIK atau Alamat lengkap jika aplikasi tidak mengirim barang fisik!
}

// 2. Explicit Consent (Persetujuan Tercatat)
const userAgreement = {
  consentGranted: true,
  consentTimestamp: new Date().toISOString(),
  policyVersion: 'v2026.1',
  purpose: 'Akses pembelajaran platform'
};

// 3. Hak Subjek Data (Right to Erasure / Hak Dihapus)
export async function deleteUserData(userId: string) {
  // Hapus semua data identifikasi pribadi (PII) dari sistem primer dan log cadangan
  await db.user.delete({ where: { id: userId } });
  console.log(\`User \${userId} PII purged compliant with UU PDP Pasal 43.\`);
}`,
    explanation: [
      'UU PDP Pasal 16 & 20: Pemrosesan data pribadi wajib memiliki dasar hukum yang sah, salah satunya persetujuan eksplisit (consent).',
      'Prinsip Data Minimization: Kumpulkan sesedikit mungkin data pribadi yang relevan untuk tujuan operasional.',
      'Enkripsi: Lindungi data pribadi saat ditransmisikan (HTTPS TLS 1.3) dan saat disimpan di basis data (At-Rest Encryption AES-256).'
    ],
    tips: 'Jangan pernah mencatat informasi rahasia atau PII pengguna (password, token, nomor kartu kredit) ke dalam log aplikasi (console.log / access logs).',
    tags: ['privacy', 'uu-pdp', 'pii', 'compliance', 'gdpr', 'data-protection', 'audit']
  },
  // Software Architecture & System Design
  {
    id: 'arch-clean-hexagonal',
    category: 'architecture',
    title: 'Clean Architecture & Hexagonal Ports/Adapters',
    level: 'Mahir',
    description: 'Pemisahan aturan bisnis murni (core domain entities & use cases) dari detail teknis (frameworks, databases, web UI) menggunakan prinsip dependency inversion.',
    syntax: 'Domain Entities -> Use Cases (Interactors) -> Interface Adapters (Controllers/Presenters) -> Frameworks & Drivers',
    code: `// 1. Domain Entity (Murni tanpa dependensi eksternal)
export interface Order {
  id: string;
  totalAmount: number;
  status: 'pending' | 'paid' | 'cancelled';
}

// 2. Port (Interface Port Keluar)
export interface OrderRepositoryPort {
  save(order: Order): Promise<void>;
  findById(id: string): Promise<Order | null>;
}

// 3. Use Case (Interacting Core Business Logic)
export class CheckoutOrderUseCase {
  constructor(private orderRepo: OrderRepositoryPort) {}

  async execute(orderId: string): Promise<Order> {
    const order = await this.orderRepo.findById(orderId);
    if (!order) throw new Error('Order not found');
    order.status = 'paid';
    await this.orderRepo.save(order);
    return order;
  }
}`,
    explanation: [
      'Arah dependensi selalu mengalir ke dalam: detail teknis bergantung pada abstraksi inti domain, bukan sebaliknya.',
      'Memungkinkan unit testing 100% tanpa perlu menyalakan database atau web server nyata.',
      'Mudah mengganti infrastruktur (misalnya migrasi dari SQL ke NoSQL) tanpa mengubah logika bisnis sedikitpun.'
    ],
    tips: 'Gunakan Dependency Injection (DI) untuk menyuntikkan adapter implementasi nyata ke dalam use case saat runtime aplikasi.',
    gotcha: 'Jangan membocorkan ORM model (misal Prisma / Mongoose model) langsung ke dalam Domain Entity.',
    tags: ['architecture', 'clean-architecture', 'hexagonal', 'ddd', 'ports-and-adapters', 'solid']
  },
  {
    id: 'arch-cqrs-event-sourcing',
    category: 'architecture',
    title: 'CQRS (Command Query Responsibility Segregation) & Event Sourcing',
    level: 'Mahir',
    description: 'Pemisahan model mutasi data (Commands) dari model pembacaan data (Queries) dengan merekam seluruh perubahan sebagai rentetan peristiwa (Immutable Events).',
    syntax: 'Command -> Command Handler -> Event Store -> Projection -> Read Database -> Query Handler',
    code: `// Immutable Domain Event
interface OrderPlacedEvent {
  eventType: 'ORDER_PLACED';
  orderId: string;
  amount: number;
  timestamp: string;
}

// Event-Sourced Aggregate
class OrderAggregate {
  private id: string = '';
  private state: 'pending' | 'placed' | 'cancelled' = 'pending';

  apply(event: OrderPlacedEvent): void {
    this.id = event.orderId;
    this.state = 'placed';
  }
}

// Command Handler (Write Model)
async function handlePlaceOrderCommand(cmd: { orderId: string, amount: number }): Promise<void> {
  const event: OrderPlacedEvent = {
    eventType: 'ORDER_PLACED',
    orderId: cmd.orderId,
    amount: cmd.amount,
    timestamp: new Date().toISOString()
  };
  await eventStore.append('orders', cmd.orderId, event);
  await messageBroker.publish('order-events', event);
}`,
    explanation: [
      'Command hanya bertanggung jawab memvalidasi dan memutasikan state melalui rekaman event.',
      'Query membaca dari Read Database teroptimasi (misal Elasticsearch atau Redis Read Replica).',
      'Event Store menjadi audit trail mutlak yang memungkinkan time-travel debugging dan re-proyeksi data.'
    ],
    tips: 'Gunakan Idempotency Key pada command handler untuk mencegah pemrosesan transaksi ganda saat terjadi retry jaringan.',
    tags: ['cqrs', 'event-sourcing', 'kafka', 'distributed-systems', 'event-driven']
  },
  {
    id: 'arch-circuit-breaker',
    category: 'architecture',
    title: 'Resilience: Circuit Breaker Pattern & Bulkhead',
    level: 'Mahir',
    description: 'Pola pencegahan cascading failure pada microservices dengan memutus aliran request ke dependency yang sedang mengalami degradasi atau kegagalan.',
    syntax: 'States: CLOSED (Normal) -> OPEN (Fail-Fast) -> HALF-OPEN (Trial Recovery)',
    code: `class CircuitBreaker {
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private failureCount = 0;
  private readonly threshold = 5;
  private lastFailureTime = 0;
  private readonly resetTimeoutMs = 10000;

  async execute<T>(action: () => Promise<T>, fallback: () => T): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.resetTimeoutMs) {
        this.state = 'HALF_OPEN';
      } else {
        return fallback(); // Fail-fast instant fallback
      }
    }

    try {
      const result = await action();
      if (this.state === 'HALF_OPEN') {
        this.state = 'CLOSED';
        this.failureCount = 0;
      }
      return result;
    } catch (err) {
      this.failureCount++;
      this.lastFailureTime = Date.now();
      if (this.failureCount >= this.threshold) {
        this.state = 'OPEN';
      }
      return fallback();
    }
  }
}`,
    explanation: [
      'CLOSED: Request dialirkan normal. Jika failure rate melewati threshold, beralih ke OPEN.',
      'OPEN: Request langsung ditolak tanpa membebani layanan tujuan (fail-fast) dan fallback dieksekusi.',
      'HALF-OPEN: Setelah timeout berlalu, sejumlah kecil request diizinkan lewat untuk menguji pemulihan layanan.'
    ],
    tips: 'Kombinasikan Circuit Breaker dengan Bulkhead pattern untuk mengisolasi resource pool (misal connection pool berbeda antar service).',
    tags: ['resilience', 'circuit-breaker', 'bulkhead', 'microservices', 'chaos-engineering']
  },
  // Observational Analytics & Telemetry
  {
    id: 'analytics-observational-telemetry',
    category: 'analytics',
    title: 'Fondasi Telemetri Observasional & Prinsip Non-Blocking',
    level: 'Menengah',
    description: 'Desain pipeline analitik terstandar yang bersifat observasional, tidak memengaruhi logika otoritatif, dan bebas gangguan bagi pengguna.',
    syntax: 'Domain Action -> Authoritative State Mutation -> Observational Dispatch (non-blocking) -> Sanitizer -> Ingestion',
    code: `// 1. Authoritative Business Logic (Source of Truth)
await completeLessonInDatabase(userId, lessonId, xpReward);

// 2. Observational Telemetry Dispatch (Strictly Non-Blocking)
try {
  analyticsService.trackEvent({
    eventName: 'lesson_completed',
    courseId: 'software-architecture',
    lessonId,
    properties: {
      lessonTitle: 'Clean Architecture',
      xpGained: xpReward
    }
  });
} catch {
  // Silent fallback: kegagalan analitik tidak boleh menggagalkan kelulusan siswa
}`,
    explanation: [
      'Observational: Analitik hanya mengamati peristiwa setelah mutasi state berhasil; analitik tidak boleh menentukan nilai, XP, atau kelulusan.',
      'Non-Blocking: Seluruh pemanggilan analitik dibungkus dalam blok try-catch yang aman dari throwing exceptions.',
      'Deduplikasi: Mencegah penghitungan ganda yang tidak disengaja akibat re-render komponen frontend React.'
    ],
    tips: 'Gunakan fire-and-forget dengan window.fetch dan keepalive: true agar event tetap terkirim saat tab browser ditutup.',
    tags: ['analytics', 'telemetry', 'non-blocking', 'observability', 'architecture']
  },
  {
    id: 'analytics-privacy-pdp',
    category: 'analytics',
    title: 'Kepatuhan UU PDP No. 27/2022: Sanitasi & Data Minimization',
    level: 'Menengah',
    description: 'Kebijakan ketat pencegahan kebocoran PII (Personally Identifiable Information) dan kredensial dalam payload telemetri analitik.',
    syntax: 'Allow-list Filtering: Hanya izinkan field yang eksplisit terdaftar, tolak string token/password/kode',
    code: `// Allow-list Sanitizer Pattern
function sanitizeAnalyticsProperties(
  eventName: string,
  properties?: Record<string, unknown>
): Record<string, unknown> {
  if (!properties) return {};
  
  const allowedKeys = ALLOWED_PROPERTIES_MAP[eventName] || [];
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(properties)) {
    // 1. Tolak key terlarang (password, token, apikey, secret, code, stack)
    if (isProhibitedKey(key)) continue;

    // 2. Wajib ada dalam daftar allow-list event
    if (!allowedKeys.includes(key)) continue;

    // 3. Batasi panjang string maksimal 512 karakter
    if (typeof value === 'string' && value.length <= 512) {
      sanitized[key] = value.trim();
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      sanitized[key] = value;
    }
  }

  return sanitized;
}`,
    explanation: [
      'Data Minimization: Hanya kirimkan data yang benar-benar dibutuhkan untuk metrik agregasi.',
      'Identifikasi Aman: Gunakan UID anonim atau ID sesi acak, jangan gunakan alamat email atau nomor telepon sebagai identifier analitik.',
      'Zero Code Capture: Kode sumber atau isi editor teks siswa tidak boleh ditransmisikan sebagai payload analitik.'
    ],
    tips: 'Audit log konsol browser secara berkala untuk memastikan tidak ada objek kredensial atau error stack trace yang bocor.',
    tags: ['privacy', 'uu-pdp', 'data-minimization', 'sanitizer', 'compliance']
  }
];

interface DocsViewProps {
  onOpenPlaygroundWithCode?: (code: string, language: 'web' | 'python' | 'git') => void;
}

export const DocsView: React.FC<DocsViewProps> = ({ onOpenPlaygroundWithCode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedBookmarks, setSavedBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('commandev_docs_bookmarks') || localStorage.getItem('codera_docs_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const categories = [
    { id: 'all', label: 'Semua Referensi', icon: Layers, count: DOC_ITEMS.length },
    { id: 'architecture', label: 'Software Architecture', icon: Cpu, count: DOC_ITEMS.filter(d => d.category === 'architecture').length },
    { id: 'analytics', label: 'Telemetry & Privasi', icon: Activity, count: DOC_ITEMS.filter(d => d.category === 'analytics').length },
    { id: 'security', label: 'Security & OWASP', icon: ShieldCheck, count: DOC_ITEMS.filter(d => d.category === 'security').length },
    { id: 'devops', label: 'DevSecOps & Docker', icon: Server, count: DOC_ITEMS.filter(d => d.category === 'devops').length },
    { id: 'testing', label: 'Testing QA', icon: Check, count: DOC_ITEMS.filter(d => d.category === 'testing').length },
    { id: 'privacy', label: 'Privasi & UU PDP', icon: Lock, count: DOC_ITEMS.filter(d => d.category === 'privacy').length },
    { id: 'javascript', label: 'JavaScript ES6+', icon: Sparkles, count: DOC_ITEMS.filter(d => d.category === 'javascript').length },
    { id: 'python', label: 'Python 3.12', icon: Terminal, count: DOC_ITEMS.filter(d => d.category === 'python').length },
    { id: 'html', label: 'HTML5 & Semantik', icon: Globe, count: DOC_ITEMS.filter(d => d.category === 'html').length },
    { id: 'css', label: 'CSS3 & Layouts', icon: Code2, count: DOC_ITEMS.filter(d => d.category === 'css').length },
    { id: 'git', label: 'Git & GitHub CLI', icon: FolderGit2, count: DOC_ITEMS.filter(d => d.category === 'git').length },
    { id: 'react', label: 'React 18+', icon: FileCode2, count: DOC_ITEMS.filter(d => d.category === 'react').length },
    { id: 'sql', label: 'SQL & Database', icon: Database, count: DOC_ITEMS.filter(d => d.category === 'sql').length },
    { id: 'platform', label: 'Panduan COMMANDEV', icon: BookOpen, count: DOC_ITEMS.filter(d => d.category === 'platform').length },
  ];

  const handleToggleBookmark = (id: string) => {
    setSavedBookmarks(prev => {
      const updated = prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id];
      try {
        localStorage.setItem('commandev_docs_bookmarks', JSON.stringify(updated));
        localStorage.setItem('codera_docs_bookmarks', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredDocs = useMemo(() => {
    return DOC_ITEMS.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || item.level === selectedLevel;
      
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.syntax.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      );

      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedLevel]);

  return (
    <div className="min-h-full bg-slate-50 dark:bg-slate-950 p-4 md:p-8 flex flex-col max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900/60 p-6 md:p-8 rounded-3xl border border-indigo-500/20 backdrop-blur-md shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Developer Reference & CheatSheet Hub</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Dokumentasi & Sintaks Ringkas
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              Kamus referensi cepat sintaks standar, contoh kode siap pakai, best practice, dan tips pencegahan error untuk HTML, CSS, JavaScript, Python, Git, React, dan SQL.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="px-4 py-2.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
              <div className="text-xs text-slate-400 font-semibold">Tersimpan</div>
              <div className="text-lg font-black text-indigo-400">{savedBookmarks.length} Snippet</div>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
              <div className="text-xs text-slate-400 font-semibold">Total Referensi</div>
              <div className="text-lg font-black text-emerald-400">{DOC_ITEMS.length} Topik</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-6">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari sintaks, kata kunci (misal: 'flexbox', 'async/await', 'git commit', 'join')..."
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md hover:bg-slate-300"
            >
              Reset
            </button>
          )}
        </div>

        {/* Level Filter Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3.5 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer"
          >
            <option value="all">Semua Level</option>
            <option value="Dasar">Level Dasar</option>
            <option value="Menengah">Level Menengah</option>
            <option value="Mahir">Level Mahir</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-[1.02]'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.5 text-[10px] rounded-full ${
                isActive ? 'bg-indigo-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results Count & Bookmark Filter Quick Link */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-4 px-1">
        <span>Menampilkan {filteredDocs.length} referensi</span>
        {savedBookmarks.length > 0 && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 fill-indigo-500 text-indigo-500" />
            <span>{savedBookmarks.length} item tersimpan di browser</span>
          </button>
        )}
      </div>

      {/* Docs Snippet Grid / List */}
      {filteredDocs.length === 0 ? (
        <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-50" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">Tidak ada referensi ditemukan</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Coba ganti kata kunci pencarian atau pilih kategori lain pada tab navigasi di atas.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredDocs.map((doc) => {
            const isBookmarked = savedBookmarks.includes(doc.id);
            const isCopied = copiedId === doc.id;

            return (
              <motion.div
                key={doc.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900/95 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                {/* Snippet Header */}
                <div className="p-5 md:p-6 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider ${
                        doc.category === 'html' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                        doc.category === 'css' ? 'bg-sky-500/10 text-sky-500 border border-sky-500/20' :
                        doc.category === 'javascript' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                        doc.category === 'python' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                        doc.category === 'git' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
                        doc.category === 'react' ? 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20' :
                        doc.category === 'sql' ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' :
                        'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20'
                      }`}>
                        {doc.category.toUpperCase()}
                      </span>
                      
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {doc.level}
                      </span>

                      <h2 className="text-base md:text-lg font-bold text-slate-900 dark:text-white tracking-tight ml-1">
                        {doc.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-1.5 self-end sm:self-auto">
                      <button
                        onClick={() => handleToggleBookmark(doc.id)}
                        className={`p-2 rounded-xl transition-colors cursor-pointer ${
                          isBookmarked 
                            ? 'text-amber-500 bg-amber-500/10' 
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        title={isBookmarked ? 'Hapus bookmark' : 'Simpan snippet'}
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                      </button>

                      {onOpenPlaygroundWithCode && (
                        <button
                          onClick={() => {
                            const lang = doc.category === 'python' ? 'python' : doc.category === 'git' ? 'git' : 'web';
                            onOpenPlaygroundWithCode(doc.code, lang);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors cursor-pointer border border-indigo-200/60 dark:border-indigo-800/50"
                          title="Buka dan jalankan langsung di Playground"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Coba</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleCopy(doc.id, doc.code)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                        title="Salin kode ke clipboard"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-500">Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                {/* Code Block & Quick Syntax */}
                <div className="bg-[#0b0f19] p-4 md:p-5 border-b border-slate-800/80 font-mono text-xs overflow-x-auto relative group">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 border-b border-slate-800 pb-2">
                    <span className="font-sans font-bold flex items-center gap-1.5 text-slate-300">
                      <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                      Sintaks / Implementasi
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                      {doc.category}
                    </span>
                  </div>
                  <pre className="text-slate-200 leading-relaxed overflow-x-auto py-1">
                    <code>{doc.code}</code>
                  </pre>
                </div>

                {/* Explanation & Best Practice Callouts */}
                <div className="p-5 md:p-6 bg-slate-50/50 dark:bg-slate-900/40 space-y-4">
                  
                  {/* Point-by-point Explanation */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                      Penjelasan & Mekanisme Kerja:
                    </h4>
                    <ul className="space-y-1.5">
                      {doc.explanation.map((exp, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                          <ChevronRight className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                          <span>{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tips or Gotchas */}
                  {(doc.tips || doc.gotcha) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {doc.tips && (
                        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs">
                          <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
                          <div>
                            <span className="font-bold">Pro Tip: </span>
                            {doc.tips}
                          </div>
                        </div>
                      )}

                      {doc.gotcha && (
                        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                          <div>
                            <span className="font-bold">Perhatian / Common Gotcha: </span>
                            {doc.gotcha}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tag Chips */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-2">
                    {doc.tags.map(tag => (
                      <span 
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-400 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-950/50 hover:text-indigo-600 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      )}

    </div>
  );
};
