import { Course } from '../types';

export const CONTINUOUS_ENGINEERING_COURSE: Course = {
  id: 'engineering-fundamentals',
  title: 'Engineering & Testing Fundamentals',
  shortDescription: 'Pondasi sistem komputer, web protocols, clean code, modular software architecture, dan automated testing QA.',
  description: 'Programmer sejati tidak sekadar menulis kode yang jalan, tetapi merancang software yang modular, dapat diuji (testable), andal, dan siap menghadapi beban produksi dunia nyata.',
  icon: 'cpu',
  levels: [
    {
      id: 'eng-lvl-1',
      title: 'Stage 01 — Computer & Web Fundamentals',
      description: 'Pahami apa yang sebenarnya terjadi saat browser memuat website: memori, CPU, proses sistem operasi, DNS, TCP/IP, dan protokol HTTP/HTTPS.',
      modules: [
        {
          id: 'eng-mod-os',
          title: 'Sistem Operasi, Memori & CLI',
          description: 'Cara komputer mengeksekusi program dari file disk ke memori RAM dan CPU.',
          lessons: [
            {
              id: 'eng-les-comp-arch',
              title: 'Anatomi Komputer: CPU, RAM, & Proses OS',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### Bagaimana Komputer Menjalankan Kode Anda?

Ketika Anda menjalankan perintah seperti \`node server.js\` atau \`python app.py\`, terjadi serangkaian langkah sistem operasi (OS) tingkat rendah:

1. **Storage (Disk):** Kode Anda tersimpan sebagai file teks di hard disk atau SSD.
2. **OS Loader & RAM:** OS mengalokasikan ruang memori di RAM, memuat runtime interpreter, lalu membaca file kode ke dalam memori.
3. **Process & Thread:** OS membuat **Process** baru dengan Process ID (PID) unik, memori terisolasi (Virtual Memory), call stack, dan heap.
4. **CPU Execution:** CPU mengeksekusi instruksi per siklus clock (*fetch, decode, execute*).

> **Prinsip Utama:** Kode yang boros memori (memory leak) atau loop tak terbatas (infinite loop) akan menguras kapasitas RAM dan memonopoli core CPU, menyebabkan sistem lambat atau crash (OOM - Out of Memory).`
                },
                {
                  type: 'code-example',
                  language: 'bash',
                  code: `# Memeriksa proses yang sedang berjalan di terminal Linux/macOS
ps aux | grep node

# Memantau konsumsi CPU & RAM secara real-time
top -o %CPU
htop`
                }
              ]
            },
            {
              id: 'eng-quiz-comp',
              title: 'Kuis Fondasi Komputer & Memori',
              type: 'quiz',
              xpReward: 25,
              questions: [
                {
                  id: 'eq-1',
                  question: 'Apa perbedaan utama antara memori RAM dan Storage (SSD/Hard Disk) saat sebuah aplikasi berjalan?',
                  options: [
                    'RAM bersifat non-volatile dan permanen, sedangkan SSD sementara.',
                    'RAM adalah memori volatil berkecepatan tinggi tempat kode dan variabel aktif dieksekusi CPU.',
                    'RAM hanya digunakan untuk menyimpan kode sumber teks tanpa data variabel.',
                    'RAM tidak dipengaruhi oleh memory leaks aplikasi.'
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'RAM (Random Access Memory) adalah memori volatil berkecepatan tinggi yang menyimpan proses aktif dan data runtime yang diakses langsung oleh CPU.'
                }
              ]
            }
          ]
        },
        {
          id: 'eng-mod-web-net',
          title: 'Internet, DNS & Siklus HTTP Request/Response',
          description: 'Perjalanan paket data dari input URL di address bar hingga halaman ter-render sempurna.',
          lessons: [
            {
              id: 'eng-les-http-journey',
              title: 'Apa yang Terjadi Saat Membuka Website?',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Siklus Lengkap Kunjungan Web (The Web Request Journey)

Saat pengguna mengetik \`https://academy.commandev.id\` di browser:

1. **DNS Lookup (Domain Name System):**
   Browser menanyakan alamat IP server ke DNS resolver (buku telepon internet). Contoh: \`academy.commandev.id\` -> \`104.21.58.12\`.
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
                  type: 'code-example',
                  language: 'http',
                  code: `GET /api/v1/lessons HTTP/1.1
Host: academy.commandev.id
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
              id: 'eng-quiz-http',
              title: 'Kuis Protokol HTTP & Status Codes',
              type: 'quiz',
              xpReward: 25,
              questions: [
                {
                  id: 'ehq-1',
                  question: 'Manakah HTTP Status Code yang paling tepat saat client mencoba mengakses data tanpa menyertakan token otentikasi yang valid?',
                  options: [
                    '200 OK',
                    '401 Unauthorized',
                    '404 Not Found',
                    '500 Internal Server Error'
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'HTTP 401 Unauthorized menunjukkan bahwa permintaan belum diautentikasi atau kredensial yang disertakan tidak valid.'
                },
                {
                  id: 'ehq-2',
                  question: 'Apa fungsi utama dari enkripsi TLS dalam protokol HTTPS?',
                  options: [
                    'Mempercepat kecepatan download aset gambar.',
                    'Menjamin kerahasiaan (confidentiality) dan integritas data antara browser dan server dari penyadapan pihak ketiga.',
                    'Menghapus kebutuhan akan backend server.',
                    'Menggantikan fungsi database relasional.'
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'TLS (Transport Layer Security) mengenkripsi saluran komunikasi TCP sehingga data sensitif seperti password dan session cookie tidak dapat dibaca atau dimanipulasi oleh penyadap di jaringan.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'eng-lvl-2',
      title: 'Stage 02 — Software Engineering Fundamentals',
      description: 'Sebuah program yang berjalan sukses belum tentu merupakan software yang baik. Pelajari clean code, modularitas, error handling, dan konfigurasi lingkungan.',
      modules: [
        {
          id: 'eng-mod-cleancode',
          title: 'Clean Code & Separation of Concerns',
          description: 'Struktur kode yang mudah dibaca rekan tim, mudah diuji, dan tidak mudah rusak saat diperluas.',
          lessons: [
            {
              id: 'eng-les-modular-arch',
              title: 'Prinsip Modularitas & Clean Architecture',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'typescript',
                  code: `// ❌ Kode Buruk (Terkopling dan Hardcoded Secret)
function handleSignup(req: any) {
  const dbPass = "admin12345"; // BAHAYA: Hardcoded credential
  if (!req.body.email.includes("@")) return "Error";
  // Campur query database dan kirim email di satu tempat...
}

// ✅ Kode Bersih (Separation of Concerns & Env Config)
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
              id: 'eng-les-git-workflow',
              title: 'Git Workflow, Branching & Semantic Versioning',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
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
      id: 'eng-lvl-3',
      title: 'Stage 03 — Testing & Quality Assurance (QA)',
      description: 'Siklus hidup: Code -> Test -> Fail -> Debug -> Fix -> Test Again. Kuasai unit test, integration test, assertions, dan edge cases.',
      modules: [
        {
          id: 'eng-mod-testing',
          title: 'Unit Testing, Assertions & Test Coverage',
          description: 'Mengapa software profesional wajib memiliki automated safety net sebelum dideploy.',
          lessons: [
            {
              id: 'eng-les-test-pyramid',
              title: 'Piramida Pengujian & Mentalitas QA',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
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
CODE ──> TEST ──> FAIL ──> DEBUG (Cari Akar Masalah) ──> FIX ──> TEST AGAIN (Verifikasi Hijau)
\`\`\``
                },
                {
                  type: 'code-example',
                  language: 'typescript',
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
              id: 'eng-quiz-testing',
              title: 'Kuis Kualitas & Pengujian Software',
              type: 'quiz',
              xpReward: 25,
              questions: [
                {
                  id: 'tq-1',
                  question: 'Apa yang dimaksud dengan "Regression Testing" dalam rekayasa software?',
                  options: [
                    'Menulis ulang seluruh aplikasi dari awal menggunakan bahasa baru.',
                    'Menjalankan kembali kumpulan tes yang ada untuk memastikan bahwa perbaikan bug atau fitur baru tidak merusak fungsionalitas yang sebelumnya berjalan lancar.',
                    'Menguji aplikasi tanpa dokumentasi sama sekali.',
                    'Hanya menguji antarmuka visual CSS di browser lama.'
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'Regression testing memastikan bahwa perubahan kode terbaru tidak secara tidak sengaja memicu bug baru pada fitur-fitur yang sudah terbukti stabil sebelumnya.'
                },
                {
                  id: 'tq-2',
                  question: 'Manakah contoh pengujian "Negative Testing" atau "Edge Case"?',
                  options: [
                    'Menginputkan nama dan email yang valid pada form registrasi.',
                    'Menginputkan string kosong, karakter unicode berlebih, atau angka negatif pada form transaksi untuk memastikan sistem menolaknya secara anggun.',
                    'Menekan tombol submit hanya sekali saat koneksi internet sempurna.',
                    'Mengisi password dengan kombinasi huruf besar dan angka sesuai aturan.'
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'Negative testing menguji bagaimana sistem merespons input yang salah, tidak valid, atau ekstrem (edge cases) untuk mencegah crash atau celah keamanan tak terduga.'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
