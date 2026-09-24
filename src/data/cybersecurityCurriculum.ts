import { Course } from '../types';

export const CYBERSECURITY_COURSE: Course = {
  id: 'cybersecurity-mastery',
  title: 'Cybersecurity, Threat Modeling & Web Defense',
  shortDescription: 'Pahami CIA Triad, permodelan ancaman (STRIDE), mitigasi OWASP Top 10 (XSS, SQLi, CSRF, IDOR), dan secure coding.',
  description: 'Keamanan aplikasi dimulai dari pola pikir defensif: memahami apa yang kita lindungi, batas-batas kepercayaan arsitektur, dan cara menulis kode yang aman sejak baris pertama (Secure by Design).',
  icon: 'shield',
  levels: [
    {
      id: 'sec-lvl-1',
      title: 'Stage 04 — Cybersecurity Fundamentals',
      description: 'Jangan mulai dari meretas. Mulailah dari memahami apa yang Anda lindungi (Aset), ancaman (Threat), kerentanan (Vulnerability), dan risiko (Risk).',
      modules: [
        {
          id: 'sec-mod-fundamentals',
          title: 'Pilar Pertahanan & CIA Triad',
          description: 'Definisi aset, permukaan serangan (attack surface), dan prinsip pertahanan berlapis (defense in depth).',
          lessons: [
            {
              id: 'sec-les-cia-triad',
              title: 'CIA Triad & Prinsip Desain Keamanan',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'typescript',
                  code: `// ❌ Melanggar Least Privilege: Service web terhubung ke DB dengan akun superuser 'postgres' / 'root'
const db = new Database({
  user: 'superuser', // Dapat DROP DATABASE jika ada celah SQLi!
  password: process.env.DB_PASSWORD
});

// ✅ Menerapkan Least Privilege: Service hanya memakai user dengan hak SELECT dan INSERT pada tabel spesifik
const db = new Database({
  user: 'app_readonly_service', // Terbatas, tidak memiliki izin destruktif
  password: process.env.DB_APP_PASSWORD
});`
                }
              ]
            },
            {
              id: 'sec-quiz-cia',
              title: 'Kuis Konsep CIA & Defense in Depth',
              type: 'quiz',
              xpReward: 25,
              questions: [
                {
                  id: 'scq-1',
                  question: 'Manakah dari berikut ini yang merupakan pelanggaran terhadap prinsip "Integrity" dalam CIA Triad?',
                  options: [
                    'Server web down selama 10 menit karena lonjakan traffic.',
                    'Penyerang di jaringan kafe yang tidak terenkripsi berhasil menyadap dan membaca isi email pengguna.',
                    'Penyerang berhasil mengubah saldo rekening di database tanpa terdeteksi otorisasi perbankan.',
                    'Pengguna salah memasukkan password sebanyak 3 kali.'
                  ],
                  correctAnswerIndex: 2,
                  explanation: 'Integritas (Integrity) menjamin bahwa data akurat, valid, dan tidak dimodifikasi oleh pihak yang tidak berhak.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'sec-lvl-2',
      title: 'Stage 05 — Threat Modeling (Pemodelan Ancaman)',
      description: 'Peta arsitektur: User -> Frontend -> API -> Backend -> Database. Identifikasi aset, entry point, batas kepercayaan, dan potensi ancaman STRIDE.',
      modules: [
        {
          id: 'sec-mod-threatmodel',
          title: 'Pemodelan Ancaman & Trust Boundaries',
          description: 'Menganalisis sistem sebelum kode ditulis atau dideploy.',
          lessons: [
            {
              id: 'sec-les-stride',
              title: 'Metodologi STRIDE & Batas Kepercayaan (Trust Boundaries)',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Mengapa Threat Modeling Sangat Penting?

Threat Modeling adalah proses sistematis untuk menemukan kelemahan arsitektur sebelum sistem diluncurkan:

\`\`\`text
[PENGGUNA / BROWSER]
       │
═══════╪══════════════════════════════════ [TRUST BOUNDARY 1: Internet Publik]
       ▼
[FRONTEND WEB (React/HTML)]
       │
═══════╪══════════════════════════════════ [TRUST BOUNDARY 2: Client-ke-Server API]
       ▼
[API GATEWAY / REVERSE PROXY]
       │
       ▼
[BACKEND SERVICE (Node/Python)]
       │
═══════╪══════════════════════════════════ [TRUST BOUNDARY 3: Internal Network]
       ▼
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
      id: 'sec-lvl-3',
      title: 'Stage 06 & 07 — Web Application Security & Tools',
      description: 'Cegah OWASP Top 10: XSS, SQL Injection, CSRF, IDOR, Broken Access Control, serta gunakan tool audit defensif (DevTools, npm audit, curl).',
      modules: [
        {
          id: 'sec-mod-owasp',
          title: 'OWASP Top 10 & Pertahanan Defensif',
          description: 'Anatomi kerentanan web paling berbahaya dan cara memperbaikinya secara tuntas.',
          lessons: [
            {
              id: 'sec-les-xss-sqli',
              title: 'Mencegah XSS (Cross-Site Scripting) & SQL Injection',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'typescript',
                  code: `// ❌ SANGAT RENTAN SQL INJECTION:
const query = "SELECT * FROM users WHERE email = '" + req.body.email + "' AND password = '" + req.body.password + "'";

// ✅ 100% AMAN: Parameterized Query (Prepared Statement)
const query = "SELECT id, email, password_hash FROM users WHERE email = $1";
const result = await db.query(query, [req.body.email]);

// ❌ RENTAN XSS:
document.getElementById('profile-name').innerHTML = user.bio;

// ✅ AMAN: Browser secara otomatis mengenkode karakter khusus (<, >, &)
document.getElementById('profile-name').textContent = user.bio;`
                }
              ]
            },
            {
              id: 'sec-quiz-owasp',
              title: 'Kuis Evaluasi OWASP Web Security',
              type: 'quiz',
              xpReward: 25,
              questions: [
                {
                  id: 'owq-1',
                  question: 'Manakah tindakan paling efektif untuk mengeliminasi kerentanan SQL Injection secara permanen pada aplikasi backend?',
                  options: [
                    'Menghapus kata "SELECT" dari input pengguna.',
                    'Menggunakan Parameterized Queries (Prepared Statements) atau ORM yang aman.',
                    'Memperbesar RAM server database.',
                    'Mengubah port default database dari 5432 ke port lain.'
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'Parameterized Queries memisahkan kode SQL dari data input pengguna, sehingga input pengguna diperlakukan murni sebagai nilai literal dan tidak dapat dieksekusi sebagai instruksi database.'
                }
              ]
            }
          ]
        },
        {
          id: 'sec-mod-tools',
          title: 'Perangkat Audit & Analisis Keamanan',
          description: 'Pemeriksaan keamanan mandiri menggunakan Browser DevTools, npm audit, curl, dan static linters di localhost.',
          lessons: [
            {
              id: 'sec-les-sec-tools',
              title: 'Audit Keamanan Mandiri dengan CLI & DevTools',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'bash',
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
      id: 'sec-lvl-4',
      title: 'Stage 08 — Secure Coding Standards',
      description: 'Praktek penulisan kode aman lintas lapisan: Frontend safe DOM, Backend strict validation, dan Database least privilege.',
      modules: [
        {
          id: 'sec-mod-safe-dom',
          title: 'Prinsip Penulisan Kode Kebal Serangan',
          description: 'Validasi ketat di batas trust boundary server-side.',
          lessons: [
            {
              id: 'sec-les-backend-val',
              title: 'Server-Side Input Validation & Output Encoding',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'typescript',
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
