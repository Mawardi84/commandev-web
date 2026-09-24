# COMMANDEV — PLATFORM TECHNICAL DOCUMENTATION & SYSTEM ARCHITECTURE

> **Version:** 2.6.0  
> **Platform:** COMMANDEV Interactive Developer Learning Platform  
> **Tagline:** Learn. Code. Build. Master.  
> **Status:** Production-Ready (24 Courses, 26 Workspace Projects, 10 Simulators, Server Evaluator, Analytics Foundation, Admin CMS v2.5)  

---

## 1. OVERVIEW & SYSTEM ARCHITECTURE

COMMANDEV Academy is an enterprise-grade interactive developer education platform built with React 18, TypeScript, Tailwind CSS, Express Node.js, and Firebase (Authentication & Cloud Firestore). It provides structured, hands-on learning paths from beginner programming fundamentals to advanced distributed systems engineering.

### System Architecture Diagram:

```text
React 18 SPA + Vite (Frontend Application)
        │
        ├── UI/UX Layer: Tailwind CSS v4, Lucide Icons, Motion Transitions
        ├── State Management: React Hooks, AuthContext, SettingsContext, LocalStorage Fallbacks
        ├── Client Execution Sandboxes: Web Sandbox (HTML/CSS/JS) & Pyodide/JS Python Interpreter
        └── Telemetry Layer: Analytics Tracking Service (Allow-list Sanitizer, Deduplication Cache)
        │
        ▼ (REST / JSON / Bearer JWT)
Express / Node.js Backend Server (`server.ts`)
        │
        ├── Middleware Stack: Rate Limiting, JSON Body Parser (Size Limits), Security Headers
        ├── Auth Verification: Firebase Admin SDK (`authenticateFirebaseUser`, `requireAdmin`)
        ├── Curriculum Endpoints: Dynamic CMS CRUD for Courses, Levels, Modules, Lessons, Exercises
        ├── Server-Authoritative Project Evaluator: Declarative AST & Regex Criteria Matching
        ├── Progression Engine: Idempotent Project Completion Gates & Transactional XP Awarding
        └── Observational Analytics Engine: Event Ingestion (`/api/analytics/events`) & Admin Summary
        │
        ▼
Cloud Firestore Database
        ├── `/users/{userId}`: Private learner profile, XP, streak, completed lessons
        ├── `/leaderboard/{userId}`: Public rankings & rank titles
        ├── `/courses`, `/levels`, `/modules`, `/lessons`, `/exercises`: CMS Content Tree
        ├── `/exercise_solutions`, `/quiz_solutions`: Protected Solutions (Admin Only)
        ├── `/project_evaluations`: Versioned Evaluation Criteria Definitions (Admin Only)
        ├── `/project_submissions`: Audit Trail of Student Submissions & Evaluations
        ├── `/project_completions`: Authoritative Completion Records (Server Writes Only)
        ├── `/analytics_events`: Canonical Telemetry Event Stream (Admin Read Only)
        └── `/audit_logs`: Administrative Mutation Logs (Admin Only)
```

---

## 2. CURRICULUM CATALOG (COURSES 1–24)

COMMANDEV hosts 24 comprehensive curriculum tracks:

1. **HTML5 Web Fundamentals** (`html`) — Struktur semantik, aksesibilitas ARIA, form interaktif, dan SEO modern.
2. **CSS3 & Interactive Layouts** (`css`) — Box model, Flexbox multi-axis, CSS Grid modern, keyframe animations, dan responsivitas.
3. **JavaScript Modern (ES6+)** (`javascript`) — Scope, closures, asynchronous promises, async/await, DOM engine, dan modularitas.
4. **Python 3.12 Core & Data Structures** (`python`) — Algoritma, struktur data bawaan, OOP, modul, dan exception handling.
5. **PHP 8 Modern & Web Development** (`php`) — Server-side rendering, type system baru, form validation, dan routing.
6. **MySQL & Relational Database Design** (`mysql`) — Normalisasi (1NF–3NF), DDL/DML, JOINs, agregasi, subqueries, dan indexing.
7. **Bahasa C: Systems Programming** (`c`) — Memory management manual, pointers, structs, file I/O, dan low-level logic.
8. **C++: Modern OOP & STL** (`cpp`) — Kelas, inheritance, templates, smart pointers, dan algoritma standar STL.
9. **Go (Golang): Concurrent Backend** (`golang`) — Goroutines, channels, interfaces, structs, dan REST microservices.
10. **React 18: Modern Frontend** (`react`) — JSX, functional components, hooks, context API, dan performa rendering.
11. **Git & GitHub CLI Simulator** (`git`) — Branching, merging, commit staging, pull requests, dan visualisasi commit tree.
12. **Backend Engineering & RESTful APIs** (`backend`) — Desain API terstandar, middleware, auth guards, dan HTTP semantics.
13. **Database Architecture & Optimization** (`database`) — Query profiling, connection pooling, sharding, dan read-replicas.
14. **Fullstack Engineering & Integration** (`fullstack`) — Arsitektur end-to-end menghubungkan frontend SPA dengan microservices backend.
15. **Continuous Engineering & CI/CD Pipelines** (`continuous-engineering`) — Otomasi pengujian, GitHub Actions, Docker containers, dan linting.
16. **Cybersecurity & OWASP Top 10** (`cybersecurity`) — Proteksi XSS, CSRF, SQL Injection, SSRF, IDOR, dan parameter sanitization.
17. **Authentication & API Security** (`auth-api-security`) — JWT, OAuth 2.0, bcrypt/argon2 hashing, session cookies, dan rate limiting.
18. **DevSecOps & Cloud Deployment** (`devsecops-deployment`) — Hardening kontainer Linux non-root, HTTPS TLS/HSTS, dan Secret Manager.
19. **Reliability, Observability & SRE** (`reliability-observability`) — Error budgeting, centralized logging, health probes, dan SLA/SLO metrics.
20. **Game Development** (`game-development`) — Game loops, 2D physics, sprite animation, audio pipelines, dan collision detection.
21. **Robotics Engineering** (`robotics`) — Sensor telemetry, PID controllers, finite state machines, dan actuator control.
22. **AI & Machine Learning Foundations** (`ai-machine-learning`) — Scikit-learn, embeddings, vector similarity, classification, dan dataset preprocessing.
23. **Cloud & DevOps Engineering** (`cloud-devops`) — Kubernetes clusters, load balancers, reverse proxy, dan cloud networking.
24. **Software Architecture & System Design** (`software-architecture`) — Clean Architecture, Domain-Driven Design (DDD), CQRS, Event Sourcing, Saga Pattern, distributed transactions, database sharding, PACELC/CAP theorems, circuit breakers, rate limiters, dan high-throughput systems.

---

## 3. COURSE 24: SOFTWARE ARCHITECTURE CAPSTONE SPECIFICATION

Course 24 adalah kursus tingkat lanjut dengan cakupan:
- **32 Modul Pembelajaran End-to-End** (`software-architecture-m01` s/d `software-architecture-m32`).
- **20 Proyek Rekayasa Portofolio Nyata** (`proj-arch-01` s/d `proj-arch-20`).
- **10 Simulator Arsitektur Interaktif** (`ArchitectureSimulatorHub.tsx`).
- **160+ Soal Kuis Analisis & Skenario Trade-off Arsitektural**.

### Modul Course 24:
1. `software-architecture-m01`: Introduction to Software Architecture & Quality Attributes
2. `software-architecture-m02`: Architectural Paradigms & Styles (Monolith vs Microservices)
3. `software-architecture-m03`: SOLID & Component Principles (Clean Code Architecture)
4. `software-architecture-m04`: Layered, Hexagonal & Onion Architectures
5. `software-architecture-m05`: Domain-Driven Design (DDD) Strategic Design & Ubiquitous Language
6. `software-architecture-m06`: DDD Tactical Design (Entities, Value Objects, Aggregates, Repositories)
7. `software-architecture-m07`: API Architecture & Protocol Selection (REST, gRPC, GraphQL)
8. `software-architecture-m08`: API Gateway, Routing & BFF (Backend-For-Frontend)
9. `software-architecture-m09`: Database Architecture & Polyglot Persistence
10. `software-architecture-m10`: Data Replication, Master-Replica & Sharding Strategies
11. `software-architecture-m11`: Distributed Caching Patterns (Cache-Aside, Write-Through, Redis/Memcached)
12. `software-architecture-m12`: Event-Driven Architecture (EDA) & Message Brokers
13. `software-architecture-m13`: CQRS (Command Query Responsibility Segregation) & Event Sourcing
14. `software-architecture-m14`: Distributed Transactions & The Saga Pattern (Orchestration vs Choreography)
15. `software-architecture-m15`: Distributed Consensus & Concurrency (Raft, Paxos, Vector Clocks)
16. `software-architecture-m16`: High Availability & The CAP/PACELC Theorems
17. `software-architecture-m17`: Scalability & Elastic Load Balancing
18. `software-architecture-m18`: Resilience, Fault Tolerance & Chaos Engineering
19. `software-architecture-m19`: Distributed Tracing, Metrics & Observability (OpenTelemetry)
20. `software-architecture-m20`: Security Architecture & Zero Trust Networking
21. `software-architecture-m21`: Configuration Management & Dynamic Feature Toggles
22. `software-architecture-m22`: Asynchronous Task Queues & Background Workers
23. `software-architecture-m23`: Content Delivery Networks (CDN) & Static Asset Optimization
24. `software-architecture-m24`: Search Architecture & Full-Text Inverted Indexes
25. `software-architecture-m25`: Micro-Frontends & Distributed Web Architecture
26. `software-architecture-m26`: Multi-Tenancy Architecture & Data Isolation Strategies
27. `software-architecture-m27`: Disaster Recovery, RTO/RPO & Backup Architectures
28. `software-architecture-m28`: Serverless & Event-Driven Cloud Functions
29. `software-architecture-m29`: Cost-Optimization & Cloud FinOps Architecture
30. `software-architecture-m30`: Modern Data Pipelines & Stream Processing (Kafka/Flink)
31. `software-architecture-m31`: Migration Strategies (Strangler Fig Pattern)
32. `software-architecture-m32`: Production System Architecture Capstone

---

## 4. WORKSPACE PROJECT CATALOG (26 VERIFIED PROJECTS)

The platform provides **26 Verified Projects** divided into foundational portfolio pieces and enterprise architecture implementations:

### 6 Foundational Portfolio Projects (`CODERA_PROJECTS`):
1. `proj-guided-1`: Developer Profile Card (Semantic HTML5 & Modern CSS)
2. `proj-guided-2`: Interactive Task Board (DOM & State Management)
3. `proj-guided-3`: Python Data Analyzer (Algorithms, Collections, CLI)
4. `proj-guided-4`: React Analytics Widget (Components, Props, Hooks)
5. `proj-guided-5`: RESTful Micro-Service (Express Backend & Middlewares)
6. `proj-guided-6`: Fullstack Application Capstone (Fullstack Integration)

### 20 System Architecture Projects (`SOFTWARE_ARCHITECTURE_PROJECTS`):
7. `proj-arch-01`: Enterprise Domain Architecture (Clean Architecture / Hexagonal)
8. `proj-arch-02`: High-Throughput API Gateway (Rate Limiting, Reverse Proxy)
9. `proj-arch-03`: Multi-Tier Distributed Cache Engine (LRU, Cache-Aside, Write-Back)
10. `proj-arch-04`: Scalable Event-Driven Order Processing Pipeline (Message Queue / Dead-Letter Queue)
11. `proj-arch-05`: CQRS & Event Sourced Bank Account System
12. `proj-arch-06`: Distributed Saga Coordinator (Choreographed Order Fulfillment)
13. `proj-arch-07`: High-Availability Distributed Lock & Consensus Coordinator (Raft Simulation)
14. `proj-arch-08`: Database Sharding & Consistent Hashing Router
15. `proj-arch-09`: Resilient Distributed Platform (Circuit Breaker & Bulkhead)
16. `proj-arch-10`: Observable Production System (OpenTelemetry Tracing & RED Metrics)
17. `proj-arch-11`: Zero Trust Microservice Security Mesh
18. `proj-arch-12`: Dynamic Feature Flag & Distributed Config Center
19. `proj-arch-13`: Asynchronous Priority Task Queue Worker Pool
20. `proj-arch-14`: Edge CDN & Multi-Region Static Router
21. `proj-arch-15`: Full-Text Inverted Index Search Engine
22. `proj-arch-16`: Micro-Frontend Host & Module Federation Container
23. `proj-arch-17`: Multi-Tenant Isolation Engine (Row-Level Security & Schema Separation)
24. `proj-arch-18`: Disaster Recovery & Active-Active Failover Controller
25. `proj-arch-19`: High-Throughput Real-Time Event Stream Processor
26. `proj-arch-20`: Production System Architecture Capstone

---

## 5. SERVER-AUTHORITATIVE PROJECT EVALUATION ENGINE

The evaluation of student project submissions operates under strict server-authoritative security guidelines:

### Invariants:
1. **Zero Client Authority**: The student client never evaluates its own score, passing status, or reward eligibility.
2. **Hidden Criteria & Matchers**: Regex rules, AST selectors, criterion weights, and private evaluator configurations are stored exclusively in `/project_evaluations/{projectId}` (Admin Only).
3. **Payload Sanitization**: Server response (`/api/projects/:projectId/submit`) returns `PublicProjectEvaluationResult` with sanitized criterion feedback; internal configurations, server paths, and stack traces are stripped.
4. **Idempotent Progression Gate**: Submissions that pass the threshold (score >= 70) trigger `recordProjectCompletion`. If a project was already completed by the user, zero additional XP is awarded, preventing XP duplication attacks.
5. **Path Traversal & Byte-Length Protection**: File payloads are validated against directory traversal patterns (`..`, `/`, `\`), null bytes, and strict byte size limits (100 KB per file, 500 KB total).

---

## 6. INTERACTIVE SIMULATORS & STUDIOS

1. **Architecture Simulator Hub (`ArchitectureSimulatorHub.tsx`)**:
   - `explorer`: System topology, service communication, and dependency maps.
   - `tradeoff`: PACELC simulator comparing latency and consistency trade-offs.
   - `cache`: Multi-strategy cache simulator (LRU, TTL, Cache-Aside, Write-Through).
   - `queue`: Kafka/RabbitMQ message queue, partition consumer lag, and backpressure.
   - `distributed`: Global replication latency across multi-region data centers.
   - `cap`: CAP Theorem interactive model simulating network partition splits (CP vs AP).
   - `scalability`: High-throughput 50,000 RPS scalability simulator with horizontal node scaling.
   - `chaos`: Chaos engineering, network fault injection, and circuit breaker states (Closed, Open, Half-Open).
   - `observability`: Distributed tracing simulator generating W3C traceparents and span waterfalls.
   - `system-design`: Interactive canvas for assembling production blueprints.
2. **Git & GitHub Simulator (`GitSimulator.tsx`)**:
   - Interactive terminal CLI with virtual Git repository, branch trees, staging area, and commit visualizer.
3. **SQL Interactive Studio (`SqlInteractiveStudio.tsx`)**:
   - In-memory relational SQL engine supporting SELECT, WHERE, JOIN, GROUP BY, and aggregates with rendered tabular outputs.
4. **CSS Interactive Layout Studio (`CssInteractiveStudio.tsx`)**:
   - Real-time Flexbox & CSS Grid visualizer with dynamic control of alignment, axes, and responsive breakpoints.
5. **API Tester Studio (`ApiTesterStudio.tsx`)**:
   - REST API request builder and response viewer supporting HTTP headers, query params, and JSON payloads.
6. **Code Playground (`CodePlayground.tsx`)**:
   - Live code editor for HTML/CSS/JS and Python with `stdin` support, terminal console output, and automatic challenge requirement evaluation.

---

## 7. ADMIN CMS v2.5

The Administrative CMS (`/admin`) allows authorized instructors and platform owners to manage curriculum and evaluation definitions:

- **5-Tier Content Hierarchy**: Courses → Levels → Modules → Lessons → Interactive Exercises.
- **Project Evaluation Editor**: Visual editor for defining declarative criteria, selecting matchers (`elementExists`, `cssProperty`, `jsFunctionCall`, `pythonFunctionCall`, `regexMatch`), setting weights, and establishing passing thresholds.
- **Protected Solutions**: Exercise solutions and quiz answer keys are stored in separate, admin-only Firestore collections (`/exercise_solutions` and `/quiz_solutions`).
- **Static Curriculum Importer**: Idempotent synchronization utility to populate Firestore from `src/data/curriculum.ts` without data corruption.
- **Audit Logging**: All administrative actions (publish, draft, update, delete) are recorded in `/audit_logs` with timestamps, actor UIDs, and affected resource IDs.

---

## 8. OBSERVATIONAL ANALYTICS & TELEMETRY FOUNDATION

### Architectural Principles:
1. **Strictly Observational**: Analytics observes platform actions after authoritative domain mutations occur. Analytics NEVER determines or alters scores, progress, completion, XP, streaks, or unlocks.
2. **Non-Blocking Operation**: Every analytics invocation is wrapped in fault-tolerant try-catch blocks; network latency or analytics server errors never disrupt user learning.
3. **Privacy by Default (UU PDP No. 27/2022 Compliant)**:
   - Telemetry strictly prohibits capturing: passwords, password hashes, access tokens, refresh tokens, ID tokens, session secrets, API keys, credentials, learner source code, private evaluator configurations, regex rules, AST matchers, filesystem paths, and internal stack traces.
   - User identity is represented exclusively via safe UIDs (no plain-text email, phone, or real name).
   - Payload size is capped at 8,192 bytes (8 KB) maximum.

### 31 Standard Event Taxonomy (`snake_case`):
- **Navigation & Auth**: `page_viewed`, `login_completed`, `logout_completed`, `search_performed`.
- **Curriculum Progression**: `course_viewed`, `course_started`, `course_completed`, `module_viewed`, `module_started`, `module_completed`, `lesson_viewed`, `lesson_started`, `lesson_completed`.
- **Assessments & Challenges**: `quiz_started`, `quiz_attempted`, `quiz_completed`, `quiz_passed`, `challenge_started`, `challenge_attempted`, `challenge_completed`.
- **Projects & Evaluator**: `project_viewed`, `project_started`, `project_submitted`, `project_evaluated`.
- **Simulators & Sandboxes**: `simulator_started`, `simulator_completed`, `playground_opened`, `code_execution_started`, `code_execution_completed`.
- **Observational Gamification**: `xp_earned`, `streak_updated`.

### API Endpoints:
- `POST /api/analytics/events`: Ingests and sanitizes client telemetry events.
- `GET /api/admin/analytics/events`: Queries raw telemetry stream (Admin Only).
- `GET /api/admin/analytics/summary`: Returns aggregated summary (DAU, active sessions, quiz pass rates, project completion rates) (Admin Only).

### 8.4 CMS Analytics Dashboard (Admin UI View)
Integrated directly into the CMS Admin console (`/admin`), the CMS Analytics Dashboard (`AdminAnalyticsView.tsx`) provides actionable insights across 7 specialized operational tabs:
1. **Overview & Executive KPIs**: Real-time metrics for total events, unique users, active sessions, quiz pass rates, project pass rates, and simulator starts; interactive 30-day activity trends chart; 5-step learning conversion funnel; Day 1, Day 7, Day 30 retention cohorts.
2. **Courses Breakdown**: Per-course engagement matrix covering all 24 courses with learner counts, completion rates, and dedicated detailed drilldown modal.
3. **Quizzes & Challenges**: Assessment effectiveness analytics comparing quiz pass rates and challenge completion trends across curriculum tiers.
4. **Projects & Evaluator**: Submissions volume, passing rates (score >= 70 threshold), and score distribution across all 26 projects (6 foundational and 20 architecture projects).
5. **Architecture Simulators**: Real-world distributed systems telemetry measuring starts, completions, and completion rates across 10 specialized architecture simulators.
6. **Raw Event Stream Explorer**: Real-time telemetry inspector featuring dynamic multi-property filtering (by event name, course ID, source), pagination controls, and formatted JSON payload inspection.
7. **Platform & Ingestion Health**: Monitoring of API availability (SLA 99.98%), average response times, database connection health, and heap memory usage.

Filter Presets Supported: `today`, `7d`, `30d`, `90d`, and `custom` date ranges.

---

## 9. SECURITY & DATA PRIVACY SPECIFICATION

1. **Firestore Security Rules (`firestore.rules`)**:
   - Default-deny catch-all rule (`match /{document=**} { allow read, write: if false; }`).
   - Strict ID validation (`id.size() <= 128 && id.matches('^[a-zA-Z0-9_\\-]+$')`).
   - Profile isolation: Users can only read and write their own profile (`isOwner(userId)`).
   - Solution protection: Exercise and quiz solutions are completely inaccessible to non-admin users.
   - Analytics protection: `/analytics_events/{eventId}` can only be queried and read by Admins (`isAdmin()`).
2. **Server-Side Authentication**:
   - `authenticateFirebaseUser`: Validates Bearer ID tokens via Firebase Admin SDK.
   - `requireAdmin`: Enforces administrative privilege via `/admins/{uid}` Firestore document or Firebase custom claims.
   - Anti-Tampering: Client-sent `userId`, `score`, `passed`, or `xpAwarded` in request bodies are explicitly ignored or rejected.
3. **Data Minimization & UU PDP Compliance**:
   - Zero plain-text credentials in logs or responses.
   - Sanitized client error messages preventing server diagnostic disclosure.

---

## 10. AUTOMATED TEST SUITE & VERIFICATION

The codebase contains exhaustive test suites executed directly against the runtime:

```bash
# Execute entire test battery
for f in src/tests/*.ts; do npx tsx "$f"; done
```

| Test Suite | Coverage Area | Assertion Count | Status |
| :--- | :--- | :---: | :---: |
| `phase_analytics_foundation_test.ts` | Analytics Event Contract, Taxonomy, Sanitizer, Rules (AN01–AN46) | 46 / 46 | **100% PASS** |
| `admin_cms_v25_test.ts` | Admin CMS v2.5 RBAC, Solutions, Evaluation Definitions (CMS01–CMS15) | 15 / 15 | **100% PASS** |
| `phase5c1_evaluation_test.ts` | Declarative Project Evaluation Rules | 10 / 10 | **100% PASS** |
| `phase5c2_evaluation_rules_test.ts` | Evaluation Security & Anti-Tampering Rules | 25 / 25 | **100% PASS** |
| `phase5c3_secure_submission_test.ts` | Secure Submission Payload & Cooldown | 15 / 15 | **100% PASS** |
| `phase5c4_project_evaluator_test.ts` | AST, Regex, and Semantic Matchers | 20 / 20 | **100% PASS** |
| `phase5c5_result_feedback_test.ts` | Feedback Sanitization & Public DTOs | 18 / 18 | **100% PASS** |
| `phase5c6_anti_tampering_test.ts` | Anti-Tampering & Client Spoofing Prevention | 22 / 22 | **100% PASS** |
| `phase5c7_security_closure_test.ts` | Security Closure Verification | 15 / 15 | **100% PASS** |
| `phase5d_progress_completion_test.ts` | Idempotent Progress Gates & XP Transactions | 20 / 20 | **100% PASS** |
| `phase5e_gamification_test.ts` | Authoritative XP & Streak Bounds | 15 / 15 | **100% PASS** |
| `phase5f_security_closure_test.ts` | Full-Stack Security Hardening | 18 / 18 | **100% PASS** |
| `phase5g_final_closure_test.ts` | Final System Integration Verification (G01–G100) | 100 / 100 | **100% PASS** |

---

## 11. DEVELOPER QUICK START & VALIDATION COMMANDS

```bash
# 1. Install dependencies
npm install

# 2. Run development server (Port 3000)
npm run dev

# 3. Validate TypeScript type safety and linting
npm run lint

# 4. Compile application for production deployment
npm run build
```

© 2026 **COMMANDEV Academy Team**. All rights reserved.
