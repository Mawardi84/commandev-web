import { Course } from '../types';

export const REACT_COURSE: Course = {
  id: 'react-mastery',
  title: 'React 0 → Mahir',
  shortDescription: 'Kurikulum React komprehensif 8 jenjang: Absolute Beginner, Fundamental, Beginner, Intermediate, Advanced, Professional, Project, & Assessment.',
  description: 'Kuasai library frontend paling populer di industri teknologi modern. Dari konsep deklaratif JSX, manajemen state useState/useEffect, bagaimana membuat struktur folder React standar hingga arsitektur Feature-Sliced Design skala enterprise, capstone project, dan ujian asesmen kelulusan.',
  icon: 'react',
  levels: [
    {
      id: 'react-level-0',
      title: 'Level 0 — Absolute Beginner',
      description: 'Pengenalan paradigma deklaratif React, JSX (JavaScript XML), dan merender elemen komponen pertama.',
      modules: [
        {
          id: 'react-mod-0-1',
          title: 'Paradigma Komponen & JSX',
          description: 'Apa perbedaan pendekatan manipulasi DOM tradisional vs komponen deklaratif React?',
          lessons: [
            {
              id: 'react-les-0-1-1',
              title: 'Komponen Pertama & Aturan JSX',
              type: 'learn',
              xpReward: 20,
              content: [
                {
                  type: 'markdown',
                  content: `### Selamat Datang di React!

Dalam web tradisional, kamu harus manual menulis \`document.getElementById\` dan mengubah tampilan satu per satu.

**React mengubah segalanya dengan Komponen Reusable:**
Sebuah komponen React hanyalah sebuah **fungsi JavaScript biasa yang mengembalikan tampilan visual dalam bentuk JSX (JavaScript XML)**!

\`\`\`jsx
function Salam() {
  return <h1>Halo dari Komponen React!</h1>;
}
\`\`\`

**Aturan Emas JSX:**
1. Wajib mengembalikan **satu elemen pembungkus tunggal** (atau gunakan Fragment \`<> ... </>\`).
2. Gunakan \`className\` untuk class CSS (karena kata \`class\` adalah kata kunci khusus di JavaScript).
3. Semua tag yang tidak punya penutup wajib diberi slash penutup: \`<img />\`, \`<br />\`, \`<input />\`!`
                },
                {
                  type: 'code-example',
                  language: 'javascript',
                  code: `function KartuUcapan() {
  const nama = "Developer Handal";
  return (
    <div className="kartu">
      <h2>Halo, {nama}!</h2>
      <p>Selamat belajar komponen deklaratif.</p>
    </div>
  );
}`
                }
              ]
            },
            {
              id: 'react-les-0-1-2',
              title: 'Latihan: Menulis Komponen Profil JSX',
              type: 'practice',
              xpReward: 25,
              content: [
                {
                  type: 'markdown',
                  content: 'Buat komponen fungsi `ProfilApp` yang mengembalikan tag pembungkus `<div>` dengan `<h1>` nama dan `<p>` profesi.'
                }
              ],
              starterCode: 'function ProfilApp() {\n  return (\n    <div className="profil-container">\n      <h1>Budi Santoso</h1>\n      <p>Frontend Engineer</p>\n    </div>\n  );\n}\n\n// Ekspor komponen\nexport default ProfilApp;',
              requirements: [
                {
                  id: 'req-jsx-return',
                  description: 'Komponen mengembalikan elemen JSX dengan h1 dan p',
                  validate: (code) => code.includes('return') && code.includes('<h1>') && code.includes('<p>')
                },
                {
                  id: 'req-jsx-classname',
                  description: 'Menggunakan atribut className',
                  validate: (code) => code.includes('className=')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'react-level-1',
      title: 'Level 1 — Fundamental',
      description: 'Komponen reusable, passing props antar komponen, conditional rendering (operator ternary / &&), dan mapping array dengan key unik.',
      modules: [
        {
          id: 'react-mod-1-1',
          title: 'Reusable Components & Props',
          description: 'Mengirimkan data dari komponen induk (parent) ke komponen anak (child) menggunakan Props.',
          lessons: [
            {
              id: 'react-les-1-1-1',
              title: 'Membuat Komponen Kartu Dinamis dengan Props',
              type: 'practice',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: 'Buat komponen `ProductCard(props)` yang menerima `props.nama` dan `props.harga` lalu menampilkannya secara dinamis.'
                }
              ],
              starterCode: 'function ProductCard({ nama, harga, stok }) {\n  return (\n    <div className="card">\n      <h3>{nama}</h3>\n      <p>Harga: Rp{harga.toLocaleString("id-ID")}</p>\n      {stok > 0 ? <span className="ready">Tersedia</span> : <span className="habis">Habis</span>}\n    </div>\n  );\n}\n\nexport default ProductCard;',
              requirements: [
                {
                  id: 'req-props-destruct',
                  description: 'Komponen menerima props (nama, harga) dan menampilkannya di JSX',
                  validate: (code) => code.includes('nama') && code.includes('harga') && code.includes('{nama}')
                },
                {
                  id: 'req-cond-render',
                  description: 'Menggunakan conditional rendering ternary atau &&',
                  validate: (code) => code.includes('?') || code.includes('&&')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'react-level-2',
      title: 'Level 2 — Beginner',
      description: 'Bagaimana membuat struktur folder proyek React standar (Vite React layout: public, src, components, App.tsx, import/export komponen).',
      modules: [
        {
          id: 'react-mod-2-1',
          title: 'Bagaimana Membuat Struktur Folder Proyek React (Vite Layout)',
          description: 'Dari satu file App.tsx monolitik menuju struktur folder terorganisir: anatomi proyek Vite, folder src/components/, dan aturan impor.',
          lessons: [
            {
              id: 'les-react-2-1-1',
              title: 'LEARN: Anatomi Folder Proyek React Standar',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Bagaimana Cara Membuat Struktur Folder di Proyek React?

Saat kamu membuat proyek React modern menggunakan Vite (\`npm create vite@latest my-app -- --template react-ts\`), banyak pemula terjebak dengan menaruh ribuan baris kode, semua state, dan puluhan tombol di dalam satu file \`App.tsx\` yang gemuk (*god file*).

---

#### 1. Struktur Folder Standar React (Beginner to Intermediate Layout)

\`\`\`text
my_react_app/
│
├── index.html           # File HTML tunggal dengan <div id="root"></div>
├── package.json         # Dependensi react, react-dom, script dev/build
├── vite.config.ts       # Konfigurasi bundler Vite
├── tsconfig.json        # Konfigurasi kompilasi TypeScript
│
├── public/              # Berkas statis murni (favicon, logo)
│   └── vite.svg
│
└── src/                 # [SEMUA KODE REACT KAMU DI SINI]
    ├── main.tsx         # Render ReactDOM.createRoot() ke #root
    ├── App.tsx          # Komponen orkestrator tampilan utama
    ├── index.css        # Styling global & Tailwind CSS
    │
    ├── components/      # Folder seluruh komponen UI modular
    │   ├── Navbar.tsx   # Komponen header navigasi
    │   ├── Footer.tsx   # Komponen kaki halaman
    │   ├── Button.tsx   # Komponen tombol serbaguna
    │   └── Card.tsx     # Komponen kartu konten
    │
    ├── types.ts         # Definisi interface TypeScript (User, Product)
    └── data.ts          # Mock data atau konfigurasi statis awal
\`\`\`

---

#### 2. Aturan Emas Pemisahan Komponen (Component Extraction)
Kapan sebuah bagian harus dipindahkan ke file terpisah di \`src/components/\`?
1. **Dapat digunakan kembali (*Reusable*)**: Misal tombol \`Button.tsx\` yang dipakai di 10 halaman berbeda.
2. **Memiliki kompleksitas logika sendiri**: Misal komponen formulir dengan 5 state internal.
3. **Merapikan keterbacaan**: File \`App.tsx\` idealnya hanya bertindak sebagai "manajer konduktor" yang menyusun tata letak komponen-komponen kecil!

---

#### 3. Cara Mengimpor Komponen Antar File:

**File Komponen Anak (\`src/components/Header.tsx\`):**
\`\`\`tsx
export function Header({ title }: { title: string }) {
  return (
    <header className="py-4 bg-slate-900 text-white">
      <h1 className="text-xl font-bold">{title}</h1>
    </header>
  );
}
\`\`\`

**File Induk Utama (\`src/App.tsx\`):**
\`\`\`tsx
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen">
      <Header title="Toko Online Saya" />
      <main className="p-4">
        {/* Konten Halaman */}
      </main>
      <Footer />
    </div>
  );
}
\`\`\`
`
                },
                {
                  type: 'code-example',
                  language: 'javascript',
                  code: `// Simulasi struktur modular komponen React
// src/components/Badge.tsx
export function StatusBadge({ status }: { status: "online" | "offline" }) {
  const isOnline = status === "online";
  return (
    <span className={isOnline ? "text-green-600" : "text-gray-400"}>
      {isOnline ? "● Sedang Aktif" : "○ Offline"}
    </span>
  );
}`
                }
              ]
            },
            {
              id: 'les-react-2-1-2',
              title: 'PRACTICE: Menyusun Komponen UI Terpisah & Props',
              type: 'practice',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: [
                    '### Latihan: Memecah Komponen Terpisah',
                    '',
                    'Simulasikan pemecahan komponen `StatCard` yang menerima props `{ label, value, icon }` dan rendernya di dalam wadah dashboard.'
                  ].join('\n')
                }
              ],
              starterCode: '// Simulasi src/components/StatCard.tsx\nfunction StatCard({ label, value }) {\n  return (\n    <div className="stat-card" style={{ border: "1px solid #e2e8f0", padding: "16px", borderRadius: "8px" }}>\n      <span style={{ color: "#64748b", fontSize: "14px" }}>{label}</span>\n      <h2 style={{ fontSize: "24px", margin: "8px 0 0" }}>{value}</h2>\n    </div>\n  );\n}\n\n// Simulasi src/App.tsx\nfunction App() {\n  return (\n    <div className="dashboard-grid" style={{ display: "flex", gap: "16px" }}>\n      <StatCard label="Total Pengguna" value="1.240" />\n      <StatCard label="Pendapatan Bulanan" value="Rp45.000.000" />\n    </div>\n  );\n}\n\nexport default App;',
              requirements: [
                {
                  id: 'req-stat-card',
                  description: 'Mendefinisikan komponen StatCard dengan props label dan value',
                  validate: (code) => code.includes('StatCard') && code.includes('label') && code.includes('value')
                },
                {
                  id: 'req-app-compose',
                  description: 'Komponen App memanggil StatCard lebih dari satu kali dengan props berbeda',
                  validate: (code) => code.includes('<StatCard') && code.includes('Total Pengguna')
                }
              ]
            },
            {
              id: 'les-react-2-1-3',
              title: 'QUIZ: Arsitektur Folder & Komponen React',
              type: 'quiz',
              xpReward: 30,
              questions: [
                {
                  id: 'q-rc-f-1',
                  question: 'Mengapa memisahkan komponen ke dalam folder "src/components/" sangat dianjurkan dibandingkan menaruh semuanya di App.tsx?',
                  options: [
                    'Mencegah kode menjadi raksasa tak terbaca, mempermudah pengujian, dan memungkinkan komponen dipakai ulang di berbagai tempat',
                    'Agar aplikasi bisa berjalan tanpa koneksi internet',
                    'Karena React akan menampilkan error jika App.tsx melebihi 100 baris',
                    'Hanya aturan estetika tanpa dampak fungsional'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Prinsip Single Responsibility Principle & Reusability: komponen kecil mandiri di src/components/ jauh lebih mudah dirawat dan diuji.'
                },
                {
                  id: 'q-rc-f-2',
                  question: 'Di dalam struktur folder proyek React Vite, di manakah titik render utama (ReactDOM.createRoot) berada?',
                  options: [
                    'src/main.tsx (atau src/main.jsx)',
                    'public/index.html',
                    'package.json',
                    'src/types.ts'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'src/main.tsx adalah berkas bootstrap entry point di mana ReactDOM merender komponen App ke dalam tag <div id="root"> di index.html.'
                },
                {
                  id: 'q-rc-f-3',
                  question: 'Manakah cara import yang benar jika kamu ingin memanggil komponen Button dari "src/components/Button.tsx" di dalam file "src/App.tsx"?',
                  options: [
                    'import { Button } from "./components/Button";',
                    'import Button from "public/Button";',
                    'require("./Button")',
                    'import "../src/components/Button.html";'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Dalam folder src/, path relatif menuju subfolder components adalah "./components/Button". Ekstensi .tsx tidak perlu dituliskan.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'react-level-3',
      title: 'Level 3 — Intermediate',
      description: 'Manajemen State dengan useState, formulir terkontrol (controlled inputs), dan menangani efek samping data fetching dengan useEffect.',
      modules: [
        {
          id: 'react-mod-3-1',
          title: 'State & Interaksi Pengguna (useState)',
          description: 'Menyimpan ingatan reaktif komponen yang memperbarui tampilan secara otomatis saat nilainya berubah.',
          lessons: [
            {
              id: 'react-les-3-1-1',
              title: 'Membuat Formulir Terkontrol dengan State',
              type: 'practice',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: 'Gunakan `const [input, setInput] = useState("")` untuk mengontrol nilai input field secara real-time.'
                }
              ],
              starterCode: 'import { useState } from "react";\n\nfunction SimpleForm() {\n  const [nama, setNama] = useState("");\n\n  return (\n    <div>\n      <input\n        type="text"\n        value={nama}\n        onChange={(e) => setNama(e.target.value)}\n        placeholder="Ketik namamu..."\n      />\n      <p>Halo, {nama || "Tamu"}!</p>\n    </div>\n  );\n}\n\nexport default SimpleForm;',
              requirements: [
                {
                  id: 'req-use-state',
                  description: 'Menggunakan useState untuk mengontrol input value dan onChange',
                  validate: (code) => code.includes('useState') && code.includes('value={nama}') && code.includes('onChange=')
                }
              ]
            }
          ]
        },
        {
          id: 'react-mod-3-2',
          title: 'Efek Samping & Siklus Hidup (useEffect)',
          description: 'Melakukan fetching data dari server, sinkronisasi timer, dan membersihkan efek (cleanup).',
          lessons: [
            {
              id: 'react-les-3-2-1',
              title: 'Mengambil Data Saat Komponen Dimuat',
              type: 'practice',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: 'Gunakan `useEffect(() => { ... }, [])` dengan dependency array kosong agar efek hanya berjalan satu kali saat mounting.'
                }
              ],
              starterCode: 'import { useState, useEffect } from "react";\n\nfunction UserLoader() {\n  const [loading, setLoading] = useState(true);\n  const [user, setUser] = useState(null);\n\n  useEffect(() => {\n    // Simulasi pengambilan data API satu kali saat mount\n    const timer = setTimeout(() => {\n      setUser({ id: 1, name: "Siti Rahma" });\n      setLoading(false);\n    }, 500);\n\n    return () => clearTimeout(timer);\n  }, []);\n\n  if (loading) return <p>Memuat profil...</p>;\n  return <h3>Selamat Datang, {user.name}!</h3>;\n}\n\nexport default UserLoader;',
              requirements: [
                {
                  id: 'req-use-effect',
                  description: 'Menggunakan useEffect dengan dependency array []',
                  validate: (code) => code.includes('useEffect(') && code.includes('[]')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'react-level-4',
      title: 'Level 4 — Advanced',
      description: 'Global State Management dengan Context API (createContext, useContext) dan membuat Custom Hooks kustom yang elegan.',
      modules: [
        {
          id: 'react-mod-4-1',
          title: 'Global State dengan Context API',
          description: 'Menghindari prop drilling dengan membagikan data autentikasi atau tema ke seluruh hierarki komponen.',
          lessons: [
            {
              id: 'react-les-4-1-1',
              title: 'Membuat Theme Context Provider',
              type: 'practice',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: 'Gunakan `createContext` dan `useContext` untuk menyediakan state tema (light/dark) ke komponen anak.'
                }
              ],
              starterCode: 'import { createContext, useContext, useState } from "react";\n\nconst ThemeContext = createContext("light");\n\nexport function ThemeProvider({ children }) {\n  const [theme, setTheme] = useState("dark");\n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n\nexport function useTheme() {\n  return useContext(ThemeContext);\n}',
              requirements: [
                {
                  id: 'req-context-api',
                  description: 'Menggunakan createContext, Provider, dan useContext',
                  validate: (code) => code.includes('createContext') && code.includes('.Provider') && code.includes('useContext')
                }
              ]
            }
          ]
        },
        {
          id: 'react-mod-4-2',
          title: 'Membuat Custom Hooks Kustom',
          description: 'Mengekstrak logika state yang berulang menjadi reusable hook (misal useDebounce, useLocalStorage).',
          lessons: [
            {
              id: 'react-les-4-2-1',
              title: 'Membangun Custom Hook useToggle',
              type: 'practice',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: 'Buat custom hook `useToggle(initialValue)` yang mengembalikan `[value, toggle]`.'
                }
              ],
              starterCode: 'import { useState } from "react";\n\nexport function useToggle(initialState = false) {\n  const [state, setState] = useState(initialState);\n  const toggle = () => setState(prev => !prev);\n  return [state, toggle];\n}\n\n// Contoh penggunaan:\n// const [isOpen, toggleOpen] = useToggle();',
              requirements: [
                {
                  id: 'req-custom-hook',
                  description: 'Mendefinisikan fungsi diawali kata "use" dengan useState internal dan fungsi toggle',
                  validate: (code) => code.includes('function useToggle') && code.includes('useState') && code.includes('prev => !prev')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'react-level-5',
      title: 'Level 5 — Professional',
      description: 'Arsitektur folder React skala enterprise: Feature-Sliced Design (src/features, services, hooks, types), TypeScript best practices, & state terisolasi.',
      modules: [
        {
          id: 'react-mod-5-1',
          title: 'Arsitektur Folder Skala Enterprise (Feature-Sliced Design)',
          description: 'Bagaimana arsitek frontend mengatur ratusan komponen dan puluhan modul fitur dalam sistem aplikasi produksi besar.',
          lessons: [
            {
              id: 'les-react-5-1-1',
              title: 'LEARN: Feature-Based vs Layer-Based Architecture',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Standar Arsitektur Folder React Skala Enterprise

Ketika aplikasi React berkembang menjadi produk besar dengan tim puluhan engineer, mengelompokkan file hanya berdasarkan jenisnya (semua komponen di satu folder \`components/\`, semua reducer di \`reducers/\`) akan menyebabkan **Spaghetti Architecture**: kamu harus berpindah-pindah 5 folder berbeda hanya untuk mengubah satu fitur keranjang belanja!

---

#### Struktur Folder Feature-Based (Vertical Slicing / Enterprise Layout):

\`\`\`text
src/
│
├── app/                     # Konfigurasi level aplikasi global
│   ├── router.tsx           # Definisi rute React Router
│   └── store.ts             # Redux / Zustand store utama
│
├── features/                # [FITUR MODULAR TERISOLASI]
│   ├── auth/                # Fitur Autentikasi & Login
│   │   ├── components/      # UI khusus auth (LoginForm.tsx)
│   │   ├── hooks/           # useAuth.ts
│   │   ├── services/        # authApi.ts
│   │   └── types.ts         # User, AuthCredentials
│   │
│   ├── cart/                # Fitur Keranjang Belanja
│   │   ├── components/      # CartDrawer.tsx, CartItem.tsx
│   │   ├── hooks/           # useCart.ts
│   │   └── cartSlice.ts
│   │
│   └── catalog/             # Fitur Katalog Produk
│       ├── components/      # ProductGrid.tsx
│       └── catalogService.ts
│
├── components/              # Komponen UI global (desain sistem bersama)
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx
│   ├── Modal/
│   └── Input/
│
├── hooks/                   # Custom hooks global (useDebounce, useWindowSize)
├── services/                # Axios instance global & interceptor token
└── types/                   # Interface global bersama
\`\`\`

---

#### Keunggulan Arsitektur Feature-Based:
1. **High Cohesion, Low Coupling**: Semua hal yang berkaitan dengan fitur "cart" hidup di dalam folder \`features/cart/\`. Jika fitur cart dihapus, kamu cukup menghapus satu folder tanpa merusak fitur lainnya!
2. **Onboarding Cepat**: Engineer baru yang ditugaskan memperbaiki bug keranjang belanja langsung tahu ke mana harus mencari berkas.
3. **Pemberian Hak Akses (CODEOWNERS)**: Tim A bisa menjadi pemilik fitur \`features/checkout/\`, sementara Tim B memegang \`features/auth/\`.
`
                },
                {
                  type: 'code-example',
                  language: 'javascript',
                  code: `// Simulasi isolasi fitur di dalam React Enterprise
// features/auth/hooks/useCurrentUser.ts
export function useCurrentUser() {
  return {
    user: { id: "usr_99", name: "Fajar Dev", role: "lead_engineer" },
    isAuthenticated: true
  };
}`
                }
              ]
            },
            {
              id: 'les-react-5-1-2',
              title: 'PRACTICE: Merancang Modular Feature Hook & Service',
              type: 'practice',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
                  content: [
                    '### Latihan: Isolasi Service dan Hook Fitur',
                    '',
                    'Simulasikan modul fitur terisolasi `useCartFeature` yang mengelola item keranjang belanja dengan method `tambahItem(produk)` dan menghitung `totalHarga` secara otomatis.'
                  ].join('\n')
                }
              ],
              starterCode: 'import { useState } from "react";\n\n// Simulasi features/cart/hooks/useCartFeature.ts\nexport function useCartFeature() {\n  const [items, setItems] = useState([]);\n\n  const tambahItem = (produk) => {\n    setItems(prev => [...prev, produk]);\n  };\n\n  const totalHarga = items.reduce((sum, item) => sum + item.harga, 0);\n\n  return {\n    items,\n    totalItems: items.length,\n    totalHarga,\n    tambahItem\n  };\n}',
              requirements: [
                {
                  id: 'req-feature-hook',
                  description: 'Membuat hook useCartFeature yang mengembalikan items, totalHarga, dan tambahItem',
                  validate: (code) => code.includes('useCartFeature') && code.includes('totalHarga') && code.includes('tambahItem')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'react-level-6',
      title: 'Level 6 — Project',
      description: 'Implementasi proyek nyata berskala penuh: Modern E-Commerce Storefront & Dashboard dengan katalog produk, shopping cart counter, dan filter kategori.',
      modules: [
        {
          id: 'react-mod-6-1',
          title: 'Capstone Project: Modern E-Commerce Dashboard',
          description: 'Membangun aplikasi toko online komprehensif yang mengintegrasikan komponen UI, modular state, dan kalkulasi checkout dinamis.',
          lessons: [
            {
              id: 'react-les-6-1-1',
              title: 'CAPSTONE: Interactive Storefront Dashboard',
              type: 'project',
              xpReward: 150,
              content: [
                {
                  type: 'markdown',
                  content: `### Capstone Project: Modern React Storefront

Satukan pemahaman komponen, state, dan modularitas React untuk membangun aplikasi katalog belanja:
1. Menampilkan daftar produk dengan harga dan tombol beli.
2. Memperbarui jumlah item di keranjang belanja saat tombol ditekan.
3. Menampilkan total belanja yang terakumulasi secara real-time.`
                }
              ],
              starterCode: 'import { useState } from "react";\n\nconst DAFTAR_PRODUK = [\n  { id: 1, nama: "Mechanical Keyboard", harga: 750000 },\n  { id: 2, nama: "Gaming Mouse RGB", harga: 350000 },\n  { id: 3, nama: "Headset Spatial Audio", harga: 850000 }\n];\n\nfunction StorefrontApp() {\n  const [cart, setCart] = useState([]);\n\n  const tambahKeKeranjang = (produk) => {\n    setCart(prev => [...prev, produk]);\n  };\n\n  const totalBelanja = cart.reduce((sum, item) => sum + item.harga, 0);\n\n  return (\n    <div style={{ padding: "24px", fontFamily: "sans-serif" }}>\n      <header style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e2e8f0", paddingBottom: "16px" }}>\n        <h2>TechStore Official</h2>\n        <p><strong>Keranjang: {cart.length} item</strong> (Rp{totalBelanja.toLocaleString("id-ID")})</p>\n      </header>\n\n      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "20px" }}>\n        {DAFTAR_PRODUK.map(produk => (\n          <div key={produk.id} style={{ border: "1px solid #cbd5e1", padding: "16px", borderRadius: "8px" }}>\n            <h3>{produk.nama}</h3>\n            <p>Rp{produk.harga.toLocaleString("id-ID")}</p>\n            <button\n              onClick={() => tambahKeKeranjang(produk)}\n              style={{ background: "#2563eb", color: "white", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer" }}\n            >\n              + Beli Sekarang\n            </button>\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n}\n\nexport default StorefrontApp;',
              requirements: [
                {
                  id: 'req-cap-cart-state',
                  description: 'Menggunakan useState untuk menyimpan daftar item keranjang',
                  validate: (code) => code.includes('useState') && code.includes('setCart')
                },
                {
                  id: 'req-cap-list-render',
                  description: 'Melakukan pemetaan produk menggunakan .map() dengan key unik',
                  validate: (code) => code.includes('.map(') && code.includes('key=')
                },
                {
                  id: 'req-cap-calc',
                  description: 'Menghitung total harga belanja secara reaktif',
                  validate: (code) => code.includes('reduce') || code.includes('totalBelanja')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'react-level-7',
      title: 'Level 7 — Assessment',
      description: 'Evaluasi akhir komprehensif: Ujian teori arsitektur React (Virtual DOM, Rules of Hooks, Reconciliation, Context vs State), live coding mandiri, dan sertifikasi.',
      modules: [
        {
          id: 'react-mod-7-1',
          title: 'Comprehensive Knowledge Assessment (Ujian Teori)',
          description: 'Ujian komprehensif menguji pemahaman mendalam tentang siklus render React, dependency array, dan struktur skala enterprise.',
          lessons: [
            {
              id: 'react-les-7-1-1',
              title: 'ASSESSMENT QUIZ: Evaluasi Teori React Software Engineer',
              type: 'quiz',
              xpReward: 50,
              questions: [
                {
                  id: 'q-r7-1',
                  question: 'Bagaimana cara kerja Virtual DOM di React untuk mempercepat update tampilan layar?',
                  options: [
                    'React membandingkan Virtual DOM lama dan baru (Diffing Algorithm), lalu hanya mengubah node DOM yang benar-benar berubah ke browser (Reconciliation)',
                    'React menghapus seluruh halaman HTML dan memuat ulang dari awal setiap detik',
                    'Virtual DOM mengubah kode React menjadi video streaming',
                    'Virtual DOM menyimpan file di hard disk pengguna'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Melalui proses Reconciliation dan Diffing, React meminimalkan operasi berat manipulasi Real DOM di browser dengan hanya memperbarui bagian yang spesifik berubah.'
                },
                {
                  id: 'q-r7-2',
                  question: 'Manakah dari aturan berikut yang merupakan "Rules of Hooks" wajib di React?',
                  options: [
                    'Hanya panggil Hooks di tingkat atas komponen fungsi (jangan panggil di dalam loop, percabangan kondisi if, atau fungsi bersarang)',
                    'Hooks hanya boleh dipanggil di dalam file HTML',
                    'Setiap komponen wajib memiliki minimal 10 hooks',
                    'Hooks dilarang menggunakan array'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'React mengandalkan urutan pemanggilan hooks yang konsisten di setiap render; oleh karena itu hooks dilarang dipanggil di dalam kondisi if atau loop.'
                },
                {
                  id: 'q-r7-3',
                  question: 'Dalam arsitektur Feature-Sliced Design pada proyek React enterprise, apa yang disimpan di dalam direktori "src/features/cart/"?',
                  options: [
                    'Semua file gambar seluruh website',
                    'Seluruh komponen, hooks, services, dan types yang khusus berkaitan dengan fungsionalitas keranjang belanja',
                    'File node_modules cadangan',
                    'Konfigurasi compiler Vite'
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'Feature-Sliced / Feature-based memadukan seluruh logika, komponen UI, dan tipe yang relevan dengan satu fitur bisnis ke dalam satu direktori terisolasi.'
                },
                {
                  id: 'q-r7-4',
                  question: 'Kapan kamu harus menyertakan variabel di dalam dependency array useEffect(fn, [dep])?',
                  options: [
                    'Setiap variabel atau props yang didefinisikan di luar effect dan digunakan di dalam effect tersebut',
                    'Hanya jika variabel tersebut bernilai angka ganjil',
                    'Tidak pernah, dependency array harus selalu kosong',
                    'Hanya jika variabel tersebut adalah fungsi bawaan browser'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Sesuai aturan react-hooks/exhaustive-deps, seluruh nilai reaktif dari komponen (props, state) yang dibaca di dalam effect wajib dimasukkan ke dependency array.'
                },
                {
                  id: 'q-r7-5',
                  question: 'Mengapa dilarang mengubah state secara langsung seperti "state.count = 5"?',
                  options: [
                    'Karena React tidak akan mengetahui bahwa state telah berubah, sehingga komponen tidak akan melakukan re-render',
                    'Karena komputer akan crash',
                    'Karena browser tidak mendukung angka 5',
                    'Hanya preferensi penulisan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'State di React harus bersifat immutable. Kamu harus memanggil fungsi pembaru (seperti setCount(5)) agar React memicu siklus re-render UI.'
                }
              ]
            }
          ]
        },
        {
          id: 'react-mod-7-2',
          title: 'Live Coding Technical Assessment (Ujian Praktik)',
          description: 'Ujian live coding mandiri tanpa template: membangun komponen Todo Manager reaktif dengan filtering status.',
          lessons: [
            {
              id: 'react-les-7-2-1',
              title: 'FINAL LIVE CODING: Reactive State Management Engine',
              type: 'challenge',
              xpReward: 100,
              content: [
                {
                  type: 'markdown',
                  content: [
                    '### Ujian Akhir Praktik: Task State Manager',
                    '',
                    'Buktikan keahlian React-mu dengan membangun komponen manajer status reaktif!',
                    '',
                    '**Persyaratan Ujian:**',
                    '1. Gunakan `useState` untuk menyimpan array tugas `[{ id, teks, selesai }]`.',
                    '2. Sediakan fungsi atau tombol untuk menandai status tugas (toggle selesai).',
                    '3. Render daftar tugas dengan mapping `.map()` ber-`key` unik.',
                    '4. Tampilkan penghitung berapa tugas yang sudah selesai.'
                  ].join('\n')
                }
              ],
              starterCode: 'import { useState } from "react";\n\nfunction TaskManager() {\n  const [tasks, setTasks] = useState([\n    { id: 1, teks: "Pahami Struktur Folder React", selesai: true },\n    { id: 2, teks: "Kuasai useState & useEffect", selesai: false },\n    { id: 3, teks: "Selesaikan Capstone Project", selesai: false }\n  ]);\n\n  const toggleSelesai = (id) => {\n    setTasks(prev =>\n      prev.map(t => (t.id === id ? { ...t, selesai: !t.selesai } : t))\n    );\n  };\n\n  const totalSelesai = tasks.filter(t => t.selesai).length;\n\n  return (\n    <div style={{ padding: "16px" }}>\n      <h3>Task Progress ({totalSelesai} dari {tasks.length} Selesai)</h3>\n      <ul>\n        {tasks.map(t => (\n          <li key={t.id} style={{ textDecoration: t.selesai ? "line-through" : "none", cursor: "pointer" }} onClick={() => toggleSelesai(t.id)}>\n            {t.teks} {t.selesai ? "✅" : "⏳"}\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}\n\nexport default TaskManager;',
              requirements: [
                {
                  id: 'req-exam-react-state',
                  description: 'Menggunakan useState untuk menyimpan array tugas',
                  validate: (code) => code.includes('useState') && code.includes('tasks')
                },
                {
                  id: 'req-exam-react-toggle',
                  description: 'Memiliki fungsi toggle status tugas secara immutable dengan .map',
                  validate: (code) => code.includes('.map(') && code.includes('!t.selesai')
                },
                {
                  id: 'req-exam-react-calc',
                  description: 'Menghitung total tugas yang selesai dengan .filter',
                  validate: (code) => code.includes('.filter(') && code.includes('totalSelesai')
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
