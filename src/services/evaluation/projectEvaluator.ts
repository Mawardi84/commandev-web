import { 
  ProjectEvaluationDefinition, 
  ProjectSubmissionFiles, 
  ProjectEvaluationResult, 
  ProjectCriterionResult, 
  EvaluationCriterion,
  EvaluationValidationResult,
  EvaluationRuleType,
  EvaluatorFamily,
  InternalCriterionResult
} from '../../types/projectEvaluation';
import { evaluatorRegistry } from './adapters/registry';

export { evaluatorRegistry };

/**
 * Allowlist of supported declarative evaluation rule types across all adapter families
 */
export const ALLOWLISTED_RULES: EvaluationRuleType[] = [
  // HTML Rule Family
  'requiredTag',
  'requiredAttribute',
  'requiredText',
  'elementCount',
  'semanticStructure',
  // CSS Rule Family
  'requiredSelector',
  'requiredProperty',
  'requiredPropertyValue',
  'mediaQuery',
  'layoutRule',
  // JavaScript Rule Family
  'requiredFunction',
  'requiredIdentifier',
  'requiredCall',
  'requiredEventListener',
  'syntaxPattern',
  // Python Rule Family
  'requiredClass',
  'requiredImport',
  'astNode',
  'forbiddenConstruct',
  // React Rule Family
  'requiredComponent',
  'requiredHook',
  'requiredJSX',
  'requiredEventHandler',
  'requiredStateIdentifier',
  'componentRelationship',
  // Backend Rule Family
  'requiredRoute',
  'requiredController',
  'requiredHttpMethod',
  'requiredValidation',
  'requiredResponseStructure',
  'requiredAuthMiddleware',
  // Fullstack Rule Family
  'frontendApiReference',
  'backendEndpointExists',
  'dataModelExists',
  'authReferenceExists',
  'frontendComponentExists',
  // General Rule Family
  'requiredFile',
  'forbiddenPattern',
  'sourceLength',
  'fileContains',
  'fileDoesNotContain',
  // Backward-compatibility aliases from Phase 5C.1 & 5C.2
  'html_structure',
  'css_style',
  'js_syntax',
  'py_ast',
  'file_presence',
  'regex_pattern',
  'forbidden_construct',
  'custom_declarative'
];

/**
 * Validates a ProjectEvaluationDefinition schema and rules at runtime.
 * Guarantees zero executable strings, no functions, valid weights, unique IDs, and valid thresholds.
 */
export function validateProjectEvaluationDefinition(def: any): EvaluationValidationResult {
  const errors: string[] = [];

  if (!def || typeof def !== 'object' || Array.isArray(def)) {
    return { valid: false, errors: ['Evaluation definition must be a valid non-empty object.'] };
  }

  // 1. Validate projectId
  if (!def.projectId || typeof def.projectId !== 'string' || def.projectId.trim().length === 0) {
    errors.push('Missing or invalid projectId.');
  }

  // 2. Validate version
  const version = Number(def.version);
  if (!Number.isInteger(version) || version < 1) {
    errors.push('Version must be an integer greater than or equal to 1.');
  }

  // 3. Validate status
  if (def.status !== 'draft' && def.status !== 'published') {
    errors.push("Status must be either 'draft' or 'published'.");
  }

  // 4. Validate passingScore
  const passingScore = Number(def.passingScore);
  if (isNaN(passingScore) || !Number.isFinite(passingScore) || passingScore < 1 || passingScore > 100) {
    errors.push('Passing score must be a finite number between 1 and 100.');
  }

  // 5. Validate criteria array
  if (!Array.isArray(def.criteria) || def.criteria.length === 0) {
    errors.push('Criteria must be a non-empty array.');
    return { valid: false, errors };
  }

  const seenIds = new Set<string>();
  let totalWeight = 0;

  for (let i = 0; i < def.criteria.length; i++) {
    const c = def.criteria[i];
    const prefix = `Criterion [${i + 1}]`;

    if (!c || typeof c !== 'object') {
      errors.push(`${prefix}: Must be a valid object.`);
      continue;
    }

    // Criterion ID
    if (!c.id || typeof c.id !== 'string' || c.id.trim().length === 0) {
      errors.push(`${prefix}: ID is required and must be a non-empty string.`);
    } else {
      const trimmedId = c.id.trim();
      if (seenIds.has(trimmedId)) {
        errors.push(`${prefix}: Duplicate criterion ID '${trimmedId}'. IDs must be unique.`);
      }
      seenIds.add(trimmedId);
    }

    // Title
    if (!c.title || typeof c.title !== 'string' || c.title.trim().length < 2) {
      errors.push(`${prefix}: Title must be at least 2 characters long.`);
    }

    // Weight
    const weight = Number(c.weight);
    if (isNaN(weight) || !Number.isFinite(weight) || weight <= 0) {
      errors.push(`${prefix}: Weight must be a positive finite number greater than 0.`);
    } else {
      totalWeight += weight;
    }

    // Public Feedback
    if (!c.publicFeedback || typeof c.publicFeedback !== 'string' || c.publicFeedback.trim().length === 0) {
      errors.push(`${prefix}: Public feedback is required.`);
    }

    // Type / Rule allowlist check
    const ruleType = c.privateConfig?.rule || c.type;
    if (!ruleType || !ALLOWLISTED_RULES.includes(ruleType)) {
      errors.push(`${prefix}: Unknown or disallowed rule type '${ruleType}'.`);
    }

    // Private Config validation
    if (!c.privateConfig || typeof c.privateConfig !== 'object') {
      errors.push(`${prefix}: privateConfig must be an object.`);
    } else {
      const cfg = c.privateConfig;
      const target = cfg.targetFile || 'html';
      if (!['html', 'css', 'js', 'py'].includes(target)) {
        errors.push(`${prefix}: Target file '${target}' is invalid. Allowed: html, css, js, py.`);
      }

      // Security: Disallow executable strings or functions in config / parameters
      const cfgStr = JSON.stringify(cfg);
      if (/eval\s*\(|new\s+Function|__proto__|constructor|function\s*\(|=>/.test(cfgStr)) {
        errors.push(`${prefix}: privateConfig contains forbidden executable patterns or script injections.`);
      }
    }
  }

  if (totalWeight <= 0) {
    errors.push('Total criteria weight must be greater than 0.');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Safely evaluates a single declarative criterion against submitted files using the appropriate adapter.
 * Zero dynamic code execution (no eval, no new Function, no child_process).
 */
export function evaluateCriterion(
  criterion: EvaluationCriterion,
  files: ProjectSubmissionFiles,
  projectFamily?: EvaluatorFamily
): { passed: boolean; feedback: string } {
  try {
    const adapter = evaluatorRegistry.resolveAdapter(criterion, projectFamily);
    const internalRes: InternalCriterionResult = adapter.evaluate(criterion, files);

    // Sanitize and return public interface
    return {
      passed: internalRes.passed,
      feedback: internalRes.feedback
    };
  } catch (err) {
    // Parser / Evaluation Safety: Never crash and never leak parser internals
    return {
      passed: false,
      feedback: criterion.publicFeedback || 'Kriteria belum terpenuhi.'
    };
  }
}

/**
 * Evaluates a complete project submission against an evaluation definition.
 * Normalizes scores, computes pass threshold, and returns a strictly sanitized evaluation result.
 */
export function evaluateProjectSubmission(
  submissionId: string,
  projectId: string,
  definition: ProjectEvaluationDefinition,
  files: ProjectSubmissionFiles,
  projectFamily?: EvaluatorFamily
): ProjectEvaluationResult {
  const criteria = definition.criteria || [];
  let totalWeight = 0;
  let earnedWeight = 0;

  const criteriaResults: ProjectCriterionResult[] = [];

  for (const criterion of criteria) {
    const weight = Number(criterion.weight) || 10;
    totalWeight += weight;

    try {
      const adapter = evaluatorRegistry.resolveAdapter(criterion, projectFamily);
      const internalRes = adapter.evaluate(criterion, files);

      if (internalRes.passed) {
        earnedWeight += weight;
      }

      // STRICT PRIVACY: Only public fields are serialized.
      // Never leak privateConfig, diagnosticReason, matcher regexes, or parser internals!
      criteriaResults.push({
        id: criterion.id,
        criterionId: criterion.id,
        title: criterion.title,
        passed: internalRes.passed,
        feedback: internalRes.feedback,
        weight
      });
    } catch {
      criteriaResults.push({
        id: criterion.id,
        criterionId: criterion.id,
        title: criterion.title,
        passed: false,
        feedback: criterion.publicFeedback || 'Evaluasi kriteria tidak berhasil dipenuhi.',
        weight
      });
    }
  }

  // Bounded deterministic score calculation: 0 - 100
  const score = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 100;
  const passed = score >= (definition.passingScore || 70);

  let generalFeedback = '';
  if (passed) {
    generalFeedback = `Luar biasa! Proyek berhasil dievaluasi dengan skor ${score}/100. Seluruh standar terpenuhi.`;
  } else {
    generalFeedback = `Proyek memperoleh skor ${score}/100 (batas minimum: ${definition.passingScore || 70}). Silakan perbaiki kriteria yang belum lulus lalu submit kembali.`;
  }

  return sanitizeProjectEvaluationResult({
    submissionId,
    projectId,
    score,
    passed,
    criteriaResults,
    feedback: generalFeedback,
    evaluatedAt: new Date().toISOString()
  });
}

/**
 * Explicit server-side sanitizer function for Phase 5C.5.
 * Converts any raw evaluation result into a clean PublicProjectEvaluationResult DTO.
 * Strips hidden fields (privateConfig, diagnosticReason, parameters, internal metadata).
 */
export function sanitizeProjectEvaluationResult(
  result: any
): ProjectEvaluationResult {
  if (!result || typeof result !== 'object') {
    return {
      submissionId: '',
      projectId: '',
      score: 0,
      passed: false,
      criteriaResults: [],
      feedback: 'Hasil evaluasi tidak valid.',
      evaluatedAt: new Date().toISOString()
    };
  }

  const sanitizedCriteria = Array.isArray(result.criteriaResults)
    ? result.criteriaResults.map((c: any) => ({
        id: String(c?.id || c?.criterionId || ''),
        criterionId: String(c?.criterionId || c?.id || ''),
        title: String(c?.title || 'Kriteria'),
        passed: Boolean(c?.passed),
        feedback: String(c?.feedback || ''),
        weight: typeof c?.weight === 'number' && Number.isFinite(c.weight) ? c.weight : 0
      }))
    : [];

  return {
    submissionId: String(result.submissionId || ''),
    projectId: String(result.projectId || ''),
    score: typeof result.score === 'number' && Number.isFinite(result.score) ? Math.max(0, Math.min(100, Math.round(result.score))) : 0,
    passed: Boolean(result.passed),
    criteriaResults: sanitizedCriteria,
    feedback: String(result.feedback || ''),
    evaluatedAt: String(result.evaluatedAt || new Date().toISOString())
  };
}

/**
 * Default Declarative Evaluation Definitions for all 6 Published Projects
 */
export const DEFAULT_PROJECT_EVALUATION_DEFINITIONS: Record<string, ProjectEvaluationDefinition> = {
  // 1. Web: Developer Personal Profile Card
  'proj-guided-1': {
    projectId: 'proj-guided-1',
    version: 1,
    passingScore: 70,
    status: 'published',
    updatedAt: '2026-03-01T00:00:00.000Z',
    criteria: [
      {
        id: 'crit-p1-semantic-card',
        title: 'Struktur Semantik Kartu Profil',
        type: 'semanticStructure',
        weight: 25,
        publicFeedback: 'Gunakan elemen semantik seperti <article> atau <section> dengan class dev-card sebagai wrapper profil.',
        privateConfig: {
          targetFile: 'html',
          rule: 'semanticStructure',
          parameters: { tags: ['article', 'header'] },
          requiredTags: ['article', 'header'],
          requiredPatterns: ['dev-card']
        }
      },
      {
        id: 'crit-p1-profile-img',
        title: 'Elemen Gambar Profil & Aksesibilitas',
        type: 'requiredAttribute',
        weight: 20,
        publicFeedback: 'Sertakan elemen <img> dengan atribut alt yang deskriptif.',
        privateConfig: {
          targetFile: 'html',
          rule: 'requiredAttribute',
          parameters: { tag: 'img', attribute: 'alt' },
          requiredTags: ['img'],
          requiredPatterns: ['alt=']
        }
      },
      {
        id: 'crit-p1-flexbox-layout',
        title: 'Penggunaan Tata Letak CSS Flexbox / Grid',
        type: 'layoutRule',
        weight: 25,
        publicFeedback: 'Terapkan display: flex atau display: grid pada container profil untuk tata letak yang rapi.',
        privateConfig: {
          targetFile: 'css',
          rule: 'layoutRule',
          parameters: { displayType: 'flex' },
          requiredPatterns: ['display:\\s*(flex|grid)', 'justify-content|align-items']
        }
      },
      {
        id: 'crit-p1-visual-polish',
        title: 'Styling Visual (Border-Radius & Box-Shadow)',
        type: 'requiredProperty',
        weight: 15,
        publicFeedback: 'Berikan sentuhan visual modern dengan border-radius dan box-shadow pada kartu profil.',
        privateConfig: {
          targetFile: 'css',
          rule: 'requiredProperty',
          parameters: { property: 'border-radius' },
          requiredPatterns: ['border-radius', 'box-shadow']
        }
      },
      {
        id: 'crit-p1-responsive-media',
        title: 'Responsivitas Media Query',
        type: 'mediaQuery',
        weight: 15,
        publicFeedback: 'Gunakan @media query untuk memastikan kartu profil tampil optimal di berbagai ukuran layar.',
        privateConfig: {
          targetFile: 'css',
          rule: 'mediaQuery',
          parameters: { queryPattern: 'max-width' },
          requiredPatterns: ['@media']
        }
      }
    ]
  },

  // 2. React: Interactive Sprint Kanban Board
  'proj-react-kanban': {
    projectId: 'proj-react-kanban',
    version: 1,
    passingScore: 70,
    status: 'published',
    updatedAt: '2026-03-01T00:00:00.000Z',
    criteria: [
      {
        id: 'crit-p2-board-layout',
        title: 'Struktur Kolom Papan Kanban (To-Do, In Progress, Done)',
        type: 'requiredJSX',
        weight: 25,
        publicFeedback: 'Sediakan struktur kolom papan tugas (Kanban columns: colTodo, colProgress, colDone).',
        privateConfig: {
          targetFile: 'html',
          rule: 'requiredJSX',
          parameters: { tag: 'div' },
          requiredPatterns: ['column|board|kanban', 'colTodo|colProgress|colDone|todo|in-progress|done']
        }
      },
      {
        id: 'crit-p2-task-state-management',
        title: 'Manajemen Status Tugas & Operasi Array',
        type: 'requiredStateIdentifier',
        weight: 30,
        publicFeedback: 'Implementasikan logika manipulasi data tugas menggunakan operasi array (push, filter, map, find, atau splice).',
        privateConfig: {
          targetFile: 'js',
          rule: 'requiredStateIdentifier',
          requiredPatterns: ['(\\.(push|filter|map|find|forEach|splice)\\(|const|let|function)']
        }
      },
      {
        id: 'crit-p2-event-listeners',
        title: 'Penanganan Aksi Pengguna / Event Handler',
        type: 'requiredEventHandler',
        weight: 25,
        publicFeedback: 'Tambahkan event handler untuk memindahkan tugas, menambah kartu, atau menghapus kartu.',
        privateConfig: {
          targetFile: 'js',
          rule: 'requiredEventHandler',
          parameters: { eventType: 'click' },
          requiredPatterns: ['addEventListener|onclick|dragstart|drop|dragover|addTaskBtn']
        }
      },
      {
        id: 'crit-p2-kanban-styling',
        title: 'Styling Visual Kolom dan Kartu',
        type: 'layoutRule',
        weight: 20,
        publicFeedback: 'Berikan gaya visual CSS Grid atau Flexbox yang membedakan antar kolom dan kartu tugas.',
        privateConfig: {
          targetFile: 'css',
          rule: 'layoutRule',
          parameters: { displayType: 'grid' },
          requiredPatterns: ['display:\\s*(flex|grid)', 'border-radius|box-shadow|background']
        }
      }
    ]
  },

  // 3. Backend: REST API Service & Auth Token Guard
  'proj-backend-api': {
    projectId: 'proj-backend-api',
    version: 1,
    passingScore: 70,
    status: 'published',
    updatedAt: '2026-03-01T00:00:00.000Z',
    criteria: [
      {
        id: 'crit-p3-auth-service-class',
        title: 'Definisi Struktur Class UserAuthService',
        type: 'requiredController',
        weight: 25,
        publicFeedback: 'Definisikan class UserAuthService dengan attribute store user dan token.',
        privateConfig: {
          targetFile: 'py',
          rule: 'requiredController',
          parameters: { className: 'UserAuthService' },
          requiredPatterns: ['class\\s+UserAuthService', 'self\\.users', 'self\\.tokens']
        }
      },
      {
        id: 'crit-p3-auth-methods',
        title: 'Method register, login, & verify_token',
        type: 'requiredFunction',
        weight: 35,
        publicFeedback: 'Implementasikan method register(email, password), login(email, password), dan verify_token(token).',
        privateConfig: {
          targetFile: 'py',
          rule: 'requiredFunction',
          parameters: { functionName: 'register' },
          requiredPatterns: ['def\\s+register', 'def\\s+login', 'def\\s+verify_token']
        }
      },
      {
        id: 'crit-p3-token-verification',
        title: 'Mekanisme Penerbitan & Validasi Token',
        type: 'requiredAuthMiddleware',
        weight: 20,
        publicFeedback: 'Terbitkan token identifikasi sesi dan kembalikan email pemilik token yang sah.',
        privateConfig: {
          targetFile: 'py',
          rule: 'requiredAuthMiddleware',
          parameters: { identifier: 'tokens' },
          requiredPatterns: ['jwt|token', 'return\\s+self\\.tokens']
        }
      },
      {
        id: 'crit-p3-validation-exceptions',
        title: 'Penanganan Validasi & Kesalahan (Exceptions)',
        type: 'requiredValidation',
        weight: 20,
        publicFeedback: 'Gunakan exception (ValueError / PermissionError) atau validasi kondisional jika kredensial salah atau email duplikat.',
        privateConfig: {
          targetFile: 'py',
          rule: 'requiredValidation',
          parameters: { constructType: 'raise' },
          requiredPatterns: ['raise\\s+(ValueError|PermissionError|Exception)|if\\s+email\\s+in']
        }
      }
    ]
  },

  // 4. Python: CLI Task & Expense Manager
  'proj-challenge-1': {
    projectId: 'proj-challenge-1',
    version: 1,
    passingScore: 70,
    status: 'published',
    updatedAt: '2026-03-01T00:00:00.000Z',
    criteria: [
      {
        id: 'crit-p4-expense-class',
        title: 'Definisi Class ExpenseManager',
        type: 'requiredClass',
        weight: 25,
        publicFeedback: 'Definisikan class ExpenseManager dengan list inisialisasi self.expenses.',
        privateConfig: {
          targetFile: 'py',
          rule: 'requiredClass',
          parameters: { className: 'ExpenseManager' },
          requiredPatterns: ['class\\s+ExpenseManager', 'self\\.expenses']
        }
      },
      {
        id: 'crit-p4-expense-methods',
        title: 'Method add_expense, get_total, & summary',
        type: 'requiredFunction',
        weight: 35,
        publicFeedback: 'Implementasikan method add_expense(title, amount), get_total(), dan summary().',
        privateConfig: {
          targetFile: 'py',
          rule: 'requiredFunction',
          parameters: { functionName: 'add_expense' },
          requiredPatterns: ['def\\s+add_expense', 'def\\s+get_total', 'def\\s+summary']
        }
      },
      {
        id: 'crit-p4-validation-error',
        title: 'Validasi Nominal Transaksi Positif',
        type: 'astNode',
        weight: 20,
        publicFeedback: 'Lempar ValueError jika nominal transaksi kurang dari atau sama dengan nol.',
        privateConfig: {
          targetFile: 'py',
          rule: 'astNode',
          parameters: { constructType: 'raise' },
          requiredPatterns: ['raise\\s+ValueError|if\\s+amount\\s*<=\\s*0']
        }
      },
      {
        id: 'crit-p4-aggregation-calc',
        title: 'Kalkulasi Total Pengeluaran (sum)',
        type: 'py_ast',
        weight: 20,
        publicFeedback: 'Gunakan fungsi agregasi sum() atau looping akumulasi untuk menghitung total pengeluaran.',
        privateConfig: {
          targetFile: 'py',
          rule: 'py_ast',
          parameters: { constructType: 'return' },
          requiredPatterns: ['sum\\(|amount|return']
        }
      }
    ]
  },

  // 5. Web: Modern Academy Landing Web (Portfolio)
  'proj-portfolio-1': {
    projectId: 'proj-portfolio-1',
    version: 1,
    passingScore: 70,
    status: 'published',
    updatedAt: '2026-03-01T00:00:00.000Z',
    criteria: [
      {
        id: 'crit-p5-semantic-sections',
        title: 'Kelengkapan Seksi Semantik Portofolio',
        type: 'semanticStructure',
        weight: 30,
        publicFeedback: 'Sertakan seksi utama semantik seperti <header>, minimal satu <section>, dan <footer>.',
        privateConfig: {
          targetFile: 'html',
          rule: 'semanticStructure',
          parameters: { tags: ['header', 'section', 'footer'] },
          requiredTags: ['header', 'section', 'footer']
        }
      },
      {
        id: 'crit-p5-feature-cards',
        title: 'Tiga Kartu Fitur (.feature-card)',
        type: 'requiredTag',
        weight: 25,
        publicFeedback: 'Sediakan minimal 3 kartu fitur dengan class feature-card.',
        privateConfig: {
          targetFile: 'html',
          rule: 'requiredTag',
          parameters: { tag: 'div', minCount: 3 },
          requiredPatterns: ['feature-card']
        }
      },
      {
        id: 'crit-p5-cta-button',
        title: 'Tombol Call-to-Action (CTA)',
        type: 'requiredSelector',
        weight: 20,
        publicFeedback: 'Sediakan tombol aksi CTA (cta-btn / btn) dengan styling hover visual.',
        privateConfig: {
          targetFile: 'css',
          rule: 'requiredSelector',
          parameters: { selector: '.cta-btn' },
          requiredPatterns: ['cta-btn|btn']
        }
      },
      {
        id: 'crit-p5-modern-styling',
        title: 'Tata Letak Responsif Modern Flexbox/Grid',
        type: 'layoutRule',
        weight: 25,
        publicFeedback: 'Terapkan tata letak Flexbox/Grid dengan border-radius dan palet warna modern.',
        privateConfig: {
          targetFile: 'css',
          rule: 'layoutRule',
          parameters: { displayType: 'flex' },
          requiredPatterns: ['display:\\s*(flex|grid)', 'padding|margin']
        }
      }
    ]
  },

  // 6. Fullstack: Course Catalog & Enrollment Engine (Capstone)
  'proj-fullstack-lms': {
    projectId: 'proj-fullstack-lms',
    version: 1,
    passingScore: 70,
    status: 'published',
    updatedAt: '2026-03-01T00:00:00.000Z',
    criteria: [
      {
        id: 'crit-p6-catalog-grid',
        title: 'Struktur Grid Katalog Kursus',
        type: 'frontendComponentExists',
        weight: 25,
        publicFeedback: 'Sediakan kontainer katalog kursus responsif (.catalog-grid atau .course-card).',
        privateConfig: {
          targetFile: 'html',
          rule: 'frontendComponentExists',
          parameters: { componentName: 'catalog-grid' },
          requiredPatterns: ['catalog|course|lesson|card']
        }
      },
      {
        id: 'crit-p6-enrollment-logic',
        title: 'Interaktivitas & Logika Pendaftaran Kursus',
        type: 'frontendApiReference',
        weight: 30,
        publicFeedback: 'Implementasikan interaksi tombol enroll dan pencatatan state pendaftaran siswa.',
        privateConfig: {
          targetFile: 'js',
          rule: 'frontendApiReference',
          parameters: { endpointPath: 'enroll' },
          requiredPatterns: ['enroll|count|addEventListener|click|status']
        }
      },
      {
        id: 'crit-p6-data-model',
        title: 'Definisi Struktur Model Data Kursus',
        type: 'dataModelExists',
        weight: 25,
        publicFeedback: 'Definisikan koleksi data kursus atau class model pembelajaran.',
        privateConfig: {
          targetFile: 'html',
          rule: 'dataModelExists',
          parameters: { modelName: 'Course' },
          requiredPatterns: ['course|courses|title|credit|category']
        }
      },
      {
        id: 'crit-p6-responsive-ui',
        title: 'Tata Letak Dashboard LMS Responsif',
        type: 'layoutRule',
        weight: 20,
        publicFeedback: 'Gunakan CSS Grid atau Flexbox untuk menciptakan antarmuka dashboard pembelajaran yang bersih.',
        privateConfig: {
          targetFile: 'css',
          rule: 'layoutRule',
          parameters: { displayType: 'grid' },
          requiredPatterns: ['display:\\s*(flex|grid)', 'border-radius|box-shadow|padding']
        }
      }
    ]
  }
};
