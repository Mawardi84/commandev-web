import { ProjectItem } from './projectsData';

export const SOFTWARE_ARCHITECTURE_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-arch-1',
    title: 'Architecture Explorer & Topology Visualizer',
    type: 'guided',
    category: 'architecture',
    difficulty: 'Beginner',
    status: 'published',
    xp: 120,
    estTime: '45 Menit',
    tags: ['Architecture Topology', 'Coupling Index', 'Modularity'],
    description: 'Rancang explorer arsitektur interaktif untuk memetakan dependensi komponen, menghitung rasio instabilitas (I = Ce / (Ca + Ce)), dan memvisualisasikan batas modularitas aplikasi.',
    overview: {
      summary: 'Proyek ini membangun fondasi visualisasi arsitektur perangkat lunak dengan analisis metrik coupling afferen dan efferen.',
      learningOutcomes: [
        'Memahami pemetaan komponen sistem dan arah aliran dependensi',
        'Menghitung rasio instabilitas dan tingkat coupling antar modul',
        'Menerapkan visualisasi interaktif arsitektur dengan status kesehatan sistem'
      ],
      techStack: ['TypeScript', 'Architecture Topology', 'Metrics Math'],
      architectureGuidelines: [
        'Pisahkan model data arsitektur dari visualizer node',
        'Gunakan rumus baku Robert C. Martin untuk instabilitas komponen',
        'Sertakan validasi siklus dependensi (cyclic dependency detection)'
      ]
    },
    instructions: [
      { step: 1, title: 'Definisikan Node Komponen', description: 'Buat representasi node arsitektur dengan atribut id, nama, tipe (presentation, domain, data), dan daftar dependensi.' },
      { step: 2, title: 'Hitung Metrik Instabilitas', description: 'Implementasikan fungsi kalkulasi `calculateInstability(ca, ce)` di mana `I = ce / (ca + ce)`.' },
      { step: 3, title: 'Visualisasikan Status Boundary', description: 'Tampilkan status apakah modul bersifat stabil (I mendekati 0) atau fleksibel/tidak stabil (I mendekati 1).' }
    ],
    starterJs: `// Architecture Explorer - Component Metrics Engine
function calculateInstability(afferentCoupling, efferentCoupling) {
  const total = afferentCoupling + efferentCoupling;
  if (total === 0) return 0;
  return Number((efferentCoupling / total).toFixed(2));
}

const components = [
  { id: 'auth-service', name: 'Auth Service', ca: 4, ce: 1 },
  { id: 'payment-gateway', name: 'Payment Gateway', ca: 2, ce: 3 },
  { id: 'notification-worker', name: 'Notification Worker', ca: 1, ce: 4 }
];

console.log('Instability Metrics:', components.map(c => ({
  name: c.name,
  instability: calculateInstability(c.ca, c.ce)
})));`,
    requirements: [
      {
        id: 'req-arch-1-calc',
        title: 'Kalkulasi Instabilitas',
        description: 'Fungsi kalkulasi coupling instabilitas harus mengembalikan rasio numerik yang benar.',
        check: (_, __, js) => (js || '').includes('calculateInstability') && (js || '').includes('efferentCoupling')
      }
    ]
  },
  {
    id: 'proj-arch-2',
    title: 'System Requirements & SLA Analyzer',
    type: 'guided',
    category: 'architecture',
    difficulty: 'Beginner',
    status: 'published',
    xp: 130,
    estTime: '45 Menit',
    tags: ['Requirements Engineering', 'SLA/SLO Math', 'Non-Functional Specs'],
    description: 'Bangun analyzer kebutuhan sistem untuk menghitung toleransi downtime per tahun berdasarkan SLA 99.9%, 99.99%, dan 99.999% (five nines), serta estimasi kapasitas throughput p99.',
    overview: {
      summary: 'Mengubah kebutuhan bisnis menjadi metrik kuantitatif SLA, SLO, dan SLI yang dapat diukur secara presisi oleh engineer.',
      learningOutcomes: [
        'Mengonversi target SLA menjadi toleransi downtime konkret per hari, bulan, dan tahun',
        'Menentukan batas latensi SLO p95 dan p99',
        'Menghitung error budget untuk release management'
      ],
      techStack: ['Architecture Math', 'SLA/SLI/SLO Specs', 'Capacity Planning'],
      architectureGuidelines: [
        'Downtime tahunan dihitung dari 365.25 hari * 24 jam * 3600 detik * (1 - SLA)',
        'Sertakan error budget tracker untuk rilis produksi'
      ]
    },
    instructions: [
      { step: 1, title: 'Hitung Toleransi Downtime', description: 'Buat fungsi `calculateDowntime(slaPercentage)` yang mengembalikan detik dan menit downtime per tahun.' },
      { step: 2, title: 'Kalkulasi Error Budget', description: 'Hitung persentase kegagalan yang diizinkan untuk 100 juta request.' }
    ],
    starterJs: `function calculateDowntime(sla) {
  const secondsInYear = 365.25 * 24 * 3600;
  const downtimeSeconds = secondsInYear * (1 - (sla / 100));
  return {
    sla: \`\${sla}%\`,
    downtimeMinutes: Number((downtimeSeconds / 60).toFixed(2)),
    downtimeHours: Number((downtimeSeconds / 3600).toFixed(2))
  };
}

console.log(calculateDowntime(99.9));  // Three nines
console.log(calculateDowntime(99.99)); // Four nines`,
    requirements: [
      {
        id: 'req-arch-2-sla',
        title: 'Formula Downtime Akurat',
        description: 'Kode harus menghitung downtime tahunan berdasarkan formula SLA.',
        check: (_, __, js) => (js || '').includes('calculateDowntime') && (js || '').includes('secondsInYear')
      }
    ]
  },
  {
    id: 'proj-arch-3',
    title: 'Trade-off Decision Engine (CAP & PACELC)',
    type: 'guided',
    category: 'architecture',
    difficulty: 'Intermediate',
    status: 'published',
    xp: 140,
    estTime: '50 Menit',
    tags: ['CAP Theorem', 'PACELC', 'Decision Matrix'],
    description: 'Implementasikan mesin evaluasi keputusan arsitektur yang merekomendasikan database & pola konsistensi berdasarkan trade-off CAP (Consistency vs Availability) dan PACELC.',
    overview: {
      summary: 'Membangun rule engine deterministik yang memberikan rekomendasi teknologi berdasarkan kriteria trade-off sistem terdistribusi.',
      learningOutcomes: [
        'Menguasai trade-off teorema CAP dalam skenario network partition nyata',
        'Memahami teorema PACELC saat sistem berjalan normal tanpa partisi',
        'Membuat decision matrix arsitektural berbasis kriteria beban kerja'
      ],
      techStack: ['Distributed Systems', 'Decision Matrix', 'Architecture Rules'],
      architectureGuidelines: [
        'Saat terjadi partisi (P), pilih Consistency (CP) atau Availability (AP)',
        'Saat normal (Else), evaluasi trade-off Latency (L) vs Consistency (C)'
      ]
    },
    instructions: [
      { step: 1, title: 'Susun Kriteria Beban Kerja', description: 'Buat input yang menerima toleransi stale read, kebutuhan transaksi ACID, dan toleransi downtime.' },
      { step: 2, title: 'Evaluasi Rekomendasi Database', description: 'Kembalikan tipe sistem (CP seperti Spanner/PostgreSQL atau AP/PA-EL seperti Cassandra/DynamoDB).' }
    ],
    starterJs: `function evaluateTradeoff(options) {
  const { prioritizeConsistency, highWriteAvailability, lowLatencyReads } = options;
  if (prioritizeConsistency && !highWriteAvailability) {
    return { pattern: 'CP', recommendation: 'Distributed Relational (CockroachDB/Spanner) or PostgreSQL with Synchronous Replication' };
  }
  if (highWriteAvailability && lowLatencyReads) {
    return { pattern: 'AP / PA-EL', recommendation: 'Eventual Consistency NoSQL (Cassandra, DynamoDB, Riak)' };
  }
  return { pattern: 'Tunable Consistency', recommendation: 'Configurable Quorum (MongoDB or Cassandra with Local Quorum)' };
}`,
    requirements: [
      {
        id: 'req-arch-3-decision',
        title: 'Evaluasi Aturan PACELC',
        description: 'Mesin keputusan harus membedakan pola CP dan AP.',
        check: (_, __, js) => (js || '').includes('evaluateTradeoff') && (js || '').includes('pattern')
      }
    ]
  },
  {
    id: 'proj-arch-4',
    title: 'SOLID Design Lab & Refactoring Suite',
    type: 'guided',
    category: 'architecture',
    difficulty: 'Intermediate',
    status: 'published',
    xp: 150,
    estTime: '50 Menit',
    tags: ['SOLID Principles', 'Refactoring', 'Clean Code'],
    description: 'Refaktor kode monolitik yang melanggar SRP (Single Responsibility) dan DIP (Dependency Inversion) menjadi komponen terpisah yang diinjeksi melalui interface/abstraksi.',
    overview: {
      summary: 'Menerapkan kelima prinsip SOLID pada arsitektur layer aplikasi nyata untuk mencegah spaghetti code dan tight coupling.',
      learningOutcomes: [
        'Memisahkan logika bisnis dari IO database dan logging',
        'Menerapkan Dependency Inversion dengan dependency injection container',
        'Membuat open-closed polymorphic strategy'
      ],
      techStack: ['TypeScript', 'Design Patterns', 'OOP SOLID'],
      architectureGuidelines: [
        'High-level modules tidak boleh bergantung langsung pada low-level modules',
        'Keduanya harus bergantung pada interface abstraksi'
      ]
    },
    instructions: [
      { step: 1, title: 'Pisahkan Tanggung Jawab', description: 'Ekstrak notification sender dan repository dari class UserService yang bloated.' },
      { step: 2, title: 'Injeksi Dependensi', description: 'Lewatkan interface logger dan dbClient ke dalam konstruktor.' }
    ],
    starterJs: `// UserService dengan Dependency Inversion
class UserService {
  constructor(userRepository, notificationService) {
    this.userRepository = userRepository;
    this.notificationService = notificationService;
  }

  async registerUser(userData) {
    const user = await this.userRepository.save(userData);
    await this.notificationService.sendWelcome(user.email);
    return user;
  }
}`,
    requirements: [
      {
        id: 'req-arch-4-dip',
        title: 'Injeksi Dependensi',
        description: 'Class UserService harus menerima repository dan notification service melalui konstruktor.',
        check: (_, __, js) => (js || '').includes('userRepository') && (js || '').includes('notificationService')
      }
    ]
  },
  {
    id: 'proj-arch-5',
    title: 'Modular Application Architecture & Boundaries',
    type: 'guided',
    category: 'architecture',
    difficulty: 'Intermediate',
    status: 'published',
    xp: 150,
    estTime: '55 Menit',
    tags: ['Modular Monolith', 'Bounded Context', 'Facade Pattern'],
    description: 'Bangun arsitektur modular monolith yang terstruktur dengan isolasi folder internal, boundary contracts, dan Facade pattern untuk komunikasi antar domain tanpa direct internal leaks.',
    overview: {
      summary: 'Membangun Modular Monolith berkinerja tinggi sebagai alternatif sebelum migrasi ke microservices.',
      learningOutcomes: [
        'Mendefinisikan public API contract per modul',
        'Mencegah circular dependency antar package domain',
        'Mengimplementasikan Facade interface untuk komunikasi antar modul'
      ],
      techStack: ['TypeScript', 'Modular Architecture', 'Facade Pattern'],
      architectureGuidelines: [
        'Setiap modul hanya mengekspos index.ts publik',
        'File internal tidak boleh diimpor secara langsung oleh modul lain'
      ]
    },
    instructions: [
      { step: 1, title: 'Rancang Modul Order & Inventory', description: 'Buat public facade interface untuk masing-masing modul.' },
      { step: 2, title: 'Eksekusi Transaksi Antar Boundary', description: 'Panggil OrderFacade tanpa menyentuh internal database tabel Inventory secara langsung.' }
    ],
    starterJs: `class InventoryModuleFacade {
  checkStock(sku, quantity) {
    return quantity <= 100;
  }
  reserveStock(sku, quantity) {
    return { reserved: true, sku, quantity };
  }
}

class OrderModuleFacade {
  constructor(inventoryFacade) {
    this.inventoryFacade = inventoryFacade;
  }
  createOrder(orderData) {
    const available = this.inventoryFacade.checkStock(orderData.sku, orderData.quantity);
    if (!available) throw new Error('Out of stock');
    this.inventoryFacade.reserveStock(orderData.sku, orderData.quantity);
    return { orderId: 'ord-' + Date.now(), status: 'CONFIRMED' };
  }
}`,
    requirements: [
      {
        id: 'req-arch-5-facade',
        title: 'Facade Komunikasi Antar Modul',
        description: 'OrderFacade harus berkomunikasi dengan InventoryModule melalui Facade.',
        check: (_, __, js) => (js || '').includes('InventoryModuleFacade') && (js || '').includes('createOrder')
      }
    ]
  },
  {
    id: 'proj-arch-6',
    title: 'Layered (N-Tier) Application Engine',
    type: 'guided',
    category: 'architecture',
    difficulty: 'Intermediate',
    status: 'published',
    xp: 150,
    estTime: '50 Menit',
    tags: ['N-Tier', 'Presentation-Business-Data', 'Layered Architecture'],
    description: 'Implementasikan arsitektur layered 3-tier klasik yang ketat (Strict Layering): Controller (Presentation) → Service (Business Logic) → Data Access Object (Persistence).',
    overview: {
      summary: 'Standar de-facto arsitektur enterprise yang memisahkan transmisi HTTP, aturan bisnis, dan akses data.',
      learningOutcomes: [
        'Menerapkan isolasi layer dengan aturan strict layering',
        'Mencegah Controller memanggil database secara langsung (bypassing business layer)',
        'Membungkus error database menjadi domain exception di business layer'
      ],
      techStack: ['Layered Pattern', 'DAO/Repository', 'DTO Serialization'],
      architectureGuidelines: [
        'Layer Presentation hanya berbicara dengan Layer Business',
        'Layer Business hanya berbicara dengan Layer Data Persistence'
      ]
    },
    instructions: [
      { step: 1, title: 'Buat ProductDAO', description: 'Implementasikan metode getById dan save pada layer data.' },
      { step: 2, title: 'Buat ProductService', description: 'Terapkan validasi harga > 0 dan kalkulasi pajak di layer service.' },
      { step: 3, title: 'Buat ProductController', description: 'Tangani format request/response JSON di presentation layer.' }
    ],
    starterJs: `class ProductDAO {
  constructor() { this.store = new Map(); }
  save(item) { this.store.set(item.id, item); return item; }
  findById(id) { return this.store.get(id); }
}

class ProductService {
  constructor(dao) { this.dao = dao; }
  createProduct(data) {
    if (data.price <= 0) throw new Error('Harga harus positif');
    return this.dao.save({ ...data, createdAt: new Date() });
  }
}

class ProductController {
  constructor(service) { this.service = service; }
  handleCreate(req) {
    try {
      const result = this.service.createProduct(req.body);
      return { status: 201, data: result };
    } catch (e) {
      return { status: 400, error: e.message };
    }
  }
}`,
    requirements: [
      {
        id: 'req-arch-6-layers',
        title: 'Tiga Layer Lengkap',
        description: 'Harus terdapat ProductDAO, ProductService, dan ProductController.',
        check: (_, __, js) => (js || '').includes('ProductDAO') && (js || '').includes('ProductService') && (js || '').includes('ProductController')
      }
    ]
  },
  {
    id: 'proj-arch-7',
    title: 'Clean Architecture (The Onion) Application',
    type: 'guided',
    category: 'architecture',
    difficulty: 'Advanced',
    status: 'published',
    xp: 160,
    estTime: '60 Menit',
    tags: ['Clean Architecture', 'Entities', 'Use Cases', 'Dependency Rule'],
    description: 'Bangun aplikasi berbasis Clean Architecture dengan 4 lingkaran konsentris: Entities (Enterprise Rules) → Use Cases (Application Rules) → Interface Adapters → Frameworks & Drivers.',
    overview: {
      summary: 'Mengimplementasikan The Dependency Rule: kode pada lingkaran dalam tidak boleh memiliki dependensi apa pun pada lingkaran luar.',
      learningOutcomes: [
        'Membuat Domain Entities yang murni tanpa framework',
        'Mengimplementasikan Use Cases dengan Input/Output Boundary Ports',
        'Membuat Presenter dan Gateway Repository Adapters'
      ],
      techStack: ['Clean Architecture', 'Pure Domain Entities', 'Use Case Interactors'],
      architectureGuidelines: [
        'Domain Entities tidak boleh mengimpor Express, TypeORM, atau library luar',
        'Gunakan Interface Ports untuk membalikkan dependensi database'
      ]
    },
    instructions: [
      { step: 1, title: 'Definisikan Entity Domain Murni', description: 'Buat class UserEntity dengan business invariants validasi email dan umur.' },
      { step: 2, title: 'Buat Use Case Interactor', description: 'Implementasikan RegisterUserUseCase yang hanya bergantung pada IUserRepository interface.' }
    ],
    starterJs: `// 1. Entities Layer (Core)
class UserEntity {
  constructor(id, email, age) {
    if (!email.includes('@')) throw new Error('Email tidak valid');
    if (age < 13) throw new Error('Syarat umur minimal 13 tahun');
    this.id = id;
    this.email = email;
    this.age = age;
  }
}

// 2. Use Cases Layer
class RegisterUserUseCase {
  constructor(userRepositoryPort) {
    this.userRepo = userRepositoryPort;
  }

  async execute(requestModel) {
    const user = new UserEntity(requestModel.id, requestModel.email, requestModel.age);
    await this.userRepo.save(user);
    return { success: true, userId: user.id };
  }
}`,
    requirements: [
      {
        id: 'req-arch-7-clean',
        title: 'Domain Entity & Use Case Terpisah',
        description: 'Kode harus memisahkan UserEntity dan RegisterUserUseCase sesuai Clean Architecture.',
        check: (_, __, js) => (js || '').includes('UserEntity') && (js || '').includes('RegisterUserUseCase')
      }
    ]
  },
  {
    id: 'proj-arch-8',
    title: 'Hexagonal Architecture (Ports & Adapters)',
    type: 'guided',
    category: 'architecture',
    difficulty: 'Advanced',
    status: 'published',
    xp: 160,
    estTime: '60 Menit',
    tags: ['Hexagonal', 'Ports & Adapters', 'Driver & Driven'],
    description: 'Implementasikan arsitektur Hexagonal lengkap: Domain Hexagon di tengah, Driver Ports (Inbound/Primary) untuk CLI/HTTP, dan Driven Ports (Outbound/Secondary) untuk Database & Mailer.',
    overview: {
      summary: 'Memisahkan aplikasi inti dari dunia luar melalui Ports (Interface) dan Adapters (Implementasi teknis).',
      learningOutcomes: [
        'Membedakan Driver (Primary) Ports dan Driven (Secondary) Ports',
        'Mengganti adapter in-memory dengan Postgres adapter tanpa menyentuh core hexagon',
        'Membuat simulasi mocking driven ports untuk unit testing'
      ],
      techStack: ['Hexagonal Architecture', 'Ports & Adapters', 'Dependency Inversion'],
      architectureGuidelines: [
        'Hexagon hanya mengekspos Inbound Ports dan memanggil Outbound Ports',
        'Teknologi luar (Express, Postgres, Stripe) selalu berada di Adapter layer'
      ]
    },
    instructions: [
      { step: 1, title: 'Definisikan Inbound & Outbound Ports', description: 'Buat interface PaymentPort (Driven) dan ProcessCheckoutPort (Driver).' },
      { step: 2, title: 'Implementasikan Core Hexagon & Adapters', description: 'Buat MockStripeAdapter dan InMemoryDbAdapter.' }
    ],
    starterJs: `// Core Hexagon
class CheckoutService {
  constructor(paymentDrivenPort, notificationDrivenPort) {
    this.paymentPort = paymentDrivenPort;
    this.notificationPort = notificationDrivenPort;
  }

  async processOrder(order) {
    const charge = await this.paymentPort.charge(order.amount, order.currency);
    await this.notificationPort.notifyCustomer(order.email, 'Payment Successful: ' + charge.id);
    return { status: 'COMPLETED', chargeId: charge.id };
  }
}

// Driven Adapter 1: Mock Payment
class MockPaymentAdapter {
  async charge(amount, currency) {
    return { id: 'ch_' + Math.random().toString(36).substring(7), amount, status: 'succeeded' };
  }
}`,
    requirements: [
      {
        id: 'req-arch-8-hex',
        title: 'Core Hexagon & Driven Adapter',
        description: 'Harus terdapat CheckoutService dan MockPaymentAdapter.',
        check: (_, __, js) => (js || '').includes('CheckoutService') && (js || '').includes('paymentDrivenPort')
      }
    ]
  },
  {
    id: 'proj-arch-9',
    title: 'Domain-Driven Design (DDD) Modeling System',
    type: 'guided',
    category: 'architecture',
    difficulty: 'Advanced',
    status: 'published',
    xp: 170,
    estTime: '65 Menit',
    tags: ['DDD', 'Aggregates', 'Value Objects', 'Domain Events'],
    description: 'Rancang model domain DDD kaya (Rich Domain Model): Entities, Value Objects (Money, Email), Aggregates dengan Aggregate Root, Invariant Enforcers, dan Domain Events emitter.',
    overview: {
      summary: 'Mencegah Anemic Domain Model dengan membungkus logika bisnis dan validasi mutasi langsung di dalam Aggregate Root.',
      learningOutcomes: [
        'Merancang Value Objects yang immutable dengan structural equality',
        'Menjaga konsistensi batas Aggregate Root',
        'Mengirimkan Domain Events saat terjadi perubahan state penting'
      ],
      techStack: ['Domain-Driven Design', 'Aggregates', 'Domain Events'],
      architectureGuidelines: [
        'Akses ke internal entity di dalam aggregate harus selalu melalui Aggregate Root',
        'Value Objects tidak memiliki ID dan bersifat immutable'
      ]
    },
    instructions: [
      { step: 1, title: 'Buat Value Object Money', description: 'Value Object Money dengan atribut amount dan currency yang immutable.' },
      { step: 2, title: 'Buat Order Aggregate Root', description: 'Tambahkan metode addItem dan raiseDomainEvent OrderCreatedEvent.' }
    ],
    starterJs: `// Value Object
class Money {
  constructor(amount, currency) {
    if (amount < 0) throw new Error('Jumlah tidak boleh negatif');
    this.amount = Object.freeze(amount);
    this.currency = Object.freeze(currency);
    Object.freeze(this);
  }
  equals(other) {
    return this.amount === other.amount && this.currency === other.currency;
  }
}

// Aggregate Root
class OrderAggregate {
  constructor(orderId) {
    this.id = orderId;
    this.items = [];
    this.domainEvents = [];
    this.status = 'DRAFT';
  }

  addItem(sku, priceMoney, quantity) {
    if (this.status !== 'DRAFT') throw new Error('Order sudah ditutup');
    this.items.push({ sku, price: priceMoney, quantity });
    this.domainEvents.push({ type: 'ORDER_ITEM_ADDED', orderId: this.id, sku });
  }
}`,
    requirements: [
      {
        id: 'req-arch-9-ddd',
        title: 'Value Object & Aggregate Root',
        description: 'Harus terdapat Value Object Money dan OrderAggregate dengan domainEvents.',
        check: (_, __, js) => (js || '').includes('Money') && (js || '').includes('OrderAggregate') && (js || '').includes('domainEvents')
      }
    ]
  },
  {
    id: 'proj-arch-10',
    title: 'Enterprise REST API Architecture',
    type: 'guided',
    category: 'architecture',
    difficulty: 'Intermediate',
    status: 'published',
    xp: 150,
    estTime: '50 Menit',
    tags: ['REST Architecture', 'Idempotency Keys', 'HATEOAS', 'Content Negotiation'],
    description: 'Arsitekturkan gateway REST API enterprise dengan standar Richardson Maturity Model Level 3, Idempotency-Key header deduplication, Cursor-based pagination, dan Rate-Limiter.',
    overview: {
      summary: 'Membangun API RESTful yang scalable, idempotent, aman dari duplikasi transaksi, dan memenuhi standar HTTP RFC.',
      learningOutcomes: [
        'Menerapkan Idempotency Key header untuk request POST pembayaran',
        'Mengimplementasikan Cursor-based pagination untuk performa query miliaran baris',
        'Menyusun struktur standard error responses (RFC 7807 Problem Details)'
      ],
      techStack: ['REST API', 'Idempotency Store', 'RFC 7807', 'Pagination'],
      architectureGuidelines: [
        'Request POST dengan Idempotency-Key yang sama harus mengembalikan response cached identik',
        'Hindari offset pagination pada tabel data besar'
      ]
    },
    instructions: [
      { step: 1, title: 'Implementasikan Idempotency Middleware', description: 'Periksa memory cache untuk header Idempotency-Key sebelum memproses request.' },
      { step: 2, title: 'Buat Cursor Paginator', description: 'Buat generator next_cursor berbasis base64 encoded timestamp.' }
    ],
    starterJs: `const idempotencyStore = new Map();

function handleIdempotentPost(headers, body, executeFn) {
  const key = headers['idempotency-key'];
  if (!key) return executeFn(body);

  if (idempotencyStore.has(key)) {
    return { ...idempotencyStore.get(key), isReplay: true };
  }

  const result = executeFn(body);
  idempotencyStore.set(key, result);
  return result;
}`,
    requirements: [
      {
        id: 'req-arch-10-idemp',
        title: 'Idempotency Key Cache',
        description: 'Fungsi handleIdempotentPost harus melakukan deduplikasi berdasarkan key.',
        check: (_, __, js) => (js || '').includes('handleIdempotentPost') && (js || '').includes('idempotency-key')
      }
    ]
  },
  {
    id: 'proj-arch-11',
    title: 'Transaction-Safe Database Engine (Saga & 2PC)',
    type: 'guided',
    category: 'architecture',
    difficulty: 'Advanced',
    status: 'published',
    xp: 180,
    estTime: '65 Menit',
    tags: ['ACID', 'Saga Pattern', 'Two-Phase Commit', 'Compensating Tx'],
    description: 'Implementasikan orchestrator transaksi terdistribusi menggunakan Saga Pattern (Orchestration-based) dengan transaksi kompensasi otomatis saat terjadi kegagalan di tengah alur.',
    overview: {
      summary: 'Mengatasi limitasi transaksi ACID pada basis data terdistribusi dengan pola kompensasi bertahap.',
      learningOutcomes: [
        'Merancang Saga Orchestrator dengan state machine',
        'Mengimplementasikan aksi kompensasi mundur (backward rollback)',
        'Mencatat log status saga untuk toleransi crash recovery'
      ],
      techStack: ['Distributed Transactions', 'Saga Orchestration', 'Compensating Actions'],
      architectureGuidelines: [
        'Setiap step saga harus memiliki step kompensasi yang bersifat idempotent',
        'Eksekusi kompensasi dilakukan berurutan terbalik (LIFO) saat terjadi error'
      ]
    },
    instructions: [
      { step: 1, title: 'Rancang Steps & Compensations', description: 'Daftarkan step ReserveInventory, ChargeCard, dan CreateOrder beserta kompensasinya.' },
      { step: 2, title: 'Eksekusi Alur Saga', description: 'Jika step 3 gagal, jalankan kompensasi untuk step 2 dan step 1.' }
    ],
    starterJs: `class SagaOrchestrator {
  constructor() { this.executedSteps = []; }

  async execute(steps) {
    for (const step of steps) {
      try {
        await step.forward();
        this.executedSteps.push(step);
      } catch (err) {
        console.warn('Saga failed at', step.name, '- Triggering compensation!');
        await this.rollback();
        throw err;
      }
    }
  }

  async rollback() {
    while (this.executedSteps.length > 0) {
      const step = this.executedSteps.pop();
      if (step.compensate) {
        await step.compensate();
      }
    }
  }
}`,
    requirements: [
      {
        id: 'req-arch-11-saga',
        title: 'Saga Rollback Kompensasi',
        description: 'SagaOrchestrator harus mengimplementasikan eksekusi maju dan fungsi rollback mundur.',
        check: (_, __, js) => (js || '').includes('SagaOrchestrator') && (js || '').includes('rollback') && (js || '').includes('compensate')
      }
    ]
  },
  {
    id: 'proj-arch-12',
    title: 'Distributed Multi-Tier Cache System',
    type: 'guided',
    category: 'architecture',
    difficulty: 'Intermediate',
    status: 'published',
    xp: 160,
    estTime: '55 Menit',
    tags: ['Caching', 'LRU Eviction', 'Cache-Aside', 'Stampede Mutex'],
    description: 'Bangun sistem caching 2-tier (L1 In-Memory + L2 Redis Mock) dengan implementasi algoritma eviksi LRU (Least Recently Used), Cache-Aside pattern, dan Mutex Lock anti Cache Stampede.',
    overview: {
      summary: 'Mengurangi beban database hingga 95% dengan strategi caching multi-tier yang aman dari thundering herd problem.',
      learningOutcomes: [
        'Membuat algoritma LRU Cache dengan Doubly Linked List + HashMap O(1)',
        'Menerapkan Cache-Aside dengan TTL jitter untuk mencegah simultaneous expiration',
        'Menggunakan Mutex Locking untuk melindungi single database query saat cache miss'
      ],
      techStack: ['Caching Architecture', 'LRU O(1)', 'Mutex Locks'],
      architectureGuidelines: [
        'L1 in-memory lokal dicek terlebih dahulu sebelum network L2',
        'Tambahkan random jitter pada TTL untuk meratakan waktu expire'
      ]
    },
    instructions: [
      { step: 1, title: 'Implementasikan LRU Cache O(1)', description: 'Buat class LRUCache dengan capacity, get, dan set.' },
      { step: 2, title: 'Terapkan Cache-Aside dengan Lock', description: 'Kueri DB hanya sekali saat ribuan request simultan mengalami cache miss.' }
    ],
    starterJs: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return null;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value); // Refresh recency
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }
}`,
    requirements: [
      {
        id: 'req-arch-12-lru',
        title: 'Algoritma LRU',
        description: 'LRUCache harus mendukung get, put, dan eviksi oldest saat melebihi kapasitas.',
        check: (_, __, js) => (js || '').includes('LRUCache') && (js || '').includes('capacity') && (js || '').includes('oldestKey')
      }
    ]
  },
  {
    id: 'proj-arch-13',
    title: 'Message Queue Platform & Event Broker',
    type: 'guided',
    category: 'architecture',
    difficulty: 'Advanced',
    status: 'published',
    xp: 170,
    estTime: '60 Menit',
    tags: ['Message Queue', 'Partitions', 'Consumer Groups', 'DLQ'],
    description: 'Rancang simulasi broker pesan terdistribusi (seperti Kafka/RabbitMQ) dengan Topic Partitions, Offset tracking per Consumer Group, Dead Letter Queue (DLQ), dan Backpressure handling.',
    overview: {
      summary: 'Fondasi arsitektur asynchronous decoupling yang menjamin pemrosesan pesan berskala jutaan per detik.',
      learningOutcomes: [
        'Memahami partitioning pesan dengan key hashing modulo N',
        'Mengelola commit offset pada masing-masing consumer group',
        'Mengalihkan pesan gagal berulang kali ke Dead Letter Queue (DLQ)'
      ],
      techStack: ['Message Broker', 'Kafka Principles', 'Offset Management'],
      architectureGuidelines: [
        'Pesan dengan partition key yang sama harus masuk ke partition yang sama (guaranteed ordering)',
        'Maksimal 1 consumer dalam satu consumer group per partition'
      ]
    },
    instructions: [
      { step: 1, title: 'Buat Topic dengan Partisi', description: 'Distribusikan pesan berdasarkan `hash(key) % partitionCount`.' },
      { step: 2, title: 'Implementasikan Consumer Offset Commit', description: 'Simpan offset terakhir yang berhasil diproses oleh consumer.' }
    ],
    starterJs: `class MessageBroker {
  constructor(partitionCount = 3) {
    this.partitions = Array.from({ length: partitionCount }, () => []);
    this.consumerOffsets = new Map();
    this.dlq = [];
  }

  publish(key, payload) {
    const hash = key.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const pIdx = hash % this.partitions.length;
    const msg = { offset: this.partitions[pIdx].length, key, payload, timestamp: Date.now() };
    this.partitions[pIdx].push(msg);
    return { partition: pIdx, offset: msg.offset };
  }
}`,
    requirements: [
      {
        id: 'req-arch-13-broker',
        title: 'Partition Hashing Broker',
        description: 'Broker harus mempartisi pesan berdasarkan key hashing.',
        check: (_, __, js) => (js || '').includes('MessageBroker') && (js || '').includes('publish') && (js || '').includes('partitions')
      }
    ]
  },
  {
    id: 'proj-arch-14',
    title: 'Event-Driven Architecture (CQRS & Event Sourcing)',
    type: 'guided',
    category: 'architecture',
    difficulty: 'Advanced',
    status: 'published',
    xp: 180,
    estTime: '65 Menit',
    tags: ['Event-Driven', 'CQRS', 'Event Sourcing', 'Projections'],
    description: 'Implementasikan Event Sourcing murni dengan Append-Only Event Store, Replay State Materializer, dan CQRS (Command Query Responsibility Segregation) Read Projections.',
    overview: {
      summary: 'Menggantikan update in-place dengan jejak audit permanen peristiwa bisnis masa lalu yang tidak dapat diubah (immutable).',
      learningOutcomes: [
        'Menyimpan mutasi state sebagai urutan event append-only',
        'Melakukan rekonstruksi entitas dengan memutar ulang (replay) rentetan event',
        'Memisahkan model penulisan (Command) dari proyeksi query (Read Model)'
      ],
      techStack: ['Event Sourcing', 'CQRS', 'State Projections'],
      architectureGuidelines: [
        'Event Store tidak boleh mendukung operasi UPDATE atau DELETE (Append-Only)',
        'Read model dioptimalkan secara denormalized untuk kecepatan query'
      ]
    },
    instructions: [
      { step: 1, title: 'Buat Append-Only Event Store', description: 'Simpan event seperti AccountOpened, MoneyDeposited, MoneyWithdrawn.' },
      { step: 2, title: 'Implementasikan State Replay', description: 'Hitung saldo akhir dengan merefleksikan seluruh event secara sekuensial.' }
    ],
    starterJs: `class BankAccountEventSourced {
  constructor(accountId) {
    this.id = accountId;
    this.balance = 0;
    this.events = [];
  }

  apply(event) {
    switch (event.type) {
      case 'ACCOUNT_OPENED':
        this.balance = event.initialBalance;
        break;
      case 'MONEY_DEPOSITED':
        this.balance += event.amount;
        break;
      case 'MONEY_WITHDRAWN':
        this.balance -= event.amount;
        break;
    }
    this.events.push(event);
  }

  replay(eventList) {
    eventList.forEach(e => this.apply(e));
    return this.balance;
  }
}`,
    requirements: [
      {
        id: 'req-arch-14-es',
        title: 'Event Sourcing Replay',
        description: 'Harus terdapat fungsi apply dan replay untuk merekonstruksi state.',
        check: (_, __, js) => (js || '').includes('BankAccountEventSourced') && (js || '').includes('replay') && (js || '').includes('apply')
      }
    ]
  },
  {
    id: 'proj-arch-15',
    title: 'Distributed Service Platform & Service Discovery',
    type: 'guided',
    category: 'architecture',
    difficulty: 'Advanced',
    status: 'published',
    xp: 170,
    estTime: '60 Menit',
    tags: ['Service Discovery', 'Heartbeat', 'Health Checks', 'Registry'],
    description: 'Bangun registri layanan terdistribusi (Service Discovery Registry) dengan mekanisme Heartbeat Lease, Client-side Load Balancing, dan automatic deregistration untuk node yang mati.',
    overview: {
      summary: 'Mekanisme penemuan otomatis instance layanan dinamis di lingkungan container / cloud.',
      learningOutcomes: [
        'Membangun service registry seperti Consul/Eureka secara konseptual',
        'Mengelola masa sewa (lease) instance berbasis interval heartbeat',
        'Memilih target instance menggunakan client-side round-robin'
      ],
      techStack: ['Service Discovery', 'Heartbeat Health Check', 'Load Balancer'],
      architectureGuidelines: [
        'Instance yang gagal mengirim heartbeat dalam batas TTL harus otomatis ditandai DOWN/dihapus'
      ]
    },
    instructions: [
      { step: 1, title: 'Registrasi Layanan', description: 'Daftarkan instance dengan serviceName, ip, port, dan ttl.' },
      { step: 2, title: 'Pemeriksaan Heartbeat', description: 'Perbarui timestamp lastHeartbeat saat instance mengirim ping.' }
    ],
    starterJs: `class ServiceRegistry {
  constructor() { this.instances = new Map(); }

  register(serviceName, instanceId, url, ttlMs = 5000) {
    if (!this.instances.has(serviceName)) this.instances.set(serviceName, new Map());
    this.instances.get(serviceName).set(instanceId, {
      url,
      expiresAt: Date.now() + ttlMs
    });
  }

  getHealthyInstances(serviceName) {
    const list = this.instances.get(serviceName);
    if (!list) return [];
    const now = Date.now();
    return Array.from(list.entries())
      .filter(([_, inst]) => inst.expiresAt > now)
      .map(([id, inst]) => ({ id, url: inst.url }));
  }
}`,
    requirements: [
      {
        id: 'req-arch-15-disc',
        title: 'Service Registry & Heartbeat',
        description: 'ServiceRegistry harus mendukung register dan getHealthyInstances berdasarkan TTL.',
        check: (_, __, js) => (js || '').includes('ServiceRegistry') && (js || '').includes('getHealthyInstances')
      }
    ]
  },
  {
    id: 'proj-arch-16',
    title: 'Microservices Application & API Gateway',
    type: 'guided',
    category: 'architecture',
    difficulty: 'Advanced',
    status: 'published',
    xp: 180,
    estTime: '65 Menit',
    tags: ['Microservices', 'API Gateway', 'BFF', 'Reverse Proxy'],
    description: 'Arsitekturkan API Gateway terintegrasi dengan pola Backend-for-Frontend (BFF), Request Routing, JWT Token Verification, Rate Limiting, dan Response Aggregator dari 3 microservice.',
    overview: {
      summary: 'Pintu gerbang tunggal yang menghubungkan antarmuka pengguna dengan ekosistem microservices internal.',
      learningOutcomes: [
        'Menerapkan pola Backend-for-Frontend (BFF) untuk web dan mobile',
        'Menggabungkan (composite aggregation) data dari Order, User, dan Inventory Service dalam 1 panggilan',
        'Mencegah internal service terpapar langsung ke internet'
      ],
      techStack: ['API Gateway', 'BFF Pattern', 'Microservices Aggregator'],
      architectureGuidelines: [
        'API Gateway bertindak sebagai reverse proxy dan sentralisasi otentikasi',
        'Lakukan eksekusi paralel (Promise.all) saat melakukan agregasi data independen'
      ]
    },
    instructions: [
      { step: 1, title: 'Rancang Route Dispatcher', description: 'Petakan endpoint eksternal ke alamat microservice internal.' },
      { step: 2, title: 'Agregasi Komposit', description: 'Gabungkan data user dan daftar pesanannya menjadi single composite payload.' }
    ],
    starterJs: `class ApiGateway {
  constructor(userServiceUrl, orderServiceUrl) {
    this.userServiceUrl = userServiceUrl;
    this.orderServiceUrl = orderServiceUrl;
  }

  async getDashboardComposite(userId) {
    // Aggregation pattern
    const [userProfile, orders] = await Promise.all([
      this.fetchService(\`\${this.userServiceUrl}/users/\${userId}\`),
      this.fetchService(\`\${this.orderServiceUrl}/orders?userId=\${userId}\`)
    ]);
    return { user: userProfile, orders, generatedAt: new Date().toISOString() };
  }

  async fetchService(url) {
    return { mockUrl: url, status: 200 };
  }
}`,
    requirements: [
      {
        id: 'req-arch-16-gw',
        title: 'Composite API Gateway',
        description: 'ApiGateway harus menggabungkan data dari beberapa service secara paralel.',
        check: (_, __, js) => (js || '').includes('ApiGateway') && (js || '').includes('getDashboardComposite')
      }
    ]
  },
  {
    id: 'proj-arch-17',
    title: 'Scalable API Platform & Consistent Hashing Ring',
    type: 'guided',
    category: 'architecture',
    difficulty: 'Advanced',
    status: 'published',
    xp: 180,
    estTime: '60 Menit',
    tags: ['Scalability', 'Consistent Hashing', 'Virtual Nodes', 'Load Balancing'],
    description: 'Implementasikan Consistent Hashing Ring dengan Virtual Nodes untuk sharding data dinamis pada cluster node tanpa memerlukan re-sharding masif saat node ditambah atau dihapus.',
    overview: {
      summary: 'Algoritma esensial di balik Amazon DynamoDB, Apache Cassandra, dan Akamai CDN untuk partisi terdistribusi berkecepatan tinggi.',
      learningOutcomes: [
        'Membangun hash ring 360 derajat (atau uint32 range)',
        'Menerapkan Virtual Nodes untuk distribusi beban yang merata',
        'Menghitung persentase kunci data yang bermigrasi saat node mati'
      ],
      techStack: ['Consistent Hashing', 'Virtual Nodes', 'Distributed Sharding'],
      architectureGuidelines: [
        'Gunakan virtual nodes minimal 50-100 per physical server untuk mencegah hot spots'
      ]
    },
    instructions: [
      { step: 1, title: 'Bangun Consistent Hash Ring', description: 'Tambahkan node ke ring dengan virtual node multiplier.' },
      { step: 2, title: 'Cari Node untuk Key', description: 'Lakukan binary search pada array ring terurut untuk menemukan node terdekat searah jarum jam.' }
    ],
    starterJs: `class ConsistentHashRing {
  constructor(virtualNodes = 3) {
    this.vNodes = virtualNodes;
    this.ring = [];
    this.nodeMap = new Map();
  }

  addNode(nodeId) {
    for (let i = 0; i < this.vNodes; i++) {
      const vKey = \`\${nodeId}-v\${i}\`;
      const hash = this.hash(vKey);
      this.ring.push(hash);
      this.nodeMap.set(hash, nodeId);
    }
    this.ring.sort((a, b) => a - b);
  }

  getNode(key) {
    if (this.ring.length === 0) return null;
    const h = this.hash(key);
    for (const pos of this.ring) {
      if (h <= pos) return this.nodeMap.get(pos);
    }
    return this.nodeMap.get(this.ring[0]); // Wrap around
  }

  hash(str) {
    return str.split('').reduce((acc, c) => ((acc << 5) - acc) + c.charCodeAt(0), 0) >>> 0;
  }
}`,
    requirements: [
      {
        id: 'req-arch-17-ring',
        title: 'Consistent Hashing Ring & Virtual Nodes',
        description: 'Harus terdapat ConsistentHashRing dengan addNode dan getNode.',
        check: (_, __, js) => (js || '').includes('ConsistentHashRing') && (js || '').includes('addNode') && (js || '').includes('getNode')
      }
    ]
  },
  {
    id: 'proj-arch-18',
    title: 'Resilient Distributed Platform (Circuit Breaker & Bulkhead)',
    type: 'guided',
    category: 'architecture',
    difficulty: 'Advanced',
    status: 'published',
    xp: 190,
    estTime: '65 Menit',
    tags: ['Resilience', 'Circuit Breaker', 'Bulkhead', 'Exponential Backoff'],
    description: 'Bangun resilience interceptor lengkap: Circuit Breaker 3-state (CLOSED, OPEN, HALF_OPEN), Retry dengan Exponential Backoff + Random Full Jitter, dan Fallback Degraded Response.',
    overview: {
      summary: 'Mencegah kegagalan berantai (cascading failure) dan melindungi upstream dependency saat sistem mengalami overload.',
      learningOutcomes: [
        'Mengimplementasikan transisi status Circuit Breaker berbasis failure threshold',
        'Menambahkan timeout dan half-open recovery probe',
        'Menggunakan formula backoff jitter untuk mencegah spike gelombang retry serentak'
      ],
      techStack: ['Resilience Engineering', 'Circuit Breaker Pattern', 'Chaos Tolerance'],
      architectureGuidelines: [
        'Saat OPEN, request langsung ditolak dengan Fast-Fail tanpa menunggu timeout remote',
        'Selalu sertakan fallback response (misal: data dari stale cache)'
      ]
    },
    instructions: [
      { step: 1, title: 'Definisikan State Machine', description: 'Kelola status CLOSED, OPEN, HALF_OPEN dengan variabel failureCount dan cooldownTimer.' },
      { step: 2, title: 'Bungkus Panggilan Eksternal', description: 'Eksekusi fungsi target jika status CLOSED atau HALF_OPEN.' }
    ],
    starterJs: `class CircuitBreaker {
  constructor(failureThreshold = 3, cooldownMs = 5000) {
    this.failureThreshold = failureThreshold;
    this.cooldownMs = cooldownMs;
    this.state = 'CLOSED';
    this.failureCount = 0;
    this.nextAttempt = Date.now();
  }

  async execute(fn, fallback) {
    if (this.state === 'OPEN') {
      if (Date.now() > this.nextAttempt) {
        this.state = 'HALF_OPEN';
      } else {
        return fallback ? fallback() : Promise.reject(new Error('Circuit is OPEN (Fast Fail)'));
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (err) {
      this.onFailure();
      return fallback ? fallback() : Promise.reject(err);
    }
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failureCount++;
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.cooldownMs;
    }
  }
}`,
    requirements: [
      {
        id: 'req-arch-18-cb',
        title: 'Circuit Breaker State Machine',
        description: 'CircuitBreaker harus memiliki status CLOSED, OPEN, HALF_OPEN dan fungsi execute.',
        check: (_, __, js) => (js || '').includes('CircuitBreaker') && (js || '').includes('HALF_OPEN') && (js || '').includes('onFailure')
      }
    ]
  },
  {
    id: 'proj-arch-19',
    title: 'Observable Production System (OpenTelemetry Tracing)',
    type: 'guided',
    category: 'architecture',
    difficulty: 'Advanced',
    status: 'published',
    xp: 190,
    estTime: '65 Menit',
    tags: ['Observability', 'Distributed Tracing', 'OpenTelemetry', 'Structured Logging'],
    description: 'Implementasikan distributed context propagation (W3C TraceContext traceparent), Span hierarchy generator (parent-child spans), and RED metrics collector (Rate, Errors, Duration).',
    overview: {
      summary: 'Tiga pilar observabilitas (Logs, Metrics, Traces) terintegrasi untuk mendeteksi akar masalah latensi di arsitektur microservices.',
      learningOutcomes: [
        'Membuat dan meneruskan header W3C traceparent (version-traceId-spanId-flags)',
        'Merekam durasi span untuk visualisasi waterfall waterfall tracing',
        'Menghitung RED metrics (Rate, Error %, Duration p95)'
      ],
      techStack: ['Distributed Tracing', 'W3C TraceContext', 'Telemetry Math'],
      architectureGuidelines: [
        'Semua downstream network call harus menginjeksi header traceparent yang sama'
      ]
    },
    instructions: [
      { step: 1, title: 'Injeksi W3C Traceparent', description: 'Format header `00-{traceId32}-{spanId16}-01`.' },
      { step: 2, title: 'Kumpulkan Span Timeline', description: 'Catat startTime, endTime, status, dan attributes per child span.' }
    ],
    starterJs: `class Tracer {
  createTrace() {
    const traceId = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    return {
      traceId,
      createSpan: (name, parentSpanId = null) => {
        const spanId = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
        const start = performance.now();
        return {
          name,
          traceId,
          spanId,
          parentSpanId,
          w3cHeader: \`00-\${traceId}-\${spanId}-01\`,
          end: () => ({ name, durationMs: performance.now() - start })
        };
      }
    };
  }
}`,
    requirements: [
      {
        id: 'req-arch-19-trace',
        title: 'W3C Traceparent Generator',
        description: 'Tracer harus menghasilkan header W3C traceparent yang valid.',
        check: (_, __, js) => (js || '').includes('createTrace') && (js || '').includes('w3cHeader')
      }
    ]
  },
  {
    id: 'proj-arch-20',
    title: 'Production System Architecture Capstone',
    type: 'capstone',
    category: 'architecture',
    difficulty: 'Advanced',
    status: 'published',
    xp: 250,
    estTime: '90 Menit',
    tags: ['Architecture Capstone', 'Full-Scale Design', 'High Concurrency', 'Production Readiness'],
    description: 'Proyek puncak arsitektur perangkat lunak: Rancang arsitektur end-to-end sistem pemrosesan pesanan skala global (100k RPS) dengan API Gateway, Event Broker, Saga Orchestrator, CQRS Read Store, Caching Layer, dan Distributed Observability.',
    overview: {
      summary: 'Mengintegrasikan seluruh prinsip modularitas, clean architecture, ketahanan terdistribusi, dan performa tinggi dalam satu arsitektur komprehensif siap produksi.',
      learningOutcomes: [
        'Menyusun dokumen Architectural Decision Record (ADR) lengkap',
        'Mengintegrasikan caching, messaging, dan database transaction boundaries',
        'Menguji ketahanan sistem dengan simulasi chaos dan traffic spike'
      ],
      techStack: ['Clean Architecture', 'Event Sourcing', 'Saga', 'Consistent Hashing', 'Resilience'],
      architectureGuidelines: [
        'Sertakan isolasi kegagalan per service',
        'Gunakan asynchronous messaging untuk mutasi yang tidak memerlukan blocking synchronous',
        'Definisikan kriteria RTO (Recovery Time Objective) dan RPO (Recovery Point Objective)'
      ]
    },
    instructions: [
      { step: 1, title: 'Inisialisasi Master System Container', description: 'Gabungkan API Gateway, Event Broker, Cache Engine, dan Circuit Breaker.' },
      { step: 2, title: 'Alirkan Request Checkout End-to-End', description: 'Eksekusi transaksi idempotence -> cache check -> saga execution -> event emit -> metrics record.' },
      { step: 3, title: 'Verifikasi Resiliency Capstone', description: 'Pastikan kegagalan salah satu node kompensasi tidak merusak konsistensi data keseluruhan.' }
    ],
    starterJs: `class ProductionSystemCapstone {
  constructor() {
    this.cache = new Map();
    this.events = [];
    this.metrics = { processed: 0, errors: 0 };
  }

  async handleCheckout(request) {
    const { idempotencyKey, orderData } = request;
    if (this.cache.has(idempotencyKey)) {
      return { ...this.cache.get(idempotencyKey), replayed: true };
    }

    try {
      // 1. Process Order
      const order = { id: 'ord_' + Date.now(), ...orderData, status: 'PROCESSED' };
      // 2. Publish Domain Event
      this.events.push({ type: 'ORDER_COMPLETED', payload: order, timestamp: Date.now() });
      // 3. Cache Result
      this.cache.set(idempotencyKey, order);
      this.metrics.processed++;
      return order;
    } catch (err) {
      this.metrics.errors++;
      throw err;
    }
  }
}`,
    requirements: [
      {
        id: 'req-arch-20-capstone',
        title: 'Capstone Production Pipeline',
        description: 'ProductionSystemCapstone harus mengintegrasikan idempotency, domain events, dan metrics.',
        check: (_, __, js) => (js || '').includes('ProductionSystemCapstone') && (js || '').includes('handleCheckout') && (js || '').includes('idempotencyKey')
      }
    ]
  }
];
