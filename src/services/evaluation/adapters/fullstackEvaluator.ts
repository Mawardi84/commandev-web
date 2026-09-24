import { 
  EvaluatorAdapter, 
  EvaluatorFamily, 
  EvaluationCriterion, 
  ProjectSubmissionFiles, 
  InternalCriterionResult 
} from '../../../types/projectEvaluation';
import { stripJsComments, stripPythonCommentsAndDocstrings } from './sourceHelpers';

/**
 * Fullstack Evaluator Adapter:
 * Statically inspects structural relationships between frontend and backend source files.
 * Zero complete app execution, zero npm run, zero database migrations, zero external network calls.
 */
export class FullstackEvaluator implements EvaluatorAdapter {
  readonly family: EvaluatorFamily = 'fullstack';

  evaluate(criterion: EvaluationCriterion, files: ProjectSubmissionFiles): InternalCriterionResult {
    const { id, title, type, weight = 10, publicFeedback, privateConfig = {} } = criterion;
    const rule = privateConfig.rule || type;
    const params = privateConfig.parameters || {};

    const htmlCode = String(files.html || '').trim();
    const cssCode = String(files.css || '').trim();
    const jsCode = String(files.js || '').trim();
    const pyCode = String(files.py || '').trim();

    // 1. Frontend API Reference Exists
    if (rule === 'frontendApiReference') {
      const endpoint = params.endpointPath || params.pattern || '';
      const clientCode = jsCode || htmlCode;
      const apiRegex = new RegExp(`(fetch\\s*\\(|axios|\\/api|XMLHttpRequest|localStorage|endpoints|${endpoint})`, 'i');
      if (!apiRegex.test(clientCode)) {
        return {
          id,
          title,
          weight,
          passed: false,
          feedback: `Integrasi panggilan data frontend tidak ditemukan. ${publicFeedback}`,
          diagnosticReason: `No API call or data fetching pattern found in client code.`
        };
      }
      return { id, title, weight, passed: true, feedback: 'Referensi panggilan data frontend ditemukan.' };
    }

    // 2. Backend Endpoint Exists
    if (rule === 'backendEndpointExists') {
      const endpoint = params.endpointPath || params.routeName || '';
      const serverCode = pyCode || jsCode;
      const endpointRegex = new RegExp(`(def\\s+\\w+|app\\.(get|post|put|delete)|@app|route|handler|${endpoint})`, 'i');
      if (!endpointRegex.test(serverCode)) {
        return {
          id,
          title,
          weight,
          passed: false,
          feedback: `Handler endpoint backend tidak ditemukan. ${publicFeedback}`,
          diagnosticReason: `No backend route handler found for endpoint.`
        };
      }
      return { id, title, weight, passed: true, feedback: 'Handler endpoint backend ditemukan.' };
    }

    // 3. Data Model Exists
    if (rule === 'dataModelExists') {
      const model = params.modelName || params.className || '';
      const allCode = `${pyCode}\n${jsCode}\n${htmlCode}`;
      const modelRegex = new RegExp(`(class\\s+${model}|const\\s+${model}|let\\s+${model}|courses|lessons|users|items|catalog)`, 'i');
      if (!modelRegex.test(allCode)) {
        return {
          id,
          title,
          weight,
          passed: false,
          feedback: `Definisi struktur model data '${model || 'Entity'}' tidak ditemukan. ${publicFeedback}`,
          diagnosticReason: `Data model '${model}' not found in codebase.`
        };
      }
      return { id, title, weight, passed: true, feedback: 'Definisi model data ditemukan.' };
    }

    // 4. Auth Reference Exists
    if (rule === 'authReferenceExists') {
      const allCode = `${pyCode}\n${jsCode}\n${htmlCode}`;
      const authRegex = new RegExp(`(token|jwt|session|role|permission|auth|Bearer)`, 'i');
      if (!authRegex.test(allCode)) {
        return {
          id,
          title,
          weight,
          passed: false,
          feedback: `Mekanisme otentikasi / otorisasi fullstack tidak ditemukan. ${publicFeedback}`,
          diagnosticReason: `No authentication tokens or role guards found.`
        };
      }
      return { id, title, weight, passed: true, feedback: 'Mekanisme otentikasi fullstack ditemukan.' };
    }

    // 5. Frontend Component Exists
    if (rule === 'frontendComponentExists' || rule === 'html_structure') {
      const comp = params.componentName || params.pattern || '';
      const frontCode = `${htmlCode}\n${jsCode}`;
      const compRegex = new RegExp(`(catalog|course|card|grid|dashboard|module|${comp})`, 'i');
      if (!compRegex.test(frontCode)) {
        return {
          id,
          title,
          weight,
          passed: false,
          feedback: `Komponen tampilan frontend tidak ditemukan. ${publicFeedback}`,
          diagnosticReason: `Frontend component or catalog structure not matched.`
        };
      }
      return { id, title, weight, passed: true, feedback: 'Komponen tampilan frontend ditemukan.' };
    }

    // 6. Multi-file target delegation for standard rules
    const targetKey = privateConfig.targetFile || 'html';
    const targetCode = String(files[targetKey] || '').trim();

    if (rule === 'requiredFile' || rule === 'file_presence') {
      const isPresent = targetCode.length > 0;
      return {
        id,
        title,
        weight,
        passed: isPresent,
        feedback: isPresent ? 'File proyek ditemukan.' : publicFeedback,
        diagnosticReason: isPresent ? undefined : `File '${targetKey}' is missing or empty.`
      };
    }

    if (!targetCode && rule !== 'forbidden_construct' && rule !== 'forbiddenConstruct' && rule !== 'forbiddenPattern' && rule !== 'fileDoesNotContain') {
      return {
        id,
        title,
        weight,
        passed: false,
        feedback: `File ${targetKey.toUpperCase()} masih kosong. ${publicFeedback}`,
        diagnosticReason: `Target file '${targetKey}' is empty.`
      };
    }

    // Check required patterns across target code
    if (privateConfig.requiredPatterns && privateConfig.requiredPatterns.length > 0) {
      for (const pattern of privateConfig.requiredPatterns) {
        try {
          const flags = privateConfig.caseSensitive ? 'm' : 'im';
          const regex = new RegExp(pattern, flags);
          if (!regex.test(targetCode)) {
            return {
              id,
              title,
              weight,
              passed: false,
              feedback: publicFeedback,
              diagnosticReason: `Pattern '${pattern}' failed on ${targetKey}.`
            };
          }
        } catch {
          if (!targetCode.toLowerCase().includes(pattern.toLowerCase())) {
            return {
              id,
              title,
              weight,
              passed: false,
              feedback: publicFeedback,
              diagnosticReason: `Pattern substring '${pattern}' failed on ${targetKey}.`
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
      feedback: 'Kriteria fullstack berhasil dipenuhi.'
    };
  }
}
