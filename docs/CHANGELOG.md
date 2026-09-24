# COMMANDEV — PLATFORM CHANGELOG

All notable changes to the COMMANDEV platform will be documented in this file.

---

## [2.6.0] — 2026-09-24
### Added
- **CMS Analytics Dashboard**:
  - Comprehensive Administrative Analytics Control Center (`AdminAnalyticsView.tsx`) with 7 operational tabs: Overview, Courses Breakdown, Quizzes & Challenges, Projects & Evaluator, Architecture Simulators, Raw Event Stream Explorer, and Platform Health.
  - Granular time range filtering (`today`, `7d`, `30d`, `90d`, and custom date selectors).
  - 5-step learning conversion funnel and 30-day retention cohort tracking.
  - Drilldown modal for course-level analytics and per-module engagement metrics.
  - Raw telemetry stream inspector with pagination, property filters, and formatted payload inspection.
  - Integration into CMS Admin Layout with direct tab access and quick CTA from Overview.
- **Analytics Foundation & Observational Telemetry**:
  - Strictly non-authoritative observational telemetry engine with 31 event taxonomy.
  - Ingestion endpoint `POST /api/analytics/events` with rate limiting, sanitization, and PII protection.
  - Admin endpoints `GET /api/admin/analytics/summary` and `GET /api/admin/analytics/events`.
  - Comprehensive automated test matrices: `cms_analytics_dashboard_test.ts` (35/35 PASS) and `phase_analytics_foundation_test.ts` (46/46 PASS).

---

## [2.5.0] — 2026-09-22
### Added
- **Course 24 — Software Architecture & System Design** (`software-architecture`):
  - Implemented 32 comprehensive modules (`software-architecture-m01` through `software-architecture-m32`).
  - Added 20 progressive projects culminating in the Production System Architecture capstone.
  - Added 160+ rigorous quiz questions across all modules.
  - Integrated 10 interactive system design and architectural trade-off simulators.

---

## [2.4.0] — 2026-09-22
### Added
- **Course 23 — Cloud & DevOps Engineering** (`cloud-devops`):
  - Implemented 32 modules covering Linux, Docker, Kubernetes, CI/CD, Terraform, and Cloud infrastructure.
  - Added 20 progressive projects and 160+ quiz questions.

---

## [2.3.0] — 2026-09-22
### Added
- **Course 22 — AI & Machine Learning Engineering** (`ai-machine-learning`):
  - Implemented 30 modules covering math foundations, classical ML, deep learning, PyTorch, Transformers, LLM engineering, RAG, and AI agents.
  - Added 18 progressive projects and 150+ quiz questions.

---

## [2.2.0] — 2026-09-22
### Added
- **Course 21 — Robotics Engineering** (`robotics`):
  - Implemented 34 modules covering kinematics, ROS 2, computer vision, sensor fusion, and autonomous navigation.
  - Added 20 progressive projects and 170+ quiz questions.

---

## [2.1.0] — 2026-09-22
### Added
- **Course 20 — Game Development** (`game-development`):
  - Implemented 24 modules covering game loops, physics, rendering, shaders, and game architecture.
  - Added 16 progressive projects and 120+ quiz questions.

---

## [2.0.0] — 2026-09-15
### Changed
- **Platform Rebranding:** Migrated all branding from CODERA Academy to **COMMANDEV**.
- **Storage Layer Update:** Implemented dual-key namespace support (`commandev_*` primary with `codera_*` fallback) to guarantee seamless backward compatibility.
- **CMS v2.5 Integration:** Enhanced administrative publishing workflow and RBAC security boundaries.

---

## [1.0.0] — 2026-06-01
### Added
- Initial release of COMMANDEV with Courses 1 through 19 (HTML, CSS, JS, Python, PHP, MySQL, Golang, C, C++, Git, React, Backend, Database, Fullstack, Continuous Engineering, Cybersecurity, Auth & API Security, DevSecOps & Deployment, Reliability & Observability).
