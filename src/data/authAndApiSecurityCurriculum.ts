import { Course } from '../types';

export const AUTH_API_SECURITY_COURSE: Course = {
  id: 'auth-api-security',
  title: 'Auth, API & Supply Chain Security',
  shortDescription: 'Otentikasi tangguh (bcrypt/JWT), Otorisasi berbasis peran (RBAC), pencegahan IDOR, pengamanan API, dan integritas dependensi software.',
  description: 'Pahami perbedaan esensial antara "Siapa Anda?" (Authentication) dan "Apa yang boleh Anda lakukan?" (Authorization), kunci keamanan endpoint API publik, serta cara melindungi aplikasi dari serangan rantai pasok (supply chain attack).',
  icon: 'key',
  levels: [
    {
      id: 'auth-lvl-1',
      title: 'Stage 09 — Authentication & Authorization',
      description: 'Hashing password dengan salt (bcrypt/argon2), session vs JWT, multi-factor authentication (MFA), role-based access control (RBAC), dan mitigasi IDOR.',
      modules: [
        {
          id: 'auth-mod-concepts',
          title: 'Otentikasi vs Otorisasi & Pencegahan IDOR',
          description: 'Membangun sistem login aman dan membatasi akses antar pengguna.',
          lessons: [
            {
              id: 'auth-les-hashing-idor',
              title: 'Password Hashing & Broken Object Level Auth (IDOR)',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'typescript',
                  code: `// ❌ RENTAN IDOR: Mengambil dokumen hanya berdasarkan ID dari request URL
app.get('/api/documents/:id', async (req, res) => {
  const doc = await db.documents.findUnique({ where: { id: req.params.id } });
  return res.json(doc); // BAHAYA: Siapapun yang tahu ID bisa membaca!
});

// ✅ AMAN: Selalu periksa relasi otorisasi dengan akun yang sedang terotentikasi
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
      id: 'auth-lvl-2',
      title: 'Stage 10 & 11 — API & Database Security',
      description: 'Rate limiting anti-bruteforce, CORS yang ketat, pencegahan kebocoran credential DB, row-level authorization, dan backup terenkripsi.',
      modules: [
        {
          id: 'auth-mod-api-hardening',
          title: 'Perlindungan Endpoint API & Database',
          description: 'Mengamankan pintu gerbang API dari eksploitasi otomatis dan scraping.',
          lessons: [
            {
              id: 'auth-les-rate-limit',
              title: 'API Rate Limiting & Proteksi Brute-Force',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'typescript',
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
      id: 'auth-lvl-3',
      title: 'Stage 12 — Dependency & Supply Chain Security',
      description: 'Keamanan dependensi eksternal, lockfiles (package-lock.json), deteksi typosquatting, automated CVE scanning, dan SBOM fundamentals.',
      modules: [
        {
          id: 'auth-mod-supply-chain',
          title: 'Manajemen Kerentanan Rantai Pasok',
          description: 'Aplikasi Anda terdiri dari 80-90% kode pihak ketiga (npm, pip). Lindungi rantai pasok software Anda.',
          lessons: [
            {
              id: 'auth-les-lockfiles-audit',
              title: 'Lockfiles, Package Audits & Software Bill of Materials',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### Bahaya Serangan Rantai Pasok (Supply Chain Attack)

Aplikasi modern mengimpor ratusan package open-source. Satu package jahat dapat mencuri API key atau membajak server:

1. **Kunci Versi dengan Lockfile:** Selalu commit \`package-lock.json\` atau \`pnpm-lock.yaml\` ke Git. Lockfile mencatat hash SHA integritas kriptografis dari setiap package agar versi yang di-install di server produksi identik dengan komputer lokal.
2. **Bahaya Typosquatting:** Berhati-hatilah dengan nama paket yang mirip (contoh: meng-install \`cross-env\` vs varian palsu \`crossenv\`).
3. **Automated Vulnerability Monitoring:** Jalankan \`npm audit\` dalam pipeline CI/CD untuk menggagalkan build jika ada kerentanan *Critical* yang belum di-patch.`
                },
                {
                  type: 'code-example',
                  language: 'bash',
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
