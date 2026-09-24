import { executePython } from '../../utils/pythonInterpreter';
import { ExecutionInput, ExecutionResult } from './executionTypes';

export class ExecutionService {
  /**
   * Client-side execution of code (Python or Web HTML/CSS/JS)
   */
  async executeCode(input: ExecutionInput): Promise<ExecutionResult> {
    const isPython = input.language === 'python' || input.py !== undefined || (input.code && (input.code.includes('def ') || input.code.includes('print(')));

    if (isPython) {
      const codeToRun = input.py || input.code || '';
      const pyResult = executePython(codeToRun, input.stdinInput || '');
      
      return {
        status: pyResult.error ? 'error' : 'passed',
        output: pyResult.output,
        error: pyResult.error,
        executionTimeMs: pyResult.executionTimeMs
      };
    } else {
      // Web execution (HTML / CSS / JS)
      const startTime = performance.now();
      const html = input.html || input.code || '';
      const css = input.css || '';
      const js = input.js || '';

      const doc = new DOMParser().parseFromString(html, 'text/html');
      
      let capturedConsole: string[] = [];
      let jsError: string | undefined;

      if (js) {
        try {
          // Verify basic JS syntax
          new Function(js);
        } catch (err: any) {
          jsError = err.message || String(err);
        }
      }

      const elapsed = Math.round(performance.now() - startTime);

      return {
        status: jsError ? 'error' : 'passed',
        output: capturedConsole.join('\n') || (doc.body ? doc.body.textContent || 'DOM rendered' : 'HTML rendered'),
        error: jsError,
        executionTimeMs: elapsed
      };
    }
  }
}

export const executionService = new ExecutionService();
