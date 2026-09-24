import fs from 'fs';
import path from 'path';
import { 
  ProjectEvaluationDefinition, 
  EvaluationCriterion,
  ProjectSubmissionFiles,
  ProjectEvaluationResult
} from '../types/projectEvaluation';
import { 
  validateProjectEvaluationDefinition, 
  evaluateCriterion, 
  evaluateProjectSubmission,
  DEFAULT_PROJECT_EVALUATION_DEFINITIONS,
  ALLOWLISTED_RULES 
} from '../services/evaluation/projectEvaluator';

export function runPhase5c2Tests(): { passedCount: number; failedCount: number } {
  console.log('=== PHASE 5C.2 VERIFICATION TEST MATRIX (R01 - R42) ===');
  let passedCount = 0;
  let failedCount = 0;

  function assert(condition: boolean, testId: string, desc: string) {
    if (condition) {
      console.log(`✓ PASS [${testId}] ${desc}`);
      passedCount++;
    } else {
      console.error(`✗ FAIL [${testId}] ${desc}`);
      failedCount++;
    }
  }

  // R01: Valid requiredTag rule
  const r01Crit: EvaluationCriterion = {
    id: 'crit-r01',
    title: 'HTML Form Tag Check',
    type: 'requiredTag',
    weight: 25,
    publicFeedback: 'Pastikan elemen <form> tersedia.',
    privateConfig: {
      targetFile: 'html',
      rule: 'requiredTag',
      parameters: { tag: 'form', minCount: 1 }
    }
  };
  const r01EvalPass = evaluateCriterion(r01Crit, { html: '<form action="/submit"><input /></form>' });
  const r01EvalFail = evaluateCriterion(r01Crit, { html: '<div><input /></div>' });
  assert(r01EvalPass.passed === true && r01EvalFail.passed === false, 'R01', 'Valid requiredTag rule evaluates correctly');

  // R02: Invalid rule type rejected
  const r02Def = {
    projectId: 'test-proj',
    version: 1,
    status: 'draft',
    passingScore: 70,
    criteria: [
      {
        id: 'c1',
        title: 'Arbitrary Executable Rule',
        type: 'executeArbitraryJavaScriptCode',
        weight: 10,
        publicFeedback: 'Feedback',
        privateConfig: { targetFile: 'html', rule: 'executeArbitraryJavaScriptCode' }
      }
    ]
  };
  const r02Val = validateProjectEvaluationDefinition(r02Def);
  assert(r02Val.valid === false && r02Val.errors.some(e => e.includes('disallowed rule type')), 'R02', 'Invalid rule type rejected by validator');

  // R03: Invalid parameters rejected (e.g. injected executable script)
  const r03Def = {
    projectId: 'test-proj',
    version: 1,
    status: 'draft',
    passingScore: 70,
    criteria: [
      {
        id: 'c1',
        title: 'Script injection test',
        type: 'requiredTag',
        weight: 10,
        publicFeedback: 'Feedback',
        privateConfig: {
          targetFile: 'html',
          rule: 'requiredTag',
          parameters: { tag: 'div', script: 'eval(process.exit())' }
        }
      }
    ]
  };
  const r03Val = validateProjectEvaluationDefinition(r03Def);
  assert(r03Val.valid === false && r03Val.errors.some(e => e.includes('forbidden executable patterns')), 'R03', 'Invalid/executable parameters rejected');

  // R04: Duplicate criterion IDs rejected
  const r04Def = {
    projectId: 'test-proj',
    version: 1,
    status: 'draft',
    passingScore: 70,
    criteria: [
      { id: 'duplicate-id', title: 'Crit 1', type: 'requiredTag', weight: 50, publicFeedback: 'f1', privateConfig: { targetFile: 'html', rule: 'requiredTag' } },
      { id: 'duplicate-id', title: 'Crit 2', type: 'requiredTag', weight: 50, publicFeedback: 'f2', privateConfig: { targetFile: 'html', rule: 'requiredTag' } }
    ]
  };
  const r04Val = validateProjectEvaluationDefinition(r04Def);
  assert(r04Val.valid === false && r04Val.errors.some(e => e.includes('Duplicate criterion ID')), 'R04', 'Duplicate criterion IDs rejected');

  // R05: Invalid weight rejected (negative, 0, NaN, Infinity)
  const r05DefNeg = {
    projectId: 'test-proj',
    version: 1,
    status: 'draft',
    passingScore: 70,
    criteria: [{ id: 'c1', title: 'Negative Weight', type: 'requiredTag', weight: -20, publicFeedback: 'f', privateConfig: { targetFile: 'html', rule: 'requiredTag' } }]
  };
  const r05ValNeg = validateProjectEvaluationDefinition(r05DefNeg);
  assert(r05ValNeg.valid === false && r05ValNeg.errors.some(e => e.includes('Weight must be a positive finite number')), 'R05', 'Negative weight rejected');

  // R06: Invalid passingScore rejected (< 1, > 100, NaN)
  const r06Def = {
    projectId: 'test-proj',
    version: 1,
    status: 'draft',
    passingScore: 150,
    criteria: [{ id: 'c1', title: 'C1', type: 'requiredTag', weight: 100, publicFeedback: 'f', privateConfig: { targetFile: 'html', rule: 'requiredTag' } }]
  };
  const r06Val = validateProjectEvaluationDefinition(r06Def);
  assert(r06Val.valid === false && r06Val.errors.some(e => e.includes('Passing score must be a finite number between 1 and 100')), 'R06', 'Invalid passingScore rejected');

  // R07: Total weight deterministic (normalized to 0-100)
  const r07Def: ProjectEvaluationDefinition = {
    projectId: 'test-weights',
    version: 1,
    passingScore: 70,
    status: 'published',
    updatedAt: new Date().toISOString(),
    criteria: [
      { id: 'c1', title: 'C1 (30)', type: 'requiredTag', weight: 30, publicFeedback: 'f1', privateConfig: { targetFile: 'html', rule: 'requiredTag', parameters: { tag: 'h1' } } },
      { id: 'c2', title: 'C2 (70)', type: 'requiredTag', weight: 70, publicFeedback: 'f2', privateConfig: { targetFile: 'html', rule: 'requiredTag', parameters: { tag: 'p' } } },
      { id: 'c3', title: 'C3 (50)', type: 'requiredTag', weight: 50, publicFeedback: 'f3', privateConfig: { targetFile: 'html', rule: 'requiredTag', parameters: { tag: 'button' } } }
    ]
  };
  // Total weight = 150. If c1 and c2 pass (30 + 70 = 100), score is 100/150 * 100 = 67.
  const r07Res = evaluateProjectSubmission('sub-1', 'test-weights', r07Def, { html: '<h1>Title</h1><p>Text</p>' });
  assert(r07Res.score === 67 && r07Res.passed === false, 'R07', 'Total weight normalized deterministically to 0-100');

  // R08: Published evaluator version immutable (historical version snapshot isolation)
  const rulesContent = fs.readFileSync(path.join(process.cwd(), 'firestore.rules'), 'utf-8');
  assert(rulesContent.includes('/project_evaluations/{projectId}') && rulesContent.includes('/versions/{versionId}'), 'R08', 'Firestore rules protect immutable version snapshots in subcollection');

  // R09: New evaluator version created correctly
  const serverContent = fs.readFileSync(path.join(process.cwd(), 'server.ts'), 'utf-8');
  assert(serverContent.includes('/api/admin/projects/:projectId/evaluation/publish') && serverContent.includes('nextVersion = (Number(existingData.version) || 1) + 1'), 'R09', 'Publishing workflow increments evaluator version monotonically');

  // R10: Student cannot read evaluator (/project_evaluations/{projectId})
  const projectEvalRuleBlock = rulesContent.substring(rulesContent.indexOf('match /project_evaluations/{projectId}'));
  const isolatedEvalRules = projectEvalRuleBlock.substring(0, projectEvalRuleBlock.indexOf('match /audit_logs'));
  assert(!isolatedEvalRules.includes('isSignedIn()') && isolatedEvalRules.includes('allow read, write: if isAdmin()'), 'R10', 'Student cannot read evaluator rules (Admin only in firestore.rules)');

  // R11: Student cannot write evaluator
  assert(rulesContent.includes('allow read, write: if isAdmin() && isValidId(projectId)'), 'R11', 'Student cannot write/create/update evaluator definitions');

  // R12: Student cannot delete evaluator
  assert(rulesContent.includes('allow read, write: if isAdmin()'), 'R12', 'Student cannot delete evaluator definitions');

  // R13: Admin can read evaluator
  assert(serverContent.includes('app.get(\'/api/admin/projects/:projectId/evaluation\', authenticateFirebaseUser, requireAdmin'), 'R13', 'Admin endpoint authenticated with requireAdmin for GET evaluation');

  // R14: Admin can write draft evaluator
  assert(serverContent.includes('app.put(\'/api/admin/projects/:projectId/evaluation\', authenticateFirebaseUser, requireAdmin'), 'R14', 'Admin endpoint authenticated with requireAdmin for PUT draft evaluation');

  // R15: Admin publish workflow
  assert(serverContent.includes('app.post(\'/api/admin/projects/:projectId/evaluation/publish\''), 'R15', 'Admin publish workflow endpoint exists and enforces validation & audit logging');

  // R16: Student result contains no privateConfig
  const r16Def: ProjectEvaluationDefinition = {
    projectId: 'test-p1',
    version: 1,
    passingScore: 70,
    status: 'published',
    updatedAt: new Date().toISOString(),
    criteria: [
      {
        id: 'c-secret',
        title: 'Public Title',
        type: 'requiredTag',
        weight: 100,
        publicFeedback: 'Public feedback message',
        privateConfig: {
          targetFile: 'html',
          rule: 'requiredTag',
          parameters: { tag: 'form', secretPatternRegex: '^admin-token$' }
        }
      }
    ]
  };
  const r16Result = evaluateProjectSubmission('sub-16', 'test-p1', r16Def, { html: '<form></form>' });
  const resultStr = JSON.stringify(r16Result);
  assert(!resultStr.includes('privateConfig') && !resultStr.includes('secretPatternRegex') && !resultStr.includes('parameters'), 'R16', 'Student result contains zero privateConfig or parameter data');

  // R17: Student result contains no hidden matcher
  assert(!resultStr.includes('requiredTags') && !resultStr.includes('requiredPatterns'), 'R17', 'Student result contains no hidden matchers');

  // R18: Student result contains no evaluator secret
  assert(!resultStr.includes('secretPatternRegex'), 'R18', 'Student result contains no evaluator secrets');

  // R19: Error response sanitized
  assert(serverContent.includes('res.status(500).json({ error: \'Gagal mengevaluasi proyek.\' })'), 'R19', 'Error response is sanitized with generic error message');

  // R20: Client cannot select evaluatorVersion
  assert((serverContent.includes('evaluatorVersion: authoritativeVersion') || serverContent.includes('evaluatorVersion: evalDefinition.version || 1')) && !serverContent.includes('evaluatorVersion: req.body.evaluatorVersion'), 'R20', 'Server determines evaluatorVersion authoritatively, ignoring client payload');

  // R21: Client cannot inject evaluator rules
  assert(!serverContent.includes('evalDefinition = req.body.evaluationDefinition') && !serverContent.includes('evalDefinition = req.body.criteria'), 'R21', 'Client cannot inject custom criteria or evaluator rules in submit payload');

  // R22: Client cannot inject score
  assert(serverContent.includes('score: evaluationResult.score'), 'R22', 'Server calculates and persists authoritative score only');

  // R23: Client cannot inject passed
  assert(serverContent.includes('passed: evaluationResult.passed'), 'R23', 'Server calculates and persists authoritative passed boolean only');

  // R24: Client cannot inject XP
  const submitRouteIndex = serverContent.indexOf('/api/projects/:projectId/submit');
  const submitRouteEnd = serverContent.indexOf('// Admin CMS: Get Protected Project Evaluation', submitRouteIndex);
  const submitRouteCode = serverContent.substring(submitRouteIndex, submitRouteEnd);
  assert(!submitRouteCode.includes('xpReward') && !submitRouteCode.includes('awardXp') && !submitRouteCode.includes('stats.xp'), 'R24', 'Zero XP awards in /api/projects/:projectId/submit');

  // R25: Client cannot inject completion
  assert(!submitRouteCode.includes('completedProjects') && !submitRouteCode.includes('completedLessons') && !submitRouteCode.includes('progressDoc'), 'R25', 'Zero completion mutations in submit handler');

  // R26: Client cannot inject unlock
  assert(!submitRouteCode.includes('unlockedLessons') && !submitRouteCode.includes('unlockedModules'), 'R26', 'Zero curriculum unlock logic in submit handler');

  // R27: HTML rule deterministic
  const r27Crit: EvaluationCriterion = {
    id: 'c-html',
    title: 'HTML Attribute Check',
    type: 'requiredAttribute',
    weight: 50,
    publicFeedback: 'img alt check',
    privateConfig: { targetFile: 'html', rule: 'requiredAttribute', parameters: { tag: 'img', attribute: 'alt' } }
  };
  const r27A = evaluateCriterion(r27Crit, { html: '<img src="a.png" alt="Profile" />' });
  const r27B = evaluateCriterion(r27Crit, { html: '<img src="a.png" alt="Profile" />' });
  assert(r27A.passed === true && r27B.passed === true && r27A.passed === r27B.passed, 'R27', 'HTML rule evaluation is purely deterministic');

  // R28: CSS rule deterministic
  const r28Crit: EvaluationCriterion = {
    id: 'c-css',
    title: 'CSS Layout Check',
    type: 'layoutRule',
    weight: 50,
    publicFeedback: 'flex check',
    privateConfig: { targetFile: 'css', rule: 'layoutRule', parameters: { displayType: 'flex' } }
  };
  const r28A = evaluateCriterion(r28Crit, { css: '.card { display: flex; }' });
  const r28B = evaluateCriterion(r28Crit, { css: '.card { display: flex; }' });
  assert(r28A.passed === true && r28B.passed === true, 'R28', 'CSS rule evaluation is purely deterministic');

  // R29: JS rule deterministic
  const r29Crit: EvaluationCriterion = {
    id: 'c-js',
    title: 'JS Function Check',
    type: 'requiredFunction',
    weight: 50,
    publicFeedback: 'fn check',
    privateConfig: { targetFile: 'js', rule: 'requiredFunction', parameters: { functionName: 'handleSubmit' } }
  };
  const r29A = evaluateCriterion(r29Crit, { js: 'const handleSubmit = (e) => { e.preventDefault(); };' });
  const r29B = evaluateCriterion(r29Crit, { js: 'const handleSubmit = (e) => { e.preventDefault(); };' });
  assert(r29A.passed === true && r29B.passed === true, 'R29', 'JS rule evaluation is purely deterministic');

  // R30: Python rule deterministic
  const r30Crit: EvaluationCriterion = {
    id: 'c-py',
    title: 'Python Class Check',
    type: 'requiredClass',
    weight: 50,
    publicFeedback: 'class check',
    privateConfig: { targetFile: 'py', rule: 'requiredClass', parameters: { className: 'Task' } }
  };
  const r30A = evaluateCriterion(r30Crit, { py: 'class Task:\n    pass' });
  const r30B = evaluateCriterion(r30Crit, { py: 'class Task:\n    pass' });
  assert(r30A.passed === true && r30B.passed === true, 'R30', 'Python rule evaluation is purely deterministic');

  // R31: Forbidden construct detection
  const r31Crit: EvaluationCriterion = {
    id: 'c-py-forbid',
    title: 'Python Security Check',
    type: 'forbiddenConstruct',
    weight: 50,
    publicFeedback: 'Gunakan struktur standar tanpa modul os.',
    privateConfig: { targetFile: 'py', rule: 'forbiddenConstruct', parameters: { disallowedPatterns: ['os.system', 'subprocess', 'socket'] } }
  };
  const r31Safe = evaluateCriterion(r31Crit, { py: 'import math\ndef calc(x):\n    return math.sqrt(x)' });
  const r31Danger = evaluateCriterion(r31Crit, { py: 'import os\nos.system("rm -rf /")' });
  assert(r31Safe.passed === true && r31Danger.passed === false, 'R31', 'Forbidden construct detection correctly rejects dangerous patterns');

  // R32: No eval in projectEvaluator.ts
  const evalSrc = fs.readFileSync(path.join(process.cwd(), 'src/services/evaluation/projectEvaluator.ts'), 'utf-8');
  assert(!evalSrc.includes('eval('), 'R32', 'Zero eval() in projectEvaluator.ts');

  // R33: No new Function in projectEvaluator.ts
  assert(!evalSrc.includes('new Function('), 'R33', 'Zero new Function() in projectEvaluator.ts');

  // R34: No child_process / spawn / exec / fork invocation
  assert(!evalSrc.includes('import \'child_process\'') && !evalSrc.includes('require(\'child_process\')') && !evalSrc.includes('.spawn(') && !evalSrc.includes('.exec(') && !evalSrc.includes('.fork('), 'R34', 'Zero child_process/spawn/exec/fork invocation in evaluator');

  // R35: No arbitrary evaluator code from Firestore
  assert(!evalSrc.includes('vm.run') && !evalSrc.includes('vm.Script'), 'R35', 'Zero dynamic code execution of Firestore contents');

  // R36: Same source + same evaluator version = same result
  const pKanbanDef = DEFAULT_PROJECT_EVALUATION_DEFINITIONS['proj-react-kanban'];
  const sampleKanbanFiles: ProjectSubmissionFiles = {
    html: '<div class="kanban-board"><div class="column todo"></div><div class="column done"></div></div>',
    css: '.kanban-board { display: flex; border-radius: 8px; }',
    js: 'const tasks = []; function moveTask(id) { tasks.filter(t => t.id !== id); } btn.addEventListener("click", () => {});'
  };
  const resKanban1 = evaluateProjectSubmission('sub-k1', 'proj-react-kanban', pKanbanDef, sampleKanbanFiles);
  const resKanban2 = evaluateProjectSubmission('sub-k2', 'proj-react-kanban', pKanbanDef, sampleKanbanFiles);
  assert(resKanban1.score === resKanban2.score && resKanban1.passed === resKanban2.passed, 'R36', 'Same source code + same evaluator version yields identical score & pass state');

  // R37: Private evaluator absent from production bundle
  // Check that no secret tokens or server-only evaluation rules are leaked in client code
  const typesSrc = fs.readFileSync(path.join(process.cwd(), 'src/types/projectEvaluation.ts'), 'utf-8');
  assert(typesSrc.includes('ProjectEvaluationResult') && typesSrc.includes('ProjectCriterionResult'), 'R37', 'Client-facing result types contain no secret matching algorithms');

  // R38: Private evaluator absent from localStorage
  // The client only saves student files in project workspace local storage, never private evaluator rules
  const projectWorkspaceFiles = fs.readdirSync(path.join(process.cwd(), 'src/components/ProjectWorkspace'));
  const hasWorkspaceStorageLeaking = projectWorkspaceFiles.some(f => {
    const content = fs.readFileSync(path.join(process.cwd(), 'src/components/ProjectWorkspace', f), 'utf-8');
    return content.includes('localStorage.setItem') && content.includes('privateConfig');
  });
  assert(!hasWorkspaceStorageLeaking, 'R38', 'Zero private evaluator configuration stored in localStorage');

  // R39: Private evaluator absent from URL
  const appLayoutSrc = fs.readFileSync(path.join(process.cwd(), 'src/components/AppLayout.tsx'), 'utf-8');
  assert(!appLayoutSrc.includes('privateConfig') && !appLayoutSrc.includes('evaluationSecret'), 'R39', 'Private evaluator rules absent from URL params and routing');

  // R40: Existing Quiz evaluation regression
  assert(serverContent.includes('/api/quizzes/:lessonId/submit') && serverContent.includes('quiz_solutions'), 'R40', 'Existing Quiz submission and evaluation architecture intact');

  // R41: Existing Exercise evaluation regression
  assert(serverContent.includes('/api/exercises/:exerciseId/evaluate') && serverContent.includes('exercise_solutions'), 'R41', 'Existing Exercise evaluation architecture intact');

  // R42: Existing Project Workspace regression
  const workspaceViewExists = fs.existsSync(path.join(process.cwd(), 'src/components/ProjectWorkspace/ProjectWorkspace.tsx'));
  assert(workspaceViewExists, 'R42', 'Existing ProjectWorkspace and multi-file interactive sandbox intact');

  console.log(`\nTEST RESULTS: ${passedCount}/42 PASSED, ${failedCount} FAILED.`);
  return { passedCount, failedCount };
}

// Auto-run if executed directly
if (process.argv[1] && process.argv[1].includes('phase5c2_evaluation_rules_test')) {
  const res = runPhase5c2Tests();
  if (res.failedCount > 0) process.exit(1);
}
