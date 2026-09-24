import { Course } from '../types';

export const MYSQL_COURSE: Course = {
  id: 'mysql-mastery',
  title: 'MySQL 8 & Enterprise Database Architecture',
  shortDescription: 'Kuasai arsitektur database relasional modern: Normalisasi 3NF, B+Tree Indexing, EXPLAIN ANALYZE, Transaksi ACID, Window Functions, dan Pencegahan Deadlock.',
  description: 'Database relasional adalah jantung sistem finansial, e-commerce, dan enterprise di seluruh dunia. Pelajari MySQL 8.x dari fondasi desain skema dan normalisasi 3NF, query JOIN & Subquery tingkat lanjut, Window Functions, arsitektur mesin penyimpanan InnoDB (Buffer Pool, Redo/Undo Log), optimasi indeks B+ Tree dan Covering Index, bedah execution plan EXPLAIN ANALYZE, hingga mekanisme locking dan mitigasi deadlock dengan analisis kompleksitas algoritma mendalam.',
  icon: 'database',
  levels: [
    {
      id: 'mysql-lvl-0',
      title: 'Level 0 — Desain Database Relasional & Normalisasi Skema',
      description: 'Pemodelan data konseptual, entitas, primary key, foreign key constraints, dan normalisasi 1NF, 2NF, 3NF hingga BCNF.',
      modules: [
        {
          id: 'mysql-mod-1',
          title: 'Pemodelan Data & Desain Skema Relasional',
          description: 'Membangun skema tabel yang kokoh, pemilihan tipe data presisi, dan integritas referensial antar entitas.',
          lessons: [
            {
              id: 'mysql-les-schema-design',
              title: 'Prinsip Desain Skema: Tipe Data, Constraints & Primary Key',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### Fondasi Database Enterprise: Memilih Tipe Data dengan Presisi

Kesalahan umum dalam desain database adalah memilih tipe data yang terlalu boros (misal memakai \`VARCHAR(255)\` untuk status yang hanya 10 karakter, atau memakai \`DOUBLE\` untuk saldo uang).

#### Aturan Emas Tipe Data di MySQL 8:
1. **Keuangan / Mata Uang:** Wajib gunakan \`DECIMAL(15, 2)\` atau simpan dalam satuan terkecil (\`BIGINT\` sen). **Dilarang keras memakai FLOAT/DOUBLE** karena memiliki masalah presisi IEEE 754 floating-point.
2. **Primary Key:** Preferensikan \`BIGINT UNSIGNED AUTO_INCREMENT\` untuk tabel dengan pertumbuhan masif, atau \`BINARY(16)\` jika memerlukan UUID v7 yang terurut waktu (*time-ordered UUID*).
3. **Status / Pilihan Tetap:** Gunakan \`VARCHAR(20)\` dengan \`CHECK\` constraint atau \`ENUM\` terkontrol.
4. **Waktu:** Gunakan \`DATETIME\` (independen dari timezone) atau \`TIMESTAMP\` (otomatis konversi UTC, rentang tahun 1970–2038).

---

### Deep-Dive Theory: InnoDB Physical Row Formats (COMPACT vs DYNAMIC)
Di bawah kap mesin InnoDB, data disimpan dalam **Pages berukuran 16 KB**:
- **Format DYNAMIC (Default MySQL 8.0):** Jika kolom \`VARCHAR\` atau \`TEXT\` berukuran sangat besar dan tidak muat dalam 1 halaman 16 KB, InnoDB menyimpan pointer 20-byte pada baris utama dan menempatkan sisa payload ke **Off-Page Overflow Pages**.
- **Page Packing Efficiency:** Memilih tipe data seminimal mungkin (misal \`TINYINT\` 1 byte vs \`INT\` 4 byte) melipatgandakan jumlah baris yang muat dalam 1 halaman RAM Buffer Pool, memangkas kebutuhan disk I/O secara drastis!`
                },
                {
                  type: 'code-example',
                  language: 'sql',
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
              id: 'mysql-les-fk-relationships',
              title: 'Integritas Referensial: Foreign Key Constraints & Cascade Actions',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### Menjaga Hubungan Antar Tabel (Relational Integrity)

Foreign Key (FK) memastikan bahwa baris di tabel anak tidak akan pernah menjadi *orphan record* (merujuk ke data induk yang tidak ada).

#### Opsi Aksi Integritas Referensial:
- **\`ON DELETE RESTRICT\` (Default & Teraman):** Menolak penghapusan baris induk jika masih ada baris anak yang merujuk kepadanya.
- **\`ON DELETE CASCADE\`:** Jika baris induk dihapus, seluruh baris anak yang bersangkutan akan ikut terhapus secara otomatis oleh database engine.
- **\`ON DELETE SET NULL\`:** Jika baris induk dihapus, kolom FK di tabel anak disetel menjadi \`NULL\` (kolom anak harus nullable).

---

### Deep-Dive: Foreign Key Validation Internals & Hidden Index Overhead
1. **Indeks Wajib:** MySQL InnoDB **mewajibkan** pembuatan index pada kolom yang menjadi Foreign Key. Jika kamu tidak membuatnya secara manual, InnoDB akan membuat indeks tersembunyi secara otomatis.
2. **Validasi $O(\log N)$ Point Lookup:** Setiap operasi \`INSERT\` ke tabel anak memicu pencarian B+ Tree internal ke Primary Key tabel induk dengan kompleksitas $O(\log N)$ untuk memvalidasi keberadaan relasi.`
                },
                {
                  type: 'code-example',
                  language: 'sql',
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
              id: 'mysql-les-practice-schema-modeling',
              title: 'ADVANCED PRACTICE: High-Throughput Multi-Tenant E-Commerce DDL Architecture',
              type: 'practice',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
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
                'Gunakan BIGINT UNSIGNED untuk Primary Key agar mampu menampung miliaran transaksi tanpa overflow',
                'Terapkan CONSTRAINT uq_tenant_customer_email UNIQUE (tenant_id, email) untuk multi-tenancy isolation',
                'Pastikan ENGINE=InnoDB digunakan untuk mendukung integritas transaksi dan foreign key'
              ],
              requirements: [
                {
                  id: 'req-ddl-tenants',
                  description: 'Mendefinisikan tabel tenants dengan id BIGINT PRIMARY KEY dan subdomain UNIQUE',
                  validate: (code) => code.includes('CREATE TABLE tenants') && code.includes('subdomain') && code.includes('UNIQUE')
                },
                {
                  id: 'req-ddl-customers-uq',
                  description: 'Mendefinisikan tabel customers dengan composite unique key (tenant_id, email)',
                  validate: (code) => code.includes('CREATE TABLE customers') && code.includes('FOREIGN KEY (tenant_id)') && code.includes('UNIQUE (tenant_id, email)')
                }
              ]
            },
            {
              id: 'mysql-les-quiz-schema',
              title: 'Kuis Pemodelan Data & Constraints',
              type: 'quiz',
              xpReward: 30,
              questions: [
                {
                  id: 'mq-sch-1',
                  question: 'Tipe data apa yang WAJIB digunakan untuk menyimpan nominal mata uang pada database finansial di MySQL?',
                  options: [
                    'DECIMAL atau BIGINT (dalam satuan sen terkecil)',
                    'FLOAT',
                    'DOUBLE',
                    'REAL'
                  ],
                  correctAnswerIndex: 0,
                  explanation: '`DECIMAL(M,D)` atau `BIGINT` (satuan sen) menjamin akurasi bilangan bulat/fixed-point tanpa resiko pembulatan presisi IEEE-754 yang terdapat pada FLOAT dan DOUBLE.'
                },
                {
                  id: 'mq-sch-2',
                  question: 'Apa dampak dari aksi ON DELETE RESTRICT pada sebuah Foreign Key?',
                  options: [
                    'Menolak dan menggagalkan query DELETE baris induk jika masih ada baris anak yang berelasi',
                    'Menghapus seluruh baris anak secara otomatis',
                    'Mengubah nilai foreign key di baris anak menjadi 0',
                    'Menonaktifkan database server sementara'
                  ],
                  correctAnswerIndex: 0,
                  explanation: '`ON DELETE RESTRICT` adalah proteksi standar yang menolak penghapusan record induk bila masih memiliki keterkaitan relasional dengan record di tabel anak.'
                }
              ]
            }
          ]
        },
        {
          id: 'mysql-mod-2',
          title: 'Normalisasi Basis Data (1NF, 2NF, 3NF & BCNF)',
          description: 'Menghilangkan redundansi data, menghindari anomali update/delete, dan merancang relasi sesuai kaidah matematika relational model.',
          lessons: [
            {
              id: 'mysql-les-normalization',
              title: 'Dari Unnormalized Form (UNF) ke Third Normal Form (3NF)',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'sql',
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
              id: 'mysql-les-practice-normalization',
              title: 'ADVANCED PRACTICE: Normalizing Legacy Denormalized Order Table into 3NF',
              type: 'practice',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
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
                'Pisahkan data pelanggan, produk, pesanan, dan baris pesanan ke dalam tabel terpisah',
                'Simpan historical_price_cents pada order_items agar perubahan harga produk di masa depan tidak merusak laporan transaksi masa lalu',
                'Gunakan ENUM untuk customer tier agar membatasi nilai yang sah'
              ],
              requirements: [
                {
                  id: 'req-norm-customers',
                  description: 'Mendefinisikan tabel customers dengan email UNIQUE dan tier ENUM',
                  validate: (code) => code.includes('CREATE TABLE customers') && code.includes('email') && code.includes('tier')
                },
                {
                  id: 'req-norm-items',
                  description: 'Mendefinisikan tabel order_items dengan foreign keys ke orders dan products',
                  validate: (code) => code.includes('CREATE TABLE order_items') && code.includes('FOREIGN KEY (order_id)') && code.includes('FOREIGN KEY (product_id)')
                }
              ]
            },
            {
              id: 'mysql-les-quiz-norm',
              title: 'Kuis Normalisasi Database',
              type: 'quiz',
              xpReward: 30,
              questions: [
                {
                  id: 'mq-norm-1',
                  question: 'Kondisi apa yang harus dipenuhi oleh skema tabel agar sah dikatakan memenuhi Third Normal Form (3NF)?',
                  options: [
                    'Telah memenuhi 2NF dan tidak memiliki ketergantungan transitif antar kolom non-key',
                    'Hanya memiliki 3 kolom',
                    'Tabel memiliki 3 Primary Key sekaligus',
                    'Tidak menggunakan foreign key'
                  ],
                  correctAnswerIndex: 0,
                  explanation: '3NF mensyaratkan tabel telah berada dalam 2NF dan menghilangkan transitive dependency (kolom non-key tidak boleh bergantung pada kolom non-key lainnya).'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'mysql-lvl-1',
      title: 'Level 1 — Sintaks Query Komprehensif (DML & Aggregation)',
      description: 'SELECT, WHERE, HAVING, GROUP BY, Hash Join vs Nested Loop, Anti-Join, Correlated Subqueries, dan Analisis Kompleksitas.',
      modules: [
        {
          id: 'mysql-mod-3',
          title: 'Filter, Operator Logika & Agregasi Data',
          description: 'Pengambilan data kompleks, Three-Valued Logic (3VL), dan optimasi agregasi GROUP BY berskala jutaan baris.',
          lessons: [
            {
              id: 'mysql-les-query-basics',
              title: 'Eksekusi Query: WHERE, LIKE, IN, BETWEEN & Three-Valued Logic',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'sql',
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
              id: 'mysql-les-aggregation',
              title: 'Agregasi Data: COUNT, SUM, AVG, GROUP BY & HAVING',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'sql',
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
              id: 'mysql-les-practice-aggregation-analytics',
              title: 'ADVANCED PRACTICE: High-Volume Sales Cohort & Revenue Metrics ($O(N \\log N)$ Aggregation)',
              type: 'practice',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
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
                'Klausa HAVING COUNT(*) >= 10 menyaring grup setelah kalkulasi agregasi',
                'Filter WHERE created_at >= "2026-01-01" membatasi dataset mentah sebelum GROUP BY'
              ],
              requirements: [
                {
                  id: 'req-agg-group',
                  description: 'Menggunakan GROUP BY dengan DATE_FORMAT dan status',
                  validate: (code) => code.includes('GROUP BY') && code.includes('DATE_FORMAT') && code.includes('status')
                },
                {
                  id: 'req-agg-having',
                  description: 'Menerapkan klausa HAVING untuk memfilter jumlah pesanan minimal 10',
                  validate: (code) => code.includes('HAVING') && (code.includes('COUNT(*)') || code.includes('total_orders'))
                }
              ]
            },
            {
              id: 'mysql-les-quiz-agg',
              title: 'Kuis Query & Agregasi SQL',
              type: 'quiz',
              xpReward: 30,
              questions: [
                {
                  id: 'mq-q-1',
                  question: 'Manakah dari tahapan berikut yang dieksekusi PALING AWAL oleh MySQL Query Execution Engine?',
                  options: ['FROM & JOIN', 'SELECT', 'WHERE', 'ORDER BY'],
                  correctAnswerIndex: 0,
                  explanation: 'Query engine memproses `FROM` & `JOIN` terlebih dahulu untuk menyusun dataset dasar sebelum menyaringnya dengan `WHERE` dan memilih kolom dengan `SELECT`.'
                },
                {
                  id: 'mq-q-2',
                  question: 'Apa hasil dari ekspresi boolean SQL: NULL = NULL?',
                  options: [
                    'UNKNOWN (bukan TRUE)',
                    'TRUE',
                    'FALSE',
                    'Fatal Error'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Dalam standar SQL Three-Valued Logic (3VL), NULL merepresentasikan nilai yang tidak diketahui (unknown), sehingga perbandingan NULL = NULL menghasilkan UNKNOWN.'
                }
              ]
            }
          ]
        },
        {
          id: 'mysql-mod-4',
          title: 'Penguasaan Relasi Multi-Tabel: JOINs & Subqueries',
          description: 'INNER, LEFT, RIGHT JOIN, Anti-Join pattern, Correlated Subqueries, dan Algoritma Hash Join (MySQL 8.0.18+).',
          lessons: [
            {
              id: 'mysql-les-joins',
              title: 'INNER, LEFT, RIGHT JOIN & Pola Anti-Join',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'sql',
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
              id: 'mysql-les-subqueries',
              title: 'Subqueries: Scalar, Correlated & EXISTS vs IN',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Scalar Subquery vs Correlated Subquery

- **Scalar Subquery:** Mengembalikan satu nilai tunggal (1 baris, 1 kolom), dieksekusi satu kali secara independen.
- **Correlated Subquery:** Subquery yang mereferensikan kolom dari query luar (*outer query*). Subquery ini dieksekusi ulang untuk **setiap baris** yang diproses oleh query luar.

#### Aturan Performa: \`EXISTS\` vs \`IN\`
Ketika mengecek keberadaan data di tabel berukuran besar:
- \`EXISTS\` menggunakan *short-circuit evaluation*: begitu menemukan 1 kecocokan baris pertama, ia langsung berhenti mencari dan mengembalikan \`TRUE\`.
- \`NOT IN\` berbahaya jika subquery menghasilkan nilai \`NULL\`. Selalu preferensikan \`NOT EXISTS\`!`
                },
                {
                  type: 'code-example',
                  language: 'sql',
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
              id: 'mysql-les-practice-anti-join',
              title: 'ADVANCED PRACTICE: Churn Detection Anti-Join & Correlated Financial Subquery ($O(M + N)$ Hash Join)',
              type: 'practice',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
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
                'Kondisi WHERE o.id IS NULL memastikan hanya pengguna yang tidak memiliki pasangan order yang dikembalikan (Anti-Join)',
                'Teknik ini jauh lebih cepat daripada WHERE id NOT IN (SELECT user_id ...)'
              ],
              requirements: [
                {
                  id: 'req-anti-join',
                  description: 'Menerapkan pola Anti-Join dengan LEFT JOIN dan filter IS NULL pada tabel relasi',
                  validate: (code) => code.includes('LEFT JOIN orders') && code.includes('IS NULL')
                },
                {
                  id: 'req-anti-filter',
                  description: 'Menyertakan filter status PAID dan rentang waktu INTERVAL 90 DAY',
                  validate: (code) => code.includes('PAID') && code.includes('INTERVAL 90 DAY')
                }
              ]
            },
            {
              id: 'mysql-les-quiz-joins',
              title: 'Kuis JOIN & Subqueries',
              type: 'quiz',
              xpReward: 30,
              questions: [
                {
                  id: 'mq-join-1',
                  question: 'Teknik apa yang digunakan untuk menemukan data di tabel induk yang sama sekali tidak memiliki relasi di tabel anak (Anti-Join)?',
                  options: [
                    'LEFT JOIN tabel anak dengan filter WHERE anak.id IS NULL',
                    'INNER JOIN dengan limit 0',
                    'CROSS JOIN dengan ORDER BY DESC',
                    'DELETE JOIN'
                  ],
                  correctAnswerIndex: 0,
                  explanation: '`LEFT JOIN` yang dipadukan dengan kondisi `WHERE anak.id IS NULL` adalah pola standar (Anti-Join) untuk menemukan record di tabel kiri yang tidak memiliki pasangan di tabel kanan.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'mysql-lvl-2',
      title: 'Level 2 — Window Functions, CTE & Objek Terprogram',
      description: 'ROW_NUMBER(), RANK(), DENSE_RANK(), Moving Average, Recursive CTE (Hierarki Organisasi), Views, Stored Procedures, dan Triggers Audit.',
      modules: [
        {
          id: 'mysql-mod-5',
          title: 'Window Functions & Pemrosesan Baris Analitik',
          description: 'Melakukan kalkulasi analitik antar baris tanpa menciutkan data ke GROUP BY tunggal.',
          lessons: [
            {
              id: 'mysql-les-window-functions',
              title: 'Window Functions: ROW_NUMBER, RANK, DENSE_RANK & Running Totals',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'sql',
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
              id: 'mysql-les-cte',
              title: 'Common Table Expressions (CTE) & Recursive CTE',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'sql',
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
              id: 'mysql-les-practice-window-analytics',
              title: 'ADVANCED PRACTICE: Rolling 7-Day Moving Average & Customer Spending Deciles ($O(N \\log N)$ Window Algorithm)',
              type: 'practice',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
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
                'Gunakan ROWS BETWEEN 6 PRECEDING AND CURRENT ROW untuk mencakup 7 hari data (6 hari lalu + hari ini)',
                'Klausa OVER (ORDER BY trans_date ASC) tanpa frame otomatis menghitung akumulasi dari awal hingga baris saat ini',
                'Bungkus query dalam CTE DailyRevenue agar agregasi harian rapi'
              ],
              requirements: [
                {
                  id: 'req-win-rows',
                  description: 'Menggunakan ROWS BETWEEN 6 PRECEDING AND CURRENT ROW',
                  validate: (code) => code.includes('ROWS BETWEEN 6 PRECEDING AND CURRENT ROW')
                },
                {
                  id: 'req-win-sum',
                  description: 'Menggunakan SUM() OVER (ORDER BY ...) untuk cumulative running total',
                  validate: (code) => code.includes('SUM(daily_gmv) OVER') && code.includes('ORDER BY trans_date')
                }
              ]
            },
            {
              id: 'mysql-les-quiz-window',
              title: 'Kuis Window Functions & CTE',
              type: 'quiz',
              xpReward: 30,
              questions: [
                {
                  id: 'mq-win-1',
                  question: 'Apa perbedaan antara RANK() dan DENSE_RANK() ketika terdapat 2 baris yang memiliki nilai kembar di peringkat ke-2?',
                  options: [
                    'RANK() akan melanjutkan ke peringkat 4 pada baris berikutnya, sedangkan DENSE_RANK() melanjutkan ke peringkat 3',
                    'DENSE_RANK() tidak mendukung klausa ORDER BY',
                    'RANK() hanya bekerja pada tipe data string',
                    'Keduanya menghasilkan nilai yang persis sama'
                  ],
                  correctAnswerIndex: 0,
                  explanation: '`RANK()` melompati nomor urut peringkat setelah nilai seri (1, 2, 2, 4), sedangkan `DENSE_RANK()` tidak melompati nomor urut berikutnya (1, 2, 2, 3).'
                }
              ]
            }
          ]
        },
        {
          id: 'mysql-mod-6',
          title: 'Programmable Database: Views, Stored Procedures & Triggers',
          description: 'Membuat views abstraksi data, stored procedures transaksional, dan triggers audit otomatis.',
          lessons: [
            {
              id: 'mysql-les-programmable',
              title: 'Views, Stored Procedures & Trigger Audit',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Objek Terprogram di MySQL

1. **VIEW:** Query tersimpan yang bertindak sebagai tabel virtual. Berguna untuk menyembunyikan kolom sensitif (seperti password hash) dari aplikasi pelaporan.
2. **STORED PROCEDURE:** Kumpulan instruksi SQL yang dikompilasi dan disimpan langsung di database server. Menerima parameter \`IN\`, \`OUT\`, dan \`INOUT\`.
3. **TRIGGER:** Kode SQL yang dieksekusi secara otomatis oleh database ketika terjadi event \`INSERT\`, \`UPDATE\`, atau \`DELETE\` pada tabel tertentu (misal: otomatis mencatat jejak audit).`
                },
                {
                  type: 'code-example',
                  language: 'sql',
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
              id: 'mysql-les-practice-audit-trigger',
              title: 'ADVANCED PRACTICE: Zero-Trust Security Audit Trigger with Automated Change Log Capture',
              type: 'practice',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
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
                'Gunakan DELIMITER $$ untuk memungkinkan penulisan blok kode multiline dengan semicolon di dalamnya',
                'Akses data sebelum update via OLD.kolom dan data setelah update via NEW.kolom',
                'Kondisi IF OLD.balance_cents <> NEW.balance_cents mencegah trigger mencatat log jika yang diupdate adalah kolom lain'
              ],
              requirements: [
                {
                  id: 'req-trg-def',
                  description: 'Mendefinisikan trigger AFTER UPDATE ON user_wallets FOR EACH ROW',
                  validate: (code) => code.includes('CREATE TRIGGER') && code.includes('AFTER UPDATE ON user_wallets') && code.includes('FOR EACH ROW')
                },
                {
                  id: 'req-trg-insert',
                  description: 'Menyisipkan old dan new balance ke tabel wallet_audit_log',
                  validate: (code) => code.includes('INSERT INTO wallet_audit_log') && code.includes('OLD.balance_cents') && code.includes('NEW.balance_cents')
                }
              ]
            },
            {
              id: 'mysql-les-quiz-proc',
              title: 'Kuis Objek Terprogram MySQL',
              type: 'quiz',
              xpReward: 30,
              questions: [
                {
                  id: 'mq-pr-1',
                  question: 'Kapan trigger dengan tipe AFTER UPDATE dieksekusi oleh MySQL?',
                  options: [
                    'Tepat setelah baris data berhasil diperbarui dan divalidasi oleh database engine',
                    'Sebelum query UPDATE dikirim oleh klien',
                    'Hanya saat server di-restart',
                    'Setiap hari jam 12 malam'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Trigger `AFTER UPDATE` berjalan otomatis tepat sesaat setelah baris data berhasil di-update pada tabel target.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'mysql-lvl-3',
      title: 'Level 3 — Arsitektur Internal InnoDB & Indexing B+ Tree',
      description: 'InnoDB Buffer Pool, Redo Log WAL, Clustered vs Secondary Index, Covering Index, dan Bedah EXPLAIN ANALYZE.',
      modules: [
        {
          id: 'mysql-mod-7',
          title: 'Arsitektur Storage Engine InnoDB & Index B+ Tree',
          description: 'Bagaimana data dibaca dari disk 16KB pages ke Buffer Pool di RAM dan struktur B+Tree.',
          lessons: [
            {
              id: 'mysql-les-innodb-arch',
              title: 'Anatomi InnoDB: Buffer Pool, Redo Log & Clustered Index',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Bagaimana MySQL InnoDB Bekerja di Bawah Kap Mesin?

MySQL bukan sekadar file teks di hard disk. InnoDB adalah mesin transaksi berkinerja tinggi yang memiliki komponen arsitektur krusial:

\`\`\`text
Client SQL Query
      │
      ▼
[ MySQL Server Layer ] -> Parser, Optimizer, Executor
      │
      ▼
[ Storage Engine InnoDB (RAM) ]
┌─────────────────────────────────────────────────────────────┐
│ 1. Buffer Pool (RAM Cache):                                 │
│    - Menyimpan data page (16 KB per page) menggunakan LRU   │
│    - Write-buffer: Perubahan data dimodifikasi di RAM dulu  │
│                                                             │
│ 2. Log Buffer:                                              │
│    - Menampung Redo Log (WAL - Write-Ahead Logging)         │
│    - Menjamin Durability (D di ACID) saat crash tiba-tiba   │
│                                                             │
│ 3. Undo Log & MVCC:                                         │
│    - Menyimpan versi lama baris untuk transaksi concurrent  │
└─────────────────────────────────────────────────────────────┘
      │ Flush berkala (fsync)
      ▼
[ Disk Storage (.ibd tablespace) ] -> Data Pages & Redo Log Files
\`\`\`

#### Clustered Index vs Secondary Index:
- **Clustered Index:** Pada InnoDB, tabel **adalah** index. Seluruh data baris fisik secara aktual diurutkan dan disimpan di leaf node dari **Primary Key**.
- **Secondary Index:** Index pada kolom selain Primary Key. Leaf node pada secondary index **hanya menyimpan nilai kolom index + nilai Primary Key**, bukan seluruh baris.
- **Bookmark Lookup:** Jika query mencari kolom non-index, MySQL harus melakukan *two-step lookup*: mencari Primary Key di Secondary Index, lalu melompat ke Clustered Index untuk mengambil sisa kolomnya.`
                },
                {
                  type: 'code-example',
                  language: 'sql',
                  code: `-- Menampilkan Status Buffer Pool dan Kesehatan RAM InnoDB
SHOW ENGINE INNODB STATUS;

-- Konfigurasi Ukuran Buffer Pool (disarankan 70-80% dari total RAM server khusus database)
-- SET GLOBAL innodb_buffer_pool_size = 8589934592; -- 8 GB RAM`
                }
              ]
            },
            {
              id: 'mysql-les-indexing-bplus',
              title: 'B+ Tree Indexing & Aturan Leftmost Prefix',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
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
- ✅ \`WHERE tenant_id = 5\` (Index terpakai)
- ✅ \`WHERE tenant_id = 5 AND status = 'PAID'\` (Index terpakai optimal)
- ✅ \`WHERE tenant_id = 5 AND status = 'PAID' AND created_at > '2026-01-01'\` (Full index match)
- ❌ \`WHERE status = 'PAID'\` (**INDEX TIDAK BISA DIPAKAI!** Melanggar leftmost prefix)`
                },
                {
                  type: 'code-example',
                  language: 'sql',
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
              id: 'mysql-les-practice-covering-index',
              title: 'ADVANCED PRACTICE: Ultra-Fast Covering Index Design Eliminating Bookmark Lookups ($O(\\log N)$ Index Seek)',
              type: 'practice',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
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
                'Urutan kolom pada composite index: Equality Columns pertama, lalu Range/Sort Column, lalu sisa kolom SELECT',
                'Karena id adalah Primary Key, InnoDB menyertakannya secara implisit di leaf node secondary index',
                'Extra: "Using index" pada hasil EXPLAIN menandakan covering index berhasil bekerja sempurna'
              ],
              requirements: [
                {
                  id: 'req-idx-cov',
                  description: 'Mendefinisikan composite index mencakup category_id, is_active, price_cents, dan title',
                  validate: (code) => code.includes('CREATE INDEX') && code.includes('category_id') && code.includes('is_active') && code.includes('price_cents') && code.includes('title')
                }
              ]
            },
            {
              id: 'mysql-les-quiz-innodb',
              title: 'Kuis Arsitektur InnoDB & Indexing',
              type: 'quiz',
              xpReward: 30,
              questions: [
                {
                  id: 'mq-ino-1',
                  question: 'Di mana data baris fisik secara aktual disimpan pada engine MySQL InnoDB?',
                  options: [
                    'Di file log terpisah',
                    'Di leaf nodes dari struktur B+Tree Clustered Index (Primary Key)',
                    'Di heap memori sementara',
                    'Di cache browser user'
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'InnoDB menyusun tabel sebagai index-organized table, di mana seluruh data baris secara fisik disimpan langsung di leaf node dari Clustered Index (Primary Key).'
                }
              ]
            }
          ]
        },
        {
          id: 'mysql-mod-8',
          title: 'Analisis Eksekusi Query dengan EXPLAIN & Profiling',
          description: 'Menganalisis Query Execution Plan, cost optimizer, dan mengeliminasi filesort serta temporary tables.',
          lessons: [
            {
              id: 'mysql-les-explain',
              title: 'Bedah EXPLAIN & EXPLAIN ANALYZE',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'sql',
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
              id: 'mysql-les-practice-deep-pagination',
              title: 'ADVANCED PRACTICE: Solving Ultra-Deep Pagination ($O(N) \\rightarrow O(\\log N)$ Keyset & Deferred Join)',
              type: 'practice',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
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
                'Keyset pagination menggunakan klausa WHERE id > :last_seen_id untuk melompati baris dalam O(log N)',
                'Deferred Join memindai index ID yang sangat ramping di memori RAM, lalu melakukan join ke data tabel hanya untuk 20 baris terpilih'
              ],
              requirements: [
                {
                  id: 'req-pg-keyset',
                  description: 'Mengimplementasikan Keyset Pagination dengan WHERE id > ... ORDER BY id ASC LIMIT',
                  validate: (code) => code.includes('WHERE id >') && code.includes('ORDER BY id ASC')
                },
                {
                  id: 'req-pg-deferred',
                  description: 'Mengimplementasikan Deferred Join menggunakan INNER JOIN subquery USING (id)',
                  validate: (code) => code.includes('INNER JOIN (') && code.includes('USING (id)')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'mysql-lvl-4',
      title: 'Level 4 — Transaksi ACID, Tingkat Isolasi & Pencegahan Deadlock',
      description: 'Prinsip ACID, Repeatable Read vs Read Committed, Pessimistic Locking (SELECT FOR UPDATE), MVCC, dan resolusi Deadlock.',
      modules: [
        {
          id: 'mysql-mod-9',
          title: 'Transaksi ACID & Tingkat Isolasi (Isolation Levels)',
          description: 'Memahami fenomena Dirty Read, Non-Repeatable Read, dan Phantom Read pada konkurensi multi-user.',
          lessons: [
            {
              id: 'mysql-les-acid-deep',
              title: 'Empat Pilar Transaksi ACID & Tingkat Isolasi',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'sql',
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
              id: 'mysql-les-quiz-acid',
              title: 'Kuis Transaksi ACID & Isolasi',
              type: 'quiz',
              xpReward: 35,
              questions: [
                {
                  id: 'mq-acid-1',
                  question: 'Tingkat isolasi transaksi default yang digunakan oleh engine MySQL InnoDB adalah:',
                  options: [
                    'READ UNCOMMITTED',
                    'READ COMMITTED',
                    'REPEATABLE READ',
                    'SERIALIZABLE'
                  ],
                  correctAnswerIndex: 2,
                  explanation: 'InnoDB menggunakan REPEATABLE READ secara default, memanfaatkan MVCC (Multi-Version Concurrency Control) dan Gap Locking untuk konsistensi pembacaan data.'
                }
              ]
            }
          ]
        },
        {
          id: 'mysql-mod-10',
          title: 'Mekanisme Locking, MVCC & Pencegahan Deadlock',
          description: 'Pessimistic locking (SELECT ... FOR UPDATE), shared vs exclusive locks, dan penanganan deadlock.',
          lessons: [
            {
              id: 'mysql-les-locking-deadlock',
              title: 'Pessimistic Locking (SELECT ... FOR UPDATE) & Pencegahan Deadlock',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'sql',
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
              id: 'mysql-les-practice-deadlock-free-checkout',
              title: 'CAPSTONE CHALLENGE: Deadlock-Free Concurrent Multi-Item Flash Sale Checkout ($O(K \\log K)$ Deterministic Sorting)',
              type: 'challenge',
              xpReward: 100,
              content: [
                {
                  type: 'markdown',
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
                'Kunci sukses mencegah deadlock adalah klausa ORDER BY id ASC pada SELECT ... FOR UPDATE',
                'Kondisi stock_quantity >= 1 pada UPDATE mencegah overselling jika terjadi race condition',
                'Semua operasi harus berada di dalam START TRANSACTION dan COMMIT tunggal'
              ],
              requirements: [
                {
                  id: 'req-dl-sort',
                  description: 'Mengunci baris produk dengan SELECT ... FOR UPDATE diurutkan ORDER BY id ASC',
                  validate: (code) => code.includes('FOR UPDATE') && code.includes('ORDER BY id ASC')
                },
                {
                  id: 'req-dl-tx',
                  description: 'Membungkus seluruh operasi mutasi stok dalam START TRANSACTION dan COMMIT',
                  validate: (code) => code.includes('START TRANSACTION') && code.includes('COMMIT')
                }
              ]
            },
            {
              id: 'mysql-les-quiz-deadlock',
              title: 'Kuis Locking & Deadlock Resolution',
              type: 'quiz',
              xpReward: 35,
              questions: [
                {
                  id: 'mq-dl-1',
                  question: 'Klausul SQL apa yang digunakan dalam transaksi untuk mengunci baris yang dibaca agar transaksi lain tidak dapat memodifikasinya hingga transaksi selesai?',
                  options: [
                    'FOR UPDATE',
                    'LOCK TABLE EXCLUSIVE',
                    'FREEZE ROW',
                    'NO CONCURRENCY'
                  ],
                  correctAnswerIndex: 0,
                  explanation: '`SELECT ... FOR UPDATE` menempatkan Exclusive Lock (X-lock) pada baris target sampai transaksi di-COMMIT atau di-ROLLBACK.'
                },
                {
                  id: 'mq-dl-2',
                  question: 'Strategi paling efektif dalam arsitektur aplikasi untuk mencegah terjadinya Deadlock antar transaksi konkuren adalah:',
                  options: [
                    'Selalu mengunci resource/baris dengan urutan deterministik yang konsisten (misal selalu urut berdasarkan ID terkecil ke terbesar)',
                    'Menghapus seluruh index dari database',
                    'Menggunakan transaksi tanpa klausa WHERE',
                    'Mematikan fitur transaksi ACID'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Mengunci baris dalam urutan deterministik yang konsisten di seluruh thread (misalnya ORDER BY id ASC) mencegah kondisi siklis saling tunggu (circular wait) yang merupakan penyebab utama deadlock.'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
