import { 
  ProjectEvaluationDefinition, 
  EvaluationCriterion, 
  ProjectSubmission, 
  ProjectEvaluationResult, 
  ProjectSubmissionFiles 
} from '../types/projectEvaluation';
import { 
  DEFAULT_PROJECT_EVALUATION_DEFINITIONS, 
  evaluateCriterion, 
  evaluateProjectSubmission 
} from '../services/evaluation/projectEvaluator';
import * as fs from 'fs';
import * as path from 'path';

export interface TestResult {
  id: string;
  name: string;
  passed: boolean;
  error?: string;
  details?: string;
}

export function runPhase5c1Tests(): { results: TestResult[]; summary: { total: number; passed: number; failed: number } } {
  const results: TestResult[] = [];

  function record(id: string, name: string, fn: () => void) {
    try {
      fn();
      results.push({ id, name, passed: true });
    } catch (err: any) {
      results.push({ id, name, passed: false, error: err.message || String(err) });
    }
  }

  // A01: ProjectEvaluationDefinition schema validation
  record('A01', 'ProjectEvaluationDefinition schema has required fields', () => {
    const def = DEFAULT_PROJECT_EVALUATION_DEFINITIONS['proj-guided-1'];
    if (!def.projectId || typeof def.version !== 'number' || typeof def.passingScore !== 'number' || !Array.isArray(def.criteria)) {
      throw new Error('ProjectEvaluationDefinition missing required fields');
    }
  });

  // A02: EvaluationCriterion schema validation
  record('A02', 'EvaluationCriterion schema has required fields and privateConfig', () => {
    const def = DEFAULT_PROJECT_EVALUATION_DEFINITIONS['proj-guided-1'];
    const c = def.criteria[0];
    if (!c.id || !c.title || !c.type || typeof c.weight !== 'number' || !c.publicFeedback || !c.privateConfig) {
      throw new Error('EvaluationCriterion missing required fields or privateConfig');
    }
  });

  // A03: Public vs private separation
  record('A03', 'Public vs private separation - privateConfig excluded from evaluation result', () => {
    const def = DEFAULT_PROJECT_EVALUATION_DEFINITIONS['proj-guided-1'];
    const files: ProjectSubmissionFiles = {
      html: '<article class="dev-card"><header><img alt="dev avatar" /></header></article>',
      css: '.dev-card { display: flex; justify-content: center; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); } @media (max-width: 768px) {}'
    };
    const res = evaluateProjectSubmission('test-sub-1', 'proj-guided-1', def, files);
    for (const cr of res.criteriaResults) {
      if ((cr as any).privateConfig !== undefined) {
        throw new Error(`privateConfig leaked in criteriaResult ${cr.criterionId}`);
      }
    }
  });

  // A04: Protected Firestore path in rules
  record('A04', 'Protected Firestore path /project_evaluations/{projectId} exists in rules', () => {
    const rulesPath = path.join(process.cwd(), 'firestore.rules');
    const rules = fs.readFileSync(rulesPath, 'utf8');
    if (!rules.includes('match /project_evaluations/{projectId}')) {
      throw new Error('Missing /project_evaluations/{projectId} in firestore.rules');
    }
  });

  // A05: Admin-only access to /project_evaluations/{projectId}
  record('A05', 'Admin-only access rule for /project_evaluations/{projectId}', () => {
    const rulesPath = path.join(process.cwd(), 'firestore.rules');
    const rules = fs.readFileSync(rulesPath, 'utf8');
    const evalRuleMatch = rules.includes('match /project_evaluations/{projectId}') && rules.includes('isAdmin()');
    if (!evalRuleMatch) {
      throw new Error('Admin rule not properly configured for project_evaluations');
    }
  });

  // A06: ProjectSubmission schema validation
  record('A06', 'ProjectSubmission structure validation', () => {
    const sub: ProjectSubmission = {
      id: 'sub-test',
      projectId: 'proj-guided-1',
      userId: 'user-123',
      files: { html: '<div>test</div>' },
      submittedAt: new Date().toISOString(),
      evaluatorVersion: 1,
      status: 'evaluated'
    };
    if (!sub.id || !sub.projectId || !sub.userId || !sub.files) {
      throw new Error('ProjectSubmission missing essential properties');
    }
  });

  // A07: Sanitized ProjectEvaluationResult structure
  record('A07', 'Sanitized ProjectEvaluationResult contains clean metrics', () => {
    const def = DEFAULT_PROJECT_EVALUATION_DEFINITIONS['proj-guided-1'];
    const res = evaluateProjectSubmission('sub-1', 'proj-guided-1', def, { html: '' });
    if (typeof res.score !== 'number' || typeof res.passed !== 'boolean' || !Array.isArray(res.criteriaResults) || !res.evaluatedAt) {
      throw new Error('Sanitized result schema mismatch');
    }
  });

  // A08: Server-authoritative score calculation
  record('A08', 'Server computes proportional score correctly', () => {
    const def = DEFAULT_PROJECT_EVALUATION_DEFINITIONS['proj-guided-1'];
    const files: ProjectSubmissionFiles = {
      html: '<article class="dev-card"><header><img alt="dev avatar" /></header></article>',
      css: '.dev-card { display: flex; justify-content: center; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); } @media (max-width: 768px) {}'
    };
    const res = evaluateProjectSubmission('sub-1', 'proj-guided-1', def, files);
    if (res.score !== 100 || !res.passed) {
      throw new Error(`Expected score 100, got ${res.score}`);
    }
  });

  // A09: Server-authoritative passed calculation
  record('A09', 'Server sets passed=false when score is below threshold', () => {
    const def = DEFAULT_PROJECT_EVALUATION_DEFINITIONS['proj-guided-1'];
    const files: ProjectSubmissionFiles = {
      html: '<div>Incomplete profile</div>'
    };
    const res = evaluateProjectSubmission('sub-1', 'proj-guided-1', def, files);
    if (res.passed !== false || res.score >= 70) {
      throw new Error(`Expected failing score, got ${res.score}`);
    }
  });

  // A10: Learner cannot spoof score or passed
  record('A10', 'Evaluation engine ignores any injected score or passed properties', () => {
    const def = DEFAULT_PROJECT_EVALUATION_DEFINITIONS['proj-guided-1'];
    const spoofedInput: any = {
      html: '<div>Incomplete</div>',
      score: 100,
      passed: true,
      xp: 500
    };
    const res = evaluateProjectSubmission('sub-1', 'proj-guided-1', def, spoofedInput);
    if (res.score === 100 || res.passed === true) {
      throw new Error('Evaluator allowed spoofed score');
    }
  });

  // A11: Declarative HTML structure evaluation
  record('A11', 'HTML evaluation checks tags and patterns correctly', () => {
    const crit: EvaluationCriterion = {
      id: 'c-html',
      title: 'Semantic Article',
      type: 'html_structure',
      weight: 50,
      publicFeedback: 'Needs <article>',
      privateConfig: {
        targetFile: 'html',
        requiredTags: ['article'],
        requiredPatterns: ['dev-card']
      }
    };
    const fail = evaluateCriterion(crit, { html: '<div>no article</div>' });
    if (fail.passed) throw new Error('Should have failed HTML tag check');

    const pass = evaluateCriterion(crit, { html: '<article class="dev-card"></article>' });
    if (!pass.passed) throw new Error('Should have passed HTML tag check');
  });

  // A12: Declarative CSS style evaluation
  record('A12', 'CSS evaluation checks rules and properties correctly', () => {
    const crit: EvaluationCriterion = {
      id: 'c-css',
      title: 'Flexbox Layout',
      type: 'css_style',
      weight: 50,
      publicFeedback: 'Needs flexbox',
      privateConfig: {
        targetFile: 'css',
        requiredPatterns: ['display:\\s*flex']
      }
    };
    const fail = evaluateCriterion(crit, { css: 'div { color: red; }' });
    if (fail.passed) throw new Error('Should have failed CSS flex check');

    const pass = evaluateCriterion(crit, { css: 'div { display: flex; }' });
    if (!pass.passed) throw new Error('Should have passed CSS flex check');
  });

  // A13: Declarative JS syntax evaluation
  record('A13', 'JS evaluation checks required patterns without executing', () => {
    const crit: EvaluationCriterion = {
      id: 'c-js',
      title: 'Event Listener',
      type: 'js_syntax',
      weight: 50,
      publicFeedback: 'Needs addEventListener',
      privateConfig: {
        targetFile: 'js',
        requiredPatterns: ['addEventListener']
      }
    };
    const fail = evaluateCriterion(crit, { js: 'const a = 1;' });
    if (fail.passed) throw new Error('Should have failed JS check');

    const pass = evaluateCriterion(crit, { js: 'btn.addEventListener("click", () => {});' });
    if (!pass.passed) throw new Error('Should have passed JS check');
  });

  // A14: Declarative Python AST/keyword evaluation
  record('A14', 'Python evaluation checks structural constructs safely', () => {
    const crit: EvaluationCriterion = {
      id: 'c-py',
      title: 'Function Definition',
      type: 'py_ast',
      weight: 50,
      publicFeedback: 'Needs function def',
      privateConfig: {
        targetFile: 'py',
        astConstructs: ['def'],
        requiredPatterns: ['def create_task']
      }
    };
    const fail = evaluateCriterion(crit, { py: 'x = 10' });
    if (fail.passed) throw new Error('Should have failed Python def check');

    const pass = evaluateCriterion(crit, { py: 'def create_task(title):\n    return {"title": title}' });
    if (!pass.passed) throw new Error('Should have passed Python def check');
  });

  // A15: Forbidden construct detection
  record('A15', 'Forbidden construct detection rejects disallowed patterns', () => {
    const crit: EvaluationCriterion = {
      id: 'c-forbid',
      title: 'No Malicious Eval',
      type: 'forbidden_construct',
      weight: 100,
      publicFeedback: 'Do not use eval',
      privateConfig: {
        targetFile: 'js',
        forbiddenPatterns: ['eval\\s*\\(', 'document\\.write']
      }
    };
    const fail = evaluateCriterion(crit, { js: 'eval("2+2");' });
    if (fail.passed) throw new Error('Should have caught forbidden eval pattern');

    const pass = evaluateCriterion(crit, { js: 'const sum = 2 + 2;' });
    if (!pass.passed) throw new Error('Should have passed clean code');
  });

  // A16: File presence check
  record('A16', 'File presence criterion checks file existence', () => {
    const crit: EvaluationCriterion = {
      id: 'c-presence',
      title: 'Python File',
      type: 'file_presence',
      weight: 50,
      publicFeedback: 'File required',
      privateConfig: { targetFile: 'py' }
    };
    const fail = evaluateCriterion(crit, { py: '' });
    if (fail.passed) throw new Error('Should have failed empty py file');

    const pass = evaluateCriterion(crit, { py: '# code' });
    if (!pass.passed) throw new Error('Should have passed non-empty py file');
  });

  // A17: Zero eval in projectEvaluator.ts
  record('A17', 'Zero eval in projectEvaluator.ts', () => {
    const evaluatorPath = path.join(process.cwd(), 'src/services/evaluation/projectEvaluator.ts');
    const code = fs.readFileSync(evaluatorPath, 'utf8');
    // Ensure no dynamic eval() calls
    const hasEvalCall = /\beval\s*\(/.test(code);
    if (hasEvalCall) throw new Error('Found eval() call in projectEvaluator.ts');
  });

  // A18: Zero new Function in projectEvaluator.ts
  record('A18', 'Zero new Function in projectEvaluator.ts', () => {
    const evaluatorPath = path.join(process.cwd(), 'src/services/evaluation/projectEvaluator.ts');
    const code = fs.readFileSync(evaluatorPath, 'utf8');
    const hasFunctionCtor = /new\s+Function\s*\(/.test(code);
    if (hasFunctionCtor) throw new Error('Found new Function() in projectEvaluator.ts');
  });

  // A19: Zero child_process or execution primitives in projectEvaluator.ts
  record('A19', 'Zero child_process or spawn/exec in projectEvaluator.ts', () => {
    const evaluatorPath = path.join(process.cwd(), 'src/services/evaluation/projectEvaluator.ts');
    const code = fs.readFileSync(evaluatorPath, 'utf8');
    const hasChildProcessImport = /from\s+['"]child_process['"]|require\(['"]child_process['"]\)/.test(code);
    const hasProcessSpawn = /\b(child_process|execSync|spawnSync|fork)\s*\(/.test(code);
    if (hasChildProcessImport || hasProcessSpawn) throw new Error('Found child_process execution primitive in projectEvaluator.ts');
  });

  // A20: Zero learner execution on server in project submission endpoint
  record('A20', 'Zero learner execution on server in /api/projects/:projectId/submit', () => {
    const serverPath = path.join(process.cwd(), 'server.ts');
    const code = fs.readFileSync(serverPath, 'utf8');
    const submitSection = code.substring(code.indexOf('/api/projects/:projectId/submit'), code.indexOf('/api/admin/projects/:projectId/evaluation'));
    if (/eval\(|new Function\(|child_process|exec\(|spawn\(/.test(submitSection)) {
      throw new Error('Found dangerous execution primitive in project submit handler');
    }
  });

  // A21: Multiple projects evaluation coverage
  record('A21', 'Default definitions exist for all 6 published projects', () => {
    const expected = ['proj-guided-1', 'proj-react-kanban', 'proj-backend-api', 'proj-challenge-1', 'proj-portfolio-1', 'proj-fullstack-lms'];
    for (const id of expected) {
      if (!DEFAULT_PROJECT_EVALUATION_DEFINITIONS[id]) {
        throw new Error(`Missing default evaluation definition for ${id}`);
      }
    }
  });

  // A22: Python REST API project evaluator works on sample solution
  record('A22', 'Python REST API project evaluator verifies clean solution', () => {
    const def = DEFAULT_PROJECT_EVALUATION_DEFINITIONS['proj-backend-api'];
    const samplePy = `
class UserAuthService:
    def __init__(self):
        self.users = {}
        self.tokens = {}

    def register(self, email, password):
        if email in self.users:
            raise ValueError("Email already exists")
        self.users[email] = password
        return {"status": "created", "email": email}

    def login(self, email, password):
        if self.users.get(email) != password:
            raise PermissionError("Invalid credentials")
        token = f"jwt_{email}_token"
        self.tokens[token] = email
        return {"token": token}

    def verify_token(self, token):
        if token not in self.tokens:
            raise PermissionError("Invalid token")
        return self.tokens[token]
`;
    const res = evaluateProjectSubmission('sub-py', 'proj-backend-api', def, { py: samplePy }, 'backend');
    if (!res.passed || res.score < 70) {
      throw new Error(`Python project failed evaluation: score=${res.score}`);
    }
  });

  // A23: React Kanban project evaluator works on sample solution
  record('A23', 'React Kanban project evaluator verifies clean solution', () => {
    const def = DEFAULT_PROJECT_EVALUATION_DEFINITIONS['proj-react-kanban'];
    const sampleHtml = '<div class="kanban-board"><div class="colTodo"></div><div class="colProgress"></div><div class="colDone"></div></div>';
    const sampleJs = `
function KanbanBoard() {
  const [tasks, setTasks] = React.useState([]);
  const addTask = (title) => {
    tasks.push({ id: Date.now(), title, status: 'todo' });
    setTasks([...tasks]);
  };
  return (
    <div className="board">
      <button onClick={() => addTask('New Task')}>Tambah</button>
    </div>
  );
}
`;
    const sampleCss = '.kanban-board { display: grid; grid-template-columns: repeat(3, 1fr); border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }';
    const res = evaluateProjectSubmission('sub-kanban', 'proj-react-kanban', def, { html: sampleHtml, js: sampleJs, css: sampleCss }, 'react');
    if (!res.passed || res.score < 70) {
      throw new Error(`Kanban project failed evaluation: score=${res.score}`);
    }
  });

  // A24: Submissions collection in firestore.rules
  record('A24', 'Firestore rules protect /project_submissions/{submissionId}', () => {
    const rulesPath = path.join(process.cwd(), 'firestore.rules');
    const rules = fs.readFileSync(rulesPath, 'utf8');
    if (!rules.includes('match /project_submissions/{submissionId}')) {
      throw new Error('Missing /project_submissions/{submissionId} in firestore.rules');
    }
  });

  // A25: Blueprint schema contains ProjectEvaluationDefinition & ProjectSubmission
  record('A25', 'Blueprint contains ProjectEvaluationDefinition & ProjectSubmission entities', () => {
    const bpPath = path.join(process.cwd(), 'firebase-blueprint.json');
    const bp = JSON.parse(fs.readFileSync(bpPath, 'utf8'));
    if (!bp.entities.ProjectEvaluationDefinition || !bp.entities.ProjectSubmission) {
      throw new Error('Blueprint missing ProjectEvaluationDefinition or ProjectSubmission entity');
    }
    if (!bp.firestore['/project_evaluations/{projectId}'] || !bp.firestore['/project_submissions/{submissionId}']) {
      throw new Error('Blueprint missing firestore paths for project evaluations and submissions');
    }
  });

  // A26: Strict Phase 5C.1 Boundary - Zero XP mutations in submit handler
  record('A26', 'Zero XP awards in /api/projects/:projectId/submit', () => {
    const serverPath = path.join(process.cwd(), 'server.ts');
    const code = fs.readFileSync(serverPath, 'utf8');
    const submitSection = code.substring(code.indexOf('/api/projects/:projectId/submit'), code.indexOf('/api/admin/projects/:projectId/evaluation'));
    if (submitSection.includes('xpReward') || submitSection.includes('awardXP') || submitSection.includes('increment(')) {
      throw new Error('Found unauthorized XP mutation in Phase 5C.1 project submit handler');
    }
  });

  // A27: Strict Phase 5C.1 Boundary - Zero completion mutations in submit handler
  record('A27', 'Zero completedLessons or project completion mutations in submit handler', () => {
    const serverPath = path.join(process.cwd(), 'server.ts');
    const code = fs.readFileSync(serverPath, 'utf8');
    const submitSection = code.substring(code.indexOf('/api/projects/:projectId/submit'), code.indexOf('/api/admin/projects/:projectId/evaluation'));
    if (submitSection.includes('completedLessons') || submitSection.includes('completedProjects') || submitSection.includes('unlockNextModule')) {
      throw new Error('Found unauthorized completion mutation in Phase 5C.1 project submit handler');
    }
  });

  // A28: Strict Phase 5C.1 Boundary - Zero curriculum unlock
  record('A28', 'Zero curriculum unlock logic in submit handler', () => {
    const serverPath = path.join(process.cwd(), 'server.ts');
    const code = fs.readFileSync(serverPath, 'utf8');
    const submitSection = code.substring(code.indexOf('/api/projects/:projectId/submit'), code.indexOf('/api/admin/projects/:projectId/evaluation'));
    if (submitSection.includes('unlockedLessons') || submitSection.includes('unlockedCourses')) {
      throw new Error('Found unauthorized unlock mutation in Phase 5C.1 project submit handler');
    }
  });

  // A29: Admin evaluation GET and PUT endpoints exist in server.ts
  record('A29', 'Admin evaluation GET and PUT endpoints exist in server.ts', () => {
    const serverPath = path.join(process.cwd(), 'server.ts');
    const code = fs.readFileSync(serverPath, 'utf8');
    if (!code.includes("app.get('/api/admin/projects/:projectId/evaluation'") || !code.includes("app.put('/api/admin/projects/:projectId/evaluation'")) {
      throw new Error('Missing admin project evaluation endpoints in server.ts');
    }
  });

  // A30: Empty files payload rejection
  record('A30', 'Zero files payload is rejected by evaluateCriterion with failure feedback', () => {
    const def = DEFAULT_PROJECT_EVALUATION_DEFINITIONS['proj-guided-1'];
    const res = evaluateProjectSubmission('sub-empty', 'proj-guided-1', def, {});
    if (res.passed || res.score !== 0) {
      throw new Error(`Empty submission should score 0, got ${res.score}`);
    }
  });

  const total = results.length;
  const passed = results.filter(r => r.passed).length;
  const failed = total - passed;

  return { results, summary: { total, passed, failed } };
}

// Auto-run when executed
const { results, summary } = runPhase5c1Tests();
console.log(`\n=== PHASE 5C.1 VERIFICATION TEST MATRIX (${summary.passed}/${summary.total} PASSED) ===\n`);
for (const r of results) {
  console.log(`${r.passed ? '✓ PASS' : '✗ FAIL'} [${r.id}] ${r.name}`);
  if (r.error) {
    console.log(`       Error: ${r.error}`);
  }
}
if (summary.failed > 0) {
  process.exit(1);
}
