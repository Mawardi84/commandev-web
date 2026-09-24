import { Course } from '../types';

export const PHP_COURSE: Course = {
  id: 'php-mastery',
  title: 'PHP 8 & Modern Backend Engineering',
  shortDescription: 'Kuasai arsitektur backend modern PHP 8.x: Strict Typing, Constructor Promotion, Readonly Classes, Enums, Attributes, Fibers, PDO Prepared Statements, dan Keamanan Argon2id.',
  description: 'PHP menggerakkan lebih dari 75% web dunia dan telah bertransformasi total menjadi bahasa backend bertipe ketat (strict typing), performa JIT compiler tinggi, dan ekosistem enterprise yang matang (Laravel, Symfony). Pelajari seluruh fitur modern PHP 8.0 hingga 8.3: arsitektur OOP modern, standar PSR, enkripsi kriptografis, transaksi PDO anti-SQL injection, hingga arsitektur REST API production-grade lengkap dengan analisis kompleksitas algoritma dan skenario industri nyata.',
  icon: 'code',
  levels: [
    {
      id: 'php-lvl-0',
      title: 'Level 0 — Fondasi Modern PHP 8 & Type Safety',
      description: 'declare(strict_types=1), Match expressions, Nullsafe operator, Named arguments, Union/Intersection types, Enums, dan Analisis Kompleksitas VM.',
      modules: [
        {
          id: 'php-mod-1',
          title: 'Sintaks Inti & Sistem Tipe Modern (PHP 8.0 - 8.3)',
          description: 'Menghilangkan kelemahan type juggling PHP masa lalu dengan type checking ketat, internal opcode Zend VM, dan algoritma rate limiting.',
          lessons: [
            {
              id: 'php-les-1',
              title: 'Anatomi PHP 8: Strict Typing, Match Expressions & Named Arguments',
              type: 'learn',
              xpReward: 25,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'php',
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

echo "Pajak: Rp {$totalTax} | Status Badge: {$badgeColor}\n";
?>`
                }
              ]
            },
            {
              id: 'php-les-nullsafe-types',
              title: 'Nullsafe Operator (?->), Null Coalescing (??=) & Zval Memory Architecture',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'php',
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

echo "City: {$cityName} | Formatted ID: " . formatIdentifier(42) . "\n";
?>`
                }
              ]
            },
            {
              id: 'php-les-practice-rate-limiter',
              title: 'ADVANCED PRACTICE: In-Memory Token Bucket Rate Limiter ($O(1)$ Time Complexity)',
              type: 'practice',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
                  content: `### Skenario Nyata: Proteksi Brute-Force & DDoS API Pembayaran

Di gateway pembayaran berkecepatan tinggi, sistem harus membatasi request klien (misal: maksimum **10 request per detik** per API Key). Menggunakan sleep loop atau interval timer latar belakang akan memboroskan CPU thread worker.

---

### Algoritma: Token Bucket dengan Evaluasi Lazy Timestamp
Algoritma Token Bucket mengakumulasi token dengan laju konstan (\`refillRatePerSec\`). Setiap request masuk, sistem menghitung berapa token yang terkumpul sejak request terakhir:
$$\\Delta tokens = (currentTime - lastRefillTime) \\times refillRate$$

#### Analisis Kompleksitas:
- **Time Complexity: $O(1)$** — Tidak ada iterasi array atau background thread. Kalkulasi murni operasi matematika delta waktu ($O(1)$).
- **Space Complexity: $O(1)$ per bucket** — Hanya menyimpan 2 nilai skalar bertipe float: \`$tokens\` dan \`$lastRefillTimestamp\`.

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
                'Pastikan method refill() menghitung pertambahan token menggunakan rumus: $elapsed * $this->refillRatePerSecond',
                'Gunakan min($this->capacity, ...) agar token tidak pernah melebihi kapasitas maksimum ember (bucket capacity)',
                'Kembalikan boolean true jika $this->tokens >= $cost, lalu kurangi token tersebut'
              ],
              requirements: [
                {
                  id: 'req-tb-class',
                  description: 'Mendeklarasikan class TokenBucketRateLimiter dengan constructor dan method consume',
                  validate: (code) => code.includes('class TokenBucketRateLimiter') && code.includes('consume')
                },
                {
                  id: 'req-tb-math',
                  description: 'Mengimplementasikan refilling O(1) berbasis delta microtime() dan min()',
                  validate: (code) => code.includes('microtime') && code.includes('min')
                },
                {
                  id: 'req-tb-strict',
                  description: 'Menegakkan type safety dengan declare(strict_types=1)',
                  validate: (code) => code.includes('declare(strict_types=1)')
                }
              ]
            },
            {
              id: 'php-les-quiz-1',
              title: 'Kuis Sistem Tipe & Sintaks PHP 8.x',
              type: 'quiz',
              xpReward: 30,
              questions: [
                {
                  id: 'pq-1',
                  question: 'Direktif apa yang wajib diletakkan di baris paling atas file PHP untuk menegakkan type checking ketat?',
                  options: [
                    'declare(strict_types=1);',
                    'ini_set("type_safety", "on");',
                    '#pragma type_strict',
                    'use namespace Strict;'
                  ],
                  correctAnswerIndex: 0,
                  explanation: '`declare(strict_types=1);` memberitahukan Zend Engine untuk menegakkan pemeriksaan tipe data argumen dan return value secara ketat tanpa konversi implisit (type coercion).'
                },
                {
                  id: 'pq-2',
                  question: 'Berapa kompleksitas waktu pencabangan ekspresi match jika dibandingkan switch legacy pada evaluasi konstan?',
                  options: [
                    'match memiliki kompleksitas O(1) via internal hash jump table, sedangkan switch legacy O(N)',
                    'match memiliki kompleksitas O(N^2) karena memeriksa tipe data',
                    'Keduanya sama-sama O(N) tanpa perbedaan internal',
                    'switch lebih cepat karena tidak ada strict checking'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Ekspresi match di-compile oleh Zend Engine menjadi hash jump table dengan perbandingan tipe identik (===), menjamin waktu eksekusi O(1) amortized terlepas dari jumlah case.'
                }
              ]
            }
          ]
        },
        {
          id: 'php-mod-2',
          title: 'Fitur Anyar PHP 8.1 - 8.3: Enums, Readonly Classes & DNF Types',
          description: 'Mengenal Backed Enums dengan method, Readonly Classes untuk data immutability, dan Typed Class Constants.',
          lessons: [
            {
              id: 'php-les-enums',
              title: 'Pure Enums & Backed Enums dengan Methods (PHP 8.1+)',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'php',
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
echo processOrderTransition($statusFromDb) . "\n";
?>`
                }
              ]
            },
            {
              id: 'php-les-readonly',
              title: 'Readonly Classes (PHP 8.2) & Typed Class Constants (PHP 8.3)',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'php',
                  code: `<?php
declare(strict_types=1);

// PHP 8.3: Interface dengan Typed Constants
interface AppConfigInterface {
    public const string APP_NAME = 'COMMANDEV Platform';
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

echo "Total Akhir: " . $total->formatRupiah() . "\n";
?>`
                }
              ]
            },
            {
              id: 'php-les-practice-dto-validation',
              title: 'ADVANCED PRACTICE: Type-Safe Order State Machine & Readonly DTO',
              type: 'practice',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
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
                'Gunakan in_array(..., true) untuk strict comparison di method canTransitionTo',
                'Method transition() pada readonly class harus mengembalikan instance new self() baru (immutable pattern)',
                'Tangani terminal states dengan mengembalikan false jika order sudah Completed atau Cancelled'
              ],
              requirements: [
                {
                  id: 'req-fsm-enum',
                  description: 'Mendeklarasikan enum OrderState dengan method canTransitionTo',
                  validate: (code) => code.includes('enum OrderState') && code.includes('canTransitionTo')
                },
                {
                  id: 'req-dto-readonly',
                  description: 'Menggunakan final readonly class untuk OrderPayloadDTO',
                  validate: (code) => code.includes('readonly class OrderPayloadDTO') && code.includes('transition')
                }
              ]
            },
            {
              id: 'php-les-quiz-enums-ro',
              title: 'Kuis Enums & Immutability PHP 8.x',
              type: 'quiz',
              xpReward: 30,
              questions: [
                {
                  id: 'pq-enum-1',
                  question: 'Bagaimana cara mengambil instance Backed Enum dari string mentah yang didapat dari database atau JSON request?',
                  options: [
                    'OrderStatus::from($stringValue);',
                    'new OrderStatus($stringValue);',
                    'OrderStatus::cast($stringValue);',
                    'parse_enum(OrderStatus, $stringValue);'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Method bawaan `Enum::from($value)` memetakan nilai scalar ke case enum yang cocok. Jika nilai tidak valid, ia melempar ValueError.'
                },
                {
                  id: 'pq-enum-2',
                  question: 'Mengapa perbandingan enum ($statusA === $statusB) bernilai O(1) pointer check pada Zend Engine?',
                  options: [
                    'Karena setiap case enum diinisialisasi sebagai singleton object unik di memori C, sehingga perbandingan hanya membandingkan alamat memori pointer',
                    'Karena enum diubah menjadi boolean',
                    'Karena enum tidak disimpan di memori RAM',
                    'Karena Zend VM menghapus enum saat runtime'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Zend Engine menyimpan case enum sebagai singleton immutable instances; perbandingan identik (===) memeriksa kesamaan alamat pointer memori C secara instan (1 CPU cycle).'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'php-lvl-1',
      title: 'Level 1 — Pemrograman Berorientasi Objek (OOP) & Arsitektur PSR',
      description: 'Constructor Property Promotion, Readonly Classes, Interfaces, Dependency Injection, In-Memory LRU Cache, dan PSR-4 Autoloading.',
      modules: [
        {
          id: 'php-mod-3',
          title: 'Class Modern & SOLID Principles di PHP 8',
          description: 'Memangkas boilerplate code dan membangun modularitas enterprise berstandar industri dengan struktur data performa tinggi.',
          lessons: [
            {
              id: 'php-les-oop-modern',
              title: 'Constructor Property Promotion & Dependency Injection Container',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'php',
                  code: `<?php
declare(strict_types=1);

interface LoggerInterface {
    public function log(string $level, string $message): void;
}

class SystemLogger implements LoggerInterface {
    public function log(string $level, string $message): void {
        echo "[" . strtoupper($level) . "] " . date('H:i:s') . " - {$message}\n";
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
              id: 'php-les-practice-lru-cache',
              title: 'ADVANCED PRACTICE: In-Memory LRU Cache Engine ($O(1)$ Get & Put Complexity)',
              type: 'practice',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
                  content: `### Skenario Industri: Caching Respon Microservice di RAM

Pada sistem backend berkinerja tinggi, kita sering memerlukan cache lokal di memori proses untuk menyimpan hasil query database atau panggilan API eksternal. Jika memori dibiarkan tumbuh tanpa batas, proses PHP akan mengalami crash *Out of Memory (OOM)*.

---

### Solusi Algoritmik: Least Recently Used (LRU) Cache
Struktur data LRU Cache membuang item yang paling lama tidak diakses ketika kapasitas penuh:
1. **Hash Map (Array Associative PHP):** Memberikan akses pencarian key ke node dalam **$O(1)$ time**.
2. **Doubly-Linked List (Node dengan \`$prev\` dan \`$next\`):** Memungkinkan perpindahan node ke urutan paling depan (Most Recently Used) dan penghapusan node paling belakang (Least Recently Used) dalam **$O(1)$ time**.

#### Analisis Kompleksitas:
- **\`get($key)\`:** $O(1)$ Time — Mengambil nilai via hash table dan memindahkan node ke kepala antrean.
- **\`put($key, $value)\`:** $O(1)$ Time — Menyisipkan di depan; jika kapasitas melebihi batas, hapus ekor dalam $O(1)$.
- **Space Complexity:** $O(C)$ — Tepat proporsional dengan kapasitas maksimum $C$.`
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
                'Struktur data gabungan hash map + doubly linked list adalah kunci mencapai O(1) get dan put',
                'Pastikan removeNode dan addToHead mengupdate pointer prev dan next secara cermat',
                'Saat evictTail(), jangan lupa menghapus key dari associative array $this->map menggunakan unset()'
              ],
              requirements: [
                {
                  id: 'req-lru-structure',
                  description: 'Mendefinisikan LRUNode dan LRUCache dengan method get dan put',
                  validate: (code) => code.includes('class LRUNode') && code.includes('class LRUCache') && code.includes('evictTail')
                },
                {
                  id: 'req-lru-complexity',
                  description: 'Menjamin operasi O(1) dengan doubly linked list pointer updates',
                  validate: (code) => code.includes('addToHead') && code.includes('removeNode')
                }
              ]
            },
            {
              id: 'php-les-quiz-oop',
              title: 'Kuis OOP & SOLID PHP Modern',
              type: 'quiz',
              xpReward: 35,
              questions: [
                {
                  id: 'pq-oop-1',
                  question: 'Apa manfaat utama dari Constructor Property Promotion di PHP 8?',
                  options: [
                    'Menggabungkan deklarasi properti, parameter constructor, dan assignment $this->prop = $prop dalam satu baris parameter',
                    'Mengubah semua variabel menjadi string secara otomatis',
                    'Menonaktifkan garbage collection PHP',
                    'Membuat fungsi constructor berjalan di background thread terpisah'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Constructor Property Promotion mengeliminasi penulisan properti berulang-ulang dengan mendeklarasikan visibilitas langsung di parameter constructor.'
                }
              ]
            }
          ]
        },
        {
          id: 'php-mod-4',
          title: 'Standar PSR & Ekosistem Modern Composer',
          description: 'PSR-4 Autoloading, Trie Prefix Matching, dan PSR-15 Middleware Onion Architecture.',
          lessons: [
            {
              id: 'php-les-psr-composer',
              title: 'PSR-4 Namespaces, Autoloading & Struktur Enterprise Composer',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'php',
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
              id: 'php-les-practice-middleware-pipeline',
              title: 'ADVANCED PRACTICE: PSR-15 Onion Middleware Pipeline ($O(N)$ Request Dispatcher)',
              type: 'practice',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
                  content: `### Skenario Industri: Arsitektur Onion Middleware API Gateway

Setiap request HTTP yang masuk ke API enterprise harus melewati beberapa lapisan filter keamanan:
1. **Lapisan 1 (Execution Time Logger):** Mengukur durasi total proses request.
2. **Lapisan 2 (API Key Authenticator):** Memverifikasi header otentikasi.
3. **Lapisan Inti (Core Request Handler):** Menghasilkan konten JSON payload.

Ketika respon kembali, respon mengalir balik keluar menembus lapisan logger (*Onion Architecture*).

---

### Analisis Kompleksitas:
- **Time Complexity: $O(N)$** — Setiap middleware dieksekusi tepat 2 kali (fase request masuk dan fase response keluar) di mana $N$ adalah jumlah middleware dalam pipeline.
- **Space Complexity: $O(N)$ Call Stack** — Kedalaman call stack proporsional terhadap $N$ lapisan middleware.`
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
                'Teknik array_reduce dengan array_reverse membalut coreHandler dari lapisan terdalam ke terluar',
                'Pastikan middleware Auth mengembalikan respons 401 langsung tanpa memanggil $next jika token salah',
                'TimingMiddleware memanggil microtime(true) sebelum dan sesudah $next($request)'
              ],
              requirements: [
                {
                  id: 'req-mid-pipe',
                  description: 'Mengimplementasikan MiddlewarePipeline dengan array_reduce atau recursion',
                  validate: (code) => code.includes('MiddlewarePipeline') && code.includes('handle')
                },
                {
                  id: 'req-mid-interfaces',
                  description: 'Mendefinisikan MiddlewareInterface dan TimingMiddleware',
                  validate: (code) => code.includes('MiddlewareInterface') && code.includes('TimingMiddleware')
                }
              ]
            },
            {
              id: 'php-les-quiz-psr',
              title: 'Kuis Standar PSR & Composer',
              type: 'quiz',
              xpReward: 30,
              questions: [
                {
                  id: 'pq-psr-1',
                  question: 'Mengapa menjalankan composer dump-autoload -o -a sangat krusial untuk performa produksi tingkat enterprise?',
                  options: [
                    'Mengubah pencarian file dari O(K) disk file_exists() menjadi O(1) in-memory hash array lookup',
                    'Menghapus seluruh file PHP di vendor',
                    'Mengubah PHP menjadi binary file C++',
                    'Mempercepat koneksi internet server'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Flag -o -a mengompilasi Authoritative Classmap murni, menghilangkan disk I/O traversal pencarian file di runtime dan langsung menyelesaikan FQCN dalam O(1) array memory.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'php-lvl-2',
      title: 'Level 2 — Database PDO, Kriptografi Argon2id & Keamanan Web OWASP',
      description: 'Prepared statements PDO, hashing password Argon2id, transaksi terdistribusi, Idempotent Webhook Processing, dan OWASP defense.',
      modules: [
        {
          id: 'php-mod-5',
          title: 'Keamanan Database PDO & Transaksi ACID',
          description: 'Mencegah SQL Injection mutlak, mengelola transaksi atomik, dan memproses webhook pembayaran secara idempotent.',
          lessons: [
            {
              id: 'php-les-pdo-security',
              title: 'PDO Prepared Statements & Anti-SQL Injection',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'php',
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
        ':email'  => 'developer@commandev.dev',
        ':status' => 'ACTIVE'
    ]);

    $user = $stmt->fetch();
    if ($user) {
        echo "Ditemukan user: {$user['username']} ({$user['role']})\n";
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
              id: 'php-les-pdo-transactions',
              title: 'Transaksi Database ACID di PDO: Commit & Rollback',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'php',
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
              id: 'php-les-practice-idempotent-webhook',
              title: 'ADVANCED PRACTICE: Idempotent Payment Webhook Processor ($O(1)$ Deduplication)',
              type: 'practice',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
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
                'Gunakan hash_hmac dengan algoritma sha256 untuk memvalidasi tanda tangan kriptografis webhook',
                'Gunakan hash_equals($expected, $actual) untuk membandingkan string hash tanpa bocor timing attack',
                'Cek isset($this->processedEvents[$eventId]) untuk deteksi idempotensi seketika O(1)'
              ],
              requirements: [
                {
                  id: 'req-wh-crypto',
                  description: 'Menggunakan hash_hmac dan hash_equals untuk verifikasi signature',
                  validate: (code) => code.includes('hash_hmac') && code.includes('hash_equals')
                },
                {
                  id: 'req-wh-idempotent',
                  description: 'Menerapkan pengecekan idempotensi event_id untuk mengabaikan duplikasi',
                  validate: (code) => code.includes('event_id') && (code.includes('isset') || code.includes('array_key_exists'))
                }
              ]
            },
            {
              id: 'php-les-quiz-sec',
              title: 'Kuis Keamanan & PDO PHP',
              type: 'quiz',
              xpReward: 35,
              questions: [
                {
                  id: 'pq-sec-1',
                  question: 'Mengapa opsi PDO::ATTR_EMULATE_PREPARES disetel ke false pada konfigurasi koneksi database PDO?',
                  options: [
                    'Agar PDO menggunakan Prepared Statement murni yang dikompilasi langsung oleh database server alih-alih emulasi string lokal',
                    'Untuk mempercepat rendering halaman HTML',
                    'Untuk mengaktifkan auto-restart server MySQL',
                    'Agar bisa menjalankan query tanpa password'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Menonaktifkan emulasi memastikan engine database MySQL mengompilasi struktur query secara terpisah di server, menjamin proteksi SQL Injection sejati.'
                }
              ]
            }
          ]
        },
        {
          id: 'php-mod-6',
          title: 'Kriptografi & OWASP Top 10 Web Defense',
          description: 'Hashing password Argon2id, Session hijacking defense, CSRF tokens, dan sanitasi input.',
          lessons: [
            {
              id: 'php-les-argon-defense',
              title: 'Argon2id Password Hashing & OWASP Defense',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'php',
                  code: `<?php
declare(strict_types=1);

$plainPassword = "SuperSecurePassword123#";

$hashedPassword = password_hash($plainPassword, PASSWORD_ARGON2ID, [
    'memory_cost' => 65536, // 64MB RAM
    'time_cost'   => 4,     // 4 iterasi CPU
    'threads'     => 1,
]);

echo "Hash Argon2id: " . substr($hashedPassword, 0, 32) . "...\n";

// Verifikasi
if (password_verify($plainPassword, $hashedPassword)) {
    echo "Autentikasi Berhasil!\n";
}
?>`
                }
              ]
            },
            {
              id: 'php-les-quiz-crypto',
              title: 'Kuis Kriptografi & Proteksi OWASP',
              type: 'quiz',
              xpReward: 30,
              questions: [
                {
                  id: 'pq-cr-1',
                  question: 'Fungsi bawaan PHP apa yang wajib digunakan untuk memverifikasi password terhadap hash Argon2id atau Bcrypt?',
                  options: [
                    'password_verify()',
                    'hash_equals()',
                    'md5_check()',
                    'crypt_match()'
                  ],
                  correctAnswerIndex: 0,
                  explanation: '`password_verify($password, $hash)` memverifikasi kecocokan password plaintext terhadap hash yang dihasilkan oleh `password_hash()` dan aman dari serangan timing attack.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'php-lvl-3',
      title: 'Level 3 — Advanced PHP 8.x, Fibers, JIT & REST API Architecture',
      description: 'PHP Attributes, Fibers & Asynchronous Concurrency, JIT Compiler Internals, dan arsitektur RESTful API modern dengan Radix Tree Routing.',
      modules: [
        {
          id: 'php-mod-7',
          title: 'Fitur Advanced Engine: Attributes, Fibers & JIT',
          description: 'Menggantikan PHPDoc annotations dengan native Attributes, Fibers untuk non-blocking async, dan JIT compiler.',
          lessons: [
            {
              id: 'php-les-attributes-fibers',
              title: 'Native Attributes (#[Route]) & Fibers Concurrency',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'php',
                  code: `<?php
declare(strict_types=1);

$fiber = new Fiber(function (): void {
    echo "[Fiber] Langkah 1: Memulai kalkulasi...\n";
    $value = Fiber::suspend('Fiber meminta checkpoint 1');
    echo "[Fiber] Langkah 2: Melanjutkan setelah menerima: '{$value}'\n";
});

$msg = $fiber->start();
echo "[Main] Dari Fiber: {$msg}\n";
$fiber->resume('OK, lanjutkan!');
?>`
                }
              ]
            },
            {
              id: 'php-les-practice-async-fiber',
              title: 'ADVANCED PRACTICE: Concurrent Task Poller dengan PHP 8.1 Fibers ($O(N)$ Cooperative Async)',
              type: 'practice',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
                  content: `### Skenario Industri: Multi-API Health Checker Non-Blocking

Sebuah microservice gateway harus memeriksa status kesehatan dari 5 service eksternal secara berkala. Menjalankan HTTP curl secara sekuensial menghabiskan $5 \\times 200\\text{ms} = 1\\text{ detik}$.

Dengan memanfaatkan **PHP 8.1 Fibers**, kita dapat menjalankan beberapa tugas secara interleaving (kooperatif) dalam satu proses PHP tunggal tanpa membekukan thread utama!

---

### Analisis Kompleksitas:
- **Time Complexity: $O(\\max(T_i))$** — Waktu eksekusi ditentukan oleh durasi tugas terlama, bukan penjumlahan total tugas ($O(\\sum T_i)$).
- **Space Complexity: $O(N)$** — Setiap fiber mengalokasikan stack memori ringan (~4 KB).`
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
                'Gunakan $fiber->isStarted() untuk mengecek apakah fiber perlu di-start() atau di-resume()',
                'Hapus fiber dari antrean worker jika $fiber->isTerminated() telah bernilai true',
                'Fiber::suspend() mengembalikan data sementara ke scheduler di runAll()'
              ],
              requirements: [
                {
                  id: 'req-fiber-pool',
                  description: 'Mendeklarasikan AsyncWorkerPool menggunakan class Fiber bawaan PHP 8.1',
                  validate: (code) => code.includes('class AsyncWorkerPool') && code.includes('Fiber')
                },
                {
                  id: 'req-fiber-loop',
                  description: 'Mengimplementasikan loop scheduler memeriksa isStarted, isSuspended, dan isTerminated',
                  validate: (code) => code.includes('isStarted') && code.includes('isSuspended') && code.includes('isTerminated')
                }
              ]
            },
            {
              id: 'php-les-quiz-adv',
              title: 'Kuis Attributes, Fibers & JIT',
              type: 'quiz',
              xpReward: 35,
              questions: [
                {
                  id: 'pq-adv-1',
                  question: 'Karakter pembuka apa yang digunakan untuk mendeklarasikan native Attributes di PHP 8?',
                  options: ['#[...]', '@[...]', '<...>', '/* @... */'],
                  correctAnswerIndex: 0,
                  explanation: 'PHP 8 menggunakan sintaks `#[AttributeName]` untuk mendeklarasikan metadata atribut terstruktur.'
                }
              ]
            }
          ]
        },
        {
          id: 'php-mod-8',
          title: 'Membangun RESTful API Enterprise Tanpa Framework',
          description: 'Router modular, parsing request JSON, HTTP Status Codes, dan penanganan error standar RFC 7807.',
          lessons: [
            {
              id: 'php-les-rest-api',
              title: 'Arsitektur REST API & RFC 7807 Problem Details',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
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
                  type: 'code-example',
                  language: 'php',
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
            'type' => 'https://api.commandev.dev/errors/not-found',
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
              id: 'php-les-practice-rest-capstone',
              title: 'CAPSTONE CHALLENGE: Production-Grade REST Kernel & RFC 7807 Error Handler',
              type: 'challenge',
              xpReward: 100,
              content: [
                {
                  type: 'markdown',
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
                'Pastikan menangani status 422 Unprocessable Entity jika data item kosong atau quantity <= 0',
                'Format RFC 7807 wajib menyertakan properti type, title, status, dan detail',
                'Gunakan match(true) untuk mengevaluasi kombinasi method dan URI secara efisien'
              ],
              requirements: [
                {
                  id: 'req-cap-kernel',
                  description: 'Mendefinisikan ApiKernel dengan method handle menerima method, uri, dan rawBody',
                  validate: (code) => code.includes('class ApiKernel') && code.includes('handle')
                },
                {
                  id: 'req-cap-rfc7807',
                  description: 'Mengimplementasikan error handling standar RFC 7807 dengan status 422 dan 404',
                  validate: (code) => code.includes('422') && code.includes('404') && code.includes('rfc7807')
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
