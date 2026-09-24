export interface RoadmapNode {
  id: string;
  title: string;
  category: 'frontend' | 'backend' | 'fullstack' | 'devsecops' | 'cybersecurity' | 'systems';
  level: 'foundational' | 'intermediate' | 'advanced';
  description: string;
  courseId: string;
  estimatedHours: number;
  keyTopics: string[];
  practicalMilestone: string;
  prerequisites: string[];
  badge: string;
}

export interface CareerTrack {
  id: 'frontend' | 'backend' | 'fullstack' | 'devsecops' | 'cybersecurity' | 'systems';
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  avgSalaryRange: string;
  roleTitles: string[];
  totalHours: number;
  milestoneNodes: RoadmapNode[];
}

export const CAREER_TRACKS: CareerTrack[] = [
  {
    id: 'frontend',
    title: 'Frontend Web Engineer',
    tagline: 'Membangun Antarmuka Modern, Responsif, Aksesibel, & Interaktif',
    description: 'Jalur karir terstruktur dari fondasi semantic HTML & CSS hingga arsitektur komponen React tingkat lanjut dan optimasi performa web.',
    iconName: 'Layout',
    avgSalaryRange: 'Rp 8.000.000 - Rp 25.000.000 / bln',
    roleTitles: ['Frontend Developer', 'UI/UX Engineer', 'React Specialist', 'Web Performance Engineer'],
    totalHours: 120,
    milestoneNodes: [
      {
        id: 'node-html',
        title: 'Semantic HTML5 & Accessibility (a11y)',
        category: 'frontend',
        level: 'foundational',
        description: 'Fondasi struktur web modern: elemen semantik, form handling, meta SEO, dan aksesibilitas screen reader.',
        courseId: 'html-mastery',
        estimatedHours: 18,
        keyTopics: ['Semantic Tags (<header>, <main>, <article>)', 'Accessible Forms & Inputs', 'ARIA Roles & Labels', 'SEO Metadata & OpenGraph'],
        practicalMilestone: 'Membangun landing page semantik 100% skor Lighthouse Accessibility.',
        prerequisites: [],
        badge: 'HTML Master'
      },
      {
        id: 'node-css',
        title: 'Modern CSS3, Flexbox, Grid & Responsive Layouts',
        category: 'frontend',
        level: 'foundational',
        description: 'Desain visual berstandar industri menggunakan CSS Grid, Flexbox, variabel tema, dan media queries adaptif.',
        courseId: 'css-mastery',
        estimatedHours: 24,
        keyTopics: ['Flexbox Alignment & Justify', 'CSS Grid 12-Column Systems', 'Responsive Breakpoints', 'CSS Variables & Dark Mode'],
        practicalMilestone: 'Membuat dashboard admin multi-device tanpa framework CSS eksternal.',
        prerequisites: ['node-html'],
        badge: 'CSS Stylist'
      },
      {
        id: 'node-js',
        title: 'Core JavaScript & Asynchronous Programming (ES6+)',
        category: 'frontend',
        level: 'foundational',
        description: 'Penguasaan pemrograman logika web: closures, event loop, Promises, async/await, DOM APIs, dan array methods.',
        courseId: 'js-mastery',
        estimatedHours: 35,
        keyTopics: ['ES6 Syntax & Destructuring', 'DOM Manipulation & Custom Events', 'Async/Await & Fetch API', 'Scope, Closures & Context (this)'],
        practicalMilestone: 'Membangun aplikasi belanja interaktif dengan fetch API real-time dan local persistence.',
        prerequisites: ['node-html', 'node-css'],
        badge: 'JavaScript Pro'
      },
      {
        id: 'node-react',
        title: 'React 18 Component Architecture & Custom Hooks',
        category: 'frontend',
        level: 'intermediate',
        description: 'Membangun Single Page Applications (SPA) modular: useState, useEffect, context, custom hooks, dan render optimization.',
        courseId: 'react-mastery',
        estimatedHours: 43,
        keyTopics: ['JSX & Component Hierarchy', 'State & Props Immutability', 'Custom Hooks Pattern', 'Performance (memo, useMemo, useCallback)'],
        practicalMilestone: 'Merancang workspace Kanban multi-kolom dengan drag-and-drop dan state management.',
        prerequisites: ['node-js'],
        badge: 'React Specialist'
      }
    ]
  },
  {
    id: 'backend',
    title: 'Backend & Systems Engineer',
    tagline: 'Mengembangkan Server Tangguh, API Terukur, & Tata Kelola Database',
    description: 'Fokus pada arsitektur server, logika bisnis backend, integrasi database relasional, skema SQL, dan REST/JSON API.',
    iconName: 'Server',
    avgSalaryRange: 'Rp 9.000.000 - Rp 28.000.000 / bln',
    roleTitles: ['Backend Engineer', 'Python / Node API Developer', 'Database Architect', 'Systems Programmer'],
    totalHours: 140,
    milestoneNodes: [
      {
        id: 'node-python',
        title: 'Python 3 Modern Programming & OOP Core',
        category: 'backend',
        level: 'foundational',
        description: 'Struktur data Python, pemrograman berorientasi objek (OOP), generator, exception handling, dan ekosistem pip.',
        courseId: 'python-mastery',
        estimatedHours: 35,
        keyTopics: ['Data Structures (List, Dict, Set, Tuple)', 'OOP Classes & Inheritance', 'List Comprehensions & Lambdas', 'Exception Handling & Modules'],
        practicalMilestone: 'Membangun mesin pemroses data transaksi dengan validasi otomatis dan logging error.',
        prerequisites: [],
        badge: 'Pythonista'
      },
      {
        id: 'node-database',
        title: 'Relational Database Design & SQL Engineering',
        category: 'backend',
        level: 'foundational',
        description: 'Perancangan basis data relasional: normalisasi 3NF, query JOIN kompleks, indexing performa, dan integritas transaksi ACID.',
        courseId: 'database-mastery',
        estimatedHours: 30,
        keyTopics: ['Schema Design & Foreign Keys', 'Complex JOINs & Aggregations', 'Indexes & Query Optimization', 'Transactions & ACID Guarantees'],
        practicalMilestone: 'Merancang skema database E-Commerce relasional dengan 10+ tabel dan query reporting performan.',
        prerequisites: [],
        badge: 'Data Architect'
      },
      {
        id: 'node-mysql-backend',
        title: 'MySQL 8 Relational Database & InnoDB Engineering',
        category: 'backend',
        level: 'foundational',
        description: 'Kuasai MySQL secara mendalam: skema InnoDB, query multi-JOIN, B-Tree index, dan transaksi ACID perbankan.',
        courseId: 'mysql-mastery',
        estimatedHours: 30,
        keyTopics: ['MySQL InnoDB Storage Engine', 'Foreign Key Cascades', 'Query Analysis with EXPLAIN', 'ACID Transactions & Row-Locking'],
        practicalMilestone: 'Merancang skema toko online dengan integritas referensial dan indeks komposit cepat.',
        prerequisites: [],
        badge: 'MySQL Specialist'
      },
      {
        id: 'node-php-backend',
        title: 'PHP 8 Enterprise Backend & PDO Architecture',
        category: 'backend',
        level: 'intermediate',
        description: 'Backend web tangguh dengan PHP 8: OOP classes, interfaces, PDO prepared statements, dan arsitektur REST API modular.',
        courseId: 'php-mastery',
        estimatedHours: 35,
        keyTopics: ['PHP 8 Constructor Promotion', 'PDO & SQL Injection Prevention', 'Composer Autoloading & Namespaces', 'RESTful Controller & JSON Responses'],
        practicalMilestone: 'Membangun REST API PHP 8 aman terhubung ke database MySQL dengan prepared statements.',
        prerequisites: ['node-mysql-backend'],
        badge: 'PHP Artisan'
      },
      {
        id: 'node-backend-api',
        title: 'Backend Microservices & REST API Architecture',
        category: 'backend',
        level: 'intermediate',
        description: 'Konstruksi backend service berkinerja tinggi: routing HTTP, middleware, DTO validation, dan modular controllers.',
        courseId: 'backend-mastery',
        estimatedHours: 40,
        keyTopics: ['RESTful Endpoint Standards', 'Middleware Pipeline & Error Filters', 'Data Transfer Objects (DTOs)', 'Stateless API Design & Rate Limiting'],
        practicalMilestone: 'Membangun REST API gateway microservice dengan autentikasi token dan caching response.',
        prerequisites: ['node-python', 'node-database'],
        badge: 'API Engineer'
      },
      {
        id: 'node-auth-api-sec',
        title: 'Auth Systems, JWT Tokens & API Hardening',
        category: 'backend',
        level: 'advanced',
        description: 'Standar autentikasi modern: token JWT rotasi, OAuth 2.0, CORS policy, header security, dan sanitasi payload.',
        courseId: 'auth-api-security',
        estimatedHours: 35,
        keyTopics: ['JWT Claims & Refresh Tokens', 'Role-Based Access Control (RBAC)', 'CORS & CSP Configuration', 'Payload Validation & SQLi Defense'],
        practicalMilestone: 'Mengimplementasikan sistem otentikasi enterprise dengan multi-role dan rate-limit DDoS prevention.',
        prerequisites: ['node-backend-api'],
        badge: 'Security Architect'
      }
    ]
  },
  {
    id: 'fullstack',
    title: 'Fullstack Software Engineer',
    tagline: 'Integrasi End-to-End: Dari Antarmuka Klien Hingga Basis Data Cloud',
    description: 'Kombinasi keahlian menyeluruh merancang aplikasi web modern dari sisi frontend interaktif hingga backend cloud yang skalabel.',
    iconName: 'Layers',
    avgSalaryRange: 'Rp 10.000.000 - Rp 30.000.000 / bln',
    roleTitles: ['Fullstack Engineer', 'Web Solutions Architect', 'Technical Founder', 'Lead Fullstack Developer'],
    totalHours: 170,
    milestoneNodes: [
      {
        id: 'node-git',
        title: 'Git Version Control & Team Collaboration',
        category: 'fullstack',
        level: 'foundational',
        description: 'Manajemen source code: branching strategy (Git Flow), merge conflict resolution, rebase, dan commit convention.',
        courseId: 'git-mastery',
        estimatedHours: 20,
        keyTopics: ['Git Branching & Merging', 'Rebase vs Merge Strategies', 'Resolving Complex Conflicts', 'Pull Request Review Workflow'],
        practicalMilestone: 'Mengelola repository tim multi-kontributor dengan simulasi merge conflict dan tagging rilis.',
        prerequisites: [],
        badge: 'Git Commander'
      },
      {
        id: 'node-fullstack-core',
        title: 'Fullstack Web Architecture & Client-Server Sync',
        category: 'fullstack',
        level: 'intermediate',
        description: 'Sinkronisasi menyeluruh antara UI React, state server, middleware proxy, dan basis data cloud.',
        courseId: 'fullstack-mastery',
        estimatedHours: 50,
        keyTopics: ['Client-Server Separation & Proxies', 'Optimistic UI Updates', 'Real-time WebSocket / SSE Events', 'Environment Variables & Secret Isolation'],
        practicalMilestone: 'Membangun aplikasi SaaS kolaboratif fullstack dengan autentikasi pengguna dan realtime updates.',
        prerequisites: ['node-js', 'node-react', 'node-database'],
        badge: 'Fullstack Pro'
      },
      {
        id: 'node-continuous-eng',
        title: 'Continuous Engineering, Testing & Automation',
        category: 'fullstack',
        level: 'advanced',
        description: 'Praktik rekayasa berkelanjutan: unit testing, integration tests, automated linting, dan build pipeline terintegrasi.',
        courseId: 'continuous-engineering',
        estimatedHours: 35,
        keyTopics: ['Unit & Integration Testing', 'Test-Driven Development (TDD)', 'Automated Static Analysis (Linters)', 'Build Optimization & Bundling'],
        practicalMilestone: 'Menyiapkan automated test suite dengan coverage >80% dan pre-commit verification hook.',
        prerequisites: ['node-fullstack-core'],
        badge: 'Quality Engineer'
      }
    ]
  },
  {
    id: 'devsecops',
    title: 'DevSecOps & Cloud Reliability (SRE)',
    tagline: 'Otomasi Pipeline, Arsitektur Cloud, & Ketahanan Sistem Produksi',
    description: 'Mempersiapkan infrastruktur rilis otomatis, container orchestration, monitoring waktu nyata, dan keandalan sistem tinggi.',
    iconName: 'Cloud',
    avgSalaryRange: 'Rp 12.000.000 - Rp 35.000.000 / bln',
    roleTitles: ['DevOps Engineer', 'Site Reliability Engineer (SRE)', 'Platform Engineer', 'Cloud Infrastructure Architect'],
    totalHours: 150,
    milestoneNodes: [
      {
        id: 'node-devsecops-deploy',
        title: 'DevSecOps, Containers & Cloud Deployment',
        category: 'devsecops',
        level: 'intermediate',
        description: 'Otomasi pipeline CI/CD, containerization Docker, manajemen secret aman, dan deployment tanpa downtime di Cloud Run.',
        courseId: 'devsecops-deployment',
        estimatedHours: 40,
        keyTopics: ['CI/CD Pipeline Design', 'Containerization & Docker Best Practices', 'Infrastructure as Code (IaC)', 'Zero-Downtime Blue/Green Rollouts'],
        practicalMilestone: 'Membuat pipeline rilis otomatis dari commit git hingga running container di server produksi.',
        prerequisites: ['node-git'],
        badge: 'Cloud Deployer'
      },
      {
        id: 'node-sre-observability',
        title: 'Site Reliability Engineering (SRE) & Observability',
        category: 'devsecops',
        level: 'advanced',
        description: 'Memantau kesehatan sistem: telemetri distributed tracing, metric latency, error budgets (SLO/SLA), dan automated alerting.',
        courseId: 'reliability-observability',
        estimatedHours: 45,
        keyTopics: ['Three Pillars of Observability (Logs, Metrics, Traces)', 'SLI, SLO & SLA Framework', 'Alerting Thresholds & Pager Setup', 'Root-Cause Analysis (RCA) & Post-Mortems'],
        practicalMilestone: 'Membangun dashboard observability terpadu dengan metrik p95/p99 latency dan simulasi traffic spike.',
        prerequisites: ['node-devsecops-deploy'],
        badge: 'SRE Specialist'
      }
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Application Security (AppSec) Specialist',
    tagline: 'Mempertahankan Aplikasi Web dari Eksploitasi & Serangan Cyber',
    description: 'Pendekatan proaktif keamanan software: identifikasi kerentanan OWASP Top 10, threat modeling STRIDE, dan audit kesiapan rilis.',
    iconName: 'ShieldAlert',
    avgSalaryRange: 'Rp 12.000.000 - Rp 38.000.000 / bln',
    roleTitles: ['AppSec Engineer', 'Security Consultant', 'Vulnerability Assessor', 'Penetration Tester'],
    totalHours: 135,
    milestoneNodes: [
      {
        id: 'node-cyber-foundations',
        title: 'Cybersecurity Foundations & OWASP Top 10 Defenses',
        category: 'cybersecurity',
        level: 'intermediate',
        description: 'Menganalisis dan menambal vektor serangan web terpopuler: SQL Injection, XSS, CSRF, SSRF, dan broken access control.',
        courseId: 'cybersecurity-foundations',
        estimatedHours: 35,
        keyTopics: ['OWASP Top 10 Vulnerabilities', 'Cross-Site Scripting (XSS) Sanitization', 'SQL Injection Hardening', 'Cryptographic Hashing (bcrypt, argon2)'],
        practicalMilestone: 'Melakukan code audit dan menambal 5 celah eksploitasi kritis di Security Lab simulasi.',
        prerequisites: ['node-js'],
        badge: 'AppSec Defender'
      },
      {
        id: 'node-threat-audit',
        title: 'STRIDE Threat Modeling & Production Readiness Gate',
        category: 'cybersecurity',
        level: 'advanced',
        description: 'Metodologi evaluasi ancaman tingkat arsitektur (STRIDE) dan gerbang audit pra-produksi untuk jaminan kepatuhan keamanan.',
        courseId: 'cybersecurity-foundations',
        estimatedHours: 40,
        keyTopics: ['STRIDE Threat Modeling Methodology', 'Data Flow Diagrams (DFD) Analysis', 'Secrets Hygiene & Zero Trust Verification', 'Production Readiness Gate Checklist'],
        practicalMilestone: 'Menyusun dokumen threat model komprehensif dan menyelesaikan live audit readiness gate.',
        prerequisites: ['node-cyber-foundations'],
        badge: 'Security Auditor'
      }
    ]
  },
  {
    id: 'systems',
    title: 'Systems & High-Performance Engineer',
    tagline: 'Pemrograman Arsitektur Tingkat Rendah, Memori RAM, & Konkurensi Cloud',
    description: 'Kuasai rekayasa sistem berkecepatan tinggi dengan C, C++, Go, dan optimasi engine basis data MySQL.',
    iconName: 'Cpu',
    avgSalaryRange: 'Rp 14.000.000 - Rp 42.000.000 / bln',
    roleTitles: ['Systems Programmer', 'C/C++ Core Developer', 'Golang Cloud Architect', 'Database Engine Engineer'],
    totalHours: 165,
    milestoneNodes: [
      {
        id: 'node-c-systems',
        title: 'C Programming, Memory Allocation & Pointers',
        category: 'systems',
        level: 'foundational',
        description: 'Pemrograman sistem tingkat rendah: pointer arithmetic, Heap vs Stack (malloc/free), structs, dan POSIX compiling.',
        courseId: 'c-mastery',
        estimatedHours: 40,
        keyTopics: ['Pointer Arithmetic & Dereferencing', 'Manual Memory (malloc/free)', 'Data Structures (Structs & Linked Lists)', 'GCC Compilation Pipeline'],
        practicalMilestone: 'Membangun allocator memori kustom dan struktur data dinamis berkinerja tinggi.',
        prerequisites: [],
        badge: 'Systems Hacker'
      },
      {
        id: 'node-cpp-systems',
        title: 'Modern C++ (C++20), RAII & High-Performance STL',
        category: 'systems',
        level: 'intermediate',
        description: 'Sistem performa ekstrim: RAII resource safety, std::unique_ptr, OOP, template meta-programming, dan library STL.',
        courseId: 'cpp-mastery',
        estimatedHours: 45,
        keyTopics: ['RAII Memory Idiom', 'Smart Pointers (unique_ptr, shared_ptr)', 'Standard Template Library (STL Containers)', 'Zero-Cost Abstractions'],
        practicalMilestone: 'Mengembangkan game engine entity component subsystem atau simulator komputasi cepat.',
        prerequisites: ['node-c-systems'],
        badge: 'C++ Architect'
      },
      {
        id: 'node-go-concurrency',
        title: 'Go (Golang) Concurrency & Distributed Microservices',
        category: 'systems',
        level: 'intermediate',
        description: 'Konkurensi masif tanpa overhead: Goroutines, Channels, CSP communication model, dan high-throughput HTTP server.',
        courseId: 'golang-mastery',
        estimatedHours: 40,
        keyTopics: ['Goroutines & Lightweight Threads', 'Channels & Select Pattern', 'sync.WaitGroup & Mutex', 'Production REST with net/http'],
        practicalMilestone: 'Merancang high-throughput telemetry worker pool yang memproses 50.000 request per detik.',
        prerequisites: [],
        badge: 'Gopher Pro'
      },
      {
        id: 'node-mysql-perf',
        title: 'MySQL Engine Internals, Indexing & ACID Transactions',
        category: 'systems',
        level: 'advanced',
        description: 'Arsitektur internal InnoDB: B-Tree Indexing, query execution plan (EXPLAIN), row-locking, dan isolasi transaksi.',
        courseId: 'mysql-mastery',
        estimatedHours: 40,
        keyTopics: ['InnoDB Architecture & Buffer Pool', 'B-Tree & Hash Index Optimization', 'EXPLAIN Query Cost Analysis', 'ACID Transactions & Row Locks'],
        practicalMilestone: 'Mengoptimasi query lambat pada tabel 10 juta baris hingga sub-millisecond latency.',
        prerequisites: ['node-c-systems'],
        badge: 'Database Tuner'
      }
    ]
  }
];
