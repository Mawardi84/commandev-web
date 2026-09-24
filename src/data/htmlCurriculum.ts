import { Course } from '../types';

export const HTML_COURSE: Course = {
  id: 'html-mastery',
  title: 'HTML 0 → Mahir',
  shortDescription: 'Kurikulum HTML komprehensif 8 jenjang: Absolute Beginner, Fundamental, Beginner, Intermediate, Advanced, Professional, Project, & Assessment.',
  description: 'HTML adalah fondasi dari setiap halaman web di internet. Kurikulum 8 tingkat ini membimbingmu dari struktur tag paling dasar, anatomi folder web standar, semantik modern, SEO & aksesibilitas, arsitektur produksi, hingga capstone project dan asesmen kelulusan.',
  icon: 'html',
  levels: [
    {
      id: 'level-0',
      title: 'Level 0 — Absolute Beginner',
      description: 'Pengenalan dasar untuk kamu yang belum pernah coding sama sekali. Anatomi tag, teks, dan struktur utama halaman web.',
      modules: [
        {
          id: 'mod-0-1',
          title: 'Pengenalan HTML & Elemen Teks',
          description: 'Apa itu HTML dan bagaimana cara browser menerjemahkan kode menjadi tampilan visual?',
          lessons: [
            {
              id: 'les-0-1-1',
              title: 'Apa itu HTML?',
              type: 'learn',
              xpReward: 10,
              content: [
                { type: 'markdown', content: '### Selamat Datang di Dunia Web!\n\nSetiap website yang kamu buka (Google, YouTube, Instagram) pada dasarnya dibangun dengan 3 pilar utama:\n\n1. **HTML** (Kerangka & Struktur)\n2. **CSS** (Gaya & Tampilan)\n3. **JavaScript** (Logika & Interaktivitas)\n\n**HTML (HyperText Markup Language)** bukanlah bahasa pemrograman dengan kalkulasi rumit. HTML adalah bahasa *markup* — fungsinya memberi tahu browser: *"Ini adalah judul, ini adalah paragraf, dan ini adalah gambar."*' },
                { type: 'code-example', language: 'html', code: '<h1>Ini Judul Utama</h1>\n<p>Ini adalah paragraf penjelasan.</p>' },
                { type: 'markdown', content: 'Semua elemen HTML diawali dengan tag pembuka (misal `<h1>`) dan diakhiri tag penutup (`</h1>`).' }
              ]
            },
            {
              id: 'les-0-1-2',
              title: 'Coba Tulis Kode Pertamamu',
              type: 'practice',
              xpReward: 20,
              content: [
                { type: 'markdown', content: 'Mari kita langsung praktik! Di bawah ini adalah area kodemu.\n\nSebuah teks biasa bisa diubah menjadi **Judul Utama** dengan membungkusnya menggunakan tag `<h1>` dan ditutup dengan `</h1>`.\n\n**Tugasmu:**\nBuatlah sebuah judul utama berbunyi "Halo Dunia" menggunakan tag H1.' }
              ],
              starterCode: '<!-- Tulis kodemu di bawah ini -->\n',
              requirements: [
                {
                  id: 'req-1',
                  description: 'Gunakan tag <h1>',
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, 'text/html');
                    return doc.querySelectorAll('h1').length > 0;
                  }
                },
                {
                  id: 'req-2',
                  description: 'Teks di dalamnya harus berisi kata "Halo Dunia" atau "Hello World"',
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, 'text/html');
                    const h1 = doc.querySelector('h1');
                    if (!h1) return false;
                    const text = h1.textContent?.toLowerCase() || '';
                    return text.includes('halo') || text.includes('hello');
                  }
                }
              ]
            },
            {
              id: 'les-0-1-3',
              title: 'Hierarki Judul (H1 sampai H6)',
              type: 'practice',
              xpReward: 25,
              content: [
                { type: 'markdown', content: '### Tingkatan Judul di HTML\n\nHTML menyediakan 6 level heading: dari `<h1>` (paling penting & paling besar) sampai `<h6>` (paling kecil).\n\n```html\n<h1>Judul Artikel</h1>\n<h2>Sub-bab 1</h2>\n<h3>Detail Poin A</h3>\n```\n\n**Tugasmu:**\nBuatlah sebuah tag `<h1>` dengan teks apapun, lalu di bawahnya buat tag `<h2>` sebagai sub-judulnya!' }
              ],
              starterCode: '<!-- Tulis H1 dan H2 di bawah ini -->\n',
              requirements: [
                {
                  id: 'req-1',
                  description: 'Memiliki minimal satu tag <h1>',
                  validate: (html) => new DOMParser().parseFromString(html, 'text/html').querySelectorAll('h1').length > 0
                },
                {
                  id: 'req-2',
                  description: 'Memiliki minimal satu tag <h2>',
                  validate: (html) => new DOMParser().parseFromString(html, 'text/html').querySelectorAll('h2').length > 0
                }
              ]
            }
          ]
        },
        {
          id: 'mod-0-2',
          title: 'Struktur Kerangka Standar HTML',
          description: 'DOCTYPE, html, head, dan body — kerangka wajib setiap halaman web.',
          lessons: [
            {
              id: 'les-0-2-1',
              title: 'Anatomi Kerangka Dasar Dokumen',
              type: 'learn',
              xpReward: 15,
              content: [
                { type: 'markdown', content: '### Kerangka Wajib HTML5\n\nSetiap halaman web modern selalu memiliki cetak biru struktur:\n\n```html\n<!DOCTYPE html>\n<html lang="id">\n<head>\n  <meta charset="UTF-8">\n  <title>Judul Tab Browser</title>\n</head>\n<body>\n  <h1>Konten yang tampil di layar ada di sini</h1>\n</body>\n</html>\n```\n\n- `<head>`: Berisi metadata (judul tab, styling, SEO) yang tidak tampak langsung di halaman.\n- `<body>`: Seluruh konten visual yang dilihat pengunjung web.' }
              ]
            },
            {
              id: 'les-0-2-2',
              title: 'Latihan Menyusun Kerangka Lengkap',
              type: 'practice',
              xpReward: 30,
              content: [
                { type: 'markdown', content: 'Lengkapi kerangka dasar website pertamamu. Letakkan judul `<h1>` dan paragraf `<p>` di dalam tag `<body>`!' }
              ],
              starterCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Halaman Pertamaku</title>\n</head>\n<body>\n  <!-- Masukkan H1 dan P di sini -->\n  \n</body>\n</html>',
              requirements: [
                {
                  id: 'req-1',
                  description: 'Memiliki tag <h1> di dalam body',
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, 'text/html');
                    return !!doc.body && doc.body.querySelectorAll('h1').length > 0;
                  }
                },
                {
                  id: 'req-2',
                  description: 'Memiliki tag <p> di dalam body',
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, 'text/html');
                    return !!doc.body && doc.body.querySelectorAll('p').length > 0;
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'level-1',
      title: 'Level 1 — Fundamental',
      description: 'Format teks tebal/miring, list berurutan (ol/ul), tautan link hyperlink (a), dan menyisipkan media gambar (img).',
      modules: [
        {
          id: 'mod-1-1',
          title: 'Format Teks & List',
          description: 'Membuat daftar item teratur dan penekanan kata.',
          lessons: [
            {
              id: 'les-1-1-1',
              title: 'Format Teks: Tebal dan Miring',
              type: 'practice',
              xpReward: 20,
              content: [
                { type: 'markdown', content: 'Gunakan `<strong>` untuk teks **tebal (penting)** dan `<em>` untuk teks *miring (penekanan)*.\n\n**Tugasmu:** Buat satu kalimat di dalam tag `<p>` yang memiliki kata bertag `<strong>` dan kata bertag `<em>`!' }
              ],
              starterCode: '<p>Tulis kalimat dengan <strong>kata penting</strong> dan <em>kata penekanan</em>.</p>',
              requirements: [
                {
                  id: 'req-1',
                  description: 'Mengandung tag <strong>',
                  validate: (html) => new DOMParser().parseFromString(html, 'text/html').querySelectorAll('strong').length > 0
                },
                {
                  id: 'req-2',
                  description: 'Mengandung tag <em>',
                  validate: (html) => new DOMParser().parseFromString(html, 'text/html').querySelectorAll('em').length > 0
                }
              ]
            },
            {
              id: 'les-1-1-2',
              title: 'Daftar Bullet (Unordered List <ul>)',
              type: 'practice',
              xpReward: 25,
              content: [
                { type: 'markdown', content: 'Gunakan `<ul>` dan `<li>` untuk membuat daftar item tidak berurut (titik bullet).' }
              ],
              starterCode: '<ul>\n  <li>Kopi</li>\n  <li>Teh</li>\n</ul>',
              requirements: [
                {
                  id: 'req-1',
                  description: 'Memiliki elemen <ul> dengan minimal 2 buah <li>',
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, 'text/html');
                    const ul = doc.querySelector('ul');
                    return !!ul && ul.querySelectorAll('li').length >= 2;
                  }
                }
              ]
            }
          ]
        },
        {
          id: 'mod-1-2',
          title: 'Link & Gambar',
          description: 'Menghubungkan antar halaman dengan tag a dan menyisipkan gambar dengan tag img.',
          lessons: [
            {
              id: 'les-1-2-1',
              title: 'Tautan Hyperlink (tag a)',
              type: 'practice',
              xpReward: 25,
              content: [
                { type: 'markdown', content: 'Gunakan tag `<a href="https://...">Teks Link</a>` untuk membuat tautan yang bisa diklik!' }
              ],
              starterCode: '<a href="https://google.com" target="_blank">Kunjungi Google</a>',
              requirements: [
                {
                  id: 'req-1',
                  description: 'Memiliki tag <a> dengan atribut href yang tidak kosong',
                  validate: (html) => {
                    const a = new DOMParser().parseFromString(html, 'text/html').querySelector('a');
                    return !!a && !!a.getAttribute('href');
                  }
                }
              ]
            },
            {
              id: 'les-1-2-2',
              title: 'Menampilkan Gambar (tag img)',
              type: 'practice',
              xpReward: 25,
              content: [
                { type: 'markdown', content: 'Tag `<img>` bersifat *self-closing* dan membutuhkan atribut `src` (sumber gambar) serta `alt` (teks alternatif aksesibilitas).' }
              ],
              starterCode: '<img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300" alt="Laptop coding" />',
              requirements: [
                {
                  id: 'req-1',
                  description: 'Memiliki tag <img> dengan atribut src dan alt',
                  validate: (html) => {
                    const img = new DOMParser().parseFromString(html, 'text/html').querySelector('img');
                    return !!img && !!img.getAttribute('src') && !!img.getAttribute('alt');
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'level-2',
      title: 'Level 2 — Beginner',
      description: 'Bagaimana membuat struktur folder proyek website standar (index.html, subfolder assets, path relatif/absolut), dan navigasi multi-halaman.',
      modules: [
        {
          id: 'mod-2-1',
          title: 'Bagaimana Membuat Struktur Folder Website Standar',
          description: 'Dari satu file HTML menuju struktur folder profesional: aturan nama berkas, hierarki assets, dan resolusi path.',
          lessons: [
            {
              id: 'les-2-1-1',
              title: 'LEARN: Anatomi Folder Proyek Web Standar',
              type: 'learn',
              xpReward: 25,
              content: [
                {
                  type: 'markdown',
                  content: `### Bagaimana Cara Membuat Struktur Folder di Website?

Banyak pemula meletakkan semua file HTML, gambar, file CSS, dan file teks di dalam satu folder sembarangan dengan nama acak seperti \`foto1.jpg\` atau \`halaman2.html\`. Di dunia web profesional, struktur folder harus tertata rapi agar mudah di-deploy ke server hosting.

---

#### 1. Struktur Folder Standar Website (Standard Web Project Layout)

\`\`\`text
my_awesome_website/
│
├── index.html           # [WAJIB] Halaman beranda utama (Home Page)
├── about.html           # Halaman tentang kami
├── contact.html         # Halaman kontak
├── README.md            # Dokumentasi proyek
│
├── pages/               # (Opsional) Untuk proyek dengan banyak halaman
│   ├── blog.html
│   └── services.html
│
└── assets/              # Wadah seluruh aset statis
    ├── css/             # Lembar gaya stylesheet
    │   └── style.css
    ├── js/              # Skrip logika interaktif
    │   └── main.js
    └── images/          # Seluruh berkas gambar, logo, ikon
        ├── logo.svg
        └── hero-banner.jpg
\`\`\`

---

#### 2. Mengapa File Beranda Harus Bernama \`index.html\`?
Semua web server di dunia (Apache, Nginx, Vercel, Netlify, Cloudflare) secara otomatis mencari file bernama **\`index.html\`** sebagai halaman default saat seseorang membuka domainmu (misal \`www.situsku.com\`). Jika kamu menamainya \`home.html\` atau \`beranda.html\`, server akan menampilkan error 404!

---

#### 3. Memahami Resolusi Path Relatif (Relative Paths)
Saat kamu memanggil gambar atau menghubungkan file HTML antar folder:
- **Folder yang sama**: \`<a href="about.html">About</a>\`
- **Masuk ke dalam subfolder**: \`<img src="assets/images/logo.svg">\`
- **Keluar satu tingkat ke folder induk (\`../\`)**:
  Jika kamu berada di dalam file \`pages/blog.html\` dan ingin memanggil gambar di \`assets/images/\`:
  \`\`\`html
  <img src="../assets/images/logo.svg" alt="Logo">
  \`\`\`
- **Kembali ke halaman utama**: \`<a href="../index.html">Kembali ke Beranda</a>\`
`
                },
                {
                  type: 'code-example',
                  language: 'html',
                  code: `<!-- Contoh navigasi multi-halaman dengan struktur folder yang bersih -->
<nav>
  <ul>
    <li><a href="index.html">Beranda</a></li>
    <li><a href="about.html">Tentang Kami</a></li>
    <li><a href="contact.html">Hubungi Kami</a></li>
  </ul>
</nav>

<img src="assets/images/banner.jpg" alt="Banner Website">`
                }
              ]
            },
            {
              id: 'les-2-1-2',
              title: 'PRACTICE: Menyusun Navigasi Multi-Halaman & Path Aset',
              type: 'practice',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: [
                    '### Latihan: Navigasi Multi-Page & Struktur Path',
                    '',
                    'Bayangkan kamu sedang mengelola struktur folder website:',
                    '```text',
                    'my_site/',
                    '├── index.html',
                    '├── about.html',
                    '└── assets/',
                    '    └── images/',
                    '        └── profile.png',
                    '```',
                    '',
                    '**Tugasmu:**',
                    '1. Buat tag `<nav>` yang membungkus list `<ul>` dengan minimal 2 tautan link: ke `index.html` (Beranda) dan ke `about.html` (Tentang).',
                    '2. Buat tag `<img>` yang memanggil gambar dari path `assets/images/profile.png` dengan atribut `alt` yang jelas.'
                  ].join('\n')
                }
              ],
              starterCode: '<!-- Susun nav link multi-halaman dan gambar dari folder assets -->\n<nav>\n  <ul>\n    <li><a href="index.html">Beranda</a></li>\n    <li><a href="about.html">Tentang</a></li>\n  </ul>\n</nav>\n\n<img src="assets/images/profile.png" alt="Foto Profil" />',
              requirements: [
                {
                  id: 'req-nav-links',
                  description: 'Memiliki elemen <nav> dengan tautan ke index.html dan about.html',
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, 'text/html');
                    const links = Array.from(doc.querySelectorAll('nav a'));
                    const hrefs = links.map(l => l.getAttribute('href'));
                    return hrefs.includes('index.html') && hrefs.includes('about.html');
                  }
                },
                {
                  id: 'req-asset-img',
                  description: 'Memiliki tag <img> dengan path mengarah ke assets/images/',
                  validate: (html) => {
                    const img = new DOMParser().parseFromString(html, 'text/html').querySelector('img');
                    return !!img && (img.getAttribute('src')?.includes('assets/images/') || false);
                  }
                }
              ]
            },
            {
              id: 'les-2-1-3',
              title: 'QUIZ: Aturan Struktur Folder Website',
              type: 'quiz',
              xpReward: 30,
              questions: [
                {
                  id: 'q-html-f-1',
                  question: 'Mengapa file halaman utama sebuah website wajib dinamai "index.html"?',
                  options: [
                    'Karena itu adalah syarat dari browser Google Chrome',
                    'Karena web server secara otomatis mencari index.html sebagai titik awal saat membuka domain',
                    'Agar file tidak bisa diedit oleh hacker',
                    'Hanya kebiasaan dan sebenarnya bebas menggunakan nama apa saja'
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'Secara standar global, web server (Nginx, Apache, Vercel, dll) mencari file index.html sebagai default root document saat domain dikunjungi.'
                },
                {
                  id: 'q-html-f-2',
                  question: 'Jika file kamu berada di "pages/detail.html" dan ingin memanggil gambar di "assets/images/pic.png", bagaimana path yang benar?',
                  options: [
                    '../assets/images/pic.png',
                    'assets/images/pic.png',
                    'pages/assets/images/pic.png',
                    'pic.png'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Tanda "../" digunakan untuk keluar satu tingkat dari folder "pages/" menuju root folder, kemudian masuk ke "assets/images/pic.png".'
                },
                {
                  id: 'q-html-f-3',
                  question: 'Di dalam folder manakah file stylesheet (CSS), skrip (JS), dan gambar (Images) biasanya dikelompokkan?',
                  options: [
                    'Di folder bin/',
                    'Di folder assets/ atau public/',
                    'Di folder trash/',
                    'Di dalam file index.html langsung'
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'Standar industri menaruh file statis seperti CSS, JS, dan gambar di dalam folder assets/ atau public/ agar terisolasi rapi.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'level-3',
      title: 'Level 3 — Intermediate',
      description: 'Formulir interaktif (input, select, textarea), tabel data, dan elemen semantik modern HTML5 (header, nav, main, section, footer).',
      modules: [
        {
          id: 'mod-3-1',
          title: 'Formulir Interaktif (Forms & Inputs)',
          description: 'Menerima input pengguna dengan form, textfield, email, password, dan tombol kirim.',
          lessons: [
            {
              id: 'les-3-1-1',
              title: 'Membuat Form Kontak Sederhana',
              type: 'practice',
              xpReward: 35,
              content: [
                { type: 'markdown', content: 'Gunakan `<form>` dengan input text, email, dan button submit.\n\n**Tugas:** Buat form dengan input nama, input email, dan tombol "Kirim"!' }
              ],
              starterCode: '<form action="#" method="POST">\n  <label for="nama">Nama:</label>\n  <input type="text" id="nama" name="nama" required />\n\n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email" required />\n\n  <button type="submit">Kirim Pesan</button>\n</form>',
              requirements: [
                {
                  id: 'req-form',
                  description: 'Memiliki elemen <form>',
                  validate: (html) => new DOMParser().parseFromString(html, 'text/html').querySelectorAll('form').length > 0
                },
                {
                  id: 'req-inputs',
                  description: 'Memiliki input type="text" dan input type="email"',
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, 'text/html');
                    return !!doc.querySelector('input[type="text"]') && !!doc.querySelector('input[type="email"]');
                  }
                },
                {
                  id: 'req-btn',
                  description: 'Memiliki tombol submit',
                  validate: (html) => new DOMParser().parseFromString(html, 'text/html').querySelectorAll('button[type="submit"], input[type="submit"]').length > 0
                }
              ]
            }
          ]
        },
        {
          id: 'mod-3-2',
          title: 'Semantik Modern HTML5 & Tabel Data',
          description: 'Menggantikan <div> generik dengan tag semantik: header, nav, main, section, article, footer.',
          lessons: [
            {
              id: 'les-3-2-1',
              title: 'Struktur Tata Letak Semantik',
              type: 'practice',
              xpReward: 40,
              content: [
                { type: 'markdown', content: 'Tag semantik memberi makna pada struktur web untuk mesin pencari (SEO) dan pembaca layar (screen reader).\n\n**Tugas:** Susun kerangka halaman dengan `<header>`, `<main>`, `<section>`, dan `<footer>`!' }
              ],
              starterCode: '<header>\n  <h1>Judul Situs</h1>\n</header>\n<main>\n  <section>\n    <h2>Artikel Utama</h2>\n    <p>Isi artikel...</p>\n  </section>\n</main>\n<footer>\n  <p>&copy; 2026 Situs Saya</p>\n</footer>',
              requirements: [
                {
                  id: 'req-semantic',
                  description: 'Memiliki tag <header>, <main>, <section>, dan <footer>',
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, 'text/html');
                    return !!doc.querySelector('header') && !!doc.querySelector('main') && !!doc.querySelector('section') && !!doc.querySelector('footer');
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'level-4',
      title: 'Level 4 — Advanced',
      description: 'SEO Meta Tags, OpenGraph Social Cards, Web Accessibility (ARIA roles, WCAG), dan embed media audio/video.',
      modules: [
        {
          id: 'mod-4-1',
          title: 'SEO, Meta Tags & OpenGraph Sharing',
          description: 'Mengatur meta deskripsi, preview WhatsApp/Twitter, dan standarisasi favicon.',
          lessons: [
            {
              id: 'les-4-1-1',
              title: 'Meta Tags untuk Mesin Pencari & Media Sosial',
              type: 'practice',
              xpReward: 45,
              content: [
                { type: 'markdown', content: 'Di dalam `<head>`, tambahkan tag meta untuk viewport, description, dan OpenGraph (`og:title`).\n\n```html\n<meta name="description" content="Deskripsi situs">\n<meta property="og:title" content="Judul Share">\n```' }
              ],
              starterCode: '<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <!-- Tambahkan meta description dan og:title di sini -->\n  <meta name="description" content="Belajar HTML dari nol sampai mahir">\n  <meta property="og:title" content="HTML Mastery Academy">\n  <title>Portal Pembelajaran</title>\n</head>',
              requirements: [
                {
                  id: 'req-meta-desc',
                  description: 'Memiliki meta name="description"',
                  validate: (html) => new DOMParser().parseFromString(html, 'text/html').querySelectorAll('meta[name="description"]').length > 0
                },
                {
                  id: 'req-meta-og',
                  description: 'Memiliki meta property="og:title"',
                  validate: (html) => new DOMParser().parseFromString(html, 'text/html').querySelectorAll('meta[property="og:title"]').length > 0
                }
              ]
            }
          ]
        },
        {
          id: 'mod-4-2',
          title: 'Aksesibilitas Web (WCAG) & Media Embeds',
          description: 'Memastikan situs ramah pembaca layar (ARIA attributes) dan menyematkan video/audio.',
          lessons: [
            {
              id: 'les-4-2-1',
              title: 'Menyematkan Video & Audio Responsif',
              type: 'practice',
              xpReward: 40,
              content: [
                { type: 'markdown', content: 'Gunakan `<video controls>` atau `<audio controls>` untuk menyematkan media mandiri tanpa plugin eksternal.' }
              ],
              starterCode: '<video controls width="320">\n  <source src="assets/videos/demo.mp4" type="video/mp4">\n  Browser Anda tidak mendukung tag video.\n</video>',
              requirements: [
                {
                  id: 'req-video',
                  description: 'Memiliki elemen <video> dengan atribut controls',
                  validate: (html) => {
                    const v = new DOMParser().parseFromString(html, 'text/html').querySelector('video');
                    return !!v && v.hasAttribute('controls');
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'level-5',
      title: 'Level 5 — Professional',
      description: 'Struktur folder web skala produksi (Enterprise Static Site layout: public vs dist, asset bundling, robots.txt, sitemap.xml, & PWA manifest).',
      modules: [
        {
          id: 'mod-5-1',
          title: 'Standar Struktur Folder Produksi & Pipeline Aset',
          description: 'Bagaimana engineer web profesional menyusun direktori situs skala enterprise agar siap di-hosting di CDN global.',
          lessons: [
            {
              id: 'les-5-1-1',
              title: 'LEARN: Anatomi Folder Web Skala Enterprise',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Standar Struktur Folder Web Skala Produksi (Enterprise Layout)

Ketika sebuah website bersiap untuk produksi komersial dengan jutaan pengunjung, struktur foldernya tidak lagi sekadar menaruh file mentah. Kita memisahkan antara **Source Files** (berkas sebelum diolah) dan **Build Output / Public Files** (berkas siap saji di server hosting).

---

#### Struktur Folder Web Produksi Lengkap:

\`\`\`text
enterprise_web_project/
│
├── .gitignore              # Mengabaikan node_modules, cache, dan dist
├── README.md               # Dokumentasi setup & deploy
├── package.json            # Tooling minifikasi & optimizer gambar
│
├── public/                 # Berkas statis yang disalin apa adanya
│   ├── favicon.ico         # Ikon tab browser
│   ├── robots.txt          # Panduan bot mesin pencari (Googlebot)
│   ├── sitemap.xml         # Peta indeks seluruh URL situs
│   └── site.webmanifest    # Konfigurasi PWA (Progressive Web App)
│
├── src/                    # Berkas sumber kerja developer
│   ├── index.html          # Template HTML utama
│   │
│   ├── pages/              # Halaman-halaman website
│   │   ├── about/
│   │   │   └── index.html
│   │   ├── services/
│   │   │   └── index.html
│   │   └── contact/
│   │       └── index.html
│   │
│   └── assets/             # Aset mentah berkualitas tinggi
│       ├── css/            # Stylesheet modular
│       ├── js/             # Skrip interaktif
│       └── images/         # Foto asli (sebelum dikompres WebP/AVIF)
│
└── dist/                   # [OUTPUT PRODUKSI] Folder hasil build otomatis
    ├── index.html          # HTML yang sudah ter-minifikasi (hemat bandwidth)
    └── assets/             # Aset yang sudah dikompresi & diberi hash cache
\`\`\`

---

#### 3 File Sakral di Folder \`public/\`:
1. **\`robots.txt\`**: Mengontrol halaman mana yang boleh diindeks oleh bot Google/Bing:
   \`\`\`text
   User-agent: *
   Allow: /
   Sitemap: https://www.situsku.com/sitemap.xml
   \`\`\`
2. **\`sitemap.xml\`**: Memberikan daftar seluruh URL penting beserta frekuensi perubahannya agar ranking SEO optimal.
3. **\`site.webmanifest\`**: Memungkinkan website di-install ke home screen smartphone layaknya aplikasi native Android/iOS.
`
                },
                {
                  type: 'code-example',
                  language: 'html',
                  code: `<!-- Contoh deklarasi manifest & sitemap di head HTML produksi -->
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="manifest" href="/site.webmanifest">
  <title>Situs Skala Produksi</title>
</head>
<body>
  <h1>Siap Go Live dengan Standar Produksi!</h1>
</body>
</html>`
                }
              ]
            },
            {
              id: 'les-5-1-2',
              title: 'PRACTICE: Menyusun Meta Produksi & Sitemap Link',
              type: 'practice',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: [
                    '### Latihan: Memasang Meta Standar Enterprise',
                    '',
                    'Lengkapi bagian `<head>` berikut dengan standar produksi web:',
                    '1. Hubungkan favicon dengan `<link rel="icon" href="/favicon.ico">`',
                    '2. Hubungkan manifest PWA dengan `<link rel="manifest" href="/site.webmanifest">`',
                    '3. Berikan judul halaman `<title>` dan meta deskripsi.'
                  ].join('\n')
                }
              ],
              starterCode: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <link rel="icon" href="/favicon.ico">\n  <link rel="manifest" href="/site.webmanifest">\n  <meta name="description" content="Solusi teknologi digital perusahaan terdepan">\n  <title>Tech Enterprise Portal</title>\n</head>\n<body>\n  <h1>Portal Produksi Siap Meluncur</h1>\n</body>\n</html>',
              requirements: [
                {
                  id: 'req-prod-icon',
                  description: 'Memiliki link rel="icon"',
                  validate: (html) => new DOMParser().parseFromString(html, 'text/html').querySelectorAll('link[rel="icon"]').length > 0
                },
                {
                  id: 'req-prod-manifest',
                  description: 'Memiliki link rel="manifest"',
                  validate: (html) => new DOMParser().parseFromString(html, 'text/html').querySelectorAll('link[rel="manifest"]').length > 0
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'level-6',
      title: 'Level 6 — Project',
      description: 'Implementasi proyek nyata berskala penuh: Portal Dokumentasi & Portofolio Pengembang Semantik Lengkap (Multi-section, Accessible, & SEO Ready).',
      modules: [
        {
          id: 'mod-6-1',
          title: 'Capstone Project: Semantic Developer Portal',
          description: 'Membangun seluruh arsitektur halaman profil dan dokumentasi teknis dengan standar semantik HTML5 murni.',
          lessons: [
            {
              id: 'les-6-1-1',
              title: 'CAPSTONE: Semantic Developer Portfolio & Showcase',
              type: 'project',
              xpReward: 150,
              content: [
                {
                  type: 'markdown',
                  content: [
                    '### Capstone Project: Semantic Developer Portal',
                    '',
                    'Satukan seluruh penguasaanmu dari Level 0 hingga Level 5 ke dalam sebuah proyek nyata berstandar industri!',
                    '',
                    '**Persyaratan Portofolio (Requirements):**',
                    '1. **Struktur Dasar**: Deklarasi `<!DOCTYPE html>`, `html` ber-atribut `lang="id"`, dan tag `head` lengkap dengan `title`.',
                    '2. **Header Semantik**: Terdapat `<header>` yang menampung `<h1>` nama developer dan navigasi `<nav>` dengan minimal 2 tautan link.',
                    '3. **Konten Utama**: Terdapat tag `<main>` yang menaungi minimal dua `<section>` (misal seksi Tentang dan seksi Keahlian).',
                    '4. **Media Gambar**: Terdapat foto profil ber-tag `<img>` dengan atribut `src` dan `alt`.',
                    '5. **Daftar Keahlian**: Terdapat `<ul>` atau `<ol>` berisi minimal 3 item `<li>`.',
                    '6. **Formulir Kontak**: Terdapat `<form>` dengan input nama, input email, dan tombol submit.',
                    '7. **Footer**: Terdapat tag `<footer>` yang memuat teks hak cipta.'
                  ].join('\n')
                }
              ],
              starterCode: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Portofolio Pengembang Web - Alex</title>\n</head>\n<body>\n  <header>\n    <h1>Alexandria Pratama</h1>\n    <nav>\n      <ul>\n        <li><a href="#tentang">Tentang</a></li>\n        <li><a href="#kontak">Kontak</a></li>\n      </ul>\n    </nav>\n  </header>\n\n  <main>\n    <section id="tentang">\n      <h2>Tentang Saya</h2>\n      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" alt="Foto Profil Alexandria" />\n      <p>Fullstack Web Engineer dengan spesialisasi arsitektur semantik dan performa web.</p>\n      <h3>Keahlian Utama:</h3>\n      <ul>\n        <li>HTML5 Semantik & Aksesibilitas</li>\n        <li>Modern CSS & Responsive Design</li>\n        <li>JavaScript ES6+ & TypeScript</li>\n      </ul>\n    </section>\n\n    <section id="kontak">\n      <h2>Hubungi Saya</h2>\n      <form action="#" method="POST">\n        <label for="nama">Nama:</label>\n        <input type="text" id="nama" name="nama" required />\n        <label for="email">Email:</label>\n        <input type="email" id="email" name="email" required />\n        <button type="submit">Kirim Pesan</button>\n      </form>\n    </section>\n  </main>\n\n  <footer>\n    <p>&copy; 2026 Alexandria Pratama. All rights reserved.</p>\n  </footer>\n</body>\n</html>',
              requirements: [
                {
                  id: 'req-cap-semantic',
                  description: 'Memiliki struktur semantik lengkap: header, nav, main, section, footer',
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, 'text/html');
                    return !!doc.querySelector('header') && !!doc.querySelector('nav') && !!doc.querySelector('main') && doc.querySelectorAll('section').length >= 2 && !!doc.querySelector('footer');
                  }
                },
                {
                  id: 'req-cap-img',
                  description: 'Terdapat gambar profil dengan alt text',
                  validate: (html) => {
                    const img = new DOMParser().parseFromString(html, 'text/html').querySelector('img');
                    return !!img && !!img.getAttribute('alt');
                  }
                },
                {
                  id: 'req-cap-form',
                  description: 'Terdapat form kontak dengan input text, email, dan button',
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, 'text/html');
                    return !!doc.querySelector('form') && !!doc.querySelector('input[type="email"]') && !!doc.querySelector('button, input[type="submit"]');
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'level-7',
      title: 'Level 7 — Assessment',
      description: 'Evaluasi akhir komprehensif: Ujian teori semantik web, tantangan live coding mandiri tanpa template, dan sertifikasi kelulusan.',
      modules: [
        {
          id: 'mod-7-1',
          title: 'Comprehensive Knowledge Assessment (Ujian Teori)',
          description: 'Ujian komprehensif menguji penguasaan materi dari Level 0 hingga Level 5 (tag semantik, struktur folder, SEO meta, dan aksesibilitas).',
          lessons: [
            {
              id: 'les-7-1-1',
              title: 'ASSESSMENT QUIZ: Evaluasi Teori Web Semantik & Standar HTML5',
              type: 'quiz',
              xpReward: 50,
              questions: [
                {
                  id: 'q-h7-1',
                  question: 'Manakah tag yang paling tepat digunakan untuk membungkus sekelompok tautan navigasi utama sebuah website?',
                  options: [
                    '<div class="menu">',
                    '<nav>',
                    '<section>',
                    '<aside>'
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'Tag <nav> secara semantik menandai bagian navigasi utama situs, membantu mesin pencari dan screen reader memahami alur menu.'
                },
                {
                  id: 'q-h7-2',
                  question: 'Di dalam struktur folder website skala produksi, di manakah file "robots.txt" dan "sitemap.xml" harus diletakkan?',
                  options: [
                    'Di subfolder assets/css/',
                    'Di folder root public/ agar dapat diakses langsung dari domain root',
                    'Di dalam tag <script> di file index.html',
                    'Di folder src/pages/about/'
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'robots.txt dan sitemap.xml harus berada di root direktori publik (public/) agar bot crawler dapat membacanya langsung di https://domain.com/robots.txt.'
                },
                {
                  id: 'q-h7-3',
                  question: 'Apa fungsi atribut "alt" pada tag <img> yang sangat krusial bagi standar WCAG (Web Content Accessibility Guidelines)?',
                  options: [
                    'Mempercepat kecepatan download gambar',
                    'Memberikan deskripsi tekstual gambar bagi pengguna tunanetra yang memakai screen reader',
                    'Mengubah warna gambar menjadi hitam putih',
                    'Menyembunyikan gambar dari publik'
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'Atribut alt adalah pilar aksesibilitas web untuk mendeskripsikan konten gambar kepada pengguna pembaca layar (screen reader).'
                },
                {
                  id: 'q-h7-4',
                  question: 'Perbedaan utama antara tag <strong> dan tag <b> adalah:',
                  options: [
                    '<strong> memberikan arti semantik (urgensi/penting), sedangkan <b> hanya efek tebal visual murni',
                    '<b> lebih baru daripada <strong>',
                    '<strong> hanya bisa digunakan di dalam judul H1',
                    'Tidak ada perbedaan sama sekali'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'HTML5 membedakan gaya visual dan makna semantik. <strong> menandakan teks memiliki bobot penting secara kontekstual.'
                },
                {
                  id: 'q-h7-5',
                  question: 'Mengapa relative path "../" digunakan dalam link atau gambar?',
                  options: [
                    'Untuk menghapus folder sebelumnya',
                    'Untuk naik/keluar satu tingkat direktori ke folder induk di atasnya',
                    'Untuk mengunci berkas agar tidak dapat diunduh',
                    'Untuk mendownload file dari internet secara otomatis'
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'Dalam sistem berkas UNIX dan web, "../" berarti keluar satu level ke folder induk (parent directory).'
                }
              ]
            }
          ]
        },
        {
          id: 'mod-7-2',
          title: 'Live Coding Technical Assessment (Ujian Praktik)',
          description: 'Ujian live coding mandiri tanpa bantuan: membangun arsitektur portal bisnis semantik tervalidasi.',
          lessons: [
            {
              id: 'les-7-2-1',
              title: 'FINAL LIVE CODING: Semantic Corporate Portal Blueprint',
              type: 'challenge',
              xpReward: 100,
              content: [
                {
                  type: 'markdown',
                  content: [
                    '### Ujian Akhir Praktik: Corporate Portal Blueprint',
                    '',
                    'Selesaikan tantangan ini untuk meraih sertifikasi kelulusan **HTML Mastery**!',
                    '',
                    '**Spesifikasi Teknis:**',
                    '1. Bangun dokumen HTML5 lengkap dengan deklarasi `<!DOCTYPE html>`, `html lang="id"`, `head`, dan `body`.',
                    '2. Sertakan `<header>` dengan `<h1>` dan `<nav>`.',
                    '3. Di dalam `<main>`, buat minimal sebuah `<article>` yang memuat `<h2>` dan `<p>`.',
                    '4. Sertakan tag `<footer>` di bagian penutup.',
                    '5. Pastikan semua tag ditutup dengan valid!'
                  ].join('\n')
                }
              ],
              starterCode: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <meta charset="UTF-8">\n  <title>Portal Korporat Nusantara</title>\n</head>\n<body>\n  <header>\n    <h1>Nusantara Tech Global</h1>\n    <nav>\n      <a href="#layanan">Layanan</a>\n    </nav>\n  </header>\n  <main>\n    <article id="layanan">\n      <h2>Transformasi Digital Enterprise</h2>\n      <p>Menyediakan infrastruktur cloud modern dan arsitektur web tangguh.</p>\n    </article>\n  </main>\n  <footer>\n    <p>&copy; 2026 PT Nusantara Tech. Hak cipta dilindungi.</p>\n  </footer>\n</body>\n</html>',
              requirements: [
                {
                  id: 'req-test-doc',
                  description: 'Dokumen memiliki tag html, head, body, header, nav, main, article, dan footer',
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, 'text/html');
                    return !!doc.querySelector('header') && !!doc.querySelector('nav') && !!doc.querySelector('main') && !!doc.querySelector('article') && !!doc.querySelector('footer');
                  }
                },
                {
                  id: 'req-test-text',
                  description: 'Memiliki judul utama H1 dan sub-judul H2 di dalam article',
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, 'text/html');
                    return doc.querySelectorAll('h1').length > 0 && doc.querySelectorAll('article h2').length > 0;
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
