import { Course } from '../types';

export const CSS_COURSE: Course = {
  id: 'css-mastery',
  title: 'CSS 0 → Mahir',
  shortDescription: 'Kurikulum CSS komprehensif 8 jenjang: Absolute Beginner, Fundamental, Beginner, Intermediate, Advanced, Professional, Project, & Assessment.',
  description: 'Beri warna, gaya, layout responsif, dan animasi memukau pada websitemu. Kurikulum terstruktur 8 tingkat ini mencakup dasar selektor, box model, struktur folder stylesheet modular, Flexbox & CSS Grid, BEM architecture tingkat enterprise, hingga proyek capstone dan asesmen kelulusan.',
  icon: 'css',
  levels: [
    {
      id: 'css-level-0',
      title: 'Level 0 — Absolute Beginner',
      description: 'Pengenalan sintaks CSS, selektor elemen, class vs ID, pewarnaan hex/rgb, dan menghubungkan CSS ke HTML.',
      modules: [
        {
          id: 'css-mod-0-1',
          title: 'Pengenalan CSS & Sintaks Dasar',
          description: 'Bagaimana cara browser membaca aturan gaya CSS?',
          lessons: [
            {
              id: 'css-les-0-1-1',
              title: 'Anatomi Aturan CSS (Rule set)',
              type: 'learn',
              xpReward: 15,
              content: [
                {
                  type: 'markdown',
                  content: `### Bagaimana CSS Bekerja?

CSS (*Cascading Style Sheets*) adalah bahasa yang mengatur seluruh aspek visual halaman web.

Aturan CSS terdiri dari:
\`\`\`css
selector {
  property: value;
}
\`\`\`

- **Selector**: Elemen mana yang ingin kamu beri gaya (misal \`h1\`, \`p\`, \`.kartu\`).
- **Property**: Karakteristik apa yang ingin diubah (misal \`color\`, \`font-size\`).
- **Value**: Nilai perubahannya (misal \`blue\`, \`24px\`).`
                },
                {
                  type: 'code-example',
                  language: 'css',
                  code: `h1 {
  color: #2563eb;
  font-size: 32px;
  text-align: center;
}`
                }
              ]
            },
            {
              id: 'css-les-0-1-2',
              title: 'Latihan: Mengubah Warna Teks',
              type: 'practice',
              xpReward: 20,
              content: [
                {
                  type: 'markdown',
                  content: 'Ubah warna judul `<h1>` menjadi biru (`blue` atau `#2563eb`) dan ratakan teks ke tengah (`center`).'
                }
              ],
              starterCode: '<style>\n  h1 {\n    /* Tulis properti di sini */\n    color: #2563eb;\n    text-align: center;\n  }\n</style>\n\n<h1>Halo, Dunia Desain Web!</h1>',
              requirements: [
                {
                  id: 'req-css-color',
                  description: 'Elemen h1 memiliki warna teks berwarna biru',
                  validate: (html) => html.includes('color:') && (html.includes('blue') || html.includes('#2563eb') || html.includes('rgb'))
                },
                {
                  id: 'req-css-align',
                  description: 'Elemen h1 memiliki text-align: center',
                  validate: (html) => html.includes('text-align:') && html.includes('center')
                }
              ]
            }
          ]
        },
        {
          id: 'css-mod-0-2',
          title: 'Selektor Class & ID',
          description: 'Menargetkan elemen spesifik dengan class dot (.) dan id hash (#).',
          lessons: [
            {
              id: 'css-les-0-2-1',
              title: 'Class vs ID',
              type: 'practice',
              xpReward: 25,
              content: [
                {
                  type: 'markdown',
                  content: 'Gunakan class `.highlight` untuk memberi background kuning pada paragraf tertentu.'
                }
              ],
              starterCode: '<style>\n  .highlight {\n    background-color: #fef08a;\n    padding: 8px;\n  }\n</style>\n\n<p class="highlight">Paragraf ini ditandai kuning!</p>\n<p>Paragraf biasa.</p>',
              requirements: [
                {
                  id: 'req-class-usage',
                  description: 'Terdapat class .highlight dengan background-color',
                  validate: (html) => html.includes('.highlight') && html.includes('background-color')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'css-level-1',
      title: 'Level 1 — Fundamental',
      description: 'Tipografi font, hierarki teks, dan Box Model mendalam (content, padding, border, margin, box-sizing: border-box).',
      modules: [
        {
          id: 'css-mod-1-1',
          title: 'Tipografi & Gaya Teks',
          description: 'Mengatur font-family, font-weight, line-height, dan text-decoration.',
          lessons: [
            {
              id: 'css-les-1-1-1',
              title: 'Mengatur Font & Spasi Paragraf',
              type: 'practice',
              xpReward: 25,
              content: [
                {
                  type: 'markdown',
                  content: 'Atur elemen body dengan `font-family: sans-serif` dan `line-height: 1.6` agar nyaman dibaca.'
                }
              ],
              starterCode: '<style>\n  body {\n    font-family: sans-serif;\n    line-height: 1.6;\n    color: #334155;\n  }\n</style>\n\n<p>Tipografi yang baik meningkatkan kenyamanan membaca pengguna hingga 80%.</p>',
              requirements: [
                {
                  id: 'req-typo',
                  description: 'Menetapkan font-family sans-serif dan line-height 1.6',
                  validate: (html) => html.includes('font-family:') && html.includes('line-height:')
                }
              ]
            }
          ]
        },
        {
          id: 'css-mod-1-2',
          title: 'The Sacred Box Model',
          description: 'Pahami cara browser menghitung dimensi elemen: content, padding, border, dan margin.',
          lessons: [
            {
              id: 'css-les-1-2-1',
              title: 'Latihan Padding, Border, dan Margin',
              type: 'practice',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### Anatomi Box Model
Setiap elemen di layar adalah sebuah kotak persegi:
- **Content**: Teks atau gambar inti.
- **Padding**: Ruang bernafas di dalam kotak (antara konten dan border).
- **Border**: Garis tepi pembungkus kotak.
- **Margin**: Jarak antara kotak dengan elemen tetangganya di luar.

**Tugasmu:** Beri kotak \`.kartu\` padding 16px, border 1px solid #cbd5e1, dan margin-bottom 12px.`
                }
              ],
              starterCode: '<style>\n  .kartu {\n    background: white;\n    /* Tambahkan padding, border, dan margin */\n    padding: 16px;\n    border: 1px solid #cbd5e1;\n    margin-bottom: 12px;\n    border-radius: 8px;\n  }\n</style>\n\n<div class="kartu">\n  <h3>Kartu Informasi</h3>\n  <p>Box model terpasang dengan presisi!</p>\n</div>',
              requirements: [
                {
                  id: 'req-box-model',
                  description: 'Memiliki properti padding, border, dan margin pada .kartu',
                  validate: (html) => html.includes('padding:') && html.includes('border:') && html.includes('margin')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'css-level-2',
      title: 'Level 2 — Beginner',
      description: 'Bagaimana membuat struktur folder & mengorganisir file stylesheet CSS (reset.css, style.css, link vs @import, cascade order).',
      modules: [
        {
          id: 'css-mod-2-1',
          title: 'Bagaimana Membuat Struktur Folder & Mengorganisir CSS',
          description: 'Mengapa dilarang menaruh ribuan baris CSS di satu file? Membagi stylesheet menjadi modular dan hierarkis.',
          lessons: [
            {
              id: 'les-css-2-1-1',
              title: 'LEARN: Struktur Folder CSS Standar & Modular',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### Bagaimana Cara Membuat Struktur Folder untuk CSS?

Ketika kamu membangun website lebih dari satu halaman atau memiliki banyak komponen (navbar, tombol, kartu, footer), menaruh semua CSS di satu file \`style.css\` akan menjadi mimpi buruk:
- Sulit mencari class yang ingin diubah.
- Sering terjadi konflik nama class yang saling menimpa (*unintended override*).
- Kode membengkak dan lambat di-render browser.

---

#### 1. Struktur Folder CSS Standar (Beginner to Intermediate Layout)

\`\`\`text
my_website/
│
├── index.html
├── about.html
│
└── assets/
    └── css/
        ├── reset.css        # Menghapus styling default bawaan browser
        ├── variables.css    # Definisi warna tema dan font
        ├── style.css        # Layout umum & halaman utama
        └── components.css   # Gaya khusus tombol, kartu, modal
\`\`\`

---

#### 2. Apa Fungsi \`reset.css\` (atau \`normalize.css\`)?
Setiap browser (Chrome, Safari, Firefox, Edge) memiliki margin dan padding bawaan yang berbeda-beda.
File \`reset.css\` menyamakan semua elemen agar tampak seragam di semua perangkat:
\`\`\`css
/* reset.css */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
\`\`\`

---

#### 3. Bagaimana Cara Menghubungkannya di HTML?
Gunakan tag \`<link rel="stylesheet">\` secara berurutan di dalam \`<head>\`:
\`\`\`html
<head>
  <!-- 1. Muat reset terlebih dahulu -->
  <link rel="stylesheet" href="assets/css/reset.css">
  
  <!-- 2. Muat variabel & komponen -->
  <link rel="stylesheet" href="assets/css/variables.css">
  <link rel="stylesheet" href="assets/css/components.css">
  
  <!-- 3. Muat style utama halaman terakhir -->
  <link rel="stylesheet" href="assets/css/style.css">
</head>
\`\`\`
**Prinsip Emas Cascade**: File yang ditulis di bawah memiliki prioritas lebih tinggi jika ada aturan yang bertabrakan!
`
                },
                {
                  type: 'code-example',
                  language: 'html',
                  code: `<!-- Menghubungkan stylesheet modular dengan urutan cascade yang benar -->
<link rel="stylesheet" href="assets/css/reset.css">
<link rel="stylesheet" href="assets/css/components.css">
<link rel="stylesheet" href="assets/css/style.css">`
                }
              ]
            },
            {
              id: 'les-css-2-1-2',
              title: 'PRACTICE: Menerapkan CSS Reset & Komponen Modular',
              type: 'practice',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Latihan: Modularisasi CSS & Box-Sizing Global

Terapkan aturan sakral \`box-sizing: border-box\` pada seluruh elemen (\`*\`), lalu rancang class komponen tombol \`.btn-primary\` yang terisolasi dengan padding, warna latar, dan border radius.`
                }
              ],
              starterCode: '<style>\n  /* 1. Aturan Global Reset */\n  * {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n  }\n\n  /* 2. Komponen Tombol Reusable (components.css) */\n  .btn-primary {\n    display: inline-block;\n    background-color: #2563eb;\n    color: #ffffff;\n    padding: 10px 20px;\n    border-radius: 6px;\n    text-decoration: none;\n    font-weight: 600;\n  }\n</style>\n\n<div style="padding: 20px;">\n  <h2>Komponen Tombol Siap Pakai</h2>\n  <a href="#" class="btn-primary">Mulai Sekarang</a>\n</div>',
              requirements: [
                {
                  id: 'req-css-reset',
                  description: 'Mengandung aturan universal selector * dengan box-sizing: border-box',
                  validate: (html) => html.includes('*') && html.includes('box-sizing:') && html.includes('border-box')
                },
                {
                  id: 'req-btn-component',
                  description: 'Terdapat class .btn-primary dengan styling lengkap',
                  validate: (html) => html.includes('.btn-primary') && html.includes('background-color') && html.includes('padding')
                }
              ]
            },
            {
              id: 'les-css-2-1-3',
              title: 'QUIZ: Arsitektur File & Urutan Cascade CSS',
              type: 'quiz',
              xpReward: 30,
              questions: [
                {
                  id: 'q-css-f-1',
                  question: 'Mengapa file reset.css harus di-link paling awal sebelum file style lainnya?',
                  options: [
                    'Agar browser menghapus margin default browser sebelum style kita diterapkan',
                    'Karena jika di akhir, warna website akan hilang semua',
                    'Wajib sesuai peraturan W3C',
                    'Agar file CSS tidak mengalami error syntax'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Dalam aturan Cascade, file reset harus di-load pertama agar styling kustom di file berikutnya dapat menimpa nilai default secara mulus.'
                },
                {
                  id: 'q-css-f-2',
                  question: 'Manakah cara yang paling direkomendasikan untuk memuat file CSS dalam proyek produksi?',
                  options: [
                    'Menggunakan tag <link rel="stylesheet" href="..."> di dalam <head>',
                    'Menggunakan @import url(...) di dalam file CSS',
                    'Menulis semua CSS di dalam atribut inline style=""',
                    'Menggunakan JavaScript document.write()'
                  ],
                  correctAnswerIndex: 0,
                  explanation: '<link rel="stylesheet"> dimuat secara paralel oleh browser, sedangkan @import memblokir rendering dan memperlambat waktu muat situs.'
                },
                {
                  id: 'q-css-f-3',
                  question: 'Apa fungsi sakral dari properti "box-sizing: border-box"?',
                  options: [
                    'Membuat kotak menjadi lingkaran',
                    'Menghitung padding dan border ke dalam total lebar (width) elemen, sehingga tidak melar melebihi ukuran yang ditentukan',
                    'Menghilangkan border elemen',
                    'Mengubah teks menjadi huruf kapital'
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'box-sizing: border-box memastikan width dan height yang kamu tentukan sudah mencakup padding dan border, mencegah layout bergeser.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'css-level-3',
      title: 'Level 3 — Intermediate',
      description: 'Modern Layout Master: Flexbox satu dimensi (justify, align, wrap, gap) & CSS Grid dua dimensi (template columns, repeat, minmax).',
      modules: [
        {
          id: 'css-mod-3-1',
          title: 'Flexbox Layout 1-Dimensi',
          description: 'Mengatur susunan elemen secara horizontal/vertikal dengan alignment yang fleksibel.',
          lessons: [
            {
              id: 'css-les-3-1-1',
              title: 'Membuat Navbar Sejajar dengan Flexbox',
              type: 'practice',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: 'Gunakan `display: flex`, `justify-content: space-between`, dan `align-items: center` untuk meratakan logo di kiri dan link di kanan.'
                }
              ],
              starterCode: '<style>\n  .navbar {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    background: #0f172a;\n    padding: 12px 24px;\n    color: white;\n  }\n  .nav-links {\n    display: flex;\n    gap: 16px;\n    list-style: none;\n  }\n</style>\n\n<header class="navbar">\n  <div class="logo"><strong>ACADEMY</strong></div>\n  <ul class="nav-links">\n    <li>Beranda</li>\n    <li>Kursus</li>\n    <li>Kontak</li>\n  </ul>\n</header>',
              requirements: [
                {
                  id: 'req-flex-nav',
                  description: 'Menggunakan display: flex dan justify-content: space-between',
                  validate: (html) => html.includes('display: flex') && html.includes('justify-content: space-between')
                }
              ]
            }
          ]
        },
        {
          id: 'css-mod-3-2',
          title: 'CSS Grid Layout 2-Dimensi',
          description: 'Membangun tata letak kartu bento-grid multi-kolom yang rapi dan serasi.',
          lessons: [
            {
              id: 'css-les-3-2-1',
              title: 'Grid 3 Kolom Responsif dengan repeat & minmax',
              type: 'practice',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: 'Gunakan `display: grid`, `grid-template-columns: repeat(3, 1fr)`, dan `gap: 16px`.'
                }
              ],
              starterCode: '<style>\n  .grid-container {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 16px;\n  }\n  .item {\n    background: #e2e8f0;\n    padding: 20px;\n    text-align: center;\n    border-radius: 8px;\n  }\n</style>\n\n<div class="grid-container">\n  <div class="item">Kolom 1</div>\n  <div class="item">Kolom 2</div>\n  <div class="item">Kolom 3</div>\n</div>',
              requirements: [
                {
                  id: 'req-css-grid',
                  description: 'Menggunakan display: grid dengan grid-template-columns dan gap',
                  validate: (html) => html.includes('display: grid') && html.includes('grid-template-columns') && html.includes('gap')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'css-level-4',
      title: 'Level 4 — Advanced',
      description: 'CSS Variables (Custom Properties), Transisi halus (transition), Animasi Keyframes (@keyframes), dan Media Queries responsif.',
      modules: [
        {
          id: 'css-mod-4-1',
          title: 'CSS Variables & Dynamic Theming',
          description: 'Mendefinisikan variabel global :root untuk mempermudah perubahan tema warna dan dark mode.',
          lessons: [
            {
              id: 'css-les-4-1-1',
              title: 'Mendefinisikan dan Memanggil CSS Variables',
              type: 'practice',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: 'Definisikan variabel di `:root` seperti `--warna-utama: #3b82f6;` lalu panggil menggunakan fungsi `var(--warna-utama)`.'
                }
              ],
              starterCode: '<style>\n  :root {\n    --primary: #4f46e5;\n    --text-color: #1e293b;\n    --radius: 8px;\n  }\n  .badge {\n    background-color: var(--primary);\n    color: white;\n    padding: 6px 12px;\n    border-radius: var(--radius);\n    display: inline-block;\n  }\n</style>\n\n<span class="badge">CSS Variables Aktif</span>',
              requirements: [
                {
                  id: 'req-css-var',
                  description: 'Mendefinisikan variabel di :root dan menggunakannya dengan var()',
                  validate: (html) => html.includes(':root') && html.includes('--') && html.includes('var(')
                }
              ]
            }
          ]
        },
        {
          id: 'css-mod-4-2',
          title: 'Animasi & Responsive Media Queries',
          description: 'Membuat efek hover transisi mulus dan tata letak responsif untuk layar smartphone (@media).',
          lessons: [
            {
              id: 'css-les-4-2-1',
              title: 'Kartu Interaktif dengan Hover & Transition',
              type: 'practice',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: 'Tambahkan efek `transition: transform 0.3s ease` dan perubahan `transform: translateY(-4px)` saat `:hover`.'
                }
              ],
              starterCode: '<style>\n  .card-hover {\n    background: white;\n    padding: 24px;\n    border-radius: 12px;\n    border: 1px solid #e2e8f0;\n    transition: transform 0.3s ease, box-shadow 0.3s ease;\n    cursor: pointer;\n  }\n  .card-hover:hover {\n    transform: translateY(-4px);\n    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);\n  }\n</style>\n\n<div class="card-hover">\n  <h3>Arahkan Kursor ke Sini!</h3>\n  <p>Kartu terangkat dengan transisi halus.</p>\n</div>',
              requirements: [
                {
                  id: 'req-hover-anim',
                  description: 'Memiliki aturan :hover dengan transform dan properti transition',
                  validate: (html) => html.includes(':hover') && html.includes('transition:') && html.includes('transform:')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'css-level-5',
      title: 'Level 5 — Professional',
      description: 'Arsitektur CSS skala industri (BEM Methodology: Block Element Modifier, 7-1 Sass/CSS pattern, dan utility-first concepts).',
      modules: [
        {
          id: 'css-mod-5-1',
          title: 'Arsitektur CSS Skala Industri (BEM & 7-1 Pattern)',
          description: 'Bagaimana tim software engineer mengorganisir puluhan ribu baris stylesheet tanpa konflik spesifisitas.',
          lessons: [
            {
              id: 'les-css-5-1-1',
              title: 'LEARN: Metodologi BEM & Pola Folder 7-1',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Arsitektur CSS Tingkat Enterprise

Dalam proyek besar yang dikerjakan oleh puluhan developer, masalah terbesar CSS adalah **Spesifisitas Tidak Terkendali** dan tabrakan nama class.

Dua standar industri yang memecahkan masalah ini adalah **BEM** dan **Pola Folder 7-1**.

---

#### 1. Metodologi BEM (Block, Element, Modifier)
BEM mengatur penamaan class agar mudah ditebak dan tidak saling menimpa:
- **Block (Blok Utama)**: Entitas mandiri bermakna (\`.card\`, \`.navbar\`, \`.btn\`).
- **Element (Bagian dari Blok)**: Diawali dua garis bawah \`__\` (\`.card__title\`, \`.card__image\`, \`.navbar__item\`).
- **Modifier (Variasi / Status)**: Diawali dua garis hubung \`--\` (\`.btn--primary\`, \`.card--featured\`, \`.btn--disabled\`).

\`\`\`html
<article class="card card--featured">
  <img class="card__thumbnail" src="img.jpg" alt="Thumbnail">
  <div class="card__body">
    <h3 class="card__title">Judul Artikel</h3>
    <button class="btn btn--primary">Baca</button>
  </div>
</article>
\`\`\`

---

#### 2. Pola Folder CSS Enterprise (The 7-1 Architecture Pattern)
Standar paling populer di dunia untuk mengorganisasi berkas stylesheet proyek enterprise:

\`\`\`text
assets/css/
│
├── base/                # Konfigurasi dasar
│   ├── _reset.css       # Normalisasi browser
│   └── _typography.css  # Definisi heading, paragraf, font
│
├── components/          # Potongan UI mandiri (reusable)
│   ├── _buttons.css     # .btn, .btn--primary
│   ├── _cards.css       # .card, .card__header
│   └── _navbar.css      # .nav, .nav__item
│
├── layout/              # Rangka struktur halaman
│   ├── _grid.css        # Sistem grid 12 kolom
│   ├── _header.css      # Header global
│   └── _footer.css      # Footer global
│
├── themes/              # Skema warna
│   ├── _light.css       # Variabel tema terang
│   └── _dark.css        # Variabel tema gelap
│
└── main.css             # Berkas utama yang menggabungkan seluruh modul
\`\`\`
`
                },
                {
                  type: 'code-example',
                  language: 'css',
                  code: `/* Penerapan BEM Clean Architecture */
.pricing-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}
.pricing-card--popular {
  border-color: #6366f1;
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.15);
}
.pricing-card__header {
  padding: 24px;
}
.pricing-card__button {
  width: 100%;
}`
                }
              ]
            },
            {
              id: 'les-css-5-1-2',
              title: 'PRACTICE: Desain Komponen UI dengan Metodologi BEM',
              type: 'practice',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
                  content: `### Latihan: Menerapkan Pola BEM

Terapkan penamaan class BEM pada komponen produk berikut:
- Block: \`.product-card\`
- Element: \`.product-card__title\` dan \`.product-card__price\`
- Modifier: \`.product-card--sale\` yang memiliki border berwarna merah atau aksen khusus.`
                }
              ],
              starterCode: '<style>\n  /* Terapkan BEM CSS */\n  .product-card {\n    border: 1px solid #e2e8f0;\n    padding: 16px;\n    border-radius: 8px;\n  }\n  .product-card--sale {\n    border-color: #ef4444;\n    background-color: #fef2f2;\n  }\n  .product-card__title {\n    font-size: 18px;\n    font-weight: 700;\n  }\n  .product-card__price {\n    color: #ef4444;\n    font-size: 20px;\n    font-weight: 800;\n  }\n</style>\n\n<div class="product-card product-card--sale">\n  <h3 class="product-card__title">Headphone Noise Cancelling</h3>\n  <p class="product-card__price">Rp850.000 (Diskon 25%)</p>\n</div>',
              requirements: [
                {
                  id: 'req-bem-block',
                  description: 'Memiliki aturan class .product-card',
                  validate: (html) => html.includes('.product-card')
                },
                {
                  id: 'req-bem-modifier',
                  description: 'Memiliki aturan modifier .product-card--sale',
                  validate: (html) => html.includes('.product-card--sale')
                },
                {
                  id: 'req-bem-element',
                  description: 'Memiliki elemen dengan class double-underscore __',
                  validate: (html) => html.includes('.product-card__')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'css-level-6',
      title: 'Level 6 — Project',
      description: 'Implementasi proyek nyata berskala penuh: Modern Responsive E-Commerce Product Showcase & Interactive Pricing Table dengan dark mode CSS variables.',
      modules: [
        {
          id: 'css-mod-6-1',
          title: 'Capstone Project: Modern Product Showcase & Pricing Grid',
          description: 'Membangun antarmuka katalog produk premium yang responsif dengan efek visual mikro-interaksi.',
          lessons: [
            {
              id: 'css-les-6-1-1',
              title: 'CAPSTONE: Responsive Storefront Showcase',
              type: 'project',
              xpReward: 150,
              content: [
                {
                  type: 'markdown',
                  content: [
                    '### Capstone Project: Modern Responsive Storefront',
                    '',
                    'Gabungkan Flexbox, Grid, CSS Variables, dan Transisi untuk membangun etalase produk toko modern!',
                    '',
                    '**Persyaratan Proyek:**',
                    '1. **CSS Variables**: Definisikan variabel warna utama di `:root`.',
                    '2. **Layout Grid Responsif**: Gunakan `display: grid` dengan `grid-template-columns` untuk menyusun minimal 2 kartu produk.',
                    '3. **Flexbox Alignment**: Di dalam kartu, gunakan Flexbox untuk mengatur judul, harga, dan tombol aksi.',
                    '4. **Efek Mikro-Interaksi**: Tambahkan efek `:hover` dengan transisi halus (`transition`) pada kartu produk.'
                  ].join('\n')
                }
              ],
              starterCode: '<style>\n  :root {\n    --primary: #2563eb;\n    --text-dark: #0f172a;\n    --bg-card: #ffffff;\n    --radius: 12px;\n  }\n\n  .catalog-grid {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    gap: 20px;\n    padding: 20px;\n  }\n\n  .card {\n    background: var(--bg-card);\n    border: 1px solid #e2e8f0;\n    border-radius: var(--radius);\n    padding: 20px;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    transition: transform 0.3s ease, box-shadow 0.3s ease;\n  }\n\n  .card:hover {\n    transform: translateY(-6px);\n    box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.1);\n  }\n\n  .card-btn {\n    background: var(--primary);\n    color: white;\n    border: none;\n    padding: 10px 16px;\n    border-radius: 6px;\n    cursor: pointer;\n    margin-top: 16px;\n  }\n</style>\n\n<div class="catalog-grid">\n  <div class="card">\n    <h3>Mechanical Keyboard RGB</h3>\n    <p>Switch tactile dengan backlight RGB dinamis.</p>\n    <strong>Rp650.000</strong>\n    <button class="card-btn">Tambah ke Keranjang</button>\n  </div>\n  <div class="card">\n    <h3>Mouse Wireless Ultra</h3>\n    <p>Sensor optik 16.000 DPI baterai tahan 80 jam.</p>\n    <strong>Rp350.000</strong>\n    <button class="card-btn">Tambah ke Keranjang</button>\n  </div>\n</div>',
              requirements: [
                {
                  id: 'req-cap-grid',
                  description: 'Menggunakan display: grid pada wadah katalog',
                  validate: (html) => html.includes('display: grid')
                },
                {
                  id: 'req-cap-flex',
                  description: 'Menggunakan display: flex pada komponen kartu',
                  validate: (html) => html.includes('display: flex')
                },
                {
                  id: 'req-cap-vars',
                  description: 'Menggunakan CSS Variables dengan var(--...)',
                  validate: (html) => html.includes('var(--')
                },
                {
                  id: 'req-cap-hover',
                  description: 'Memiliki aturan efek :hover dengan transisi',
                  validate: (html) => html.includes(':hover') && html.includes('transition:')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'css-level-7',
      title: 'Level 7 — Assessment',
      description: 'Evaluasi akhir komprehensif: Ujian teori CSS tingkat mahir, tantangan live coding mandiri, dan sertifikasi kelulusan.',
      modules: [
        {
          id: 'css-mod-7-1',
          title: 'Comprehensive Knowledge Assessment (Ujian Teori)',
          description: 'Ujian komprehensif menguji pemahaman mendalam tentang Specificity, Cascade, Flexbox vs Grid, dan Box Model.',
          lessons: [
            {
              id: 'css-les-7-1-1',
              title: 'ASSESSMENT QUIZ: Evaluasi Teori CSS Software Engineer',
              type: 'quiz',
              xpReward: 50,
              questions: [
                {
                  id: 'q-c7-1',
                  question: 'Manakah selektor CSS berikut yang memiliki tingkat bobot spesifisitas (specificity weight) tertinggi?',
                  options: [
                    'Tag selector: "h1"',
                    'Class selector: ".judul-utama"',
                    'ID selector: "#header-banner"',
                    'Universal selector: "*"'
                  ],
                  correctAnswerIndex: 2,
                  explanation: 'Dalam hierarki spesifisitas CSS: Inline style (1000) > ID (100) > Class/Pseudo-class (10) > Elemen/Pseudo-element (1) > Universal (0).'
                },
                {
                  id: 'q-c7-2',
                  question: 'Kapan kamu harus memprioritaskan CSS Grid dibandingkan Flexbox?',
                  options: [
                    'Saat menata layout 2-dimensi (baris dan kolom sekaligus)',
                    'Hanya saat memberi warna teks',
                    'Saat meratakan item dalam 1 baris saja',
                    'Saat menggunakan browser Internet Explorer lama'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'CSS Grid dirancang khusus untuk layout 2 dimensi (baris + kolom), sedangkan Flexbox optimal untuk susunan 1 dimensi (hanya baris atau hanya kolom).'
                },
                {
                  id: 'q-c7-3',
                  question: 'Dalam metodologi penamaan BEM, apa arti dari penamaan ".button--secondary"?',
                  options: [
                    'Elemen anak dari button',
                    'Modifier (varian) dari blok .button',
                    'ID unik dari button',
                    'File CSS bernama secondary'
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'Dua tanda garis hubung "--" dalam BEM menandai sebuah Modifier yang memodifikasi tampilan atau status komponen dasar.'
                },
                {
                  id: 'q-c7-4',
                  question: 'Mengapa arsitektur 7-1 Sass/CSS memisahkan folder "base/", "components/", dan "layout/"?',
                  options: [
                    'Agar file tidak bisa dibaca orang lain',
                    'Untuk menerapkan pemisahan tanggung jawab (Separation of Concerns) sehingga stylesheet mudah dipelihara di tim besar',
                    'Karena browser tidak bisa membaca file lebih dari 100 baris',
                    'Untuk mempercepat koneksi internet pengguna'
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'Arsitektur 7-1 mengisolasi styling berdasarkan perannya sehingga mencegah duplikasi dan tabrakan styling di aplikasi skala besar.'
                },
                {
                  id: 'q-c7-5',
                  question: 'Manakah nilai properti "position" yang membuat elemen tetap mengambang di posisi layar yang sama saat pengguna men-scroll halaman?',
                  options: [
                    'position: relative',
                    'position: static',
                    'position: fixed',
                    'position: inherit'
                  ],
                  correctAnswerIndex: 2,
                  explanation: 'position: fixed mengunci posisi elemen relatif terhadap jendela browser (viewport), sehingga tetap di tempat saat di-scroll.'
                }
              ]
            }
          ]
        },
        {
          id: 'css-mod-7-2',
          title: 'Live Coding Technical Assessment (Ujian Praktik)',
          description: 'Ujian live coding mandiri tanpa template: membangun kartu profil responsif dengan Flexbox/Grid dan variabel CSS kustom.',
          lessons: [
            {
              id: 'css-les-7-2-1',
              title: 'FINAL LIVE CODING: Responsive Profile Card Challenge',
              type: 'challenge',
              xpReward: 100,
              content: [
                {
                  type: 'markdown',
                  content: [
                    '### Ujian Akhir Praktik: Responsive Profile Card',
                    '',
                    'Buktikan keahlian desain webmu dengan membangun kartu profil modern tervalidasi!',
                    '',
                    '**Persyaratan Ujian:**',
                    '1. Definisikan minimal satu variabel CSS di `:root` (misal `--primary`).',
                    '2. Gunakan `display: flex` dengan `align-items: center` atau `justify-content` pada kartu.',
                    '3. Atur `padding`, `border-radius`, dan `box-shadow` untuk estetika visual modern.',
                    '4. Terapkan efek `:hover` dengan transisi halus.'
                  ].join('\n')
                }
              ],
              starterCode: '<style>\n  :root {\n    --primary-color: #6366f1;\n    --card-bg: #ffffff;\n  }\n  .profile-card {\n    background: var(--card-bg);\n    padding: 24px;\n    border-radius: 12px;\n    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n    display: flex;\n    gap: 16px;\n    align-items: center;\n    transition: transform 0.3s ease;\n  }\n  .profile-card:hover {\n    transform: scale(1.02);\n  }\n  .avatar {\n    width: 60px;\n    height: 60px;\n    border-radius: 50%;\n    background: var(--primary-color);\n  }\n</style>\n\n<div class="profile-card">\n  <div class="avatar"></div>\n  <div>\n    <h3>Budi Santoso</h3>\n    <p style="color: #64748b;">Senior Frontend Engineer</p>\n  </div>\n</div>',
              requirements: [
                {
                  id: 'req-exam-vars',
                  description: 'Menggunakan CSS Variables di :root dan dipanggil dengan var()',
                  validate: (html) => html.includes(':root') && html.includes('var(')
                },
                {
                  id: 'req-exam-flex',
                  description: 'Menggunakan display: flex dan gap',
                  validate: (html) => html.includes('display: flex') && html.includes('gap:')
                },
                {
                  id: 'req-exam-hover',
                  description: 'Memiliki aturan hover dan properti transition',
                  validate: (html) => html.includes(':hover') && html.includes('transition:')
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
