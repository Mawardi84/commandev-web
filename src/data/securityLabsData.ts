export interface SecurityLab {
  id: string;
  title: string;
  category: 'xss' | 'sqli' | 'idor' | 'secrets' | 'headers' | 'supply-chain';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  xpReward: number;
  overview: string;
  vulnerabilityDescription: string;
  impact: string;
  exploitPayloadExample: string;
  files: {
    name: string;
    language: 'javascript' | 'typescript' | 'sql' | 'json';
    initialCode: string;
    hint: string;
    solutionPattern: RegExp[];
  }[];
  verificationSteps: {
    name: string;
    testFn: (code: string) => { passed: boolean; message: string };
  }[];
  mitigationGuide: string;
}

export const SECURITY_LABS: SecurityLab[] = [
  {
    id: 'lab-xss-dom',
    title: 'Lab 01: Reflected DOM Cross-Site Scripting (XSS)',
    category: 'xss',
    difficulty: 'Beginner',
    xpReward: 50,
    overview: 'Celah XSS terjadi ketika input teks dari pengguna disuntikkan secara mentah ke dalam properti innerHTML browser tanpa proses enkoding atau sanitasi.',
    vulnerabilityDescription: 'Fungsi displayUserGreeting menerima parameter query URL atau form input lalu langsung memasukkannya ke element.innerHTML. Penyerang dapat menyisipkan tag <img src=x onerror=...> atau <script> untuk mengeksekusi JavaScript di sesi browser korban.',
    impact: 'Pencurian session cookie, pembajakan akun (Account Takeover), defacement tampilan, atau pengalihan pengguna ke situs phishing.',
    exploitPayloadExample: `<img src="invalid" onerror="alert('Cookie curian: ' + document.cookie)">`,
    files: [
      {
        name: 'renderComment.js',
        language: 'javascript',
        initialCode: `// ⚠️ LAB CODE: FUNGSI INI RENTAN XSS
function renderUserComment(containerElement, commentText) {
  // Masalah: Menggunakan innerHTML secara mentah
  containerElement.innerHTML = "<div class='comment'>" + commentText + "</div>";
}`,
        hint: 'Gunakan textContent alih-alih innerHTML, atau buat elemen DOM secara aman dengan createElement & textContent.',
        solutionPattern: [/textContent/i, /createElement/i]
      }
    ],
    verificationSteps: [
      {
        name: 'Tidak lagi menggunakan innerHTML secara mentah',
        testFn: (code: string) => {
          const hasRawInnerHTML = /innerHTML\s*=\s*.*commentText/i.test(code);
          return {
            passed: !hasRawInnerHTML,
            message: hasRawInnerHTML 
              ? 'Kode Anda masih memasukkan commentText langsung ke innerHTML!' 
              : 'innerHTML mentah berhasil dihilangkan.'
          };
        }
      },
      {
        name: 'Menggunakan textContent atau DOM createElement aman',
        testFn: (code: string) => {
          const hasTextContent = /textContent\s*=/i.test(code) || /document\.createTextNode/i.test(code);
          return {
            passed: hasTextContent,
            message: hasTextContent
              ? 'Input pengguna kini diperlakukan sebagai teks murni dan di-encode secara otomatis.'
              : 'Pastikan Anda menetapkan teks menggunakan textContent atau createTextNode.'
          };
        }
      }
    ],
    mitigationGuide: 'Gunakan selalu properti textContent saat menampilkan teks pengguna ke DOM. Jika Anda memang membutuhkan formatting HTML (misal rich text editor), gunakan pustaka sanitasi teruji seperti DOMPurify sebelum menempelkannya ke DOM.'
  },
  {
    id: 'lab-sqli-auth',
    title: 'Lab 02: SQL Injection & Parameterized Queries',
    category: 'sqli',
    difficulty: 'Beginner',
    xpReward: 50,
    overview: 'Celah SQL Injection terjadi ketika string input pengguna digabungkan langsung dengan perintah SQL menggunakan konkatenasi (+).',
    vulnerabilityDescription: 'Query login menggabungkan variabel email dan password langsung ke string SQL. Penyerang dapat menyuntikkan payload \' OR \'1\'=\'1 sehingga klausa WHERE selalu bernilai TRUE tanpa perlu mengetahui password!',
    impact: 'Bypass autentikasi, kebocoran seluruh isi database pengguna, penghapusan tabel database, atau eskalasi hak akses administrator.',
    exploitPayloadExample: `' OR '1'='1' --`,
    files: [
      {
        name: 'authRepository.ts',
        language: 'typescript',
        initialCode: `// ⚠️ LAB CODE: QUERY OTENTIKASI RENTAN SQL INJECTION
import { db } from './database';

export async function findUserByCredentials(email: string, passHash: string) {
  // Masalah: String concatenation langsung memasukkan input ke query SQL
  const rawQuery = "SELECT id, email, role FROM users WHERE email = '" + email + "' AND password_hash = '" + passHash + "'";
  
  const results = await db.raw(rawQuery);
  return results[0];
}`,
        hint: 'Gunakan Parameterized Query (tanda tanya ? atau $1, $2) dan teruskan variabel input sebagai parameter array terpisah.',
        solutionPattern: [/\?/i, /\$1/i, /params/i, /\[\s*email/i]
      }
    ],
    verificationSteps: [
      {
        name: 'Tidak menggunakan konkatenasi string pada query SQL',
        testFn: (code: string) => {
          const hasConcat = /WHERE.*['"]\s*\+\s*email/i.test(code) || /email\s*=\s*'\${email}'/i.test(code);
          return {
            passed: !hasConcat,
            message: hasConcat 
              ? 'Masih terdeteksi penggabungan string variabel mentah ke dalam klausa SQL!' 
              : 'Konkatenasi string SQL berhasil dieliminasi.'
          };
        }
      },
      {
        name: 'Menggunakan parameterized placeholder dan parameter array',
        testFn: (code: string) => {
          const hasParams = (code.includes('?') || code.includes('$1')) && code.includes('[');
          return {
            passed: hasParams,
            message: hasParams
              ? 'Query menggunakan placeholder parameter terpisah. Input pengguna diperlakukan sebagai nilai murni.'
              : 'Gunakan placeholder (?, $1) dan kirim parameter dalam array [email, passHash].'
          };
        }
      }
    ],
    mitigationGuide: 'Gunakan selalu Parameterized Queries (Prepared Statements) atau ORM modern yang secara otomatis memberlakukan sanitasi parameter. Database engine akan mengompilasi struktur query terlebih dahulu sebelum memasukkan nilai parameter.'
  },
  {
    id: 'lab-idor-access',
    title: 'Lab 03: Insecure Direct Object Reference (IDOR)',
    category: 'idor',
    difficulty: 'Intermediate',
    xpReward: 60,
    overview: 'IDOR terjadi ketika API mengizinkan pengguna mengakses atau memodifikasi objek data hanya berdasarkan parameter ID tanpa memvalidasi kepemilikan.',
    vulnerabilityDescription: 'Endpoint GET /api/orders/:id mengambil pesanan dari database hanya dengan ID dari URL. Seorang pengguna biasa dapat mengganti ID pesanan di URL dari 101 ke 102 untuk mengintip data belanja dan alamat pengguna lain.',
    impact: 'Kebocoran data privasi massal (PII), manipulasi data akun pengguna lain, atau kebocoran invoice finansial.',
    exploitPayloadExample: `GET /api/orders/9924 HTTP/1.1 (Milik korban, diakses oleh pelaku)`,
    files: [
      {
        name: 'orderController.ts',
        language: 'typescript',
        initialCode: `// ⚠️ LAB CODE: RENTAN IDOR (BROKEN OBJECT LEVEL AUTHORIZATION)
import { Request, Response } from 'express';
import { db } from './db';

export async function getOrderDetails(req: Request, res: Response) {
  const orderId = req.params.id;
  const order = await db.orders.findById(orderId);

  if (!order) {
    return res.status(404).json({ error: 'Pesanan tidak ditemukan' });
  }

  // Masalah: Mengembalikan data tanpa mengecek apakah order milik req.user!
  return res.json(order);
}`,
        hint: 'Periksa apakah order.userId sama dengan req.user.id (atau req.user.role === "admin"). Jika tidak cocok, kembalikan status 403 Forbidden.',
        solutionPattern: [/req\.user/i, /userId/i, /403/i]
      }
    ],
    verificationSteps: [
      {
        name: 'Memverifikasi kepemilikan data dengan pengguna terotentikasi',
        testFn: (code: string) => {
          const hasOwnershipCheck = /order\.userId\s*!==\s*req\.user\.id/i.test(code) || 
                                     /order\.userId\s*===\s*req\.user\.id/i.test(code) ||
                                     /where:.*userId.*req\.user\.id/i.test(code);
          return {
            passed: hasOwnershipCheck,
            message: hasOwnershipCheck
              ? 'Verifikasi relasi kepemilikan berhasil diterapkan.'
              : 'Tambahkan pengecekan: pastikan order.userId cocok dengan ID pengguna yang sedang login (req.user.id).'
          };
        }
      },
      {
        name: 'Menolak akses tidak sah dengan HTTP 403 Forbidden',
        testFn: (code: string) => {
          const hasForbidden = /403/.test(code);
          return {
            passed: hasForbidden,
            message: hasForbidden
              ? 'HTTP 403 Forbidden dikembalikan saat ada upaya akses tidak sah.'
              : 'Kembalikan res.status(403).json(...) jika pengguna mencoba mengakses pesanan milik akun lain.'
          };
        }
      }
    ],
    mitigationGuide: 'Jangan pernah mempercayai ID dari parameter URL. Selalu gabungkan query pencarian data dengan ID user dari session/token yang valid (SELECT * FROM orders WHERE id = :id AND user_id = :current_user_id).'
  },
  {
    id: 'lab-secrets-frontend',
    title: 'Lab 04: Sensitive Secrets & Client-Side Exposure',
    category: 'secrets',
    difficulty: 'Beginner',
    xpReward: 45,
    overview: 'Secret API Keys (seperti Stripe Secret Key, AWS Access Key, atau Database Password) tidak boleh berada di bundle JavaScript frontend.',
    vulnerabilityDescription: 'Kode React menyimpan secret payment gateway langsung di file komponen. Siapapun yang membuka browser DevTools dapat melihat kunci rahasia ini dan menyalahgunakannya.',
    impact: 'Pencurian saldo akun payment gateway, tagihan tak terkontrol, atau pembobolan cloud infrastructure.',
    exploitPayloadExample: `DevTools Console -> Sources -> bundle.js -> Cari 'sk_live_'`,
    files: [
      {
        name: 'CheckoutButton.tsx',
        language: 'typescript',
        initialCode: `// ⚠️ LAB CODE: SECRET KEY TEREKSPOSE KE BROWSER CLIENT
import React from 'react';

export const CheckoutButton = () => {
  // BAHAYA BESAR: Secret key tersimpan di kode client!
  const STRIPE_SECRET_KEY = "sk_live_51MzaB98234KlQjwe81923";

  const handlePay = async () => {
    // Memanggil API eksternal langsung dari browser dengan secret key
    const res = await fetch('https://api.stripe.com/v1/charges', {
      headers: { 'Authorization': \`Bearer \${STRIPE_SECRET_KEY}\` }
    });
  };

  return <button onClick={handlePay}>Bayar Sekarang</button>;
};`,
        hint: 'Pindahkan panggilan transaksi ke endpoint backend internal (/api/checkout) dan hapus variabel STRIPE_SECRET_KEY dari kode komponen frontend.',
        solutionPattern: [/\/api\/checkout/i, /fetch\(['"]\/api/i]
      }
    ],
    verificationSteps: [
      {
        name: 'Menghapus secret key hardcoded dari kode frontend',
        testFn: (code: string) => {
          const hasSecret = /sk_live_/i.test(code);
          return {
            passed: !hasSecret,
            message: hasSecret
              ? 'Secret key "sk_live_..." masih ditemukan di kode frontend!'
              : 'Secret key berbahaya berhasil dihapus dari browser bundle.'
          };
        }
      },
      {
        name: 'Mengarahkan request ke backend API proxy internal',
        testFn: (code: string) => {
          const hasBackendCall = code.includes('/api/');
          return {
            passed: hasBackendCall,
            message: hasBackendCall
              ? 'Permintaan kini diarahkan ke endpoint backend (/api/...) yang aman.'
              : 'Arahkan pemanggilan ke endpoint backend internal aplikasi Anda (misal: /api/checkout).'
          };
        }
      }
    ],
    mitigationGuide: 'Kode frontend (browser) bersifat publik. Semua kredensial rahasia wajib disimpan di server environment variables (process.env) dan diproses melalui backend API proxy.'
  },
  {
    id: 'lab-headers-hardening',
    title: 'Lab 05: HTTP Security Headers & Clickjacking Shield',
    category: 'headers',
    difficulty: 'Intermediate',
    xpReward: 55,
    overview: 'Server web wajib mengirimkan HTTP Security Headers untuk membatasi aksi browser berbahaya seperti Clickjacking dan MIME-type confusion.',
    vulnerabilityDescription: 'Aplikasi Express tidak memasang middleware keamanan header. Akibatnya, website dapat dimasukkan ke dalam iframe transparan oleh situs phishing untuk memanipulasi klik pengguna (Clickjacking).',
    impact: 'Clickjacking (transfer dana tanpa sengaja), eksekusi file teks berbahaya akibat MIME sniffing, dan downgrade ke HTTP biasa.',
    exploitPayloadExample: `<iframe src="https://bank-korban.com" style="opacity: 0.001; position: absolute;"></iframe>`,
    files: [
      {
        name: 'server.ts',
        language: 'typescript',
        initialCode: `// ⚠️ LAB CODE: SERVER TANPA PENGAMANAN HTTP HEADERS
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Selamat Datang di Portal Finansial</h1>');
});

export default app;`,
        hint: 'Gunakan pustaka helmet (app.use(helmet())) atau tetapkan header keamanan secara manual (X-Frame-Options: DENY, X-Content-Type-Options: nosniff).',
        solutionPattern: [/helmet/i, /X-Frame-Options/i]
      }
    ],
    verificationSteps: [
      {
        name: 'Mengaktifkan proteksi header keamanan (Helmet atau custom headers)',
        testFn: (code: string) => {
          const hasProtection = /helmet/i.test(code) || /X-Frame-Options/i.test(code);
          return {
            passed: hasProtection,
            message: hasProtection
              ? 'Proteksi header keamanan berhasil dikonfigurasi.'
              : 'Tambahkan middleware helmet() atau set header X-Frame-Options dan Content-Security-Policy.'
          };
        }
      }
    ],
    mitigationGuide: 'Gunakan pustaka Helmet di Node.js Express atau konfigurasi Nginx/Caddy untuk menyertakan Content-Security-Policy, Strict-Transport-Security (HSTS), X-Frame-Options: DENY, dan X-Content-Type-Options: nosniff secara konsisten.'
  },
  {
    id: 'lab-supply-chain-patch',
    title: 'Lab 06: Dependency Audit & Supply Chain Vulnerability Patching',
    category: 'supply-chain',
    difficulty: 'Intermediate',
    xpReward: 55,
    overview: 'Aplikasi seringkali mewarisi kerentanan kritis dari dependensi package.json pihak ketiga yang usang.',
    vulnerabilityDescription: 'package.json menggunakan versi lodash 4.17.15 yang memiliki kerentanan CVE-2020-8203 (Prototype Pollution dengan tingkat keparahan HIGH/CRITICAL).',
    impact: 'Penyerang dapat menyuntikkan properti ke Object.prototype JavaScript yang berpotensi menyebabkan Remote Code Execution (RCE) atau Denial of Service.',
    exploitPayloadExample: `JSON payload: {"__proto__": {"isAdmin": true}}`,
    files: [
      {
        name: 'package.json',
        language: 'json',
        initialCode: `{
  "name": "enterprise-portal",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.19.2",
    "lodash": "4.17.15"
  }
}`,
        hint: 'Perbarui versi lodash ke versi yang telah menambal kerentanan (minimal "^4.17.21").',
        solutionPattern: [/4\.17\.21/]
      }
    ],
    verificationSteps: [
      {
        name: 'Memperbarui lodash ke versi aman tanpa kerentanan Prototype Pollution',
        testFn: (code: string) => {
          const hasPatched = /"lodash"\s*:\s*"\^?4\.17\.21"/i.test(code);
          return {
            passed: hasPatched,
            message: hasPatched
              ? 'Versi dependensi lodash telah diperbarui ke versi stabil 4.17.21.'
              : 'Versi lodash masih rentan (4.17.15). Perbarui ke "^4.17.21".'
          };
        }
      }
    ],
    mitigationGuide: 'Jalankan "npm audit" secara berkala dalam alur kerja lokal dan integrasikan audit dependensi otomatis ke dalam pipeline CI/CD untuk menggagalkan merge pull request jika terdeteksi CVE kritis.'
  }
];
