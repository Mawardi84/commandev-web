import { executePython } from '../utils/pythonInterpreter';
import { SOFTWARE_ARCHITECTURE_PROJECTS } from './softwareArchitectureProjects';

export type ProjectCategory = 'all' | 'web' | 'python' | 'react' | 'backend' | 'database' | 'fullstack' | 'architecture';
export type ProjectType = 'guided' | 'challenge' | 'portfolio' | 'capstone';
export type ProjectDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ProjectRequirement {
  id: string;
  title: string;
  description: string;
  hint?: string;
  check: (html: string, css?: string, js?: string, py?: string) => boolean;
}

export interface ProjectInstruction {
  step: number;
  title: string;
  description: string;
  tips?: string;
}

export interface ProjectOverview {
  summary: string;
  learningOutcomes: string[];
  techStack: string[];
  architectureGuidelines?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  type: ProjectType;
  category: 'web' | 'python' | 'react' | 'backend' | 'database' | 'fullstack' | 'architecture';
  difficulty: ProjectDifficulty;
  status: 'published' | 'draft' | 'archived';
  xp: number;
  estTime: string;
  tags: string[];
  description: string;
  overview: ProjectOverview;
  instructions: ProjectInstruction[];
  starterHtml?: string;
  starterCss?: string;
  starterJs?: string;
  starterPy?: string;
  requirements: ProjectRequirement[];
}

export const CODERA_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-guided-1',
    title: 'Developer Personal Profile Card',
    type: 'guided',
    category: 'web',
    difficulty: 'Beginner',
    status: 'published',
    xp: 100,
    estTime: '30 Menit',
    tags: ['HTML5 Semantic', 'CSS Flexbox', 'Responsive Card'],
    description: 'Bangun kartu profil developer yang responsif dan elegan menggunakan elemen semantik HTML5 dan CSS Grid/Flexbox modern.',
    overview: {
      summary: 'Proyek ini melatih pembuatan komponen profil modern yang semantik, aksesibel, dan memiliki visual aesthetic developer.',
      learningOutcomes: [
        'Memahami struktur semantik menggunakan elemen <article>, <header>, dan <nav>',
        'Menerapkan styling Flexbox untuk centering dan layouting badge',
        'Mengimplementasikan responsive image dengan border rounded dan shadow halus'
      ],
      techStack: ['HTML5', 'CSS3', 'Modern Flexbox'],
      architectureGuidelines: [
        'Gunakan wrapper semantik <article class="dev-card">',
        'Pisahkan styling layout dengan container padding yang proporsional',
        'Sertakan teks alternatif pada seluruh elemen gambar'
      ]
    },
    instructions: [
      {
        step: 1,
        title: 'Buat Wrapper Semantik',
        description: 'Buat elemen `<article class="dev-card">` sebagai container utama kartu profil developer.',
        tips: 'Hindari div soup dengan memanfaatkan semantic tag HTML5.'
      },
      {
        step: 2,
        title: 'Tambahkan Avatar & Informasi Personal',
        description: 'Tambahkan tag `<img>` avatar dengan atribut `alt` yang deskriptif, diikuti heading `<h1>` untuk nama dan `<p>` untuk role developer.',
        tips: 'Gunakan class avatar untuk menerapkan border rounded 9999px.'
      },
      {
        step: 3,
        title: 'Rancang Badges Keahlian',
        description: 'Buat container `<div class="skills">` yang berisi minimal 3 tag `<span class="badge">` untuk skill seperti HTML5, CSS3, dan JS.',
        tips: 'Gunakan flexbox gap untuk merenggangkan badges secara konsisten.'
      },
      {
        step: 4,
        title: 'Tautkan Tombol Kontak & Portofolio',
        description: 'Tambahkan elemen `<a>` dengan class `btn` untuk aksi panggilan kontak atau portofolio.',
        tips: 'Berikan state hover yang halus pada tombol.'
      }
    ],
    starterHtml: `<article class="dev-card">
  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Avatar Developer" class="avatar">
  <h1 class="name">Rina Devina</h1>
  <p class="role">Frontend Engineer & UI Specialist</p>
  <div class="skills">
    <span class="badge">HTML5</span>
    <span class="badge">CSS3</span>
    <span class="badge">JavaScript</span>
  </div>
  <a href="#contact" class="btn">Hubungi Saya</a>
</article>`,
    starterCss: `body {
  font-family: system-ui, -apple-system, sans-serif;
  background: #0f172a;
  color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}
.dev-card {
  background: #1e293b;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  max-width: 320px;
  border: 1px solid #334155;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}
.avatar {
  width: 96px;
  height: 96px;
  border-radius: 9999px;
  object-fit: cover;
  border: 3px solid #6366f1;
  margin-bottom: 1rem;
}
.name {
  font-size: 1.25rem;
  margin: 0 0 0.25rem 0;
  color: #f8fafc;
}
.role {
  font-size: 0.875rem;
  color: #94a3b8;
  margin: 0 0 1rem 0;
}
.skills {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}
.badge {
  background: #312e81;
  color: #c7d2fe;
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}
.btn {
  display: inline-block;
  background: #4f46e5;
  color: white;
  text-decoration: none;
  padding: 0.6rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  transition: background 0.2s ease;
}
.btn:hover {
  background: #4338ca;
}`,
    starterJs: `// Interaktivitas opsional
document.querySelector('.btn')?.addEventListener('click', (e) => {
  console.log('Hubungi saya diklik!');
});`,
    requirements: [
      {
        id: 'r1',
        title: 'Semantic Article Wrapper',
        description: 'Menggunakan elemen semantik `<article class="dev-card">` sebagai pembungkus utama kartu.',
        hint: 'Pastikan terdapat tag pembuka <article> dan penutup </article>.',
        check: (html) => html.includes('<article') && html.includes('</article>') && html.includes('dev-card')
      },
      {
        id: 'r2',
        title: 'Aksesibilitas Gambar Avatar',
        description: 'Menyertakan elemen `<img>` avatar yang memiliki atribut `alt` yang terisi.',
        hint: 'Pastikan tag <img> memiliki atribut alt="Deskripsi gambar".',
        check: (html) => {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          const img = doc.querySelector('img');
          return !!img && img.hasAttribute('alt') && (img.getAttribute('alt') || '').length > 0;
        }
      },
      {
        id: 'r3',
        title: 'Tautan Aksi & Keahlian',
        description: 'Memiliki minimal 3 badge keahlian dan tombol tautan `<a>` kontak.',
        hint: 'Tambahkan elemen dengan class="badge" dan tag <a>.',
        check: (html) => {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          const badges = doc.querySelectorAll('.badge');
          const links = doc.querySelectorAll('a');
          return badges.length >= 3 && links.length >= 1;
        }
      }
    ]
  },
  {
    id: 'proj-react-kanban',
    title: 'Interactive Sprint Kanban Board',
    type: 'guided',
    category: 'react',
    difficulty: 'Intermediate',
    status: 'published',
    xp: 180,
    estTime: '50 Menit',
    tags: ['React Patterns', 'DOM Manipulation', 'State Management'],
    description: 'Implementasikan papan Kanban interaktif dengan multi-kolom (Todo, In Progress, Done), form tugas baru dinamis, dan pemindahan kartu tugas.',
    overview: {
      summary: 'Aplikasi manajemen tugas ala Trello/Jira dengan alur lifecycle status tugas secara real-time.',
      learningOutcomes: [
        'Mengelola state multi-koleksi untuk kolom pengerjaan',
        'Menangani form submit dan validasi teks input',
        'Memperbarui penghitung counter secara reaktif saat tugas dipindahkan'
      ],
      techStack: ['HTML5', 'CSS Grid', 'JavaScript DOM/Events'],
      architectureGuidelines: [
        'Struktur 3 container kolom dengan ID: colTodo, colProgress, colDone',
        'Gunakan event delegation atau listener pada tombol tambah tugas'
      ]
    },
    instructions: [
      {
        step: 1,
        title: 'Siapkan Grid 3 Kolom',
        description: 'Rancang layout CSS Grid dengan 3 kolom: "colTodo", "colProgress", dan "colDone".',
        tips: 'Gunakan grid-template-columns: repeat(3, 1fr) untuk proporsi seimbang.'
      },
      {
        step: 2,
        title: 'Buat Form Input Tugas',
        description: 'Sediakan input `#taskInput` dan tombol `#addTaskBtn` untuk memasukkan judul tugas.',
        tips: 'Cegah penambahan kartu kosong dengan validasi string trim.'
      },
      {
        step: 3,
        title: 'Implementasikan Perpindahan Status',
        description: 'Tambahkan tombol aksi `.move-btn` pada setiap kartu untuk memindahkan item antar kolom.',
        tips: 'Perbarui badge counter jumlah tugas setiap kali ada perubahan.'
      }
    ],
    starterHtml: `<div id="app">
  <div class="kanban-board">
    <header class="board-header">
      <h2>Sprint Kanban Board</h2>
      <div class="add-task-form">
        <input id="taskInput" placeholder="Judul tugas baru..." />
        <button id="addTaskBtn" class="btn-primary">+ Tambah</button>
      </div>
    </header>
    
    <div class="columns-grid">
      <div class="column" id="colTodo">
        <div class="col-title">📋 TODO <span class="badge" id="countTodo">2</span></div>
        <div class="task-list" id="listTodo">
          <div class="task-card">Setup CI/CD Workflow <button class="move-btn">→</button></div>
          <div class="task-card">Design Database Schema <button class="move-btn">→</button></div>
        </div>
      </div>
      
      <div class="column" id="colProgress">
        <div class="col-title">⚡ IN PROGRESS <span class="badge" id="countProg">1</span></div>
        <div class="task-list" id="listProg">
          <div class="task-card">Implement JWT Auth <button class="move-btn">→</button></div>
        </div>
      </div>
      
      <div class="column" id="colDone">
        <div class="col-title">✅ DONE <span class="badge" id="countDone">1</span></div>
        <div class="task-list" id="listDone">
          <div class="task-card">Project Initialization</div>
        </div>
      </div>
    </div>
  </div>
</div>`,
    starterCss: `body {
  font-family: system-ui, -apple-system, sans-serif;
  background: #070b14;
  color: #f8fafc;
  margin: 0;
  padding: 2rem;
}
.kanban-board {
  max-width: 960px;
  margin: 0 auto;
}
.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #1e293b;
  padding-bottom: 1rem;
}
.add-task-form {
  display: flex;
  gap: 0.5rem;
}
.add-task-form input {
  background: #1e293b;
  border: 1px solid #334155;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: white;
  outline: none;
}
.btn-primary {
  background: #6366f1;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
}
.columns-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
.column {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 0.75rem;
  padding: 1rem;
}
.col-title {
  font-weight: bold;
  font-size: 0.85rem;
  color: #94a3b8;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.badge {
  background: #1e293b;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
}
.task-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.move-btn {
  background: #334155;
  color: white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
}`,
    starterJs: `document.getElementById('addTaskBtn')?.addEventListener('click', () => {
  const input = document.getElementById('taskInput');
  if (!input || !input.value.trim()) return;
  
  const listTodo = document.getElementById('listTodo');
  const card = document.createElement('div');
  card.className = 'task-card';
  card.innerHTML = \`\${input.value} <button class="move-btn">→</button>\`;
  listTodo?.appendChild(card);
  input.value = '';
});`,
    requirements: [
      {
        id: 'kanban-r1',
        title: 'Tiga Kolom Status Utama',
        description: 'Menyertakan 3 kolom utama dengan ID: colTodo, colProgress, dan colDone.',
        hint: 'Pastikan elemen memiliki id="colTodo", id="colProgress", dan id="colDone".',
        check: (html) => html.includes('colTodo') && html.includes('colProgress') && html.includes('colDone')
      },
      {
        id: 'kanban-r2',
        title: 'Form Input Tugas Baru',
        description: 'Memiliki input dengan ID taskInput dan tombol addTaskBtn.',
        hint: 'Sediakan <input id="taskInput"> dan <button id="addTaskBtn">.',
        check: (html) => html.includes('taskInput') && html.includes('addTaskBtn')
      },
      {
        id: 'kanban-r3',
        title: 'Struktur Kartu Tugas',
        description: 'Memiliki minimal 2 kartu tugas dengan class task-card di dalam papan Kanban.',
        hint: 'Gunakan class="task-card" pada elemen daftar tugas.',
        check: (html) => {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          return doc.querySelectorAll('.task-card').length >= 2;
        }
      }
    ]
  },
  {
    id: 'proj-backend-api',
    title: 'REST API Service & Auth Token Guard',
    type: 'challenge',
    category: 'backend',
    difficulty: 'Advanced',
    status: 'published',
    xp: 220,
    estTime: '60 Menit',
    tags: ['Python OOP', 'Auth Guards', 'Token Generation', 'Backend'],
    description: 'Rancang arsitektur backend Python dengan class otentikasi, hashing password simulasi, penerbitan JWT token, dan verifikasi sesi rute aman.',
    overview: {
      summary: 'Mengembangkan library auth guard backend yang menangani siklus pendaftaran pengguna, validasi login, dan perlindungan endpoint.',
      learningOutcomes: [
        'Membangun class OOP `UserAuthService` yang menyimpan user store aman',
        'Menerbitkan token bertanda tangan untuk identifikasi session',
        'Menangani exception dan permission error pada kredensial yang salah'
      ],
      techStack: ['Python 3.12', 'Object Oriented Programming', 'Security Hashing'],
      architectureGuidelines: [
        'Class UserAuthService harus mengimplementasikan register, login, dan verify_token',
        'Method register harus memvalidasi email unik',
        'Method verify_token mengembalikan email pemilik token yang sah'
      ]
    },
    instructions: [
      {
        step: 1,
        title: 'Definisikan Class UserAuthService',
        description: 'Buat class `UserAuthService` dengan dictionary `self.users` dan `self.tokens`.',
        tips: 'Inisialisasi state dictionary pada method __init__.'
      },
      {
        step: 2,
        title: 'Implementasikan Method register()',
        description: 'Method `register(email, password, role="student")` menyimpan data user dan mencegah duplikasi email.',
        tips: 'Gunakan exception ValueError jika email telah digunakan.'
      },
      {
        step: 3,
        title: 'Implementasikan Method login() & verify_token()',
        description: 'Method `login(email, password)` mencocokkan password dan menerbitkan token. Method `verify_token(token)` mengembalikan email terkait.',
        tips: 'Gunakan format token unik seperti jwt_email_timestamp.'
      }
    ],
    starterPy: `class UserAuthService:
    def __init__(self):
        self.users = {} # email -> {password_hash, role}
        self.tokens = {} # token -> email
    
    def register(self, email, password, role="student"):
        if email in self.users:
            raise ValueError("Email sudah terdaftar")
        self.users[email] = {"pass": password + "_hashed", "role": role}
        return {"status": "success", "email": email}
    
    def login(self, email, password):
        user = self.users.get(email)
        if not user or user["pass"] != password + "_hashed":
            raise PermissionError("Kredensial tidak valid")
        token = f"jwt_{email}_{len(self.tokens)+1}"
        self.tokens[token] = email
        return {"token": token, "role": user["role"]}
    
    def verify_token(self, token):
        return self.tokens.get(token)

# Uji Coba Layanan Auth:
auth = UserAuthService()
auth.register("dev@commandev.id", "secret123", "admin")
session = auth.login("dev@commandev.id", "secret123")
print("Token Terbit:", session["token"])
print("Email Pemilik:", auth.verify_token(session["token"]))`,
    requirements: [
      {
        id: 'api-r1',
        title: 'Struktur Class UserAuthService',
        description: 'Class UserAuthService mendukung register, login, dan verify_token.',
        hint: 'Pastikan method register, login, dan verify_token didefinisikan dengan parameter yang benar.',
        check: (_, __, ___, py) => {
          const code = py || '';
          return code.includes('class UserAuthService') && 
                 code.includes('def register') && 
                 code.includes('def login') && 
                 code.includes('def verify_token');
        }
      },
      {
        id: 'api-r2',
        title: 'Verifikasi Token Pemilik',
        description: 'Validasi token berhasil mengembalikan email pemilik yang sah setelah login.',
        hint: 'Jalankan flow registrasi dan login, lalu uji token dengan verify_token.',
        check: (_, __, ___, py) => {
          const testCode = `${py}\na = UserAuthService()\na.register("test@a.com", "pass")\ns = a.login("test@a.com", "pass")\nprint("__AUTH_VERIFY__:" + str(a.verify_token(s["token"])))`;
          const res = executePython(testCode);
          return res.output.includes('test@a.com');
        }
      }
    ]
  },
  {
    id: 'proj-challenge-1',
    title: 'CLI Task & Expense Manager',
    type: 'challenge',
    category: 'python',
    difficulty: 'Intermediate',
    status: 'published',
    xp: 150,
    estTime: '45 Menit',
    tags: ['Python', 'OOP', 'Data Aggregation', 'CLI'],
    description: 'Rancang program terminal Python berbasis Object-Oriented Programming (OOP) yang mampu menambah, menghitung total pengeluaran belanja, dan menyajikan ringkasan keuangan.',
    overview: {
      summary: 'Mengembangkan modul pencatat pengeluaran keuangan berbasis CLI dengan validasi angka positif dan format output Rupiah.',
      learningOutcomes: [
        'Mengelola list of dictionaries pada atribut instance class',
        'Menerapkan fungsi agregasi sum dan filter',
        'Memformat output angka mata uang yang rapi untuk CLI user'
      ],
      techStack: ['Python 3.12', 'OOP', 'Data Validation'],
      architectureGuidelines: [
        'Mendefinisikan class ExpenseManager',
        'Method add_expense harus memvalidasi nominal > 0',
        'Method get_total mengembalikan akumulasi total nilai integer/float'
      ]
    },
    instructions: [
      {
        step: 1,
        title: 'Inisialisasi Class ExpenseManager',
        description: 'Buat class `ExpenseManager` dengan atribut list `self.expenses = []`.',
        tips: 'Simpan setiap transaksi dalam format dictionary {title, amount}.'
      },
      {
        step: 2,
        title: 'Tambahkan Validasi Transaksi',
        description: 'Pada method `add_expense(title, amount)`, lempar `ValueError` jika `amount <= 0`.',
        tips: 'Pastikan tipe data amount valid sebelum dimasukkan ke list.'
      },
      {
        step: 3,
        title: 'Kalkulasi Total & Ringkasan',
        description: 'Implementasikan `get_total()` untuk menghitung jumlah dan `summary()` untuk teks laporan.',
        tips: 'Gunakan format f-string untuk menampilkan output.'
      }
    ],
    starterPy: `class ExpenseManager:
    def __init__(self):
        self.expenses = []
    
    def add_expense(self, title, amount):
        if amount <= 0:
            raise ValueError("Nominal harus positif")
        self.expenses.append({"title": title, "amount": amount})
        return True
    
    def get_total(self):
        return sum(item["amount"] for item in self.expenses)
    
    def summary(self):
        return f"Total {len(self.expenses)} item: Rp {self.get_total():,}"

# Uji Coba:
manager = ExpenseManager()
manager.add_expense("Buku Python", 120000)
manager.add_expense("Kopi", 35000)
print(manager.summary())`,
    requirements: [
      {
        id: 'py-r1',
        title: 'Class ExpenseManager & add_expense',
        description: 'Mendefinisikan class ExpenseManager dengan method add_expense.',
        hint: 'Pastikan nama class dan method sesuai spesifikasi.',
        check: (_, __, ___, py) => (py || '').includes('class ExpenseManager') && (py || '').includes('def add_expense')
      },
      {
        id: 'py-r2',
        title: 'Kalkulasi Akurat get_total',
        description: 'Method get_total menghitung akumulasi total secara akurat.',
        hint: 'Uji dengan menambahkan transaksi 50000 dan periksa hasil get_total.',
        check: (_, __, ___, py) => {
          const testCode = `${py}\nm = ExpenseManager()\nm.add_expense("Test", 50000)\nprint("__EXP_TOTAL__:" + str(m.get_total()))`;
          const res = executePython(testCode);
          return res.output.includes('50000');
        }
      }
    ]
  },
  {
    id: 'proj-portfolio-1',
    title: 'Modern Academy Landing Web',
    type: 'portfolio',
    category: 'web',
    difficulty: 'Advanced',
    status: 'published',
    xp: 200,
    estTime: '60 Menit',
    tags: ['HTML5 Semantic', 'CSS Grid', 'Hero Design', 'Portfolio'],
    description: 'Proyek portofolio mandiri: Buat landing page bergaya COMMANDEV dengan Navbar responsif, Hero banner dengan CTA, 3 feature cards, dan Footer semantik.',
    overview: {
      summary: 'Membangun landing page landing web yang menarik, modern, dan siap dimasukkan ke dalam portofolio frontend.',
      learningOutcomes: [
        'Menyusun struktur landing page menggunakan tag semantic HTML5 standar',
        'Mengatur palet warna gelap developer (slate/indigo)',
        'Merancang kartu fitur dengan layout responsive Flexbox/Grid'
      ],
      techStack: ['HTML5 Semantic', 'CSS3', 'Modern Layouts'],
      architectureGuidelines: [
        'Gunakan <header>, <section>, dan <footer>',
        'Sertakan minimal 3 kartu fitur dengan class .feature-card',
        'Berikan tombol CTA dengan hover visual effect'
      ]
    },
    instructions: [
      {
        step: 1,
        title: 'Buat Header & Navigasi',
        description: 'Bangun header `<header class="navbar">` dengan logo dan link menu navigasi.',
        tips: 'Gunakan flexbox justify-content: space-between.'
      },
      {
        step: 2,
        title: 'Rancang Hero Section',
        description: 'Buat hero banner `<section class="hero">` dengan heading utama `<h1>` dan tombol CTA `.cta-btn`.',
        tips: 'Beri padding vertikal yang cukup untuk efek visual lega.'
      },
      {
        step: 3,
        title: 'Susun 3 Kartu Fitur',
        description: 'Susun minimal 3 kartu fitur menggunakan class `.feature-card` di dalam container `.features`.',
        tips: 'Gunakan Flexbox atau CSS Grid.'
      },
      {
        step: 4,
        title: 'Tambahkan Semantic Footer',
        description: 'Tutup halaman dengan elemen `<footer>` hak cipta.',
        tips: 'Gunakan tag <footer> resmi.'
      }
    ],
    starterHtml: `<header class="navbar">
  <div class="logo">COMMANDEV</div>
  <nav>
    <a href="#courses">Courses</a>
    <a href="#practice">Practice</a>
  </nav>
</header>

<section class="hero">
  <h1>Learn. Code. Build. Master.</h1>
  <p>Platform interaktif untuk menguasai pemrograman dari nol hingga mahir.</p>
  <button class="cta-btn">Mulai Belajar</button>
</section>

<section class="features">
  <div class="feature-card"><h3>1. Learn</h3><p>Konsep terstruktur</p></div>
  <div class="feature-card"><h3>2. Practice</h3><p>Uji kode langsung</p></div>
  <div class="feature-card"><h3>3. Build</h3><p>Proyek nyata</p></div>
</section>

<footer><p>© 2026 COMMANDEV Interactive Academy</p></footer>`,
    starterCss: `body {
  font-family: system-ui, sans-serif;
  margin: 0;
  background: #0b0f19;
  color: white;
}
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #020617;
  border-bottom: 1px solid #1e293b;
}
.navbar nav a {
  color: #94a3b8;
  text-decoration: none;
  margin-left: 1.5rem;
  font-weight: 600;
}
.hero {
  text-align: center;
  padding: 4rem 1rem;
}
.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #818cf8;
}
.cta-btn {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  font-weight: bold;
  cursor: pointer;
}
.features {
  display: flex;
  gap: 1rem;
  max-width: 900px;
  margin: 0 auto 4rem auto;
  padding: 0 1rem;
}
.feature-card {
  flex: 1;
  background: #1e293b;
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
  border: 1px solid #334155;
}
footer {
  text-align: center;
  padding: 2rem;
  border-top: 1px solid #1e293b;
  color: #64748b;
  font-size: 0.875rem;
}`,
    requirements: [
      {
        id: 'port-r1',
        title: 'Semantic Header, Section, & Footer',
        description: 'Memiliki struktur semantic <header>, <section>, dan <footer>.',
        hint: 'Sertakan tag <header>, minimal satu <section>, dan <footer>.',
        check: (html) => html.includes('<header') && html.includes('<section') && html.includes('<footer')
      },
      {
        id: 'port-r2',
        title: 'Minimal 3 Kartu Fitur',
        description: 'Memiliki minimal 3 kartu fitur dengan class .feature-card.',
        hint: 'Pastikan ada 3 elemen dengan class="feature-card".',
        check: (html) => {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          return doc.querySelectorAll('.feature-card').length >= 3;
        }
      }
    ]
  },
  {
    id: 'proj-fullstack-lms',
    title: 'Course Catalog & Enrollment Engine',
    type: 'capstone',
    category: 'fullstack',
    difficulty: 'Advanced',
    status: 'published',
    xp: 250,
    estTime: '75 Menit',
    tags: ['Fullstack UI', 'DOM State', 'Catalog Grid', 'Capstone'],
    description: 'Proyek puncak Full Stack: Rancang antarmuka katalog kursus dengan tombol enroll interaktif yang menyimpan status pendaftaran dan counter kredit belajar.',
    overview: {
      summary: 'Simulasi modul katalog pembelajaran lengkap dengan interaktivitas enroll, update status badge, dan kalkulasi dinamis.',
      learningOutcomes: [
        'Mengembangkan katalog kursus responsif dengan Auto-fit CSS Grid',
        'Mengelola state UI pendaftaran siswa secara interaktif',
        'Memperbarui indikator status dan counter terdaftar'
      ],
      techStack: ['HTML5', 'CSS Grid', 'JavaScript DOM'],
      architectureGuidelines: [
        'Gunakan .catalog-grid dengan kartu .course-card',
        'Gunakan counter #enrolledCount untuk status pendaftaran'
      ]
    },
    instructions: [
      {
        step: 1,
        title: 'Buat Container & Header LMS',
        description: 'Rancang header dengan judul dan badge total kursus `#enrolledCount`.',
        tips: 'Gunakan pill badge untuk tampilan modern.'
      },
      {
        step: 2,
        title: 'Susun Grid Kartu Kursus',
        description: 'Siapkan grid `.catalog-grid` dengan minimal 3 kartu `.course-card`.',
        tips: 'Sertakan tombol enroll pada setiap kartu.'
      },
      {
        step: 3,
        title: 'Pasang Tombol Enroll Interaktif',
        description: 'Tambahkan event handler untuk mengubah tombol "Enroll Sekarang" menjadi "Sudah Terdaftar ✓" dan menambah counter.',
        tips: 'Manfaatkan class toggle pada tombol.'
      }
    ],
    starterHtml: `<div class="lms-container">
  <header class="lms-header">
    <h1>COMMANDEV Academy Catalog</h1>
    <div class="user-pill">Terdaftar: <b id="enrolledCount">2</b> Kursus</div>
  </header>
  
  <div class="catalog-grid">
    <div class="course-card">
      <h3>JavaScript Masterclass</h3>
      <p>5 Level • 40 Modul • 500 XP</p>
      <button class="enroll-btn enrolled">Sudah Terdaftar ✓</button>
    </div>
    <div class="course-card">
      <h3>Python 3.12 Core & OOP</h3>
      <p>6 Level • 50 Modul • 600 XP</p>
      <button class="enroll-btn enrolled">Sudah Terdaftar ✓</button>
    </div>
    <div class="course-card">
      <h3>React 18 & State Architecture</h3>
      <p>5 Level • 35 Modul • 450 XP</p>
      <button class="enroll-btn" id="btnReactEnroll">Enroll Sekarang</button>
    </div>
  </div>
</div>`,
    starterCss: `body {
  font-family: system-ui, sans-serif;
  background: #030712;
  color: #f9fafb;
  padding: 2rem;
  margin: 0;
}
.lms-container {
  max-width: 900px;
  margin: 0 auto;
}
.lms-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #1f2937;
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
}
.user-pill {
  background: #111827;
  border: 1px solid #374151;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  color: #38bdf8;
}
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}
.course-card {
  background: #111827;
  border: 1px solid #1f2937;
  padding: 1.5rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.course-card h3 {
  margin-top: 0;
  color: #818cf8;
  font-size: 1.1rem;
}
.course-card p {
  color: #9ca3af;
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
}
.enroll-btn {
  width: 100%;
  padding: 0.6rem;
  border-radius: 0.5rem;
  font-weight: bold;
  border: none;
  background: #4f46e5;
  color: white;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}
.enroll-btn.enrolled {
  background: #065f46;
  color: #a7f3d0;
  cursor: default;
}`,
    starterJs: `document.getElementById('btnReactEnroll')?.addEventListener('click', function() {
  if (!this.classList.contains('enrolled')) {
    this.classList.add('enrolled');
    this.textContent = 'Sudah Terdaftar ✓';
    const count = document.getElementById('enrolledCount');
    if (count) count.textContent = String(parseInt(count.textContent || '0') + 1);
  }
});`,
    requirements: [
      {
        id: 'fs-r1',
        title: 'Minimal 3 Kartu Kursus',
        description: 'Menampilkan katalog kursus dengan minimal 3 kartu kursus .course-card.',
        hint: 'Pastikan terdapat minimal 3 elemen ber-class course-card.',
        check: (html) => {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          return doc.querySelectorAll('.course-card').length >= 3;
        }
      },
      {
        id: 'fs-r2',
        title: 'Counter Pendaftaran enrolledCount',
        description: 'Memiliki counter dengan ID enrolledCount untuk memantau status kursus.',
        hint: 'Pastikan elemen memiliki atribut id="enrolledCount".',
        check: (html) => html.includes('id="enrolledCount"')
      }
    ]
  }
];

export const ALL_CODERA_PROJECTS: ProjectItem[] = [
  ...CODERA_PROJECTS,
  ...SOFTWARE_ARCHITECTURE_PROJECTS
];

export const COMMANDEV_PROJECTS = ALL_CODERA_PROJECTS;
