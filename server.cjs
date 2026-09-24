var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_firebase_admin = __toESM(require("firebase-admin"), 1);
var import_firestore = require("firebase-admin/firestore");
var import_auth = require("firebase-admin/auth");

// src/services/curriculum/idUtils.ts
function isValidDocumentId(id) {
  return typeof id === "string" && id.length > 0 && id.length <= 128 && /^[a-zA-Z0-9_-]+$/.test(id);
}
function sanitizeId(raw) {
  return raw.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
function preserveOrSanitizeId(raw) {
  const trimmed = String(raw).trim();
  if (isValidDocumentId(trimmed)) {
    return trimmed;
  }
  return sanitizeId(trimmed);
}
function generateLevelId(courseId, levelSlugOrOrder) {
  const cleanCourse = sanitizeId(courseId);
  const cleanSlug = typeof levelSlugOrOrder === "number" ? `lvl-${levelSlugOrOrder}` : sanitizeId(levelSlugOrOrder);
  if (cleanSlug.startsWith(cleanCourse)) {
    return cleanSlug;
  }
  return `${cleanCourse}-${cleanSlug}`;
}
function generateModuleId(parentLevelOrCourseId, moduleSlugOrOrder) {
  const cleanParent = sanitizeId(parentLevelOrCourseId);
  const cleanSlug = typeof moduleSlugOrOrder === "number" ? `mod-${moduleSlugOrOrder}` : sanitizeId(moduleSlugOrOrder);
  if (cleanSlug.startsWith(cleanParent)) {
    return cleanSlug;
  }
  return `${cleanParent}-${cleanSlug}`;
}
function generateLessonId(parentModuleId, lessonSlugOrOrder) {
  const cleanParent = sanitizeId(parentModuleId);
  const cleanSlug = typeof lessonSlugOrOrder === "number" ? `les-${lessonSlugOrOrder}` : sanitizeId(lessonSlugOrOrder);
  if (cleanSlug.startsWith(cleanParent)) {
    return cleanSlug;
  }
  return `${cleanParent}-${cleanSlug}`;
}
function generateExerciseId(parentLessonId, exerciseSlugOrOrder) {
  const cleanParent = sanitizeId(parentLessonId);
  const cleanSlug = typeof exerciseSlugOrOrder === "number" ? `ex-${exerciseSlugOrOrder}` : sanitizeId(exerciseSlugOrOrder);
  if (cleanSlug.startsWith(cleanParent)) {
    return cleanSlug;
  }
  return `${cleanParent}-${cleanSlug}`;
}

// src/data/htmlCurriculum.ts
var HTML_COURSE = {
  id: "html-mastery",
  title: "HTML 0 \u2192 Mahir",
  shortDescription: "Kurikulum HTML komprehensif 8 jenjang: Absolute Beginner, Fundamental, Beginner, Intermediate, Advanced, Professional, Project, & Assessment.",
  description: "HTML adalah fondasi dari setiap halaman web di internet. Kurikulum 8 tingkat ini membimbingmu dari struktur tag paling dasar, anatomi folder web standar, semantik modern, SEO & aksesibilitas, arsitektur produksi, hingga capstone project dan asesmen kelulusan.",
  icon: "html",
  levels: [
    {
      id: "level-0",
      title: "Level 0 \u2014 Absolute Beginner",
      description: "Pengenalan dasar untuk kamu yang belum pernah coding sama sekali. Anatomi tag, teks, dan struktur utama halaman web.",
      modules: [
        {
          id: "mod-0-1",
          title: "Pengenalan HTML & Elemen Teks",
          description: "Apa itu HTML dan bagaimana cara browser menerjemahkan kode menjadi tampilan visual?",
          lessons: [
            {
              id: "les-0-1-1",
              title: "Apa itu HTML?",
              type: "learn",
              xpReward: 10,
              content: [
                { type: "markdown", content: '### Selamat Datang di Dunia Web!\n\nSetiap website yang kamu buka (Google, YouTube, Instagram) pada dasarnya dibangun dengan 3 pilar utama:\n\n1. **HTML** (Kerangka & Struktur)\n2. **CSS** (Gaya & Tampilan)\n3. **JavaScript** (Logika & Interaktivitas)\n\n**HTML (HyperText Markup Language)** bukanlah bahasa pemrograman dengan kalkulasi rumit. HTML adalah bahasa *markup* \u2014 fungsinya memberi tahu browser: *"Ini adalah judul, ini adalah paragraf, dan ini adalah gambar."*' },
                { type: "code-example", language: "html", code: "<h1>Ini Judul Utama</h1>\n<p>Ini adalah paragraf penjelasan.</p>" },
                { type: "markdown", content: "Semua elemen HTML diawali dengan tag pembuka (misal `<h1>`) dan diakhiri tag penutup (`</h1>`)." }
              ]
            },
            {
              id: "les-0-1-2",
              title: "Coba Tulis Kode Pertamamu",
              type: "practice",
              xpReward: 20,
              content: [
                { type: "markdown", content: 'Mari kita langsung praktik! Di bawah ini adalah area kodemu.\n\nSebuah teks biasa bisa diubah menjadi **Judul Utama** dengan membungkusnya menggunakan tag `<h1>` dan ditutup dengan `</h1>`.\n\n**Tugasmu:**\nBuatlah sebuah judul utama berbunyi "Halo Dunia" menggunakan tag H1.' }
              ],
              starterCode: "<!-- Tulis kodemu di bawah ini -->\n",
              requirements: [
                {
                  id: "req-1",
                  description: "Gunakan tag <h1>",
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, "text/html");
                    return doc.querySelectorAll("h1").length > 0;
                  }
                },
                {
                  id: "req-2",
                  description: 'Teks di dalamnya harus berisi kata "Halo Dunia" atau "Hello World"',
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, "text/html");
                    const h1 = doc.querySelector("h1");
                    if (!h1) return false;
                    const text = h1.textContent?.toLowerCase() || "";
                    return text.includes("halo") || text.includes("hello");
                  }
                }
              ]
            },
            {
              id: "les-0-1-3",
              title: "Hierarki Judul (H1 sampai H6)",
              type: "practice",
              xpReward: 25,
              content: [
                { type: "markdown", content: "### Tingkatan Judul di HTML\n\nHTML menyediakan 6 level heading: dari `<h1>` (paling penting & paling besar) sampai `<h6>` (paling kecil).\n\n```html\n<h1>Judul Artikel</h1>\n<h2>Sub-bab 1</h2>\n<h3>Detail Poin A</h3>\n```\n\n**Tugasmu:**\nBuatlah sebuah tag `<h1>` dengan teks apapun, lalu di bawahnya buat tag `<h2>` sebagai sub-judulnya!" }
              ],
              starterCode: "<!-- Tulis H1 dan H2 di bawah ini -->\n",
              requirements: [
                {
                  id: "req-1",
                  description: "Memiliki minimal satu tag <h1>",
                  validate: (html) => new DOMParser().parseFromString(html, "text/html").querySelectorAll("h1").length > 0
                },
                {
                  id: "req-2",
                  description: "Memiliki minimal satu tag <h2>",
                  validate: (html) => new DOMParser().parseFromString(html, "text/html").querySelectorAll("h2").length > 0
                }
              ]
            }
          ]
        },
        {
          id: "mod-0-2",
          title: "Struktur Kerangka Standar HTML",
          description: "DOCTYPE, html, head, dan body \u2014 kerangka wajib setiap halaman web.",
          lessons: [
            {
              id: "les-0-2-1",
              title: "Anatomi Kerangka Dasar Dokumen",
              type: "learn",
              xpReward: 15,
              content: [
                { type: "markdown", content: '### Kerangka Wajib HTML5\n\nSetiap halaman web modern selalu memiliki cetak biru struktur:\n\n```html\n<!DOCTYPE html>\n<html lang="id">\n<head>\n  <meta charset="UTF-8">\n  <title>Judul Tab Browser</title>\n</head>\n<body>\n  <h1>Konten yang tampil di layar ada di sini</h1>\n</body>\n</html>\n```\n\n- `<head>`: Berisi metadata (judul tab, styling, SEO) yang tidak tampak langsung di halaman.\n- `<body>`: Seluruh konten visual yang dilihat pengunjung web.' }
              ]
            },
            {
              id: "les-0-2-2",
              title: "Latihan Menyusun Kerangka Lengkap",
              type: "practice",
              xpReward: 30,
              content: [
                { type: "markdown", content: "Lengkapi kerangka dasar website pertamamu. Letakkan judul `<h1>` dan paragraf `<p>` di dalam tag `<body>`!" }
              ],
              starterCode: "<!DOCTYPE html>\n<html>\n<head>\n  <title>Halaman Pertamaku</title>\n</head>\n<body>\n  <!-- Masukkan H1 dan P di sini -->\n  \n</body>\n</html>",
              requirements: [
                {
                  id: "req-1",
                  description: "Memiliki tag <h1> di dalam body",
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, "text/html");
                    return !!doc.body && doc.body.querySelectorAll("h1").length > 0;
                  }
                },
                {
                  id: "req-2",
                  description: "Memiliki tag <p> di dalam body",
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, "text/html");
                    return !!doc.body && doc.body.querySelectorAll("p").length > 0;
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "level-1",
      title: "Level 1 \u2014 Fundamental",
      description: "Format teks tebal/miring, list berurutan (ol/ul), tautan link hyperlink (a), dan menyisipkan media gambar (img).",
      modules: [
        {
          id: "mod-1-1",
          title: "Format Teks & List",
          description: "Membuat daftar item teratur dan penekanan kata.",
          lessons: [
            {
              id: "les-1-1-1",
              title: "Format Teks: Tebal dan Miring",
              type: "practice",
              xpReward: 20,
              content: [
                { type: "markdown", content: "Gunakan `<strong>` untuk teks **tebal (penting)** dan `<em>` untuk teks *miring (penekanan)*.\n\n**Tugasmu:** Buat satu kalimat di dalam tag `<p>` yang memiliki kata bertag `<strong>` dan kata bertag `<em>`!" }
              ],
              starterCode: "<p>Tulis kalimat dengan <strong>kata penting</strong> dan <em>kata penekanan</em>.</p>",
              requirements: [
                {
                  id: "req-1",
                  description: "Mengandung tag <strong>",
                  validate: (html) => new DOMParser().parseFromString(html, "text/html").querySelectorAll("strong").length > 0
                },
                {
                  id: "req-2",
                  description: "Mengandung tag <em>",
                  validate: (html) => new DOMParser().parseFromString(html, "text/html").querySelectorAll("em").length > 0
                }
              ]
            },
            {
              id: "les-1-1-2",
              title: "Daftar Bullet (Unordered List <ul>)",
              type: "practice",
              xpReward: 25,
              content: [
                { type: "markdown", content: "Gunakan `<ul>` dan `<li>` untuk membuat daftar item tidak berurut (titik bullet)." }
              ],
              starterCode: "<ul>\n  <li>Kopi</li>\n  <li>Teh</li>\n</ul>",
              requirements: [
                {
                  id: "req-1",
                  description: "Memiliki elemen <ul> dengan minimal 2 buah <li>",
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, "text/html");
                    const ul = doc.querySelector("ul");
                    return !!ul && ul.querySelectorAll("li").length >= 2;
                  }
                }
              ]
            }
          ]
        },
        {
          id: "mod-1-2",
          title: "Link & Gambar",
          description: "Menghubungkan antar halaman dengan tag a dan menyisipkan gambar dengan tag img.",
          lessons: [
            {
              id: "les-1-2-1",
              title: "Tautan Hyperlink (tag a)",
              type: "practice",
              xpReward: 25,
              content: [
                { type: "markdown", content: 'Gunakan tag `<a href="https://...">Teks Link</a>` untuk membuat tautan yang bisa diklik!' }
              ],
              starterCode: '<a href="https://google.com" target="_blank">Kunjungi Google</a>',
              requirements: [
                {
                  id: "req-1",
                  description: "Memiliki tag <a> dengan atribut href yang tidak kosong",
                  validate: (html) => {
                    const a = new DOMParser().parseFromString(html, "text/html").querySelector("a");
                    return !!a && !!a.getAttribute("href");
                  }
                }
              ]
            },
            {
              id: "les-1-2-2",
              title: "Menampilkan Gambar (tag img)",
              type: "practice",
              xpReward: 25,
              content: [
                { type: "markdown", content: "Tag `<img>` bersifat *self-closing* dan membutuhkan atribut `src` (sumber gambar) serta `alt` (teks alternatif aksesibilitas)." }
              ],
              starterCode: '<img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300" alt="Laptop coding" />',
              requirements: [
                {
                  id: "req-1",
                  description: "Memiliki tag <img> dengan atribut src dan alt",
                  validate: (html) => {
                    const img = new DOMParser().parseFromString(html, "text/html").querySelector("img");
                    return !!img && !!img.getAttribute("src") && !!img.getAttribute("alt");
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "level-2",
      title: "Level 2 \u2014 Beginner",
      description: "Bagaimana membuat struktur folder proyek website standar (index.html, subfolder assets, path relatif/absolut), dan navigasi multi-halaman.",
      modules: [
        {
          id: "mod-2-1",
          title: "Bagaimana Membuat Struktur Folder Website Standar",
          description: "Dari satu file HTML menuju struktur folder profesional: aturan nama berkas, hierarki assets, dan resolusi path.",
          lessons: [
            {
              id: "les-2-1-1",
              title: "LEARN: Anatomi Folder Proyek Web Standar",
              type: "learn",
              xpReward: 25,
              content: [
                {
                  type: "markdown",
                  content: `### Bagaimana Cara Membuat Struktur Folder di Website?

Banyak pemula meletakkan semua file HTML, gambar, file CSS, dan file teks di dalam satu folder sembarangan dengan nama acak seperti \`foto1.jpg\` atau \`halaman2.html\`. Di dunia web profesional, struktur folder harus tertata rapi agar mudah di-deploy ke server hosting.

---

#### 1. Struktur Folder Standar Website (Standard Web Project Layout)

\`\`\`text
my_awesome_website/
\u2502
\u251C\u2500\u2500 index.html           # [WAJIB] Halaman beranda utama (Home Page)
\u251C\u2500\u2500 about.html           # Halaman tentang kami
\u251C\u2500\u2500 contact.html         # Halaman kontak
\u251C\u2500\u2500 README.md            # Dokumentasi proyek
\u2502
\u251C\u2500\u2500 pages/               # (Opsional) Untuk proyek dengan banyak halaman
\u2502   \u251C\u2500\u2500 blog.html
\u2502   \u2514\u2500\u2500 services.html
\u2502
\u2514\u2500\u2500 assets/              # Wadah seluruh aset statis
    \u251C\u2500\u2500 css/             # Lembar gaya stylesheet
    \u2502   \u2514\u2500\u2500 style.css
    \u251C\u2500\u2500 js/              # Skrip logika interaktif
    \u2502   \u2514\u2500\u2500 main.js
    \u2514\u2500\u2500 images/          # Seluruh berkas gambar, logo, ikon
        \u251C\u2500\u2500 logo.svg
        \u2514\u2500\u2500 hero-banner.jpg
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
                  type: "code-example",
                  language: "html",
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
              id: "les-2-1-2",
              title: "PRACTICE: Menyusun Navigasi Multi-Halaman & Path Aset",
              type: "practice",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: [
                    "### Latihan: Navigasi Multi-Page & Struktur Path",
                    "",
                    "Bayangkan kamu sedang mengelola struktur folder website:",
                    "```text",
                    "my_site/",
                    "\u251C\u2500\u2500 index.html",
                    "\u251C\u2500\u2500 about.html",
                    "\u2514\u2500\u2500 assets/",
                    "    \u2514\u2500\u2500 images/",
                    "        \u2514\u2500\u2500 profile.png",
                    "```",
                    "",
                    "**Tugasmu:**",
                    "1. Buat tag `<nav>` yang membungkus list `<ul>` dengan minimal 2 tautan link: ke `index.html` (Beranda) dan ke `about.html` (Tentang).",
                    "2. Buat tag `<img>` yang memanggil gambar dari path `assets/images/profile.png` dengan atribut `alt` yang jelas."
                  ].join("\n")
                }
              ],
              starterCode: '<!-- Susun nav link multi-halaman dan gambar dari folder assets -->\n<nav>\n  <ul>\n    <li><a href="index.html">Beranda</a></li>\n    <li><a href="about.html">Tentang</a></li>\n  </ul>\n</nav>\n\n<img src="assets/images/profile.png" alt="Foto Profil" />',
              requirements: [
                {
                  id: "req-nav-links",
                  description: "Memiliki elemen <nav> dengan tautan ke index.html dan about.html",
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, "text/html");
                    const links = Array.from(doc.querySelectorAll("nav a"));
                    const hrefs = links.map((l) => l.getAttribute("href"));
                    return hrefs.includes("index.html") && hrefs.includes("about.html");
                  }
                },
                {
                  id: "req-asset-img",
                  description: "Memiliki tag <img> dengan path mengarah ke assets/images/",
                  validate: (html) => {
                    const img = new DOMParser().parseFromString(html, "text/html").querySelector("img");
                    return !!img && (img.getAttribute("src")?.includes("assets/images/") || false);
                  }
                }
              ]
            },
            {
              id: "les-2-1-3",
              title: "QUIZ: Aturan Struktur Folder Website",
              type: "quiz",
              xpReward: 30,
              questions: [
                {
                  id: "q-html-f-1",
                  question: 'Mengapa file halaman utama sebuah website wajib dinamai "index.html"?',
                  options: [
                    "Karena itu adalah syarat dari browser Google Chrome",
                    "Karena web server secara otomatis mencari index.html sebagai titik awal saat membuka domain",
                    "Agar file tidak bisa diedit oleh hacker",
                    "Hanya kebiasaan dan sebenarnya bebas menggunakan nama apa saja"
                  ],
                  correctAnswerIndex: 1,
                  explanation: "Secara standar global, web server (Nginx, Apache, Vercel, dll) mencari file index.html sebagai default root document saat domain dikunjungi."
                },
                {
                  id: "q-html-f-2",
                  question: 'Jika file kamu berada di "pages/detail.html" dan ingin memanggil gambar di "assets/images/pic.png", bagaimana path yang benar?',
                  options: [
                    "../assets/images/pic.png",
                    "assets/images/pic.png",
                    "pages/assets/images/pic.png",
                    "pic.png"
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Tanda "../" digunakan untuk keluar satu tingkat dari folder "pages/" menuju root folder, kemudian masuk ke "assets/images/pic.png".'
                },
                {
                  id: "q-html-f-3",
                  question: "Di dalam folder manakah file stylesheet (CSS), skrip (JS), dan gambar (Images) biasanya dikelompokkan?",
                  options: [
                    "Di folder bin/",
                    "Di folder assets/ atau public/",
                    "Di folder trash/",
                    "Di dalam file index.html langsung"
                  ],
                  correctAnswerIndex: 1,
                  explanation: "Standar industri menaruh file statis seperti CSS, JS, dan gambar di dalam folder assets/ atau public/ agar terisolasi rapi."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "level-3",
      title: "Level 3 \u2014 Intermediate",
      description: "Formulir interaktif (input, select, textarea), tabel data, dan elemen semantik modern HTML5 (header, nav, main, section, footer).",
      modules: [
        {
          id: "mod-3-1",
          title: "Formulir Interaktif (Forms & Inputs)",
          description: "Menerima input pengguna dengan form, textfield, email, password, dan tombol kirim.",
          lessons: [
            {
              id: "les-3-1-1",
              title: "Membuat Form Kontak Sederhana",
              type: "practice",
              xpReward: 35,
              content: [
                { type: "markdown", content: 'Gunakan `<form>` dengan input text, email, dan button submit.\n\n**Tugas:** Buat form dengan input nama, input email, dan tombol "Kirim"!' }
              ],
              starterCode: '<form action="#" method="POST">\n  <label for="nama">Nama:</label>\n  <input type="text" id="nama" name="nama" required />\n\n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email" required />\n\n  <button type="submit">Kirim Pesan</button>\n</form>',
              requirements: [
                {
                  id: "req-form",
                  description: "Memiliki elemen <form>",
                  validate: (html) => new DOMParser().parseFromString(html, "text/html").querySelectorAll("form").length > 0
                },
                {
                  id: "req-inputs",
                  description: 'Memiliki input type="text" dan input type="email"',
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, "text/html");
                    return !!doc.querySelector('input[type="text"]') && !!doc.querySelector('input[type="email"]');
                  }
                },
                {
                  id: "req-btn",
                  description: "Memiliki tombol submit",
                  validate: (html) => new DOMParser().parseFromString(html, "text/html").querySelectorAll('button[type="submit"], input[type="submit"]').length > 0
                }
              ]
            }
          ]
        },
        {
          id: "mod-3-2",
          title: "Semantik Modern HTML5 & Tabel Data",
          description: "Menggantikan <div> generik dengan tag semantik: header, nav, main, section, article, footer.",
          lessons: [
            {
              id: "les-3-2-1",
              title: "Struktur Tata Letak Semantik",
              type: "practice",
              xpReward: 40,
              content: [
                { type: "markdown", content: "Tag semantik memberi makna pada struktur web untuk mesin pencari (SEO) dan pembaca layar (screen reader).\n\n**Tugas:** Susun kerangka halaman dengan `<header>`, `<main>`, `<section>`, dan `<footer>`!" }
              ],
              starterCode: "<header>\n  <h1>Judul Situs</h1>\n</header>\n<main>\n  <section>\n    <h2>Artikel Utama</h2>\n    <p>Isi artikel...</p>\n  </section>\n</main>\n<footer>\n  <p>&copy; 2026 Situs Saya</p>\n</footer>",
              requirements: [
                {
                  id: "req-semantic",
                  description: "Memiliki tag <header>, <main>, <section>, dan <footer>",
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, "text/html");
                    return !!doc.querySelector("header") && !!doc.querySelector("main") && !!doc.querySelector("section") && !!doc.querySelector("footer");
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "level-4",
      title: "Level 4 \u2014 Advanced",
      description: "SEO Meta Tags, OpenGraph Social Cards, Web Accessibility (ARIA roles, WCAG), dan embed media audio/video.",
      modules: [
        {
          id: "mod-4-1",
          title: "SEO, Meta Tags & OpenGraph Sharing",
          description: "Mengatur meta deskripsi, preview WhatsApp/Twitter, dan standarisasi favicon.",
          lessons: [
            {
              id: "les-4-1-1",
              title: "Meta Tags untuk Mesin Pencari & Media Sosial",
              type: "practice",
              xpReward: 45,
              content: [
                { type: "markdown", content: 'Di dalam `<head>`, tambahkan tag meta untuk viewport, description, dan OpenGraph (`og:title`).\n\n```html\n<meta name="description" content="Deskripsi situs">\n<meta property="og:title" content="Judul Share">\n```' }
              ],
              starterCode: '<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <!-- Tambahkan meta description dan og:title di sini -->\n  <meta name="description" content="Belajar HTML dari nol sampai mahir">\n  <meta property="og:title" content="HTML Mastery Academy">\n  <title>Portal Pembelajaran</title>\n</head>',
              requirements: [
                {
                  id: "req-meta-desc",
                  description: 'Memiliki meta name="description"',
                  validate: (html) => new DOMParser().parseFromString(html, "text/html").querySelectorAll('meta[name="description"]').length > 0
                },
                {
                  id: "req-meta-og",
                  description: 'Memiliki meta property="og:title"',
                  validate: (html) => new DOMParser().parseFromString(html, "text/html").querySelectorAll('meta[property="og:title"]').length > 0
                }
              ]
            }
          ]
        },
        {
          id: "mod-4-2",
          title: "Aksesibilitas Web (WCAG) & Media Embeds",
          description: "Memastikan situs ramah pembaca layar (ARIA attributes) dan menyematkan video/audio.",
          lessons: [
            {
              id: "les-4-2-1",
              title: "Menyematkan Video & Audio Responsif",
              type: "practice",
              xpReward: 40,
              content: [
                { type: "markdown", content: "Gunakan `<video controls>` atau `<audio controls>` untuk menyematkan media mandiri tanpa plugin eksternal." }
              ],
              starterCode: '<video controls width="320">\n  <source src="assets/videos/demo.mp4" type="video/mp4">\n  Browser Anda tidak mendukung tag video.\n</video>',
              requirements: [
                {
                  id: "req-video",
                  description: "Memiliki elemen <video> dengan atribut controls",
                  validate: (html) => {
                    const v = new DOMParser().parseFromString(html, "text/html").querySelector("video");
                    return !!v && v.hasAttribute("controls");
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "level-5",
      title: "Level 5 \u2014 Professional",
      description: "Struktur folder web skala produksi (Enterprise Static Site layout: public vs dist, asset bundling, robots.txt, sitemap.xml, & PWA manifest).",
      modules: [
        {
          id: "mod-5-1",
          title: "Standar Struktur Folder Produksi & Pipeline Aset",
          description: "Bagaimana engineer web profesional menyusun direktori situs skala enterprise agar siap di-hosting di CDN global.",
          lessons: [
            {
              id: "les-5-1-1",
              title: "LEARN: Anatomi Folder Web Skala Enterprise",
              type: "learn",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: `### Standar Struktur Folder Web Skala Produksi (Enterprise Layout)

Ketika sebuah website bersiap untuk produksi komersial dengan jutaan pengunjung, struktur foldernya tidak lagi sekadar menaruh file mentah. Kita memisahkan antara **Source Files** (berkas sebelum diolah) dan **Build Output / Public Files** (berkas siap saji di server hosting).

---

#### Struktur Folder Web Produksi Lengkap:

\`\`\`text
enterprise_web_project/
\u2502
\u251C\u2500\u2500 .gitignore              # Mengabaikan node_modules, cache, dan dist
\u251C\u2500\u2500 README.md               # Dokumentasi setup & deploy
\u251C\u2500\u2500 package.json            # Tooling minifikasi & optimizer gambar
\u2502
\u251C\u2500\u2500 public/                 # Berkas statis yang disalin apa adanya
\u2502   \u251C\u2500\u2500 favicon.ico         # Ikon tab browser
\u2502   \u251C\u2500\u2500 robots.txt          # Panduan bot mesin pencari (Googlebot)
\u2502   \u251C\u2500\u2500 sitemap.xml         # Peta indeks seluruh URL situs
\u2502   \u2514\u2500\u2500 site.webmanifest    # Konfigurasi PWA (Progressive Web App)
\u2502
\u251C\u2500\u2500 src/                    # Berkas sumber kerja developer
\u2502   \u251C\u2500\u2500 index.html          # Template HTML utama
\u2502   \u2502
\u2502   \u251C\u2500\u2500 pages/              # Halaman-halaman website
\u2502   \u2502   \u251C\u2500\u2500 about/
\u2502   \u2502   \u2502   \u2514\u2500\u2500 index.html
\u2502   \u2502   \u251C\u2500\u2500 services/
\u2502   \u2502   \u2502   \u2514\u2500\u2500 index.html
\u2502   \u2502   \u2514\u2500\u2500 contact/
\u2502   \u2502       \u2514\u2500\u2500 index.html
\u2502   \u2502
\u2502   \u2514\u2500\u2500 assets/             # Aset mentah berkualitas tinggi
\u2502       \u251C\u2500\u2500 css/            # Stylesheet modular
\u2502       \u251C\u2500\u2500 js/             # Skrip interaktif
\u2502       \u2514\u2500\u2500 images/         # Foto asli (sebelum dikompres WebP/AVIF)
\u2502
\u2514\u2500\u2500 dist/                   # [OUTPUT PRODUKSI] Folder hasil build otomatis
    \u251C\u2500\u2500 index.html          # HTML yang sudah ter-minifikasi (hemat bandwidth)
    \u2514\u2500\u2500 assets/             # Aset yang sudah dikompresi & diberi hash cache
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
                  type: "code-example",
                  language: "html",
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
              id: "les-5-1-2",
              title: "PRACTICE: Menyusun Meta Produksi & Sitemap Link",
              type: "practice",
              xpReward: 45,
              content: [
                {
                  type: "markdown",
                  content: [
                    "### Latihan: Memasang Meta Standar Enterprise",
                    "",
                    "Lengkapi bagian `<head>` berikut dengan standar produksi web:",
                    '1. Hubungkan favicon dengan `<link rel="icon" href="/favicon.ico">`',
                    '2. Hubungkan manifest PWA dengan `<link rel="manifest" href="/site.webmanifest">`',
                    "3. Berikan judul halaman `<title>` dan meta deskripsi."
                  ].join("\n")
                }
              ],
              starterCode: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <link rel="icon" href="/favicon.ico">\n  <link rel="manifest" href="/site.webmanifest">\n  <meta name="description" content="Solusi teknologi digital perusahaan terdepan">\n  <title>Tech Enterprise Portal</title>\n</head>\n<body>\n  <h1>Portal Produksi Siap Meluncur</h1>\n</body>\n</html>',
              requirements: [
                {
                  id: "req-prod-icon",
                  description: 'Memiliki link rel="icon"',
                  validate: (html) => new DOMParser().parseFromString(html, "text/html").querySelectorAll('link[rel="icon"]').length > 0
                },
                {
                  id: "req-prod-manifest",
                  description: 'Memiliki link rel="manifest"',
                  validate: (html) => new DOMParser().parseFromString(html, "text/html").querySelectorAll('link[rel="manifest"]').length > 0
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "level-6",
      title: "Level 6 \u2014 Project",
      description: "Implementasi proyek nyata berskala penuh: Portal Dokumentasi & Portofolio Pengembang Semantik Lengkap (Multi-section, Accessible, & SEO Ready).",
      modules: [
        {
          id: "mod-6-1",
          title: "Capstone Project: Semantic Developer Portal",
          description: "Membangun seluruh arsitektur halaman profil dan dokumentasi teknis dengan standar semantik HTML5 murni.",
          lessons: [
            {
              id: "les-6-1-1",
              title: "CAPSTONE: Semantic Developer Portfolio & Showcase",
              type: "project",
              xpReward: 150,
              content: [
                {
                  type: "markdown",
                  content: [
                    "### Capstone Project: Semantic Developer Portal",
                    "",
                    "Satukan seluruh penguasaanmu dari Level 0 hingga Level 5 ke dalam sebuah proyek nyata berstandar industri!",
                    "",
                    "**Persyaratan Portofolio (Requirements):**",
                    '1. **Struktur Dasar**: Deklarasi `<!DOCTYPE html>`, `html` ber-atribut `lang="id"`, dan tag `head` lengkap dengan `title`.',
                    "2. **Header Semantik**: Terdapat `<header>` yang menampung `<h1>` nama developer dan navigasi `<nav>` dengan minimal 2 tautan link.",
                    "3. **Konten Utama**: Terdapat tag `<main>` yang menaungi minimal dua `<section>` (misal seksi Tentang dan seksi Keahlian).",
                    "4. **Media Gambar**: Terdapat foto profil ber-tag `<img>` dengan atribut `src` dan `alt`.",
                    "5. **Daftar Keahlian**: Terdapat `<ul>` atau `<ol>` berisi minimal 3 item `<li>`.",
                    "6. **Formulir Kontak**: Terdapat `<form>` dengan input nama, input email, dan tombol submit.",
                    "7. **Footer**: Terdapat tag `<footer>` yang memuat teks hak cipta."
                  ].join("\n")
                }
              ],
              starterCode: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Portofolio Pengembang Web - Alex</title>\n</head>\n<body>\n  <header>\n    <h1>Alexandria Pratama</h1>\n    <nav>\n      <ul>\n        <li><a href="#tentang">Tentang</a></li>\n        <li><a href="#kontak">Kontak</a></li>\n      </ul>\n    </nav>\n  </header>\n\n  <main>\n    <section id="tentang">\n      <h2>Tentang Saya</h2>\n      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" alt="Foto Profil Alexandria" />\n      <p>Fullstack Web Engineer dengan spesialisasi arsitektur semantik dan performa web.</p>\n      <h3>Keahlian Utama:</h3>\n      <ul>\n        <li>HTML5 Semantik & Aksesibilitas</li>\n        <li>Modern CSS & Responsive Design</li>\n        <li>JavaScript ES6+ & TypeScript</li>\n      </ul>\n    </section>\n\n    <section id="kontak">\n      <h2>Hubungi Saya</h2>\n      <form action="#" method="POST">\n        <label for="nama">Nama:</label>\n        <input type="text" id="nama" name="nama" required />\n        <label for="email">Email:</label>\n        <input type="email" id="email" name="email" required />\n        <button type="submit">Kirim Pesan</button>\n      </form>\n    </section>\n  </main>\n\n  <footer>\n    <p>&copy; 2026 Alexandria Pratama. All rights reserved.</p>\n  </footer>\n</body>\n</html>',
              requirements: [
                {
                  id: "req-cap-semantic",
                  description: "Memiliki struktur semantik lengkap: header, nav, main, section, footer",
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, "text/html");
                    return !!doc.querySelector("header") && !!doc.querySelector("nav") && !!doc.querySelector("main") && doc.querySelectorAll("section").length >= 2 && !!doc.querySelector("footer");
                  }
                },
                {
                  id: "req-cap-img",
                  description: "Terdapat gambar profil dengan alt text",
                  validate: (html) => {
                    const img = new DOMParser().parseFromString(html, "text/html").querySelector("img");
                    return !!img && !!img.getAttribute("alt");
                  }
                },
                {
                  id: "req-cap-form",
                  description: "Terdapat form kontak dengan input text, email, dan button",
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, "text/html");
                    return !!doc.querySelector("form") && !!doc.querySelector('input[type="email"]') && !!doc.querySelector('button, input[type="submit"]');
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "level-7",
      title: "Level 7 \u2014 Assessment",
      description: "Evaluasi akhir komprehensif: Ujian teori semantik web, tantangan live coding mandiri tanpa template, dan sertifikasi kelulusan.",
      modules: [
        {
          id: "mod-7-1",
          title: "Comprehensive Knowledge Assessment (Ujian Teori)",
          description: "Ujian komprehensif menguji penguasaan materi dari Level 0 hingga Level 5 (tag semantik, struktur folder, SEO meta, dan aksesibilitas).",
          lessons: [
            {
              id: "les-7-1-1",
              title: "ASSESSMENT QUIZ: Evaluasi Teori Web Semantik & Standar HTML5",
              type: "quiz",
              xpReward: 50,
              questions: [
                {
                  id: "q-h7-1",
                  question: "Manakah tag yang paling tepat digunakan untuk membungkus sekelompok tautan navigasi utama sebuah website?",
                  options: [
                    '<div class="menu">',
                    "<nav>",
                    "<section>",
                    "<aside>"
                  ],
                  correctAnswerIndex: 1,
                  explanation: "Tag <nav> secara semantik menandai bagian navigasi utama situs, membantu mesin pencari dan screen reader memahami alur menu."
                },
                {
                  id: "q-h7-2",
                  question: 'Di dalam struktur folder website skala produksi, di manakah file "robots.txt" dan "sitemap.xml" harus diletakkan?',
                  options: [
                    "Di subfolder assets/css/",
                    "Di folder root public/ agar dapat diakses langsung dari domain root",
                    "Di dalam tag <script> di file index.html",
                    "Di folder src/pages/about/"
                  ],
                  correctAnswerIndex: 1,
                  explanation: "robots.txt dan sitemap.xml harus berada di root direktori publik (public/) agar bot crawler dapat membacanya langsung di https://domain.com/robots.txt."
                },
                {
                  id: "q-h7-3",
                  question: 'Apa fungsi atribut "alt" pada tag <img> yang sangat krusial bagi standar WCAG (Web Content Accessibility Guidelines)?',
                  options: [
                    "Mempercepat kecepatan download gambar",
                    "Memberikan deskripsi tekstual gambar bagi pengguna tunanetra yang memakai screen reader",
                    "Mengubah warna gambar menjadi hitam putih",
                    "Menyembunyikan gambar dari publik"
                  ],
                  correctAnswerIndex: 1,
                  explanation: "Atribut alt adalah pilar aksesibilitas web untuk mendeskripsikan konten gambar kepada pengguna pembaca layar (screen reader)."
                },
                {
                  id: "q-h7-4",
                  question: "Perbedaan utama antara tag <strong> dan tag <b> adalah:",
                  options: [
                    "<strong> memberikan arti semantik (urgensi/penting), sedangkan <b> hanya efek tebal visual murni",
                    "<b> lebih baru daripada <strong>",
                    "<strong> hanya bisa digunakan di dalam judul H1",
                    "Tidak ada perbedaan sama sekali"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "HTML5 membedakan gaya visual dan makna semantik. <strong> menandakan teks memiliki bobot penting secara kontekstual."
                },
                {
                  id: "q-h7-5",
                  question: 'Mengapa relative path "../" digunakan dalam link atau gambar?',
                  options: [
                    "Untuk menghapus folder sebelumnya",
                    "Untuk naik/keluar satu tingkat direktori ke folder induk di atasnya",
                    "Untuk mengunci berkas agar tidak dapat diunduh",
                    "Untuk mendownload file dari internet secara otomatis"
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'Dalam sistem berkas UNIX dan web, "../" berarti keluar satu level ke folder induk (parent directory).'
                }
              ]
            }
          ]
        },
        {
          id: "mod-7-2",
          title: "Live Coding Technical Assessment (Ujian Praktik)",
          description: "Ujian live coding mandiri tanpa bantuan: membangun arsitektur portal bisnis semantik tervalidasi.",
          lessons: [
            {
              id: "les-7-2-1",
              title: "FINAL LIVE CODING: Semantic Corporate Portal Blueprint",
              type: "challenge",
              xpReward: 100,
              content: [
                {
                  type: "markdown",
                  content: [
                    "### Ujian Akhir Praktik: Corporate Portal Blueprint",
                    "",
                    "Selesaikan tantangan ini untuk meraih sertifikasi kelulusan **HTML Mastery**!",
                    "",
                    "**Spesifikasi Teknis:**",
                    '1. Bangun dokumen HTML5 lengkap dengan deklarasi `<!DOCTYPE html>`, `html lang="id"`, `head`, dan `body`.',
                    "2. Sertakan `<header>` dengan `<h1>` dan `<nav>`.",
                    "3. Di dalam `<main>`, buat minimal sebuah `<article>` yang memuat `<h2>` dan `<p>`.",
                    "4. Sertakan tag `<footer>` di bagian penutup.",
                    "5. Pastikan semua tag ditutup dengan valid!"
                  ].join("\n")
                }
              ],
              starterCode: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <meta charset="UTF-8">\n  <title>Portal Korporat Nusantara</title>\n</head>\n<body>\n  <header>\n    <h1>Nusantara Tech Global</h1>\n    <nav>\n      <a href="#layanan">Layanan</a>\n    </nav>\n  </header>\n  <main>\n    <article id="layanan">\n      <h2>Transformasi Digital Enterprise</h2>\n      <p>Menyediakan infrastruktur cloud modern dan arsitektur web tangguh.</p>\n    </article>\n  </main>\n  <footer>\n    <p>&copy; 2026 PT Nusantara Tech. Hak cipta dilindungi.</p>\n  </footer>\n</body>\n</html>',
              requirements: [
                {
                  id: "req-test-doc",
                  description: "Dokumen memiliki tag html, head, body, header, nav, main, article, dan footer",
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, "text/html");
                    return !!doc.querySelector("header") && !!doc.querySelector("nav") && !!doc.querySelector("main") && !!doc.querySelector("article") && !!doc.querySelector("footer");
                  }
                },
                {
                  id: "req-test-text",
                  description: "Memiliki judul utama H1 dan sub-judul H2 di dalam article",
                  validate: (html) => {
                    const doc = new DOMParser().parseFromString(html, "text/html");
                    return doc.querySelectorAll("h1").length > 0 && doc.querySelectorAll("article h2").length > 0;
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

// src/data/cssCurriculum.ts
var CSS_COURSE = {
  id: "css-mastery",
  title: "CSS 0 \u2192 Mahir",
  shortDescription: "Kurikulum CSS komprehensif 8 jenjang: Absolute Beginner, Fundamental, Beginner, Intermediate, Advanced, Professional, Project, & Assessment.",
  description: "Beri warna, gaya, layout responsif, dan animasi memukau pada websitemu. Kurikulum terstruktur 8 tingkat ini mencakup dasar selektor, box model, struktur folder stylesheet modular, Flexbox & CSS Grid, BEM architecture tingkat enterprise, hingga proyek capstone dan asesmen kelulusan.",
  icon: "css",
  levels: [
    {
      id: "css-level-0",
      title: "Level 0 \u2014 Absolute Beginner",
      description: "Pengenalan sintaks CSS, selektor elemen, class vs ID, pewarnaan hex/rgb, dan menghubungkan CSS ke HTML.",
      modules: [
        {
          id: "css-mod-0-1",
          title: "Pengenalan CSS & Sintaks Dasar",
          description: "Bagaimana cara browser membaca aturan gaya CSS?",
          lessons: [
            {
              id: "css-les-0-1-1",
              title: "Anatomi Aturan CSS (Rule set)",
              type: "learn",
              xpReward: 15,
              content: [
                {
                  type: "markdown",
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
                  type: "code-example",
                  language: "css",
                  code: `h1 {
  color: #2563eb;
  font-size: 32px;
  text-align: center;
}`
                }
              ]
            },
            {
              id: "css-les-0-1-2",
              title: "Latihan: Mengubah Warna Teks",
              type: "practice",
              xpReward: 20,
              content: [
                {
                  type: "markdown",
                  content: "Ubah warna judul `<h1>` menjadi biru (`blue` atau `#2563eb`) dan ratakan teks ke tengah (`center`)."
                }
              ],
              starterCode: "<style>\n  h1 {\n    /* Tulis properti di sini */\n    color: #2563eb;\n    text-align: center;\n  }\n</style>\n\n<h1>Halo, Dunia Desain Web!</h1>",
              requirements: [
                {
                  id: "req-css-color",
                  description: "Elemen h1 memiliki warna teks berwarna biru",
                  validate: (html) => html.includes("color:") && (html.includes("blue") || html.includes("#2563eb") || html.includes("rgb"))
                },
                {
                  id: "req-css-align",
                  description: "Elemen h1 memiliki text-align: center",
                  validate: (html) => html.includes("text-align:") && html.includes("center")
                }
              ]
            }
          ]
        },
        {
          id: "css-mod-0-2",
          title: "Selektor Class & ID",
          description: "Menargetkan elemen spesifik dengan class dot (.) dan id hash (#).",
          lessons: [
            {
              id: "css-les-0-2-1",
              title: "Class vs ID",
              type: "practice",
              xpReward: 25,
              content: [
                {
                  type: "markdown",
                  content: "Gunakan class `.highlight` untuk memberi background kuning pada paragraf tertentu."
                }
              ],
              starterCode: '<style>\n  .highlight {\n    background-color: #fef08a;\n    padding: 8px;\n  }\n</style>\n\n<p class="highlight">Paragraf ini ditandai kuning!</p>\n<p>Paragraf biasa.</p>',
              requirements: [
                {
                  id: "req-class-usage",
                  description: "Terdapat class .highlight dengan background-color",
                  validate: (html) => html.includes(".highlight") && html.includes("background-color")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "css-level-1",
      title: "Level 1 \u2014 Fundamental",
      description: "Tipografi font, hierarki teks, dan Box Model mendalam (content, padding, border, margin, box-sizing: border-box).",
      modules: [
        {
          id: "css-mod-1-1",
          title: "Tipografi & Gaya Teks",
          description: "Mengatur font-family, font-weight, line-height, dan text-decoration.",
          lessons: [
            {
              id: "css-les-1-1-1",
              title: "Mengatur Font & Spasi Paragraf",
              type: "practice",
              xpReward: 25,
              content: [
                {
                  type: "markdown",
                  content: "Atur elemen body dengan `font-family: sans-serif` dan `line-height: 1.6` agar nyaman dibaca."
                }
              ],
              starterCode: "<style>\n  body {\n    font-family: sans-serif;\n    line-height: 1.6;\n    color: #334155;\n  }\n</style>\n\n<p>Tipografi yang baik meningkatkan kenyamanan membaca pengguna hingga 80%.</p>",
              requirements: [
                {
                  id: "req-typo",
                  description: "Menetapkan font-family sans-serif dan line-height 1.6",
                  validate: (html) => html.includes("font-family:") && html.includes("line-height:")
                }
              ]
            }
          ]
        },
        {
          id: "css-mod-1-2",
          title: "The Sacred Box Model",
          description: "Pahami cara browser menghitung dimensi elemen: content, padding, border, dan margin.",
          lessons: [
            {
              id: "css-les-1-2-1",
              title: "Latihan Padding, Border, dan Margin",
              type: "practice",
              xpReward: 30,
              content: [
                {
                  type: "markdown",
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
                  id: "req-box-model",
                  description: "Memiliki properti padding, border, dan margin pada .kartu",
                  validate: (html) => html.includes("padding:") && html.includes("border:") && html.includes("margin")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "css-level-2",
      title: "Level 2 \u2014 Beginner",
      description: "Bagaimana membuat struktur folder & mengorganisir file stylesheet CSS (reset.css, style.css, link vs @import, cascade order).",
      modules: [
        {
          id: "css-mod-2-1",
          title: "Bagaimana Membuat Struktur Folder & Mengorganisir CSS",
          description: "Mengapa dilarang menaruh ribuan baris CSS di satu file? Membagi stylesheet menjadi modular dan hierarkis.",
          lessons: [
            {
              id: "les-css-2-1-1",
              title: "LEARN: Struktur Folder CSS Standar & Modular",
              type: "learn",
              xpReward: 30,
              content: [
                {
                  type: "markdown",
                  content: `### Bagaimana Cara Membuat Struktur Folder untuk CSS?

Ketika kamu membangun website lebih dari satu halaman atau memiliki banyak komponen (navbar, tombol, kartu, footer), menaruh semua CSS di satu file \`style.css\` akan menjadi mimpi buruk:
- Sulit mencari class yang ingin diubah.
- Sering terjadi konflik nama class yang saling menimpa (*unintended override*).
- Kode membengkak dan lambat di-render browser.

---

#### 1. Struktur Folder CSS Standar (Beginner to Intermediate Layout)

\`\`\`text
my_website/
\u2502
\u251C\u2500\u2500 index.html
\u251C\u2500\u2500 about.html
\u2502
\u2514\u2500\u2500 assets/
    \u2514\u2500\u2500 css/
        \u251C\u2500\u2500 reset.css        # Menghapus styling default bawaan browser
        \u251C\u2500\u2500 variables.css    # Definisi warna tema dan font
        \u251C\u2500\u2500 style.css        # Layout umum & halaman utama
        \u2514\u2500\u2500 components.css   # Gaya khusus tombol, kartu, modal
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
                  type: "code-example",
                  language: "html",
                  code: `<!-- Menghubungkan stylesheet modular dengan urutan cascade yang benar -->
<link rel="stylesheet" href="assets/css/reset.css">
<link rel="stylesheet" href="assets/css/components.css">
<link rel="stylesheet" href="assets/css/style.css">`
                }
              ]
            },
            {
              id: "les-css-2-1-2",
              title: "PRACTICE: Menerapkan CSS Reset & Komponen Modular",
              type: "practice",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Latihan: Modularisasi CSS & Box-Sizing Global

Terapkan aturan sakral \`box-sizing: border-box\` pada seluruh elemen (\`*\`), lalu rancang class komponen tombol \`.btn-primary\` yang terisolasi dengan padding, warna latar, dan border radius.`
                }
              ],
              starterCode: '<style>\n  /* 1. Aturan Global Reset */\n  * {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n  }\n\n  /* 2. Komponen Tombol Reusable (components.css) */\n  .btn-primary {\n    display: inline-block;\n    background-color: #2563eb;\n    color: #ffffff;\n    padding: 10px 20px;\n    border-radius: 6px;\n    text-decoration: none;\n    font-weight: 600;\n  }\n</style>\n\n<div style="padding: 20px;">\n  <h2>Komponen Tombol Siap Pakai</h2>\n  <a href="#" class="btn-primary">Mulai Sekarang</a>\n</div>',
              requirements: [
                {
                  id: "req-css-reset",
                  description: "Mengandung aturan universal selector * dengan box-sizing: border-box",
                  validate: (html) => html.includes("*") && html.includes("box-sizing:") && html.includes("border-box")
                },
                {
                  id: "req-btn-component",
                  description: "Terdapat class .btn-primary dengan styling lengkap",
                  validate: (html) => html.includes(".btn-primary") && html.includes("background-color") && html.includes("padding")
                }
              ]
            },
            {
              id: "les-css-2-1-3",
              title: "QUIZ: Arsitektur File & Urutan Cascade CSS",
              type: "quiz",
              xpReward: 30,
              questions: [
                {
                  id: "q-css-f-1",
                  question: "Mengapa file reset.css harus di-link paling awal sebelum file style lainnya?",
                  options: [
                    "Agar browser menghapus margin default browser sebelum style kita diterapkan",
                    "Karena jika di akhir, warna website akan hilang semua",
                    "Wajib sesuai peraturan W3C",
                    "Agar file CSS tidak mengalami error syntax"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "Dalam aturan Cascade, file reset harus di-load pertama agar styling kustom di file berikutnya dapat menimpa nilai default secara mulus."
                },
                {
                  id: "q-css-f-2",
                  question: "Manakah cara yang paling direkomendasikan untuk memuat file CSS dalam proyek produksi?",
                  options: [
                    'Menggunakan tag <link rel="stylesheet" href="..."> di dalam <head>',
                    "Menggunakan @import url(...) di dalam file CSS",
                    'Menulis semua CSS di dalam atribut inline style=""',
                    "Menggunakan JavaScript document.write()"
                  ],
                  correctAnswerIndex: 0,
                  explanation: '<link rel="stylesheet"> dimuat secara paralel oleh browser, sedangkan @import memblokir rendering dan memperlambat waktu muat situs.'
                },
                {
                  id: "q-css-f-3",
                  question: 'Apa fungsi sakral dari properti "box-sizing: border-box"?',
                  options: [
                    "Membuat kotak menjadi lingkaran",
                    "Menghitung padding dan border ke dalam total lebar (width) elemen, sehingga tidak melar melebihi ukuran yang ditentukan",
                    "Menghilangkan border elemen",
                    "Mengubah teks menjadi huruf kapital"
                  ],
                  correctAnswerIndex: 1,
                  explanation: "box-sizing: border-box memastikan width dan height yang kamu tentukan sudah mencakup padding dan border, mencegah layout bergeser."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "css-level-3",
      title: "Level 3 \u2014 Intermediate",
      description: "Modern Layout Master: Flexbox satu dimensi (justify, align, wrap, gap) & CSS Grid dua dimensi (template columns, repeat, minmax).",
      modules: [
        {
          id: "css-mod-3-1",
          title: "Flexbox Layout 1-Dimensi",
          description: "Mengatur susunan elemen secara horizontal/vertikal dengan alignment yang fleksibel.",
          lessons: [
            {
              id: "css-les-3-1-1",
              title: "Membuat Navbar Sejajar dengan Flexbox",
              type: "practice",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: "Gunakan `display: flex`, `justify-content: space-between`, dan `align-items: center` untuk meratakan logo di kiri dan link di kanan."
                }
              ],
              starterCode: '<style>\n  .navbar {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    background: #0f172a;\n    padding: 12px 24px;\n    color: white;\n  }\n  .nav-links {\n    display: flex;\n    gap: 16px;\n    list-style: none;\n  }\n</style>\n\n<header class="navbar">\n  <div class="logo"><strong>ACADEMY</strong></div>\n  <ul class="nav-links">\n    <li>Beranda</li>\n    <li>Kursus</li>\n    <li>Kontak</li>\n  </ul>\n</header>',
              requirements: [
                {
                  id: "req-flex-nav",
                  description: "Menggunakan display: flex dan justify-content: space-between",
                  validate: (html) => html.includes("display: flex") && html.includes("justify-content: space-between")
                }
              ]
            }
          ]
        },
        {
          id: "css-mod-3-2",
          title: "CSS Grid Layout 2-Dimensi",
          description: "Membangun tata letak kartu bento-grid multi-kolom yang rapi dan serasi.",
          lessons: [
            {
              id: "css-les-3-2-1",
              title: "Grid 3 Kolom Responsif dengan repeat & minmax",
              type: "practice",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: "Gunakan `display: grid`, `grid-template-columns: repeat(3, 1fr)`, dan `gap: 16px`."
                }
              ],
              starterCode: '<style>\n  .grid-container {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 16px;\n  }\n  .item {\n    background: #e2e8f0;\n    padding: 20px;\n    text-align: center;\n    border-radius: 8px;\n  }\n</style>\n\n<div class="grid-container">\n  <div class="item">Kolom 1</div>\n  <div class="item">Kolom 2</div>\n  <div class="item">Kolom 3</div>\n</div>',
              requirements: [
                {
                  id: "req-css-grid",
                  description: "Menggunakan display: grid dengan grid-template-columns dan gap",
                  validate: (html) => html.includes("display: grid") && html.includes("grid-template-columns") && html.includes("gap")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "css-level-4",
      title: "Level 4 \u2014 Advanced",
      description: "CSS Variables (Custom Properties), Transisi halus (transition), Animasi Keyframes (@keyframes), dan Media Queries responsif.",
      modules: [
        {
          id: "css-mod-4-1",
          title: "CSS Variables & Dynamic Theming",
          description: "Mendefinisikan variabel global :root untuk mempermudah perubahan tema warna dan dark mode.",
          lessons: [
            {
              id: "css-les-4-1-1",
              title: "Mendefinisikan dan Memanggil CSS Variables",
              type: "practice",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: "Definisikan variabel di `:root` seperti `--warna-utama: #3b82f6;` lalu panggil menggunakan fungsi `var(--warna-utama)`."
                }
              ],
              starterCode: '<style>\n  :root {\n    --primary: #4f46e5;\n    --text-color: #1e293b;\n    --radius: 8px;\n  }\n  .badge {\n    background-color: var(--primary);\n    color: white;\n    padding: 6px 12px;\n    border-radius: var(--radius);\n    display: inline-block;\n  }\n</style>\n\n<span class="badge">CSS Variables Aktif</span>',
              requirements: [
                {
                  id: "req-css-var",
                  description: "Mendefinisikan variabel di :root dan menggunakannya dengan var()",
                  validate: (html) => html.includes(":root") && html.includes("--") && html.includes("var(")
                }
              ]
            }
          ]
        },
        {
          id: "css-mod-4-2",
          title: "Animasi & Responsive Media Queries",
          description: "Membuat efek hover transisi mulus dan tata letak responsif untuk layar smartphone (@media).",
          lessons: [
            {
              id: "css-les-4-2-1",
              title: "Kartu Interaktif dengan Hover & Transition",
              type: "practice",
              xpReward: 45,
              content: [
                {
                  type: "markdown",
                  content: "Tambahkan efek `transition: transform 0.3s ease` dan perubahan `transform: translateY(-4px)` saat `:hover`."
                }
              ],
              starterCode: '<style>\n  .card-hover {\n    background: white;\n    padding: 24px;\n    border-radius: 12px;\n    border: 1px solid #e2e8f0;\n    transition: transform 0.3s ease, box-shadow 0.3s ease;\n    cursor: pointer;\n  }\n  .card-hover:hover {\n    transform: translateY(-4px);\n    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);\n  }\n</style>\n\n<div class="card-hover">\n  <h3>Arahkan Kursor ke Sini!</h3>\n  <p>Kartu terangkat dengan transisi halus.</p>\n</div>',
              requirements: [
                {
                  id: "req-hover-anim",
                  description: "Memiliki aturan :hover dengan transform dan properti transition",
                  validate: (html) => html.includes(":hover") && html.includes("transition:") && html.includes("transform:")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "css-level-5",
      title: "Level 5 \u2014 Professional",
      description: "Arsitektur CSS skala industri (BEM Methodology: Block Element Modifier, 7-1 Sass/CSS pattern, dan utility-first concepts).",
      modules: [
        {
          id: "css-mod-5-1",
          title: "Arsitektur CSS Skala Industri (BEM & 7-1 Pattern)",
          description: "Bagaimana tim software engineer mengorganisir puluhan ribu baris stylesheet tanpa konflik spesifisitas.",
          lessons: [
            {
              id: "les-css-5-1-1",
              title: "LEARN: Metodologi BEM & Pola Folder 7-1",
              type: "learn",
              xpReward: 45,
              content: [
                {
                  type: "markdown",
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
\u2502
\u251C\u2500\u2500 base/                # Konfigurasi dasar
\u2502   \u251C\u2500\u2500 _reset.css       # Normalisasi browser
\u2502   \u2514\u2500\u2500 _typography.css  # Definisi heading, paragraf, font
\u2502
\u251C\u2500\u2500 components/          # Potongan UI mandiri (reusable)
\u2502   \u251C\u2500\u2500 _buttons.css     # .btn, .btn--primary
\u2502   \u251C\u2500\u2500 _cards.css       # .card, .card__header
\u2502   \u2514\u2500\u2500 _navbar.css      # .nav, .nav__item
\u2502
\u251C\u2500\u2500 layout/              # Rangka struktur halaman
\u2502   \u251C\u2500\u2500 _grid.css        # Sistem grid 12 kolom
\u2502   \u251C\u2500\u2500 _header.css      # Header global
\u2502   \u2514\u2500\u2500 _footer.css      # Footer global
\u2502
\u251C\u2500\u2500 themes/              # Skema warna
\u2502   \u251C\u2500\u2500 _light.css       # Variabel tema terang
\u2502   \u2514\u2500\u2500 _dark.css        # Variabel tema gelap
\u2502
\u2514\u2500\u2500 main.css             # Berkas utama yang menggabungkan seluruh modul
\`\`\`
`
                },
                {
                  type: "code-example",
                  language: "css",
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
              id: "les-css-5-1-2",
              title: "PRACTICE: Desain Komponen UI dengan Metodologi BEM",
              type: "practice",
              xpReward: 50,
              content: [
                {
                  type: "markdown",
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
                  id: "req-bem-block",
                  description: "Memiliki aturan class .product-card",
                  validate: (html) => html.includes(".product-card")
                },
                {
                  id: "req-bem-modifier",
                  description: "Memiliki aturan modifier .product-card--sale",
                  validate: (html) => html.includes(".product-card--sale")
                },
                {
                  id: "req-bem-element",
                  description: "Memiliki elemen dengan class double-underscore __",
                  validate: (html) => html.includes(".product-card__")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "css-level-6",
      title: "Level 6 \u2014 Project",
      description: "Implementasi proyek nyata berskala penuh: Modern Responsive E-Commerce Product Showcase & Interactive Pricing Table dengan dark mode CSS variables.",
      modules: [
        {
          id: "css-mod-6-1",
          title: "Capstone Project: Modern Product Showcase & Pricing Grid",
          description: "Membangun antarmuka katalog produk premium yang responsif dengan efek visual mikro-interaksi.",
          lessons: [
            {
              id: "css-les-6-1-1",
              title: "CAPSTONE: Responsive Storefront Showcase",
              type: "project",
              xpReward: 150,
              content: [
                {
                  type: "markdown",
                  content: [
                    "### Capstone Project: Modern Responsive Storefront",
                    "",
                    "Gabungkan Flexbox, Grid, CSS Variables, dan Transisi untuk membangun etalase produk toko modern!",
                    "",
                    "**Persyaratan Proyek:**",
                    "1. **CSS Variables**: Definisikan variabel warna utama di `:root`.",
                    "2. **Layout Grid Responsif**: Gunakan `display: grid` dengan `grid-template-columns` untuk menyusun minimal 2 kartu produk.",
                    "3. **Flexbox Alignment**: Di dalam kartu, gunakan Flexbox untuk mengatur judul, harga, dan tombol aksi.",
                    "4. **Efek Mikro-Interaksi**: Tambahkan efek `:hover` dengan transisi halus (`transition`) pada kartu produk."
                  ].join("\n")
                }
              ],
              starterCode: '<style>\n  :root {\n    --primary: #2563eb;\n    --text-dark: #0f172a;\n    --bg-card: #ffffff;\n    --radius: 12px;\n  }\n\n  .catalog-grid {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    gap: 20px;\n    padding: 20px;\n  }\n\n  .card {\n    background: var(--bg-card);\n    border: 1px solid #e2e8f0;\n    border-radius: var(--radius);\n    padding: 20px;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    transition: transform 0.3s ease, box-shadow 0.3s ease;\n  }\n\n  .card:hover {\n    transform: translateY(-6px);\n    box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.1);\n  }\n\n  .card-btn {\n    background: var(--primary);\n    color: white;\n    border: none;\n    padding: 10px 16px;\n    border-radius: 6px;\n    cursor: pointer;\n    margin-top: 16px;\n  }\n</style>\n\n<div class="catalog-grid">\n  <div class="card">\n    <h3>Mechanical Keyboard RGB</h3>\n    <p>Switch tactile dengan backlight RGB dinamis.</p>\n    <strong>Rp650.000</strong>\n    <button class="card-btn">Tambah ke Keranjang</button>\n  </div>\n  <div class="card">\n    <h3>Mouse Wireless Ultra</h3>\n    <p>Sensor optik 16.000 DPI baterai tahan 80 jam.</p>\n    <strong>Rp350.000</strong>\n    <button class="card-btn">Tambah ke Keranjang</button>\n  </div>\n</div>',
              requirements: [
                {
                  id: "req-cap-grid",
                  description: "Menggunakan display: grid pada wadah katalog",
                  validate: (html) => html.includes("display: grid")
                },
                {
                  id: "req-cap-flex",
                  description: "Menggunakan display: flex pada komponen kartu",
                  validate: (html) => html.includes("display: flex")
                },
                {
                  id: "req-cap-vars",
                  description: "Menggunakan CSS Variables dengan var(--...)",
                  validate: (html) => html.includes("var(--")
                },
                {
                  id: "req-cap-hover",
                  description: "Memiliki aturan efek :hover dengan transisi",
                  validate: (html) => html.includes(":hover") && html.includes("transition:")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "css-level-7",
      title: "Level 7 \u2014 Assessment",
      description: "Evaluasi akhir komprehensif: Ujian teori CSS tingkat mahir, tantangan live coding mandiri, dan sertifikasi kelulusan.",
      modules: [
        {
          id: "css-mod-7-1",
          title: "Comprehensive Knowledge Assessment (Ujian Teori)",
          description: "Ujian komprehensif menguji pemahaman mendalam tentang Specificity, Cascade, Flexbox vs Grid, dan Box Model.",
          lessons: [
            {
              id: "css-les-7-1-1",
              title: "ASSESSMENT QUIZ: Evaluasi Teori CSS Software Engineer",
              type: "quiz",
              xpReward: 50,
              questions: [
                {
                  id: "q-c7-1",
                  question: "Manakah selektor CSS berikut yang memiliki tingkat bobot spesifisitas (specificity weight) tertinggi?",
                  options: [
                    'Tag selector: "h1"',
                    'Class selector: ".judul-utama"',
                    'ID selector: "#header-banner"',
                    'Universal selector: "*"'
                  ],
                  correctAnswerIndex: 2,
                  explanation: "Dalam hierarki spesifisitas CSS: Inline style (1000) > ID (100) > Class/Pseudo-class (10) > Elemen/Pseudo-element (1) > Universal (0)."
                },
                {
                  id: "q-c7-2",
                  question: "Kapan kamu harus memprioritaskan CSS Grid dibandingkan Flexbox?",
                  options: [
                    "Saat menata layout 2-dimensi (baris dan kolom sekaligus)",
                    "Hanya saat memberi warna teks",
                    "Saat meratakan item dalam 1 baris saja",
                    "Saat menggunakan browser Internet Explorer lama"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "CSS Grid dirancang khusus untuk layout 2 dimensi (baris + kolom), sedangkan Flexbox optimal untuk susunan 1 dimensi (hanya baris atau hanya kolom)."
                },
                {
                  id: "q-c7-3",
                  question: 'Dalam metodologi penamaan BEM, apa arti dari penamaan ".button--secondary"?',
                  options: [
                    "Elemen anak dari button",
                    "Modifier (varian) dari blok .button",
                    "ID unik dari button",
                    "File CSS bernama secondary"
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'Dua tanda garis hubung "--" dalam BEM menandai sebuah Modifier yang memodifikasi tampilan atau status komponen dasar.'
                },
                {
                  id: "q-c7-4",
                  question: 'Mengapa arsitektur 7-1 Sass/CSS memisahkan folder "base/", "components/", dan "layout/"?',
                  options: [
                    "Agar file tidak bisa dibaca orang lain",
                    "Untuk menerapkan pemisahan tanggung jawab (Separation of Concerns) sehingga stylesheet mudah dipelihara di tim besar",
                    "Karena browser tidak bisa membaca file lebih dari 100 baris",
                    "Untuk mempercepat koneksi internet pengguna"
                  ],
                  correctAnswerIndex: 1,
                  explanation: "Arsitektur 7-1 mengisolasi styling berdasarkan perannya sehingga mencegah duplikasi dan tabrakan styling di aplikasi skala besar."
                },
                {
                  id: "q-c7-5",
                  question: 'Manakah nilai properti "position" yang membuat elemen tetap mengambang di posisi layar yang sama saat pengguna men-scroll halaman?',
                  options: [
                    "position: relative",
                    "position: static",
                    "position: fixed",
                    "position: inherit"
                  ],
                  correctAnswerIndex: 2,
                  explanation: "position: fixed mengunci posisi elemen relatif terhadap jendela browser (viewport), sehingga tetap di tempat saat di-scroll."
                }
              ]
            }
          ]
        },
        {
          id: "css-mod-7-2",
          title: "Live Coding Technical Assessment (Ujian Praktik)",
          description: "Ujian live coding mandiri tanpa template: membangun kartu profil responsif dengan Flexbox/Grid dan variabel CSS kustom.",
          lessons: [
            {
              id: "css-les-7-2-1",
              title: "FINAL LIVE CODING: Responsive Profile Card Challenge",
              type: "challenge",
              xpReward: 100,
              content: [
                {
                  type: "markdown",
                  content: [
                    "### Ujian Akhir Praktik: Responsive Profile Card",
                    "",
                    "Buktikan keahlian desain webmu dengan membangun kartu profil modern tervalidasi!",
                    "",
                    "**Persyaratan Ujian:**",
                    "1. Definisikan minimal satu variabel CSS di `:root` (misal `--primary`).",
                    "2. Gunakan `display: flex` dengan `align-items: center` atau `justify-content` pada kartu.",
                    "3. Atur `padding`, `border-radius`, dan `box-shadow` untuk estetika visual modern.",
                    "4. Terapkan efek `:hover` dengan transisi halus."
                  ].join("\n")
                }
              ],
              starterCode: '<style>\n  :root {\n    --primary-color: #6366f1;\n    --card-bg: #ffffff;\n  }\n  .profile-card {\n    background: var(--card-bg);\n    padding: 24px;\n    border-radius: 12px;\n    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n    display: flex;\n    gap: 16px;\n    align-items: center;\n    transition: transform 0.3s ease;\n  }\n  .profile-card:hover {\n    transform: scale(1.02);\n  }\n  .avatar {\n    width: 60px;\n    height: 60px;\n    border-radius: 50%;\n    background: var(--primary-color);\n  }\n</style>\n\n<div class="profile-card">\n  <div class="avatar"></div>\n  <div>\n    <h3>Budi Santoso</h3>\n    <p style="color: #64748b;">Senior Frontend Engineer</p>\n  </div>\n</div>',
              requirements: [
                {
                  id: "req-exam-vars",
                  description: "Menggunakan CSS Variables di :root dan dipanggil dengan var()",
                  validate: (html) => html.includes(":root") && html.includes("var(")
                },
                {
                  id: "req-exam-flex",
                  description: "Menggunakan display: flex dan gap",
                  validate: (html) => html.includes("display: flex") && html.includes("gap:")
                },
                {
                  id: "req-exam-hover",
                  description: "Memiliki aturan hover dan properti transition",
                  validate: (html) => html.includes(":hover") && html.includes("transition:")
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// src/data/jsCurriculum.ts
var JS_COURSE = {
  id: "javascript-mastery",
  title: "JavaScript 0 \u2192 Mahir",
  shortDescription: "Kurikulum JavaScript komprehensif 8 jenjang: Absolute Beginner, Fundamental, Beginner, Intermediate, Advanced, Professional, Project, & Assessment.",
  description: "Hidupkan websitemu dengan logika komputasi, struktur folder proyek JavaScript modular, ES Modules (import/export), Event Listeners, Asynchronous JS, modern toolchain (Vite & npm), capstone project, dan evaluasi teknis kelulusan.",
  icon: "javascript",
  levels: [
    {
      id: "js-level-0",
      title: "Level 0 \u2014 Absolute Beginner",
      description: "Pengenalan logika pemrograman, variabel (const, let), tipe data primitif, operator matematika, dan mencetak ke console.log().",
      modules: [
        {
          id: "js-mod-0-1",
          title: "Logika Dasar & Variabel",
          description: "Apa itu bahasa pemrograman dan bagaimana cara menyimpan informasi di memori komputer?",
          lessons: [
            {
              id: "js-les-0-1-1",
              title: "Variabel: let dan const",
              type: "learn",
              xpReward: 15,
              content: [
                {
                  type: "markdown",
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
                  type: "code-example",
                  language: "javascript",
                  code: `const namaAplikasi = "CODERA";
let saldoUser = 50000;
console.log("Selamat datang di " + namaAplikasi);`
                }
              ]
            },
            {
              id: "js-les-0-1-2",
              title: "Latihan: Menghitung Total Belanja",
              type: "practice",
              xpReward: 25,
              content: [
                {
                  type: "markdown",
                  content: "Deklarasikan variabel `harga` bernilai 25000 dan `jumlah` bernilai 4. Hitung `total` dengan mengalikan keduanya, lalu cetak `total` menggunakan `console.log(total)`!"
                }
              ],
              starterCode: "// Tulis kode kalkulasi di bawah ini:\nconst harga = 25000;\nconst jumlah = 4;\nconst total = harga * jumlah;\nconsole.log(total);",
              requirements: [
                {
                  id: "req-js-calc",
                  description: "Menghitung variabel total dengan mengalikan harga dan jumlah",
                  validate: (code) => code.includes("harga") && code.includes("jumlah") && code.includes("*")
                },
                {
                  id: "req-js-log",
                  description: "Mencetak output total ke console",
                  validate: (code) => code.includes("console.log(")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "js-level-1",
      title: "Level 1 \u2014 Fundamental",
      description: "Fungsi modular (function & return), percabangan kondisi (if-else), dan manipulasi DOM dasar (document.getElementById, textContent).",
      modules: [
        {
          id: "js-mod-1-1",
          title: "Percabangan & Fungsi",
          description: "Mengambil keputusan logis dan mengemas baris kode menjadi fungsi reusable.",
          lessons: [
            {
              id: "js-les-1-1-1",
              title: "Membuat Fungsi Perhitungan Diskon",
              type: "practice",
              xpReward: 30,
              content: [
                {
                  type: "markdown",
                  content: "Buat fungsi `hitungDiskon(harga, persen)` yang mengembalikan harga setelah dipotong diskon."
                }
              ],
              starterCode: "function hitungDiskon(harga, persen) {\n  const potongan = harga * (persen / 100);\n  return harga - potongan;\n}\n\nconst hargaAkhir = hitungDiskon(100000, 20);\nconsole.log(hargaAkhir);",
              requirements: [
                {
                  id: "req-js-fn",
                  description: "Mendefinisikan fungsi hitungDiskon dengan kata kunci return",
                  validate: (code) => code.includes("function hitungDiskon") && code.includes("return")
                }
              ]
            }
          ]
        },
        {
          id: "js-mod-1-2",
          title: "Manipulasi DOM Dasar",
          description: "Menghubungkan kode JavaScript ke elemen HTML untuk mengubah teks dan gaya secara langsung.",
          lessons: [
            {
              id: "js-les-1-2-1",
              title: "Mengubah Teks Paragraf dengan textContent",
              type: "practice",
              xpReward: 30,
              content: [
                {
                  type: "markdown",
                  content: 'Gunakan `document.getElementById("status").textContent = "Aktif";` untuk memperbarui status.'
                }
              ],
              starterCode: '<p id="status">Menunggu interaksi...</p>\n\n<script>\n  const elemenStatus = document.getElementById("status");\n  elemenStatus.textContent = "Status: Online dan Siap!";\n</script>',
              requirements: [
                {
                  id: "req-dom-change",
                  description: "Mengakses elemen dengan getElementById dan mengubah textContent",
                  validate: (html) => html.includes("getElementById") && html.includes("textContent")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "js-level-2",
      title: "Level 2 \u2014 Beginner",
      description: "Bagaimana membuat struktur folder proyek JavaScript, modularitas ES Modules (import/export), dan memisahkan logika dari file HTML.",
      modules: [
        {
          id: "js-mod-2-1",
          title: "Bagaimana Membuat Struktur Folder Proyek JavaScript",
          description: "Mengapa dilarang menulis JavaScript di dalam tag <script> HTML? Membangun folder proyek modular berbasis ES Modules.",
          lessons: [
            {
              id: "les-js-2-1-1",
              title: "LEARN: Struktur Folder Proyek JavaScript Standar",
              type: "learn",
              xpReward: 30,
              content: [
                {
                  type: "markdown",
                  content: `### Bagaimana Cara Membuat Struktur Folder di JavaScript?

Ketika aplikasi web mulai memiliki banyak fitur (validasi form, kalkulasi keranjang, permintaan API, animasi), menaruh kode JavaScript di dalam file HTML membuat kode kotor dan sulit diuji.

---

#### 1. Struktur Folder Standar Proyek JavaScript (Modular Layout)

\`\`\`text
my_javascript_app/
\u2502
\u251C\u2500\u2500 index.html           # Menghubungkan modul utama via script type="module"
\u251C\u2500\u2500 README.md            # Dokumentasi cara kerja aplikasi
\u2502
\u251C\u2500\u2500 css/
\u2502   \u2514\u2500\u2500 style.css        # Gaya tampilan
\u2502
\u2514\u2500\u2500 js/                  # [FOLDER UTAMA JAVASCRIPT]
    \u251C\u2500\u2500 app.js           # Titik masuk utama aplikasi (Entrypoint)
    \u2502
    \u251C\u2500\u2500 modules/         # Kumpulan modul-modul independen
    \u2502   \u251C\u2500\u2500 calculator.js# Fungsi-fungsi matematika murni
    \u2502   \u251C\u2500\u2500 formatter.js # Fungsi pemformat mata uang & tanggal
    \u2502   \u2514\u2500\u2500 storage.js   # Pengelola penyimpanan localStorage
    \u2502
    \u2514\u2500\u2500 data/            # Data statis awal
        \u2514\u2500\u2500 products.js  # Array produk awal
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
                  type: "code-example",
                  language: "javascript",
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
              id: "les-js-2-1-2",
              title: "PRACTICE: Simulasi Pemisahan Modul Helper & Main App",
              type: "practice",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: [
                    "### Latihan: Modularitas Fungsi Helper",
                    "",
                    "Simulasikan pemisahan file modul helper dan script utama.",
                    "Buat object modul `KasirHelper` yang memiliki method `hitungPPN(nominal)` dan panggil di alur transaksi utama."
                  ].join("\n")
                }
              ],
              starterCode: '// SIMULASI STRUKTUR MODULAR: js/modules/kasir.js\nconst KasirHelper = {\n  hitungPPN: function(nominal, persen = 11) {\n    return nominal * (persen / 100);\n  },\n  formatRupiah: function(nominal) {\n    return "Rp" + nominal.toLocaleString("id-ID");\n  }\n};\n\n// ALUR UTAMA (js/app.js)\nconst belanja = 200000;\nconst ppn = KasirHelper.hitungPPN(belanja);\nconst totalBayar = belanja + ppn;\n\nconsole.log("Subtotal : " + KasirHelper.formatRupiah(belanja));\nconsole.log("PPN (11%): " + KasirHelper.formatRupiah(ppn));\nconsole.log("Total    : " + KasirHelper.formatRupiah(totalBayar));',
              requirements: [
                {
                  id: "req-js-mod-helper",
                  description: "Memiliki objek modul dengan fungsi hitungPPN dan formatRupiah",
                  validate: (code) => code.includes("hitungPPN") && code.includes("formatRupiah")
                },
                {
                  id: "req-js-mod-log",
                  description: "Mencetak rincian transaksi dengan output terformat",
                  validate: (code) => code.includes("console.log") && code.includes("totalBayar")
                }
              ]
            },
            {
              id: "les-js-2-1-3",
              title: "QUIZ: Modularitas & Struktur Folder JavaScript",
              type: "quiz",
              xpReward: 30,
              questions: [
                {
                  id: "q-js-f-1",
                  question: 'Mengapa tag <script> yang memanggil file utama JavaScript modern harus diberi atribut type="module"?',
                  options: [
                    'Agar file bisa menggunakan sintaks "import" dan "export" serta terisolasi dari global scope',
                    "Agar kode bisa berjalan tanpa koneksi internet",
                    "Untuk mengubah JavaScript menjadi file audio",
                    "Hanya hiasan opsional"
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Atribut type="module" memberitahu browser bahwa file tersebut adalah ES Module, memungkinkan penggunaan statement import/export dan strict mode otomatis.'
                },
                {
                  id: "q-js-f-2",
                  question: 'Di dalam struktur folder "js/", apa peran dari subfolder "modules/" atau "utils/"?',
                  options: [
                    "Menyimpan file video tutorial",
                    "Menyimpan modul-modul fungsi pembantu yang reusable (terpisah dari entry point app.js)",
                    "Menyimpan backup file HTML",
                    "Menghapus variabel otomatis"
                  ],
                  correctAnswerIndex: 1,
                  explanation: "Folder modules/ atau utils/ berfungsi mengumpulkan fungsi-fungsi independen (seperti formatter, validator, kalkulator) agar kode teratur."
                },
                {
                  id: "q-js-f-3",
                  question: 'Apa perbedaan antara "export default" dan "named export (export { ... })"?',
                  options: [
                    "Named export bisa mengekspor banyak fungsi/variabel dalam satu file, sedangkan export default hanya satu nilai utama",
                    "Export default hanya berlaku di browser Safari",
                    "Named export memperlambat eksekusi kode",
                    "Tidak ada perbedaan"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "Named export memungkinkan mengekspor beberapa fungsi dengan nama spesifik ({ fnA, fnB }), sedangkan default export mengekspor satu entitas utama per modul."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "js-level-3",
      title: "Level 3 \u2014 Intermediate",
      description: "Event Listeners (click, submit, input), Array Methods ES6 (map, filter, reduce), dan penyimpanan data lokal browser (localStorage).",
      modules: [
        {
          id: "js-mod-3-1",
          title: "Event Handling & Interaktivitas",
          description: "Merespons tindakan klik mouse, pengetikan keyboard, dan pengiriman form.",
          lessons: [
            {
              id: "js-les-3-1-1",
              title: "Membuat Tombol Counter dengan addEventListener",
              type: "practice",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: "Tambahkan event listener `click` pada tombol untuk menambah nilai counter setiap kali ditekan."
                }
              ],
              starterCode: '<button id="btn-tambah">Tambah Angka</button>\n<p>Nilai: <span id="angka">0</span></p>\n\n<script>\n  let count = 0;\n  const btn = document.getElementById("btn-tambah");\n  const angkaSpan = document.getElementById("angka");\n\n  btn.addEventListener("click", () => {\n    count++;\n    angkaSpan.textContent = count;\n  });\n</script>',
              requirements: [
                {
                  id: "req-event-click",
                  description: "Menggunakan addEventListener dengan event click",
                  validate: (html) => html.includes("addEventListener") && html.includes("click")
                }
              ]
            }
          ]
        },
        {
          id: "js-mod-3-2",
          title: "Array Methods ES6 & LocalStorage",
          description: "Mengolah koleksi data secara fungsional dengan .map() dan .filter(), serta menyimpan ke localStorage.",
          lessons: [
            {
              id: "js-les-3-2-1",
              title: "Filter & Transformasi Data Pelanggan",
              type: "practice",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: "Gunakan `.filter()` untuk mengambil produk dengan harga di bawah 50000, lalu gunakan `.map()` untuk mengambil namanya saja."
                }
              ],
              starterCode: 'const katalog = [\n  { nama: "Buku Catatan", harga: 25000 },\n  { nama: "Tas Ransel", harga: 150000 },\n  { nama: "Pulpen Gel", harga: 12000 },\n  { nama: "Sepatu Olahraga", harga: 350000 }\n];\n\n// Terapkan filter dan map di sini:\nconst barangMurah = katalog\n  .filter(item => item.harga < 50000)\n  .map(item => item.nama);\n\nconsole.log(barangMurah);',
              requirements: [
                {
                  id: "req-array-methods",
                  description: "Menggunakan kombinasi .filter dan .map",
                  validate: (code) => code.includes(".filter") && code.includes(".map")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "js-level-4",
      title: "Level 4 \u2014 Advanced",
      description: "Asynchronous JavaScript: Promises, Async/Await, Fetch API mengonsumsi REST API, Penanganan Error (try/catch), dan Closures.",
      modules: [
        {
          id: "js-mod-4-1",
          title: "Asynchronous JS, Promises & Async/Await",
          description: "Mengeksekusi proses non-blocking (seperti download data) tanpa membuat antarmuka membeku.",
          lessons: [
            {
              id: "js-les-4-1-1",
              title: "Mengambil Data dengan Fetch API & Async/Await",
              type: "practice",
              xpReward: 45,
              content: [
                {
                  type: "markdown",
                  content: "Buat fungsi `async function muatData()` yang melakukan `await fetch(...)` dan membaca `await res.json()` di dalam blok `try/catch`."
                }
              ],
              starterCode: 'async function muatDataPengguna() {\n  try {\n    console.log("Memulai request data...");\n    // Simulasi pengambilan data asynchronous\n    const data = await new Promise(resolve => {\n      setTimeout(() => resolve({ id: 101, username: "aditya_dev" }), 300);\n    });\n    console.log("Data diterima:", data.username);\n    return data;\n  } catch (error) {\n    console.error("Gagal memuat:", error);\n  }\n}\n\nmuatDataPengguna();',
              requirements: [
                {
                  id: "req-async-await",
                  description: "Menggunakan kata kunci async dan await di dalam try/catch",
                  validate: (code) => code.includes("async function") && code.includes("await") && code.includes("try")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "js-level-5",
      title: "Level 5 \u2014 Professional",
      description: "Struktur folder modern JS toolchain (Vite, npm, src-layout, package.json, bundling, linter ESLint, & production builds).",
      modules: [
        {
          id: "js-mod-5-1",
          title: "Struktur Folder Modern Toolchain (Vite, npm, src-layout)",
          description: "Bagaimana frontend engineer modern membangun proyek JavaScript berskala enterprise menggunakan package manager dan bundler.",
          lessons: [
            {
              id: "les-js-5-1-1",
              title: "LEARN: Anatomi Folder Toolchain Modern (Vite / Webpack Layout)",
              type: "learn",
              xpReward: 45,
              content: [
                {
                  type: "markdown",
                  content: `### Standar Toolchain JavaScript Skala Enterprise

Di era modern, developer tidak lagi mengunduh library JavaScript secara manual via link script CDN. Kita menggunakan **npm (Node Package Manager)** dan **Bundler (Vite)** untuk mengelola ribuan dependensi dan menghasilkan berkas produksi yang super cepat.

---

#### Struktur Folder Proyek JavaScript Standar Industri (src-layout):

\`\`\`text
my_modern_app/
\u2502
\u251C\u2500\u2500 node_modules/        # Kumpulan library npm terinstal (di-ignore oleh git)
\u251C\u2500\u2500 .gitignore           # Mengabaikan node_modules/, dist/, .env
\u251C\u2500\u2500 package.json         # Manifest proyek, dependensi, dan script build
\u251C\u2500\u2500 package-lock.json    # Mengunci versi spesifik seluruh dependensi
\u251C\u2500\u2500 vite.config.js       # Konfigurasi bundler Vite
\u251C\u2500\u2500 index.html           # File entrypoint HTML yang memanggil /src/main.js
\u2502
\u251C\u2500\u2500 public/              # Aset statis yang tidak disentuh bundler (favicon, manifest)
\u2502   \u2514\u2500\u2500 favicon.svg
\u2502
\u251C\u2500\u2500 src/                 # [ROOT SOURCE] Seluruh kode aplikasi hidup di sini
\u2502   \u251C\u2500\u2500 main.js          # Entrypoint bundler Vite
\u2502   \u251C\u2500\u2500 style.css        # Global CSS
\u2502   \u2502
\u2502   \u251C\u2500\u2500 api/             # Modul komunikasi HTTP & Fetch client
\u2502   \u2502   \u251C\u2500\u2500 client.js    # Konfigurasi Axios / Fetch instance
\u2502   \u2502   \u2514\u2500\u2500 userApi.js   # Endpoint pemanggilan data pengguna
\u2502   \u2502
\u2502   \u251C\u2500\u2500 components/      # UI generator / renderer komponen
\u2502   \u2502   \u251C\u2500\u2500 Header.js
\u2502   \u2502   \u2514\u2500\u2500 TodoCard.js
\u2502   \u2502
\u2502   \u2514\u2500\u2500 utils/           # Helper murni (formatters, storage, helpers)
\u2502       \u251C\u2500\u2500 formatters.js
\u2502       \u2514\u2500\u2500 storage.js
\u2502
\u2514\u2500\u2500 dist/                # [OUTPUT PRODUKSI] Berkas yang sudah di-minifikasi oleh "npm run build"
    \u251C\u2500\u2500 index.html
    \u2514\u2500\u2500 assets/
        \u251C\u2500\u2500 index-C09f8a.js   # Bundle JS super cepat
        \u2514\u2500\u2500 index-B21d7e.css  # Bundle CSS
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
                  type: "code-example",
                  language: "javascript",
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
              id: "les-js-5-1-2",
              title: "PRACTICE: Arsitektur Service & State Manager",
              type: "practice",
              xpReward: 50,
              content: [
                {
                  type: "markdown",
                  content: [
                    "### Latihan: Pemisahan Service Data & State",
                    "",
                    "Rancang modul `StorageService` yang membungkus operasi baca-tulis array ke memori, dan panggil melalui method `tambahItem(item)` serta `ambilSemua()`."
                  ].join("\n")
                }
              ],
              starterCode: '// Simulasi src/services/storageService.js\nclass StorageService {\n  constructor() {\n    this.items = [];\n  }\n  tambah(item) {\n    this.items.push(item);\n    return this.items.length;\n  }\n  ambil() {\n    return [...this.items];\n  }\n}\n\n// Simulasi src/main.js\nconst storage = new StorageService();\nstorage.tambah({ id: 1, judul: "Belajar Vite Toolchain" });\nstorage.tambah({ id: 2, judul: "Memahami src-layout" });\n\nconst daftar = storage.ambil();\nconsole.log("Total item tersimpan:", daftar.length);\nconsole.log("Item pertama:", daftar[0].judul);',
              requirements: [
                {
                  id: "req-service-cls",
                  description: "Membuat class StorageService dengan method tambah dan ambil",
                  validate: (code) => code.includes("class StorageService") && code.includes("tambah") && code.includes("ambil")
                },
                {
                  id: "req-service-out",
                  description: "Menyimpan dan mencetak total item dengan benar",
                  validate: (code) => code.includes("console.log") && code.includes("daftar.length")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "js-level-6",
      title: "Level 6 \u2014 Project",
      description: "Implementasi proyek nyata berskala penuh: Interactive Task Master / Kanban Board dengan filter kategori, status board, dan persistensi state.",
      modules: [
        {
          id: "js-mod-6-1",
          title: "Capstone Project: Interactive Task Master",
          description: "Membangun aplikasi manajemen tugas dinamis dengan manipulasi DOM, event listener, dan array state.",
          lessons: [
            {
              id: "js-les-6-1-1",
              title: "CAPSTONE: Interactive Task Master Application",
              type: "project",
              xpReward: 150,
              content: [
                {
                  type: "markdown",
                  content: [
                    "### Capstone Project: Interactive Task Master",
                    "",
                    "Bangun aplikasi manajemen tugas interaktif yang mendukung:",
                    "1. Input tugas baru melalui form atau textfield.",
                    "2. Menampilkan daftar tugas di dalam list `<ul>`.",
                    "3. Menghitung total tugas aktif secara dinamis."
                  ].join("\n")
                }
              ],
              starterCode: '<div style="padding: 20px; font-family: sans-serif;">\n  <h2>Task Master Dashboard</h2>\n  <input type="text" id="task-input" placeholder="Tulis tugas baru..." />\n  <button id="add-btn">Tambah</button>\n  <p>Total Tugas: <span id="total-count">0</span></p>\n  <ul id="task-list"></ul>\n</div>\n\n<script>\n  const input = document.getElementById("task-input");\n  const addBtn = document.getElementById("add-btn");\n  const list = document.getElementById("task-list");\n  const totalSpan = document.getElementById("total-count");\n\n  let tasks = [];\n\n  function render() {\n    list.innerHTML = "";\n    tasks.forEach((t, i) => {\n      const li = document.createElement("li");\n      li.textContent = (i + 1) + ". " + t;\n      list.appendChild(li);\n    });\n    totalSpan.textContent = tasks.length;\n  }\n\n  addBtn.addEventListener("click", () => {\n    const text = input.value.trim();\n    if (text) {\n      tasks.push(text);\n      input.value = "";\n      render();\n    }\n  });\n</script>',
              requirements: [
                {
                  id: "req-cap-dom-list",
                  description: "Menggunakan addEventListener pada tombol tambah",
                  validate: (html) => html.includes("addEventListener") && html.includes("click")
                },
                {
                  id: "req-cap-render",
                  description: "Memiliki fungsi render yang memperbarui DOM list dan counter",
                  validate: (html) => html.includes("render()") && html.includes("appendChild")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "js-level-7",
      title: "Level 7 \u2014 Assessment",
      description: "Evaluasi akhir komprehensif: Ujian teori JavaScript (Event Loop, Closure, Scope, Async), tantangan live coding mandiri, dan sertifikasi.",
      modules: [
        {
          id: "js-mod-7-1",
          title: "Comprehensive Knowledge Assessment (Ujian Teori)",
          description: "Ujian komprehensif menguji pemahaman mendalam tentang eksekusi JavaScript engine, asynchronous runtime, dan modularitas.",
          lessons: [
            {
              id: "js-les-7-1-1",
              title: "ASSESSMENT QUIZ: Evaluasi Teori JavaScript Software Engineer",
              type: "quiz",
              xpReward: 50,
              questions: [
                {
                  id: "q-j7-1",
                  question: "Manakah komponen di JavaScript runtime yang bertanggung jawab mengeksekusi asynchronous callback setelah Call Stack kosong?",
                  options: [
                    "Event Loop & Callback Queue",
                    "Memory Heap Garbage Collector",
                    "DOM Parser",
                    "CSS Object Model"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "Event Loop terus memantau Call Stack. Begitu stack kosong, ia mendorong callback dari Callback Queue / Microtask Queue ke Call Stack."
                },
                {
                  id: "q-j7-2",
                  question: 'Apa perbedaan mendasar antara "==" (loose equality) dan "===" (strict equality)?',
                  options: [
                    "=== membandingkan nilai DAN tipe data tanpa melakukan konversi otomatis (type coercion)",
                    "== lebih cepat daripada ===",
                    "=== hanya bisa digunakan untuk angka",
                    "Keduanya sama persis"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "Strict equality (===) memeriksa kesamaan nilai sekaligus tipe data, sedangkan == melakukan konversi tipe data implisit yang rawan bug."
                },
                {
                  id: "q-j7-3",
                  question: 'Dalam struktur proyek toolchain modern, apa fungsi file "package.json"?',
                  options: [
                    "Menyimpan catatan riwayat browsing",
                    "Mendefinisikan metadata proyek, daftar dependensi library luar, dan script otomatis (dev, build, test)",
                    "Mengubah file JS menjadi file PDF",
                    "Tempat meletakkan gambar website"
                  ],
                  correctAnswerIndex: 1,
                  explanation: "package.json adalah manifest utama proyek Node.js/JavaScript modern yang memuat dependensi, versi, dan skrip build."
                },
                {
                  id: "q-j7-4",
                  question: "Apa hasil dari pemanggilan [1, 2, 3].map(x => x * 2)?",
                  options: [
                    "[2, 4, 6]",
                    "[1, 2, 3]",
                    "6",
                    "undefined"
                  ],
                  correctAnswerIndex: 0,
                  explanation: ".map() menghasilkan array baru dengan setiap elemen dikalikan 2."
                },
                {
                  id: "q-j7-5",
                  question: 'Apa arti konsep "Closure" di JavaScript?',
                  options: [
                    "Menutup tab browser secara otomatis",
                    "Sebuah fungsi yang mengingat dan dapat mengakses variabel di scope leksikal luarnya meskipun fungsi luar telah selesai dieksekusi",
                    "Perintah untuk menghapus variabel dari memori",
                    "Error saat memanggil API"
                  ],
                  correctAnswerIndex: 1,
                  explanation: "Closure adalah kombinasi fungsi yang dibundel bersama lingkungan leksikalnya (variabel scope luar yang tetap hidup)."
                }
              ]
            }
          ]
        },
        {
          id: "js-mod-7-2",
          title: "Live Coding Technical Assessment (Ujian Praktik)",
          description: "Ujian live coding mandiri tanpa template: algoritma analitik data dan transformasi inventaris.",
          lessons: [
            {
              id: "js-les-7-2-1",
              title: "FINAL LIVE CODING: Data Transformation & Analytics Engine",
              type: "challenge",
              xpReward: 100,
              content: [
                {
                  type: "markdown",
                  content: [
                    "### Ujian Akhir Praktik: Data Transformation Engine",
                    "",
                    "Selesaikan tantangan analitik data JavaScript berikut!",
                    "",
                    "**Tugas Ujian:**",
                    "Buat fungsi `hitungStatistik(transaksi)` yang menerima array objek transaksi `[{ id, nominal, status }]` dan mengembalikan objek ringkasan:",
                    '1. `totalSukses`: Akumulasi nominal untuk transaksi berstatus "sukses".',
                    "2. `jumlahTransaksi`: Total banyaknya transaksi yang berhasil diproses."
                  ].join("\n")
                }
              ],
              starterCode: 'const dataTransaksi = [\n  { id: 1, nominal: 50000, status: "sukses" },\n  { id: 2, nominal: 120000, status: "sukses" },\n  { id: 3, nominal: 75000, status: "gagal" },\n  { id: 4, nominal: 30000, status: "sukses" }\n];\n\nfunction hitungStatistik(transaksi) {\n  const transaksiSukses = transaksi.filter(t => t.status === "sukses");\n  const totalNominal = transaksiSukses.reduce((acc, curr) => acc + curr.nominal, 0);\n  \n  return {\n    totalSukses: totalNominal,\n    jumlahTransaksi: transaksiSukses.length\n  };\n}\n\nconst hasil = hitungStatistik(dataTransaksi);\nconsole.log("Total Sukses:", hasil.totalSukses);\nconsole.log("Jumlah Transaksi:", hasil.jumlahTransaksi);',
              requirements: [
                {
                  id: "req-exam-calc-fn",
                  description: "Fungsi hitungStatistik menggunakan filter atau reduce untuk menghitung total sukses",
                  validate: (code) => code.includes("hitungStatistik") && (code.includes("filter") || code.includes("reduce"))
                },
                {
                  id: "req-exam-calc-out",
                  description: "Mengembalikan objek dengan properti totalSukses dan jumlahTransaksi",
                  validate: (code) => code.includes("totalSukses") && code.includes("jumlahTransaksi")
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// src/data/pythonCurriculum.ts
var PYTHON_LEVEL_0 = {
  id: "py-level-0",
  title: "Level 0 \u2014 Absolute Beginner",
  description: "Pondasi logika programming, computational thinking, dan cara komputer mengeksekusi kode Python dari nol.",
  modules: [
    {
      id: "py-mod-0-1",
      title: "Modul 1: Mental Model Pemrograman & Computational Thinking",
      description: "Bagaimana komputer berpikir, input-process-output, dan cara menulis baris pertama Python.",
      lessons: [
        {
          id: "py-les-0-1-1",
          title: "LEARN: Bagaimana Komputer Membaca Kodemu?",
          type: "learn",
          xpReward: 15,
          content: [
            {
              type: "markdown",
              content: `### Selamat Datang di Python Coding Academy!

Komputer sebenarnya adalah mesin yang sangat cerdas dalam berhitung, tetapi sangat "polos" dalam memahami instruksi. Komputer tidak bisa menebak apa yang kamu mau \u2014 ia hanya mengeksekusi apa yang kamu perintahkan secara **baris demi baris dari atas ke bawah**.

#### Model Dasar Komputer: Input \u2192 Process \u2192 Output
1. **INPUT**: Data mentah yang masuk (angka, teks dari pengguna, file).
2. **PROCESS**: Komputer memanipulasi data dengan aturan logika (menjumlahkan, membandingkan, mengubah).
3. **OUTPUT**: Hasil akhir yang dikirimkan keluar (menampilkan teks di layar/terminal, menyimpan ke file).

\`\`\`
   \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510      \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510      \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
   \u2502   INPUT   \u2502 \u2500\u2500\u2500> \u2502    PROCESS    \u2502 \u2500\u2500\u2500> \u2502   OUTPUT   \u2502
   \u2502  ("Budi") \u2502      \u2502  gabung teks  \u2502      \u2502 ("Halo Budi")\u2502
   \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518      \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518      \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
\`\`\`

#### Kenapa Memilih Python?
Python dirancang dengan prinsip **Readability Counts** (keterbacaan kode adalah yang utama). Sintaks Python sangat mirip dengan bahasa Inggris sederhana sehingga kamu bisa fokus melatih **problem-solving** tanpa tersandung tanda baca yang rumit.
`
            },
            {
              type: "code-example",
              language: "python",
              code: `# Kode Python pertamamu
print("Halo, calon Software Engineer!")`
            }
          ]
        },
        {
          id: "py-les-0-1-2",
          title: "SEE & RUN: Fungsi print() dan Output Terminal",
          type: "practice",
          language: "python",
          xpReward: 25,
          starterPy: `# Cetak pesan perkenalan ke terminal
print("Selamat datang di Python Academy!")
print("Saya siap belajar programming!")
`,
          hints: [
            "Fungsi print() digunakan untuk mengeluarkan tulisan ke layar terminal.",
            `Teks yang ingin dicetak harus diapit oleh tanda petik ganda "..." atau petik tunggal '...'.`,
            "Klik tombol [Jalankan] atau tekan Ctrl+Enter untuk melihat hasilnya di layar terminal."
          ],
          requirements: [
            {
              id: "py-req-0-1-print",
              description: "Menjalankan fungsi print() minimal dua kali di terminal",
              validate: (code, output) => {
                const count = (code.match(/print\s*\(/g) || []).length;
                return count >= 2 && Boolean(output && output.trim().length > 0);
              }
            }
          ],
          content: [
            {
              type: "markdown",
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
          id: "py-les-0-1-3",
          title: "CHALLENGE: Cetak Kartu Identitas Programmer",
          type: "challenge",
          language: "python",
          xpReward: 35,
          starterPy: `# Tuliskan instruksi print() untuk menampilkan kartu profil programmer
# Baris 1: Nama kamu
# Baris 2: Bahasa yang sedang dipelajari (Python)
# Baris 3: Target impianmu
`,
          hints: [
            'Buat 3 baris print terpisah, misalnya: print("Nama: Alex")',
            'Pastikan setiap kalimat berada di dalam tanda kurung dan tanda petik: print("...")',
            "Pastikan tidak ada tanda petik yang lupa ditutup!"
          ],
          requirements: [
            {
              id: "py-req-0-1-three-prints",
              description: "Memiliki minimal 3 pernyataan print() yang menghasilkan output",
              validate: (code, output) => {
                const prints = (code.match(/print\s*\(/g) || []).length;
                const lines = (output || "").trim().split("\n").filter(Boolean).length;
                return prints >= 3 && lines >= 3;
              }
            },
            {
              id: "py-req-0-1-contains-python",
              description: 'Salah satu output menyebutkan kata "Python"',
              validate: (_code, output) => (output || "").toLowerCase().includes("python")
            }
          ],
          content: [
            {
              type: "markdown",
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
          id: "py-les-0-1-4",
          title: "QUIZ: Cara Kerja Komputer & Python",
          type: "quiz",
          xpReward: 30,
          questions: [
            {
              id: "q-0-1",
              question: "Bagaimana urutan eksekusi kode program Python secara default?",
              options: [
                "Secara acak berdasarkan panjang baris",
                "Dari baris paling bawah ke atas",
                "Baris demi baris berurutan dari atas ke bawah",
                "Hanya baris yang mengandung angka saja"
              ],
              correctAnswerIndex: 2,
              explanation: "Python adalah interpreted language yang mengeksekusi instruksi secara linear dari atas ke bawah."
            },
            {
              id: "q-0-2",
              question: "Apa fungsi utama dari instruksi print() dalam Python?",
              options: [
                "Mencetak dokumen ke mesin printer fisik",
                "Menampilkan teks atau data ke layar terminal/konsol",
                "Menghapus memori komputer",
                "Menghubungkan komputer ke jaringan internet"
              ],
              correctAnswerIndex: 1,
              explanation: "print() adalah fungsi bawaan Python standar untuk menampilkan output teks ke layar konsol/terminal."
            },
            {
              id: "q-0-3",
              question: "Manakah penulisan string teks yang VALID dalam Python?",
              options: [
                "print(Halo Dunia)",
                'print("Halo Dunia")',
                "print<Halo Dunia>",
                "print{Halo Dunia}"
              ],
              correctAnswerIndex: 1,
              explanation: `Teks (string) wajib diapit tanda kurung dan tanda kutip ("..." atau '...').`
            }
          ]
        }
      ]
    },
    {
      id: "py-mod-0-2",
      title: "Modul 2: Variabel & Tipe Data Primitif",
      description: "Memahami memori komputer sebagai kotak penyimpanan data (int, float, str, bool).",
      lessons: [
        {
          id: "py-les-0-2-1",
          title: "LEARN & UNDERSTAND: Analogi Kotak Memori",
          type: "learn",
          xpReward: 20,
          content: [
            {
              type: "markdown",
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
              type: "code-example",
              language: "python",
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
          id: "py-les-0-2-2",
          title: "PRACTICE: Membuat & Menggabungkan Variabel (f-strings)",
          type: "practice",
          language: "python",
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
            "Nilai di dalam kurung kurawal { } akan otomatis digantikan nilainya oleh Python.",
            "Coba ubah nilai variabel jumlah menjadi 5 dan jalankan ulang untuk melihat perhitungannya beradaptasi!"
          ],
          requirements: [
            {
              id: "py-req-fstring",
              description: "Menggunakan f-string (format string) untuk menampilkan variabel",
              validate: (code, output) => {
                return code.includes('f"') || code.includes("f'") && Boolean(output && output.includes("Total"));
              }
            },
            {
              id: "py-req-calculation",
              description: "Menghitung total menggunakan operator perkalian (*)",
              validate: (code) => code.includes("*")
            }
          ],
          content: [
            {
              type: "markdown",
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
          id: "py-les-0-2-3",
          title: "DEBUG: Mengatasi TypeError & NameError",
          type: "practice",
          language: "python",
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
            "NameError terjadi saat kamu memanggil nama variabel yang belum pernah didefinisikan (periksa ejaan: nam vs nama).",
            'TypeError terjadi saat tipe data tidak cocok (misal teks "100" ditambah angka 50).',
            "Gunakan int() untuk mengubah teks angka menjadi bilangan bulat murni."
          ],
          requirements: [
            {
              id: "py-debug-no-error",
              description: "Program berhasil dijalankan tanpa error di terminal",
              validate: (_code, output) => Boolean(output && output.includes("Budi") && output.includes("150"))
            }
          ],
          content: [
            {
              type: "markdown",
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
      id: "py-mod-0-3",
      title: "Modul 3: Logika Keputusan (if, elif, else) & Boolean",
      description: "Mengajarkan komputer mengambil keputusan bercabang berdasarkan kondisi.",
      lessons: [
        {
          id: "py-les-0-3-1",
          title: "LEARN & UNDERSTAND: Algoritma Percabangan",
          type: "learn",
          xpReward: 20,
          content: [
            {
              type: "markdown",
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
              type: "code-example",
              language: "python",
              code: `usia = 18

if usia >= 17:
    print("Sudah memiliki hak membuat KTP & SIM.")
else:
    print("Belum cukup umur untuk membuat KTP.")`
            }
          ]
        },
        {
          id: "py-les-0-3-2",
          title: "CHALLENGE: Sistem Tiket Masuk Bioskop Otomatis",
          type: "challenge",
          language: "python",
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
            "Gunakan operator perbandingan: < (kurang dari), <= (kurang dari sama dengan), > (lebih dari).",
            "Gunakan struktur: if kondisi: ... elif kondisi: ... else: ...",
            "Jangan lupa tanda titik dua (:) di akhir setiap baris if, elif, dan else!"
          ],
          requirements: [
            {
              id: "py-req-if-elif-else",
              description: "Menggunakan struktur lengkap if, elif, dan else",
              validate: (code) => code.includes("if ") && code.includes("elif ") && code.includes("else:")
            },
            {
              id: "py-req-ticket-output",
              description: "Menampilkan harga tiket sesuai umur pada output terminal",
              validate: (_code, output) => Boolean(output && (output.includes("30000") || output.includes("30.000")))
            }
          ],
          content: [
            {
              type: "markdown",
              content: `### Tantangan: Sistem Harga Tiket Bioskop

Buat logika percabangan untuk menentukan harga tiket bioskop berdasarkan variabel \`usia\`.

Ujilah logika kodemu dengan mengubah nilai variabel \`usia\` (misal: 3 tahun, 16 tahun, dan 25 tahun), lalu klik **Jalankan**!`
            }
          ]
        }
      ]
    },
    {
      id: "py-mod-0-4",
      title: "Modul 4: Perulangan (Loops) & Mengotomasi Hal Berulang",
      description: "Gunakan for loop dan while loop untuk memproses data berulang tanpa menulis kode manual berkali-kali.",
      lessons: [
        {
          id: "py-les-0-4-1",
          title: "LEARN & SEE: Kenapa Komputer Benci Hal Manual?",
          type: "learn",
          xpReward: 20,
          content: [
            {
              type: "markdown",
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
              type: "code-example",
              language: "python",
              code: `# Menghitung total jumlah 1 + 2 + 3 + 4 + 5
total = 0
for angka in range(1, 6):
    total = total + angka

print(f"Total penjumlahan: {total}")`
            }
          ]
        },
        {
          id: "py-les-0-4-2",
          title: "PROJECT LEVEL 0: Mesin Kasir & Kalkulator Diskon Otomatis",
          type: "project",
          language: "python",
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
            "Gunakan variabel akumulator: total = total + item di dalam loop.",
            "Diskon 10% sama dengan mengalikan total dengan 0.10 atau (10 / 100).",
            "Jalankan program dan amati bagaimana komputer menghitung 4 barang sekaligus dalam sekejap!"
          ],
          requirements: [
            {
              id: "py-req-proj-loop",
              description: "Menggunakan for loop untuk menghitung total akumulasi",
              validate: (code) => code.includes("for ") && code.includes("total_belanja")
            },
            {
              id: "py-req-proj-discount",
              description: "Menerapkan logika diskon percabangan if-elif-else",
              validate: (code) => code.includes("if ") && code.includes("elif ")
            },
            {
              id: "py-req-proj-output",
              description: "Mencetak struk kasir lengkap dengan subtotal dan total bayar",
              validate: (_code, output) => Boolean(output && output.includes("Subtotal") && output.includes("Total"))
            }
          ],
          content: [
            {
              type: "markdown",
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

// src/data/pythonCurriculumLevel1.ts
var PYTHON_LEVEL_1 = {
  id: "py-level-1",
  title: "Level 1 \u2014 Fundamental",
  description: "Tipe data terstruktur (List, Tuple, Dictionary, Set), fungsi modular (def), dan penanganan error.",
  modules: [
    {
      id: "py-mod-1-1",
      title: "Modul 5: Struktur Data List & Tuple",
      description: "Menyimpan koleksi data, indexing 0-based, slicing, dan manipulasi elemen.",
      lessons: [
        {
          id: "py-les-1-1-1",
          title: "LEARN & UNDERSTAND: Indexing & Slicing di Python",
          type: "learn",
          xpReward: 20,
          content: [
            {
              type: "markdown",
              content: `### Mengapa Butuh List?

Jika kamu memiliki 100 siswa, kamu tidak mungkin membuat 100 variabel terpisah (\`siswa1\`, \`siswa2\`, ...).
Kamu membutuhkan **List**: wadah untuk menyimpan kumpulan item dalam satu tempat.

\`\`\`python
bahasa = ["Python", "JavaScript", "Rust", "Go", "TypeScript"]
\`\`\`

#### 1. Zero-Based Indexing
Di dunia programming, penghitungan posisi selalu dimulai dari angka **0**:
- \`bahasa[0]\` menghasilkan \`"Python"\` (Elemen ke-1)
- \`bahasa[1]\` menghasilkan \`"JavaScript"\` (Elemen ke-2)
- \`bahasa[-1]\` menghasilkan \`"TypeScript"\` (Elemen paling terakhir / negative index)

#### 2. Slicing (Memotong Bagian List: [start:stop])
Kamu bisa mengambil sebagian elemen menggunakan tanda titik dua \`:\`:
- \`bahasa[0:2]\` menghasilkan \`["Python", "JavaScript"]\` (indeks 0 hingga sebelum 2)
- \`bahasa[2:]\` mengambil dari indeks 2 sampai selesai

#### 3. Method Populer List:
- \`.append(item)\`: Menambahkan elemen baru ke urutan paling belakang.
- \`.pop()\`: Menghapus dan mengambil elemen paling belakang.
- \`.sort()\`: Mengurutkan elemen (secara alfabetis atau numerik).
`
            },
            {
              type: "code-example",
              language: "python",
              code: `skills = ["HTML", "CSS"]
skills.append("Python")
print(f"Daftar skill: {skills}")
print(f"Skill pertama: {skills[0]}")
print(f"Jumlah skill: {len(skills)}")`
            }
          ]
        },
        {
          id: "py-les-1-1-2",
          title: "PRACTICE: Manipulasi Data List Mahasiswa",
          type: "practice",
          language: "python",
          xpReward: 30,
          starterPy: `# Data nilai tugas siswa
nilai = [75, 88, 92, 60, 85]

# 1. Tambahkan nilai tugas terbaru (95) ke dalam list menggunakan .append()
nilai.append(95)

# 2. Ambil nilai tertinggi dan terendah
nilai_tertinggi = max(nilai)
nilai_terendah = min(nilai)

# 3. Hitung rata-rata nilai
rata_rata = sum(nilai) / len(nilai)

print(f"Daftar nilai: {nilai}")
print(f"Nilai Tertinggi: {nilai_tertinggi}")
print(f"Nilai Rata-rata: {rata_rata:.1f}")
`,
          hints: [
            "Gunakan nilai.append(95) untuk menambah item baru di akhir list.",
            "Fungsi sum(list) menjumlahkan semua angka di list.",
            "Fungsi len(list) menghitung banyaknya anggota list."
          ],
          requirements: [
            {
              id: "py-req-append",
              description: "Menggunakan method .append() untuk menambah elemen",
              validate: (code) => code.includes(".append(")
            },
            {
              id: "py-req-stats",
              description: "Menghasilkan kalkulasi rata-rata pada output",
              validate: (_code, output) => Boolean(output && output.includes("Rata-rata"))
            }
          ],
          content: [
            {
              type: "markdown",
              content: `### Latihan Praktik: Analisis Nilai Kelas

Gunakan fungsi built-in Python seperti \`sum()\`, \`len()\`, \`max()\`, dan method \`.append()\` untuk mengelola data kelas.

Jalankan kode dan perhatikan bagaimana Python menghitung rata-rata secara presisi!`
            }
          ]
        }
      ]
    },
    {
      id: "py-mod-1-2",
      title: "Modul 6: Dictionary (Key-Value) & Data Mapping",
      description: "Menyimpan data terstruktur seperti JSON/Database menggunakan pasangan kunci dan nilai.",
      lessons: [
        {
          id: "py-les-1-2-1",
          title: "LEARN & PRACTICE: Kamus Data (Key-Value)",
          type: "practice",
          language: "python",
          xpReward: 30,
          starterPy: `# Representasi data profil user dalam Dictionary
user = {
    "username": "coder_id",
    "nama": "Farhan",
    "level": 5,
    "is_premium": True
}

# Mengakses data berdasarkan key (kunci)
print(f"Selamat datang, {user['nama']}!")

# Menambahkan atau memperbarui key
user["xp"] = 1250
user["level"] = 6

print(f"Level saat ini: {user['level']} (XP: {user['xp']})")
`,
          hints: [
            'Dictionary didefinisikan dengan kurung kurawal { "key": nilai }',
            'Akses nilai menggunakan tanda kurung siku: dictionary["nama_key"]',
            "Sangat mirip dengan format JSON di web API modern."
          ],
          requirements: [
            {
              id: "py-req-dict",
              description: "Memiliki struktur dictionary dengan minimal 3 key",
              validate: (code) => code.includes("{") && code.includes("username")
            },
            {
              id: "py-req-dict-output",
              description: "Menampilkan data dari dictionary ke terminal",
              validate: (_code, output) => Boolean(output && output.includes("Farhan"))
            }
          ],
          content: [
            {
              type: "markdown",
              content: `### Apa itu Dictionary?

Jika di List data diakses menggunakan nomor indeks (\`0, 1, 2\`), di **Dictionary** data diakses menggunakan **nama label (Key)**.

\`\`\`python
mobil = {
    "merk": "Toyota",
    "warna": "Hitam",
    "tahun": 2024
}
print(mobil["merk"])  # Output: Toyota
\`\`\`

Dictionary adalah tulang punggung data di internet (REST API, database, konfigurasian).`
            }
          ]
        }
      ]
    },
    {
      id: "py-mod-1-3",
      title: "Modul 7: Fungsi Modular (def) & Scope Variabel",
      description: "Memecah kode menjadi blok-blok reusable (Don't Repeat Yourself), parameter, dan return value.",
      lessons: [
        {
          id: "py-les-1-3-1",
          title: "CHALLENGE: Membuat Fungsi Konversi Suhu & Validasi",
          type: "challenge",
          language: "python",
          xpReward: 40,
          starterPy: `# Buat fungsi bernama celsius_ke_fahrenheit(celsius)
# Rumus: (celsius * 9/5) + 32

def celsius_ke_fahrenheit(celsius):
    hasil = (celsius * 9 / 5) + 32
    return hasil

# Uji fungsi dengan beberapa nilai
suhu_jakarta = 30
suhu_bandung = 22

f_jakarta = celsius_ke_fahrenheit(suhu_jakarta)
f_bandung = celsius_ke_fahrenheit(suhu_bandung)

print(f"{suhu_jakarta}\xB0C = {f_jakarta}\xB0F")
print(f"{suhu_bandung}\xB0C = {f_bandung}\xB0F")
`,
          hints: [
            "Gunakan def nama_fungsi(parameter): untuk membuat fungsi baru.",
            "Jangan lupa kata kunci return untuk mengembalikan hasil perhitungan ke pemanggil fungsi.",
            "Jalankan kode untuk memverifikasi apakah konversi suhu akurat!"
          ],
          requirements: [
            {
              id: "py-req-def-function",
              description: "Mendefinisikan fungsi menggunakan kata kunci def dan return",
              validate: (code) => code.includes("def celsius_ke_fahrenheit") && code.includes("return ")
            },
            {
              id: "py-req-def-output",
              description: "Memanggil fungsi dan mencetak hasil konversi",
              validate: (_code, output) => Boolean(output && output.includes("86") && output.includes("\xB0F"))
            }
          ],
          content: [
            {
              type: "markdown",
              content: `### Prinsip DRY (Don't Repeat Yourself)

Daripada menulis rumus yang sama berulang-ulang, bungkuslah ke dalam sebuah **Function**.

\`\`\`python
def sapa_user(nama):
    return f"Halo {nama}, selamat belajar!"

pesan = sapa_user("Maya")
print(pesan)
\`\`\`

**Tugas Tantangan:**
Lengkapi fungsi \`celsius_ke_fahrenheit\` dan jalankan untuk mengonversi suhu secara instan!`
            }
          ]
        }
      ]
    },
    {
      id: "py-mod-1-4",
      title: "Modul 8: Penanganan Error (try - except)",
      description: "Menjaga program agar tidak crash saat terjadi data anomali atau kesalahan input pengguna.",
      lessons: [
        {
          id: "py-les-1-4-1",
          title: "PROJECT LEVEL 1: Mini Database Nilai & Validator Kontak",
          type: "project",
          language: "python",
          xpReward: 65,
          starterPy: `# =========================================
# FINAL PROJECT LEVEL 1: CONTACT DIRECTORY
# =========================================

buku_telepon = {
    "Andi": "08123456789",
    "Budi": "08987654321",
    "Citra": "08112233445"
}

def cari_nomor(nama):
    try:
        # Coba ambil nomor dari dictionary
        nomor = buku_telepon[nama]
        return f"Kontak {nama}: {nomor}"
    except:
        return f"Peringatan: Kontak '{nama}' tidak ditemukan di sistem!"

# Test pencarian kontak yang ada dan yang tidak ada
print(cari_nomor("Andi"))
print(cari_nomor("Citra"))
print(cari_nomor("Zul"))  # Tidak ada di database
`,
          hints: [
            "Blok try akan mencoba mengeksekusi kode yang berpotensi error.",
            "Blok except akan menangkap error jika terjadi dan menjalankan rencana cadangan tanpa mematikan program.",
            "Jalankan program dan lihat bagaimana pencarian kontak yang hilang ditangani dengan anggun!"
          ],
          requirements: [
            {
              id: "py-proj-try-except",
              description: "Menggunakan blok try dan except untuk error handling",
              validate: (code) => code.includes("try:") && code.includes("except")
            },
            {
              id: "py-proj-dict-lookup",
              description: "Melakukan lookup dictionary dan mengembalikan respons yang sesuai",
              validate: (_code, output) => Boolean(output && output.includes("08123456789") && output.includes("tidak ditemukan"))
            }
          ],
          content: [
            {
              type: "markdown",
              content: `### Proyek Akhir Level 1: Contact Directory & Safe Lookup

Aplikasi dunia nyata tidak boleh langsung crash saat pengguna mencari data yang tidak terdaftar.
Dengan **try-except**, programmu menjadi tangguh (resilient) dan siap digunakan di production!

Jalankan program untuk melihat penanganan pencarian kontak.`
            }
          ]
        }
      ]
    }
  ]
};

// src/data/pythonCurriculumLevel2.ts
var PYTHON_LEVEL_2 = {
  id: "py-level-2",
  title: "Level 2 \u2014 Beginner",
  description: "Struktur folder proyek Python, modularisasi file (__init__.py, import), File I/O, dan pengorganisasian kode bersih.",
  modules: [
    {
      id: "py-mod-2-1",
      title: "Modul 9: Bagaimana Membuat Struktur Folder Proyek Python",
      description: "Dari single-file script menuju proyek multi-file: anatomi folder standar, peran __init__.py, dan cara import antar modul.",
      lessons: [
        {
          id: "py-les-2-1-1",
          title: "LEARN: Anatomi & Standar Struktur Folder Proyek Python",
          type: "learn",
          xpReward: 25,
          content: [
            {
              type: "markdown",
              content: `### Bagaimana Cara Membuat Struktur Folder di Python?

Banyak pemula memulai dengan satu file \`script.py\` yang berisi ratusan baris kode. Seiring aplikasi bertambah besar, menaruh semua kode di satu file membuat kode sulit dibaca, sulit diuji, dan rawan bug.

Di dunia industri, kita memecah kode menjadi **Modul** (file \`.py\` tunggal) dan **Paket** (folder berisi modul-modul).

---

#### 1. Struktur Folder Standar untuk Pemula (Beginner Project)
Untuk proyek skala kecil hingga menengah (misal aplikasi kasir, scraper, atau bot):

\`\`\`text
proyek_pertamaku/
\u2502
\u251C\u2500\u2500 main.py              # Titik masuk utama program (Entry Point)
\u251C\u2500\u2500 config.py            # Konfigurasi aplikasi (konstanta, pengaturan)
\u251C\u2500\u2500 README.md            # Dokumentasi cara menjalankan program
\u2502
\u251C\u2500\u2500 utils/               # Folder fungsi bantuan (Package)
\u2502   \u251C\u2500\u2500 __init__.py      # Menandai folder ini sebagai Python Package
\u2502   \u251C\u2500\u2500 formatters.py    # Fungsi format teks, rupiah, tanggal
\u2502   \u2514\u2500\u2500 validators.py    # Fungsi validasi email, angka, input
\u2502
\u2514\u2500\u2500 data/                # File penyimpanan data
    \u251C\u2500\u2500 database.json    # File data lokal
    \u2514\u2500\u2500 log.txt          # File log aktivitas
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
              type: "code-example",
              language: "python",
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
          id: "py-les-2-1-2",
          title: "PRACTICE: Simulasi Modular Import & Namespacing",
          type: "practice",
          language: "python",
          xpReward: 35,
          starterPy: `# SIMULASI STRUKTUR FOLDER:
# project/
# \u251C\u2500\u2500 utils/
# \u2502   \u2514\u2500\u2500 helper.py    -> modul helper
# \u2514\u2500\u2500 main.py          -> file yang sedang kita jalankan

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
            "Modularisasi memisahkan fungsi kalkulasi (helper) dari alur tampilan utama (main).",
            "Metode statis memungkinkan kita mengorganisir fungsi dalam namespace yang rapi.",
            "Klik Jalankan (Ctrl+Enter) untuk melihat bagaimana modul helper memformat nominal uang secara profesional."
          ],
          requirements: [
            {
              id: "py-req-modular-call",
              description: "Memanggil fungsi helper untuk kalkulasi pajak dan format rupiah",
              validate: (code) => code.includes("hitung_pajak") && code.includes("format_rupiah")
            },
            {
              id: "py-req-modular-out",
              description: "Menghasilkan output struk transaksi yang terformat rapi",
              validate: (_code, output) => Boolean(output && output.includes("TRANSAKSI ELEKTRONIK") && output.includes("Rp250.000"))
            }
          ],
          content: [
            {
              type: "markdown",
              content: `### Memisahkan Tanggung Jawab Kode (Separation of Concerns)

Latihan ini mensimulasikan pemisahan file antara modul utility (\`utils/helper.py\`) dan pengendali alur (\`main.py\`).

Perhatikan bagaimana logika perhitungan dipisahkan sehingga file \`main.py\` tetap bersih dan mudah dibaca!`
            }
          ]
        },
        {
          id: "py-les-2-1-3",
          title: "CHALLENGE: Desain Modul Validator & Config",
          type: "challenge",
          language: "python",
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
            "Gunakan len(email) untuk memeriksa panjang string.",
            "Jalankan untuk memvalidasi daftar email."
          ],
          requirements: [
            {
              id: "py-req-val-email",
              description: "Fungsi validasi_email mengembalikan True untuk format benar dan False untuk salah",
              validate: (code) => code.includes("def validasi_email") && code.includes("@") && code.includes(".")
            },
            {
              id: "py-req-val-output",
              description: "Menampilkan hasil pengujian ketiga email ke terminal",
              validate: (_code, output) => Boolean(output && output.includes("user@mail.com") && output.includes("VALID"))
            }
          ],
          content: [
            {
              type: "markdown",
              content: `### Tantangan: Modul Validator

Dalam folder \`utils/validators.py\`, fungsi-fungsi pemeriksaan input seperti validasi email, password, dan nomor telepon dikumpulkan.

Lengkapi logika fungsi \`validasi_email\` dan jalankan kode untuk memastikan hasilnya tepat!`
            }
          ]
        }
      ]
    },
    {
      id: "py-mod-2-2",
      title: "Modul 10: File I/O & Penanganan Berkas (Data Storage)",
      description: "Membaca, menulis, dan memanipulasi file teks dan JSON secara aman dengan context manager (with open).",
      lessons: [
        {
          id: "py-les-2-2-1",
          title: "LEARN & PRACTICE: Operasi Berkas dengan with open()",
          type: "practice",
          language: "python",
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
            "Pernyataan with open(...) otomatis menutup file setelah selesai, mencegah kebocoran memori (memory leak).",
            'Mode "w" digunakan untuk menulis (write), mode "r" untuk membaca (read), dan mode "a" untuk menambahkan di akhir (append).'
          ],
          requirements: [
            {
              id: "py-req-file-io",
              description: "Memproses teks catatan dan menampilkan baris terformat",
              validate: (_code, output) => Boolean(output && output.includes("SIMULASI MENULIS") && output.includes("Level 2"))
            }
          ],
          content: [
            {
              type: "markdown",
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
      id: "py-mod-2-3",
      title: "Modul 11: Kuis & Proyek Mini Level 2 (Modular App)",
      description: "Uji pemahaman tentang struktur folder, import, dan modul Python.",
      lessons: [
        {
          id: "py-les-2-3-1",
          title: "QUIZ: Struktur Folder & Modul Python",
          type: "quiz",
          xpReward: 35,
          questions: [
            {
              id: "q-2-1",
              question: "Apa fungsi utama dari file __init__.py di dalam sebuah folder Python?",
              options: [
                "Untuk menginstall dependensi dari internet",
                "Menandai folder tersebut sebagai Python Package agar modul di dalamnya bisa di-import",
                "Mengunci folder agar tidak bisa diubah",
                "Menghapus cache komputer"
              ],
              correctAnswerIndex: 1,
              explanation: "__init__.py menandai sebuah direktori sebagai Python package sehingga Python dapat mengenali dan meng-import modul-modul di dalamnya."
            },
            {
              id: "q-2-2",
              question: `Mengapa baris "if __name__ == '__main__':" sangat dianjurkan di file utama?`,
              options: [
                "Agar program bisa berjalan lebih cepat",
                "Mencegah kode utama dieksekusi tanpa sengaja saat file di-import sebagai modul oleh file lain",
                "Wajib ditulis karena aturan compiler",
                "Untuk menyembunyikan kode dari user"
              ],
              correctAnswerIndex: 1,
              explanation: 'Kode di dalam if __name__ == "__main__": hanya akan dijalankan jika file tersebut dieksekusi langsung, bukan saat di-import modul lain.'
            },
            {
              id: "q-2-3",
              question: "Di mana biasanya file konfigurasi atau konstanta disimpan dalam struktur folder proyek?",
              options: [
                "Di file config.py atau folder config/",
                "Di dalam recycle bin",
                "Di folder __pycache__",
                "Di nama file main.exe"
              ],
              correctAnswerIndex: 0,
              explanation: "Standar industri meletakkan konfigurasi di file config.py atau direktori config/ agar mudah dimodifikasi di satu tempat terpusat."
            }
          ]
        }
      ]
    }
  ]
};
var PYTHON_LEVEL_3 = {
  id: "py-level-3",
  title: "Level 3 \u2014 Intermediate",
  description: "Object-Oriented Programming (Class, Object, Inheritance, Encapsulation), Comprehensions, dan Lambda.",
  modules: [
    {
      id: "py-mod-3-1",
      title: "Modul 12: Object-Oriented Programming (OOP) Mendalam",
      description: "Membangun cetak biru data, konstruktor __init__, enkapsulasi, dan pewarisan (inheritance).",
      lessons: [
        {
          id: "py-les-3-1-1",
          title: "LEARN: Blueprint Class & Enkapsulasi Atribut",
          type: "learn",
          xpReward: 30,
          content: [
            {
              type: "markdown",
              content: `### Mengapa Butuh Object-Oriented Programming (OOP)?

Dalam aplikasi berskala besar, data dan fungsi yang memanipulasinya harus disatukan agar tidak tercecer di mana-mana.
Konsep ini disebut **Class (Cetak Biru)** dan **Object (Wujud Nyata)**.

\`\`\`
   [ CLASS: Mobil ]  \u2500\u2500(dibuat jadi)\u2500\u2500>  [ OBJECT: mobil_avanza ]
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
              type: "code-example",
              language: "python",
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
          id: "py-les-3-1-2",
          title: "PRACTICE: Sistem Manajemen Rekening Bank Berbasis OOP",
          type: "practice",
          language: "python",
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
            "Gunakan kata kunci self untuk mengakses atribut dan method milik objek itu sendiri.",
            "Awalan garis bawah seperti self._saldo menandakan atribut bersifat internal (protected).",
            "Jalankan kode untuk menguji transaksi perbankan."
          ],
          requirements: [
            {
              id: "py-req-bank-oop",
              description: "Membuat class RekeningBank dengan method setor, tarik, dan cek_saldo",
              validate: (code) => code.includes("class RekeningBank") && code.includes("def setor") && code.includes("def tarik")
            },
            {
              id: "py-req-bank-out",
              description: "Menghasilkan saldo akhir Rp650,000 pada output",
              validate: (_code, output) => Boolean(output && (output.includes("650,000") || output.includes("650000")))
            }
          ],
          content: [
            {
              type: "markdown",
              content: `### Latihan Praktik: Sistem Perbankan Terenkapsulasi

Terapkan prinsip OOP untuk membuat sistem pengelolaan rekening bank yang aman dari perubahan saldo sembarangan.

Jalankan kode di editor untuk mengamati alur penyetoran dan penarikan saldo!`
            }
          ]
        }
      ]
    },
    {
      id: "py-mod-3-2",
      title: "Modul 13: Functional Tools & List Comprehensions",
      description: "Menulis kode Pythonic yang ringkas, ekspresif, dan efisien dengan list/dict comprehensions.",
      lessons: [
        {
          id: "py-les-3-2-1",
          title: "CHALLENGE: Transformasi & Filter Data Nilai Siswa",
          type: "challenge",
          language: "python",
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
    print(f"\u2713 {nama}")
print(f"Total yang lulus: {len(nama_kapital)} siswa")
`,
          hints: [
            "Sintaks List Comprehension: [rumus for item in iterable if kondisi]",
            "Method .upper() mengubah string menjadi huruf kapital.",
            "Jalankan untuk memvalidasi siswa yang lulus (Dewi, Sarah, Tasya)."
          ],
          requirements: [
            {
              id: "py-req-comp-syntax",
              description: "Menggunakan list comprehension untuk memfilter nilai >= 70",
              validate: (code) => code.includes("[") && code.includes("for ") && code.includes(">= 70")
            },
            {
              id: "py-req-comp-out",
              description: "Menampilkan nama siswa lulus dalam huruf kapital (DEWI, SARAH, TASYA)",
              validate: (_code, output) => Boolean(output && output.includes("DEWI") && output.includes("SARAH") && output.includes("TASYA"))
            }
          ],
          content: [
            {
              type: "markdown",
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

// src/data/pythonCurriculumAdvanced.ts
var PYTHON_LEVEL_4 = {
  id: "py-level-4",
  title: "Level 4 \u2014 Advanced",
  description: "Decorators, Magic Dunder Methods, Type Hinting standar PEP 484, dan arsitektur kode enterprise.",
  modules: [
    {
      id: "py-mod-4-1",
      title: "Modul 14: Decorators & Magic Dunder Methods",
      description: "Memodifikasi perilaku fungsi secara dinamis tanpa mengubah kodenya, serta dunder methods (__str__, __len__, __repr__).",
      lessons: [
        {
          id: "py-les-4-1-1",
          title: "LEARN & PRACTICE: Membuat Function Decorator Kustom",
          type: "practice",
          language: "python",
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
            "Decorator diawali dengan tanda @ di atas definisi fungsi.",
            "*args dan **kwargs memungkinkan fungsi pembungkus menerima argumen apapun secara dinamis.",
            "Jalankan kode untuk melihat bagaimana log dicetak otomatis sebelum dan sesudah fungsi dijalankan!"
          ],
          requirements: [
            {
              id: "py-req-dec-usage",
              description: "Mendefinisikan dan menggunakan decorator log_eksekusi dengan sintaks @",
              validate: (code) => code.includes("@log_eksekusi") && code.includes("def pembungkus")
            },
            {
              id: "py-req-dec-output",
              description: "Menghasilkan log eksekusi otomatis pada output terminal",
              validate: (_code, output) => Boolean(output && output.includes("[LOG] Memulai") && output.includes("80000"))
            }
          ],
          content: [
            {
              type: "markdown",
              content: `### Apa itu Decorator di Python?

Decorator adalah salah satu fitur paling canggih di Python. Decorator memungkinkan kamu menyisipkan fungsionalitas tambahan (seperti logging, pengukur waktu, pengecekan hak akses, autentikasi) ke banyak fungsi tanpa menduplikasi kode.

Jalankan kode di sebelah kanan untuk melihat decorator beraksi!`
            }
          ]
        }
      ]
    },
    {
      id: "py-mod-4-2",
      title: "Modul 15: Type Hinting (PEP 484) & Clean Architecture",
      description: "Menulis kode Python berskala industri yang terverifikasi tipe data, mudah dirawat tim besar, dan bebas bug runtime.",
      lessons: [
        {
          id: "py-les-4-2-1",
          title: "CHALLENGE: Type Hints & Pipeline Pemrosesan Data",
          type: "challenge",
          language: "python",
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
            "Gunakan tanda titik dua : tipe_data setelah nama parameter.",
            "Gunakan tanda panah -> tipe_kembalian sebelum titik dua pada def fungsi.",
            "Jalankan untuk melihat format ringkasan profil user."
          ],
          requirements: [
            {
              id: "py-req-typehints",
              description: "Menerapkan type hinting pada parameter dan return type",
              validate: (code) => code.includes(": str") && code.includes("-> str")
            },
            {
              id: "py-req-typehints-output",
              description: "Mencetak data user terformat dengan role huruf kapital",
              validate: (_code, output) => Boolean(output && output.includes("LEAD_ENGINEER") && output.includes("adit_dev"))
            }
          ],
          content: [
            {
              type: "markdown",
              content: `### Type Hinting untuk Standard Enterprise

Di tim software engineering modern, ribuan baris kode Python dikelola dengan bantuan **Type Hints** agar IDE dan linter (seperti MyPy) dapat mendeteksi kesalahan sebelum kode dirilis ke server produksi.`
            }
          ]
        }
      ]
    }
  ]
};
var PYTHON_LEVEL_5 = {
  id: "py-level-5",
  title: "Level 5 \u2014 Professional",
  description: "Struktur folder produksi industri (src layout, venv, requirements.txt, pyproject.toml), REST API, dan arsitektur backend modular.",
  modules: [
    {
      id: "py-mod-5-1",
      title: "Modul 16: Standar Struktur Folder Industri (Enterprise / Production Layout)",
      description: "Bagaimana engineer profesional menyusun folder proyek skala besar, memisahkan environment, config, source code, dan automated tests.",
      lessons: [
        {
          id: "py-les-5-1-1",
          title: "LEARN: Anatomi Struktur Folder Standar Industri (src-layout)",
          type: "learn",
          xpReward: 35,
          content: [
            {
              type: "markdown",
              content: `### Standar Struktur Folder Python di Tingkat Industri

Ketika kamu bekerja di startup teknologi atau perusahaan software terkemuka, kamu tidak lagi meletakkan semua file di folder root. Komunitas resmi Python (PyPA) merekomendasikan pola **\`src-layout\`** (layout berbasis folder \`src/\`).

---

#### Struktur Folder Lengkap Proyek Produksi (Professional Enterprise Layout):

\`\`\`text
my_python_project/
\u2502
\u251C\u2500\u2500 .venv/                      # Virtual Environment lokal (di-ignore oleh git)
\u251C\u2500\u2500 .env                        # Rahasia & API Key (JANGAN PERNAH di-commit ke Git!)
\u251C\u2500\u2500 .env.example                # Template contoh variabel lingkungan
\u251C\u2500\u2500 .gitignore                  # Berkas pengecualian Git (__pycache__, .venv, dll)
\u251C\u2500\u2500 README.md                   # Dokumentasi lengkap proyek
\u251C\u2500\u2500 requirements.txt            # Daftar library & versi dependensi (pip)
\u251C\u2500\u2500 pyproject.toml              # Konfigurasi build tool modern & metadata proyek
\u2502
\u251C\u2500\u2500 src/                        # [UTAMA] Semua kode aplikasi berada di sini
\u2502   \u2514\u2500\u2500 my_app/                 # Nama package aplikasi
\u2502       \u251C\u2500\u2500 __init__.py         # Inisialisasi package utama
\u2502       \u251C\u2500\u2500 main.py             # Entrypoint utama eksekusi
\u2502       \u2502
\u2502       \u251C\u2500\u2500 core/               # Konfigurasi inti dan koneksi database
\u2502       \u2502   \u251C\u2500\u2500 __init__.py
\u2502       \u2502   \u251C\u2500\u2500 config.py       # Pydantic Settings / Environment loader
\u2502       \u2502   \u2514\u2500\u2500 database.py     # Connection pool / Session manager
\u2502       \u2502
\u2502       \u251C\u2500\u2500 models/             # Definisi skema data & tabel database
\u2502       \u2502   \u251C\u2500\u2500 __init__.py
\u2502       \u2502   \u251C\u2500\u2500 user.py
\u2502       \u2502   \u2514\u2500\u2500 product.py
\u2502       \u2502
\u2502       \u251C\u2500\u2500 services/           # Business Logic murni (logika bisnis aplikasi)
\u2502       \u2502   \u251C\u2500\u2500 __init__.py
\u2502       \u2502   \u251C\u2500\u2500 auth_service.py
\u2502       \u2502   \u2514\u2500\u2500 payment_service.py
\u2502       \u2502
\u2502       \u2514\u2500\u2500 utils/              # Fungsi-fungsi pembantu umum
\u2502           \u251C\u2500\u2500 __init__.py
\u2502           \u2514\u2500\u2500 security.py     # Hashing password, generator token
\u2502
\u2514\u2500\u2500 tests/                      # Kumpulan pengujian otomatis (Unit & Integration Tests)
    \u251C\u2500\u2500 __init__.py
    \u251C\u2500\u2500 conftest.py             # Fixture konfigurasi Pytest
    \u251C\u2500\u2500 test_services.py        # Pengujian fungsi bisnis
    \u2514\u2500\u2500 test_models.py          # Pengujian skema data
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
              type: "code-example",
              language: "python",
              code: `# Simulasi pemanggilan modular dalam arsitektur src-layout
# from my_app.services.auth_service import register_user
# from my_app.core.config import settings

print("Arsitektur src-layout siap memisahkan core, models, services, dan tests!")`
            }
          ]
        },
        {
          id: "py-les-5-1-2",
          title: "PRACTICE: Simulasi Arsitektur Service-Repository Berbasis Folder",
          type: "practice",
          language: "python",
          xpReward: 45,
          starterPy: `# SIMULASI ARSITEKTUR MULTI-LAYER (Layered Architecture):
# src/my_app/
# \u251C\u2500\u2500 models/user.py
# \u251C\u2500\u2500 services/user_service.py
# \u2514\u2500\u2500 main.py

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
            "Arsitektur layered memisahkan Model data dari Logika Bisnis (Service).",
            "Layer Service menjaga agar aturan transaksi (misal saldo tidak boleh minus) tidak tercecer di file UI.",
            "Jalankan simulasi untuk melihat alur transfer saldo."
          ],
          requirements: [
            {
              id: "py-req-service-transfer",
              description: "Menjalankan fungsi registrasi dan transfer antar pengguna",
              validate: (code) => code.includes("daftar_user") && code.includes("transfer")
            },
            {
              id: "py-req-transfer-out",
              description: "Menghasilkan output transaksi transfer berhasil",
              validate: (_code, output) => Boolean(output && output.includes("Transfer Rp40,000") && output.includes("Saldo Budi sekarang: Rp60,000"))
            }
          ],
          content: [
            {
              type: "markdown",
              content: `### Latihan Praktik: Arsitektur Service & Layered Design

Model struktur folder industri memisahkan file menjadi beberapa layer independen. Hal ini membuat aplikasi perbankan, e-commerce, dan fintech dapat diuji secara otomatis tanpa risiko kesalahan data.`
            }
          ]
        }
      ]
    },
    {
      id: "py-mod-5-2",
      title: "Modul 17: REST API & Serialisasi Payload JSON",
      description: "Menghubungkan aplikasi Python dengan klien web/mobile menggunakan standar pertukaran data JSON.",
      lessons: [
        {
          id: "py-les-5-2-1",
          title: "CHALLENGE: Membangun Mock REST API Controller",
          type: "challenge",
          language: "python",
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
            "API modern membungkus data dalam amplop (envelope) meta berisi kode status dan pesan.",
            "Jalankan kode untuk memeriksa format response JSON."
          ],
          requirements: [
            {
              id: "py-req-api-envelope",
              description: "Membuat payload response API dengan format meta dan data",
              validate: (code) => code.includes('"meta"') && code.includes('"data"')
            },
            {
              id: "py-req-api-ok-output",
              description: "Menampilkan respons sukses dengan jumlah item yang tepat",
              validate: (_code, output) => Boolean(output && output.includes("success") && output.includes("Total Item: 2"))
            }
          ],
          content: [
            {
              type: "markdown",
              content: `### Standar API Response di Industri

Backend Python (seperti FastAPI, Django, atau Flask) mengirimkan respon terstruktur dengan payload meta dan data agar frontend (React, Vue, mobile app) dapat mengonsumsinya secara konsisten.`
            }
          ]
        }
      ]
    }
  ]
};

// src/data/pythonCurriculumCapstone.ts
var PYTHON_LEVEL_6 = {
  id: "py-level-6",
  title: "Level 6 \u2014 Project",
  description: "Implementasi proyek nyata berskala penuh: Data Pipeline ETL, Server Monitoring, dan Mesin Rekomendasi E-Commerce.",
  modules: [
    {
      id: "py-mod-6-1",
      title: "Modul 18: Project 1 \u2014 Automated Data Pipeline & Server Log Analyzer (ETL)",
      description: "Membangun pipeline Extract-Transform-Load (ETL) otomatis untuk menganalisis data lalu lintas dan stabilitas server.",
      lessons: [
        {
          id: "py-les-6-1-1",
          title: "CAPSTONE PROJECT 1: Server Log ETL & Anomaly Detector",
          type: "project",
          language: "python",
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
            "ETL adalah singkatan dari Extract, Transform, Load \u2014 pilar utama data engineering.",
            "Gunakan List Comprehension untuk memfilter status HTTP dan latency query.",
            "Jalankan pipeline untuk menghasilkan laporan monitoring server otomatis!"
          ],
          requirements: [
            {
              id: "py-req-etl-calc",
              description: "Menghitung total, sukses, error, dan query lambat",
              validate: (code) => code.includes("total_req") && code.includes("slow_queries") && code.includes("uptime_percentage")
            },
            {
              id: "py-req-etl-output",
              description: "Mencetak laporan eksekutif server monitoring dengan tingkat keberhasilan terformat",
              validate: (_code, output) => Boolean(output && output.includes("LAPORAN KESEHATAN INFRASTRUKTUR") && output.includes("query lambat"))
            }
          ],
          content: [
            {
              type: "markdown",
              content: `### Proyek Nyata: Pipeline Monitoring Log Server

Dalam lingkungan cloud modern, kemampuan memproses ribuan data log secara otomatis adalah keahlian yang sangat dicari.

Jalankan skrip ETL di editor untuk mengolah data dan mendeteksi anomali server secara real-time!`
            }
          ]
        }
      ]
    },
    {
      id: "py-mod-6-2",
      title: "Modul 19: Project 2 \u2014 Mesin Rekomendasi & Inventaris E-Commerce",
      description: "Membangun mesin cerdas pencocokan produk berdasarkan preferensi pelanggan dan ketersediaan stok.",
      lessons: [
        {
          id: "py-les-6-2-1",
          title: "CAPSTONE PROJECT 2: Recommendation Engine & Smart Inventory",
          type: "project",
          language: "python",
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
    print(f"\u2605 {r['nama']} (Rating: {r['rating']} | Stok: {r['stok']} unit) - Rp{r['harga']:,}")
print("====================================================")
`,
          hints: [
            "Filter mengecek kategori, ketersediaan stok > 0, dan batasan budget.",
            "Item dengan stok 0 (habis) otomatis disaring agar tidak mengecewakan pembeli.",
            "Jalankan kode untuk melihat rekomendasi produk yang tersedia."
          ],
          requirements: [
            {
              id: "py-req-rec-engine",
              description: "Membuat fungsi rekomendasi dengan filter kategori, stok > 0, dan rating",
              validate: (code) => code.includes("def cari_rekomendasi") && code.includes("stok") && code.includes("rating")
            },
            {
              id: "py-req-rec-output",
              description: "Menampilkan daftar produk unggulan rekomendasi pada terminal",
              validate: (_code, output) => Boolean(output && output.includes("REKOMENDASI PRODUK UNGGULAN") && output.includes("Laptop Gaming Pro"))
            }
          ],
          content: [
            {
              type: "markdown",
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
var PYTHON_LEVEL_7 = {
  id: "py-level-7",
  title: "Level 7 \u2014 Assessment",
  description: "Evaluasi akhir komprehensif: Ujian teori logika pemrograman, tantangan live coding mandiri, dan sertifikasi kelulusan.",
  modules: [
    {
      id: "py-mod-7-1",
      title: "Modul 20: Comprehensive Knowledge Assessment (Ujian Teori)",
      description: "Ujian komprehensif menguji penguasaan materi dari Level 0 hingga Level 5 (sintaks, struktur folder, OOP, dan error handling).",
      lessons: [
        {
          id: "py-les-7-1-1",
          title: "ASSESSMENT QUIZ: Evaluasi Teori Python Software Engineer",
          type: "quiz",
          xpReward: 50,
          questions: [
            {
              id: "q-7-1",
              question: "Dalam struktur proyek standar industri (src-layout), di folder manakah aturan logika bisnis (business logic) biasanya diletakkan?",
              options: [
                "Di folder public/ atau assets/",
                "Di folder services/ atau core/",
                "Di folder .git/",
                "Di dalam file .gitignore"
              ],
              correctAnswerIndex: 1,
              explanation: "Dalam arsitektur berlapis (layered architecture), aturan dan logika bisnis aplikasi ditempatkan di dalam layer services/ agar independen dari tampilan dan infrastruktur."
            },
            {
              id: "q-7-2",
              question: "Apa peran file __init__.py di dalam subfolder proyek Python?",
              options: [
                "Menghapus file yang tidak terpakai saat build",
                "Menandai direktori tersebut sebagai Python Package agar modul di dalamnya dapat di-import",
                "Mempercepat kecepatan internet komputer",
                "Mengubah kode Python menjadi file biner .exe"
              ],
              correctAnswerIndex: 1,
              explanation: "__init__.py memberitahu Python interpreter bahwa folder tersebut adalah package yang dapat di-import modul-modulnya."
            },
            {
              id: "q-7-3",
              question: "Manakah cara yang benar untuk mendefinisikan type hinting pada fungsi Python modern (PEP 484)?",
              options: [
                "def hitung(angka as int): return string",
                "def hitung(angka: int) -> str: pass",
                "function hitung(int angka): String",
                "def hitung(int: angka) => str:"
              ],
              correctAnswerIndex: 1,
              explanation: 'Standar Python PEP 484 menggunakan format "parameter: tipe" dan "-> tipe_kembalian:".'
            },
            {
              id: "q-7-4",
              question: "Di antara pilihan berikut, manakah struktur perulangan yang menghasilkan list baru secara efisien dalam satu baris (Pythonic)?",
              options: [
                "List Comprehension: [x * 2 for x in data if x > 0]",
                "Goto loop: goto line 10",
                "Recursive print loop",
                "Infinite while statement"
              ],
              correctAnswerIndex: 0,
              explanation: "List comprehension adalah sintaks resmi Python untuk mentransformasi dan memfilter iterable secara ringkas dan berkecepatan tinggi."
            },
            {
              id: "q-7-5",
              question: "Mengapa file .env tidak boleh di-commit ke repositori publik seperti GitHub?",
              options: [
                "Karena file .env membuat ukuran repositori menjadi terlalu berat",
                "Karena file .env berisi rahasia sensitif seperti API key, kata sandi database, dan kredensial server",
                "Karena Python tidak bisa membaca file berawalan titik",
                "Karena file .env hanya bisa dibaca oleh sistem operasi Windows"
              ],
              correctAnswerIndex: 1,
              explanation: ".env menyimpan kredensial rahasia. Mempublikasikannya ke Git dapat membahayakan keamanan sistem server produksi."
            }
          ]
        }
      ]
    },
    {
      id: "py-mod-7-2",
      title: "Modul 21: Live Coding Technical Assessment (Ujian Praktik)",
      description: "Ujian live coding mandiri tanpa template awal: membangun sistem kalkulasi inventaris dan analitik terpadu.",
      lessons: [
        {
          id: "py-les-7-2-1",
          title: "FINAL LIVE CODING: Algoritma Pengolahan Data & Statistik Inventaris",
          type: "challenge",
          language: "python",
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
            "Total aset adalah akumulasi dari (harga * stok) setiap barang.",
            'Gunakan fungsi built-in max(list, key=lambda x: x["harga"]) untuk menemukan barang termahal.',
            "Jalankan kode untuk memverifikasi bahwa total nilai aset mencapai Rp190,000,000."
          ],
          requirements: [
            {
              id: "py-req-final-fn",
              description: "Mendefinisikan fungsi analisis_inventaris yang mengembalikan dictionary laporan",
              validate: (code) => code.includes("def analisis_inventaris") && code.includes("total_nilai_aset")
            },
            {
              id: "py-req-final-out",
              description: "Menghasilkan kalkulasi total nilai aset Rp190,000,000 dan mendeteksi Laptop Workstation",
              validate: (_code, output) => Boolean(output && (output.includes("190,000,000") || output.includes("190000000")) && output.includes("Laptop Workstation"))
            }
          ],
          content: [
            {
              type: "markdown",
              content: `### Ujian Akhir Praktik: Inventory Analytics Engine

Selamat atas perjalanan belajarmu dari **Level 0 (Absolute Beginner)** hingga tahap **Level 7 (Assessment)**!

Selesaikan tantangan analitik inventaris ini untuk membuktikan kemampuan pemecahan masalah (problem-solving) dan pemahaman algoritma Python-mu.

Klik tombol **Jalankan** untuk menguji sistem analitikmu!`
            }
          ]
        },
        {
          id: "py-les-7-2-2",
          title: "CERTIFICATION: Panduan Portofolio GitHub & Kelulusan",
          type: "learn",
          xpReward: 50,
          content: [
            {
              type: "markdown",
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
   \u251C\u2500\u2500 src/
   \u2502   \u2514\u2500\u2500 my_project/
   \u251C\u2500\u2500 tests/
   \u251C\u2500\u2500 requirements.txt
   \u251C\u2500\u2500 .gitignore
   \u2514\u2500\u2500 README.md
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

// src/data/pythonCourse.ts
var PYTHON_COURSE = {
  id: "python-mastery",
  title: "Python 0 \u2192 Mahir & Professional",
  shortDescription: "Kurikulum Python komprehensif 8 jenjang: Absolute Beginner, Fundamental, Beginner, Intermediate, Advanced, Professional, Project, & Assessment.",
  description: "Python Academy dirancang khusus dari nol hingga level profesional. Meliputi struktur folder proyek standar industri, OOP, decorators, clean architecture, terminal sandbox terisolasi, dan evaluasi teknis terpadu.",
  icon: "terminal",
  levels: [
    PYTHON_LEVEL_0,
    PYTHON_LEVEL_1,
    PYTHON_LEVEL_2,
    PYTHON_LEVEL_3,
    PYTHON_LEVEL_4,
    PYTHON_LEVEL_5,
    PYTHON_LEVEL_6,
    PYTHON_LEVEL_7
  ]
};

// src/data/gitCurriculum.ts
var GIT_COURSE = {
  id: "git-mastery",
  title: "Git & GitHub Fundamentals",
  shortDescription: "Kuasai Version Control System standar industri: Git repository, branching, commit, merge, conflict resolution, dan kolaborasi GitHub.",
  description: "Git dan GitHub adalah senjata utama setiap developer profesional. Pelajari bagaimana melacak riwayat kode, berkolaborasi dalam tim, membuat branch, melakukan pull request, dan menangani merge conflict dengan percaya diri.",
  icon: "git",
  levels: [
    {
      id: "git-lvl-0",
      title: "Level 0 \u2014 Version Control Foundations",
      description: "Memahami apa itu Version Control System (VCS), mengapa Git penting, dan alur kerja dasar.",
      modules: [
        {
          id: "git-mod-1",
          title: "Konsep Dasar Git & Repository",
          description: "Working Directory, Staging Area, dan Local Repository.",
          lessons: [
            {
              id: "git-les-1",
              title: "Apa itu Git & Mengapa Developer Membutuhkannya?",
              type: "learn",
              xpReward: 15,
              content: [
                {
                  type: "markdown",
                  content: `### Apa itu Git?

**Git** adalah Distributed Version Control System (VCS) yang mencatat setiap perubahan pada file kode proyekmu.

Dengan Git, kamu bisa:
- **Time Travel:** Kembali ke versi kode sebelumnya jika terjadi error fatal.
- **Branching:** Mengembangkan fitur baru tanpa merusak kode utama yang sedang berjalan di produksi.
- **Team Collaboration:** Bekerja bersama ribuan programmer dalam satu codebase tanpa saling menimpa kode.`
                },
                {
                  type: "code-example",
                  language: "bash",
                  code: `# 3 Area Utama Git:
# 1. Working Directory (file yang sedang kamu edit)
# 2. Staging Area (git add - file yang siap dicatat)
# 3. Repository / Commit History (git commit - snapshot permanen)`
                }
              ]
            },
            {
              id: "git-les-2",
              title: "Latihan: Inisialisasi & Staging",
              type: "practice",
              xpReward: 25,
              language: "web",
              content: [
                {
                  type: "markdown",
                  content: `Mari simulasikan perintah CLI Git di editor. Tulis perintah CLI untuk menginisialisasi repository dan menambahkan semua file ke staging area.`
                }
              ],
              starterCode: `git init
git add .
git commit -m "feat: initial commit"`,
              requirements: [
                {
                  id: "req-git-init",
                  description: "Harus menyertakan git init dan git add",
                  validate: (code) => code.includes("git init") && code.includes("git add")
                }
              ]
            },
            {
              id: "git-les-quiz-1",
              title: "Kuis Konseptual Git",
              type: "quiz",
              xpReward: 30,
              questions: [
                {
                  id: "gq-1",
                  question: "Perintah mana yang digunakan untuk memindahkan perubahan dari Working Directory ke Staging Area?",
                  options: ["git commit", "git add <file>", "git push", "git init"],
                  correctAnswerIndex: 1,
                  explanation: "`git add` memindahkan file dari working tree ke staging area (index) sebelum dibuat snapshot commit."
                },
                {
                  id: "gq-2",
                  question: "Apa fungsi dari perintah `git status`?",
                  options: ["Menghapus repository", "Melihat status file yang dimodifikasi, staged, atau untracked", "Mengirim kode ke GitHub", "Mengubah branch aktif"],
                  correctAnswerIndex: 1,
                  explanation: "`git status` menampilkan status branch saat ini, file apa saja yang berubah, dan apa yang sudah masuk staging area."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "git-lvl-1",
      title: "Level 1 \u2014 Branching, Merging & Remote GitHub",
      description: "Bekerja dengan branches, pull requests, push/pull, dan kolaborasi tim.",
      modules: [
        {
          id: "git-mod-2",
          title: "Branching Strategy & GitHub Workflow",
          description: "Feature branching, pull requests, merge conflict handling.",
          lessons: [
            {
              id: "git-les-3",
              title: "Membuat Branch & Menggabungkan (Merge)",
              type: "learn",
              xpReward: 20,
              content: [
                {
                  type: "markdown",
                  content: `### Branching di Git

Branch memungkinkanmu membuat salinan terisolasi untuk mengerjakan fitur baru tanpa mengganggu branch utama (\`main\`):

\`\`\`bash
# Membuat & beralih ke branch baru
git checkout -b feature/login-page
# atau (Git versi baru):
git switch -c feature/login-page

# Menggabungkan kembali ke main:
git checkout main
git merge feature/login-page
\`\`\``
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// src/data/reactCurriculum.ts
var REACT_COURSE = {
  id: "react-mastery",
  title: "React 0 \u2192 Mahir",
  shortDescription: "Kurikulum React komprehensif 8 jenjang: Absolute Beginner, Fundamental, Beginner, Intermediate, Advanced, Professional, Project, & Assessment.",
  description: "Kuasai library frontend paling populer di industri teknologi modern. Dari konsep deklaratif JSX, manajemen state useState/useEffect, bagaimana membuat struktur folder React standar hingga arsitektur Feature-Sliced Design skala enterprise, capstone project, dan ujian asesmen kelulusan.",
  icon: "react",
  levels: [
    {
      id: "react-level-0",
      title: "Level 0 \u2014 Absolute Beginner",
      description: "Pengenalan paradigma deklaratif React, JSX (JavaScript XML), dan merender elemen komponen pertama.",
      modules: [
        {
          id: "react-mod-0-1",
          title: "Paradigma Komponen & JSX",
          description: "Apa perbedaan pendekatan manipulasi DOM tradisional vs komponen deklaratif React?",
          lessons: [
            {
              id: "react-les-0-1-1",
              title: "Komponen Pertama & Aturan JSX",
              type: "learn",
              xpReward: 20,
              content: [
                {
                  type: "markdown",
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
                  type: "code-example",
                  language: "javascript",
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
              id: "react-les-0-1-2",
              title: "Latihan: Menulis Komponen Profil JSX",
              type: "practice",
              xpReward: 25,
              content: [
                {
                  type: "markdown",
                  content: "Buat komponen fungsi `ProfilApp` yang mengembalikan tag pembungkus `<div>` dengan `<h1>` nama dan `<p>` profesi."
                }
              ],
              starterCode: 'function ProfilApp() {\n  return (\n    <div className="profil-container">\n      <h1>Budi Santoso</h1>\n      <p>Frontend Engineer</p>\n    </div>\n  );\n}\n\n// Ekspor komponen\nexport default ProfilApp;',
              requirements: [
                {
                  id: "req-jsx-return",
                  description: "Komponen mengembalikan elemen JSX dengan h1 dan p",
                  validate: (code) => code.includes("return") && code.includes("<h1>") && code.includes("<p>")
                },
                {
                  id: "req-jsx-classname",
                  description: "Menggunakan atribut className",
                  validate: (code) => code.includes("className=")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "react-level-1",
      title: "Level 1 \u2014 Fundamental",
      description: "Komponen reusable, passing props antar komponen, conditional rendering (operator ternary / &&), dan mapping array dengan key unik.",
      modules: [
        {
          id: "react-mod-1-1",
          title: "Reusable Components & Props",
          description: "Mengirimkan data dari komponen induk (parent) ke komponen anak (child) menggunakan Props.",
          lessons: [
            {
              id: "react-les-1-1-1",
              title: "Membuat Komponen Kartu Dinamis dengan Props",
              type: "practice",
              xpReward: 30,
              content: [
                {
                  type: "markdown",
                  content: "Buat komponen `ProductCard(props)` yang menerima `props.nama` dan `props.harga` lalu menampilkannya secara dinamis."
                }
              ],
              starterCode: 'function ProductCard({ nama, harga, stok }) {\n  return (\n    <div className="card">\n      <h3>{nama}</h3>\n      <p>Harga: Rp{harga.toLocaleString("id-ID")}</p>\n      {stok > 0 ? <span className="ready">Tersedia</span> : <span className="habis">Habis</span>}\n    </div>\n  );\n}\n\nexport default ProductCard;',
              requirements: [
                {
                  id: "req-props-destruct",
                  description: "Komponen menerima props (nama, harga) dan menampilkannya di JSX",
                  validate: (code) => code.includes("nama") && code.includes("harga") && code.includes("{nama}")
                },
                {
                  id: "req-cond-render",
                  description: "Menggunakan conditional rendering ternary atau &&",
                  validate: (code) => code.includes("?") || code.includes("&&")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "react-level-2",
      title: "Level 2 \u2014 Beginner",
      description: "Bagaimana membuat struktur folder proyek React standar (Vite React layout: public, src, components, App.tsx, import/export komponen).",
      modules: [
        {
          id: "react-mod-2-1",
          title: "Bagaimana Membuat Struktur Folder Proyek React (Vite Layout)",
          description: "Dari satu file App.tsx monolitik menuju struktur folder terorganisir: anatomi proyek Vite, folder src/components/, dan aturan impor.",
          lessons: [
            {
              id: "les-react-2-1-1",
              title: "LEARN: Anatomi Folder Proyek React Standar",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Bagaimana Cara Membuat Struktur Folder di Proyek React?

Saat kamu membuat proyek React modern menggunakan Vite (\`npm create vite@latest my-app -- --template react-ts\`), banyak pemula terjebak dengan menaruh ribuan baris kode, semua state, dan puluhan tombol di dalam satu file \`App.tsx\` yang gemuk (*god file*).

---

#### 1. Struktur Folder Standar React (Beginner to Intermediate Layout)

\`\`\`text
my_react_app/
\u2502
\u251C\u2500\u2500 index.html           # File HTML tunggal dengan <div id="root"></div>
\u251C\u2500\u2500 package.json         # Dependensi react, react-dom, script dev/build
\u251C\u2500\u2500 vite.config.ts       # Konfigurasi bundler Vite
\u251C\u2500\u2500 tsconfig.json        # Konfigurasi kompilasi TypeScript
\u2502
\u251C\u2500\u2500 public/              # Berkas statis murni (favicon, logo)
\u2502   \u2514\u2500\u2500 vite.svg
\u2502
\u2514\u2500\u2500 src/                 # [SEMUA KODE REACT KAMU DI SINI]
    \u251C\u2500\u2500 main.tsx         # Render ReactDOM.createRoot() ke #root
    \u251C\u2500\u2500 App.tsx          # Komponen orkestrator tampilan utama
    \u251C\u2500\u2500 index.css        # Styling global & Tailwind CSS
    \u2502
    \u251C\u2500\u2500 components/      # Folder seluruh komponen UI modular
    \u2502   \u251C\u2500\u2500 Navbar.tsx   # Komponen header navigasi
    \u2502   \u251C\u2500\u2500 Footer.tsx   # Komponen kaki halaman
    \u2502   \u251C\u2500\u2500 Button.tsx   # Komponen tombol serbaguna
    \u2502   \u2514\u2500\u2500 Card.tsx     # Komponen kartu konten
    \u2502
    \u251C\u2500\u2500 types.ts         # Definisi interface TypeScript (User, Product)
    \u2514\u2500\u2500 data.ts          # Mock data atau konfigurasi statis awal
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
                  type: "code-example",
                  language: "javascript",
                  code: `// Simulasi struktur modular komponen React
// src/components/Badge.tsx
export function StatusBadge({ status }: { status: "online" | "offline" }) {
  const isOnline = status === "online";
  return (
    <span className={isOnline ? "text-green-600" : "text-gray-400"}>
      {isOnline ? "\u25CF Sedang Aktif" : "\u25CB Offline"}
    </span>
  );
}`
                }
              ]
            },
            {
              id: "les-react-2-1-2",
              title: "PRACTICE: Menyusun Komponen UI Terpisah & Props",
              type: "practice",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: [
                    "### Latihan: Memecah Komponen Terpisah",
                    "",
                    "Simulasikan pemecahan komponen `StatCard` yang menerima props `{ label, value, icon }` dan rendernya di dalam wadah dashboard."
                  ].join("\n")
                }
              ],
              starterCode: '// Simulasi src/components/StatCard.tsx\nfunction StatCard({ label, value }) {\n  return (\n    <div className="stat-card" style={{ border: "1px solid #e2e8f0", padding: "16px", borderRadius: "8px" }}>\n      <span style={{ color: "#64748b", fontSize: "14px" }}>{label}</span>\n      <h2 style={{ fontSize: "24px", margin: "8px 0 0" }}>{value}</h2>\n    </div>\n  );\n}\n\n// Simulasi src/App.tsx\nfunction App() {\n  return (\n    <div className="dashboard-grid" style={{ display: "flex", gap: "16px" }}>\n      <StatCard label="Total Pengguna" value="1.240" />\n      <StatCard label="Pendapatan Bulanan" value="Rp45.000.000" />\n    </div>\n  );\n}\n\nexport default App;',
              requirements: [
                {
                  id: "req-stat-card",
                  description: "Mendefinisikan komponen StatCard dengan props label dan value",
                  validate: (code) => code.includes("StatCard") && code.includes("label") && code.includes("value")
                },
                {
                  id: "req-app-compose",
                  description: "Komponen App memanggil StatCard lebih dari satu kali dengan props berbeda",
                  validate: (code) => code.includes("<StatCard") && code.includes("Total Pengguna")
                }
              ]
            },
            {
              id: "les-react-2-1-3",
              title: "QUIZ: Arsitektur Folder & Komponen React",
              type: "quiz",
              xpReward: 30,
              questions: [
                {
                  id: "q-rc-f-1",
                  question: 'Mengapa memisahkan komponen ke dalam folder "src/components/" sangat dianjurkan dibandingkan menaruh semuanya di App.tsx?',
                  options: [
                    "Mencegah kode menjadi raksasa tak terbaca, mempermudah pengujian, dan memungkinkan komponen dipakai ulang di berbagai tempat",
                    "Agar aplikasi bisa berjalan tanpa koneksi internet",
                    "Karena React akan menampilkan error jika App.tsx melebihi 100 baris",
                    "Hanya aturan estetika tanpa dampak fungsional"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "Prinsip Single Responsibility Principle & Reusability: komponen kecil mandiri di src/components/ jauh lebih mudah dirawat dan diuji."
                },
                {
                  id: "q-rc-f-2",
                  question: "Di dalam struktur folder proyek React Vite, di manakah titik render utama (ReactDOM.createRoot) berada?",
                  options: [
                    "src/main.tsx (atau src/main.jsx)",
                    "public/index.html",
                    "package.json",
                    "src/types.ts"
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'src/main.tsx adalah berkas bootstrap entry point di mana ReactDOM merender komponen App ke dalam tag <div id="root"> di index.html.'
                },
                {
                  id: "q-rc-f-3",
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
      id: "react-level-3",
      title: "Level 3 \u2014 Intermediate",
      description: "Manajemen State dengan useState, formulir terkontrol (controlled inputs), dan menangani efek samping data fetching dengan useEffect.",
      modules: [
        {
          id: "react-mod-3-1",
          title: "State & Interaksi Pengguna (useState)",
          description: "Menyimpan ingatan reaktif komponen yang memperbarui tampilan secara otomatis saat nilainya berubah.",
          lessons: [
            {
              id: "react-les-3-1-1",
              title: "Membuat Formulir Terkontrol dengan State",
              type: "practice",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: 'Gunakan `const [input, setInput] = useState("")` untuk mengontrol nilai input field secara real-time.'
                }
              ],
              starterCode: 'import { useState } from "react";\n\nfunction SimpleForm() {\n  const [nama, setNama] = useState("");\n\n  return (\n    <div>\n      <input\n        type="text"\n        value={nama}\n        onChange={(e) => setNama(e.target.value)}\n        placeholder="Ketik namamu..."\n      />\n      <p>Halo, {nama || "Tamu"}!</p>\n    </div>\n  );\n}\n\nexport default SimpleForm;',
              requirements: [
                {
                  id: "req-use-state",
                  description: "Menggunakan useState untuk mengontrol input value dan onChange",
                  validate: (code) => code.includes("useState") && code.includes("value={nama}") && code.includes("onChange=")
                }
              ]
            }
          ]
        },
        {
          id: "react-mod-3-2",
          title: "Efek Samping & Siklus Hidup (useEffect)",
          description: "Melakukan fetching data dari server, sinkronisasi timer, dan membersihkan efek (cleanup).",
          lessons: [
            {
              id: "react-les-3-2-1",
              title: "Mengambil Data Saat Komponen Dimuat",
              type: "practice",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: "Gunakan `useEffect(() => { ... }, [])` dengan dependency array kosong agar efek hanya berjalan satu kali saat mounting."
                }
              ],
              starterCode: 'import { useState, useEffect } from "react";\n\nfunction UserLoader() {\n  const [loading, setLoading] = useState(true);\n  const [user, setUser] = useState(null);\n\n  useEffect(() => {\n    // Simulasi pengambilan data API satu kali saat mount\n    const timer = setTimeout(() => {\n      setUser({ id: 1, name: "Siti Rahma" });\n      setLoading(false);\n    }, 500);\n\n    return () => clearTimeout(timer);\n  }, []);\n\n  if (loading) return <p>Memuat profil...</p>;\n  return <h3>Selamat Datang, {user.name}!</h3>;\n}\n\nexport default UserLoader;',
              requirements: [
                {
                  id: "req-use-effect",
                  description: "Menggunakan useEffect dengan dependency array []",
                  validate: (code) => code.includes("useEffect(") && code.includes("[]")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "react-level-4",
      title: "Level 4 \u2014 Advanced",
      description: "Global State Management dengan Context API (createContext, useContext) dan membuat Custom Hooks kustom yang elegan.",
      modules: [
        {
          id: "react-mod-4-1",
          title: "Global State dengan Context API",
          description: "Menghindari prop drilling dengan membagikan data autentikasi atau tema ke seluruh hierarki komponen.",
          lessons: [
            {
              id: "react-les-4-1-1",
              title: "Membuat Theme Context Provider",
              type: "practice",
              xpReward: 45,
              content: [
                {
                  type: "markdown",
                  content: "Gunakan `createContext` dan `useContext` untuk menyediakan state tema (light/dark) ke komponen anak."
                }
              ],
              starterCode: 'import { createContext, useContext, useState } from "react";\n\nconst ThemeContext = createContext("light");\n\nexport function ThemeProvider({ children }) {\n  const [theme, setTheme] = useState("dark");\n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n\nexport function useTheme() {\n  return useContext(ThemeContext);\n}',
              requirements: [
                {
                  id: "req-context-api",
                  description: "Menggunakan createContext, Provider, dan useContext",
                  validate: (code) => code.includes("createContext") && code.includes(".Provider") && code.includes("useContext")
                }
              ]
            }
          ]
        },
        {
          id: "react-mod-4-2",
          title: "Membuat Custom Hooks Kustom",
          description: "Mengekstrak logika state yang berulang menjadi reusable hook (misal useDebounce, useLocalStorage).",
          lessons: [
            {
              id: "react-les-4-2-1",
              title: "Membangun Custom Hook useToggle",
              type: "practice",
              xpReward: 45,
              content: [
                {
                  type: "markdown",
                  content: "Buat custom hook `useToggle(initialValue)` yang mengembalikan `[value, toggle]`."
                }
              ],
              starterCode: 'import { useState } from "react";\n\nexport function useToggle(initialState = false) {\n  const [state, setState] = useState(initialState);\n  const toggle = () => setState(prev => !prev);\n  return [state, toggle];\n}\n\n// Contoh penggunaan:\n// const [isOpen, toggleOpen] = useToggle();',
              requirements: [
                {
                  id: "req-custom-hook",
                  description: 'Mendefinisikan fungsi diawali kata "use" dengan useState internal dan fungsi toggle',
                  validate: (code) => code.includes("function useToggle") && code.includes("useState") && code.includes("prev => !prev")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "react-level-5",
      title: "Level 5 \u2014 Professional",
      description: "Arsitektur folder React skala enterprise: Feature-Sliced Design (src/features, services, hooks, types), TypeScript best practices, & state terisolasi.",
      modules: [
        {
          id: "react-mod-5-1",
          title: "Arsitektur Folder Skala Enterprise (Feature-Sliced Design)",
          description: "Bagaimana arsitek frontend mengatur ratusan komponen dan puluhan modul fitur dalam sistem aplikasi produksi besar.",
          lessons: [
            {
              id: "les-react-5-1-1",
              title: "LEARN: Feature-Based vs Layer-Based Architecture",
              type: "learn",
              xpReward: 45,
              content: [
                {
                  type: "markdown",
                  content: `### Standar Arsitektur Folder React Skala Enterprise

Ketika aplikasi React berkembang menjadi produk besar dengan tim puluhan engineer, mengelompokkan file hanya berdasarkan jenisnya (semua komponen di satu folder \`components/\`, semua reducer di \`reducers/\`) akan menyebabkan **Spaghetti Architecture**: kamu harus berpindah-pindah 5 folder berbeda hanya untuk mengubah satu fitur keranjang belanja!

---

#### Struktur Folder Feature-Based (Vertical Slicing / Enterprise Layout):

\`\`\`text
src/
\u2502
\u251C\u2500\u2500 app/                     # Konfigurasi level aplikasi global
\u2502   \u251C\u2500\u2500 router.tsx           # Definisi rute React Router
\u2502   \u2514\u2500\u2500 store.ts             # Redux / Zustand store utama
\u2502
\u251C\u2500\u2500 features/                # [FITUR MODULAR TERISOLASI]
\u2502   \u251C\u2500\u2500 auth/                # Fitur Autentikasi & Login
\u2502   \u2502   \u251C\u2500\u2500 components/      # UI khusus auth (LoginForm.tsx)
\u2502   \u2502   \u251C\u2500\u2500 hooks/           # useAuth.ts
\u2502   \u2502   \u251C\u2500\u2500 services/        # authApi.ts
\u2502   \u2502   \u2514\u2500\u2500 types.ts         # User, AuthCredentials
\u2502   \u2502
\u2502   \u251C\u2500\u2500 cart/                # Fitur Keranjang Belanja
\u2502   \u2502   \u251C\u2500\u2500 components/      # CartDrawer.tsx, CartItem.tsx
\u2502   \u2502   \u251C\u2500\u2500 hooks/           # useCart.ts
\u2502   \u2502   \u2514\u2500\u2500 cartSlice.ts
\u2502   \u2502
\u2502   \u2514\u2500\u2500 catalog/             # Fitur Katalog Produk
\u2502       \u251C\u2500\u2500 components/      # ProductGrid.tsx
\u2502       \u2514\u2500\u2500 catalogService.ts
\u2502
\u251C\u2500\u2500 components/              # Komponen UI global (desain sistem bersama)
\u2502   \u251C\u2500\u2500 Button/
\u2502   \u2502   \u251C\u2500\u2500 Button.tsx
\u2502   \u2502   \u2514\u2500\u2500 Button.test.tsx
\u2502   \u251C\u2500\u2500 Modal/
\u2502   \u2514\u2500\u2500 Input/
\u2502
\u251C\u2500\u2500 hooks/                   # Custom hooks global (useDebounce, useWindowSize)
\u251C\u2500\u2500 services/                # Axios instance global & interceptor token
\u2514\u2500\u2500 types/                   # Interface global bersama
\`\`\`

---

#### Keunggulan Arsitektur Feature-Based:
1. **High Cohesion, Low Coupling**: Semua hal yang berkaitan dengan fitur "cart" hidup di dalam folder \`features/cart/\`. Jika fitur cart dihapus, kamu cukup menghapus satu folder tanpa merusak fitur lainnya!
2. **Onboarding Cepat**: Engineer baru yang ditugaskan memperbaiki bug keranjang belanja langsung tahu ke mana harus mencari berkas.
3. **Pemberian Hak Akses (CODEOWNERS)**: Tim A bisa menjadi pemilik fitur \`features/checkout/\`, sementara Tim B memegang \`features/auth/\`.
`
                },
                {
                  type: "code-example",
                  language: "javascript",
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
              id: "les-react-5-1-2",
              title: "PRACTICE: Merancang Modular Feature Hook & Service",
              type: "practice",
              xpReward: 50,
              content: [
                {
                  type: "markdown",
                  content: [
                    "### Latihan: Isolasi Service dan Hook Fitur",
                    "",
                    "Simulasikan modul fitur terisolasi `useCartFeature` yang mengelola item keranjang belanja dengan method `tambahItem(produk)` dan menghitung `totalHarga` secara otomatis."
                  ].join("\n")
                }
              ],
              starterCode: 'import { useState } from "react";\n\n// Simulasi features/cart/hooks/useCartFeature.ts\nexport function useCartFeature() {\n  const [items, setItems] = useState([]);\n\n  const tambahItem = (produk) => {\n    setItems(prev => [...prev, produk]);\n  };\n\n  const totalHarga = items.reduce((sum, item) => sum + item.harga, 0);\n\n  return {\n    items,\n    totalItems: items.length,\n    totalHarga,\n    tambahItem\n  };\n}',
              requirements: [
                {
                  id: "req-feature-hook",
                  description: "Membuat hook useCartFeature yang mengembalikan items, totalHarga, dan tambahItem",
                  validate: (code) => code.includes("useCartFeature") && code.includes("totalHarga") && code.includes("tambahItem")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "react-level-6",
      title: "Level 6 \u2014 Project",
      description: "Implementasi proyek nyata berskala penuh: Modern E-Commerce Storefront & Dashboard dengan katalog produk, shopping cart counter, dan filter kategori.",
      modules: [
        {
          id: "react-mod-6-1",
          title: "Capstone Project: Modern E-Commerce Dashboard",
          description: "Membangun aplikasi toko online komprehensif yang mengintegrasikan komponen UI, modular state, dan kalkulasi checkout dinamis.",
          lessons: [
            {
              id: "react-les-6-1-1",
              title: "CAPSTONE: Interactive Storefront Dashboard",
              type: "project",
              xpReward: 150,
              content: [
                {
                  type: "markdown",
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
                  id: "req-cap-cart-state",
                  description: "Menggunakan useState untuk menyimpan daftar item keranjang",
                  validate: (code) => code.includes("useState") && code.includes("setCart")
                },
                {
                  id: "req-cap-list-render",
                  description: "Melakukan pemetaan produk menggunakan .map() dengan key unik",
                  validate: (code) => code.includes(".map(") && code.includes("key=")
                },
                {
                  id: "req-cap-calc",
                  description: "Menghitung total harga belanja secara reaktif",
                  validate: (code) => code.includes("reduce") || code.includes("totalBelanja")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "react-level-7",
      title: "Level 7 \u2014 Assessment",
      description: "Evaluasi akhir komprehensif: Ujian teori arsitektur React (Virtual DOM, Rules of Hooks, Reconciliation, Context vs State), live coding mandiri, dan sertifikasi.",
      modules: [
        {
          id: "react-mod-7-1",
          title: "Comprehensive Knowledge Assessment (Ujian Teori)",
          description: "Ujian komprehensif menguji pemahaman mendalam tentang siklus render React, dependency array, dan struktur skala enterprise.",
          lessons: [
            {
              id: "react-les-7-1-1",
              title: "ASSESSMENT QUIZ: Evaluasi Teori React Software Engineer",
              type: "quiz",
              xpReward: 50,
              questions: [
                {
                  id: "q-r7-1",
                  question: "Bagaimana cara kerja Virtual DOM di React untuk mempercepat update tampilan layar?",
                  options: [
                    "React membandingkan Virtual DOM lama dan baru (Diffing Algorithm), lalu hanya mengubah node DOM yang benar-benar berubah ke browser (Reconciliation)",
                    "React menghapus seluruh halaman HTML dan memuat ulang dari awal setiap detik",
                    "Virtual DOM mengubah kode React menjadi video streaming",
                    "Virtual DOM menyimpan file di hard disk pengguna"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "Melalui proses Reconciliation dan Diffing, React meminimalkan operasi berat manipulasi Real DOM di browser dengan hanya memperbarui bagian yang spesifik berubah."
                },
                {
                  id: "q-r7-2",
                  question: 'Manakah dari aturan berikut yang merupakan "Rules of Hooks" wajib di React?',
                  options: [
                    "Hanya panggil Hooks di tingkat atas komponen fungsi (jangan panggil di dalam loop, percabangan kondisi if, atau fungsi bersarang)",
                    "Hooks hanya boleh dipanggil di dalam file HTML",
                    "Setiap komponen wajib memiliki minimal 10 hooks",
                    "Hooks dilarang menggunakan array"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "React mengandalkan urutan pemanggilan hooks yang konsisten di setiap render; oleh karena itu hooks dilarang dipanggil di dalam kondisi if atau loop."
                },
                {
                  id: "q-r7-3",
                  question: 'Dalam arsitektur Feature-Sliced Design pada proyek React enterprise, apa yang disimpan di dalam direktori "src/features/cart/"?',
                  options: [
                    "Semua file gambar seluruh website",
                    "Seluruh komponen, hooks, services, dan types yang khusus berkaitan dengan fungsionalitas keranjang belanja",
                    "File node_modules cadangan",
                    "Konfigurasi compiler Vite"
                  ],
                  correctAnswerIndex: 1,
                  explanation: "Feature-Sliced / Feature-based memadukan seluruh logika, komponen UI, dan tipe yang relevan dengan satu fitur bisnis ke dalam satu direktori terisolasi."
                },
                {
                  id: "q-r7-4",
                  question: "Kapan kamu harus menyertakan variabel di dalam dependency array useEffect(fn, [dep])?",
                  options: [
                    "Setiap variabel atau props yang didefinisikan di luar effect dan digunakan di dalam effect tersebut",
                    "Hanya jika variabel tersebut bernilai angka ganjil",
                    "Tidak pernah, dependency array harus selalu kosong",
                    "Hanya jika variabel tersebut adalah fungsi bawaan browser"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "Sesuai aturan react-hooks/exhaustive-deps, seluruh nilai reaktif dari komponen (props, state) yang dibaca di dalam effect wajib dimasukkan ke dependency array."
                },
                {
                  id: "q-r7-5",
                  question: 'Mengapa dilarang mengubah state secara langsung seperti "state.count = 5"?',
                  options: [
                    "Karena React tidak akan mengetahui bahwa state telah berubah, sehingga komponen tidak akan melakukan re-render",
                    "Karena komputer akan crash",
                    "Karena browser tidak mendukung angka 5",
                    "Hanya preferensi penulisan"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "State di React harus bersifat immutable. Kamu harus memanggil fungsi pembaru (seperti setCount(5)) agar React memicu siklus re-render UI."
                }
              ]
            }
          ]
        },
        {
          id: "react-mod-7-2",
          title: "Live Coding Technical Assessment (Ujian Praktik)",
          description: "Ujian live coding mandiri tanpa template: membangun komponen Todo Manager reaktif dengan filtering status.",
          lessons: [
            {
              id: "react-les-7-2-1",
              title: "FINAL LIVE CODING: Reactive State Management Engine",
              type: "challenge",
              xpReward: 100,
              content: [
                {
                  type: "markdown",
                  content: [
                    "### Ujian Akhir Praktik: Task State Manager",
                    "",
                    "Buktikan keahlian React-mu dengan membangun komponen manajer status reaktif!",
                    "",
                    "**Persyaratan Ujian:**",
                    "1. Gunakan `useState` untuk menyimpan array tugas `[{ id, teks, selesai }]`.",
                    "2. Sediakan fungsi atau tombol untuk menandai status tugas (toggle selesai).",
                    "3. Render daftar tugas dengan mapping `.map()` ber-`key` unik.",
                    "4. Tampilkan penghitung berapa tugas yang sudah selesai."
                  ].join("\n")
                }
              ],
              starterCode: 'import { useState } from "react";\n\nfunction TaskManager() {\n  const [tasks, setTasks] = useState([\n    { id: 1, teks: "Pahami Struktur Folder React", selesai: true },\n    { id: 2, teks: "Kuasai useState & useEffect", selesai: false },\n    { id: 3, teks: "Selesaikan Capstone Project", selesai: false }\n  ]);\n\n  const toggleSelesai = (id) => {\n    setTasks(prev =>\n      prev.map(t => (t.id === id ? { ...t, selesai: !t.selesai } : t))\n    );\n  };\n\n  const totalSelesai = tasks.filter(t => t.selesai).length;\n\n  return (\n    <div style={{ padding: "16px" }}>\n      <h3>Task Progress ({totalSelesai} dari {tasks.length} Selesai)</h3>\n      <ul>\n        {tasks.map(t => (\n          <li key={t.id} style={{ textDecoration: t.selesai ? "line-through" : "none", cursor: "pointer" }} onClick={() => toggleSelesai(t.id)}>\n            {t.teks} {t.selesai ? "\u2705" : "\u23F3"}\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}\n\nexport default TaskManager;',
              requirements: [
                {
                  id: "req-exam-react-state",
                  description: "Menggunakan useState untuk menyimpan array tugas",
                  validate: (code) => code.includes("useState") && code.includes("tasks")
                },
                {
                  id: "req-exam-react-toggle",
                  description: "Memiliki fungsi toggle status tugas secara immutable dengan .map",
                  validate: (code) => code.includes(".map(") && code.includes("!t.selesai")
                },
                {
                  id: "req-exam-react-calc",
                  description: "Menghitung total tugas yang selesai dengan .filter",
                  validate: (code) => code.includes(".filter(") && code.includes("totalSelesai")
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// src/data/backendCurriculum.ts
var BACKEND_COURSE = {
  id: "backend-mastery",
  title: "Backend Development & REST API",
  shortDescription: "Bangun server handal, RESTful API, middleware, autentikasi JWT, validasi input, dan penanganan error standar produksi.",
  description: "Pelajari arsitektur backend modern. Pahami siklus Request-Response, protokol HTTP, status code, routing di Express/Node.js, enkripsi password, dan arsitektur Controller-Service-Repository.",
  icon: "server",
  levels: [
    {
      id: "backend-lvl-0",
      title: "Level 0 \u2014 Backend & HTTP Architecture",
      description: "Bagaimana server bekerja, protokol HTTP, request methods, header, dan response body.",
      modules: [
        {
          id: "backend-mod-1",
          title: "Fondasi Server & Protokol HTTP",
          description: "Client-Server model, HTTP Methods (GET, POST, PUT, DELETE), Status Codes.",
          lessons: [
            {
              id: "backend-les-1",
              title: "Anatomi Request & Response HTTP",
              type: "learn",
              xpReward: 20,
              content: [
                {
                  type: "markdown",
                  content: `### Bagaimana Backend Bekerja?

Backend adalah "dapur" dari sebuah aplikasi web. Ketika browser (klien) meminta data:
1. Browser mengirim **HTTP Request** (Method: GET/POST, URL: \`/api/courses\`, Headers, Body).
2. Server memproses logika (otentikasi, validasi, query database).
3. Server membalas dengan **HTTP Response** (Status Code: 200/404/500, JSON Body).

#### Metode HTTP Utama (CRUD):
- **GET**: Mengambil data (Read).
- **POST**: Membuat data baru (Create).
- **PUT / PATCH**: Mengubah data yang sudah ada (Update).
- **DELETE**: Menghapus data (Delete).`
                },
                {
                  type: "code-example",
                  language: "javascript",
                  code: `// Express.js Route Endpoint
app.get('/api/courses', (req, res) => {
  const courses = [
    { id: 1, title: 'HTML5 Fundamentals', level: 'Beginner' },
    { id: 2, title: 'Modern JavaScript', level: 'Intermediate' }
  ];
  res.status(200).json({ success: true, count: courses.length, data: courses });
});`
                }
              ]
            },
            {
              id: "backend-les-quiz-1",
              title: "Kuis HTTP Status Code & REST",
              type: "quiz",
              xpReward: 25,
              questions: [
                {
                  id: "bq-1",
                  question: "Status code HTTP mana yang tepat ketika klien berhasil membuat data baru di server?",
                  options: ["200 OK", "201 Created", "204 No Content", "301 Moved Permanently"],
                  correctAnswerIndex: 1,
                  explanation: "`201 Created` adalah status code standar REST untuk operasi pembuatan resource baru yang sukses (biasanya method POST)."
                },
                {
                  id: "bq-2",
                  question: "Status code 401 Unauthorized artinya:",
                  options: ["Server mengalami internal crash", "Resource tidak ditemukan", "Klien belum terautentikasi (belum login/token invalid)", "Akses ditolak karena batasan kuota"],
                  correctAnswerIndex: 2,
                  explanation: "`401 Unauthorized` menandakan permintaan gagal karena kredensial autentikasi belum diberikan atau tidak valid."
                },
                {
                  id: "bq-3",
                  question: "Method HTTP apa yang digunakan secara konvensional untuk mengambil data tanpa mengubah state di server?",
                  options: ["POST", "PUT", "DELETE", "GET"],
                  correctAnswerIndex: 3,
                  explanation: "`GET` bersifat idempotent dan safe, digunakan khusus untuk mengambil data."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "backend-lvl-1",
      title: "Level 1 \u2014 Express.js Routing & Parameters",
      description: "Membangun router modular, membaca req.params, req.query, dan req.body.",
      modules: [
        {
          id: "backend-mod-2",
          title: "Routing & Parameter Ekstraksi",
          description: "Membaca URL params (:id), query string (?search=), dan JSON parsing.",
          lessons: [
            {
              id: "backend-les-2",
              title: "Membaca Request Params & Query Strings",
              type: "learn",
              xpReward: 25,
              content: [
                {
                  type: "markdown",
                  content: `### Mengambil Data dari Request

Express menyediakan tiga cara utama untuk membaca masukan pengguna:
- \`req.params\`: Nilai dari placeholder URL seperti \`/api/users/:userId\`
- \`req.query\`: Nilai query string setelah tanda tanya seperti \`/api/products?category=tech&page=2\`
- \`req.body\`: Payload data JSON yang dikirimkan via method POST/PUT (memerlukan middleware \`express.json()\`)`
                },
                {
                  type: "code-example",
                  language: "javascript",
                  code: `const express = require('express');
const app = express();

app.use(express.json()); // Middleware untuk parse body JSON

// 1. URL Parameter
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: \`Mengambil user dengan ID: \${userId}\` });
});

// 2. Query Strings
app.get('/api/search', (req, res) => {
  const { keyword, limit = 10 } = req.query;
  res.json({ search: keyword, limit: Number(limit) });
});`
                }
              ]
            },
            {
              id: "backend-les-quiz-2",
              title: "Kuis Parameter Express.js",
              type: "quiz",
              xpReward: 25,
              questions: [
                {
                  id: "bq-4",
                  question: "Jika route didefinisikan sebagai `/items/:itemId` dan klien memanggil `/items/42`, bagaimana cara mengakses nilai 42 di Express?",
                  options: ["req.body.itemId", "req.query.itemId", "req.params.itemId", "req.headers.itemId"],
                  correctAnswerIndex: 2,
                  explanation: "Parameter yang diawali tanda titik dua (`:`) pada URL pattern dipetakan ke dalam objek `req.params`."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "backend-lvl-2",
      title: "Level 2 \u2014 Middleware & Error Handling",
      description: "Memahami konsep chain of responsibility middleware dan penanganan error terpusat.",
      modules: [
        {
          id: "backend-mod-3",
          title: "Middleware Architecture",
          description: "Logger, Authentication guard, Validator, dan Global Error Handler.",
          lessons: [
            {
              id: "backend-les-3",
              title: "Menulis Custom Middleware & Next Function",
              type: "learn",
              xpReward: 30,
              content: [
                {
                  type: "markdown",
                  content: `### Apa itu Middleware?

Middleware adalah fungsi yang memiliki akses ke object **Request (\`req\`)**, **Response (\`res\`)**, dan fungsi **\`next\`** dalam siklus request-response aplikasi.

Tugas middleware meliputi:
- Menjalankan kode apapun (misal: logging waktu request).
- Mengubah objek request dan response.
- Menghentikan siklus request-response (misal: jika token tidak valid).
- Memanggil middleware berikutnya dalam stack menggunakan \`next()\`.`
                },
                {
                  type: "code-example",
                  language: "javascript",
                  code: `// Middleware Logger Sederhana
const requestLogger = (req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next(); // Lanjutkan ke handler berikutnya
};

app.use(requestLogger);

// Global Error Handler (4 arguments)
app.use((err, req, res, next) => {
  console.error("Internal Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "backend-lvl-3",
      title: "Level 3 \u2014 Autentikasi JWT & Security",
      description: "Enkripsi password dengan bcrypt, JSON Web Token (JWT), dan protected route guards.",
      modules: [
        {
          id: "backend-mod-4",
          title: "Autentikasi & Otorisasi API",
          description: "Hasing bcrypt, penandatanganan JWT token, dan verifikasi header Bearer.",
          lessons: [
            {
              id: "backend-les-4",
              title: "Mekanisme Token JWT (JSON Web Token)",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Bagaimana JWT Bekerja?

1. Klien mengirim email dan password ke \`/api/auth/login\`.
2. Server memvalidasi kredensial (membandingkan hash dengan \`bcrypt.compare\`).
3. Jika valid, server membuat **JWT token** bertandatangan digital (\`jwt.sign({ userId }, SECRET)\`).
4. Klien menyimpan token dan mengirimkannya di setiap request berikutnya via header:
\`\`\`http
Authorization: Bearer <token_string>
\`\`\`
5. Middleware server memverifikasi token (\`jwt.verify\`) sebelum mengizinkan akses ke data privat.`
                },
                {
                  type: "code-example",
                  language: "javascript",
                  code: `const jwt = require('jsonwebtoken');

// Auth Guard Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Akses ditolak: Token tidak ditemukan' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secretKey123', (err, user) => {
    if (err) return res.status(403).json({ success: false, message: 'Token tidak valid / kedaluwarsa' });
    req.user = user;
    next();
  });
};`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "backend-lvl-4",
      title: "Level 4 \u2014 REST Architecture & Best Practices",
      description: "Pola Controller-Service-Repository, paginasi, filter query, dan rate limiting.",
      modules: [
        {
          id: "backend-mod-5",
          title: "Arsitektur Skala Besar & Optimasi API",
          description: "Separation of concerns, paginasi data besar, dan proteksi DoS.",
          lessons: [
            {
              id: "backend-les-5",
              title: "Pola Controller & Paginasi Data",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Best Practice RESTful API

1. **Pola MVC / Controller-Service**: Pisahkan logika routing, validasi, dan akses data.
2. **Paginasi & Limit**: Jangan pernah mengembalikan jutaan data sekaligus. Selalu terapkan \`page\` dan \`limit\`.
3. **CORS (Cross-Origin Resource Sharing)**: Konfigurasikan domain mana yang diizinkan memanggil API Anda.`
                },
                {
                  type: "code-example",
                  language: "javascript",
                  code: `// Contoh implementasi pagination pada endpoint
app.get('/api/v1/articles', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  res.json({
    page,
    limit,
    totalRecords: 120,
    totalPages: Math.ceil(120 / limit),
    data: articles.slice(offset, offset + limit)
  });
});`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "backend-lvl-5",
      title: "Level 5 \u2014 Proyek Nyata Backend",
      description: "Membangun REST API E-Commerce lengkap dengan endpoint publik, privat, dan checkout.",
      modules: [
        {
          id: "backend-mod-6",
          title: "Capstone: E-Commerce RESTful API Service",
          description: "Membangun arsitektur API lengkap dengan Express, Middleware, dan Auth.",
          lessons: [
            {
              id: "backend-les-project",
              title: "Proyek Terpandu: RESTful API Store",
              type: "practice",
              xpReward: 100,
              content: [
                {
                  type: "markdown",
                  content: `### Capstone Project: Backend E-Commerce API

Rancang dan uji coba endpoint API menggunakan **REST API Client & Tester** di menu Playground:
1. \`GET /api/v1/courses\` \u2014 Mengambil katalog
2. \`POST /api/v1/auth/login\` \u2014 Mendapatkan token JWT
3. \`POST /api/v1/challenges/submit\` \u2014 Mengirim tugas dengan Bearer Token
4. \`PUT /api/v1/users/profile\` \u2014 Memperbarui profil pengguna`
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// src/data/databaseCurriculum.ts
var DATABASE_COURSE = {
  id: "database-mastery",
  title: "Database & SQL Engineering",
  shortDescription: "Kuasai pemodelan data relasional, sintaks SQL (SELECT, JOIN, GROUP BY, Indexing), ACID transactions, serta NoSQL document databases.",
  description: "Data adalah inti dari setiap sistem informasi. Pelajari cara merancang skema database ternormalisasi, menulis query SQL yang efisien, membuat relasi foreign key, serta memahami kapan menggunakan database NoSQL / Document Store.",
  icon: "database",
  levels: [
    {
      id: "db-lvl-0",
      title: "Level 0 \u2014 Relational Database & SQL Basics",
      description: "Konsep entitas tabel, primary key, foreign key, dan query CRUD dasar (Create, Read, Update, Delete).",
      modules: [
        {
          id: "db-mod-1",
          title: "Dasar SQL & Querying",
          description: "SELECT, WHERE, ORDER BY, INSERT, UPDATE, DELETE.",
          lessons: [
            {
              id: "db-les-1",
              title: "Pengantar Basis Data & Syntax SQL",
              type: "learn",
              xpReward: 20,
              content: [
                {
                  type: "markdown",
                  content: `### Mengapa Database Sangat Penting?

Database adalah media penyimpanan data yang terstruktur, aman, dan dapat diakses dengan cepat secara bersamaan oleh jutaan pengguna.

**SQL (Structured Query Language)** adalah bahasa universal untuk berinteraksi dengan database relasional seperti PostgreSQL, MySQL, dan SQLite.

#### 4 Operasi Inti CRUD:
1. **CREATE**: \`INSERT INTO tabel (kolom) VALUES (nilai);\`
2. **READ**: \`SELECT kolom FROM tabel WHERE kondisi;\`
3. **UPDATE**: \`UPDATE tabel SET kolom = nilai WHERE kondisi;\`
4. **DELETE**: \`DELETE FROM tabel WHERE kondisi;\``
                },
                {
                  type: "code-example",
                  language: "sql",
                  code: `-- Mengambil data siswa yang aktif dan mengurutkan berdasarkan nama
SELECT id, full_name, email, created_at 
FROM users 
WHERE is_active = true 
ORDER BY full_name ASC 
LIMIT 10;`
                }
              ]
            },
            {
              id: "db-les-quiz-1",
              title: "Kuis Relational Data & SQL Query",
              type: "quiz",
              xpReward: 25,
              questions: [
                {
                  id: "dbq-1",
                  question: "Klausa SQL mana yang digunakan untuk memfilter baris data berdasarkan kondisi tertentu?",
                  options: ["ORDER BY", "GROUP BY", "WHERE", "HAVING"],
                  correctAnswerIndex: 2,
                  explanation: "Klausa `WHERE` digunakan untuk menyaring record yang memenuhi kriteria kondisi tertentu."
                },
                {
                  id: "dbq-2",
                  question: "Kunci unik yang digunakan untuk menghubungkan satu tabel ke tabel lainnya disebut:",
                  options: ["Primary Key", "Foreign Key", "Composite Key", "Candidate Key"],
                  correctAnswerIndex: 1,
                  explanation: "`Foreign Key` adalah field pada satu tabel yang mereferensikan Primary Key dari tabel lain untuk membentuk relasi."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "db-lvl-1",
      title: "Level 1 \u2014 Filtering, Sorting & Operators",
      description: "Operator perbandingan, logika AND/OR, LIKE pattern matching, dan BETWEEN.",
      modules: [
        {
          id: "db-mod-2",
          title: "Advanced Filtering & Pencarian",
          description: "Penggunaan wildcard LIKE, IN, NOT IN, dan fungsi manipulasi teks.",
          lessons: [
            {
              id: "db-les-2",
              title: "Filter Lanjutan dengan LIKE & IN",
              type: "learn",
              xpReward: 25,
              content: [
                {
                  type: "markdown",
                  content: `### Pencarian Data dengan Pattern Matching

- **LIKE '%keyword%'**: Mencari teks yang mengandung string di posisi manapun.
- **IN ('A', 'B', 'C')**: Menyaring data yang nilainya ada dalam sekumpulan daftar.
- **BETWEEN min AND max**: Memfilter rentang nilai (angka atau tanggal).`
                },
                {
                  type: "code-example",
                  language: "sql",
                  code: `-- Mencari pengguna dengan domain email tertentu dan rentang XP
SELECT name, email, xp 
FROM users 
WHERE email LIKE '%@codera.app' 
  AND xp BETWEEN 1000 AND 5000
  AND role IN ('student', 'mentor');`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "db-lvl-2",
      title: "Level 2 \u2014 Aggregations & GROUP BY",
      description: "Fungsi agregat COUNT, SUM, AVG, MIN, MAX, GROUP BY, dan filter HAVING.",
      modules: [
        {
          id: "db-mod-3",
          title: "Agregasi & Analitik Data",
          description: "Meringkas data dalam kelompok menggunakan GROUP BY dan HAVING.",
          lessons: [
            {
              id: "db-les-3",
              title: "Menghitung Statistik dengan GROUP BY",
              type: "learn",
              xpReward: 30,
              content: [
                {
                  type: "markdown",
                  content: `### Perbedaan WHERE vs HAVING:
- **WHERE**: Menyaring baris data **sebelum** proses pengelompokan (GROUP BY).
- **HAVING**: Menyaring kelompok data **setelah** fungsi agregat dihitung.`
                },
                {
                  type: "code-example",
                  language: "sql",
                  code: `-- Menghitung jumlah kursus dan rata-rata harga per kategori
SELECT 
  category,
  COUNT(*) AS total_courses,
  AVG(price) AS average_price
FROM courses
GROUP BY category
HAVING COUNT(*) >= 2;`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "db-lvl-3",
      title: "Level 3 \u2014 Table Relations & JOINs",
      description: "Menghubungkan multitabel dengan INNER JOIN, LEFT JOIN, RIGHT JOIN, dan relasi Many-to-Many.",
      modules: [
        {
          id: "db-mod-4",
          title: "Relasi Antartabel",
          description: "Menggabungkan tabel referensi dan menangani data bernilai NULL.",
          lessons: [
            {
              id: "db-les-4",
              title: "Menggabungkan Data dengan INNER JOIN & LEFT JOIN",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Tipe-Tipe JOIN:
1. **INNER JOIN**: Mengembalikan baris yang memiliki pasangan data yang cocok di kedua tabel.
2. **LEFT JOIN**: Mengembalikan **semua baris** dari tabel kiri, beserta data tabel kanan jika ada (atau NULL jika tidak ada).`
                },
                {
                  type: "code-example",
                  language: "sql",
                  code: `SELECT 
  u.name AS student_name,
  c.title AS course_title,
  e.progress,
  e.status
FROM enrollments e
INNER JOIN users u ON e.user_id = u.id
INNER JOIN courses c ON e.course_id = c.id;`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "db-lvl-4",
      title: "Level 4 \u2014 Database Design, Indexes & ACID",
      description: "Normalisasi data (1NF, 2NF, 3NF), Indexing untuk performa, dan Transaksi ACID.",
      modules: [
        {
          id: "db-mod-5",
          title: "Optimasi & Integritas Transaksi",
          description: "B-Tree Indexes, BEGIN/COMMIT/ROLLBACK, dan pencegahan race conditions.",
          lessons: [
            {
              id: "db-les-5",
              title: "Transaksi Database & Garansi ACID",
              type: "learn",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: `### 4 Pilar ACID:
- **Atomicity**: Seluruh operasi berhasil, atau tidak sama sekali (*all or nothing*).
- **Consistency**: Data selalu mematuhi aturan constraint dan validitas skema.
- **Isolation**: Transaksi konkuren tidak saling merusak proses satu sama lain.
- **Durability**: Data yang sudah di-commit dijamin aman tersimpan di disk permanen.`
                },
                {
                  type: "code-example",
                  language: "sql",
                  code: `BEGIN TRANSACTION;

-- Kurangi saldo pengirim
UPDATE accounts SET balance = balance - 500000 WHERE id = 101;

-- Tambah saldo penerima
UPDATE accounts SET balance = balance + 500000 WHERE id = 202;

-- Catat riwayat transfer
INSERT INTO transfers (from_id, to_id, amount) VALUES (101, 202, 500000);

COMMIT;`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "db-lvl-5",
      title: "Level 5 \u2014 Proyek Nyata Database",
      description: "Mendesain skema database relasional lengkap untuk platform e-commerce / LMS.",
      modules: [
        {
          id: "db-mod-6",
          title: "Capstone: Relational Database Schema Design",
          description: "Praktik langsung query analitik dan pengujian di SQL Interactive Studio.",
          lessons: [
            {
              id: "db-les-project",
              title: "Proyek Terpandu: SQL Query & Relational Schema",
              type: "practice",
              xpReward: 100,
              content: [
                {
                  type: "markdown",
                  content: `### Capstone Project: Database Analytics

Buka **SQL Interactive Studio** di menu Playground dan jalankan query berikut:
1. Query daftar siswa yang aktif dengan XP tertinggi (\`SELECT ... ORDER BY xp DESC\`).
2. Query multitabel menggabungkan data \`users\`, \`courses\`, dan \`enrollments\`.
3. Hitung statistik agregat per kelompok peran (\`GROUP BY role\`).`
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// src/data/fullstackCurriculum.ts
var FULLSTACK_COURSE = {
  id: "fullstack-mastery",
  title: "Full Stack Development",
  shortDescription: "Integrasikan Frontend modern (React/Tailwind), Backend API (Node/Express), Database, dan Deployment ke cloud container.",
  description: "Menjadi engineer serba bisa. Pelajari cara merancang arsitektur end-to-end, menghubungkan antarmuka interaktif dengan API server, menangani session/token otentikasi, mengoptimalkan query, dan meluncurkan aplikasi ke internet.",
  icon: "layers",
  levels: [
    {
      id: "fs-lvl-0",
      title: "Level 0 \u2014 End-to-End Architecture",
      description: "Bagaimana frontend, backend API, database, dan cloud hosting berkolaborasi dalam satu ekosistem produksi.",
      modules: [
        {
          id: "fs-mod-1",
          title: "Integrasi Frontend & Backend",
          description: "CORS, API Contract, State Management & Data Fetching.",
          lessons: [
            {
              id: "fs-les-1",
              title: "Anatomi Aplikasi Web Full Stack Modern",
              type: "learn",
              xpReward: 25,
              content: [
                {
                  type: "markdown",
                  content: `### Siklus Aplikasi Full Stack

Aplikasi full stack menggabungkan tiga pilar penting:
1. **Client Layer (Frontend):** React/Tailwind untuk UI interaktif, validasi form, dan state lokal.
2. **Server Layer (Backend):** Node.js/Express untuk API endpoints, autentikasi aman, dan business logic.
3. **Storage Layer (Database):** SQL/NoSQL untuk persistensi data relasional maupun dokumen.`
                },
                {
                  type: "code-example",
                  language: "typescript",
                  code: `// Frontend fetching dari backend API
async function loadUserData(token: string) {
  const res = await fetch('/api/user/profile', {
    headers: { 
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Unauthorized');
  return await res.json();
}`
                }
              ]
            },
            {
              id: "fs-les-quiz-1",
              title: "Kuis Konsep Full Stack & CORS",
              type: "quiz",
              xpReward: 25,
              questions: [
                {
                  id: "fsq-1",
                  question: "Masalah keamanan apa yang dicegah oleh mekanisme CORS (Cross-Origin Resource Sharing) di browser?",
                  options: [
                    "Mencegah script berbahaya di satu domain mengakses resource di domain lain tanpa izin server",
                    "Mencegah server mengalami kehabisan memori RAM",
                    "Mengenkripsi kode JavaScript di sisi browser",
                    "Mempercepat waktu loading asset gambar"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "CORS adalah mekanisme keamanan browser yang membatasi HTTP request lintas origin (beda domain/port) kecuali server mengizinkannya secara eksplisit."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "fs-lvl-1",
      title: "Level 1 \u2014 Client Data Fetching & State Synchronization",
      description: "Menangani state loading, error, dan caching pada React menggunakan Async Hooks.",
      modules: [
        {
          id: "fs-mod-2",
          title: "Manajemen State Asynchronous",
          description: "Custom hooks data fetching, error boundaries, dan optimistic UI updates.",
          lessons: [
            {
              id: "fs-les-2",
              title: "Pola Data Fetching & Optimistic UI",
              type: "learn",
              xpReward: 30,
              content: [
                {
                  type: "markdown",
                  content: `### 3 State Wajib Saat Fetching:
1. **Loading State**: Tampilkan skeleton atau spinner agar UX terasa responsif.
2. **Success / Data State**: Render data yang diterima dari API server.
3. **Error State**: Tampilkan pesan kesalahan yang manusiawi dan opsi "Coba Lagi" (*Retry*).`
                },
                {
                  type: "code-example",
                  language: "tsx",
                  code: `function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/v1/courses')
      .then(res => res.json())
      .then(data => {
        setCourses(data.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Gagal memuat data kursus');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Memuat data...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-2 gap-4">
      {courses.map(c => <div key={c.id}>{c.title}</div>)}
    </div>
  );
}`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "fs-lvl-2",
      title: "Level 2 \u2014 Full Stack Authentication & Protected Routes",
      description: "Menyimpan token autentikasi, Refresh Token rotation, dan Protected Routes di React.",
      modules: [
        {
          id: "fs-mod-3",
          title: "Sistem Login & Keamanan End-to-End",
          description: "Auth Context Provider, interceptor Axios/Fetch, dan redirect login otomatis.",
          lessons: [
            {
              id: "fs-les-3",
              title: "Membangun React Auth Provider",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Alur Autentikasi Full Stack:
1. Form Login di React mengirim POST request dengan email dan password.
2. Server merespon dengan token JWT dan data profil user.
3. React menyimpan token di secure storage / memory dan mengupdate \`AuthContext\`.
4. Komponen \`<ProtectedRoute>\` memeriksa keberadaan user sebelum merender halaman rahasia.`
                },
                {
                  type: "code-example",
                  language: "tsx",
                  code: `const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "fs-lvl-3",
      title: "Level 3 \u2014 Realtime WebSockets & Push Updates",
      description: "Komunikasi dua arah secara real-time tanpa polling berkala menggunakan WebSocket.",
      modules: [
        {
          id: "fs-mod-4",
          title: "Komunikasi Dua Arah Real-time",
          description: "Event broadcasting, chat room, notifikasi instan, dan live leaderboard.",
          lessons: [
            {
              id: "fs-les-4",
              title: "Menerapkan WebSocket di Frontend & Backend",
              type: "learn",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: `### Mengapa WebSocket?

Berbeda dengan HTTP biasa yang bersifat *request-response* satu arah, **WebSocket** membuka koneksi persisten TCP sehingga server dapat mengirimkan data ke browser kapanpun ada perubahan secara instan.`
                },
                {
                  type: "code-example",
                  language: "typescript",
                  code: `// React WebSocket Listener
useEffect(() => {
  const socket = new WebSocket('wss://api.codera.dev/ws');
  
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'NEW_ACHIEVEMENT') {
      triggerConfetti(data.payload);
    }
  };

  return () => socket.close();
}, []);`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "fs-lvl-4",
      title: "Level 4 \u2014 Deployment, Containers & CI/CD",
      description: "Membungkus aplikasi dengan Docker Container, variabel environment, dan deploy ke Cloud.",
      modules: [
        {
          id: "fs-mod-5",
          title: "Production Build & Containerization",
          description: "Multi-stage Dockerfile, Nginx reverse proxy, dan zero-downtime deployment.",
          lessons: [
            {
              id: "fs-les-5",
              title: "Prinsip 12-Factor App & Environment Variables",
              type: "learn",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: `### Menjaga Rahasia & Keamanan Produksi:
- Jangan pernah menyimpan \`API_KEY\` atau \`DATABASE_URL\` di kode frontend yang ter-bundle.
- Gunakan file \`.env\` di sisi server.
- Terapkan rate limiting dan sanitasi input untuk mencegah XSS dan SQL Injection.`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "fs-lvl-5",
      title: "Level 5 \u2014 Capstone Full Stack Applications",
      description: "Membangun aplikasi full-stack lengkap dari frontend, API backend, hingga database relasional.",
      modules: [
        {
          id: "fs-mod-6",
          title: "Capstone: Production Full-Stack Application",
          description: "Integrasi lengkap React, Express, Database SQL, dan REST API Client.",
          lessons: [
            {
              id: "fs-les-project",
              title: "Proyek Terpandu: CODERA Learning Management System",
              type: "practice",
              xpReward: 120,
              content: [
                {
                  type: "markdown",
                  content: `### Capstone Full Stack Project: LMS Platform

Bangun dan uji coba seluruh komponen aplikasi:
1. **Frontend**: Antarmuka React 18 dengan dashboard siswa dan tracking kemajuan.
2. **Backend**: Express API dengan middleware otentikasi JWT dan paginasi data.
3. **Database**: Skema SQL relasional menghubungkan tabel pengguna, kursus, dan pendaftaran.`
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// src/data/continuousEngineeringCurriculum.ts
var CONTINUOUS_ENGINEERING_COURSE = {
  id: "engineering-fundamentals",
  title: "Engineering & Testing Fundamentals",
  shortDescription: "Pondasi sistem komputer, web protocols, clean code, modular software architecture, dan automated testing QA.",
  description: "Programmer sejati tidak sekadar menulis kode yang jalan, tetapi merancang software yang modular, dapat diuji (testable), andal, dan siap menghadapi beban produksi dunia nyata.",
  icon: "cpu",
  levels: [
    {
      id: "eng-lvl-1",
      title: "Stage 01 \u2014 Computer & Web Fundamentals",
      description: "Pahami apa yang sebenarnya terjadi saat browser memuat website: memori, CPU, proses sistem operasi, DNS, TCP/IP, dan protokol HTTP/HTTPS.",
      modules: [
        {
          id: "eng-mod-os",
          title: "Sistem Operasi, Memori & CLI",
          description: "Cara komputer mengeksekusi program dari file disk ke memori RAM dan CPU.",
          lessons: [
            {
              id: "eng-les-comp-arch",
              title: "Anatomi Komputer: CPU, RAM, & Proses OS",
              type: "learn",
              xpReward: 30,
              content: [
                {
                  type: "markdown",
                  content: `### Bagaimana Komputer Menjalankan Kode Anda?

Ketika Anda menjalankan perintah seperti \`node server.js\` atau \`python app.py\`, terjadi serangkaian langkah sistem operasi (OS) tingkat rendah:

1. **Storage (Disk):** Kode Anda tersimpan sebagai file teks di hard disk atau SSD.
2. **OS Loader & RAM:** OS mengalokasikan ruang memori di RAM, memuat runtime interpreter, lalu membaca file kode ke dalam memori.
3. **Process & Thread:** OS membuat **Process** baru dengan Process ID (PID) unik, memori terisolasi (Virtual Memory), call stack, dan heap.
4. **CPU Execution:** CPU mengeksekusi instruksi per siklus clock (*fetch, decode, execute*).

> **Prinsip Utama:** Kode yang boros memori (memory leak) atau loop tak terbatas (infinite loop) akan menguras kapasitas RAM dan memonopoli core CPU, menyebabkan sistem lambat atau crash (OOM - Out of Memory).`
                },
                {
                  type: "code-example",
                  language: "bash",
                  code: `# Memeriksa proses yang sedang berjalan di terminal Linux/macOS
ps aux | grep node

# Memantau konsumsi CPU & RAM secara real-time
top -o %CPU
htop`
                }
              ]
            },
            {
              id: "eng-quiz-comp",
              title: "Kuis Fondasi Komputer & Memori",
              type: "quiz",
              xpReward: 25,
              questions: [
                {
                  id: "eq-1",
                  question: "Apa perbedaan utama antara memori RAM dan Storage (SSD/Hard Disk) saat sebuah aplikasi berjalan?",
                  options: [
                    "RAM bersifat non-volatile dan permanen, sedangkan SSD sementara.",
                    "RAM adalah memori volatil berkecepatan tinggi tempat kode dan variabel aktif dieksekusi CPU.",
                    "RAM hanya digunakan untuk menyimpan kode sumber teks tanpa data variabel.",
                    "RAM tidak dipengaruhi oleh memory leaks aplikasi."
                  ],
                  correctAnswerIndex: 1,
                  explanation: "RAM (Random Access Memory) adalah memori volatil berkecepatan tinggi yang menyimpan proses aktif dan data runtime yang diakses langsung oleh CPU."
                }
              ]
            }
          ]
        },
        {
          id: "eng-mod-web-net",
          title: "Internet, DNS & Siklus HTTP Request/Response",
          description: "Perjalanan paket data dari input URL di address bar hingga halaman ter-render sempurna.",
          lessons: [
            {
              id: "eng-les-http-journey",
              title: "Apa yang Terjadi Saat Membuka Website?",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Siklus Lengkap Kunjungan Web (The Web Request Journey)

Saat pengguna mengetik \`https://academy.codera.id\` di browser:

1. **DNS Lookup (Domain Name System):**
   Browser menanyakan alamat IP server ke DNS resolver (buku telepon internet). Contoh: \`academy.codera.id\` -> \`104.21.58.12\`.
2. **TCP 3-Way Handshake:**
   Client dan Server melakukan sinkronisasi koneksi melalui paket: \`SYN\` -> \`SYN-ACK\` -> \`ACK\`.
3. **TLS/SSL Handshake (HTTPS):**
   Client dan server menegosiasikan enkripsi simetris menggunakan sertifikat publik server agar data tahan dari sniffing (Man-in-the-Middle).
4. **HTTP Request Header & Body:**
   Browser mengirim permintaan HTTP dengan metode (GET, POST, PUT, DELETE), header (\`User-Agent\`, \`Accept\`, \`Cookie\`), dan optional body.
5. **Server Processing & HTTP Response:**
   Server memproses logic, membaca database, lalu mengembalikan status code (200 OK, 404 Not Found, 500 Server Error) beserta header dan HTML/JSON payload.
6. **Critical Rendering Path:**
   Browser membangun DOM Tree, CSSOM Tree, Render Tree, menghitung Layout (Reflow), dan mengecat piksel ke layar (Painting).`
                },
                {
                  type: "code-example",
                  language: "http",
                  code: `GET /api/v1/lessons HTTP/1.1
Host: academy.codera.id
User-Agent: Mozilla/5.0
Accept: application/json
Authorization: Bearer eyJhbGciOi...

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 342
Cache-Control: public, max-age=3600
Strict-Transport-Security: max-age=63072000; includeSubDomains

{"status":"success","count":24}`
                }
              ]
            },
            {
              id: "eng-quiz-http",
              title: "Kuis Protokol HTTP & Status Codes",
              type: "quiz",
              xpReward: 25,
              questions: [
                {
                  id: "ehq-1",
                  question: "Manakah HTTP Status Code yang paling tepat saat client mencoba mengakses data tanpa menyertakan token otentikasi yang valid?",
                  options: [
                    "200 OK",
                    "401 Unauthorized",
                    "404 Not Found",
                    "500 Internal Server Error"
                  ],
                  correctAnswerIndex: 1,
                  explanation: "HTTP 401 Unauthorized menunjukkan bahwa permintaan belum diautentikasi atau kredensial yang disertakan tidak valid."
                },
                {
                  id: "ehq-2",
                  question: "Apa fungsi utama dari enkripsi TLS dalam protokol HTTPS?",
                  options: [
                    "Mempercepat kecepatan download aset gambar.",
                    "Menjamin kerahasiaan (confidentiality) dan integritas data antara browser dan server dari penyadapan pihak ketiga.",
                    "Menghapus kebutuhan akan backend server.",
                    "Menggantikan fungsi database relasional."
                  ],
                  correctAnswerIndex: 1,
                  explanation: "TLS (Transport Layer Security) mengenkripsi saluran komunikasi TCP sehingga data sensitif seperti password dan session cookie tidak dapat dibaca atau dimanipulasi oleh penyadap di jaringan."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "eng-lvl-2",
      title: "Stage 02 \u2014 Software Engineering Fundamentals",
      description: "Sebuah program yang berjalan sukses belum tentu merupakan software yang baik. Pelajari clean code, modularitas, error handling, dan konfigurasi lingkungan.",
      modules: [
        {
          id: "eng-mod-cleancode",
          title: "Clean Code & Separation of Concerns",
          description: "Struktur kode yang mudah dibaca rekan tim, mudah diuji, dan tidak mudah rusak saat diperluas.",
          lessons: [
            {
              id: "eng-les-modular-arch",
              title: "Prinsip Modularitas & Clean Architecture",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### "A Program That Runs is Not Automatically Good Software"

Software engineering adalah seni membangun sistem yang tahan lama (*maintainable*). 

#### 1. Single Responsibility Principle (SRP)
Satu fungsi atau modul sebaiknya hanya memiliki satu alasan untuk berubah. Jangan menggabungkan validasi input, query database, format HTML, dan kirim email dalam satu fungsi 200 baris!

#### 2. Naming Conventions yang Deskriptif
Hindari variabel satu huruf (\`x\`, \`temp\`, \`data2\`). Gunakan nama yang mengekspresikan maksud bisnis:
- Buruk: \`const d = 86400;\`
- Baik: \`const SECONDS_PER_DAY = 86400;\`
- Buruk: \`function chk(u) { ... }\`
- Baik: \`function isUserEligibleForDiscount(user: User): boolean { ... }\`

#### 3. Configuration Management & Environment Variables
**Pantangan Keras:** Jangan pernah menaruh credential database atau API Secret langsung di dalam kode (*hardcoded*). Gunakan Environment Variables (\`.env\`).`
                },
                {
                  type: "code-example",
                  language: "typescript",
                  code: `// \u274C Kode Buruk (Terkopling dan Hardcoded Secret)
function handleSignup(req: any) {
  const dbPass = "admin12345"; // BAHAYA: Hardcoded credential
  if (!req.body.email.includes("@")) return "Error";
  // Campur query database dan kirim email di satu tempat...
}

// \u2705 Kode Bersih (Separation of Concerns & Env Config)
import { config } from './config';
import { validateEmail } from './validators';
import { userRepository } from './repositories/userRepository';
import { emailService } from './services/emailService';

export async function registerNewUser(input: UserRegistrationDTO) {
  validateEmail(input.email);
  const user = await userRepository.create(input);
  await emailService.sendWelcomeEmail(user.email);
  return { success: true, userId: user.id };
}`
                }
              ]
            },
            {
              id: "eng-les-git-workflow",
              title: "Git Workflow, Branching & Semantic Versioning",
              type: "learn",
              xpReward: 30,
              content: [
                {
                  type: "markdown",
                  content: `### Standar Kerja Rekayasa Perangkat Lunak Kolaboratif

Dalam tim software engineering profesional:

1. **Trunk / Feature Branching:** Jangan commit langsung ke branch \`main\` atau \`production\`. Buat branch baru seperti \`feat/user-auth\` atau \`fix/payment-race-condition\`.
2. **Pull Request (PR) & Code Review:** Rekan tim meninjau arsitektur, potensi bug keamanan, dan cakupan tes sebelum kode digabung.
3. **Semantic Versioning (SemVer: MAJOR.MINOR.PATCH):**
   - **MAJOR (1.0.0 -> 2.0.0):** Perubahan yang merusak kompatibilitas (*breaking changes*).
   - **MINOR (1.0.0 -> 1.1.0):** Penambahan fitur baru yang *backwards-compatible*.
   - **PATCH (1.0.0 -> 1.0.1):** Perbaikan bug kecil tanpa fitur baru.`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "eng-lvl-3",
      title: "Stage 03 \u2014 Testing & Quality Assurance (QA)",
      description: "Siklus hidup: Code -> Test -> Fail -> Debug -> Fix -> Test Again. Kuasai unit test, integration test, assertions, dan edge cases.",
      modules: [
        {
          id: "eng-mod-testing",
          title: "Unit Testing, Assertions & Test Coverage",
          description: "Mengapa software profesional wajib memiliki automated safety net sebelum dideploy.",
          lessons: [
            {
              id: "eng-les-test-pyramid",
              title: "Piramida Pengujian & Mentalitas QA",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Piramida Pengujian (The Test Pyramid)

Menemukan bug di produksi berharga ratusan kali lebih mahal daripada menemukannya saat testing lokal:

1. **Unit Tests (Dasar Piramida):**
   Menguji fungsi atau modul terkecil secara terisolasi. Sangat cepat (milidetik), murah, dan harus mencakup puluhan skenario termasuk **Edge Cases** (nilai null, angka negatif, string kosong, array besar).
2. **Integration Tests (Tengah):**
   Menguji interaksi antar modul: Apakah API handler berhasil berkomunikasi dengan database dan mengembalikan JSON yang benar?
3. **End-to-End (E2E) Tests (Puncak):**
   Menguji alur pengguna nyata dari antarmuka browser hingga backend database (misalnya menggunakan Playwright atau Cypress).

#### Siklus Pengujian & Debugging:
\`\`\`text
CODE \u2500\u2500> TEST \u2500\u2500> FAIL \u2500\u2500> DEBUG (Cari Akar Masalah) \u2500\u2500> FIX \u2500\u2500> TEST AGAIN (Verifikasi Hijau)
\`\`\``
                },
                {
                  type: "code-example",
                  language: "typescript",
                  code: `// Contoh Unit Test dengan Assertion Tegas
import { calculateCartTotal } from './cart';

describe('calculateCartTotal', () => {
  it('menghitung total dengan diskon persentase secara presisi', () => {
    const items = [
      { price: 100000, quantity: 2 }, // 200.000
      { price: 50000, quantity: 1 }   // 50.000
    ];
    const discountPercent = 10; // 10% dari 250.000 = 25.000
    
    const result = calculateCartTotal(items, discountPercent);
    expect(result).toBe(225000);
  });

  it('menangani edge case: keranjang kosong mengembalikan 0 tanpa crash', () => {
    expect(calculateCartTotal([], 0)).toBe(0);
  });

  it('menolak nilai diskon negatif dengan melempar error validasi', () => {
    expect(() => calculateCartTotal([{ price: 100, quantity: 1 }], -5))
      .toThrow('Diskon tidak boleh negatif');
  });
});`
                }
              ]
            },
            {
              id: "eng-quiz-testing",
              title: "Kuis Kualitas & Pengujian Software",
              type: "quiz",
              xpReward: 25,
              questions: [
                {
                  id: "tq-1",
                  question: 'Apa yang dimaksud dengan "Regression Testing" dalam rekayasa software?',
                  options: [
                    "Menulis ulang seluruh aplikasi dari awal menggunakan bahasa baru.",
                    "Menjalankan kembali kumpulan tes yang ada untuk memastikan bahwa perbaikan bug atau fitur baru tidak merusak fungsionalitas yang sebelumnya berjalan lancar.",
                    "Menguji aplikasi tanpa dokumentasi sama sekali.",
                    "Hanya menguji antarmuka visual CSS di browser lama."
                  ],
                  correctAnswerIndex: 1,
                  explanation: "Regression testing memastikan bahwa perubahan kode terbaru tidak secara tidak sengaja memicu bug baru pada fitur-fitur yang sudah terbukti stabil sebelumnya."
                },
                {
                  id: "tq-2",
                  question: 'Manakah contoh pengujian "Negative Testing" atau "Edge Case"?',
                  options: [
                    "Menginputkan nama dan email yang valid pada form registrasi.",
                    "Menginputkan string kosong, karakter unicode berlebih, atau angka negatif pada form transaksi untuk memastikan sistem menolaknya secara anggun.",
                    "Menekan tombol submit hanya sekali saat koneksi internet sempurna.",
                    "Mengisi password dengan kombinasi huruf besar dan angka sesuai aturan."
                  ],
                  correctAnswerIndex: 1,
                  explanation: "Negative testing menguji bagaimana sistem merespons input yang salah, tidak valid, atau ekstrem (edge cases) untuk mencegah crash atau celah keamanan tak terduga."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// src/data/cybersecurityCurriculum.ts
var CYBERSECURITY_COURSE = {
  id: "cybersecurity-mastery",
  title: "Cybersecurity, Threat Modeling & Web Defense",
  shortDescription: "Pahami CIA Triad, permodelan ancaman (STRIDE), mitigasi OWASP Top 10 (XSS, SQLi, CSRF, IDOR), dan secure coding.",
  description: "Keamanan aplikasi dimulai dari pola pikir defensif: memahami apa yang kita lindungi, batas-batas kepercayaan arsitektur, dan cara menulis kode yang aman sejak baris pertama (Secure by Design).",
  icon: "shield",
  levels: [
    {
      id: "sec-lvl-1",
      title: "Stage 04 \u2014 Cybersecurity Fundamentals",
      description: "Jangan mulai dari meretas. Mulailah dari memahami apa yang Anda lindungi (Aset), ancaman (Threat), kerentanan (Vulnerability), dan risiko (Risk).",
      modules: [
        {
          id: "sec-mod-fundamentals",
          title: "Pilar Pertahanan & CIA Triad",
          description: "Definisi aset, permukaan serangan (attack surface), dan prinsip pertahanan berlapis (defense in depth).",
          lessons: [
            {
              id: "sec-les-cia-triad",
              title: "CIA Triad & Prinsip Desain Keamanan",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Prinsip Dasar Keamanan Perangkat Lunak (Defensive Mindset)

Dalam rekayasa software modern, seorang developer harus bertanya:
- *"Data apa yang saya lindungi?"* (**Asset**)
- *"Mengapa data tersebut membutuhkan proteksi?"* (**Value/Privacy**)
- *"Apa yang bisa berjalan salah atau disalahgunakan?"* (**Threat & Risk**)
- *"Bagaimana cara memperkecil peluang terjadinya celah?"* (**Security Control**)

#### Triad CIA:
1. **Confidentiality (Kerahasiaan):** Hanya pihak yang berwenang yang dapat melihat data (misal: enkripsi password, token JWT, proteksi PII).
2. **Integrity (Integritas):** Data tidak dapat diubah atau dimanipulasi secara ilegal tanpa terdeteksi (misal: checksum, tanda tangan digital HMAC).
3. **Availability (Ketersediaan):** Layanan dan data tetap dapat diakses saat dibutuhkan pengguna yang sah (misal: proteksi DoS/DDoS, rate limiting, redundansi).

#### Dua Prinsip Abadi:
- **Defense in Depth:** Jangan mengandalkan satu lapis pertahanan saja. Jika validasi frontend ditembus, backend API tetap memvalidasi, dan database memberlakukan constraint.
- **Principle of Least Privilege:** Setiap modul, service, atau user hanya diberikan hak akses minimum yang mutlak diperlukan untuk menyelesaikan tugasnya.`
                },
                {
                  type: "code-example",
                  language: "typescript",
                  code: `// \u274C Melanggar Least Privilege: Service web terhubung ke DB dengan akun superuser 'postgres' / 'root'
const db = new Database({
  user: 'superuser', // Dapat DROP DATABASE jika ada celah SQLi!
  password: process.env.DB_PASSWORD
});

// \u2705 Menerapkan Least Privilege: Service hanya memakai user dengan hak SELECT dan INSERT pada tabel spesifik
const db = new Database({
  user: 'app_readonly_service', // Terbatas, tidak memiliki izin destruktif
  password: process.env.DB_APP_PASSWORD
});`
                }
              ]
            },
            {
              id: "sec-quiz-cia",
              title: "Kuis Konsep CIA & Defense in Depth",
              type: "quiz",
              xpReward: 25,
              questions: [
                {
                  id: "scq-1",
                  question: 'Manakah dari berikut ini yang merupakan pelanggaran terhadap prinsip "Integrity" dalam CIA Triad?',
                  options: [
                    "Server web down selama 10 menit karena lonjakan traffic.",
                    "Penyerang di jaringan kafe yang tidak terenkripsi berhasil menyadap dan membaca isi email pengguna.",
                    "Penyerang berhasil mengubah saldo rekening di database tanpa terdeteksi otorisasi perbankan.",
                    "Pengguna salah memasukkan password sebanyak 3 kali."
                  ],
                  correctAnswerIndex: 2,
                  explanation: "Integritas (Integrity) menjamin bahwa data akurat, valid, dan tidak dimodifikasi oleh pihak yang tidak berhak."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "sec-lvl-2",
      title: "Stage 05 \u2014 Threat Modeling (Pemodelan Ancaman)",
      description: "Peta arsitektur: User -> Frontend -> API -> Backend -> Database. Identifikasi aset, entry point, batas kepercayaan, dan potensi ancaman STRIDE.",
      modules: [
        {
          id: "sec-mod-threatmodel",
          title: "Pemodelan Ancaman & Trust Boundaries",
          description: "Menganalisis sistem sebelum kode ditulis atau dideploy.",
          lessons: [
            {
              id: "sec-les-stride",
              title: "Metodologi STRIDE & Batas Kepercayaan (Trust Boundaries)",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Mengapa Threat Modeling Sangat Penting?

Threat Modeling adalah proses sistematis untuk menemukan kelemahan arsitektur sebelum sistem diluncurkan:

\`\`\`text
[PENGGUNA / BROWSER]
       \u2502
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u256A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 [TRUST BOUNDARY 1: Internet Publik]
       \u25BC
[FRONTEND WEB (React/HTML)]
       \u2502
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u256A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 [TRUST BOUNDARY 2: Client-ke-Server API]
       \u25BC
[API GATEWAY / REVERSE PROXY]
       \u2502
       \u25BC
[BACKEND SERVICE (Node/Python)]
       \u2502
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u256A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 [TRUST BOUNDARY 3: Internal Network]
       \u25BC
[DATABASE CLUSTER (PostgreSQL)]
\`\`\`

#### Kategori Ancaman STRIDE:
1. **S - Spoofing (Penyamaran Identitas):** Berpura-pura menjadi user lain (Dicegah dengan autentikasi kuat).
2. **T - Tampering (Manipulasi Data):** Mengubah parameter request di HTTP (Dicegah dengan validasi & integritas hash).
3. **R - Repudiation (Penyangkalan):** Pelaku menyangkal telah melakukan transaksi (Dicegah dengan audit logging).
4. **I - Information Disclosure (Kebocoran Informasi):** Stack trace error atau database dump bocor (Dicegah dengan enkripsi & error handling aman).
5. **D - Denial of Service (Gangguan Ketersediaan):** Membanjiri server dengan payload besar (Dicegah dengan rate limiting).
6. **E - Elevation of Privilege (Eskalasi Hak Akses):** User biasa menjadi admin (Dicegah dengan RBAC yang ketat).`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "sec-lvl-3",
      title: "Stage 06 & 07 \u2014 Web Application Security & Tools",
      description: "Cegah OWASP Top 10: XSS, SQL Injection, CSRF, IDOR, Broken Access Control, serta gunakan tool audit defensif (DevTools, npm audit, curl).",
      modules: [
        {
          id: "sec-mod-owasp",
          title: "OWASP Top 10 & Pertahanan Defensif",
          description: "Anatomi kerentanan web paling berbahaya dan cara memperbaikinya secara tuntas.",
          lessons: [
            {
              id: "sec-les-xss-sqli",
              title: "Mencegah XSS (Cross-Site Scripting) & SQL Injection",
              type: "learn",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: `### 1. Cross-Site Scripting (XSS)
XSS terjadi saat aplikasi memasukkan input pengguna yang tidak disanitasi langsung ke dalam dokumen HTML/DOM browser.

- **Bahaya:** Script jahat dapat mencuri session cookie (\`document.cookie\`), token otentikasi, atau memanipulasi halaman web.
- **Pencegahan:** Selalu gunakan **Output Encoding**, hindari \`element.innerHTML\` atau React \`dangerouslySetInnerHTML\`, gunakan \`textContent\` atau library sanitasi seperti DOMPurify, serta pasang **Content Security Policy (CSP)**.

### 2. SQL Injection (SQLi)
SQLi terjadi saat string input pengguna digabungkan secara langsung (concatenation) ke dalam query SQL.

- **Bahaya:** Penyerang dapat membaca seluruh isi tabel, melewati layar login (\`' OR 1=1 --\`), bahkan menghapus database (\`DROP TABLE\`).
- **Pencegahan Wajib:** **Parameterized Queries (Prepared Statements)**. Jangan pernah menggabungkan variabel string mentah ke dalam klausa SQL!`
                },
                {
                  type: "code-example",
                  language: "typescript",
                  code: `// \u274C SANGAT RENTAN SQL INJECTION:
const query = "SELECT * FROM users WHERE email = '" + req.body.email + "' AND password = '" + req.body.password + "'";

// \u2705 100% AMAN: Parameterized Query (Prepared Statement)
const query = "SELECT id, email, password_hash FROM users WHERE email = $1";
const result = await db.query(query, [req.body.email]);

// \u274C RENTAN XSS:
document.getElementById('profile-name').innerHTML = user.bio;

// \u2705 AMAN: Browser secara otomatis mengenkode karakter khusus (<, >, &)
document.getElementById('profile-name').textContent = user.bio;`
                }
              ]
            },
            {
              id: "sec-quiz-owasp",
              title: "Kuis Evaluasi OWASP Web Security",
              type: "quiz",
              xpReward: 25,
              questions: [
                {
                  id: "owq-1",
                  question: "Manakah tindakan paling efektif untuk mengeliminasi kerentanan SQL Injection secara permanen pada aplikasi backend?",
                  options: [
                    'Menghapus kata "SELECT" dari input pengguna.',
                    "Menggunakan Parameterized Queries (Prepared Statements) atau ORM yang aman.",
                    "Memperbesar RAM server database.",
                    "Mengubah port default database dari 5432 ke port lain."
                  ],
                  correctAnswerIndex: 1,
                  explanation: "Parameterized Queries memisahkan kode SQL dari data input pengguna, sehingga input pengguna diperlakukan murni sebagai nilai literal dan tidak dapat dieksekusi sebagai instruksi database."
                }
              ]
            }
          ]
        },
        {
          id: "sec-mod-tools",
          title: "Perangkat Audit & Analisis Keamanan",
          description: "Pemeriksaan keamanan mandiri menggunakan Browser DevTools, npm audit, curl, dan static linters di localhost.",
          lessons: [
            {
              id: "sec-les-sec-tools",
              title: "Audit Keamanan Mandiri dengan CLI & DevTools",
              type: "learn",
              xpReward: 30,
              content: [
                {
                  type: "markdown",
                  content: `### Audit Keamanan Lingkungan Lokal Terkendali

Sebagai software engineer profesional, gunakan perangkat berikut untuk menguji sistem yang **secara sah Anda miliki izinnya** (localhost atau lab terkontrol):

1. **Browser DevTools (F12):**
   - **Network Tab:** Periksa header keamanan (\`Content-Security-Policy\`, \`X-Frame-Options\`, \`Strict-Transport-Security\`).
   - **Application / Storage:** Periksa apakah session cookie memiliki atribut \`HttpOnly\`, \`Secure\`, dan \`SameSite=Lax/Strict\`.
2. **Audit Dependensi Otomatis:**
   - \`npm audit\` atau \`pip-audit\` mendeteksi package yang memiliki kerentanan CVE yang sudah dipublikasikan.
3. **Static Application Security Testing (SAST):**
   - ESLint security plugins (\`eslint-plugin-security\`) untuk mendeteksi regex rawan ReDoS atau eval berbahaya secara otomatis saat penulisan kode.`
                },
                {
                  type: "code-example",
                  language: "bash",
                  code: `# 1. Audit dependensi proyek Node.js
npm audit

# 2. Periksa respon header server lokal via curl
curl -I https://localhost:3000

# 3. Scanning secrets yang tidak sengaja ter-commit
git log -p | grep -E "(api_key|password|secret)"`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "sec-lvl-4",
      title: "Stage 08 \u2014 Secure Coding Standards",
      description: "Praktek penulisan kode aman lintas lapisan: Frontend safe DOM, Backend strict validation, dan Database least privilege.",
      modules: [
        {
          id: "sec-mod-safe-dom",
          title: "Prinsip Penulisan Kode Kebal Serangan",
          description: "Validasi ketat di batas trust boundary server-side.",
          lessons: [
            {
              id: "sec-les-backend-val",
              title: "Server-Side Input Validation & Output Encoding",
              type: "learn",
              xpReward: 30,
              content: [
                {
                  type: "markdown",
                  content: `### "Frontend Is Not a Security Boundary"

Salah satu kesalahan pemula paling fatal adalah berasumsi: *"Form saya sudah divalidasi dengan JavaScript di browser, jadi backend saya aman."*

**Fakta Keamanan:**
Penyerang tidak membutuhkan browser Anda. Mereka dapat mengirimkan request HTTP langsung menggunakan \`curl\`, Postman, atau script Python, sepenuhnya melewati validasi HTML5 dan React!

**Kaidah Baku:**
1. Validasi di frontend hanyalah untuk kenyamanan pengalaman pengguna (UX).
2. **Validasi di backend adalah batas keamanan mutlak (Security Barrier).**
3. Selalu gunakan skema validasi tipe ketat (seperti Zod, Joi, atau Pydantic).`
                },
                {
                  type: "code-example",
                  language: "typescript",
                  code: `import { z } from 'zod';

// Skema validasi Zod ketat di Backend API
export const CreateUserSchema = z.object({
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email(),
  age: z.number().int().min(13).max(120),
});

// Middleware Express
app.post('/api/users', (req, res) => {
  const parseResult = CreateUserSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      error: 'Data input tidak valid',
      details: parseResult.error.flatten()
    });
  }

  // Data aman untuk diproses business logic
  const validData = parseResult.data;
  // ...
});`
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// src/data/authAndApiSecurityCurriculum.ts
var AUTH_API_SECURITY_COURSE = {
  id: "auth-api-security",
  title: "Auth, API & Supply Chain Security",
  shortDescription: "Otentikasi tangguh (bcrypt/JWT), Otorisasi berbasis peran (RBAC), pencegahan IDOR, pengamanan API, dan integritas dependensi software.",
  description: 'Pahami perbedaan esensial antara "Siapa Anda?" (Authentication) dan "Apa yang boleh Anda lakukan?" (Authorization), kunci keamanan endpoint API publik, serta cara melindungi aplikasi dari serangan rantai pasok (supply chain attack).',
  icon: "key",
  levels: [
    {
      id: "auth-lvl-1",
      title: "Stage 09 \u2014 Authentication & Authorization",
      description: "Hashing password dengan salt (bcrypt/argon2), session vs JWT, multi-factor authentication (MFA), role-based access control (RBAC), dan mitigasi IDOR.",
      modules: [
        {
          id: "auth-mod-concepts",
          title: "Otentikasi vs Otorisasi & Pencegahan IDOR",
          description: "Membangun sistem login aman dan membatasi akses antar pengguna.",
          lessons: [
            {
              id: "auth-les-hashing-idor",
              title: "Password Hashing & Broken Object Level Auth (IDOR)",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### 1. Otentikasi: "Siapa Anda?"
- Jangan pernah menyimpan password dalam teks biasa (*plaintext*) atau menggunakan fungsi hash kuno seperti MD5 atau SHA1 (karena rentan rainbow table & serangan GPU cepat).
- Gunakan algoritma adaptive hashing dengan salt otomatis: **Argon2id** atau **bcrypt** dengan work factor yang memadai.

### 2. Otorisasi: "Apa yang Boleh Anda Akses?"
Setelah user login, sistem wajib memeriksa apakah user tersebut berhak atas data yang diminta.

#### Celah IDOR (Insecure Direct Object Reference):
IDOR terjadi ketika aplikasi menerima ID entitas (misal: invoice ID atau file ID) dari parameter URL tanpa memverifikasi kepemilikan.
Contoh bahaya:
- User A login dengan ID \`42\`.
- User A membuka URL \`/api/orders/1001\` milik dirinya.
- User A mengubah URL menjadi \`/api/orders/1002\` milik User B. Jika backend langsung mengembalikan data pesanan tanpa memverifikasi \`order.userId === currentUser.id\`, maka telah terjadi kebocoran IDOR!`
                },
                {
                  type: "code-example",
                  language: "typescript",
                  code: `// \u274C RENTAN IDOR: Mengambil dokumen hanya berdasarkan ID dari request URL
app.get('/api/documents/:id', async (req, res) => {
  const doc = await db.documents.findUnique({ where: { id: req.params.id } });
  return res.json(doc); // BAHAYA: Siapapun yang tahu ID bisa membaca!
});

// \u2705 AMAN: Selalu periksa relasi otorisasi dengan akun yang sedang terotentikasi
app.get('/api/documents/:id', requireAuth, async (req, res) => {
  const doc = await db.documents.findUnique({ where: { id: req.params.id } });
  
  if (!doc) return res.status(404).json({ error: 'Dokumen tidak ditemukan' });

  // Verifikasi kepemilikan atau hak akses organisasi
  if (doc.ownerId !== req.user.id && req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Akses ditolak: Anda bukan pemilik dokumen ini' });
  }

  return res.json(doc);
});`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "auth-lvl-2",
      title: "Stage 10 & 11 \u2014 API & Database Security",
      description: "Rate limiting anti-bruteforce, CORS yang ketat, pencegahan kebocoran credential DB, row-level authorization, dan backup terenkripsi.",
      modules: [
        {
          id: "auth-mod-api-hardening",
          title: "Perlindungan Endpoint API & Database",
          description: "Mengamankan pintu gerbang API dari eksploitasi otomatis dan scraping.",
          lessons: [
            {
              id: "auth-les-rate-limit",
              title: "API Rate Limiting & Proteksi Brute-Force",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Melindungi Endpoint Kritis dari Penyalahgunaan (Abuse Prevention)

Endpoint seperti \`/api/login\`, \`/api/forgot-password\`, atau \`/api/checkout\` harus dilindungi dari serangan otomatis:

1. **Rate Limiting:** Batasi jumlah request per alamat IP atau per user account (misal: maksimum 5 percobaan login per 15 menit).
2. **CORS (Cross-Origin Resource Sharing):** Jangan gunakan \`Access-Control-Allow-Origin: *\` untuk endpoint yang menerima kredensial atau cookie. Tentukan domain frontend yang diizinkan secara eksplisit.
3. **Database Security:**
   - Pisahkan credential DB ke dalam environment variables terisolasi.
   - Jangan expose port database (misal 5432) ke internet publik; gunakan VPC peering atau SSH tunneling.
   - Enkripsi data saat istirahat (*at rest*) dan saat transit (TLS).`
                },
                {
                  type: "code-example",
                  language: "typescript",
                  code: `import rateLimit from 'express-rate-limit';

// Rate Limiter khusus untuk endpoint login sensitif
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 5, // Maksimal 5 percobaan
  message: { error: 'Terlalu banyak percobaan login gagal. Silakan coba lagi setelah 15 menit.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.post('/api/auth/login', loginLimiter, handleLogin);`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "auth-lvl-3",
      title: "Stage 12 \u2014 Dependency & Supply Chain Security",
      description: "Keamanan dependensi eksternal, lockfiles (package-lock.json), deteksi typosquatting, automated CVE scanning, dan SBOM fundamentals.",
      modules: [
        {
          id: "auth-mod-supply-chain",
          title: "Manajemen Kerentanan Rantai Pasok",
          description: "Aplikasi Anda terdiri dari 80-90% kode pihak ketiga (npm, pip). Lindungi rantai pasok software Anda.",
          lessons: [
            {
              id: "auth-les-lockfiles-audit",
              title: "Lockfiles, Package Audits & Software Bill of Materials",
              type: "learn",
              xpReward: 30,
              content: [
                {
                  type: "markdown",
                  content: `### Bahaya Serangan Rantai Pasok (Supply Chain Attack)

Aplikasi modern mengimpor ratusan package open-source. Satu package jahat dapat mencuri API key atau membajak server:

1. **Kunci Versi dengan Lockfile:** Selalu commit \`package-lock.json\` atau \`pnpm-lock.yaml\` ke Git. Lockfile mencatat hash SHA integritas kriptografis dari setiap package agar versi yang di-install di server produksi identik dengan komputer lokal.
2. **Bahaya Typosquatting:** Berhati-hatilah dengan nama paket yang mirip (contoh: meng-install \`cross-env\` vs varian palsu \`crossenv\`).
3. **Automated Vulnerability Monitoring:** Jalankan \`npm audit\` dalam pipeline CI/CD untuk menggagalkan build jika ada kerentanan *Critical* yang belum di-patch.`
                },
                {
                  type: "code-example",
                  language: "bash",
                  code: `# Menguji dan memperbaiki dependensi secara otomatis
npm audit
npm audit fix --dry-run

# Menginstal dependensi secara persis dan bersih di server CI/CD
npm ci`
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// src/data/devSecOpsAndDeploymentCurriculum.ts
var DEVSECOPS_DEPLOYMENT_COURSE = {
  id: "devsecops-deployment",
  title: "DevSecOps, Cloud Deployment & Hardening",
  shortDescription: "Linux server security, Docker container hardening, secure CI/CD pipelines, multi-cloud deployment, dan HTTP security headers.",
  description: "Jangan biarkan keamanan hanya menjadi urusan akhir sebelum peluncuran. Integrasikan keamanan otomatis sejak baris kode pertama, bungkus dalam kontainer non-root, deploy ke server cloud, dan terapkan pengerasan (hardening) produksi.",
  icon: "server",
  levels: [
    {
      id: "ops-lvl-1",
      title: "Stage 13 & 14 \u2014 Linux Server & Docker Security",
      description: "Pengelolaan izin file Linux (chmod/chown), SSH hardening, firewall (ufw), Dockerfile minimal, dan kontainer non-root.",
      modules: [
        {
          id: "ops-mod-docker-linux",
          title: "Isolasi Kontainer & Keamanan Server",
          description: "Membangun image kontainer yang ramping, bebas kerentanan, dan terisolasi.",
          lessons: [
            {
              id: "ops-les-nonroot-docker",
              title: "Prinsip Kontainer Non-Root & Minimal Base Image",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Mengapa Jangan Menjalankan Kontainer Sebagai Root?

Secara default, jika Anda tidak menentukan user di \`Dockerfile\`, aplikasi akan dijalankan sebagai pengguna \`root\` di dalam kontainer. Jika ada kerentanan *container escape*, penyerang bisa mendapatkan kontrol penuh atas mesin host server!

#### 3 Aturan Emas Dockerfile Aman:
1. **Gunakan Minimal Base Image:** Gunakan \`node:20-alpine\` atau \`distroless\` untuk membuang paket utilitas OS yang tidak dibutuhkan (seperti curl, bash, atau gcc) yang bisa dipakai penyerang.
2. **Jalankan Sebagai Pengguna Non-Root:** Buat grup dan user khusus dengan hak akses terbatas.
3. **Multi-Stage Build:** Pisahkan tahap instalasi dependensi build (*compile*) dari tahap image runtime produksi untuk menjaga ukuran image kecil dan bersih dari tool development.`
                },
                {
                  type: "code-example",
                  language: "dockerfile",
                  code: `# 1. Stage Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2. Stage Produksi (Bersih & Non-Root)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Buat grup dan pengguna non-root
RUN addgroup -g 1001 nodejs && adduser -u 1001 -G nodejs -s /bin/sh -D coderauser

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm ci --only=production

# Ganti hak kepemilikan dan aktifkan user non-root
USER coderauser
EXPOSE 3000
CMD ["node", "dist/server.cjs"]`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "ops-lvl-2",
      title: "Stage 15 \u2014 DevSecOps Pipeline & Continuous Security",
      description: "Pipeline CI/CD modern: Lint -> Unit Test -> Dependency Scan -> Secret Scan -> Security Test -> Staging -> Deploy.",
      modules: [
        {
          id: "ops-mod-pipeline",
          title: "Integrasi Keamanan Otomatis dalam CI/CD",
          description: "Mencegah kode cacat atau kredensial bocor masuk ke branch utama.",
          lessons: [
            {
              id: "ops-les-ci-pipeline",
              title: "Anatomi Pipeline GitHub Actions / GitLab CI",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### "Shift-Left Security" dalam Siklus CI/CD

Alih-alih menunggu audit keamanan di akhir tahun, keamanan dijalankan otomatis setiap kali developer melakukan \`git push\` atau membuat Pull Request:

\`\`\`text
CODE \u2500\u2500> GIT PUSH \u2500\u2500> LINT (ESLint) \u2500\u2500> UNIT TEST \u2500\u2500> AUDIT DEPENDENSI (npm audit)
                           \u2502
                           \u25BC
              SECRET SCANNING (Gitleaks) \u2500\u2500> BUILD DOCKER \u2500\u2500> DEPLOY STAGING
\`\`\`

Jika ada unit test yang gagal, secret API terdeteksi dalam kode, atau CVE kritis pada library, pipeline akan langsung **membatalkan proses build** dan memberi notifikasi ke developer.`
                },
                {
                  type: "code-example",
                  language: "yaml",
                  code: `name: DevSecOps CI Pipeline

on: [push, pull_request]

jobs:
  security-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          
      - name: Install Dependencies
        run: npm ci
        
      - name: Scan Secrets in Code (Gitleaks)
        uses: gitleaks/gitleaks-action@v2
        
      - name: Dependency Vulnerability Audit
        run: npm audit --audit-level=high
        
      - name: Run Test Suite
        run: npm test`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "ops-lvl-3",
      title: "Stage 16 & 17 \u2014 Cloud Deployment & Security Hardening",
      description: "Penyebaran ke VPS/Container, Reverse Proxy, serta pemasangan HTTP Security Headers (CSP, HSTS, X-Content-Type-Options).",
      modules: [
        {
          id: "ops-mod-hardening",
          title: "Pengerasan Server Produksi (Production Hardening)",
          description: "Kunci pintu gerbang HTTP dengan headers dan konfigurasi cookie yang ketat.",
          lessons: [
            {
              id: "ops-les-security-headers",
              title: "HTTP Security Headers: HSTS, CSP & Proteksi Frame",
              type: "learn",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: `### Pertahanan di Lapisan Header HTTP

Server web harus memberitahu browser bagaimana cara berinteraksi secara aman dengan konten Anda:

1. **Strict-Transport-Security (HSTS):** Memaksa browser hanya menggunakan koneksi HTTPS terenkripsi dan menolak downgrade ke HTTP.
2. **Content-Security-Policy (CSP):** Membatasi domain mana saja yang boleh mengeksekusi script, style, atau gambar di halaman web Anda (mitigasi XSS paling ampuh).
3. **X-Content-Type-Options: nosniff:** Mencegah browser menebak MIME-type file yang dapat memicu eksekusi kode berbahaya.
4. **X-Frame-Options: DENY:** Mencegah website Anda dimasukkan ke dalam \`<iframe>\` tersembunyi oleh situs lain (mencegah Clickjacking).
5. **Secure & SameSite Cookies:** Melindungi session token dari serangan CSRF dan penyadapan jaringan.`
                },
                {
                  type: "code-example",
                  language: "typescript",
                  code: `import helmet from 'helmet';
import express from 'express';

const app = express();

// Pasang proteksi HTTP Security Headers otomatis dengan Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'trusted-cdn.com'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    hsts: {
      maxAge: 31536000, // 1 tahun
      includeSubDomains: true,
      preload: true
    }
  })
);`
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// src/data/reliabilityAndObservabilityCurriculum.ts
var RELIABILITY_OBSERVABILITY_COURSE = {
  id: "production-readiness",
  title: "Observability, Privacy & Production Readiness",
  shortDescription: "Monitoring, incident response, disaster recovery (RTO/RPO), UU PDP privasi data, dan evaluasi gerbang kesiapan produksi.",
  description: "Tahap produksi bukanlah akhir perjalanan, melainkan awal dari siklus pemeliharaan berkelanjutan: pantau kesehatan sistem dengan metrik dan log, tangani insiden dengan sigap, jaga privasi pengguna sesuai regulasi, dan pastikan setiap rilis lolos Production Readiness Gate.",
  icon: "activity",
  levels: [
    {
      id: "rel-lvl-1",
      title: "Stage 18 & 19 \u2014 Performance, Scalability & Accessibility",
      description: "Optimasi performa frontend/backend, caching, optimasi query, dan aksesibilitas ramah pembaca layar (WCAG 2.1).",
      modules: [
        {
          id: "rel-mod-perf-a11y",
          title: "Performa Tinggi & Aksesibilitas Terbuka",
          description: "Aplikasi produksi berkualitas tinggi harus cepat, andal, dan dapat diakses oleh semua orang.",
          lessons: [
            {
              id: "rel-les-a11y-wcag",
              title: "Web Accessibility (A11y) & Navigasi Keyboard",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Kualitas Produksi Menyertakan Aksesibilitas (WCAG)

Software kelas dunia dapat diakses oleh semua kalangan, termasuk pengguna dengan disabilitas penglihatan atau motorik:

1. **Semantic HTML:** Gunakan elemen bawaan browser (\`<button>\`, \`<nav>\`, \`<main>\`, \`<header>\`, \`<article>\`) daripada \`<div onClick>\`. Elemen semantik memiliki dukungan keyboard bawaan (tombol Enter dan Spasi) serta diumumkan dengan jelas oleh Screen Reader.
2. **Keyboard Navigation & Focus Management:** Pastikan pengguna dapat menelusuri seluruh fitur hanya menggunakan tombol \`Tab\` dan \`Shift+Tab\`. Jangan pernah menghapus outline fokus (\`outline: none\`) tanpa menyediakan styling pengganti yang jelas!
3. **Kontras Warna:** Teks harus memiliki rasio kontras minimum 4.5:1 terhadap latar belakang (WCAG AA).`
                },
                {
                  type: "code-example",
                  language: "html",
                  code: `<!-- \u274C Buruk: Div tidak dapat diakses keyboard dan tidak terbaca screen reader -->
<div class="btn" onclick="submitData()">Simpan Data</div>

<!-- \u2705 Benar: Tombol semantik dengan label aksesibel dan feedback status -->
<button 
  type="submit" 
  class="px-4 py-2 bg-indigo-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-400"
  aria-label="Simpan perubahan profil Anda"
>
  Simpan Data
</button>`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "rel-lvl-2",
      title: "Stage 20 & 21 \u2014 Observability & Incident Response",
      description: "Pemantauan 4 pilar (Logs, Metrics, Errors, Health Checks), alerting, dan respon tanggap darurat saat insiden keamanan terjadi.",
      modules: [
        {
          id: "rel-mod-monitoring",
          title: "Observabilitas Sistem & Respon Insiden",
          description: "Mendeteksi anomali sebelum pengguna melaporkan error ke media sosial.",
          lessons: [
            {
              id: "rel-les-incident-triage",
              title: "Langkah Tanggap Insiden Keamanan (Incident Response)",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Apa yang Harus Dilakukan Saat Terjadi Insiden Keamanan?

Contoh skenario: *"Sebuah API Secret Key penyedia pembayaran tidak sengaja ter-commit ke repositori publik."*

#### 6 Langkah Protokol Respons Insiden Defensif:
1. **Identifikasi & Verifikasi:** Konfirmasi kredensial apa yang terekspos dan level aksesnya.
2. **Penyekatan (Containment):** **Segera cabut (revoke)** kredensial tersebut dari dashboard penyedia API dan buat kunci baru. Jangan sekadar menghapus commit Git, karena cache Git dan crawler bot sudah menyalinnya dalam hitungan detik.
3. **Penyelidikan (Investigation):** Periksa log akses API: Apakah ada transaksi anomali atau penarikan data ilegal yang terjadi selama kunci terekspos?
4. **Pemulihan (Recovery):** Masukkan kredensial baru ke environment server produksi dengan aman dan uji konektivitas.
5. **Pencegahan Berulang:** Pasang pre-commit hook (misal: Husky + Gitleaks) agar rahasia tidak pernah bisa ter-commit lagi di masa depan.
6. **Post-Mortem Review:** Dokumentasikan kronologi kejadian secara transparan tanpa menyalahkan individu (*blameless post-mortem*) untuk memperkuat sistem.`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "rel-lvl-3",
      title: "Stage 22 & 23 \u2014 Backup, Disaster Recovery & UU PDP",
      description: "Strategi backup data (RTO & RPO), simulasi pemulihan bencana, serta prinsip perlindungan data pribadi (UU PDP Indonesia).",
      modules: [
        {
          id: "rel-mod-backup-pdp",
          title: "Ketahanan Data & Kepatuhan Privasi (UU PDP)",
          description: "Melindungi privasi data warga dan memastikan data dapat dipulihkan dalam kondisi bencana.",
          lessons: [
            {
              id: "rel-les-uupdp-privacy",
              title: "Prinsip Perlindungan Data Pribadi (UU PDP Indonesia)",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Rekayasa Perangkat Lunak Sadar Privasi (Privacy by Design)

Berdasarkan Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27 Tahun 2022) di Indonesia dan standar global:

1. **Prinsip Minimasi Data (Data Minimization):**
   Hanya kumpulkan data pribadi yang benar-benar esensial untuk tujuan pemrosesan aplikasi. Jika fitur hanya butuh konfirmasi umur 18+, jangan simpan tanggal lahir lengkap atau nomor KTP!
2. **Batasan Retensi Data:**
   Hapus atau anonimkan data pengguna saat akun ditutup atau saat masa retensi tujuan pemrosesan telah selesai.
3. **Hak Subjek Data:**
   Sistem harus menyediakan mekanisme bagi pengguna untuk memperbarui data, meminta salinan data, atau meminta penghapusan akun (*right to be forgotten*).
4. **Enkripsi Data Sensitif:**
   Data nomor identitas, rekam medis, atau data finansial wajib dienkripsi saat transit (TLS 1.3) maupun saat tersimpan di disk database (*encryption at rest*).`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "rel-lvl-4",
      title: "Stage 24 \u2014 Production Readiness Gate",
      description: "Pintu gerbang peluncuran: Audit komprehensif fungsionalitas, keamanan, performa, database, dan observabilitas sebelum rilis.",
      modules: [
        {
          id: "rel-mod-readiness-gate",
          title: "Audit Gerbang Kesiapan Produksi (Go-Live Gate)",
          description: "Mengevaluasi kesiapan sistem secara objektif dan transparan sebelum membuka traffic untuk publik.",
          lessons: [
            {
              id: "rel-les-readiness-audit",
              title: "Kriteria Kelulusan Production Readiness Gate",
              type: "learn",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: `### Tidak Ada Istilah "100% Aman", Yang Ada Adalah "Kesiapan Mengelola Risiko"

Sebelum sebuah aplikasi dideploy ke server produksi, seluruh pilar berikut wajib ditinjau:

| Pilar Evaluasi | Kriteria Kelulusan | Status Evaluasi |
| :--- | :--- | :--- |
| **Fungsionalitas** | Seluruh alur form, API, dan transaksi berjalan tanpa error | PASS |
| **Testing** | Unit test dan integration test kritis lolos di CI pipeline | PASS |
| **Autentikasi & Sesi** | Password di-hash dengan bcrypt/argon2, cookie berflag HttpOnly & SameSite | PASS |
| **Otorisasi & IDOR** | Akses dokumen memverifikasi pemilik data di level backend | PASS |
| **Proteksi Input** | Validasi skema ketat di server, parameterized SQL query | PASS |
| **Dependensi & Secrets** | Zero High/Critical CVE pada \`npm audit\`, tidak ada secret ter-commit | PASS |
| **Security Headers** | CSP, HSTS, X-Content-Type-Options aktif | PASS |
| **Database & Backup** | Cadangan berkala terkonfigurasi dan simulasi restore pernah diuji | PASS |
| **Observabilitas** | Health check endpoint (\`/health\`) dan error tracking aktif | PASS |
| **Aksesibilitas** | Navigasi keyboard dan kontras warna memenuhi standar WCAG AA | PASS |`
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// src/data/phpCurriculum.ts
var PHP_COURSE = {
  id: "php-mastery",
  title: "PHP 8 & Modern Backend Engineering",
  shortDescription: "Kuasai arsitektur backend modern PHP 8.x: Strict Typing, Constructor Promotion, Readonly Classes, Enums, Attributes, Fibers, PDO Prepared Statements, dan Keamanan Argon2id.",
  description: "PHP menggerakkan lebih dari 75% web dunia dan telah bertransformasi total menjadi bahasa backend bertipe ketat (strict typing), performa JIT compiler tinggi, dan ekosistem enterprise yang matang (Laravel, Symfony). Pelajari seluruh fitur modern PHP 8.0 hingga 8.3: arsitektur OOP modern, standar PSR, enkripsi kriptografis, transaksi PDO anti-SQL injection, hingga arsitektur REST API production-grade lengkap dengan analisis kompleksitas algoritma dan skenario industri nyata.",
  icon: "code",
  levels: [
    {
      id: "php-lvl-0",
      title: "Level 0 \u2014 Fondasi Modern PHP 8 & Type Safety",
      description: "declare(strict_types=1), Match expressions, Nullsafe operator, Named arguments, Union/Intersection types, Enums, dan Analisis Kompleksitas VM.",
      modules: [
        {
          id: "php-mod-1",
          title: "Sintaks Inti & Sistem Tipe Modern (PHP 8.0 - 8.3)",
          description: "Menghilangkan kelemahan type juggling PHP masa lalu dengan type checking ketat, internal opcode Zend VM, dan algoritma rate limiting.",
          lessons: [
            {
              id: "php-les-1",
              title: "Anatomi PHP 8: Strict Typing, Match Expressions & Named Arguments",
              type: "learn",
              xpReward: 25,
              content: [
                {
                  type: "markdown",
                  content: `### Era Baru PHP: Type-Safe & High Performance

Di masa lampau, PHP dikritik karena *type juggling* (misalnya \`"0" == false\` menghasilkan \`true\`). Di era **PHP 8.0 - 8.3**:
- **Strict Typing:** Dengan \`declare(strict_types=1);\`, Zend Engine menolak eksekusi fungsi jika tipe data argumen tidak sesuai persis.
- **Match Expression:** Alternatif modern untuk \`switch\`. Menggunakan perbandingan identik (\`===\`), tidak memerlukan kata kunci \`break\`, dan langsung mengembalikan nilai (*expression*).
- **Named Arguments:** Memanggil fungsi dengan menentukan nama parameter, sehingga kita bebas melewati default arguments tanpa memedulikan urutan posisi parameter.

---

### Deep-Dive Theory: The Zend VM Opcode Compilation Pipeline

Di bawah kap mesin, PHP 8 tidak mengeksekusi kode teks secara langsung:
1. **Lexical Scanning (\`zend_language_scanner.l\`):** Mengubah karakter teks sumber menjadi deretan token (misal \`T_DECLARE\`, \`T_STRING\`).
2. **Abstract Syntax Tree (AST):** Compiler membangun struktur pohon sintaksis abstrak.
3. **Opcode Emission:** AST dikompilasi menjadi instruksi biner tingkat rendah (*Zend Opcodes* seperti \`ZEND_MATCH\`, \`ZEND_INIT_FCALL\`, \`ZEND_DO_FCALL\`).
4. **Execution Engine (\`execute_ex\`):** Virtual Machine mengeksekusi opcodes. Dengan **Opcache**, bytecode ini disimpan di Shared Memory (SHM), memangkas waktu kompilasi ke 0 pada request berikutnya!

#### Perbandingan Algoritmik: \`switch\` vs \`match\`
- **\`switch\` Legacy ($O(N)$):** Melakukan perbandingan longgar bertahap dari atas ke bawah. Setiap kondisi dievaluasi sekuensial dengan potensi type juggling, membutuhkan $N$ kali branching.
- **\`match\` Modern ($O(1)$ Amortized):** Menggunakan perbandingan tipe ketat (\`===\`). Pada branch bernilai konstan, Zend VM mengompilasinya menjadi **Hash Jump Table**, sehingga waktu evaluasi bernilai konstan $O(1)$ terlepas dari banyaknya branch kondisi!`
                },
                {
                  type: "code-example",
                  language: "php",
                  code: `<?php
declare(strict_types=1);

// Fungsi dengan Union Types (string|int), Named Arguments, & Return Type
function calculateTax(
    float $amount,
    float $rate = 0.11,
    string $country = 'ID',
    bool $applyRounding = true
): float {
    $tax = $amount * $rate;
    return $applyRounding ? round($tax, 2) : $tax;
}

// 1. Memanggil fungsi menggunakan Named Arguments (urutan fleksibel, skip default parameter)
$totalTax = calculateTax(
    amount: 1500000.00,
    applyRounding: true,
    country: 'ID'
);

// 2. Match Expression Modern (strict comparison === & hash jump table O(1))
$status = 'PAID';
$badgeColor = match ($status) {
    'DRAFT' => 'gray',
    'PENDING', 'PROCESSING' => 'amber',
    'PAID' => 'emerald',
    'FAILED', 'CANCELLED' => 'rose',
    default => 'slate',
};

echo "Pajak: Rp {$totalTax} | Status Badge: {$badgeColor}
";
?>`
                }
              ]
            },
            {
              id: "php-les-nullsafe-types",
              title: "Nullsafe Operator (?->), Null Coalescing (??=) & Zval Memory Architecture",
              type: "learn",
              xpReward: 30,
              content: [
                {
                  type: "markdown",
                  content: `### Menghapus 'Call to a member function on null'

Salah satu error paling umum di PHP era lama adalah mencoba memanggil method atau properti dari objek bernilai \`null\`.

#### Fitur Penyelamat di PHP 8:
1. **Nullsafe Operator (\`?->\`):**
   Jika variabel sebelum \`?->\` bernilai \`null\`, seluruh rangkaian pemanggilan akan langsung berhenti dan mengembalikan \`null\` tanpa memicu Fatal Error.
2. **Null Coalescing Assignment (\`??=\`):**
   Memberikan nilai default hanya jika variabel tersebut belum disetel atau bernilai \`null\`.
3. **Union Types (\`A|B\`) & Intersection Types (\`A&B\`):**
   Menentukan kontrak bahwa parameter dapat menerima beberapa tipe (Union) atau harus mengimplementasikan sekaligus beberapa interface (Intersection).

---

### Deep-Dive Theory: Zval Memory Structure & Copy-on-Write (CoW)

Setiap variabel di PHP disimpan dalam representasi C yang disebut **\`zval\` (Zend Value)**:
- Ukuran struct \`zval\` di PHP 8 dipadatkan menjadi hanya **16 byte** (dibandingkan 32 byte di PHP 5).
- **Copy-on-Write (CoW):** Saat kamu menduplikasi array berukuran 100 MB (\`$b = $a;\`), PHP **tidak menggandakan memori**. Keduanya menunjuk ke buffer zval yang sama dan menaikkan \`refcount\` ($O(1)$ time & space).
- Duplikasi memori aktual baru terjadi saat salah satu variabel dimodifikasi (\`$b[] = 'new';\`).`
                },
                {
                  type: "code-example",
                  language: "php",
                  code: `<?php
declare(strict_types=1);

class Address {
    public function __construct(public ?string $city = null) {}
}

class Profile {
    public function __construct(public ?Address $address = null) {}
}

class User {
    public function __construct(public ?Profile $profile = null) {}
}

$user = new User(profile: null);

// Menggunakan Nullsafe Operator (?->) - Aman dari Fatal Error!
$cityName = $user?->profile?->address?->city ?? 'Kota Belum Diatur';

// Null Coalescing Assignment (??=)
$sessionCache = null;
$sessionCache ??= ['timestamp' => time(), 'status' => 'initialized'];

// Union Types & Never Type
function formatIdentifier(string|int $id): string {
    return is_int($id) ? "ID-" . str_pad((string)$id, 8, '0', STR_PAD_LEFT) : strtoupper($id);
}

function terminateWithException(string $reason): never {
    throw new RuntimeException("Fatal error: {$reason}");
}

echo "City: {$cityName} | Formatted ID: " . formatIdentifier(42) . "
";
?>`
                }
              ]
            },
            {
              id: "php-les-practice-rate-limiter",
              title: "ADVANCED PRACTICE: In-Memory Token Bucket Rate Limiter ($O(1)$ Time Complexity)",
              type: "practice",
              xpReward: 50,
              content: [
                {
                  type: "markdown",
                  content: `### Skenario Nyata: Proteksi Brute-Force & DDoS API Pembayaran

Di gateway pembayaran berkecepatan tinggi, sistem harus membatasi request klien (misal: maksimum **10 request per detik** per API Key). Menggunakan sleep loop atau interval timer latar belakang akan memboroskan CPU thread worker.

---

### Algoritma: Token Bucket dengan Evaluasi Lazy Timestamp
Algoritma Token Bucket mengakumulasi token dengan laju konstan (\`refillRatePerSec\`). Setiap request masuk, sistem menghitung berapa token yang terkumpul sejak request terakhir:
$$\\Delta tokens = (currentTime - lastRefillTime) \\times refillRate$$

#### Analisis Kompleksitas:
- **Time Complexity: $O(1)$** \u2014 Tidak ada iterasi array atau background thread. Kalkulasi murni operasi matematika delta waktu ($O(1)$).
- **Space Complexity: $O(1)$ per bucket** \u2014 Hanya menyimpan 2 nilai skalar bertipe float: \`$tokens\` dan \`$lastRefillTimestamp\`.

---

### Instruksi Latihan:
Lengkapi implementasi class \`TokenBucketRateLimiter\` dengan spesifikasi:
1. Menggunakan \`declare(strict_types=1);\` dan Constructor Property Promotion.
2. Method \`consume(float $cost = 1.0): bool\` mengembalikan \`true\` jika token mencukupi, atau \`false\` jika request harus di-reject (HTTP 429 Too Many Requests).`
                }
              ],
              starterCode: `<?php
declare(strict_types=1);

final class TokenBucketRateLimiter {
    private float $tokens;
    private float $lastRefillTimestamp;

    public function __construct(
        private readonly float $capacity = 10.0,
        private readonly float $refillRatePerSecond = 2.0
    ) {
        $this->tokens = $capacity;
        $this->lastRefillTimestamp = microtime(true);
    }

    private function refill(): void {
        $now = microtime(true);
        $elapsed = $now - $this->lastRefillTimestamp;
        $this->lastRefillTimestamp = $now;

        // O(1) Math: Tambahkan token sesuai laju waktu tanpa perulangan
        $this->tokens = min($this->capacity, $this->tokens + ($elapsed * $this->refillRatePerSecond));
    }

    public function consume(float $cost = 1.0): bool {
        $this->refill();

        if ($this->tokens >= $cost) {
            $this->tokens -= $cost;
            return true;
        }

        return false;
    }

    public function getAvailableTokens(): float {
        $this->refill();
        return round($this->tokens, 2);
    }
}

// Simulasi Pengujian:
$limiter = new TokenBucketRateLimiter(capacity: 5.0, refillRatePerSecond: 1.0);
$successCount = 0;
for ($i = 0; $i < 7; $i++) {
    if ($limiter->consume(1.0)) {
        $successCount++;
    }
}

echo "Request diizinkan: {$successCount} dari 7 | Sisa Token: " . $limiter->getAvailableTokens() . "\\n";
?>`,
              hints: [
                "Pastikan method refill() menghitung pertambahan token menggunakan rumus: $elapsed * $this->refillRatePerSecond",
                "Gunakan min($this->capacity, ...) agar token tidak pernah melebihi kapasitas maksimum ember (bucket capacity)",
                "Kembalikan boolean true jika $this->tokens >= $cost, lalu kurangi token tersebut"
              ],
              requirements: [
                {
                  id: "req-tb-class",
                  description: "Mendeklarasikan class TokenBucketRateLimiter dengan constructor dan method consume",
                  validate: (code) => code.includes("class TokenBucketRateLimiter") && code.includes("consume")
                },
                {
                  id: "req-tb-math",
                  description: "Mengimplementasikan refilling O(1) berbasis delta microtime() dan min()",
                  validate: (code) => code.includes("microtime") && code.includes("min")
                },
                {
                  id: "req-tb-strict",
                  description: "Menegakkan type safety dengan declare(strict_types=1)",
                  validate: (code) => code.includes("declare(strict_types=1)")
                }
              ]
            },
            {
              id: "php-les-quiz-1",
              title: "Kuis Sistem Tipe & Sintaks PHP 8.x",
              type: "quiz",
              xpReward: 30,
              questions: [
                {
                  id: "pq-1",
                  question: "Direktif apa yang wajib diletakkan di baris paling atas file PHP untuk menegakkan type checking ketat?",
                  options: [
                    "declare(strict_types=1);",
                    'ini_set("type_safety", "on");',
                    "#pragma type_strict",
                    "use namespace Strict;"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "`declare(strict_types=1);` memberitahukan Zend Engine untuk menegakkan pemeriksaan tipe data argumen dan return value secara ketat tanpa konversi implisit (type coercion)."
                },
                {
                  id: "pq-2",
                  question: "Berapa kompleksitas waktu pencabangan ekspresi match jika dibandingkan switch legacy pada evaluasi konstan?",
                  options: [
                    "match memiliki kompleksitas O(1) via internal hash jump table, sedangkan switch legacy O(N)",
                    "match memiliki kompleksitas O(N^2) karena memeriksa tipe data",
                    "Keduanya sama-sama O(N) tanpa perbedaan internal",
                    "switch lebih cepat karena tidak ada strict checking"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "Ekspresi match di-compile oleh Zend Engine menjadi hash jump table dengan perbandingan tipe identik (===), menjamin waktu eksekusi O(1) amortized terlepas dari jumlah case."
                }
              ]
            }
          ]
        },
        {
          id: "php-mod-2",
          title: "Fitur Anyar PHP 8.1 - 8.3: Enums, Readonly Classes & DNF Types",
          description: "Mengenal Backed Enums dengan method, Readonly Classes untuk data immutability, dan Typed Class Constants.",
          lessons: [
            {
              id: "php-les-enums",
              title: "Pure Enums & Backed Enums dengan Methods (PHP 8.1+)",
              type: "learn",
              xpReward: 30,
              content: [
                {
                  type: "markdown",
                  content: `### Selamat Tinggal Class Constants untuk Tipe Status!

Sebelum PHP 8.1, developer biasanya membuat class constant seperti \`const STATUS_PENDING = 'pending';\`. Kelemahannya: fungsi menerima tipe data \`string\` bebas yang tidak bisa divalidasi saat kompilasi.

#### Keunggulan PHP 8.1 Enums:
- **Type-Safe:** Fungsi dapat menuntut parameter bertipe \`OrderStatus\` secara eksplisit.
- **Backed Enums:** Dapat memiliki representasi string (\`enum Status: string\`) atau integer (\`enum Status: int\`).
- **Methods & Interfaces:** Enum di PHP dapat memiliki method, static method, dan mengimplementasikan interface!

---

### Deep-Dive Theory: Enum Singleton Memory Optimization
Di PHP 8.1, setiap case enum (\`OrderStatus::Paid\`) diperlakukan sebagai **objek singleton unik** di Zend Engine:
- Perbandingan \`$statusA === $statusB\` hanya membandingkan alamat pointer memori C ($O(1)$ single pointer comparison), bukan membandingkan karakter string byte-by-byte ($O(L)$).
- Menjamin zero heap allocation saat passing enum antar fungsi.`
                },
                {
                  type: "code-example",
                  language: "php",
                  code: `<?php
declare(strict_types=1);

interface HasBadgeInterface {
    public function badgeColor(): string;
}

// Backed Enum bertipe string yang mengimplementasikan Interface
enum OrderStatus: string implements HasBadgeInterface {
    case Draft = 'draft';
    case PendingPayment = 'pending_payment';
    case Paid = 'paid';
    case Shipped = 'shipped';
    case Cancelled = 'cancelled';

    // Method di dalam Enum
    public function badgeColor(): string {
        return match ($this) {
            self::Draft => 'slate',
            self::PendingPayment => 'amber',
            self::Paid => 'emerald',
            self::Shipped => 'blue',
            self::Cancelled => 'rose',
        };
    }

    public function isFinal(): bool {
        return in_array($this, [self::Shipped, self::Cancelled], true);
    }
}

// Penggunaan type-safe di fungsi
function processOrderTransition(OrderStatus $currentStatus): string {
    return "Status: {$currentStatus->value}, Badge: {$currentStatus->badgeColor()}, Final: " . ($currentStatus->isFinal() ? 'Ya' : 'Tidak');
}

// Instansiasi dari string API eksternal
$statusFromDb = OrderStatus::from('paid');
echo processOrderTransition($statusFromDb) . "
";
?>`
                }
              ]
            },
            {
              id: "php-les-readonly",
              title: "Readonly Classes (PHP 8.2) & Typed Class Constants (PHP 8.3)",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Menjamin Immutability pada Domain Driven Design (DDD)

Pada arsitektur modern (Value Objects, DTOs, Event Sourcing), data tidak boleh dimodifikasi setelah dibuat (*immutable*).

- **Readonly Class (PHP 8.2):** Menambahkan \`readonly\` di level class membuat **seluruh properti** di dalam class tersebut otomatis berstatus \`readonly\` bertipe data ketat.
- **Typed Class Constants (PHP 8.3):** Di PHP 8.3, konstanta class kini dapat memiliki penanda tipe data eksplisit (misal: \`public const string API_VERSION = 'v2.1';\`), mencegah modifikasi tipe yang tidak disengaja saat inheritance.
- **Dynamic Class Constant Fetch (PHP 8.3):** Memanggil konstanta class secara dinamis menggunakan sintaks \`ClassName::{$constantName}\`.

---

### Skenario Nyata: Immutable Money Value Object
Dalam transaksi perbankan dan e-commerce, merepresentasikan uang dengan float adalah sumber kerugian (*precision bug*). Menyimpan uang dalam satuan sen (\`int $amountCents\`) di dalam \`readonly class\` menjamin:
1. Tidak ada thread atau fungsi lain yang dapat mengubah nominal di tengah transaksi ($O(1)$ immutability guarantee).
2. Perhitungan aritmatika menghasilkan objek baru tanpa mengubah objek asli (*idempotent mathematical operations*).`
                },
                {
                  type: "code-example",
                  language: "php",
                  code: `<?php
declare(strict_types=1);

// PHP 8.3: Interface dengan Typed Constants
interface AppConfigInterface {
    public const string APP_NAME = 'Codera Platform';
    public const int TIMEOUT_SECONDS = 30;
}

// PHP 8.2: Full Readonly Class (Data Transfer Object / Value Object)
final readonly class MoneyDTO {
    public function __construct(
        public int $amountCents,
        public string $currency = 'IDR'
    ) {
        if ($amountCents < 0) {
            throw new InvalidArgumentException("Nominal uang tidak boleh negatif.");
        }
    }

    public function add(MoneyDTO $other): self {
        if ($this->currency !== $other->currency) {
            throw new DomainException("Mata uang tidak cocok untuk penjumlahan.");
        }
        return new self($this->amountCents + $other->amountCents, $this->currency);
    }

    public function formatRupiah(): string {
        return "Rp " . number_format($this->amountCents / 100, 2, ',', '.');
    }
}

$price = new MoneyDTO(amountCents: 4500000);
$tax = new MoneyDTO(amountCents: 495000);
$total = $price->add($tax);

echo "Total Akhir: " . $total->formatRupiah() . "
";
?>`
                }
              ]
            },
            {
              id: "php-les-practice-dto-validation",
              title: "ADVANCED PRACTICE: Type-Safe Order State Machine & Readonly DTO",
              type: "practice",
              xpReward: 50,
              content: [
                {
                  type: "markdown",
                  content: `### Skenario Nyata: Finite State Machine (FSM) Siklus Pesanan E-Commerce

Sebuah pesanan tidak boleh melompat dari status \`Draft\` langsung ke \`Shipped\` tanpa melalui \`Paid\`. Selain itu, payload webhook harus di-parse ke dalam DTO yang bersifat *immutable* (\`readonly\`).

#### Aturan Transisi State Machine:
- \`Draft\` $\\rightarrow$ \`PendingPayment\` atau \`Cancelled\`
- \`PendingPayment\` $\\rightarrow$ \`Paid\` atau \`Cancelled\`
- \`Paid\` $\\rightarrow$ \`Shipped\` atau \`Refunded\`
- \`Shipped\` $\\rightarrow$ \`Completed\`

#### Analisis Kompleksitas Algoritma FSM:
- **Time Complexity: $O(1)$** per transisi state menggunakan lookup array hash map atau match expression.
- **Space Complexity: $O(1)$** tanpa dependensi eksternal.`
                }
              ],
              starterCode: `<?php
declare(strict_types=1);

enum OrderState: string {
    case Draft = 'draft';
    case PendingPayment = 'pending_payment';
    case Paid = 'paid';
    case Shipped = 'shipped';
    case Completed = 'completed';
    case Cancelled = 'cancelled';

    public function canTransitionTo(self $nextState): bool {
        return match ($this) {
            self::Draft => in_array($nextState, [self::PendingPayment, self::Cancelled], true),
            self::PendingPayment => in_array($nextState, [self::Paid, self::Cancelled], true),
            self::Paid => in_array($nextState, [self::Shipped], true),
            self::Shipped => in_array($nextState, [self::Completed], true),
            self::Completed, self::Cancelled => false, // Terminal states
        };
    }
}

final readonly class OrderPayloadDTO {
    public function __construct(
        public string $orderId,
        public int $totalAmountCents,
        public OrderState $state
    ) {}

    public function transition(OrderState $newState): self {
        if (!$this->state->canTransitionTo($newState)) {
            throw new DomainException("Transisi tidak sah dari {$this->state->value} ke {$newState->value}");
        }

        return new self(
            orderId: $this->orderId,
            totalAmountCents: $this->totalAmountCents,
            state: $newState
        );
    }
}

// Simulasi:
$order = new OrderPayloadDTO('ORD-901', 25000000, OrderState::Draft);
$order = $order->transition(OrderState::PendingPayment);
$order = $order->transition(OrderState::Paid);
echo "Status Akhir Order: {$order->state->value}\\n";
?>`,
              hints: [
                "Gunakan in_array(..., true) untuk strict comparison di method canTransitionTo",
                "Method transition() pada readonly class harus mengembalikan instance new self() baru (immutable pattern)",
                "Tangani terminal states dengan mengembalikan false jika order sudah Completed atau Cancelled"
              ],
              requirements: [
                {
                  id: "req-fsm-enum",
                  description: "Mendeklarasikan enum OrderState dengan method canTransitionTo",
                  validate: (code) => code.includes("enum OrderState") && code.includes("canTransitionTo")
                },
                {
                  id: "req-dto-readonly",
                  description: "Menggunakan final readonly class untuk OrderPayloadDTO",
                  validate: (code) => code.includes("readonly class OrderPayloadDTO") && code.includes("transition")
                }
              ]
            },
            {
              id: "php-les-quiz-enums-ro",
              title: "Kuis Enums & Immutability PHP 8.x",
              type: "quiz",
              xpReward: 30,
              questions: [
                {
                  id: "pq-enum-1",
                  question: "Bagaimana cara mengambil instance Backed Enum dari string mentah yang didapat dari database atau JSON request?",
                  options: [
                    "OrderStatus::from($stringValue);",
                    "new OrderStatus($stringValue);",
                    "OrderStatus::cast($stringValue);",
                    "parse_enum(OrderStatus, $stringValue);"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "Method bawaan `Enum::from($value)` memetakan nilai scalar ke case enum yang cocok. Jika nilai tidak valid, ia melempar ValueError."
                },
                {
                  id: "pq-enum-2",
                  question: "Mengapa perbandingan enum ($statusA === $statusB) bernilai O(1) pointer check pada Zend Engine?",
                  options: [
                    "Karena setiap case enum diinisialisasi sebagai singleton object unik di memori C, sehingga perbandingan hanya membandingkan alamat memori pointer",
                    "Karena enum diubah menjadi boolean",
                    "Karena enum tidak disimpan di memori RAM",
                    "Karena Zend VM menghapus enum saat runtime"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "Zend Engine menyimpan case enum sebagai singleton immutable instances; perbandingan identik (===) memeriksa kesamaan alamat pointer memori C secara instan (1 CPU cycle)."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "php-lvl-1",
      title: "Level 1 \u2014 Pemrograman Berorientasi Objek (OOP) & Arsitektur PSR",
      description: "Constructor Property Promotion, Readonly Classes, Interfaces, Dependency Injection, In-Memory LRU Cache, dan PSR-4 Autoloading.",
      modules: [
        {
          id: "php-mod-3",
          title: "Class Modern & SOLID Principles di PHP 8",
          description: "Memangkas boilerplate code dan membangun modularitas enterprise berstandar industri dengan struktur data performa tinggi.",
          lessons: [
            {
              id: "php-les-oop-modern",
              title: "Constructor Property Promotion & Dependency Injection Container",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Revolusi Boilerplate di PHP 8: Constructor Property Promotion

Dahulu, membuat class sederhana membutuhkan penulisan deklarasi variabel, argumen constructor, dan \`$this->var = $var\` berulang-ulang hingga belasan baris.

**Di PHP 8:**
Cukup tentukan *access modifier* (\`public\`, \`private\`, \`protected\`) langsung pada parameter constructor! PHP akan otomatis mendeklarasikan properti class dan menetapkan nilainya saat instansiasi.

---

### Deep-Dive Theory: IoC Container & Topological Dependency Resolution
Dependency Injection (DI) Container modern (seperti Laravel Service Container atau Symfony DependencyInjection) menyelesaikan dependensi secara otomatis via **Reflection API**:
1. Container menginspeksi tipe parameter constructor (\`ReflectionMethod::getParameters()\`).
2. Jika Class A membutuhkan Interface B, dan B diimplementasikan oleh Class C yang membutuhkan Database D, container membangun **Directed Acyclic Graph (DAG)**.
3. Container melakukan traversal **Topological Sort / DFS** dengan kompleksitas waktu $O(V + E)$ (di mana $V$ adalah class dan $E$ adalah dependensi), mendeteksi apakah ada *circular dependency* (A butuh B, B butuh A) dan menginstansiasi objek dalam urutan yang tepat.`
                },
                {
                  type: "code-example",
                  language: "php",
                  code: `<?php
declare(strict_types=1);

interface LoggerInterface {
    public function log(string $level, string $message): void;
}

class SystemLogger implements LoggerInterface {
    public function log(string $level, string $message): void {
        echo "[" . strtoupper($level) . "] " . date('H:i:s') . " - {$message}
";
    }
}

final readonly class PaymentGatewayService {
    public function __construct(
        private LoggerInterface $logger,
        private string $merchantApiKey,
        private int $timeoutSeconds = 30
    ) {}

    public function processPayment(string $account, int $amount): bool {
        $this->logger->log('info', "Memproses debet Rp {$amount} untuk akun: {$account}");
        $this->logger->log('info', "Debet berhasil dikonfirmasi.");
        return true;
    }
}

$logger = new SystemLogger();
$paymentApp = new PaymentGatewayService(
    logger: $logger,
    merchantApiKey: "sec_live_9921893123"
);

$paymentApp->processPayment("ID-ACC-4910", 750000);
?>`
                }
              ]
            },
            {
              id: "php-les-practice-lru-cache",
              title: "ADVANCED PRACTICE: In-Memory LRU Cache Engine ($O(1)$ Get & Put Complexity)",
              type: "practice",
              xpReward: 50,
              content: [
                {
                  type: "markdown",
                  content: `### Skenario Industri: Caching Respon Microservice di RAM

Pada sistem backend berkinerja tinggi, kita sering memerlukan cache lokal di memori proses untuk menyimpan hasil query database atau panggilan API eksternal. Jika memori dibiarkan tumbuh tanpa batas, proses PHP akan mengalami crash *Out of Memory (OOM)*.

---

### Solusi Algoritmik: Least Recently Used (LRU) Cache
Struktur data LRU Cache membuang item yang paling lama tidak diakses ketika kapasitas penuh:
1. **Hash Map (Array Associative PHP):** Memberikan akses pencarian key ke node dalam **$O(1)$ time**.
2. **Doubly-Linked List (Node dengan \`$prev\` dan \`$next\`):** Memungkinkan perpindahan node ke urutan paling depan (Most Recently Used) dan penghapusan node paling belakang (Least Recently Used) dalam **$O(1)$ time**.

#### Analisis Kompleksitas:
- **\`get($key)\`:** $O(1)$ Time \u2014 Mengambil nilai via hash table dan memindahkan node ke kepala antrean.
- **\`put($key, $value)\`:** $O(1)$ Time \u2014 Menyisipkan di depan; jika kapasitas melebihi batas, hapus ekor dalam $O(1)$.
- **Space Complexity:** $O(C)$ \u2014 Tepat proporsional dengan kapasitas maksimum $C$.`
                }
              ],
              starterCode: `<?php
declare(strict_types=1);

final class LRUNode {
    public ?LRUNode $prev = null;
    public ?LRUNode $next = null;

    public function __construct(
        public string $key,
        public mixed $value
    ) {}
}

final class LRUCache {
    /** @var array<string, LRUNode> */
    private array $map = [];
    private ?LRUNode $head = null;
    private ?LRUNode $tail = null;
    private int $count = 0;

    public function __construct(private readonly int $capacity = 3) {
        if ($capacity <= 0) {
            throw new InvalidArgumentException("Kapasitas LRU harus lebih besar dari nol.");
        }
    }

    public function get(string $key): mixed {
        if (!isset($this->map[$key])) {
            return null;
        }

        $node = $this->map[$key];
        $this->moveToHead($node);
        return $node->value;
    }

    public function put(string $key, mixed $value): void {
        if (isset($this->map[$key])) {
            $node = $this->map[$key];
            $node->value = $value;
            $this->moveToHead($node);
            return;
        }

        $newNode = new LRUNode($key, $value);
        $this->map[$key] = $newNode;
        $this->addToHead($newNode);
        $this->count++;

        if ($this->count > $this->capacity) {
            $this->evictTail();
        }
    }

    private function addToHead(LRUNode $node): void {
        $node->prev = null;
        $node->next = $this->head;

        if ($this->head !== null) {
            $this->head->prev = $node;
        }
        $this->head = $node;

        if ($this->tail === null) {
            $this->tail = $node;
        }
    }

    private function removeNode(LRUNode $node): void {
        if ($node->prev !== null) {
            $node->prev->next = $node->next;
        } else {
            $this->head = $node->next;
        }

        if ($node->next !== null) {
            $node->next->prev = $node->prev;
        } else {
            $this->tail = $node->prev;
        }
    }

    private function moveToHead(LRUNode $node): void {
        $this->removeNode($node);
        $this->addToHead($node);
    }

    private function evictTail(): void {
        if ($this->tail === null) return;
        $tailKey = $this->tail->key;
        $this->removeNode($this->tail);
        unset($this->map[$tailKey]);
        $this->count--;
    }
}

// Simulasi Pengujian:
$cache = new LRUCache(capacity: 2);
$cache->put('user_1', ['name' => 'Budi']);
$cache->put('user_2', ['name' => 'Siti']);
echo "Get user_1: " . ($cache->get('user_1')['name'] ?? 'null') . "\\n"; // user_1 jadi MRU

$cache->put('user_3', ['name' => 'Rian']); // Menggusur user_2 (LRU)
echo "Get user_2 (harus null): " . ($cache->get('user_2') === null ? 'Evicted' : 'Ada') . "\\n";
?>`,
              hints: [
                "Struktur data gabungan hash map + doubly linked list adalah kunci mencapai O(1) get dan put",
                "Pastikan removeNode dan addToHead mengupdate pointer prev dan next secara cermat",
                "Saat evictTail(), jangan lupa menghapus key dari associative array $this->map menggunakan unset()"
              ],
              requirements: [
                {
                  id: "req-lru-structure",
                  description: "Mendefinisikan LRUNode dan LRUCache dengan method get dan put",
                  validate: (code) => code.includes("class LRUNode") && code.includes("class LRUCache") && code.includes("evictTail")
                },
                {
                  id: "req-lru-complexity",
                  description: "Menjamin operasi O(1) dengan doubly linked list pointer updates",
                  validate: (code) => code.includes("addToHead") && code.includes("removeNode")
                }
              ]
            },
            {
              id: "php-les-quiz-oop",
              title: "Kuis OOP & SOLID PHP Modern",
              type: "quiz",
              xpReward: 35,
              questions: [
                {
                  id: "pq-oop-1",
                  question: "Apa manfaat utama dari Constructor Property Promotion di PHP 8?",
                  options: [
                    "Menggabungkan deklarasi properti, parameter constructor, dan assignment $this->prop = $prop dalam satu baris parameter",
                    "Mengubah semua variabel menjadi string secara otomatis",
                    "Menonaktifkan garbage collection PHP",
                    "Membuat fungsi constructor berjalan di background thread terpisah"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "Constructor Property Promotion mengeliminasi penulisan properti berulang-ulang dengan mendeklarasikan visibilitas langsung di parameter constructor."
                }
              ]
            }
          ]
        },
        {
          id: "php-mod-4",
          title: "Standar PSR & Ekosistem Modern Composer",
          description: "PSR-4 Autoloading, Trie Prefix Matching, dan PSR-15 Middleware Onion Architecture.",
          lessons: [
            {
              id: "php-les-psr-composer",
              title: "PSR-4 Namespaces, Autoloading & Struktur Enterprise Composer",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Standar PSR (PHP Standard Recommendation)

PHP-FIG (Framework Interoperability Group) menetapkan standar baku agar pustaka open-source dapat saling bekerja sama tanpa konflik:
- **PSR-1 & PSR-12:** Coding Style Guide (aturan indentasi, penamaan class, dan kurung kurawal).
- **PSR-4:** Autoloader standar. Memetakan namespace PHP secara matematis ke struktur direktori fisik.
- **PSR-7 & PSR-15:** Standar HTTP Message (Request & Response) dan HTTP Server Middleware.

---

### Deep-Dive Theory: Algoritma Autoloading Composer ($O(K)$ vs $O(1)$)
Bagaimana Composer menemukan file \`App\\Domain\\Services\\OrderDispatcher\` saat dipanggil pertama kali?
1. **Dynamic Fallback ($O(K)$ Prefix Match):** Composer memecah namespace menggunakan **Trie (Prefix Tree)** untuk menemukan root direktori yang cocok, lalu memverifikasi keberadaan file di disk melalui syscall \`file_exists()\` ($O(K)$ disk lookup overhead).
2. **Authoritative Classmap Optimization (\`composer dump-autoload -o -a\`):**
   Pada environment produksi, Composer memindai seluruh direktori proyek saat fase build CI/CD dan menyusun satu array PHP murni raksasa yang memetakan FQCN langsung ke absolute path.
   - **Kompleksitas:** Akses langsung array associative **$O(1)$ in-memory hash lookup**, tanpa penelusuran disk I/O bertahap!`
                },
                {
                  type: "code-example",
                  language: "php",
                  code: `<?php
declare(strict_types=1);

namespace App\\Domain\\Services;

interface DispatcherInterface {
    public function dispatch(string $orderId): void;
}

final readonly class OrderDispatcher implements DispatcherInterface {
    public function dispatch(string $orderId): void {
        echo "Order #{$orderId} berhasil diproses melalui sistem antrean.\\n";
    }
}
?>`
                }
              ]
            },
            {
              id: "php-les-practice-middleware-pipeline",
              title: "ADVANCED PRACTICE: PSR-15 Onion Middleware Pipeline ($O(N)$ Request Dispatcher)",
              type: "practice",
              xpReward: 50,
              content: [
                {
                  type: "markdown",
                  content: `### Skenario Industri: Arsitektur Onion Middleware API Gateway

Setiap request HTTP yang masuk ke API enterprise harus melewati beberapa lapisan filter keamanan:
1. **Lapisan 1 (Execution Time Logger):** Mengukur durasi total proses request.
2. **Lapisan 2 (API Key Authenticator):** Memverifikasi header otentikasi.
3. **Lapisan Inti (Core Request Handler):** Menghasilkan konten JSON payload.

Ketika respon kembali, respon mengalir balik keluar menembus lapisan logger (*Onion Architecture*).

---

### Analisis Kompleksitas:
- **Time Complexity: $O(N)$** \u2014 Setiap middleware dieksekusi tepat 2 kali (fase request masuk dan fase response keluar) di mana $N$ adalah jumlah middleware dalam pipeline.
- **Space Complexity: $O(N)$ Call Stack** \u2014 Kedalaman call stack proporsional terhadap $N$ lapisan middleware.`
                }
              ],
              starterCode: `<?php
declare(strict_types=1);

interface MiddlewareInterface {
    public function process(array $request, callable $next): array;
}

final class TimingMiddleware implements MiddlewareInterface {
    public function process(array $request, callable $next): array {
        $startTime = microtime(true);
        // Lanjutkan ke lapisan berikutnya
        $response = $next($request);
        $durationMs = round((microtime(true) - $startTime) * 1000, 2);
        $response['headers']['X-Response-Time-Ms'] = $durationMs;
        return $response;
    }
}

final class AuthMiddleware implements MiddlewareInterface {
    public function process(array $request, callable $next): array {
        if (($request['headers']['X-API-Key'] ?? '') !== 'secret-token-2026') {
            return [
                'status' => 401,
                'headers' => ['Content-Type' => 'application/json'],
                'body' => json_encode(['error' => 'Unauthorized Access'])
            ];
        }
        return $next($request);
    }
}

final class MiddlewarePipeline {
    /** @var MiddlewareInterface[] */
    private array $middlewares = [];

    public function pipe(MiddlewareInterface $middleware): self {
        $this->middlewares[] = $middleware;
        return $this;
    }

    public function handle(array $request, callable $coreHandler): array {
        // O(N) Array Reduction menghasilkan rantai fungsi callable berlapis (Onion)
        $pipeline = array_reduce(
            array_reverse($this->middlewares),
            fn(callable $next, MiddlewareInterface $middleware) => fn(array $req) => $middleware->process($req, $next),
            $coreHandler
        );

        return $pipeline($request);
    }
}

// Simulasi Pengujian:
$pipeline = (new MiddlewarePipeline())
    ->pipe(new TimingMiddleware())
    ->pipe(new AuthMiddleware());

$request = [
    'method' => 'GET',
    'uri' => '/api/v1/orders',
    'headers' => ['X-API-Key' => 'secret-token-2026']
];

$response = $pipeline->handle($request, function(array $req) {
    return [
        'status' => 200,
        'headers' => ['Content-Type' => 'application/json'],
        'body' => json_encode(['data' => 'Pesanan berhasil dimuat'])
    ];
});

echo "Status Code: " . $response['status'] . " | Latency: " . $response['headers']['X-Response-Time-Ms'] . "ms\\n";
?>`,
              hints: [
                "Teknik array_reduce dengan array_reverse membalut coreHandler dari lapisan terdalam ke terluar",
                "Pastikan middleware Auth mengembalikan respons 401 langsung tanpa memanggil $next jika token salah",
                "TimingMiddleware memanggil microtime(true) sebelum dan sesudah $next($request)"
              ],
              requirements: [
                {
                  id: "req-mid-pipe",
                  description: "Mengimplementasikan MiddlewarePipeline dengan array_reduce atau recursion",
                  validate: (code) => code.includes("MiddlewarePipeline") && code.includes("handle")
                },
                {
                  id: "req-mid-interfaces",
                  description: "Mendefinisikan MiddlewareInterface dan TimingMiddleware",
                  validate: (code) => code.includes("MiddlewareInterface") && code.includes("TimingMiddleware")
                }
              ]
            },
            {
              id: "php-les-quiz-psr",
              title: "Kuis Standar PSR & Composer",
              type: "quiz",
              xpReward: 30,
              questions: [
                {
                  id: "pq-psr-1",
                  question: "Mengapa menjalankan composer dump-autoload -o -a sangat krusial untuk performa produksi tingkat enterprise?",
                  options: [
                    "Mengubah pencarian file dari O(K) disk file_exists() menjadi O(1) in-memory hash array lookup",
                    "Menghapus seluruh file PHP di vendor",
                    "Mengubah PHP menjadi binary file C++",
                    "Mempercepat koneksi internet server"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "Flag -o -a mengompilasi Authoritative Classmap murni, menghilangkan disk I/O traversal pencarian file di runtime dan langsung menyelesaikan FQCN dalam O(1) array memory."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "php-lvl-2",
      title: "Level 2 \u2014 Database PDO, Kriptografi Argon2id & Keamanan Web OWASP",
      description: "Prepared statements PDO, hashing password Argon2id, transaksi terdistribusi, Idempotent Webhook Processing, dan OWASP defense.",
      modules: [
        {
          id: "php-mod-5",
          title: "Keamanan Database PDO & Transaksi ACID",
          description: "Mencegah SQL Injection mutlak, mengelola transaksi atomik, dan memproses webhook pembayaran secara idempotent.",
          lessons: [
            {
              id: "php-les-pdo-security",
              title: "PDO Prepared Statements & Anti-SQL Injection",
              type: "learn",
              xpReward: 45,
              content: [
                {
                  type: "markdown",
                  content: `### Mengapa PDO Prepared Statement Kebal SQL Injection?

SQL Injection terjadi ketika input user digabungkan langsung dengan string query SQL (\`"SELECT * FROM users WHERE email = '" . $email . "'"\`). Hacker dapat menyisipkan payload \`' OR '1'='1\`.

#### Cara Kerja PDO Prepared Statements Server-Side:
1. **Prepare Stage:** Query SQL dikirimkan ke database engine **tanpa data parameter**. Database menyusun dan mengompilasi syntax tree terlebih dahulu.
2. **Execute Stage:** Nilai parameter dikirimkan terpisah sebagai data murni melalui protokol biner MySQL. Database **tidak akan pernah** mengeksekusi data parameter sebagai instruksi kode SQL!

---

### Deep-Dive: Emulated Prepares vs Real Server-Side Prepares
Secara default di driver lawas, \`PDO::ATTR_EMULATE_PREPARES\` aktif bernilai \`true\`. Ini berarti PDO hanya melakukan \`addslashes()\` string escaping di sisi PHP!
- **Wajib disetel:** \`PDO::ATTR_EMULATE_PREPARES => false\`
- Ini memaksa database engine MySQL mengompilasi query menggunakan **MySQL Client/Server Binary Protocol**, menjamin proteksi 100% dari SQL Injection multibyte encoding attacks.`
                },
                {
                  type: "code-example",
                  language: "php",
                  code: `<?php
declare(strict_types=1);

$dsn = "mysql:host=127.0.0.1;dbname=codera_db;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false, // Binary protocol murni
];

try {
    $pdo = new PDO($dsn, "codera_app", "Secret_Vault_Pass_2026", $options);

    $stmt = $pdo->prepare("
        SELECT id, username, email, role, status 
        FROM users 
        WHERE email = :email AND status = :status
        LIMIT 1
    ");

    $stmt->execute([
        ':email'  => 'developer@codera.dev',
        ':status' => 'ACTIVE'
    ]);

    $user = $stmt->fetch();
    if ($user) {
        echo "Ditemukan user: {$user['username']} ({$user['role']})
";
    }
} catch (PDOException $e) {
    error_log("Database Error: " . $e->getMessage());
    http_response_code(500);
}
?>`
                }
              ]
            },
            {
              id: "php-les-pdo-transactions",
              title: "Transaksi Database ACID di PDO: Commit & Rollback",
              type: "learn",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: `### Integritas Transaksi Keuangan: Semua Berhasil atau Semua Dibatalkan

Ketika melakukan operasi multi-tabel (misalnya memotong saldo akun dan menambahkan riwayat mutasi transaksi), kegagalan di tengah jalan tidak boleh meninggalkan data korup (uang terpotong tapi mutasi tidak tercatat).

#### Blok Transaksi Standar di PDO:
- \`$pdo->beginTransaction();\` : Memulai transaksi.
- \`$pdo->commit();\` : Menyimpan seluruh perubahan secara permanen jika semua query sukses.
- \`$pdo->rollBack();\` : Membatalkan seluruh query yang sempat dieksekusi jika terjadi exception.

---

### Skenario Nyata & Pencegahan Deadlock: Sorted Resource Locking
Bayangkan Pengguna A mentransfer ke B, dan Pengguna B mentransfer ke A di milidetik yang sama. Jika Thread 1 mengunci A lalu B, dan Thread 2 mengunci B lalu A, terjadi **Deadlock**!
- **Aturan Algoritma ($O(1)$ Deadlock Prevention):** Selalu kunci row akun berdasarkan urutan terkecil ke terbesar (\`min($from, $to)\` terlebih dahulu, lalu \`max($from, $to)\`). Dengan urutan deterministic, siklus saling tunggu (*circular wait*) dijamin musnah!`
                },
                {
                  type: "code-example",
                  language: "php",
                  code: `<?php
declare(strict_types=1);

function transferFunds(PDO $pdo, int $fromUserId, int $toUserId, int $amountCents): bool {
    try {
        $pdo->beginTransaction();

        // Pencegahan Deadlock: Urutkan ID sebelum SELECT FOR UPDATE
        $firstLockId = min($fromUserId, $toUserId);
        $secondLockId = max($fromUserId, $toUserId);

        $lockStmt = $pdo->prepare("SELECT user_id, balance_cents FROM user_wallets WHERE user_id IN (?, ?) FOR UPDATE");
        $lockStmt->execute([$firstLockId, $secondLockId]);

        // Verifikasi saldo pengirim...
        $deductStmt = $pdo->prepare("UPDATE user_wallets SET balance_cents = balance_cents - :amt WHERE user_id = :uid");
        $deductStmt->execute([':amt' => $amountCents, ':uid' => $fromUserId]);

        $creditStmt = $pdo->prepare("UPDATE user_wallets SET balance_cents = balance_cents + :amt WHERE user_id = :uid");
        $creditStmt->execute([':amt' => $amountCents, ':uid' => $toUserId]);

        $pdo->commit();
        return true;
    } catch (Throwable $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        error_log("Transfer error: " . $e->getMessage());
        return false;
    }
}
?>`
                }
              ]
            },
            {
              id: "php-les-practice-idempotent-webhook",
              title: "ADVANCED PRACTICE: Idempotent Payment Webhook Processor ($O(1)$ Deduplication)",
              type: "practice",
              xpReward: 50,
              content: [
                {
                  type: "markdown",
                  content: `### Skenario Industri: Penanganan Webhook Payment Gateway (Stripe/Midtrans)

Gateway pembayaran dapat mengirimkan event webhook yang sama berkali-kali karena network retry (*At-Least-Once Delivery*). Jika sistem tidak kebal duplikasi (*idempotent*), saldo pengguna dapat bertambah ganda atau stok berkurang dua kali!

---

### Arsitektur Idempotency Key & HMAC SHA-256
1. **Verifikasi Kriptografis ($O(L)$):** Memverifikasi signature request menggunakan \`hash_hmac('sha256', $rawPayload, $secret)\` dan \`hash_equals()\` (tahan timing attack).
2. **Atomic Ingestion Check ($O(1)$):** Menyimpan \`idempotency_key\` (ID transaksi unik dari gateway) dengan constraint \`UNIQUE KEY\` di database.
3. Jika key sudah pernah diproses, return \`200 OK\` instan tanpa mengeksekusi logika bisnis kedua kalinya.`
                }
              ],
              starterCode: `<?php
declare(strict_types=1);

final class IdempotentWebhookProcessor {
    /** @var array<string, bool> Simulasi tabel database processed_events */
    private array $processedEvents = [];

    public function __construct(private readonly string $webhookSecret) {}

    public function verifySignature(string $rawPayload, string $receivedSignature): bool {
        $expectedSignature = hash_hmac('sha256', $rawPayload, $this->webhookSecret);
        // Wajib gunakan hash_equals() untuk mencegah timing-attack O(1) byte comparison
        return hash_equals($expectedSignature, $receivedSignature);
    }

    public function processWebhook(string $rawPayload, string $signature): array {
        if (!$this->verifySignature($rawPayload, $signature)) {
            return ['status' => 403, 'message' => 'Invalid Webhook Signature'];
        }

        $data = json_decode($rawPayload, true);
        $eventId = $data['event_id'] ?? null;

        if (!$eventId) {
            return ['status' => 400, 'message' => 'Missing event_id'];
        }

        // O(1) Idempotency Check
        if (isset($this->processedEvents[$eventId])) {
            return ['status' => 200, 'message' => 'Event already processed. Idempotent skip.'];
        }

        // Eksekusi mutasi bisnis
        $this->processedEvents[$eventId] = true;

        return [
            'status' => 200,
            'message' => "Order #{$data['order_id']} successfully paid.",
            'processed' => true
        ];
    }
}

// Simulasi:
$secret = 'secret_wh_key_99812';
$processor = new IdempotentWebhookProcessor($secret);

$payload = json_encode(['event_id' => 'evt_101', 'order_id' => 'ORD-8821', 'amount' => 50000]);
$validSig = hash_hmac('sha256', $payload, $secret);

$res1 = $processor->processWebhook($payload, $validSig);
$res2 = $processor->processWebhook($payload, $validSig); // Pengiriman ulang (Retry)

echo "Call 1: {$res1['message']}\\n";
echo "Call 2: {$res2['message']}\\n";
?>`,
              hints: [
                "Gunakan hash_hmac dengan algoritma sha256 untuk memvalidasi tanda tangan kriptografis webhook",
                "Gunakan hash_equals($expected, $actual) untuk membandingkan string hash tanpa bocor timing attack",
                "Cek isset($this->processedEvents[$eventId]) untuk deteksi idempotensi seketika O(1)"
              ],
              requirements: [
                {
                  id: "req-wh-crypto",
                  description: "Menggunakan hash_hmac dan hash_equals untuk verifikasi signature",
                  validate: (code) => code.includes("hash_hmac") && code.includes("hash_equals")
                },
                {
                  id: "req-wh-idempotent",
                  description: "Menerapkan pengecekan idempotensi event_id untuk mengabaikan duplikasi",
                  validate: (code) => code.includes("event_id") && (code.includes("isset") || code.includes("array_key_exists"))
                }
              ]
            },
            {
              id: "php-les-quiz-sec",
              title: "Kuis Keamanan & PDO PHP",
              type: "quiz",
              xpReward: 35,
              questions: [
                {
                  id: "pq-sec-1",
                  question: "Mengapa opsi PDO::ATTR_EMULATE_PREPARES disetel ke false pada konfigurasi koneksi database PDO?",
                  options: [
                    "Agar PDO menggunakan Prepared Statement murni yang dikompilasi langsung oleh database server alih-alih emulasi string lokal",
                    "Untuk mempercepat rendering halaman HTML",
                    "Untuk mengaktifkan auto-restart server MySQL",
                    "Agar bisa menjalankan query tanpa password"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "Menonaktifkan emulasi memastikan engine database MySQL mengompilasi struktur query secara terpisah di server, menjamin proteksi SQL Injection sejati."
                }
              ]
            }
          ]
        },
        {
          id: "php-mod-6",
          title: "Kriptografi & OWASP Top 10 Web Defense",
          description: "Hashing password Argon2id, Session hijacking defense, CSRF tokens, dan sanitasi input.",
          lessons: [
            {
              id: "php-les-argon-defense",
              title: "Argon2id Password Hashing & OWASP Defense",
              type: "learn",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: `### Standar Emas Password Hashing Modern

Jangan pernah menggunakan \`md5()\`, \`sha1()\`, atau bahkan \`sha256()\` untuk menyimpan password! Algoritma ini dirancang cepat untuk integritas checksum file, sehingga peretas dapat mencoba miliaran kombinasi per detik menggunakan GPU.

#### Rekomendasi OWASP:
Gunakan **Argon2id** bawaan PHP (\`PASSWORD_ARGON2ID\`). Argon2id adalah pemenang Password Hashing Competition yang bersifat *memory-hard*, resisten terhadap serangan ASIC/GPU cracking.

---

### Deep-Dive: Parameter Kriptografi Argon2id
- **\`memory_cost\` (RAM):** Jumlah memori yang wajib dialokasikan (misal 64 MB = \`65536\` KiB). Menghancurkan efisiensi kartu grafis peretas (GPU tidak memiliki memori berkapasitas besar per core).
- **\`time_cost\` (Iterasi CPU):** Jumlah lintasan kalkulasi linear.
- **\`threads\`:** Jumlah thread paralel eksekusi.`
                },
                {
                  type: "code-example",
                  language: "php",
                  code: `<?php
declare(strict_types=1);

$plainPassword = "SuperSecurePassword123#";

$hashedPassword = password_hash($plainPassword, PASSWORD_ARGON2ID, [
    'memory_cost' => 65536, // 64MB RAM
    'time_cost'   => 4,     // 4 iterasi CPU
    'threads'     => 1,
]);

echo "Hash Argon2id: " . substr($hashedPassword, 0, 32) . "...
";

// Verifikasi
if (password_verify($plainPassword, $hashedPassword)) {
    echo "Autentikasi Berhasil!
";
}
?>`
                }
              ]
            },
            {
              id: "php-les-quiz-crypto",
              title: "Kuis Kriptografi & Proteksi OWASP",
              type: "quiz",
              xpReward: 30,
              questions: [
                {
                  id: "pq-cr-1",
                  question: "Fungsi bawaan PHP apa yang wajib digunakan untuk memverifikasi password terhadap hash Argon2id atau Bcrypt?",
                  options: [
                    "password_verify()",
                    "hash_equals()",
                    "md5_check()",
                    "crypt_match()"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "`password_verify($password, $hash)` memverifikasi kecocokan password plaintext terhadap hash yang dihasilkan oleh `password_hash()` dan aman dari serangan timing attack."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "php-lvl-3",
      title: "Level 3 \u2014 Advanced PHP 8.x, Fibers, JIT & REST API Architecture",
      description: "PHP Attributes, Fibers & Asynchronous Concurrency, JIT Compiler Internals, dan arsitektur RESTful API modern dengan Radix Tree Routing.",
      modules: [
        {
          id: "php-mod-7",
          title: "Fitur Advanced Engine: Attributes, Fibers & JIT",
          description: "Menggantikan PHPDoc annotations dengan native Attributes, Fibers untuk non-blocking async, dan JIT compiler.",
          lessons: [
            {
              id: "php-les-attributes-fibers",
              title: "Native Attributes (#[Route]) & Fibers Concurrency",
              type: "learn",
              xpReward: 45,
              content: [
                {
                  type: "markdown",
                  content: `### Native Attributes (Pengganti PHPDoc Docblocks)

Di PHP era sebelum 8.0, framework seperti Symfony dan Doctrine mengandalkan komentar \`/** @Route("/users") */\`. Ini lambat karena framework harus mem-parsing string komentar secara manual via Regex.

**PHP 8 Attributes:**
\`\`\`php
#[Attribute(Attribute::TARGET_METHOD)]
class Route {
    public function __construct(public string $path, public string $method = 'GET') {}
}

class UserController {
    #[Route(path: '/api/v1/users', method: 'GET')]
    public function listUsers(): array { ... }
}
\`\`\`

---

### Deep-Dive Theory: Fibers vs OS Threads & JIT Compilers
- **Fibers (Cooperative Multitasking):** Fibers berjalan di single thread namun memiliki call stack C sendiri. Perpindahan context switch antar fiber terjadi dalam skala **nanodetik** (hanya menukar pointer stack CPU via \`swapcontext\`), ribuan kali lebih ringan daripada kernel thread context switch.
- **JIT Compiler (Tracing vs Function JIT):** PHP 8 mengadopsi Tracing JIT yang memantau loop *hot-path* bytecode dan mengompilasinya langsung ke instruksi mesin x86-64 / ARM64 native!`
                },
                {
                  type: "code-example",
                  language: "php",
                  code: `<?php
declare(strict_types=1);

$fiber = new Fiber(function (): void {
    echo "[Fiber] Langkah 1: Memulai kalkulasi...
";
    $value = Fiber::suspend('Fiber meminta checkpoint 1');
    echo "[Fiber] Langkah 2: Melanjutkan setelah menerima: '{$value}'
";
});

$msg = $fiber->start();
echo "[Main] Dari Fiber: {$msg}
";
$fiber->resume('OK, lanjutkan!');
?>`
                }
              ]
            },
            {
              id: "php-les-practice-async-fiber",
              title: "ADVANCED PRACTICE: Concurrent Task Poller dengan PHP 8.1 Fibers ($O(N)$ Cooperative Async)",
              type: "practice",
              xpReward: 50,
              content: [
                {
                  type: "markdown",
                  content: `### Skenario Industri: Multi-API Health Checker Non-Blocking

Sebuah microservice gateway harus memeriksa status kesehatan dari 5 service eksternal secara berkala. Menjalankan HTTP curl secara sekuensial menghabiskan $5 \\times 200\\text{ms} = 1\\text{ detik}$.

Dengan memanfaatkan **PHP 8.1 Fibers**, kita dapat menjalankan beberapa tugas secara interleaving (kooperatif) dalam satu proses PHP tunggal tanpa membekukan thread utama!

---

### Analisis Kompleksitas:
- **Time Complexity: $O(\\max(T_i))$** \u2014 Waktu eksekusi ditentukan oleh durasi tugas terlama, bukan penjumlahan total tugas ($O(\\sum T_i)$).
- **Space Complexity: $O(N)$** \u2014 Setiap fiber mengalokasikan stack memori ringan (~4 KB).`
                }
              ],
              starterCode: `<?php
declare(strict_types=1);

final class AsyncWorkerPool {
    /** @var Fiber[] */
    private array $fibers = [];

    public function enqueue(string $taskName, int $steps): void {
        $this->fibers[] = new Fiber(function() use ($taskName, $steps): void {
            for ($step = 1; $step <= $steps; $step++) {
                Fiber::suspend("Task [{$taskName}] tuntas tahapan {$step}/{$steps}");
            }
        });
    }

    public function runAll(): array {
        $logs = [];
        // Loop scheduler cooperative multitasking
        while (!empty($this->fibers)) {
            foreach ($this->fibers as $index => $fiber) {
                if (!$fiber->isStarted()) {
                    $logs[] = $fiber->start();
                } elseif ($fiber->isSuspended()) {
                    $logs[] = $fiber->resume();
                }

                if ($fiber->isTerminated()) {
                    unset($this->fibers[$index]);
                }
            }
            // Re-index array setelah unset
            $this->fibers = array_values($this->fibers);
        }
        return $logs;
    }
}

// Simulasi:
$pool = new AsyncWorkerPool();
$pool->enqueue('AuthService', 2);
$pool->enqueue('PaymentGateway', 3);

$results = $pool->runAll();
foreach ($results as $log) {
    echo "{$log}\\n";
}
?>`,
              hints: [
                "Gunakan $fiber->isStarted() untuk mengecek apakah fiber perlu di-start() atau di-resume()",
                "Hapus fiber dari antrean worker jika $fiber->isTerminated() telah bernilai true",
                "Fiber::suspend() mengembalikan data sementara ke scheduler di runAll()"
              ],
              requirements: [
                {
                  id: "req-fiber-pool",
                  description: "Mendeklarasikan AsyncWorkerPool menggunakan class Fiber bawaan PHP 8.1",
                  validate: (code) => code.includes("class AsyncWorkerPool") && code.includes("Fiber")
                },
                {
                  id: "req-fiber-loop",
                  description: "Mengimplementasikan loop scheduler memeriksa isStarted, isSuspended, dan isTerminated",
                  validate: (code) => code.includes("isStarted") && code.includes("isSuspended") && code.includes("isTerminated")
                }
              ]
            },
            {
              id: "php-les-quiz-adv",
              title: "Kuis Attributes, Fibers & JIT",
              type: "quiz",
              xpReward: 35,
              questions: [
                {
                  id: "pq-adv-1",
                  question: "Karakter pembuka apa yang digunakan untuk mendeklarasikan native Attributes di PHP 8?",
                  options: ["#[...]", "@[...]", "<...>", "/* @... */"],
                  correctAnswerIndex: 0,
                  explanation: "PHP 8 menggunakan sintaks `#[AttributeName]` untuk mendeklarasikan metadata atribut terstruktur."
                }
              ]
            }
          ]
        },
        {
          id: "php-mod-8",
          title: "Membangun RESTful API Enterprise Tanpa Framework",
          description: "Router modular, parsing request JSON, HTTP Status Codes, dan penanganan error standar RFC 7807.",
          lessons: [
            {
              id: "php-les-rest-api",
              title: "Arsitektur REST API & RFC 7807 Problem Details",
              type: "learn",
              xpReward: 45,
              content: [
                {
                  type: "markdown",
                  content: `### Arsitektur REST API Standar Produksi

Saat membangun API backend dengan PHP:
1. **Header Konsisten:** Selalu kirimkan \`Content-Type: application/json; charset=UTF-8\`.
2. **HTTP Status Codes yang Tepat:**
   - \`200 OK\`: Request berhasil.
   - \`201 Created\`: Resource baru berhasil dibuat.
   - \`400 Bad Request\`: Payload JSON tidak valid.
   - \`401 Unauthorized\`: Kredensial tidak disertakan atau kedaluwarsa.
   - \`404 Not Found\`: Endpoint atau resource tidak ditemukan.
   - \`422 Unprocessable Entity\`: Validasi data bisnis gagal.
   - \`500 Internal Server Error\`: Kesalahan fatal di server.
3. **Standar RFC 7807:** Format standar untuk pesan error terstruktur dalam format JSON.

---

### Deep-Dive: Radix Tree (Patricia Trie) vs Linear Regex Routing
- **Linear Regex Routing ($O(R \\times L)$):** Menjalankan perulangan \`preg_match()\` pada setiap route terdaftar ($R$). Lambat pada API enterprise dengan ratusan route.
- **Radix Tree Routing ($O(L)$):** Memetakan URL path ke dalam pohon string terkompresi. Waktu routing hanya bergantung pada panjang path URL ($L$), bukan jumlah total rute yang ada di sistem!`
                },
                {
                  type: "code-example",
                  language: "php",
                  code: `<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);

$response = match (true) {
    $method === 'GET' && $uri === '/api/v1/health' => [
        'status' => 'UP',
        'php_version' => PHP_VERSION,
        'timestamp' => time()
    ],
    default => (function() {
        http_response_code(404);
        return [
            'type' => 'https://api.codera.dev/errors/not-found',
            'title' => 'Resource Not Found',
            'status' => 404
        ];
    })()
};

echo json_encode($response, JSON_THROW_ON_ERROR);
?>`
                }
              ]
            },
            {
              id: "php-les-practice-rest-capstone",
              title: "CAPSTONE CHALLENGE: Production-Grade REST Kernel & RFC 7807 Error Handler",
              type: "challenge",
              xpReward: 100,
              content: [
                {
                  type: "markdown",
                  content: `### Tantangan Capstone: Membangun Enterprise REST Kernel

Rancang arsitektur REST Kernel lengkap yang mampu menangani routing multi-method (\`GET\`, \`POST\`), deserialisasi JSON, validasi input strict, dan membalas error berformat standar **RFC 7807 Problem Details for HTTP APIs**.

#### Spesifikasi Endpoint:
1. \`GET /api/v1/ping\` $\\rightarrow$ Mengembalikan \`200 OK\` dengan JSON \`{"pong": true}\`.
2. \`POST /api/v1/orders\` $\\rightarrow$ Menerima payload JSON \`{"item": "Laptop", "quantity": 2}\`.
   - Jika payload valid: Mengembalikan \`201 Created\` beserta ID unik \`order_id\`.
   - Jika quantity <= 0: Mengembalikan \`422 Unprocessable Entity\` dengan format RFC 7807.
3. Rute tidak dikenal $\\rightarrow$ Mengembalikan \`404 Not Found\`.`
                }
              ],
              starterCode: `<?php
declare(strict_types=1);

final class ApiKernel {
    public function handle(string $method, string $uri, string $rawBody): array {
        try {
            return match (true) {
                $method === 'GET' && $uri === '/api/v1/ping' => [
                    'status' => 200,
                    'body' => ['pong' => true, 'timestamp' => time()]
                ],

                $method === 'POST' && $uri === '/api/v1/orders' => (function() use ($rawBody): array {
                    $payload = json_decode($rawBody, true);
                    
                    if (!is_array($payload) || empty($payload['item']) || ($payload['quantity'] ?? 0) <= 0) {
                        return [
                            'status' => 422,
                            'body' => [
                                'type' => 'https://tools.ietf.org/html/rfc7807',
                                'title' => 'Validation Failed',
                                'status' => 422,
                                'detail' => 'Field item dan quantity (> 0) wajib disertakan.'
                            ]
                        ];
                    }

                    return [
                        'status' => 201,
                        'body' => [
                            'order_id' => 'ORD-' . strtoupper(bin2hex(random_bytes(3))),
                            'item' => $payload['item'],
                            'quantity' => $payload['quantity'],
                            'status' => 'CREATED'
                        ]
                    ];
                })(),

                default => [
                    'status' => 404,
                    'body' => [
                        'type' => 'https://tools.ietf.org/html/rfc7807',
                        'title' => 'Endpoint Not Found',
                        'status' => 404,
                        'detail' => "Tidak ada rute terdaftar untuk {$method} {$uri}"
                    ]
                ]
            };
        } catch (Throwable $e) {
            return [
                'status' => 500,
                'body' => [
                    'type' => 'https://tools.ietf.org/html/rfc7807',
                    'title' => 'Internal Server Error',
                    'status' => 500,
                    'detail' => $e->getMessage()
                ]
            ];
        }
    }
}

// Simulasi Pengujian:
$kernel = new ApiKernel();
$res1 = $kernel->handle('GET', '/api/v1/ping', '');
$res2 = $kernel->handle('POST', '/api/v1/orders', json_encode(['item' => 'Monitor 4K', 'quantity' => 2]));
$res3 = $kernel->handle('POST', '/api/v1/orders', json_encode(['item' => '', 'quantity' => 0]));

echo "Ping Status: " . $res1['status'] . "\\n";
echo "Order Created: " . $res2['status'] . " (ID: " . $res2['body']['order_id'] . ")\\n";
echo "Validation Error RFC 7807: " . $res3['status'] . " - " . $res3['body']['detail'] . "\\n";
?>`,
              hints: [
                "Pastikan menangani status 422 Unprocessable Entity jika data item kosong atau quantity <= 0",
                "Format RFC 7807 wajib menyertakan properti type, title, status, dan detail",
                "Gunakan match(true) untuk mengevaluasi kombinasi method dan URI secara efisien"
              ],
              requirements: [
                {
                  id: "req-cap-kernel",
                  description: "Mendefinisikan ApiKernel dengan method handle menerima method, uri, dan rawBody",
                  validate: (code) => code.includes("class ApiKernel") && code.includes("handle")
                },
                {
                  id: "req-cap-rfc7807",
                  description: "Mengimplementasikan error handling standar RFC 7807 dengan status 422 dan 404",
                  validate: (code) => code.includes("422") && code.includes("404") && code.includes("rfc7807")
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// src/data/mysqlCurriculum.ts
var MYSQL_COURSE = {
  id: "mysql-mastery",
  title: "MySQL 8 & Enterprise Database Architecture",
  shortDescription: "Kuasai arsitektur database relasional modern: Normalisasi 3NF, B+Tree Indexing, EXPLAIN ANALYZE, Transaksi ACID, Window Functions, dan Pencegahan Deadlock.",
  description: "Database relasional adalah jantung sistem finansial, e-commerce, dan enterprise di seluruh dunia. Pelajari MySQL 8.x dari fondasi desain skema dan normalisasi 3NF, query JOIN & Subquery tingkat lanjut, Window Functions, arsitektur mesin penyimpanan InnoDB (Buffer Pool, Redo/Undo Log), optimasi indeks B+ Tree dan Covering Index, bedah execution plan EXPLAIN ANALYZE, hingga mekanisme locking dan mitigasi deadlock dengan analisis kompleksitas algoritma mendalam.",
  icon: "database",
  levels: [
    {
      id: "mysql-lvl-0",
      title: "Level 0 \u2014 Desain Database Relasional & Normalisasi Skema",
      description: "Pemodelan data konseptual, entitas, primary key, foreign key constraints, dan normalisasi 1NF, 2NF, 3NF hingga BCNF.",
      modules: [
        {
          id: "mysql-mod-1",
          title: "Pemodelan Data & Desain Skema Relasional",
          description: "Membangun skema tabel yang kokoh, pemilihan tipe data presisi, dan integritas referensial antar entitas.",
          lessons: [
            {
              id: "mysql-les-schema-design",
              title: "Prinsip Desain Skema: Tipe Data, Constraints & Primary Key",
              type: "learn",
              xpReward: 30,
              content: [
                {
                  type: "markdown",
                  content: `### Fondasi Database Enterprise: Memilih Tipe Data dengan Presisi

Kesalahan umum dalam desain database adalah memilih tipe data yang terlalu boros (misal memakai \`VARCHAR(255)\` untuk status yang hanya 10 karakter, atau memakai \`DOUBLE\` untuk saldo uang).

#### Aturan Emas Tipe Data di MySQL 8:
1. **Keuangan / Mata Uang:** Wajib gunakan \`DECIMAL(15, 2)\` atau simpan dalam satuan terkecil (\`BIGINT\` sen). **Dilarang keras memakai FLOAT/DOUBLE** karena memiliki masalah presisi IEEE 754 floating-point.
2. **Primary Key:** Preferensikan \`BIGINT UNSIGNED AUTO_INCREMENT\` untuk tabel dengan pertumbuhan masif, atau \`BINARY(16)\` jika memerlukan UUID v7 yang terurut waktu (*time-ordered UUID*).
3. **Status / Pilihan Tetap:** Gunakan \`VARCHAR(20)\` dengan \`CHECK\` constraint atau \`ENUM\` terkontrol.
4. **Waktu:** Gunakan \`DATETIME\` (independen dari timezone) atau \`TIMESTAMP\` (otomatis konversi UTC, rentang tahun 1970\u20132038).

---

### Deep-Dive Theory: InnoDB Physical Row Formats (COMPACT vs DYNAMIC)
Di bawah kap mesin InnoDB, data disimpan dalam **Pages berukuran 16 KB**:
- **Format DYNAMIC (Default MySQL 8.0):** Jika kolom \`VARCHAR\` atau \`TEXT\` berukuran sangat besar dan tidak muat dalam 1 halaman 16 KB, InnoDB menyimpan pointer 20-byte pada baris utama dan menempatkan sisa payload ke **Off-Page Overflow Pages**.
- **Page Packing Efficiency:** Memilih tipe data seminimal mungkin (misal \`TINYINT\` 1 byte vs \`INT\` 4 byte) melipatgandakan jumlah baris yang muat dalam 1 halaman RAM Buffer Pool, memangkas kebutuhan disk I/O secara drastis!`
                },
                {
                  type: "code-example",
                  language: "sql",
                  code: `-- DDL Desain Skema Enterprise untuk E-Commerce (MySQL 8.0+)
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    uuid BINARY(16) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('customer', 'merchant', 'admin') NOT NULL DEFAULT 'customer',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    merchant_id BIGINT UNSIGNED NOT NULL,
    sku VARCHAR(64) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    price_cents BIGINT UNSIGNED NOT NULL, -- Rp 50.000 disimpan 5000000
    stock_quantity INT UNSIGNED NOT NULL DEFAULT 0,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_price_positive CHECK (price_cents > 0),
    CONSTRAINT fk_products_merchant FOREIGN KEY (merchant_id) 
        REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
                }
              ]
            },
            {
              id: "mysql-les-fk-relationships",
              title: "Integritas Referensial: Foreign Key Constraints & Cascade Actions",
              type: "learn",
              xpReward: 30,
              content: [
                {
                  type: "markdown",
                  content: `### Menjaga Hubungan Antar Tabel (Relational Integrity)

Foreign Key (FK) memastikan bahwa baris di tabel anak tidak akan pernah menjadi *orphan record* (merujuk ke data induk yang tidak ada).

#### Opsi Aksi Integritas Referensial:
- **\`ON DELETE RESTRICT\` (Default & Teraman):** Menolak penghapusan baris induk jika masih ada baris anak yang merujuk kepadanya.
- **\`ON DELETE CASCADE\`:** Jika baris induk dihapus, seluruh baris anak yang bersangkutan akan ikut terhapus secara otomatis oleh database engine.
- **\`ON DELETE SET NULL\`:** Jika baris induk dihapus, kolom FK di tabel anak disetel menjadi \`NULL\` (kolom anak harus nullable).

---

### Deep-Dive: Foreign Key Validation Internals & Hidden Index Overhead
1. **Indeks Wajib:** MySQL InnoDB **mewajibkan** pembuatan index pada kolom yang menjadi Foreign Key. Jika kamu tidak membuatnya secara manual, InnoDB akan membuat indeks tersembunyi secara otomatis.
2. **Validasi $O(log N)$ Point Lookup:** Setiap operasi \`INSERT\` ke tabel anak memicu pencarian B+ Tree internal ke Primary Key tabel induk dengan kompleksitas $O(log N)$ untuk memvalidasi keberadaan relasi.`
                },
                {
                  type: "code-example",
                  language: "sql",
                  code: `-- Skema Tabel Relasi Many-to-Many: Orders dan Products
CREATE TABLE orders (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    total_cents BIGINT UNSIGNED NOT NULL,
    status ENUM('PENDING', 'PAID', 'SHIPPED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE order_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL DEFAULT 1,
    unit_price_cents BIGINT UNSIGNED NOT NULL,
    CONSTRAINT fk_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_items_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    CONSTRAINT uq_order_product UNIQUE (order_id, product_id)
) ENGINE=InnoDB;`
                }
              ]
            },
            {
              id: "mysql-les-practice-schema-modeling",
              title: "ADVANCED PRACTICE: High-Throughput Multi-Tenant E-Commerce DDL Architecture",
              type: "practice",
              xpReward: 50,
              content: [
                {
                  type: "markdown",
                  content: `### Skenario Industri: Skema Database SaaS Multi-Tenant

Sebuah platform SaaS e-commerce melayani ribuan merchant (tenant) dalam satu database terbagi (*shared database, tenant-isolated schema*).

#### Spesifikasi Kebutuhan DDL:
1. Tabel \`tenants\`:
   - \`id\` (BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY)
   - \`subdomain\` (VARCHAR(50) NOT NULL UNIQUE)
   - \`company_name\` (VARCHAR(100) NOT NULL)
   - \`is_active\` (TINYINT(1) DEFAULT 1)
2. Tabel \`customers\`:
   - \`id\` (BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY)
   - \`tenant_id\` (BIGINT UNSIGNED NOT NULL)
   - \`email\` (VARCHAR(150) NOT NULL)
   - **Composite Unique Constraint:** Kombinasi \`(tenant_id, email)\` harus unik agar user dapat mendaftar dengan email yang sama di tenant berbeda.
   - Foreign Key ke \`tenants(id)\` dengan \`ON DELETE RESTRICT\`.`
                }
              ],
              starterCode: `-- Tuliskan DDL MySQL 8.0 untuk skema multi-tenant
CREATE TABLE tenants (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    subdomain VARCHAR(50) NOT NULL UNIQUE,
    company_name VARCHAR(100) NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE customers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tenant_id BIGINT UNSIGNED NOT NULL,
    email VARCHAR(150) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_customers_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE RESTRICT,
    CONSTRAINT uq_tenant_customer_email UNIQUE (tenant_id, email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,
              hints: [
                "Gunakan BIGINT UNSIGNED untuk Primary Key agar mampu menampung miliaran transaksi tanpa overflow",
                "Terapkan CONSTRAINT uq_tenant_customer_email UNIQUE (tenant_id, email) untuk multi-tenancy isolation",
                "Pastikan ENGINE=InnoDB digunakan untuk mendukung integritas transaksi dan foreign key"
              ],
              requirements: [
                {
                  id: "req-ddl-tenants",
                  description: "Mendefinisikan tabel tenants dengan id BIGINT PRIMARY KEY dan subdomain UNIQUE",
                  validate: (code) => code.includes("CREATE TABLE tenants") && code.includes("subdomain") && code.includes("UNIQUE")
                },
                {
                  id: "req-ddl-customers-uq",
                  description: "Mendefinisikan tabel customers dengan composite unique key (tenant_id, email)",
                  validate: (code) => code.includes("CREATE TABLE customers") && code.includes("FOREIGN KEY (tenant_id)") && code.includes("UNIQUE (tenant_id, email)")
                }
              ]
            },
            {
              id: "mysql-les-quiz-schema",
              title: "Kuis Pemodelan Data & Constraints",
              type: "quiz",
              xpReward: 30,
              questions: [
                {
                  id: "mq-sch-1",
                  question: "Tipe data apa yang WAJIB digunakan untuk menyimpan nominal mata uang pada database finansial di MySQL?",
                  options: [
                    "DECIMAL atau BIGINT (dalam satuan sen terkecil)",
                    "FLOAT",
                    "DOUBLE",
                    "REAL"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "`DECIMAL(M,D)` atau `BIGINT` (satuan sen) menjamin akurasi bilangan bulat/fixed-point tanpa resiko pembulatan presisi IEEE-754 yang terdapat pada FLOAT dan DOUBLE."
                },
                {
                  id: "mq-sch-2",
                  question: "Apa dampak dari aksi ON DELETE RESTRICT pada sebuah Foreign Key?",
                  options: [
                    "Menolak dan menggagalkan query DELETE baris induk jika masih ada baris anak yang berelasi",
                    "Menghapus seluruh baris anak secara otomatis",
                    "Mengubah nilai foreign key di baris anak menjadi 0",
                    "Menonaktifkan database server sementara"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "`ON DELETE RESTRICT` adalah proteksi standar yang menolak penghapusan record induk bila masih memiliki keterkaitan relasional dengan record di tabel anak."
                }
              ]
            }
          ]
        },
        {
          id: "mysql-mod-2",
          title: "Normalisasi Basis Data (1NF, 2NF, 3NF & BCNF)",
          description: "Menghilangkan redundansi data, menghindari anomali update/delete, dan merancang relasi sesuai kaidah matematika relational model.",
          lessons: [
            {
              id: "mysql-les-normalization",
              title: "Dari Unnormalized Form (UNF) ke Third Normal Form (3NF)",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Mengapa Normalisasi Skema Sangat Krusial?

Database yang tidak dinormalisasi menderita 3 anomali berbahaya:
1. **Insertion Anomaly:** Tidak bisa memasukkan data entitas baru tanpa melampirkan entitas lain.
2. **Update Anomaly:** Mengubah 1 nama kota mengharuskan kita meng-update 100.000 baris, memicu inkonsistensi data jika server putus koneksi di tengah jalan.
3. **Deletion Anomaly:** Menghapus pesanan pelanggan secara tidak sengaja menghapus seluruh master data pelanggan tersebut dari sistem.

---

### Kaidah Tiga Bentuk Normal (Normal Forms):
- **1NF (First Normal Form):**
  Setiap kolom harus bernilai **atomik** (tidak boleh ada daftar nilai dipisah koma seperti \`tags: "laptop, electronics, sale"\`) dan setiap baris harus dapat diidentifikasi secara unik (memiliki Primary Key).
- **2NF (Second Normal Form):**
  Sudah memenuhi 1NF, dan **tidak ada ketergantungan parsial (*partial dependency*)**. Seluruh kolom non-key harus bergantung penuh pada *seluruh* Primary Key (relevan untuk composite primary key).
- **3NF (Third Normal Form):**
  Sudah memenuhi 2NF, dan **tidak ada ketergantungan transitif (*transitive dependency*)**. Kolom non-key tidak boleh bergantung pada kolom non-key lainnya ($A \\rightarrow B \\rightarrow C$).

---

### Deep-Dive Theory: Boyce-Codd Normal Form (BCNF) & Fourth Normal Form (4NF)
- **BCNF (3.5 NF):** Bentuk 3NF yang lebih ketat: untuk setiap ketergantungan fungsional $X \\rightarrow Y$, $X$ **harus merupakan Superkey**.
- **4NF (Multi-Valued Dependencies):** Memastikan tidak ada dua atau lebih relasi independen satu-ke-banyak (*independent one-to-many relationships*) yang disimpan dalam tabel tunggal.`
                },
                {
                  type: "code-example",
                  language: "sql",
                  code: `-- SEBELUM: Tabel Tidak Ternormalisasi (Banyak Anomali)
-- orders_unf (order_id, customer_name, customer_city, city_zipcode, product_names, total)

-- SESUDAH: Memenuhi Kaidah 3NF & BCNF (Terpisah Menjadi Entitas Murni)
CREATE TABLE cities (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    zipcode VARCHAR(10) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE customers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    city_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_customer_city FOREIGN KEY (city_id) REFERENCES cities(id)
) ENGINE=InnoDB;

CREATE TABLE orders_3nf (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT UNSIGNED NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_order_customer FOREIGN KEY (customer_id) REFERENCES customers(id)
) ENGINE=InnoDB;`
                }
              ]
            },
            {
              id: "mysql-les-practice-normalization",
              title: "ADVANCED PRACTICE: Normalizing Legacy Denormalized Order Table into 3NF",
              type: "practice",
              xpReward: 50,
              content: [
                {
                  type: "markdown",
                  content: `### Skenario Industri: Migrasi Data Monolitik ke Skema 3NF

Sebuah startup memiliki tabel legasi \`billing_dump\` hasil ekspor spreadsheet:
\`\`\`text
[order_id, customer_email, customer_phone, customer_tier, product_sku, product_title, unit_price, qty]
\`\`\`
Tabel ini mengalami anomali update parah: jika tier customer berubah dari "SILVER" ke "GOLD", aplikasi harus meng-update ratusan baris riwayat order lama.

#### Tugas Normalisasi:
Rancang 3 tabel 3NF untuk memisahkan entitas:
1. \`customers\` (\`id\`, \`email\`, \`phone\`, \`tier\`)
2. \`products\` (\`id\`, \`sku\`, \`title\`, \`unit_price_cents\`)
3. \`order_items\` (\`id\`, \`order_id\`, \`product_id\`, \`quantity\`, \`historical_price_cents\`)`
                }
              ],
              starterCode: `-- Rancang skema 3NF untuk menggantikan tabel monolitik
CREATE TABLE customers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(30) NOT NULL,
    tier ENUM('BRONZE', 'SILVER', 'GOLD', 'PLATINUM') NOT NULL DEFAULT 'BRONZE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(64) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    unit_price_cents BIGINT UNSIGNED NOT NULL
) ENGINE=InnoDB;

CREATE TABLE orders (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_cust FOREIGN KEY (customer_id) REFERENCES customers(id)
) ENGINE=InnoDB;

CREATE TABLE order_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL DEFAULT 1,
    historical_price_cents BIGINT UNSIGNED NOT NULL,
    CONSTRAINT fk_item_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_item_product FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB;`,
              hints: [
                "Pisahkan data pelanggan, produk, pesanan, dan baris pesanan ke dalam tabel terpisah",
                "Simpan historical_price_cents pada order_items agar perubahan harga produk di masa depan tidak merusak laporan transaksi masa lalu",
                "Gunakan ENUM untuk customer tier agar membatasi nilai yang sah"
              ],
              requirements: [
                {
                  id: "req-norm-customers",
                  description: "Mendefinisikan tabel customers dengan email UNIQUE dan tier ENUM",
                  validate: (code) => code.includes("CREATE TABLE customers") && code.includes("email") && code.includes("tier")
                },
                {
                  id: "req-norm-items",
                  description: "Mendefinisikan tabel order_items dengan foreign keys ke orders dan products",
                  validate: (code) => code.includes("CREATE TABLE order_items") && code.includes("FOREIGN KEY (order_id)") && code.includes("FOREIGN KEY (product_id)")
                }
              ]
            },
            {
              id: "mysql-les-quiz-norm",
              title: "Kuis Normalisasi Database",
              type: "quiz",
              xpReward: 30,
              questions: [
                {
                  id: "mq-norm-1",
                  question: "Kondisi apa yang harus dipenuhi oleh skema tabel agar sah dikatakan memenuhi Third Normal Form (3NF)?",
                  options: [
                    "Telah memenuhi 2NF dan tidak memiliki ketergantungan transitif antar kolom non-key",
                    "Hanya memiliki 3 kolom",
                    "Tabel memiliki 3 Primary Key sekaligus",
                    "Tidak menggunakan foreign key"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "3NF mensyaratkan tabel telah berada dalam 2NF dan menghilangkan transitive dependency (kolom non-key tidak boleh bergantung pada kolom non-key lainnya)."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "mysql-lvl-1",
      title: "Level 1 \u2014 Sintaks Query Komprehensif (DML & Aggregation)",
      description: "SELECT, WHERE, HAVING, GROUP BY, Hash Join vs Nested Loop, Anti-Join, Correlated Subqueries, dan Analisis Kompleksitas.",
      modules: [
        {
          id: "mysql-mod-3",
          title: "Filter, Operator Logika & Agregasi Data",
          description: "Pengambilan data kompleks, Three-Valued Logic (3VL), dan optimasi agregasi GROUP BY berskala jutaan baris.",
          lessons: [
            {
              id: "mysql-les-query-basics",
              title: "Eksekusi Query: WHERE, LIKE, IN, BETWEEN & Three-Valued Logic",
              type: "learn",
              xpReward: 30,
              content: [
                {
                  type: "markdown",
                  content: `### Urutan Eksekusi Logika Query SQL (Logical Processing Order)

Banyak programmer mengira SQL dieksekusi dari baris \`SELECT\` pertama. Padahal urutan eksekusi internal database engine adalah:
1. **\`FROM\` & \`JOIN\`**: Mengumpulkan dan menggabungkan tabel data mentah.
2. **\`WHERE\`**: Menyaring baris data individu.
3. **\`GROUP BY\`**: Mengelompokkan baris ke dalam bucket agregasi.
4. **\`HAVING\`**: Menyaring hasil grup agregat.
5. **\`SELECT\`**: Memilih kolom dan mengevaluasi ekspresi skalar.
6. **\`DISTINCT\`**: Mengeliminasi duplikasi.
7. **\`ORDER BY\`**: Mengurutkan dataset akhir.
8. **\`LIMIT / OFFSET\`**: Memotong subset baris.

---

### Deep-Dive Theory: Three-Valued Logic (3VL) & Perilaku NULL
Dalam standar ANSI SQL, \`NULL\` bukanlah string kosong ataupun angka 0; \`NULL\` merepresentasikan **Unknown State (Nilai Tidak Diketahui)**.
- Pernyataan \`NULL = NULL\` menghasilkan **UNKNOWN (bukan TRUE!)**.
- Itulah sebabnya query \`WHERE status = NULL\` tidak akan pernah mengembalikan baris apa pun! Selalu gunakan \`IS NULL\` atau \`IS NOT NULL\`.
- Perilaku pada \`NOT IN\`: Jika subquery menghasilkan satu saja nilai \`NULL\`, operator \`NOT IN (subquery)\` akan selalu mengevaluasi ke \`UNKNOWN\` dan mengembalikan **0 baris**! Selalu ganti dengan \`NOT EXISTS\`.`
                },
                {
                  type: "code-example",
                  language: "sql",
                  code: `-- Query Menggunakan Filter Rentang Tanggal dan Pattern Matching Aman
SELECT id, sku, title, price_cents / 100 AS price_idr, stock_quantity
FROM products
WHERE is_active = 1
  AND category_id IN (10, 12, 15)
  AND price_cents BETWEEN 10000000 AND 50000000 -- Rp 100.000 s/d Rp 500.000
  AND title LIKE 'Mechanical Keyboard%'
ORDER BY price_cents DESC
LIMIT 10;`
                }
              ]
            },
            {
              id: "mysql-les-aggregation",
              title: "Agregasi Data: COUNT, SUM, AVG, GROUP BY & HAVING",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Merangkum Data Finansial: GROUP BY vs HAVING

- **\`WHERE\` vs \`HAVING\`:**
  - \`WHERE\` menyaring baris **sebelum** agregasi terjadi (dapat memanfaatkan B+ Tree index secara langsung).
  - \`HAVING\` menyaring nilai **setelah** fungsi agregasi (\`COUNT\`, \`SUM\`, \`AVG\`) dihitung.

---

### Deep-Dive Theory: Filesort vs Streaming Index Aggregation
- **Tapa Indeks ($O(N \\log N)$):** MySQL harus membaca baris, membuat in-memory hash table sementara (atau on-disk temporary table di \`tmpdir\`), lalu menjalankan **Filesort**.
- **Dengan Covering Indeks ($O(N)$ Single-Pass Streaming):** Jika terdapat index \`(category_id, price_cents)\`, MySQL membaca nilai yang sudah terurut secara fisik di B+ Tree, menghasilkan kalkulasi agregasi instan tanpa alokasi memori tambahan!`
                },
                {
                  type: "code-example",
                  language: "sql",
                  code: `-- Laporan Total Penjualan dan Rata-rata per Kategori
SELECT 
    c.name AS category_name,
    COUNT(p.id) AS total_active_products,
    SUM(p.stock_quantity) AS total_inventory_units,
    ROUND(AVG(p.price_cents) / 100, 2) AS avg_price_idr,
    MAX(p.price_cents) / 100 AS max_price_idr
FROM categories c
INNER JOIN products p ON c.id = p.category_id
WHERE p.is_active = 1
GROUP BY c.id, c.name
HAVING total_active_products >= 5 AND avg_price_idr > 150000
ORDER BY total_inventory_units DESC;`
                }
              ]
            },
            {
              id: "mysql-les-practice-aggregation-analytics",
              title: "ADVANCED PRACTICE: High-Volume Sales Cohort & Revenue Metrics ($O(N \\log N)$ Aggregation)",
              type: "practice",
              xpReward: 50,
              content: [
                {
                  type: "markdown",
                  content: `### Skenario Industri: Dashboard Rekonsiliasi Finansial E-Commerce

Manajemen membutuhkan laporan agregasi transaksi bulanan untuk mendeteksi tren Gross Merchandise Value (GMV) dan rasio pembatalan order.

#### Kebutuhan Query Analitik:
Tulis query \`SELECT\` dari tabel \`orders\`:
1. Dikelompokkan berdasarkan tahun-bulan (\`DATE_FORMAT(created_at, '%Y-%m')\`) dan \`status\`.
2. Menghitung:
   - \`total_orders\` (\`COUNT(*)\`)
   - \`gross_revenue_idr\` (\`SUM(total_cents) / 100\`)
   - \`avg_order_value_idr\` (\`ROUND(AVG(total_cents) / 100, 2)\`)
3. Filter hanya pesanan di tahun 2026 (\`WHERE created_at >= '2026-01-01'\`).
4. Hanya tampilkan grup yang memiliki \`total_orders >= 10\` menggunakan klausa \`HAVING\`.`
                }
              ],
              starterCode: `-- Tuliskan query agregasi analitik finansial
SELECT 
    DATE_FORMAT(created_at, '%Y-%m') AS order_month,
    status,
    COUNT(*) AS total_orders,
    SUM(total_cents) / 100 AS gross_revenue_idr,
    ROUND(AVG(total_cents) / 100, 2) AS avg_order_value_idr
FROM orders
WHERE created_at >= '2026-01-01'
GROUP BY DATE_FORMAT(created_at, '%Y-%m'), status
HAVING COUNT(*) >= 10
ORDER BY order_month ASC, gross_revenue_idr DESC;`,
              hints: [
                'Gunakan DATE_FORMAT(created_at, "%Y-%m") untuk mengekstrak kelompok tahun-bulan',
                "Klausa HAVING COUNT(*) >= 10 menyaring grup setelah kalkulasi agregasi",
                'Filter WHERE created_at >= "2026-01-01" membatasi dataset mentah sebelum GROUP BY'
              ],
              requirements: [
                {
                  id: "req-agg-group",
                  description: "Menggunakan GROUP BY dengan DATE_FORMAT dan status",
                  validate: (code) => code.includes("GROUP BY") && code.includes("DATE_FORMAT") && code.includes("status")
                },
                {
                  id: "req-agg-having",
                  description: "Menerapkan klausa HAVING untuk memfilter jumlah pesanan minimal 10",
                  validate: (code) => code.includes("HAVING") && (code.includes("COUNT(*)") || code.includes("total_orders"))
                }
              ]
            },
            {
              id: "mysql-les-quiz-agg",
              title: "Kuis Query & Agregasi SQL",
              type: "quiz",
              xpReward: 30,
              questions: [
                {
                  id: "mq-q-1",
                  question: "Manakah dari tahapan berikut yang dieksekusi PALING AWAL oleh MySQL Query Execution Engine?",
                  options: ["FROM & JOIN", "SELECT", "WHERE", "ORDER BY"],
                  correctAnswerIndex: 0,
                  explanation: "Query engine memproses `FROM` & `JOIN` terlebih dahulu untuk menyusun dataset dasar sebelum menyaringnya dengan `WHERE` dan memilih kolom dengan `SELECT`."
                },
                {
                  id: "mq-q-2",
                  question: "Apa hasil dari ekspresi boolean SQL: NULL = NULL?",
                  options: [
                    "UNKNOWN (bukan TRUE)",
                    "TRUE",
                    "FALSE",
                    "Fatal Error"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "Dalam standar SQL Three-Valued Logic (3VL), NULL merepresentasikan nilai yang tidak diketahui (unknown), sehingga perbandingan NULL = NULL menghasilkan UNKNOWN."
                }
              ]
            }
          ]
        },
        {
          id: "mysql-mod-4",
          title: "Penguasaan Relasi Multi-Tabel: JOINs & Subqueries",
          description: "INNER, LEFT, RIGHT JOIN, Anti-Join pattern, Correlated Subqueries, dan Algoritma Hash Join (MySQL 8.0.18+).",
          lessons: [
            {
              id: "mysql-les-joins",
              title: "INNER, LEFT, RIGHT JOIN & Pola Anti-Join",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Memahami Diagram Venn JOIN secara Presisi

- **INNER JOIN:** Hanya mengembalikan baris yang memiliki pasangan cocok di kedua tabel.
- **LEFT JOIN:** Mengembalikan seluruh baris dari tabel kiri, dipadukan dengan kolom tabel kanan jika cocok (atau bernilai \`NULL\` jika tidak ada pasangan).
- **Anti-Join Pattern (\`LEFT JOIN ... WHERE right.id IS NULL\`):**
  Pola penting untuk menemukan baris yatim/piatu (*orphan*), misalnya mencari pelanggan yang belum pernah bertransaksi sama sekali.

---

### Deep-Dive Theory: Evolusi Algoritma JOIN di MySQL
1. **Nested Loop Join (NLJ - $O(M \\times \\log N)$):** Mengiterasi setiap baris tabel luar ($M$), lalu melakukan index lookup B+ Tree pada tabel dalam ($N$).
2. **Block Nested Loop (BNL - $O(M \\times N)$):** Memuat blok baris ke Join Buffer di RAM. Lambat jika tidak ada index.
3. **Hash Join (MySQL 8.0.18+ - $O(M + N)$ Linear Time):**
   Pada query tanpa index equi-join, MySQL membangun in-memory Hash Table dari tabel kecil ($M$), lalu memindai tabel besar ($N$) dalam **satu lintasan linear**!`
                },
                {
                  type: "code-example",
                  language: "sql",
                  code: `-- 1. INNER JOIN Transaksi dengan Data Pelanggan
SELECT o.id AS order_id, u.username, u.email, o.total_cents / 100 AS total_idr
FROM orders o
INNER JOIN users u ON o.user_id = u.id
WHERE o.status = 'PAID';

-- 2. ANTI-JOIN: Mencari Kategori yang Belum Memiliki Produk Sama Sekali
SELECT c.id, c.name
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
WHERE p.id IS NULL; -- Kategori kosong tanpa relasi produk!`
                }
              ]
            },
            {
              id: "mysql-les-subqueries",
              title: "Subqueries: Scalar, Correlated & EXISTS vs IN",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Scalar Subquery vs Correlated Subquery

- **Scalar Subquery:** Mengembalikan satu nilai tunggal (1 baris, 1 kolom), dieksekusi satu kali secara independen.
- **Correlated Subquery:** Subquery yang mereferensikan kolom dari query luar (*outer query*). Subquery ini dieksekusi ulang untuk **setiap baris** yang diproses oleh query luar.

#### Aturan Performa: \`EXISTS\` vs \`IN\`
Ketika mengecek keberadaan data di tabel berukuran besar:
- \`EXISTS\` menggunakan *short-circuit evaluation*: begitu menemukan 1 kecocokan baris pertama, ia langsung berhenti mencari dan mengembalikan \`TRUE\`.
- \`NOT IN\` berbahaya jika subquery menghasilkan nilai \`NULL\`. Selalu preferensikan \`NOT EXISTS\`!`
                },
                {
                  type: "code-example",
                  language: "sql",
                  code: `-- Mencari Pengguna yang Pernah Melakukan Transaksi > Rp 1.000.000 (Menggunakan EXISTS)
SELECT u.id, u.username, u.email
FROM users u
WHERE EXISTS (
    SELECT 1 
    FROM orders o 
    WHERE o.user_id = u.id 
      AND o.total_cents > 100000000 
      AND o.status = 'PAID'
);`
                }
              ]
            },
            {
              id: "mysql-les-practice-anti-join",
              title: "ADVANCED PRACTICE: Churn Detection Anti-Join & Correlated Financial Subquery ($O(M + N)$ Hash Join)",
              type: "practice",
              xpReward: 50,
              content: [
                {
                  type: "markdown",
                  content: `### Skenario Industri: Deteksi Pelanggan Churn (Tanpa Transaksi Aktif)

Departemen Retensi Pelanggan ingin mengirimkan kupon promosi khusus kepada pelanggan yang terdaftar tetapi **belum pernah melakukan pembelian berstatus 'PAID' sama sekali dalam 90 hari terakhir**.

#### Kebutuhan Query Anti-Join:
1. Ambil data \`id\`, \`username\`, dan \`email\` dari tabel \`users\`.
2. Gunakan teknik **Anti-Join (\`LEFT JOIN ... WHERE ... IS NULL\`)** terhadap tabel \`orders\` dengan kriteria \`status = 'PAID'\` dan \`created_at >= NOW() - INTERVAL 90 DAY\`.
3. Pastikan query menggunakan alias yang rapi dan memfilter user yang aktif.`
                }
              ],
              starterCode: `-- Tuliskan query Anti-Join deteksi churn pengguna
SELECT 
    u.id, 
    u.username, 
    u.email
FROM users u
LEFT JOIN orders o 
    ON u.id = o.user_id 
    AND o.status = 'PAID' 
    AND o.created_at >= NOW() - INTERVAL 90 DAY
WHERE u.role = 'customer' 
  AND o.id IS NULL
ORDER BY u.id ASC;`,
              hints: [
                'Pindahkan filter status = "PAID" dan interval 90 hari ke klausa ON pada LEFT JOIN',
                "Kondisi WHERE o.id IS NULL memastikan hanya pengguna yang tidak memiliki pasangan order yang dikembalikan (Anti-Join)",
                "Teknik ini jauh lebih cepat daripada WHERE id NOT IN (SELECT user_id ...)"
              ],
              requirements: [
                {
                  id: "req-anti-join",
                  description: "Menerapkan pola Anti-Join dengan LEFT JOIN dan filter IS NULL pada tabel relasi",
                  validate: (code) => code.includes("LEFT JOIN orders") && code.includes("IS NULL")
                },
                {
                  id: "req-anti-filter",
                  description: "Menyertakan filter status PAID dan rentang waktu INTERVAL 90 DAY",
                  validate: (code) => code.includes("PAID") && code.includes("INTERVAL 90 DAY")
                }
              ]
            },
            {
              id: "mysql-les-quiz-joins",
              title: "Kuis JOIN & Subqueries",
              type: "quiz",
              xpReward: 30,
              questions: [
                {
                  id: "mq-join-1",
                  question: "Teknik apa yang digunakan untuk menemukan data di tabel induk yang sama sekali tidak memiliki relasi di tabel anak (Anti-Join)?",
                  options: [
                    "LEFT JOIN tabel anak dengan filter WHERE anak.id IS NULL",
                    "INNER JOIN dengan limit 0",
                    "CROSS JOIN dengan ORDER BY DESC",
                    "DELETE JOIN"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "`LEFT JOIN` yang dipadukan dengan kondisi `WHERE anak.id IS NULL` adalah pola standar (Anti-Join) untuk menemukan record di tabel kiri yang tidak memiliki pasangan di tabel kanan."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "mysql-lvl-2",
      title: "Level 2 \u2014 Window Functions, CTE & Objek Terprogram",
      description: "ROW_NUMBER(), RANK(), DENSE_RANK(), Moving Average, Recursive CTE (Hierarki Organisasi), Views, Stored Procedures, dan Triggers Audit.",
      modules: [
        {
          id: "mysql-mod-5",
          title: "Window Functions & Pemrosesan Baris Analitik",
          description: "Melakukan kalkulasi analitik antar baris tanpa menciutkan data ke GROUP BY tunggal.",
          lessons: [
            {
              id: "mysql-les-window-functions",
              title: "Window Functions: ROW_NUMBER, RANK, DENSE_RANK & Running Totals",
              type: "learn",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: `### Kekuatan Window Functions di MySQL 8.0+

Tidak seperti \`GROUP BY\` yang menggabungkan banyak baris menjadi 1 baris agregat, **Window Functions** menghitung nilai agregat antar baris namun **tetap mempertahankan seluruh baris data aslinya**!

#### Struktur Sintaks:
\`\`\`sql
FUNGSI() OVER (
    PARTITION BY kolom_kelompok
    ORDER BY kolom_urutan
    ROWS/RANGE BETWEEN ...
)
\`\`\`

#### Fungsi Kunci:
- \`ROW_NUMBER()\`: Memberikan nomor urut sekuensial unik (1, 2, 3, 4...).
- \`RANK()\`: Memberikan peringkat dengan lompatan jika ada nilai kembar (1, 2, 2, 4...).
- \`DENSE_RANK()\`: Memberikan peringkat tanpa lompatan jika ada nilai kembar (1, 2, 2, 3...).
- \`LAG(col, 1)\` / \`LEAD(col, 1)\`: Mengambil nilai dari baris sebelumnya atau baris berikutnya.`
                },
                {
                  type: "code-example",
                  language: "sql",
                  code: `-- Mencari Top 3 Produk Termahal di Masing-masing Kategori
WITH RankedProducts AS (
    SELECT 
        id,
        category_id,
        title,
        price_cents / 100 AS price_idr,
        DENSE_RANK() OVER (
            PARTITION BY category_id 
            ORDER BY price_cents DESC
        ) as price_rank
    FROM products
    WHERE is_active = 1
)
SELECT * 
FROM RankedProducts
WHERE price_rank <= 3
ORDER BY category_id, price_rank;`
                }
              ]
            },
            {
              id: "mysql-les-cte",
              title: "Common Table Expressions (CTE) & Recursive CTE",
              type: "learn",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: `### Membersihkan Subquery Rumit dengan CTE

**CTE (\`WITH ... AS\`)** membuat tabel virtual sementara yang dapat dibaca berkali-kali dalam satu sesi query, membuat query kompleks menjadi sangat bersih dan mudah dipelihara.

#### Recursive CTE (Memproses Struktur Pohon / Hirarki):
Sangat berguna untuk mencari struktur organisasi (atasan-bawahan), kategori bersarang (*nested categories*), atau bill-of-materials (BOM).

---

### Deep-Dive Theory: Recursive CTE Execution Stack & Safety
- **Anchor Member:** Bagian query non-rekursif yang dieksekusi sekali untuk menginisialisasi queue kerja (misal root node dengan \`parent_id IS NULL\`).
- **Recursive Member:** Bagian query yang di-UNION ALL berulang-ulang sampai tidak ada baris baru yang dihasilkan.
- **Safety Valve:** MySQL menyediakan variabel \`cte_max_recursion_depth\` (default 1000 iterasi) untuk mencegah infinite loop jika terjadi siklus relasi.`
                },
                {
                  type: "code-example",
                  language: "sql",
                  code: `-- Mencari Struktur Pohon Kategori secara Rekursif
WITH RECURSIVE CategoryTree AS (
    -- Anchor member: Ambil root categories
    SELECT id, name, parent_id, 1 AS depth_level
    FROM categories
    WHERE parent_id IS NULL

    UNION ALL

    -- Recursive member: Gabungkan anak dari kategori sebelumnya
    SELECT c.id, c.name, c.parent_id, ct.depth_level + 1
    FROM categories c
    INNER JOIN CategoryTree ct ON c.parent_id = ct.id
)
SELECT depth_level, name, id FROM CategoryTree ORDER BY depth_level, id;`
                }
              ]
            },
            {
              id: "mysql-les-practice-window-analytics",
              title: "ADVANCED PRACTICE: Rolling 7-Day Moving Average & Customer Spending Deciles ($O(N \\log N)$ Window Algorithm)",
              type: "practice",
              xpReward: 50,
              content: [
                {
                  type: "markdown",
                  content: `### Skenario Industri: Real-Time Fraud & Anomaly Spike Detection

Tim Data Engineering membutuhkan query analitik untuk menghitung rata-rata bergerak 7-hari (*7-day rolling moving average*) terhadap volume transaksi harian merchant. Jika transaksi hari ini melonjak 300% di atas moving average, sistem memberi peringatan fraud.

#### Kebutuhan Query:
Gunakan Window Function \`AVG(daily_gmv) OVER (\` dengan frame:
\`\`\`sql
ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
\`\`\`
Hitung juga running total akumulasi sepanjang tahun menggunakan \`SUM(daily_gmv) OVER (ORDER BY trans_date ASC)\`.`
                }
              ],
              starterCode: `-- Tuliskan query Rolling Moving Average dan Running Total
WITH DailyRevenue AS (
    SELECT 
        DATE(created_at) AS trans_date,
        SUM(total_cents) / 100 AS daily_gmv
    FROM orders
    WHERE status = 'PAID'
    GROUP BY DATE(created_at)
)
SELECT 
    trans_date,
    daily_gmv,
    -- 7-Day Rolling Moving Average: O(N log N) sort + O(N) sliding accumulator
    ROUND(AVG(daily_gmv) OVER (
        ORDER BY trans_date ASC 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ), 2) AS rolling_7d_avg_gmv,
    -- Cumulative Running Total YTD
    SUM(daily_gmv) OVER (
        ORDER BY trans_date ASC
    ) AS cumulative_running_total
FROM DailyRevenue
ORDER BY trans_date ASC;`,
              hints: [
                "Gunakan ROWS BETWEEN 6 PRECEDING AND CURRENT ROW untuk mencakup 7 hari data (6 hari lalu + hari ini)",
                "Klausa OVER (ORDER BY trans_date ASC) tanpa frame otomatis menghitung akumulasi dari awal hingga baris saat ini",
                "Bungkus query dalam CTE DailyRevenue agar agregasi harian rapi"
              ],
              requirements: [
                {
                  id: "req-win-rows",
                  description: "Menggunakan ROWS BETWEEN 6 PRECEDING AND CURRENT ROW",
                  validate: (code) => code.includes("ROWS BETWEEN 6 PRECEDING AND CURRENT ROW")
                },
                {
                  id: "req-win-sum",
                  description: "Menggunakan SUM() OVER (ORDER BY ...) untuk cumulative running total",
                  validate: (code) => code.includes("SUM(daily_gmv) OVER") && code.includes("ORDER BY trans_date")
                }
              ]
            },
            {
              id: "mysql-les-quiz-window",
              title: "Kuis Window Functions & CTE",
              type: "quiz",
              xpReward: 30,
              questions: [
                {
                  id: "mq-win-1",
                  question: "Apa perbedaan antara RANK() dan DENSE_RANK() ketika terdapat 2 baris yang memiliki nilai kembar di peringkat ke-2?",
                  options: [
                    "RANK() akan melanjutkan ke peringkat 4 pada baris berikutnya, sedangkan DENSE_RANK() melanjutkan ke peringkat 3",
                    "DENSE_RANK() tidak mendukung klausa ORDER BY",
                    "RANK() hanya bekerja pada tipe data string",
                    "Keduanya menghasilkan nilai yang persis sama"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "`RANK()` melompati nomor urut peringkat setelah nilai seri (1, 2, 2, 4), sedangkan `DENSE_RANK()` tidak melompati nomor urut berikutnya (1, 2, 2, 3)."
                }
              ]
            }
          ]
        },
        {
          id: "mysql-mod-6",
          title: "Programmable Database: Views, Stored Procedures & Triggers",
          description: "Membuat views abstraksi data, stored procedures transaksional, dan triggers audit otomatis.",
          lessons: [
            {
              id: "mysql-les-programmable",
              title: "Views, Stored Procedures & Trigger Audit",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Objek Terprogram di MySQL

1. **VIEW:** Query tersimpan yang bertindak sebagai tabel virtual. Berguna untuk menyembunyikan kolom sensitif (seperti password hash) dari aplikasi pelaporan.
2. **STORED PROCEDURE:** Kumpulan instruksi SQL yang dikompilasi dan disimpan langsung di database server. Menerima parameter \`IN\`, \`OUT\`, dan \`INOUT\`.
3. **TRIGGER:** Kode SQL yang dieksekusi secara otomatis oleh database ketika terjadi event \`INSERT\`, \`UPDATE\`, atau \`DELETE\` pada tabel tertentu (misal: otomatis mencatat jejak audit).`
                },
                {
                  type: "code-example",
                  language: "sql",
                  code: `-- Trigger Otomatis untuk Pencatatan Riwayat Perubahan Harga Produk
DELIMITER $$

CREATE TRIGGER trg_audit_product_price_update
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
    IF OLD.price_cents <> NEW.price_cents THEN
        INSERT INTO product_price_history (
            product_id, 
            old_price_cents, 
            new_price_cents, 
            changed_at
        ) VALUES (
            NEW.id, 
            OLD.price_cents, 
            NEW.price_cents, 
            NOW()
        );
    END IF;
END$$

DELIMITER ;`
                }
              ]
            },
            {
              id: "mysql-les-practice-audit-trigger",
              title: "ADVANCED PRACTICE: Zero-Trust Security Audit Trigger with Automated Change Log Capture",
              type: "practice",
              xpReward: 50,
              content: [
                {
                  type: "markdown",
                  content: `### Skenario Industri: Audit Trail Perubahan Saldo Dompet Digital

Pada aplikasi dompet digital finansial (e-wallet), setiap perubahan saldo (\`balance_cents\`) harus dicatat ke dalam tabel audit append-only yang tidak dapat dimanipulasi oleh aplikasi backend.

#### Kebutuhan Trigger:
Buat trigger \`AFTER UPDATE ON user_wallets\` bernama \`trg_wallet_balance_audit\`:
1. Memeriksa apakah \`OLD.balance_cents <> NEW.balance_cents\`.
2. Menyisipkan rekaman ke \`wallet_audit_log\` berisi:
   - \`user_id\` (NEW.user_id)
   - \`old_balance\` (OLD.balance_cents)
   - \`new_balance\` (NEW.balance_cents)
   - \`delta_amount\` (NEW.balance_cents - OLD.balance_cents)
   - \`logged_at\` (\`NOW()\`).`
                }
              ],
              starterCode: `-- Tuliskan definisi trigger audit saldo dompet
DELIMITER $$

CREATE TRIGGER trg_wallet_balance_audit
AFTER UPDATE ON user_wallets
FOR EACH ROW
BEGIN
    IF OLD.balance_cents <> NEW.balance_cents THEN
        INSERT INTO wallet_audit_log (
            user_id,
            old_balance,
            new_balance,
            delta_amount,
            logged_at
        ) VALUES (
            NEW.user_id,
            OLD.balance_cents,
            NEW.balance_cents,
            (NEW.balance_cents - OLD.balance_cents),
            NOW()
        );
    END IF;
END$$

DELIMITER ;`,
              hints: [
                "Gunakan DELIMITER $$ untuk memungkinkan penulisan blok kode multiline dengan semicolon di dalamnya",
                "Akses data sebelum update via OLD.kolom dan data setelah update via NEW.kolom",
                "Kondisi IF OLD.balance_cents <> NEW.balance_cents mencegah trigger mencatat log jika yang diupdate adalah kolom lain"
              ],
              requirements: [
                {
                  id: "req-trg-def",
                  description: "Mendefinisikan trigger AFTER UPDATE ON user_wallets FOR EACH ROW",
                  validate: (code) => code.includes("CREATE TRIGGER") && code.includes("AFTER UPDATE ON user_wallets") && code.includes("FOR EACH ROW")
                },
                {
                  id: "req-trg-insert",
                  description: "Menyisipkan old dan new balance ke tabel wallet_audit_log",
                  validate: (code) => code.includes("INSERT INTO wallet_audit_log") && code.includes("OLD.balance_cents") && code.includes("NEW.balance_cents")
                }
              ]
            },
            {
              id: "mysql-les-quiz-proc",
              title: "Kuis Objek Terprogram MySQL",
              type: "quiz",
              xpReward: 30,
              questions: [
                {
                  id: "mq-pr-1",
                  question: "Kapan trigger dengan tipe AFTER UPDATE dieksekusi oleh MySQL?",
                  options: [
                    "Tepat setelah baris data berhasil diperbarui dan divalidasi oleh database engine",
                    "Sebelum query UPDATE dikirim oleh klien",
                    "Hanya saat server di-restart",
                    "Setiap hari jam 12 malam"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "Trigger `AFTER UPDATE` berjalan otomatis tepat sesaat setelah baris data berhasil di-update pada tabel target."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "mysql-lvl-3",
      title: "Level 3 \u2014 Arsitektur Internal InnoDB & Indexing B+ Tree",
      description: "InnoDB Buffer Pool, Redo Log WAL, Clustered vs Secondary Index, Covering Index, dan Bedah EXPLAIN ANALYZE.",
      modules: [
        {
          id: "mysql-mod-7",
          title: "Arsitektur Storage Engine InnoDB & Index B+ Tree",
          description: "Bagaimana data dibaca dari disk 16KB pages ke Buffer Pool di RAM dan struktur B+Tree.",
          lessons: [
            {
              id: "mysql-les-innodb-arch",
              title: "Anatomi InnoDB: Buffer Pool, Redo Log & Clustered Index",
              type: "learn",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: `### Bagaimana MySQL InnoDB Bekerja di Bawah Kap Mesin?

MySQL bukan sekadar file teks di hard disk. InnoDB adalah mesin transaksi berkinerja tinggi yang memiliki komponen arsitektur krusial:

\`\`\`text
Client SQL Query
      \u2502
      \u25BC
[ MySQL Server Layer ] -> Parser, Optimizer, Executor
      \u2502
      \u25BC
[ Storage Engine InnoDB (RAM) ]
\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 1. Buffer Pool (RAM Cache):                                 \u2502
\u2502    - Menyimpan data page (16 KB per page) menggunakan LRU   \u2502
\u2502    - Write-buffer: Perubahan data dimodifikasi di RAM dulu  \u2502
\u2502                                                             \u2502
\u2502 2. Log Buffer:                                              \u2502
\u2502    - Menampung Redo Log (WAL - Write-Ahead Logging)         \u2502
\u2502    - Menjamin Durability (D di ACID) saat crash tiba-tiba   \u2502
\u2502                                                             \u2502
\u2502 3. Undo Log & MVCC:                                         \u2502
\u2502    - Menyimpan versi lama baris untuk transaksi concurrent  \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
      \u2502 Flush berkala (fsync)
      \u25BC
[ Disk Storage (.ibd tablespace) ] -> Data Pages & Redo Log Files
\`\`\`

#### Clustered Index vs Secondary Index:
- **Clustered Index:** Pada InnoDB, tabel **adalah** index. Seluruh data baris fisik secara aktual diurutkan dan disimpan di leaf node dari **Primary Key**.
- **Secondary Index:** Index pada kolom selain Primary Key. Leaf node pada secondary index **hanya menyimpan nilai kolom index + nilai Primary Key**, bukan seluruh baris.
- **Bookmark Lookup:** Jika query mencari kolom non-index, MySQL harus melakukan *two-step lookup*: mencari Primary Key di Secondary Index, lalu melompat ke Clustered Index untuk mengambil sisa kolomnya.`
                },
                {
                  type: "code-example",
                  language: "sql",
                  code: `-- Menampilkan Status Buffer Pool dan Kesehatan RAM InnoDB
SHOW ENGINE INNODB STATUS;

-- Konfigurasi Ukuran Buffer Pool (disarankan 70-80% dari total RAM server khusus database)
-- SET GLOBAL innodb_buffer_pool_size = 8589934592; -- 8 GB RAM`
                }
              ]
            },
            {
              id: "mysql-les-indexing-bplus",
              title: "B+ Tree Indexing & Aturan Leftmost Prefix",
              type: "learn",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: `### Mengapa Index Menggunakan B+ Tree, Bukan Binary Search Tree?

Database berurusan dengan jutaan record di disk yang lambat. Binary Tree memiliki depth (kedalaman) yang sangat tinggi, membutuhkan puluhan kali disk I/O.

---

### Deep-Dive Theory: Matematika Fanout & B+ Tree Height Calculation
- **Ukuran Node:** 1 page InnoDB = **16.384 Byte (16 KB)**.
- **Ukuran Kunci Index (Pointer):** Misalkan Primary Key \`BIGINT\` (8 byte) + Child Page Pointer (6 byte) = **14 byte**.
- **Branching Factor / Fanout ($B$):**
  $$B = \\frac{16.384}{14} \\approx 1.170\\text{ cabang per node!}$$
- **Kapasitas Penyimpanan Berdasarkan Height ($h$):**
  - **Height = 1:** 1 halaman root = 1.170 baris.
  - **Height = 2:** $1.170 \\times 1.170 \\approx 1.368.900$ baris!
  - **Height = 3:** $1.170 \\times 1.170 \\times 1.170 \\approx \\mathbf{1.600.000.000\\text{ (1,6 Miliar baris)}}!$

Hanya dengan **3 hingga 4 disk I/O**, MySQL mampu menemukan 1 baris spesifik dari 1,6 miliar data! Karena root dan intermediate page selalu tersimpan di Buffer Pool RAM, pencarian hanya membutuhkan **1 physical disk read**!

#### Aturan Sakti: The Leftmost Prefix Rule
Jika kamu membuat composite index: \`INDEX (tenant_id, status, created_at)\`:
- \u2705 \`WHERE tenant_id = 5\` (Index terpakai)
- \u2705 \`WHERE tenant_id = 5 AND status = 'PAID'\` (Index terpakai optimal)
- \u2705 \`WHERE tenant_id = 5 AND status = 'PAID' AND created_at > '2026-01-01'\` (Full index match)
- \u274C \`WHERE status = 'PAID'\` (**INDEX TIDAK BISA DIPAKAI!** Melanggar leftmost prefix)`
                },
                {
                  type: "code-example",
                  language: "sql",
                  code: `-- 1. Membuat Covering Index (Index yang mencakup seluruh kolom SELECT)
-- Query ini tidak perlu Bookmark Lookup ke disk sama sekali!
CREATE INDEX idx_products_covering 
ON products (category_id, is_active, price_cents, title);

-- Query yang 100% dilayani langsung dari RAM Index (Using index):
SELECT title, price_cents 
FROM products 
WHERE category_id = 12 AND is_active = 1;`
                }
              ]
            },
            {
              id: "mysql-les-practice-covering-index",
              title: "ADVANCED PRACTICE: Ultra-Fast Covering Index Design Eliminating Bookmark Lookups ($O(\\log N)$ Index Seek)",
              type: "practice",
              xpReward: 50,
              content: [
                {
                  type: "markdown",
                  content: `### Skenario Industri: Optimasi Pencarian Produk E-Commerce Skala 50 Juta Baris

Aplikasi pencarian katalog sering menjalankan query berulang dengan filter kategori, status ketersediaan, dan pengurutan harga:
\`\`\`sql
SELECT id, title, price_cents
FROM products
WHERE category_id = 42 AND is_active = 1
ORDER BY price_cents ASC
LIMIT 20;
\`\`\`
Jika hanya ada index tunggal pada \`category_id\`, MySQL harus melakukan jutaan *Bookmark Lookup* ke Clustered Index fisik di disk dan menjalankan *filesort* di memori.

#### Tugas Rekayasa Indeks:
Rancang satu **Covering Composite Index** pada tabel \`products\` yang:
1. Memenuhi kesetaraan (*equality*) pada \`category_id\` dan \`is_active\`.
2. Menghilangkan operasi *filesort* pada \`price_cents\` (data sudah terurut di daun B+Tree).
3. Mencakup kolom \`title\` sehingga seluruh query terlayani 100% dari index (\`Using index\`).`
                }
              ],
              starterCode: `-- Rancang Covering Index untuk menghilangkan bookmark lookup & filesort
CREATE INDEX idx_products_cat_active_price_covering
ON products (category_id, is_active, price_cents, title);

-- Verifikasi dengan EXPLAIN
EXPLAIN 
SELECT id, title, price_cents
FROM products
WHERE category_id = 42 AND is_active = 1
ORDER BY price_cents ASC
LIMIT 20;`,
              hints: [
                "Urutan kolom pada composite index: Equality Columns pertama, lalu Range/Sort Column, lalu sisa kolom SELECT",
                "Karena id adalah Primary Key, InnoDB menyertakannya secara implisit di leaf node secondary index",
                'Extra: "Using index" pada hasil EXPLAIN menandakan covering index berhasil bekerja sempurna'
              ],
              requirements: [
                {
                  id: "req-idx-cov",
                  description: "Mendefinisikan composite index mencakup category_id, is_active, price_cents, dan title",
                  validate: (code) => code.includes("CREATE INDEX") && code.includes("category_id") && code.includes("is_active") && code.includes("price_cents") && code.includes("title")
                }
              ]
            },
            {
              id: "mysql-les-quiz-innodb",
              title: "Kuis Arsitektur InnoDB & Indexing",
              type: "quiz",
              xpReward: 30,
              questions: [
                {
                  id: "mq-ino-1",
                  question: "Di mana data baris fisik secara aktual disimpan pada engine MySQL InnoDB?",
                  options: [
                    "Di file log terpisah",
                    "Di leaf nodes dari struktur B+Tree Clustered Index (Primary Key)",
                    "Di heap memori sementara",
                    "Di cache browser user"
                  ],
                  correctAnswerIndex: 1,
                  explanation: "InnoDB menyusun tabel sebagai index-organized table, di mana seluruh data baris secara fisik disimpan langsung di leaf node dari Clustered Index (Primary Key)."
                }
              ]
            }
          ]
        },
        {
          id: "mysql-mod-8",
          title: "Analisis Eksekusi Query dengan EXPLAIN & Profiling",
          description: "Menganalisis Query Execution Plan, cost optimizer, dan mengeliminasi filesort serta temporary tables.",
          lessons: [
            {
              id: "mysql-les-explain",
              title: "Bedah EXPLAIN & EXPLAIN ANALYZE",
              type: "learn",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: `### Membaca Performa dengan EXPLAIN FORMAT=TREE & ANALYZE

Gunakan \`EXPLAIN ANALYZE\` (MySQL 8.0+) untuk mengeksekusi query dan melihat metrik aktual:
- **Actual Time:** Waktu yang dihabiskan untuk membaca baris pertama dan seluruh baris.
- **Rows:** Jumlah baris yang sebenarnya dibaca vs perkiraan optimizer.
- **Loops:** Berapa kali operasi diulang.

#### Urutan Kecepatan Access Type (Tercepat ke Terlambat):
1. \`system\` / \`const\` : Mengambil 1 baris Primary Key konstan (sub-mikrodetik).
2. \`eq_ref\` : 1 baris cocok via Primary Key / Unique Key pada operasi JOIN.
3. \`ref\` : Pencocokan menggunakan Secondary Index.
4. \`range\` : Index range scan (\`BETWEEN\`, \`>\`, \`IN\`).
5. \`index\` : Full Index Scan (membaca seluruh index di memory).
6. \`ALL\` : **Full Table Scan!** (Membaca seluruh baris di disk, sangat lambat pada tabel jutaan baris).`
                },
                {
                  type: "code-example",
                  language: "sql",
                  code: `-- Menganalisis Rencana Eksekusi Query Menggunakan EXPLAIN ANALYZE
EXPLAIN ANALYZE
SELECT p.id, p.title, p.price_cents, c.name AS category_name
FROM products p
INNER JOIN categories c ON p.category_id = c.id
WHERE p.category_id = 12 
  AND p.is_active = 1
ORDER BY p.id DESC
LIMIT 20;`
                }
              ]
            },
            {
              id: "mysql-les-practice-deep-pagination",
              title: "ADVANCED PRACTICE: Solving Ultra-Deep Pagination ($O(N) \\rightarrow O(\\log N)$ Keyset & Deferred Join)",
              type: "practice",
              xpReward: 50,
              content: [
                {
                  type: "markdown",
                  content: `### Skenario Industri: Masalah Deep Pagination pada Jutaan Baris Data

Ketika user atau bot web scraper mengakses halaman ke-250.000:
\`\`\`sql
SELECT * FROM orders ORDER BY id ASC LIMIT 5000000, 20;
\`\`\`
MySQL harus membaca **5.000.020 baris data fisik dari disk**, membuang 5.000.000 baris pertama, dan hanya mengembalikan 20 baris! Query ini memakan waktu **4 hingga 10 detik** dan dapat melumpuhkan server!

---

### Solusi 1: Keyset Pagination / Seek Method ($O(\\log N)$)
Gantikan offset numerik dengan pointer ID terakhir yang dilihat klien:
\`\`\`sql
SELECT * FROM orders WHERE id > :last_seen_id ORDER BY id ASC LIMIT 20;
\`\`\`
Kompleksitas turun dari $O(N)$ ke **$O(\\log N)$** karena langsung melompat ke daun B+Tree!

---

### Solusi 2: Deferred Join (Jika Memerlukan Nomor Halaman Acak)
Gunakan subquery yang hanya membaca Primary Key dari index di RAM:
\`\`\`sql
SELECT o.* 
FROM orders o
INNER JOIN (
    SELECT id FROM orders ORDER BY id ASC LIMIT 5000000, 20
) AS page USING (id);
\`\`\``
                }
              ],
              starterCode: `-- Tuliskan query Keyset Pagination dan Deferred Join
-- 1. Keyset Pagination (O(log N) B+Tree Point Seek)
SELECT id, user_id, total_cents, status, created_at
FROM orders
WHERE id > 4999980
ORDER BY id ASC
LIMIT 20;

-- 2. Deferred Join Optimization (RAM-only index scan for offset)
SELECT o.id, o.user_id, o.total_cents, o.status, o.created_at
FROM orders o
INNER JOIN (
    SELECT id 
    FROM orders 
    ORDER BY id ASC 
    LIMIT 1000000, 20
) AS sub USING (id);`,
              hints: [
                "Keyset pagination menggunakan klausa WHERE id > :last_seen_id untuk melompati baris dalam O(log N)",
                "Deferred Join memindai index ID yang sangat ramping di memori RAM, lalu melakukan join ke data tabel hanya untuk 20 baris terpilih"
              ],
              requirements: [
                {
                  id: "req-pg-keyset",
                  description: "Mengimplementasikan Keyset Pagination dengan WHERE id > ... ORDER BY id ASC LIMIT",
                  validate: (code) => code.includes("WHERE id >") && code.includes("ORDER BY id ASC")
                },
                {
                  id: "req-pg-deferred",
                  description: "Mengimplementasikan Deferred Join menggunakan INNER JOIN subquery USING (id)",
                  validate: (code) => code.includes("INNER JOIN (") && code.includes("USING (id)")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "mysql-lvl-4",
      title: "Level 4 \u2014 Transaksi ACID, Tingkat Isolasi & Pencegahan Deadlock",
      description: "Prinsip ACID, Repeatable Read vs Read Committed, Pessimistic Locking (SELECT FOR UPDATE), MVCC, dan resolusi Deadlock.",
      modules: [
        {
          id: "mysql-mod-9",
          title: "Transaksi ACID & Tingkat Isolasi (Isolation Levels)",
          description: "Memahami fenomena Dirty Read, Non-Repeatable Read, dan Phantom Read pada konkurensi multi-user.",
          lessons: [
            {
              id: "mysql-les-acid-deep",
              title: "Empat Pilar Transaksi ACID & Tingkat Isolasi",
              type: "learn",
              xpReward: 45,
              content: [
                {
                  type: "markdown",
                  content: `### Empat Karakteristik ACID

1. **Atomicity:** Seluruh operasi dalam transaksi harus berhasil 100%, atau jika ada 1 yang gagal, seluruhnya dibatalkan (*all or nothing*).
2. **Consistency:** Transaksi membawa database dari satu state valid ke state valid lainnya sesuai seluruh constraints skema.
3. **Isolation:** Transaksi yang berjalan bersamaan tidak boleh saling mengganggu atau membaca data yang belum di-commit oleh transaksi lain.
4. **Durability:** Setelah transaksi di-\`COMMIT\`, perubahannya permanen dan tidak akan hilang meskipun server mati listrik detik berikutnya (dijamin oleh Redo Log).

#### Empat Tingkat Isolasi SQL:
- **READ UNCOMMITTED:** Terendah. Membuka peluang *Dirty Read* (membaca data transaksi lain yang belum tentu di-commit).
- **READ COMMITTED:** Menghilangkan Dirty Read. Setiap query membaca snapshot terbaru yang sudah ter-commit.
- **REPEATABLE READ (Default MySQL InnoDB):** Menghilangkan *Non-Repeatable Read*. Membaca snapshot konsisten yang dibuat saat transaksi pertama kali dimulai menggunakan MVCC (Multi-Version Concurrency Control).
- **SERIALIZABLE:** Tertinggi. Mengunci setiap baris yang dibaca secara otomatis, mencegah *Phantom Read* namun menurunkan throughput konkurensi.`
                },
                {
                  type: "code-example",
                  language: "sql",
                  code: `-- Memeriksa dan Mengubah Tingkat Isolasi Transaksi
SELECT @@transaction_isolation;

-- Mengubah isolasi untuk sesi saat ini:
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;

START TRANSACTION;
-- Operasi transaksi...
COMMIT;`
                }
              ]
            },
            {
              id: "mysql-les-quiz-acid",
              title: "Kuis Transaksi ACID & Isolasi",
              type: "quiz",
              xpReward: 35,
              questions: [
                {
                  id: "mq-acid-1",
                  question: "Tingkat isolasi transaksi default yang digunakan oleh engine MySQL InnoDB adalah:",
                  options: [
                    "READ UNCOMMITTED",
                    "READ COMMITTED",
                    "REPEATABLE READ",
                    "SERIALIZABLE"
                  ],
                  correctAnswerIndex: 2,
                  explanation: "InnoDB menggunakan REPEATABLE READ secara default, memanfaatkan MVCC (Multi-Version Concurrency Control) dan Gap Locking untuk konsistensi pembacaan data."
                }
              ]
            }
          ]
        },
        {
          id: "mysql-mod-10",
          title: "Mekanisme Locking, MVCC & Pencegahan Deadlock",
          description: "Pessimistic locking (SELECT ... FOR UPDATE), shared vs exclusive locks, dan penanganan deadlock.",
          lessons: [
            {
              id: "mysql-les-locking-deadlock",
              title: "Pessimistic Locking (SELECT ... FOR UPDATE) & Pencegahan Deadlock",
              type: "learn",
              xpReward: 45,
              content: [
                {
                  type: "markdown",
                  content: `### Masalah Double-Spending pada Konkurensi Tinggi

Bayangkan saldo user Rp 100.000. Dua request penarikan Rp 80.000 datang di milidetik yang sama:
1. Thread A membaca: Saldo = 100.000 (Cukup!)
2. Thread B membaca: Saldo = 100.000 (Cukup!)
3. Thread A memotong: Saldo menjadi 20.000.
4. Thread B memotong: Saldo menjadi -60.000! (Perusahaan rugi).

#### Solusi: Pessimistic Row Locking (\`FOR UPDATE\`)
Ketika Thread A mengeksekusi \`SELECT balance FROM accounts WHERE id = 1 FOR UPDATE\`, InnoDB menaruh **Exclusive Row Lock (X-Lock)** pada baris tersebut.
Thread B yang mencoba membaca untuk update akan dipaksa **antre/menunggu (blocked)** sampai Thread A memanggil \`COMMIT\` atau \`ROLLBACK\`!

---

### Deep-Dive Theory: Deadlock Detection Algorithm & Wait-For Graph (WFG)
- InnoDB menjalankan background engine thread yang secara berkala memeriksa graf tunggu transaksi (**Wait-For Graph**).
- Graf merepresentasikan transaksi sebagai simpul ($V$) dan lock yang ditunggu sebagai sisi berarah ($E$).
- Jika ditemukan **siklus tertutup ($A \\rightarrow B \\rightarrow A$)**, terjadi Deadlock! Algoritma mendeteksinya dalam **$O(V + E)$** dan secara otomatis memilih transaksi dengan volume Undo Log paling kecil (*smallest weight*) untuk di-rollback sebagai korban.`
                },
                {
                  type: "code-example",
                  language: "sql",
                  code: `-- Simulasi Transfer Saldo Antar Akun yang Aman dari Race Condition
START TRANSACTION;

-- 1. Kunci baris pengirim secara eksklusif (Row Lock)
SELECT id, balance_cents 
FROM user_wallets 
WHERE user_id = 8821 
FOR UPDATE;

-- 2. Kurangi saldo pengirim
UPDATE user_wallets 
SET balance_cents = balance_cents - 50000000 
WHERE user_id = 8821;

-- 3. Tambahkan saldo penerima
UPDATE user_wallets 
SET balance_cents = balance_cents + 50000000 
WHERE user_id = 9934;

COMMIT;`
                }
              ]
            },
            {
              id: "mysql-les-practice-deadlock-free-checkout",
              title: "CAPSTONE CHALLENGE: Deadlock-Free Concurrent Multi-Item Flash Sale Checkout ($O(K \\log K)$ Deterministic Sorting)",
              type: "challenge",
              xpReward: 100,
              content: [
                {
                  type: "markdown",
                  content: `### Tantangan Capstone: Pencegahan Deadlock pada Flash Sale Multi-Item

Pada event promo Flash Sale, ribuan pelanggan membeli paket bundel yang berisi kombinasi berbagai produk:
- Customer 1 membeli Paket [Produk 10, Produk 5, Produk 22].
- Customer 2 membeli Paket [Produk 22, Produk 10, Produk 4].

Jika sistem mengunci baris produk secara acak sesuai urutan input user:
- Thread 1 mengunci Produk 10 lalu meminta Produk 22.
- Thread 2 mengunci Produk 22 lalu meminta Produk 10.
- **Keduanya saling tunggu selamanya $\\rightarrow$ DEADLOCK ERROR 1213!**

---

### Solusi Algoritma: Deterministic Lexicographical Sorting ($O(K \\log K)$)
Sebelum menjalankan \`SELECT ... FOR UPDATE\`, urutkan seluruh ID produk dari terkecil ke terbesar (\`ORDER BY id ASC\`).
Dengan selalu meminta lock dalam urutan yang seragam, **kondisi saling tunggu melingkar (Circular Wait) secara matematis mustahil terjadi!**`
                }
              ],
              starterCode: `-- Tuliskan prosedur transaksi checkout multi-item kebal deadlock
START TRANSACTION;

-- 1. Kunci seluruh item yang dibeli dengan urutan ID DETERMINISTIK (ORDER BY id ASC)
-- Kompleksitas sorting O(K log K) untuk K item bundel memusnahkan circular wait
SELECT id, stock_quantity, price_cents
FROM products
WHERE id IN (4, 10, 22)
ORDER BY id ASC
FOR UPDATE;

-- 2. Validasi stok untuk setiap produk di sisi aplikasi...

-- 3. Kurangi stok secara atomik
UPDATE products 
SET stock_quantity = stock_quantity - 1 
WHERE id = 4 AND stock_quantity >= 1;

UPDATE products 
SET stock_quantity = stock_quantity - 1 
WHERE id = 10 AND stock_quantity >= 1;

UPDATE products 
SET stock_quantity = stock_quantity - 1 
WHERE id = 22 AND stock_quantity >= 1;

-- 4. Buat pesanan induk dan detail item
INSERT INTO orders (user_id, total_cents, status) 
VALUES (9901, 7500000, 'PAID');

COMMIT;`,
              hints: [
                "Kunci sukses mencegah deadlock adalah klausa ORDER BY id ASC pada SELECT ... FOR UPDATE",
                "Kondisi stock_quantity >= 1 pada UPDATE mencegah overselling jika terjadi race condition",
                "Semua operasi harus berada di dalam START TRANSACTION dan COMMIT tunggal"
              ],
              requirements: [
                {
                  id: "req-dl-sort",
                  description: "Mengunci baris produk dengan SELECT ... FOR UPDATE diurutkan ORDER BY id ASC",
                  validate: (code) => code.includes("FOR UPDATE") && code.includes("ORDER BY id ASC")
                },
                {
                  id: "req-dl-tx",
                  description: "Membungkus seluruh operasi mutasi stok dalam START TRANSACTION dan COMMIT",
                  validate: (code) => code.includes("START TRANSACTION") && code.includes("COMMIT")
                }
              ]
            },
            {
              id: "mysql-les-quiz-deadlock",
              title: "Kuis Locking & Deadlock Resolution",
              type: "quiz",
              xpReward: 35,
              questions: [
                {
                  id: "mq-dl-1",
                  question: "Klausul SQL apa yang digunakan dalam transaksi untuk mengunci baris yang dibaca agar transaksi lain tidak dapat memodifikasinya hingga transaksi selesai?",
                  options: [
                    "FOR UPDATE",
                    "LOCK TABLE EXCLUSIVE",
                    "FREEZE ROW",
                    "NO CONCURRENCY"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "`SELECT ... FOR UPDATE` menempatkan Exclusive Lock (X-lock) pada baris target sampai transaksi di-COMMIT atau di-ROLLBACK."
                },
                {
                  id: "mq-dl-2",
                  question: "Strategi paling efektif dalam arsitektur aplikasi untuk mencegah terjadinya Deadlock antar transaksi konkuren adalah:",
                  options: [
                    "Selalu mengunci resource/baris dengan urutan deterministik yang konsisten (misal selalu urut berdasarkan ID terkecil ke terbesar)",
                    "Menghapus seluruh index dari database",
                    "Menggunakan transaksi tanpa klausa WHERE",
                    "Mematikan fitur transaksi ACID"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "Mengunci baris dalam urutan deterministik yang konsisten di seluruh thread (misalnya ORDER BY id ASC) mencegah kondisi siklis saling tunggu (circular wait) yang merupakan penyebab utama deadlock."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// src/data/cCurriculum.ts
var C_COURSE = {
  id: "c-mastery",
  title: "C Programming & Low-Level Systems",
  shortDescription: "Pahami cara kerja komputer dari akarnya: memori RAM, pointer arithmetic, alokasi heap manual (malloc/free), structs alignment, dan kompilasi GCC.",
  description: "Bahasa C adalah fondasi dari sistem operasi (Linux, Windows, macOS), database engine (PostgreSQL, MySQL, SQLite), dan browser engine modern (V8, WebKit). Mempelajari C membuka pemahaman fundamental tentang arsitektur memori Von Neumann, cache lines, pointer arithmetic, dan rekayasa perangkat lunak ultra-cepat tanpa perantara runtime.",
  icon: "terminal",
  levels: [
    {
      id: "c-lvl-0",
      title: "Level 0 \u2014 Fondasi Arsitektur C & Pipeline Kompilasi",
      description: "Sintaks inti C, memori layout (Text/Data/BSS/Stack/Heap), bitwise manipulation, dan 4 tahap kompilasi GCC.",
      modules: [
        {
          id: "c-mod-1",
          title: "Arsitektur Program C & Pipeline GCC",
          description: "Preprocessor, compiler, assembler, linker, serta layout memori di sistem operasi.",
          lessons: [
            {
              id: "c-les-1",
              title: "Anatomi Program C & 4 Tahap Kompilasi GCC",
              type: "learn",
              xpReward: 25,
              content: [
                {
                  type: "markdown",
                  content: `### Mengapa C Menguasai Dunia Rekayasa Sistem?

Bahasa C tidak memiliki *Garbage Collector*, *Virtual Machine*, atau *Runtime Interpreter*. Setiap instruksi C diterjemahkan hampir satu-ke-satu menjadi instruksi mesin arsitektur target (x86_64 atau ARM64).

\`\`\`
Source Code (.c / .h) 
      \u2502
      \u25BC [1. Preprocessor - cpp] -> Macro expansion, file inclusion (#include)
Preprocessed Code (.i)
      \u2502
      \u25BC [2. Compiler - cc1]     -> Syntax tree, IR optimization, assembly output
Assembly Code (.s)
      \u2502
      \u25BC [3. Assembler - as]     -> Machine instructions (OpCodes)
Object File (.o / .obj)
      \u2502
      \u25BC [4. Linker - ld]        -> Resolves symbols, links libc & static libs
Executable Binary (a.out / ELF)
\`\`\`

#### Layout Memori Program C di RAM:
1. **Text Segment (Code):** Instruksi mesin biner yang bersifat *read-only* untuk mencegah modifikasi kode saat runtime.
2. **Initialized Data Segment (.data):** Variabel global dan \`static\` yang telah diinisialisasi dengan nilai bukan nol.
3. **Uninitialized Data Segment (.bss):** Variabel global/static tanpa nilai awal (diinisialisasi otomatis ke 0 oleh kernel OS).
4. **Heap Segment:** Alokasi memori dinamis runtime via \`malloc()\` yang tumbuh ke arah alamat memori lebih tinggi (*grow upward*).
5. **Stack Segment:** Alokasi otomatis untuk stack frame fungsi (variabel lokal, return address, register backup) yang tumbuh ke bawah (*grow downward*).`
                },
                {
                  type: "code-example",
                  language: "c",
                  code: `#include <stdio.h>
#include <stdint.h>
#include <stdbool.h>

// Berada di Initialized Data Segment (.data)
int global_server_port = 8080;

// Berada di BSS Segment (.bss)
int global_request_counter;

int main(void) {
    // Berada di Stack Frame fungsi main
    int32_t worker_id = 42;
    double cpu_usage_pct = 12.45;
    char environment_flag = 'P'; // Production

    printf("=== SYSTEM RUNTIME METRICS ===\\n");
    printf("Port: %d | Worker: %d | CPU: %.2f%% | Env: %c\\n", 
           global_server_port, worker_id, cpu_usage_pct, environment_flag);

    // Menampilkan alamat memori untuk melihat layout stack vs data
    printf("Address of global_port (.data): %p\\n", (void*)&global_server_port);
    printf("Address of worker_id   (stack): %p\\n", (void*)&worker_id);

    return 0; // POSIX status code 0 = Sukses tanpa error
}`
                }
              ]
            },
            {
              id: "c-les-bitwise",
              title: "Operasi Bitwise & Hardware Bitmasks",
              type: "learn",
              xpReward: 30,
              content: [
                {
                  type: "markdown",
                  content: `### Mengapa Bitwise Esensial di Pemrograman Sistem?

Di sistem operasi, driver perangkat keras, dan protokol jaringan (TCP/IP), status sistem tidak disimpan dalam boolean terpisah (yang memboroskan 1 byte per nilai), melainkan dipadatkan ke dalam bit individual pada satu integer (*Bitmask*).

| Operator | Operasi | Contoh |
| :--- | :--- | :--- |
| \`&\` | AND (Pengecekan bit) | \`state & FLAG_READ\` |
| \`|\` | OR (Mengaktifkan bit) | \`state |= FLAG_WRITE\` |
| \`^\` | XOR (Toggle bit) | \`state ^= FLAG_EXEC\` |
| \`~\` | NOT (Invert bit) | \`state &= ~FLAG_WRITE\` (Mematikan bit) |
| \`<<\` | Left Shift (Kali 2^n) | \`1 << 3\` = 8 (bit ke-3 bernilai 1) |
| \`>>\` | Right Shift (Bagi 2^n) | \`16 >> 2\` = 4 |`
                },
                {
                  type: "code-example",
                  language: "c",
                  code: `#include <stdio.h>

// Definisi izin POSIX via Bit Flags
#define PERM_READ    (1 << 0) // 0001 (1)
#define PERM_WRITE   (1 << 1) // 0010 (2)
#define PERM_EXEC    (1 << 2) // 0100 (4)
#define PERM_ADMIN   (1 << 3) // 1000 (8)

int main(void) {
    unsigned char user_perms = 0;

    // 1. Berikan hak READ dan WRITE
    user_perms |= (PERM_READ | PERM_WRITE);
    printf("Permissions: 0x%02X\\n", user_perms); // 0x03

    // 2. Periksa apakah user memiliki hak EXECUTE
    if (user_perms & PERM_EXEC) {
        printf("Status: Boleh menjalankan binary!\\n");
    } else {
        printf("Status: AKSES EXECUTE DITOLAK!\\n");
    }

    // 3. Cabut hak WRITE menggunakan bitwise NOT dan AND
    user_perms &= ~PERM_WRITE;

    printf("Setelah WRITE dicabut: 0x%02X\\n", user_perms); // 0x01 (READ only)
    return 0;
}`
                }
              ]
            },
            {
              id: "c-les-quiz-1",
              title: "Kuis Fondasi C, Memori & Bitwise",
              type: "quiz",
              xpReward: 30,
              questions: [
                {
                  id: "cq-1",
                  question: "Segment memori mana di RAM yang menampung variabel lokal fungsi dan bertumbuh ke bawah (ke alamat memori yang lebih rendah)?",
                  options: ["Heap Segment", "Stack Segment", "BSS Segment", "Text Segment"],
                  correctAnswerIndex: 1,
                  explanation: "Stack Segment menampung stack frame (variabel lokal, argumen fungsi, return address) dan bertumbuh dari alamat tinggi ke rendah."
                },
                {
                  id: "cq-2",
                  question: "Bagaimana idiom C standar untuk mematikan (clear) bit tertentu pada suatu variabel flag tanpa mengganggu bit lainnya?",
                  options: [
                    "flag = flag | ~MASK;",
                    "flag = flag ^ MASK;",
                    "flag &= ~MASK;",
                    "flag |= MASK;"
                  ],
                  correctAnswerIndex: 2,
                  explanation: "`flag &= ~MASK` menginversi mask dengan bitwise NOT (`~`), lalu melakukan bitwise AND (`&`), sehingga bit target menjadi 0 sementara bit lain tetap utuh."
                },
                {
                  id: "cq-3",
                  question: "Apa peran Linker (ld) dalam pipeline kompilasi GCC?",
                  options: [
                    "Mengubah file .c menjadi kode assembly .s",
                    "Menggabungkan object file (.o) dengan library sistem (seperti libc) menjadi satu binary executable utuh",
                    "Menghapus baris komentar dan memperluas makro #define",
                    "Menjalankan program di sandbox virtual"
                  ],
                  correctAnswerIndex: 1,
                  explanation: "Linker bertanggung jawab menyelesaikan referensi simbol antar-file modul dan library pihak ketiga/standar menghasilkan binary biner yang siap dieksekusi oleh OS kernel."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "c-lvl-1",
      title: "Level 1 \u2014 Pointers, Structs Alignment & Direct Memory Access",
      description: "Pointer arithmetic, dereferencing, struct padding CPU, double pointers, dan function pointers.",
      modules: [
        {
          id: "c-mod-2",
          title: "Pointer & Direct Memory Access",
          description: "Manipulasi alamat RAM, pointer math, array decay, dan optimasi CPU cache.",
          lessons: [
            {
              id: "c-les-2",
              title: "Pointer, Dereferencing & Pointer Arithmetic",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Apa Hakikat Pointer di Arsitektur CPU?

Pointer bukan sekadar tipe data abstrak; pointer adalah **register 64-bit** (pada arsitektur modern x86_64/ARM64) yang berisi integer representasi **alamat fisik/virtual bus memori RAM**.

#### Aturan Emas Pointer Arithmetic:
Ketika kamu menambahkan \`1\` ke sebuah pointer (\`ptr + 1\`), alamat memori tidak bertambah 1 byte, melainkan bertambah sebesar **\`sizeof(*ptr)\` byte**!

\`\`\`
int arr[3] = {10, 20, 30}; // Misalkan alamat arr = 0x1000 (ukuran int = 4 byte)

ptr      -> 0x1000 (arr[0] = 10)
ptr + 1  -> 0x1004 (arr[1] = 20)  [0x1000 + (1 * 4)]
ptr + 2  -> 0x1008 (arr[2] = 30)  [0x1000 + (2 * 4)]
\`\`\``
                },
                {
                  type: "code-example",
                  language: "c",
                  code: `#include <stdio.h>

void compute_stats(const int *data, size_t length, int *out_min, int *out_max, double *out_avg) {
    if (length == 0) return;

    *out_min = *data;
    *out_max = *data;
    long sum = 0;

    // Menjelajahi array menggunakan Pointer Arithmetic
    const int *curr = data;
    const int *end = data + length;

    while (curr < end) {
        if (*curr < *out_min) *out_min = *curr;
        if (*curr > *out_max) *out_max = *curr;
        sum += *curr;
        curr++; // Maju sizeof(int) = 4 byte ke elemen berikutnya
    }

    *out_avg = (double)sum / length;
}

int main(void) {
    int sensor_readings[] = {24, 28, 19, 32, 27, 21, 30};
    size_t count = sizeof(sensor_readings) / sizeof(sensor_readings[0]);

    int min_val, max_val;
    double avg_val;

    compute_stats(sensor_readings, count, &min_val, &max_val, &avg_val);

    printf("Min: %d | Max: %d | Avg: %.2f\\n", min_val, max_val, avg_val);
    return 0;
}`
                }
              ]
            },
            {
              id: "c-les-structs-padding",
              title: "Structs, Memory Alignment & CPU Padding",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Mengapa Ukuran Struct Tidak Selalu Sama dengan Jumlah Variabelnya?

CPU modern tidak membaca memori per 1 byte sembarangan, melainkan membaca dalam blok teratur (umumnya **word size 4 byte atau 8 byte**) agar transfer bus memori optimal.

Proses meletakkan padding byte kosong di antara variabel disebut **Memory Alignment / Struct Padding**.

\`\`\`
// Buruk (12 Byte karena padding):
struct BadPacket {
    char a;      // 1 byte
    // [3 byte PADDING kosong oleh compiler]
    int b;       // 4 byte (wajib kelipatan 4)
    char c;      // 1 byte
    // [3 byte PADDING di akhir]
}; // Total: 12 byte!

// Optimal (8 Byte, hemat 33% RAM):
struct GoodPacket {
    int b;       // 4 byte
    char a;      // 1 byte
    char c;      // 1 byte
    // [2 byte padding akhir]
}; // Total: 8 byte!
\`\`\``
                },
                {
                  type: "code-example",
                  language: "c",
                  code: `#include <stdio.h>
#include <stddef.h>

struct Unordered {
    char flag;      // 1 byte
    double value;   // 8 byte
    short count;    // 2 byte
};

struct Optimized {
    double value;   // 8 byte
    short count;    // 2 byte
    char flag;      // 1 byte
    // 5 byte tail padding agar total kelipatan 8
};

int main(void) {
    printf("Ukuran Unordered : %zu byte\\n", sizeof(struct Unordered)); // Biasanya 24 byte
    printf("Ukuran Optimized : %zu byte\\n", sizeof(struct Optimized)); // 16 byte

    printf("Offset value di Optimized: %zu\\n", offsetof(struct Optimized, value)); // 0
    printf("Offset count di Optimized: %zu\\n", offsetof(struct Optimized, count)); // 8
    printf("Offset flag  di Optimized: %zu\\n", offsetof(struct Optimized, flag));  // 10

    return 0;
}`
                }
              ]
            },
            {
              id: "c-les-func-ptr",
              title: "Function Pointers & Callback Pattern di C",
              type: "learn",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: `### Function Pointer: Fondasi Arsitektur Event-Driven di C

Di bahasa C, fungsi juga menempati alamat memori di dalam *Text Segment*. Kita dapat menyimpan alamat fungsi di dalam variabel yang disebut **Function Pointer**.

Pola ini digunakan oleh:
1. **Linux Kernel Driver:** Struct \`file_operations\` dengan function pointer \`.read\`, \`.write\`, \`.open\`.
2. **qsort() Standar C Library:** Menerima fungsi komparator sebagai callback.
3. **Simulasi OOP di C:** Membuat *Virtual Method Table (vtable)* manual.`
                },
                {
                  type: "code-example",
                  language: "c",
                  code: `#include <stdio.h>
#include <stdlib.h>

// Definisi tipe function pointer untuk transformer data
typedef int (*TransformFunc)(int);

int square(int x) { return x * x; }
int double_val(int x) { return x * 2; }

// Fungsi tingkat tinggi (Higher-Order Function) di C murni
void map_array(int *arr, size_t len, TransformFunc fn) {
    for (size_t i = 0; i < len; i++) {
        arr[i] = fn(arr[i]); // Mengeksekusi callback melalui pointer
    }
}

int main(void) {
    int dataset[] = {1, 2, 3, 4, 5};
    size_t count = sizeof(dataset) / sizeof(dataset[0]);

    // Aplikasikan fungsi square ke seluruh elemen
    map_array(dataset, count, square);

    printf("Hasil setelah kuadrat: ");
    for (size_t i = 0; i < count; i++) {
        printf("%d ", dataset[i]); // 1 4 9 16 25
    }
    printf("\\n");

    return 0;
}`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "c-lvl-2",
      title: "Level 2 \u2014 Alokasi Memori Dinamis & Defensive Systems Programming",
      description: "malloc, calloc, realloc, free, Valgrind, AddressSanitizer, dan implementasi custom buffer dinamis.",
      modules: [
        {
          id: "c-mod-3",
          title: "Manual Memory Management & Sanitizers",
          description: "Manajemen memori Heap tanpa memory leaks dan debugging segfault.",
          lessons: [
            {
              id: "c-les-3",
              title: "malloc, realloc, free & Bahaya Dangling Pointer",
              type: "learn",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: `### Manajemen Memori Heap: Kekuatan & Bahaya Fatal

Fungsi keluarga \`stdlib.h\`:
- \`malloc(size)\`: Mengalokasikan blok byte mentah tanpa inisialisasi (berisi *garbage data*).
- \`calloc(num, size)\`: Mengalokasikan memori dan membersihkan semua byte menjadi nol (\`0\`).
- \`realloc(ptr, new_size)\`: Mengubah ukuran blok memori yang ada (bisa memperluas di tempat atau memindahkan ke alamat baru).
- \`free(ptr)\`: Mengembalikan blok memori ke kernel/allocator sistem.

#### 3 Kesalahan Memori Paling Mematikan di Industri:
1. **Memory Leak:** Mengalokasikan memori tapi lupa memanggil \`free()\`. Server akan kehabisan RAM seiring waktu.
2. **Dangling Pointer:** Membaca atau menulis ke pointer yang sudah dibebaskan (\`Use-After-Free\`).
3. **Double Free:** Memanggil \`free()\` dua kali pada pointer yang sama, menyebabkan korupsi heap allocator.`
                },
                {
                  type: "code-example",
                  language: "c",
                  code: `#include <stdio.h>
#include <stdlib.h>

// Definisi Struktur Dynamic Vector Sederhana
typedef struct {
    int *data;
    size_t size;
    size_t capacity;
} IntVector;

IntVector* vector_create(size_t initial_cap) {
    IntVector *vec = (IntVector *)malloc(sizeof(IntVector));
    if (!vec) return NULL;

    vec->data = (int *)malloc(initial_cap * sizeof(int));
    if (!vec->data) {
        free(vec);
        return NULL;
    }

    vec->size = 0;
    vec->capacity = initial_cap;
    return vec;
}

void vector_push(IntVector *vec, int value) {
    if (vec->size == vec->capacity) {
        // Gandakan kapasitas jika penuh
        size_t new_cap = vec->capacity * 2;
        int *new_data = (int *)realloc(vec->data, new_cap * sizeof(int));
        if (!new_data) {
            fprintf(stderr, "FATAL: Realloc gagal karena kehabisan RAM!\\n");
            return;
        }
        vec->data = new_data;
        vec->capacity = new_cap;
    }
    vec->data[vec->size++] = value;
}

void vector_destroy(IntVector **vec_ptr) {
    if (!vec_ptr || !*vec_ptr) return;
    free((*vec_ptr)->data);
    free(*vec_ptr);
    *vec_ptr = NULL; // Mencegah dangling pointer
}

int main(void) {
    IntVector *my_vec = vector_create(2);
    vector_push(my_vec, 100);
    vector_push(my_vec, 200);
    vector_push(my_vec, 300); // Memicu realloc otomatis

    printf("Vector Size: %zu | Capacity: %zu\\n", my_vec->size, my_vec->capacity);
    for (size_t i = 0; i < my_vec->size; i++) {
        printf("Element [%zu] = %d\\n", i, my_vec->data[i]);
    }

    // Bersihkan memori secara aman
    vector_destroy(&my_vec);
    return 0;
}`
                }
              ]
            },
            {
              id: "c-les-defensive",
              title: "Defensive Systems: Valgrind & AddressSanitizer",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Bagaimana Perusahaan Kelas Dunia Menjamin Keamanan C?

Developer kelas dunia tidak lagi mengandalkan insting manual untuk mendeteksi memory bug. Mereka menggunakan alat otomatis:

#### 1. AddressSanitizer (ASan):
Kompilasi dengan flag:
\`\`\`bash
gcc -fsanitize=address -g -O1 main.c -o main
./main
\`\`\`
Jika kode kamu melakukan *out-of-bounds read/write*, *heap-buffer-overflow*, atau *use-after-free*, program akan langsung crash seketika dan mencetak call stack baris kode penyebabnya secara presisi!

#### 2. Valgrind Memcheck:
\`\`\`bash
valgrind --leak-check=full --show-leak-kinds=all ./main
\`\`\`
Menganalisis binary tanpa recompilation khusus untuk menemukan kebocoran memori (\`definitely lost bytes\`).`
                }
              ]
            },
            {
              id: "c-les-quiz-advanced",
              title: "Kuis Evaluasi Sistem Memori C",
              type: "quiz",
              xpReward: 30,
              questions: [
                {
                  id: "c-adv-q1",
                  question: "Apa perbedaan mendasar antara fungsi alokasi malloc() dan calloc()?",
                  options: [
                    "malloc mengalokasikan di stack, calloc mengalokasikan di heap",
                    "calloc mengalokasikan memori dan menginisialisasi setiap byte ke nilai 0, sedangkan malloc membiarkan isi byte apa adanya (garbage)",
                    "malloc hanya bisa mengalokasikan hingga 1KB memori",
                    "calloc tidak perlu dibebaskan dengan fungsi free()"
                  ],
                  correctAnswerIndex: 1,
                  explanation: "`calloc(n, size)` membersihkan seluruh blok memori menjadi nol bit demi bit, sedangkan `malloc(size)` hanya memesan ruang tanpa inisialisasi."
                },
                {
                  id: "c-adv-q2",
                  question: "Mengapa menyetel pointer bernilai NULL setelah dipanggil free(ptr) adalah praktik defensive programming yang sangat dianjurkan?",
                  options: [
                    "Agar memori dibebaskan lebih cepat oleh sistem operasi",
                    "Mencegah pointer menjadi Dangling Pointer dan memicu crash yang mudah didiagnosis jika pointer tak sengaja diakses kembali",
                    "Karena fungsi free() secara default tidak menghapus data variabel",
                    "Untuk mengizinkan kompilator mengoptimalkan register CPU"
                  ],
                  correctAnswerIndex: 1,
                  explanation: "Pointer yang sudah di-free tetapi masih menyimpan alamat memori lama disebut Dangling Pointer. Menyetelnya ke NULL mencegah bug Use-After-Free tersembunyi."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// src/data/cppCurriculum.ts
var CPP_COURSE = {
  id: "cpp-mastery",
  title: "C++ Modern & High-Performance Systems",
  shortDescription: "Kuasai C++ Modern (C++17/20): RAII, Smart Pointers, Move Semantics, Template Metaprogramming, STL Internals, dan Multithreading.",
  description: 'C++ adalah bahasa utama di balik game engine (Unreal Engine), trading berkecepatan ultra-tinggi (High-Frequency Trading / HFT), core AI framework (PyTorch, TensorFlow, llama.cpp), browser rendering engines, dan sistem antariksa. Kuasai filosofi "Zero-Cost Abstractions", manajemen resource deterministik (RAII), dan konkurensi modern.',
  icon: "cpu",
  levels: [
    {
      id: "cpp-lvl-0",
      title: "Level 0 \u2014 Fondasi Modern C++ (C++17/C++20)",
      description: "Stream I/O, const references, auto type deduction, structured binding, dan komparasi dengan C.",
      modules: [
        {
          id: "cpp-mod-1",
          title: "Sintaks Modern & Zero-Cost Abstractions",
          description: "Namespaces, references, stream I/O, dan fitur modern language.",
          lessons: [
            {
              id: "cpp-les-1",
              title: "Evolusi C++: Dari C dengan Class ke Modern C++20",
              type: "learn",
              xpReward: 25,
              content: [
                {
                  type: "markdown",
                  content: `### Mengapa C++ Berbeda Fundamental dari C?

Banyak developer pemula mengira C++ hanyalah "bahasa C dengan class". Di era **Modern C++ (C++11 hingga C++20)**, filosofi bahasa berubah total:

#### Prinsip "Zero-Cost Abstractions" (Bjarne Stroustrup):
> *"Apa yang tidak kamu gunakan, tidak akan kamu bayar. Apa yang kamu gunakan, tidak bisa kamu tulis dengan tangan secara lebih cepat."*

\`\`\`
Perbandingan Pendekatan C vs C++ Modern:
\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 C Tradisional                \u2502 C++ Modern (C++20)           \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 malloc() & free() manual     \u2502 RAII & std::unique_ptr       \u2502
\u2502 Raw char* & strcat()         \u2502 std::string_view & fmt/print \u2502
\u2502 Raw array pointer int*       \u2502 std::vector & std::span      \u2502
\u2502 Void* & Function Pointer     \u2502 Templates & std::function    \u2502
\u2502 Manual pthread_create        \u2502 std::jthread & std::async    \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
\`\`\`

#### Fitur Esensial Modern C++:
1. **References (\`&\`):** Alias aman untuk variabel yang tidak bisa bernilai \`nullptr\` dan tidak memerlukan sintaks pointer yang bertele-tele.
2. **Const-Correctness (\`const Type&\`):** Mengirimkan data besar (seperti vector atau string) ke fungsi tanpa copy memori (nol alokasi) dan menjamin data tidak dimodifikasi secara tidak sengaja.
3. **Structured Bindings (C++17):** Membongkar tuple atau struct langsung menjadi variabel lokal: \`auto [key, value] = pair;\`.`
                },
                {
                  type: "code-example",
                  language: "cpp",
                  code: `#include <iostream>
#include <string>
#include <vector>
#include <tuple>

// Fungsi menerima const reference: 0 byte memory copy!
void inspect_telemetry(const std::string& node_id, const std::vector<double>& metrics) {
    std::cout << "Node: " << node_id << " | Sample Count: " << metrics.size() << "\\n";
}

// Mengembalikan pair status dan error code
std::tuple<bool, int, std::string> ping_cluster() {
    return {true, 200, "Cluster Healthy"};
}

int main() {
    std::string cluster_name = "sg-node-alpha-01";
    std::vector<double> latencies = {1.2, 0.9, 1.5, 0.8, 1.1};

    inspect_telemetry(cluster_name, latencies);

    // C++17 Structured Binding
    auto [is_healthy, status_code, msg] = ping_cluster();
    std::cout << "Status: " << status_code << " (" << msg << ")\\n";

    // Range-based for loop dengan const auto&
    for (const auto& ping : latencies) {
        if (ping > 1.0) {
            std::cout << "High ping detected: " << ping << "ms\\n";
        }
    }

    return 0;
}`
                }
              ]
            },
            {
              id: "cpp-les-quiz-1",
              title: "Kuis Konsep Modern C++",
              type: "quiz",
              xpReward: 30,
              questions: [
                {
                  id: "cpp-q1",
                  question: "Mengapa melewatkan argumen bertipe object besar sebagai `const std::string&` lebih disukai dibandingkan `std::string` biasa?",
                  options: [
                    "Menghindari alokasi heap baru dan penyalinan karakter (copying) yang boros memori serta menjaga immutability",
                    "Mengizinkan fungsi mengubah nilai variabel asli tanpa pointer",
                    "Memaksa compiler mengabaikan pengecekan tipe data",
                    "Hanya untuk kompatibilitas dengan bahasa C lama"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "Pass-by-const-reference melewatkan alias 64-bit alamat memori tanpa menduplikasi data buffer string di heap, sekaligus menjamin fungsi tidak bisa mengubah isinya."
                },
                {
                  id: "cpp-q2",
                  question: "Fitur C++17 yang memungkinkan kita mengekstrak nilai dari std::tuple, std::pair, atau struct langsung ke beberapa variabel individual bernama:",
                  options: ["Pattern Destructuring", "Structured Binding", "Macro Expansion", "Type Coercion"],
                  correctAnswerIndex: 1,
                  explanation: "Structured Binding (`auto [x, y] = point;`) diperkenalkan pada standar C++17."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "cpp-lvl-1",
      title: "Level 1 \u2014 Pemrograman Berorientasi Objek & RAII",
      description: "Constructor initialization lists, Destructor otomatis, Virtual Functions, Polymorphism, dan aturan RAII.",
      modules: [
        {
          id: "cpp-mod-2",
          title: "Class, Polymorphism & Arsitektur RAII",
          description: "Siklus hidup objek, vtable polimorfik, dan pembersihan resource deterministik.",
          lessons: [
            {
              id: "cpp-les-raii",
              title: "Prinsip RAII: Jantung Manajemen Resource C++",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Apa itu RAII (*Resource Acquisition Is Initialization*)?

Di bahasa lain (seperti Java atau Go), resource dibersihkan menggunakan blok \`finally\` atau \`defer\`. Namun jika terjadi exception atau return di tengah jalan, programmer sering lupa membersihkan resource (socket, file handle, thread mutex, atau heap memory).

**Di C++, resource diikat ke siklus hidup objek di Stack:**
1. **Acquisition (Constructor):** Resource dibuka atau dialokasikan saat objek dibuat.
2. **Release (Destructor - \`~ClassName\`):** Resource dibebaskan **secara deterministik** seketika objek keluar dari scope (\`}\`), baik keluar normal, via return, maupun akibat exception!

\`\`\`
Scope Block {
    FileHandler file("data.bin"); // Constructor dipanggil: file dibuka
    
    if (network_error) {
        return; // Destructor ~FileHandler() OTOMATIS dipanggil di sini!
    }
} // Destructor OTOMATIS dipanggil di sini juga! Nol kebocoran file handle.
\`\`\``
                },
                {
                  type: "code-example",
                  language: "cpp",
                  code: `#include <iostream>
#include <fstream>
#include <string>

// Implementasi RAII Wrapper untuk File Stream POSIX/C++
class SafeFileWriter {
private:
    std::ofstream m_file;
    std::string m_filename;

public:
    // Resource Acquisition di Constructor
    explicit SafeFileWriter(const std::string& path) 
        : m_filename(path), m_file(path, std::ios::out | std::ios::app) {
        if (!m_file.is_open()) {
            std::cerr << "Gagal membuka file: " << m_filename << "\\n";
        } else {
            std::cout << "[RAII] File dibuka: " << m_filename << "\\n";
        }
    }

    void write_entry(const std::string& log) {
        if (m_file.is_open()) {
            m_file << log << "\\n";
        }
    }

    // Resource Release di Destructor (Dipanggil otomatis!)
    ~SafeFileWriter() {
        if (m_file.is_open()) {
            m_file.flush();
            m_file.close();
            std::cout << "[RAII] File ditutup aman & di-flush: " << m_filename << "\\n";
        }
    }
};

void run_worker() {
    SafeFileWriter log_writer("system.log");
    log_writer.write_entry("[INFO] Worker memproses packet #1092");
    // Tidak perlu memanggil file.close() manual!
} // log_writer keluar dari stack frame -> destructor dieksekusi seketika

int main() {
    run_worker();
    std::cout << "Worker selesai tanpa memory/file handle leak!\\n";
    return 0;
}`
                }
              ]
            },
            {
              id: "cpp-les-polymorphism",
              title: "Virtual Functions, VTable & Virtual Destructors",
              type: "learn",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: `### Mekanisme Dynamic Dispatch & VTable di C++

Ketika sebuah class memiliki method bertanda \`virtual\`, compiler C++ menyisipkan pointer tersembunyi bernama **vptr** ke dalam objek. Vptr menunjuk ke **vtable (Virtual Method Table)** di memori yang berisi daftar alamat fungsi sesungguhnya.

#### Aturan Wajib Virtual Destructor:
Jika sebuah class dirancang untuk diwariskan (sebagai Base Class), **destructor-nya WAJIB dideklarasikan sebagai \`virtual\`**!
Jika tidak \`virtual\`, menghapus pointer base class (\`delete base_ptr\`) hanya akan memanggil destructor base class, menyebabkan destructor derived class terabaikan (*Undefined Behavior & Resource Leak*).`
                },
                {
                  type: "code-example",
                  language: "cpp",
                  code: `#include <iostream>
#include <memory>
#include <vector>

// Base Class Abstrak
class StorageEngine {
public:
    virtual void insert_record(int key, const std::string& value) = 0; // Pure Virtual
    virtual void flush() = 0;

    // WAJIB: Virtual Destructor
    virtual ~StorageEngine() {
        std::cout << "~StorageEngine base destroyed\\n";
    }
};

class MemoryStorage : public StorageEngine {
public:
    void insert_record(int key, const std::string& value) override {
        std::cout << "[MemoryEngine] Insert: " << key << " -> " << value << "\\n";
    }

    void flush() override {
        std::cout << "[MemoryEngine] RAM synced to snapshots.\\n";
    }

    ~MemoryStorage() override {
        std::cout << "~MemoryStorage derived destroyed (RAM freed)\\n";
    }
};

int main() {
    // Dynamic Polymorphism menggunakan Smart Pointer (std::unique_ptr)
    std::unique_ptr<StorageEngine> engine = std::make_unique<MemoryStorage>();
    engine->insert_record(101, "Customer #4928");
    engine->flush();

    // Ketika 'engine' keluar dari scope, virtual destructor memastikan
    // ~MemoryStorage() dipanggil TERLEBIH DAHULU sebelum ~StorageEngine()!
    return 0;
}`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "cpp-lvl-2",
      title: "Level 2 \u2014 Smart Pointers & Move Semantics",
      description: "std::unique_ptr, std::shared_ptr, std::weak_ptr, rvalue references (&&), dan std::move.",
      modules: [
        {
          id: "cpp-mod-3",
          title: "Manajemen Memori Modern Tanpa Raw Delete",
          description: "Menghilangkan raw pointer delete, memory ownership semantics, dan zero-copy transfers.",
          lessons: [
            {
              id: "cpp-les-smart-ptr",
              title: "Smart Pointers: std::unique_ptr vs std::shared_ptr",
              type: "learn",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: `### Jangan Pernah Menggunakan \`delete\` Manual di Modern C++!

Modern C++ menggantikan raw pointer dengan 3 tipe Smart Pointer yang diatur oleh RAII:

1. **\`std::unique_ptr<T>\`:**
   - Kepemilikan eksklusif (*Exclusive Ownership*).
   - Objek hanya boleh dimiliki oleh 1 pemilik pada satu waktu.
   - **Zero Overhead:** Ukurannya sama persis dengan raw pointer (8 byte) tanpa alokasi counter tambahan.
   - Tidak bisa di-copy, hanya bisa dipindahkan kepemilikannya (*Move Semantics*).

2. **\`std::shared_ptr<T>\`:**
   - Kepemilikan bersama (*Shared Ownership*).
   - Menggunakan alokasi **Control Block** di heap dengan atomic reference counter.
   - Objek dihapus otomatis saat reference counter mencapai \`0\`.

3. **\`std::weak_ptr<T>\`:**
   - Pengamat (*Observer*) tanpa menambah reference count.
   - Mencegah **Cyclic Dependency Leak** (ketika Node A menunjuk Node B dan Node B menunjuk Node A, sehingga refcount tidak pernah menjadi 0).`
                },
                {
                  type: "code-example",
                  language: "cpp",
                  code: `#include <iostream>
#include <memory>
#include <vector>

struct ClientSession {
    int session_id;
    ClientSession(int id) : session_id(id) {
        std::cout << "Session " << session_id << " CONNECTED\\n";
    }
    ~ClientSession() {
        std::cout << "Session " << session_id << " DISCONNECTED (Freed)\\n";
    }
};

int main() {
    std::cout << "=== 1. UNIQUE POINTER (Zero-Overhead Ownership) ===\\n";
    {
        auto session1 = std::make_unique<ClientSession>(101);
        // auto session2 = session1; // ERROR KOMPILASI! Tidak boleh dicopy!

        // Pindahkan kepemilikan via std::move
        auto session2 = std::move(session1);
        std::cout << "session1 is now: " << (session1 ? "valid" : "nullptr") << "\\n";
    } // session2 keluar scope -> ~ClientSession(101) otomatis dieksekusi!

    std::cout << "\\n=== 2. SHARED POINTER (Atomic Reference Counting) ===\\n";
    {
        std::shared_ptr<ClientSession> shared_a = std::make_shared<ClientSession>(202);
        std::cout << "Ref Count: " << shared_a.use_count() << "\\n"; // 1

        {
            std::shared_ptr<ClientSession> shared_b = shared_a; // Copy shared_ptr
            std::cout << "Ref Count bertambah: " << shared_a.use_count() << "\\n"; // 2
        } // shared_b keluar scope

        std::cout << "Ref Count setelah shared_b mati: " << shared_a.use_count() << "\\n"; // 1
    } // shared_a keluar scope -> Ref count = 0 -> memori dibebaskan!

    return 0;
}`
                }
              ]
            },
            {
              id: "cpp-les-move-semantics",
              title: "Move Semantics & Rvalue References (&&)",
              type: "learn",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: `### Revolusi Performa C++11: Move Semantics

Sebelum C++11, mengembalikan vector berisi 1.000.000 data dari fungsi akan menyalin (*deep copy*) seluruh array byte di heap ke variabel penampung baru.

Dengan **Move Semantics**:
- Objek sumber dianggap sebagai **rvalue** (nilai sementara yang akan segera dihancurkan).
- Objek tujuan cukup **"mencuri" pointer memori internal** dari objek sumber dalam waktu O(1) konstan (hanya menyalin pointer 8 byte) dan menyetel pointer sumber ke \`nullptr\`.

\`\`\`
Copy Semantics (Mahal):
Source: [0x5000: Data 1GB] \u2500\u2500(Deep Copy 1GB RAM)\u2500\u2500> Target: [0x9000: Data 1GB]

Move Semantics (Instan O(1)):
Source: [0x5000: Data 1GB]
Target mengambil alih alamat 0x5000:
Target: [0x5000: Data 1GB], Source disetel ke: [nullptr]
\`\`\``
                },
                {
                  type: "code-example",
                  language: "cpp",
                  code: `#include <iostream>
#include <vector>
#include <string>
#include <utility>

class PacketBuffer {
public:
    std::string name;
    std::vector<uint8_t> payload;

    PacketBuffer(std::string n, size_t bytes) : name(std::move(n)), payload(bytes, 0xAA) {
        std::cout << "[Alloc] Buffer " << name << " dibuat (" << payload.size() << " bytes)\\n";
    }

    // Move Constructor: Mencuri payload tanpa menyalin ulang vector
    PacketBuffer(PacketBuffer&& other) noexcept 
        : name(std::move(other.name)), payload(std::move(other.payload)) {
        std::cout << "[MOVE] Payload dipindahkan dalam 0.0001 ms!\\n";
    }
};

int main() {
    PacketBuffer buf1("Network_Stream", 1000000); // 1 MB buffer

    // std::move meng-cast buf1 menjadi rvalue
    PacketBuffer buf2 = std::move(buf1);

    std::cout << "Ukuran payload buf2: " << buf2.payload.size() << " bytes\\n";
    std::cout << "Ukuran payload buf1 setelah di-move: " << buf1.payload.size() << " bytes (kosong)\\n";

    return 0;
}`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "cpp-lvl-3",
      title: "Level 3 \u2014 Standard Template Library (STL) & Multithreading",
      description: "STL Container complexity, std::unordered_map hashing, std::thread, std::mutex, dan std::lock_guard.",
      modules: [
        {
          id: "cpp-mod-4",
          title: "Konkurensi Modern & Thread Safety",
          description: "Pemrograman paralel, sinkronisasi thread, dan race condition prevention.",
          lessons: [
            {
              id: "cpp-les-concurrency",
              title: "Multithreading dengan std::thread, std::mutex & std::lock_guard",
              type: "learn",
              xpReward: 45,
              content: [
                {
                  type: "markdown",
                  content: `### Menulis Kode Multi-Core yang Thread-Safe

Di era CPU multi-core, aplikasi server dan game engine menjalankan tugas berat di background worker thread.

#### Bahaya Race Condition:
Jika dua thread mengubah satu variabel global bersamaan tanpa sinkronisasi, CPU cache coherency akan rusak, menyebabkan data hilang atau crash (*Data Race*).

#### Solusi RAII Mutex:
Gunakan \`std::mutex\` yang dibungkus oleh **\`std::lock_guard<std::mutex>\`**. Lock guard mengunci mutex di constructor dan **otomatis membuka kunci saat keluar dari blok**, bahkan jika terjadi exception!`
                },
                {
                  type: "code-example",
                  language: "cpp",
                  code: `#include <iostream>
#include <thread>
#include <vector>
#include <mutex>
#include <atomic>

std::mutex g_cout_mutex;
std::atomic<long> g_processed_records{0}; // Atomic hardware register tanpa lock

void process_batch(int worker_id, int count) {
    for (int i = 0; i < count; ++i) {
        g_processed_records.fetch_add(1, std::memory_order_relaxed);
    }

    // Gunakan lock_guard untuk proteksi akses I/O konsol
    {
        std::lock_guard<std::mutex> lock(g_cout_mutex);
        std::cout << "[Worker " << worker_id << "] Selesai memproses " << count << " batch.\\n";
    }
}

int main() {
    std::vector<std::thread> workers;
    int worker_count = 4;
    int batch_per_worker = 250000;

    for (int i = 0; i < worker_count; ++i) {
        workers.emplace_back(process_batch, i + 1, batch_per_worker);
    }

    // Tunggu semua thread selesai dieksekusi (join)
    for (auto& t : workers) {
        if (t.joinable()) {
            t.join();
        }
    }

    std::cout << "Total Records Terproses: " << g_processed_records.load() << "\\n";
    return 0;
}`
                }
              ]
            },
            {
              id: "cpp-les-quiz-final",
              title: "Kuis Evaluasi C++ Modern & Systems",
              type: "quiz",
              xpReward: 35,
              questions: [
                {
                  id: "cpp-fin-1",
                  question: "Mengapa std::make_unique<T>() lebih direkomendasikan daripada std::unique_ptr<T>(new T())?",
                  options: [
                    "Mencegah kemungkinan memory leak jika terjadi exception sebelum objek selesai dikonstruksi serta lebih ekspresif",
                    "Mengubah alokasi memori dari heap menjadi stack",
                    "Membuat unique pointer bisa di-copy ke banyak thread",
                    "Otomatis mengaktifkan enkripsi memory"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "`std::make_unique` menyediakan exception safety dan menghindari pemanggilan operator `new` eksplisit di kode modern."
                },
                {
                  id: "cpp-fin-2",
                  question: "Apa peran std::weak_ptr dalam ekosistem Smart Pointer C++?",
                  options: [
                    "Mengalokasikan memori yang ukurannya lebih kecil daripada pointer biasa",
                    "Memantau objek std::shared_ptr tanpa menaikkan reference count untuk memutus siklus saling-referensi (Cyclic Dependency)",
                    "Menghapus objek secara instan saat deklarasi",
                    "Hanya bisa digunakan di arsitektur 32-bit"
                  ],
                  correctAnswerIndex: 1,
                  explanation: "`std::weak_ptr` tidak menambah reference counter pada control block, sehingga mencegah memory leak akibat cyclic reference antar objek."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// src/data/golangCurriculum.ts
var GOLANG_COURSE = {
  id: "golang-mastery",
  title: "Go (Golang) & Cloud Concurrency Engineering",
  shortDescription: "Bangun backend microservices super cepat: arsitektur Goroutine, Channels, Worker Pools, context cancellation, dan server net/http produksi.",
  description: "Go diciptakan oleh Google (Robert Griesemer, Rob Pike, Ken Thompson) untuk menjawab tantangan skalabilitas komputasi cloud terdistribusi. Go menggerakkan infrastruktur modern dunia seperti Docker, Kubernetes, Terraform, Prometheus, dan CockroachDB. Pelajari model konkurensi CSP (*Communicating Sequential Processes*), sinkronisasi data tanpa lock contention, dan HTTP microservices produksi.",
  icon: "zap",
  levels: [
    {
      id: "go-lvl-0",
      title: "Level 0 \u2014 Fondasi Idiomatik & Alokasi Memori Go",
      description: "Single binary compilation, explicit error handling, defer LIFO, slices internals, dan escape analysis.",
      modules: [
        {
          id: "go-mod-1",
          title: "Filosofi Desain Go & Tipe Data Lanjutan",
          description: "Package main, slices capacity/length, multiple returns, dan explicit error flow.",
          lessons: [
            {
              id: "go-les-1",
              title: "Anatomi Go, Explicit Errors & Slices Internals",
              type: "learn",
              xpReward: 25,
              content: [
                {
                  type: "markdown",
                  content: `### Mengapa Go Sangat Digemari di Infrastruktur Cloud?

Go sengaja dirancang **minimalis dan pragmatis**: tidak ada pewarisan class yang rumit (*no inheritance*), tidak ada ternary operator, dan **tidak ada exception (\`try/catch\`)**.

#### 1. Explicit Error Handling:
Alih-alih melempar exception tak terduga yang bisa merusak call stack di runtime, fungsi Go selalu mengembalikan nilai error sebagai warga negara kelas satu (*first-class citizen*):
\`\`\`go
data, err := fetchUserData(userID)
if err != nil {
    log.Printf("Gagal membaca user: %v", err)
    return err
}
\`\`\`

#### 2. Anatomi Internal Slice di Go (Header 24-byte):
Slice bukan array statis, melainkan sebuah struct internal kecil:
\`\`\`
Slice Header (24 bytes pada sistem 64-bit):
\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 Data Pointer   \u2502 Length (len) \u2502 Capacity     \u2502
\u2502 (8 bytes RAM)  \u2502 (8 bytes)    \u2502 (cap - 8 B)  \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
        \u2502
        \u25BC Menunjuk ke backing array di heap/stack
[ elem0 | elem1 | elem2 | ... ]
\`\`\`
Ketika slice melewati kapasitas (*capacity*), Go mengalokasikan backing array baru dengan ukuran 2x lipat dan menyalin isinya.`
                },
                {
                  type: "code-example",
                  language: "go",
                  code: `package main

import (
	"errors"
	"fmt"
)

// Sentinel error untuk domain logic
var ErrUserNotFound = errors.New("entitas user tidak ditemukan di database")

type UserRecord struct {
	ID    int64
	Email string
	Tier  string
}

func queryUser(id int64) (*UserRecord, error) {
	if id <= 0 {
		return nil, errors.New("ID user harus lebih besar dari 0")
	}
	if id == 404 {
		return nil, ErrUserNotFound
	}
	return &UserRecord{ID: id, Email: "admin@codera.dev", Tier: "Enterprise"}, nil
}

func main() {
	// Demonstrasi Slices Internals: Length vs Capacity
	metrics := make([]int, 0, 4) // len: 0, cap: 4
	fmt.Printf("Init  -> len: %d, cap: %d\\n", len(metrics), cap(metrics))

	for i := 1; i <= 5; i++ {
		metrics = append(metrics, i*10)
		fmt.Printf("Step %d -> len: %d, cap: %d\\n", i, len(metrics), cap(metrics))
	}

	// Explicit error handling
	user, err := queryUser(10)
	if err != nil {
		if errors.Is(err, ErrUserNotFound) {
			fmt.Println("Peringatan: User tidak ada.")
			return
		}
		fmt.Printf("Database Error: %v\\n", err)
		return
	}

	fmt.Printf("User Terverifikasi: %s (%s)\\n", user.Email, user.Tier)
}`
                }
              ]
            },
            {
              id: "go-les-quiz-1",
              title: "Kuis Fondasi & Slice Go",
              type: "quiz",
              xpReward: 30,
              questions: [
                {
                  id: "gq-1",
                  question: "Tiga komponen apa yang menyusun sebuah Slice Header di arsitektur internal runtime Go?",
                  options: [
                    "Pointer ke backing array, Length, dan Capacity",
                    "Hash key, Value bucket, dan Size",
                    "Class metadata, Method table, dan Garbage collector mark",
                    "File descriptor, Inode, dan Permissions"
                  ],
                  correctAnswerIndex: 0,
                  explanation: "Slice di Go direpresentasikan oleh struct 24-byte yang terdiri dari: Pointer penunjuk elemen memori, nilai Length (`len`), dan nilai Capacity (`cap`)."
                },
                {
                  id: "gq-2",
                  question: "Kapan baris kode yang diawali kata kunci `defer` dieksekusi di Go?",
                  options: [
                    "Seketika baris tersebut dibaca compiler",
                    "Tepat sebelum fungsi pembungkusnya selesai kembali (return), dalam urutan LIFO (Last-In-First-Out)",
                    "Hanya jika terjadi error fatal (panic)",
                    "Di thread latar belakang secara acak"
                  ],
                  correctAnswerIndex: 1,
                  explanation: "`defer` mendaftarkan fungsi pembersih yang akan dieksekusi tepat sebelum fungsi pembungkus selesai, dengan urutan tumpukan LIFO."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "go-lvl-1",
      title: "Level 1 \u2014 Structs, Interfaces & Composition over Inheritance",
      description: "Value vs pointer receivers, struct embedding, implicit interface implementation, dan error wrapping.",
      modules: [
        {
          id: "go-mod-2",
          title: "Polimorfisme & Implicit Interfaces",
          description: 'Duck typing statis di Go tanpa deklarasi "implements".',
          lessons: [
            {
              id: "go-les-interfaces",
              title: "Implicit Interfaces & Composition over Inheritance",
              type: "learn",
              xpReward: 35,
              content: [
                {
                  type: "markdown",
                  content: `### Mengapa Go Tidak Memiliki Kata Kunci "implements"?

Di bahasa lain (Java, PHP, TypeScript), sebuah class harus mendeklarasikan \`class Service implements Notifier\`.

**Di Go, interface diimplementasikan secara implisit (*Structural Typing / Duck Typing*):**
> *"Jika ia berjalan seperti bebek dan bersuara seperti bebek, maka ia adalah bebek."*

Jika sebuah struct memiliki sekumpulan method yang sesuai dengan definisi sebuah interface, maka struct tersebut **secara otomatis telah memenuhi interface tersebut** tanpa perlu menyentuh kode struct aslinya!

#### Pointer vs Value Receivers:
- \`func (u User) Name() string\`: Menerima salinan (*copy*) data. Cocok untuk struct kecil yang *read-only*.
- \`func (u *User) SetEmail(email string)\`: Menerima pointer langsung ke struct. **Wajib jika method memodifikasi isi struct** atau struct berukuran besar.`
                },
                {
                  type: "code-example",
                  language: "go",
                  code: `package main

import (
	"fmt"
	"time"
)

// 1. Definisi Interface
type PaymentGateway interface {
	Charge(amountIDR int64) (transactionID string, err error)
}

// 2. Struct Gateway Midtrans
type MidtransProvider struct {
	ServerKey string
}

// Mengimplementasikan interface PaymentGateway secara implisit
func (m *MidtransProvider) Charge(amountIDR int64) (string, error) {
	fmt.Printf("[Midtrans] Memproses transfer Rp %d dengan server key: %s...\\n", amountIDR, m.ServerKey[:4]+"****")
	return fmt.Sprintf("TRX-MDT-%d", time.Now().Unix()), nil
}

// 3. High-Level Checkout Service (Dependency Injection)
type OrderService struct {
	gateway PaymentGateway // Bergantung pada interface, bukan implementasi konkret!
}

func (s *OrderService) CompleteOrder(orderID string, price int64) {
	trxID, err := s.gateway.Charge(price)
	if err != nil {
		fmt.Printf("Gagal checkout order %s: %v\\n", orderID, err)
		return
	}
	fmt.Printf("Order %s LUNAS! Nomor Transaksi: %s\\n", orderID, trxID)
}

func main() {
	midtrans := &MidtransProvider{ServerKey: "SB-Mid-server-8291823901"}
	checkoutApp := &OrderService{gateway: midtrans}

	checkoutApp.CompleteOrder("INV-2026-001", 350000)
}`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "go-lvl-2",
      title: "Level 2 \u2014 Concurrency CSP: Goroutines, Channels & Worker Pools",
      description: "Goroutines scheduler (M:N), buffered channels, select timeout, sync.WaitGroup, sync.Mutex, dan Worker Pools.",
      modules: [
        {
          id: "go-mod-3",
          title: "Konkurensi Skala Tinggi & Worker Pools",
          description: "Memproses jutaan task dengan overhead minimal dan tanpa race conditions.",
          lessons: [
            {
              id: "go-les-concurrency-deep",
              title: "Goroutines (~2KB Stack) & Channel Communication",
              type: "learn",
              xpReward: 40,
              content: [
                {
                  type: "markdown",
                  content: `### Mengapa Goroutine Jauh Lebih Efisien daripada OS Thread?

- **OS Thread:** Mengalokasikan 1 MB hingga 8 MB stack memori tetap. Mengganti thread (*context switch*) membutuhkan trap kernel CPU yang memakan ratusan siklus CPU.
- **Goroutine:** Dimulai hanya dengan **~2 KB stack memori** yang bisa bertumbuh dinamis. Go Runtime memiliki scheduler sendiri (**GMP Model**: Goroutine, Machine, Processor) yang melakukan context switch sepenuhnya di *userspace*!

\`\`\`
Pola Komunikasi CSP (Rob Pike):
"Jangan berkomunikasi dengan berbagi memori (shared memory);
 bagikanlah memori dengan cara berkomunikasi (channels)."
\`\`\`

#### 4 Aksi Channel Penting:
1. Menulis ke unbuffered channel akan **memblokir** sampai ada goroutine lain yang membaca.
2. Membaca dari unbuffered channel akan **memblokir** sampai ada goroutine lain yang menulis.
3. Menulis ke channel yang sudah di-\`close()\` akan memicu **panic**.
4. Membaca dari channel tertutup akan menghasilkan zero-value dan \`ok = false\`.`
                },
                {
                  type: "code-example",
                  language: "go",
                  code: `package main

import (
	"fmt"
	"sync"
	"time"
)

// Job Payload
type Job struct {
	ID    int
	Email string
}

// Worker Pool Pattern di Go
func emailWorker(id int, jobs <-chan Job, results chan<- string, wg *sync.WaitGroup) {
	defer wg.Done()

	for job := range jobs {
		// Simulasi pengiriman email
		time.Sleep(10 * time.Millisecond)
		results <- fmt.Sprintf("[Worker %d] Email sukses terkirim ke: %s (Job #%d)", id, job.Email, job.ID)
	}
}

func main() {
	const numJobs = 10
	const numWorkers = 3

	jobs := make(chan Job, numJobs)
	results := make(chan string, numJobs)
	var wg sync.WaitGroup

	// Menyalakan 3 worker goroutines
	for w := 1; w <= numWorkers; w++ {
		wg.Add(1)
		go emailWorker(w, jobs, results, &wg)
	}

	// Mengirim tugas ke antrean channel
	for j := 1; j <= numJobs; j++ {
		jobs <- Job{ID: j, Email: fmt.Sprintf("user%d@company.com", j)}
	}
	close(jobs) // Beritahu worker bahwa tidak ada lagi job baru

	// Tunggu semua worker selesai di goroutine terpisah
	go func() {
		wg.Wait()
		close(results)
	}()

	// Baca hasil pengiriman
	for res := range results {
		fmt.Println(res)
	}
}`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "go-lvl-3",
      title: "Level 3 \u2014 Context Cancellation & Production HTTP Microservices",
      description: "context.WithTimeout, graceful shutdown, structured JSON middleware, dan routing HTTP.",
      modules: [
        {
          id: "go-mod-4",
          title: "Microservices & Graceful Server Shutdown",
          description: "Membangun HTTP API tangguh dengan batasan timeout dan sinyal OS SIGTERM.",
          lessons: [
            {
              id: "go-les-server-prod",
              title: "Production HTTP Server dengan Middleware & Graceful Shutdown",
              type: "learn",
              xpReward: 45,
              content: [
                {
                  type: "markdown",
                  content: `### Mengapa Graceful Shutdown Sangat Vital di Lingkungan Kubernetes / Docker?

Ketika deployment baru diluncurkan di Kubernetes, Pod lama akan menerima sinyal **SIGTERM**.
Jika server langsung mati mendadak, request HTTP dari user yang sedang melakukan pembayaran atau update database akan putus di tengah jalan (*502 Bad Gateway / Inconsistent Data*).

#### Pola Graceful Shutdown:
1. Tangkap sinyal \`os.Interrupt\` atau \`syscall.SIGTERM\`.
2. Hentikan penerimaan request HTTP baru.
3. Berikan waktu tenggang (misal 5 detik via \`context.WithTimeout\`) agar request yang sedang berjalan selesai diproses secara tuntas.
4. Tutup koneksi database dan keluar dengan kode 0.`
                },
                {
                  type: "code-example",
                  language: "go",
                  code: `package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

type HealthResponse struct {
	Status    string    \`json:"status"\`
	Timestamp time.Time \`json:"timestamp"\`
	Version   string    \`json:"version"\`
}

// Middleware Logging
func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		fmt.Printf("[%s] %s %s - Selesai dalam %v\\n", time.Now().Format("15:04:05"), r.Method, r.URL.Path, time.Since(start))
	})
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	res := HealthResponse{
		Status:    "UP",
		Timestamp: time.Now(),
		Version:   "v2.4.1",
	}
	json.NewEncoder(w).Encode(res)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/v1/health", healthHandler)

	server := &http.Server{
		Addr:         ":8080",
		Handler:      loggingMiddleware(mux),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	// Jalankan server di goroutine independen
	go func() {
		fmt.Println("Backend Microservice running on http://localhost:8080")
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			fmt.Printf("Server crash: %v\\n", err)
		}
	}()

	// Channel untuk mendengarkan sinyal OS SIGINT / SIGTERM
	stopChan := make(chan os.Signal, 1)
	signal.Notify(stopChan, os.Interrupt, syscall.SIGTERM)

	<-stopChan // Blokir sampai sinyal penghentian diterima
	fmt.Println("\\nSinyal shutdown diterima! Memulai Graceful Drain...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		fmt.Printf("Force shutdown karena timeout: %v\\n", err)
	} else {
		fmt.Println("Server berhasil dihentikan secara bersih tanpa data loss!")
	}
}`
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// src/data/curriculum.ts
var COURSES = [
  HTML_COURSE,
  CSS_COURSE,
  JS_COURSE,
  PYTHON_COURSE,
  PHP_COURSE,
  MYSQL_COURSE,
  GOLANG_COURSE,
  C_COURSE,
  CPP_COURSE,
  GIT_COURSE,
  REACT_COURSE,
  BACKEND_COURSE,
  DATABASE_COURSE,
  FULLSTACK_COURSE,
  CONTINUOUS_ENGINEERING_COURSE,
  CYBERSECURITY_COURSE,
  AUTH_API_SECURITY_COURSE,
  DEVSECOPS_DEPLOYMENT_COURSE,
  RELIABILITY_OBSERVABILITY_COURSE
];

// server.ts
import_firebase_admin.default.initializeApp();
var adminDb = (0, import_firestore.getFirestore)();
var adminAuth = (0, import_auth.getAuth)();
var authenticateFirebaseUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};
var requireAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (req.user.admin === true) {
    return next();
  }
  try {
    const adminDoc = await adminDb.collection("admins").doc(req.user.uid).get();
    if (adminDoc.exists) {
      return next();
    }
  } catch (e) {
    console.error("Error verifying admin document:", e);
  }
  return res.status(403).json({ error: "Forbidden" });
};
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "10mb" }));
  let ai = null;
  const getAi = () => {
    if (!ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is required");
      }
      ai = new import_genai.GoogleGenAI({ apiKey });
    }
    return ai;
  };
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app.get("/api/admin/auth-check", authenticateFirebaseUser, requireAdmin, (req, res) => {
    res.json({ authorized: true });
  });
  const logAudit = async (adminId, action, targetType, targetId, details = {}) => {
    try {
      const logRef = adminDb.collection("audit_logs").doc();
      await logRef.set({
        id: logRef.id,
        adminId,
        action,
        targetType,
        targetId,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        details
      });
    } catch (err) {
      console.error("Failed to persist audit log:", err);
    }
  };
  const VALID_STATUSES = ["draft", "review", "published", "archived"];
  const VALID_STATUS_TRANSITIONS = {
    draft: ["review", "published", "archived"],
    review: ["draft", "published", "archived"],
    published: ["archived", "draft"],
    archived: ["draft"]
  };
  app.get("/api/admin/courses", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const snap = await adminDb.collection("courses").get();
      const courses = [];
      snap.forEach((doc) => {
        courses.push({ id: doc.id, ...doc.data() });
      });
      courses.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
      res.json({ courses });
    } catch (err) {
      console.error("Error fetching admin courses:", err);
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });
  app.post("/api/admin/courses", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const { id: rawId, title, description, shortDescription, icon, status = "draft", order = 0 } = req.body;
      if (!rawId || !title) {
        return res.status(400).json({ error: "ID and title are required" });
      }
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ error: "Invalid content status" });
      }
      const deterministicId = preserveOrSanitizeId(String(rawId));
      if (!deterministicId) {
        return res.status(400).json({ error: "Invalid course ID" });
      }
      const docRef = adminDb.collection("courses").doc(deterministicId);
      const existing = await docRef.get();
      if (existing.exists) {
        return res.status(409).json({ error: "Course with this ID already exists" });
      }
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const newCourse = {
        id: deterministicId,
        title,
        description: description || "",
        shortDescription: shortDescription || "",
        icon: icon || "code",
        status,
        order: Number(order) || 0,
        version: 1,
        createdAt: now,
        updatedAt: now,
        createdBy: req.user.uid,
        updatedBy: req.user.uid
      };
      await docRef.set(newCourse);
      await logAudit(req.user.uid, "course.created", "course", deterministicId, { title, status });
      res.status(201).json({ course: newCourse });
    } catch (err) {
      console.error("Error creating course:", err);
      res.status(500).json({ error: "Failed to create course" });
    }
  });
  app.get("/api/admin/courses/:id", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const id = String(req.params.id);
      const docSnap = await adminDb.collection("courses").doc(id).get();
      if (!docSnap.exists) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.json({ course: { id: docSnap.id, ...docSnap.data() } });
    } catch (err) {
      console.error("Error getting course:", err);
      res.status(500).json({ error: "Failed to retrieve course" });
    }
  });
  app.put("/api/admin/courses/:id", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const id = String(req.params.id);
      const { title, description, shortDescription, icon, order } = req.body;
      const docRef = adminDb.collection("courses").doc(id);
      const existing = await docRef.get();
      if (!existing.exists) {
        return res.status(404).json({ error: "Course not found" });
      }
      const prevData = existing.data() || {};
      const nextVersion = (prevData.version || 1) + 1;
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const updates = {
        version: nextVersion,
        updatedAt: now,
        updatedBy: req.user.uid
      };
      if (title !== void 0) updates.title = title;
      if (description !== void 0) updates.description = description;
      if (shortDescription !== void 0) updates.shortDescription = shortDescription;
      if (icon !== void 0) updates.icon = icon;
      if (order !== void 0) updates.order = Number(order);
      await docRef.update(updates);
      await logAudit(req.user.uid, "course.updated", "course", id, { updates, version: nextVersion });
      res.json({ course: { ...prevData, ...updates } });
    } catch (err) {
      console.error("Error updating course:", err);
      res.status(500).json({ error: "Failed to update course" });
    }
  });
  app.post("/api/admin/courses/:id/status", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const id = String(req.params.id);
      const { status } = req.body;
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` });
      }
      const docRef = adminDb.collection("courses").doc(id);
      const existing = await docRef.get();
      if (!existing.exists) {
        return res.status(404).json({ error: "Course not found" });
      }
      const currentStatus = existing.data()?.status || "draft";
      const allowedNext = VALID_STATUS_TRANSITIONS[currentStatus] || [];
      if (!allowedNext.includes(status)) {
        return res.status(400).json({
          error: `Illegal status transition from '${currentStatus}' to '${status}'. Allowed: ${allowedNext.join(", ")}`
        });
      }
      const nextVersion = (existing.data()?.version || 1) + 1;
      const now = (/* @__PURE__ */ new Date()).toISOString();
      await docRef.update({
        status,
        version: nextVersion,
        updatedAt: now,
        updatedBy: req.user.uid
      });
      await logAudit(req.user.uid, "course.status_changed", "course", id, {
        from: currentStatus,
        to: status,
        version: nextVersion
      });
      res.json({ id, status, version: nextVersion, updatedAt: now });
    } catch (err) {
      console.error("Error updating course status:", err);
      res.status(500).json({ error: "Failed to transition course status" });
    }
  });
  app.delete("/api/admin/courses/:id", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const id = String(req.params.id);
      const docRef = adminDb.collection("courses").doc(id);
      const existing = await docRef.get();
      if (!existing.exists) {
        return res.status(404).json({ error: "Course not found" });
      }
      const childLevelsSnap = await adminDb.collection("levels").where("courseId", "==", id).limit(1).get();
      if (!childLevelsSnap.empty) {
        return res.status(400).json({
          error: "Cannot delete course because it still contains active levels. Reassign or delete child levels first."
        });
      }
      await docRef.delete();
      await logAudit(req.user.uid, "course.deleted", "course", id, { previousTitle: existing.data()?.title });
      res.json({ success: true, id });
    } catch (err) {
      console.error("Error deleting course:", err);
      res.status(500).json({ error: "Failed to delete course" });
    }
  });
  app.get("/api/admin/courses/:courseId/levels", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const courseId = String(req.params.courseId);
      const courseSnap = await adminDb.collection("courses").doc(courseId).get();
      if (!courseSnap.exists) {
        return res.status(404).json({ error: "Parent course not found" });
      }
      const snap = await adminDb.collection("levels").where("courseId", "==", courseId).get();
      const levels = [];
      snap.forEach((doc) => {
        levels.push({ id: doc.id, ...doc.data() });
      });
      levels.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
      res.json({ levels });
    } catch (err) {
      console.error("Error fetching levels:", err);
      res.status(500).json({ error: "Failed to fetch levels" });
    }
  });
  app.post("/api/admin/courses/:courseId/levels", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const courseId = String(req.params.courseId);
      const courseSnap = await adminDb.collection("courses").doc(courseId).get();
      if (!courseSnap.exists) {
        return res.status(404).json({ error: "Parent course not found (level.courseId references nonexistent Course)" });
      }
      if (req.body.courseId && String(req.body.courseId) !== courseId) {
        return res.status(400).json({ error: "level.courseId in request body does not match courseId in URL" });
      }
      const { id: rawId, title, slug, description, status = "draft", order = 0 } = req.body;
      if (!title || typeof title !== "string") {
        return res.status(400).json({ error: "Level title is required" });
      }
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ error: `Invalid content status. Allowed: ${VALID_STATUSES.join(", ")}` });
      }
      const deterministicId = rawId ? preserveOrSanitizeId(String(rawId)) : generateLevelId(courseId, order);
      if (!deterministicId) {
        return res.status(400).json({ error: "Invalid level ID" });
      }
      const docRef = adminDb.collection("levels").doc(deterministicId);
      const existing = await docRef.get();
      if (existing.exists) {
        return res.status(409).json({ error: "Level with this ID already exists" });
      }
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const newLevel = {
        id: deterministicId,
        courseId,
        title: title.trim(),
        slug: slug ? sanitizeId(String(slug)) : deterministicId,
        description: description || "",
        status,
        order: Number(order) || 0,
        version: 1,
        createdAt: now,
        updatedAt: now,
        createdBy: req.user.uid,
        updatedBy: req.user.uid
      };
      await docRef.set(newLevel);
      await logAudit(req.user.uid, "level.created", "level", deterministicId, { title: newLevel.title, courseId, status });
      res.status(201).json({ level: newLevel });
    } catch (err) {
      console.error("Error creating level:", err);
      res.status(500).json({ error: "Failed to create level" });
    }
  });
  app.get("/api/admin/levels/:id", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const id = String(req.params.id);
      const docSnap = await adminDb.collection("levels").doc(id).get();
      if (!docSnap.exists) {
        return res.status(404).json({ error: "Level not found" });
      }
      res.json({ level: { id: docSnap.id, ...docSnap.data() } });
    } catch (err) {
      console.error("Error getting level:", err);
      res.status(500).json({ error: "Failed to retrieve level" });
    }
  });
  app.put("/api/admin/levels/:id", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const id = String(req.params.id);
      const { title, slug, description, order } = req.body;
      const docRef = adminDb.collection("levels").doc(id);
      const existing = await docRef.get();
      if (!existing.exists) {
        return res.status(404).json({ error: "Level not found" });
      }
      const prevData = existing.data() || {};
      const nextVersion = (prevData.version || 1) + 1;
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const updates = {
        version: nextVersion,
        updatedAt: now,
        updatedBy: req.user.uid
      };
      if (title !== void 0) updates.title = String(title).trim();
      if (slug !== void 0) updates.slug = sanitizeId(String(slug));
      if (description !== void 0) updates.description = String(description);
      if (order !== void 0) updates.order = Number(order);
      await docRef.update(updates);
      await logAudit(req.user.uid, "level.updated", "level", id, { updates, version: nextVersion });
      res.json({ level: { ...prevData, ...updates } });
    } catch (err) {
      console.error("Error updating level:", err);
      res.status(500).json({ error: "Failed to update level" });
    }
  });
  app.post("/api/admin/levels/:id/status", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const id = String(req.params.id);
      const { status } = req.body;
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` });
      }
      const docRef = adminDb.collection("levels").doc(id);
      const existing = await docRef.get();
      if (!existing.exists) {
        return res.status(404).json({ error: "Level not found" });
      }
      const currentStatus = existing.data()?.status || "draft";
      const allowedNext = VALID_STATUS_TRANSITIONS[currentStatus] || [];
      if (!allowedNext.includes(status)) {
        return res.status(400).json({
          error: `Illegal status transition from '${currentStatus}' to '${status}'. Allowed: ${allowedNext.join(", ")}`
        });
      }
      const nextVersion = (existing.data()?.version || 1) + 1;
      const now = (/* @__PURE__ */ new Date()).toISOString();
      await docRef.update({
        status,
        version: nextVersion,
        updatedAt: now,
        updatedBy: req.user.uid
      });
      await logAudit(req.user.uid, "level.status_changed", "level", id, {
        from: currentStatus,
        to: status,
        version: nextVersion
      });
      res.json({ id, status, version: nextVersion });
    } catch (err) {
      console.error("Error updating level status:", err);
      res.status(500).json({ error: "Failed to update level status" });
    }
  });
  app.delete("/api/admin/levels/:id", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const id = String(req.params.id);
      const docRef = adminDb.collection("levels").doc(id);
      const existing = await docRef.get();
      if (!existing.exists) {
        return res.status(404).json({ error: "Level not found" });
      }
      const childModulesSnap = await adminDb.collection("modules").where("levelId", "==", id).limit(1).get();
      if (!childModulesSnap.empty) {
        return res.status(400).json({
          error: "Cannot delete level because it still contains active modules. Move or delete child modules first."
        });
      }
      await docRef.delete();
      await logAudit(req.user.uid, "level.deleted", "level", id, {
        previousTitle: existing.data()?.title,
        courseId: existing.data()?.courseId
      });
      res.json({ success: true, id });
    } catch (err) {
      console.error("Error deleting level:", err);
      res.status(500).json({ error: "Failed to delete level" });
    }
  });
  app.get("/api/admin/courses/:courseId/modules", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const courseId = String(req.params.courseId);
      const courseSnap = await adminDb.collection("courses").doc(courseId).get();
      if (!courseSnap.exists) {
        return res.status(404).json({ error: "Parent course not found" });
      }
      let q = adminDb.collection("modules").where("courseId", "==", courseId);
      if (req.query.levelId) {
        q = q.where("levelId", "==", String(req.query.levelId));
      }
      const snap = await q.get();
      const modules = [];
      snap.forEach((doc) => {
        modules.push({ id: doc.id, ...doc.data() });
      });
      modules.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
      res.json({ modules });
    } catch (err) {
      console.error("Error fetching modules:", err);
      res.status(500).json({ error: "Failed to fetch modules" });
    }
  });
  app.post("/api/admin/courses/:courseId/modules", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const courseId = String(req.params.courseId);
      const courseSnap = await adminDb.collection("courses").doc(courseId).get();
      if (!courseSnap.exists) {
        return res.status(404).json({ error: "Parent course not found (module.courseId references nonexistent Course)" });
      }
      const { id: rawId, levelId, title, description, status = "draft", order = 0 } = req.body;
      if (!title || typeof title !== "string") {
        return res.status(400).json({ error: "Module title is required" });
      }
      if (req.body.courseId && String(req.body.courseId) !== courseId) {
        return res.status(400).json({ error: "module.courseId in payload does not match courseId in URL" });
      }
      if (!levelId || typeof levelId !== "string" || !levelId.trim()) {
        return res.status(400).json({ error: "Module must reference a valid levelId (levelId is required)" });
      }
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ error: `Invalid content status. Allowed: ${VALID_STATUSES.join(", ")}` });
      }
      const levelSnap = await adminDb.collection("levels").doc(String(levelId)).get();
      if (!levelSnap.exists) {
        return res.status(404).json({ error: "Parent level not found (module.levelId references nonexistent Level)" });
      }
      if (levelSnap.data()?.courseId !== courseId) {
        return res.status(400).json({ error: "module.courseId does not match level.courseId (specified level belongs to a different course)" });
      }
      const deterministicId = rawId ? preserveOrSanitizeId(String(rawId)) : generateModuleId(String(levelId), order);
      if (!deterministicId) {
        return res.status(400).json({ error: "Invalid module ID" });
      }
      const docRef = adminDb.collection("modules").doc(deterministicId);
      const existing = await docRef.get();
      if (existing.exists) {
        return res.status(409).json({ error: "Module with this ID already exists" });
      }
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const newModule = {
        id: deterministicId,
        courseId,
        levelId: String(levelId),
        title: title.trim(),
        description: description || "",
        status,
        order: Number(order) || 0,
        version: 1,
        createdAt: now,
        updatedAt: now,
        createdBy: req.user.uid,
        updatedBy: req.user.uid
      };
      await docRef.set(newModule);
      await logAudit(req.user.uid, "module.created", "module", deterministicId, {
        title: newModule.title,
        courseId,
        levelId: newModule.levelId,
        status
      });
      res.status(201).json({ module: newModule });
    } catch (err) {
      console.error("Error creating module:", err);
      res.status(500).json({ error: "Failed to create module" });
    }
  });
  app.get("/api/admin/modules/:id", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const id = String(req.params.id);
      const docSnap = await adminDb.collection("modules").doc(id).get();
      if (!docSnap.exists) {
        return res.status(404).json({ error: "Module not found" });
      }
      res.json({ module: { id: docSnap.id, ...docSnap.data() } });
    } catch (err) {
      console.error("Error getting module:", err);
      res.status(500).json({ error: "Failed to retrieve module" });
    }
  });
  app.put("/api/admin/modules/:id", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const id = String(req.params.id);
      const { title, description, levelId, order } = req.body;
      const docRef = adminDb.collection("modules").doc(id);
      const existing = await docRef.get();
      if (!existing.exists) {
        return res.status(404).json({ error: "Module not found" });
      }
      const prevData = existing.data() || {};
      if (req.body.courseId && String(req.body.courseId) !== prevData.courseId) {
        return res.status(400).json({ error: "Cannot change courseId of an existing module" });
      }
      if (levelId !== void 0) {
        if (!levelId || typeof levelId !== "string" || !levelId.trim()) {
          return res.status(400).json({ error: "Module must reference a valid non-empty levelId" });
        }
        const levelSnap = await adminDb.collection("levels").doc(String(levelId)).get();
        if (!levelSnap.exists) {
          return res.status(404).json({ error: "Parent level not found (module.levelId references nonexistent Level)" });
        }
        if (levelSnap.data()?.courseId !== prevData.courseId) {
          return res.status(400).json({ error: "Specified level does not belong to this module course (module.courseId != level.courseId)" });
        }
      }
      const nextVersion = (prevData.version || 1) + 1;
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const updates = {
        version: nextVersion,
        updatedAt: now,
        updatedBy: req.user.uid
      };
      if (title !== void 0) updates.title = String(title).trim();
      if (description !== void 0) updates.description = String(description);
      if (levelId !== void 0) updates.levelId = String(levelId);
      if (order !== void 0) updates.order = Number(order);
      await docRef.update(updates);
      await logAudit(req.user.uid, "module.updated", "module", id, { updates, version: nextVersion });
      res.json({ module: { ...prevData, ...updates } });
    } catch (err) {
      console.error("Error updating module:", err);
      res.status(500).json({ error: "Failed to update module" });
    }
  });
  app.post("/api/admin/modules/:id/status", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const id = String(req.params.id);
      const { status } = req.body;
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` });
      }
      const docRef = adminDb.collection("modules").doc(id);
      const existing = await docRef.get();
      if (!existing.exists) {
        return res.status(404).json({ error: "Module not found" });
      }
      const currentStatus = existing.data()?.status || "draft";
      const allowedNext = VALID_STATUS_TRANSITIONS[currentStatus] || [];
      if (!allowedNext.includes(status)) {
        return res.status(400).json({
          error: `Illegal status transition from '${currentStatus}' to '${status}'. Allowed: ${allowedNext.join(", ")}`
        });
      }
      const nextVersion = (existing.data()?.version || 1) + 1;
      const now = (/* @__PURE__ */ new Date()).toISOString();
      await docRef.update({
        status,
        version: nextVersion,
        updatedAt: now,
        updatedBy: req.user.uid
      });
      await logAudit(req.user.uid, "module.status_changed", "module", id, {
        from: currentStatus,
        to: status,
        version: nextVersion
      });
      res.json({ id, status, version: nextVersion });
    } catch (err) {
      console.error("Error updating module status:", err);
      res.status(500).json({ error: "Failed to update module status" });
    }
  });
  app.delete("/api/admin/modules/:id", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const id = String(req.params.id);
      const docRef = adminDb.collection("modules").doc(id);
      const existing = await docRef.get();
      if (!existing.exists) {
        return res.status(404).json({ error: "Module not found" });
      }
      const childLessonsSnap = await adminDb.collection("lessons").where("moduleId", "==", id).limit(1).get();
      if (!childLessonsSnap.empty) {
        return res.status(400).json({
          error: "Cannot delete module because it still contains active lessons. Move or delete child lessons first."
        });
      }
      await docRef.delete();
      await logAudit(req.user.uid, "module.deleted", "module", id, {
        previousTitle: existing.data()?.title,
        courseId: existing.data()?.courseId,
        levelId: existing.data()?.levelId
      });
      res.json({ success: true, id });
    } catch (err) {
      console.error("Error deleting module:", err);
      res.status(500).json({ error: "Failed to delete module" });
    }
  });
  const VALID_LESSON_TYPES = ["learn", "practice", "challenge", "quiz", "project"];
  async function importStaticLessonsForModule(courseId, levelId, moduleId, staticLessons, adminUid, now) {
    let created = 0;
    let skipped = 0;
    for (let lesIdx = 0; lesIdx < staticLessons.length; lesIdx++) {
      const les = staticLessons[lesIdx];
      const lesDocRef = adminDb.collection("lessons").doc(les.id);
      const lesSnap = await lesDocRef.get();
      if (!lesSnap.exists) {
        let publicQuestions = [];
        if (les.type === "quiz" && Array.isArray(les.questions)) {
          const solutions = [];
          publicQuestions = les.questions.map((q, qIdx) => {
            const qId = q.id || `q-${les.id}-${qIdx + 1}`;
            solutions.push({
              questionId: qId,
              correctAnswerIndex: Number(q.correctAnswerIndex) || 0,
              explanation: q.explanation || ""
            });
            return {
              id: qId,
              question: q.question || "",
              options: Array.isArray(q.options) ? q.options : []
            };
          });
          await adminDb.collection("quiz_solutions").doc(les.id).set({
            lessonId: les.id,
            solutions,
            updatedAt: now
          });
        }
        await lesDocRef.set({
          id: les.id,
          courseId,
          levelId,
          moduleId,
          title: les.title,
          slug: sanitizeId(les.title) || les.id,
          description: les.description || "",
          type: les.type,
          language: les.language || (courseId.includes("python") ? "python" : "web"),
          runtime: les.runtime || (courseId.includes("python") ? "python" : "browser"),
          content: les.content || [],
          starterCode: les.starterCode || "",
          starterCss: les.starterCss || "",
          starterJs: les.starterJs || "",
          starterPy: les.starterPy || "",
          hints: Array.isArray(les.hints) ? les.hints : [],
          requirements: Array.isArray(les.requirements) ? les.requirements.map((r) => ({ id: r.id, description: r.description })) : [],
          questions: publicQuestions,
          xpReward: Number(les.xpReward) || 10,
          order: lesIdx,
          status: "published",
          version: 1,
          createdAt: now,
          updatedAt: now,
          createdBy: adminUid,
          updatedBy: adminUid
        });
        created++;
      } else {
        skipped++;
      }
    }
    return { created, skipped };
  }
  app.get("/api/admin/courses/:courseId/levels/:levelId/modules/:moduleId/lessons", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const courseId = String(req.params.courseId);
      const levelId = String(req.params.levelId);
      const moduleId = String(req.params.moduleId);
      const modDoc = await adminDb.collection("modules").doc(moduleId).get();
      if (!modDoc.exists) {
        return res.status(404).json({ error: "Parent module not found" });
      }
      const modData = modDoc.data() || {};
      if (modData.courseId !== courseId || modData.levelId !== levelId) {
        return res.status(400).json({
          error: "Module does not match specified course and level relationship"
        });
      }
      const snap = await adminDb.collection("lessons").where("moduleId", "==", moduleId).get();
      const lessons = [];
      snap.forEach((doc) => {
        lessons.push({ id: doc.id, ...doc.data() });
      });
      lessons.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
      res.json({ lessons });
    } catch (err) {
      console.error("Error fetching admin lessons:", err);
      res.status(500).json({ error: "Failed to fetch lessons" });
    }
  });
  app.post("/api/admin/courses/:courseId/levels/:levelId/modules/:moduleId/lessons", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const courseId = String(req.params.courseId);
      const levelId = String(req.params.levelId);
      const moduleId = String(req.params.moduleId);
      const courseSnap = await adminDb.collection("courses").doc(courseId).get();
      if (!courseSnap.exists) {
        return res.status(404).json({ error: "Parent course not found" });
      }
      const levelSnap = await adminDb.collection("levels").doc(levelId).get();
      if (!levelSnap.exists) {
        return res.status(404).json({ error: "Parent level not found" });
      }
      if (levelSnap.data()?.courseId !== courseId) {
        return res.status(400).json({ error: "Parent level does not belong to specified course" });
      }
      const modSnap = await adminDb.collection("modules").doc(moduleId).get();
      if (!modSnap.exists) {
        return res.status(404).json({ error: "Parent module not found" });
      }
      const modData = modSnap.data() || {};
      if (modData.courseId !== courseId || modData.levelId !== levelId) {
        return res.status(400).json({ error: "Parent module does not match course and level hierarchy" });
      }
      const {
        id: rawId,
        title,
        slug,
        description,
        type = "learn",
        language,
        runtime,
        content = [],
        starterCode = "",
        starterCss = "",
        starterJs = "",
        starterPy = "",
        hints = [],
        requirements = [],
        questions = [],
        xpReward = 10,
        status = "draft",
        order = 0
      } = req.body;
      if (!title || typeof title !== "string" || !title.trim()) {
        return res.status(400).json({ error: "Lesson title is required" });
      }
      if (!VALID_LESSON_TYPES.includes(type)) {
        return res.status(400).json({ error: `Invalid lesson type. Allowed: ${VALID_LESSON_TYPES.join(", ")}` });
      }
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ error: `Invalid content status. Allowed: ${VALID_STATUSES.join(", ")}` });
      }
      const deterministicId = rawId ? preserveOrSanitizeId(String(rawId)) : generateLessonId(moduleId, order);
      if (!deterministicId || !isValidDocumentId(deterministicId)) {
        return res.status(400).json({ error: "Invalid lesson ID. Must match [a-zA-Z0-9_-]+" });
      }
      const docRef = adminDb.collection("lessons").doc(deterministicId);
      const existing = await docRef.get();
      if (existing.exists) {
        return res.status(409).json({ error: `Lesson with ID "${deterministicId}" already exists` });
      }
      const now = (/* @__PURE__ */ new Date()).toISOString();
      let publicQuestions = [];
      if (type === "quiz" && Array.isArray(questions)) {
        const solutions = [];
        publicQuestions = questions.map((q, qIdx) => {
          const qId = q.id || `q-${deterministicId}-${qIdx + 1}`;
          solutions.push({
            questionId: qId,
            correctAnswerIndex: Number(q.correctAnswerIndex) || 0,
            explanation: q.explanation || ""
          });
          return {
            id: qId,
            question: q.question || "",
            options: Array.isArray(q.options) ? q.options : []
          };
        });
        await adminDb.collection("quiz_solutions").doc(deterministicId).set({
          lessonId: deterministicId,
          solutions,
          updatedAt: now
        });
      }
      const newLesson = {
        id: deterministicId,
        courseId,
        levelId,
        moduleId,
        title: title.trim(),
        slug: slug ? sanitizeId(String(slug)) : sanitizeId(title),
        description: description || "",
        type,
        language: language || (courseId.includes("python") ? "python" : "web"),
        runtime: runtime || (courseId.includes("python") ? "python" : "browser"),
        content: Array.isArray(content) ? content : [],
        starterCode: starterCode || "",
        starterCss: starterCss || "",
        starterJs: starterJs || "",
        starterPy: starterPy || "",
        hints: Array.isArray(hints) ? hints.map((h) => typeof h === "string" ? h : h?.text || "") : [],
        requirements: Array.isArray(requirements) ? requirements.map((r) => ({ id: r.id, description: r.description })) : [],
        questions: publicQuestions,
        xpReward: Number(xpReward) || 10,
        status,
        order: Number(order) || 0,
        version: 1,
        createdAt: now,
        updatedAt: now,
        createdBy: req.user.uid,
        updatedBy: req.user.uid
      };
      await docRef.set(newLesson);
      await logAudit(req.user.uid, "lesson.created", "lesson", deterministicId, {
        title,
        type,
        status,
        moduleId,
        courseId
      });
      res.status(201).json({ lesson: newLesson });
    } catch (err) {
      console.error("Error creating lesson:", err);
      res.status(500).json({ error: "Failed to create lesson" });
    }
  });
  app.get("/api/admin/lessons/:lessonId", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const lessonId = String(req.params.lessonId);
      const docRef = adminDb.collection("lessons").doc(lessonId);
      const snap = await docRef.get();
      if (!snap.exists) {
        return res.status(404).json({ error: "Lesson not found" });
      }
      const lessonData = { id: snap.id, ...snap.data() };
      if (lessonData.type === "quiz") {
        const solDoc = await adminDb.collection("quiz_solutions").doc(lessonId).get();
        if (solDoc.exists) {
          const solData = solDoc.data();
          lessonData.quizSolutions = solData?.solutions || [];
          if (Array.isArray(lessonData.questions)) {
            const solMap = new Map((solData?.solutions || []).map((s) => [s.questionId, s]));
            lessonData.questions = lessonData.questions.map((q) => {
              const sol = solMap.get(q.id);
              return {
                ...q,
                correctAnswerIndex: sol?.correctAnswerIndex ?? 0,
                explanation: sol?.explanation ?? ""
              };
            });
          }
        }
      }
      res.json({ lesson: lessonData });
    } catch (err) {
      console.error("Error fetching admin lesson:", err);
      res.status(500).json({ error: "Failed to fetch lesson" });
    }
  });
  app.put("/api/admin/lessons/:lessonId", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const lessonId = String(req.params.lessonId);
      const docRef = adminDb.collection("lessons").doc(lessonId);
      const existing = await docRef.get();
      if (!existing.exists) {
        return res.status(404).json({ error: "Lesson not found" });
      }
      const prevData = existing.data() || {};
      if (req.body.id && String(req.body.id) !== lessonId) {
        return res.status(400).json({ error: "Lesson ID is immutable and cannot be changed" });
      }
      if (req.body.courseId && String(req.body.courseId) !== prevData.courseId) {
        return res.status(400).json({ error: "Cannot move lesson across courses in this phase" });
      }
      if (req.body.levelId && String(req.body.levelId) !== prevData.levelId) {
        return res.status(400).json({ error: "Cannot move lesson across levels in this phase" });
      }
      if (req.body.moduleId && String(req.body.moduleId) !== prevData.moduleId) {
        return res.status(400).json({ error: "Cannot move lesson across modules in this phase" });
      }
      const {
        title,
        slug,
        description,
        type,
        language,
        runtime,
        content,
        starterCode,
        starterCss,
        starterJs,
        starterPy,
        hints,
        requirements,
        questions,
        xpReward,
        order,
        status
      } = req.body;
      if (type !== void 0 && !VALID_LESSON_TYPES.includes(type)) {
        return res.status(400).json({ error: `Invalid lesson type. Allowed: ${VALID_LESSON_TYPES.join(", ")}` });
      }
      let statusToSet = prevData.status;
      if (status !== void 0 && status !== prevData.status) {
        if (!VALID_STATUSES.includes(status)) {
          return res.status(400).json({ error: `Invalid content status. Allowed: ${VALID_STATUSES.join(", ")}` });
        }
        const allowedNext = VALID_STATUS_TRANSITIONS[prevData.status] || [];
        if (!allowedNext.includes(status)) {
          return res.status(400).json({
            error: `Illegal status transition from '${prevData.status}' to '${status}'. Allowed: ${allowedNext.join(", ")}`
          });
        }
        statusToSet = status;
      }
      const nextVersion = (prevData.version || 1) + 1;
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const updates = {
        version: nextVersion,
        updatedAt: now,
        updatedBy: req.user.uid
      };
      if (title !== void 0) updates.title = String(title).trim();
      if (slug !== void 0) updates.slug = sanitizeId(String(slug));
      if (description !== void 0) updates.description = String(description);
      if (type !== void 0) updates.type = type;
      if (language !== void 0) updates.language = String(language);
      if (runtime !== void 0) updates.runtime = String(runtime);
      if (content !== void 0) updates.content = Array.isArray(content) ? content : [];
      if (starterCode !== void 0) updates.starterCode = String(starterCode);
      if (starterCss !== void 0) updates.starterCss = String(starterCss);
      if (starterJs !== void 0) updates.starterJs = String(starterJs);
      if (starterPy !== void 0) updates.starterPy = String(starterPy);
      if (hints !== void 0) {
        updates.hints = Array.isArray(hints) ? hints.map((h) => typeof h === "string" ? h : h?.text || "") : [];
      }
      if (requirements !== void 0) {
        updates.requirements = Array.isArray(requirements) ? requirements.map((r) => ({ id: r.id, description: r.description })) : [];
      }
      if (xpReward !== void 0) updates.xpReward = Number(xpReward);
      if (order !== void 0) updates.order = Number(order);
      if (status !== void 0) updates.status = statusToSet;
      const effectiveType = type !== void 0 ? type : prevData.type;
      if (effectiveType === "quiz" && questions !== void 0 && Array.isArray(questions)) {
        const solutions = [];
        const publicQuestions = questions.map((q, qIdx) => {
          const qId = q.id || `q-${lessonId}-${qIdx + 1}`;
          solutions.push({
            questionId: qId,
            correctAnswerIndex: Number(q.correctAnswerIndex) || 0,
            explanation: q.explanation || ""
          });
          return {
            id: qId,
            question: q.question || "",
            options: Array.isArray(q.options) ? q.options : []
          };
        });
        updates.questions = publicQuestions;
        await adminDb.collection("quiz_solutions").doc(lessonId).set({
          lessonId,
          solutions,
          updatedAt: now
        });
      }
      await docRef.update(updates);
      await logAudit(req.user.uid, "lesson.updated", "lesson", lessonId, {
        version: nextVersion,
        status: statusToSet,
        fieldsUpdated: Object.keys(updates)
      });
      if (status !== void 0 && status !== prevData.status) {
        await logAudit(req.user.uid, "lesson.status_changed", "lesson", lessonId, {
          from: prevData.status,
          to: statusToSet,
          version: nextVersion
        });
      }
      const updatedSnap = await docRef.get();
      res.json({ lesson: { id: updatedSnap.id, ...updatedSnap.data() } });
    } catch (err) {
      console.error("Error updating lesson:", err);
      res.status(500).json({ error: "Failed to update lesson" });
    }
  });
  app.post("/api/admin/lessons/:lessonId/status", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const lessonId = String(req.params.lessonId);
      const { status } = req.body;
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` });
      }
      const docRef = adminDb.collection("lessons").doc(lessonId);
      const existing = await docRef.get();
      if (!existing.exists) {
        return res.status(404).json({ error: "Lesson not found" });
      }
      const currentStatus = existing.data()?.status || "draft";
      const allowedNext = VALID_STATUS_TRANSITIONS[currentStatus] || [];
      if (!allowedNext.includes(status)) {
        return res.status(400).json({
          error: `Illegal status transition from '${currentStatus}' to '${status}'. Allowed: ${allowedNext.join(", ")}`
        });
      }
      const nextVersion = (existing.data()?.version || 1) + 1;
      const now = (/* @__PURE__ */ new Date()).toISOString();
      await docRef.update({
        status,
        version: nextVersion,
        updatedAt: now,
        updatedBy: req.user.uid
      });
      await logAudit(req.user.uid, "lesson.status_changed", "lesson", lessonId, {
        from: currentStatus,
        to: status,
        version: nextVersion
      });
      res.json({ id: lessonId, status, version: nextVersion });
    } catch (err) {
      console.error("Error updating lesson status:", err);
      res.status(500).json({ error: "Failed to update lesson status" });
    }
  });
  app.delete("/api/admin/lessons/:lessonId", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const lessonId = String(req.params.lessonId);
      const docRef = adminDb.collection("lessons").doc(lessonId);
      const existing = await docRef.get();
      if (!existing.exists) {
        return res.status(404).json({ error: "Lesson not found" });
      }
      const prevData = existing.data() || {};
      await docRef.delete();
      try {
        await adminDb.collection("quiz_solutions").doc(lessonId).delete();
      } catch (e) {
      }
      await logAudit(req.user.uid, "lesson.deleted", "lesson", lessonId, {
        previousTitle: prevData.title,
        moduleId: prevData.moduleId,
        courseId: prevData.courseId,
        levelId: prevData.levelId
      });
      res.json({ success: true, id: lessonId });
    } catch (err) {
      console.error("Error deleting lesson:", err);
      res.status(500).json({ error: "Failed to delete lesson" });
    }
  });
  app.get("/api/admin/lessons/:lessonId/exercises", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const lessonId = String(req.params.lessonId);
      const lessonDoc = await adminDb.collection("lessons").doc(lessonId).get();
      if (!lessonDoc.exists) {
        return res.status(404).json({ error: "Parent lesson not found" });
      }
      const snap = await adminDb.collection("exercises").where("lessonId", "==", lessonId).get();
      const exercises = [];
      snap.forEach((doc) => {
        exercises.push({ id: doc.id, ...doc.data() });
      });
      exercises.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
      res.json({ exercises });
    } catch (err) {
      console.error("Error fetching admin exercises:", err);
      res.status(500).json({ error: "Failed to fetch exercises" });
    }
  });
  app.post("/api/admin/lessons/:lessonId/exercises", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const lessonId = String(req.params.lessonId);
      const lessonSnap = await adminDb.collection("lessons").doc(lessonId).get();
      if (!lessonSnap.exists) {
        return res.status(404).json({ error: "Parent lesson not found" });
      }
      const lessonData = lessonSnap.data() || {};
      const { courseId, levelId, moduleId } = lessonData;
      if (req.body.courseId && req.body.courseId !== courseId) {
        return res.status(400).json({ error: "Payload courseId does not match parent lesson hierarchy" });
      }
      if (req.body.levelId && req.body.levelId !== levelId) {
        return res.status(400).json({ error: "Payload levelId does not match parent lesson hierarchy" });
      }
      if (req.body.moduleId && req.body.moduleId !== moduleId) {
        return res.status(400).json({ error: "Payload moduleId does not match parent lesson hierarchy" });
      }
      const {
        id: rawId,
        title,
        slug,
        description,
        instructions,
        type = "code",
        language = lessonData.language || "web",
        runtime = lessonData.runtime || "browser",
        starterCode = "",
        starterCss = "",
        starterJs = "",
        starterPy = "",
        requirements = [],
        visibleTests = [],
        hints = [],
        xpReward = 10,
        status = "draft",
        order = 0,
        // Private solution fields
        solutionCode = "",
        expectedOutput = "",
        hiddenTests = [],
        gradingRules = ""
      } = req.body;
      if (!title || typeof title !== "string" || !title.trim()) {
        return res.status(400).json({ error: "Exercise title is required" });
      }
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ error: `Invalid content status. Allowed: ${VALID_STATUSES.join(", ")}` });
      }
      const deterministicId = rawId ? preserveOrSanitizeId(String(rawId)) : generateExerciseId(lessonId, order);
      if (!deterministicId || !isValidDocumentId(deterministicId)) {
        return res.status(400).json({ error: "Invalid exercise ID. Must match [a-zA-Z0-9_-]+" });
      }
      const docRef = adminDb.collection("exercises").doc(deterministicId);
      const existing = await docRef.get();
      if (existing.exists) {
        return res.status(409).json({ error: `Exercise with ID "${deterministicId}" already exists` });
      }
      const now = (/* @__PURE__ */ new Date()).toISOString();
      if (solutionCode || expectedOutput || hiddenTests.length > 0 || gradingRules) {
        await adminDb.collection("exercise_solutions").doc(deterministicId).set({
          exerciseId: deterministicId,
          solutionCode: solutionCode || "",
          expectedOutput: expectedOutput || "",
          hiddenTests: Array.isArray(hiddenTests) ? hiddenTests : [],
          gradingRules: gradingRules || "",
          updatedAt: now,
          updatedBy: req.user.uid
        });
      }
      const newExercise = {
        id: deterministicId,
        lessonId,
        courseId,
        levelId,
        moduleId,
        title: title.trim(),
        slug: slug ? sanitizeId(String(slug)) : sanitizeId(title),
        description: description || "",
        instructions: instructions || "",
        type,
        language,
        runtime,
        starterCode: starterCode || "",
        starterCss: starterCss || "",
        starterJs: starterJs || "",
        starterPy: starterPy || "",
        requirements: Array.isArray(requirements) ? requirements.map((r) => ({ id: r.id || `req-${Date.now()}`, description: r.description || "" })) : [],
        visibleTests: Array.isArray(visibleTests) ? visibleTests : [],
        hints: Array.isArray(hints) ? hints.map((h) => typeof h === "string" ? h : h?.text || "") : [],
        xpReward: Number(xpReward) || 10,
        status,
        order: Number(order) || 0,
        version: 1,
        createdAt: now,
        updatedAt: now,
        createdBy: req.user.uid,
        updatedBy: req.user.uid
      };
      await docRef.set(newExercise);
      await logAudit(req.user.uid, "exercise.created", "exercise", deterministicId, {
        title,
        type,
        status,
        lessonId,
        moduleId,
        courseId
      });
      res.status(201).json({ exercise: newExercise });
    } catch (err) {
      console.error("Error creating exercise:", err);
      res.status(500).json({ error: "Failed to create exercise" });
    }
  });
  app.get("/api/admin/exercises/:exerciseId", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const exerciseId = String(req.params.exerciseId);
      const docRef = adminDb.collection("exercises").doc(exerciseId);
      const snap = await docRef.get();
      if (!snap.exists) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      const exerciseData = { id: snap.id, ...snap.data() };
      const solDoc = await adminDb.collection("exercise_solutions").doc(exerciseId).get();
      if (solDoc.exists) {
        const solData = solDoc.data() || {};
        exerciseData.solutionCode = solData.solutionCode || "";
        exerciseData.expectedOutput = solData.expectedOutput || "";
        exerciseData.hiddenTests = solData.hiddenTests || [];
        exerciseData.gradingRules = solData.gradingRules || "";
      }
      res.json({ exercise: exerciseData });
    } catch (err) {
      console.error("Error fetching admin exercise:", err);
      res.status(500).json({ error: "Failed to fetch exercise" });
    }
  });
  app.put("/api/admin/exercises/:exerciseId", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const exerciseId = String(req.params.exerciseId);
      const docRef = adminDb.collection("exercises").doc(exerciseId);
      const existing = await docRef.get();
      if (!existing.exists) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      const prevData = existing.data() || {};
      if (req.body.id && String(req.body.id) !== exerciseId) {
        return res.status(400).json({ error: "Exercise ID is immutable and cannot be changed" });
      }
      if (req.body.lessonId && String(req.body.lessonId) !== prevData.lessonId) {
        return res.status(400).json({ error: "Cannot move exercise across lessons" });
      }
      if (req.body.courseId && String(req.body.courseId) !== prevData.courseId) {
        return res.status(400).json({ error: "Cannot move exercise across courses" });
      }
      if (req.body.levelId && String(req.body.levelId) !== prevData.levelId) {
        return res.status(400).json({ error: "Cannot move exercise across levels" });
      }
      if (req.body.moduleId && String(req.body.moduleId) !== prevData.moduleId) {
        return res.status(400).json({ error: "Cannot move exercise across modules" });
      }
      const {
        title,
        slug,
        description,
        instructions,
        type,
        language,
        runtime,
        starterCode,
        starterCss,
        starterJs,
        starterPy,
        requirements,
        visibleTests,
        hints,
        xpReward,
        order,
        status,
        // Solution updates
        solutionCode,
        expectedOutput,
        hiddenTests,
        gradingRules
      } = req.body;
      let statusToSet = prevData.status;
      if (status !== void 0 && status !== prevData.status) {
        if (!VALID_STATUSES.includes(status)) {
          return res.status(400).json({ error: `Invalid content status. Allowed: ${VALID_STATUSES.join(", ")}` });
        }
        const allowedNext = VALID_STATUS_TRANSITIONS[prevData.status] || [];
        if (!allowedNext.includes(status)) {
          return res.status(400).json({
            error: `Illegal status transition from '${prevData.status}' to '${status}'. Allowed: ${allowedNext.join(", ")}`
          });
        }
        statusToSet = status;
      }
      const nextVersion = (prevData.version || 1) + 1;
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const updates = {
        version: nextVersion,
        updatedAt: now,
        updatedBy: req.user.uid
      };
      if (title !== void 0) updates.title = String(title).trim();
      if (slug !== void 0) updates.slug = sanitizeId(String(slug));
      if (description !== void 0) updates.description = String(description);
      if (instructions !== void 0) updates.instructions = String(instructions);
      if (type !== void 0) updates.type = String(type);
      if (language !== void 0) updates.language = String(language);
      if (runtime !== void 0) updates.runtime = String(runtime);
      if (starterCode !== void 0) updates.starterCode = String(starterCode);
      if (starterCss !== void 0) updates.starterCss = String(starterCss);
      if (starterJs !== void 0) updates.starterJs = String(starterJs);
      if (starterPy !== void 0) updates.starterPy = String(starterPy);
      if (requirements !== void 0) {
        updates.requirements = Array.isArray(requirements) ? requirements.map((r) => ({ id: r.id || `req-${Date.now()}`, description: r.description || "" })) : [];
      }
      if (visibleTests !== void 0) updates.visibleTests = Array.isArray(visibleTests) ? visibleTests : [];
      if (hints !== void 0) {
        updates.hints = Array.isArray(hints) ? hints.map((h) => typeof h === "string" ? h : h?.text || "") : [];
      }
      if (xpReward !== void 0) updates.xpReward = Number(xpReward);
      if (order !== void 0) updates.order = Number(order);
      if (status !== void 0) updates.status = statusToSet;
      if (solutionCode !== void 0 || expectedOutput !== void 0 || hiddenTests !== void 0 || gradingRules !== void 0) {
        const solRef = adminDb.collection("exercise_solutions").doc(exerciseId);
        const solUpdates = {
          exerciseId,
          updatedAt: now,
          updatedBy: req.user.uid
        };
        if (solutionCode !== void 0) solUpdates.solutionCode = String(solutionCode);
        if (expectedOutput !== void 0) solUpdates.expectedOutput = String(expectedOutput);
        if (hiddenTests !== void 0) solUpdates.hiddenTests = Array.isArray(hiddenTests) ? hiddenTests : [];
        if (gradingRules !== void 0) solUpdates.gradingRules = String(gradingRules);
        await solRef.set(solUpdates, { merge: true });
      }
      await docRef.update(updates);
      await logAudit(req.user.uid, "exercise.updated", "exercise", exerciseId, {
        version: nextVersion,
        status: statusToSet,
        lessonId: prevData.lessonId
      });
      res.json({ id: exerciseId, ...prevData, ...updates });
    } catch (err) {
      console.error("Error updating exercise:", err);
      res.status(500).json({ error: "Failed to update exercise" });
    }
  });
  app.post("/api/admin/exercises/:exerciseId/status", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const exerciseId = String(req.params.exerciseId);
      const { status } = req.body;
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ error: `Invalid content status. Allowed: ${VALID_STATUSES.join(", ")}` });
      }
      const docRef = adminDb.collection("exercises").doc(exerciseId);
      const existing = await docRef.get();
      if (!existing.exists) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      const currentStatus = existing.data()?.status || "draft";
      const allowedNext = VALID_STATUS_TRANSITIONS[currentStatus] || [];
      if (!allowedNext.includes(status)) {
        return res.status(400).json({
          error: `Illegal status transition from '${currentStatus}' to '${status}'. Allowed: ${allowedNext.join(", ")}`
        });
      }
      const nextVersion = (existing.data()?.version || 1) + 1;
      const now = (/* @__PURE__ */ new Date()).toISOString();
      await docRef.update({
        status,
        version: nextVersion,
        updatedAt: now,
        updatedBy: req.user.uid
      });
      await logAudit(req.user.uid, "exercise.status_changed", "exercise", exerciseId, {
        from: currentStatus,
        to: status,
        version: nextVersion
      });
      res.json({ id: exerciseId, status, version: nextVersion });
    } catch (err) {
      console.error("Error updating exercise status:", err);
      res.status(500).json({ error: "Failed to update exercise status" });
    }
  });
  app.delete("/api/admin/exercises/:exerciseId", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const exerciseId = String(req.params.exerciseId);
      const docRef = adminDb.collection("exercises").doc(exerciseId);
      const existing = await docRef.get();
      if (!existing.exists) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      const prevData = existing.data() || {};
      await docRef.delete();
      try {
        await adminDb.collection("exercise_solutions").doc(exerciseId).delete();
      } catch (e) {
      }
      await logAudit(req.user.uid, "exercise.deleted", "exercise", exerciseId, {
        previousTitle: prevData.title,
        lessonId: prevData.lessonId,
        moduleId: prevData.moduleId,
        courseId: prevData.courseId
      });
      res.json({ success: true, id: exerciseId });
    } catch (err) {
      console.error("Error deleting exercise:", err);
      res.status(500).json({ error: "Failed to delete exercise" });
    }
  });
  app.get("/api/admin/exercises/:exerciseId/solution", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const exerciseId = String(req.params.exerciseId);
      const solDoc = await adminDb.collection("exercise_solutions").doc(exerciseId).get();
      if (!solDoc.exists) {
        return res.json({ exerciseId, solutionCode: "", expectedOutput: "", hiddenTests: [], gradingRules: "" });
      }
      res.json(solDoc.data());
    } catch (err) {
      console.error("Error fetching exercise solution:", err);
      res.status(500).json({ error: "Failed to fetch exercise solution" });
    }
  });
  app.put("/api/admin/exercises/:exerciseId/solution", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const exerciseId = String(req.params.exerciseId);
      const { solutionCode = "", expectedOutput = "", hiddenTests = [], gradingRules = "" } = req.body;
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const solData = {
        exerciseId,
        solutionCode,
        expectedOutput,
        hiddenTests: Array.isArray(hiddenTests) ? hiddenTests : [],
        gradingRules,
        updatedAt: now,
        updatedBy: req.user.uid
      };
      await adminDb.collection("exercise_solutions").doc(exerciseId).set(solData, { merge: true });
      res.json(solData);
    } catch (err) {
      console.error("Error updating exercise solution:", err);
      res.status(500).json({ error: "Failed to update exercise solution" });
    }
  });
  app.get("/api/admin/lessons/:lessonId/quiz/solution", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const lessonId = String(req.params.lessonId);
      const docRef = adminDb.collection("quiz_solutions").doc(lessonId);
      const solDoc = await docRef.get();
      if (solDoc.exists) {
        return res.json(solDoc.data());
      }
      let staticQuestions = [];
      for (const course of COURSES) {
        for (const level of course.levels) {
          for (const mod of level.modules) {
            const lesson = mod.lessons.find((l) => l.id === lessonId);
            if (lesson && lesson.questions) {
              staticQuestions = lesson.questions;
              break;
            }
          }
        }
      }
      const solutions = staticQuestions.map((q) => ({
        questionId: q.id,
        correctAnswerIndex: q.correctAnswerIndex ?? 0,
        explanation: q.explanation || ""
      }));
      res.json({ lessonId, solutions });
    } catch (err) {
      console.error("Error fetching quiz solution:", err);
      res.status(500).json({ error: "Failed to fetch quiz solution" });
    }
  });
  app.put("/api/admin/lessons/:lessonId/quiz/solution", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const lessonId = String(req.params.lessonId);
      const { solutions = [] } = req.body;
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const solData = {
        lessonId,
        solutions: Array.isArray(solutions) ? solutions.map((s) => ({
          questionId: String(s.questionId),
          correctAnswerIndex: Number(s.correctAnswerIndex) || 0,
          explanation: String(s.explanation || "")
        })) : [],
        updatedAt: now,
        updatedBy: req.user.uid
      };
      await adminDb.collection("quiz_solutions").doc(lessonId).set(solData, { merge: true });
      await logAudit(req.user.uid, "quiz.solution_updated", "lesson", lessonId, {
        solutionsCount: solData.solutions.length
      });
      res.json(solData);
    } catch (err) {
      console.error("Error updating quiz solution:", err);
      res.status(500).json({ error: "Failed to update quiz solution" });
    }
  });
  app.post("/api/admin/lessons/:lessonId/import-static-quiz", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const lessonId = String(req.params.lessonId);
      let staticLessonMatch = null;
      for (const course of COURSES) {
        for (const level of course.levels) {
          for (const mod of level.modules) {
            const l = mod.lessons.find((x) => x.id === lessonId);
            if (l) {
              staticLessonMatch = l;
              break;
            }
          }
          if (staticLessonMatch) break;
        }
        if (staticLessonMatch) break;
      }
      if (!staticLessonMatch || !staticLessonMatch.questions) {
        return res.status(404).json({ error: `No static quiz questions found for lesson "${lessonId}"` });
      }
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const questions = staticLessonMatch.questions || [];
      const solutions = questions.map((q) => ({
        questionId: q.id,
        correctAnswerIndex: Number(q.correctAnswerIndex) || 0,
        explanation: q.explanation || ""
      }));
      await adminDb.collection("quiz_solutions").doc(lessonId).set({
        lessonId,
        solutions,
        updatedAt: now,
        updatedBy: req.user.uid
      }, { merge: true });
      const sanitizedQuestions = questions.map((q) => ({
        id: q.id,
        question: q.question,
        options: q.options || [],
        explanation: q.explanation || ""
      }));
      const lessonDocRef = adminDb.collection("lessons").doc(lessonId);
      const lessonSnap = await lessonDocRef.get();
      if (lessonSnap.exists) {
        await lessonDocRef.update({
          questions: sanitizedQuestions,
          updatedAt: now,
          updatedBy: req.user.uid
        });
      }
      await logAudit(req.user.uid, "quiz.imported", "lesson", lessonId, {
        questionsImported: questions.length
      });
      res.json({ success: true, lessonId, questionsImported: questions.length });
    } catch (err) {
      console.error("Error importing static quiz:", err);
      res.status(500).json({ error: "Failed to import static quiz" });
    }
  });
  app.post("/api/quizzes/:lessonId/submit", authenticateFirebaseUser, async (req, res) => {
    try {
      const lessonId = String(req.params.lessonId);
      const { answers } = req.body;
      if (answers === null || answers === void 0 || typeof answers !== "object" || Array.isArray(answers)) {
        return res.status(400).json({ error: "Invalid answers format. Must be an object mapping questionId to optionIndex." });
      }
      let lessonData = null;
      const lessonSnap = await adminDb.collection("lessons").doc(lessonId).get();
      if (lessonSnap.exists) {
        lessonData = lessonSnap.data();
      } else {
        for (const course of COURSES) {
          for (const level of course.levels) {
            for (const mod of level.modules) {
              const l = mod.lessons.find((x) => x.id === lessonId);
              if (l) {
                lessonData = l;
                break;
              }
            }
          }
        }
      }
      if (!lessonData) {
        return res.status(404).json({ error: "Lesson not found" });
      }
      if (lessonData.type !== "quiz") {
        return res.status(400).json({ error: "Specified lesson is not a quiz" });
      }
      const isUserAdmin = Boolean(req.user?.admin);
      if (lessonData.status && lessonData.status !== "published" && !isUserAdmin) {
        return res.status(403).json({ error: "Quiz is not published" });
      }
      const questions = Array.isArray(lessonData.questions) ? lessonData.questions : [];
      if (questions.length === 0) {
        return res.status(400).json({ error: "Lesson contains no quiz questions" });
      }
      const validQuestionIdSet = /* @__PURE__ */ new Set();
      questions.forEach((q, idx) => {
        validQuestionIdSet.add(q.id || `q-${idx + 1}`);
      });
      const submittedMap = {};
      for (const [qKey, val] of Object.entries(answers)) {
        if (!validQuestionIdSet.has(qKey)) {
          return res.status(400).json({ error: `Unknown or invalid question ID: "${qKey}"` });
        }
        const numVal = Number(val);
        if (typeof val !== "number" || !Number.isInteger(numVal) || Number.isNaN(numVal) || !Number.isFinite(numVal)) {
          return res.status(400).json({ error: `Invalid answer index for question "${qKey}". Must be a valid integer.` });
        }
        submittedMap[qKey] = numVal;
      }
      let solutionKeyMap = {};
      const solSnap = await adminDb.collection("quiz_solutions").doc(lessonId).get();
      if (solSnap.exists) {
        const solData = solSnap.data();
        if (solData && Array.isArray(solData.solutions)) {
          solData.solutions.forEach((item) => {
            const cIdx = Number(item.correctAnswerIndex);
            solutionKeyMap[item.questionId] = {
              correctAnswerIndex: Number.isInteger(cIdx) && cIdx >= 0 ? cIdx : 0,
              explanation: typeof item.explanation === "string" ? item.explanation : ""
            };
          });
        }
      } else if (lessonData.questions && Array.isArray(lessonData.questions)) {
        lessonData.questions.forEach((q) => {
          const cIdx = Number(q.correctAnswerIndex);
          solutionKeyMap[q.id] = {
            correctAnswerIndex: Number.isInteger(cIdx) && cIdx >= 0 ? cIdx : 0,
            explanation: typeof q.explanation === "string" ? q.explanation : ""
          };
        });
      }
      let correctCount = 0;
      const evaluations = questions.map((q, idx) => {
        const qId = q.id || `q-${idx + 1}`;
        const solution = solutionKeyMap[qId] || { correctAnswerIndex: 0, explanation: q.explanation || "" };
        const rawSelected = submittedMap[qId];
        const optionsCount = Array.isArray(q.options) ? q.options.length : 0;
        const isValidOptionIndex = rawSelected !== void 0 && rawSelected >= 0 && rawSelected < optionsCount;
        const selectedOptionIndex = isValidOptionIndex ? rawSelected : -1;
        const isCorrect = selectedOptionIndex >= 0 && selectedOptionIndex === solution.correctAnswerIndex;
        if (isCorrect) correctCount++;
        return {
          questionId: qId,
          question: q.question,
          options: q.options,
          selectedOptionIndex,
          correctAnswerIndex: solution.correctAnswerIndex,
          isCorrect,
          explanation: solution.explanation || q.explanation || ""
        };
      });
      const totalQuestions = questions.length;
      const scorePercentage = totalQuestions > 0 ? Math.round(correctCount / totalQuestions * 100) : 0;
      const passed = scorePercentage >= 70;
      const xpReward = Number(lessonData.xpReward) || 50;
      const xpEarned = passed ? xpReward : 0;
      let actualXpAwarded = 0;
      let alreadyCompleted = false;
      if (passed && req.user?.uid) {
        const userRef = adminDb.collection("users").doc(req.user.uid);
        await adminDb.runTransaction(async (transaction) => {
          const userSnap = await transaction.get(userRef);
          if (userSnap.exists) {
            const userData = userSnap.data() || {};
            const currentCompleted = Array.isArray(userData.completedLessons) ? userData.completedLessons : [];
            const currentXp = Number(userData.xp) || 0;
            if (currentCompleted.includes(lessonId)) {
              alreadyCompleted = true;
              actualXpAwarded = 0;
            } else {
              alreadyCompleted = false;
              actualXpAwarded = xpEarned;
              transaction.update(userRef, {
                completedLessons: Array.from(/* @__PURE__ */ new Set([...currentCompleted, lessonId])),
                xp: currentXp + actualXpAwarded,
                updatedAt: (/* @__PURE__ */ new Date()).toISOString()
              });
            }
          }
        });
      }
      res.json({
        lessonId,
        passed,
        scorePercentage,
        correctCount,
        totalQuestions,
        xpEarned: actualXpAwarded,
        alreadyCompleted,
        evaluations
      });
    } catch (err) {
      console.error("Error submitting quiz:", err);
      res.status(500).json({ error: "Failed to evaluate quiz" });
    }
  });
  app.get("/api/lessons/:lessonId/exercises", authenticateFirebaseUser, async (req, res) => {
    try {
      const lessonId = String(req.params.lessonId);
      const snap = await adminDb.collection("exercises").where("lessonId", "==", lessonId).where("status", "==", "published").get();
      const exercises = [];
      snap.forEach((doc) => {
        const data = doc.data();
        exercises.push({
          id: doc.id,
          lessonId: data.lessonId,
          courseId: data.courseId,
          levelId: data.levelId,
          moduleId: data.moduleId,
          title: data.title,
          slug: data.slug,
          description: data.description || "",
          instructions: data.instructions || "",
          type: data.type || "code",
          language: data.language || "web",
          runtime: data.runtime || "",
          starterCode: data.starterCode || "",
          starterCss: data.starterCss || "",
          starterJs: data.starterJs || "",
          starterPy: data.starterPy || "",
          requirements: data.requirements || [],
          visibleTests: data.visibleTests || [],
          hints: data.hints || [],
          xpReward: Number(data.xpReward) || 10,
          order: Number(data.order) || 1,
          status: data.status || "published"
        });
      });
      exercises.sort((a, b) => (a.order || 0) - (b.order || 0));
      res.json({ exercises });
    } catch (err) {
      console.error("Error fetching student exercises:", err);
      res.status(500).json({ error: "Failed to fetch exercises" });
    }
  });
  app.post("/api/exercises/:exerciseId/evaluate", authenticateFirebaseUser, async (req, res) => {
    try {
      const exerciseId = String(req.params.exerciseId);
      const userId = req.user.uid;
      const exDoc = await adminDb.collection("exercises").doc(exerciseId).get();
      if (!exDoc.exists) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      const exerciseData = exDoc.data() || {};
      if (exerciseData.status !== "published" && !req.user?.isAdmin) {
        return res.status(403).json({ error: "Exercise is not published" });
      }
      const solDoc = await adminDb.collection("exercise_solutions").doc(exerciseId).get();
      const solData = solDoc.exists ? solDoc.data() || {} : {};
      const { sourceCode, html, css, js, py, output } = req.body || {};
      const codeToEvaluate = String(sourceCode || py || js || html || "").slice(0, 1e5).trim();
      const outputToEvaluate = String(output || "").slice(0, 1e5).trim();
      const visibleTests = exerciseData.visibleTests || [];
      const hiddenTests = solData.hiddenTests || [];
      const expectedOutput = solData.expectedOutput || "";
      const solutionCode = solData.solutionCode || "";
      const visibleEvaluations = {};
      let visiblePassedCount = 0;
      visibleTests.forEach((vt, idx) => {
        const testId = vt.id || `vtest-${idx}`;
        const testCode = String(vt.testCode || "").trim();
        let passed = false;
        if (testCode) {
          if (testCode.startsWith("/") && testCode.endsWith("/")) {
            try {
              const regex = new RegExp(testCode.slice(1, -1));
              passed = regex.test(outputToEvaluate) || regex.test(codeToEvaluate);
            } catch {
              passed = outputToEvaluate.includes(testCode);
            }
          } else if (testCode.includes("expected:")) {
            const exp = testCode.split(/expected:/i)[1]?.trim() || "";
            passed = outputToEvaluate.includes(exp);
          } else {
            passed = outputToEvaluate.includes(testCode) || codeToEvaluate.includes(testCode);
          }
        } else {
          passed = codeToEvaluate.length > 0;
        }
        visibleEvaluations[testId] = passed;
        if (passed) visiblePassedCount++;
      });
      let hiddenPassedCount = 0;
      hiddenTests.forEach((ht) => {
        const testCode = String(ht.testCode || "").trim();
        let passed = false;
        if (testCode) {
          if (testCode.startsWith("/") && testCode.endsWith("/")) {
            try {
              const regex = new RegExp(testCode.slice(1, -1));
              passed = regex.test(outputToEvaluate) || regex.test(codeToEvaluate);
            } catch {
              passed = outputToEvaluate.includes(testCode);
            }
          } else if (testCode.includes("expected:")) {
            const exp = testCode.split(/expected:/i)[1]?.trim() || "";
            passed = outputToEvaluate.includes(exp);
          } else {
            passed = outputToEvaluate.includes(testCode) || codeToEvaluate.includes(testCode);
          }
        } else {
          passed = codeToEvaluate.length > 0;
        }
        if (passed) hiddenPassedCount++;
      });
      let expectedOutputPassed = true;
      if (expectedOutput && expectedOutput.trim()) {
        expectedOutputPassed = outputToEvaluate.includes(expectedOutput.trim()) || codeToEvaluate.includes(expectedOutput.trim());
      }
      const totalTestsRun = visibleTests.length + hiddenTests.length + (expectedOutput ? 1 : 0);
      let totalTestsPassed = visiblePassedCount + hiddenPassedCount + (expectedOutput && expectedOutputPassed ? 1 : 0);
      let overallPassed = false;
      if (totalTestsRun > 0) {
        overallPassed = totalTestsPassed === totalTestsRun;
      } else {
        overallPassed = codeToEvaluate.length > 0;
      }
      let feedback = "";
      if (overallPassed) {
        feedback = "Sempurna! Seluruh pengujian berhasil dilewati. Kode kamu memenuhi semua kriteria.";
      } else if (visiblePassedCount < visibleTests.length) {
        feedback = `Beberapa pengujian publik belum lulus (${visiblePassedCount}/${visibleTests.length}). Periksa kembali keluaran program.`;
      } else if (hiddenPassedCount < hiddenTests.length) {
        feedback = "Pengujian publik berhasil, namun terdapat kriteria/kasus uji rahasia yang belum terpenuhi. Periksa logika tepi (edge cases).";
      } else if (!expectedOutputPassed) {
        feedback = "Keluaran program belum sesuai dengan hasil ekspektasi yang diharapkan.";
      } else {
        feedback = "Kode kamu belum memenuhi semua persyaratan latihan.";
      }
      const attemptId = `att-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      await adminDb.collection("exercise_attempts").doc(attemptId).set({
        attemptId,
        userId,
        exerciseId,
        lessonId: exerciseData.lessonId || "",
        submittedAt: (/* @__PURE__ */ new Date()).toISOString(),
        status: overallPassed ? "passed" : "failed",
        passed: overallPassed,
        testsRun: totalTestsRun,
        testsPassed: totalTestsPassed,
        testsFailed: Math.max(0, totalTestsRun - totalTestsPassed)
      });
      let xpEarned = 0;
      let alreadyCompleted = false;
      if (overallPassed && userId) {
        const userRef = adminDb.collection("users").doc(userId);
        await adminDb.runTransaction(async (transaction) => {
          const userSnap = await transaction.get(userRef);
          if (userSnap.exists) {
            const userData = userSnap.data() || {};
            const completedLessons = userData.completedLessons || [];
            const currentXp = Number(userData.xp) || 0;
            const targetLessonId = exerciseData.lessonId || exerciseId;
            if (completedLessons.includes(targetLessonId) || completedLessons.includes(exerciseId)) {
              alreadyCompleted = true;
              xpEarned = 0;
            } else {
              xpEarned = Number(exerciseData.xpReward) || 20;
              const updatedCompleted = Array.from(/* @__PURE__ */ new Set([...completedLessons, targetLessonId, exerciseId]));
              transaction.update(userRef, {
                completedLessons: updatedCompleted,
                xp: currentXp + xpEarned,
                updatedAt: (/* @__PURE__ */ new Date()).toISOString()
              });
            }
          }
        });
      }
      const visibleTestResults = visibleTests.map((vt, idx) => {
        const tId = vt.id || `vtest-${idx}`;
        return {
          id: tId,
          name: vt.name || vt.description || `Tes Publik ${idx + 1}`,
          description: vt.description || "",
          passed: Boolean(visibleEvaluations[tId]),
          message: visibleEvaluations[tId] ? "Berhasil" : "Pengujian belum terpenuhi"
        };
      });
      res.json({
        exerciseId,
        status: overallPassed ? "passed" : "failed",
        passed: overallPassed,
        testsRun: totalTestsRun,
        testsPassed: totalTestsPassed,
        testsFailed: Math.max(0, totalTestsRun - totalTestsPassed),
        output: outputToEvaluate,
        feedback,
        visibleTestResults,
        xpEarned,
        alreadyCompleted
      });
    } catch (err) {
      console.error("Error evaluating exercise:", err);
      res.status(500).json({ error: "Failed to evaluate exercise" });
    }
  });
  app.post("/api/admin/modules/:moduleId/import-static", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const moduleId = String(req.params.moduleId);
      let staticModuleMatch = null;
      let parentCourseId = "";
      let parentLevelId = "";
      for (const course of COURSES) {
        for (const level of course.levels) {
          const mod = level.modules.find((m) => m.id === moduleId);
          if (mod) {
            staticModuleMatch = mod;
            parentCourseId = course.id;
            parentLevelId = level.id;
            break;
          }
        }
        if (staticModuleMatch) break;
      }
      if (!staticModuleMatch) {
        return res.status(404).json({ error: `Static module "${moduleId}" not found in static registry` });
      }
      const modDocRef = adminDb.collection("modules").doc(moduleId);
      const modSnap = await modDocRef.get();
      const now = (/* @__PURE__ */ new Date()).toISOString();
      if (!modSnap.exists) {
        await modDocRef.set({
          id: moduleId,
          courseId: parentCourseId,
          levelId: parentLevelId,
          title: staticModuleMatch.title,
          description: staticModuleMatch.description || "",
          status: "published",
          order: 0,
          version: 1,
          createdAt: now,
          updatedAt: now,
          createdBy: req.user.uid,
          updatedBy: req.user.uid
        });
      }
      const { created, skipped } = await importStaticLessonsForModule(
        parentCourseId,
        parentLevelId,
        moduleId,
        staticModuleMatch.lessons || [],
        req.user.uid,
        now
      );
      await logAudit(req.user.uid, "lessons.imported", "module", moduleId, {
        lessonsCreated: created,
        lessonsSkipped: skipped
      });
      res.json({
        success: true,
        moduleId,
        lessonsCreated: created,
        lessonsSkipped: skipped
      });
    } catch (err) {
      console.error("Error importing module static lessons:", err);
      res.status(500).json({ error: "Failed to import module lessons" });
    }
  });
  app.post("/api/admin/lessons/:lessonId/import-static-exercises", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const lessonId = String(req.params.lessonId);
      let staticLessonMatch = null;
      let parentCourseId = "";
      let parentLevelId = "";
      let parentModuleId = "";
      for (const course of COURSES) {
        for (const level of course.levels) {
          for (const mod of level.modules) {
            const lesson = mod.lessons.find((l) => l.id === lessonId);
            if (lesson) {
              staticLessonMatch = lesson;
              parentCourseId = course.id;
              parentLevelId = level.id;
              parentModuleId = mod.id;
              break;
            }
          }
          if (staticLessonMatch) break;
        }
        if (staticLessonMatch) break;
      }
      if (!staticLessonMatch) {
        return res.status(404).json({ error: `Static lesson "${lessonId}" not found in static registry` });
      }
      const lessonDocRef = adminDb.collection("lessons").doc(lessonId);
      const lessonSnap = await lessonDocRef.get();
      const now = (/* @__PURE__ */ new Date()).toISOString();
      if (!lessonSnap.exists) {
        await lessonDocRef.set({
          id: lessonId,
          courseId: parentCourseId,
          levelId: parentLevelId,
          moduleId: parentModuleId,
          title: staticLessonMatch.title,
          type: staticLessonMatch.type || "practice",
          description: staticLessonMatch.description || "",
          content: staticLessonMatch.content || [],
          status: "published",
          order: 0,
          version: 1,
          createdAt: now,
          updatedAt: now,
          createdBy: req.user.uid,
          updatedBy: req.user.uid
        });
      }
      let created = 0;
      let skipped = 0;
      let exercisesToImport = [];
      if (staticLessonMatch.exercises && Array.isArray(staticLessonMatch.exercises) && staticLessonMatch.exercises.length > 0) {
        exercisesToImport = staticLessonMatch.exercises;
      } else if (staticLessonMatch.requirements && staticLessonMatch.requirements.length > 0) {
        exercisesToImport = [{
          id: `${lessonId}-ex-1`,
          title: staticLessonMatch.title,
          description: staticLessonMatch.description || "",
          instructions: staticLessonMatch.instructions || "",
          type: staticLessonMatch.type || "practice",
          language: staticLessonMatch.language || "web",
          runtime: staticLessonMatch.runtime || "browser",
          starterCode: staticLessonMatch.starterCode || "",
          starterCss: staticLessonMatch.starterCss || "",
          starterJs: staticLessonMatch.starterJs || "",
          starterPy: staticLessonMatch.starterPy || "",
          requirements: staticLessonMatch.requirements || [],
          hints: staticLessonMatch.hints || [],
          xpReward: staticLessonMatch.xpReward || 15,
          order: 1
        }];
      }
      for (let idx = 0; idx < exercisesToImport.length; idx++) {
        const item = exercisesToImport[idx];
        const exerciseId = item.id ? preserveOrSanitizeId(String(item.id)) : generateExerciseId(lessonId, idx + 1);
        const exDocRef = adminDb.collection("exercises").doc(exerciseId);
        const exSnap = await exDocRef.get();
        if (exSnap.exists) {
          skipped++;
          continue;
        }
        const newExercise = {
          id: exerciseId,
          lessonId,
          courseId: parentCourseId,
          levelId: parentLevelId,
          moduleId: parentModuleId,
          title: item.title || staticLessonMatch.title,
          slug: item.slug ? sanitizeId(String(item.slug)) : sanitizeId(item.title || staticLessonMatch.title),
          description: item.description || "",
          instructions: item.instructions || "",
          type: item.type || staticLessonMatch.type || "code",
          language: item.language || staticLessonMatch.language || "web",
          runtime: item.runtime || staticLessonMatch.runtime || "browser",
          starterCode: item.starterCode || staticLessonMatch.starterCode || "",
          starterCss: item.starterCss || staticLessonMatch.starterCss || "",
          starterJs: item.starterJs || staticLessonMatch.starterJs || "",
          starterPy: item.starterPy || staticLessonMatch.starterPy || "",
          requirements: Array.isArray(item.requirements) ? item.requirements.map((r) => ({ id: r.id || `req-${Date.now()}`, description: typeof r === "string" ? r : r.description || "" })) : [],
          visibleTests: Array.isArray(item.visibleTests) ? item.visibleTests : [],
          hints: Array.isArray(item.hints) ? item.hints.map((h) => typeof h === "string" ? h : h?.text || "") : [],
          xpReward: Number(item.xpReward) || 15,
          status: "published",
          order: Number(item.order) || idx + 1,
          version: 1,
          createdAt: now,
          updatedAt: now,
          createdBy: req.user.uid,
          updatedBy: req.user.uid
        };
        await exDocRef.set(newExercise);
        created++;
      }
      await logAudit(req.user.uid, "exercise.imported", "lesson", lessonId, {
        exercisesCreated: created,
        exercisesSkipped: skipped
      });
      res.json({
        success: true,
        lessonId,
        exercisesCreated: created,
        exercisesSkipped: skipped
      });
    } catch (err) {
      console.error("Error importing lesson static exercises:", err);
      res.status(500).json({ error: "Failed to import lesson exercises" });
    }
  });
  app.get("/api/admin/audit-logs", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const snap = await adminDb.collection("audit_logs").orderBy("timestamp", "desc").limit(50).get();
      const logs = [];
      snap.forEach((doc) => {
        logs.push({ id: doc.id, ...doc.data() });
      });
      res.json({ logs });
    } catch (err) {
      console.error("Error fetching audit logs:", err);
      res.status(500).json({ error: "Failed to retrieve audit logs" });
    }
  });
  app.post("/api/admin/courses/:courseId/import-static", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const courseId = String(req.params.courseId);
      const staticCourse = COURSES.find((c) => c.id === courseId);
      if (!staticCourse) {
        return res.status(404).json({ error: `Static course "${courseId}" not found in static registry` });
      }
      const now = (/* @__PURE__ */ new Date()).toISOString();
      let courseCreated = false;
      let levelsCreated = 0;
      let levelsSkipped = 0;
      let modulesCreated = 0;
      let modulesSkipped = 0;
      let lessonsCreated = 0;
      let lessonsSkipped = 0;
      const courseDocRef = adminDb.collection("courses").doc(courseId);
      const courseSnap = await courseDocRef.get();
      if (!courseSnap.exists) {
        await courseDocRef.set({
          id: courseId,
          title: staticCourse.title,
          description: staticCourse.description || "",
          shortDescription: staticCourse.shortDescription || "",
          icon: staticCourse.icon || "code",
          status: "published",
          order: staticCourse.order ?? 0,
          version: 1,
          createdAt: now,
          updatedAt: now,
          createdBy: req.user.uid,
          updatedBy: req.user.uid
        });
        courseCreated = true;
      }
      for (let lIdx = 0; lIdx < staticCourse.levels.length; lIdx++) {
        const lvl = staticCourse.levels[lIdx];
        const lvlRef = adminDb.collection("levels").doc(lvl.id);
        const lvlSnap = await lvlRef.get();
        if (!lvlSnap.exists) {
          await lvlRef.set({
            id: lvl.id,
            courseId,
            title: lvl.title,
            slug: sanitizeId(lvl.title) || lvl.id,
            description: lvl.description || "",
            status: "published",
            order: lIdx,
            version: 1,
            createdAt: now,
            updatedAt: now,
            createdBy: req.user.uid,
            updatedBy: req.user.uid
          });
          levelsCreated++;
        } else {
          levelsSkipped++;
        }
        for (let mIdx = 0; mIdx < lvl.modules.length; mIdx++) {
          const mod = lvl.modules[mIdx];
          const modRef = adminDb.collection("modules").doc(mod.id);
          const modSnap = await modRef.get();
          if (!modSnap.exists) {
            await modRef.set({
              id: mod.id,
              courseId,
              levelId: lvl.id,
              title: mod.title,
              description: mod.description || "",
              status: "published",
              order: mIdx,
              version: 1,
              createdAt: now,
              updatedAt: now,
              createdBy: req.user.uid,
              updatedBy: req.user.uid
            });
            modulesCreated++;
          } else {
            modulesSkipped++;
          }
          const lesResult = await importStaticLessonsForModule(
            courseId,
            lvl.id,
            mod.id,
            mod.lessons || [],
            req.user.uid,
            now
          );
          lessonsCreated += lesResult.created;
          lessonsSkipped += lesResult.skipped;
        }
      }
      await logAudit(req.user.uid, "curriculum.imported", "course", courseId, {
        courseCreated,
        levelsCreated,
        levelsSkipped,
        modulesCreated,
        modulesSkipped,
        lessonsCreated,
        lessonsSkipped
      });
      res.json({
        success: true,
        courseId,
        courseCreated,
        levelsCreated,
        levelsSkipped,
        modulesCreated,
        modulesSkipped,
        lessonsCreated,
        lessonsSkipped
      });
    } catch (err) {
      console.error("Error importing static course:", err);
      res.status(500).json({ error: "Failed to import static course" });
    }
  });
  app.post("/api/admin/curriculum/import-all", authenticateFirebaseUser, requireAdmin, async (req, res) => {
    try {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      let coursesCreated = 0;
      let coursesSkipped = 0;
      let levelsCreated = 0;
      let levelsSkipped = 0;
      let modulesCreated = 0;
      let modulesSkipped = 0;
      let lessonsCreated = 0;
      let lessonsSkipped = 0;
      for (let cIdx = 0; cIdx < COURSES.length; cIdx++) {
        const sc = COURSES[cIdx];
        const courseDocRef = adminDb.collection("courses").doc(sc.id);
        const courseSnap = await courseDocRef.get();
        if (!courseSnap.exists) {
          await courseDocRef.set({
            id: sc.id,
            title: sc.title,
            description: sc.description || "",
            shortDescription: sc.shortDescription || "",
            icon: sc.icon || "code",
            status: "published",
            order: cIdx,
            version: 1,
            createdAt: now,
            updatedAt: now,
            createdBy: req.user.uid,
            updatedBy: req.user.uid
          });
          coursesCreated++;
        } else {
          coursesSkipped++;
        }
        for (let lIdx = 0; lIdx < sc.levels.length; lIdx++) {
          const lvl = sc.levels[lIdx];
          const lvlRef = adminDb.collection("levels").doc(lvl.id);
          const lvlSnap = await lvlRef.get();
          if (!lvlSnap.exists) {
            await lvlRef.set({
              id: lvl.id,
              courseId: sc.id,
              title: lvl.title,
              slug: sanitizeId(lvl.title) || lvl.id,
              description: lvl.description || "",
              status: "published",
              order: lIdx,
              version: 1,
              createdAt: now,
              updatedAt: now,
              createdBy: req.user.uid,
              updatedBy: req.user.uid
            });
            levelsCreated++;
          } else {
            levelsSkipped++;
          }
          for (let mIdx = 0; mIdx < lvl.modules.length; mIdx++) {
            const mod = lvl.modules[mIdx];
            const modRef = adminDb.collection("modules").doc(mod.id);
            const modSnap = await modRef.get();
            if (!modSnap.exists) {
              await modRef.set({
                id: mod.id,
                courseId: sc.id,
                levelId: lvl.id,
                title: mod.title,
                description: mod.description || "",
                status: "published",
                order: mIdx,
                version: 1,
                createdAt: now,
                updatedAt: now,
                createdBy: req.user.uid,
                updatedBy: req.user.uid
              });
              modulesCreated++;
            } else {
              modulesSkipped++;
            }
            const lesResult = await importStaticLessonsForModule(
              sc.id,
              lvl.id,
              mod.id,
              mod.lessons || [],
              req.user.uid,
              now
            );
            lessonsCreated += lesResult.created;
            lessonsSkipped += lesResult.skipped;
          }
        }
      }
      await logAudit(req.user.uid, "curriculum.bulk_imported", "curriculum", "all", {
        coursesCreated,
        coursesSkipped,
        levelsCreated,
        levelsSkipped,
        modulesCreated,
        modulesSkipped,
        lessonsCreated,
        lessonsSkipped
      });
      res.json({
        success: true,
        coursesCreated,
        coursesSkipped,
        levelsCreated,
        levelsSkipped,
        modulesCreated,
        modulesSkipped,
        lessonsCreated,
        lessonsSkipped
      });
    } catch (err) {
      console.error("Error performing bulk curriculum import:", err);
      res.status(500).json({ error: "Failed to bulk import curriculum" });
    }
  });
  app.post("/api/chat", authenticateFirebaseUser, async (req, res) => {
    try {
      const {
        lessonTitle,
        lessonType,
        lessonContent,
        requirements,
        currentCode,
        currentCss,
        currentJs,
        currentPy,
        userMessage,
        history = []
      } = req.body;
      const genAI = getAi();
      const systemInstruction = `Kamu adalah Senior Fullstack & Security Software Engineer serta AI Tutor bahasa Indonesia yang ramah, interaktif, dan pedagogis untuk CODERA Interactive Coding Academy.
Tugas kamu adalah mendampingi murid belajar koding, continuous engineering (Learn -> Code -> Test -> Secure -> Harden -> Deploy -> Monitor -> Maintain), membantu debugging, threat modeling, dan memberikan petunjuk bertahap (progressive hints).

Konteks Pelajaran Aktif:
- Judul: ${lessonTitle || "General Coding & Security"}
- Tipe: ${lessonType || "Interactive"}
- Materi: ${lessonContent || "-"}
- Kriteria Kelulusan: ${requirements || "-"}

Kode Murid Saat Ini:
[Python]
${currentPy || "(Kosong / Bukan Python)"}

[HTML]
${currentCode || "(Kosong)"}

[CSS]
${currentCss || "(Kosong)"}

[JavaScript/TypeScript]
${currentJs || "(Kosong)"}

Prinsip Mengajar:
1. Prioritaskan "Active Learning": Beri petunjuk terarah (hint bertahap) yang merangsang murid memikirkan solusinya sendiri.
2. Jika materi berkaitan dengan keamanan/vulnerabilitas (XSS, SQLi, IDOR, CSRF, secrets): Jelaskan konsep secara defensif (apa aset yang dilindungi, mengapa celah terjadi, dan bagaimana memperbaikinya secara tuntas dengan parameterized query, DOM encoding, atau RBAC). Jangan pernah mengajarkan eksploitasi ofensif di luar lingkungan lab terkontrol.
3. Ingatkan prinsip: "Keamanan adalah pengurangan risiko, bukan keamanan mutlak. Produksi adalah awal dari pemantauan berkelanjutan."
4. Gunakan bahasa Indonesia yang santun, suportif, dan mudah dimengerti.
5. Gunakan markdown formatting (bolding untuk keyword, backticks untuk kode pendek).`;
      const formattedContents = [];
      if (Array.isArray(history) && history.length > 0) {
        for (const msg of history.slice(-6)) {
          formattedContents.push({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }]
          });
        }
      }
      formattedContents.push({
        role: "user",
        parts: [{ text: userMessage || "Bantu saya mereview kode ini." }]
      });
      const response = await genAI.models.generateContent({
        model: "gemini-3.8-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });
      const replyText = response.text || "Maaf, saya sedang memproses jawaban. Silakan coba kirim ulang pertanyaan Anda.";
      const isHint = replyText.toLowerCase().includes("petunjuk") || replyText.toLowerCase().includes("hint") || replyText.toLowerCase().includes("coba perhatikan");
      res.json({ reply: replyText, isHint });
    } catch (error) {
      console.error("Error in AI Chat:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });
  app.post("/api/ai-review", authenticateFirebaseUser, async (req, res) => {
    try {
      const { language, code, contextTitle, targetTask } = req.body;
      if (!code || !code.trim()) {
        return res.status(400).json({ error: "Kode tidak boleh kosong untuk direview." });
      }
      const genAI = getAi();
      const prompt = `Lakukan audit dan Code Review profesional secara mendalam terhadap kode berikut dalam konteks: "${contextTitle || "Coding Task"}" (${targetTask || "Umum"}).

Bahasa: ${language || "Web / Python"}
Kode yang direview:
\`\`\`
${code}
\`\`\`

Berikan output JSON yang valid murni (tanpa pembungkus markdown apapun, langsung parseable JSON) dengan struktur berikut:
{
  "score": 85,
  "summary": "Ringkasan penilaian kode dalam 1-2 kalimat bahasa Indonesia.",
  "complexity": {
    "time": "O(n)",
    "space": "O(1)",
    "explanation": "Penjelasan singkat kompleksitas algoritma."
  },
  "strengths": [
    "Kelebihan 1",
    "Kelebihan 2"
  ],
  "improvements": [
    "Saran perbaikan 1",
    "Saran perbaikan 2"
  ],
  "securityAndBugs": [
    "Potensi bug atau celah keamanan jika ada (atau 'Aman: Tidak ditemukan potensi bug kritis')"
  ],
  "refactoredCode": "Versi kode yang telah dioptimalkan dan lebih bersih (clean code)."
}`;
      const response = await genAI.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          temperature: 0.2,
          responseMimeType: "application/json"
        }
      });
      const responseText = response.text?.trim() || "{}";
      let reviewResult;
      try {
        reviewResult = JSON.parse(responseText);
      } catch {
        reviewResult = {
          score: 80,
          summary: "Kode berhasil dianalisis.",
          complexity: { time: "O(n)", space: "O(1)", explanation: "Kompleksitas standar." },
          strengths: ["Struktur kode terbaca dengan baik"],
          improvements: ["Gunakan penamaan variabel yang lebih deskriptif"],
          securityAndBugs: ["Tidak ditemukan bug kritis"],
          refactoredCode: code
        };
      }
      res.json(reviewResult);
    } catch (error) {
      console.error("Error in AI Review:", error);
      res.status(500).json({ error: error.message || "Gagal melakukan review kode" });
    }
  });
  app.post("/api/tts", authenticateFirebaseUser, async (req, res) => {
    try {
      const { text, voice } = req.body;
      if (!text || !text.trim()) {
        return res.status(400).json({ error: "Teks tidak boleh kosong." });
      }
      const cleanText = text.replace(/\*\*/g, "").replace(/```[\s\S]*?```/g, "Kode terlampir pada layar.").replace(/`([^`]+)`/g, "$1").substring(0, 400);
      const genAI = getAi();
      const response = await genAI.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: cleanText }] }],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voice || "Kore" }
            }
          }
        }
      });
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) {
        return res.status(500).json({ error: "Gagal membuat audio TTS." });
      }
      res.json({ audio: base64Audio });
    } catch (error) {
      console.error("Error in Voice TTS:", error);
      res.status(500).json({ error: error.message || "Error generating TTS audio" });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CODERA Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
