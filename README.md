# COMMANDEV Academy 🚀

[![Production Build](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square&logo=vite)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/typescript-5.0+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React 18](https://img.shields.io/badge/react-18+-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Firebase Firestore](https://img.shields.io/badge/firebase-firestore-orange?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Tests Passing](https://img.shields.io/badge/tests-100%25%20passing-success?style=flat-square&logo=jest)](https://github.com/)

> **Learn. Code. Build. Master.**  
> Platform pembelajaran rekayasa perangkat lunak interaktif berstandar industri dengan 24 kurikulum berjenjang, sandbox eksekusi live code, simulator arsitektur terdistribusi, evaluasi proyek otomatis berbasis server (*server-authoritative*), CMS Admin v2.5, serta fondasi analitik & telemetri observasional.

---

## 📑 Daftar Isi

- [Arsitektur Sistem](#-arsitektur-sistem)
- [Kurikulum (Courses 1–24)](#-kurikulum-courses-124)
- [Course 24: Software Architecture & System Design](#-course-24-software-architecture--system-design)
- [Katalog Proyek & Evaluasi Server-Authoritative](#-katalog-proyek--evaluasi-server-authoritative)
- [Simulator & Studio Interaktif](#-simulator--studio-interaktif)
- [Admin CMS v2.5](#-admin-cms-v25)
- [Fondasi Analitik & Telemetri Observasional](#-fondasi-analitik--telemetri-observasional)
- [Keamanan & Kepatuhan UU PDP](#-keamanan--kepatuhan-uu-pdp)
- [Panduan Instalasi & Eksekusi](#-panduan-instalasi--eksekusi)
- [Suite Pengujian Otomatis](#-suite-pengujian-otomatis)

---

## 🏛️ Arsitektur Sistem

COMMANDEV Academy dibangun dengan prinsip modular, terisolasi, dan berkepastian tinggi (*high determinism*):

```text
React 18 + Vite (Frontend SPA)
        ↓
Tailwind CSS + Lucide Icons + Motion (UI/UX)
        ↓
Express / Node.js (Fullstack Server & Middlewares)
        ↓
Firebase Auth + Admin RBAC (Autentikasi & Otorisasi)
        ↓
Cloud Firestore (State Persistensi: Users, Leaderboard, Audit, Telemetri)
        ↓
CMS Engine v2.5 (Manajemen Konten Kurikulum 5 Tingkat)
        ↓
Sandbox & Test Runner (Eksekusi Web & Python Terisolasi)
        ↓
Server-Authoritative Project Evaluator (Evaluasi Deklaratif Proyek)
        ↓
Analytics Foundation & Observational Telemetry (Pipeline Data Privasi)
```

---

## 📚 Kurikulum (Courses 1–24)

COMMANDEV Academy menyajikan 24 jalur kurikulum rekayasa komprehensif dari dasar hingga tingkat arsitek sistem:

1. **HTML5 Web Fundamentals** — Struktur semantik, aksesibilitas ARIA, form interaktif, dan SEO modern.
2. **CSS3 & Interactive Layouts** — Box model, Flexbox multi-axis, CSS Grid, keyframe animations, dan responsivitas.
3. **JavaScript Modern (ES6+)** — Scope, closures, asynchronous promises, async/await, DOM engine, dan modularitas.
4. **Python 3.12 Core & Data Structures** — Algoritma, struktur data bawaan, OOP, modul, dan exception handling.
5. **PHP 8 Modern & Web Development** — Server-side rendering, type system baru, form validation, dan routing.
6. **MySQL & Relational Database Design** — Normalisasi (1NF–3NF), DDL/DML, JOINs, agregasi, subqueries, dan indexing.
7. **Bahasa C: Systems Programming** — Memory management manual, pointers, structs, file I/O, dan low-level logic.
8. **C++: Modern OOP & STL** — Kelas, inheritance, templates, smart pointers, dan algoritma standar STL.
9. **Go (Golang): Concurrent Backend** — Goroutines, channels, interfaces, structs, dan REST microservices.
10. **React 18: Modern Frontend** — JSX, functional components, hooks, context API, dan performa rendering.
11. **Git & GitHub CLI Simulator** — Branching, merging, commit staging, pull requests, dan visualisasi commit tree.
12. **Backend Engineering & RESTful APIs** — Desain API terstandar, middleware, auth guards, dan HTTP semantics.
13. **Database Architecture & Optimization** — Query profiling, connection pooling, sharding, dan read-replicas.
14. **Fullstack Engineering & Integration** — Arsitektur end-to-end menghubungkan frontend SPA dengan microservices backend.
15. **Continuous Engineering & CI/CD Pipelines** — Otomasi pengujian, GitHub Actions, Docker containers, dan linting.
16. **Cybersecurity & OWASP Top 10** — Proteksi XSS, CSRF, SQL Injection, SSRF, IDOR, dan parameter sanitization.
17. **Authentication & API Security** — JWT, OAuth 2.0, bcrypt/argon2 hashing, session cookies, dan rate limiting.
18. **DevSecOps & Cloud Deployment** — Hardening kontainer Linux non-root, HTTPS TLS/HSTS, dan Secret Manager.
19. **Reliability, Observability & SRE** — Error budgeting, centralized logging, health probes, dan SLA/SLO metrics.
20. **Cloud DevOps & Distributed Infrastructure** — Kubernetes, load balancing, reverse proxy, dan cloud networks.
21. **AI & Machine Learning Foundations** — Scikit-learn, embeddings, vector similarity, dan pemrosesan dataset.
22. **Advanced Python for High-Performance Systems** — Concurrency, generators, asynchronous asyncio, dan typing.
23. **Advanced JavaScript Internals & V8 Engine** — Event loop, microtask queue, memory garbage collection, dan Web Workers.
24. **Software Architecture & System Design** — Clean Architecture, DDD, CQRS, Sagas, caching, messaging, resilience, dan high-throughput systems.

---

## 🏗️ Course 24: Software Architecture & System Design

Course 24 adalah kursus capstone tingkat lanjut dengan cakupan:
- **32 Modul Pembelajaran Lengkap** (dari prinsip SOLID, Clean Architecture, DDD, API Gateway, Sharding, hingga SRE).
- **20 Proyek Portofolio Arsitektur Real-World** (`proj-arch-01` s/d `proj-arch-20`).
- **10 Simulator Arsitektur Interaktif**.
- **160+ Soal Kuis Analisis & Skenario Trade-off**.

---

## 💼 Katalog Proyek & Evaluasi Server-Authoritative

Platform menyediakan **26 Proyek Praktik Nyata Terverifikasi** pada Workspace:
- **6 Proyek Fondasi Inti**:
  - `proj-guided-1`: Developer Profile Card (Web Semantik)
  - `proj-guided-2`: Interactive Task Board (DOM & State)
  - `proj-guided-3`: Python Data Analyzer (Algorithms & CLI)
  - `proj-guided-4`: React Analytics Widget (Components & Props)
  - `proj-guided-5`: RESTful Micro-Service (Express Backend)
  - `proj-guided-6`: Fullstack Application Capstone
- **20 Proyek Rekayasa Arsitektur Sistem**:
  - Implementasi Hexagonal Architecture, Saga Pattern, Circuit Breakers, CQRS Event Stores, Distributed Caching, OpenTelemetry Collectors, dll.

### 🛡️ Evaluator Berbasis Server (Phase 5C–5G Engine):
- **Anti-Tampering**: Kriteria evaluasi, bobot nilai, dan pola regex/AST disimpan terlindungi di Firestore (`/project_evaluations`). Siswa tidak dapat memanipulasi skor atau menginjeksi kelulusan palsu dari sisi klien.
- **Idempotent Completion**: Submisi yang lulus diverifikasi oleh transaksi atomik backend; XP diberikan sekali saja tanpa duplikasi reward.
- **Sanitized Feedback**: Respons API (`/api/projects/:projectId/submit`) membersihkan seluruh konfigurasi evaluasi internal dan hanya mengembalikan status kelulusan, skor, dan umpan balik publik yang ramah pembelajar.

---

## 🕹️ Simulator & Studio Interaktif

1. **Architecture Simulator Hub (10 Simulator)**:
   - *Architecture Explorer* (Topologi & dependensi)
   - *Trade-off PACELC Simulator* (Latency vs Consistency)
   - *Cache Strategy Lab* (LRU, LFU, Write-Through, Cache-Aside)
   - *Message Queue & Backpressure* (Kafka / RabbitMQ partitioning)
   - *Distributed Consensus & Replication* (Raft simulation)
   - *CAP Theorem Interactive Model* (CP vs AP under network split)
   - *Scalability & High RPS Benchmarker* (50.000 RPS load simulation)
   - *Failure Injection & Circuit Breaker* (Chaos engineering & bulkhead)
   - *Distributed Tracing & Observability* (OpenTelemetry W3C traceparent)
   - *System Design Blueprint Canvas* (Penyusunan arsitektur end-to-end)
2. **Git & GitHub Simulator**: Terminal CLI interaktif dengan visualisasi branch tree dan commit log.
3. **SQL Interactive Studio**: Sandbox basis data relasional dengan eksekusi query SQL langsung dan rendering tabel.
4. **CSS Interactive Layout Studio**: Laboratorium visualisasi real-time Flexbox & CSS Grid multi-axis.
5. **API Tester Studio**: Antarmuka inspeksi request/response HTTP REST API.
6. **Code Playground**: Sandbox eksekusi kode langsung untuk Web (HTML/CSS/JS) dan Python dengan input `stdin`.

---

## ⚙️ Admin CMS v2.5

Panel CMS Administrator (`/admin`) menyediakan tata kelola platform berstandar enterprise:
- **CMS Analytics Dashboard Terintegrasi**: Dasbor visual komprehensif untuk memantau metrik pembelajaran, konversi corong (*funnel*), performa kurikulum, dan kesehatan sistem secara real-time.
- **Hierarki 5 Tingkat**: Courses → Levels → Modules → Lessons → Interactive Exercises.
- **Editor Evaluasi Proyek**: Pengaturan kriteria penilaian, bobot skor, passing score, dan versi evaluasi deklaratif.
- **Solusi & Kunci Jawaban Terproteksi**: Kunci jawaban kuis dan solusi latihan diisolasi dalam koleksi berizin khusus (`/quiz_solutions` dan `/exercise_solutions`).
- **Sinkronisasi Otomatis Kurikulum Statis**: Fitur impor instan kurikulum statis ke Firestore dengan verifikasi integritas data.
- **Audit Logging**: Pencatatan riwayat setiap aksi administratif ke dalam `/audit_logs`.

---

## 📈 CMS Analytics Dashboard (Admin Control Center)

CMS Analytics Dashboard dirancang khusus bagi administrator platform untuk memantau dan mengoptimalkan retensi serta efektivitas belajar siswa tanpa mengorbankan privasi pengguna:

### 1. Tab Navigasi & Modul Analitik:
- **Ringkasan Utama (Overview)**: KPI cards (Pengguna Unik, DAU/WAU/MAU, Total Sesi, Tingkat Kelulusan Kuis, Submisi Proyek, Penggunaan Simulator), grafik tren aktivitas harian, corong konversi (*learning funnel*) 5 tahap, dan kohort retensi (H+1, H+7, H+30).
- **Analisis Kurikulum (Courses Breakdown)**: Metrik komparatif 24 kurikulum dengan modal inspektur mendalam per materi, rasio penyelesaian, dan tingkat kelulusan.
- **Kuis & Tantangan (Quizzes & Challenges)**: Tingkat kelulusan kuis, metrik pengerjaan tantangan, dan distribusi pemahaman materi siswa.
- **Proyek & Evaluator (Projects & Evaluator)**: Rekapitulasi submisi 26 proyek (6 inti + 20 arsitektur), rasio kelulusan evaluasi otomatis, dan distribusi rata-rata skor.
- **Simulator Arsitektur (Architecture Simulators)**: Telemetri penggunaan 10 simulator arsitektur terdistribusi (Saga Pattern, Circuit Breaker, CQRS, Sharding, Rate Limiter, Event-Driven, dll.) beserta rasio penyelesaiannya.
- **Penjelajah Event Mentah (Raw Event Stream Explorer)**: Filter pencarian event secara live berdasarkan nama event, sumber (`web`/`server`), dan ID kursus, dilengkapi pagination dan inspektur payload JSON.
- **Kesehatan Sistem & Ingesti (Health & Ingestion)**: Ketersediaan API (SLA 99.98%), waktu respons rata-rata, status database, konsumsi memori heap, dan integritas pipeline observasional.

### 2. Fitur Filter Waktu Fleksibel:
- Preset cepat: **Hari Ini (Today)**, **7 Hari Terakhir (7d)**, **30 Hari Terakhir (30d)**, **90 Hari Terakhir (90d)**.
- **Kustom Rentang Tanggal**: Pemilihan tanggal mulai dan tanggal selesai sesuai kebutuhan audit.

---

## 📊 Fondasi Analitik & Telemetri Observasional

Platform mengimplementasikan sistem telemetri observasional modern:

### Prinsip Utama:
- **Strictly Observational**: Analitik tidak pernah menjadi sumber kebenaran (*source of truth*) untuk skor, kelulusan materi, XP, *streak*, atau *badge*.
- **Non-Blocking Guarantee**: Kegagalan jaringan atau analitik tidak akan pernah menggagalkan alur belajar siswa.
- **Privacy by Default**: Mengikuti kepatuhan UU PDP No. 27/2022. Seluruh payload disaring melalui *allow-list* ketat, memblokir pengumpulan password, token, API key, kode sumber pengguna, dan data sensitif pribadi.

### Taksonomi 31 Event (`snake_case`):
- **Navigasi & Sesi**: `page_viewed`, `login_completed`, `logout_completed`, `search_performed`.
- **Progres Belajar**: `course_started`, `course_completed`, `module_started`, `module_completed`, `lesson_started`, `lesson_completed`.
- **Kuis & Tantangan**: `quiz_started`, `quiz_attempted`, `quiz_completed`, `quiz_passed`, `challenge_started`, `challenge_attempted`, `challenge_completed`.
- **Proyek & Evaluasi**: `project_viewed`, `project_started`, `project_submitted`, `project_evaluated`.
- **Simulator & Sandbox**: `simulator_started`, `simulator_completed`, `playground_opened`, `code_execution_started`, `code_execution_completed`.
- **Gamifikasi Observasional**: `xp_earned`, `streak_updated`.

### Endpoint API Analitik:
- `POST /api/analytics/events`: Ingesti event telemetri dengan sanitasi payload otomatis.
- `GET /api/admin/analytics/events`: Query data telemetri historis (khusus Administrator).
- `GET /api/admin/analytics/summary`: Ringkasan analitik teragregasi (DAU, rasio kelulusan kuis, metrik proyek).

---

## 🔒 Keamanan & Kepatuhan UU PDP

- **Firestore Security Rules**: Catch-all default-deny, validasi ID bebas *path traversal*, isolasi profil pengguna per UID, dan proteksi mutlak pada data sensitif admin.
- **UU PDP No. 27/2022**: Tidak ada plain-text PII di console log; isolasi data pribadi dan dukungan hak penghapusan akun.
- **HTTP Security Headers & Rate Limiting**: Perlindungan terhadap brute-force submission dan DoS request.

---

## 🚀 Panduan Instalasi & Eksekusi

### Prasyarat:
- Node.js versi 18+ atau 20+
- npm versi 9+

### Langkah-langkah:
1. **Clone repository dan install dependensi**:
   ```bash
   npm install
   ```

2. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

3. **Validasi linting & tipe TypeScript**:
   ```bash
   npm run lint
   ```

4. **Build untuk produksi**:
   ```bash
   npm run build
   ```

---

## 🧪 Suite Pengujian Otomatis

Platform dilengkapi dengan suite pengujian komprehensif tanpa ketergantungan mock yang rapuh:

```bash
# Menjalankan seluruh test suite otomatis
for f in src/tests/*.ts; do npx tsx "$f"; done
```

Daftar suite pengujian terintegrasi:
- `cms_analytics_dashboard_test.ts` (CAD01 s/d CAD35: 35/35 PASS)
- `phase_analytics_foundation_test.ts` (AN01 s/d AN46: 46/46 PASS)
- `admin_cms_v25_test.ts` (CMS01 s/d CMS15: 15/15 PASS)
- `phase5c1_evaluation_test.ts` s/d `phase5c7_security_closure_test.ts` (Evaluator & Anti-Tampering: 100% PASS)
- `phase5d_progress_completion_test.ts` (Idempotent Progress Gate: 100% PASS)
- `phase5e_gamification_test.ts` (XP & Streak Authority: 100% PASS)
- `phase5f_security_closure_test.ts` (Security Lockdown: 100% PASS)
- `phase5g_final_closure_test.ts` (G01 s/d G100: 100/100 PASS)

---

## 📄 Lisensi & Hak Cipta

© 2026 **COMMANDEV Academy Team**. Hak cipta dilindungi undang-undang.
