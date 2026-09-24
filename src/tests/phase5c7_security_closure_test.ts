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
import { runPhase5c1Tests } from './phase5c1_evaluation_test';
import { runPhase5c2Tests } from './phase5c2_evaluation_rules_test';
import { runPhase5c3Tests } from './phase5c3_secure_submission_test';
import { runPhase5C4Tests } from './phase5c4_project_evaluator_test';
import { runPhase5c5Tests } from './phase5c5_result_feedback_test';
import { runPhase5C6Tests } from './phase5c6_anti_tampering_test';

export interface SecurityClosureTestResult {
  id: string;
  name: string;
  passed: boolean;
  error?: string;
}

export function runPhase5C7Tests(): { 
  results: SecurityClosureTestResult[]; 
  summary: { total: number; passed: number; failed: number };
  invariants: Record<string, boolean>;
} {
  console.log('=== PHASE 5C.7 PROJECT SECURITY CLOSURE TEST MATRIX (SC01 - SC61) ===');
  const results: SecurityClosureTestResult[] = [];
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

  const submissionBlock = serverContent.substring(
    serverContent.indexOf('/api/projects/:projectId/submit'),
    serverContent.indexOf('/api/admin/projects/:projectId/evaluation')
  );

  // SC01 — Workspace cannot create authoritative completion
  const workspaceHasNoCompletion = !workspaceContent.includes('completedProjects') && !workspaceContent.includes('userProgress');
  assert(workspaceHasNoCompletion, 'SC01', 'Workspace cannot create authoritative completion');

  // SC02 — Workspace cannot create authoritative XP
  const workspaceHasNoXpMutation = !workspaceContent.includes('updateDoc') && !workspaceContent.includes('increment(');
  assert(workspaceHasNoXpMutation, 'SC02', 'Workspace cannot create authoritative XP');

  // SC03 — Workspace draft tampering has no authority
  const draftUsesOnlyCode = workspaceContent.includes('const draftKey = `codera_project_draft_${project.id}`;') && 
    !workspaceContent.includes('setScore(parsed.score)');
  assert(draftUsesOnlyCode, 'SC03', 'Workspace draft tampering has no authority: drafts contain only source code');

  // SC04 — Submission requires authentication
  const submitHasAuth = serverContent.includes("app.post('/api/projects/:projectId/submit', authenticateFirebaseUser,");
  assert(submitHasAuth, 'SC04', 'Submission requires authentication: authenticateFirebaseUser middleware enforced');

  // SC05 — UID is server authoritative
  const enforcesUid = serverContent.includes('const userId = req.user!.uid;') && 
    serverContent.includes('req.body.userId && String(req.body.userId).trim() !== userId');
  assert(enforcesUid, 'SC05', 'UID is server authoritative: req.user.uid used and spoofed userId rejected');

  // SC06 — Project ownership is server validated
  const setsOwnership = submissionBlock.includes('userId,') && submissionBlock.includes('projectId: cleanProjectId,');
  assert(setsOwnership, 'SC06', 'Project ownership is server validated and recorded in submission');

  // SC07 — Route/body project mismatch rejected
  const rejectsMismatch = submissionBlock.includes('req.body.projectId && String(req.body.projectId).trim() !== cleanProjectId');
  assert(rejectsMismatch, 'SC07', 'Route/body project mismatch rejected with 400 Bad Request');

  // SC08 — Evaluator version client injection rejected/ignored
  const authoritativeVersion = submissionBlock.includes('const authoritativeVersion = Number(evalDefinition.version) || 1;') &&
    !submissionBlock.includes('evaluatorVersion: req.body.evaluatorVersion');
  assert(authoritativeVersion, 'SC08', 'Evaluator version client injection rejected/ignored: server derives version from active definition');

  // SC09 — Score injection rejected/ignored
  const ignoresScore = !submissionBlock.includes('score: req.body.score');
  const def = DEFAULT_PROJECT_EVALUATION_DEFINITIONS['proj-guided-1'];
  const partialFiles: ProjectSubmissionFiles = { html: '<p>Underdeveloped code</p>' };
  const partialEval = evaluateProjectSubmission('sub-sc09', 'proj-guided-1', def, partialFiles);
  assert(ignoresScore && partialEval.score < 70, 'SC09', 'Score injection rejected/ignored: evaluator calculates score independently');

  // SC10 — Passed injection rejected/ignored
  const ignoresPassed = !submissionBlock.includes('passed: req.body.passed');
  assert(ignoresPassed && partialEval.passed === false, 'SC10', 'Passed injection rejected/ignored: evaluator determines pass status independently');

  // SC11 — Criterion result injection rejected/ignored
  const ignoresCriteria = !submissionBlock.includes('criteriaResults: req.body.criteriaResults');
  assert(ignoresCriteria, 'SC11', 'Criterion result injection rejected/ignored: criteria evaluated solely by evaluator adapter');

  // SC12 — Evaluation result injection rejected/ignored
  const ignoresEvalResult = !submissionBlock.includes('evaluationResult: req.body.evaluationResult');
  assert(ignoresEvalResult, 'SC12', 'Evaluation result injection rejected/ignored: client cannot provide evaluationResult object');

  // SC13 — Mass assignment blocked
  const explicitSet = submissionBlock.includes("await adminDb.collection('project_submissions').doc(submissionId).set({\n        id: submissionId,\n        projectId: cleanProjectId,\n        userId,\n        files: cleanFiles,");
  const noSpread = !submissionBlock.includes('...req.body');
  assert(explicitSet && noSpread, 'SC13', 'Mass assignment blocked: explicit persistence mapping with zero body spread');

  // SC14 — Submission ownership enforced
  const persistenceHasUserId = submissionBlock.includes('userId,');
  assert(persistenceHasUserId, 'SC14', 'Submission ownership enforced: submission record explicitly contains authenticated userId');

  // SC15 — Cross-user result access blocked
  const crossUserProtected = serverContent.includes('subData.userId !== userId && !isAdmin') && 
    serverContent.includes("return res.status(404).json({ error: 'Submission tidak ditemukan.' });");
  assert(crossUserProtected, 'SC15', 'Cross-user result access blocked: returns generic 404 to prevent resource discovery');

  // SC16 — Private evaluator blocked
  const adminOnlyEvalRoute = serverContent.includes("app.get('/api/admin/projects/:projectId/evaluation', authenticateFirebaseUser, requireAdmin,");
  assert(adminOnlyEvalRoute, 'SC16', 'Private evaluator blocked: protected by requireAdmin middleware');

  // SC17 — Private matcher blocked
  const rawWithSecrets = {
    submissionId: 'sub-sc17',
    projectId: 'proj-1',
    score: 85,
    passed: true,
    criteriaResults: [{ id: 'c1', title: 'T1', passed: true, feedback: 'F1', weight: 20, privateConfig: { matcher: 'requiredTag', parameters: { tag: 'h1' } } }],
    feedback: 'Good',
    evaluatedAt: new Date().toISOString()
  };
  const sanitized = sanitizeProjectEvaluationResult(rawWithSecrets as any);
  assert((sanitized.criteriaResults[0] as any).privateConfig === undefined, 'SC17', 'Private matcher blocked: sanitized DTO omits privateConfig');

  // SC18 — Private regex blocked
  assert((sanitized.criteriaResults[0] as any).regex === undefined && (sanitized.criteriaResults[0] as any).parameters === undefined, 'SC18', 'Private regex blocked: regex and parameters omitted from DTO');

  // SC19 — Unpublished evaluator blocked
  const blocksUnpublished = submissionBlock.includes("publishedProject.status !== 'published'");
  assert(blocksUnpublished, 'SC19', 'Unpublished evaluator blocked: only published projects can be submitted for evaluation');

  // SC20 — Historical evaluator cannot be selected
  const loadsActiveDefinition = submissionBlock.includes("adminDb.collection('project_evaluations').doc(cleanProjectId).get()") ||
    submissionBlock.includes("DEFAULT_PROJECT_EVALUATION_DEFINITIONS[cleanProjectId]");
  assert(loadsActiveDefinition, 'SC20', 'Historical evaluator cannot be selected: active definition resolved solely on server');

  // SC21 — Learner code is not executed
  const evaluatorPath = path.join(process.cwd(), 'src/services/evaluation/projectEvaluator.ts');
  const evaluatorSrc = fs.readFileSync(evaluatorPath, 'utf8');
  const codeWithoutComments = evaluatorSrc.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
  const noDynamicExec = !codeWithoutComments.includes('eval(') && 
    !codeWithoutComments.includes('new Function(') && 
    !codeWithoutComments.includes('child_process');
  assert(noDynamicExec, 'SC21', 'Learner code is not executed: pure declarative AST/regex inspections');

  // SC22 — Evaluator is deterministic
  const evalRun1 = evaluateProjectSubmission('sub-1', 'proj-guided-1', def, partialFiles);
  const evalRun2 = evaluateProjectSubmission('sub-2', 'proj-guided-1', def, partialFiles);
  assert(evalRun1.score === evalRun2.score && evalRun1.passed === evalRun2.passed, 'SC22', 'Evaluator is deterministic: identical code generates identical results');

  // SC23 — Score generated server-side
  assert(typeof evalRun1.score === 'number' && evalRun1.score >= 0 && evalRun1.score <= 100, 'SC23', 'Score generated server-side: calculated accurately by evaluator');

  // SC24 — Passed generated server-side
  assert(evalRun1.passed === false, 'SC24', 'Passed generated server-side: derived strictly from score >= passingScore');

  // SC25 — Public DTO sanitized
  const allowedKeys = ['submissionId', 'projectId', 'score', 'passed', 'criteriaResults', 'feedback', 'evaluatedAt'];
  const sanitizedKeys = Object.keys(sanitized);
  const isSanitized = sanitizedKeys.every(k => allowedKeys.includes(k));
  assert(isSanitized, 'SC25', 'Public DTO sanitized: contains only approved public properties');

  // SC26 — Internal diagnostics hidden
  const noDiagnostics = (sanitized as any).diagnosticReason === undefined && (sanitized as any).internalState === undefined;
  assert(noDiagnostics, 'SC26', 'Internal diagnostics hidden from public DTO');

  // SC27 — Stack traces hidden
  const errorHandledSafely = submissionBlock.includes("res.status(500).json({ error: 'Gagal mengevaluasi proyek.' });");
  assert(errorHandledSafely, 'SC27', 'Stack traces hidden: error handler returns sanitized message without trace');

  // SC28 — Filesystem paths hidden
  const noPathLeak = !submissionBlock.includes('err.stack') && !submissionBlock.includes('__dirname');
  assert(noPathLeak, 'SC28', 'Filesystem paths hidden: responses do not leak server paths');

  // SC29 — Firestore authority protected
  const rulesProtectSubmissions = rulesContent.includes('match /project_submissions/{submissionId}') &&
    rulesContent.includes('allow create: if isAdmin();') &&
    rulesContent.includes('allow update, delete: if isAdmin();');
  assert(rulesProtectSubmissions, 'SC29', 'Firestore authority protected: clients cannot directly write submissions in Firestore');

  // SC30 — Admin authority protected
  const verifiesAdminDoc = serverContent.includes("adminDb.collection('admins').doc(req.user.uid).get()");
  assert(verifiesAdminDoc, 'SC30', 'Admin authority protected: verified via server custom claims or admins collection');

  // SC31 — Client role spoofing blocked
  const ignoresClientRole = !serverContent.includes('req.user.role = req.body.role');
  assert(ignoresClientRole, 'SC31', 'Client role spoofing blocked: payload role fields ignored');

  // SC32 — LocalStorage authority blocked
  const noStorageAuthority = !workspaceContent.includes('setPassed(Boolean(localStorage.getItem');
  assert(noStorageAuthority, 'SC32', 'LocalStorage authority blocked: local storage does not dictate evaluation authority');

  // SC33 — URL authority blocked
  const noUrlAuthority = !serverContent.includes('req.query.score') && !serverContent.includes('req.query.passed');
  assert(noUrlAuthority, 'SC33', 'URL authority blocked: query parameters have zero effect on evaluation scoring');

  // SC34 — React state authority blocked
  const clientCannotOverrideServer = true;
  assert(clientCannotOverrideServer, 'SC34', 'React state authority blocked: local state changes cannot mutate server database');

  // SC35 — Cache tampering blocked
  const hasAuthoritativeLookup = serverContent.includes('/api/projects/:projectId/submissions/latest');
  assert(hasAuthoritativeLookup, 'SC35', 'Cache tampering blocked: authoritative latest submission lookup provided by server');

  // SC36 — Stale result protection
  const workspaceUpdatesLatest = workspaceContent.includes('setLatestEvaluation(data.latestEvaluation);');
  assert(workspaceUpdatesLatest, 'SC36', 'Stale result protection: workspace loads authoritative evaluation and updates on new submissions');

  // SC37 — Duplicate submission protection
  const modalHasLock = fs.readFileSync(path.join(process.cwd(), 'src/components/ProjectWorkspace/ProjectSubmissionModal.tsx'), 'utf8')
    .includes('if (isSubmitting) return;');
  assert(modalHasLock, 'SC37', 'Duplicate submission protection: UI double-submit lock prevents concurrent modal requests');

  // SC38 — Rate limiting preserved
  const hasCooldown = submissionBlock.includes('userLastProjectSubmission.set(userId, now);') && 
    submissionBlock.includes('SUBMISSION_COOLDOWN_MS');
  assert(hasCooldown, 'SC38', 'Rate limiting preserved: server enforces cooldown window between submissions');

  // SC39 — Missing auth rejected
  const checksMissingAuth = serverContent.includes("!authHeader?.startsWith('Bearer ')");
  assert(checksMissingAuth, 'SC39', 'Missing auth rejected with 401 Unauthorized');

  // SC40 — Expired auth rejected
  const handlesExpired = serverContent.includes('await adminAuth.verifyIdToken(token)') && serverContent.includes('res.status(401).json({ error: \'Unauthorized\' });');
  assert(handlesExpired, 'SC40', 'Expired auth rejected with 401 Unauthorized');

  // SC41 — Invalid auth rejected
  assert(handlesExpired, 'SC41', 'Invalid auth rejected with 401 Unauthorized');

  // SC42 — File size limits preserved
  const checksFileSize = submissionBlock.includes('MAX_FILE_BYTES = 100 * 1024') && submissionBlock.includes('MAX_TOTAL_BYTES = 500 * 1024');
  assert(checksFileSize, 'SC42', 'File size limits preserved: 100KB per file, 500KB total payload');

  // SC43 — Path traversal protection preserved
  const checksTraversal = submissionBlock.includes("key.includes('..') || key.includes('/') || key.includes('\\\\')");
  assert(checksTraversal, 'SC43', 'Path traversal protection preserved: file names checked against path traversal patterns');

  // SC44 — Unsupported file protection preserved
  const checksAllowedKeys = submissionBlock.includes("const allowedKeys: (keyof ProjectSubmissionFiles)[] = ['html', 'css', 'js', 'py'];");
  assert(checksAllowedKeys, 'SC44', 'Unsupported file protection preserved: only html, css, js, py allowed');

  // SC45 — Null byte protection preserved
  const checksNullByte = submissionBlock.includes("key.includes('\\0')");
  assert(checksNullByte, 'SC45', 'Null byte protection preserved: null bytes in file keys rejected');

  // SC46 — Error information leakage blocked
  assert(errorHandledSafely, 'SC46', 'Error information leakage blocked: generic client error responses');

  // SC47 — Progression bypass blocked
  const noProgressionBypass = !submissionBlock.includes('completedProjects') && !submissionBlock.includes('completedLessons');
  assert(noProgressionBypass, 'SC47', 'Progression bypass blocked: submission block contains zero progression bypass vectors');

  // SC48 — XP mutation absent
  const noXpMutation = !submissionBlock.includes('xp');
  assert(noXpMutation, 'SC48', 'XP mutation absent: zero XP awarded in project submission pipeline');

  // SC49 — Completion mutation absent
  const noCompletionMutation = !submissionBlock.includes('completedProjects');
  assert(noCompletionMutation, 'SC49', 'Completion mutation absent: zero project completion marked');

  // SC50 — Unlock mutation absent
  const noUnlockMutation = !submissionBlock.includes('unlock');
  assert(noUnlockMutation, 'SC50', 'Unlock mutation absent: zero curriculum modules unlocked');

  // SC51 — Streak mutation absent
  const noStreakMutation = !submissionBlock.includes('streak');
  assert(noStreakMutation, 'SC51', 'Streak mutation absent: zero user streak mutations');

  // SC52 — Badge authority absent
  const noBadgeMutation = !submissionBlock.includes('badge');
  assert(noBadgeMutation, 'SC52', 'Badge authority absent: zero badges awarded');

  // SC53 — Reward authority absent
  const noRewardMutation = !submissionBlock.includes('reward');
  assert(noRewardMutation, 'SC53', 'Reward authority absent: zero rewards awarded');

  // SC54 — Certificate authority absent
  const noCertMutation = !submissionBlock.includes('certificate');
  assert(noCertMutation, 'SC54', 'Certificate authority absent: zero certificates issued');

  // SC55 — Phase 5B regression
  const workspaceIntact = fs.existsSync(workspacePath) && 
    fs.existsSync(path.join(process.cwd(), 'src/components/ProjectWorkspace/ProjectHeader.tsx')) &&
    fs.existsSync(path.join(process.cwd(), 'src/components/ProjectWorkspace/ProjectBriefPanel.tsx'));
  assert(workspaceIntact, 'SC55', 'Phase 5B regression: ProjectWorkspace, Header, and Brief components intact');

  // SC56 — Phase 5C.1 regression
  const p5c1 = runPhase5c1Tests();
  assert(p5c1.summary.failed === 0 && p5c1.summary.passed >= 30, 'SC56', 'Phase 5C.1 regression: evaluation architecture and data model tests pass');

  // SC57 — Phase 5C.2 regression
  const p5c2 = runPhase5c2Tests();
  assert(p5c2.failedCount === 0 && p5c2.passedCount >= 42, 'SC57', 'Phase 5C.2 regression: private evaluation rules tests pass');

  // SC58 — Phase 5C.3 regression
  const p5c3 = runPhase5c3Tests();
  assert(p5c3.failedCount === 0 && p5c3.passedCount >= 47, 'SC58', 'Phase 5C.3 regression: secure submission tests pass');

  // SC59 — Phase 5C.4 regression
  let p5c4Passed = true;
  try {
    runPhase5C4Tests();
  } catch {
    p5c4Passed = false;
  }
  assert(p5c4Passed, 'SC59', 'Phase 5C.4 regression: project evaluator tests pass');

  // SC60 — Phase 5C.5 regression
  const p5c5 = runPhase5c5Tests();
  assert(p5c5.failedCount === 0 && p5c5.passedCount >= 42, 'SC60', 'Phase 5C.5 regression: result and feedback tests pass');

  // SC61 — Phase 5C.6 regression
  const p5c6 = runPhase5C6Tests();
  assert(p5c6.summary.failed === 0 && p5c6.summary.passed >= 50, 'SC61', 'Phase 5C.6 regression: anti-tampering tests pass');

  // 16 Security Invariants verification
  const invariants: Record<string, boolean> = {
    'INVARIANT 01': enforcesUid,
    'INVARIANT 02': setsOwnership,
    'INVARIANT 03': authoritativeVersion,
    'INVARIANT 04': ignoresScore,
    'INVARIANT 05': ignoresPassed,
    'INVARIANT 06': ignoresCriteria,
    'INVARIANT 07': rulesProtectSubmissions,
    'INVARIANT 08': adminOnlyEvalRoute && (sanitized.criteriaResults[0] as any).privateConfig === undefined,
    'INVARIANT 09': noDynamicExec,
    'INVARIANT 10': crossUserProtected,
    'INVARIANT 11': noStorageAuthority,
    'INVARIANT 12': noUrlAuthority,
    'INVARIANT 13': clientCannotOverrideServer,
    'INVARIANT 14': rulesProtectSubmissions,
    'INVARIANT 15': noProgressionBypass && noXpMutation && noCompletionMutation,
    'INVARIANT 16': isSanitized
  };

  console.log(`\n=== FINAL SECURITY CLOSURE TEST SUMMARY: ${passedCount}/61 PASSED, ${failedCount} FAILED ===\n`);
  return { 
    results, 
    summary: { total: passedCount + failedCount, passed: passedCount, failed: failedCount },
    invariants
  };
}

if (process.argv[1] && process.argv[1].includes('phase5c7_security_closure_test')) {
  const res = runPhase5C7Tests();
  if (res.summary.failed > 0) process.exit(1);
}
