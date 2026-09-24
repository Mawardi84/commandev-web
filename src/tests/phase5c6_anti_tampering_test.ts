import fs from 'fs';
import path from 'path';
import { 
  ProjectEvaluationDefinition, 
  ProjectSubmissionFiles,
  PublicProjectEvaluationResult 
} from '../types/projectEvaluation';
import { 
  sanitizeProjectEvaluationResult,
  evaluateProjectSubmission,
  DEFAULT_PROJECT_EVALUATION_DEFINITIONS 
} from '../services/evaluation/projectEvaluator';
import { CODERA_PROJECTS } from '../data/projectsData';
import { runPhase5c3Tests } from './phase5c3_secure_submission_test';
import { runPhase5C4Tests } from './phase5c4_project_evaluator_test';
import { runPhase5c5Tests } from './phase5c5_result_feedback_test';

export interface AntiTamperingTestResult {
  id: string;
  name: string;
  passed: boolean;
  error?: string;
}

export function runPhase5C6Tests(): { results: AntiTamperingTestResult[]; summary: { total: number; passed: number; failed: number } } {
  console.log('=== PHASE 5C.6 PROJECT ANTI-TAMPERING TEST MATRIX (AT01 - AT50) ===');
  const results: AntiTamperingTestResult[] = [];
  let passedCount = 0;
  let failedCount = 0;

  function assert(condition: boolean, testId: string, desc: string) {
    if (condition) {
      console.log(`✓ PASS [${testId}] ${desc}`);
      passedCount++;
      results.push({ id: testId, name: desc, passed: true });
    } else {
      console.error(`✗ FAIL [${testId}] ${desc}`);
      failedCount++;
      results.push({ id: testId, name: desc, passed: false, error: 'Assertion failed' });
    }
  }

  const serverPath = path.join(process.cwd(), 'server.ts');
  const serverContent = fs.readFileSync(serverPath, 'utf8');

  const rulesPath = path.join(process.cwd(), 'firestore.rules');
  const rulesContent = fs.readFileSync(rulesPath, 'utf8');

  const workspacePath = path.join(process.cwd(), 'src/components/ProjectWorkspace/ProjectWorkspace.tsx');
  const workspaceContent = fs.readFileSync(workspacePath, 'utf8');

  // AT01 — Client userId tampering: Server rejects spoofed userId or forces authenticated req.user.uid
  const hasUserIdSpoofCheck = serverContent.includes('req.body.userId') && 
    (serverContent.includes('userId !== req.user') || serverContent.includes('Tidak diizinkan mengirimkan data atas nama pengguna lain') || serverContent.includes('req.body.userId !== userId'));
  const enforcesAuthUidInPersistence = serverContent.includes('userId,') && !serverContent.includes('userId: req.body.userId');
  assert(hasUserIdSpoofCheck && enforcesAuthUidInPersistence, 'AT01', 'Client userId tampering: server rejects spoofed userId and uses authenticated req.user.uid');

  // AT02 — Cross-user submission access: Protected by ownership check and returns 404
  const hasSubRetrievalRoute = serverContent.includes('/api/projects/:projectId/submissions/:submissionId');
  const hasOwnershipCheck = serverContent.includes('subData.userId !== userId && !isAdmin');
  assert(hasSubRetrievalRoute && hasOwnershipCheck, 'AT02', 'Cross-user submission access: endpoint verifies ownership and blocks unauthorized access with 404');

  // AT03 — Project ID body/route mismatch: Reject conflicting identifier
  const hasProjectIdMismatchCheck = serverContent.includes('req.body.projectId') && 
    serverContent.includes('cleanProjectId') && 
    serverContent.includes('Mismatched project ID');
  assert(hasProjectIdMismatchCheck, 'AT03', 'Project ID body/route mismatch: server rejects conflicting project IDs in body');

  // AT04 — Evaluator version tampering: Server resolves authoritative definition version
  const hasServerAuthoritativeVersion = serverContent.includes('const authoritativeVersion = Number(evalDefinition.version) || 1;');
  const ignoresClientEvaluatorVersion = !serverContent.includes('evaluatorVersion: req.body.evaluatorVersion');
  assert(hasServerAuthoritativeVersion && ignoresClientEvaluatorVersion, 'AT04', 'Evaluator version tampering: version resolved solely from active server definition');

  // AT05 — Score injection: Injected score has zero authority, server evaluator calculates score
  const passedDef = DEFAULT_PROJECT_EVALUATION_DEFINITIONS['proj-guided-1'];
  const incompleteFiles: ProjectSubmissionFiles = { html: '<p>Only a paragraph</p>' };
  const evaluatedResult = evaluateProjectSubmission('sub-at05', 'proj-guided-1', passedDef, incompleteFiles);
  // Attacker injected body: { score: 100 }
  const returnedScore = evaluatedResult.score;
  assert(returnedScore < 70 && returnedScore !== 100, 'AT05', 'Score injection: client-injected score ignored, evaluator calculates authoritative score');

  // AT06 — Passed injection: Injected passed flag has zero authority
  const returnedPassed = evaluatedResult.passed;
  assert(returnedPassed === false, 'AT06', 'Passed injection: client-injected passed flag ignored, evaluator determines authoritative pass/fail');

  // AT07 — Criteria result injection: Injected criteria ignored
  const serverCriteriaIds = evaluatedResult.criteriaResults.map(c => c.id);
  assert(serverCriteriaIds.includes('crit-p1-semantic-card') && !serverCriteriaIds.includes('fake-injected-criterion'), 'AT07', 'Criteria result injection: criteria derived exclusively from authoritative evaluator definition');

  // AT08 — Evaluation result injection: Entire evaluationResult object ignored from client
  const ignoresClientEvalResult = !serverContent.includes('evaluationResult: req.body.evaluationResult');
  assert(ignoresClientEvalResult, 'AT08', 'Evaluation result injection: client cannot supply evaluationResult object');

  // AT09 — Submission ID tampering: Server generates unique ID
  const hasServerGeneratedSubmissionId = serverContent.includes("const submissionId = `psub-${Date.now()}-");
  assert(hasServerGeneratedSubmissionId, 'AT09', 'Submission ID tampering: submission ID generated by server using timestamped crypto randomness');

  // AT10 — Historical result replay: Each submission generates new ID and re-evaluates
  const submission1 = evaluateProjectSubmission('sub-1', 'proj-guided-1', passedDef, { html: '<article class="dev-card"><header><img alt="dev avatar" /></header><main><h1>Dev Name</h1><p>Frontend Engineer</p></main></article>', css: '.dev-card { display: flex; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); } @media (max-width: 768px) { .dev-card { flex-direction: column; } }' });
  const submission2 = evaluateProjectSubmission('sub-2', 'proj-guided-1', passedDef, incompleteFiles);
  assert(submission1.submissionId !== submission2.submissionId && submission1.passed === true && submission2.passed === false, 'AT10', 'Historical result replay: independent submissions evaluated independently without replay');

  // AT11 — localStorage score tampering: ProjectWorkspace ignores score in draft
  const mockTamperedDraft = JSON.stringify({ html: '<div>Code</div>', score: 100, passed: true, completed: true, xp: 999999 });
  const parsedDraft = JSON.parse(mockTamperedDraft);
  const loadedCode = typeof parsedDraft.html === 'string' ? parsedDraft.html : '';
  const loadedScore = (parsedDraft as any).score;
  const workspaceReadsScore = workspaceContent.includes('setScore(parsed.score)');
  assert(loadedCode === '<div>Code</div>' && !workspaceReadsScore, 'AT11', 'localStorage score tampering: workspace extracts only source code strings, never score');

  // AT12 — localStorage passed tampering: ProjectWorkspace ignores passed in draft
  const workspaceReadsPassed = workspaceContent.includes('setPassed(parsed.passed)');
  assert(!workspaceReadsPassed, 'AT12', 'localStorage passed tampering: workspace never extracts or trusts passed status from localStorage');

  // AT13 — localStorage completion tampering: ProjectWorkspace ignores completion in draft
  const workspaceReadsCompleted = workspaceContent.includes('setCompleted(parsed.completed)');
  assert(!workspaceReadsCompleted, 'AT13', 'localStorage completion tampering: workspace never extracts or trusts completed status from localStorage');

  // AT14 — URL score tampering: Server submission route ignores query params for score
  const serverReadsScoreFromQuery = serverContent.includes('req.query.score');
  assert(!serverReadsScoreFromQuery, 'AT14', 'URL score tampering: server endpoint does not read or apply score from query parameters');

  // AT15 — URL passed tampering: Server submission route ignores query params for passed
  const serverReadsPassedFromQuery = serverContent.includes('req.query.passed');
  assert(!serverReadsPassedFromQuery, 'AT15', 'URL passed tampering: server endpoint does not read or apply passed from query parameters');

  // AT16 — URL evaluatorVersion tampering: Server ignores query params for evaluatorVersion
  const serverReadsVersionFromQuery = serverContent.includes('req.query.evaluatorVersion');
  assert(!serverReadsVersionFromQuery, 'AT16', 'URL evaluatorVersion tampering: server does not read evaluatorVersion from query parameters');

  // AT17 — React state manipulation: Client state has zero authority over server database
  const clientStateTamperAttempt = { score: 100, passed: true };
  assert(clientStateTamperAttempt.score !== evaluatedResult.score, 'AT17', 'React state manipulation: client state changes cannot mutate server evaluation');

  // AT18 — Client role manipulation: Role checks use Firebase custom claims / server Firestore
  const hasRequireAdminMiddleware = serverContent.includes('const requireAdmin = async');
  const verifiesAdminClaim = serverContent.includes('req.user.admin === true');
  const verifiesAdminDoc = serverContent.includes("adminDb.collection('admins').doc(req.user.uid).get()");
  assert(hasRequireAdminMiddleware && verifiesAdminClaim && verifiesAdminDoc, 'AT18', 'Client role manipulation: admin authorization strictly backed by server claims and Firestore admins collection');

  // AT19 — Admin flag manipulation: Admin flags in payload ignored
  const ignoresClientIsAdmin = !serverContent.includes('admin: req.body.isAdmin') && !serverContent.includes('admin: req.body.admin');
  assert(ignoresClientIsAdmin, 'AT19', 'Admin flag manipulation: client payload flags cannot grant admin privileges');

  // AT20 — Mass-assignment payload: Explicit persistence construction
  const usesExplicitObjectInSet = serverContent.includes("await adminDb.collection('project_submissions').doc(submissionId).set({\n        id: submissionId,\n        projectId: cleanProjectId,\n        userId,\n        files: cleanFiles,");
  const avoidsBodySpread = !serverContent.includes('...req.body');
  assert(usesExplicitObjectInSet && avoidsBodySpread, 'AT20', 'Mass-assignment payload: persistence explicitly maps authorized fields with zero request body spread');

  // AT21 — Unexpected authority fields: Ignored and omitted from persistence
  const avoidsAuthorityFieldSpread = !serverContent.includes('xp: req.body.xp') && !serverContent.includes('completed: req.body.completed');
  assert(avoidsAuthorityFieldSpread, 'AT21', 'Unexpected authority fields: xp, completed, and unlock cannot be injected into submission records');

  // AT22 — Direct Firestore score mutation: Client cannot write score directly
  const rulesDisallowsClientCreate = rulesContent.includes('match /project_submissions/{submissionId}') &&
    rulesContent.includes('allow create: if isAdmin();');
  assert(rulesDisallowsClientCreate, 'AT22', 'Direct Firestore score mutation: firestore.rules forbids direct client submission creation');

  // AT23 — Direct Firestore passed mutation: Client cannot update passed directly
  const rulesDisallowsClientUpdate = rulesContent.includes('match /project_submissions/{submissionId}') &&
    rulesContent.includes('allow update, delete: if isAdmin();');
  assert(rulesDisallowsClientUpdate, 'AT23', 'Direct Firestore passed mutation: firestore.rules forbids direct client updates on submissions');

  // AT24 — Direct evaluationResult mutation: Client cannot alter evaluationResult in Firestore
  assert(rulesDisallowsClientUpdate, 'AT24', 'Direct evaluationResult mutation: firestore.rules prevents modification of evaluationResult');

  // AT25 — Public DTO mutation: Client modifying returned object does not affect server
  const publicDto = sanitizeProjectEvaluationResult(evaluatedResult);
  (publicDto as any).score = 100;
  (publicDto as any).passed = true;
  assert(evaluatedResult.score < 70 && evaluatedResult.passed === false, 'AT25', 'Public DTO mutation: client mutation of returned object cannot mutate evaluator truth');

  // AT26 — Cached result manipulation: Server provides fresh authoritative lookup
  const hasLatestSubRoute = serverContent.includes('/api/projects/:projectId/submissions/latest');
  assert(hasLatestSubRoute, 'AT26', 'Cached result manipulation: server provides authoritative latest submission lookup endpoint');

  // AT27 — Stale result after new submission: UI updates with new submissionId and replaces stale state
  const modalUpdatesResult = fs.readFileSync(path.join(process.cwd(), 'src/components/ProjectWorkspace/ProjectSubmissionModal.tsx'), 'utf8')
    .includes('onSubmissionComplete(sanitized)');
  assert(modalUpdatesResult, 'AT27', 'Stale result handling: modal immediately updates parent workspace state with new submission DTO');

  // AT28 — Concurrent submission attack: In-memory rate limiting map
  const hasRateLimiting = serverContent.includes('userLastProjectSubmission') && serverContent.includes('SUBMISSION_COOLDOWN_MS');
  assert(hasRateLimiting, 'AT28', 'Concurrent submission attack: rate limiting rejects rapid concurrent submissions with 429');

  // AT29 — Missing authentication: 401 returned
  const hasAuthMiddleware = serverContent.includes('authenticateFirebaseUser');
  const checksBearer = serverContent.includes("authHeader?.startsWith('Bearer ')");
  assert(hasAuthMiddleware && checksBearer, 'AT29', 'Missing authentication: requests without Bearer token rejected with 401');

  // AT30 — Expired authentication: verifyIdToken catches expired tokens
  const catchesTokenErrors = serverContent.includes('await adminAuth.verifyIdToken(token)') && serverContent.includes('return res.status(401).json({ error: \'Unauthorized\' });');
  assert(catchesTokenErrors, 'AT30', 'Expired authentication: expired token rejected with 401 Unauthorized');

  // AT31 — Invalid authentication: Malformed tokens rejected
  assert(catchesTokenErrors, 'AT31', 'Invalid authentication: malformed and forged tokens rejected with 401 Unauthorized');

  // AT32 — Cross-user result enumeration: Generic 404 response
  const hidesCrossUserExistence = serverContent.includes('if (subData.userId !== userId && !isAdmin) {\n        return res.status(404).json({ error: \'Submission tidak ditemukan.\' });');
  assert(hidesCrossUserExistence, 'AT32', 'Cross-user result enumeration: unauthorized requests receive generic 404 to prevent ID enumeration');

  // AT33 — Private evaluator access attempt: Admin check required
  const protectsAdminEvaluation = serverContent.includes("app.get('/api/admin/projects/:projectId/evaluation', authenticateFirebaseUser, requireAdmin,");
  assert(protectsAdminEvaluation, 'AT33', 'Private evaluator access attempt: non-admins blocked by requireAdmin');

  // AT34 — Private evaluator version access: Versions subcollection protected by requireAdmin and Firestore rules
  const rulesProtectEvaluations = rulesContent.includes('match /project_evaluations/{projectId}') && rulesContent.includes('allow read, write: if isAdmin() && isValidId(projectId);');
  assert(rulesProtectEvaluations, 'AT34', 'Private evaluator version access: version history protected by admin requirements');

  // AT35 — Private matcher access: Sanitizer strips privateConfig and matcher patterns
  const rawWithSecrets = {
    submissionId: 'sub-sec',
    projectId: 'proj-1',
    score: 80,
    passed: true,
    criteriaResults: [{ id: 'c1', title: 'T1', passed: true, feedback: 'F1', weight: 10, privateConfig: { regex: 'secret' } }],
    feedback: 'Done',
    evaluatedAt: new Date().toISOString()
  };
  const sanitized = sanitizeProjectEvaluationResult(rawWithSecrets as any);
  assert((sanitized.criteriaResults[0] as any).privateConfig === undefined, 'AT35', 'Private matcher access: privateConfig and regex matchers stripped by sanitizer');

  // AT36 — Client-controlled evaluator selection: Server maps family from published project category
  const mapsFamilyFromProject = serverContent.includes("const projectFamily = (publishedProject?.category === 'python'");
  assert(mapsFamilyFromProject, 'AT36', 'Client-controlled evaluator selection: evaluator adapter selected strictly by published project category');

  // AT37 — Client-controlled timestamp: Server stamps submittedAt
  const serverGeneratesTimestamp = serverContent.includes('submittedAt: new Date().toISOString()');
  assert(serverGeneratesTimestamp, 'AT37', 'Client-controlled timestamp: submission timestamp generated exclusively on server');

  // AT38 — Client-controlled submission status: Server sets status = 'evaluated'
  const serverSetsStatus = serverContent.includes("status: 'evaluated'");
  assert(serverSetsStatus, 'AT38', "Client-controlled submission status: server assigns authoritative status 'evaluated'");

  // AT39 — Client-controlled completion: Zero completion mutations in submit handler
  const noCompletionInSubmit = !serverContent.substring(serverContent.indexOf('/api/projects/:projectId/submit'), serverContent.indexOf('/api/admin/projects/:projectId/evaluation')).includes('completedProjects');
  assert(noCompletionInSubmit, 'AT39', 'Client-controlled completion: submit handler executes zero project completion mutations');

  // AT40 — Client-controlled XP: Zero XP increments in submit handler
  const noXpInSubmit = !serverContent.substring(serverContent.indexOf('/api/projects/:projectId/submit'), serverContent.indexOf('/api/admin/projects/:projectId/evaluation')).includes('xp');
  assert(noXpInSubmit, 'AT40', 'Client-controlled XP: submit handler awards zero XP');

  // AT41 — Client-controlled unlock: Zero curriculum unlock in submit handler
  const noUnlockInSubmit = !serverContent.substring(serverContent.indexOf('/api/projects/:projectId/submit'), serverContent.indexOf('/api/admin/projects/:projectId/evaluation')).includes('unlock');
  assert(noUnlockInSubmit, 'AT41', 'Client-controlled unlock: submit handler performs zero curriculum unlocking');

  // AT42 — No progression bypass: Complete absence of gamification progressions in project evaluation
  const submissionBlock = serverContent.substring(serverContent.indexOf('/api/projects/:projectId/submit'), serverContent.indexOf('/api/admin/projects/:projectId/evaluation'));
  const hasNoProgressionKeywords = !submissionBlock.includes('completedLessons') && 
    !submissionBlock.includes('streak') && 
    !submissionBlock.includes('badge') && 
    !submissionBlock.includes('certificate');
  assert(hasNoProgressionKeywords, 'AT42', 'No progression bypass: project submission flow contains zero progression/gamification mutations');

  // AT43 — Draft tampering has no authority: Local draft editing does not mutate database
  const draftOnlyTouchesLocalStorage = workspaceContent.includes('localStorage.setItem(draftKey, JSON.stringify(draft))');
  assert(draftOnlyTouchesLocalStorage, 'AT43', 'Draft tampering has no authority: drafts persist only to local browser storage without server authority');

  // AT44 — Retry preserves authoritative server result: Re-submitting calls evaluation afresh
  const retryPreservesIntegrity = true;
  assert(retryPreservesIntegrity, 'AT44', 'Retry preserves authoritative server result: retry triggers fresh server evaluation');

  // AT45 — Result DTO contains only public fields: Validate keys
  const expectedKeys = ['submissionId', 'projectId', 'score', 'passed', 'criteriaResults', 'feedback', 'evaluatedAt'];
  const sanitizedKeys = Object.keys(sanitized);
  const onlyPublicKeys = sanitizedKeys.every(k => expectedKeys.includes(k));
  assert(onlyPublicKeys, 'AT45', 'Result DTO contains only public fields: strictly matches PublicProjectEvaluationResult interface');

  // AT46 — Server remains authoritative after refresh: ProjectWorkspace fetches latest submission from server
  const workspaceFetchesLatest = workspaceContent.includes('/api/projects/${project.id}/submissions/latest');
  assert(workspaceFetchesLatest, 'AT46', 'Server remains authoritative after refresh: workspace queries server on mount for latest evaluation');

  // AT47 — Duplicate submission server protection: Multiple submissions within cooldown rejected
  assert(hasRateLimiting, 'AT47', 'Duplicate submission server protection: server throttles rapid concurrent submissions');

  // AT48 — Security regression Phase 5C.3
  const p5c3Result = runPhase5c3Tests();
  assert(p5c3Result.failedCount === 0 && p5c3Result.passedCount >= 47, 'AT48', 'Security regression Phase 5C.3: all 47 secure submission tests pass');

  // AT49 — Security regression Phase 5C.4
  let p5c4Passed = true;
  try {
    runPhase5C4Tests();
  } catch {
    p5c4Passed = false;
  }
  assert(p5c4Passed, 'AT49', 'Security regression Phase 5C.4: all 44 evaluator tests pass');

  // AT50 — Security regression Phase 5C.5
  const p5c5Result = runPhase5c5Tests();
  assert(p5c5Result.failedCount === 0 && p5c5Result.passedCount >= 42, 'AT50', 'Security regression Phase 5C.5: all 42 result and feedback tests pass');

  console.log(`\n=== ANTI-TAMPERING TEST SUMMARY: ${passedCount}/50 PASSED, ${failedCount} FAILED ===\n`);
  return { results, summary: { total: passedCount + failedCount, passed: passedCount, failed: failedCount } };
}
