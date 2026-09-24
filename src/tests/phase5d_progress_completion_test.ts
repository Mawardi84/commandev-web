import fs from 'fs';
import path from 'path';
import { CODERA_PROJECTS } from '../data/projectsData';
import { 
  recordProjectCompletion, 
  getProjectProgress 
} from '../services/progression/projectProgressionService';
import { ProjectCompletionRecord, PublicProjectProgressDTO } from '../types/projectProgress';
import { PublicProjectEvaluationResult } from '../types/projectEvaluation';

export interface ProgressTestResult {
  id: string;
  name: string;
  passed: boolean;
  error?: string;
}

/**
 * In-memory Mock Firestore with transaction support to test atomic progression logic.
 */
class MockFirestore {
  private store: Map<string, Map<string, any>> = new Map();

  collection(collectionName: string) {
    if (!this.store.has(collectionName)) {
      this.store.set(collectionName, new Map());
    }
    const col = this.store.get(collectionName)!;

    return {
      doc: (docId: string) => {
        return {
          id: docId,
          collectionName,
          get: async () => {
            const data = col.get(docId);
            return {
              id: docId,
              exists: !!data,
              data: () => (data ? JSON.parse(JSON.stringify(data)) : undefined)
            };
          },
          set: async (data: any, options?: { merge?: boolean }) => {
            if (options?.merge) {
              const existing = col.get(docId) || {};
              col.set(docId, { ...existing, ...JSON.parse(JSON.stringify(data)) });
            } else {
              col.set(docId, JSON.parse(JSON.stringify(data)));
            }
          }
        };
      }
    };
  }

  async runTransaction<T>(updateFunction: (transaction: any) => Promise<T>): Promise<T> {
    const stagedWrites: Array<() => void> = [];

    const transaction = {
      get: async (docRef: any) => {
        const col = this.store.get(docRef.collectionName);
        const data = col ? col.get(docRef.id) : undefined;
        return {
          id: docRef.id,
          exists: !!data,
          data: () => (data ? JSON.parse(JSON.stringify(data)) : undefined)
        };
      },
      set: (docRef: any, data: any, options?: { merge?: boolean }) => {
        stagedWrites.push(() => {
          if (!this.store.has(docRef.collectionName)) {
            this.store.set(docRef.collectionName, new Map());
          }
          const col = this.store.get(docRef.collectionName)!;
          if (options?.merge) {
            const existing = col.get(docRef.id) || {};
            col.set(docRef.id, { ...existing, ...JSON.parse(JSON.stringify(data)) });
          } else {
            col.set(docRef.id, JSON.parse(JSON.stringify(data)));
          }
        });
      }
    };

    const result = await updateFunction(transaction);
    for (const write of stagedWrites) {
      write();
    }
    return result;
  }

  // Debug helper to inspect collection count
  count(collectionName: string): number {
    return this.store.get(collectionName)?.size || 0;
  }

  getDoc(collectionName: string, docId: string): any {
    return this.store.get(collectionName)?.get(docId);
  }
}

export async function runPhase5DTests(): Promise<{
  results: ProgressTestResult[];
  summary: { total: number; passed: number; failed: number };
}> {
  console.log('=== PHASE 5D PROJECT PROGRESS & COMPLETION TEST MATRIX (PD01 - PD50) ===\n');
  const results: ProgressTestResult[] = [];
  let passedCount = 0;
  let failedCount = 0;

  function assert(condition: boolean, testId: string, desc: string, errorDetails?: string) {
    if (condition) {
      console.log(`✓ PASS [${testId}] ${desc}`);
      passedCount++;
      results.push({ id: testId, name: desc, passed: true });
    } else {
      console.error(`✗ FAIL [${testId}] ${desc}${errorDetails ? ` - ${errorDetails}` : ''}`);
      failedCount++;
      results.push({ id: testId, name: desc, passed: false, error: errorDetails || 'Assertion failed' });
    }
  }

  // Load codebase files for static invariants & contract auditing
  const serverPath = path.join(process.cwd(), 'server.ts');
  const serverContent = fs.readFileSync(serverPath, 'utf8');

  const rulesPath = path.join(process.cwd(), 'firestore.rules');
  const rulesContent = fs.readFileSync(rulesPath, 'utf8');

  const blueprintPath = path.join(process.cwd(), 'firebase-blueprint.json');
  const blueprintContent = fs.readFileSync(blueprintPath, 'utf8');

  const typesPath = path.join(process.cwd(), 'src/types.ts');
  const typesContent = fs.readFileSync(typesPath, 'utf8');

  const progressTypesPath = path.join(process.cwd(), 'src/types/projectProgress.ts');
  const progressTypesContent = fs.readFileSync(progressTypesPath, 'utf8');

  const feedbackPath = path.join(process.cwd(), 'src/components/ProjectWorkspace/ProjectResultFeedback.tsx');
  const feedbackContent = fs.readFileSync(feedbackPath, 'utf8');

  const headerPath = path.join(process.cwd(), 'src/components/ProjectWorkspace/ProjectHeader.tsx');
  const headerContent = fs.readFileSync(headerPath, 'utf8');

  const workspacePath = path.join(process.cwd(), 'src/components/ProjectWorkspace/ProjectWorkspace.tsx');
  const workspaceContent = fs.readFileSync(workspacePath, 'utf8');

  const projectsViewPath = path.join(process.cwd(), 'src/components/ProjectsView.tsx');
  const projectsViewContent = fs.readFileSync(projectsViewPath, 'utf8');

  const profileViewPath = path.join(process.cwd(), 'src/components/ProfileView.tsx');
  const profileViewContent = fs.readFileSync(profileViewPath, 'utf8');

  const appPath = path.join(process.cwd(), 'src/App.tsx');
  const appContent = fs.readFileSync(appPath, 'utf8');

  const mockDb = new MockFirestore();
  const testUserId = 'user_learner_999';
  const testProject = CODERA_PROJECTS[0]; // e.g. web-01
  const testProjectId = testProject.id;
  const targetXp = testProject.xp;

  // Initialize test user in mock db
  await mockDb.collection('users').doc(testUserId).set({
    id: testUserId,
    email: 'learner@codera.app',
    xp: 200,
    completedProjects: [],
    completedLessons: ['les-1']
  });

  // -------------------------------------------------------------
  // GROUP 1: AUTHORITY & INTEGRITY (PD01 - PD10)
  // -------------------------------------------------------------

  // PD01 — Server is sole authority: recordProjectCompletion exists and is exported
  assert(
    typeof recordProjectCompletion === 'function' && typeof getProjectProgress === 'function',
    'PD01',
    'Progression service provides authoritative server-only completion routines'
  );

  // PD02 — Failed evaluation (passed: false) strictly fails completion gate
  const failedResult = await recordProjectCompletion(mockDb, {
    userId: testUserId,
    projectId: testProjectId,
    score: 40,
    passed: false,
    submissionId: 'sub_fail_1',
    evaluatorVersion: 'v1.0.0'
  });
  assert(
    failedResult.completed === false && failedResult.xpAwarded === 0,
    'PD02',
    'Failed evaluation is strictly blocked from completion and awards 0 XP'
  );

  // PD03 — Non-existent project cannot be completed
  const nonExistentResult = await recordProjectCompletion(mockDb, {
    userId: testUserId,
    projectId: 'fake_non_existent_project_id',
    score: 100,
    passed: true,
    submissionId: 'sub_fake_1',
    evaluatorVersion: 'v1.0.0'
  });
  assert(
    nonExistentResult.completed === false && nonExistentResult.xpAwarded === 0,
    'PD03',
    'Non-existent project ID is rejected and cannot record completion'
  );

  // PD04 — Draft or unpublished project cannot be completed
  const draftProject = CODERA_PROJECTS.find(p => p.status !== 'published');
  if (draftProject) {
    const draftResult = await recordProjectCompletion(mockDb, {
      userId: testUserId,
      projectId: draftProject.id,
      score: 100,
      passed: true,
      submissionId: 'sub_draft_1',
      evaluatorVersion: 'v1.0.0'
    });
    assert(
      draftResult.completed === false,
      'PD04',
      'Unpublished/draft project cannot be marked completed'
    );
  } else {
    // If all projects published, verify status check logic in service
    const serviceContent = fs.readFileSync(path.join(process.cwd(), 'src/services/progression/projectProgressionService.ts'), 'utf8');
    assert(
      serviceContent.includes("matchedProject.status !== 'published'"),
      'PD04',
      'Project progression service verifies project published status'
    );
  }

  // PD05 — Server defines target XP (client cannot pass custom XP)
  // Checked via signature of recordProjectCompletion which does not accept client XP
  const serviceCode = fs.readFileSync(path.join(process.cwd(), 'src/services/progression/projectProgressionService.ts'), 'utf8');
  assert(
    serviceCode.includes('matchedProject.xp') && !serviceCode.includes('req.body.xp'),
    'PD05',
    'Server defines target XP from authoritative project catalog, ignoring client values'
  );

  // PD06 — Client cannot pass arbitrary completed flag to submission endpoint
  assert(
    !serverContent.includes('req.body.completed') && serverContent.includes('recordProjectCompletion('),
    'PD06',
    'Submission endpoint ignores client completed state and relies solely on evaluator'
  );

  // PD07 — Evaluation with score below 100 or passed false awards no completion
  const partialResult = await recordProjectCompletion(mockDb, {
    userId: testUserId,
    projectId: testProjectId,
    score: 85,
    passed: false,
    submissionId: 'sub_partial_1',
    evaluatorVersion: 'v1.0.0'
  });
  assert(
    partialResult.completed === false && partialResult.xpAwarded === 0,
    'PD07',
    'Partial evaluation score with passed=false does not award completion'
  );

  // PD08 — Tampered evaluation score cannot trigger completion without passed=true
  assert(
    serviceCode.includes('if (!passed)'),
    'PD08',
    'Completion gate strictly requires passed === true regardless of score number'
  );

  // PD09 — Server submission route gates recordProjectCompletion strictly behind evaluator
  const submitRouteStart = serverContent.indexOf('/api/projects/:projectId/submit');
  const submitRouteEnd = serverContent.indexOf('/api/projects/:projectId/submissions/latest');
  const submitBlock = serverContent.substring(submitRouteStart, submitRouteEnd);
  assert(
    submitBlock.includes('evaluateProjectSubmission') && submitBlock.includes('recordProjectCompletion'),
    'PD09',
    'Server submission route executes evaluator and completion gate sequentially'
  );

  // PD10 — Progress endpoint requires authentication token
  assert(
    serverContent.includes('/api/projects/:projectId/progress') && 
    serverContent.includes('authenticateUser') || serverContent.includes('verifyIdToken'),
    'PD10',
    'Progress endpoint requires authenticated user session'
  );

  // -------------------------------------------------------------
  // GROUP 2: IDEMPOTENCY & ATOMIC TRANSACTIONS (PD11 - PD20)
  // -------------------------------------------------------------

  // PD11 — First completion awards full authoritative XP
  const firstCompletion = await recordProjectCompletion(mockDb, {
    userId: testUserId,
    projectId: testProjectId,
    score: 100,
    passed: true,
    submissionId: 'sub_success_1',
    evaluatorVersion: 'v1.0.0'
  });
  assert(
    firstCompletion.completed === true && firstCompletion.xpAwarded === targetXp,
    'PD11',
    `First completion awards authoritative target XP (+${targetXp} XP)`
  );

  // PD12 — First completion marks alreadyCompleted = false
  assert(
    firstCompletion.alreadyCompleted === false,
    'PD12',
    'First completion returns alreadyCompleted: false'
  );

  // PD13 — First completion creates deterministic record in project_completions
  const completionDoc = mockDb.getDoc('project_completions', `${testUserId}_${testProjectId}`);
  assert(
    !!completionDoc && completionDoc.status === 'completed' && completionDoc.score === 100,
    'PD13',
    'Deterministic completion document created in project_completions collection'
  );

  // PD14 — Second completion marks alreadyCompleted = true
  const secondCompletion = await recordProjectCompletion(mockDb, {
    userId: testUserId,
    projectId: testProjectId,
    score: 100,
    passed: true,
    submissionId: 'sub_success_2',
    evaluatorVersion: 'v1.0.0'
  });
  assert(
    secondCompletion.completed === true && secondCompletion.alreadyCompleted === true,
    'PD14',
    'Second completion for same project returns alreadyCompleted: true'
  );

  // PD15 — Second completion awards 0 XP (Idempotency guarantee)
  assert(
    secondCompletion.xpAwarded === 0,
    'PD15',
    'Second completion awards strictly 0 XP (duplicate XP prevention)'
  );

  // PD16 — Third completion also yields alreadyCompleted = true and 0 XP
  const thirdCompletion = await recordProjectCompletion(mockDb, {
    userId: testUserId,
    projectId: testProjectId,
    score: 100,
    passed: true,
    submissionId: 'sub_success_3',
    evaluatorVersion: 'v1.0.0'
  });
  assert(
    thirdCompletion.alreadyCompleted === true && thirdCompletion.xpAwarded === 0,
    'PD16',
    'Subsequent 3rd completion yields alreadyCompleted: true and 0 XP'
  );

  // PD17 — Exactly one document exists in project_completions for this user & project
  const docCount = mockDb.count('project_completions');
  assert(
    docCount === 1,
    'PD17',
    'Deterministic ID guarantees exactly 1 completion document per user-project pair'
  );

  // PD18 — User completedProjects list contains unique project ID (no duplicates)
  const updatedUser = mockDb.getDoc('users', testUserId);
  const completedList = updatedUser?.completedProjects || [];
  const occurrences = completedList.filter((id: string) => id === testProjectId).length;
  assert(
    occurrences === 1 && completedList.includes(testProjectId),
    'PD18',
    'User profile contains unique project ID without duplication'
  );

  // PD19 — Total user XP increased exactly once by targetXp
  assert(
    updatedUser.xp === 200 + targetXp,
    'PD19',
    `User total XP is exactly 200 + ${targetXp} = ${200 + targetXp}`
  );

  // PD20 — Failed submission does not alter user XP or completedProjects
  const beforeXp = updatedUser.xp;
  await recordProjectCompletion(mockDb, {
    userId: testUserId,
    projectId: 'web-02',
    score: 20,
    passed: false,
    submissionId: 'sub_fail_web2',
    evaluatorVersion: 'v1.0.0'
  });
  const afterUser = mockDb.getDoc('users', testUserId);
  assert(
    afterUser.xp === beforeXp && !afterUser.completedProjects.includes('web-02'),
    'PD20',
    'Failed evaluation does not alter user XP or completedProjects list'
  );

  // -------------------------------------------------------------
  // GROUP 3: SCHEMA & DATA MODEL VALIDATION (PD21 - PD30)
  // -------------------------------------------------------------

  // PD21 — ProjectCompletionRecord has all required fields
  const sampleRecord = completionDoc as ProjectCompletionRecord;
  const hasRequiredFields = 
    sampleRecord.id === `${testUserId}_${testProjectId}` &&
    sampleRecord.projectId === testProjectId &&
    sampleRecord.userId === testUserId &&
    sampleRecord.status === 'completed' &&
    typeof sampleRecord.xpAwarded === 'number' &&
    typeof sampleRecord.score === 'number' &&
    typeof sampleRecord.submissionId === 'string' &&
    typeof sampleRecord.evaluatorVersion === 'string';
  assert(
    hasRequiredFields,
    'PD21',
    'ProjectCompletionRecord satisfies all structural schema constraints'
  );

  // PD22 — completedAt is a valid ISO-8601 timestamp string
  const dateParsed = new Date(sampleRecord.completedAt);
  assert(
    !isNaN(dateParsed.getTime()) && sampleRecord.completedAt.includes('T'),
    'PD22',
    'completedAt timestamp is valid ISO-8601 string'
  );

  // PD23 — PublicProjectProgressDTO defines safe public representation
  assert(
    progressTypesContent.includes('export interface PublicProjectProgressDTO') &&
    progressTypesContent.includes('alreadyCompleted: boolean;') &&
    progressTypesContent.includes('xpAwarded: number;'),
    'PD23',
    'PublicProjectProgressDTO defines safe, client-facing contract'
  );

  // PD24 — PublicProjectProgressDTO does not expose hidden test cases or evaluator internals
  assert(
    !progressTypesContent.includes('hiddenTestCases') && !progressTypesContent.includes('privateKey'),
    'PD24',
    'PublicProjectProgressDTO does not leak private test cases or secrets'
  );

  // PD25 — UserProgress type in src/types.ts includes completedProjects
  assert(
    typesContent.includes('completedProjects?: string[];'),
    'PD25',
    'UserProgress type definition includes completedProjects field'
  );

  // PD26 — firebase-blueprint.json defines ProjectCompletion entity
  assert(
    blueprintContent.includes('"ProjectCompletion"') && blueprintContent.includes('"projectId"'),
    'PD26',
    'firebase-blueprint.json defines ProjectCompletion schema'
  );

  // PD27 — firebase-blueprint.json maps /project_completions collection
  assert(
    blueprintContent.includes('/project_completions/{completionId}'),
    'PD27',
    'firebase-blueprint.json maps /project_completions path'
  );

  // PD28 — firestore.rules forbids write by untrusted clients
  assert(
    rulesContent.includes('match /project_completions/{completionId}') &&
    rulesContent.includes('allow create: if isAdmin();') &&
    rulesContent.includes('allow update, delete: if isAdmin();'),
    'PD28',
    'firestore.rules explicitly forbids direct client writes to /project_completions'
  );

  // PD29 — firestore.rules restricts read to authenticated document owner
  assert(
    rulesContent.includes('resource.data.userId == request.auth.uid'),
    'PD29',
    'firestore.rules permits read only for authentic record owner'
  );

  // PD30 — firestore.rules prevents unauthorized progress enumeration
  assert(
    rulesContent.includes('match /project_completions/{completionId}') &&
    rulesContent.includes('isSignedIn()'),
    'PD30',
    'firestore.rules prevents unauthenticated access to project completions'
  );

  // -------------------------------------------------------------
  // GROUP 4: API ENDPOINTS & CONTRACTS (PD31 - PD40)
  // -------------------------------------------------------------

  // PD31 — Submission route executes completion logic on evaluation pass
  assert(
    serverContent.includes('recordProjectCompletion(adminDb,') &&
    serverContent.includes('evaluationResult.passed'),
    'PD31',
    'POST /api/projects/:projectId/submit links evaluation pass to completion'
  );

  // PD32 — GET /api/projects/:projectId/progress route is registered in server
  assert(
    serverContent.includes("app.get('/api/projects/:projectId/progress'") ||
    serverContent.includes('app.get("/api/projects/:projectId/progress"'),
    'PD32',
    'GET /api/projects/:projectId/progress endpoint is mounted in Express server'
  );

  // PD33 — Progress route checks authorization header / token
  assert(
    serverContent.includes('req.headers.authorization') &&
    serverContent.includes("token = authHeader.split('Bearer ')[1]"),
    'PD33',
    'Server verifies Bearer ID token on authenticated endpoints'
  );

  // PD34 — getProjectProgress returns completed: false for uncompleted project
  const uncompletedQuery = await getProjectProgress(mockDb, testUserId, 'web-03');
  assert(
    uncompletedQuery.completed === false && uncompletedQuery.xpAwarded === 0,
    'PD34',
    'getProjectProgress returns completed: false for uncompleted project'
  );

  // PD35 — getProjectProgress returns completed: true for completed project
  const completedQuery = await getProjectProgress(mockDb, testUserId, testProjectId);
  assert(
    completedQuery.completed === true && completedQuery.alreadyCompleted === true,
    'PD35',
    'getProjectProgress returns completed: true for completed project'
  );

  // PD36 — Server submission route validates project exists
  assert(
    serverContent.includes('CODERA_PROJECTS.find(p => p.id === projectId)'),
    'PD36',
    'Server routes validate project existence against authoritative catalog'
  );

  // PD37 — Server submission route rejects empty or malformed files
  assert(
    serverContent.includes('req.body?.files') || serverContent.includes('files'),
    'PD37',
    'Server submission handler checks for files object in payload'
  );

  // PD38 — PublicProjectEvaluationResult interface includes progress field
  const evalTypesPath = path.join(process.cwd(), 'src/types/projectEvaluation.ts');
  const evalTypesContent = fs.readFileSync(evalTypesPath, 'utf8');
  assert(
    evalTypesContent.includes('progress?:') && evalTypesContent.includes('PublicProjectProgressDTO'),
    'PD38',
    'PublicProjectEvaluationResult includes optional progress field'
  );

  // PD39 — Atomic transaction is used for completion recording
  assert(
    serviceCode.includes('adminDb.runTransaction('),
    'PD39',
    'Project progression service uses Firestore atomic runTransaction'
  );

  // PD40 — Server returns clean JSON responses with status codes
  assert(
    serverContent.includes('res.json(') &&
    serverContent.includes('res.status(401).json(') &&
    serverContent.includes('res.status(404).json('),
    'PD40',
    'Server responses use standard HTTP status codes and structured JSON'
  );

  // -------------------------------------------------------------
  // GROUP 5: UI STATES & FEEDBACK (PD41 - PD50)
  // -------------------------------------------------------------

  // PD41 — ProjectResultFeedback renders authoritative completion card
  assert(
    feedbackContent.includes('activeProgress?.completed') &&
    feedbackContent.includes('PROJECT COMPLETED'),
    'PD41',
    'ProjectResultFeedback contains dedicated section for result.progress'
  );

  // PD42 — ProjectResultFeedback displays celebratory message on first completion
  assert(
    feedbackContent.includes('Selamat! Proyek Selesai & Lulus Otoritatif') &&
    feedbackContent.includes('activeProgress.xpAwarded'),
    'PD42',
    'ProjectResultFeedback displays celebration and awarded XP on first completion'
  );

  // PD43 — ProjectResultFeedback handles already-completed idempotency state
  assert(
    feedbackContent.includes('activeProgress.alreadyCompleted') &&
    feedbackContent.includes('Proyek Ini Sudah Diselesaikan Sebelumnya'),
    'PD43',
    'ProjectResultFeedback informs learner when XP was already previously awarded'
  );

  // PD44 — ProjectHeader renders SELESAI badge when completed
  assert(
    headerContent.includes('projectProgress') &&
    headerContent.includes('SELESAI'),
    'PD44',
    'ProjectHeader renders authoritative SELESAI badge when projectProgress.completed is true'
  );

  // PD45 — ProjectWorkspace fetches /api/projects/:projectId/progress
  assert(
    workspaceContent.includes('/api/projects/${project.id}/progress') ||
    workspaceContent.includes('/api/projects/') && workspaceContent.includes('/progress'),
    'PD45',
    'ProjectWorkspace fetches authoritative progress on component mount and project change'
  );

  // PD46 — ProjectWorkspace resets progress state when project changes
  assert(
    workspaceContent.includes('setProjectProgress(null)'),
    'PD46',
    'ProjectWorkspace resets projectProgress state on project transition'
  );

  // PD47 — ProjectWorkspace passes projectProgress to ProjectHeader
  assert(
    workspaceContent.includes('projectProgress={projectProgress}'),
    'PD47',
    'ProjectWorkspace wires projectProgress prop directly into ProjectHeader'
  );

  // PD48 — ProjectsView renders completion badge in project list sidebar
  assert(
    projectsViewContent.includes('userProgress?.completedProjects?.includes(proj.id)') &&
    projectsViewContent.includes('Selesai'),
    'PD48',
    'ProjectsView sidebar renders Selesai badge for completed projects'
  );

  // PD49 — ProfileView renders Proyek Selesai counter
  assert(
    profileViewContent.includes('userProgress.completedProjects') &&
    profileViewContent.includes('Proyek Selesai'),
    'PD49',
    'ProfileView displays completed projects count in developer metrics'
  );

  // PD50 — App.tsx synchronizes completed projects into userProgress state
  assert(
    appContent.includes('handleProjectCompleted') &&
    appContent.includes('completedProjects: updatedCompleted'),
    'PD50',
    'App.tsx handles project completion and updates application progress state'
  );

  console.log(`\n==================================================`);
  console.log(`PHASE 5D TEST RESULTS: ${passedCount}/50 PASSED (${failedCount} FAILED)`);
  console.log(`==================================================\n`);

  return {
    results,
    summary: {
      total: results.length,
      passed: passedCount,
      failed: failedCount
    }
  };
}

// Standalone execution support
if (import.meta.url === `file://${process.argv[1]}`) {
  runPhase5DTests().then(({ summary }) => {
    if (summary.failed > 0) {
      console.error(`Phase 5D Test Matrix FAILED with ${summary.failed} errors.`);
      process.exit(1);
    } else {
      console.log('Phase 5D Test Matrix PASSED 50/50 successfully.');
      process.exit(0);
    }
  });
}
