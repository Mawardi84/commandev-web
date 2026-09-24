import { Course } from '../types';

export const DATABASE_COURSE: Course = {
  id: 'database-mastery',
  title: 'Database & SQL Engineering',
  shortDescription: 'Kuasai pemodelan data relasional, sintaks SQL (SELECT, JOIN, GROUP BY, Indexing), ACID transactions, serta NoSQL document databases.',
  description: 'Data adalah inti dari setiap sistem informasi. Pelajari cara merancang skema database ternormalisasi, menulis query SQL yang efisien, membuat relasi foreign key, serta memahami kapan menggunakan database NoSQL / Document Store.',
  icon: 'database',
  levels: [
    {
      id: 'db-lvl-0',
      title: 'Level 0 — Relational Database & SQL Basics',
      description: 'Konsep entitas tabel, primary key, foreign key, dan query CRUD dasar (Create, Read, Update, Delete).',
      modules: [
        {
          id: 'db-mod-1',
          title: 'Dasar SQL & Querying',
          description: 'SELECT, WHERE, ORDER BY, INSERT, UPDATE, DELETE.',
          lessons: [
            {
              id: 'db-les-1',
              title: 'Pengantar Basis Data & Syntax SQL',
              type: 'learn',
              xpReward: 20,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'sql',
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
              id: 'db-les-quiz-1',
              title: 'Kuis Relational Data & SQL Query',
              type: 'quiz',
              xpReward: 25,
              questions: [
                {
                  id: 'dbq-1',
                  question: 'Klausa SQL mana yang digunakan untuk memfilter baris data berdasarkan kondisi tertentu?',
                  options: ['ORDER BY', 'GROUP BY', 'WHERE', 'HAVING'],
                  correctAnswerIndex: 2,
                  explanation: 'Klausa `WHERE` digunakan untuk menyaring record yang memenuhi kriteria kondisi tertentu.'
                },
                {
                  id: 'dbq-2',
                  question: 'Kunci unik yang digunakan untuk menghubungkan satu tabel ke tabel lainnya disebut:',
                  options: ['Primary Key', 'Foreign Key', 'Composite Key', 'Candidate Key'],
                  correctAnswerIndex: 1,
                  explanation: '`Foreign Key` adalah field pada satu tabel yang mereferensikan Primary Key dari tabel lain untuk membentuk relasi.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'db-lvl-1',
      title: 'Level 1 — Filtering, Sorting & Operators',
      description: 'Operator perbandingan, logika AND/OR, LIKE pattern matching, dan BETWEEN.',
      modules: [
        {
          id: 'db-mod-2',
          title: 'Advanced Filtering & Pencarian',
          description: 'Penggunaan wildcard LIKE, IN, NOT IN, dan fungsi manipulasi teks.',
          lessons: [
            {
              id: 'db-les-2',
              title: 'Filter Lanjutan dengan LIKE & IN',
              type: 'learn',
              xpReward: 25,
              content: [
                {
                  type: 'markdown',
                  content: `### Pencarian Data dengan Pattern Matching

- **LIKE '%keyword%'**: Mencari teks yang mengandung string di posisi manapun.
- **IN ('A', 'B', 'C')**: Menyaring data yang nilainya ada dalam sekumpulan daftar.
- **BETWEEN min AND max**: Memfilter rentang nilai (angka atau tanggal).`
                },
                {
                  type: 'code-example',
                  language: 'sql',
                  code: `-- Mencari pengguna dengan domain email tertentu dan rentang XP
SELECT name, email, xp 
FROM users 
WHERE email LIKE '%@commandev.app' 
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
      id: 'db-lvl-2',
      title: 'Level 2 — Aggregations & GROUP BY',
      description: 'Fungsi agregat COUNT, SUM, AVG, MIN, MAX, GROUP BY, dan filter HAVING.',
      modules: [
        {
          id: 'db-mod-3',
          title: 'Agregasi & Analitik Data',
          description: 'Meringkas data dalam kelompok menggunakan GROUP BY dan HAVING.',
          lessons: [
            {
              id: 'db-les-3',
              title: 'Menghitung Statistik dengan GROUP BY',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### Perbedaan WHERE vs HAVING:
- **WHERE**: Menyaring baris data **sebelum** proses pengelompokan (GROUP BY).
- **HAVING**: Menyaring kelompok data **setelah** fungsi agregat dihitung.`
                },
                {
                  type: 'code-example',
                  language: 'sql',
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
      id: 'db-lvl-3',
      title: 'Level 3 — Table Relations & JOINs',
      description: 'Menghubungkan multitabel dengan INNER JOIN, LEFT JOIN, RIGHT JOIN, dan relasi Many-to-Many.',
      modules: [
        {
          id: 'db-mod-4',
          title: 'Relasi Antartabel',
          description: 'Menggabungkan tabel referensi dan menangani data bernilai NULL.',
          lessons: [
            {
              id: 'db-les-4',
              title: 'Menggabungkan Data dengan INNER JOIN & LEFT JOIN',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Tipe-Tipe JOIN:
1. **INNER JOIN**: Mengembalikan baris yang memiliki pasangan data yang cocok di kedua tabel.
2. **LEFT JOIN**: Mengembalikan **semua baris** dari tabel kiri, beserta data tabel kanan jika ada (atau NULL jika tidak ada).`
                },
                {
                  type: 'code-example',
                  language: 'sql',
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
      id: 'db-lvl-4',
      title: 'Level 4 — Database Design, Indexes & ACID',
      description: 'Normalisasi data (1NF, 2NF, 3NF), Indexing untuk performa, dan Transaksi ACID.',
      modules: [
        {
          id: 'db-mod-5',
          title: 'Optimasi & Integritas Transaksi',
          description: 'B-Tree Indexes, BEGIN/COMMIT/ROLLBACK, dan pencegahan race conditions.',
          lessons: [
            {
              id: 'db-les-5',
              title: 'Transaksi Database & Garansi ACID',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### 4 Pilar ACID:
- **Atomicity**: Seluruh operasi berhasil, atau tidak sama sekali (*all or nothing*).
- **Consistency**: Data selalu mematuhi aturan constraint dan validitas skema.
- **Isolation**: Transaksi konkuren tidak saling merusak proses satu sama lain.
- **Durability**: Data yang sudah di-commit dijamin aman tersimpan di disk permanen.`
                },
                {
                  type: 'code-example',
                  language: 'sql',
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
      id: 'db-lvl-5',
      title: 'Level 5 — Proyek Nyata Database',
      description: 'Mendesain skema database relasional lengkap untuk platform e-commerce / LMS.',
      modules: [
        {
          id: 'db-mod-6',
          title: 'Capstone: Relational Database Schema Design',
          description: 'Praktik langsung query analitik dan pengujian di SQL Interactive Studio.',
          lessons: [
            {
              id: 'db-les-project',
              title: 'Proyek Terpandu: SQL Query & Relational Schema',
              type: 'practice',
              xpReward: 100,
              content: [
                {
                  type: 'markdown',
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
