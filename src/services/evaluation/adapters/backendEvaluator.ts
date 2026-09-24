import { 
  EvaluatorAdapter, 
  EvaluatorFamily, 
  EvaluationCriterion, 
  ProjectSubmissionFiles, 
  InternalCriterionResult 
} from '../../../types/projectEvaluation';
import { stripPythonCommentsAndDocstrings, stripJsComments } from './sourceHelpers';

/**
 * Backend Evaluator Adapter:
 * Statically evaluates backend service code, route endpoints, auth guards, controllers, and validation rules.
 * Zero server execution, zero port binding, zero dynamic process spawning.
 */
export class BackendEvaluator implements EvaluatorAdapter {
  readonly family: EvaluatorFamily = 'backend';

  evaluate(criterion: EvaluationCriterion, files: ProjectSubmissionFiles): InternalCriterionResult {
    const { id, title, type, weight = 10, publicFeedback, privateConfig = {} } = criterion;
    const rule = privateConfig.rule || type;
    const params = privateConfig.parameters || {};
    const targetKey = privateConfig.targetFile || 'py';
    const rawCode = String(files[targetKey] || '').trim();

    // 1. Required File Check
    if (rule === 'requiredFile' || rule === 'file_presence') {
      const isPresent = rawCode.length > 0;
      return {
        id,
        title,
        weight,
        passed: isPresent,
        feedback: isPresent ? 'File backend service ditemukan.' : publicFeedback,
        diagnosticReason: isPresent ? undefined : `Target file '${targetKey}' is missing or empty.`
      };
    }

    if (!rawCode && rule !== 'forbidden_construct' && rule !== 'forbiddenConstruct' && rule !== 'forbiddenPattern' && rule !== 'fileDoesNotContain') {
      return {
        id,
        title,
        weight,
        passed: false,
        feedback: `File backend (${targetKey.toUpperCase()}) masih kosong. ${publicFeedback}`,
        diagnosticReason: `Empty code for target '${targetKey}'.`
      };
    }

    const cleanCode = targetKey === 'py' ? stripPythonCommentsAndDocstrings(rawCode) : stripJsComments(rawCode);

    // 2. Source Length Check
    if (rule === 'sourceLength') {
      const min = params.minLength ?? 10;
      const max = params.maxLength ?? 100000;
      const pass = rawCode.length >= min && rawCode.length <= max;
      return {
        id,
        title,
        weight,
        passed: pass,
        feedback: pass ? 'Panjang kode memenuhi kriteria.' : publicFeedback,
        diagnosticReason: pass ? undefined : `Length ${rawCode.length} outside [${min}, ${max}].`
      };
    }

    // 3. File Contains / Does Not Contain
    if (rule === 'fileContains') {
      const pattern = params.pattern || params.text || '';
      if (!pattern) return { id, title, weight, passed: true, feedback: 'Kriteria terpenuhi.' };
      const caseSensitive = params.caseSensitive ?? false;
      const matches = caseSensitive ? rawCode.includes(pattern) : rawCode.toLowerCase().includes(pattern.toLowerCase());
      return {
        id,
        title,
        weight,
        passed: matches,
        feedback: matches ? 'Kriteria terpenuhi.' : publicFeedback,
        diagnosticReason: matches ? undefined : `Substring '${pattern}' not found.`
      };
    }

    if (rule === 'fileDoesNotContain') {
      const pattern = params.pattern || params.text || '';
      if (!pattern) return { id, title, weight, passed: true, feedback: 'Kriteria terpenuhi.' };
      const caseSensitive = params.caseSensitive ?? false;
      const contains = caseSensitive ? rawCode.includes(pattern) : rawCode.toLowerCase().includes(pattern.toLowerCase());
      return {
        id,
        title,
        weight,
        passed: !contains,
        feedback: !contains ? 'Kriteria terpenuhi.' : publicFeedback,
        diagnosticReason: contains ? `Disallowed substring '${pattern}' was found.` : undefined
      };
    }

    // 4. Forbidden Backend Insecure Patterns (e.g. shell execution, command execution)
    if (rule === 'forbiddenConstruct' || rule === 'forbidden_construct' || rule === 'forbiddenPattern' || (privateConfig.forbiddenPatterns && privateConfig.forbiddenPatterns.length > 0)) {
      const forbidden = params.disallowedPatterns || params.patterns || privateConfig.forbiddenPatterns || [
        '\\beval\\s*\\(',
        '\\bexec\\s*\\(',
        '\\bsubprocess\\b',
        '\\bos\\.system\\b',
        '\\bos\\.popen\\b',
        '\\bchild_process\\b',
        '\\bspawn\\s*\\(',
        '\\bfork\\s*\\('
      ];

      for (const pattern of forbidden) {
        try {
          const regex = new RegExp(pattern, privateConfig.caseSensitive ? 'm' : 'im');
          if (regex.test(cleanCode)) {
            return {
              id,
              title,
              weight,
              passed: false,
              feedback: `Terdeteksi operasi backend yang tidak aman / terlarang. ${publicFeedback}`,
              diagnosticReason: `Matched forbidden pattern: ${pattern}`
            };
          }
        } catch {
          if (cleanCode.includes(pattern)) {
            return {
              id,
              title,
              weight,
              passed: false,
              feedback: `Terdeteksi operasi backend yang tidak aman / terlarang. ${publicFeedback}`,
              diagnosticReason: `Matched forbidden pattern: ${pattern}`
            };
          }
        }
      }
      if (rule === 'forbiddenConstruct' || rule === 'forbidden_construct' || rule === 'forbiddenPattern') {
        return {
          id,
          title,
          weight,
          passed: true,
          feedback: 'Kriteria bebas konstruksi terlarang terpenuhi.'
        };
      }
    }

    // 5. Required Route / Endpoint
    if (rule === 'requiredRoute') {
      const route = params.routeName || params.endpointPath || '';
      if (route) {
        const routeRegex = new RegExp(`(@app\\.(get|post|put|delete|patch)\\s*\\(\\s*['"\`]${route}['"\`]|app\\.(get|post|put|delete|patch)\\s*\\(\\s*['"\`]${route}['"\`]|def\\s+${route}\\b|${route})`, 'i');
        if (!routeRegex.test(cleanCode)) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: `Rute backend '${route}' tidak ditemukan. ${publicFeedback}`,
            diagnosticReason: `Route definition '${route}' missing.`
          };
        }
      }
      return { id, title, weight, passed: true, feedback: 'Rute backend ditemukan.' };
    }

    // 6. Required Controller / Handler Class or Function
    if (rule === 'requiredController' || rule === 'requiredClass' || rule === 'requiredFunction') {
      const name = params.className || params.functionName || params.identifier || '';
      if (name) {
        const ctrlRegex = new RegExp(`(class\\s+${name}\\b|def\\s+${name}\\b|function\\s+${name}\\b|const\\s+${name}\\s*=)`, 'm');
        if (!ctrlRegex.test(cleanCode)) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: `Controller/Handler '${name}' tidak ditemukan. ${publicFeedback}`,
            diagnosticReason: `Handler '${name}' missing.`
          };
        }
      }
      return { id, title, weight, passed: true, feedback: 'Controller backend ditemukan.' };
    }

    // 7. Required HTTP Method
    if (rule === 'requiredHttpMethod') {
      const method = (params.httpMethod || 'GET').toLowerCase();
      const methodRegex = new RegExp(`(\\b${method}\\b|\\.${method}\\(|method\\s*==\\s*['"\`]${method.toUpperCase()}['"\`])`, 'i');
      if (!methodRegex.test(cleanCode)) {
        return {
          id,
          title,
          weight,
          passed: false,
          feedback: `Metode HTTP '${method.toUpperCase()}' tidak ditemukan. ${publicFeedback}`,
          diagnosticReason: `HTTP method '${method}' missing.`
        };
      }
      return { id, title, weight, passed: true, feedback: `Metode HTTP ${method.toUpperCase()} ditemukan.` };
    }

    // 8. Required Validation Pattern
    if (rule === 'requiredValidation') {
      const valRegex = new RegExp(`(if\\s+not|if\\s+!|raise\\s+ValueError|raise\\s+PermissionError|status_code\\s*=\\s*40|res\\.status\\(40)`, 'i');
      if (!valRegex.test(cleanCode)) {
        return {
          id,
          title,
          weight,
          passed: false,
          feedback: `Pola validasi input atau penanganan kesalahan tidak ditemukan. ${publicFeedback}`,
          diagnosticReason: `Validation / error raising logic not found.`
        };
      }
      return { id, title, weight, passed: true, feedback: 'Pola validasi backend ditemukan.' };
    }

    // 9. Required Response Structure
    if (rule === 'requiredResponseStructure' || rule === 'py_ast') {
      const respRegex = new RegExp(`(return\\s+(\\{|json|dict|Response|status|f"|')|status(_code)?|res\\.json|res\\.send)`, 'i');
      if (!respRegex.test(cleanCode)) {
        return {
          id,
          title,
          weight,
          passed: false,
          feedback: `Format respon status / payload JSON terstruktur tidak ditemukan. ${publicFeedback}`,
          diagnosticReason: `Structured response return statement not found.`
        };
      }
      return { id, title, weight, passed: true, feedback: 'Format respon backend terstruktur ditemukan.' };
    }

    // 10. Required Auth Middleware / Token Guard
    if (rule === 'requiredAuthMiddleware') {
      const authRegex = new RegExp(`(verify_token|auth|token|jwt|bearer|Authorization|session)`, 'i');
      if (!authRegex.test(cleanCode)) {
        return {
          id,
          title,
          weight,
          passed: false,
          feedback: `Mekanisme otentikasi / guard token tidak ditemukan. ${publicFeedback}`,
          diagnosticReason: `Authentication / token check logic missing.`
        };
      }
      return { id, title, weight, passed: true, feedback: 'Otentikasi backend ditemukan.' };
    }

    // 11. General Pattern / Syntax Matching
    if (rule === 'syntaxPattern' || rule === 'regex_pattern' || rule === 'js_syntax') {
      const pat = params.pattern || (privateConfig.requiredPatterns ? privateConfig.requiredPatterns[0] : '');
      if (pat) {
        try {
          const regex = new RegExp(pat, privateConfig.caseSensitive ? 'm' : 'im');
          if (!regex.test(rawCode)) {
            return {
              id,
              title,
              weight,
              passed: false,
              feedback: publicFeedback,
              diagnosticReason: `Pattern '${pat}' not matched.`
            };
          }
        } catch {
          if (!rawCode.includes(pat)) {
            return {
              id,
              title,
              weight,
              passed: false,
              feedback: publicFeedback,
              diagnosticReason: `Pattern substring not found.`
            };
          }
        }
      }
    }

    if (privateConfig.requiredPatterns && privateConfig.requiredPatterns.length > 0) {
      for (const pattern of privateConfig.requiredPatterns) {
        try {
          const flags = privateConfig.caseSensitive ? 'm' : 'im';
          const regex = new RegExp(pattern, flags);
          if (!regex.test(rawCode)) {
            return {
              id,
              title,
              weight,
              passed: false,
              feedback: publicFeedback,
              diagnosticReason: `Required pattern check failed.`
            };
          }
        } catch {
          if (!rawCode.toLowerCase().includes(pattern.toLowerCase())) {
            return {
              id,
              title,
              weight,
              passed: false,
              feedback: publicFeedback,
              diagnosticReason: `Required pattern check failed.`
            };
          }
        }
      }
    }

    return {
      id,
      title,
      weight,
      passed: true,
      feedback: 'Kriteria backend berhasil dipenuhi.'
    };
  }
}
