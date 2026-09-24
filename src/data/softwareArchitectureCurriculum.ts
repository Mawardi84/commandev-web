import { Course } from '../types';

export const SOFTWARE_ARCHITECTURE_COURSE: Course = {
  id: 'software-architecture',
  title: 'Software Architecture & System Design',
  shortDescription: 'Learn how to design maintainable, scalable, reliable, secure, and production-ready software systems using software architecture, system design, distributed systems, APIs, databases, caching, messaging, scalability, resilience, observability, and architectural decision-making.',
  description: 'Kurikulum komprehensif end-to-end yang membawa learner dari dasar arsitektur perangkat lunak, prinsip desain, modularitas, Clean Architecture, Domain-Driven Design (DDD), API design, arsitektur database & caching, message queues, sistem terdistribusi, microservices, skalabilitas, ketahanan (resilience), keamanan, hingga perancangan sistem skala besar produksi.',
  icon: 'layers',
  levels: [
    {
      id: 'sa-lvl-1',
      title: 'Level 1 — Foundations, Principles & Modularity',
      description: 'Pengenalan arsitektur perangkat lunak, rekayasa kebutuhan, trade-off, prinsip desain (SOLID), dan modularitas.',
      modules: [
        {
          id: 'software-architecture-m01',
          title: 'Module 1 — Introduction to Software Architecture',
          description: 'Definisi arsitektur, perbedaan arsitektur vs desain, peran arsitek, dan SQuaT (Software Quality Attributes).',
          lessons: [
            {
              id: 'sa-l-01-1',
              title: 'Apa itu Software Architecture & Atribut Kualitas (NFRs)',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### 1. Definisi Arsitektur Perangkat Lunak
Arsitektur perangkat lunak adalah sekumpulan keputusan struktural mendasar mengenai sistem perangkat lunak, mencakup elemen-elemen struktural, hubungan antar elemen, serta panduan evolusi sistem tersebut.

### 2. Non-Functional Requirements (NFRs) / Quality Attributes
Arsitek berfokus pada atribut kualitas seperti:
- **Maintainability:** Seberapa mudah sistem dimodifikasi.
- **Scalability:** Kemampuan menangani pertumbuhan beban.
- **Reliability & Availability:** Keandalan dan ketersediaan tinggi.
- **Security:** Perlindungan data dan sistem dari ancaman.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Contoh evaluasi arsitektur berdasarkan trade-off atribut kualitas
interface ArchitecturalTradeOff {
  qualityAttribute: 'Performance' | 'Maintainability' | 'Cost';
  priority: 'High' | 'Medium' | 'Low';
  compromise: string;
}`
                }
              ]
            },
            {
              id: 'sa-l-01-2',
              title: 'Kuis Module 1 — Introduction to Software Architecture',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-01-1',
                  question: 'Apa perbedaan mendasar antara Fungsional Requirements dan Non-Fungsional Requirements (NFRs)?',
                  options: [
                    'Fungsional mendefinisikan apa yang dilakukan sistem (fitur), NFR mendefinisikan bagaimana kualitas sistem beroperasi (kinerja, keamanan)',
                    'Fungsional untuk database, NFR untuk UI',
                    'Fungsional tidak penting',
                    'Tidak ada perbedaan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Fungsional adalah fitur bisnis, NFR adalah atribut kualitas operasional sistem.'
                },
                {
                  id: 'sa-q-01-2',
                  question: 'Mengapa keputusan arsitektur di awal proyek dianggap sangat mahal jika diubah di kemudian hari?',
                  options: [
                    'Karena keputusan struktural mengikat seluruh komponen dan kode dasar yang sudah dibangun',
                    'Karena harga komputer mahal',
                    'Karena dilarang undang-undang',
                    'Karena tidak ada hubungannya dengan kode'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Perubahan arsitektur mendasar berdampak luas pada seluruh sistem.'
                },
                {
                  id: 'sa-q-01-3',
                  question: 'Apa peran utama seorang Software Architect?',
                  options: [
                    'Membuat keputusan struktural kritis, menyelaraskan kebutuhan bisnis dengan teknologi, dan mengurangi risiko teknis',
                    'Hanya menulis kode HTML dasar',
                    'Mengelola keuangan perusahaan',
                    'Memperbaiki printer kantor'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Arsitek menjembatani strategi bisnis dan eksekusi teknis.'
                },
                {
                  id: 'sa-q-01-4',
                  question: 'Manakah yang termasuk ke dalam atribut kualitas (NFR) sistem perangkat lunak?',
                  options: ['Maintainability, Scalability, Security, Reliability', 'Warna latar tombol', 'Jumlah baris komentar', 'Nama pembuat aplikasi'],
                  correctAnswerIndex: 0,
                  explanation: 'Maintainability, scalability, security, dan reliability adalah contoh utama NFR.'
                },
                {
                  id: 'sa-q-01-5',
                  question: 'Apa arti dari pepatah "All architecture is design, but not all design is architecture"?',
                  options: [
                    'Arsitektur mencakup keputusan desain level tertinggi yang sulit diubah, sementara desain juga mencakup detail tingkat rendah',
                    'Desain lebih penting dari arsitektur',
                    'Arsitektur hanya untuk bangunan fisik',
                    'Keduanya sama persis'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Arsitektur adalah subset keputusan desain yang memiliki bobot struktural tertinggi.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m02',
          title: 'Module 2 — Requirements Engineering',
          description: 'Menerjemahkan kebutuhan bisnis, analisis batasan sistem, dan spesifikasi arsitektur.',
          lessons: [
            {
              id: 'sa-l-02-1',
              title: 'Dari Kebutuhan Bisnis ke Spesifikasi Arsitektur',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### Menjembatani Bisnis dan Teknologi
Seorang arsitek harus mampu mengubah metrik bisnis (misal: "mampu menampung 100.000 transaksi saat flash sale") menjadi spesifikasi teknis terukur (misal: latensi < 200ms, throughput 5000 RPS).`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `interface SystemRequirement {
  businessGoal: string;
  technicalMetric: string;
  targetValue: number;
  unit: string;
}`
                }
              ]
            },
            {
              id: 'sa-l-02-2',
              title: 'Kuis Module 2 — Requirements Engineering',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-02-1',
                  question: 'Bagaimana cara seorang arsitek menerjemahkan tujuan bisnis "aplikasi harus cepat" menjadi spesifikasi teknis?',
                  options: [
                    'Menetapkan metrik terukur seperti 99% request HTTP selesai dalam waktu kurang dari 200 milidetik (p99 < 200ms)',
                    'Menyuruh komputer bekerja lebih keras',
                    'Mengganti monitor developer',
                    'Menghapus fitur animasi'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Spesifikasi teknis harus kuantitatif dan terukur.'
                },
                {
                  id: 'sa-q-02-2',
                  question: 'Apa itu batasan (constraints) dalam rekayasa kebutuhan sistem?',
                  options: [
                    'Faktor pembatas eksternal atau internal yang tidak dapat ditawar (misal: anggaran, tenggat waktu, kepatuhan hukum)',
                    'Saran opsional dari tim',
                    'Bug dalam kode',
                    'Kecepatan internet'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Constraints adalah batas kaku yang wajib dipatuhi dalam perancangan.'
                },
                {
                  id: 'sa-q-02-3',
                  question: 'Mengapa analisis beban puncak (*peak load*) sangat penting dalam perancangan sistem?',
                  options: [
                    'Mencegah sistem mengalami *crash* atau *bottleneck* saat lonjakan trafik bisnis terjadi',
                    'Agar server terlihat sibuk',
                    'Menaikkan tagihan cloud',
                    'Tidak penting'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Perancangan kapasitas harus merujuk pada beban puncak, bukan rata-rata.'
                },
                {
                  id: 'sa-q-02-4',
                  question: 'Apa itu Use Case dalam pemodelan kebutuhan sistem?',
                  options: [
                    'Deskripsi interaksi antara aktor (pengguna/sistem lain) dengan sistem untuk mencapai tujuan bisnis tertentu',
                    'Kode program utama',
                    'Skema tabel database',
                    'Laporan keuangan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Use case memetakan fungsionalitas dari sudut pandang pengguna.'
                },
                {
                  id: 'sa-q-02-5',
                  question: 'Apa bahaya utama dari kebutuhan fungsional yang tidak jelas (*ambiguous requirements*) di awal proyek?',
                  options: [
                    'Kesalahan penafsiran arsitektur yang berujung pada pembangunan sistem yang salah dan biaya ulang yang masif',
                    'Kode menjadi lebih rapi',
                    'Mempercepat rilis',
                    'Tidak ada dampak'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Kebutuhan yang kabur menghasilkan arsitektur yang keliru sasaran.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m03',
          title: 'Module 3 — System Constraints & Trade-offs',
          description: 'Analisis trade-off, hukum arsitektur, dan pengambilan keputusan berbasis bukti.',
          lessons: [
            {
              id: 'sa-l-03-1',
              title: 'Seni Mengambil Keputusan & Analisis Trade-off',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Tidak Ada Solusi Perak (No Silver Bullet)
Setiap keputusan arsitektur selalu melibatkan kompromi. Meningkatkan keamanan (*security*) sering kali mengorbankan kemudahan penggunaan (*usability*) atau kecepatan pengembangan.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// ADTs (Architectural Decision Records) struktur sederhana
interface ADR {
  id: string;
  title: string;
  status: 'Proposed' | 'Accepted' | 'Deprecated';
  context: string;
  decision: string;
  consequences: string;
}`
                }
              ]
            },
            {
              id: 'sa-l-03-2',
              title: 'Kuis Module 3 — System Constraints & Trade-offs',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-03-1',
                  question: 'Apa arti prinsip "There is no silver bullet" dalam arsitektur perangkat lunak?',
                  options: [
                    'Tidak ada satu teknologi atau pola arsitektur tunggal yang dapat menyelesaikan semua masalah tanpa kompromi',
                    'Semua bahasa pemograman sama hebatnya',
                    'Peluru perak membunuh bug',
                    'Arsitektur tidak butuh keputusan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Setiap pilihan teknologi membawa kelebihan dan konsekuensi negatifnya sendiri.'
                },
                {
                  id: 'sa-q-03-2',
                  question: 'Apa fungsi dari dokumen ADR (Architectural Decision Record)?',
                  options: [
                    'Merekam konteks, alasan keputusan arsitektur penting, dan konsekuensinya agar dapat ditinjau di masa depan',
                    'Menyimpan password server',
                    'Mencatat daftar hadir karyawan',
                    'Menulis laporan laba rugi'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'ADR mendokumentasikan "mengapa" sebuah keputusan arsitektur diambil.'
                },
                {
                  id: 'sa-q-03-3',
                  question: 'Jika kita memilih konsistensi kuat (Strong Consistency) dalam sistem terdistribusi, apa trade-off utamanya?',
                  options: [
                    'Ketersediaan (Availability) atau latensi respons mungkin menurun karena koordinasi node yang ketat',
                    'Sistem menjadi gratis',
                    'Kecepatan meningkat drastis tanpa batas',
                    'Tidak ada trade-off'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Teorema CAP menunjukkan kompromi antara konsistensi dan ketersediaan.'
                },
                {
                  id: 'sa-q-03-4',
                  question: 'Mengapa evaluasi trade-off harus didasarkan pada konteks bisnis alih-alih tren teknologi semata?',
                  options: [
                    'Karena kebutuhan unik setiap perusahaan (skala, anggaran, domain) berbeda; apa yang bagus di Netflix belum tentu cocok untuk startup kecil',
                    'Tren teknologi selalu salah',
                    'Bisnis tidak paham teknologi',
                    'Agar developer tidak bosan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Konteks bisnis menentukan validitas pilihan arsitektural.'
                },
                {
                  id: 'sa-q-03-5',
                  question: 'Apa yang dimaksud dengan Technical Debt (Utang Teknis) dalam keputusan arsitektur?',
                  options: [
                    'Konsekuensi dari mengambil jalan pintas desain di masa lalu untuk kecepatan, yang harus dibayar dengan biaya perbaikan lebih tinggi di masa depan',
                    'Pinjaman bank untuk membeli server',
                    'Gaji developer yang tertunda',
                    'Pajak lisensi software'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Pintasan arsitektur menumpuk utang teknis yang membebani evolusi sistem.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m04',
          title: 'Module 4 — Software Design Principles',
          description: 'SOLID principles, DRY, KISS, YAGNI, dan prinsip kopling serta kohesi.',
          lessons: [
            {
              id: 'sa-l-04-1',
              title: 'Prinsip SOLID & Hubungannya dengan Arsitektur',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Prinsip SOLID
- **S (Single Responsibility):** Satu kelas/modul hanya memiliki satu alasan untuk berubah.
- **O (Open/Closed):** Terbuka untuk ekstensi, tertutup untuk modifikasi.
- **L (Liskov Substitution):** Subtipe harus dapat menggantikan tipe dasarnya.
- **I (Interface Segregation):** Klien tidak boleh dipaksa bergantung pada antarmuka yang tidak mereka gunakan.
- **D (Dependency Inversion):** Bergantung pada abstraksi, bukan pada implementasi konkret.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Contoh Dependency Inversion Principle (DIP)
interface Logger {
  log(message: string): void;
}

class OrderService {
  constructor(private logger: Logger) {} // Bergantung pada abstraksi

  createOrder() {
    this.logger.log("Order created.");
  }
}`
                }
              ]
            },
            {
              id: 'sa-l-04-2',
              title: 'Kuis Module 4 — Software Design Principles',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-04-1',
                  question: 'Apa arti dari prinsip Single Responsibility Principle (SRP) dalam SOLID?',
                  options: [
                    'Sebuah modul atau kelas harus memiliki tanggung jawab atas satu bagian fungsionalitas saja, dan hanya memiliki satu alasan untuk berubah',
                    'Satu program hanya boleh punya satu file',
                    'Satu fungsi hanya boleh 1 baris',
                    'Satu user per aplikasi'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'SRP membatasi cakupan perubahan pada satu alasan tunggal.'
                },
                {
                  id: 'sa-q-04-2',
                  question: 'Apa tujuan utama dari Dependency Inversion Principle (DIP)?',
                  options: [
                    'Memisahkan modul tingkat tinggi dari modul tingkat rendah dengan mengandalkan antarmuka (abstraksi) bersama',
                    'Membalikkan urutan kode',
                    'Menghapus semua dependensi',
                    'Membuat kode berjalan terbalik'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'DIP mengurangi kopling erat antar modul melalui abstraksi.'
                },
                {
                  id: 'sa-q-04-3',
                  question: 'Apa arti prinsip YAGNI (You Aren\'t Gonna Need It)?',
                  options: [
                    'Jangan membangun fungsionalitas atau kompleksitas arsitektur sebelum benar-benar dibutuhkan saat ini',
                    'Jangan menulis kode sama sekali',
                    'Selalu buat fitur sebanyak mungkin',
                    'Abaikan semua test'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'YAGNI mencegah over-engineering yang tidak perlu.'
                },
                {
                  id: 'sa-q-04-4',
                  question: 'Apa arti prinsip DRY (Don\'t Repeat Yourself)?',
                  options: [
                    'Setiap bagian pengetahuan atau logika bisnis harus memiliki representasi tunggal, tak ambigu, dan otoritatif dalam sistem',
                    'Jangan mengetik kata yang sama dua kali',
                    'Hapus semua fungsi',
                    'Gunakan bahasa inggris'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'DRY mengurangi duplikasi logika dan risiko inkonsistensi.'
                },
                {
                  id: 'sa-q-04-5',
                  question: 'Apa definisi kopling (coupling) dan kohesi (cohesion) yang ideal dalam desain sistem?',
                  options: [
                    'Kopling rendah (low coupling) antar modul dan kohesi tinggi (high cohesion) di dalam modul',
                    'Kopling tinggi dan kohesi rendah',
                    'Keduanya tinggi',
                    'Keduanya rendah'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Desain optimal menuntut kopling rendah dan kohesi tinggi.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m05',
          title: 'Module 5 — Modularity & Separation of Concerns',
          description: 'Prinsip modularitas, pemisahan tanggung jawab, dan manajemen batas komponen.',
          lessons: [
            {
              id: 'sa-l-05-1',
              title: 'Batas Modular & Pemisahan Tanggung Jawab',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Mengapa Modularitas Penting?
Modularitas memecah sistem kompleks menjadi bagian-bagian kecil yang mandiri. Batas modul yang jelas (*modular boundaries*) mencegah efek riak (*ripple effects*) saat terjadi perubahan.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Contoh struktur modular terisolasi
// /modules/billing/
//   - billing.controller.ts
//   - billing.service.ts
//   - billing.repository.ts`
                }
              ]
            },
            {
              id: 'sa-l-05-2',
              title: 'Kuis Module 5 — Modularity & Separation of Concerns',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-05-1',
                  question: 'Apa manfaat utama dari menetapkan batas modular (*modular boundaries*) yang tegas?',
                  options: [
                    'Perubahan pada satu modul tidak merembes atau merusak modul lain (membatasi ripple effects)',
                    'Membuat file program lebih banyak',
                    'Memperlambat kinerja kompiler',
                    'Menghapus kebutuhan testing'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Batas modular yang tegas meredam dampak perubahan kode.'
                },
                {
                  id: 'sa-q-05-2',
                  question: 'Apa arti dari prinsip Separation of Concerns (SoC)?',
                  options: [
                    'Membagi program menjadi bagian-bagian terpisah di mana setiap bagian menangani aspek masalah yang berbeda (misal: UI terpisah dari logika bisnis)',
                    'Memisahkan developer ke ruangan berbeda',
                    'Menghapus semua fungsi',
                    'Membuat database terpisah untuk tiap baris'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'SoC mengisolasi perhatian yang berbeda ke dalam modul tersendiri.'
                },
                {
                  id: 'sa-q-05-3',
                  question: 'Apa tanda bahwa sebuah sistem mengalami "Spaghetti Code" dari sudut pandang modularitas?',
                  options: [
                    'Dependensi antar komponen saling terkait erat tanpa aturan yang jelas, sehingga melacak alur eksekusi sangat sulit',
                    'Kode ditulis dalam bahasa Italia',
                    'File terlalu sedikit',
                    'Tidak ada error'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Spaghetti code ditandai oleh kopling tinggi yang kusut.'
                },
                {
                  id: 'sa-q-05-4',
                  question: 'Bagaimana cara modul berinteraksi secara sehat dalam arsitektur modular?',
                  options: [
                    'Melalui API publik atau kontrak antarmuka yang jelas, bukan mengakses detail internal secara langsung',
                    'Mengubah variabel global',
                    'Menghapus enkapsulasi',
                    'Menggunakan database bersama secara langsung'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Enkapsulasi dan antarmuka publik menjaga integritas modular.'
                },
                {
                  id: 'sa-q-05-5',
                  question: 'Apa itu Information Hiding dalam desain modular?',
                  options: [
                    'Menyembunyikan detail implementasi internal di dalam modul dan hanya mengekspos apa yang diperlukan via antarmuka',
                    'Menyembunyikan password di file teks',
                    'Tidak menulis dokumentasi',
                    'Mengunci kode dari developer'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Information hiding melindungi detail internal agar tidak bergantung pada pihak luar.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'sa-lvl-2',
      title: 'Level 2 — Architectural Styles & Patterns (Layers, Clean, Hexagonal & DDD)',
      description: 'Mendalami gaya arsitektur klasik dan modern: Layered, Clean Architecture, Hexagonal, dan Domain-Driven Design.',
      modules: [
        {
          id: 'software-architecture-m06',
          title: 'Module 6 — Layered Architecture',
          description: 'N-Tier architecture, presentation, business logic, persistence layers, dan strict layering.',
          lessons: [
            {
              id: 'sa-l-06-1',
              title: 'Arsitektur Berlapis (N-Tier / Layered Architecture)',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Struktur N-Tier
1. **Presentation Layer:** Antarmuka pengguna / API controllers.
2. **Business Logic Layer (Domain):** Aturan bisnis aplikasi.
3. **Persistence / Data Access Layer:** Komunikasi database.
*Prinsip utama:* Lapisan hanya boleh memanggil lapisan di bawahnya.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Contoh aliran Strict Layered: Controller -> Service -> Repository
class UserController {
  constructor(private userService: UserService) {}
  getUser(id: string) { return this.userService.get(id); }
}`
                }
              ]
            },
            {
              id: 'sa-l-06-2',
              title: 'Kuis Module 6 — Layered Architecture',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-06-1',
                  question: 'Apa aturan akses utama dalam Strict Layered Architecture (Arsitektur Berlapis)?',
                  options: [
                    'Sebuah lapisan hanya boleh memanggil lapisan yang berada persis di bawahnya (atau lapisan bawah manapun dalam relaxed layering)',
                    'Lapisan bawah boleh memanggil lapisan atas',
                    'Semua lapisan saling memanggil bebas',
                    'Lapisan UI langsung mengakses database'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Lapisan diatur secara hierarkis satu arah ke bawah.'
                },
                {
                  id: 'sa-q-06-2',
                  question: 'Apa kelemahan umum dari arsitektur N-Tier klasik jika tidak dirancang dengan hati-hati?',
                  options: [
                    'Kecenderungan logika bisnis merembes ke lapisan UI atau database (tight coupling dan anemic domain model)',
                    'Terlalu cepat dieksekusi',
                    'Terlalu sedikit file',
                    'Tidak bisa pakai database SQL'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'N-Tier rentan terhadap kebocoran tanggung jawab antar lapisan.'
                },
                {
                  id: 'sa-q-06-3',
                  question: 'Apa fungsi dari Persistence Layer dalam arsitektur berlapis?',
                  options: [
                    'Mengenkapsulasi seluruh operasi penyimpanan dan pengambilan data dari database atau sistem berkas',
                    'Menggambar tombol di layar',
                    'Menghitung pajak bisnis',
                    'Mengatur rute jaringan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Persistence layer mengisolasi detail akses database.'
                },
                {
                  id: 'sa-q-06-4',
                  question: 'Apa itu Relaxed Layered Architecture?',
                  options: [
                    'Arsitektur berlapis di mana sebuah lapisan diperbolehkan memanggil lapisan lain di bawahnya secara tidak langsung (tidak harus persis di bawahnya)',
                    'Arsitektur tanpa aturan',
                    'Arsitektur untuk game',
                    'Arsitektur yang sudah usang'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Relaxed layering memperbolehkan bypass lapisan perantara demi efisiensi.'
                },
                {
                  id: 'sa-q-06-5',
                  question: 'Mengapa arsitektur berlapis sangat populer dan mudah dipahami oleh tim pemula?',
                  options: [
                    'Karena pemetaan tanggung jawabnya sangat intuitif dan sejajar dengan struktur tim (UI, Backend, DB)',
                    'Karena gratis',
                    'Karena tidak butuh testing',
                    'Karena otomatis menjadi microservices'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Struktur berlapis sangat natural dipelajari untuk aplikasi monolitik.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m07',
          title: 'Module 7 — Clean Architecture',
          description: 'Entities, use cases, interface adapters, framework drivers, dan Dependency Rule.',
          lessons: [
            {
              id: 'sa-l-07-1',
              title: 'The Dependency Rule dalam Clean Architecture',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### The Dependency Rule
Kode sumber **harus menunjuk ke dalam (toward inward)**. Lingkaran dalam tidak boleh tahu apa-apa tentang lingkaran luar.
1. Entities (Enterprise Business Rules)
2. Use Cases (Application Business Rules)
3. Interface Adapters (Controllers, Gateways, Presenters)
4. Frameworks & Drivers (DB, Web, UI)`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Use Case murni tanpa ketergantungan framework web atau database
class RegisterUserUseCase {
  constructor(private userRepo: UserRepository) {}
  execute(req: RegisterRequest) {
    // Logika bisnis murni
  }
}`
                }
              ]
            },
            {
              id: 'sa-l-07-2',
              title: 'Kuis Module 7 — Clean Architecture',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-07-1',
                  question: 'Apa inti dari The Dependency Rule dalam Clean Architecture (Robert C. Martin)?',
                  options: [
                    'Ketergantungan kode sumber hanya boleh menunjuk ke arah dalam (lingkaran dalam tidak boleh bergantung pada lingkaran luar)',
                    'Lingkaran dalam bergantung pada database luar',
                    'Framework web adalah pusat arsitektur',
                    'Tidak boleh ada dependensi sama sekali'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Aturan dependensi menjaga agar logika bisnis murni dari efek samping framework.'
                },
                {
                  id: 'sa-q-07-2',
                  question: 'Di mana letak aturan bisnis inti (Enterprise Business Rules) dalam Clean Architecture?',
                  options: ['Entities (lingkaran paling dalam)', 'Frameworks & Drivers (lingkaran luar)', 'UI Controller', 'Database SQL'],
                  correctAnswerIndex: 0,
                  explanation: 'Entities berada di inti terdalam dan paling independen.'
                },
                {
                  id: 'sa-q-07-3',
                  question: 'Mengapa Clean Architecture membuat aplikasi mudah diuji (*testable*)?',
                  options: [
                    'Karena Use Cases dan Entities dapat diuji unit tanpa harus menyalakan database atau server web',
                    'Karena menggunakan framework khusus testing',
                    'Karena tes dilakukan otomatis oleh AI',
                    'Tidak bisa diuji'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Isolasi logika bisnis memungkinkan unit testing secepat kilat.'
                },
                {
                  id: 'sa-q-07-4',
                  question: 'Apa peran Interface Adapters dalam Clean Architecture?',
                  options: [
                    'Mengubah data dari format yang paling nyaman untuk Use Cases/Entities ke format yang nyaman untuk external agency (DB/Web) dan sebaliknya',
                    'Menggambar tombol UI',
                    'Menyimpan password',
                    'Mengatur rute DNS'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Adapters menerjemahkan data antar lingkaran dalam dan luar.'
                },
                {
                  id: 'sa-q-07-5',
                  question: 'Apa keuntungan utama menunda keputusan framework atau database dalam Clean Architecture?',
                  options: [
                    'Tim dapat fokus merancang logika bisnis murni terlebih dahulu tanpa terikat batasan vendor tertentu',
                    'Proyek menjadi lebih lambat',
                    'Wajib menggunakan bahasa C++',
                    'Tidak ada keuntungan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Menunda detail teknis menjaga independensi arsitektur.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m08',
          title: 'Module 8 — Hexagonal Architecture',
          description: 'Ports and adapters, driving/inbound ports, driven/outbound ports, dan decoupling.',
          lessons: [
            {
              id: 'sa-l-08-1',
              title: 'Ports & Adapters (Hexagonal Architecture)',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Ports and Adapters
Hexagonal Architecture (Alistair Cockburn) memisahkan inti aplikasi dari perangkat eksternal melalui **Ports** (antarmuka/interface) dan **Adapters** (implementasi konkret untuk web, DB, CLI).`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Outbound Port (Interface)
interface PaymentPort {
  charge(amount: number): Promise<boolean>;
}
// Outbound Adapter (Implementasi Stripe)
class StripeAdapter implements PaymentPort {
  async charge(amount: number) { /* ... */ return true; }
}`
                }
              ]
            },
            {
              id: 'sa-l-08-2',
              title: 'Kuis Module 8 — Hexagonal Architecture',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-08-1',
                  question: 'Apa tujuan utama dari Hexagonal Architecture (Ports and Adapters)?',
                  options: [
                    'Memungkinkan aplikasi didorong atau digerakkan secara setara oleh pengguna, program, test, atau skrip dengan mengisolasi inti via port dan adapter',
                    'Membuat bentuk aplikasi bersegi enam',
                    'Menggunakan bahasa pemrograman hexagonal',
                    'Mengurangi jumlah baris kode'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Hexagonal architecture mengisolasi domain dari teknologi luar.'
                },
                {
                  id: 'sa-q-08-2',
                  question: 'Apa perbedaan antara Inbound Port (Driving) dan Outbound Port (Driven)?',
                  options: [
                    'Inbound port adalah pintu masuk yang dipanggil aktor luar (UI/API), Outbound port adalah pintu keluar yang dipanggil aplikasi ke luar (DB/API eksternal)',
                    'Keduanya sama persis',
                    'Inbound untuk database',
                    'Outbound untuk login'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Inbound digerakkan oleh luar, outbound menggerakkan luar.'
                },
                {
                  id: 'sa-q-08-3',
                  question: 'Apa peran Adapter dalam pola Hexagonal?',
                  options: [
                    'Penerjemah teknologi luar (seperti HTTP REST atau driver SQL) menjadi panggilan port yang dipahami domain inti',
                    'Menyimpan file konfigurasi',
                    'Mengatur RAM',
                    'Membuat server baru'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Adapters menjembatani dunia luar dengan port internal.'
                },
                {
                  id: 'sa-q-08-4',
                  question: 'Mengapa arsitektur ini disebut "Hexagonal"?',
                  options: [
                    'Hanya sebagai metafora visual (angka enam tidak memiliki arti matematis khusus) untuk menggambarkan banyak titik batas interaksi',
                    'Karena wajib memiliki 6 database',
                    'Karena dibuat oleh 6 orang',
                    'Karena bentuk kodenya kubus'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Bentuk segi enam hanyalah konvensi visual untuk menunjukkan banyak antarmuka.'
                },
                {
                  id: 'sa-q-08-5',
                  question: 'Bagaimana Hexagonal Architecture memudahkan pengujian integrasi dengan database?',
                  options: [
                    'Kita dapat dengan mudah membuat Mock/Stub Adapter untuk port database tanpa menyalakan database sungguhan',
                    'Database tidak boleh diuji',
                    'Harus selalu pakai database asli',
                    'Tidak ada hubungannya'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Port memungkinkan substitusi adapter tiruan (mock) dengan mudah.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m09',
          title: 'Module 9 — Domain-Driven Design Fundamentals',
          description: 'Ubiquitous language, bounded contexts, entities, value objects, dan domain events.',
          lessons: [
            {
              id: 'sa-l-09-1',
              title: 'Ubiquitous Language & Bounded Contexts',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Bahasa Sehari-hari yang Konsisten (Ubiquitous Language)
DDD (Eric Evans) menekankan penggunaan istilah bisnis yang sama persis baik dalam percakapan dengan domain expert maupun dalam penamaan kelas dan fungsi di kode.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Contoh Value Object (Immutable & Self-validating)
class Money {
  constructor(public readonly amount: number, public readonly currency: string) {
    if (amount < 0) throw new Error("Amount cannot be negative");
  }
}`
                }
              ]
            },
            {
              id: 'sa-l-09-2',
              title: 'Kuis Module 9 — Domain-Driven Design Fundamentals',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-09-1',
                  question: 'Apa itu Ubiquitous Language dalam Domain-Driven Design (DDD)?',
                  options: [
                    'Bahasa dan istilah bisnis bersama yang digunakan secara konsisten oleh domain expert dan developer dalam kode maupun komunikasi',
                    'Bahasa pemrograman khusus DDD',
                    'Bahasa Inggris standar',
                    'Bahasa gaul kantor'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Ubiquitous language menyamakan kosa kata bisnis dan kode.'
                },
                {
                  id: 'sa-q-09-2',
                  question: 'Apa definisi dari Bounded Context dalam DDD?',
                  options: [
                    'Batasan eksplisit di mana sebuah model domain tertentu berlaku valid dan konsisten',
                    'Batas ukuran file kode',
                    'Kapasitas server database',
                    'Jam kerja tim'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Bounded context membatasi ruang lingkup validitas model domain.'
                },
                {
                  id: 'sa-q-09-3',
                  question: 'Apa perbedaan utama antara Entity dan Value Object dalam DDD?',
                  options: [
                    'Entity memiliki identitas unik yang bertahan sepanjang waktu, Value Object didefinisikan sepenuhnya oleh atribut nilainya dan bersifat immutable',
                    'Entity lebih cepat dari Value Object',
                    'Value Object tidak bisa dipakai di TypeScript',
                    'Tidak ada bedanya'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Entity dibedakan oleh ID, Value Object dibedakan oleh nilai isinya.'
                },
                {
                  id: 'sa-q-09-4',
                  question: 'Apa itu Domain Event dalam DDD?',
                  options: [
                    'Representasi objek dari sesuatu yang penting dan bermakna bisnis yang telah terjadi di dalam domain',
                    'Kejadian server mati',
                    'Klik tombol mouse pengguna',
                    'Jadwal meeting harian'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Domain event merekam fakta penting bisnis yang sudah terjadi.'
                },
                {
                  id: 'sa-q-09-5',
                  question: 'Mengapa DDD sangat cocok untuk sistem perusahaan berskala besar yang kompleks?',
                  options: [
                    'Karena memfokuskan kompleksitas langsung pada pemodelan inti masalah bisnis (*domain*) alih-alih detail teknis semata',
                    'Karena membuat kode menjadi sangat singkat',
                    'Karena gratis',
                    'Karena tidak butuh database'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'DDD menjinakkan kompleksitas domain bisnis yang rumit.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m10',
          title: 'Module 10 — Domain Modeling & Bounded Contexts',
          description: 'Aggregates, aggregate roots, repositories, domain services, dan context mapping.',
          lessons: [
            {
              id: 'sa-l-10-1',
              title: 'Aggregates & Aggregate Roots',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Aggregate & Aggregate Root
Aggregate adalah kluster objek domain yang diperlakukan sebagai satu unit tunggal untuk perubahan data. **Aggregate Root** adalah satu-satunya entitas pintu gerbang luar untuk mengakses aggregate tersebut.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Contoh Aggregate Root (Order)
class Order {
  private items: OrderItem[] = [];
  
  addItem(product: Product, quantity: number) {
    // Inovasi aturan bisnis di dalam aggregate
    this.items.push(new OrderItem(product, quantity));
  }
}`
                }
              ]
            },
            {
              id: 'sa-l-10-2',
              title: 'Kuis Module 10 — Domain Modeling & Bounded Contexts',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-09-6',
                  question: 'Apa peran dari Aggregate Root dalam pemodelan DDD?',
                  options: [
                    'Entitas khusus yang menjadi satu-satunya pintu masuk dan penjamin konsistensi internal untuk sekumpulan objek dalam satu aggregate',
                    'Akar pohon direktori file',
                    'Database utama sistem',
                    'User admin tertinggi'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Aggregate root mengontrol integritas konsistensi seluruh anggotanya.'
                },
                {
                  id: 'sa-q-09-7',
                  question: 'Apa itu Context Mapping dalam DDD?',
                  options: [
                    'Peta dokumentasi yang menggambarkan hubungan dan integrasi antar berbagai Bounded Context yang berbeda',
                    'Peta lokasi server fisik',
                    'Peta jaringan IP',
                    'Struktur tabel database'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Context mapping memetakan bagaimana batas-batas konteks saling berkomunikasi.'
                },
                {
                  id: 'sa-q-09-8',
                  question: 'Mengapa referensi antar aggregate sebaiknya menggunakan ID (Identity) alih-alih objek langsung?',
                  options: [
                    'Mencegah aggregate menjadi terlalu besar, menjaga batas transaksi tetap kecil, dan menghindari kopling erat',
                    'Agar memori komputer penuh',
                    'Wajib dalam JavaScript',
                    'Tidak ada alasan khusus'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Referensi via ID menjaga batasan transaksi aggregate tetap independen.'
                },
                {
                  id: 'sa-q-09-9',
                  question: 'Apa peran Domain Services dalam DDD?',
                  options: [
                    'Menampung operasi atau logika bisnis penting yang tidak secara alami berada di dalam satu Entitas atau Value Object tunggal',
                    'Menjalankan server web',
                    'Menghubungkan ke database SQL',
                    'Menggambar antarmuka'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Domain service menangani logika lintas entitas.'
                },
                {
                  id: 'sa-q-09-10',
                  question: 'Apa aturan transaksi utama dalam satu Aggregate DDD?',
                  options: [
                    'Satu transaksi database harus memodifikasi paling banyak satu aggregate',
                    'Satu transaksi boleh mengubah seluruh database sekaligus',
                    'Transaksi dilarang dalam DDD',
                    'Transaksi hanya untuk pembayaran'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Batasan konsistensi transaksional DDD berpusat pada satu aggregate.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'sa-lvl-3',
      title: 'Level 3 — API Architecture, Data & Communication Patterns',
      description: 'REST, GraphQL, Database Architecture, Caching, Messaging, dan Event-Driven Systems.',
      modules: [
        {
          id: 'software-architecture-m11',
          title: 'Module 11 — API Architecture',
          description: 'API design principles, versioning, pagination, idempotency, dan rate limiting.',
          lessons: [
            {
              id: 'sa-l-11-1',
              title: 'Idempotency & API Design Best Practices',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Apa itu Idempotency?
Sebuah operasi bersifat **idempotent** jika melakukan panggilan berkali-kali menghasilkan efek samping yang persis sama dengan satu panggilan (sangat penting untuk API pembayaran agar tidak ter-charge dua kali saat retry).`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Contoh header Idempotency Key
// POST /api/payments
// Headers: Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000`
                }
              ]
            },
            {
              id: 'sa-l-11-2',
              title: 'Kuis Module 11 — API Architecture',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-11-1',
                  question: 'Apa arti sifat Idempotent pada sebuah endpoint API?',
                  options: [
                    'Melakukan permintaan yang sama berulang kali menghasilkan efek samping yang persis sama seperti dilakukan sekali',
                    'Permintaan selalu gagal pada percobaan kedua',
                    'Hanya bisa dipanggil satu kali seumur hidup',
                    'Membutuhkan token khusus'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Idempotency menjamin keamanan retry saat gangguan jaringan.'
                },
                {
                  id: 'sa-q-11-2',
                  question: 'Metode HTTP mana yang secara standar didefinisikan bersifat Idempotent?',
                  options: ['GET, PUT, DELETE', 'POST', 'Semua metode', 'Tidak ada'],
                  correctAnswerIndex: 0,
                  explanation: 'GET, PUT, dan DELETE bersifat idempotent secara arsitektural.'
                },
                {
                  id: 'sa-q-11-3',
                  question: 'Mengapa pengelolaan versi API (*API Versioning*) sangat krusial dalam evolusi sistem?',
                  options: [
                    'Memungkinkan klien lama tetap berfungsi tanpa rusak saat backend merilis pembaruan atau perubahan kontrak',
                    'Agar URL terlihat panjang',
                    'Wajib dalam aturan HTTP',
                    'Tidak penting'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Versioning melindungi klien dari pemecahan kontrak mendadak.'
                },
                {
                  id: 'sa-q-11-4',
                  question: 'Apa fungsi dari Rate Limiting pada API Gateway?',
                  options: [
                    'Membatasi jumlah permintaan maksimum yang dapat dilakukan klien dalam rentang waktu tertentu untuk mencegah abuse dan DDoS',
                    'Mempercepat kecepatan internet',
                    'Menghapus data lama',
                    'Mengatur ukuran database'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Rate limiting melindungi backend dari beban berlebih dan serangan.'
                },
                {
                  id: 'sa-q-11-5',
                  question: 'Apa itu Cursor-based Pagination dibanding Offset-based Pagination untuk data skala besar?',
                  options: [
                    'Cursor menggunakan penanda posisi unik yang efisien dan stabil terhadap penambahan data baru, sedangkan offset lambat di data masif',
                    'Offset lebih modern',
                    'Keduanya sama persis',
                    'Cursor hanya untuk mouse'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Cursor-based pagination berkinerja stabil pada tabel database raksasa.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m12',
          title: 'Module 12 — REST API Design',
          description: 'RESTful constraints, resource modeling, status codes, dan HATEOAS.',
          lessons: [
            {
              id: 'sa-l-12-1',
              title: 'RESTful Constraints & Resource Modeling',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Prinsip REST (Representational State Transfer)
- Stateless communication.
- Resource-based URIs (misal: \`/users/{id}/orders\`).
- Penggunaan HTTP Status Codes yang tepat (200, 201, 400, 401, 404, 500).`
                },
                {
                  type: 'code-example',
                  language: 'json',
                  code: `// Respon REST standar
{
  "status": "success",
  "data": {
    "id": "ord_123",
    "total": 150000
  }
}`
                }
              ]
            },
            {
              id: 'sa-l-12-2',
              title: 'Kuis Module 12 — REST API Design',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-12-1',
                  question: 'Apa arti prinsip Stateless dalam arsitektur REST?',
                  options: [
                    'Setiap permintaan dari klien harus berisi semua informasi yang diperlukan untuk memahami dan memproses permintaan tersebut (server tidak menyimpan konteks sesi)',
                    'Server menyimpan status login di RAM',
                    'Klien tidak boleh pakai state',
                    'Tidak ada koneksi internet'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Statelessness memungkinkan skalabilitas horizontal server yang mudah.'
                },
                {
                  id: 'sa-q-12-2',
                  question: 'HTTP Status Code berapa yang paling tepat dikembalikan saat resource baru berhasil dibuat via POST?',
                  options: ['201 Created', '200 OK', '204 No Content', '400 Bad Request'],
                  correctAnswerIndex: 0,
                  explanation: '201 Created adalah kode standar untuk pembuatan resource baru.'
                },
                {
                  id: 'sa-q-12-3',
                  question: 'Bagaimana penamaan URI yang baik dalam pemodelan resource RESTful?',
                  options: ['Menggunakan kata benda jamak (plural nouns) seperti /users atau /orders', 'Menggunakan kata kerja seperti /getUsers atau /createOrder', 'Menggunakan huruf acak', 'Menggunakan format XML'],
                  correctAnswerIndex: 0,
                  explanation: 'Konvensi REST menggunakan kata benda jamak untuk merepresentasikan koleksi resource.'
                },
                {
                  id: 'sa-q-12-4',
                  question: 'Apa itu HATEOAS dalam REST?',
                  options: ['Hypermedia As The Engine Of Application State (menyertakan tautan navigasi aksi selanjutnya dalam respons)', 'Nama framework PHP', 'Protokol enkripsi', 'Format database'],
                  correctAnswerIndex: 0,
                  explanation: 'HATEOAS memandu klien menavigasi API melalui tautan hypertext.'
                },
                {
                  id: 'sa-q-12-5',
                  question: 'HTTP Status Code berapa yang tepat saat permintaan ditolak karena klien belum terautentikasi?',
                  options: ['401 Unauthorized', '403 Forbidden', '404 Not Found', '500 Server Error'],
                  correctAnswerIndex: 0,
                  explanation: '401 Unauthorized menandakan kurangnya kredensial autentikasi yang valid.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m13',
          title: 'Module 13 — GraphQL & API Alternatives',
          description: 'GraphQL schemas, resolvers, gRPC, Protobuf, dan perbandingan dengan REST.',
          lessons: [
            {
              id: 'sa-l-13-1',
              title: 'GraphQL vs gRPC vs REST',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Memilih Protokol API
- **REST:** Standar web, caching mudah, universal.
- **GraphQL:** Klien meminta persis data yang dibutuhkan (mencegah over-fetching/under-fetching).
- **gRPC:** Berbasis HTTP/2 dan Protobuf, sangat cepat dan efisien untuk komunikasi antar mikroservis internal.`
                },
                {
                  type: 'code-example',
                  language: 'protobuf',
                  code: `// Contoh gRPC Protocol Buffers
syntax = "proto3";
service UserService {
  rpc GetUser (UserRequest) returns (UserResponse);
}
message UserRequest { string id = 1; }
message UserResponse { string name = 1; string email = 2; }`
                }
              ]
            },
            {
              id: 'sa-l-13-2',
              title: 'Kuis Module 13 — GraphQL & API Alternatives',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-13-1',
                  question: 'Apa masalah utama REST yang coba diselesaikan oleh GraphQL?',
                  options: [
                    'Over-fetching (menerima data terlalu banyak) dan under-fetching (butuh banyak endpoint untuk satu halaman)',
                    'Kecepatan transfer internet',
                    'Keamanan database',
                    'Ukuran file server'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'GraphQL memungkinkan klien meminta tepat field data yang diinginkan dalam satu query.'
                },
                {
                  id: 'sa-q-13-2',
                  question: 'Apa keunggulan utama gRPC dibanding REST konvensional (JSON over HTTP/1.1)?',
                  options: [
                    'Menggunakan HTTP/2 (multiplexing) dan serialisasi Protocol Buffers biner yang jauh lebih cepat serta efisien ukuran',
                    'Lebih mudah dibaca manusia di browser',
                    'Tidak memerlukan koneksi internet',
                    'Didukung semua browser lama'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'gRPC sangat optimal untuk komunikasi internal mikroservis berperforma tinggi.'
                },
                {
                  id: 'sa-q-13-3',
                  question: 'Apa tantangan operasional terbesar dalam penerapan GraphQL di production?',
                  options: [
                    'Kesulitan caching di level HTTP standar dan risiko serangan query yang sangat kompleks (query depth/cost analysis)',
                    'Ukurannya terlalu kecil',
                    'Tidak ada dokumentasi',
                    'Wajib menggunakan bahasa Python'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Fleksibilitas GraphQL menyulitkan HTTP caching dan rentan nested query mahal.'
                },
                {
                  id: 'sa-q-13-4',
                  question: 'Apa format serialisasi data yang digunakan oleh gRPC secara default?',
                  options: ['Protocol Buffers (Protobuf)', 'XML', 'CSV', 'YAML'],
                  correctAnswerIndex: 0,
                  explanation: 'Protobuf mengompilasi data menjadi format biner yang sangat ringkas.'
                },
                {
                  id: 'sa-q-13-5',
                  question: 'Kapan sebaiknya memilih REST dibanding gRPC atau GraphQL?',
                  options: [
                    'Untuk API publik (Public APIs) yang dikonsumsi pihak ketiga karena kesederhanaan, dukungan caching HTTP, dan universalitasnya',
                    'Hanya untuk aplikasi mobile',
                    'Saat server sangat lambat',
                    'Tidak pernah'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'REST adalah standar emas untuk integrasi publik yang ramah developer.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m14',
          title: 'Module 14 — Database Architecture',
          description: 'SQL vs NoSQL, sharding, partitioning, replication, dan ACID vs BASE.',
          lessons: [
            {
              id: 'sa-l-14-1',
              title: 'Sharding, Partitioning & CAP Theorem',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Menskalakan Database Relasional
- **Partitioning:** Memecah tabel besar menjadi bagian lebih kecil di satu server (Vertical/Horizontal).
- **Sharding:** Mendistribusikan data ke beberapa mesin/server database fisik yang berbeda.`
                },
                {
                  type: 'code-example',
                  language: 'sql',
                  code: `-- Contoh partisi tabel berdasarkan range tanggal
CREATE TABLE orders (
    id INT,
    order_date DATE
) PARTITION BY RANGE (YEAR(order_date));`
                }
              ]
            },
            {
              id: 'sa-l-14-2',
              title: 'Kuis Module 14 — Database Architecture',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-14-1',
                  question: 'Apa perbedaan antara Database Sharding dan Partitioning?',
                  options: [
                    'Sharding memecah data ke beberapa server fisik berbeda, Partitioning memecah data di dalam instance server yang sama',
                    'Keduanya sama persis',
                    'Sharding hanya untuk NoSQL',
                    'Partitioning tidak bisa untuk SQL'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Sharding melibatkan distribusi multi-server, partitioning di satu server.'
                },
                {
                  id: 'sa-q-14-2',
                  question: 'Apa arti dari ACID dalam transaksi database relasional?',
                  options: ['Atomicity, Consistency, Isolation, Durability', 'Access, Control, Index, Data', 'Automatic, Cache, Internal, Disk', 'Async, Concurrent, Isolated, Distributed'],
                  correctAnswerIndex: 0,
                  explanation: 'ACID menjamin keandalan transaksi data.'
                },
                {
                  id: 'sa-q-14-3',
                  question: 'Apa arti dari model BASE dalam database NoSQL yang terdistribusi?',
                  options: ['Basically Available, Soft state, Eventually consistent', 'Basic, Architecture, SQL, Engine', 'Binary, App, Storage, Environment', 'Backup, Async, Security, Export'],
                  correctAnswerIndex: 0,
                  explanation: 'BASE mengorbankan konsistensi instan demi ketersediaan dan skala.'
                },
                {
                  id: 'sa-q-14-4',
                  question: 'Kapan sebaiknya memilih database NoSQL (misal: Document Store / Key-Value) dibanding Relasional SQL?',
                  options: [
                    'Saat data tidak memiliki skema kaku, skala tulis/baca sangat masif, dan tidak membutuhkan transaksi ACID kompleks lintas banyak entitas',
                    'Selalu untuk semua proyek',
                    'Saat data sangat sedikit',
                    'Saat butuh laporan keuangan akuntansi'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'NoSQL unggul dalam fleksibilitas skema dan skalabilitas horizontal cepat.'
                },
                {
                  id: 'sa-q-14-5',
                  question: 'Apa risiko utama dari penambahan sharding pada arsitektur database?',
                  options: [
                    'Kompleksitas kueri lintas shard (JOIN antar shard sangat sulit/lambat) dan manajemen rebalancing data',
                    'Database menjadi gratis',
                    'Kapasitas disk berkurang',
                    'Tidak ada risiko'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Sharding menghilangkan kemudahan kueri JOIN lintas tabel terdistribusi.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m15',
          title: 'Module 15 — Data Modeling & Transactions',
          description: 'Data normalization, denormalization, distributed transactions, dan Two-Phase Commit.',
          lessons: [
            {
              id: 'sa-l-15-1',
              title: 'Distributed Transactions & Saga Pattern',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### SAGA Pattern untuk Transaksi Terdistribusi
Dalam microservices, Two-Phase Commit (2PC) sering kali terlalu lambat dan memicu lock. **SAGA Pattern** menyelesaikan transaksi terdistribusi melalui serangkaian transaksi lokal yang saling terhubung dengan aksi kompensasi (*compensating transactions* jika terjadi kegagalan).`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Contoh alur SAGA: Order -> Payment -> Inventory (dengan kompensasi)`
                }
              ]
            },
            {
              id: 'sa-l-15-2',
              title: 'Kuis Module 15 — Data Modeling & Transactions',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-15-1',
                  question: 'Mengapa Two-Phase Commit (2PC) tidak disarankan untuk arsitektur mikroservis skala besar?',
                  options: [
                    'Bersifat blocking, menurunkan ketersediaan sistem (availability), dan lambat karena menunggu seluruh node merespons',
                    'Terlalu cepat selesai',
                    'Tidak mendukung database SQL',
                    'Terlalu murah'
                  ],
                  correctAnswerIndex: 0,
                  explanation: '2PC memicu lock global yang merusak ketersediaan mikroservis.'
                },
                {
                  id: 'sa-q-15-2',
                  question: 'Bagaimana cara kerja SAGA Pattern dalam menangani transaksi terdistribusi?',
                  options: [
                    'Menjalankan serangkaian transaksi lokal di setiap servis secara berurutan, dan menjalankan transaksi kompensasi jika ada langkah yang gagal',
                    'Mengunci semua database sekaligus',
                    'Membatalkan seluruh internet',
                    'Tidak melakukan apa-apa'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'SAGA menggunakan konsistensi eventual melalui transaksi lokal dan kompensasi.'
                },
                {
                  id: 'sa-q-15-3',
                  question: 'Apa perbedaan antara normalisasi dan denormalisasi database?',
                  options: [
                    'Normalisasi menghilangkan redundansi data untuk integritas tulis, denormalisasi menduplikasi data untuk mempercepat pembacaan (read performance)',
                    'Normalisasi untuk NoSQL',
                    'Denormalisasi selalu salah',
                    'Tidak ada bedanya'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Denormalisasi menukar integritas tulis demi performa baca yang kilat.'
                },
                {
                  id: 'sa-q-15-4',
                  question: 'Apa itu Eventual Consistency dalam sistem terdistribusi?',
                  options: [
                    'Jaminan bahwa jika tidak ada pembaruan baru, seluruh replika data pada akhirnya akan menyatu menjadi konsisten setelah beberapa waktu',
                    'Data langsung konsisten seketika',
                    'Data tidak pernah konsisten',
                    'Konsistensi hanya berlaku saat malam hari'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Eventual consistency adalah kompromi praktis sistem terdistribusi skala besar.'
                },
                {
                  id: 'sa-q-15-5',
                  question: 'Apa itu Compensating Transaction dalam SAGA?',
                  options: [
                    'Transaksi khusus yang membatalkan atau membalikkan efek dari transaksi lokal sebelumnya saat terjadi kegagalan di tengah jalan',
                    'Pembayaran denda pajak',
                    'Bonus gaji developer',
                    'Backup file database'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Kompensasi bertindak sebagai undo log bisnis di sistem terdistribusi.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m16',
          title: 'Module 16 — Caching Architecture',
          description: 'Cache-aside, write-through, write-behind, eviction policies (LRU/LFU), dan cache stampede.',
          lessons: [
            {
              id: 'sa-l-16-1',
              title: 'Strategi Caching & Mencegah Cache Stampede',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Pola Cache-Aside
1. Aplikasi membaca dari cache. Jika ada (*hit*), kembalikan data.
2. Jika tidak ada (*miss*), baca dari database, simpan ke cache, lalu kembalikan.
*Bahaya:* **Cache Stampede** terjadi saat cache populer kadaluarsa bersamaan dan ribuan request langsung menghantam database.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Contoh cache-aside pattern dengan Redis
async function getUser(id: string) {
  const cached = await redis.get(\`user:\${id}\`);
  if (cached) return JSON.parse(cached);
  
  const user = await db.findUser(id);
  await redis.setex(\`user:\${id}\`, 3600, JSON.stringify(user));
  return user;
}`
                }
              ]
            },
            {
              id: 'sa-l-16-2',
              title: 'Kuis Module 16 — Caching Architecture',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-16-1',
                  question: 'Apa itu fenomena Cache Stampede (Dogpile Effect)?',
                  options: [
                    'Lonjakan trafik mendadak ke database utama ketika key cache yang sangat populer kedaluwarsa secara bersamaan',
                    'Hewan menyerang server',
                    'Koneksi internet terputus',
                    'Kapasitas RAM penuh'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Cache stampede membanjiri database saat cache massal kedaluwarsa.'
                },
                {
                  id: 'sa-q-16-2',
                  question: 'Bagaimana cara kerja pola Cache-Aside (Lazy Loading)?',
                  options: [
                    'Aplikasi memeriksa cache terlebih dahulu; jika miss, aplikasi mengambil dari database dan mengisi cache',
                    'Database selalu mengisi cache otomatis',
                    'Cache menulis langsung ke disk',
                    'Tidak ada database'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Cache-aside memuat data ke cache hanya saat diminta aplikasi.'
                },
                {
                  id: 'sa-q-16-3',
                  question: 'Apa perbedaan strategi Write-Through dan Write-Behind (Write-Back) Caching?',
                  options: [
                    'Write-Through menulis ke cache dan DB secara sinkron, Write-Behind menulis ke cache dulu lalu asynchronously ke DB',
                    'Keduanya sama persis',
                    'Write-Behind lebih lambat',
                    'Write-Through tidak pakai cache'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Write-behind menunda penulisan ke DB demi kecepatan tulis tinggi.'
                },
                {
                  id: 'sa-q-16-4',
                  question: 'Apa fungsi kebijakan eviction LRU (Least Recently Used) di dalam cache?',
                  options: [
                    'Menghapus item data yang paling lama tidak diakses saat cache mencapai batas kapasitas maksimum',
                    'Menghapus data terbaru',
                    'Menghapus semua data acak',
                    'Menambah ukuran RAM fisik'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'LRU membuang data yang sudah lama tidak dipakai.'
                },
                {
                  id: 'sa-q-16-5',
                  question: 'Apa bahaya utama dari stale data (data kedaluwarsa) dalam sistem caching?',
                  options: [
                    'Pengguna melihat informasi lama yang sudah tidak valid (misal: harga barang lama atau stok sudah habis)',
                    'Komputer meledak',
                    'Tidak ada bahaya',
                    'Database menjadi bersih'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Stale data memicu inkonsistensi informasi bagi pengguna.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m17',
          title: 'Module 17 — Message Queues & Event-Driven Systems',
          description: 'Pub/Sub, message brokers (RabbitMQ/Kafka), point-to-point queues, dan at-least-once delivery.',
          lessons: [
            {
              id: 'sa-l-17-1',
              title: 'Message Queues vs Event Streams',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Pola Asinkronus
- **Message Queue (RabbitMQ):** Pesan dikonsumsi oleh satu pekerja (*worker*) lalu dihapus dari antrean (Point-to-Point).
- **Event Stream (Kafka):** Pesan disimpan dalam log append-only yang dapat dibaca oleh banyak konsumen secara independen dan berulang.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Konsep pengiriman pesan asinkronus
interface MessagePayload {
  eventId: string;
  eventType: string;
  data: Record<string, any>;
}`
                }
              ]
            },
            {
              id: 'sa-l-17-2',
              title: 'Kuis Module 17 — Message Queues & Event-Driven Systems',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-17-1',
                  question: 'Apa perbedaan mendasar antara Message Queue (seperti RabbitMQ) dan Event Stream (seperti Apache Kafka)?',
                  options: [
                    'Message queue menghapus pesan setelah dikonsumsi worker, event stream menyimpan pesan dalam log append-only yang bisa dibaca berulang oleh banyak konsumen',
                    'Kafka lebih lambat dari RabbitMQ',
                    'RabbitMQ tidak pakai antrean',
                    'Tidak ada perbedaan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Kafka mempertahankan log riwayat event, queue menghapus pesan setelah diproses.'
                },
                {
                  id: 'sa-q-17-2',
                  question: 'Apa arti dari jaminan pengiriman At-Least-Once Delivery?',
                  options: [
                    'Sistem menjamin pesan akan terkirim minimal satu kali, namun berisiko terjadi duplikasi pesan yang harus ditangani konsumen (idempotency)',
                    'Pesan pasti terkirim tepat satu kali tanpa duplikasi',
                    'Pesan sering hilang',
                    'Pengiriman dibatalkan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'At-least-once menuntut penanganan idempotensi di sisi konsumen.'
                },
                {
                  id: 'sa-q-17-3',
                  question: 'Apa fungsi dari Dead Letter Queue (DLQ) dalam arsitektur pesan?',
                  options: [
                    'Menampung pesan-pesan yang gagal diproses berulang kali (*poison messages*) untuk diinvestigasi manual',
                    'Tempat sampah file komputer',
                    'Antrean prioritas utama',
                    'Database cadangan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'DLQ mengamankan sistem dari pesan rusak yang memicu infinite loop.'
                },
                {
                  id: 'sa-q-17-4',
                  question: 'Mengapa komunikasi asinkronus via message broker meningkatkan ketahanan (resilience) sistem?',
                  options: [
                    'Jika salah satu servis downstream mati, pesan tetap aman di antrean tanpa membuat servis hulu mengalami cascading failure',
                    'Membuat server lebih panas',
                    'Mempercepat jaringan fisik',
                    'Menghapus database'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Broker bertindak sebagai penyangga (*buffer*) yang menyerap lonjakan beban.'
                },
                {
                  id: 'sa-q-17-5',
                  question: 'Apa itu pola Publish-Subscribe (Pub/Sub)?',
                  options: [
                    'Pola di mana pengirim (publisher) memancarkan event ke topik tanpa peduli siapa atau berapa banyak subscriber yang mendengarkan',
                    'Pola pengiriman surat pos',
                    'Koneksi P2P langsung',
                    'Kueri database SQL'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Pub/Sub mendekonstruksi keterikatan langsung antara produsen dan konsumen pesan.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m18',
          title: 'Module 18 — Event-Driven Architecture',
          description: 'Event sourcing, CQRS (Command Query Responsibility Segregation), dan choreography vs orchestration.',
          lessons: [
            {
              id: 'sa-l-18-1',
              title: 'CQRS & Event Sourcing',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### CQRS (Command Query Responsibility Segregation)
Memisahkan model penulisan data (**Commands**) dari model pembacaan data (**Queries**). Penulisan dioptimalkan untuk konsistensi, pembacaan dioptimalkan untuk denormalisasi view yang kilat.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Contoh pemisahan Command dan Query
class CreateOrderCommand { constructor(public items: any[]) {} }
class GetOrderQuery { constructor(public orderId: string) {} }`
                }
              ]
            },
            {
              id: 'sa-l-18-2',
              title: 'Kuis Module 18 — Event-Driven Architecture',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-18-1',
                  question: 'Apa tujuan utama dari pola CQRS (Command Query Responsibility Segregation)?',
                  options: [
                    'Memisahkan model dan alur penulisan data (Command) secara independen dari model pembacaan data (Query)',
                    'Menggabungkan database SQL dan NoSQL',
                    'Menghapus semua query database',
                    'Membuat aplikasi berjalan lambat'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'CQRS mengoptimalkan sisi tulis dan baca secara terpisah sesuai kebutuhan.'
                },
                {
                  id: 'sa-q-18-2',
                  question: 'Apa itu Event Sourcing dalam arsitektur penyimpanan data?',
                  options: [
                    'Menyimpan seluruh urutan perubahan state aplikasi sebagai urutan event immutable alih-alih hanya menyimpan kondisi akhir data saat ini',
                    'Menyimpan file log server harian',
                    'Menghapus database setiap hari',
                    'Mencetak kuitansi'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Event sourcing merekam sejarah lengkap kejadian sebagai sumber kebenaran.'
                },
                {
                  id: 'sa-q-18-3',
                  question: 'Apa perbedaan antara Choreography dan Orchestration dalam Event-Driven Microservices?',
                  options: [
                    'Choreography berbasis desentralisasi di mana setiap servis bereaksi mandiri terhadap event; Orchestration menggunakan pengontrol pusat yang mengatur alur',
                    'Keduanya sama persis',
                    'Orchestration tidak pakai event',
                    'Choreography hanya untuk musik'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Choreography bersifat otonom, orchestration diatur oleh konduktor terpusat.'
                },
                {
                  id: 'sa-q-18-4',
                  question: 'Apa tantangan operasional utama dari Event Sourcing?',
                  options: [
                    'Kompleksitas migrasi skema event historis (*schema evolution*) dan kebutuhan merekonstruksi state dari awal saat pembacaan',
                    'Ukuran file terlalu kecil',
                    'Tidak bisa pakai database',
                    'Selalu cepat'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Merekonstruksi state dari jutaan event membutuhkan snapshotting dan manajemen skema.'
                },
                {
                  id: 'sa-q-18-5',
                  question: 'Kapan CQRS sebaiknya dihindari (*over-engineering*)?',
                  options: [
                    'Pada aplikasi CRUD sederhana dengan sedikit domain bisnis di mana model tulis dan baca hampir identik',
                    'Pada semua sistem besar',
                    'Saat menggunakan microservices',
                    'Selalu gunakan CQRS'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'CQRS membawa kompleksitas tambahan yang tidak diperlukan untuk aplikasi sederhana.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'sa-lvl-4',
      title: 'Level 4 — Distributed Systems, Microservices, Scalability & Production System Design',
      description: 'Teorema CAP, konsistensi terdistribusi, Microservices, Scalability, Resilience, Observability, dan Capstone.',
      modules: [
        {
          id: 'software-architecture-m19',
          title: 'Module 19 — Distributed Systems Fundamentals',
          description: 'Karakteristik sistem terdistribusi, fallacies of distributed computing, dan time synchronization.',
          lessons: [
            {
              id: 'sa-l-19-1',
              title: 'Kesesatan Komputasi Terdistribusi (Fallacies)',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Fallacies of Distributed Computing (L. Peter Deutsch)
1. Jaringan itu dapat diandalkan.
2. Latensi itu nol.
3. Bandwidth itu tak terbatas.
4. Jaringan itu aman.
*Mengabaikan kenyataan ini adalah akar penyebab kegagalan arsitektur terdistribusi.*`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Contoh penanganan timeout dan retry dalam panggilan terdistribusi`
                }
              ]
            },
            {
              id: 'sa-l-19-2',
              title: 'Kuis Module 19 — Distributed Systems Fundamentals',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-19-1',
                  question: 'Apa salah satu "Fallacies of Distributed Computing" yang paling sering dilupakan developer pemula?',
                  options: [
                    'Menganggap jaringan itu andal dan latensi bernilai nol seperti panggilan fungsi lokal',
                    'Menganggap komputer butuh listrik',
                    'Menganggap database itu ada',
                    'Menganggap kode pasti berjalan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Jaringan komputer tidak pernah 100% andal dan selalu memiliki latensi.'
                },
                {
                  id: 'sa-q-19-2',
                  question: 'Mengapa sinkronisasi waktu (*clock synchronization*) sangat sulit dalam sistem terdistribusi global?',
                  options: [
                    'Jam fisik pada setiap server bergeser (clock drift) akibat perbedaan perangkat keras dan relativitas',
                    'Semua komputer menggunakan waktu yang sama persis',
                    'Waktu tidak penting di komputer',
                    'Internet terlalu cepat'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Clock drift menyulitkan pengurutan kejadian absolut lintas server.'
                },
                {
                  id: 'sa-q-19-3',
                  question: 'Apa dampak dari asumsi keliru "Bandwidth itu tak terbatas" dalam desain sistem?',
                  options: [
                    'Mengirim payload data JSON raksasa yang tidak perlu antar servis, memicu saturasi jaringan dan latensi tinggi',
                    'Membuat server hemat listrik',
                    'Mempercepat aplikasi',
                    'Tidak ada dampak'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Payload besar menghabiskan bandwidth dan memperlambat sistem.'
                },
                {
                  id: 'sa-q-19-4',
                  question: 'Apa arti dari Partial Failure dalam sistem terdistribusi?',
                  options: [
                    'Kondisi di mana sebagian komponen/server gagal, sementara bagian lain masih berjalan, membuat diagnosis sistem menjadi kompleks',
                    'Seluruh sistem mati total',
                    'Sistem berjalan normal 100%',
                    'Hanya monitor yang mati'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Partial failure menuntut ketahanan terhadap kegagalan komponen parsial.'
                },
                {
                  id: 'sa-q-19-5',
                  question: 'Mengapa operasi jaringan (*network calls*) harus selalu dibungkus dengan timeout?',
                  options: [
                    'Mencegah aplikasi mengalami hang/blocking selamanya jika server remote macet atau terputus',
                    'Agar kode lebih panjang',
                    'Mempercepat CPU',
                    'Wajib dalam HTML'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Timeout melindungi thread agar tidak terkunci selamanya saat jaringan macet.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m20',
          title: 'Module 20 — Consistency & CAP',
          description: 'Teorema CAP (Consistency, Availability, Partition Tolerance), PACELC, dan linearizability.',
          lessons: [
            {
              id: 'sa-l-20-1',
              title: 'Memahami Teorema CAP & PACELC',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Teorema CAP (Eric Brewer)
Dalam sistem terdistribusi yang mengalami partisi jaringan (**Partition Tolerance**), kita hanya dapat memilih antara **Consistency** (semua node melihat data yang sama persis) atau **Availability** (setiap request mendapat respons, meski datanya mungkin belum sinkron).`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Contoh ilustrasi pilihan CP vs AP dalam pemilihan database terdistribusi`
                }
              ]
            },
            {
              id: 'sa-l-20-2',
                  title: 'Kuis Module 20 — Consistency & CAP',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-20-1',
                  question: 'Apa inti dari Teorema CAP dalam sistem terdistribusi?',
                  options: [
                    'Saat terjadi partisi jaringan (Partition Tolerance), sistem harus memilih antara Consistency (C) atau Availability (A)',
                    'Sistem dapat memiliki ketiganya (C, A, P) secara sempurna tanpa kompromi',
                    'Partisi jaringan dapat dihindari sepenuhnya',
                    'Konsistensi tidak penting'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Teorema CAP menyatakan pembatasan pilihan saat terjadi partisi jaringan.'
                },
                {
                  id: 'sa-q-20-2',
                  question: 'Apa arti huruf P (Partition Tolerance) dalam teorema CAP?',
                  options: [
                    'Kemampuan sistem untuk terus beroperasi meskipun terjadi kegagalan jaringan yang memutus komunikasi antar node',
                    'Pembagian file di disk',
                    'Kecepatan prosesor',
                    'Keamanan password'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Partition tolerance adalah keharusan mutlak dalam jaringan komputer dunia nyata.'
                },
                {
                  id: 'sa-q-20-3',
                  question: 'Apa kepanjangan dari teorema PACELC sebagai perluasan dari CAP?',
                  options: [
                    'If partitioned, choose Availability or Consistency; ELse, choose Latency or Consistency',
                    'Performance, Availability, Cost, Energy, Load, Compute',
                    'Protocol, API, Container, Event, Layer, Client',
                    'Tidak ada singkatan tersebut'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'PACELC menjelaskan trade-off bahkan saat tidak ada partisi jaringan (Latensi vs Konsistensi).'
                },
                {
                  id: 'sa-q-20-4',
                  question: 'Mengapa sistem berbasis CP (Consistency & Partition Tolerance) menolak request saat terjadi partisi?',
                  options: [
                    'Untuk mencegah kembalinya data yang sudah kedaluwarsa atau inkonsisten kepada klien',
                    'Agar server beristirahat',
                    'Menghemat RAM',
                    'Karena jaringan mati total'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Sistem CP lebih memilih menolak servis dibanding menyajikan data tidak konsisten.'
                },
                {
                  id: 'sa-q-20-5',
                  question: 'Apa contoh sistem yang memilih AP (Availability & Partition Tolerance)?',
                  options: [
                    'Sistem keranjang belanja e-commerce atau DNS, di mana ketersediaan layanan membaca/menulis lebih diutamakan dibanding keselarasan detik itu juga',
                    'Sistem transfer bank ATM',
                    'Database akuntansi pajak',
                    'Kunci pintu digital'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Sistem AP mengutamakan agar aplikasi tetap bisa diakses kapanpun.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m21',
          title: 'Module 21 — Distributed Coordination',
          description: 'Consensus algorithms (Raft/Paxos), distributed locks, leader election, dan vector clocks.',
          lessons: [
            {
              id: 'sa-l-21-1',
              title: 'Algoritma Konsensus (Raft) & Distributed Locks',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Mengapa Butuh Konsensus?
Dalam klaster terdistribusi, beberapa node harus menyetujui satu keputusan bersama (misal: siapa leader, urutan transaksi). **Raft** adalah algoritma konsensus yang dirancang agar lebih mudah dipahami dibanding Paxos.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Contoh implementasi Redlock (Distributed lock dengan Redis)`
                }
              ]
            },
            {
              id: 'sa-l-21-2',
              title: 'Kuis Module 21 — Distributed Coordination',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-21-1',
                  question: 'Apa tujuan utama dari algoritma konsensus (seperti Raft atau Paxos)?',
                  options: [
                    'Membuat sekelompok node terdistribusi sepakat mencapai satu keputusan atau status bersama secara konsisten',
                    'Mempercepat kecepatan CPU',
                    'Mengompresi file data',
                    'Mengatur rute kabel'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Konsensus menjamin kesepakatan mutlak di antara node terdistribusi.'
                },
                {
                  id: 'sa-q-21-2',
                  question: 'Apa peran Leader Node dalam algoritma Raft?',
                  options: [
                    'Mengelola seluruh replikasi log, menerima permintaan klien, dan mendistribusikannya ke follower nodes',
                    'Menjadi satu-satunya server yang menyala',
                    'Menyimpan password admin',
                    'Menghapus database'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Leader bertindak sebagai pengkoordinasi utama penulisan data.'
                },
                {
                  id: 'sa-q-21-3',
                  question: 'Apa risiko bahaya dari implementasi Distributed Lock yang buruk pada sistem terdistribusi?',
                  options: [
                    'Terjadinya kondisi race condition, deadlock, atau dua proses berbeda memodifikasi data bersamaan secara ilegal',
                    'Komputer menjadi dingin',
                    'Koneksi internet cepat',
                    'Tidak ada risiko'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Distributed lock yang cacat memicu korupsi data multiserver.'
                },
                {
                  id: 'sa-q-21-4',
                  question: 'Apa fungsi dari Vector Clocks dalam sistem terdistribusi tanpa master?',
                  options: [
                    'Melacak kausalitas dan mendeteksi konflik versi pembaruan data yang terjadi secara konkuren di berbagai node',
                    'Menunjuk waktu jam dinding',
                    'Menghitung kecepatan jaringan',
                    'Mengatur port firewall'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Vector clocks mendeteksi konflik konkuren tanpa jam fisik terpusat.'
                },
                {
                  id: 'sa-q-21-5',
                  question: 'Mengapa pemilihan pemimpin (*Leader Election*) sangat penting dalam sistem koordinasi terdistribusi?',
                  options: [
                    'Menghindari bentrok (*split-brain*) dan memastikan ada satu otoritas pengambil keputusan yang sah',
                    'Agar ada yang memimpin upacara',
                    'Menghemat listrik',
                    'Wajib dalam HTML'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Leader election mencegah kebingungan multi-otoritas penulisan.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m22',
          title: 'Module 22 — Microservices Architecture',
          description: 'Karakteristik microservices, bounded context alignment, database-per-service, dan antipatterns.',
          lessons: [
            {
              id: 'sa-l-22-1',
              title: 'Database-per-Service & Domain Alignment',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Aturan Emas Microservices: Database-per-Service
Setiap mikroservis **wajib** memiliki database terisolasi sendiri. Berbagi satu database antar servis secara langsung adalah **antipattern** terburuk yang merusak otonomi servis.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Arsitektur otonom: Order Service dan User Service terisolasi total`
                }
              ]
            },
            {
              id: 'sa-l-22-2',
              title: 'Kuis Module 22 — Microservices Architecture',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-22-1',
                  question: 'Mengapa pola Database-per-Service sangat penting dalam arsitektur microservices?',
                  options: [
                    'Menjaga otonomi dan kopling longgar (*loose coupling*) antar servis agar perubahan skema tidak merusak servis lain',
                    'Agar penggunaan disk lebih boros',
                    'Mempercepat kueri SQL lintas tabel',
                    'Wajib dalam aturan hukum cloud'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Database bersama merusak kemandirian dan memicu kopling erat antar mikroservis.'
                },
                {
                  id: 'sa-q-22-2',
                  question: 'Apa yang dimaksud dengan "Distributed Monolith" sebagai antipattern microservices?',
                  options: [
                    'Sistem yang dipecah menjadi banyak servis kecil secara fisik, namun masih saling bergantung erat dan harus dideploy bersamaan secara bersamaan',
                    'Monolit yang sangat cepat',
                    'Microservices yang sempurna',
                    'Sistem tanpa database'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Distributed monolith menggabungkan kerumitan terdistribusi dengan kekakuan monolit.'
                },
                {
                  id: 'sa-q-22-3',
                  question: 'Bagaimana cara terbaik membagi batas domain (*service boundaries*) dalam microservices?',
                  options: [
                    'Menyelaraskannya dengan Domain-Driven Design (DDD) Bounded Contexts atau kapabilitas bisnis utama',
                    'Berdasarkan urutan abjad nama fungsi',
                    'Satu tabel database menjadi satu servis',
                    'Secara acak'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Bounded contexts memberikan batas alami kapabilitas bisnis mandiri.'
                },
                {
                  id: 'sa-q-22-4',
                  question: 'Apa tantangan operasional terbesar saat beralih dari Monolit ke Microservices?',
                  options: [
                    'Kompleksitas jaringan, debugging terdistribusi, pengujian integrasi, manajemen deployment, dan keandalan operasional',
                    'Kode menjadi terlalu sedikit',
                    'Biaya server menjadi nol',
                    'Tidak ada tantangan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Microservices menggantikan kompleksitas kode dengan kompleksitas operasional/jaringan.'
                },
                {
                  id: 'sa-q-22-5',
                  question: 'Kapan sebuah perusahaan sebaiknya tetap bertahan dengan Arsitektur Monolit alih-alih Microservices?',
                  options: [
                    'Saat ukuran tim masih kecil, domain bisnis belum matang/stabil, dan kecepatan validasi produk lebih utama dibanding skalabilitas masif',
                    'Selamanya selamanya',
                    'Saat perusahaan sudah sangat kaya',
                    'Saat tidak punya internet'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Modular monolith adalah pilihan terbaik di tahap awal produk.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m23',
          title: 'Module 23 — Service Communication',
          description: 'Synchronous vs asynchronous communication, API gateways, service mesh, dan backends for frontends (BFF).',
          lessons: [
            {
              id: 'sa-l-23-1',
              title: 'API Gateway & BFF Pattern (Backends for Frontends)',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Pola BFF (Backends for Frontends)
Alih-alih satu API Gateway universal untuk semua klien (Web, Mobile, Smart TV), pola BFF menyediakan backend khusus yang dioptimalkan untuk kebutuhan spesifik masing-masing jenis klien.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Contoh routing API Gateway / BFF`
                }
              ]
            },
            {
              id: 'sa-l-23-2',
              title: 'Kuis Module 23 — Service Communication',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-23-1',
                  question: 'Apa tujuan utama dari pola BFF (Backends for Frontends)?',
                  options: [
                    'Menyediakan backend khusus yang disesuaikan secara presisi untuk kebutuhan UI jenis klien tertentu (misal: mobile app vs web app)',
                    'Membuat backend menjadi satu untuk selamanya',
                    'Menghapus frontend',
                    'Mempercepat database'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'BFF menghindari over-fetching dan menyesuaikan payload dengan kebutuhan spesifik klien.'
                },
                {
                  id: 'sa-q-23-2',
                  question: 'Apa fungsi dari Service Mesh (seperti Istio atau Linkerd) dalam arsitektur mikroservis?',
                  options: [
                    'Mengelola komunikasi antar servis secara transparan melalui sidecar proxy (menangani mTLS, retries, load balancing, observability)',
                    'Membuat desain grafis jaring laba-laba',
                    'Menyimpan file cache',
                    'Mengatur password'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Service mesh mengabstraksi lapisan jaringan dan keamanan dari kode aplikasi.'
                },
                {
                  id: 'sa-q-23-3',
                  question: 'Apa keunggulan komunikasi asinkronus (berbasis event) dibanding sinkronus (HTTP REST/gRPC) antar mikroservis?',
                  options: [
                    'Kopling longgar, menghilangkan ketergantungan waktu nyata (temporal decoupling), dan ketahanan terhadap kegagalan hulu',
                    'Lebih rumit tanpa alasan',
                    'Selalu lebih lambat',
                    'Tidak ada keunggulan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Asinkronus memutuskan ikatan waktu nyata (*temporal coupling*) antar servis.'
                },
                {
                  id: 'sa-q-23-4',
                  question: 'Apa fungsi API Gateway sebagai pintu gerbang tunggal (*single entry point*)?',
                  options: [
                    'Menangani autentikasi, SSL termination, rate limiting, routing, dan agregasi permintaan klien',
                    'Menyimpan seluruh database aplikasi',
                    'Menulis kode frontend',
                    'Mematikan server'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'API Gateway menyederhanakan interaksi klien dengan menyembunyikan topologi internal.'
                },
                {
                  id: 'sa-q-23-5',
                  question: 'Apa risiko utama dari rantai panggilan sinkronus yang terlalu panjang (*sync call chaining* A -> B -> C -> D)?',
                  options: [
                    'Latensi kumulatif yang sangat tinggi dan risiko kegagalan berantai (*cascading failure*) jika salah satu servis di ujung melambat',
                    'Sistem menjadi sangat aman',
                    'Menghemat penggunaan CPU',
                    'Tidak ada risiko'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Call chaining sinkronus merusak ketersediaan dan melipatgandakan latensi.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m24',
          title: 'Module 24 — Scalability Engineering',
          description: 'The Scale Cube (X, Y, Z axis scaling), load balancing algorithms, dan stateless scaling.',
          lessons: [
            {
              id: 'sa-l-24-1',
              title: 'The Scale Cube (Model Skalabilitas 3 Dimensi)',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### The Scale Cube (Planetary Scale Architecture)
1. **X-Axis (Horizontal Duplication):** Menjalankan banyak instance identik di belakang load balancer.
2. **Y-Axis (Functional Decomposition):** Memecah aplikasi menjadi mikroservis fungsional.
3. **Z-Axis (Data Sharding/Partitioning):** Memecah data berdasarkan kriteria tertentu (misal: berdasarkan region atau ID pengguna).`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Ilustrasi algoritma Round Robin / Weighted Load Balancing`
                }
              ]
            },
            {
              id: 'sa-l-24-2',
              title: 'Kuis Module 24 — Scalability Engineering',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-24-1',
                  question: 'Apa arti sumbu X (X-Axis) dalam model The Scale Cube untuk skalabilitas?',
                  options: [
                    'Duplikasi horizontal (kloning instans aplikasi identik) di belakang load balancer',
                    'Pemecahan fungsi menjadi mikroservis',
                    'Sharding database berdasarkan wilayah',
                    'Peningkatan RAM server tunggal'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'X-axis adalah kloning horizontal standar.'
                },
                {
                  id: 'sa-q-24-2',
                  question: 'Apa arti sumbu Y (Y-Axis) dalam model The Scale Cube?',
                  options: [
                    'Decomposer fungsional (memecah monolit menjadi mikroservis berdasarkan kapabilitas bisnis)',
                    'Penambahan CPU vertikal',
                    'Pencadangan data',
                    'Pembersihan cache'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Y-axis adalah dekomposisi fungsional/mikroservis.'
                },
                {
                  id: 'sa-q-24-3',
                  question: 'Apa arti sumbu Z (Z-Axis) dalam model The Scale Cube?',
                  options: [
                    'Data partitioning / sharding (memecah data dan merutekan pengguna ke server khusus berdasarkan atribut tertentu)',
                    'Mematikan server',
                    'Enkripsi cloud',
                    'Load balancing acak'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Z-axis adalah sharding/partisi data.'
                },
                {
                  id: 'sa-q-24-4',
                  question: 'Mengapa aplikasi harus bersifat Stateless agar dapat diskalakan secara horizontal dengan mudah?',
                  options: [
                    'Karena request apa pun dapat dilayani oleh instans server mana pun tanpa kehilangan sesi pengguna yang tersimpan di memori lokal',
                    'Agar aplikasi tidak butuh database',
                    'Agar file lebih kecil',
                    'Tidak ada hubungannya'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Statelessness memungkinkan rotasi dan kloning instans secara instan.'
                },
                {
                  id: 'sa-q-24-5',
                  question: 'Apa fungsi algoritma Consistent Hashing dalam sistem terdistribusi (seperti caching cluster atau sharding)?',
                  options: [
                    'Meminimalkan jumlah kunci data yang harus dipindahkan atau direlokasi saat server ditambahkan atau dihapus dari klaster',
                    'Mengacak password user',
                    'Mempercepat kecepatan disk',
                    'Mengatur port router'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Consistent hashing mendistribusikan beban secara merata dan stabil.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m25',
          title: 'Module 25 — Reliability & Resilience',
          description: 'Circuit breakers, retries with exponential backoff, bulkheads, rate limiting, dan chaos engineering.',
          lessons: [
            {
              id: 'sa-l-25-1',
              title: 'Circuit Breaker Pattern & Exponential Backoff',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Pola Circuit Breaker
- **Closed:** Normal, request diteruskan.
- **Open:** Jika kegagalan melebihi ambang batas, sirkuit terbuka dan langsung menolak request tanpa membebani servis hilir yang sedang sekarat.
- **Half-Open:** Mencoba mengirim satu dua request uji untuk melihat apakah servis pulih.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Konsep Retry dengan Exponential Backoff & Jitter
async function callWithRetry(fn: () => Promise<any>, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (err) {
    if (retries <= 0) throw err;
    await new Promise(res => setTimeout(res, delay));
    return callWithRetry(fn, retries - 1, delay * 2);
  }
}`
                }
              ]
            },
            {
              id: 'sa-l-25-2',
              title: 'Kuis Module 25 — Reliability & Resilience',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-25-1',
                  question: 'Apa fungsi dari pola Circuit Breaker dalam ketahanan sistem terdistribusi?',
                  options: [
                    'Menghentikan sementara panggilan ke servis hilir yang sedang bermasalah untuk mencegah kegagalan berantai (*cascading failure*) dan memberi waktu servis pulih',
                    'Memutus aliran listrik fisik server',
                    'Menghapus cache',
                    'Mempercepat jaringan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Circuit breaker melindungi sistem dari kebanjiran request saat downstream down.'
                },
                {
                  id: 'sa-q-25-2',
                  question: 'Apa tujuan dari teknik Exponential Backoff dengan Jitter pada mekanisme Retry?',
                  options: [
                    'Menambah jeda waktu tunggu secara eksponensial di setiap percobaan ulang disertai variasi acak (jitter) untuk menghindari "thundering herd problem"',
                    'Mempercepat retry seketika',
                    'Menghentikan aplikasi selamanya',
                    'Menghemat baterai'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Jitter mencegah ribuan klien melakukan retry serentak secara bersamaan.'
                },
                {
                  id: 'sa-q-25-3',
                  question: 'Apa itu pola Bulkhead dalam rekayasa keandalan perangkat lunak?',
                  options: [
                    'Mengisolasi kolam sumber daya (thread pool / koneksi) per layanan atau fitur agar kegagalan di satu bagian tidak menghabiskan seluruh sumber daya sistem',
                    'Membuat kapal selam untuk server',
                    'Menyimpan data di bawah tanah',
                    'Mengunci pintu server'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Bulkhead membatasi area kerusakan (*blast radius*) saat terjadi kegagalan.'
                },
                {
                  id: 'sa-q-25-4',
                  question: 'Apa tujuan dari Chaos Engineering dalam pengujian sistem produksi?',
                  options: [
                    'Sengaja menginjeksikan kegagalan (seperti mematikan server atau memutus jaringan) di lingkungan produksi untuk menguji ketahanan sistem',
                    'Membuat kekacauan di kantor',
                    'Menghapus kode program secara acak',
                    'Memecat karyawan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Chaos engineering membuktikan ketahanan sistem terhadap kegagalan nyata.'
                },
                {
                  id: 'sa-q-25-5',
                  question: 'Apa itu Graceful Degradation?',
                  options: [
                    'Kemampuan sistem untuk tetap berjalan dengan fungsionalitas parsial yang dikurangi saat komponen pendukung mengalami kegagalan',
                    'Aplikasi mati total secara elegan',
                    'Menurunkan gaji karyawan',
                    'Mematikan lampu kantor'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Degradasi anggun memastikan inti aplikasi tetap bisa digunakan meski fitur non-esensial mati.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m26',
          title: 'Module 26 — Security Architecture',
          description: 'Zero Trust architecture, OAuth2/OIDC, encryption, secret management, dan defense in depth.',
          lessons: [
            {
              id: 'sa-l-26-1',
              title: 'Zero Trust Architecture & Defense in Depth',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Prinsip Zero Trust ("Never trust, always verify")
Dalam arsitektur modern, perimeter jaringan tradisional tidak lagi cukup. Setiap permintaan, terlepas dari apakah berasal dari dalam atau luar jaringan privat, wajib diautentikasi, diotorisasi, dan dienkripsi.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Contoh verifikasi token JWT terdistribusi di API Gateway`
                }
              ]
            },
            {
              id: 'sa-l-26-2',
              title: 'Kuis Module 26 — Security Architecture',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-26-1',
                  question: 'Apa inti dari prinsip Zero Trust Architecture?',
                  options: [
                    'Jangan pernah mempercayai entitas apa pun secara otomatis, baik di dalam maupun di luar perimeter jaringan; selalu verifikasi setiap permintaan secara ketat',
                    'Percaya pada semua pengguna internal',
                    'Tanpa password untuk semua orang',
                    'Menutup seluruh akses internet'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Zero trust mewajibkan verifikasi berkelanjutan pada setiap akses.'
                },
                {
                  id: 'sa-q-26-2',
                  question: 'Apa arti dari strategi Defense in Depth (Pertahanan Berlapis)?',
                  options: [
                    'Menggunakan banyak lapisan pengamanan independen (firewall, enkripsi, auth, audit log) sehingga jika satu lapis jebol, lapis lain tetap melindungi',
                    'Membuat database sangat dalam di tanah',
                    'Menulis password dua kali',
                    'Tidak menggunakan password'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Pertahanan berlapis menggagalkan penyerang meskipun satu benteng tertembus.'
                },
                {
                  id: 'sa-q-26-3',
                  question: 'Apa perbedaan utama antara OAuth 2.0 dan OIDC (OpenID Connect)?',
                  options: [
                    'OAuth 2.0 adalah protokol untuk Otorisasi (izin akses), OIDC adalah lapisan Autentikasi (identitas pengguna) di atas OAuth 2.0',
                    'Keduanya sama persis',
                    'OIDC untuk database',
                    'OAuth untuk enkripsi file'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'OAuth mengurus otorisasi (izin), OIDC mengurus autentikasi (siapa dia).'
                },
                {
                  id: 'sa-q-26-4',
                  question: 'Mengapa enkripsi data in-transit (TLS) dan at-rest wajib dalam arsitektur produksi?',
                  options: [
                    'Melindungi data dari interseksi penyadapan jaringan dan pencurian fisik perangkat penyimpanan',
                    'Agar aplikasi berjalan lebih lambat',
                    'Wajib dibeli dari vendor',
                    'Tidak ada gunanya'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Enkripsi melindungi kerahasiaan data di jalur transmisi dan penyimpanan.'
                },
                {
                  id: 'sa-q-26-5',
                  question: 'Apa risiko dari penyimpanan Secret (kunci API/password) di dalam kode sumber (*hardcoding*)?',
                  options: [
                    'Siapa pun yang memiliki akses ke repositori git dapat mencuri kredensial dan membobol sistem cloud perusahaan',
                    'Tidak ada risiko',
                    'Membuat program lambat',
                    'Wajib dalam Python'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Hardcoded secrets adalah titik kegagalan keamanan paling fatal.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m27',
          title: 'Module 27 — Observability Architecture',
          description: 'The Three Pillars of Observability (Metrics, Logs, Traces), OpenTelemetry, dan SLI/SLO.',
          lessons: [
            {
              id: 'sa-l-27-1',
              title: 'The Three Pillars of Observability',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Tiga Pilar Observabilitas
1. **Metrics:** Data numerik teragregasi (CPU, throughput).
2. **Logs:** Rekaman diskrit kejadian diskrit dengan stempel waktu.
3. **Traces:** Jejak perjalanan request melintasi batas mikroservis.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Contoh instrumentasi OpenTelemetry sederhana`
                }
              ]
            },
            {
              id: 'sa-l-27-2',
              title: 'Kuis Module 27 — Observability Architecture',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-27-1',
                  question: 'Sebutkan Tiga Pilar Observabilitas (*The Three Pillars of Observability*) dalam sistem modern.',
                  options: ['Metrics, Logs, Traces', 'CPU, RAM, Disk', 'Frontend, Backend, Database', 'Input, Process, Output'],
                  correctAnswerIndex: 0,
                  explanation: 'Metrics, logs, dan traces adalah pilar utama pemahaman sistem.'
                },
                {
                  id: 'sa-q-27-2',
                  question: 'Apa perbedaan utama antara Monitoring dan Observability?',
                  options: [
                    'Monitoring memberitahu kita *bahwa* sistem sedang rusak, Observability memungkinkan kita menyelidiki *mengapa* sistem itu rusak',
                    'Keduanya sama persis',
                    'Monitoring hanya untuk database',
                    'Observability tidak butuh data'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Monitoring adalah deteksi gejala, observability adalah kemampuan investigasi mendalam.'
                },
                {
                  id: 'sa-q-27-3',
                  question: 'Apa fungsi dari OpenTelemetry dalam arsitektur cloud-native?',
                  options: [
                    'Standar open-source tunggal untuk mengumpulkan metrics, logs, dan traces secara universal tanpa terikat vendor tertentu',
                    'Framework web JavaScript',
                    'Database terdistribusi',
                    'Alat enkripsi'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'OpenTelemetry menyeragamkan standar instrumentasi telemetri.'
                },
                {
                  id: 'sa-q-27-4',
                  question: 'Apa kegunaan Distributed Tracing saat terjadi latensi tinggi di mikroservis?',
                  options: [
                    'Menunjukkan secara persis servis atau kueri database mana yang memicu kelambatan dalam rantai panggilan',
                    'Melacak lokasi GPS server',
                    'Mengubah warna dashboard',
                    'Menghapus log error'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Distributed tracing mengidentifikasi bottleneck di antara puluhan servis.'
                },
                {
                  id: 'sa-q-27-5',
                  question: 'Apa itu SLI (Service Level Indicator) dalam manajemen keandalan?',
                  options: [
                    'Metrik kuantitatif kinerja nyata sistem (misal: tingkat keberhasilan request atau latensi HTTP)',
                    'Kontrak hukum bisnis',
                    'Nama server cloud',
                    'Password admin'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'SLI adalah metrik dasar yang mengukur kualitas layanan aktual.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m28',
          title: 'Module 28 — Architecture Patterns',
          description: 'Event-driven, broker, brokerless, CQRS, serverless, plugin architecture, dan pipes & filters.',
          lessons: [
            {
              id: 'sa-l-28-1',
              title: 'Pipes & Filters & Plugin Architecture',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Pola Pipes and Filters
Cocok untuk pemrosesan data (data pipeline) di mana setiap filter menerima input, memproses, dan meneruskan output ke pipa berikutnya secara independen.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Contoh sederhana Pipes and Filters
const pipeline = (input: string) => sanitize(trim(toLowerCase(input)));`
                }
              ]
            },
            {
              id: 'sa-l-28-2',
              title: 'Kuis Module 28 — Architecture Patterns',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-28-1',
                  question: 'Apa karakteristik dari pola arsitektur Pipes and Filters?',
                  options: [
                    'Terdiri dari elemen pemrosesan (filters) yang dihubungkan oleh saluran data (pipes), ideal untuk pengolahan data bertahap',
                    'Saluran pipa air gedung',
                    'Arsitektur database SQL',
                    'Koneksi Wi-Fi'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Pipes and filters memecah transformasi data menjadi langkah-langkah modular.'
                },
                {
                  id: 'sa-q-28-2',
                  question: 'Apa tujuan dari Plugin Architecture (Microkernel Architecture)?',
                  options: [
                    'Memisahkan inti sistem yang minimal (*core system*) dari ekstensi plugin opsional yang dapat dipasang atau dilepas dinamis',
                    'Membuat aplikasi menjadi plugin browser',
                    'Menghapus kode utama',
                    'Mempercepat CPU'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Microkernel architecture memaksimalkan ekstensibilitas sistem.'
                },
                {
                  id: 'sa-q-28-3',
                  question: 'Apa keunggulan arsitektur Serverless untuk beban kerja yang sangat fluktuatif (*spiky traffic*)?',
                  options: [
                    'Skalabilitas instan otomatis dari nol ke ribuan instance dan tidak ada biaya saat menganggur (*pay-per-execution*)',
                    'Selalu berjalan 24 jam penuh',
                    'Membutuhkan server fisik sendiri',
                    'Lebih lambat dari VM'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Serverless menghilangkan pemborosan biaya idle saat trafik kosong.'
                },
                {
                  id: 'sa-q-28-4',
                  question: 'Apa itu pola Broker dalam komunikasi sistem terdistribusi?',
                  options: [
                    'Komponen perantara (broker pesan) yang mengatur komunikasi antar komponen terdistribusi tanpa koneksi langsung',
                    'Pialang saham keuangan',
                    'Database utama',
                    'API Gateway publik'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Broker mengatur perutean pesan antar produsen dan konsumen.'
                },
                {
                  id: 'sa-q-28-5',
                  question: 'Kapan pola Plugin Architecture sangat direkomendasikan?',
                  options: [
                    'Saat aplikasi membutuhkan ekstensibilitas pihak ketiga yang tinggi (misal: IDE, CMS, atau software editor)',
                    'Untuk aplikasi kalkulator sederhana',
                    'Saat tidak butuh database',
                    'Selalu untuk semua proyek'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Plugin architecture ideal untuk produk yang memerlukan modul tambahan pihak ketiga.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m29',
          title: 'Module 29 — System Design Methodology',
          description: 'Framework 4 langkah untuk menjawab wawancara system design & real-world architecture.',
          lessons: [
            {
              id: 'sa-l-29-1',
              title: 'Metodologi 4 Langkah Perancangan Sistem',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Framework Perancangan Sistem
1. **Clarify Requirements & Estimate Scale:** Tanyakan fungsionalitas, NFR, dan hitung estimasi QPS (Read/Write).
2. **High-Level Design:** Gambarkan komponen utama (Client, API Gateway, Services, DB, Cache).
3. **Detailed Design:** Rancang skema database, API contract, dan algoritma inti.
4. **Identify Bottlenecks & Scale:** Tangani single point of failure, caching, sharding, dan monitoring.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Estimasi QPS sederhana: 100 Juta DAU * 20 request/hari / 86400 detik`
                }
              ]
            },
            {
              id: 'sa-l-29-2',
              title: 'Kuis Module 29 — System Design Methodology',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-29-1',
                  question: 'Apa langkah pertama yang wajib dilakukan saat merancang sebuah sistem skala besar?',
                  options: [
                    'Mengklarifikasi kebutuhan fungsional dan non-fungsional, lalu menghitung estimasi skala beban (QPS)',
                    'Langsung menulis kode program',
                    'Membeli server termahal',
                    'Memilih warna logo aplikasi'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Estimasi skala dan klarifikasi batasan menentukan arah desain arsitektur.'
                },
                {
                  id: 'sa-q-29-2',
                  question: 'Bagaimana cara memperkirakan jumlah Read QPS (Query Per Second) dari 10 Juta Daily Active Users (DAU) yang masing-masing melakukan 10 request baca per hari?',
                  options: [
                    '10.000.000 * 10 / 86.400 detik ≈ 1.157 QPS rata-rata',
                    '10 Juta dikali 10 juta',
                    '86.400 dibagi 10',
                    'Tidak bisa dihitung'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'QPS rata-rata dihitung dengan membagi total request harian dengan jumlah detik dalam sehari.'
                },
                {
                  id: 'sa-q-29-3',
                  question: 'Mengapa dalam perancangan sistem kita harus selalu memperhitungkan Peak QPS (Beban Puncak) alih-alih QPS rata-rata?',
                  options: [
                    'Karena beban puncak bisa 2 hingga 5 kali lipat lebih tinggi, dan sistem harus mampu bertahan tanpa down saat lonjakan terjadi',
                    'Karena rata-rata tidak penting',
                    'Agar tagihan cloud membengkak',
                    'Tidak ada alasan khusus'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Infrastruktur harus di-provision untuk menghadapi beban puncak, bukan rata-rata.'
                },
                {
                  id: 'sa-q-29-4',
                  question: 'Apa tujuan dari membuat High-Level Design di awal perancangan?',
                  options: [
                    'Menyajikan gambaran besar komponen utama dan alur data agar disetujui tim sebelum masuk ke detail teknis rumit',
                    'Menghabiskan waktu rapat',
                    'Membuat diagram yang rumit',
                    'Menulis kode database'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'High-level design menyelaraskan pemahaman makro arsitektur.'
                },
                {
                  id: 'sa-q-29-5',
                  question: 'Apa yang dimaksud dengan Single Point of Failure (SPOF) dalam evaluasi desain sistem?',
                  options: [
                    'Komponen tunggal yang jika gagal atau mati, akan menyebabkan seluruh sistem ikut lumpuh total',
                    'Pintu masuk kantor',
                    'Tombol 1 di keyboard',
                    'Satu baris kode bug'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'SPOF harus dieliminasi melalui redundansi.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m30',
          title: 'Module 30 — Large-Scale System Design',
          description: 'Merancang sistem dunia nyata: URL Shortener, Chat System, News Feed, dan Ride Sharing.',
          lessons: [
            {
              id: 'sa-l-30-1',
              title: 'System Design Studi Kasus: URL Shortener & News Feed',
              type: 'learn',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
                  content: `### Studi Kasus: URL Shortener (Bit.ly style)
- **Hash Function / Base62 Encoding:** Mengubah ID unik auto-increment database menjadi string pendek 6-7 karakter.
- **Redirect:** Menggunakan HTTP Status 301 (Moved Permanently) atau 302 (Found) dengan caching Redis di depan.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Contoh logika Base62 encoding sederhana untuk URL Shortener
const CHARSET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function encodeBase62(num: number): string {
  let encoded = "";
  while (num > 0) {
    encoded = CHARSET[num % 62] + encoded;
    num = Math.floor(num / 62);
  }
  return encoded;
}`
                }
              ]
            },
            {
              id: 'sa-l-30-2',
              title: 'Kuis Module 30 — Large-Scale System Design',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-30-1',
                  question: 'Teknik apa yang umum digunakan untuk menghasilkan token pendek unik dalam perancangan URL Shortener?',
                  options: [
                    'Base62 Encoding (mengubah ID numerik database menjadi string alfanumerik a-z, A-Z, 0-9)',
                    'Pengacakan huruf acak tanpa aturan',
                    'Menghapus URL asli',
                    'Menggunakan format XML'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Base62 menghasilkan string pendek yang ringkas dan aman untuk URL.'
                },
                {
                  id: 'sa-q-30-2',
                  question: 'Dalam perancangan News Feed (seperti Twitter/X timeline), apa perbedaan model Fan-out on Write (Push) dan Fan-out on Read (Pull)?',
                  options: [
                    'Fan-out on Write menulis postingan ke kotak masuk (timeline) semua follower saat diposting; Fan-out on Read menggabungkan postingan saat pengguna membuka aplikasi',
                    'Keduanya sama persis',
                    'Push lebih lambat dari Pull',
                    'Pull tidak butuh database'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Fan-out on write mengoptimalkan kecepatan baca, fan-out on read menghemat ruang tulis.'
                },
                {
                  id: 'sa-q-30-3',
                  question: 'Bagaimana cara menangani selebritis (celebrity user dengan jutaan follower) pada sistem News Feed Fan-out?',
                  options: [
                    'Menggunakan pendekatan hibrid: Fan-out on Read khusus untuk akun selebritis guna menghindari ledakan penulisan data masif',
                    'Menghapus akun selebritis',
                    'Mematikan server saat mereka posting',
                    'Tidak ada penanganan khusus'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Pendekatan hibrid mencegah write amplification saat selebritis posting.'
                },
                {
                  id: 'sa-q-30-4',
                  question: 'Apa peran WebSocket atau SSE (Server-Sent Events) dalam perancangan sistem Chat real-time?',
                  options: [
                    'Menyediakan koneksi persisten dua arah (*full-duplex*) agar pesan baru dapat dikirim secara instan tanpa polling berulang',
                    'Menyimpan database SQL',
                    'Mengatur DNS',
                    'Mempercepat file CSS'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'WebSocket menghilangkan latensi polling HTTP untuk chat real-time.'
                },
                {
                  id: 'sa-q-30-5',
                  question: 'Bagaimana cara kerja geohashing dalam perancangan sistem Location-Based (seperti Ride Sharing / Uber)?',
                  options: [
                    'Mengubah koordinat lintang dan bujur (latitude/longitude) menjadi string hierarkis pendek yang merepresentasikan kotak grid geografis',
                    'Mengunci lokasi pengguna',
                    'Menghapus GPS',
                    'Membuat peta fisik'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Geohashing mempermudah pencarian driver terdekat dalam grid spasial.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m31',
          title: 'Module 31 — Production Architecture',
          description: 'Multi-region deployments, disaster recovery architectures, cost governance, dan architectural evolution.',
          lessons: [
            {
              id: 'sa-l-31-1',
              title: 'Multi-Region Active-Active Architecture',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Arsitektur Multi-Region Active-Active
Menjalankan layanan penuh di beberapa benua/region cloud secara bersamaan. Trafik dirutekan via Anycast DNS / Geo-routing ke region terdekat untuk latensi minimal dan ketahanan total terhadap bencana tingkat pusat data.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Konsep global traffic management & database replication lintas region`
                }
              ]
            },
            {
              id: 'sa-l-31-2',
              title: 'Kuis Module 31 — Production Architecture',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'sa-q-31-1',
                  question: 'Apa keuntungan utama dari arsitektur Multi-Region Active-Active dibanding Active-Passive?',
                  options: [
                    'Menyediakan latensi terendah bagi pengguna global dan zero downtime (pemulihan instan) jika satu region cloud mengalami bencana total',
                    'Biaya jauh lebih murah',
                    'Pengelolaan database sangat sederhana',
                    'Tidak butuh load balancer'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Active-active memberikan ketersediaan global tertinggi dan latensi minimal.'
                },
                {
                  id: 'sa-q-31-2',
                  question: 'Apa tantangan teknis tersulit dalam implementasi database Multi-Region Active-Active?',
                  options: [
                    'Menangani konflik replikasi data lintas region dan keterlambatan konsistensi (*replication lag*) akibat kecepatan cahaya di jaringan global',
                    'Ukuran font database',
                    'Kapasitas RAM server lokal',
                    'Tidak ada tantangan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Hukum fisika kecepatan cahaya memicu jeda replikasi data lintas benua.'
                },
                {
                  id: 'sa-q-31-3',
                  question: 'Apa fungsi dari Global Traffic Manager / DNS Geo-routing?',
                  options: [
                    'Mengarahkan permintaan pengguna ke pusat data atau region cloud terdekat secara geografis untuk performa optimal',
                    'Memblokir semua akses internet',
                    'Menyimpan file log',
                    'Membuat password'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Geo-routing mendekatkan pengguna dengan server terdekat.'
                },
                {
                  id: 'sa-q-31-4',
                  question: 'Mengapa evolusi arsitektur secara bertahap (*evolutionary architecture*) lebih disukai daripada merancang ulang total dari nol (*rewrite from scratch*?',
                  options: [
                    'Rewrite total sangat berisiko tinggi gagal, memakan waktu lama, dan sering kali mengulangi bug lama yang sama',
                    'Rewrite total selalu gratis',
                    'Evolutionary architecture dilarang',
                    'Tidak ada bedanya'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Merenovasi sistem secara bertahap menjaga kontinuitas bisnis.'
                },
                {
                  id: 'sa-q-31-5',
                  question: 'Apa peran Chaos Testing pada arsitektur produksi berskala besar?',
                  options: [
                    'Memvalidasi asumsi keandalan sistem dan memastikan mekanisme failover berjalan otomatis saat terjadi bencana nyata',
                    'Membuat kekacauan di kantor',
                    'Menghapus data produksi',
                    'Mengurangi gaji'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Chaos testing membuktikan keandalan sistem di bawah kondisi kegagalan.'
                }
              ]
            }
          ]
        },
        {
          id: 'software-architecture-m32',
          title: 'Module 32 — Software Architecture Capstone',
          description: 'Merancang dan mempresentasikan dokumen arsitektur sistem produksi end-to-end.',
      lessons: [
            {
              id: 'sa-l-32-1',
              title: 'Capstone: Production System Architecture',
              type: 'project',
              xpReward: 250,
              content: [
                {
                  type: 'markdown',
                  content: `### Proyek Akhir: Production System Architecture Design
Rancang dokumen dan diagram arsitektur sistem skala besar produksi (misal: Global E-Commerce & Payment Platform) yang mencakup:
1. **Requirements & NFRs:** Estimasi QPS, SLO, dan batasan.
2. **High-Level Diagram:** Klien, CDN, API Gateway, Microservices Bounded Contexts.
3. **Data & Caching:** Skema database per service, Redis caching, dan SAGA pattern untuk transaksi pembayaran.
4. **Resilience & Scalability:** Circuit breaker, rate limiting, HPA, dan multi-region failover.
5. **Observability & Security:** OpenTelemetry, Zero Trust, dan ADR (Architectural Decision Records).

Selamat menyelesaikan kurikulum Software Architecture & System Design COMMANDEV!`
                },
                {
                  type: 'code-example',
                  language: 'markdown',
                  code: `# Spanduk Dokumen ADR & System Design Capstone`
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
