# COMMANDEV Academy — Analytics & Telemetry Architecture

## 1. Architectural Overview

```text
User / Platform Action
        ↓
Domain Logic (Curriculum, Quiz, Sandbox, Evaluator)
        ↓
Authoritative State Mutation (Firestore / Users / Leaderboard)
        ↓
Observational Analytics Event Dispatch (Non-blocking)
        ↓
Analytics Tracking Service (Singleton)
        ↓
Privacy Sanitizer (Allow-list, PII Stripper, Byte Limit)
        ↓
Event Validator (snake_case, Safe IDs, ISO 8601, Schema)
        ↓
Deduplication Engine (Idempotency Cache)
        ↓
Analytics Providers
   ├── Internal Provider (POST /api/analytics/events)
   ├── GA4 Adapter (Dormant by default)
   ├── PostHog Adapter (Dormant by default)
   └── Mixpanel Adapter (Dormant by default)
        ↓
Firestore Event Stream: /analytics_events/{eventId}
        ↓
Admin Query & Aggregation API (/api/admin/analytics/summary)
```

---

## 2. Core Architectural Invariants

1. **Strict Observability**: Analytics observes authoritative decisions. It never decides whether a learner passes a lesson, achieves a streak, receives XP, or unlocks a module.
2. **Non-Blocking Operation**: Every analytics invocation is wrapped in safe fault boundaries. A network partition, Firestore rule denial, or tracking failure will NEVER crash or block the learner interface.
3. **Privacy by Default**: Telemetry data strictly excludes PII, credentials, API tokens, internal server file paths, raw learner source code, and private evaluation regex rules.
4. **Idempotent Telemetry**: Critical milestone completions (e.g. `lesson_completed`, `project_submitted`) are deduplicated to avoid inflated telemetry resulting from React component re-renders.

---

## 3. Storage & Access Control

- **Canonical Firestore Collection**: `analytics_events/{eventId}`
- **Security Rule Specification**:
  - `read / query`: Admin only (`isAdmin()`).
  - `create`: Authenticated users writing their own UID-matched events, or Admin service account.
  - `update / delete`: Prohibited for students, reserved for Admin maintenance.
  - `public`: Completely inaccessible.

---

## 4. Multi-Provider Boundary

COMMANDEV Academy does not bind tightly to a single analytics vendor. The `AnalyticsProvider` interface allows plugging in Google Analytics 4, PostHog, or Mixpanel without code refactoring. Absence of external keys (e.g. `VITE_GA_MEASUREMENT_ID`) never inhibits app startup or testing.
