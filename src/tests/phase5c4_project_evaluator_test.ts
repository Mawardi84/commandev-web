import fs from 'fs';
import path from 'path';
import { 
  ProjectEvaluationDefinition, 
  EvaluationCriterion,
  ProjectSubmissionFiles,
  ProjectEvaluationResult,
  InternalCriterionResult
} from '../types/projectEvaluation';
import { 
  validateProjectEvaluationDefinition, 
  evaluateCriterion, 
  evaluateProjectSubmission,
  DEFAULT_PROJECT_EVALUATION_DEFINITIONS,
  ALLOWLISTED_RULES,
  evaluatorRegistry 
} from '../services/evaluation/projectEvaluator';
import { WebEvaluator } from '../services/evaluation/adapters/webEvaluator';
import { PythonEvaluator } from '../services/evaluation/adapters/pythonEvaluator';
import { ReactEvaluator } from '../services/evaluation/adapters/reactEvaluator';
import { BackendEvaluator } from '../services/evaluation/adapters/backendEvaluator';
import { FullstackEvaluator } from '../services/evaluation/adapters/fullstackEvaluator';

export function runPhase5C4Tests() {
  console.log('=== PHASE 5C.4 PROJECT EVALUATOR TEST MATRIX (E01 - E44) ===');
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

  // --- WEB EVALUATOR (E01 - E15) ---

  // E01: Valid Web project submission evaluates cleanly and correctly via WebEvaluator
  const webEvaluator = new WebEvaluator();
  const e01Files: ProjectSubmissionFiles = {
    html: '<article class="dev-card"><header><h1>Alex Developer</h1></header><img src="avatar.jpg" alt="Profile avatar" /></article>',
    css: '.dev-card { display: flex; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); } @media (max-width: 768px) { .dev-card { flex-direction: column; } }',
    js: 'const card = document.querySelector(".dev-card"); card.addEventListener("click", () => console.log("clicked"));'
  };
  const e01Def = DEFAULT_PROJECT_EVALUATION_DEFINITIONS['proj-guided-1'];
  const e01Result = evaluateProjectSubmission('sub-e01', 'proj-guided-1', e01Def, e01Files, 'web');
  assert(e01Result.score === 100 && e01Result.passed === true, 'E01', 'Valid Web project evaluates cleanly to 100% via WebEvaluator');

  // E02: HTML requiredTag correctly detects presence & minCount
  const e02Crit: EvaluationCriterion = {
    id: 'c-e02',
    title: 'Check HTML Section Tag',
    type: 'requiredTag',
    weight: 20,
    publicFeedback: 'Perlu elemen <section>.',
    privateConfig: { targetFile: 'html', rule: 'requiredTag', parameters: { tag: 'section', minCount: 2 } }
  };
  const e02Pass = webEvaluator.evaluate(e02Crit, { html: '<section>1</section><section>2</section>' });
  const e02Fail = webEvaluator.evaluate(e02Crit, { html: '<section>Only one</section>' });
  assert(e02Pass.passed === true && e02Fail.passed === false, 'E02', 'HTML requiredTag detects presence and minCount correctly');

  // E03: HTML requiredAttribute detects attribute and valuePattern
  const e03Crit: EvaluationCriterion = {
    id: 'c-e03',
    title: 'Check Image Alt',
    type: 'requiredAttribute',
    weight: 20,
    publicFeedback: 'Atribut alt harus ada.',
    privateConfig: { targetFile: 'html', rule: 'requiredAttribute', parameters: { tag: 'img', attribute: 'alt', valuePattern: 'profile' } }
  };
  const e03Pass = webEvaluator.evaluate(e03Crit, { html: '<img src="test.jpg" alt="user profile picture" />' });
  const e03Fail = webEvaluator.evaluate(e03Crit, { html: '<img src="test.jpg" />' });
  assert(e03Pass.passed === true && e03Fail.passed === false, 'E03', 'HTML requiredAttribute detects attribute and value pattern');

  // E04: HTML requiredText detects text
  const e04Crit: EvaluationCriterion = {
    id: 'c-e04',
    title: 'Check Heading Text',
    type: 'requiredText',
    weight: 15,
    publicFeedback: 'Teks CODERA harus ada.',
    privateConfig: { targetFile: 'html', rule: 'requiredText', parameters: { text: 'CODERA Academy' } }
  };
  const e04Pass = webEvaluator.evaluate(e04Crit, { html: '<h1>Welcome to CODERA Academy</h1>' });
  const e04Fail = webEvaluator.evaluate(e04Crit, { html: '<h1>Welcome to Other Platform</h1>' });
  assert(e04Pass.passed === true && e04Fail.passed === false, 'E04', 'HTML requiredText detects text accurately');

  // E05: HTML elementCount checks range
  const e05Crit: EvaluationCriterion = {
    id: 'c-e05',
    title: 'Check Div Count',
    type: 'elementCount',
    weight: 15,
    publicFeedback: 'Jumlah div antara 2 sampai 4.',
    privateConfig: { targetFile: 'html', rule: 'elementCount', parameters: { tag: 'div', minCount: 2, maxCount: 4 } }
  };
  const e05Pass = webEvaluator.evaluate(e05Crit, { html: '<div>1</div><div>2</div><div>3</div>' });
  const e05Fail = webEvaluator.evaluate(e05Crit, { html: '<div>1</div>' });
  assert(e05Pass.passed === true && e05Fail.passed === false, 'E05', 'HTML elementCount validates range');

  // E06: HTML semanticStructure detects semantic tags
  const e06Crit: EvaluationCriterion = {
    id: 'c-e06',
    title: 'Semantic Structure Check',
    type: 'semanticStructure',
    weight: 20,
    publicFeedback: 'Perlu header dan article.',
    privateConfig: { targetFile: 'html', rule: 'semanticStructure', parameters: { tags: ['header', 'article'] } }
  };
  const e06Pass = webEvaluator.evaluate(e06Crit, { html: '<header><nav></nav></header><article><p>Story</p></article>' });
  const e06Fail = webEvaluator.evaluate(e06Crit, { html: '<div><p>No semantic</p></div>' });
  assert(e06Pass.passed === true && e06Fail.passed === false, 'E06', 'HTML semanticStructure detects semantic elements');

  // E07: CSS requiredSelector detects selector presence
  const e07Crit: EvaluationCriterion = {
    id: 'c-e07',
    title: 'CSS Selector Check',
    type: 'requiredSelector',
    weight: 20,
    publicFeedback: 'Selector .dev-card harus ada.',
    privateConfig: { targetFile: 'css', rule: 'requiredSelector', parameters: { selector: '.dev-card' } }
  };
  const e07Pass = webEvaluator.evaluate(e07Crit, { css: '.dev-card { margin: 0; }' });
  const e07Fail = webEvaluator.evaluate(e07Crit, { css: '.profile-container { margin: 0; }' });
  assert(e07Pass.passed === true && e07Fail.passed === false, 'E07', 'CSS requiredSelector validates selector presence');

  // E08: CSS requiredProperty & requiredPropertyValue
  const e08Crit: EvaluationCriterion = {
    id: 'c-e08',
    title: 'CSS Border Radius Check',
    type: 'requiredProperty',
    weight: 20,
    publicFeedback: 'Properti border-radius harus ada.',
    privateConfig: { targetFile: 'css', rule: 'requiredProperty', parameters: { property: 'border-radius', valuePattern: '12px|1rem' } }
  };
  const e08Pass = webEvaluator.evaluate(e08Crit, { css: '.card { border-radius: 12px; }' });
  const e08Fail = webEvaluator.evaluate(e08Crit, { css: '.card { color: red; }' });
  assert(e08Pass.passed === true && e08Fail.passed === false, 'E08', 'CSS requiredProperty validates property & value');

  // E09: CSS mediaQuery detects @media queries
  const e09Crit: EvaluationCriterion = {
    id: 'c-e09',
    title: 'CSS Media Query Check',
    type: 'mediaQuery',
    weight: 15,
    publicFeedback: 'Media query max-width harus ada.',
    privateConfig: { targetFile: 'css', rule: 'mediaQuery', parameters: { queryPattern: 'max-width' } }
  };
  const e09Pass = webEvaluator.evaluate(e09Crit, { css: '@media (max-width: 600px) { body { font-size: 14px; } }' });
  const e09Fail = webEvaluator.evaluate(e09Crit, { css: 'body { font-size: 16px; }' });
  assert(e09Pass.passed === true && e09Fail.passed === false, 'E09', 'CSS mediaQuery detects media query blocks');

  // E10: CSS layoutRule detects flex / grid
  const e10Crit: EvaluationCriterion = {
    id: 'c-e10',
    title: 'CSS Flexbox Layout Check',
    type: 'layoutRule',
    weight: 20,
    publicFeedback: 'Gunakan layout flex.',
    privateConfig: { targetFile: 'css', rule: 'layoutRule', parameters: { displayType: 'flex' } }
  };
  const e10Pass = webEvaluator.evaluate(e10Crit, { css: '.container { display: flex; gap: 10px; }' });
  const e10Fail = webEvaluator.evaluate(e10Crit, { css: '.container { display: block; }' });
  assert(e10Pass.passed === true && e10Fail.passed === false, 'E10', 'CSS layoutRule validates flex/grid display');

  // E11: JS requiredFunction detects named & arrow functions
  const e11Crit: EvaluationCriterion = {
    id: 'c-e11',
    title: 'JS Function Check',
    type: 'requiredFunction',
    weight: 20,
    publicFeedback: 'Fungsi calculateTotal harus didefinisikan.',
    privateConfig: { targetFile: 'js', rule: 'requiredFunction', parameters: { functionName: 'calculateTotal' } }
  };
  const e11Pass = webEvaluator.evaluate(e11Crit, { js: 'const calculateTotal = (items) => items.reduce((a, b) => a + b, 0);' });
  const e11Fail = webEvaluator.evaluate(e11Crit, { js: 'function compute() { return 0; }' });
  assert(e11Pass.passed === true && e11Fail.passed === false, 'E11', 'JS requiredFunction detects named and arrow function declarations');

  // E12: JS requiredIdentifier detects identifiers
  const e12Crit: EvaluationCriterion = {
    id: 'c-e12',
    title: 'JS Identifier Check',
    type: 'requiredIdentifier',
    weight: 15,
    publicFeedback: 'Identifier taskList harus ada.',
    privateConfig: { targetFile: 'js', rule: 'requiredIdentifier', parameters: { identifier: 'taskList' } }
  };
  const e12Pass = webEvaluator.evaluate(e12Crit, { js: 'const taskList = [];' });
  const e12Fail = webEvaluator.evaluate(e12Crit, { js: 'const items = [];' });
  assert(e12Pass.passed === true && e12Fail.passed === false, 'E12', 'JS requiredIdentifier detects variable/identifier names');

  // E13: JS requiredCall detects callee invocations
  const e13Crit: EvaluationCriterion = {
    id: 'c-e13',
    title: 'JS Call Check',
    type: 'requiredCall',
    weight: 15,
    publicFeedback: 'Panggil renderTasks().',
    privateConfig: { targetFile: 'js', rule: 'requiredCall', parameters: { callee: 'renderTasks' } }
  };
  const e13Pass = webEvaluator.evaluate(e13Crit, { js: 'function init() { renderTasks(); }' });
  const e13Fail = webEvaluator.evaluate(e13Crit, { js: 'function init() { display(); }' });
  assert(e13Pass.passed === true && e13Fail.passed === false, 'E13', 'JS requiredCall detects function invocations');

  // E14: JS requiredEventListener detects event bindings
  const e14Crit: EvaluationCriterion = {
    id: 'c-e14',
    title: 'JS Event Listener Check',
    type: 'requiredEventListener',
    weight: 20,
    publicFeedback: 'Event click listener harus ada.',
    privateConfig: { targetFile: 'js', rule: 'requiredEventListener', parameters: { eventType: 'click' } }
  };
  const e14Pass = webEvaluator.evaluate(e14Crit, { js: 'btn.addEventListener("click", handleClick);' });
  const e14Fail = webEvaluator.evaluate(e14Crit, { js: 'btn.focus();' });
  assert(e14Pass.passed === true && e14Fail.passed === false, 'E14', 'JS requiredEventListener detects event handlers');

  // E15: JS syntaxPattern / regex evaluates syntax patterns
  const e15Crit: EvaluationCriterion = {
    id: 'c-e15',
    title: 'JS Syntax Pattern Check',
    type: 'syntaxPattern',
    weight: 15,
    publicFeedback: 'Gunakan destructuring atau arrow function.',
    privateConfig: { targetFile: 'js', rule: 'syntaxPattern', parameters: { pattern: 'const\\s*\\{[^}]+\\}' } }
  };
  const e15Pass = webEvaluator.evaluate(e15Crit, { js: 'const { title, xp } = project;' });
  const e15Fail = webEvaluator.evaluate(e15Crit, { js: 'const title = project.title;' });
  assert(e15Pass.passed === true && e15Fail.passed === false, 'E15', 'JS syntaxPattern checks pattern declarations');

  // --- PYTHON EVALUATOR (E16 - E24) ---

  // E16: Valid Python project submission evaluates cleanly via PythonEvaluator
  const pythonEvaluator = new PythonEvaluator();
  const e16Files: ProjectSubmissionFiles = {
    py: `class ExpenseManager:
    def __init__(self):
        self.expenses = []

    def add_expense(self, title, amount):
        if amount <= 0:
            raise ValueError("Nominal harus positif")
        self.expenses.append({"title": title, "amount": amount})

    def get_total(self):
        return sum(e["amount"] for e in self.expenses)

    def summary(self):
        return f"Total: {self.get_total()}"`
  };
  const e16Def = DEFAULT_PROJECT_EVALUATION_DEFINITIONS['proj-challenge-1'];
  const e16Result = evaluateProjectSubmission('sub-e16', 'proj-challenge-1', e16Def, e16Files, 'python');
  assert(e16Result.score === 100 && e16Result.passed === true, 'E16', 'Valid Python project evaluates to 100% via PythonEvaluator');

  // E17: Python requiredFunction detects def func_name(
  const e17Crit: EvaluationCriterion = {
    id: 'c-e17',
    title: 'Python def check',
    type: 'requiredFunction',
    weight: 25,
    publicFeedback: 'Fungsi process_data harus didefinisikan.',
    privateConfig: { targetFile: 'py', rule: 'requiredFunction', parameters: { functionName: 'process_data' } }
  };
  const e17Pass = pythonEvaluator.evaluate(e17Crit, { py: 'def process_data(items):\n    return [x * 2 for x in items]' });
  const e17Fail = pythonEvaluator.evaluate(e17Crit, { py: 'def compute(items):\n    return items' });
  assert(e17Pass.passed === true && e17Fail.passed === false, 'E17', 'Python requiredFunction detects def declarations');

  // E18: Python requiredClass detects class ClassName
  const e18Crit: EvaluationCriterion = {
    id: 'c-e18',
    title: 'Python Class Check',
    type: 'requiredClass',
    weight: 25,
    publicFeedback: 'Class TaskManager harus didefinisikan.',
    privateConfig: { targetFile: 'py', rule: 'requiredClass', parameters: { className: 'TaskManager' } }
  };
  const e18Pass = pythonEvaluator.evaluate(e18Crit, { py: 'class TaskManager:\n    def __init__(self):\n        pass' });
  const e18Fail = pythonEvaluator.evaluate(e18Crit, { py: 'class ItemManager:\n    pass' });
  assert(e18Pass.passed === true && e18Fail.passed === false, 'E18', 'Python requiredClass detects class statements');

  // E19: Python requiredImport detects imports
  const e19Crit: EvaluationCriterion = {
    id: 'c-e19',
    title: 'Python Import Check',
    type: 'requiredImport',
    weight: 20,
    publicFeedback: 'Import datetime modul.',
    privateConfig: { targetFile: 'py', rule: 'requiredImport', parameters: { moduleName: 'datetime' } }
  };
  const e19Pass = pythonEvaluator.evaluate(e19Crit, { py: 'from datetime import datetime, timezone\nnow = datetime.now()' });
  const e19Fail = pythonEvaluator.evaluate(e19Crit, { py: 'import math\nprint(math.pi)' });
  assert(e19Pass.passed === true && e19Fail.passed === false, 'E19', 'Python requiredImport validates module imports');

  // E20: Python requiredIdentifier detects identifiers
  const e20Crit: EvaluationCriterion = {
    id: 'c-e20',
    title: 'Python Identifier Check',
    type: 'requiredIdentifier',
    weight: 15,
    publicFeedback: 'Identifier transaction_log harus ada.',
    privateConfig: { targetFile: 'py', rule: 'requiredIdentifier', parameters: { identifier: 'transaction_log' } }
  };
  const e20Pass = pythonEvaluator.evaluate(e20Crit, { py: 'transaction_log = []' });
  const e20Fail = pythonEvaluator.evaluate(e20Crit, { py: 'logs = []' });
  assert(e20Pass.passed === true && e20Fail.passed === false, 'E20', 'Python requiredIdentifier checks identifier presence');

  // E21: Python astNode detects constructs (def, class, try, if, raise, return)
  const e21Crit: EvaluationCriterion = {
    id: 'c-e21',
    title: 'Python Raise Construct Check',
    type: 'astNode',
    weight: 20,
    publicFeedback: 'Gunakan raise untuk melempar exception.',
    privateConfig: { targetFile: 'py', rule: 'astNode', parameters: { constructType: 'raise' } }
  };
  const e21Pass = pythonEvaluator.evaluate(e21Crit, { py: 'if val < 0:\n    raise ValueError("Invalid")' });
  const e21Fail = pythonEvaluator.evaluate(e21Crit, { py: 'if val < 0:\n    print("Invalid")' });
  assert(e21Pass.passed === true && e21Fail.passed === false, 'E21', 'Python astNode detects required syntax constructs');

  // E22: Python forbiddenConstruct detects dangerous patterns
  const e22Crit: EvaluationCriterion = {
    id: 'c-e22',
    title: 'Python Safety Check',
    type: 'forbiddenConstruct',
    weight: 25,
    publicFeedback: 'Dilarang menggunakan fungsi berbahaya seperti eval atau subprocess.',
    privateConfig: { targetFile: 'py', rule: 'forbiddenConstruct' }
  };
  const e22Dangerous = pythonEvaluator.evaluate(e22Crit, { py: 'import subprocess\nsubprocess.run(["ls"])' });
  const e22Safe = pythonEvaluator.evaluate(e22Crit, { py: 'def compute(a, b):\n    return a + b' });
  assert(e22Dangerous.passed === false && e22Safe.passed === true, 'E22', 'Python forbiddenConstruct blocks dangerous patterns');

  // E23: Python comment / docstring false-positive prevention
  const e23CodeWithComment = `# Catatan: jangan gunakan eval() atau subprocess\ndef safe_add(a, b):\n    """Fungsi ini tidak menggunakan os.system"""\n    return a + b`;
  const e23CommentCheck = pythonEvaluator.evaluate(e22Crit, { py: e23CodeWithComment });
  assert(e23CommentCheck.passed === true, 'E23', 'Python comments and docstrings do not trigger false-positive construct blocks');

  // E24: Python evaluation executes zero dynamic Python code
  const pythonEvaluatorSource = fs.readFileSync(path.join(process.cwd(), 'src/services/evaluation/adapters/pythonEvaluator.ts'), 'utf8');
  const zeroPythonExec = !/import\s+.*child_process|require\(.*child_process\)|new\s+Function\(|\beval\s*\(/.test(pythonEvaluatorSource);
  assert(zeroPythonExec, 'E24', 'PythonEvaluator adapter contains zero dynamic Python executions');

  // --- REACT EVALUATOR (E25 - E31) ---

  // E25: Valid React project evaluates cleanly via ReactEvaluator
  const reactEvaluator = new ReactEvaluator();
  const e25Files: ProjectSubmissionFiles = {
    html: '<div id="kanban-app"><div class="board"><div class="colTodo"></div><div class="colProgress"></div><div class="colDone"></div></div></div>',
    css: '.board { display: grid; grid-template-columns: repeat(3, 1fr); border-radius: 8px; }',
    js: `function KanbanBoard() {
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
    }`
  };
  const e25Def = DEFAULT_PROJECT_EVALUATION_DEFINITIONS['proj-react-kanban'];
  const e25Result = evaluateProjectSubmission('sub-e25', 'proj-react-kanban', e25Def, e25Files, 'react');
  assert(e25Result.score === 100 && e25Result.passed === true, 'E25', 'Valid React project evaluates cleanly to 100% via ReactEvaluator');

  // E26: React requiredComponent detects functional/class components
  const e26Crit: EvaluationCriterion = {
    id: 'c-e26',
    title: 'React KanbanBoard Component',
    type: 'requiredComponent',
    weight: 25,
    publicFeedback: 'Komponen KanbanBoard harus dideklarasikan.',
    privateConfig: { targetFile: 'js', rule: 'requiredComponent', parameters: { componentName: 'KanbanBoard' } }
  };
  const e26Pass = reactEvaluator.evaluate(e26Crit, { js: 'function KanbanBoard() { return <div>Board</div>; }' });
  const e26Fail = reactEvaluator.evaluate(e26Crit, { js: 'function SimpleList() { return <ul></ul>; }' });
  assert(e26Pass.passed === true && e26Fail.passed === false, 'E26', 'React requiredComponent detects component declarations');

  // E27: React requiredHook detects useState/useEffect hook usages
  const e27Crit: EvaluationCriterion = {
    id: 'c-e27',
    title: 'React useState Hook',
    type: 'requiredHook',
    weight: 25,
    publicFeedback: 'Gunakan hook useState.',
    privateConfig: { targetFile: 'js', rule: 'requiredHook', parameters: { hookName: 'useState' } }
  };
  const e27Pass = reactEvaluator.evaluate(e27Crit, { js: 'const [items, setItems] = useState([]);' });
  const e27Fail = reactEvaluator.evaluate(e27Crit, { js: 'let items = [];' });
  assert(e27Pass.passed === true && e27Fail.passed === false, 'E27', 'React requiredHook detects React hook invocations');

  // E28: React requiredJSX detects JSX tags
  const e28Crit: EvaluationCriterion = {
    id: 'c-e28',
    title: 'React JSX Tag Check',
    type: 'requiredJSX',
    weight: 20,
    publicFeedback: 'Sertakan elemen JSX <KanbanColumn>.',
    privateConfig: { targetFile: 'js', rule: 'requiredJSX', parameters: { tag: 'KanbanColumn' } }
  };
  const e28Pass = reactEvaluator.evaluate(e28Crit, { js: 'return <KanbanColumn title="Todo" />;' });
  const e28Fail = reactEvaluator.evaluate(e28Crit, { js: 'return <div>No column</div>;' });
  assert(e28Pass.passed === true && e28Fail.passed === false, 'E28', 'React requiredJSX detects JSX structure');

  // E29: React requiredEventHandler detects event props
  const e29Crit: EvaluationCriterion = {
    id: 'c-e29',
    title: 'React Event Handler Check',
    type: 'requiredEventHandler',
    weight: 20,
    publicFeedback: 'Sertakan onClick event handler.',
    privateConfig: { targetFile: 'js', rule: 'requiredEventHandler', parameters: { eventType: 'click' } }
  };
  const e29Pass = reactEvaluator.evaluate(e29Crit, { js: '<button onClick={handleClick}>Submit</button>' });
  const e29Fail = reactEvaluator.evaluate(e29Crit, { js: '<button className="btn">Submit</button>' });
  assert(e29Pass.passed === true && e29Fail.passed === false, 'E29', 'React requiredEventHandler detects event prop bindings');

  // E30: React requiredStateIdentifier detects state variable
  const e30Crit: EvaluationCriterion = {
    id: 'c-e30',
    title: 'React State Identifier Check',
    type: 'requiredStateIdentifier',
    weight: 20,
    publicFeedback: 'State tasks harus dideklarasikan.',
    privateConfig: { targetFile: 'js', rule: 'requiredStateIdentifier', parameters: { stateName: 'tasks' } }
  };
  const e30Pass = reactEvaluator.evaluate(e30Crit, { js: 'const [tasks, setTasks] = useState([]);' });
  const e30Fail = reactEvaluator.evaluate(e30Crit, { js: 'const [count, setCount] = useState(0);' });
  assert(e30Pass.passed === true && e30Fail.passed === false, 'E30', 'React requiredStateIdentifier validates state variable names');

  // E31: React evaluation executes zero runtime React code
  const reactEvaluatorSource = fs.readFileSync(path.join(process.cwd(), 'src/services/evaluation/adapters/reactEvaluator.ts'), 'utf8');
  const zeroReactExec = !/renderToString|render\(|createRoot|ReactDOMServer|eval\(/.test(reactEvaluatorSource);
  assert(zeroReactExec, 'E31', 'ReactEvaluator performs pure static inspection without rendering or server execution');

  // --- BACKEND EVALUATOR (E32 - E40) ---

  // E32: Valid Backend project evaluates cleanly via BackendEvaluator
  const backendEvaluator = new BackendEvaluator();
  const e32Files: ProjectSubmissionFiles = {
    py: `class UserAuthService:
    def __init__(self):
        self.users = {}
        self.tokens = {}

    def register(self, email, password):
        if email in self.users:
            raise ValueError("User sudah terdaftar")
        self.users[email] = password
        return {"status": "created", "email": email}

    def login(self, email, password):
        if self.users.get(email) != password:
            raise PermissionError("Kredensial tidak sah")
        token = f"jwt_{email}_token"
        self.tokens[token] = email
        return {"token": token}

    def verify_token(self, token):
        if token not in self.tokens:
            raise PermissionError("Token expired")
        return self.tokens[token]`
  };
  const e32Def = DEFAULT_PROJECT_EVALUATION_DEFINITIONS['proj-backend-api'];
  const e32Result = evaluateProjectSubmission('sub-e32', 'proj-backend-api', e32Def, e32Files, 'backend');
  assert(e32Result.score === 100 && e32Result.passed === true, 'E32', 'Valid Backend project evaluates to 100% via BackendEvaluator');

  // E33: Backend requiredRoute detects route endpoints
  const e33Crit: EvaluationCriterion = {
    id: 'c-e33',
    title: 'Backend Route Check',
    type: 'requiredRoute',
    weight: 25,
    publicFeedback: 'Rute /api/auth/login harus ada.',
    privateConfig: { targetFile: 'py', rule: 'requiredRoute', parameters: { routeName: '/api/auth/login' } }
  };
  const e33Pass = backendEvaluator.evaluate(e33Crit, { py: '@app.post("/api/auth/login")\ndef login_endpoint(): pass' });
  const e33Fail = backendEvaluator.evaluate(e33Crit, { py: '@app.get("/api/items")\ndef get_items(): pass' });
  assert(e33Pass.passed === true && e33Fail.passed === false, 'E33', 'Backend requiredRoute detects route handlers');

  // E34: Backend requiredController detects controller classes/methods
  const e34Crit: EvaluationCriterion = {
    id: 'c-e34',
    title: 'Backend Controller Check',
    type: 'requiredController',
    weight: 25,
    publicFeedback: 'Controller UserAuthService harus ada.',
    privateConfig: { targetFile: 'py', rule: 'requiredController', parameters: { className: 'UserAuthService' } }
  };
  const e34Pass = backendEvaluator.evaluate(e34Crit, { py: 'class UserAuthService:\n    def authenticate(self): pass' });
  const e34Fail = backendEvaluator.evaluate(e34Crit, { py: 'class PaymentService:\n    pass' });
  assert(e34Pass.passed === true && e34Fail.passed === false, 'E34', 'Backend requiredController detects controller definitions');

  // E35: Backend requiredHttpMethod detects HTTP methods
  const e35Crit: EvaluationCriterion = {
    id: 'c-e35',
    title: 'Backend HTTP Method Check',
    type: 'requiredHttpMethod',
    weight: 20,
    publicFeedback: 'Metode POST harus didukung.',
    privateConfig: { targetFile: 'py', rule: 'requiredHttpMethod', parameters: { httpMethod: 'POST' } }
  };
  const e35Pass = backendEvaluator.evaluate(e35Crit, { py: '@app.post("/api/register")\ndef register(): pass' });
  const e35Fail = backendEvaluator.evaluate(e35Crit, { py: 'def do_nothing(): pass' });
  assert(e35Pass.passed === true && e35Fail.passed === false, 'E35', 'Backend requiredHttpMethod detects HTTP methods');

  // E36: Backend requiredValidation detects validation logic
  const e36Crit: EvaluationCriterion = {
    id: 'c-e36',
    title: 'Backend Validation Logic Check',
    type: 'requiredValidation',
    weight: 20,
    publicFeedback: 'Gunakan validasi atau ValueError.',
    privateConfig: { targetFile: 'py', rule: 'requiredValidation' }
  };
  const e36Pass = backendEvaluator.evaluate(e36Crit, { py: 'if not email:\n    raise ValueError("Email required")' });
  const e36Fail = backendEvaluator.evaluate(e36Crit, { py: 'email = "test@example.com"' });
  assert(e36Pass.passed === true && e36Fail.passed === false, 'E36', 'Backend requiredValidation detects validation and error raising');

  // E37: Backend requiredResponseStructure detects response payloads
  const e37Crit: EvaluationCriterion = {
    id: 'c-e37',
    title: 'Backend Response Structure Check',
    type: 'requiredResponseStructure',
    weight: 20,
    publicFeedback: 'Kembalikan format response dictionary/json.',
    privateConfig: { targetFile: 'py', rule: 'requiredResponseStructure' }
  };
  const e37Pass = backendEvaluator.evaluate(e37Crit, { py: 'def get_data():\n    return {"status": 200, "data": []}' });
  const e37Fail = backendEvaluator.evaluate(e37Crit, { py: 'def compute():\n    pass' });
  assert(e37Pass.passed === true && e37Fail.passed === false, 'E37', 'Backend requiredResponseStructure detects structured responses');

  // E38: Backend requiredAuthMiddleware detects token guards
  const e38Crit: EvaluationCriterion = {
    id: 'c-e38',
    title: 'Backend Auth Middleware Check',
    type: 'requiredAuthMiddleware',
    weight: 20,
    publicFeedback: 'Mekanisme auth token guard harus ada.',
    privateConfig: { targetFile: 'py', rule: 'requiredAuthMiddleware' }
  };
  const e38Pass = backendEvaluator.evaluate(e38Crit, { py: 'def verify_token(token):\n    return tokens.get(token)' });
  const e38Fail = backendEvaluator.evaluate(e38Crit, { py: 'def print_msg(): print("hi")' });
  assert(e38Pass.passed === true && e38Fail.passed === false, 'E38', 'Backend requiredAuthMiddleware detects auth tokens and guards');

  // E39: Backend forbiddenConstruct detects dangerous execution
  const e39Crit: EvaluationCriterion = {
    id: 'c-e39',
    title: 'Backend Safety Check',
    type: 'forbiddenConstruct',
    weight: 25,
    publicFeedback: 'Operasi sistem berbahaya dilarang.',
    privateConfig: { targetFile: 'py', rule: 'forbiddenConstruct' }
  };
  const e39Dangerous = backendEvaluator.evaluate(e39Crit, { py: 'import os\nos.system("rm -rf /")' });
  const e39Safe = backendEvaluator.evaluate(e39Crit, { py: 'def clean(): pass' });
  assert(e39Dangerous.passed === false && e39Safe.passed === true, 'E39', 'Backend forbiddenConstruct blocks shell and process execution');

  // E40: Backend evaluation spawns zero server processes and binds zero ports
  const backendEvaluatorSource = fs.readFileSync(path.join(process.cwd(), 'src/services/evaluation/adapters/backendEvaluator.ts'), 'utf8');
  const zeroBackendSpawning = !/import\s+.*child_process|require\(.*child_process\)|new\s+Function\(|\beval\s*\(|\.listen\(/.test(backendEvaluatorSource);
  assert(zeroBackendSpawning, 'E40', 'BackendEvaluator executes zero server processes and opens zero network ports');

  // --- FULLSTACK & GENERAL ARCHITECTURE (E41 - E44) ---

  // E41: FullstackEvaluator evaluates multi-file relationships
  const fullstackEvaluator = new FullstackEvaluator();
  const e41Files: ProjectSubmissionFiles = {
    html: '<div class="catalog-grid"><div class="course-card"><h2>Fullstack JS</h2><button id="enrollBtn">Enroll</button></div></div>',
    css: '.catalog-grid { display: grid; grid-template-columns: repeat(2, 1fr); border-radius: 8px; }',
    js: `const enrollBtn = document.getElementById('enrollBtn');
enrollBtn.addEventListener('click', async () => {
  const res = await fetch('/api/enroll', { method: 'POST' });
  const data = await res.json();
  console.log("Enrolled status:", data.status);
});`
  };
  const e41Def = DEFAULT_PROJECT_EVALUATION_DEFINITIONS['proj-fullstack-lms'];
  const e41Result = evaluateProjectSubmission('sub-e41', 'proj-fullstack-lms', e41Def, e41Files, 'fullstack');
  assert(e41Result.score === 100 && e41Result.passed === true, 'E41', 'FullstackEvaluator evaluates multi-file integration cleanly');

  // E42: EvaluatorRegistry allows allowlisted adapters only and prevents dynamic DB imports
  const regWeb = evaluatorRegistry.getAdapter('web');
  const regPy = evaluatorRegistry.getAdapter('python');
  const regReact = evaluatorRegistry.getAdapter('react');
  const regBackend = evaluatorRegistry.getAdapter('backend');
  const regFullstack = evaluatorRegistry.getAdapter('fullstack');
  assert(
    regWeb instanceof WebEvaluator &&
    regPy instanceof PythonEvaluator &&
    regReact instanceof ReactEvaluator &&
    regBackend instanceof BackendEvaluator &&
    regFullstack instanceof FullstackEvaluator,
    'E42',
    'EvaluatorRegistry maps all 5 evaluator families to statically pre-instantiated adapters'
  );

  // E43: Weighted scoring & threshold calculation is deterministic and normalized (0-100)
  const e43Def: ProjectEvaluationDefinition = {
    projectId: 'test-calc',
    version: 1,
    passingScore: 75,
    status: 'published',
    updatedAt: new Date().toISOString(),
    criteria: [
      { id: 'c1', title: 'Part 1', type: 'requiredText', weight: 40, publicFeedback: 'Must have A', privateConfig: { targetFile: 'html', rule: 'requiredText', parameters: { text: 'A' } } },
      { id: 'c2', title: 'Part 2', type: 'requiredText', weight: 60, publicFeedback: 'Must have B', privateConfig: { targetFile: 'html', rule: 'requiredText', parameters: { text: 'B' } } }
    ]
  };
  // Passes c1 (40 weight), fails c2 (60 weight) => score = 40%, passingScore = 75% => passed = false
  const e43ResultFail = evaluateProjectSubmission('sub-e43-fail', 'test-calc', e43Def, { html: 'A only' }, 'web');
  // Passes both (100 weight) => score = 100%, passed = true
  const e43ResultPass = evaluateProjectSubmission('sub-e43-pass', 'test-calc', e43Def, { html: 'A and B' }, 'web');
  assert(
    e43ResultFail.score === 40 && e43ResultFail.passed === false &&
    e43ResultPass.score === 100 && e43ResultPass.passed === true,
    'E43',
    'Weighted scoring and pass threshold calculation are mathematically deterministic and normalized 0-100'
  );

  // E44: Sanitization guarantees zero leakage of privateConfig, internal diagnostic reasons, regexes, or parser internals
  const sanitizedResults = e43ResultPass.criteriaResults;
  let hasLeak = false;
  for (const cr of sanitizedResults) {
    if ((cr as any).privateConfig !== undefined || (cr as any).diagnosticReason !== undefined || (cr as any).parameters !== undefined) {
      hasLeak = true;
    }
  }
  assert(!hasLeak, 'E44', 'Sanitized result guarantees zero leakage of privateConfig, parameters, or diagnostic reasons');

  console.log(`\n=== RESULTS: ${passedCount} PASSED / ${failedCount} FAILED ===`);
  if (failedCount > 0) {
    throw new Error(`Test suite failed with ${failedCount} failures.`);
  }
}

// Auto-run if executed directly
if (process.argv[1] && process.argv[1].includes('phase5c4_project_evaluator_test')) {
  runPhase5C4Tests();
}
