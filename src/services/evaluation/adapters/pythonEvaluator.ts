import { 
  EvaluatorAdapter, 
  EvaluatorFamily, 
  EvaluationCriterion, 
  ProjectSubmissionFiles, 
  InternalCriterionResult 
} from '../../../types/projectEvaluation';
import { stripPythonCommentsAndDocstrings } from './sourceHelpers';

/**
 * Python Evaluator Adapter:
 * Evaluates Python source code purely statically using declarative AST and token structure analysis.
 * Zero python execution, zero subprocess/child_process, zero eval/exec.
 */
export class PythonEvaluator implements EvaluatorAdapter {
  readonly family: EvaluatorFamily = 'python';

  evaluate(criterion: EvaluationCriterion, files: ProjectSubmissionFiles): InternalCriterionResult {
    const { id, title, type, weight = 10, publicFeedback, privateConfig = {} } = criterion;
    const rule = privateConfig.rule || type;
    const params = privateConfig.parameters || {};
    const targetKey = privateConfig.targetFile || 'py';
    const rawCode = String(files[targetKey] || '').trim();

    // 1. Required File / Presence Check
    if (rule === 'requiredFile' || rule === 'file_presence') {
      const isPresent = rawCode.length > 0;
      return {
        id,
        title,
        weight,
        passed: isPresent,
        feedback: isPresent ? 'File skrip Python ditemukan.' : publicFeedback,
        diagnosticReason: isPresent ? undefined : `Python source file '${targetKey}' is missing or empty.`
      };
    }

    // If source file is empty (and not a forbidden-check rule)
    if (!rawCode && rule !== 'forbidden_construct' && rule !== 'forbiddenConstruct' && rule !== 'forbiddenPattern' && rule !== 'fileDoesNotContain') {
      return {
        id,
        title,
        weight,
        passed: false,
        feedback: `File Python (${targetKey.toUpperCase()}) masih kosong. ${publicFeedback}`,
        diagnosticReason: `Empty Python source code for target '${targetKey}'.`
      };
    }

    // Cleaned code without comments and docstrings for AST node & structural checks
    const codeNoComments = stripPythonCommentsAndDocstrings(rawCode);

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

    // 4. Forbidden Constructs (e.g. eval, exec, subprocess, os.system, dangerous dynamic imports)
    if (rule === 'forbiddenConstruct' || rule === 'forbidden_construct' || rule === 'forbiddenPattern' || (privateConfig.forbiddenPatterns && privateConfig.forbiddenPatterns.length > 0)) {
      const forbidden = params.disallowedPatterns || params.patterns || privateConfig.forbiddenPatterns || [
        '\\beval\\s*\\(',
        '\\bexec\\s*\\(',
        '\\bsubprocess\\b',
        '\\bos\\.system\\b',
        '\\bos\\.popen\\b',
        '\\b__import__\\b'
      ];

      for (const pattern of forbidden) {
        try {
          const regex = new RegExp(pattern, privateConfig.caseSensitive ? 'm' : 'im');
          // Test against code without comments to avoid false positives in learner comments
          if (regex.test(codeNoComments)) {
            return {
              id,
              title,
              weight,
              passed: false,
              feedback: `Terdeteksi konstruksi Python terlarang (${publicFeedback}).`,
              diagnosticReason: `Found forbidden construct pattern: ${pattern}`
            };
          }
        } catch {
          if (codeNoComments.includes(pattern)) {
            return {
              id,
              title,
              weight,
              passed: false,
              feedback: `Terdeteksi konstruksi Python terlarang (${publicFeedback}).`,
              diagnosticReason: `Found forbidden construct pattern: ${pattern}`
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

    // 5. Required Function Definition
    if (rule === 'requiredFunction') {
      const fnName = params.functionName || params.identifier || '';
      if (fnName) {
        const fnRegex = new RegExp(`def\\s+${fnName}\\s*\\(`, 'm');
        if (!fnRegex.test(codeNoComments)) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: publicFeedback,
            diagnosticReason: `Python function 'def ${fnName}(...)' not found.`
          };
        }
      } else {
        if (!/def\s+\w+\s*\(/.test(codeNoComments)) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: publicFeedback,
            diagnosticReason: `No Python function definition ('def ...') found.`
          };
        }
      }
      return { id, title, weight, passed: true, feedback: 'Fungsi Python ditemukan.' };
    }

    // 6. Required Class Definition
    if (rule === 'requiredClass') {
      const clsName = params.className || '';
      if (clsName) {
        const clsRegex = new RegExp(`class\\s+${clsName}\\b`, 'm');
        if (!clsRegex.test(codeNoComments)) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: publicFeedback,
            diagnosticReason: `Python class 'class ${clsName}' not found.`
          };
        }
      } else {
        if (!/class\s+\w+/m.test(codeNoComments)) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: publicFeedback,
            diagnosticReason: `No Python class definition ('class ...') found.`
          };
        }
      }
      return { id, title, weight, passed: true, feedback: 'Kelas Python ditemukan.' };
    }

    // 7. Required Import Module
    if (rule === 'requiredImport') {
      const mod = params.moduleName || '';
      if (mod) {
        const importRegex = new RegExp(`(import\\s+${mod}|from\\s+${mod}\\s+import)`, 'm');
        if (!importRegex.test(codeNoComments)) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: publicFeedback,
            diagnosticReason: `Module import for '${mod}' not found.`
          };
        }
      } else {
        if (!/(import\s+\w+|from\s+\w+\s+import)/m.test(codeNoComments)) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: publicFeedback,
            diagnosticReason: `No import statement found.`
          };
        }
      }
      return { id, title, weight, passed: true, feedback: 'Import modul Python ditemukan.' };
    }

    // 8. Required Identifier
    if (rule === 'requiredIdentifier') {
      const ident = params.identifier || '';
      if (ident) {
        const identRegex = new RegExp(`\\b${ident}\\b`, 'm');
        if (!identRegex.test(codeNoComments)) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: publicFeedback,
            diagnosticReason: `Identifier '${ident}' not found in Python code.`
          };
        }
      }
      return { id, title, weight, passed: true, feedback: 'Identifier Python ditemukan.' };
    }

    // 9. AST Node Constructs (e.g. def, class, try, except, if, for, while, return, with, raise)
    if (rule === 'astNode' || rule === 'py_ast') {
      const construct = params.constructType || (privateConfig.astConstructs ? privateConfig.astConstructs[0] : 'def');
      const constructRegex = new RegExp(`\\b${construct}\\b`, 'm');
      if (!constructRegex.test(codeNoComments)) {
        return {
          id,
          title,
          weight,
          passed: false,
          feedback: `Konstruksi ${construct} tidak ditemukan pada kode Python. ${publicFeedback}`,
          diagnosticReason: `AST construct '${construct}' missing.`
        };
      }

      // If multiple AST constructs are required in legacy config
      if (privateConfig.astConstructs && privateConfig.astConstructs.length > 1) {
        for (const c of privateConfig.astConstructs) {
          const r = new RegExp(`\\b${c}\\b`, 'm');
          if (!r.test(codeNoComments)) {
            return {
              id,
              title,
              weight,
              passed: false,
              feedback: `Konstruksi ${c} tidak ditemukan pada kode Python. ${publicFeedback}`,
              diagnosticReason: `AST construct '${c}' missing.`
            };
          }
        }
      }
      return { id, title, weight, passed: true, feedback: 'Konstruksi AST Python ditemukan.' };
    }

    // 10. Syntax Pattern / Regex / Required Patterns
    if (rule === 'syntaxPattern' || rule === 'regex_pattern') {
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
              diagnosticReason: `Syntax pattern '${pat}' not matched.`
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
              diagnosticReason: `Pattern string not found.`
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
              diagnosticReason: `Required pattern '${pattern}' not matched.`
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
              diagnosticReason: `Required pattern string not found.`
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
      feedback: 'Kriteria Python berhasil dipenuhi.'
    };
  }
}
