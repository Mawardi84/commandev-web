import { 
  EvaluatorAdapter, 
  EvaluatorFamily, 
  EvaluationCriterion, 
  ProjectSubmissionFiles, 
  InternalCriterionResult 
} from '../../../types/projectEvaluation';
import { stripHtmlComments, stripCssComments, stripJsComments } from './sourceHelpers';

/**
 * Web Evaluator Adapter:
 * Deterministically evaluates HTML, CSS, and Client JavaScript rules statically.
 * Zero dynamic code execution.
 */
export class WebEvaluator implements EvaluatorAdapter {
  readonly family: EvaluatorFamily = 'web';

  evaluate(criterion: EvaluationCriterion, files: ProjectSubmissionFiles): InternalCriterionResult {
    const { id, title, type, weight = 10, publicFeedback, privateConfig = {} } = criterion;
    const rule = privateConfig.rule || type;
    const params = privateConfig.parameters || {};
    const targetKey = privateConfig.targetFile || 'html';
    const rawCode = String(files[targetKey] || '').trim();

    // 1. Required File / Presence Check
    if (rule === 'requiredFile' || rule === 'file_presence') {
      const isPresent = rawCode.length > 0;
      return {
        id,
        title,
        weight,
        passed: isPresent,
        feedback: isPresent ? 'File proyek ditemukan.' : publicFeedback,
        diagnosticReason: isPresent ? undefined : `File '${targetKey}' is missing or completely empty.`
      };
    }

    // If source file is empty (and not a forbidden-check rule)
    if (!rawCode && rule !== 'forbidden_construct' && rule !== 'forbiddenConstruct' && rule !== 'forbiddenPattern' && rule !== 'fileDoesNotContain') {
      return {
        id,
        title,
        weight,
        passed: false,
        feedback: `File ${targetKey.toUpperCase()} masih kosong. ${publicFeedback}`,
        diagnosticReason: `Empty source code for target '${targetKey}'.`
      };
    }

    // 2. General Source Length
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

    // 4. Forbidden Constructs & Patterns
    if (rule === 'forbiddenConstruct' || rule === 'forbidden_construct' || rule === 'forbiddenPattern' || (privateConfig.forbiddenPatterns && privateConfig.forbiddenPatterns.length > 0)) {
      const forbidden = params.disallowedPatterns || params.patterns || privateConfig.forbiddenPatterns || [];
      const cleanCode = targetKey === 'html' ? stripHtmlComments(rawCode) : targetKey === 'css' ? stripCssComments(rawCode) : stripJsComments(rawCode);

      for (const pattern of forbidden) {
        try {
          const regex = new RegExp(pattern, privateConfig.caseSensitive ? '' : 'i');
          if (regex.test(cleanCode)) {
            return {
              id,
              title,
              weight,
              passed: false,
              feedback: `Terdeteksi pola yang tidak diizinkan. ${publicFeedback}`,
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
              feedback: `Terdeteksi pola yang tidak diizinkan. ${publicFeedback}`,
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

    // 5. HTML Rule Family
    if (rule === 'requiredTag') {
      const tag = params.tag || (privateConfig.requiredTags ? privateConfig.requiredTags[0] : '');
      const minCount = params.minCount || 1;
      if (tag) {
        const tagRegex = new RegExp(`<${tag}(\\s|>|/)`, 'gi');
        const matches = rawCode.match(tagRegex) || [];
        if (matches.length < minCount) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: publicFeedback,
            diagnosticReason: `Found ${matches.length} <${tag}> tags, expected at least ${minCount}.`
          };
        }
      }
      return { id, title, weight, passed: true, feedback: 'Tag HTML yang diperlukan ditemukan.' };
    }

    if (rule === 'requiredAttribute') {
      const tag = params.tag || '';
      const attr = params.attribute || '';
      const valPattern = params.valuePattern;

      if (attr) {
        let attrRegex: RegExp;
        if (tag) {
          if (valPattern) {
            attrRegex = new RegExp(`<${tag}[^>]*\\b${attr}=["'][^"']*${valPattern}[^"']*["']`, 'i');
          } else {
            attrRegex = new RegExp(`<${tag}[^>]*\\b${attr}(\\s*=|\\s|>|/)`, 'i');
          }
        } else {
          if (valPattern) {
            attrRegex = new RegExp(`\\b${attr}=["'][^"']*${valPattern}[^"']*["']`, 'i');
          } else {
            attrRegex = new RegExp(`\\b${attr}(\\s*=|\\s|>|/)`, 'i');
          }
        }

        if (!attrRegex.test(rawCode)) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: publicFeedback,
            diagnosticReason: `Attribute '${attr}' on tag '${tag || '*'}' not found or does not match pattern.`
          };
        }
      }
      return { id, title, weight, passed: true, feedback: 'Atribut HTML yang diperlukan ditemukan.' };
    }

    if (rule === 'requiredText') {
      const text = params.text || '';
      if (text) {
        const caseSensitive = params.caseSensitive ?? false;
        const found = caseSensitive ? rawCode.includes(text) : rawCode.toLowerCase().includes(text.toLowerCase());
        if (!found) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: publicFeedback,
            diagnosticReason: `Text '${text}' not found in source.`
          };
        }
      }
      return { id, title, weight, passed: true, feedback: 'Teks yang diperlukan ditemukan.' };
    }

    if (rule === 'elementCount') {
      const tag = params.tag || 'div';
      const minCount = params.minCount ?? 1;
      const maxCount = params.maxCount ?? 9999;
      const tagRegex = new RegExp(`<${tag}(\\s|>|/)`, 'gi');
      const count = (rawCode.match(tagRegex) || []).length;
      if (count < minCount || count > maxCount) {
        return {
          id,
          title,
          weight,
          passed: false,
          feedback: publicFeedback,
          diagnosticReason: `Found ${count} <${tag}> tags, expected between ${minCount} and ${maxCount}.`
        };
      }
      return { id, title, weight, passed: true, feedback: 'Jumlah elemen sesuai persyaratan.' };
    }

    if (rule === 'semanticStructure' || rule === 'html_structure') {
      const reqTags = params.tags || privateConfig.requiredTags || [];
      for (const tag of reqTags) {
        const tagRegex = new RegExp(`<${tag}(\\s|>|/)`, 'i');
        if (!tagRegex.test(rawCode)) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: `Elemen <${tag}> tidak ditemukan pada file HTML. ${publicFeedback}`,
            diagnosticReason: `Semantic tag <${tag}> missing.`
          };
        }
      }
      // Check required patterns if specified
      if (privateConfig.requiredPatterns) {
        for (const pat of privateConfig.requiredPatterns) {
          const reg = new RegExp(pat, 'i');
          if (!reg.test(rawCode)) {
            return {
              id,
              title,
              weight,
              passed: false,
              feedback: publicFeedback,
              diagnosticReason: `Required HTML pattern not matched.`
            };
          }
        }
      }
      return { id, title, weight, passed: true, feedback: 'Struktur semantik HTML valid.' };
    }

    // 6. CSS Rule Family
    if (rule === 'requiredSelector') {
      const sel = params.selector || '';
      if (sel) {
        const escaped = sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const selRegex = new RegExp(`${escaped}\\s*\\{`, 'i');
        if (!selRegex.test(rawCode)) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: publicFeedback,
            diagnosticReason: `CSS Selector '${sel}' not found in stylesheet.`
          };
        }
      }
      return { id, title, weight, passed: true, feedback: 'Selector CSS ditemukan.' };
    }

    if (rule === 'requiredProperty' || rule === 'requiredPropertyValue') {
      const prop = params.property || '';
      const valPattern = params.valuePattern || '';
      if (prop) {
        if (valPattern) {
          const propRegex = new RegExp(`${prop}\\s*:\\s*[^;}]*${valPattern}`, 'i');
          if (!propRegex.test(rawCode)) {
            return {
              id,
              title,
              weight,
              passed: false,
              feedback: publicFeedback,
              diagnosticReason: `Property '${prop}' with value pattern '${valPattern}' not found.`
            };
          }
        } else {
          const propRegex = new RegExp(`${prop}\\s*:`, 'i');
          if (!propRegex.test(rawCode)) {
            return {
              id,
              title,
              weight,
              passed: false,
              feedback: publicFeedback,
              diagnosticReason: `Property '${prop}' not found.`
            };
          }
        }
      }
      return { id, title, weight, passed: true, feedback: 'Properti CSS ditemukan.' };
    }

    if (rule === 'mediaQuery') {
      const qPattern = params.queryPattern || '';
      if (qPattern) {
        const mqRegex = new RegExp(`@media[^{]*${qPattern}`, 'i');
        if (!mqRegex.test(rawCode)) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: publicFeedback,
            diagnosticReason: `Media query with pattern '${qPattern}' not found.`
          };
        }
      } else {
        if (!/@media/i.test(rawCode)) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: publicFeedback,
            diagnosticReason: `@media query block not found in stylesheet.`
          };
        }
      }
      return { id, title, weight, passed: true, feedback: 'Media query CSS ditemukan.' };
    }

    if (rule === 'layoutRule') {
      const displayType = params.displayType || 'flex';
      const layoutRegex = new RegExp(`display\\s*:\\s*${displayType}`, 'i');
      if (!layoutRegex.test(rawCode)) {
        return {
          id,
          title,
          weight,
          passed: false,
          feedback: publicFeedback,
          diagnosticReason: `Display layout rule '${displayType}' not found.`
        };
      }
      return { id, title, weight, passed: true, feedback: `Layout CSS ${displayType} ditemukan.` };
    }

    if (rule === 'css_style') {
      if (privateConfig.requiredPatterns) {
        for (const pat of privateConfig.requiredPatterns) {
          const reg = new RegExp(pat, 'i');
          if (!reg.test(rawCode)) {
            return {
              id,
              title,
              weight,
              passed: false,
              feedback: publicFeedback,
              diagnosticReason: `Required CSS pattern not matched.`
            };
          }
        }
      }
      return { id, title, weight, passed: true, feedback: 'Gaya CSS valid.' };
    }

    // 7. JavaScript Rule Family
    if (rule === 'requiredFunction') {
      const fnName = params.functionName || '';
      if (fnName) {
        const fnRegex = new RegExp(`(function\\s+${fnName}\\b|\\b${fnName}\\s*=\\s*(async\\s+)?(function|\\([^)]*\\)\\s*=>)|\\b${fnName}\\s*\\()`, 'm');
        if (!fnRegex.test(rawCode)) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: publicFeedback,
            diagnosticReason: `Function '${fnName}' not declared or defined.`
          };
        }
      }
      return { id, title, weight, passed: true, feedback: 'Fungsi JavaScript ditemukan.' };
    }

    if (rule === 'requiredIdentifier') {
      const ident = params.identifier || '';
      if (ident) {
        const identRegex = new RegExp(`\\b${ident}\\b`, 'm');
        if (!identRegex.test(rawCode)) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: publicFeedback,
            diagnosticReason: `Identifier '${ident}' not found.`
          };
        }
      }
      return { id, title, weight, passed: true, feedback: 'Identifier ditemukan.' };
    }

    if (rule === 'requiredCall') {
      const callee = params.callee || '';
      if (callee) {
        const callRegex = new RegExp(`\\b${callee}\\s*\\(`, 'm');
        if (!callRegex.test(rawCode)) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: publicFeedback,
            diagnosticReason: `Function call '${callee}(...)' not found.`
          };
        }
      }
      return { id, title, weight, passed: true, feedback: 'Pemanggilan fungsi ditemukan.' };
    }

    if (rule === 'requiredEventListener') {
      const evt = params.eventType || '';
      if (evt) {
        const evtRegex = new RegExp(`addEventListener\\s*\\(\\s*['"\`]${evt}['"\`]|on${evt}\\s*=`, 'i');
        if (!evtRegex.test(rawCode)) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: publicFeedback,
            diagnosticReason: `Event listener for '${evt}' not found.`
          };
        }
      } else {
        if (!/addEventListener|onclick|onsubmit|onchange/i.test(rawCode)) {
          return {
            id,
            title,
            weight,
            passed: false,
            feedback: publicFeedback,
            diagnosticReason: `No standard event listener found in JS code.`
          };
        }
      }
      return { id, title, weight, passed: true, feedback: 'Event listener ditemukan.' };
    }

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
              diagnosticReason: `Syntax pattern not matched.`
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

    // Required patterns matching (legacy support)
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
      feedback: 'Kriteria berhasil dipenuhi.'
    };
  }
}
