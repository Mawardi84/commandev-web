import { 
  EvaluatorAdapter, 
  EvaluatorFamily, 
  EvaluationCriterion, 
  ProjectSubmissionFiles, 
  InternalCriterionResult 
} from '../../../types/projectEvaluation';
import { stripJsComments, stripHtmlComments } from './sourceHelpers';

/**
 * React Evaluator Adapter:
 * Statically inspects React components, JSX structure, hook usage, and state management.
 * Zero server-side React execution, zero rendering, zero package installation.
 */
export class ReactEvaluator implements EvaluatorAdapter {
  readonly family: EvaluatorFamily = 'react';

  evaluate(criterion: EvaluationCriterion, files: ProjectSubmissionFiles): InternalCriterionResult {
    const { id, title, type, weight = 10, publicFeedback, privateConfig = {} } = criterion;
    const rule = privateConfig.rule || type;
    const params = privateConfig.parameters || {};
    const targetKey = privateConfig.targetFile || 'js';
    const rawCode = String(files[targetKey] || '').trim();

    // 1. Required File Check
    if (rule === 'requiredFile' || rule === 'file_presence') {
      const isPresent = rawCode.length > 0;
      return {
        id,
        title,
        weight,
        passed: isPresent,
        feedback: isPresent ? 'File komponen React ditemukan.' : publicFeedback,
        diagnosticReason: isPresent ? undefined : `Target file '${targetKey}' is missing or empty.`
      };
    }

    if (!rawCode && rule !== 'forbidden_construct' && rule !== 'forbiddenConstruct' && rule !== 'forbiddenPattern' && rule !== 'fileDoesNotContain') {
      return {
        id,
        title,
        weight,
        passed: false,
        feedback: `File React (${targetKey.toUpperCase()}) masih kosong. ${publicFeedback}`,
        diagnosticReason: `Empty code for target '${targetKey}'.`
      };
    }

    const cleanJsCode = stripJsComments(rawCode);

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

    // 4. Forbidden Constructs
    if (rule === 'forbiddenConstruct' || rule === 'forbidden_construct' || rule === 'forbiddenPattern' || (privateConfig.forbiddenPatterns && privateConfig.forbiddenPatterns.length > 0)) {
      const forbidden = params.disallowedPatterns || params.patterns || privateConfig.forbiddenPatterns || [
        '\\beval\\s*\\(',
        '\\bnew\\s+Function\\s*\\(',
        'dangerouslySetInnerHTML'
      ];

      for (const pattern of forbidden) {
        try {
          const regex = new RegExp(pattern, privateConfig.caseSensitive ? 'm' : 'im');
          if (regex.test(cleanJsCode)) {
            return {
              id,
              title,
              weight,
              passed: false,
              feedback: `Terdeteksi pola terlarang pada kode React. ${publicFeedback}`,
              diagnosticReason: `Matched forbidden pattern: ${pattern}`
            };
          }
        } catch {
          if (cleanJsCode.includes(pattern)) {
            return {
              id,
              title,
              weight,
              passed: false,
              feedback: `Terdeteksi pola terlarang pada kode React. ${publicFeedback}`,
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
          feedback: 'Kriteria bebas pola terlarang terpenuhi.'
        };
      }
    }

    // 5. Required React Component Definition
    if (rule === 'requiredComponent') {
      const compName = params.componentName || params.identifier || '';
      if (compName) {
        // Match function ComponentName, const ComponentName = ... or class ComponentName extends
        const compRegex = new RegExp(`(function\\s+${compName}\\b|const\\s+${compName}\\s*=\\s*(\\(|function)|class\\s+${compName}\\s+extends)`, 'm');
        if (!compRegex.test(cleanJsCode)) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: `Komponen React '${compName}' tidak ditemukan. ${publicFeedback}`,
            diagnosticReason: `React component '${compName}' not declared.`
          };
        }
      } else {
        const hasComp = /(function\s+[A-Z]\w*|const\s+[A-Z]\w*\s*=\s*(\(|function)|class\s+[A-Z]\w*\s+extends)/m.test(cleanJsCode);
        if (!hasComp) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: publicFeedback,
            diagnosticReason: `No standard PascalCase React component found.`
          };
        }
      }
      return { id, title, weight, passed: true, feedback: 'Komponen React ditemukan.' };
    }

    // 6. Required React Hook Usage
    if (rule === 'requiredHook') {
      const hook = params.hookName || 'useState';
      const hookRegex = new RegExp(`\\b${hook}\\s*\\(`, 'm');
      if (!hookRegex.test(cleanJsCode)) {
        return {
          id,
          title,
          weight,
          passed: false,
          feedback: `Penggunaan React Hook '${hook}' tidak ditemukan. ${publicFeedback}`,
          diagnosticReason: `Hook '${hook}' not invoked.`
        };
      }
      return { id, title, weight, passed: true, feedback: `React Hook ${hook} ditemukan.` };
    }

    // 7. Required JSX Structure
    if (rule === 'requiredJSX' || rule === 'html_structure') {
      const tag = params.tag || '';
      if (tag) {
        const tagRegex = new RegExp(`<${tag}(\\s|>|/)`, 'i');
        if (!tagRegex.test(rawCode)) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: `Elemen JSX <${tag}> tidak ditemukan. ${publicFeedback}`,
            diagnosticReason: `JSX tag <${tag}> missing.`
          };
        }
      }
      return { id, title, weight, passed: true, feedback: 'Struktur JSX valid.' };
    }

    // 8. Required Event Handler (e.g. onClick, onChange, onSubmit)
    if (rule === 'requiredEventHandler' || rule === 'requiredEventListener') {
      const evt = params.eventType || 'click';
      // In React, event handlers are onClick, onChange, onSubmit, onDragStart, etc.
      const reactEvtName = evt.startsWith('on') ? evt : `on${evt.charAt(0).toUpperCase() + evt.slice(1)}`;
      const evtRegex = new RegExp(`(${reactEvtName}\\s*=\\s*\\{|addEventListener\\s*\\(\\s*['"\`]${evt}['"\`]|${evt})`, 'i');
      if (!evtRegex.test(rawCode)) {
        return {
          id,
          title,
          weight,
          passed: false,
          feedback: `Event handler '${reactEvtName}' tidak ditemukan. ${publicFeedback}`,
          diagnosticReason: `Event handler '${reactEvtName}' missing.`
        };
      }
      return { id, title, weight, passed: true, feedback: 'Event handler ditemukan.' };
    }

    // 9. Required State Identifier
    if (rule === 'requiredStateIdentifier' || rule === 'requiredIdentifier') {
      const stateName = params.stateName || params.identifier || '';
      if (stateName) {
        const identRegex = new RegExp(`\\b${stateName}\\b`, 'm');
        if (!identRegex.test(cleanJsCode)) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: `Identifier state '${stateName}' tidak ditemukan. ${publicFeedback}`,
            diagnosticReason: `State identifier '${stateName}' not found.`
          };
        }
      }
      return { id, title, weight, passed: true, feedback: 'State identifier ditemukan.' };
    }

    // 10. Required Import
    if (rule === 'requiredImport') {
      const mod = params.moduleName || 'react';
      const importRegex = new RegExp(`(import\\s+.*from\\s+['"\`]${mod}['"\`]|require\\(['"\`]${mod}['"\`])`, 'm');
      if (!importRegex.test(cleanJsCode)) {
        return {
          id,
          title,
          weight,
          passed: false,
          feedback: `Import modul '${mod}' tidak ditemukan. ${publicFeedback}`,
          diagnosticReason: `Import of '${mod}' missing.`
        };
      }
      return { id, title, weight, passed: true, feedback: `Import modul ${mod} ditemukan.` };
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
      feedback: 'Kriteria React berhasil dipenuhi.'
    };
  }
}
