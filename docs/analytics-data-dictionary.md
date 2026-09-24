# COMMANDEV Academy — Analytics Data Dictionary

## 1. Overview & Architectural Principle
Analytics in COMMANDEV Academy is strictly **OBSERVATIONAL** and **NON-AUTHORITATIVE**.
Analytics data is never used to calculate, grant, or modify:
- Course or lesson completion status
- Quiz scores or pass/fail decisions
- Project scores, evaluator feedback, or completion badges
- Experience points (XP)
- Daily streaks
- Milestone achievements or curriculum unlocks

Authoritative state mutation always occurs in the respective domain engine before an observational analytics event is dispatched. If analytics fails, drops, or is blocked by network conditions, user operations and learning progression remain unaffected.

---

## 2. Event Taxonomy & Data Dictionary

All event names strictly follow the `snake_case` naming convention.

| Event Name | Trigger Lifecycle | Required IDs | Allowed Properties | Authoritative Source |
| :--- | :--- | :--- | :--- | :--- |
| `page_viewed` | User navigates to a platform view | `sessionId` | `page`, `title`, `referrerPath`, `viewMode` | Frontend Router / Navigation |
| `course_viewed` | User inspects course details | `courseId` | `courseTitle`, `category`, `difficulty`, `totalLessons` | Curriculum Registry (`COURSES`) |
| `course_started` | User enrolls or opens a course | `courseId` | `courseTitle`, `category`, `enrolledAt` | Curriculum Engine (`App.tsx`) |
| `course_completed` | All lessons in course completed | `courseId` | `courseTitle`, `totalXpEarned`, `completionDurationSec` | Progress Engine (`db.ts`) |
| `module_viewed` | User expands or inspects module | `moduleId`, `courseId` | `moduleTitle`, `moduleOrder` | Curriculum Registry |
| `module_started` | User commences first lesson in module | `moduleId`, `courseId` | `moduleTitle`, `moduleOrder` | Learning Studio |
| `module_completed` | All lessons in module completed | `moduleId`, `courseId` | `moduleTitle`, `lessonsCompletedCount` | Progress Engine |
| `lesson_viewed` | User views lesson details or syllabus | `lessonId`, `courseId` | `lessonTitle`, `lessonType`, `difficulty`, `language` | Curriculum Registry |
| `lesson_started` | User intentionally opens lesson in studio | `lessonId`, `courseId` | `lessonTitle`, `lessonType`, `language` | Learning Studio (`LearningStudio.tsx`) |
| `lesson_completed` | Authoritative engine marks lesson complete | `lessonId`, `courseId` | `lessonTitle`, `lessonType`, `language`, `xpGained`, `durationSec` | Progress Engine (`App.tsx` / `db.ts`) |
| `quiz_started` | Quiz engine renders initial question set | `quizId` | `quizTitle`, `questionCount` | Quiz Engine (`QuizEngine.tsx`) |
| `quiz_attempted` | User submits completed quiz attempt | `quizId` | `attemptNumber`, `score`, `passed`, `questionCount`, `correctAnswersCount` | Quiz Engine (`QuizEngine.tsx`) |
| `quiz_completed` | Quiz attempt finished and evaluated | `quizId` | `score`, `passed`, `durationSec` | Quiz Engine |
| `quiz_passed` | Quiz attempt meets pass threshold (>=70%) | `quizId` | `score`, `attemptCount` | Quiz Engine |
| `challenge_started` | User initiates custom or community challenge | `challengeId` | `challengeTitle`, `difficulty`, `language` | Challenge Studio |
| `challenge_attempted`| User submits code against test suites | `challengeId` | `attemptNumber`, `passed`, `testChecksPassed` | Challenge Studio |
| `challenge_completed`| All challenge tests pass | `challengeId` | `xpEarned`, `durationSec` | Challenge Studio |
| `project_viewed` | User opens project workspace | `projectId` | `projectTitle`, `category`, `difficulty` | Project Workspace (`ProjectWorkspace.tsx`) |
| `project_started` | User modifies project code / draft | `projectId` | `projectTitle`, `category` | Project Workspace |
| `project_submitted` | Server accepts submitted project files | `projectId`, `submissionId` | `attemptNumber`, `fileTypesSubmitted` | Project Submission API (`server.ts`) |
| `project_evaluated` | Server evaluator finishes declarative evaluation | `projectId`, `submissionId` | `score`, `passed`, `evaluatorVersion`, `criteriaCount`, `passedCriteriaCount` | Project Evaluator (`projectEvaluator.ts`) |
| `simulator_started` | User activates an architecture simulator | `simulatorId` | `simulatorName`, `mode` | Architecture Simulator Hub (`ArchitectureSimulatorHub.tsx`) |
| `simulator_completed`| User completes target simulator scenario | `simulatorId` | `simulatorName`, `scenarioName`, `durationSec` | Architecture Simulator Hub |
| `playground_opened` | User opens code playground editor | `sessionId` | `language`, `initialSnippetCategory` | Code Playground (`CodePlayground.tsx`) |
| `code_execution_started`| User triggers code execution in sandbox | `sessionId` | `language` | Code Playground / Sandbox |
| `code_execution_completed`| Sandbox completes code execution | `sessionId` | `language`, `success`, `executionTimeMs` | Code Playground / Sandbox |
| `search_performed` | User searches lessons or docs | `sessionId` | `queryLength`, `resultCount`, `categoryFilter` | Navigation / Search Bar |
| `login_completed` | User authenticates via email or OAuth | `userId` | `authProvider`, `isNewUser` | Auth Context (`AuthContext.tsx`) |
| `logout_completed` | User logs out of active session | `sessionId` | `sessionDurationSec` | Auth Context |
| `xp_earned` | Authoritative progress engine awards XP | `userId` | `amount`, `reason`, `newTotalXp` | Progress Engine |
| `streak_updated` | Authoritative streak counter increments | `userId` | `newStreak`, `maintained` | Progress Engine |

---

## 3. Privacy & Anti-Tampering Rules

The analytics pipeline rejects any payload containing:
- Passwords, password hashes, or salt values
- Access tokens, refresh tokens, ID tokens, or session secrets
- API keys, cloud credentials, or certificates
- Raw user source code or editor contents
- Private evaluator configuration, AST matchers, or regex patterns
- Server filesystem paths or internal stack traces
- PII such as plain-text email addresses, phone numbers, or real full names

---

## 4. Retention & Funnel Definitions

### Retention Metric Standards
- **Day 1 Retention**: Percentage of learners who performed any learning activity (`lesson_started`, `quiz_attempted`, `project_submitted`, `simulator_started`) within the 24–48 hour window following their account creation.
- **Day 7 Retention**: Percentage of learners who returned and performed learning activity between Day 6 (144h) and Day 8 (192h) following their qualifying milestone.
- **Day 30 Retention**: Percentage of learners who remain active between Day 28 and Day 32 following their first completed lesson.

### Primary Learning Funnel
```text
registered (login_completed)
   ↓
started_course (course_started)
   ↓
started_lesson (lesson_started)
   ↓
completed_lesson (lesson_completed)
   ↓
attempted_quiz (quiz_attempted)
   ↓
passed_quiz (quiz_passed)
   ↓
viewed_project (project_viewed)
   ↓
submitted_project (project_submitted)
   ↓
evaluated_project (project_evaluated)
```
Learners are never marked as "abandoned" unless an explicit abandonment threshold (e.g. 90 days inactivity) is authoritatively defined.
